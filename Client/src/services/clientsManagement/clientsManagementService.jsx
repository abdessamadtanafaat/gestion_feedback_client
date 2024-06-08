import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/customers/";

export async function getAllCostumers(token, campaignId) {
    try {
        const response = await axios.get(`${API_URL}identified/${campaignId}`, {
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
