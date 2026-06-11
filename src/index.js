import './styles.css';
import { Epic, Ticket } from './models.js';
import { epicObjects, addEpic, addTicketToEpic, deleteTicket } from './manager.js'
import { epicContainer, displayEpics, displayTickets } from './dom.js';

const createEpic = document.getElementById('btn-new-epic');
const createTicket = document.getElementById('btn-new-ticket');
const epicModal = document.getElementById('epic-modal');
const ticketModal = document.getElementById('ticket-modal');
const epicForm = document.getElementById('epic-form');
const ticketForm = document.getElementById('ticket-form');

function handleEpicSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    addEpic(formData.get('name'));

    e.target.reset();
    epicModal.close();
    displayEpics(epicObjects);
}

function handleTicketSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newTicket = new Ticket (
        formData.get('title'),
        formData.get('dueDate'),
        formData.get('priority'),
        formData.get('description')
    );

    const activeEpic = epicObjects.find(epic => epic.active === true);
    addTicketToEpic(activeEpic, newTicket);
    console.log(activeEpic);

    e.target.reset();
    ticketModal.close();
    displayTickets(activeEpic);
}

createEpic.addEventListener('click', () => {
    epicModal.showModal();
});

createTicket.addEventListener('click', () => {
    ticketModal.showModal();
});

epicForm.addEventListener('submit', handleEpicSubmit);
ticketForm.addEventListener('submit', handleTicketSubmit);

epicContainer.addEventListener('click', (e) => {
    epicObjects.forEach(epic => {
        epic.active = false;
    });

    const elementType = e.target.tagName;
    if (elementType !== 'BUTTON') return;
    
    const epicContainerGrandChildren = document.querySelectorAll('#epic-list-container > * > *');
    epicContainerGrandChildren.forEach(button => {
        button.classList.remove('active');
    });

    const target = e.target;
    const targetId = target.dataset.epicId;
    const activeEpic = epicObjects.find(epic => epic.id === targetId);

    activeEpic.active = true;
    target.classList.toggle('active');

    displayTickets(activeEpic);
});