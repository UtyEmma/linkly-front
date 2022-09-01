import Cookies from 'universal-cookie';

class Cookie {

    private cookies;

    constructor(){
        this.cookies = new Cookies()
    }

    get(name: string){
        return this.cookies.get(name)
    }

    set(name: string, value: any){
        return this.cookies.set(name, value)
    }

    remove(name: string){
        return this.cookies.remove(name)
    }

}
const _cookies = new Cookie()
export default _cookies