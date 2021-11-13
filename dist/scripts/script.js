const horizontalViewBtn = document.querySelectorAll('.horizontalView-btn');
const verticalViewBtn = document.querySelectorAll('.verticalView-btn');
const table = document.querySelectorAll('.table-users');

const draggables = document.querySelectorAll('.table-users tr:not(.tableRow-heading)');

changeView();
dragAndDropUsers();

//***** Change view *****//
function changeView() {

  // Blocks
  verticalViewBtn[0].addEventListener('click', () => {
      table[0].classList.add('verticalView');
  });

  // Rows
  horizontalViewBtn[0].addEventListener('click', () => {
    table[0].classList.remove('verticalView');
  });
    
}

//***** Drag and drop users *****//
function dragAndDropUsers() {
  // Dragstart and Dragend
  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
      draggable.classList.add('dragging');
    });

    draggable.addEventListener('dragend', () => {
      draggable.classList.remove('dragging');
    });
  });

  // Drop row
  const containers = document.querySelectorAll('.table-users tr:not(.tableRow-heading, .dragging)');

  containers.forEach(container => {
    container.addEventListener('dragover', e => {
      e.preventDefault();
      const draggable = document.querySelectorAll('.dragging');
      container.before(draggable[0]);
    });
  });
  
}