import { useRef, useState } from "react";
import useAuthContext from './useAuthContext';
import { loginUser } from '../services/user/UserService'
import { useNavigate } from "react-router-dom";
export const useLogin = () =>{

    const[error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const errRef = useRef();
    const {dispatch} = useAuthContext();
    const navigate = useNavigate();
    
    
    const login = async (username, password) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await loginUser({ username, password });
            // Save relevant data to local storage
            localStorage.setItem('token', response.data.accessToken);
            // Update the auth context
            dispatch({ type: 'LOGIN', payload: response.data.accessToken});
            //navigate to workspace
            navigate('/Workspace')
        } catch (error) {
            // Handle error
            setError(error?.response?.data); 
            errRef.current.focus();

        } finally {
            // Ensure loading indicator is turned off whether login succeeds or fails
            setIsLoading(false); 
        }
    };
    
    return { login, isLoading,setError, error, errRef };

}