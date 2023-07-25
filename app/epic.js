import { ofType, combineEpics } from "redux-observable";
import { bufferCount, empty, from, map, mergeAll, of, toArray } from "rxjs";
import { catchError, ignoreElements, mapTo, switchMap, timeout } from "rxjs/operators";
import { ajax } from 'rxjs/ajax';


const connectToAPEpic = (action$, state$) => action$.pipe(
    ofType('CONNECT_AP'),
    switchMap((params) => {
        return ajax.get(`http://192.168.4.1/connect?ssid=${params.payload.ssid}&password=${params.payload.password}`)
    })
);


export default combineEpics(
    connectToAPEpic,
);
