
export default function initNotes (element) {
  const input = document.querySelector('.add input');
  const addButton = element.querySelector('.add button');
  const notepad = element.querySelector('.notepad');
  const addRow = document.querySelector('.add');

  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  tasks.forEach(task => {
    updateState(notepad, task);
  });
  function createTask (task) {
    const newTask = {
      id: tasks.length + 1,
      did: false,
      value: task
    };
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateState(notepad, newTask);
  }

  function registerAdder ({ input, addButton }) {
    addButton.onclick = () => { createTask(input.value); };
  }
  function registerToggler () {
    const notes = notepad.querySelectorAll('.note');
    notes.forEach(note => {
      note.querySelector('input').onchange = () => {
        if (note.querySelector('input').checked) {
          tasks[note.id].did = true;
          localStorage.setItem('tasks', JSON.stringify(tasks));

          note.classList.toggle('did');
        } else {
          note.classList.toggle('did');
        }
      };
    });
  }

  function updateState (element, task) {
    const domTask = document.createElement('div');

    domTask.classList.add('note');
    domTask.classList.toggle(task.did ? 'did' : 'undid');
    domTask.id = task.id;
    domTask.innerHTML = `
      <input type='checkbox' class='checker' ${task.did ? 'checked' : ''}  />
      ${task.value}
      `;

    element.insertBefore(domTask, addRow);
    registerToggler();
  }

  registerAdder({ input, addButton });
  registerToggler();
}
