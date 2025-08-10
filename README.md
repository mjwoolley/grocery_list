# Grocery List App

A simple shared grocery list app built with React, TypeScript, and Firebase.

## Features

- Add items to a shared grocery list
- Check off items as purchased
- Real-time syncing between users
- Mobile-optimized interface
- Firebase Authentication

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase:
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication (Email/Password)
   - Enable Realtime Database
   - Copy your Firebase configuration

4. Create environment file:
   ```bash
   cp .env.example .env
   ```
   
5. Fill in your Firebase configuration in `.env`

6. Start the development server:
   ```bash
   npm start
   ```

## Available Scripts

- `npm start` - Runs the development server
- `npm build` - Builds the app for production
- `npm test` - Runs the test suite
- `npm run lint` - Runs ESLint
- `npm run typecheck` - Runs TypeScript type checking

## Architecture

- **Frontend**: React with TypeScript
- **UI Library**: Material-UI
- **Backend**: Firebase Realtime Database
- **Authentication**: Firebase Auth
- **Hosting**: Firebase Hosting (when deployed)