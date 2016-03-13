// SETUP Stuff
var craigslistAPI = require('node-craigslist');
var craigslist = craigslistAPI({
  city : 'phoenix'
});
var express = require('express');

// Setup the App
var app = express();
app.set('view engine', 'jade');
app.set('views', './');


// Variables
var kysAllowence = 26;


// What the Webpage Looks like
app.get('/', function (req, res) {
  
  getListingsICanAfford('vera bradley', function(thingsIWant){

    //Show this page on the website
    return res.render("homepage.jade", {thingsIWant: thingsIWant});
  });
  
});

// Startup the Website server!
app.listen(3000, function () {
  console.log('http://localhost:3000/');
});






function getListingsICanAfford(whatToLookFor, allDoneFunction){

  // options to pass into the Craigslist search library
  var options = {
    query: whatToLookFor
  };

  // Go ask Craigslist for a list of everything
  craigslist.search(options, function(error, listings){

    // This is things I want
    var thingsIWant = [];

    // Go through all the Craigslist listings
    listings.forEach(function(listing) {

      // Does this listing have a price?
      if( listing.price && listing.pics ){

        // Can I (Ky) Afford this thing?
        if( listing.price <= kysAllowence ){

          // If yes save this to the ThingsIWant Array
          thingsIWant.push( listing );
        }

      }

    });

    // Now that we checked them all return all the ones that I wanted
    return allDoneFunction( thingsIWant );

  });

};
