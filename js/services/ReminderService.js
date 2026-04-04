import { NotificationService } from './NotificationService.js';
import { TaskService } from './TaskService.js';

export const ReminderService = {
  intervalId: null,

  startReminderChecker(intervalMinutes = 60) {
    this.checkNow();
    
    const intervalMs = intervalMinutes * 60 * 1000;
    
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    
    this.intervalId = setInterval(() => {
      this.checkNow();
    }, intervalMs);
  },

  checkNow() {
    const tasks = TaskService.getAllTasks();
    NotificationService.checkReminders(tasks);
  },

  stopChecker() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
};
