from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from datetime import date
from typing import List
from app.core.database import get_db
from typing import List

from app.schemas.task_schema import (
    TaskCreate,
    TaskUpdate,
    TaskResponse,

)

from app.services.task_service import (
    create_new_task,
    get_tasks,
    get_task,
    update_existing_task,
    delete_existing_task,
    complete_task,
    search_task,
    get_tasks_by_status,
    get_tasks_by_due_date,
)

router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"]
)


# Create a new task.
@router.post(
    "/",
    response_model=TaskResponse,
    status_code=status.HTTP_201_CREATED
)
def create_task(
    task: TaskCreate,
    db: Session = Depends(get_db)
):
    return create_new_task(db, task)


# Get all tasks.
@router.get(
    "/",
    response_model=List[TaskResponse]
)
def get_all_tasks(
    db: Session = Depends(get_db)
):
    return get_tasks(db)


# Get one task by its ID.
@router.get(
    "/{task_id}",
    response_model=TaskResponse
)
def get_task_by_id(
    task_id: int,
    db: Session = Depends(get_db)
):
    return get_task(db, task_id)

# Update an existing task.
@router.put(
    "/{task_id}",
    response_model=TaskResponse
)
def update_task_route(
    task_id: int,
    task: TaskUpdate,
    db: Session = Depends(get_db),
):
    return update_existing_task(db, task_id, task)

# Delete a task by its ID.
@router.delete(
    "/{task_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
def delete_task_route(
    task_id: int,
    db: Session = Depends(get_db),
):
    delete_existing_task(db, task_id)

# Mark a task as complete.
@router.patch(
    "/{task_id}/complete",
    response_model=TaskResponse
)
def complete_task_route(
    task_id: int,
    db: Session = Depends(get_db),
):
    return complete_task(db, task_id)


# Search or filter tasks by keyword, status, or due date.
@router.get(
    "/",
    response_model=List[TaskResponse]
)
def get_all_tasks(
    search: str | None = None,
    status_filter: str | None = None,
    due_date: date | None = None,
    db: Session = Depends(get_db),
):
    if search:
        return search_task(db, search)

    if status_filter:
        return get_tasks_by_status(db, status_filter)

    if due_date:
        return get_tasks_by_due_date(db, due_date)

    return get_tasks(db)