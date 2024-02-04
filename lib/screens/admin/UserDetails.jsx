import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import styles from '../../styles/styles';

const UserDetails = ({ route, navigation }) => {

    const { user } = route.params;
    const { name,key,email,address,phoneNumber,photo } = user;
    console.log(name,key,email,address,phoneNumber,photo);
    const userId = key;

    const handleDeleteUser = async () => {
        Alert.alert('Delete User', 'Are you sure you want to delete this user?', [ 
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: async () => {
                    try {
                        // Delete user from Firestore
                        await firestore()
                            .collection('users')
                            .doc(userId)
                            .delete();

                        // Delete user from Firebase Auth
                        const currentUser = auth().currentUser;
                        if (currentUser && currentUser.uid === userId) {
                            await currentUser.delete();
                        }

                        // Fetch the cart details
                        
                        console.log('User deleted successfully!');
                        navigation.goBack();
                    } catch (error) {
                        console.error('Error deleting user:', error);
                    }
                },
            },
        ]);
        
    };

    return (
        <View style= {styles.container}>
            <View style={styles.header}>
                <Text></Text>
                <Text  style={styles.headerText}>User Details:</Text>
                <Text></Text>
            </View>

            <View style={styles.subContainer}>
                <Text style={styles.subHeadingText}>Name</Text>
            </View>
            <View style={styles.subContainer}>
                <Text style={styles.subHeadingText}>{name}</Text>
            </View>
            <View style={styles.subContainer}>
                <Text style={styles.subHeadingText}>Address</Text>
            </View>
            <View style={styles.subContainer}>
                <Text style={styles.subHeadingText}>{address}</Text>
            </View>
            <View style={styles.subContainer}>
                <Text style={styles.subHeadingText}>Phone Number</Text>
            </View>
            <View style={styles.subContainer}>
                <Text style={styles.subHeadingText}>{phoneNumber}</Text>
            </View>
            <View style={styles.subContainer}>
                <Text style={styles.subHeadingText}>Email</Text>
            </View>
            <View style={styles.subContainer}>
                <Text style={styles.subHeadingText}>{email}</Text>
            </View>
            
            <Button title="Delete User" onPress={handleDeleteUser} />
        </View>
    );
};

export default UserDetails;
