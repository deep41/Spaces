# Spaces
Introducing Spaces, the ultimate community-driven exploration app! Imagine a platform where you can curate and share your favorite spots, transforming your personal journeys into shared treasures. Spaces is all about connecting through the places you love, bringing communities together, and rediscovering the joy of exploration. Unlike conventional social media, we've ditched follower counts and popularity contests to create an honest space dedicated to community-driven discovery and authentic connections. Think of it as your own social map, where you can pin all your cherished places and relive the memories.

## What it does
The platform is built around the smallest unit called 'spaces.' Each space is an individual's experience that can be discovered by any other individual. Spaces with similar properties can be grouped into 'Collections' for easy organization and sharing purposes. We utilize tags to uncover and establish communities, with the tags serving as a means to amplify the voices of these communities on our platform.

![Showcase image 1](/spaces-1.png)
![Showcase image 2](/spaces-2.png)
![Showcase image 3](/spaces-3.png)
![Showcase image 4](/spaces-4.png)
![Showcase image 5](/spaces-5.png)
![Showcase image 6](/spaces-6.png)
![Showcase image 7](/spaces-7.png)
![Showcase image 8](/spaces-8.png)

## Install and Run the Project
Clone the project into your system.
```sh
$ git clone https://github.com/deepr41/Spaces.git
$ cd Spaces
```

Install the dependencies for frontend.
```sh
$ cd frontend
$ npm install
```

Install the dependencies for backend.
```sh
$ cd backend
$ npm install
```
The application uses mongodb on it's deafult port for the database. If you don't have it already installed, you can use mongodb using docker using the below command.
```sh
$ docker run -p 27017:27017 -d mongo:latest
```
Now you are ready to start the application.
Start the backend and frontend separetly in different terminals

For backend
```sh
$ cd backend
$ npm start
```

For frontend
```sh
$ cd frontend
$ npm run dev
```

Open the application at `http://localhost:5173`

## More info
This project was part of my team's submission to hack_nc hackathon hosted at NCSU. We were awarded the best project prize. Find more details at [Devpost project link - Spaces](https://devpost.com/software/spaces-405m26).
