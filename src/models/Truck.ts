import { Vehicle } from './Vehicle.js';

export class Truck extends Vehicle {
  private bedLength: number;
  private towingCapacity: number;

  constructor(
    id: string,
    make: string,
    model: string,
    year: number,
    color: string,
    bedLength: number,
    towingCapacity: number
  ) {
    super(id, make, model, year, color);
    this.bedLength = bedLength;
    this.towingCapacity = towingCapacity;
  }

  getBedLength(): number {
    return this.bedLength;
  }

  getTowingCapacity(): number {
    return this.towingCapacity;
  }

  getInfo(): string {
    return `${super.getInfo()} | Bed Length: ${this.bedLength}ft | Towing: ${this.towingCapacity}lbs`;
  }

  drive(): string {
    return `The ${this.getInfo()} rumbles down the road.`;
  }

  honk(): string {
    return `The ${this.getInfo()} blasts its horn: HOOOONK!`;
  }

  loadCargo(): string {
    return `The ${this.getInfo()} loads cargo into its ${this.bedLength}ft bed.`;
  }

  tow(): string {
    return `The ${this.getInfo()} uses its ${this.towingCapacity}lbs towing capacity to pull a heavy load.`;
  }

  displayActions(): string[] {
    return ["Drive", "Honk", "Load Cargo", "Tow"];
  }

  performAction(action: string): string {
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