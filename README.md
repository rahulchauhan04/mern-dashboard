
# Fullstack MERN Portfolio Project with Admin Panel

## Project Purpose

This is a fullstack portfolio project built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The purpose of this project is to showcase my skills as a fullstack developer. It includes a portfolio website with dynamic content that can be managed via an admin panel. The project demonstrates various web development techniques, including creating and managing user content, implementing CRUD operations, and integrating with third-party services.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Hosting**: Frontend & Admin Panel on Netlify, Backend on Render
- **Cloud Storage**: Cloudinary for image and document storage

## Features

### Admin Panel

- **Authentication**: Secure login and registration with JWT (JSON Web Token) authentication.
- **CRUD Operations**: Admin can create, read, update, and delete content for different sections, including projects, skills, timelines, and applications.
- **File Upload**: Integrated with Cloudinary to manage image and PDF uploads for avatars and resumes.
- **Dynamic Content**: Portfolio content can be dynamically updated from the admin panel.

### Portfolio Website

- **Dynamic Rendering**: The frontend dynamically renders projects, skills, and timelines based on data provided by the backend.
- **Responsive Design**: Fully responsive design with smooth animations, including tube light effects and other interactive UI components.
- **Typewriter Animation**: Custom animation for job titles using the react-simple-typewriter library.

## How to Set Up Locally

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/yourproject.git
   cd yourproject

	2.	Install dependencies for both frontend and backend:

cd portfolio-frontend
npm install
cd ../backend
npm install


	3.	Set up environment variables:
Create a .env file in the backend with the following:

MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret


	4.	Run the project:
Start the backend server:

cd backend
npm start

Start the frontend:

cd portfolio-frontend
npm start


	5.	Access the app:
	•	Frontend will be accessible at http://localhost:3000
	•	Backend API will be available at http://localhost:4000

Challenges and Solutions

	1.	Handling File Uploads:
I integrated Cloudinary to handle image and PDF uploads, which was a new experience for me. The challenge was ensuring the correct file type was uploaded, and displaying them correctly in the admin panel and portfolio site. I overcame this by thoroughly reading the Cloudinary API documentation and testing extensively.
	2.	Deploying the Backend:
Deploying the backend on Render presented some challenges with environment variables and ensuring proper routing. I resolved this by carefully configuring the .env file and adjusting settings on Render.
	3.	Responsive Design:
Achieving a responsive design across different devices was challenging, especially with dynamic content rendering. I utilized Tailwind CSS’s utility classes to manage this and tested across various screen sizes.

Conclusion

This project represents my journey into fullstack development using the MERN stack. It demonstrates my ability to build and deploy a complete web application with both a frontend and an admin panel. I plan to continue expanding my skillset by building more projects that solve real-world problems.

Feel free to check out the live project:

	•	Frontend: Netlify Link (https://rahul-chauhan.netlify.app/)
	•	Admin: [Netlify Link](https://rahul-dashboard.netlify.app/)
