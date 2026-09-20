import api from "./axios";

export const registerUser = async function(userdata){
    const response = await api.post('auth/register',userdata);
    return response.data;
}

export const loginUser = async function(userdata){
    const response = await api.post('auth/login', userdata);
    return response.data;
}