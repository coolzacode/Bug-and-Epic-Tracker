import './styles.css';
import { epicObjects, activeEpicId, setActiveEpicId, getActiveEpic, addEpic, addTicketToEpic, deleteTicket } from './manager.js'
import { epicContainer, displayEpics, displayTickets } from './dom.js';

const createEpicBtn = document.getElementById('btn-new-epic');
const createTicketBtn = document.getElementById('btn-new-ticket');
const epicModal = document.getElementById('epic-modal');
const ticketModal = document.getElementById('ticket-modal');
const epicForm = document.getElementById('epic-form');
const ticketForm = document.getElementById('ticket-form');
const ticketContainer = document.getElementById('ticket-grid-container');
const closeButtons = document.querySelectorAll('#btn-close-modal');

// Default UI
displayEpics(epicObjects, activeEpicId);
displayTickets(getActiveEpic());

// Modal Controls
createEpicBtn.addEventListener('click', () => epicModal.showModal());
createTicketBtn.addEventListener('click', () => ticketModal.showModal());

closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        epicModal.close();
        ticketModal.close();
    });
});

// Form Submissions
function handleEpicSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newEpic = addEpic(formData.get('name'));
    setActiveEpicId(newEpic.id);

    e.target.reset();
    epicModal.close();

    displayEpics(epicObjects, activeEpicId);
    displayTickets(getActiveEpic());
}

function handleTicketSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const ticketData = {
        title: formData.get('title'),
        dueDate: formData.get('dueDate'),
        priority: formData.get('priority'),
        description: formData.get('description')
    };

    const activeEpic = getActiveEpic();
    addTicketToEpic(activeEpic.id, ticketData);

    e.target.reset();
    ticketModal.close();

    displayTickets(activeEpic);
}

epicForm.addEventListener('submit', handleEpicSubmit);
ticketForm.addEventListener('submit', handleTicketSubmit);

// Sidebar
epicContainer.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') return;

    const targetId = e.target.dataset.epicId;
    setActiveEpicId(targetId);

    displayEpics(epicObjects, activeEpicId);
    displayTickets(getActiveEpic());
});

// Delete Ticket
ticketContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-delete-ticket')) {
        const ticketId = e.target.dataset.ticketId;
        const currentEpic = getActiveEpic();

        deleteTicket(currentEpic.id, ticketId);
        displayTickets(currentEpic);
    }
});