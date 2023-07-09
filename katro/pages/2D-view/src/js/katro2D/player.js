export default class Player {
    /**
     * 
     * @param {number[]} data 
     */
    constructor(data, max) {
        this.data = data
        this.max = max
    }

    getTotal() {
        return this.data.reduce((prev, current) => prev + current, 0)
    }

    /**
     * 
     * @param {number} start 
     */
    isPartEmpty(start) {
        for (let i = start; i < start + this.max; i++)
            if (this.data[i] > 0) return false
        return true
    }
}