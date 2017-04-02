import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../../../task';

@Component({
  moduleId: module.id,
  selector: 'tasks',
  templateUrl: `tasks.component.html`
})
export class TasksComponent {

  tasks: Object[];
  title: String;

  constructor(private taskService:TaskService) {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    })
  }

  addTask(event) {
    event.preventDefault();
    var newTask = {
      title: this.title,
      isDone: false
    };
    this.taskService.addTask(newTask)
      .subscribe(task => {
        this.tasks.push(newTask);
        this.title='';
      })
  }

  deleteTask(taskId) {
    event.preventDefault();
    var tasks = this.tasks;
    this.taskService.deleteTask(taskId)
      .subscribe(data => {
        for (var i=0; i<tasks.length; i++) {
          if (tasks[i]._id == taskId) {
            tasks.splice(i, 1);
            break;
          }
        }
      })
  }

  updateStatus(task) {
    var updTask = {
      _id: task._id,
      title: task.title,
      isDone: !task.isDone
    }

    this.taskService.updateTask(updTask)
      .subscribe( data => { task.isDone = !task.isDone; });
  }
}
