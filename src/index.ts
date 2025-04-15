import inquirer from 'inquirer';
import { v4 as uuidv4 } from 'uuid';
import { VehicleStorage } from './utils/VehicleStorage.js';
import { Vehicle } from './models/Vehicle.js';
import { Car } from './models/Car.js';
import { Truck } from './models/Truck.js';
import { Motorbike } from './models/Motorbike.js';
import chalk from 'chalk';

// Initialize vehicle storage
const vehicleStorage = new VehicleStorage();

// Main function to start the application
async function main() {
  console.log(chalk.blue('=== Welcome to the Vehicle Builder! ==='));
  
  let exitApp = false;
  
  while (!exitApp) {
    const { choice } = await inquirer.prompt({
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: [
        'Create a new vehicle',
        'Select an existing vehicle',
        'Exit'
      ]
    });
    
    if (choice === 'Create a new vehicle') {
      await createVehicle();
    } else if (choice === 'Select an existing vehicle') {
      await selectVehicle();
    } else {
      console.log(chalk.blue('Thank you for using the Vehicle Builder! Goodbye!'));
      exitApp = true;
    }
  }
}

async function createVehicle() {
  const { vehicleType } = await inquirer.prompt({
    type: 'list',
    name: 'vehicleType',
    message: 'What type of vehicle would you like to create?',
    choices: ['Car', 'Truck', 'Motorbike']
  });
  
  // Common vehicle questions
  const commonQuestions = [
    {
      type: 'input',
      name: 'make',
      message: 'Enter the make:',
      validate: (value: string) => value.trim() !== '' ? true : 'Make cannot be empty'
    },
    {
      type: 'input',
      name: 'model',
      message: 'Enter the model:',
      validate: (value: string) => value.trim() !== '' ? true : 'Model cannot be empty'
    },
    {
      type: 'number',
      name: 'year',
      message: 'Enter the year:',
      validate: (value: number) => {
        const year = parseInt(value.toString());
        if (isNaN(year) || year < 1900 || year > 2100) {
          return 'Please enter a valid year between 1900 and 2100';
        }
        return true;
      }
    },
    {
      type: 'input',
      name: 'color',
      message: 'Enter the color:',
      validate: (value: string) => value.trim() !== '' ? true : 'Color cannot be empty'
    }
  ];
  
  let vehicle: Vehicle;
  
  if (vehicleType === 'Car') {
    const answers = await inquirer.prompt([
      ...commonQuestions,
      {
        type: 'number',
        name: 'doors',
        message: 'Enter the number of doors:',
        validate: (value: number) => {
          const doors = parseInt(value.toString());
          if (isNaN(doors) || doors < 2 || doors > 5) {
            return 'Please enter a valid number of doors (2-5)';
          }
          return true;
        }
      },
      {
        type: 'list',
        name: 'carType',
        message: 'Select the car type:',
        choices: ['Sedan', 'SUV', 'Coupe', 'Hatchback', 'Convertible']
      }
    ]);
    
    vehicle = new Car(
      uuidv4(),
      answers.make,
      answers.model,
      answers.year,
      answers.color,
      answers.doors,
      answers.carType
    );
    
  } else if (vehicleType === 'Truck') {
    const answers = await inquirer.prompt([
      ...commonQuestions,
      {
        type: 'number',
        name: 'bedLength',
        message: 'Enter the bed length (in feet):',
        validate: (value: number) => {
          const length = parseFloat(value.toString());
          if (isNaN(length) || length < 4 || length > 8) {
            return 'Please enter a valid bed length (4-8 feet)';
          }
          return true;
        }
      },
      {
        type: 'number',
        name: 'towingCapacity',
        message: 'Enter the towing capacity (in pounds):',
        validate: (value: number) => {
          const capacity = parseInt(value.toString());
          if (isNaN(capacity) || capacity < 5000 || capacity > 20000) {
            return 'Please enter a valid towing capacity (5000-20000 pounds)';
          }
          return true;
        }
      }
    ]);
    
    vehicle = new Truck(
      uuidv4(),
      answers.make,
      answers.model,
      answers.year,
      answers.color,
      answers.bedLength,
      answers.towingCapacity
    );
    
  } else { // Motorbike
    const answers = await inquirer.prompt([
      ...commonQuestions,
      {
        type: 'number',
        name: 'engineSize',
        message: 'Enter the engine size (in cc):',
        validate: (value: number) => {
          const size = parseInt(value.toString());
          if (isNaN(size) || size < 50 || size > 2500) {
            return 'Please enter a valid engine size (50-2500 cc)';
          }
          return true;
        }
      },
      {
        type: 'list',
        name: 'bikeType',
        message: 'Select the bike type:',
        choices: ['Sport', 'Cruiser', 'Touring', 'Standard', 'Off-road']
      }
    ]);
    
    vehicle = new Motorbike(
      uuidv4(),
      answers.make,
      answers.model,
      answers.year,
      answers.color,
      answers.engineSize,
      answers.bikeType
    );
  }
  
  // Add the new vehicle to storage
  vehicleStorage.addVehicle(vehicle);
  
  console.log(chalk.green(`\nNew ${vehicleType} created successfully!`));
  console.log(chalk.yellow(`Vehicle Info: ${vehicle.getInfo()}`));
  
  // Use the newly created vehicle
  await useVehicle(vehicle);
}

async function selectVehicle() {
  const vehicles = vehicleStorage.getVehicles();
  
  if (vehicles.length === 0) {
    console.log(chalk.red('No vehicles available. Please create a vehicle first.'));
    return;
  }
  
  const { selectedVehicleId } = await inquirer.prompt({
    type: 'list',
    name: 'selectedVehicleId',
    message: 'Select a vehicle:',
    choices: vehicles.map(vehicle => ({
      name: vehicle.getInfo(),
      value: vehicle.getId()
    }))
  });
  
  const selectedVehicle = vehicleStorage.getVehicleById(selectedVehicleId);
  
  if (selectedVehicle) {
    console.log(chalk.yellow(`\nSelected Vehicle: ${selectedVehicle.getInfo()}`));
    await useVehicle(selectedVehicle);
  } else {
    console.log(chalk.red('Vehicle not found.'));
  }
}

async function useVehicle(vehicle: Vehicle) {
  let continueActions = true;
  
  while (continueActions) {
    const actions = [...vehicle.displayActions(), 'Go back to main menu'];
    
    const { action } = await inquirer.prompt({
      type: 'list',
      name: 'action',
      message: 'What would you like to do with this vehicle?',
      choices: actions
    });
    
    if (action === 'Go back to main menu') {
      continueActions = false;
    } else {
      let result = '';
      
      if (vehicle instanceof Car) {
        result = vehicle.performAction(action);
      } else if (vehicle instanceof Truck) {
        result = vehicle.performAction(action);
      } else if (vehicle instanceof Motorbike) {
        result = vehicle.performAction(action);
      }
      
      console.log(chalk.green(`\n${result}\n`));
    }
  }
}

// Start the application
main().catch(error => {
  console.error('An error occurred:', error);
});