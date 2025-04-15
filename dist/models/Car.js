import { Vehicle } from './Vehicle.js';
export class Car extends Vehicle {
    constructor(id, make, model, year, color, doors, type) {
        super(id, make, model, year, color);
        this.doors = doors;
        this.type = type;
    }
    getDoors() {
        return this.doors;
    }
    getType() {
        return this.type;
    }
    getInfo() {
        return `${super.getInfo()} | Type: ${this.type} | Doors: ${this.doors}`;
    }
    drive() {
        return `The ${this.getInfo()} revs its engine and zooms down the street.`;
    }
    honk() {
        return `The ${this.getInfo()} honks its horn: BEEP BEEP!`;
    }
    park() {
        return `The ${this.getInfo()} parks neatly between the lines.`;
    }
    displayActions() {
        return ["Drive", "Honk", "Park"];
    }
    performAction(action) {
        switch (action.toLowerCase()) {
            case "drive":
                return this.drive();
            case "honk":
                return this.honk();
            case "park":
                return this.park();
            default:
                return "Invalid action for a car";
        }
    }
}
