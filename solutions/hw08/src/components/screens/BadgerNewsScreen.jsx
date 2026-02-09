// Task 2
import { useEffect, useState, useContext } from "react";
import { FlatList, Text, View } from "react-native";
import BadgerNewsItemCard from "../BadgerNewsItemCard";
import BadgerPreferencesContext from "../../context/BadgerPreferencesContext";

export default function BadgerNewsScreen({ navigation }) {
    const [articles, setArticles] = useState([]);
    const { prefs } = useContext(BadgerPreferencesContext);

    useEffect(() => {
        fetch("https://cs571.org/rest/s25/hw8/articles", {
            headers: {
                "X-CS571-ID": "bid_bfe190248600e1ef8ed0459729902062698db70d45d8be4c5115661024123bf7"
            }
        })
        .then(res => res.json())
        .then(data => {
            const articles = Array.isArray(data) ? data : data.articles;
            setArticles(articles);
        })
    }, []);

    // Task 4
    const filteredArticles = articles.filter(article => {
        if (!prefs || Object.keys(prefs).length === 0) return true;
        return article.tags.every(tag => prefs[tag] !== false);
    });

    if (filteredArticles.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>No articles match your current preferences.</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={filteredArticles}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
                <BadgerNewsItemCard
                    article={item}
                    onPress={() =>
                        navigation.navigate("Article", {
                            fullArticleId: item.fullArticleId,
                        })
                    }
                />
            )}
        />
    );
}
