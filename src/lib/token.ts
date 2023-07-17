import Cookies from 'js-cookie';
import jwtDecode from "jwt-decode"
import CONST from './constants';

export const isGoodToken = (): boolean => {
  try {
    const token = Cookies.get(CONST.ACCESS_TOKEN);
    let expired = true;
    if (token) {
      expired = Date.now() >= (jwtDecode<{ exp: number }>(token).exp * 1000);
    }
    return expired ? false : true
  } catch (e: any) {
    return false;
  }
}

export const saveToken = (jwt?: string) => {
  if (jwt) {
    Cookies.set(CONST.ACCESS_TOKEN, jwt);
  }
}

export const getToken = () => {
  return Cookies.get(CONST.ACCESS_TOKEN) as string ?? '';
}