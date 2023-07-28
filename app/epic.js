import { ofType, combineEpics } from "redux-observable";
import { switchMap } from "rxjs/operators";
import { ajax } from 'rxjs/ajax';


const connectToAPEpic = (action$, state$) => action$.pipe(
    ofType('CONNECT_AP'),
    switchMap((params) => {
        return ajax.get(`http://192.168.4.1/connect?ssid=${params.payload.ssid}&password=${params.payload.password}`)
    })
);

const setDateEpic = (action$, state$) => action$.pipe(
    ofType('SET_TIME'),
    switchMap((params) => {
        return ajax.get(`http://192.168.4.1/setDate?dateH=${params.payload.dateHours}&dateM=${params.payload.dateMinutes}&dateH1=${params.payload.date1Hours}&dateM1=${params.payload.date1Minutes}`)
    })
);

const setDate1Epic = (action$, state$) => action$.pipe(
    ofType('SET_TIME1'),
    switchMap((params) => {
        return ajax.get(`http://192.168.4.1/setDate1?dateH=${params.payload.date1Hours}&dateM=${params.payload.date1Minutes}`)
    })
);

const giveNowEpic = (action$, state$) => action$.pipe(
    ofType('GIVE'),
    switchMap(() => {
        return ajax.get(`http://192.168.4.1/giveNow`)
    })
);


export default combineEpics(
    connectToAPEpic,
    setDateEpic,
    setDate1Epic,
    giveNowEpic,
);
