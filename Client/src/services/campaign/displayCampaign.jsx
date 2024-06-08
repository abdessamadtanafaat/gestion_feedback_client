import axios from "axios";


const API_URL = 'http://localhost:8080/api/v1/campaignInteractor/';


export async function getCampaign(campaignId) {
    try {
    const response = await axios.get(`${API_URL}${campaignId}`);
    return response.data;
    } 
    catch (error) {
    console.error(error);
    throw error; 
}
}

export async function saveAnswer(campaignId, formData) {
    try {
    const response = await axios.post(`${API_URL}save-answer/${campaignId}`, formData);
    return response.data;
    } 
    catch (error) {
    console.error(error);
    throw error; 
}
}

export async function updateAnswer(customerId, formData, campaignId) {
    try {
    const response = await axios.patch(`${API_URL}update-info/${customerId}/${campaignId}`, formData);
    return response.data;
    } 
    catch (error) {
    console.error(error);
    throw error; 
}
}

