window.onload = changeView();

// Change view
function changeView() {
  const horizontalViewBtn = document.querySelectorAll('.horizontalView-btn');
  const verticalViewBtn = document.querySelectorAll('.verticalView-btn');
  const table = document.querySelectorAll('.table-users');

    console.log(verticalViewBtn);

    //verticalViewBtn.addEventListener('click', function() {
    //    table.classList.add('verticalView');
    //});

    verticalViewBtn.addEventListener("click", function() {
        console.log('hello');
      });
}