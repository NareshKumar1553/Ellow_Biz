import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Home from "../screens/Home";
import Login from "../screens/Login";
import Profile from "../screens/Profile";
import Test1 from "../testing/test1";


const Stack = createNativeStackNavigator();

const StackNavigation = () => {

    const [name, setName] = React.useState('');

    React.useEffect(() => {
        const getName = async () => {
            try {
                const name = await AsyncStorage.getItem('name');
                setName(name);
            } catch (error) {
                console.error(error);
            }
        };

        getName();
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator 
                initialRouteName="Login"
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: true,
                    gestureDirection: "horizontal",
                    cardStyleInterpolator: ({ current, layouts }) => {
                        return {
                            cardStyle: {
                                transform: [
                                    {
                                        translateX: current.progress.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [layouts.screen.width, 0],
                                        }),
                                    },
                                ],
                            },
                        };
                    },
                }}
            >
                {name != null ? (
                    <Stack.Screen name="Home1" component={Home} />
                ) : (
                    <Stack.Screen name="Login1" component={Login} />
                )
                }

                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="test1" component={Test1} />
                <Stack.Screen name="profile" component={Profile} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default StackNavigation;