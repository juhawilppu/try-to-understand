import axios from 'axios';
import { FETCH_USER, SAVE_USER } from './types';

export const fetchUser = () => async (dispatch : any) => {
    const response = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: response.data });
}

export const saveUser = (dto) => async (dispatch : any) => {
    const response = await axios.put('/api/current_user', dto);
    dispatch({ type: SAVE_USER, payload: response.data });
}