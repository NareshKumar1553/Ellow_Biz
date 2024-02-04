import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Home from "../screens/Home";
import Login from "../screens/Login";
import Profile from "../screens/Profile";
import Test1 from "../testing/test1";
import Admin from "../screens/admin/Admin";
import AddProduct from "../screens/admin/AddProduct";
import UserDetails from "../screens/admin/UserDetails";
import Loading from "../animation/Loading";
import ProductDetails from "../screens/ProductDetails";
import MyCart from "../screens/MyCart";
import Success from "../animation/Success";


const Stack = createNativeStackNavigator();

const StackNavigation = () => {

    const [name, setName] = React.useState('');

    React.useEffect(() => {
        const getName = async () => {
            try {
                const name = await AsyncStorage.getItem('name');
                console.log('name:', name);
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
                { name === "admin@ellowbiz.com" ? (
                    <Stack.Screen name="Admin1" component={Admin} />
                ) : name != null ? (
                    <Stack.Screen name="Home1" component={Home} />
                ) : (
                    <Stack.Screen name="Login1" component={Login} />
                )}

                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="profile" component={Profile} />
                <Stack.Screen name="Admin" component={Admin}    />
                <Stack.Screen name="AddProduct" component={AddProduct} />
                <Stack.Screen name="UserDetails" component={UserDetails} />
                <Stack.Screen name="Loading" component={Loading} />
                <Stack.Screen name="ProductDetails" component={ProductDetails} />
                <Stack.Screen name="MyCart" component={MyCart} />
                <Stack.Screen name="OrderPlaced" component={Success} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default StackNavigation;