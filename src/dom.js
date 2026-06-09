export const epicContainer = document.getElementById('epic-list-container');

export function displayEpics(epics) {
    epicContainer.replaceChildren();
    const fragment = document.createDocumentFragment();

    epics.forEach((epic, index) => {
        const epicList = document.createElement('li');
        const epicButton = document.createElement('button');

        epicButton.type = 'button';
        epicButton.className = 'epic-select-btn';
        epicButton.dataset.epicID = `${epic.id}`;
        epicButton.textContent = `Epic ${index}: ${epic.name}`;

        epicList.appendChild(epicButton);
        fragment.appendChild(epicList);
    });
    epicContainer.appendChild(fragment);
}

