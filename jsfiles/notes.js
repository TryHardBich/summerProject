document.addEventListener('DOMContentLoaded', () => {
    const notesContainer = document.querySelector('.notes');
    const addBut = document.querySelector('.makenote');

    function createNote(title, text) {
        const noteEl = document.createElement('div');
        noteEl.classList.add('note');
        noteEl.innerHTML = `
        <div class="note-header">
            <textarea class="note-title">${title}</textarea>
            <div class="note-actions">
                <button class="note-edit"><i class="fa-solid fa-floppy-disk"></i></button>
                <button class="note-delete"><i class="fa-solid fa-delete-left"></i></button>
            </div>
        </div>
        <textarea class="note-text">${text}</textarea>
        `;

        noteEl.querySelector('.note-edit').addEventListener('click', () => editNote(noteEl));
        noteEl.querySelector('.note-delete').addEventListener('click', () => deleteNote(noteEl));
        
        return noteEl;
    }

    function editNote(noteEl) {
        const title = prompt('Edit the title:', noteEl.querySelector('.note-header p').textContent);
        const text = prompt('Edit the text:', noteEl.querySelector('p:nth-child(2)').textContent);
        if (title !== null && text !== null) {
            noteEl.querySelector('.note-header p').textContent = title;
            noteEl.querySelector('p:nth-child(2)').textContent = text;
        }
    }

    function deleteNote(noteEl) {
        noteEl.remove();
    }

    addBut.addEventListener('click', () => {
        const el = createNote("Заголовок", "Ваш текст");
        notesContainer.appendChild(el);
    })
});
