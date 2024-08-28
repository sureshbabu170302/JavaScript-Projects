# SharePlace - Geolocation and Mapping Application
This project is a simple JavaScript application that helps users find and share their geographical location. The application allows users to either locate their current position using the browser's geolocation feature or find a location by entering an address. The location is then displayed on an interactive map, and a shareable link is generated for easy sharing.

## Features
- **Locate User**: Automatically finds and displays the user's current location on a map.
- **Address Search**: Converts a user-provided address into geographical coordinates and displays it on the map.
- **Reverse Geocoding**: Converts geographical coordinates into a readable address.
- **Map Integration**: Displays the location on an interactive map using OpenLayers.
- **Sharing**: Generates a shareable link that can be copied to the clipboard.

## Project Structure
- `UI/Modal.js`: Handles the display of modals for loading states.
- `UI/Map.js`: Integrates the OpenLayers library to render maps and location markers.
- `Utility/Location.js`: Provides functions to convert between addresses and coordinates using the OpenCage API.

## Usage
- **Locate Yourself**: Click the "Locate Me" button to automatically find your current location and display it on the map.
- **Search by Address**: Enter an address and click "Find" to locate it on the map.
- **Share Location**: After locating a place, click the "Share" button to generate a link that can be copied and shared with others.

## Technologies Used
- **JavaScript**: Core logic of the application.
- **OpenLayers**: For rendering the interactive map.

## Setup
Clone the repository:
```bash
git clone https://github.com/sureshbabu170302/Location-Tracker-Application.git
cd Location-Tracker-Application

```
# Install Dependencies
```bash
npm install

```
# Run the Application
# Use these commands one after the other:
```bash
npm run build
npm run build:dev
