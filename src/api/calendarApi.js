import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVaribles';

const { VITE_API_URL } = getEnvVariables();

const calendarApi = axios.create({
    baseURL: VITE_API_URL,
})

export default calendarApi;