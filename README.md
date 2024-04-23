# Full-Stack-Workout-Planning-Application

<img width="1375" alt="workoutapplication" src="https://github.com/sebastianjburman/Full-Stack-Workout-Planning-Application/assets/74584954/ee568c4f-611a-490a-9cd6-d6a64b60579a">


This is a workout planning application developed using .NET for the backend, MongoDB as the database, and Angular for the frontend. The main objective of this project is to provide a platform for sharing and organizing workouts. Additionally, it serves as a demonstration of my skills in developing a full-stack application with Angular.

## Features

- User Registration and Authentication: Users can create an account, log in, and securely access the application.
- Workouts Management: Users can create, update, and delete workouts, allowing them to customize their fitness routines. Users can also view other users public workouts.
- Exercise Management: Users can create, update, and delete exercises, allowing them to customize their fitness routines.
- Weight Logging System: Users can track their weight trends daily.

## Installation

To set up the Workout Application locally, please follow these instructions:

### Prerequisites

- .NET (version 7.0 or higher)
- Node.js (version 14.2.10 or higher)
- MongoDB (version 6.0 or higher)
- Docker (version 20.10.23 or higher)

### Database Setup

1. Install and set up Docker on your system.
2. Open a terminal or command prompt.
3. Pull the MongoDB Docker image: `docker pull mongo`
4. Create and run a MongoDB container:
``` 
docker run -d --name workout-database -p 27017:27017 mongo
```

### Backend Setup

1. Clone the repository: `git clone https://github.com/sebastianjburman/Full-Stack-Workout-Planning-Application`
2. Navigate to the Backend folder: `cd Backend`
3. Restore the NuGet packages: `dotnet restore`
4. Configure the database connection: Open `appsettings.json` and update the MongoDB connection string.
5. Configure JWT Token Secret: Open `appsettings.json` and update the JwtSecret value".
6. Start the backend server: `dotnet run`

### Frontend Setup

1. Open a new terminal.
2. Navigate to the frontend folder: `cd Client`
3. Install dependencies: `npm install`
4. Update `environment.ts` with dotnet backend url.
4. Start the frontend server: `ng serve`

## Usage

Once you have completed the installation steps, you can access the Workout Application by visiting `http://localhost:4200` in your web browser. 

1. Create a new account.
2. Create exercises and add those exercises to new workouts.
3. Track you weight using the weight log and like other users workouts.
4. Enjoy organizing and tracking your workouts!

## Contributing

Contributions to the Workout Application are welcome! If you would like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b feature-name`
3. Make the necessary changes and commit them: `git commit -m "Add feature"`
4. Push your changes to the branch: `git push origin feature-name`
5. Open a pull request in this repository.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute the code as permitted by the license.
