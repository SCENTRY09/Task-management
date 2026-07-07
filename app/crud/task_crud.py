from sqlalchemy.orm import Session
from datetime import date
from app.models.task_model import Task
from app.schemas.task_schema import TaskCreate


def create_task(db: Session, task: TaskCreate) -> Task:
    db_task = Task(
        title=task.title,
        description=task.description,
        due_date=task.due_date,
    )

    db.add(db_task)
    db.commit()
    db.refresh(db_task)

    return db_task

from typing import List


def get_all_tasks(db: Session) -> List[Task]:
    """
    Fetch all tasks from the database.
    """
    return db.query(Task).all()

def get_task_by_id(db: Session, task_id: int) -> Task | None:
    """
    Fetch a task by its ID.
    """
    return db.query(Task).filter(Task.id == task_id).first()


def update_task(db: Session, db_task: Task, task_data: dict) -> Task:
    for key, value in task_data.items():
        setattr(db_task, key, value)

    db.commit()
    db.refresh(db_task)
    return db_task


def delete_task(db: Session, db_task: Task):
    db.delete(db_task)
    db.commit()


def mark_completed(db: Session, db_task: Task) -> Task:
    db_task.status = "Completed"
    db.commit()
    db.refresh(db_task)
    return db_task


def search_tasks(db: Session, keyword: str):
    return (
        db.query(Task)
        .filter(Task.title.ilike(f"%{keyword}%"))
        .all()
    )


def filter_status(db: Session, status: str):
    return (
        db.query(Task)
        .filter(Task.status == status)
        .all()
    )


def filter_due_date(db: Session, due_date: date):
    return (
        db.query(Task)
        .filter(Task.due_date == due_date)
        .all()
    )