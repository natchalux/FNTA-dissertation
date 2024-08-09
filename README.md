# Dissertation Project

Welcome to the documentation for my dissertation project. This project focuses on the development and testing of a mobile application designed to help users manage their workouts efficiently.

## Overview

The application provides a user-friendly interface to track progress, customize workouts, and compare performance over time. It includes features such as:

- **Logging Workout Sets**: Users can log each set of their workouts with details such as repetitions, weights, and rest periods.
- **Workout Comparison**: The app enables users to compare their current workouts with those from previous weeks to monitor progress.
- **Adding Extra Sets**: Users can add additional sets to their exercises dynamically.
- **Customizable Workouts**: Users can create and customize workout names, exercises, and set configurations to suit their fitness goals.

## Getting Started

Follow the steps below to set up and run the project on your local machine.

### Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Install [Node.js](https://nodejs.org/).
- **Expo CLI**: Install Expo CLI globally:
  ```
  npm install -g expo-cli
  ```
  Git: Install Git.

  Appwrite: Set up an Appwrite instance to manage your backend. More details can be found here.

#### Installation

Installation
Clone the Repository
Clone the project repository:


git clone https://github.com/yourusername/your-repo.git
Navigate to the Project Directory
Change into the project directory:

```
cd your-repo
```
Install Dependencies
Install the necessary packages:

```
npm install
```
Configuration
Setting up Appwrite

Create a new project in your Appwrite dashboard.
Create a database and configure collections such as workouts, sets, users.
Update the .env file in your project with the Appwrite API endpoint, project ID, and other necessary credentials.
Expo Configuration

Update the app.json or app.config.js file with your app details.
If using icons from Iconify, ensure they are properly linked within the project.
Running the Application
Start the Expo Development Server
Start the development server:

```
npx expo start
```
Testing on a your device.
Scan the QR code generated by Expo using the Expo Go app on your device to run the app.

