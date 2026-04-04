import { Task } from '../models/Task.js';
import { TaskRepository } from '../repositories/TaskRepository.js';
import { dateHelper } from '../utils/dateHelper.js';

const repository = new TaskRepository();

export const TaskService = {
  getAllTasks() {
    return repository.getAll();
  },

  addTask({ title, description, deadline, priority }) {
    if (!title || title.trim() === '') {
      throw new Error("Judul tugas wajib diisi");
    }

    // Set comparison to start of current minute to be more user-friendly
    const now = new Date();
    now.setSeconds(0, 0);
    
    if (deadline && new Date(deadline) < now) {
      throw new Error("Deadline tidak boleh kurang dari waktu sekarang");
    }

    const newTask = new Task({ title, description, deadline, priority });
    repository.add(newTask);
    return newTask;
  },

  editTask(id, updatedData) {
    if (!updatedData.title || updatedData.title.trim() === '') {
      throw new Error("Judul tugas wajib diisi");
    }
    
    // Only update provided fields to avoid wiping status/priority if accidentally missing
    repository.update(id, updatedData);
  },

  deleteTask(id) {
    repository.delete(id);
  },

  toggleStatus(id) {
    const tasks = repository.getAll();
    const task = tasks.find(t => t.id === id);
    if (task) {
      const newStatus = task.status === 'completed' ? 'pending' : 'completed';
      repository.update(id, { status: newStatus });
    }
  },

  filterTasks(tasks, { priority, status, deadlineRange }) {
    return tasks.filter(task => {
      let isPriorityMatch = priority === 'all' || task.priority === priority;
      let isStatusMatch = status === 'all' || task.status === status;
      let isDeadlineMatch = true;

      if (deadlineRange === 'week') {
        isDeadlineMatch = dateHelper.isThisWeek(task.deadline);
      } else if (deadlineRange === 'month') {
        isDeadlineMatch = dateHelper.isThisMonth(task.deadline);
      } else if (deadlineRange === 'overdue') {
        const dl = new Date(task.deadline);
        isDeadlineMatch = task.deadline && (dl < new Date()) && task.status !== 'completed';
      }

      return isPriorityMatch && isStatusMatch && isDeadlineMatch;
    });
  },

  sortTasks(tasks, sortBy = 'deadline_asc') {
    return tasks.sort((a, b) => {
      if (sortBy === 'deadline_asc') {
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(a.deadline) - new Date(b.deadline);
      } else if (sortBy === 'priority_desc') {
        const pMap = { high: 3, medium: 2, low: 1 };
        return pMap[b.priority] - pMap[a.priority];
      }
      return 0;
    });
  }
};
