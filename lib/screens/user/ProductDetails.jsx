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
            const cartRef = firebase.firestore().collection("users").doc(userId).collection("cart");

            // Add the item to the cart collection
            let itemID = Math.random().toString(36).substring(7);

            cartRef.doc(itemID).set({
                name: name,
                price: price,
                itemID: itemID,
                img: img
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

            <View style={style.subContainer}>
                <Text style={style.description}>{description}</Text>
            </View>
            
            <View style={style.addToCart}>
                <TouchableOpacity style={styles.addCart} title="Add to Cart" onPress={() => addToCart(name, price)} >
                    <Text style={styles.addCartText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </View>
        </LinearGradient>
    );
}
export default ProductDetails;


const style = StyleSheet.create({
    subContainer: {
        flexDirection:'column',
        justifyContent: 'flex-start',
        marginTop:5,
     },
    subHeadingText: {
        fontSize: 20,
        color: '#DDF969',
        textAlign:'center',
        justifyContent:'center'
    },
    description: {
        fontSize: 20,
        color: '#333',
        textAlign:'center',
        justifyContent:'center',
        marginTop: 10,
        marginRight: 10,
        marginLeft: 10,
        justifyContent:'center'
    },
    addToCart: {
        flexDirection:'row',
        justifyContent: 'center',
        alignItems:'center',
        marginTop: 10,
    },
});
