export class Task {
  constructor({ id, title, description, deadline, priority, status }) {
    this.id = id || Date.now().toString();
    this.title = title;
    this.description = description || "";
    this.deadline = deadline; // ISO string 2025-05-20T23:59
    this.priority = priority || "low"; // "high", "medium", "low"
    this.status = status || "pending"; // "pending", "completed"
    this.createdAt = new Date().toISOString();
  }
}
