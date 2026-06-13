import './styles.css';
import {
  epicObjects,
  activeEpicId,
  setActiveEpicId,
  getActiveEpic,
  getTicket,
  addEpic,
  addTicketToEpic,
  updateTicket,
  deleteTicket,
  loadFromLocalStorage,
} from './manager.js';
import { epicContainer, displayEpics, displayTickets } from './dom.js';

const createEpicBtn = document.getElementById('btn-new-epic');
const createTicketBtn = document.getElementById('btn-new-ticket');
const epicModal = document.getElementById('epic-modal');
const ticketModal = document.getElementById('ticket-modal');
const epicForm = document.getElementById('epic-form');
const ticketForm = document.getElementById('ticket-form');
const ticketContainer = document.getElementById('ticket-grid-container');
const closeButtons = document.querySelectorAll('.btn-close-modal');

// UI
loadFromLocalStorage();
displayEpics(epicObjects, activeEpicId);
displayTickets(getActiveEpic());

// Modal Controls
createEpicBtn.addEventListener('click', () => epicModal.showModal());
createTicketBtn.addEventListener('click', () => ticketModal.showModal());

function closeAndResetModals() {
  epicForm.reset();
  ticketForm.reset();
  ticketForm.removeAttribute('data-editing-id');
  epicModal.close();
  ticketModal.close();
}

closeButtons.forEach((btn) => {
  btn.addEventListener('click', closeAndResetModals);
});

// Form Submissions
function handleEpicSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);

  const newEpic = addEpic(formData.get('name'));
  setActiveEpicId(newEpic.id);

  closeAndResetModals();
  displayEpics(epicObjects, activeEpicId);
  displayTickets(getActiveEpic());
}

function handleTicketSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const editingId = ticketForm.getAttribute('data-editing-id');

  const ticketData = {
    title: formData.get('title'),
    dueDate: formData.get('dueDate'),
    priority: formData.get('priority'),
    description: formData.get('description'),
    status: formData.get('status'),
  };

  const activeEpic = getActiveEpic();

  if (editingId) {
    updateTicket(editingId, ticketData);
  } else {
    addTicketToEpic(activeEpic.id, ticketData);
  }

  closeAndResetModals();
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

// Ticket Actions
ticketContainer.addEventListener('click', (e) => {
  const ticketId = e.target.dataset.ticketId;
  const currentEpic = getActiveEpic();

  if (e.target.classList.contains('btn-delete-ticket')) {
    deleteTicket(currentEpic.id, ticketId);
    displayTickets(currentEpic);
  }

  if (e.target.classList.contains('btn-view-ticket')) {
    const ticket = getTicket(ticketId);
    if (!ticket) return;

    ticketForm.querySelector('#modal-ticket-title').value = ticket.title;
    ticketForm.querySelector('#modal-due-date').value = ticket.dueDate;
    ticketForm.querySelector('#modal-priority').value = ticket.priority;
    ticketForm.querySelector('#modal-status').value = ticket.status;
    ticketForm.querySelector('#modal-desc-text').value = ticket.description;

    ticketForm.setAttribute('data-editing-id', ticket.id);

    ticketModal.showModal();
  }
});
