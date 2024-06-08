import useAuthContext from './useAuthContext';
import { useNavigate } from "react-router-dom";

export const useLogout = ()=>{

    const navigate = useNavigate();
    const {dispatch} = useAuthContext();
    const logout = ()=>{
        //remove user from storage 
        localStorage.removeItem('token');

        //dispatch logout action
        dispatch({type: 'LOGOUT'})

        //navigate to the login page 
        navigate('/')
    }
    return {logout};

}