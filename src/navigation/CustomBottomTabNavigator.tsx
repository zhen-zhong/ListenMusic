// src/navigation/CustomBottomTabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import HomeScreen from '../screen/HomeScreen';
import SettingsScreen from '../screen/MineScreen';

// 定义底部导航的参数类型
type BottomTabParamList = {
    Home: undefined;
    Settings: undefined;
    Profile: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

// 自定义 Tab Bar 的 Props 类型
interface CustomTabBarProps {
    state: any;
    descriptors: any;
    navigation: any;
}

function CustomTabBar({ state, descriptors, navigation }: CustomTabBarProps) {
    return (
        <View style={styles.tabBar}>
            {state.routes.map((route:any, index:number) => {
                const { options } = descriptors[route.key];
                const label = options.tabBarLabel !== undefined ? options.tabBarLabel : route.name;
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <TouchableOpacity
                        key={index}
                        onPress={onPress}
                        style={[styles.tabItem, isFocused && styles.tabItemFocused]}
                    >
                        <Text style={[styles.tabText, isFocused && styles.tabTextFocused]}>{label}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const CustomBottomTabNavigator: React.FC = () => {
    return (
        <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
            <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: '首页', headerShown: false }} />
            <Tab.Screen name="Settings" component={SettingsScreen} options={{ tabBarLabel: '设置' }} />
        </Tab.Navigator>
    );
};

export default CustomBottomTabNavigator;

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        height: 60,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    tabItemFocused: {
        backgroundColor: '#f0f0f0',
    },
    tabText: {
        fontSize: 12,
        color: '#333',
    },
    tabTextFocused: {
        color: '#007aff',
        fontWeight: 'bold',
    },
});
