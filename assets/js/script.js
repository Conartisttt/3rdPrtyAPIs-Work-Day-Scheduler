const mainSection = $('#main');
const timeDivsArr = mainSection.children();
// console.log(timeDivsArr)
const storageArr = [];

for (let i = 9; i < 18; i++) {
  const storage = JSON.parse(localStorage.getItem("hour-" + i)) || "";
  storageArr.push(storage);
}

for (let i = 0; i < timeDivsArr.length - 3; i++) {
  timeDivsArr[i].children[1].textContent = storageArr[i];
}



// console.log(storageArr);




mainSection.on('click', function (event) {
  const target = $(event.target);
  const targetElement = target[0];
  const targetParentDiv = target[0].parentElement
  const targetParentID = targetParentDiv.id;
  const targetTextArea = target[0].previousElementSibling
  if (targetElement.matches("button")) {
    // console.log(target);
    // console.log(targetElement);
    // console.log(targetParentDiv);
    // console.log(targetParentID);
    const textAreaValue = targetTextArea.value
    localStorage.setItem(targetParentID, JSON.stringify(textAreaValue));
  }
})

const today = dayjs();
$('#currentDay').text(today.format('MMMM D, YYYY'));

let timerInterval;

function setDate() {
  setInterval(function () {

    const today = dayjs();
    $('#currentDay').text(today.format('MMMM D, YYYY'));

  }, 60000);
}

setDate();

//compare 24-hour dayjs time to each div ID. 
//if div ID == 24hour code, then red
//if div ID > 24 hour code, then green
//if div ID < 24 hour code, then gray



// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
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
