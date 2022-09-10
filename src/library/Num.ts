class Num {

    percentage(val: number, base: number) : number {
        return (val / base) * 100
    }

    percentageValue(percent: number, base: number) {
        return (percent / 100) * base
    }



}

export default new Num()