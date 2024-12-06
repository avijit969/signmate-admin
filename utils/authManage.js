import axios from 'axios'

const login = async (username, password) => {

    try {
        const response = await axios({
            method: "post",
            url: `${import.meta.env.VITE_API_URL}/users/login`,
            data: {
                username,
                password
            },
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        })
        console.log("test")
        if (response.data.success) {
            console.log(response.data.data)
            return {

                data: response.data.data,
                success: true,
                message: response.data.message
            }
        }
        else {
            return {
                success: false,
                message: response.data.message
            }
        }
    } catch (error) {
        return {
            success: false,
            message: error.response?.data.message
        }
    }

}

const signup = async (username, fullName, password, email) => {
    const response = await axios({
        method: 'POST',
        url: `${import.meta.env.API_URL}/users/registerUser`,
        data: {
            username,
            fullName,
            password,
            email
        },
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true
    })

    if (response.data.success) {
        return {
            data: response.data.data,
            success: true,
            message: response.data.message
        }
    }
    else {
        return {
            success: false,
            message: response.data.message
        }
    }
}


export { login, signup }