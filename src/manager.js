import { Epic, Ticket } from './models.js';

export let epicObjects = [
    new Epic('Uncategorized Issues')
];

export function addEpic(name) {
    const newEpic = new Epic(name.toString());
    epicObjects.push(newEpic);

    return newEpic;
}

export function addTicketToEpic(epicId, ticketData) {
    const epic = epicObjects.find(epic => epic.id === epicId);
    
    if (!epic) {
        console.error(`Epic with ID ${epicId} not found.`);
        return null;
    }

    const newTicket = new Ticket (
        ticketData.title,
        ticketData.dueDate,
        ticketData.priority,
        ticketData.description
    );

    epic.tickets.push(newTicket);
    return newTicket;
}

export function deleteTicket(epicId, ticketId) {
    const epic = epicObjects.find(epic => epic.id === epicId);

    if (!epic) return;

    epic.tickets = epic.tickets.filter(ticket => ticket.id !== ticketId);
}
