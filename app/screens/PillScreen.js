import React, { useEffect, useState, useCallback } from 'react';
import { View, Button, ToastAndroid } from 'react-native';
import { useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PushNotification from 'react-native-push-notification';

import { setTime, setTime1, giveNow } from '../actions';

const Tab = createBottomTabNavigator();

export const PillScreen = () => {
    const dispatch = useDispatch();

    const [date, setDate] = useState(new Date());
    const [date2, setDate2] = useState(new Date());
    const [showDate2, setShowDate2] = useState(false);

    const showToast = (() => {
        ToastAndroid.show('Take pill from the slot', ToastAndroid.SHORT);
      }, []);
    
      useEffect(() =>
    PushNotification.createChannel(
        {
          channelId: 'channel-id', // (required)
          channelName: 'My channel', // (required)
          channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        }, (created) => console.log(`createChannel returned '${created}'`),
      ), []
      )
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
                            style={[{width:"100%", backgroundColor: 'white'}]}
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
                    onPress={() => {
                        if(showDate2){
                            PushNotification.localNotificationSchedule({
                                message: "Your pill is waiting for you", // (required)
                                date: new Date(date),
                                actions: ["ReplyInput"],
                                reply_button_text: "Ok" // (required)
                              })
                            PushNotification.localNotificationSchedule({
                                message: "Your pill is waiting for you", // (required)
                                date: new Date(date2),
                                actions: ["ReplyInput"],
                                reply_button_text: "Ok" // (required)
                              })
                            dispatch(setTime(
                                date.getHours(), date.getMinutes(),
                                date2.getHours(), date2.getMinutes()
                                ));
                        }
                        else{
                            PushNotification.localNotificationSchedule({
                                message: "Your pill is waiting for you", // (required)
                                date: new Date(date),
                                actions: ["ReplyInput"],
                                reply_button_text: "Ok" // (required)
                              })
                            dispatch(setTime1(
                                date.getHours(), date.getMinutes()
                                ));
                        }
                     }} />
                </View >
            } />
                <Tab.Screen name="GiveNow" children= {() =>
                    <View style={{ flex: 1, padding: 25, justifyContent: "space-around"  }}>
                        {
                                <Button
                                    title={'Give now'}
                                    onPress={() => { showToast(); dispatch(giveNow()); }} />
                        }
                    </View >
                } />
    </Tab.Navigator>
    </NavigationContainer>
    );
};