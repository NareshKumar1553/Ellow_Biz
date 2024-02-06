import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import styles from "../../styles/styles";
import firestore from "@react-native-firebase/firestore";
import { firebase } from '@react-native-firebase/auth';
import LinearGradient from "react-native-linear-gradient";

const ProductDetails = ({navigation,route}) => {
    const { img, price, name, description } = route.params;

    console.log('item:', img, price, name, description);

    const addToCart = (name, price) => {
        console.log('name:', name);
        console.log('price:', price);

        // Get the current user's ID
        const userId = firebase.auth().currentUser.uid;

        // Create a reference to the Firestore collection for the current user
        const cartRef = firestore().collection("users").doc(userId).collection("cart");

        // Add the item to the cart collection
        let itemID = Math.random().toString(36).substring(7);

        cartRef.doc(itemID).set({
            name,
            price,
            itemID,
            img
        })
        .then(() => {
            console.log("Item added to cart successfully");
            navigation.push('MyCart');
        })
        .catch((error) => {
            console.error("Error adding item to cart:", error);
        });
    }

    return (
        <LinearGradient colors={['#e6ed79', '#83eb6e']} style={{flex:1}}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text></Text>
                    <Text style={styles.heading}>Product Details</Text>
                    <Text></Text>
                </View>
                <View style={styles.subContainerBanner}>
                    <Image source={{uri: img}} style={styles.bannerImage} resizeMode="stretch" />
                </View>

                <View style={styles.subContainer}>
                    <Text style={styles.subHeadingText}>Product Name : {name}</Text>
                </View>

                <View style={styles.subContainer}>
                    <Text style={styles.subHeadingText}>Product Price : {price}</Text>
                </View>

                <View style={styles.subContainer}>
                    <Text style={styles.subHeadingText}>About Product :</Text>
                </View>

                <View style={styles.subContainer}>
                    <Text style={styles.description}>{description}</Text>
                </View>
                
                <View style={styles.addToCart}>
                    <TouchableOpacity style={styles.addCart} title="Add to Cart" onPress={() => addToCart(name, price)} >
                        <Text style={styles.addCartText}>Add to Cart</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
    );
}

export default ProductDetails;
