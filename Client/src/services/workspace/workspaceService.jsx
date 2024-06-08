import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/campaign/";

export async function getAllCampaignDisplays(token) {
    try {
        const response = await axios.get(`${API_URL}displays`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching QR codes:", error);
        throw error;
    }
}

export async function getCampaignsOverView(token) {
    try {
        const response = await axios.get(`${API_URL}OverView/all`, {
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

export async function getCampaignDetails(token, campaignId) {
    try {
        const response = await axios.get(`${API_URL}campaign-detail/${campaignId}`, {
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


export async function getCustomersByGender(token, campaignId) {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/customers/${campaignId}/gender`, {
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
export async function getCustomersByAge(token, campaignId) {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/customers/${campaignId}/age`, {
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

export async function getAllCustomers(token, campaignId) {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/customers/${campaignId}/all`, {
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

export async function getAvgRateService(token, campaignId) {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/customers/${campaignId}/avg-rating-services`, {
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