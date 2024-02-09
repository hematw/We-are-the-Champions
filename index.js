import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://scrimba-mobile-app-ae4e0-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsmentsInDB = ref(database, "endorsments");

const textareaEl = document.getElementById("textarea-el");
const fromEl = document.getElementById("from-el");
const toEl = document.getElementById("to-el");
const publishBtnEl = document.getElementById("publish-btn");
const endorsementsListEl = document.getElementById("endorsements-list");

publishBtnEl.addEventListener("click", function () {
  const reviewText = textareaEl.value;
  const fromData = fromEl.value;
  const toData = toEl.value;

  if (reviewText && fromData && toData) {

    let dataArr = [reviewText, fromData, toData];
    push(endorsmentsInDB, dataArr);
    clearFields();
  }
});

function clearFields() {
  textareaEl.value = "";
  fromEl.value = "";
  toEl.value = "";
}

onValue(endorsmentsInDB, function (snapshot) {
  endorsementsListEl.innerHTML = "";
  if (snapshot.exists()) {
    let allListItems= "";
    let itemsArr = Object.values(snapshot.val());
    for (let i = 0; i < itemsArr.length; i++) {
      let currentItem = itemsArr[i];
      allListItems += createListItem(currentItem)
    }
    endorsementsListEl.innerHTML = allListItems;
  } else {
    endorsementsListEl.textContent = "Nothing in DB"
  }
});


function createListItem(data) {
  let item =
    `<li>
      <sub>From  ${data[1]} to ${data[2]}</sub>
      <p>${data[0]}</p>
    </li>`;
  
    return item;
}