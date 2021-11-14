const JSON_URL = './dist/data/users.json';
const tableBody = document.getElementById('usersList');

const horizontalViewBtn = document.querySelectorAll('.horizontalView-btn');
const verticalViewBtn = document.querySelectorAll('.verticalView-btn');
const table = document.querySelectorAll('.table-users');

const search = document.getElementById('search');
const usersArr = [];

//************************************//
//             Build Page
//************************************//
displayUsersFromJSONFile();

//************************************//
//         Interact with Page
//************************************//
changeView();
searchUsers();

//***** Display users from JSON file *****//
function displayUsersFromJSONFile() {
  fetch(JSON_URL)
    .then((resp) => {
      return resp.json();
    })
    .then((users) => {
      usersArr.push(...users);
      users.forEach(user => {
        tableBody.innerHTML = tableBody.innerHTML + '<tr draggable="true">' + 
                                                      '<td>' + user.firstName + '</td>' +
                                                      '<td>' + user.lastName + '</td>' +
                                                      '<td class="user-img">' +
                                                        '<img src="' + user.picture + '" alt="">' +
                                                      '</td>' +
                                                      '<td>' + user.position + '</td>' +
                                                      '<td>' + user.tasks_xy + '</td>' +
                                                      '<td>' + user.finishedTasks + '</td>' +
                                                      '<td>' + user.assignedTasks + '</td>' +
                                                      '<td>' + user.CVlinkToFile + '</td>' +
                                                      '<td>' + user.dateStarted + '</td>' +
                                                    '</tr>';
      });
      // After DOM is loaded
      dragAndDropUsers();
    });
}

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
  const draggables = document.querySelectorAll('.table-users tr:not(.tableRow-heading)');
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

//***** Search users *****//
function searchUsers() {

  // Find matches
  function findMatches(wordToMatch, usersArr) {
    return usersArr.filter(user => {
      // here we need to figure out if the user matches to what was searched 
      const regex = new RegExp(wordToMatch, 'gi');
      return user.firstName.match(regex) || 
            user.lastName.match(regex) ||
            user.picture.match(regex) ||
            user.position.match(regex) ||
            user.tasks_xy.match(regex) ||
            user.finishedTasks.match(regex) ||
            user.assignedTasks.match(regex) ||
            user.CVlinkToFile.match(regex) ||
            user.dateStarted.match(regex);
    });
  }

  // Display matches
  function displayMatches() {
    const matchArray = findMatches(this.value, usersArr);
    const html = matchArray.map(user => {
      return `
      <tr draggable="true">
        <td> ${user.firstName} </td> 
        <td> ${user.lastName} </td>
        <td class="user-img">
          <img src=" ${user.picture} " alt="">
        </td>
        <td> ${user.position} </td>
        <td> ${user.tasks_xy} </td>
        <td> ${user.finishedTasks} </td>
        <td> ${user.assignedTasks} </td>
        <td> ${user.CVlinkToFile} </td>
        <td> ${user.dateStarted} </td>
      </tr>
      `;
    }).join('');
    tableBody.innerHTML = html;
    // After DOM is loaded
    dragAndDropUsers();
  }

  search.addEventListener('change', displayMatches);
  search.addEventListener('keyup', displayMatches);

}
