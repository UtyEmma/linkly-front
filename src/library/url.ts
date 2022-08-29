import { getSubdomain } from "tldts";

export const subdomain = () : {value: string | null, exists: boolean} => {
    const url = window.location.origin
    const subdomain = getSubdomain(url, { validHosts: ['localhost'] })
    const regEx = /^www./
    const value = subdomain?.match(regEx) ? subdomain.replace(regEx, '') : subdomain
    const exists = !!subdomain
    return {value, exists}
}