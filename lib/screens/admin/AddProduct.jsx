import React from "react";
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import firestore from '@react-native-firebase/firestore';

const AddProduct = ({ navigation,route }) => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [image, setImage] = React.useState('');

    const {pname} = route.params;

    // console.log('pname:', pname);

    const isInputEmpty = (value) => {
        return value.trim() === '';
    };

    const handleAddProduct = () => {
        if(pname === 'AllProducts'){
            firestore().collection('products').add({
                name: name,
                price: price,
                description: description,
                image: image,
            });
            console.log('Product added successfully!');
        }
        else if(pname === 'LatestProducts'){
            firestore().collection('photos').doc('latestProduct').collection('image').doc(name).set({
                name: name,
                price: price,
                description: description,
                url: image,
            });
            console.log('Latest Product added successfully!');
        }
       else if(pname === 'Categories'){
            firestore().collection('photos').doc('categories').collection('image').doc(name).set({
                name: name,
                img: image,
            });
            console.log('Category added successfully!');
        }
    };
    return (
        <View style={{flex:1,justifyContent:'center',alignIt:'center'}}>
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

                    <TouchableOpacity style={styles.loginButton} title="Add Product" onPress={() => {
                        if (isInputEmpty(name) || isInputEmpty(price) || isInputEmpty(description) || isInputEmpty(image)) {
                            return;
                        }
                        else {
                            // Add product to database
                            handleAddProduct();
                            console.log('Product added successfully!');
                            setName('');
                            setPrice('');
                            setDescription('');
                            setImage('');
                            Alert.alert('Product added successfully!');
                            navigation.push('OrderPlaced',{name:'Admin'});
                        }
                        
                    }
                    }>
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
        color:'black'
    },
    subContainer: {
        padding: 10,
    },
    subHeadingText: {
        fontSize: 18,
        fontWeight: 'bold',
        color:'black'
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
        color:'black'
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
        color:'black'
    },
});