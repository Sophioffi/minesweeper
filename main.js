$(function() {
  // All the cells in the page.
  var _cells = $('.cell');

  // The possible states of the game.
  var _States = {};
  _States.playing = 1;
  _States.lost = 2;
  _States.won = 3;

  // The current state of the game.
  var _state = _States.playing;

  /*
  Left click:
    If the cell is a bomb, show a message ending the game.
    Otherwise, ...
  Right click: toggle `cell-flag` class.
  */
  var bindCells = function() {
    _cells.click(function(event) {
      if (event.which != 1) { return; }
      if ($(this).hasClass('cell-bomb')) {
        alert('Game Over');
        _state = _States.lost;
      }
    });
    _cells.bind('contextmenu', function() {
      $(this).toggleClass('cell-flag');
      return false;
    });
  };

  var clearCells = function() {
    _cells.removeClass('cell-bomb cell-flag');
  };

  /*
  Determine number of bombs, and randomly add them.
  */
  var distributeBombs = function() {
    var nrCells = _cells.length;
    var nrBombs = Math.round(nrCells / 3);
    var nrBombsAdded = 0;
    while (nrBombsAdded < nrBombs) {
      var randomIndex = Math.round(Math.random() * nrCells);
      var randomCell = _cells.eq(randomIndex);
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
