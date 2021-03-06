import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {Provider} from "react-redux";
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Root} from "native-base";
import {Host} from 'react-native-portalize';
import {store} from "./src/store"
import useCachedResources from "./src/hooks/useCachedResources";
import Navigation from "./src/navigation";

export default function App() {
    const isLoadingComplete = useCachedResources();

    if (!isLoadingComplete)
        return null
    else
        return (
            <Provider store={store}>
                <SafeAreaProvider>
                    <Root>
                        <Host>
                            <Navigation/>
                            <StatusBar style={'light'}/>
                        </Host>
                    </Root>
                </SafeAreaProvider>
            </Provider>
        );
}
