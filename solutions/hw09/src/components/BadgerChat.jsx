import { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import CS571 from '@cs571/mobile-client'
import * as SecureStore from 'expo-secure-store';
import BadgerChatroomScreen from './screens/BadgerChatroomScreen';
import BadgerRegisterScreen from './screens/BadgerRegisterScreen';
import BadgerLoginScreen from './screens/BadgerLoginScreen';
import BadgerLandingScreen from './screens/BadgerLandingScreen';
import BadgerLogoutScreen from './screens/BadgerLogoutScreen';
import BadgerConversionScreen from './screens/BadgerConversionScreen';

const ChatDrawer = createDrawerNavigator();

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false);
  const [chatrooms, setChatrooms] = useState([]);

  useEffect(() => {
    const fetchChatrooms = async () => {
      try {
        const response = await fetch("https://cs571.org/rest/s25/hw9/chatrooms", {
          headers: {
            "X-CS571-ID": "bid_bfe190248600e1ef8ed0459729902062698db70d45d8be4c5115661024123bf7"
          }
        });
        const data = await response.json();
        setChatrooms(data);
      } catch (error) {
        console.error("Error", error.message);
      }
    };
        fetchChatrooms();
  }, []);

  function handleLogin(username, pin) {
    // hmm... maybe this is helpful!
    setIsLoggedIn(true); // I should really do a fetch to login first!
    setIsGuest(false);
  }

  function handleSignup(username, pin) {
    // hmm... maybe this is helpful!
    setIsLoggedIn(true); // I should really do a fetch to register first!
    setIsGuest(false);
  }

  // Task 6
  const [isGuest, setIsGuest] = useState(false);
  function handleGuest() {
    setIsGuest(true);
    setIsLoggedIn(true);
    SecureStore.deleteItemAsync("username");
    SecureStore.deleteItemAsync("token");
  }

  if (isLoggedIn) {
    return (
      <NavigationContainer>
        <ChatDrawer.Navigator>
          <ChatDrawer.Screen name="Landing" component={BadgerLandingScreen} />
          {
            chatrooms.map(chatroom => {
              return <ChatDrawer.Screen key={chatroom} name={chatroom}>
                {(props) => <BadgerChatroomScreen name={chatroom} isGuest={isGuest} />}
              </ChatDrawer.Screen>
            })
          }
          {/* Task 5, 6 */}
          {isGuest ? (
            <ChatDrawer.Screen
              name="Signup"
              options={{
                drawerItemStyle: { backgroundColor: "#f8d7da" }
              }}
            >
              {(props) => <BadgerConversionScreen setIsRegistering={setIsRegistering} setIsLoggedIn={setIsLoggedIn} />}
            </ChatDrawer.Screen>
          ) : (
            <ChatDrawer.Screen
              name="Logout"
              options={{
                drawerItemStyle: { backgroundColor: "#f8d7da" }
              }}
            >
              {(props) => <BadgerLogoutScreen setIsLoggedIn={setIsLoggedIn} />}
            </ChatDrawer.Screen>
          )}
        </ChatDrawer.Navigator>
      </NavigationContainer>
    );
  } else if (isRegistering) {
    return <BadgerRegisterScreen handleSignup={handleSignup} setIsRegistering={setIsRegistering} />
  } else {
    return <BadgerLoginScreen handleLogin={handleLogin} setIsRegistering={setIsRegistering} handleGuest={handleGuest} />
  }
}