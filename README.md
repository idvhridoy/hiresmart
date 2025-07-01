# HireSmart Backend

This repository contains the backend system for HireSmart, a platform designed to connect job seekers with employers. This project was developed as part of the JoulesLabs Backend Engineering Assignment.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Design Choices](#design-choices)

## Features

-   **Authentication & Authorization:** JWT-based authentication with three roles: `admin`, `employer`, and `candidate`.
-   **Employer Features:** CRUD operations for job listings, view posted jobs, and view applications for each job.
-   **Candidate Features:** View available jobs with filtering, and apply to jobs.
-   **Admin Features:** View platform metrics (number of jobs, users, applications).
-   **Background Processing:** A job matching process that compares candidates to jobs based on skills, location, and salary.
-   **Scheduled Tasks:** Daily archival of old job posts and weekly removal of unverified users.
-   **Optimization:** Caching for recent job listings and application statistics using Redis.
-   **Security:** Rate limiting on login and application submission endpoints.

## Technology Stack

-   **Backend:** Node.js with Express
-   **Database:** PostgreSQL
-   **ORM:** Objection.js with Knex.js
-   **Caching:** Redis
-   **Job Queue:** Bull
-   **Containerization:** Docker

## Architecture

The application follows a clean, layered architecture to ensure separation of concerns and maintainability:

-   **`src/api`**: Contains controllers, routes, and middleware for handling HTTP requests.
-   **`src/services`**: Encapsulates the business logic of the application.
-   **`src/models`**: Defines the database models using Objection.js.
-   **`src/repositories`**: (Implicitly handled by Objection.js models in this implementation).
-   **`src/config`**: Holds configuration files for the database, Redis, etc.
-   **`src/jobs`**: Contains the logic for background jobs.
-   **`db`**: Stores database migration files.

## Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/)
-   [Docker](https://www.docker.com/products/docker-desktop/)

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd JouleslabsBackEnd
    ```

2.  Install the dependencies:
    ```bash
    npm install
    ```

## Environment Configuration

Create a `.env` file in the root directory by copying the `.env.example` file. Update the variables as needed for your local environment.

```bash
cp .env.example .env
```

## Running the Application

1.  **Start the services (app, database, Redis) using Docker Compose:**

    ```bash
    docker-compose up -d
    ```

2.  **Run the database migrations:**

    ```bash
    npx knex migrate:latest
    ```

3.  **The application will be running at `http://localhost:3000`**.

4.  **To run the background worker, open a new terminal and run:**

    ```bash
    node src/worker.js
    ```

## API Endpoints

*(A Postman collection or Swagger/OpenAPI documentation would typically be provided here for detailed endpoint information.)*

-   **Authentication:** `/api/auth/register`, `/api/auth/login`
-   **Jobs (Employer):** `/api/jobs` (CRUD)
-   **Jobs (Candidate):** `/api/candidate/jobs`, `/api/candidate/jobs/:id/apply`
-   **Admin:** `/api/admin/metrics`

## Design Choices

-   **Node.js & Express:** Chosen for its performance, large ecosystem, and suitability for I/O-heavy applications.
-   **Objection.js & Knex.js:** Provides a powerful query builder and a flexible model layer without the rigidity of a traditional ORM, making it easy to write complex queries.
-   **Bull & Redis:** Selected for background job processing due to its robustness and Redis-backed persistence.
-   **Docker:** Used to create a consistent and isolated development environment, simplifying setup and deployment.
-   **Layered Architecture:** Enforces a clean separation of concerns, which makes the codebase easier to understand, test, and maintain.
