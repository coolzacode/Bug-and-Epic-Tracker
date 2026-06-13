export class Epic {
  constructor(name) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.tickets = [];
  }
}

export class Ticket {
  constructor(title, dueDate, priority, description = '', status = 'todo') {
    this.id = crypto.randomUUID();
    this.title = title;
    this.dueDate = dueDate;
    this.priority = priority;
    this.description = description;
    this.status = status;
  }
}
