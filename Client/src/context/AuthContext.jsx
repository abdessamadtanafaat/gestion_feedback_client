/* eslint-disable react-refresh/only-export-components */
import {createContext, useReducer, useEffect, useState} from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) =>{
    switch (action.type) {
        case 'LOGIN' :
            return {user : action.payload, loading: false}
        case 'LOGOUT' :
            return{user : null, loading: false}
        default:
            return state
    }
}

export const AuthContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(authReducer,{
        user: null,
        loading: true,
    })

    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        const user  = localStorage.getItem('token')
        if(user)
        {
            dispatch({type: 'LOGIN', payload: user})
        }
        console.log(user);
        setLoading(false);

    },[])

  console.log('Authcontext state: ', state);
  if (loading) {
    return <div>Loading...</div>;
  }


    return (
        <AuthContext.Provider value = {{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )

}