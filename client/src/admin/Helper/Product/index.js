import axios from 'axios';

const API = process.env.REACT_APP_BACKEND_API

export const addProduct = async (userId, token, product) => {
    try {

        console.log(product);

        let formData = new FormData();

        formData.append('name', product.name)
        formData.append('description', product.description)
        formData.append('price', product.price)
        formData.append('category', product.category)
        formData.append('stock', product.stock)
        formData.append('photo', product.photo)
        formData.append('photoUrl', product.photoUrl)

        const response = await axios.post(`${API}/product/create/${userId}`, formData ,{
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

export const getProductByName = async (productName) => {

    try {

        const response = await fetch(`${API}/product/name/${productName}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })

        if (response) {
            return response.json()
        }
        
    } catch (error) {
        return console.log(error.response);
    }
}