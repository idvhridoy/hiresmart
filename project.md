
5
JoulesLabs Backend
Engineering Assignment
Dear Candidate,
Thank you for being so interested in joining our engineering team. As part of the
evaluation process, we'd like you to complete a technical assignment that helps us
understand your backend development skills, coding style, and architectural
thinking.
This task is designed to assess how you approach real-world engineering
challenges in a structured and scalable way.
📝 Overview
You are tasked with developing a simplified backend system for a platform called
HireSmart, which connects job seekers with employers. The system should
support authentication, job postings, job applications, and basic background
processing.
You may choose between Laravel PHP or Node.js Express or NestJS. Please
follow best practices, emphasizing scalability, security, and clean architecture.
🛠 Requirements
1. Authentication & Authorization
Implement JWT-based authentication
Define three roles: admin , employer , and candidate
Restrict access to endpoints based on roles
2. Core Features
For Employers:JoulesLabs Backend Engineering Assignment1
Create, update, and delete job listings
View a list of their posted jobs
View applications for each job
For Candidates:
View available jobs with filtering options (e.g., keyword, location)
Apply to jobs
For Admin:
View platform metrics (e.g., number of jobs, users, applications)
3. Background Processing
Create a background job that runs a job matching process, comparing
candidates to jobs based on:
Required skills
Location preference
Salary range
When a match is found, queue a notification (mocked or logged)
4. Scheduled Tasks
Archive job posts that are older than 30 days (daily)
Remove unverified users (weekly)
5. Database
Use PostgreSQL for persistence
Provide schema/migration files
Submit an Entity Relationship Diagram ERD showing the database structure
6. Optimization & Performance
Handle potential N1 query issuesJoulesLabs Backend Engineering Assignment2
Use caching Redis) to store:
Recent job listings 5-minute expiry)
Application statistics for employers
7. Security
Apply standard web security practices to protect against:
SQL Injection
Cross-Site Scripting XSS
Cross-Site Request Forgery CSRF
Rate-limit login and application submission endpoints
8. Architecture & Code Quality
Follow clean code principles (e.g., SOLID
Use service/repository/controller separation
Apply dependency injection where applicable
9. Dockerization
Provide a docker-compose.yml file to run:
Your application
PostgreSQL
Redis
Optional) Adminer or pgAdmin for DB inspection
10. Version Control
Submit your work via a public GitHub or GitLab repository
Use meaningful commit messages
Include a clear and concise README with:
Setup instructionsJoulesLabs Backend Engineering Assignment3
Brief explanation of your design choices
Environment configuration ( .env.example )
🔄 Optional (Not Required, but Appreciated)
These features are not mandatory but will help us better understand your
capabilities if you choose to include them:
Unit and/or integration tests
Feature flag system
Job recommendation engine (basic logic is enough)
Swagger/OpenAPI documentation
Rate-limiting for public endpoints
Docker health checks
✅ What Weʼll Be Looking For
Area Focus Points
Code Quality Clean, readable, modular code
System Design Scalable and maintainable architecture
Feature Implementation Completeness and correctness
Optimization & Query Handling Efficient database access, caching
Security Awareness Proper safeguards against common threats
Use of Background Processing Thoughtful async design
Git Hygiene & Documentation Clear commits and instructions
Optional Features Bonus) Tests, documentation, feature flags, etc.
📦 Deliverables
A GitHub/GitLab repository containing:
All source codeJoulesLabs Backend Engineering Assignment4
Migration/schema files
Docker setup
ERD (image or markdown)
.env.example file
README with setup steps and explanation
📅 Deadline
You will have 5 days to complete and submit this assignment from the time you
receive this brief.
If you have any questions during the test, feel free to reach out.
We look forward to seeing your work!
Warm regards,
Tech Team, JoulesLabsJoulesLabs Backend Engineering Assignment5