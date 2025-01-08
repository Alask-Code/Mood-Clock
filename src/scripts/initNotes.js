const tasks = [{
  did: true,
  value: 'Already did'
},
{
  did: false,
  value: 'Needs to do'
}];

export default function initNotes (element) {
  const input = document.querySelector('.add input');
  const addButton = element.querySelector('.add button');
  const notepad = element.querySelector('.notepad');
  const addRow = document.querySelector('.add');

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
          console.log(note);
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
    domTask.innerHTML = `
      <input type='checkbox' class='checker' ${task.did ? 'checked' : ''}  />
      ${task.value}
      `;

    element.insertBefore(domTask, addRow);
    registerToggler();
  }
  tasks.forEach(task => {
    updateState(notepad, task);
  });
  registerAdder({ input, addButton });
  registerToggler();
}
