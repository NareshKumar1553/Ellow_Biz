import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const test1 = () => {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const photoCollection = firestore().collection('photos');
                const snapshot = await photoCollection.get();
                const fetchedPhotos = [];

                for (const doc of snapshot.docs) {
                    const photoData = doc.data();
                    const photoUrl = await storage().ref(photoData.path).getDownloadURL();
                    fetchedPhotos.push({ id: doc.id, url: photoUrl });
                }
                console.log('fetchedPhotos', fetchedPhotos);
                setPhotos(fetchedPhotos);

            } catch (error) {
                console.error('Error fetching photos:', error);
            }
        };

        fetchPhotos();
    }, []);

    return (
        <View>
            <Text>Photos:</Text>
            {photos.map((photo) => (
                <Image key={photo.id} source={{ uri: photo.url }} style={{ width: 200, height: 200 }} />
            ))}
        </View>
    );
};

export default test1;
