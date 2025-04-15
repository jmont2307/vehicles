export abstract class Vehicle {
  protected id: string;
  protected make: string;
  protected model: string;
  protected year: number;
  protected color: string;

  constructor(id: string, make: string, model: string, year: number, color: string) {
    this.id = id;
    this.make = make;
    this.model = model;
    this.year = year;
    this.color = color;
  }

  getId(): string {
    return this.id;
  }

  getMake(): string {
    return this.make;
  }

  getModel(): string {
    return this.model;
  }

  getYear(): number {
    return this.year;
  }

  getColor(): string {
    return this.color;
  }

  getInfo(): string {
    return `${this.year} ${this.color} ${this.make} ${this.model}`;
  }

  abstract drive(): string;

  abstract displayActions(): string[];
}