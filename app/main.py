from fastapi import FastAPI
from sqlalchemy import text

from app.core.database import engine

app = FastAPI(
    title="Task Management API",
    version="1.0.0"
)


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