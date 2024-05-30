
# CS-Advisory-Bot

This repository contains three projects: one for React, one for Django, and one for NGINX. This document provides instructions on how to launch these projects locally, both using Docker and without Docker.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Launching with Docker](#launching-with-docker)
  - [Development Environment](#development-environment)
  - [Production Environment](#production-environment)
- [Launching without Docker](#launching-without-docker)
  - [React](#react)
  - [Django](#django)
  - [NGINX](#nginx)

## Prerequisites

Ensure you have the following installed on your system:

- Docker and Docker Compose (for Docker setup)
- Node.js and npm (for React setup without Docker)
- Python and pip (for Django setup without Docker)
- NGINX (for NGINX setup without Docker)

## Launching with Docker

### Development Environment

1. Clone the repository:
   ```sh
   git clone https://github.com/MohammadAbuQattam/CS-Advisory-Bot.git
   cd CS-Advisory-Bot
   ```

2. Start the development environment using Docker Compose:
   ```sh
   docker-compose -f docker-compose-dev.yml up --build
   ```

3. Access the services:
   - NGINX: `http://localhost:3050`

## Launching without Docker

### React

1. Navigate to the React project directory:
   ```sh
   cd CS-Advisory-Bot/react
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm start
   ```

4. Access the React application at `http://localhost:3000`.

### Django

1. Navigate to the Django project directory:
   ```sh
   cd CS-Advisory-Bot/django
   ```

2. Create a virtual environment and activate it:
   ```sh
   python -m venv venv
   source venv/bin/activate   # On Windows, use `venv\Scripts\activate`
   ```

3. Install the dependencies:
   ```sh
   pip install -r requirements.txt
   ```

4. Apply migrations and start the Django development server:
   ```sh
   python manage.py migrate
   python manage.py runserver
   ```

5. Access the Django application at `http://localhost:8000`.
