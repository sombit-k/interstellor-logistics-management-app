# Interstellar Logistics Management App

This is a logistics management application designed to manage items, containers, and related operations. Follow the steps below to set up the project after cloning the repository.

## Prerequisites

Ensure you have the following installed on your system:
- Node.js (v16 or higher)
- npm (Node Package Manager)
- MongoDB (or a MongoDB Atlas connection string)

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd "Intersteller logistics management app"
```

### 2. Install Dependencies
#### Backend
Navigate to the `backend` directory and install dependencies:
```bash
cd backend
npm install
```

#### Frontend
Navigate to the `frontend` directory (if it exists) and install dependencies:
```bash
cd ../frontend
npm install
```

### 3. Configure Environment Variables
#### Backend
Create a `.env` file in the `backend` directory if it doesn't already exist. Add the following variables:
```
MONGODB_URI=<your-mongodb-connection-string>
PORT=8000
```
Replace `<your-mongodb-connection-string>` with your MongoDB URI.

### 4. Run the Application
#### Development Mode
To run both the backend and frontend concurrently:
```bash
npm run dev
```

#### Backend Only
To run only the backend:
```bash
npm run backend
```

#### Frontend Only
To run only the frontend:
```bash
npm run frontend
```

### 5. Seed the Database
To seed the database with initial data, run the following commands in the `backend` directory:
```bash
node src/seed/item.seed.js
node src/seed/container.seed.js
```

### 6. Access the Application
- Backend: The server will run on `http://localhost:8000` (or the port specified in your `.env` file).
- Frontend: The frontend will run on the port specified in its configuration.

## Additional Notes
- Ensure MongoDB is running locally or that your MongoDB Atlas connection string is valid.
- Modify the seed files to adjust the number of items or containers seeded.
- **Note:** This README will be updated with detailed frontend setup instructions once the frontend implementation is completed.

## License
This project is licensed under the ISC License.
