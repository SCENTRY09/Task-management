from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from app.core.database import engine
from app.api.routes.task_routes import router as task_router

app = FastAPI(
    title="Task Management API",
    version="1.0.0"
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "*"],  # Allow frontend origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(task_router)


@app.get("/")
def root():
    return {
        "message": "Task Management API is Running!"
    }



@app.get("/db-test")
def db_test():
    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))

    return {
        "message": "Database Connected Successfully"
    }