// Task 2
import { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, RefreshControl, Modal, TextInput, Button, Alert, Text, TouchableOpacity } from "react-native";
import BadgerChatMessage from "../helper/BadgerChatMessage";
import * as SecureStore from 'expo-secure-store';

function BadgerChatroomScreen(props) {

    const chatroom = props.name;
    const [messages, setMessages] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const fetchMessages = async () => {
        try {
            const response = await fetch(`https://cs571.org/rest/s25/hw9/messages?chatroom=${encodeURIComponent(chatroom)}`, {
                headers: {
                    "X-CS571-ID": "bid_bfe190248600e1ef8ed0459729902062698db70d45d8be4c5115661024123bf7"
                }
            });

            const data = await response.json();

            if (response.status === 200) {
                setMessages(data.messages);
            }
        } catch (error) {
            console.error("Error", error.message);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [chatroom]);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchMessages();
        setRefreshing(false);
    };

    // Task 3
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleCreatePost = async () => {
        try {
            const token = await SecureStore.getItemAsync("token");

            const response = await fetch(`https://cs571.org/rest/s25/hw9/messages?chatroom=${encodeURIComponent(chatroom)}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "X-CS571-ID": "bid_bfe190248600e1ef8ed0459729902062698db70d45d8be4c5115661024123bf7"
                },
                body: JSON.stringify({
                    title: title,
                    content: content
                })
            });

            const data = await response.json();

            if (response.status === 200) {
                Alert.alert("Success", "Your post was successfully created!");
                setShowModal(false);
                setTitle("");
                setContent("");
                fetchMessages(); // refresh messages
            } else {
                Alert.alert("Error", data.msg || "Failed to create post.");
            }
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    };

    // Task 4
    const [username, setUsername] = useState("");

    useEffect(() => {
        const loadUsername = async () => {
            const storedUsername = await SecureStore.getItemAsync("username");
            setUsername(storedUsername);
        };
        loadUsername();
    }, []);

    const handleDeletePost = async (id) => {
        try {
            const token = await SecureStore.getItemAsync("token");

            const response = await fetch(
                `https://cs571.org/rest/s25/hw9/messages?id=${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "X-CS571-ID": "bid_bfe190248600e1ef8ed0459729902062698db70d45d8be4c5115661024123bf7"
                    }
                }
            );

            const data = await response.json();

            if (response.status === 200) {
                Alert.alert("Deleted", "Your post was deleted.");
                fetchMessages();
            } else {
                Alert.alert("Error", data.msg || "Failed to delete post.");
            }
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    };

    return <View style={{ flex: 1 }}>
        <FlatList
            data={messages}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View>
                    <BadgerChatMessage
                        title={item.title}
                        poster={item.poster}
                        content={item.content}
                        created={item.created}
                        canDelete={item.poster === username}
                        onDelete={() => handleDeletePost(item.id)}
                    />
                </View>
            )}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        />

        {/* Task 3, 6 */}
        {!props.isGuest && (
            <Button title="Add Post" color="darkred" onPress={() => setShowModal(true)} />
        )}

        <Modal visible={showModal} animationType="slide" transparent>
            <View style={styles.modalOverlay}>
                <View style={styles.modalCard}>
                    <Text style={styles.modalTitle}>Create A Post</Text>

                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={setTitle}
                        autoCapitalize="none"
                    />

                    <Text style={styles.label}>Body</Text>
                    <TextInput
                        style={[styles.input, { height: 100 }]}
                        value={content}
                        onChangeText={setContent}
                        multiline
                        autoCapitalize="none"
                    />

                    <View style={[styles.modalButtons, {gap: 20}]}>
                        <Button
                            title="Create Post"
                            onPress={handleCreatePost}
                            disabled={!title || !content}
                        />
                        <Button
                            title="Cancel"
                            color="grey"
                            onPress={() => setShowModal(false)}
                        />
                    </View>
                </View>
            </View>
        </Modal>

    </View>
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center"
    },
    modalCard: {
        width: "90%",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 40,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8
    },
    modalTitle: {
        fontSize: 28,
        marginBottom: 20
    },
    label: {
        fontSize: 20,
        marginBottom: 8,
        textAlign: "left"
    },
    input: {
        borderWidth: 1,
        borderColor: "#000000",
        padding: 10,
        marginBottom: 12,
        fontSize: 16
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "center",
    }
});

export default BadgerChatroomScreen;