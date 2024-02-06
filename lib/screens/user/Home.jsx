import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, StatusBar, ScrollView, ImageBackground } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import firestore, { firebase } from '@react-native-firebase/firestore';
import styles from "../../styles/styles";
import Loading from "../../animation/Loading";

const Home = ({ route, navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [photo, setPhoto] = useState('');
    const [categories, setCategories] = useState([]);
    const [latestProducts, setLatestProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const categoriesData = [];
            const latestProductsData = [];
            const allProductsData = [];

            const categoriesSnapshot = await firestore().collection('photos').doc('categories').collection('image').get();
            categoriesSnapshot.forEach((doc) => {
                categoriesData.push({
                    img: doc.data().img,
                    name: doc.data().name
                });
            });
            setCategories(categoriesData);

            const latestProductsSnapshot = await firestore().collection('photos').doc('latestProduct').collection('image').get();
            latestProductsSnapshot.forEach((doc) => {
                latestProductsData.push({
                    name: doc.data().name,
                    price: doc.data().price,
                    img: doc.data().url,
                    description: doc.data().description,
                });
            });
            setLatestProducts(latestProductsData);

            const allProductsSnapshot = await firestore().collection('products').get();
            allProductsSnapshot.forEach((doc) => {
                allProductsData.push({
                    name: doc.data().name,
                    price: doc.data().price,
                    img: doc.data().image,
                    description: doc.data().description,
                });
            });
            setAllProducts(allProductsData);

            try {
                const name = await AsyncStorage.getItem('name');
                setName(name);
                const email = await AsyncStorage.getItem('email');
                setEmail(email);
                
            } catch (error) {
                console.error(error);
            }

            setLoading(false);
        };

        fetchData();
    }, []);

    return (
        <LinearGradient colors={['#e6ed79', '#83eb6e']} style={{ flex: 1 }}>
            <View style={styles.container}>
                <ScrollView>
                    <StatusBar barStyle="dark-content" backgroundColor={'#e6ed79'} />
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.navigate('MyCart')} style={styles.headerTouch}>
                            <Image source={require('../../asset/myCart.png')} resizeMode="stretch" style={styles.myCartImage} />
                        </TouchableOpacity>
                        <Text style={styles.headerText}>EllowBiz</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('profile')}>
                            {photo === null ? <Image source={require('../../asset/profile.png')} style={styles.profileImage} /> : <Image source={{ uri: photo }} style={styles.profileImage} />}
                        </TouchableOpacity>
                    </View>

                    <View style={styles.subContainerBanner}>
                        {loading ? <Loading /> : <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/ellowbiz0.appspot.com/o/images%2Fbanner.png?alt=media&token=b61db8cc-7246-436a-88b8-2a2e11ad6b34' }} resizeMode="stretch" style={styles.bannerImage} />}
                    </View>

                    <View style={styles.subContainer}>
                        <Text style={styles.subHeadingText}>Welcome, {name}</Text>
                    </View>

                    <View style={styles.subContainer}>
                        <Text style={styles.subHeadingText}>CATEGORIES:</Text>
                    </View>

                    <View style={styles.subContainer1}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {categories.map((item, index) => (
                                <View key={index}>
                                    <TouchableOpacity onPress={() => navigation.navigate('#', item)} style={styles.categories}>
                                        {loading ? <Loading /> : <ImageBackground source={{ uri: item.img }} style={styles.cardImage} resizeMode="stretch"></ImageBackground>}
                                    </TouchableOpacity>
                                    <Text style={styles.imageText}>{item.name}</Text>
                                </View>
                            ))}
                        </ScrollView>
                    </View>

                    <View style={styles.subContainer}>
                        <Text style={styles.subHeadingText}>LATEST PRODUCTS:</Text>
                    </View>

                    <View style={styles.subContainer1}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {latestProducts.map((item, index) => (
                                <View key={index}>
                                    <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', item)} style={styles.categories}>
                                        {loading ? <Loading /> : (
                                            <ImageBackground source={{ uri: item.img }} style={styles.cardImage} resizeMode="stretch">
                                                <Text style={styles.cardPrice}>₹{item.price}</Text>
                                            </ImageBackground>
                                        )}
                                    </TouchableOpacity>
                                    <Text style={styles.cardText}>{item.name}</Text>
                                </View>
                            ))}
                        </ScrollView>
                    </View>

                    <View style={styles.subContainer}>
                        <Text style={styles.subHeadingText}>ALL PRODUCTS:</Text>
                    </View>

                    <View style={styles.subContainer1}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {allProducts.map((item, index) => (
                                <View key={index}>
                                    <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', item)} style={styles.categories}>
                                        {loading ? <Loading /> : (
                                            <ImageBackground source={{ uri: item.img }} style={styles.cardImage} resizeMode="stretch">
                                                <Text style={styles.cardPrice}>₹{item.price}</Text>
                                            </ImageBackground>
                                        )}
                                    </TouchableOpacity>
                                    <Text style={styles.cardText}>{item.name}</Text>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </ScrollView>
            </View>
        </LinearGradient>
    );
}

export default Home;