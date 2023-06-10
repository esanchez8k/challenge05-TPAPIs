// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

const thelocale = {};
  dayjs.locale(thelocale);

$(function () {

  //obtain the current hour
  const currentHour = dayjs().format('H');
  

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

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
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  
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

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
    $('.time-block').each(function() {
        var timeBlockId = $(this).attr("id");
        var savedInput = localStorage.getItem(timeBlockId);
    
        // Set the value of the textarea based on the saved description
        $(this).find(".description").val(savedInput);
    });

  // TODO: Add code to display the current date in the header of the page.
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
