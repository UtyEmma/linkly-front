class Str extends String {
    str: string = ''

    constructor(){
        super()
    }

    parse(str: string){
        this.str = str
        return this;
    }

    copy() : typeof this {
        navigator.clipboard.writeText(this.str)
        return this
    }

    async share(data: {
        title: string,
        text: string
    }) : Promise<this> {
        const shareInfo = {...data, url: this.str}
        const share = async () => navigator.share(shareInfo)
        await share()
        return this
    }



}

export default new Str()