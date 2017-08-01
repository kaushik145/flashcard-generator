var fs = require("fs");
var inquirer = require("inquirer");
var userInput2 = process.argv[3].toLowerCase();
var userInput3 = process.argv[4];
var userInput4 = process.argv[5];

function basicFunction() {

    if (userInput2 === "random" && userInput4 === undefined) {

        function CreateCard(front, back) {

            this.front = front;
            this.back = back;

        }


        fs.readFile("log.txt", "utf8", function(err, data) {

            if (err) {

                console.log(err);
            } else {

                var cardArr = JSON.parse(data);
                // console.log(cardArr);
                var printCounter = 0;

                function printCount() {

                    if (printCounter <= cardArr.length) {
                        printFront();
                        printCounter++;
                        setTimeout(function() { printCount() }, 6000);
                    }
                };

                function printFront() {

                    var randomCard = Math.floor(Math.random() * (cardArr.length));
                  
                    console.log(" ");
                    console.log("------------------");

                    console.log("Front: " + cardArr[randomCard].front);
                    setTimeout(function() { console.log("Back: " + cardArr[randomCard].back) }, 5000);
                    setTimeout(function() { console.log("--------------------"), console.log(" ") ,cardArr.splice(randomCard, 1); }, 5100);

                };

                printCount();

            }
        });
        // console.log(parseInt(userInput2));

    } else if (userInput2 === "add1" && userInput4 === undefined) {

        var count = 0;
        var cardArr = [];

        function CreateCard(front, back) {

            this.front = front;
            this.back = back;

        }

        var getInfo = function() {

            if (count < parseInt(input3)) {
                inquirer.prompt([{
                    name: "front",
                    message: "What is the front of the flashcard?"
                }, {
                    name: "back",
                    message: "What is the back of the flashcard?"
                }]).then(function(answers) {

                    var card = new CreateCard(answers.front, answers.back);
                    cardArr.push(card);
                    count++;

                    getInfo();
                });

            } else {

                fs.appendFile("log.txt", JSON.stringify(cardArr), function(err) {

                    // If an error was experienced we say it.
                    if (err) {
                        console.log(err);
                    }
                    // If no error is experienced, we'll log the phrase "Content Added" to our node console.

                });

            };
        };

        getInfo();


    } else if (userInput2 === "add2" && userInput4 === undefined) {

        var count = 0;
        var cardArr = [];
        var parse;

        function CreateCard(front, back) {

            this.front = front;
            this.back = back;

        }

        var getInfo = function() {

            if (count < parseInt(userInput3)) {
                inquirer.prompt([{
                    name: "front",
                    message: "What is the front of the flashcard?"
                }, {
                    name: "back",
                    message: "What is the back of the flashcard?"
                }]).then(function(answers) {

                    var card = new CreateCard(answers.front, answers.back);

                    cardArr.push(card);
                    count++;

                    getInfo();

                });

            } else {
                // console.log(parse);
                var wow = JSON.parse(parse);
                // console.log(wow);
                cardArr.push.apply(cardArr, wow);
                // console.log(cardArr);

                fs.writeFile("log.txt", JSON.stringify(cardArr), function(err) {

                    // If an error was experienced we say it.
                    if (err) {
                        console.log(err);
                    }
                    // If no error is experienced, we'll log the phrase "Content Added" to our node console.

                });

            };
        };

        getInfo();


        fs.readFile("log.txt", "utf8", function(err, data) {

            if (err) {

                console.log(err);
            } else {

                // console.log(data);
                parse = data;


            }
        })

    } else if (userInput2 === "read"  && userInput3 === "front") {

        var index = parseInt(userInput4) - 1;

        var printFront = function() {

            fs.readFile("log.txt", "utf8", function(err, data) {

                if (err) {

                    console.log(err);
                } else {

                    var parsed = JSON.parse(data);
                    console.log(" ");
                    console.log("------------------");
                    console.log("Front: " + parsed[index].front);
                    console.log("------------------");
                    console.log(" ");

                }
            });
        };

        printFront();

    } else if (userInput2 === "read" && userInput3 === "back") {

        var index = parseInt(userInput4) - 1;

        var printBack = function() {

            fs.readFile("log.txt", "utf8", function(err, data) {

                if (err) {

                    console.log(err);
                } else {

                    var parsed = JSON.parse(data);
                    console.log(" ");
                    console.log("------------------");
                    console.log("Back: " + parsed[index].back);
                    console.log("------------------");
                    console.log(" ");

                }
            });
        };

        printBack();

    } else {

        console.log("This is not a valid command! Please try again.");
    };
};

module.exports = basicFunction;