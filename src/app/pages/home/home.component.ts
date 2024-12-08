import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  // array of strings with the step-by-step to create an angular project
  tasks = signal<Task[]>([
    { id: 1, title: 'Install Node.js', done: true },
    { id: 2, title: 'Install Angular CLI', done: false },
    { id: 3, title: 'Create a new project', done: false },
    { id: 4, title: 'Serve the project', done: false },
  ]);

  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    this.addTask(input.value);
  }

  addTask(title: string) {
    const newTask = {
      id: this.tasks.length + 1,
      title: title,
      done: false,
    };
    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  toggleTask(id: number) {
    this.tasks.update((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  deleteTask(id: number) {
    this.tasks.update((tasks) => tasks.filter((task) => task.id !== id));
  }
}
