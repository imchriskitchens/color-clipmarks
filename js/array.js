const defaultList = (array) => {
  userInput.value = array.join("\n");
  userInput.rows = 10;
  submit();
}

defaultList(["#460a18", "rgb(70,10,24)", "#350812", "rgb(53,8,18)", "#23050c", "rgb(35,5,12)", "#120206", "rgb(18,2,6)", "#180207", "hsl(346, 96%, 4%)", "#373642", "rgb(55,54,66)", "#27293f", "hsl(235, 24%, 15%)", "hsl(235, 24%, 10%)"]);