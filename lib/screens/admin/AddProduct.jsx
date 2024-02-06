import React, { useState } from "react";
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import firestore from '@react-native-firebase/firestore';

const AddProduct = ({ navigation, route }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    const { pname } = route.params;

    const isInputEmpty = (value) => {
        return value.trim() === '';
    };

    const handleAddProduct = () => {
        let collection, doc, data;
        if (pname === 'AllProducts') {
            collection = 'products';
            doc = null;
            data = {
                name,
                price,
                description,
                image,
            };
            console.log('Product added successfully!');
        } else if (pname === 'LatestProducts') {
            collection = 'photos';
            doc = 'latestProduct';
            data = {
                name,
                price,
                description,
                url: image,
            };
            console.log('Latest Product added successfully!');
        } else if (pname === 'Categories') {
            collection = 'photos';
            doc = 'categories';
            data = {
                name,
                img: image,
            };
            console.log('Category added successfully!');
        }

        if (collection && doc && data) {
            firestore().collection(collection).doc(doc).collection('image').doc(name).set(data);
        }
    };

    const handleAddProductButtonPress = () => {
        if (isInputEmpty(name) || isInputEmpty(price) || isInputEmpty(description) || isInputEmpty(image)) {
            return;
        }

        handleAddProduct();
        console.log('Product added successfully!');
        setName('');
        setPrice('');
        setDescription('');
        setImage('');
        Alert.alert('Product added successfully!');
        navigation.push('OrderPlaced', { name: 'Admin' });
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Add Product</Text>
            </View>

            <ScrollView>
                <View style={styles.subContainer}>
                    <Text style={styles.subHeadingText}>PRODUCT DETAILS:</Text>
                </View>

                <View style={styles.subContainer1}>
                    <Text style={styles.subHeadingText}>Product Name:</Text>
                    <TextInput
                        style={[styles.input, isInputEmpty(name) && styles.inputError]}
                        value={name}
                        onChangeText={setName}
                        placeholder="Product Name"
                    />

                    <Text style={styles.subHeadingText}>Product Price:</Text>
                    <TextInput
                        style={[styles.input, isInputEmpty(price) && styles.inputError]}
                        value={price}
                        onChangeText={setPrice}
                        keyboardType="numeric"
                        placeholder="Product Price"
                    />

                    <Text style={styles.subHeadingText}>Product Description:</Text>
                    <TextInput
                        style={[styles.input, isInputEmpty(description) && styles.inputError]}
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Product Description"
                    />

                    <Text style={styles.subHeadingText}>Product Image:</Text>
                    <TextInput
                        style={[styles.input, isInputEmpty(image) && styles.inputError]}
                        value={image}
                        onChangeText={setImage}
                        placeholder="Product Image"
                    />

                    <TouchableOpacity style={styles.loginButton} title="Add Product" onPress={handleAddProductButtonPress}>
                        <Text style={styles.loginButtonText}>Add Product</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </View>
    );
}

export default AddProduct;

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#e6ed79',
        padding: 10,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    subContainer: {
        padding: 10,
    },
    subHeadingText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },
    subContainer1: {
        padding: 10,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        color: 'black'
    },
    inputError: {
        borderColor: 'red',
    },
    loginButton: {
        backgroundColor: '#e6ed79',
        padding: 10,
        alignItems: 'center',
        borderRadius: 10,
        margin: 10,

    },
    loginButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },
});