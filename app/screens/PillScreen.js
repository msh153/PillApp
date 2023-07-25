import React, { useEffect, useState } from 'react';
import { TextInput, View, StyleSheet, Button} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import DatePicker from 'react-native-date-picker'

import { connectAp, getApnames, } from '../actions';

export const PillScreen = () => {
    const dispatch = useDispatch();

    const [ssid, onChangeSsid] = useState('');
    const [password, onChangePassword] = useState('');
    const [date, setDate] = useState(new Date());
    const [date2, setDate2] = useState(new Date());

    const [isEnabled, setIsEnabled] = useState(false);

    useEffect(() => {
        if (ssid)
            setIsEnabled(true);
        else
            setIsEnabled(false);
    }, [ssid]);

    return (
        <View style={{ flex: 1, padding: 25 }}>
            {
                <>
                    <View style={{ backgroundColor: 'white', bottom: '0%' }}>
                        <DatePicker
                            style={{width: 200}}
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
                        <DatePicker
                            style={{width: 200}}
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
                        <Button title={'Set time'}
                            disabled={isEnabled}
                            onPress={() => { onChangeSsid(''); onChangePassword(''); dispatch(connectAp(ssid, password)); }} />
                    </View>
                </>
            }
        </View >
    );
};