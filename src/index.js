import './styles.css';
import { Epic, Ticket } from './models.js';
import { epicObjects, addEpic, addTicketToEpic, deleteTicket } from './manager.js'
import { epicContainer, displayEpics, displayTickets } from './dom.js';

const createEpic = document.getElementById('btn-new-epic');
const epicModal = document.getElementById('epic-modal');
const ticketModal = document.getElementById('ticket-modal');
const epicForm = document.getElementById('epic-form');

function handleEpicSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    addEpic(formData.get('name'));

    e.target.reset();
    epicModal.close();
    displayEpics(epicObjects);
}




createEpic.addEventListener('click', () => {
    epicModal.showModal();
});
epicForm.addEventListener('submit', handleEpicSubmit);


epicContainer.addEventListener('click', (e) => {
    const target = e.target;
    const targetId = target.dataset.epicId;

    console.log(target);
    console.log(targetId);

    displayTickets(epicObjects, targetId);
});