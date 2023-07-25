import React, { useEffect, useState, useCallback } from 'react';
import { View, Button, ToastAndroid, Text, TouchableOpacity} from 'react-native';
import { useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { connectAp, getApnames, } from '../actions';


const Tab = createBottomTabNavigator();

export const PillScreen = () => {
    const dispatch = useDispatch();

    const [ssid, onChangeSsid] = useState('');
    const [password, onChangePassword] = useState('');
    const [date, setDate] = useState(new Date());
    const [date2, setDate2] = useState(new Date());
    const [showDate2, setShowDate2] = useState(false);

    const [isEnabled, setIsEnabled] = useState(false);

    useEffect(() => {
        if (ssid)
            setIsEnabled(true);
        else
            setIsEnabled(false);
    }, [ssid]);

    const showToast = useCallback(() => {
        ToastAndroid.show('Take pill from the slot', ToastAndroid.SHORT);
      }, []);

    return (
        <NavigationContainer independent={true}>
        <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
      
                  if (route.name === 'Time') {
                    iconName = focused
                      ? 'time'
                      : 'time-outline';
                      return <Ionicons  name={iconName} size={size} color={color} />;
                    } else if (route.name === 'GiveNow') {
                    iconName = 'pills';
                    return <Fontisto  name={iconName} size={size} color={color} />;
                  }
                },
                tabBarActiveTintColor: '#2296f3',
                tabBarInactiveTintColor: 'gray',
                tabBarShowLabel: false,
                headerShown: false,
              })}
            >
            <Tab.Screen name="Time" children= {() => 
                <View style={{ flex: 1, padding: 25, justifyContent: 'space-between'  }}>
                    <View style={{ justifyContent: "space-around", alignItems: 'center', }}>
                        <DatePicker
                            style={[{width:"100%", backgroundColor: 'white',}]}
                            date={date}
                            mode="time"
                            placeholder="select date"
                            format="LT"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                                },
                                dateInput: {
                                marginLeft: 36
                                }
                            }}
                            onDateChange={(date) => setDate(date)}
                        />
                        <View style={{flexDirection:'row-reverse', width:'100%'}}>
                            <MaterialCommunityIcons 
                                style={{ fontSize: 40, color: '#2296f3' }}  
                                name={showDate2 ? 'clock-minus-outline' : 'clock-plus-outline'}
                                onPress={()=> setShowDate2(!showDate2)} 
                            />
                        </View>
                        { showDate2 &&
                            <DatePicker
                            style={[{width:'100%', backgroundColor: 'white'}]}
                            date={date2}
                            mode="time"
                            placeholder="select date"
                            format="LT"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                                },
                                dateInput: {
                                marginLeft: 36
                                }
                            }}
                            onDateChange={(date) => setDate2(date)}
                            />
                        }
                    </View>
                <Button
                    style={{ flexDirection: 'column', bottom: 10 }}
                    title={'Set time'}
                    disabled={isEnabled}
                    onPress={() => { onChangeSsid(''); onChangePassword(''); dispatch(connectAp(ssid, password)); }} />
                </View >
            } />
                <Tab.Screen name="GiveNow" children= {() =>
                    <View style={{ flex: 1, padding: 25, justifyContent: "space-around"  }}>
                        {
                                <Button
                                    title={'Give now'}
                                    disabled={isEnabled}
                                    onPress={() => { showToast(); dispatch(connectAp(ssid, password)); }} />
                        }
                    </View >
                } />
    </Tab.Navigator>
    </NavigationContainer>
    );
};