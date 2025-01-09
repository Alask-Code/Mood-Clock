export default function initTodo (element) {
  const toDos = loadToDos() || [];

  const addToDoButton = element.querySelector('.add button');
  const newToDoInput = element.querySelector('.add input');
  const toDoList = element.querySelector('.todo-list');

  function loadToDos () {
    const savedtoDos = JSON.parse(localStorage.getItem('notes'));
    return savedtoDos ? savedtoDos.filter(task => !task.did) : [];
  }

  function saveToDos () {
    localStorage.setItem('notes', JSON.stringify(toDos));
    updateState();
  }

  function addToDo (toDo) {
    toDos.push({
      id: toDos.length + 1,
      did: false,
      content: toDo
    });
    saveToDos();
  }

  function updateToDo (toDoId) {
    try {
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

  addToDoButton.onclick = () => {
    const taskContent = newToDoInput.value.trim();
    if (taskContent) {
      addToDo(taskContent);
      newToDoInput.value = '';
      newToDoInput.focus();
    }
  };

  updateState();
}
