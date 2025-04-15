import { Vehicle } from './Vehicle.js';
export class Truck extends Vehicle {
    constructor(id, make, model, year, color, bedLength, towingCapacity) {
        super(id, make, model, year, color);
        this.bedLength = bedLength;
        this.towingCapacity = towingCapacity;
    }
    getBedLength() {
        return this.bedLength;
    }
    getTowingCapacity() {
        return this.towingCapacity;
    }
    getInfo() {
        return `${super.getInfo()} | Bed Length: ${this.bedLength}ft | Towing: ${this.towingCapacity}lbs`;
    }
    drive() {
        return `The ${this.getInfo()} rumbles down the road.`;
    }
    honk() {
        return `The ${this.getInfo()} blasts its horn: HOOOONK!`;
    }
    loadCargo() {
        return `The ${this.getInfo()} loads cargo into its ${this.bedLength}ft bed.`;
    }
    tow() {
        return `The ${this.getInfo()} uses its ${this.towingCapacity}lbs towing capacity to pull a heavy load.`;
    }
    displayActions() {
        return ["Drive", "Honk", "Load Cargo", "Tow"];
    }
    performAction(action) {
        switch (action.toLowerCase()) {
            case "drive":
                return this.drive();
            case "honk":
                return this.honk();
            case "load cargo":
                return this.loadCargo();
            case "tow":
                return this.tow();
            default:
                return "Invalid action for a truck";
        }
    }
}
