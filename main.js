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
  var _nrBombs = Math.round(_gameSize * _gameSize / 3);

  var revealCell = function(id, cell) {
    if ($(cell).hasClass('cell-revealed')) { return; }

    $(cell).addClass('cell-revealed');
    $(cell).text($(cell).attr('data-nr-bombs'));

    if ($(cell).attr('data-nr-bombs') == 0) {
      processNeighbours(id, function(neighbourId, neighbourCell) {
        revealCell(neighbourId, neighbourCell);
      });
    }
  }

  /*
  Left click:
    If the cell is a bomb, show a message ending the game.
    Otherwise, ...
  Right click: toggle `cell-flag` class.
  */
  var bindCells = function() {
    _cells.click(function(event) {
      if (_state != _States.playing) { return; }
      if (event.which != 1) { return; }
      var id = _cells.index(this);
      if ($(this).hasClass('cell-bomb')) {
        $('.cell-bomb').addClass('cell-bomb-visible');
        _state = _States.lost;
        $('#message').text('Game Over!');
      } else {
        revealCell(id, this);
        if ($('.cell-revealed').length == _gameSize * _gameSize - _nrBombs) {
          _state = _States.won;
          $('#message').text('You Win!');
        }
      }
    });
    _cells.bind('contextmenu', function() {
      if (_state != _States.playing) { return false; }
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
    var nrBombsAdded = 0;
    while (nrBombsAdded < _nrBombs) {
      var randomIndex = Math.round(Math.random() * (_gameSize * _gameSize));
      var randomCell = _cells.eq(randomIndex);
      if (!randomCell.hasClass('cell-bomb')) {
        randomCell.addClass('cell-bomb');
        nrBombsAdded++;
      }
    }
  };

  /*
  Find cell with given id, then run a certain function (`thingToDo`)
  for each of its neighbours, supplying that neighbour's id and cell.
  */
  var processNeighbours = function(id, thingToDo) {
    var cell = _cells.eq(id);

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

    for (idToCheck of idsToCheck) {
      if (idToCheck < 0 || idToCheck > _gameSize * _gameSize) {
        continue;
      }
      var cellToCheck = _cells.eq(idToCheck);
      thingToDo(idToCheck, cellToCheck);
    }
  };

  /*
  For each cell, look at its neighbours, and count how many bombs there
  are. Remember this in the cell.
  */
  var distributeNumbers = function() {
    _cells.each(function(id, cell) {
      var nrBombs = 0;
      processNeighbours(id, function(neighbourId, neighbourCell) {
        if (neighbourCell.hasClass('cell-bomb')) {
          nrBombs++;
        }
      });
      if (!$(cell).hasClass('cell-bomb')) {
        $(cell).attr('data-nr-bombs', nrBombs);
      };
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
