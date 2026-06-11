import { Epic, Ticket } from './models.js';

export let epicObjects = [
    new Epic('Uncategorized Issues')
];

export let activeEpicId = epicObjects[0].id;

export function setActiveEpicId(id) {
    activeEpicId = id;
}

export function getActiveEpic() {
    return epicObjects.find(epic => epic.id === activeEpicId);
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

    epic.tickets.push(newTicket);
    return newTicket;
}

export function deleteTicket(epicId, ticketId) {
    const epic = epicObjects.find(epic => epic.id === epicId);
    if (!epic) return;
    epic.tickets = epic.tickets.filter(ticket => ticket.id !== ticketId);
}
