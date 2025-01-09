export default function initNotes (element) {
  const tasks = loadNotes() || [];

  const addNoteButton = element.querySelector('.add button');
  const newNoteContent = element.querySelector('.add input');
  const notepadContent = element.querySelector('.notepad');

  function loadNotes () {
    const savedNotes = JSON.parse(localStorage.getItem('notes'));
    return savedNotes ? savedNotes.filter(task => !task.did) : [];
  }

  function saveNotes () {
    localStorage.setItem('notes', JSON.stringify(tasks));
    updateState();
  }

  function addTask (content) {
    tasks.push({
      id: tasks.length + 1,
      did: false,
      content
    });
    saveNotes();
  }

  function updateTask (taskId) {
    try {
      const task = tasks.find(t => t.id === taskId);
      if (task) {
        task.did = !task.did; // Alterna o estado da tarefa
        saveNotes(); // Salva após a atualização
      }
    } catch (error) {
      console.error('Erro ao atualizar a tarefa');
    }
  }

  function updateState () {
    const tasksElements = notepadContent.querySelectorAll('.task');
    tasksElements.forEach(taskElement => taskElement.remove());

    tasks.forEach(task => {
      const taskElement = document.createElement('div');
      taskElement.classList.add('task');
      taskElement.innerHTML = `
        <label>
          <input type="checkbox" ${task.did ? 'checked' : ''}>
          <span class="${task.did ? 'did' : ''}">${task.content}</span>
        </label>
      `;

      const checkbox = taskElement.querySelector('input[type="checkbox"]');
      checkbox.addEventListener('change', () => updateTask(task.id));

      notepadContent.appendChild(taskElement);
    });
  }

  addNoteButton.onclick = () => {
    const taskContent = newNoteContent.value.trim();
    if (taskContent) {
      addTask(taskContent);
      newNoteContent.value = '';
    }
  };

  updateState();
}
