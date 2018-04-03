
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

    // if the inputed new food is not already in the topics array, add it to array and remake all buttons
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


// Function displays the appropriate food gifs when the button is clicked
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
        // loop through each results[i] in array and make place to display image
        for (var j=0; j<results.length; j++) {
            // make a div to hold image and rating
            var gifDiv = $("<div>");
            gifDiv.addClass("gifDivFloater")
            var foodImg = $("<img>");
            foodImg.attr("src", results[j].images.fixed_height_still.url);
            // add alt to the gif images
            foodImg.attr("alt", results[j].title);
            // add more attributes to each <img> so user will be able to toggle animate and still
            foodImg.attr("data-animate", results[j].images.fixed_height.url);
            foodImg.attr("data-still", results[j].images.fixed_height_still.url);
            foodImg.attr("data-state", "still");
            foodImg.addClass("gif");
            // under every gif, display its rating
            var rating = results[j].rating;
            var displayRating = $("<p>").text("Rating: " + rating);
            
            // append foodImg and displayRating to gifDiv so they can be treated as a unit
            gifDiv.append(foodImg);
            gifDiv.append(displayRating);
            // prepend gifDiv to id=food-gifs location on the html
            $("#food-gifs").prepend(gifDiv);

        }
    })
    
}
// function to toggle image from still to animate when user clicks the gif
function changeGif() {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));  // if data-state is still, change src to data-animate
        $(this).attr("data-state", "animate");
    }
    else {
        $(this).attr("src", $(this).attr("data-still"));  // if data-state is animate, change src to data-still
        $(this).attr("data-state", "still");  
    }
}

// Add event listener for click on gifs with class=gif
$(document).on("click", ".gif", changeGif);

// Add event listener for click on any button with class of "foods"
$(document).on("click", ".foods", displayFood);

// call the renderButtons function to display the initial list of food buttons
renderButtons();
