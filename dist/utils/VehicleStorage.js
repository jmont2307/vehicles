import { Car } from '../models/Car.js';
import { Truck } from '../models/Truck.js';
import { Motorbike } from '../models/Motorbike.js';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export class VehicleStorage {
    constructor() {
        this.filePath = path.join(__dirname, '../../data/vehicles.json');
        this.vehicles = [];
        this.init();
    }
    init() {
        try {
            // Create the data directory if it doesn't exist
            const dataDir = path.join(__dirname, '../../data');
            if (!fs.existsSync(dataDir)) {
                fs.mkdirSync(dataDir, { recursive: true });
            }
            // Create the file if it doesn't exist
            if (!fs.existsSync(this.filePath)) {
                fs.writeFileSync(this.filePath, JSON.stringify(this.generateSampleVehicles(), null, 2));
            }
            // Load vehicles from file
            const data = fs.readFileSync(this.filePath, 'utf-8');
            const vehiclesData = JSON.parse(data);
            this.vehicles = vehiclesData.map((vehicle) => {
                if (vehicle.type === 'car') {
                    return new Car(vehicle.id, vehicle.make, vehicle.model, vehicle.year, vehicle.color, vehicle.doors, vehicle.carType);
                }
                else if (vehicle.type === 'truck') {
                    return new Truck(vehicle.id, vehicle.make, vehicle.model, vehicle.year, vehicle.color, vehicle.bedLength, vehicle.towingCapacity);
                }
                else if (vehicle.type === 'motorbike') {
                    return new Motorbike(vehicle.id, vehicle.make, vehicle.model, vehicle.year, vehicle.color, vehicle.engineSize, vehicle.bikeType);
                }
                return null;
            }).filter(Boolean);
        }
        catch (error) {
            console.error('Error initializing vehicle storage:', error);
            this.vehicles = this.generateSampleVehicles();
            this.save();
        }
    }
    generateSampleVehicles() {
        return [
            new Car(uuidv4(), 'Toyota', 'Camry', 2022, 'Blue', 4, 'Sedan'),
            new Car(uuidv4(), 'Honda', 'Civic', 2021, 'Red', 4, 'Sedan'),
            new Truck(uuidv4(), 'Ford', 'F-150', 2023, 'Black', 6.5, 13000),
            new Truck(uuidv4(), 'Chevrolet', 'Silverado', 2022, 'White', 5.8, 10000),
            new Motorbike(uuidv4(), 'Harley-Davidson', 'Street Glide', 2023, 'Black', 1868, 'Cruiser'),
            new Motorbike(uuidv4(), 'Yamaha', 'YZF-R6', 2022, 'Blue', 599, 'Sport')
        ];
    }
    save() {
        const vehiclesData = this.vehicles.map(vehicle => {
            if (vehicle instanceof Car) {
                return {
                    id: vehicle.getId(),
                    type: 'car',
                    make: vehicle.getMake(),
                    model: vehicle.getModel(),
                    year: vehicle.getYear(),
                    color: vehicle.getColor(),
                    doors: vehicle.getDoors(),
                    carType: vehicle.getType()
                };
            }
            else if (vehicle instanceof Truck) {
                return {
                    id: vehicle.getId(),
                    type: 'truck',
                    make: vehicle.getMake(),
                    model: vehicle.getModel(),
                    year: vehicle.getYear(),
                    color: vehicle.getColor(),
                    bedLength: vehicle.getBedLength(),
                    towingCapacity: vehicle.getTowingCapacity()
                };
            }
            else if (vehicle instanceof Motorbike) {
                return {
                    id: vehicle.getId(),
                    type: 'motorbike',
                    make: vehicle.getMake(),
                    model: vehicle.getModel(),
                    year: vehicle.getYear(),
                    color: vehicle.getColor(),
                    engineSize: vehicle.getEngineSize(),
                    bikeType: vehicle.getBikeType()
                };
            }
            return null;
        }).filter(Boolean);
        fs.writeFileSync(this.filePath, JSON.stringify(vehiclesData, null, 2));
    }
    getVehicles() {
        return this.vehicles;
    }
    getVehicleById(id) {
        return this.vehicles.find(vehicle => vehicle.getId() === id);
    }
    addVehicle(vehicle) {
        this.vehicles.push(vehicle);
        this.save();
    }
}
