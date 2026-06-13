import { Epic, Ticket } from './models.js';

export let epicObjects = [];

export let allTickets = [];

export let activeEpicId = null;

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
    saveToLocalStorage();
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
    saveToLocalStorage();
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

    saveToLocalStorage();
    return ticket;
}

export function deleteTicket(epicId, ticketId) {
    const epic = epicObjects.find(epic => epic.id === epicId);
    if (!epic) return;
    allTickets = allTickets.filter(ticket => ticket.id !== ticketId);
    epic.tickets = epic.tickets.filter(ticket => ticket.id !== ticketId);

    saveToLocalStorage();
}

export function saveToLocalStorage() {
    localStorage.setItem('user-epics', JSON.stringify(epicObjects));
}

export function loadFromLocalStorage() {
    const rawData = localStorage.getItem('user-epics');

    epicObjects.length = 0;
    allTickets.length = 0;

    if (rawData) {
        const parsedEpics = JSON.parse(rawData);

        parsedEpics.forEach(rawEpic => {
            const epic = new Epic(rawEpic.name);
            epic.id = rawEpic.id;

            if (rawEpic.tickets) {
                rawEpic.tickets.forEach(rawTicket => {
                    const ticket = new Ticket(
                        rawTicket.title,
                        rawTicket.dueDate,
                        rawTicket.priority,
                        rawTicket.description
                    );
                    ticket.id = rawTicket.id; 
                    ticket.status = rawTicket.status || 'todo';
    
                    epic.tickets.push(ticket);
                    allTickets.push(ticket);
                });
            }
            epicObjects.push(epic);
        });
    }

    // if local storage is empty
    if (epicObjects.length === 0) {
        const defaultEpic = new Epic('Uncategorized Issues');
        epicObjects.push(defaultEpic);
    }

    activeEpicId = epicObjects[0].id;
}