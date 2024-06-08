/* eslint-disable react-refresh/only-export-components */
import {createContext, useState} from 'react';

const BusinessContext = createContext({});


export const BusinessContextProvider = ({children}) =>{
    const [selectedOption, setSelectedOption] = useState(false);
    const[selectedBusiness, setSelectedBusiness] = useState({
        businessCatgId: "",
        businessTypeId: "",
        
      });
      const [businessData, setBusinessData] = useState({
        businessName: "",
        email: "",
        phone: "",
        address: "",
        facebookLink: "",
        instagramLink: "",
        googleLink: ""
        
      });
      const [file, setFile] = useState(null);
      const [selectedImage, setSelectedImage] = useState(null);
      const resetForm = () => {
        setSelectedBusiness({
            businessCatgId: "",
            businessTypeId: "",
        });

        setBusinessData({
            businessName: "",
            email: "",
            phone: "",
            address: "",
            facebookLink: "",
            instagramLink: "",
            googleLink: ""
        });
        setFile(null);
        setSelectedImage(null);
        setSelectedOption(false);

    };
   


    return (
        <BusinessContext.Provider value = {{
            selectedBusiness,
            setSelectedBusiness,
            businessData,
            setBusinessData,
            resetForm,
            file,
            setFile,
            selectedImage, setSelectedImage,
            selectedOption, setSelectedOption
        }}>
            { children }
        </BusinessContext.Provider>
    )

}
export default BusinessContext;