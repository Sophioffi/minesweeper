$(function() {
  // Remember all the cells in the page.
  var cells = $('.cell');

  /*
  Right click: toggle `cell-flag` class.
  */
  var bindCells = function() {
    cells.bind("contextmenu", function() {
      $(this).toggleClass('cell-flag');
      return false;
    });
  }

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
    bindCells();
    clearCells();
    distributeBombs();
  };

  init();
});