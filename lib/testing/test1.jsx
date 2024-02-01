import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import storage from '@react-native-firebase/storage';

const ImagePage = () => {
    const [imageUrl, setImageUrl] = useState(null);

//     useEffect(() => {
        
//         const fetchImage = async () => {
//             try{
//                 const url = await storage()
//                 .ref('gs://ellowbiz0.appspot.com/images/banner.png')
//                 .getDownloadURL();
//             setImageUrl(url);
//             console.log(url);
//         }
//     catch(e){
//         console.log(e);
//     }
// };
//         fetchImage();
//     }, []);

    return (
        <View style={styles.container}>
            <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/ellowbiz0.appspot.com/o/images%2Fbanner.png?alt=media&token=b61db8cc-7246-436a-88b8-2a2e11ad6b34' }} style={styles.image} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
    },
});

export default ImagePage;