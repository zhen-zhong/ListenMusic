import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CustomBottomTabNavigator from './CustomBottomTabNavigator';
// import DetailsScreen from '../screens/DetailsScreen';

const Stack = createStackNavigator();

// RootStackNavigator 组件
function RootStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MainTabs"
                component={CustomBottomTabNavigator}
                options={{ headerShown: false }} // 隐藏底部导航的标题栏
            />
            {/* <Stack.Screen name="Details" component={DetailsScreen} options={{ title: '详情' }} /> */}
        </Stack.Navigator>
    );
}

export default RootStackNavigator;
