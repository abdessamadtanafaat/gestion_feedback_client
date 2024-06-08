import axios from "axios";


const API_URL = 'http://localhost:8080/api/v1/campaign/';

export async function getAllServiceAreas(token) {
    try {
        const response = await axios.get(`${API_URL}service-areas/all`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        
        console.error("Error fetching service-areas:", error);
        throw error; 
    }
}

export async function getLoyaltyProgrammes(token) {
    try {
        const response = await axios.get(`${API_URL}list-LoyaltyProgrammeType`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        
        console.error("Error fetching", error);
        throw error; 
    }
}

export async function getAllLanguages(token) {
    try {
        const response = await axios.get(`${API_URL}list-languages`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        
        console.error("Error fetching service-areas:", error);
        throw error; 
    }
}

export async function createCampaign(campaignData, token) {
    try {
        const createUrl = `${API_URL}create`;
        const response = await axios.post(createUrl, campaignData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating campaign:", error);
        throw error;
    }
}


export async function updateCampaign(campaignData, campaignId, token) {
    try {
        const updateUrl = `${API_URL}update-campaign/${campaignId}`;
        const response = await axios.patch(updateUrl, campaignData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating campaign:", error);
        throw error;
    }
}

export async function addNewServiceArea(serviceName, token) {
    try {
        const createUrl = `${API_URL}add-new-service`;
        const response = await axios.post(createUrl, serviceName,{
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
export async function createTemplate(token, isStar, file) {
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('userChoice', isStar);
        console.log("hello");
        console.log(formData.get('file'));
        console.log(formData.get('userChoice'));
        console.log("hellloo");
        const createUrl = `${API_URL}create-template`;
        const response = await axios.post(createUrl, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
