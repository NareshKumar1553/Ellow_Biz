import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const Home = ({route,navigation}) => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [photo, setPhoto] = React.useState('');

    React.useEffect(() => {
        const data = async () => {
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

        data();
    }, []);
    
    console.log(name,email,photo);
    return (
        <LinearGradient colors={['#e6ed79', '#DDF969']} style={styles.container}>
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={'#e6ed79'}/>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.headerTouch}>
                    <Image source={require('../asset/drawer.png')} style={styles.headerImage} />
                </TouchableOpacity>
                <Text style={styles.headerText}>EllowBiz</Text>
                <TouchableOpacity onPress={() => navigation.navigate('profile')}>
                    <Image source={{uri: photo}} style={styles.headerImage} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('test1')} style={styles.button}>
                <Text>test1</Text>
            </TouchableOpacity>


            <Text style={styles.text}>Name: {name}</Text>

        </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
      },
    header: {
        flexDirection:'row',
        top:0,
        backgroundColor:'#e6ed79',
        height:'auto',
        width:'100%',
        alignItems:'center',
        justifyContent:'space-between',
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
    },
    headerText: {
        fontSize: 20,
        color: '#333',
        textAlign:'center',
        justifyContent:'center'
    },
    headerImage: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 50,
    },
    button: {
        backgroundColor:'#eef2b6',
        padding:10,
        borderRadius:24,
        width:200,
        alignItems:'center',
        justifyContent:'center',
        marginTop:10,
        marginLeft:10,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#fff',
        marginBottom: 10,
        marginTop: 10,
        marginRight: 10,
    },
    headerTouch: {
        marginLeft: 10,
        marginBottom: 10,
    },
    text: {
        fontSize: 20,
        color: '#333'
    }
});

export default Home;