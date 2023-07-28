export const connectAp = (ssid, password) => ({
  type: 'CONNECT_AP',
  payload: { ssid, password },
});

export const setTime = (date1Hours, date1Minutes, dateHours, dateMinutes) => ({
  type: 'SET_TIME',
  payload: { date1Hours, date1Minutes, dateHours, dateMinutes },
});

export const setTime1 = (date1Hours, date1Minutes) => ({
  type: 'SET_TIME1',
  payload: { date1Hours, date1Minutes },
});

export const giveNow = () => ({
  type: 'GIVE',
});