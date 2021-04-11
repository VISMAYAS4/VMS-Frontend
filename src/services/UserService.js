import authHeader from ".//auth-header";
import axios from 'axios';

const User_API_BASE_URL = "http://localhost:8081/api/v1/users";
class UserService{
    viewUsers(){
        return axios.get(User_API_BASE_URL, {headers: authHeader()});
    }
    addUser(user){
        return axios.post(User_API_BASE_URL,user, {headers: authHeader()});
    }
    deleteUser(userId){
        return axios.delete(User_API_BASE_URL+'/'+ userId, {headers: authHeader()});
    }
    updateUser(user, userId){
        return axios.put(User_API_BASE_URL +'/'+ userId, user, {headers: authHeader()});
    }
    getUserById(userId){
        return axios.get(User_API_BASE_URL +'/'+  userId, {headers: authHeader()});
    }
}
export default new UserService()