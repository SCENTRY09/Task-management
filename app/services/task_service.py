from sqlalchemy.orm import Session
from datetime import date
from typing import List

from app.schemas.task_schema import (
    TaskCreate,
    TaskUpdate,
    TaskResponse,
)

from app.models.task_model import Task
from app.crud.task_crud import (
   create_task,
    update_task,
    delete_task,
    mark_completed,
    search_tasks,
    filter_status,
    filter_due_date,
    get_all_tasks,
    get_task_by_id,

)

from fastapi import HTTPException, status

def create_new_task(db: Session, task: TaskCreate) -> Task:
    """
    Business logic for creating a new task.
    """

    return create_task(db, task)

from typing import List


def get_tasks(db: Session) -> List[Task]:
    """
    Business logic for retrieving all tasks.
    """
    return get_all_tasks(db)


def get_task(db: Session, task_id: int) -> Task:
    """
    Return a task by ID or raise 404.
    """

    task = get_task_by_id(db, task_id)

    if task is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    return task


def update_existing_task(db: Session, task_id: int, task: TaskUpdate):
    db_task = get_task(db, task_id)

    update_data = task.model_dump(exclude_unset=True)

    return update_task(db, db_task, update_data)


def delete_existing_task(db: Session, task_id: int):
    db_task = get_task(db, task_id)
    delete_task(db, db_task)


def complete_task(db: Session, task_id: int):
    db_task = get_task(db, task_id)
    return mark_completed(db, db_task)


def search_task(db: Session, keyword: str):
    return search_tasks(db, keyword)


def get_tasks_by_status(db: Session, status: str):
    return filter_status(db, status)


def get_tasks_by_due_date(db: Session, due_date: date):
    return filter_due_date(db, due_date)