export function toFormData(values: Record<string, string | Blob>){
    const formData = new FormData()
    for (const [key, value] of Object.entries(values)) formData.append(key, value)
    return formData
}