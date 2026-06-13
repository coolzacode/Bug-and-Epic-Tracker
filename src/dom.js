export const epicContainer = document.getElementById('epic-list-container');
const ticketContainer = document.getElementById('ticket-grid-container');
const activeEpicTitle = document.getElementById('active-epic-title');

export function displayEpics(epics, activeId) {
  epicContainer.replaceChildren();
  const fragment = document.createDocumentFragment();

  epics.forEach((epic) => {
    const epicList = document.createElement('li');
    const epicButton = document.createElement('button');

    epicButton.type = 'button';
    epicButton.className = `epic-select-btn ${epic.id === activeId ? 'active' : ''}`;
    epicButton.dataset.epicId = epic.id;
    epicButton.textContent = epic.name;

    epicList.appendChild(epicButton);
    fragment.appendChild(epicList);
  });

  epicContainer.appendChild(fragment);
}

export function displayTickets(activeEpic) {
  ticketContainer.replaceChildren();
  activeEpicTitle.textContent = activeEpic.name;
  const fragment = document.createDocumentFragment();

  activeEpic.tickets.forEach((ticket) => {
    const ticketCard = document.createElement('li');
    const ticketTitle = document.createElement('h3');
    const ticketPriorityBadge = document.createElement('span');
    const ticketDue = document.createElement('p');
    const ticketActions = document.createElement('div');
    const viewButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    ticketCard.className = `ticket-card ${ticket.priority}`;
    ticketTitle.className = 'ticket-title';
    ticketPriorityBadge.className = `ticket-priority-badge ${ticket.priority}`;
    ticketDue.className = 'ticket-due';
    ticketActions.className = 'ticket-actions';

    viewButton.className = 'btn secondary btn-view-ticket';
    viewButton.dataset.ticketId = ticket.id;
    viewButton.type = 'button';

    deleteButton.className = 'btn danger btn-delete-ticket';
    deleteButton.type = 'button';
    deleteButton.dataset.ticketId = ticket.id;

    ticketTitle.textContent = `${ticket.title}`;
    ticketPriorityBadge.textContent = `${ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}`;
    ticketDue.textContent = `Due ${ticket.dueDate}`;
    viewButton.textContent = 'View/Edit';
    deleteButton.textContent = 'Delete';

    ticketActions.append(viewButton, deleteButton);
    ticketCard.append(
      ticketTitle,
      ticketPriorityBadge,
      ticketDue,
      ticketActions
    );
    fragment.appendChild(ticketCard);
  });

  ticketContainer.appendChild(fragment);
}
