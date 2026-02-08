// Task 1
import { Alert, Button, StyleSheet, Text, View, TextInput } from "react-native";
import { useState } from "react";
import * as SecureStore from 'expo-secure-store';

function BadgerLoginScreen(props) {

    const [username, setUsername] = useState("");
    const [pin, setPin] = useState("");

    const handleLogin = async () => {
        try {
            const response = await fetch("https://cs571.org/rest/s25/hw9/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CS571-ID": "bid_bfe190248600e1ef8ed0459729902062698db70d45d8be4c5115661024123bf7"
                },
                body: JSON.stringify({
                    username: username,
                    pin: pin
                })
            });

            const data = await response.json();

            if (response.status === 200) {
                await SecureStore.setItemAsync("token", data.token);
                await SecureStore.setItemAsync("username", data.user.username);

                props.handleLogin(username, pin);
            } else {
                Alert.alert("Incorrect login", "Please try again.");
            }
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 36 }}>BadgerChat Login</Text>
            
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="PIN"
                value={pin}
                onChangeText={setPin}
                keyboardType="number-pad"
                maxLength={7}
                secureTextEntry={true}
                autoCapitalize="none"
            />

            <View style={{ 
                justifyContent: 'center',  
                marginTop: 10,
                gap: 10   
            }}>
                <Button color="darkred" title="Login" onPress={handleLogin} />
                <Text>New here?</Text>
            </View>

            <View style={{ 
                flexDirection: 'row',  
                justifyContent: 'center',  
                marginVertical: 15,
                gap: 10   
            }}>
                <Button color="grey" title="Signup" onPress={() => props.setIsRegistering(true)} />
                <Button color="grey" title="Continue as guest" onPress={props.handleGuest} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: "80%",
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginVertical: 8,
        borderRadius: 5,
        fontSize: 16
    }
});

export default BadgerLoginScreen;
