import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';
import { firebase } from '@react-native-firebase/auth';

const Profile = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        // Fetch user data from AsyncStorage
        const fetchUserData = async () => {
            try {
                const user = firebase.auth().currentUser;
                console.log('user', user);
                if (user) {
                    const userData = await firestore().collection('users').doc(user.uid).get();
                    if (userData.exists) {
                        const { email, name, age, phoneNumber, address } = userData.data();
                        setEmail(email);
                        setName(name);
                        setAge(age);
                        setPhoneNumber(phoneNumber);
                        setAddress(address);
                        console.log('User data retrieved:', name, email, age, phoneNumber, address);
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
            // Save user data to AsyncStorage
            const userData = {
                email,
                name,
                age,
                phoneNumber,
                address,
            };
            await AsyncStorage.setItem('userData', JSON.stringify(userData));

            // Save user data to Firestore
            const user = firebase.auth().currentUser;
            console.log('user', user);
            if (user) {
                await firestore().collection('users').doc(user.uid).set(userData);
            }
            else {
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
        <Image source={require('../../android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png')} style={styles.headerImage} />

        <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.text}>Email:</Text>
            <TextInput value={email} onChangeText={setEmail} style={styles.input}/>

            <Text style={styles.text}>Name:</Text>
            <TextInput value={name} onChangeText={setName} style={styles.input}/>

            <Text style={styles.text}>Age:</Text>
            <TextInput value={age} onChangeText={setAge} style={styles.input} inputMode='numeric'/>

            <Text style={styles.text}>Phone Number:</Text>
            <TextInput value={phoneNumber} onChangeText={setPhoneNumber} style={styles.input} inputMode='numeric'/>

            <Text style={styles.text}>Address:</Text>
            <TextInput value={address} onChangeText={setAddress} style={styles.input}/>

            <TouchableOpacity title="Save" onPress={saveProfile} style={styles.loginButton}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity title="Logout" onPress={logOut} style={styles.loginButton}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </ScrollView>
        </LinearGradient>
    );
};

export default Profile;


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
    loginButton: {
        backgroundColor:'#eef2b6',
        padding:10,
        borderRadius:24,
        width:200,
        alignItems:'center',
        justifyContent:'center',
        marginTop:40,
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
});
