import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';
import { firebase } from '@react-native-firebase/auth';

const Profile = ({navigation}) => {
    const [userData, setUserData] = useState({
        email: '',
        name: '',
        photo: '',
        age: '',
        phoneNumber: '',
        address: '',
        pinCode: ''
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = firebase.auth().currentUser;
                console.log('user', user);
                if (user) {
                    const userData = await firestore().collection('users').doc(user.uid).get();
                    if (userData.exists) {
                        setUserData(userData.data());
                        console.log('User data retrieved:', userData.data().name, userData.data().email, userData.data().age, userData.data().phoneNumber, userData.data().address);
                    } else {
                        console.log('User data does not exist');
                    }
                } else {
                    console.log('No user is logged in');
                }
            } catch (error) {
                console.log('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const logOut = async () => {
        console.log('Logging out...');
        Alert.alert('Logging out...');
        try {
            await AsyncStorage.clear();
            await firebase.auth().signOut();
            console.log('Logged out successfully!');
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        } catch (error) {
            console.log('Error logging out:', error);
        }
    };

    const saveProfile = async () => {
        try {
            const user = firebase.auth().currentUser;
            console.log('user', user);
            if (user) {
                await firestore().collection('users').doc(user.uid).set(userData);
            } else {
                console.log('No user is logged in');
            }
            console.log('Profile saved successfully!');
            Alert.alert('Profile saved successfully!');
            navigation.pop();
        } catch (error) {
            console.log('Error saving profile:', error);
        }
    };

    return (
        <LinearGradient colors={['#e6ed79', '#DDF969']} style={styles.container}>
            <Text style={styles.heading}>Profile</Text>
            {userData.photoUrl ? <Image source={{uri: userData.photoUrl}} style={styles.headerImage} /> : <Image source={require('../../../android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png')} style={styles.headerImage} /> }

            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.text}>Email:</Text>
                <TextInput value={userData.email} onChangeText={value => setUserData(prevState => ({ ...prevState, email: value }))} style={styles.input}/>

                <Text style={styles.text}>Name:</Text>
                <TextInput value={userData.name} onChangeText={value => setUserData(prevState => ({ ...prevState, name: value }))} style={styles.input}/>

                <Text style={styles.text}>Age:</Text>
                <TextInput value={userData.age} onChangeText={value => setUserData(prevState => ({ ...prevState, age: value }))} style={styles.input} inputMode='numeric'/>

                <Text style={styles.text}>Phone Number:</Text>
                <TextInput value={userData.phoneNumber} onChangeText={value => setUserData(prevState => ({ ...prevState, phoneNumber: value }))} style={styles.input} inputMode='numeric'/>

                <Text style={styles.text}>Address:</Text>
                <TextInput value={userData.address} onChangeText={value => setUserData(prevState => ({ ...prevState, address: value }))} style={styles.input}/>

                <Text style={styles.text}>Pin Code:</Text>
                <TextInput value={userData.pinCode} onChangeText={value => setUserData(prevState => ({ ...prevState, pinCode: value }))} inputMode='numeric' style={styles.input}/>

                <TouchableOpacity title="Save" onPress={saveProfile} style={styles.button}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>

                <TouchableOpacity title="Logout" onPress={logOut} style={styles.button}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        borderWidth:1,
        borderColor:'#777',
        padding:8,
        margin:10,
        width:200,
        borderRadius:24,
        backgroundColor:'#eef2b6',
        color:'#333'
    },
    button: {
        backgroundColor:'#eef2b6',
        padding:10,
        borderRadius:24,
        width:200,
        alignItems:'center',
        justifyContent:'center',
        marginTop:20,
        marginBottom:30,
    },
    buttonText: {
        color:'#333',
        fontSize:20,
    },
    text:{
        color:'#333',
        fontSize:20,
        marginBottom:10,
    },
    headerImage: {
        width: 100,
        height: 100,
        marginRight: 10,
        borderRadius: 100,
        marginBottom: 10,
        marginTop: 20,
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign:'center',
        backgroundColor:'#e6ed79',
        padding:10,
        borderRadius:15,
        width:200,
        color:'#333',
    }
});

export default Profile;
