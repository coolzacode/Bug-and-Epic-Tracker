import { Epic, Ticket } from './models.js';

export let epicObjects = [
    new Epic('Uncategorized Issues')
];

export let allTickets = [];

export let activeEpicId = epicObjects[0].id;

export function setActiveEpicId(id) {
    activeEpicId = id;
}

export function getActiveEpic() {
    return epicObjects.find(epic => epic.id === activeEpicId);
}

export function getTicket(id) {
    return allTickets.find(ticket => ticket.id === id);
}

export function addEpic(name) {
    const newEpic = new Epic(name.toString());
    epicObjects.push(newEpic);
    return newEpic;
}

export function addTicketToEpic(epicId, ticketData) {
    const epic = epicObjects.find(epic => epic.id === epicId);
    if (!epic) return;

    const newTicket = new Ticket(
        ticketData.title,
        ticketData.dueDate,
        ticketData.priority,
        ticketData.description
    );

    allTickets.push(newTicket);
    epic.tickets.push(newTicket);
    return newTicket;
}

export function updateTicket(ticketId, updatedData) {
    const ticket = getTicket(ticketId);
    if (!ticket) return;

    ticket.title = updatedData.title;
    ticket.dueDate = updatedData.dueDate;
    ticket.priority = updatedData.priority;
    ticket.description = updatedData.description;
    ticket.status = updatedData.status;

    return ticket;
}

export function deleteTicket(epicId, ticketId) {
    const epic = epicObjects.find(epic => epic.id === epicId);
    if (!epic) return;
    allTickets = allTickets.filter(ticket => ticket.id !== ticketId);
    epic.tickets = epic.tickets.filter(ticket => ticket.id !== ticketId);
}