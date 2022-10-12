const div = document.querySelector('.div-list');
const input = document.getElementById('input');
const addBtn = document.querySelector('.add-btn');
const searchBtn = document.querySelector('.search-btn');
const ul = document.querySelector('.ul');
const divSpan = document.querySelector('.div-span');

const tasksArr = [];
let index = 0;

addBtn.addEventListener('click', () => addTask(input.value, false));
searchBtn.addEventListener('click', () => searchTask());

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.code === 'KeyY') {
    ul.replaceChildren();
    tasksArr.forEach(task => addTask(task, true))
  }
})

const addTask = (inputValue, show) => {
  if (!show) {
    tasksArr.push(inputValue);
  }
  const li = document.createElement('li');
  // li.document.createAttribute("my_attrib");
  li.dataset.id = index;
  li.textContent = inputValue;
  ul.appendChild(li);
  li.addEventListener('click', (e) => {
    index = 0;
    e.target.remove();
    tasksArr.splice(e.target.dataset.id, 1);
    const allLi = [...ul.querySelectorAll('li')];
    allLi.forEach(li => {
      li.dataset.id = index;
      index++;
    })
  });
  index++;
  input.value = "";
}

const searchTask = () => {
  if (input.value !== '' && tasksArr.length > 0) {
    const search = tasksArr.filter(task => task.includes(input.value));
    ul.replaceChildren();
    search.forEach(el => {
      const li = document.createElement('li');
      li.textContent = el;
      ul.appendChild(li);
    })
    divSpan.replaceChildren();
    const span = document.createElement('span');
    span.textContent = 'Aby wrócić do wszystkich zadań naciśnij CTRL + Y';
    divSpan.appendChild(span);
    input.value = "";
  } else {
    console.log('Musisz wpisać przynajmniej jeden znak');
  }
}