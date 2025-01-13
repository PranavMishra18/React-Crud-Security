import React, { createContext, useReducer } from "react";
import { UserReducer } from "./UserReducer";
import axios from "axios";
import axiosInstance from "../components/auth/axiosInstance";

export const UserContext = createContext();

export const ACTIONS = {
  GET_USERS: "get-users",
  GET_USER: "get-user",
  CREATE_USER: "create-user",
  DELETE_USER: "delete-user",
  EDIT_USER: "edit-user",
  SET_AUTH: "set-auth",
  CLEAR_AUTH: "clear-auth",
};

export function UserContextProvider({ children }) {
  const initialState = {
    users: [],
    user: {},
    auth: localStorage.getItem("jwtToken")
      ? JSON.parse(atob(localStorage.getItem("jwtToken").split(".")[1]))
      : null,
  };
  const [state, dispatch] = useReducer(UserReducer, initialState);

  const baseUrl = "http://localhost:8080";

  async function login(credentials) {
    const response = await axiosInstance.post("/login", credentials);
    const { token } = response.data;

    if (token) {
      localStorage.setItem("jwtToken", token);
      const payload = JSON.parse(atob(token.split(".")[1]));

      // Log payload for debugging purposes
      console.log("Logged in user payload: ", payload);
      const cleanedRole = payload.role.replace(/[\[\]"]/g, "");

      dispatch({
        type: ACTIONS.SET_AUTH,
        payload: { email: payload.sub, role: cleanedRole },
      });
    }
  }

  function logout() {
    // Clear token and auth info
    localStorage.removeItem("jwtToken");
    dispatch({ type: ACTIONS.CLEAR_AUTH });
  }

  async function getUsers() {
    console.log("getUsers function called"); // Add this log to check
    try {
      const response = await axiosInstance.get(`/public/users`);
      console.log(response);

      const { data } = response;
      dispatch({ type: ACTIONS.GET_USERS, payload: { users: data } });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  async function getUser(userId) {
    const response = await axiosInstance.get(`/user/${userId}`);

    const { data } = response;

    dispatch({ type: ACTIONS.GET_USER, payload: { user: data } });

    return data;
  }

  async function editUser(userId, user) {
    const response = await axiosInstance.put(`/user/${userId}`, user);

    const updatedUser = response.data;

    dispatch({ type: ACTIONS.EDIT_USER, payload: { user: updatedUser } });
  }

  async function createUser(user) {
    await axiosInstance.post(`/user`, user);
    dispatch({ type: ACTIONS.CREATE_USER, payload: { user: user } });
  }

  async function deleteUser(userId) {
    await axiosInstance.delete(`/user/${userId}`);
    dispatch({ type: ACTIONS.DELETE_USER, payload: { userId: userId } });
  }

  return (
    <UserContext.Provider
      value={{
        login,
        logout,
        getUsers,
        getUser,
        createUser,
        editUser,
        deleteUser,
        ...state,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
