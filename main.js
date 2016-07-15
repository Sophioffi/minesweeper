$(function() {
  // All the cells in the page.
  var _cells = $('.cell');
  var _gameSize = 6;
  var _allCells = 36;

  var revealCell = function(id, cell) {
    if ($(cell).hasClass('cell-revealed')) { return; }

    $(cell).addClass('cell-revealed');
    $(cell).css('border', $(cell).css('backgroundColor'));
//    $(cell).css('border', '3px solid #f6f6f6');
  }

  var bindEvents = function() 
  {
    _cells.click(function(event) {
      var id = _cells.index(this);
      revealCell(id, this);
    });
    _cells.bind('contextmenu', function() {
      return false;
    });
  };

  var distributeColour = function() 
  {
    var colourTable = ["52000C", "830014", "941A20", "8C0F28", "DD103F", "B4082C", "D1002D", "D6004D", "FB0007", "DC2B29"];
    var bordercolourTable = ["52000C", "830014", "941A20", "8C0F28", "DD103F", "B4082C", "D1002D", "D6004D", "FB0007", "DC2B29"]
    var cusid_ele = document.getElementsByClassName('cell');
    for (var i = 0; i < cusid_ele.length; ++i) 
    {
      var item = cusid_ele[i]; 
      var randomIndex = Math.round(Math.random() * 9);
      item.style.backgroundColor = '#' + colourTable[randomIndex]; 
      item.style.border = '3px outset '+ '#' + bordercolourTable[randomIndex]
    };
  };
  


  var init = function() 
  {
    bindEvents();
    distributeColour();
  };

  init();
});
