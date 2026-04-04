const STORAGE_KEY = "smart_tasks";

export class TaskRepository {
  getAll() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  save(tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  add(task) {
    const tasks = this.getAll();
    tasks.push(task);
    this.save(tasks);
  }

  update(id, updatedTask) {
    const tasks = this.getAll();
    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...updatedTask };
      this.save(tasks);
    }
  }

  delete(id) {
    const tasks = this.getAll().filter(t => t.id !== id);
    this.save(tasks);
  }
}
