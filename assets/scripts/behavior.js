/*
Special thanks to https://jamierachael.github.io/Password-Generator/
This repository helped me understand a lot about the methods that work on arrays.
*/ 

// Assignment Code
var passwordLength;
var promptLowercase;
var promptUppercase;
var promptNumeric;
var promptSpecialChar;

// Special Character Types
specialCharacters = [` `, `!`, `"`, `#`, `$`, `%`, `&`, `'`, `(`, `)`, `*`, `+`, `,`, `-`, `.`, `/`, `:`, `;`, `<`, `=`, `>`, `?`, `@`, `\[`, `\\`, `\]`, `^`, `_`, `\``, `{`, `|`, `}`, `~`];
// Numbers
number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
// English Alphabet Letters
lowercaseLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
// Space is for the Uppercase conversion
space = [];

var selections;
// converts letters to uppercase 
var toUpperCase = function (x) {
    return x.toUpperCase();
};

// creates a variable for uppercase conversion
uppercaseLetters = lowercaseLetters.map(toUpperCase);

var generateBtn = document.querySelector("#generate");

generateBtn.addEventListener("click", function () {
    ps = generatePassword();
    document.getElementById("password").placeholder = ps;
});

// Write password to the #password input
// function writePassword() {
//   var password = generatePassword();
//   var passwordText = document.querySelector("#password");
//   passwordText.value = password;
// }

// This function begins the password generator
function generatePassword() {
    
    // Prompt the user to choose a password length between 8 and 128
    passwordLength = parseInt(prompt('What length would you like your password to be? Please choose no less than 8 and no more than 128 characters'));

    // Validate that the user has entered correct information
    if(!passwordLength) {
        passwordLength = parseInt(prompt('Please choose a number between 8 and 128.'));
    } else if (passwordLength < 8 || passwordLength > 128) {
        passwordLength = parseInt(prompt('What length would you like your password to be? Please choose no less than 8 and no more than 128 characters'));
    } else {
      // Continues if user correctly enters a number between 8 and 128
      // Ask a users to choose lowercase, uppercase, numbers & special characters   
        promptLowercase = confirm('Would you like lowercase letters?');
        promptUppercase = confirm('Would you like uppercase letters?');
        promptNumeric = confirm('Would you to use numbers?');
        promptSpecialChar = confirm('Would you like to use special characters?');
    };

    // If user makes no selections
    if (!promptLowercase && !promptUppercase && !promptNumeric && !promptSpecialChar) {
        selections = alert('Please refresh this page and follow the instructions closely.')
    }  
    // If user selects 4 options
    else if (promptLowercase && promptUppercase && promptNumeric && promptSpecialChar) {
            selections = specialCharacters.concat(number, lowercaseLetters, uppercaseLetters)
    }
    // If user selects 3 options
    else if (promptSpecialChar && promptNumeric && promptUppercase) {
            selections = specialCharacters.concat(number, uppercaseLetters);
    }  else if (promptSpecialChar && promptNumeric && promptLowercase) {
            selections = specialCharacters.concat(number, lowercaseLetters);
    }  else if (promptSpecialChar && promptLowercase && promptUppercase) {
            selections = specialCharacters.concat(lowercaseLetters, uppercaseLetters);
    }  else if (promptNumeric && promptLowercase && promptUppercase) {
            selections = number.concat(lowercaseLetters, uppercaseLetters);
    }
    // If user selects 2 options
    else if (promptSpecialChar && promptNumeric) {
            selections = specialCharacters.concat(number);
    }  else if (promptSpecialChar && promptLowercase) {
            selections = specialCharacters.concat(lowercaseLetters);
    }  else if (promptSpecialChar && promptUppercase) {
            selections = specialCharacters.concat(uppercaseLetters);
    }  else if (promptLowercase && promptNumeric) {
            selections = lowercaseLetters.concat(number);
    }  else if (promptLowercase && promptUppercase) {
            selections = lowercaseLetters.concat(uppercaseLetters);
    }  else if (promptNumeric && promptUppercase) {
            selections = number.concat(uppercaseLetters);
    }
    // If user selects 1 option
    else if (promptSpecialChar) {
            selections = specialCharacters;
    }  else if (promptNumeric) {
            selections = number;
    }  else if (promptLowercase) {
            selections = uppercaseLetters;
    }  else if (promptUppercase) {
            selections = space.concat(uppercaseLetters);
    }

    // password variable is an array placeholder for user generated amount of length
    var password = [];

    // Start random selection variables:
    // Random selection for all variables: 
    for (var i = 0; i < passwordLength; i++) {
        var randomizeSelections = selections[Math.floor(Math.random() * selections.length)];
        password.push(randomizeSelections);
    }
    // This joins the password array and converts it to a string
    // Worked with a tutor to incorporate this option
    var ps = password.join("");
    UserInput(ps);
    return ps;
    }


// Add event listener to generate button
// generateBtn.addEventListener("click", writePassword);


// This puts the password value into the textbox
// Changed function input to use textcontent
function UserInput(ps) {
    document.getElementById("password").textContent = ps;
    if (ps.length < 8) {
        console.log(location.reload());
    }
}

// var copy = document.querySelector("#copy");
// copy.addEventListener("click", function () {
//     copyPassword();
// });
// This copies the password value - works
// Code example demonstrated in a youtube video: 
// Source: https://youtu.be/9sT03jEwcaw
// function copyPassword() {
//     document.getElementById("password").select();
//     document.execCommand("Copy");
//     alert("Password copied to clipboard!");
// }
