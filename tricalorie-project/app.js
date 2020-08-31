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
      { id: 0, name: "Steak Dinner", calories: "1200" },
      { id: 1, name: "Cookie", calories: "400" },
      { id: 2, name: "Eggs", calories: "300" },
    ],
    currentItem: null,
    totalCalories: 0,
  };
  // Public Methods
  return {
    logData: function () {
      return data;
    },
  };
})();

// ui controller
const UICtrl = (function () {
  // Public Methods
  return {};
})();
// app controller
const AppCtrl = (function (ItemCtrl, UICtrl) {
  console.log(ItemCtrl.logData());
  // Public Methods
  return {
    init: function () {
      console.log("Initializing App..");
    },
  };
})(ItemCtrl, UICtrl);

// Initializing the App
AppCtrl.init();
