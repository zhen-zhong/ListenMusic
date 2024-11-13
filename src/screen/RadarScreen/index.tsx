import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

const RadarScreen = () => {

    useEffect(() => {
        console.log('RadarScreen');
    }, [])

    return (
        <View>
            <Text>RadarScreen</Text>
        </View>
    )
}
export default RadarScreen