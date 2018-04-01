
// global variables

// initial array of foods
var topics = ["cake", "bbq", "pizza", "fruits", "fried chicken"];

// Function for making food buttons dynamically
function renderButtons() {
    // delete all previous food buttons in food-button id location and start anew
    $("#food-buttons").empty();

    // loops through current array of foods
    for (var i=0; i<topics.length; i++) {
        var b = $("<button>");
        b.addClass("foods btn btn-warning");
        b.attr("nameOfFood", topics[i]);
        // adds the name of the food from the array to the button
        b.text(topics[i]);
        // adds the button to the html
        $("#food-buttons").append(b);
    }
}

// Function adds a new food button when input box is filled out and submit button is clicked
$("#add-food").on("click", function(event) {
    // form will allow user to click enter instead of submit button, preventDefault will
    // prevent the form from trying to submit itself
    event.preventDefault();
    // variable will hold the text from the input box
    var newFood = $("#newFoodInput").val().trim();

    // if the inputed new food is not already in the topics array, add it to array and remake all button
    if (topics.indexOf(newFood) < 0) {
        // adds the new food to the topics array
        topics.push(newFood);
        // displays a blank space in input field after user submits new food
        $("#newFoodInput").val("");
        renderButtons();
    }
    else {
        $("#newFoodInput").val("");
    }
    
})

// test with cat-button as model
/*
$(".button").on("click", function() {
    var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=lettuce";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
        console.log(response);
        var imageUrl = response.data.images.fixed_height.url;
        var spaghettiImage = $("<img>");
        spaghettiImage.attr("src", imageUrl);
        spaghettiImage.attr("alt", "plate of spaghetti");
        $("#food-gifs").prepend(spaghettiImage);

    })
    
}) */

// Function 
function displayFood() {
    var foodie = $(this).attr("nameOfFood");  //this refers to button that was clicked
    console.log(foodie);

    // Note: "random" returns as a single object and search?q returns as an array with default of 25
    //var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + foodie + "&limit=2";

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + foodie + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
        console.log(response);
        // store array of results in results variable
        var results = response.data;
        // loop through each results[i] in array
        for (var j=0; j<results.length; j++) {
            var foodImg = $("<img>");
            foodImg.attr("src", results[j].images.fixed_height_still.url);
            //foodImg.attr("alt", results[j].images.title);
            $("#food-gifs").prepend(foodImg);
        }
    })
    
}
// Add event listener for click on any button with class of "foods"
$(document).on("click", ".foods", displayFood);

// call the renderButtons function to display the initial list of food buttons
renderButtons();
