# T03_G03

## Project Structure

```bash
/my-project
|-- /backend            # Contains backend files (Node.js + Express)
|   |-- /routes         # API routes
|   |-- /controllers    # Request handlers/controllers
|   |-- /services       # Service logic
|   |-- app.js       # Entry point for the backend server
|
|-- /frontend           # Contains frontend files (React + Vite)
|   |-- /src            # React components and other frontend code
|   |--         
|   |-- vite.config.js  # Vite configuration file
|
|-- README.md           # Project documentation
|-- .gitignore          # Git ignore rules

```


## Prerequisites

Make sure you have the following installed:

* Node.js: Version 14.x or higher
* npm


1. Clone the repository

```bash
git clone https://github.com/your-username/your-project.git
cd your-project
``` 

2. Install the dependencies for both the backend and frontend.
   
```bash
cd backend
npm install
cd ../frontend
npm install
```


## Running the Project

### Running the Backend (Node.js + Express)

To start the backend server:

1. Navigate to the backend directory:

2. Start the server:

```bash
cd backend
npm start
```
The backend server will run on http://localhost:3000. You can modify the port in app.js if needed.

### Running the Frontend (Vite + React)

To start the frontend development server:

1. Navigate to the frontend directory:
2. Start the Vite development server:

```bash
cd frontend
npm run dev
```

The frontend will run on http://localhost:5173. Open the browser and navigate to this URL to view your app.