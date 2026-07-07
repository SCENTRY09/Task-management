from datetime import date, datetime

from pydantic import BaseModel, Field, field_validator, ConfigDict


class TaskBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    description: str | None = None
    due_date: date

    @field_validator("title")
    @classmethod
    def validate_title(cls, value: str) -> str:
        if not value.strip():
            raise ValueError("Title cannot be empty")
        return value

    @field_validator("due_date")
    @classmethod
    def validate_due_date(cls, value: date) -> date:
        if value < date.today():
            raise ValueError("Due date cannot be in the past")
        return value


class TaskCreate(TaskBase):
    pass


class TaskUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=1, max_length=255)
    description: str | None = None
    due_date: date | None = None
    status: str | None = None

    @field_validator("title")
    @classmethod
    def validate_title(cls, value):
        if value is not None and not value.strip():
            raise ValueError("Title cannot be empty")
        return value

    @field_validator("due_date")
    @classmethod
    def validate_due_date(cls, value):
        if value is not None and value < date.today():
            raise ValueError("Due date cannot be in the past")
        return value


class TaskResponse(TaskBase):
    id: int
    status: str
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)