// Task 3
import { useEffect, useRef, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, Animated, Image, Pressable, Linking } from "react-native";

export default function BadgerArticleScreen({ route }) {
    const { fullArticleId } = route.params;
    const [article, setArticle] = useState(null);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        setArticle(null); // Reset when re-entering
        fadeAnim.setValue(0);

        fetch(`https://cs571.org/rest/s25/hw8/article?id=${fullArticleId}`, {
            headers: {
                "X-CS571-ID": "bid_bfe190248600e1ef8ed0459729902062698db70d45d8be4c5115661024123bf7"
            }
        })
        .then(res => res.json())
        .then(data => {
            setArticle(data);
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }).start();
        })
    }, [fullArticleId]);

    if (!article) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
                <Text style={{ marginTop: 12 }}>The content is loading!</Text>
            </View>
        );
    }

    return (
        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                <Image
                    source={{
                    uri: `https://raw.githubusercontent.com/CS571-S25/hw8-api-static-content/main/${article.img}`,
                    }}
                    style={{ width: "100%", height: 200 }}
                />
                <Text style={{ fontSize: 26, fontWeight: "bold", marginVertical: 10 }}>
                    {article.title}
                </Text>
                <Text style={{ fontSize: 19}}>
                    By {article.author} on {article.posted}
                </Text>
                <Pressable onPress={() => Linking.openURL(article.url)}>
                    <Text
                        style={{
                            fontSize: 16,
                            color: "#1e90ff",
                            marginBottom: 20 
                        }}
                    >
                        Read full article here
                    </Text>
                </Pressable>
                {article.body.map((paragraph, index) => (
                    <Text key={index} style={{ fontSize: 16, lineHeight: 22 }}>
                        {paragraph}
                    </Text>
                ))}
            </ScrollView>
        </Animated.View>
    );
}
