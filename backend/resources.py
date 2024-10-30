from flask_restful import Resource
from flask import request
from backend.models import Task, db
from ai_utls import get_task_priority

class TaskListResource(Resource):
    def get(self):
        tasks = Task.query.all()
        return [task.to_dict() for task in tasks], 200

    def post(self):
        data = request.get_json()
        description = data.get('description', '')
        priority = get_task_priority(description)

        new_task = Task(
            title=data['title'],
            description=description,
            due_date=data.get('due_date'),
            priority=priority,
            status=data.get('status', 'pending')
        )
        db.session.add(new_task)
        db.session.commit()
        return new_task.to_dict(), 201

# ... (TaskResource remains the same)



class TaskResource(Resource):
    def get(self, task_id):
        task = Task.query.get_or_404(task_id)
        return task.to_dict(), 200

    def put(self, task_id):
        data = request.get_json()
        task = Task.query.get_or_404(task_id)

        task.title = data.get('title', task.title)
        task.description = data.get('description', task.description)
        task.due_date = data.get('due_date', task.due_date)
        task.priority = data.get('priority', task.priority)
        task.status = data.get('status', task.status)

        db.session.commit()
        return task.to_dict(), 200

    def delete(self, task_id):
        task = Task.query.get_or_404(task_id)
        db.session.delete(task)
        db.session.commit()
        return '', 204
