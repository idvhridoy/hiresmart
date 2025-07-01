# HireSmart - Entity Relationship Diagram (ERD)

This document describes the database schema for the HireSmart platform.

## Tables

### `users`

Stores user information for all roles (candidate, employer, admin).

-   `id` (PK): INT - Unique identifier for the user.
-   `email` (UNIQUE): VARCHAR - User's email address.
-   `password`: VARCHAR - Hashed password.
-   `first_name`: VARCHAR
-   `last_name`: VARCHAR
-   `role`: ENUM('candidate', 'employer', 'admin')
-   `is_verified`: BOOLEAN - Whether the user has verified their account.
-   `location_preference`: VARCHAR - Candidate's preferred job location.
-   `salary_min`: DECIMAL - Candidate's minimum salary expectation.
-   `salary_max`: DECIMAL - Candidate's maximum salary expectation.
-   `created_at`: TIMESTAMP
-   `updated_at`: TIMESTAMP

---

### `jobs`

Stores job listings posted by employers.

-   `id` (PK): INT - Unique identifier for the job.
-   `employer_id` (FK -> `users.id`): INT - The user who posted the job.
-   `title`: VARCHAR - The title of the job.
-   `description`: TEXT - A detailed description of the job.
-   `location`: VARCHAR - The location of the job.
-   `salary_min`: DECIMAL - The minimum salary for the job.
-   `salary_max`: DECIMAL - The maximum salary for the job.
-   `status`: ENUM('open', 'closed', 'archived') - The current status of the job.
-   `created_at`: TIMESTAMP
-   `updated_at`: TIMESTAMP

---

### `applications`

Stores applications submitted by candidates for jobs.

-   `id` (PK): INT - Unique identifier for the application.
-   `candidate_id` (FK -> `users.id`): INT - The user who applied.
-   `job_id` (FK -> `jobs.id`): INT - The job being applied for.
-   `status`: ENUM('pending', 'viewed', 'rejected', 'accepted') - The status of the application.
-   `created_at`: TIMESTAMP
-   `updated_at`: TIMESTAMP

**Composite Unique Key:** (`candidate_id`, `job_id`)

---

### `skills`

A central repository of skills.

-   `id` (PK): INT - Unique identifier for the skill.
-   `name` (UNIQUE): VARCHAR - The name of the skill (e.g., 'JavaScript', 'PostgreSQL').

---

### `job_skills` (Pivot Table)

Links jobs to the skills they require.

-   `job_id` (FK -> `jobs.id`)
-   `skill_id` (FK -> `skills.id`)

**Composite Primary Key:** (`job_id`, `skill_id`)

---

### `candidate_skills` (Pivot Table)

Links candidates to their skills.

-   `candidate_id` (FK -> `users.id`)
-   `skill_id` (FK -> `skills.id`)

**Composite Primary Key:** (`candidate_id`, `skill_id`)

## Relationships

-   **`users` to `jobs`**: One-to-Many (An employer can have many jobs).
-   **`users` to `applications`**: One-to-Many (A candidate can have many applications).
-   **`jobs` to `applications`**: One-to-Many (A job can have many applications).
-   **`jobs` to `skills`**: Many-to-Many (through `job_skills`).
-   **`users` (candidates) to `skills`**: Many-to-Many (through `candidate_skills`).
