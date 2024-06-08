
import {createContext,useEffect,useState} from 'react';
import useAuthContext from '../hooks/useAuthContext';
const UserContext = createContext({});
import{getProfileData} from '../services/user/UserService'

export const UserContextProvider = ({children}) =>{
    const { user } = useAuthContext();
    const [profileData, setProfileData] = useState({});

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const personalData = await getProfileData(user);
                setProfileData(personalData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProfileData();
        return () => {
        };
    }, [user]);
   



   


    return (
        <UserContext.Provider value = {{
            profileData,
            setProfileData,
            
        }}>
            { children }
        </UserContext.Provider>
    )

}
export default UserContext;