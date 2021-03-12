import {Ionicons} from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, {useEffect} from 'react';

export default function useCachedResources() {
    const [isLoadingComplete, setLoadingComplete] = React.useState(false);

    useEffect(() => {
        (async () => {
            try {
                SplashScreen.preventAutoHideAsync();

                await Font.loadAsync({
                    ...Ionicons.font,
                    'space-mono': require('../../assets/fonts/SpaceMono-Regular.ttf'),
                });
            } catch (e) {
                console.warn(e);
            } finally {
                setLoadingComplete(true);
                SplashScreen.hideAsync();
            }
        })()
    }, []);

    return isLoadingComplete;
}
