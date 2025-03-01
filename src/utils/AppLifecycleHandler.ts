import { useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import {storageStore} from "../store/storageStore";

const AppLifecycleHandler = () => {
    const appState = useRef(AppState.currentState);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', handleAppStateChange);
        return () => {
            subscription.remove();
        };
    }, []);

    const handleAppStateChange = async (nextAppState: any) => {
        if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
            await storageStore.load();
        } else if (nextAppState.match(/inactive|background/)) {
            await storageStore.save();
        }
        appState.current = nextAppState;
    };
    return null;
};

export default AppLifecycleHandler;