// Task 1
import { Alert, Button, StyleSheet, Text, View, TextInput } from "react-native";
import { useState } from "react";
import * as SecureStore from 'expo-secure-store';

function BadgerRegisterScreen(props) {

    const [username, setUsername] = useState("");
    const [pin, setPin] = useState("");
    const [confirmPin, setConfirmPin] = useState("");

    const handleRegister = async () => {
        if (!pin || !confirmPin) {
            Alert.alert("Error", "Please enter a pin");
            return;
        }
        if (pin !== confirmPin) {
            Alert.alert("Error", "pins do not match");
            return;
        }
        if (!/^\d{7}$/.test(pin)) {
            Alert.alert("Error", "a pin must be 7 digits");
            return;
        }

        try {
            const response = await fetch("https://cs571.org/rest/s25/hw9/register", {
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

                props.handleSignup(username, pin);
            } else if (response.status === 409) {
                Alert.alert("Error", "That username is already taken.");
            } else {
                Alert.alert("Error", data.msg || "Registration failed.");
            }
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 36 }}>Join BadgerChat!</Text>

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

            <TextInput
                style={styles.input}
                placeholder="Confirm PIN"
                value={confirmPin}
                onChangeText={setConfirmPin}
                keyboardType="number-pad"
                maxLength={7}
                secureTextEntry={true}
                autoCapitalize="none"
            />
            <View style={{ 
                flexDirection: 'row',  
                justifyContent: 'center',  
                marginTop: 8,
                gap: 10   
                }}>
                <Button color="darkred" title="Signup" onPress={handleRegister} />
                <Button color="grey" title="Nevermind!" onPress={() => props.setIsRegistering(false)} />
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

export default BadgerRegisterScreen;
