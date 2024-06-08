import {Outlet, Navigate} from 'react-router-dom'
import useAuthContext from '../hooks/useAuthContext';

const PrivateRoutes = ()=>{
    const {user} = useAuthContext();

    
    return(
        user ? <Outlet/> : <Navigate to="/" />
    )


}
export default PrivateRoutes;

