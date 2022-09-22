import Str from "./Str";

export function copy(link: string){
    navigator.clipboard.writeText(link);
}

export function share(link: string, title: string){
    Str.parse(link).share({
        title: title,
        text: "Copy or Share your page link on your social circles"
    })
}