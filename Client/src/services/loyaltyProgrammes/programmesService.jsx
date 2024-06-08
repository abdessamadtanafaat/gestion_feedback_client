import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/campaign/";

export async function addMysteryBoxConfig(token, campaignId, programmeConfig) {
    try {
        const response = await axios.patch(`${API_URL}mystery-box/config/${campaignId}`,programmeConfig ,{
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

export async function updateMysteryBoxConfig(token, prizeId, config) {
    try {
        const response = await axios.patch(`${API_URL}prize-config/details/update/${prizeId}`, config,{
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

export async function deletePrizeConfig(token, prizeId) {
    try {
        const response = await axios.delete(`${API_URL}delete-prize/${prizeId}`,{
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

export async function getMysteryBoxConfigs(token,campaignId) {
    try {
        const response = await axios.get(`${API_URL}Mystery-box/config/all/${campaignId}`,{
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

export async function getMysteryBoxWinners(token, campaignId) {
    try {
        const response = await axios.get(`${API_URL}Mystery-box/winner-list/${campaignId}`,{
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

{/*------------------------------------------------------------------------------*/}


export async function addCouponCodeConfig(token, campaignId, programmeConfig) {
    try {
        const response = await axios.patch(`${API_URL}Coupon-code/config/${campaignId}`, programmeConfig,{
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

export async function updateCouponCodeConfig(token, couponId, discountConfigData) {
    try {
        const response = await axios.patch(`${API_URL}coupon-config/details/update/${couponId}`, discountConfigData,{
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

export async function deleteCouponCodeConfig(token, couponId) {
    try {
        const response = await axios.delete(`${API_URL}delete-coupon/${couponId}`,{
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




export async function getCouponCodeConfigByCampaign(token, campaignId) {
    try {
        const response = await axios.get(`${API_URL}coupon-code/config/all/${campaignId}`,{
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

export async function getListOfWinnersByGroup(token, couponGroupId) {
    try {
        const response = await axios.get(`${API_URL}coupon-winners/${couponGroupId}`,{
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


export async function updateClientAmbassadorConfig(token, campaignId, programmeConfig) {
    try {
        const response = await axios.patch(`${API_URL}client-ambassador/config/${campaignId}`,programmeConfig ,{
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

export async function hasAmysteryBoxProgram(token, campaignId) {
    try {
        const response = await axios.get(`${API_URL}has-MysteryBox-program/${campaignId}`,{
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

export async function hasAcouponCodeProgram(token, campaignId) {
    try {
        const response = await axios.get(`${API_URL}has-Discount-program/${campaignId}`,{
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


