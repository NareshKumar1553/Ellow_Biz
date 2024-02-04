import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import styles from "../styles/styles";
const ProductDetails = ({navigation,route}) => {
    const { img, price, name, description } = route.params;

    console.log('item:', img, price, name, description);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text></Text>
                <Text style={styles.headerText}>Product Details</Text>
                <Text></Text>
            </View>
            <View style={styles.subContainerBanner}>
                <Image source={{uri: img}} style={styles.bannerImage} resizeMode="stretch" />
            </View>

            <View style={styles.subContainer}>
                <Text style={styles.subHeadingText}>{name}</Text>
            </View>

            <View style={styles.subContainer}>
                <Text style={styles.subHeadingText}>{price}</Text>
            </View>

            <View style={style.subContainer}>
                <Text style={style.description}>{description}</Text>
            </View>
            
        </View>
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
        color: '#333',
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
});
