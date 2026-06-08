export default class Epic {
    constructor(name) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.tickets = [];
    }
}