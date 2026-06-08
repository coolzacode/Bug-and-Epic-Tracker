import './styles.css';
import { Epic, Ticket } from './models.js';
import { epicObjects, addEpic, addTicketToEpic, deleteTicket } from './manager.js'

console.log('Default state:', epicObjects);

const newEpic = addEpic('New Epic');

addTicketToEpic(newEpic.id, {
    title: 'Fix login crash',
    dueDate: '06-10-2026',
    priority: 'critical',
    description: 'App crashes on enter key.'
});

const lowPriorityTicket = addTicketToEpic(newEpic.id, {
    title: 'Change button color',
    dueDate: '06-10-2026',
    priority: 'low',
    description: 'Make it a lighter red.'
});

console.log("After adding data", epicObjects);

deleteTicket(newEpic.id, lowPriorityTicket.id);

console.log("After deletion:", epicObjects);
