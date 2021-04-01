// Arrays ------------------------------------------------------------------------------
var dogQuotesArray = [
  {
    quote: "“The dog is a gentleman; I hope to go to his heaven, not man’s”",
    author: "~ Mark Twain",
  },

  {
    quote: "'Every dog must have his day.'",
    author: "~ Jonathan Swift",
  },

  {
    quote: "'A lot of shelter dogs are mutts like me.'",
    author: "~ Barack Obama",
  },

  {
    quote: "'What do dogs do on their day off? Can't lie around - that's their job.'",
    author: "~ George Carlin",
  },

  {
    quote: "'Happiness is a warm puppy.'",
    author: "~ Charles Shultz",
  },

  {
    quote: "'All his life he tried to be a good person. Many times, however, he failed. For after all, he was only human. He wasn't a dog.",
    author: "~ Charles Shultz",
  },

],






//Dom Variables------------------------------------------------------------------------
key = "oxrPyoy6v3XMn43E8m5y5ZVOEGAmTO52CKOvjV7CckXTDJvpjG";
var secret = "AYuKkVCKqFIYCOxKzBWeihxy7lA7vSOReHMlLC5E";
var listEl = $("#names-list");
var nameBtn = $("#nameBtn");




// JavaScript Variables ---------------------------------------------------------------
var dogNames = [];
var dogQuotes = [];
i = 0;


// function Definitions --------------------------------------------------------------
// API token fetch to access page

function firstFetch(token) {
  var queryURL = "https://api.petfinder.com/v2/animals?breed=pug";

  fetch(queryURL, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    }).catch(function (err) {
      // Log any errors
      console.log("something went wrong", err);
    });
}

// API pet fetch to get data

fetch("https://api.petfinder.com/v2/oauth2/token", {
    method: "POST",
    body: "grant_type=client_credentials&client_id=" +
      key +
      "&client_secret=" +
      secret,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
  .then(function (resp) {
    // Return the response as JSON
    return resp.json();
  })
  .then(function (data) {
    // Log the API data
    console.log("token", data);
    firstFetch(data.access_token);
  })
  .catch(function (err) {
    // Log any errors
    console.log("something went wrong", err);
  });

  // Dog Name Generator 
  
function nameGen() {
  listEl.empty();

  fetch("https://api.fungenerators.com/name/generate?category=dog&limit=50")
  .then(function (response) {
    return response.json();
  }).then(function (data) {
    // console.log(data);
    // console.log(data.contents.names[0]);
    for (var i = 0; i < 5; i++) {
      dogNames.push(data.contents.names[Math.floor(Math.random() * data.contents.names.length)]);
      var div = $("<div>").addClass("list-container");
      var li = $("<li>").text(dogNames[i])
      listEl.append(div.append(li));
    }
    console.log(dogNames);
  })
}

// Dog Quotes -----------------------------------------------------------------------
function dogQuoteGenerator() {
for ( var i = 0; i < 1; i++){
  dogQuotes.push(dogQuotesArray[Math.floor(Math.random() * dogQuotesArray.length)]);
}
$("#person").append(dogQuotes[0].author);
$("#quote").append(dogQuotes[0].quote);
};

// Event Listeners ---------------------------------------------------------------
$(nameBtn).on("click", function() {
  dogNames = [];
  nameGen();
});




// Function Calls -----------------------------------------------------------------
dogQuoteGenerator();