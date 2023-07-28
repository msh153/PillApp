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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
                        <Drawer.Screen name="Pill arrangment" component={PillScreen}options={{
                            drawerIcon: ({color, size} ) => <MaterialCommunityIcons
                                size={size}
                                color={color}
                                name={'pill'}></MaterialCommunityIcons>
                        }}/>
                        <Drawer.Screen name="Settings" component={SettingsScreen} options={{
                            drawerIcon: ({color, size} ) => <MaterialCommunityIcons
                                size={size}
                                color={color}
                                name={'wifi'}></MaterialCommunityIcons>
                        }}/>
                    </Drawer.Navigator>
                </NavigationContainer>
            </Provider>
    );
};

export default App;