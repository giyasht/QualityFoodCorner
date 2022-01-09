import axios from 'axios';
const API = process.env.REACT_APP_BACKEND_API

export const addDeveloperDatabase = async (userId, token, developer) => {
    try {

        let formData = new FormData();

        formData.append('name', developer.name)
        formData.append('email', developer.email)
        formData.append('facebook', developer.facebook)
        formData.append('instagram', developer.instagram)
        formData.append('linkedin', developer.linkedin)
        formData.append('developerImage', developer.developerImage)

        const response = await axios.post(`${API}/developer/create/${userId}`, formData, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        })

        if (response) {
            console.log(response);
            return response
        }
        
    } catch (error) {
        console.log(error.response);
        return error.response;
    }
}