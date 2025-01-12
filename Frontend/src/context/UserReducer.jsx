import { ACTIONS } from "./UserContext";

export function UserReducer(state,action){

    switch (action.type) {

        case ACTIONS.GET_USERS:
            return {...state, users : action.payload.users}
        
        case ACTIONS.GET_USER:
            return {...state, user : action.payload.user}

        case ACTIONS.CREATE_USER:
            return {...state, users : [...state.users,action.payload.user]}    

        case ACTIONS.EDIT_USER:
            return {
                ...state, 
                users: state.users.map((user) => (
                    user.id === action.payload.user.id ? action.payload.user : user
                ))
            }

        case ACTIONS.DELETE_USER:
            return {...state, 
                users : state.users.filter((user) => (
                    user.id !== action.payload.userId
                ))}
            
    
        default:
            return state;
    }

}