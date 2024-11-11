import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

const HomeScreen = () => {

    useEffect(() => {
        console.log('HomeScreen');
    }, [])

    return (
        <View>
            <Text>HomeScreen</Text>
        </View>
    )
}
export default HomeScreen