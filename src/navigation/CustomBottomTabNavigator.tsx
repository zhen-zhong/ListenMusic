import React, { useMemo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import HomeScreen from '../screen/HomeScreen';
import MineScreenScreen from '../screen/MineScreen';
import RadarScreen from '../screen/RadarScreen';
import images from '../utils/images';
import utils from '../utils/utils';

type BottomTabParamList = {
    Home: undefined;
    MineScreen: undefined;
    RadarScreen: undefined
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

interface CustomTabBarProps {
    state: any;
    descriptors: any;
    navigation: any;
}

function getTabBarIconSource(routeName: string, isFocused: boolean) {
    switch (routeName) {
        case 'Home':
            return isFocused ? images.homeSelect : images.home;
        case 'RadarScreen':
            return isFocused ? images.radarSelect : images.radar;
        case 'MineScreen':
            return isFocused ? images.mineSelect : images.mine;
        default:
            return images.home;
    }
}

function CustomTabBar({ state, descriptors, navigation }: CustomTabBarProps) {

    return (
        <View style={[styles.tabBar, { paddingBottom: utils.useSafeArea().bottom - 10 }]}>
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

                // const iconSource = getTabBarIconSource(route.name, isFocused);
                const iconSource = useMemo(() => {
                    return getTabBarIconSource(route.name, isFocused);
                }, [route.name, isFocused]);

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
            <Tab.Screen name="RadarScreen" component={RadarScreen} options={{ tabBarLabel: '雷达' }} />
            <Tab.Screen name="MineScreen" component={MineScreenScreen} options={{ tabBarLabel: '我的' }} />
        </Tab.Navigator>
    );
};

export default CustomBottomTabNavigator;

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        paddingTop: 10,

        // 添加阴影效果（适用于 iOS）
        shadowColor: '#000', // 阴影的颜色
        shadowOffset: { width: 0, height: -4 }, // 阴影偏移量
        shadowOpacity: 0.1, // 阴影的透明度
        shadowRadius: 6, // 阴影的模糊半径

        // 添加阴影效果（适用于 Android）
        elevation: 5, // 阴影的高度
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
        fontWeight: '600'
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
