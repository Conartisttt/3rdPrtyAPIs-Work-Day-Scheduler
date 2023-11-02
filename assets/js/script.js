
// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {

  const mainSection = $('#main');
const timeDivsArr = $('.time-block')
// console.log(timeDivsArr)
const storageArr = [];

for (let i = 9; i < 18; i++) {
  const storage = JSON.parse(localStorage.getItem("hour-" + i)) || "";
  storageArr.push(storage);
}

for (let i = 0; i < timeDivsArr.length; i++) {
  timeDivsArr[i].children[1].textContent = storageArr[i];
}

for (let i = 0; i < timeDivsArr.length; i++) {
  const divID = timeDivsArr[i].id;
  console.log(divID);
  const hour = dayjs().format('H');
  console.log(hour);
  if (divID.length == 6) {
    let divHour = parseInt(divID.slice(-1))
    console.log(divHour);
    if(divHour == hour){
      timeDivsArr[i].classList.add('present');
      timeDivsArr[i].classList.remove('future',  'past');
    } if(divHour > hour){
      timeDivsArr[i].classList.add('future');
      timeDivsArr[i].classList.remove('past',  'present');
    } else {
      timeDivsArr[i].classList.add('past');
      timeDivsArr[i].classList.remove('present',  'future');
    }
  } else {
    let divHour = parseInt(divID.slice(-2));
    console.log(divHour);
    if(divHour == hour){
      timeDivsArr[i].classList.add('present');
      timeDivsArr[i].classList.remove('future',  'past');
    } if(divHour > hour){
      timeDivsArr[i].classList.add('future');
      timeDivsArr[i].classList.remove('past',  'present');
    } else {
      timeDivsArr[i].classList.add('past');
      timeDivsArr[i].classList.remove('present',  'future');
    }
  }
}

mainSection.on('click', function (event) {
  const target = $(event.target);
  const targetElement = target[0];
  const targetParentDiv = target[0].parentElement
  const targetParentID = targetParentDiv.id;
  const targetTextArea = target[0].previousElementSibling
  if (targetElement.matches("button")) {
    const textAreaValue = targetTextArea.value
    localStorage.setItem(targetParentID, JSON.stringify(textAreaValue));
  }
})

const today = dayjs();
$('#currentDay').text(today.format('MMMM D, YYYY'));

function setDate() {
  setInterval(function () {

    const today = dayjs();
    $('#currentDay').text(today.format('MMMM D, YYYY'));

  }, 60000);
}

setDate();

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});

