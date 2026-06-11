export const epicContainer = document.getElementById('epic-list-container');

export function displayEpics(epics) {
    epicContainer.replaceChildren();
    const fragment = document.createDocumentFragment();

    epics.forEach((epic, index) => {
        const epicList = document.createElement('li');
        const epicButton = document.createElement('button');

        epicButton.type = 'button';
        epicButton.className = 'epic-select-btn';
        epicButton.dataset.epicId = `${epic.id}`;
        epicButton.textContent = `Epic ${index}: ${epic.name}`;

        epicList.appendChild(epicButton);
        fragment.appendChild(epicList);
    });
    epicContainer.appendChild(fragment);
}

export function displayTickets(epics, id) {
    const ticketContainer = document.getElementById('ticket-grid-container');
    ticketContainer.replaceChildren();
    const fragment = document.createDocumentFragment();

    const activeEpic = epics.find(epic => epic.id === id);

    if (activeEpic === undefined) return;

    activeEpic.tickets.forEach(ticket => {
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
        ticketActions.type = 'button';
        ticketActions.className = 'ticket-actions';
        viewButton.className = 'btn secondary btn-view-ticket';
        deleteButton.className = 'btn danger btn-delete-ticket';

        ticketTitle.textContent = `${ticket.title}`;
        ticketPriorityBadge.textContent = `${ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}`;
        ticketDue.textContent = `${ticket.dueDate}`;
        viewButton.textContent = 'View/Edit';
        deleteButton.textContent = 'Delete';

        ticketActions.append(viewButton, deleteButton);
        ticketCard.append(ticketTitle, ticketPriorityBadge, ticketDue, ticketActions);
        fragment.appendChild(ticketCard);
    });
    ticketContainer.appendChild(fragment);
}