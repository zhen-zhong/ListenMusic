import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import HomeScreen from '../screen/HomeScreen';
import MineScreenScreen from '../screen/MineScreen';
import images from '../utils/images';

type BottomTabParamList = {
    Home: undefined;
    MineScreen: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

interface CustomTabBarProps {
    state: any;
    descriptors: any;
    navigation: any;
}

function CustomTabBar({ state, descriptors, navigation }: CustomTabBarProps) {
    console.log(state, descriptors, navigation);
    
    return (
        <View style={styles.tabBar}>
            {state.routes.map((route: any, index: number) => {
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

                // 根据页面和选中状态选择图标
                const iconSource =
                    route.name === 'Home'
                        ? isFocused
                            ? images.homeSelect
                            : images.home
                        : isFocused
                            ? images.mineSelect
                            : images.mine;

                return (
                    <TouchableOpacity
                        key={index}
                        onPress={onPress}
                        style={[styles.tabItem, isFocused && styles.tabItemFocused]}
                    >
                        <Image source={iconSource} style={styles.icon} />
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
            <Tab.Screen name="MineScreen" component={MineScreenScreen} options={{ tabBarLabel: '设置' }} />
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
        // backgroundColor: '#f0f0f0',
    },
    tabText: {
        fontSize: 12,
        color: '#BABABA',
    },
    tabTextFocused: {
        color: '#51E886',
        fontWeight: 'bold',
    },
    icon: {
        width: 24,
        height: 24,
        marginBottom: 5,
    },
});
