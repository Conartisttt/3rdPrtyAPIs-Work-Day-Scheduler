$(function () {
  const mainSectionJS = document.getElementById("main");

  //Generate Time Divs Section
  function generateTimeDivs() {
    for (let i = 9; i < 18; i++) {
      const timeDiv = document.createElement('div');
      timeDiv.classList.add("row", "time-block");
      timeDiv.setAttribute("id", "hour-" + i);
      mainSectionJS.appendChild(timeDiv);

      const hourDiv = document.createElement('div');
      hourDiv.classList.add("col-2", "col-md-1", "hour", "text-center", "py-3");
      if (i < 12) {
        hourDiv.textContent = i + "AM";
      } else if (i == 12) {
        hourDiv.textContent = i + "PM";
      } else {
        hourDiv.textContent = i - 12 + "PM";
      }
      timeDiv.appendChild(hourDiv)

      const hourTextArea = document.createElement("textarea");
      hourTextArea.classList.add("col-8", "col-md-10", "description");
      hourTextArea.setAttribute("rows", "3");
      timeDiv.appendChild(hourTextArea);

      const submitButton = document.createElement("button");
      submitButton.classList.add("btn", "saveBtn", "col-2", "col-md-1");
      submitButton.setAttribute("area-label", "save");
      timeDiv.appendChild(submitButton);

      const iElement = document.createElement("i");
      iElement.classList.add("fas", "fa-save");
      iElement.setAttribute("aria-hidden", "true");
      submitButton.appendChild(iElement);

    }
  }

  
  generateTimeDivs();

  const mainSection = $('#main');
  const timeDivsArr = $('.time-block')

  // Local Storage Section
  const storageArr = [];

  for (let i = 9; i < 18; i++) {
    const storage = JSON.parse(localStorage.getItem("hour-" + i)) || "";
    storageArr.push(storage);
  }

  for (let i = 0; i < timeDivsArr.length; i++) {
    timeDivsArr[i].children[1].textContent = storageArr[i];
  }

  mainSection.on('click', function (event) {
    const target = $(event.target);
    const targetElement = target[0];
    if (targetElement.matches("button")) {
      const targetParentDiv = target[0].parentElement;
      const targetParentID = targetParentDiv.id;
      const targetTextArea = target[0].previousElementSibling;
      const textAreaValue = targetTextArea.value;
      localStorage.setItem(targetParentID, JSON.stringify(textAreaValue));
    } else if (targetElement.matches("i")) {
      const targetParentDiv = target[0].parentElement.parentElement;
      const targetParentID = targetParentDiv.id;
      const targetTextArea = target[0].parentElement.previousElementSibling;
      const textAreaValue = targetTextArea.value;
      localStorage.setItem(targetParentID, JSON.stringify(textAreaValue));
    }
  })

  //Set Color Section
  function setColor() {
    for (let i = 0; i < timeDivsArr.length; i++) {
      const divID = timeDivsArr[i].id;
      const hour = dayjs().format('H');
      if (divID.length == 6) {
        let divHour = parseInt(divID.slice(-1));
        if (divHour == hour) {
          timeDivsArr[i].classList.add('present');
          timeDivsArr[i].classList.remove('future', 'past');
        } else if (divHour > hour) {
          timeDivsArr[i].classList.add('future');
          timeDivsArr[i].classList.remove('past', 'present');
        } else {
          timeDivsArr[i].classList.add('past');
          timeDivsArr[i].classList.remove('present', 'future');
        }
      } else {
        let divHour = parseInt(divID.slice(-2));
        if (divHour == hour) {
          timeDivsArr[i].classList.add('present');
          timeDivsArr[i].classList.remove('future', 'past');
        } else if (divHour > hour) {
          timeDivsArr[i].classList.add('future');
          timeDivsArr[i].classList.remove('past', 'present');
        } else {
          timeDivsArr[i].classList.add('past');
          timeDivsArr[i].classList.remove('present', 'future');
        }
      }
    }
  }

  //Set Date Section
  const today = dayjs();
  $('#currentDay').text(today.format('dddd, MMMM D, YYYY'));

  function setDate() {
    setInterval(function () {
      const today = dayjs();
      $('#currentDay').text(today.format('dddd, MMMM D, YYYY'));
      setColor();
    }, 60000);
  }

  setDate();
  setColor();
});

