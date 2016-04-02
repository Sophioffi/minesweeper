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
  var _gameSize = 10;

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
    var nrBombs = Math.round(_gameSize * _gameSize / 3);
    var nrBombsAdded = 0;
    while (nrBombsAdded < nrBombs) {
      var randomIndex = Math.round(Math.random() * (_gameSize * _gameSize));
      var randomCell = _cells.eq(randomIndex);
      if (!randomCell.hasClass('cell-bomb')) {
        randomCell.addClass('cell-bomb');
        nrBombsAdded++;
      }
    }
  };

  var distributeNumbers = function() {
    _cells.each(function(id, cell) {
      var tmId = id - _gameSize;
      var bmId = id + _gameSize;

      /*
      If we're on the left edge, set the left cell ids
      to -1, so that we don't consider them.
      Left edge cell: id multiple of game size
      */
      if (id % _gameSize == 0) {
        var tlId = -1;
        var mlId = -1;
        var blId = -1;
      } else {
        var tlId = tmId - 1;
        var mlId = id - 1;
        var blId = bmId - 1;
      }

      /*
      Same for the right edge.
      Right edge cell: subtracting `gameSize - 1` makes it
      a left edge cell.
      */
      if ((id - (_gameSize - 1)) % _gameSize == 0) {
        var trId = -1;
        var mrId = -1;
        var brId = -1;
      } else {
        var trId = tmId + 1;
        var mrId = id + 1;
        var brId = bmId + 1;
      }

      var idsToCheck = [
        tlId, tmId, trId,
        mlId, mrId,
        blId, bmId, brId
      ];

      var nrBombs = 0;
      for (idToCheck of idsToCheck) {
        if (idToCheck < 0 || idToCheck > _gameSize * _gameSize) {
          continue;
        }
        var cellToCheck = _cells.eq(idToCheck);
        if (cellToCheck.hasClass('cell-bomb')) {
          nrBombs++;
        }
      }

      $(cell).text(nrBombs);
    });
  }

  var init = function() {
    bindCells();
    clearCells();
    distributeBombs();
    distributeNumbers();
  };

  init();
});
