import api from './axios';

export const createTaskApi = async function(data){
    const response = await api.post('tasks/create',data);
    return response.data;
}

export const getAllTaskApi = async function(){
    const response =  await api.get('tasks');
    return response.data;
}

export const deleteTaskApi = async function(id){
    const response = await api.delete(`tasks/delete/${id}`);
    return response.data;
}