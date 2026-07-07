# Task Management Backend API

A RESTful Task Management Backend API built using **FastAPI**, **PostgreSQL**, **SQLAlchemy**, **Pydantic**, and **Alembic**. This project provides complete CRUD operations for managing tasks with request validation and database migration support.

---

## Features

- Create Task
- Get All Tasks
- Get Task by ID
- Update Task
- Delete Task
- Mark Task as Completed
- Search Tasks by Title
- Filter Tasks by Status
- Filter Tasks by Due Date
- Request Validation using Pydantic
- Database Migration using Alembic

---

## Tech Stack

- Python
- FastAPI
- PostgreSQL
- SQLAlchemy
- Pydantic
- Alembic

---

## Project Structure

```text
task-management-api/
│
├── alembic/
│   └── versions/
│
├── app/
│   ├── api/
│   │   └── routes/
│   │
│   ├── core/
│   │
│   ├── crud/
│   │
│   ├── models/
│   │
│   ├── schemas/
│   │
│   ├── services/
│   │
│   ├── utils/
│   │
│   └── main.py
│
├── alembic.ini
├── requirements.txt
├── .env
└── README.md
```

---

## Database Schema

| Field | Type |
|--------|------|
| id | Integer |
| title | String |
| description | Text |
| status | Pending / Completed |
| due_date | Date |
| created_at | DateTime |
| updated_at | DateTime |

---

## API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/tasks` | Create a Task |
| GET | `/tasks` | Get All Tasks |
| GET | `/tasks/{id}` | Get Task by ID |
| PUT | `/tasks/{id}` | Update Task |
| DELETE | `/tasks/{id}` | Delete Task |
| PATCH | `/tasks/{id}/complete` | Mark Task as Completed |
| GET | `/tasks?search=` | Search Tasks by Title |
| GET | `/tasks?status=` | Filter Tasks by Status |
| GET | `/tasks?due_date=` | Filter Tasks by Due Date |

---

## Validation

- Title should not be empty
- Due date cannot be in the past
- Request payload validation using Pydantic
- Proper HTTP status codes
- Graceful exception handling

---

## Environment Variables

Create a `.env` file in the project root.

```env
DATABASE_URL=postgresql+psycopg2://<username>:<password>@localhost:5432/<database_name>
```

Example:

```env
DATABASE_URL=postgresql+psycopg2://postgres:password@localhost:5432/task_db
```

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the project directory:

```bash
cd task-management-api
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment:

**Windows**

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

---

## Database Migration

Generate a migration:

```bash
alembic revision --autogenerate -m "Create tasks table"
```

Apply the migration:

```bash
alembic upgrade head
```

---

## Run the Application

Start the development server:

```bash
uvicorn app.main:app --reload
```

The API will be available at:

```
http://localhost:8000
```

Swagger Documentation:

```
http://localhost:8000/docs
```

ReDoc Documentation:

```
http://localhost:8000/redoc
```

---

## Author

**Shivam Khedkar**
