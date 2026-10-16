// this file waa api-ga ayuu noo hayaa for all fileds
import axios from "axios";
import useAuthStore from "../store/authStore";

const API_URL = 'https://mentorship-api-xdc1.onrender.com';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

// interceptor to add the Authorization header
api.interceptors.request.use((config)=> {
    // request walba aad sameeneeso token-ka qaado
    const token = useAuthStore.getState().token;

    if(token){
        // hadaa token-ka hesho raac authorization
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
})
// request or response intercepter to add the token 

// request= case markas aan joogno oo ah in api token manuel an u dirayno inuu asi otomatic request walbo uuka daba diro

// response=when data-base error kasoo laabto ama user-ka login waqtiga ka dhamaday marka logout madhaheeno oo wan u cosboonsiinaynaa

export default api;