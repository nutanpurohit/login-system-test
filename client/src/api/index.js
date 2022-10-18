import axios from 'axios'
import { toast } from 'react-toastify'

const RegisterAPI = async (credentials) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/users/register`,
            credentials
        )
        if (response.status === 201) {
            toast.success('User registered successfully')
        }
        return response
    } catch (error) {
        toast.error(error?.response?.data?.message || 'something went wrong')
    }
}

const LoginAPI = async (credentials) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/users/login`,
            credentials
        )
        if (response.status === 200) {
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('email', credentials.email)
            toast.success('Logged in successfully')
        }
        return response
    } catch (error) {
        toast.error(error?.response?.data?.message || 'something went wrong')
        return error?.response
    }
}

export { RegisterAPI, LoginAPI }
