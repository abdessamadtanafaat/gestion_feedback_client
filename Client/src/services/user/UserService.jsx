import axios from "axios";


const API_URL = 'http://localhost:8080/api/v1/auth/';

export async function saveUser(user) {
    const registerUrl = `${API_URL}register`;
    return await axios.post(registerUrl, user);
}





export async function loginUser(authRequest) {
    const authenticateUrl = `${API_URL}authenticate`;
    return await axios.post(authenticateUrl, authRequest);
}

export async function refreshToken(refreshToken) {
    const refreshTokenUrl = `${API_URL}refresh-token`;
    return await axios.post(refreshTokenUrl, { refreshToken });
    
}

export async function sendResetPassRequest(username) {
    try {
        const response = await axios.post(`http://localhost:8080/api/v1/auth/reset-password?username=${username}`);
        return response.data;
    } catch (error) {
        
        console.error(error);
        throw error; 
    }
}

export async function resetPassword(request, token) {
    try {
        const response = await axios.post(`http://localhost:8080/api/v1/auth/reset-password-process?token=${token}`, request);
        return response.data;
    } catch (error) {
        
        console.error(error);
        throw error; 
    }
}


export async function getProfileData(token) {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/users/profile`, {
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

export async function updateProfileData(token, profileData) {
    try {
        const formData = new FormData();
        formData.append('userId', profileData.userId);
        formData.append('username', profileData.username);
        formData.append('firstName', profileData.firstName);
        formData.append('lastName', profileData.lastName);
        formData.append('phone', profileData.phone);
        if (profileData.birthDate) {
            formData.append('birthDate', profileData.birthDate);
        } else {
            formData.append('birthDate', ''); // or you can choose to omit it
        }

        const updateUrl = `http://localhost:8080/api/v1/users/update-profile`;
        const response = await axios.patch(updateUrl, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function updatePhoto(token,formData) {
    try{
    const response = await axios.put(`http://localhost:8080/api/v1/users/upload-photo`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,   
        }
    });
    return response.data;
    } catch (error) {
    console.error(error);
    throw error;
}
}

export async function updatePassword(token,changePasswordRequest) {
    try{
    const response = await axios.patch(`http://localhost:8080/api/v1/users`, changePasswordRequest, {
        headers: {
            Authorization: `Bearer ${token}`,   
        }
    });
    return response.data;
    } catch (error) {
    console.error(error);
    throw error;
}
}

