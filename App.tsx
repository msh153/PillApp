import 'react-native-gesture-handler';

import React from 'react';
import {SettingsScreen} from './app/screens/SettingsScreen';
import {PillScreen} from './app/screens/PillScreen';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux'
import rootReducer from './app/reducer';
import rootEpic from './app/epic';
import { createEpicMiddleware } from 'redux-observable';
import { NavigationContainer } from '@react-navigation/native';
import {
    createDrawerNavigator,
} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const App = () => {
    const epicMiddleware = createEpicMiddleware();
    const store = createStore(rootReducer,
            applyMiddleware(epicMiddleware)
    );
    epicMiddleware.run(rootEpic);
    return (
            <Provider store={store} >
                <NavigationContainer independent={true}>
                    <Drawer.Navigator>
                        <Drawer.Screen name="Pill arrangment" component={PillScreen} />
                        <Drawer.Screen name="Settings" component={SettingsScreen} />
                    </Drawer.Navigator>
                </NavigationContainer>
            </Provider>
    );
};

export default App;