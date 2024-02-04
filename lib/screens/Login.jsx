import React from 'react';
import { View, Button, StatusBar, TextInput, StyleSheet, Text, Touchable, TouchableOpacity, Image } from 'react-native';
import auth, { firebase } from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';



GoogleSignin.configure({
    webClientId: '895416754674-hnnh2m9md8n9idu26plp1qf0q9hqpo1o.apps.googleusercontent.com',
});

const Login = ({navigation}) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleGoogleSignup = async () => {
        try {
            console.log('Google signup initiated...');
            // Sign in with Google
            const { idToken } = await GoogleSignin.signIn();

            console.log('Google ID Token: ', idToken);
            // Create a Google credential
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            console.log('Google credential: ', googleCredential);
            // Sign up with the Google credential
            await auth().signInWithCredential(googleCredential);

            // User signed up successfully
            
            

            // Get the user's name from Google
            const userInfo = await GoogleSignin.getCurrentUser();
            
            const name = userInfo.user.name;
            const email = userInfo.user.email;
            const photo = userInfo.user.photo;

            await AsyncStorage.setItem('name', name);
            await AsyncStorage.setItem('email', email);
            
            if (photo !== null && photo !== undefined) {
                AsyncStorage.setItem('photo', value);
            } else {
                AsyncStorage.removeItem('photo');
            }
            
            const userRef = firestore().collection('users').doc(auth().currentUser.uid);
            const userDoc = await userRef.get();

            if (userDoc.exists) {
                // Existing user
                console.log('Existing user:', userDoc.data());
            } else {
                // New user
                console.log('New user:', name, email, photo);
                await userRef.set({
                    name: name,
                    email: email,
                    photo: photo,
                });
            }
            console.log('Google user info: ', userInfo);
            console.log('Google user name: ', name,email,photo);
            console.log('Google signup successful!');
            
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              });
           
        } catch (error) {
            console.error('Google signup error:', error);
        }
    };

    return (
        <LinearGradient colors={['#e6ed79', '#83eb6e']} style={{flex:1}}>
        <StatusBar barStyle="dark-content" backgroundColor={'#e6ed79'}/>
        <View style={styles.container}>
            <Image source={require('../../android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png')} style={{width:100,height:100}}/>
            <Text style={styles.text}>Email</Text>
            <TextInput style={styles.input} placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <Text style={styles.text}>Password</Text>
            <TextInput style={styles.input} placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.loginButton} title="Login" onPress={() => {
                auth()
                    .signInWithEmailAndPassword(email, password)
                    .then(async () => {
                        console.log('User account created & signed in!');
                        await AsyncStorage.setItem('name', email);
                        
                        firestore().collection('users').doc(auth().currentUser.uid).set({
                            email: email,
                            password: password,
                        });
                        if(email === 'admin@ellowbiz.com' && password === 'admin123'){
                            await AsyncStorage.setItem('name', email);
                            console.log('Admin login');
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Admin' }],
                              });
                        }
                        else{
                        await AsyncStorage.setItem('name', email);
                        console.log('User login');
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Home' }],
                          });
                        }
                    })
                    .catch(error => {
                        if (error.code === 'auth/email-already-in-use') {
                            console.log('That email address is already in use!');
                        }

                        if (error.code === 'auth/invalid-email') {
                            console.log('That email address is invalid!');
                        }

                        console.error(error);
                    });
            }} >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.loginButton} title="Google Login" onPress={handleGoogleSignup} >
                <Text style={styles.buttonText}>Google Login</Text>
            </TouchableOpacity> */}
        <GoogleSigninButton
            style={{ width: '70%', height: 60, borderRadius:24 }}
            size={GoogleSigninButton.name === 'standard' ? GoogleSigninButton.Size.Standard : GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Light}
            onPress={handleGoogleSignup}
            disabled={false} />


        </View>
        </LinearGradient>
    );
};

export default Login;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        borderWidth:1,
        borderColor:'green',
        padding:10,
        width:'70%',
        marginBottom:10,
        borderRadius:10,
        backgroundColor:'#d6f5b8',
        color:'black'

    },
    text:{
        color:'black',
        fontSize:27,
        fontWeight:'bold',
        marginBottom:10
    },
    loginButton:{
        width:'70%',
        padding:10,
        borderRadius:10,
        backgroundColor:'#84e329',
        marginBottom:10
    },
    buttonText:{
        textAlign:'center',
        fontSize:20,
        fontWeight:'bold',
        color:'black'
    }
});