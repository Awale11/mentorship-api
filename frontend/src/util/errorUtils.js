// Global error management. wixi qalad api-ga quseeya. wa complete error management

export const extractErrorMessages = (error)=> {
     if(!error) return null;

     if(error.response?.data) {
        const data = error.response.data;

        // handle Zod validation error (array format)

        if(data.errors && Array.isArray(data.errors)) {
            return data.errors.map(err => err.message).join(',');
        }

        // handle single error message
        if(data.message) {
            return data.message;
        }

        // handle error field
        if(data.error) {
            return data.error
        }
     }
    //  Api-ga qaladkiisa halkan ayuu ku egyhy

    // handle network errors=sometimes network errors aya dhici kara
    if(error.request && !error.response) {
        return 'Network Error, Please Check Your Connection' 
    }

    // Fall back to general error=
    if(error.message) {
        return error.message
    }

    // hadii waxan dhan la waayo oo qaladkale uu jiro
    return 'Something went wrong, please try again'
}