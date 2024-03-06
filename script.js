import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = { databaseURL: "https://add-to-cart-sl-default-rtdb.asia-southeast1.firebasedatabase.app/" };


const app = initializeApp(appSettings);
const database = getDatabase(app);
const itemInDB = ref(database, "item");


const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

addButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value;

  if (inputValue === "") {

  } else {
    push(itemInDB, inputValue);
  }

  clearInputFieldEl();
});


// fetching items from database
onValue(itemInDB, function (snapshot) {
  if (snapshot.exists()) {
    let itemArray = Object.entries(snapshot.val())

    clearShoppingListEl()

    for (let i = 0; i < itemArray.length; i++) {
      let currentItem = itemArray[i]
      let currentItemID = currentItem[0]
      let currentItemValue = currentItem[1]

      appendItemToShoppingListEl(currentItem);
    }
  } else {
    shoppingListEl.innerHTML = ""
  }
})

// Clear input field
function clearInputFieldEl() {
  inputFieldEl.value = "";
}

// Appending item in our shopping list to display
function appendItemToShoppingListEl(item) {
  let itemID = item[0]
  let itemValue = item[1]

  let newEl = document.createElement("li")

  newEl.textContent = itemValue

  newEl.addEventListener("dblclick", function () {
    let locationOfItemInDB = ref(database, `item/${itemID}`)
    remove(locationOfItemInDB)
  })

  shoppingListEl.append(newEl)
}

// Clearing Shopping List
function clearShoppingListEl() {
  shoppingListEl.innerHTML = ""
}