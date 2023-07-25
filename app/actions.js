export const connectAp = (ssid, password) => ({
  type: 'CONNECT_AP',
  payload: { ssid, password },
});