import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { View, Text, TouchableOpacity, Image, StatusBar, ScrollView, ImageBackground } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import firestore from '@react-native-firebase/firestore';
import styles from "../styles/styles";
const Home = ({route,navigation}) => {

    console.log('Home Page');
    let bannerImage = 'https://firebasestorage.googleapis.com/v0/b/ellowbiz0.appspot.com/o/images%2Fbanner.png?alt=media&token=b61db8cc-7246-436a-88b8-2a2e11ad6b34';
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [photo, setPhoto] = React.useState('');
    const [categoriesImageUrl, setcategoriesImageUrl] = React.useState([]);
    const [categoriesImageName, setcategoriesImageName] = React.useState([]);
    const [latestImageUrl, setlatestImageUrl] = React.useState([]);
    const [latestImageName, setlatestImageName] = React.useState([]);
    const [data,setData] = React.useState([]);
    let details = {};
    let image = []; 
    let Imgname = [];
    React.useEffect(() => {
        const fetchData = async () => {
            await firestore().collection('photos').doc('categories').collection('image').get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    image.push(doc.data().img);
                    Imgname.push(doc.data().name);
                });
            });
            setcategoriesImageUrl(image);
            setcategoriesImageName(Imgname);
            image = [];
            Imgname = [];
            await firestore().collection('photos').doc('latestProduct').collection('image').get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    image.push
                    (
                        details = {
                            name: doc.data().name,
                            price: doc.data().price,
                            img: doc.data().url,
                        }
                    );
                });
            });
            setData(image);
            console.log(data);
            console.log('Finish');

            try {
                const name = await AsyncStorage.getItem('name');
                setName(name);
                const email = await AsyncStorage.getItem('email');
                setEmail(email);
                const photo = await AsyncStorage.getItem('photo');
                setPhoto(photo);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);
    
    console.log(name,email,photo);
    return (
        <LinearGradient colors={['#e6ed79', '#83eb6e']} style={{flex:1}}>
        <View style={styles.container}>
            <ScrollView>
            <StatusBar barStyle="dark-content" backgroundColor={'#e6ed79'}/>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('#')} style={styles.headerTouch}>
                    <Image source={require('../asset/myCart.png')} resizeMode="stretch" style={styles.myCartImage} />
                </TouchableOpacity>
                <Text style={styles.headerText}>EllowBiz</Text>
                <TouchableOpacity onPress={() => navigation.navigate('profile')}>
                    <Image source={{uri: photo}} style={styles.profileImage} />
                </TouchableOpacity>
            </View>

            <View style={styles.subContainerBanner}>
                <Image source={{uri: bannerImage}} resizeMode="stretch" style={styles.bannerImage} />
            </View>

            <View style={styles.subContainer}>
                <Text style={styles.subHeadingText}>Welcome, {name}</Text>
            </View>

            <View style={styles.subContainer}>
                <Text style={styles.subHeadingText}>CATEGORIES:</Text>
            </View>

            <View style={styles.subContainer1}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {categoriesImageUrl.map((item, index) => {
                        return (
                            <View key={index}>
                                <TouchableOpacity onPress={() => navigation.navigate('#')} style={styles.categories}>
                                    <ImageBackground source={{uri: item}} style={styles.cardImage} resizeMode="stretch">
                                    </ImageBackground>
                                </TouchableOpacity>
                                <Text style={styles.imageText}>{categoriesImageName[index]}</Text>
                            </View>
                        );
                    }
                    )}
                </ScrollView>
            </View>

            <View style={styles.subContainer}>
                <Text style={styles.subHeadingText}>LATEST PRODUCTS:</Text>
            </View>
            
            <View style={styles.subContainer1}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {data.map((item, index) => {
                        return (
                            <View key={index}>
                                <TouchableOpacity onPress={() => navigation.navigate('#')} style={styles.categories}>
                                    <ImageBackground source={{uri: item.img}} style={styles.cardImage} resizeMode="stretch">
                                        <Text style={styles.cardPrice}>{item.price}</Text>
                                    </ImageBackground>
                                </TouchableOpacity>
                                <Text style={styles.cardText}>{item.name}</Text>
                            </View>
                        );
                    }
                    )}
                </ScrollView>
            </View>
            


            {/* <TouchableOpacity onPress={() => navigation.navigate('test1')} style={styles.button}>
                <Text>test1</Text>
            </TouchableOpacity> */}


            
        </ScrollView>            
        </View>
        </LinearGradient>
        
    );
}



export default Home;