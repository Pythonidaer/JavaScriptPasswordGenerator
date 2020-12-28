/*
Special thanks to https://jamierachael.github.io/Password-Generator/
This repository helped me understand a lot about the methods that work on arrays.
*/ 

/*
Special thanks to https://jenniferkirwin.github.io/password-generator2/
This repository helped me understand a lot about the methods 
*/







/*
===============================================================================
Declaration center
===============================================================================
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
// Cutting generateBtn event Listener to try to deconstruct

// Write password to the #password input
// function writePassword() {
//   var password = generatePassword();
//   var passwordText = document.querySelector("#password");
//   passwordText.value = password;
// }


/*
===============================================================================
Primary function, where 7 things happen to generate this random password:
1. The password length is prompted.
2. The password length input is validated, and the user is asked to choose from 4 options.
3a. If no options are selected, the page will refresh.
3b. If 4 options are selected, all 4 array variables are concatenated together.
3c. If 3 options are selected, the 3 array variables chosen are concatenated together.  
3d. If 2 options are selected, the 2 array variables chosen are concatenated together.
3e. If 1 option is selected, it will be assigned to the selections variable.
4. An empty array is created for the password to be stored into.
5. A for loop pushes a randomly selected item from the selections array into the password array.
6. A new variable is assigned that joins each password array element together into one string.
7. 
===============================================================================
*/

// This function begins the password generator
function generatePassword() {
    
    // Prompt the user to choose a password length between 8 and 128
    passwordLength = parseInt(prompt('What length would you like your password to be? Please choose no less than 8 and no more than 128 characters'));

    // Validate that the user has entered correct information
    if(!passwordLength) {
        //     Try making this a parseInt prompt and re-test
       let userAlert = alert('You did not enter a number!');
       console.log('fml')
    } else if (passwordLength < 8 || passwordLength > 128) {
        let userAlert = alert('You did not enter a number between 8 and 128!');
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
        selections = alert('Please refresh the page and follow the instructions.')
        location.reload();
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
        // console.log(password)
    }
    // This joins the password array and converts it to a string
    // Worked with a tutor to incorporate this option
    var ps = password.join("");
    // UserInput(ps);
    return ps;
    }





/*
===============================================================================
Adds an event listener to the 'Generated Password' button that calls the write function.
===============================================================================
*/    
// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// generateBtn.addEventListener("click", function () {
//     ps = generatePassword();
//     document.getElementById("password").placeholder = ps;
// });


/*
===============================================================================
This primary function takes an arbitrary local variable, assigns it to the generated pw...
And changes the placeholder content of the textarea to display the user's password. 
===============================================================================
*/
function writePassword() {
    ps = generatePassword();
    document.getElementById("password").placeholder = ps;
    document.getElementById("password").textContent = ps;
    if (ps.length < 8 || ps.length > 128) {
        location.reload();
    }
}

// This puts the passwgord value into the textbox
// Changed function input to use textcontent



// function UserInput(ps) {
//     document.getElementById("password").textContent = ps;
//     if (ps.length < 8) {
//         console.log(location.reload());
//     }
// }

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
