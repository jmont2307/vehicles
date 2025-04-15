import { Vehicle } from './Vehicle.js';
export class Motorbike extends Vehicle {
    constructor(id, make, model, year, color, engineSize, bikeType) {
        super(id, make, model, year, color);
        this.engineSize = engineSize;
        this.bikeType = bikeType;
    }
    getEngineSize() {
        return this.engineSize;
    }
    getBikeType() {
        return this.bikeType;
    }
    getInfo() {
        return `${super.getInfo()} | Engine: ${this.engineSize}cc | Type: ${this.bikeType}`;
    }
    drive() {
        return `The ${this.getInfo()} roars to life and speeds away.`;
    }
    wheelie() {
        return `The ${this.getInfo()} pops a wheelie and zooms forward on its back wheel!`;
    }
    rev() {
        return `The ${this.getInfo()} revs its ${this.engineSize}cc engine loudly: VROOM VROOM!`;
    }
    displayActions() {
        return ["Drive", "Wheelie", "Rev Engine"];
    }
    performAction(action) {
        switch (action.toLowerCase()) {
            case "drive":
                return this.drive();
            case "wheelie":
                return this.wheelie();
            case "rev engine":
                return this.rev();
            default:
                return "Invalid action for a motorbike";
        }
    }
}
