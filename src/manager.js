import { Epic, Ticket } from './models.js';

export let epicObjects = [
    new Epic('Uncategorized Issues')
];

export function addEpic(name) {
    const newEpic = new Epic(name.toString());
    epicObjects.push(newEpic);

    return newEpic;
}

export function addTicketToEpic(epic, ticket) {
    epic.tickets.push(ticket);
    return ticket;
}

export function deleteTicket(epicId, ticketId) {
    const epic = epicObjects.find(epic => epic.id === epicId);

    if (!epic) return;

    epic.tickets = epic.tickets.filter(ticket => ticket.id !== ticketId);
}
