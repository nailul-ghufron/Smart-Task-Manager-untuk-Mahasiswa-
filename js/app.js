import { NotificationService } from './services/NotificationService.js';
import { ReminderService } from './services/ReminderService.js';
import { UIController } from './controllers/UIController.js';

document.addEventListener('DOMContentLoaded', () => {
  // Request notification permission if needed
  NotificationService.requestPermission();

  // Start the UI
  UIController.init();

  // Start reminder checker (checks every 60 minutes)
  ReminderService.startReminderChecker(60);
});
