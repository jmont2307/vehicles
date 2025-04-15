import { Vehicle } from './Vehicle.js';

export class Motorbike extends Vehicle {
  private engineSize: number;
  private bikeType: string;

  constructor(
    id: string,
    make: string,
    model: string,
    year: number,
    color: string,
    engineSize: number,
    bikeType: string
  ) {
    super(id, make, model, year, color);
    this.engineSize = engineSize;
    this.bikeType = bikeType;
  }

  getEngineSize(): number {
    return this.engineSize;
  }

  getBikeType(): string {
    return this.bikeType;
  }

  getInfo(): string {
    return `${super.getInfo()} | Engine: ${this.engineSize}cc | Type: ${this.bikeType}`;
  }

  drive(): string {
    return `The ${this.getInfo()} roars to life and speeds away.`;
  }

  wheelie(): string {
    return `The ${this.getInfo()} pops a wheelie and zooms forward on its back wheel!`;
  }

  rev(): string {
    return `The ${this.getInfo()} revs its ${this.engineSize}cc engine loudly: VROOM VROOM!`;
  }

  displayActions(): string[] {
    return ["Drive", "Wheelie", "Rev Engine"];
  }

  performAction(action: string): string {
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