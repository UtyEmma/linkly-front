export const HttpErrors = {
    map: (errors: any) => {
        const allErrors: {[field: string]: Array<string>} = errors.errors
        let object : Record<string, any> = {}
        if (allErrors) for (const [key, value] of Object.entries(allErrors)) object[key] = value[0]
        return object;
    }


}