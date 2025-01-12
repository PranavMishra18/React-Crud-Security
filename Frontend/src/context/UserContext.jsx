import React, { createContext, useReducer } from 'react'
import { UserReducer } from './UserReducer';
import axios from 'axios';

export const UserContext = createContext();

export const ACTIONS = {
    GET_USERS : 'get-users',    
    GET_USER : 'get-user',    
    CREATE_USER : 'create-user',    
    DELETE_USER : 'delete-user', 
    EDIT_USER : 'edit-user'

}


export function UserContextProvider({children}){


    const initialState = {
        users : [],
        user : {}
    };
    const[state,dispatch] = useReducer(UserReducer,initialState)

    const baseUrl = "http://localhost:8080";

    async function getUsers(){

        const response = await axios.get(`${baseUrl}/users`);

        const {data} = response;

        dispatch({type : ACTIONS.GET_USERS,payload : {users : data}})

    }

    async function getUser(userId){

        const response = await axios.get(`${baseUrl}/user/${userId}`);

        const {data} = response;                

        dispatch({type : ACTIONS.GET_USER,payload : {user : data}})

        return data;

    }

    async function editUser(userId,user){

        const response = await axios.put(`${baseUrl}/user/${userId}`,user);

        const updatedUser = response.data;

        dispatch({type : ACTIONS.EDIT_USER,payload : {user : updatedUser}});

        

    }

    async function createUser(user){

        await axios.post(`${baseUrl}/user`,user);
        dispatch({type : ACTIONS.CREATE_USER,payload : {user : user}});

    }

    async function deleteUser(userId){

        await axios.delete(`${baseUrl}/user/${userId}`)
        dispatch({type : ACTIONS.DELETE_USER,payload : {userId : userId}})

    }




    return (
        <UserContext.Provider value={{getUsers,getUser,createUser,editUser,deleteUser,...state}}>
            {children}
        </UserContext.Provider>
    )

}


export default UserContext