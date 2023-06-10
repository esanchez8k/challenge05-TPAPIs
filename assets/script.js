const thelocale = {};
  dayjs.locale(thelocale);

$(function () {

  const currentHour = dayjs().format('H');


    function saveInput() {
      $('.saveBtn').on('click', function() {
        var timeBlock = $(this).parent().attr("id");
        // Get the user input from the input field in the same time-block
        var userInput = $(this).siblings(".description").val();
        // Save the user input in local storage using the time-block id as the key
        localStorage.setItem(timeBlock, userInput);
      });
    }

    saveInput();  
  
  function colorChange() {
    $('.row time-block').each(function() {
      const timeBlockHour = parseInt(this.id);
      if (timeBlockHour < currentHour) {
        $(this).removeClass("row time-block").addClass("past");
      } else if (timeBlockHour === currentHour) {
        $(this).removeClass("row time-block").addClass("present");
      } else {
        $(this).removeClass("row time-block").addClass("future");
      }
    });
  }

  function colorUpdate() {
    $('.time-block').each(function() {
      const timeblockHour = parseInt(this.id);
      if (timeblockHour == currentHour) {
        $(this).removeClass('past future').addClass('present');
      } else if (timeblockHour < currentHour) {
        $(this).removeClass('future present').addClass('past');
      } else {
        $(this).removeClass('past present').addClass('future');
      }
    });
  }

  colorChange();              
  colorUpdate();

    $('.time-block').each(function() {
        var timeBlockId = $(this).attr("id");
        var savedInput = localStorage.getItem(timeBlockId);
    
        $(this).find(".description").val(savedInput);
    });

  function updateTime() {
    const dateEl = $('#date');
    const timeEl = $('#time');
    const currentDate = dayjs().format('dddd, MMMM D, YYYY');
    const currentTime = dayjs().format('hh:mm A');
    dateEl.text(currentDate);
    timeEl.text(currentTime);
  }


  setInterval(updateTime, 100);
});