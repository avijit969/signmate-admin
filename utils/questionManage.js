const createMultipleChoiceQuestion = async (formDate) => {

    try {
        const response = await axios({
            method: "post",
            url: `${import.meta.env.VITE_API_URL}/questions/choose_correct_sign`,
            data: formDate,
            headers: {
                "Content-Type": "multipart/form-data",
            },
            withCredentials: true
        })
        console.log(response.data)
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
    } catch (error) {
        return {
            success: false,
            message: error.response?.data.message
        }
    }
}

// const create matching question
const createMatchingQuestion = async (formDate) => {
    try {
        const response = await axios({
            method: "post",
            url: `${import.meta.env.VITE_API_URL}/questions/match_sign`,
            data: formDate,
            headers: {
                "Content-Type": "multipart/form-data",
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
    } catch (error) {
        return {
            success: false,
            message: error.response?.data.message
        }
    }
}

// create text to sign question
const createTextToSignQuestion = async (formDate) => {
    try {
        const response = await axios({
            method: "post",
            url: `${import.meta.env.VITE_API_URL}/questions/sign_to_text`,
            data: formDate,
            headers: {
                "Content-Type": "multipart/form-data",
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
    } catch (error) {
        return {
            success: false,
            message: error.response?.data.message
        }

    }

}

// create sign drawing question
const createSignDrawingQuestion = async (formDate) => {
    try {
        const response = await axios({
            method: "post",
            url: `${import.meta.env.VITE_API_URL}/questions/write_sign`,
            data: formDate,
            headers: {
                "Content-Type": "multipart/form-data",
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
    } catch (error) {
        return {
            success: false,
            message: error.response?.data.message
        }
    }

}
// crate yes no question
const createYesNoQuestion = async (formDate) => {
    try {
        const response = await axios({
            method: "post",
            url: `${import.meta.env.VITE_API_URL}/questions/yes_no`,
            data: formDate,
            headers: {
                "Content-Type": "multipart/form-data",
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
    } catch (error) {
        return {
            success: false,
            message: error.response?.data.message
        }
    }

}

export { createMultipleChoiceQuestion, createMatchingQuestion, createTextToSignQuestion, createSignDrawingQuestion, createYesNoQuestion }