// Initialize Firebase
var config = {
    apiKey: "AIzaSyCEfenHyPdlC78SzCNecr8H3Ce8BLDFSHM",
    authDomain: "trainscheduler-a8926.firebaseapp.com",
    databaseURL: "https://trainscheduler-a8926.firebaseio.com",
    projectId: "trainscheduler-a8926",
    storageBucket: "",
    messagingSenderId: "299209969161"
  };

firebase.initializeApp(config);

var database = firebase.database();

var name = "";
var dest = "";
var start = "";
var rate = "";
var nextArrival = "";
var minutesAway = moment().diff(start, 'minutes');

$("#submitButton").on("click", function (event) {
    event.preventDefault();

    name = $("#trainName").val().trim();
    dest = $("#destination").val().trim();
    start = moment($("#trainTime").val().trim(), "HH:mm").format("X");
    rate = moment($("#frequency").val().trim(), "m").format("X");

    var newTrain = {
        name: name,
        destination: dest,
        start: start,
        frequency: rate
    }

    database.ref().push(newTrain);

    $("#trainName").val("");
    $("#destination").val("");
    $("#trainTime").val("");
    $("#frequency").val("");
});

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().start);
    console.log(childSnapshot.val().frequency);

    var tableName = (childSnapshot.val().name);
    var tableDest = (childSnapshot.val().destination);
    var tableStart = (childSnapshot.val().start);
    var tableRate = (childSnapshot.val().frequency);
    var tableRatePretty = moment.unix(tableRate).format("m");
    var tableNext = tableStart + tableRatePretty;
    var tableNextPretty = moment.unix(tableNext).format("hh:mm a");
    var tableMinAway = moment().diff(moment(tableStart, "X"), "minutes");
    var tableMinAwayPretty = moment.unix(tableMinAway).format("m");

    $("#trainTable > tbody").append(`<tr><td> ${tableName} </td><td> ${tableDest} </td><td> ${tableRatePretty} </td><td> ${tableNextPretty} </td><td> ${tableMinAwayPretty} </td></tr>`);

}, function(errorObject) {
    console.log("The read failed: " + errorObject);
    
}); 