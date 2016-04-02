$(function() {
  // Remember all the cells in the page.
  var cells = $('.cell');

  var clearCells = function() {
    cells.removeClass('cell-bomb cell-flag');
  }

  /*
  Determine number of bombs, and randomly add them.
  */
  var distributeBombs = function() {
    var nrCells = cells.length;
    var nrBombs = Math.round(nrCells / 3);
    var nrBombsAdded = 0;
    while (nrBombsAdded < nrBombs) {
      var randomIndex = Math.round(Math.random() * nrCells);
      var randomCell = cells.eq(randomIndex);
      if (!randomCell.hasClass('cell-bomb')) {
        randomCell.addClass('cell-bomb');
        nrBombsAdded++;
      }
    }
  };

  var init = function() {
    // For each of the cells, toggle the 'cell-flag' class on click.
    cells.click(function() {
      // Get the cell and toggle the class.
      $(this).toggleClass('cell-flag');
    });

    clearCells();

    distributeBombs();
  };

  init();
});