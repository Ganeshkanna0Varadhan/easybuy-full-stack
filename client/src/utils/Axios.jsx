import axios, { AxiosError } from "axios";
import { baseURL, SummaryApi } from "../common/summaryApi";

const Axios = axios.create({
    baseURL: baseURL,
    withCredentials: true
});

Axios.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config
}, (err) => { return Promise.reject(err) });

Axios.interceptors.response.use((response) => {
    return response;
}, async (error) => { 
    const originRequest = error.config;
    if (error?.response && error.response.status === 401 && !originRequest.retry) {
        originRequest.retry = true;
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
            const newAccessToken = await refreshAccessToken(refreshToken);
            if (newAccessToken) {
                originRequest.headers.Authorization = `Bearer ${newAccessToken}`
                return Axios(originRequest);
            }
        }
    }
    
    return Promise.reject(error);
})

const refreshAccessToken = async(refreshToken) => {
    try {
        const response = await Axios({
            ...SummaryApi.refresh_token, 
            headers: {
                Authorization: `Bearer ${refreshToken}`
            }
        })

        const accessToken = response.data.data.accessToken;
        localStorage.setItem('accessToken', accessToken);
        return accessToken;
    }
    catch(err) {
        console.log(err);
    }
}

export default Axios;