
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
        b.attr("class", "foods");
        b.attr("nameOfFood", topics[i]);
        // adds the name of the food from the array to the button
        b.text(topics[i]);
        // adds the button to the html
        $("#food-buttons").append(b);
    }
}
// call the renderButtons function to display the initial list of food buttons
renderButtons();

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