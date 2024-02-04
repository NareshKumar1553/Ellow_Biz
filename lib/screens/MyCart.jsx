import React, { useEffect, useState } from 'react';
import { View, Text, Button, TouchableOpacity, Image, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';
import styles from '../styles/styles';
import LinearGradient from 'react-native-linear-gradient';


const MyCart = ({navigation}) => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            // Get the current user's ID
            const userId = firebase.auth().currentUser.uid;

            const cartItemsSnapshot = await firebase.firestore().collection("users").doc(userId).collection("cart").get();

            const items = cartItemsSnapshot.docs.map((doc) => doc.data());
            console.log('items:', items);
            setCartItems(items);

            // Calculate total price
            const price = items.reduce((total, item) => total + item.price, 0);
            setTotalPrice(price);
        } catch (error) {
            console.error('Error fetching cart items: ', error);
        }
    };

    const handleRemoveItem = async (itemId) => {
        console.log('Removing item:', itemId);
        try {
            // Get the current user's ID
            const userId = firebase.auth().currentUser.uid;

            // Remove the item from the cart collection
            await firebase.firestore().collection("users").doc(userId).collection("cart").doc(itemId).delete();

            console.log('Item removed successfully');
            // Fetch updated cart items
            fetchCartItems();
        } catch (error) {

            console.error('Error removing item: ', error);
        }
    };

    const handlePlaceOrder = () => {
        // Logic to place the order
        // ...
        navigation.push('OrderPlaced');
        console.log('Order placed successfully');

    };

    return (
        <LinearGradient colors={['#e6ed79', '#83eb6e']} style={{flex:1}}>
        <View style={styles.container}>
            <ScrollView>
            <Text style={styles.headerText}>My Cart</Text>
            {cartItems.map((item) => (
                console.log('item:', item.itemID),
                <View key={item.id}>
                    <Image source={{ uri: item.img }} style={styles.cardImage} />
                    <Text style={styles.cardText}>{item.name}, {item.price}</Text>
                    <TouchableOpacity style={styles.cartRemove} title="Remove" onPress={() => handleRemoveItem(item.itemID)} >
                        <Text style={styles.cartRemoveText}>Remove</Text>
                    </TouchableOpacity>
                </View>
            ))}
            <Text style={styles.cardText}>Total Price: {totalPrice}</Text>
            <TouchableOpacity title="Place Order" onPress={handlePlaceOrder} style={styles.loginButton}>
                <Text style={styles.buttonText}>Place Order</Text>
            </TouchableOpacity>
            </ScrollView>
        </View>
        </LinearGradient>
    );
};

export default MyCart;