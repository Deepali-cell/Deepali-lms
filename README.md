LMS Platform (Course Selling & Learning System)

This is a full-stack Learning Management System (LMS) where users can browse and purchase courses, and get access to course content after enrollment. Admin can create and manage courses along with lectures and course details.
The project was built to understand content-based platforms, authentication, and controlled access systems.

Tech Stack
Frontend
React.js
Redux Toolkit
RTK Query (API handling)
React Icons

Backend
Node.js
Express.js
MongoDB
JWT Authentication

Media & Storage
Cloudinary (for course thumbnails / lecture content)

Features

User Side
User authentication (login/signup)
Browse available courses
View course overview before purchase
Buy/enroll in courses
Access purchased course content
Watch lectures included in the course

Admin Side
Create new courses
Add course details (title, description, overview)
Upload course thumbnail/media
Add lectures to courses
Manage course content

Access Control System
JWT-based authentication
Protected routes for course access
Only enrolled users can view course lectures
Public access for course previews/overview

Core Functionality
Course purchase unlocks full content access
Structured course → lectures relationship
RTK Query used for efficient API handling and caching
Cloudinary used for storing media content
Secure backend routes for protected resources

Architecture Overview
Modular backend:
routes/
controllers/
models/
middleware/
Frontend structured with:
components/
pages/
redux store
RTK Query API slices

Key Learnings
Building content-restricted platforms (like LMS)
Managing user access after purchase
Using RTK Query for API handling and caching
Designing course → lecture data relationships
Handling authentication and protected routes
Media handling using Cloudinary

Project Purpose
This project was built to understand how platforms like online learning systems manage:
Course creation
Content delivery
Access control after purchase
User authentication and authorization
