// Task 4
import { useEffect, useState, useContext } from "react";
import { View, Text, Switch, ScrollView } from "react-native";
import BadgerPreferencesContext from "../../context/BadgerPreferencesContext";

function BadgerPreferencesScreen() {
    const [tags, setTags] = useState([]);
    const { prefs, setPrefs } = useContext(BadgerPreferencesContext);

    useEffect(() => {
        fetch("https://cs571.org/rest/s25/hw8/articles", {
            headers: {
                "X-CS571-ID": "bid_bfe190248600e1ef8ed0459729902062698db70d45d8be4c5115661024123bf7"
            }
        })
        .then(res => res.json())
        .then(data => {
            const articles = Array.isArray(data) ? data : data.articles;
            if (!articles) return;

            const uniqueTags = new Set();
            articles.forEach(article => {
                article.tags.forEach(tag => uniqueTags.add(tag));
            });

            const tagList = Array.from(uniqueTags);
            setTags(tagList);

            if (Object.keys(prefs).length === 0) {
                const initialPrefs = {};
                tagList.forEach(tag => {
                    initialPrefs[tag] = true;
                });
                setPrefs(initialPrefs);
            }
        })
    }, []);

    const togglePreference = (tag) => {
        setPrefs(prev => ({
            ...prev,
            [tag]: !prev[tag],
        }));
    };

    return (
        <ScrollView contentContainerStyle={{ padding: 16 }}>
            {tags.map(tag => {
                const isOn = prefs[tag] !== false;

                return (
                    <View
                        key={tag}
                        style={{
                            marginBottom: 16,
                            backgroundColor: "white",
                            borderRadius: 12,
                            padding: 20,
                            alignItems: "center",
                            shadowColor: "#000",
                            shadowOpacity: 0.2,
                            shadowRadius: 6,
                            elevation: 5,
                        }}
                    >
                        <Text style={{ fontSize: 16, marginBottom: 14, textAlign: "center" }}>
                            {isOn ? "Currently showing " : "Currently NOT showing "}
                            <Text style={{ fontWeight: "bold" }}>{tag}</Text>
                            {" articles."}
                        </Text>

                        <Switch
                            value={isOn}
                            onValueChange={() => togglePreference(tag)}
                            trackColor={{ false: "#bbb", true: "#ff7a7a" }}
                            thumbColor={isOn ? "#c40000" : "#666"}
                            style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
                        />
                    </View>
                );
            })}
        </ScrollView>
    );
}

export default BadgerPreferencesScreen;
