# Vehicle Builder CLI

A command-line application for creating and interacting with various types of vehicles including Cars, Trucks, and Motorbikes.

## Features

- Create different types of vehicles with custom attributes:
  - Cars: make, model, year, color, doors, and car type
  - Trucks: make, model, year, color, bed length, and towing capacity
  - Motorbikes: make, model, year, color, engine size, and bike type
- Save vehicles to local storage for future use
- Interact with vehicles through type-specific actions
- User-friendly interface with color-coded prompts

## Installation

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Build and run the application:
   ```
   npm start
   ```

## Usage

The application provides an interactive CLI interface where you can:
1. Create new vehicles
2. Select from previously created vehicles
3. Perform actions specific to each vehicle type

## Demo Video

[Video demonstration of the application](https://app.screencastify.com/v3/watch/zzC2rEUOttJSBIOatSi8)

## Technologies Used

- TypeScript
- Node.js
- Inquirer.js (for interactive CLI)
- UUID (for unique identifiers)
- Chalk (for colored console output)

## Development

To run the application in development mode with auto-restart:
```
npm run dev
```

## Credits

This project was created with assistance from:
- Online Learning Assistant
- Claude AI

## License

ISC