import axios from "axios";

const API_URL = 'http://localhost:8080/api/v1/business/';


export async function getBusinessByUser(token) {
    try {
        const response = await axios.get(`${API_URL}list-businesses`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        
        console.error("Error fetching businesses:", error);
        throw error; 
    }
}
export async function getBusinessCategories(token) {
    try {
        const response = await axios.get(`${API_URL}list-categories?page=0&limit=15`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        
        console.error(error);
        throw error; 
    }
}

export async function getBusinessByCatg(token,catgId) {
    try {
        const response = await axios.get(`${API_URL}list-types/${catgId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        
        console.error("Error fetching businesses:", error);
        throw error; 
    }
}
export async function getBusinessDetails(token,businessId) {
    try {
        const response = await axios.get(`${API_URL}business-detail/${businessId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        
        console.error( error);
        throw error; 
    }
}

export async function updateBusiness(token,businessId,business) {
    try {
        const response = await axios.patch(`${API_URL}update-business/${businessId}`,business, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        
        console.error( error);
        throw error; 
    }
}
export async function createBusiness(token, businessData, typeId, file) {
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('businessName', businessData.businessName);
        formData.append('email', businessData.email);
        formData.append('phone', businessData.phone);
        formData.append('address', businessData.address);
        formData.append('facebookLink', businessData.facebookLink);
        formData.append('instagramLink', businessData.instagramLink);
        formData.append('googleLink', businessData.googleLink);

        const createUrl = `${API_URL}add/${typeId}`;
        const response = await axios.post(createUrl, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data' // Specify content type as multipart/form-data
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating business:", error);
        throw error;
    }
}




