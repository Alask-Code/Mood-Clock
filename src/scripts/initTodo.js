export default function initTodo (element) {
  const toDos = loadToDos() || [];

  const newToDoInput = element.querySelector('.add input');
  const toDoList = element.querySelector('.todo-list');

  function loadToDos () {
    const savedtoDos = JSON.parse(localStorage.getItem('notes'));
    return savedtoDos || [];
  }

  function saveToDos () {
    if (toDos.length === 0) {
      localStorage.removeItem('notes');
    } else {
      const pendingToDos = toDos.filter(task => !task.did);
      if (pendingToDos.length === 0) {
        localStorage.removeItem('notes');
      } else {
        localStorage.setItem('notes', JSON.stringify(pendingToDos));
      }
    }
    updateState();
  }

  function addToDo (toDo) {
    toDos.push({
      id: Date.now(),
      did: false,
      content: toDo
    });
    saveToDos();
  }

  function updateToDo (toDoId) {
    try {
      console.log(toDoId);

      const toDo = toDos.find(toDo => toDo.id === toDoId);
      if (toDo) {
        toDo.did = !toDo.did;
        saveToDos();
      }
    } catch (error) {
      console.error('Erro ao atualizar a tarefa');
    }
  }

  function updateState () {
    const toDoElements = toDoList.querySelectorAll('.todo-item');
    toDoElements.forEach(toDoElement => toDoElement.remove());

    toDos.forEach(toDo => {
      const toDoElement = document.createElement('div');
      toDoElement.classList.add('todo-item');
      toDoElement.innerHTML = `
          <input type="checkbox" ${toDo.did ? 'checked' : ''}>
          <p class="${toDo.did ? 'did' : ''}">${toDo.content}</p>
      `;

      const checkbox = toDoElement.querySelector('input[type="checkbox"]');
      checkbox.addEventListener('change', () => updateToDo(toDo.id));

      toDoList.appendChild(toDoElement);
    });
  }

  const addToDoButton = element.querySelector('.add button');
  addToDoButton.onclick = () => {
    const taskContent = newToDoInput.value.trim();
    if (taskContent) {
      addToDo(taskContent);
      newToDoInput.value = '';
      newToDoInput.focus();
    }
  };
  const closeToDoPage = element.querySelector('.label');
  closeToDoPage.onclick = () => {
    toDoList.classList.toggle('hidden');
  };
  updateState();
}
