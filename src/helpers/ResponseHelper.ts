const ResponseData = (status: number, message: string | null, data: any | null, error: any | null) => {
    if(error instanceof Error) {
        return {
            status: status,
            message: message,
            errors: error.message,
            data: null
        }
    }

    return {
        status: status,
        message: message,
        errors: error,
        data: data
    }
}


export default ResponseData;