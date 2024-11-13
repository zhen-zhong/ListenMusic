import { useSafeAreaInsets } from 'react-native-safe-area-context';

const useSafeArea = () => {
    const insets = useSafeAreaInsets();

    return {
        top: insets.top, 
        bottom: insets.bottom,
        left: insets.left, 
        right: insets.right,
    };
};

const utils = { useSafeArea };

export default utils;

