# GameHok Tournament Platform

A dynamic web application for managing and participating in gaming tournaments, featuring a modern, responsive frontend built with Next.js (TypeScript, Tailwind CSS) and a robust backend powered by Spring Boot with PostgreSQL. This project fulfills a coding assignment focused on frontend polish and backend integration, with optional bonus features included.

## Overview

- **Frontend**: Built with Next.js, TypeScript, and Tailwind CSS for a responsive, gamer-friendly UI. Includes a Tournament Dashboard, Tournament Details, and a form for adding tournaments.
- **Backend**: Implements a RESTful API with Spring Boot (Java) and PostgreSQL for storing and managing tournament data.
- **Features**: Tournament listing, filtering (All, Upcoming, Completed), details view, and tournament creation (bonus feature).

## Setup Instructions

### Prerequisites

- **Node.js 18+** and npm for the frontend.
- **Java 17+** and Maven for the backend.
- **PostgreSQL** installed and running locally, or a cloud instance (e.g., Heroku Postgres).
- **Git** for version control.

### Frontend (Next.js)

1. Navigate to the `app/` directory:
   ```bash
   cd app

### Install dependencies:
bash
npm install

Set up environment variables in .env.local (optional, for production):
NEXT_PUBLIC_BACKEND_URL=https://your-backend.herokuapp.com/api/tournaments

### Run locally:
bash
npm run dev

Access at http://localhost:3000.

## Backend (Spring Boot)
Navigate to the tournament-api/ directory:
bash
cd tournament-api

### Configure PostgreSQL in src/main/resources/application.properties:

properties
spring.datasource.url=jdbc:postgresql://localhost:5432/tournaments_db
spring.datasource.username=postgres
spring.datasource.password=your_password
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
Replace your_password with your PostgreSQL password.

### Create the tournaments_db database if not already created:
sql
psql -U postgres
CREATE DATABASE tournaments_db;
\q

### Build and run:
bash
mvn clean package
mvn spring-boot:run

# ScreenShots

## Main DashBoard
![image](https://github.com/user-attachments/assets/056e4608-fc27-4857-ae3f-625017daaae5)
![image](https://github.com/user-attachments/assets/78003b77-7fda-464b-9979-f94ef5fe6749)

## Add Data Form

![image](https://github.com/user-attachments/assets/7e5d5bd6-bc3d-46bc-b13b-bb17c268c89d)
![image](https://github.com/user-attachments/assets/7ca39ee3-f5fc-4ed0-8247-9d755826e5a4)

## Individual Data

![image](https://github.com/user-attachments/assets/9ad7cb48-a473-4c53-b37d-332f8331f81f)
![image](https://github.com/user-attachments/assets/b4b1a666-df75-4235-8bbb-30ec8fc50ee6)




