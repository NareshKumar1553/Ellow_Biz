import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, Alert, StatusBar } from "react-native";
import styles  from "../../styles/styles";
import LinearGradient from "react-native-linear-gradient";
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';
const Admin = ({ navigation }) => {
    const [userList, setUserList] = React.useState([]);
    const [orders, setOrders] = React.useState([]);
    
    React.useEffect(() => {
        const subscriber = firestore().collection("users").onSnapshot((querySnapshot) => {
            const users = [];
            setUserList([]);
            querySnapshot.forEach((documentSnapshot) => {
                users.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                });
            });
            setUserList(users);
        });

        const ordersSubscriber = firestore().collection("orders").onSnapshot((querySnapshot) => {
            const orders = [];
            querySnapshot.forEach((documentSnapshot) => {
                console.log('Ordersdsd ',documentSnapshot.data(),documentSnapshot.id);
                orders.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                    
                });
            });
            // Do something with the orders data
            setOrders(orders);
        });

        return () => {
            subscriber();
            ordersSubscriber();
        };
    }, []);

    function timeStamptoDate(seconds, nanoseconds) {
        timestamp = new firebase.firestore.Timestamp(seconds, nanoseconds);
        date = timestamp.toDate();
        return date;
    }

    
    console.log(userList);

    return (
        console.log('Admin Page'),
        <LinearGradient colors={['#e6ed79', '#83eb6e']} style={{ flex: 1 }}>
        <View style={styles.container}>
            <StatusBar backgroundColor="#e6ed79" barStyle="dark-content" />
            <View style={styles.header}>
                <Text style={styles.heading}>Admin</Text>
                <TouchableOpacity
                    onPress={() => {
                        console.log("Logout Pressed");
                        Alert.alert("Logout", "Are you sure you want to logout?", [
                            {
                                text: "Cancel",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel",
                            },
                            { text: "OK", onPress: () => {
                                firebase.auth().signOut();
                                console.log("OK Pressed");
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: "Login" }],
                                });
                            } },
                        ]);
                    }}
                >
                <Image
                    source={require("../../asset/logout.png")}
                    style={{ width: 40, height: 40, marginRight: 10 }}
                />
                </TouchableOpacity>
            </View>

            <ScrollView>

                <View style={styles.subContainer}>
                    <Text style={styles.subHeadingText}>RECENT ORDERS:</Text>
                </View>

                <View style={styles.subContainer1}>
                        <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                        <Text style={styles.cardText}>Image</Text>
                        <Text style={styles.cardText}>Name</Text>
                        <Text style={styles.cardText}>Date</Text>
                        <Text style={styles.cardText}>Price</Text>
                        <Text style={styles.cardText}>Status</Text>
                        </View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View>
                            {orders.map((order, index) => (
                                console.log("Orders ", order, index),
                                <View key={order.key} style={styles.categories}>
                                    {order.items.map((item, itemIndex) => (
                                        <React.Fragment key={itemIndex}>
                                            <TouchableOpacity
                                                onPress={() => navigation.navigate("#", { order: order })}
                                                style={styles.cardImage}
                                            >
                                                <Image
                                                    source={{ uri: item.img }}
                                                    style={styles.cardImage}
                                                    resizeMode="stretch"
                                                />
                                            </TouchableOpacity>
                                            <Text style={styles.cardText}>{item.name}</Text>
                                            <Text style={styles.cardText}>{timeStamptoDate(order.date.seconds, order.date.nanoseconds).toDateString()}</Text>
                                            <Text style={styles.cardText}>₹{item.price}</Text>
                                            <Text style={styles.cardText}>{order.status}</Text>
                                        </React.Fragment>
                                    ))}
                                </View>
                            ))}

                            <Text style={styles.imageText}>ORDERS</Text>
                        </View>
                        
                    </ScrollView>
                </View>

                <View style={styles.subContainer}>
                    <Text style={styles.subHeadingText}>CATEGORIES:</Text>
                </View>

                <View style={styles.subContainer1}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("AddProduct",{pname:'Categories'})}
                                style={styles.categories}
                            >
                                <Image
                                    source={require("../../../android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png")}
                                    style={styles.cardImage}
                                    resizeMode="stretch"
                                ></Image>
                            </TouchableOpacity>
                            <Text style={styles.imageText}>Add Category</Text>
                        </View>
                    </ScrollView>
                </View>

                <View style={styles.subContainer}>
                    <Text style={styles.subHeadingText}>LATEST PRODUCTS:</Text>
                </View>

                <View style={styles.subContainer1}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("AddProduct",{pname:'LatestProducts'})}
                                style={styles.categories}
                            >
                                <Image
                                    source={require("../../../android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png")}
                                    style={styles.cardImage}
                                    resizeMode="stretch"
                                ></Image>
                            </TouchableOpacity>
                            <Text style={styles.imageText}>Add Product</Text>
                        </View>
                    </ScrollView>
                </View>

                <View style={styles.subContainer}>
                    <Text style={styles.subHeadingText}>ALL PRODUCTS:</Text>
                </View>

                <View style={styles.subContainer1}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("AddProduct",{pname:'AllProducts'})}
                                style={styles.categories}
                            >
                                <Image
                                    source={require("../../../android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png")}
                                    style={styles.cardImage}
                                    resizeMode="stretch"
                                ></Image>
                            </TouchableOpacity>
                            <Text style={styles.imageText}>Add Product</Text>
                        </View>
                    </ScrollView>
                </View>

                <View style={styles.subContainer}>
                    <Text style={styles.subHeadingText}>USERS : </Text>
                </View>

                <View style={styles.subContainer1}>
                    <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                        <Text style={styles.cardText}>Image</Text>
                        <Text style={styles.cardText}>Email</Text>
                        <Text style={styles.cardText}>Name</Text>
                    </View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    
                        <View>
                        {userList.map((user) => (
                                            <View key={user.key} style={styles.categories}>
                                                <TouchableOpacity
                                                    onPress={() => navigation.navigate("UserDetails", { user: user })}
                                                    style={styles.cardImage}
                                                >
                                                {user.photo ? (
                                                    <Image
                                                        source={{uri : user.photo}}
                                                        style={styles.cardImage}
                                                        resizeMode="stretch"
                                                    >
                                                    </Image>
                                                ) : (
                                                    <Image
                                                        source={require("../../../android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png")}
                                                        style={styles.cardImage}
                                                        resizeMode="stretch"
                                                    >                                                        
                                                    </Image>
                                                )}
                                                </TouchableOpacity>
                                                <Text style={styles.cardText}>{user.email}</Text>
                                                <Text style={styles.cardText}>{user.name}</Text>
                                                                                               
                                            </View>
                                        ))}
                                                   
                            <Text style={styles.imageText}>USERS</Text>
                        </View>
                    </ScrollView>
                </View>

            </ScrollView>
        </View>
        </LinearGradient>
    );
}

export default Admin;