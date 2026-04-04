export const NotificationService = {
  requestPermission() {
    if ("Notification" in window && Notification.permission !== "granted" && Notification.permission !== "denied") {
      Notification.requestPermission();
    }
  },

  sendNotification(title, body) {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(title, { body });
    } else {
      console.log(`Fallback Alert: ${title} - ${body}`);
      // Could show in-app toast here if needed
    }
  },

  getNotifiedIds() {
    const data = localStorage.getItem("notification_log");
    return data ? JSON.parse(data) : [];
  },

  addToNotifiedLog(id) {
    const logs = this.getNotifiedIds();
    if (!logs.includes(id)) {
      logs.push(id);
      localStorage.setItem("notification_log", JSON.stringify(logs));
    }
  },

  checkReminders(tasks) {
    const now = new Date();
    const notifiedIds = this.getNotifiedIds();

    tasks.forEach(task => {
      // Don't notify if completed or no deadline
      if (task.status === "completed" || !task.deadline) return;

      const deadlineDate = new Date(task.deadline);
      const diffMs = deadlineDate - now;
      const hoursRemaining = diffMs / (1000 * 60 * 60);

      // Notify if within 24 hours, and hasn't been notified yet
      if (hoursRemaining > 0 && hoursRemaining <= 24 && !notifiedIds.includes(task.id)) {
        const isToday = deadlineDate.getDate() === now.getDate() && deadlineDate.getMonth() === now.getMonth() && deadlineDate.getFullYear() === now.getFullYear();
        const timeStr = isToday ? "hari ini" : "besok";
        
        this.sendNotification(
          "Pengingat Tugas",
          `"${task.title}" deadline ${timeStr}!`
        );
        this.addToNotifiedLog(task.id);
      }
    });
  }
};
