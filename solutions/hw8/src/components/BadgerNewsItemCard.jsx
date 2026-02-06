// Task 2
import { View, Text, Image, Pressable } from "react-native";

export default function BadgerNewsItemCard({ article, onPress }) {
  return (
    <Pressable onPress={() => onPress(article)} style={{ margin: 12 }}>
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 12,
          overflow: "hidden",
          // Add shadow styles here
          shadowColor: "#000", // Shadow color (black for natural effect)
          shadowOpacity: 0.83, // Opacity level (0-1; lower for subtler shadow)
          shadowRadius: 2.62, // Blur radius (higher for softer shadow)
          elevation: 6, // For Android compatibility (higher value for stronger shadow)
        }}
      >
        <Image
          source={{
            uri: `https://raw.githubusercontent.com/CS571-S25/hw8-api-static-content/main/${article.img}`,
          }}
          style={{ width: "100%", height: 200 }}
        />
        <View style={{ padding: 12 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {article.title}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
