import axios from "axios"
import { AppDispatch } from "../store"
import { getToken } from "./token";

const baseUrl = 'https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1';
export interface DefaultAxiosResponse {
  data: {
    status: boolean
    message: string
    data: any
  }
}

export interface AnyReduxState<T> {
  error?: boolean
  message?: string | null
  loading?: boolean
  data?: T | null
}

const reduxRequest = <T>(method: 'post' | 'get' | 'delete' | 'put' | 'patch' = 'post', url: string, data: { [key: string]: string }, reduxAction: (state: AnyReduxState<T>) => {
  payload: AnyReduxState<T>;
  type: string;
}) => async (dispatch: AppDispatch) => {
  try {
    dispatch(reduxAction({ loading: true }));
    const res = await axios({
      method: method,
      url: baseUrl + url,
      data: data,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getToken()
      }
    });
    console.log('backend res - ', res)
    if (res.data.status) {
      dispatch(reduxAction({ loading: false, error: false, data: res.data.data }));
    } else {
      dispatch(reduxAction({ loading: false, error: true, message: 'Request failed' }));
    }
  } catch (e: any) {
    console.log('backend err - ', e)
    dispatch(reduxAction({ loading: false, error: true, message: e?.response?.data?.message || e.message }));
  }
}

export default reduxRequest;