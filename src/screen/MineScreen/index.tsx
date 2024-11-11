import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

const MineScreen = () => {

    useEffect(() => {
        console.log('MineScreen');
    }, [])

    return (
        <View>
            <Text>MineScreen</Text>
        </View>
    )
}
export default MineScreen