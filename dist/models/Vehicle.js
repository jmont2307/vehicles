export class Vehicle {
    constructor(id, make, model, year, color) {
        this.id = id;
        this.make = make;
        this.model = model;
        this.year = year;
        this.color = color;
    }
    getId() {
        return this.id;
    }
    getMake() {
        return this.make;
    }
    getModel() {
        return this.model;
    }
    getYear() {
        return this.year;
    }
    getColor() {
        return this.color;
    }
    getInfo() {
        return `${this.year} ${this.color} ${this.make} ${this.model}`;
    }
}
