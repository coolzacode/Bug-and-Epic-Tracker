import './styles.css';
import { Epic, Ticket } from './models.js';
import { epicObjects, addEpic, addTicketToEpic, deleteTicket } from './manager.js'
import { epicContainer, displayEpics, displayTickets } from './dom.js';

const authEpic = addEpic("auth System");


const bug1 = new Ticket('Fix login crash', '06-08-2026', 'critical');
const bug2 = new Ticket('Update border colors', '06-10-2026', 'low');

authEpic.tickets.push(bug1);
authEpic.tickets.push(bug2);

displayEpics(epicObjects);


epicContainer.addEventListener('click', (e) => {
    const target = e.target;
    const targetId = target.dataset.epicId;

    console.log(target);
    console.log(targetId);

    displayTickets(epicObjects, targetId);
});