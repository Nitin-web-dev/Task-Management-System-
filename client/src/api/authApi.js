import api from "./axios";

export const registerUser = async function(userdata){
    const response = await api.post('auth/register',userdata);
    return response.data;
}

export const loginUser = async function(userdata){
    const response = await api.post('auth/login', userdata);
    return response.data;
}


// iam using it to check token and check authentication and protected route
export const checkAuthStatus = async function(){
    const response = await api.get("auth/me");
    return response.data;
}