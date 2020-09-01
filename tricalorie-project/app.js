// storage controller

// item controller
const ItemCtrl = (function () {
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };
  // Data Structure/State
  const data = {
    items: [
      // { id: 0, name: "Steak Dinner", calories: "1200" },
      // { id: 1, name: "Cookie", calories: "400" },
      // { id: 2, name: "Eggs", calories: "300" },
    ],
    currentItem: null,
    totalCalories: 0,
  };
  // Public Methods
  return {
    getItems: function () {
      return data.items;
    },
    addItem: function (name, calories) {
      // create id
      let ID;
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }
      // calories to number
      calories = parseInt(calories);
      // add new item
      // new Item – calls the construcor
      newItem = new Item(ID, name, calories);

      data.items.push(newItem);

      return newItem;
    },
    getTotalCalories:function(){
      let total=0;
     // Loop through items and add calories which were submitted
      data.items.forEach(function(item){
        total+=item.calories;
        // total = total + item.calories;
      })
      // set total calories in data structure
      data.totalCalories=total;
      // return total
      return data.totalCalories;
    },
    logData: function () {
      return data;
    },
  };
})();

// ui controller
const UICtrl = (function () {
  const UISelectors = {
    itemList: "#item-list",
    addBtn: ".add-btn",
    itemNameInput: "#item-name",
    itemCaloriesInput: "#item-calories",
    totalCalories:".total-calories"
  };
  // Public Methods
  return {
    populateItemList: function (items) {
      let html = "";
      items.forEach(function (item) {
        html += ` <li class="collection-item" id="item-${item.id}">
            <strong>
            ${item.name}:
            </strong>
            <em>${item.calories} Calories</em>  
            <a href="javascript:void(0);" class="secondary-content">
                <i class="edit-item fa fa-pencil"></i>
            </a>              
        </li>`;
      });
      // Insert List Items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getSelectors: function () {
      return UISelectors;
    },
    getItemInput: function () {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value,
      };
    },
    addListItem: function (item) {
      console.log("addListItem-item", item);
      // Show the list
      document.querySelector(UISelectors.itemList).style.display='block';
      // create li element
      const li = document.createElement("li");
      // Add class
      li.className = "collection-item";
      // add id
      li.id = `${item.id}`;
      // add html
      li.innerHTML = ` <strong>
      ${item.name}:
      </strong>
      <em>${item.calories} Calories</em>  
      <a href="javascript:void(0);" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
      </a> `;
      // Insert item
      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement("beforeend", li);
    },
    clearInput: function () {
      document.querySelector(UISelectors.itemNameInput).value = "";
      document.querySelector(UISelectors.itemCaloriesInput).value = "";
    },
    hideList: function () {
      document.querySelector(UISelectors.itemList).style.display = "none";
    },
    showTotalCalories:function(totalCalories){
      document.querySelector(UISelectors.totalCalories).textContent=totalCalories;
    }
  };
})();
// App controller
const AppCtrl = (function (ItemCtrl, UICtrl) {
  // Load Event Listeners
  const loadEventListeners = function () {
    // get ui selectors
    const UISelectors = UICtrl.getSelectors();
    // Add item event
    console.log("UISelectors", UISelectors);
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", itemAddSubmit);
  };
  // add item submit
  const itemAddSubmit = function (e) {
    console.log("Add Btn Clicked");
    // Get form input from UI controller
    e.preventDefault();
    const input = UICtrl.getItemInput();
    // check for name and calorie input
    if (input.name !== "" && input.calories != "") {
      // Add item
      const newItem = ItemCtrl.addItem(input.name, input.calories);
      // console.log("newItem",newItem);
     
      
      // add item to ui list
      UICtrl.addListItem(newItem);
      // Get total calories
      const totalCalories=ItemCtrl.getTotalCalories();
      // add total calories to ui
      UICtrl.showTotalCalories(totalCalories);
      //  Clear Fields
      UICtrl.clearInput();
    }
  };
  console.log(ItemCtrl.logData());
  // Public Methods
  return {
    init: function () {
      console.log("Initializing App..");
      // Fetch items from data structure
      const items = ItemCtrl.getItems();
      console.log("items", items);
      // check if any items are present
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        // Populate list with items
        UICtrl.populateItemList(items);
      }
          // Get total calories
          const totalCalories=ItemCtrl.getTotalCalories();
          // add total calories to ui
          UICtrl.showTotalCalories(totalCalories);
      // load event listeners
      loadEventListeners();
    },
  };
})(ItemCtrl, UICtrl);

// Initializing the App
AppCtrl.init();
