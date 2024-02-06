import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TouchableHighlight } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';
import styles from '../../styles/styles';
import LinearGradient from 'react-native-linear-gradient';
import Loading from '../../animation/Loading';


const MyCart = ({navigation}) => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(true);
    const  [deliveryAdress, setDeliveryAdress] = useState('');
    const userId = firebase.auth().currentUser.uid;

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {

            const deliveryAdress = await firestore().collection('users').doc(userId).get();
            setDeliveryAdress(deliveryAdress.data().address);

            const cartItemsSnapshot = await firebase.firestore().collection("users").doc(userId).collection("cart").get();

            const items = cartItemsSnapshot.docs.map((doc) => doc.data());
            console.log('items:', items);
            setCartItems(items);

            // Calculate total price
            const price = items.reduce((total, item) => total + item.price, 0);

            setTotalPrice(price);

            setLoading(false);
        } catch (error) {
            console.error('Error fetching cart items: ', error);
        }
    };

    const handleRemoveItem = async (itemId) => {
        console.log('Removing item:', itemId);
        try {
            // Get the current user's ID
            const userId = firebase.auth().currentUser.uid;

            // Remove the item from the cart collection
            await firebase.firestore().collection("users").doc(userId).collection("cart").doc(itemId).delete();

            console.log('Item removed successfully');
            // Fetch updated cart items
            fetchCartItems();
        } catch (error) {

            console.error('Error removing item: ', error);
        }
    };

    const handlePlaceOrder = async () => {
        await firebase.firestore().collection('orders').doc(userId).set({
            items: cartItems,
            totalPrice: totalPrice,
            deliveryAdress: deliveryAdress,
            status: 'pending',
            date: new Date(),
            userId: userId,
        });


        navigation.push('OrderPlaced',{name:'Home',totalPrice:totalPrice});
        console.log('Order placed successfully');

    };

    return (
        <LinearGradient colors={['#e6ed79', '#83eb6e']} style={{flex:1}}>
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={style.heading}>My Cart</Text>
            {loading ? (
                <Loading />
            ) : (
                cartItems.map((item) => (
                    console.log('item:', item.itemID),
                    <View key={item.id} style={{justifyContent:'center',alignItems:'center'}}>
                        <Image source={{ uri: item.img }} resizeMode='stretch' style={styles.cardImage} />
                        <Text style={styles.cardText}>{item.name}, {item.price}</Text>
                        <TouchableOpacity style={styles.cartRemove} title="Remove" onPress={() => handleRemoveItem(item.itemID)} >
                            <Text style={styles.cartRemoveText}>Remove</Text>
                        </TouchableOpacity>
                    </View>
                ))
            )}
            
            <View style={{justifyContent:'center',alignItems:'center',marginBottom:10}}>
            <TouchableOpacity title="Continue Shopping" onPress={()=>{navigation.reset({index: 0,routes: [{ name: 'Home' }],})}} style={styles.cartRemove}>
                <Text style={styles.buttonText}>Continue Shopping</Text>
            </TouchableOpacity> 
            
            <Text style={style.address}>
                Delivery Address: 
                {'\n'}
                {deliveryAdress}
            </Text>

            <TouchableOpacity title="Change Address" onPress={()=>{navigation.push('profile')}} style={styles.cartRemove}>
                <Text style={styles.buttonText}>Change Address</Text>
            </TouchableOpacity>


            </View>          
            </ScrollView>


            <View style={style.footer}>
            <TouchableOpacity title="Place Order" onPress={handlePlaceOrder} style={style.placeOrderButton}>
                <Text style={styles.buttonText}>Place Order</Text>
            </TouchableOpacity>

            <TouchableHighlight title="Total Price" style={style.placeOrderButton}>
                <Text style={styles.buttonText}>Total Price: {totalPrice}</Text>
            </TouchableHighlight>

            </View>
        </View>
        </LinearGradient>
    );
};

export default MyCart;

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign:'center',
        padding:10,
        borderRadius:15,
        width:'100%',
        color:'#333',
    },
    placeOrderButton: {
        backgroundColor:'#83eb6e',
        padding:10,
        borderRadius:24,
        width:'50%',
        height:'auto',
        alignItems:'center',
        justifyContent:'center',
        marginTop:10,
        
    },
    totalPrice: {
        backgroundColor:'#93eb6e',
        padding:10,
        borderRadius:24,
        width:200,
        alignItems:'center',
        justifyContent:'center',
        marginTop:10,
       
    },
    footer: {
        flexDirection: 'row',
        backgroundColor: '#e6ed79',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 100,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        
    },
    address: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign:'center',
        padding:10,
        borderRadius:15,
        width:'100%',
        color:'#333',
    }
    
});