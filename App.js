import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './pages/HomeScreen.jsx';
import { Text, StyleSheet } from "react-native";


const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="HomeScreen">
                <Stack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{
                        header: () => (<Text style={styles.logo}>JOBO</Text>),
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    logo: {
        paddingTop: "6%",
        paddingLeft: "2%",
        fontWeight: "700",
        fontSize: 40,
        color: "#2a52be",
    },
});

export default App;