import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BadgerNewsScreen from "../screens/BadgerNewsScreen";
import BadgerPreferencesScreen from "../screens/BadgerPreferencesScreen";
import BadgerArticleScreen from "../screens/BadgerArticleScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Task 3
function BadgerNewsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Articles"
                component={BadgerNewsScreen}
                options={{ title: "Articles" }}
            />
            <Stack.Screen
                name="Article"
                component={BadgerArticleScreen}
                options={{ title: "Article" }}
            />
        </Stack.Navigator>
    );
}

// Task 4
function PreferencesStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Preferences"
                component={BadgerPreferencesScreen}
                options={{ title: "Preferences" }}
            />
        </Stack.Navigator>
    );
}

// Task 2
export default function BadgerTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === "News") iconName = "newspaper-outline";
                    else if (route.name === "Preferences") iconName = "settings-outline";
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "red",
                tabBarInactiveTintColor: "gray",
            })}
        >
            <Tab.Screen name="News" component={BadgerNewsStack} />
            <Tab.Screen name="Preferences" component={PreferencesStack} />
        </Tab.Navigator>
    );
}
