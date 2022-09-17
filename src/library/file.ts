export function toBase64(file: any, callback?: any){
    const fileReader = new FileReader()
    fileReader.onloadend = () => {
        const result: any = fileReader.result;
        const base64String =  result
        return callback(base64String)
    }
    return fileReader.readAsDataURL(file)
}