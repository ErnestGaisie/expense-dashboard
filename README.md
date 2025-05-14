# expense-dashboard

A full-stack expense tracking application with user registration, transaction tracking, and data visualization.

---

## 🛠 Tech Stack

| Layer              | Technology                  |
| ------------------ | --------------------------- |
| Frontend           | React + Vite + Tailwind CSS |
| UI Framework       | lucide-react                |
| Backend            | Node.js (Express)           |
| Database           | MongoDB                     |
| Data Visualization | Recharts (Pie Chart)        |
| Containerization   | Docker + Docker Compose     |
| Web Server         | Nginx                       |

---

## 🚀 Run Locally with Docker

### Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Steps

1. Clone the repository:

```bash
git clone https://github.com/ErnestGaisie/expense-dashboard
cd expense-dashboard
```

2. Clone the repository:

```bash
docker-compose up --build
```

2. Open your browser:

- Frontend: http://localhost:3000
- Backend API: http://localhost:5001/api

## API Endpoints

### Users

GET /api/users — Get all users with income/expense summaries

GET /api/users/:id — Get user by ID with totals and categories

GET /api/users/:id/transactions — Get user with their transactions

POST /api/users — Create a new user

DELETE /api/users/:id — Delete a user

### Transactions

POST /api/transactions/:userId — Create a transaction (income or expense)

PUT /api/transactions/:id — Update a transaction

DELETE /api/transactions/:id — Delete a transaction

## Features

🔹 User registration and dashboard

🔹 Full CRUD for income and expenses

🔹 Average expense by category (Pie Chart)

🔹 Responsive, clean UI with shadcn/ui components

🔹 React SPA routing with Nginx fallback for refresh support

🔹 Fully containerized with Docker

## Folder Structure

expense-dashboard/
├── backend/ # Node.js + Express API
│ ├── controllers/
│ ├── models/
│ └── routes/
├── frontend-react/ # Vite + React frontend
│ ├── components/
│ ├── pages/
│ ├── lib/ # API functions
│ ├── index.css # Tailwind styles
│ └── Dockerfile
├── nginx.conf # Custom fallback config for SPA routing
├── docker-compose.yml
└── README.md

## Development Notes

Uses react@18 for compatibility with UI libraries like lucide-react

Tailwind CSS extended with HSL-based CSS variables for theming

MongoDB runs in a Docker container alongside frontend/backend

Backend uses Express and Mongoose for RESTful API routes

Vite dev server used in development; Nginx used in production build
