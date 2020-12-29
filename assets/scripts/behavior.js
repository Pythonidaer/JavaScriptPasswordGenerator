/*
==============================================================================
Declaration Center
==============================================================================
*/

// For Character Range
var passwordLength;
// For Checkboxes selecting Character Types
var lowercaseChar = document.getElementById('lowercaseChar');
var uppercaseChar = document.getElementById('uppercaseChar');
var numericChar = document.getElementById('numericChar');
var specialChar = document.getElementById('specialChar');

// Builds arrays for Special, Number, and Lowercase Characters
specialCharacters = [` `, `!`, `"`, `#`, `$`, `%`, `&`, `'`, `(`, `)`, `*`, `+`, `,`, `-`, `.`, `/`, `:`, `;`, `<`, `=`, `>`, `?`, `@`, `\[`, `\\`, `\]`, `^`, `_`, `\``, `{`, `|`, `}`, `~`];
number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
lowercaseLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
// Declares function to return string values converte to Uppercase Characters
var toUpperCase = function (x) {
    return x.toUpperCase();
};
// Maps Lowercase Characters turned Uppercase to a new array
uppercaseLetters = lowercaseLetters.map(toUpperCase);

// Declares empty array that will store Character Types the user selects by clicking checkboxes
var space = [];
// Empty variable that will be assigned the empty space array concatenated with 
var selections;





/*
==============================================================================
Function Center
==============================================================================
*/

// Generates Password; is attached to 'Generate!' button in HTML
function generatePassword() {

    // Declares local variable searching for all four checkboxes to determine which are checked
    let checkedBoxes = document.querySelectorAll(`input[type="checkbox"]:checked`);
    // Assigns string value of range slider at time 'Generate!' button is clicked; used to multiply randomized characters length
    passwordLength = document.getElementById('passwordLength').value;
    // Declares empty array that will store random characters added to it, to then be concatenated into one long string 
    let password = [];
    // Declares empty variable that will store a random character from Character Arrays, to then be pushed to the password array
    let randomizeSelections;
    // Declares empty variable that will store the final password string that will be written to the HTML document
    let generatedPassword;


    /*
    ==============================================================================
    Conditional Center
    ==============================================================================
    */

    // Alerts user to select 1+ checkboxes, then refreshes the page
    if (checkedBoxes.length == 0) {
        document.getElementById('generateBtn').classList.add('modal-trigger');
        // alert('Please select one or more character types.')
        // location.reload();
    }  else {
        document.getElementById('generateBtn').classList.remove('modal-trigger');
    }

    // If all 4 boxes are checked, selections array becomes one long array of letters, numbers and special characters
    if (lowercaseChar.checked && uppercaseChar.checked && numericChar.checked && specialChar.checked) {
            selections = space.concat(specialCharacters, number, lowercaseLetters, uppercaseLetters)
    }  
    
    // If any 3 boxes are checked, selections array becomes one long array of those 3 options
    else if (specialChar.checked && numericChar.checked && uppercaseChar.checked) {
            selections = space.concat(specialCharacters, number, uppercaseLetters);
    }  else if (specialChar.checked && numericChar.checked && lowercaseChar.checked) {
            selections = space.concat(specialCharacters, number, lowercaseLetters);
    }  else if (specialChar.checked && lowercaseChar.checked && uppercaseChar.checked) {
            selections = space.concat(specialCharacters, lowercaseLetters, uppercaseLetters);
    }  else if (numericChar.checked && lowercaseChar.checked && uppercaseChar.checked) {
            selections = space.concat(number, lowercaseLetters, uppercaseLetters);
    }  
    
    // If any 2 boxes are checked, selections array becomes one long array of those 2 options
    else if (specialChar.checked && numericChar.checked) {
            selections = space.concat(specialCharacters, number);
    }  else if (specialChar.checked && lowercaseChar.checked) {
            selections = space.concat(specialCharacters, lowercaseLetters);
    }  else if (specialChar.checked && uppercaseChar.checked) {
            selections = space.concat(specialCharacters, uppercaseLetters);
    }  else if (lowercaseChar.checked && numericChar.checked) {
            selections = space.concat(lowercaseLetters, number);
    }  else if (lowercaseChar.checked && uppercaseChar.checked) {
            selections = space.concat(lowercaseLetters, uppercaseLetters);
    }  else if (numericChar.checked && uppercaseChar.checked) {
            selections = space.concat(number, uppercaseLetters);
    }  
    
    // If only 1 box is checked, selections array is assigned the value of that Character Array
    else if (specialChar.checked) {
            selections = space.concat(specialCharacters);
    }  else if (numericChar.checked) {
            selections = space.concat(number);
    }  else if (lowercaseChar.checked) {
            selections = space.concat(lowercaseLetters);
    }  else if (uppercaseChar.checked) {
            selections = space.concat(uppercaseLetters);
    }

    // initializes i at 0; if i is less than passwordLength (string coerced to number); increase i by 1)
    // During for loop, assign a random element from selections array to randomizeSelections, then push it to the password array
    for (var i = 0; i < passwordLength; i++) {
        randomizeSelections = selections[Math.floor(Math.random() * selections.length)];
        password.push(randomizeSelections);
    }

    // Takes the array of random characters, joins and returns them, so that the (8-128) elements become one singular element 
    generatedPassword = password.join("");
    // Calls function to replace password/textarea text content with the string value of the final password
    writePassword(generatedPassword);
    // Copies password after generating it
    copyPassword();
    }

// This will change the text content of a pargraph or textarea element to the password generated above, for display/copy purposes.
function writePassword(generatedPassword) {
    document.getElementById("completedPassword").textContent = generatedPassword;
    document.getElementById("completedPassword").placeholder = generatedPassword;
 }

//  Grabs password text, creates a placeholder, pastes text into placeholder, copies placeholder text, and lastly removes placeholder
 function copyPassword() {
        let completedPassword = document.getElementById('completedPassword').textContent;
        let placeholder = document.createElement(`textarea`);
        document.body.appendChild(placeholder);
        placeholder.value = completedPassword;
        placeholder.select();
        document.execCommand(`copy`);
        document.body.removeChild(placeholder);
      };

      
// When document is ready, this jQuery function will call the modal function.
$(document).ready(function(){
        $('.modal').modal();
        });
        




 /*
==============================================================================
Notes & Features Center
==============================================================================

1. Dark Mode:
- I would like to make this have a button up top as this now appears to be a standard feature
- 2 options: light & dark
- Customizable in two ways: via browser settings, or by toggling after visiting the page


2. Copy Password:
- Might consider appending this to the 'Generate!' button (such as Generate and Copy!) else just store a new button


3. Refactor Functions:
- The selections array is assigned an array value fifteen times due to conditional outcomes above
- I think the conditional center can be stored into a nested function that accepts 1-4 arguments
- Watch 
- Maybe something like this:

function conditionalAbstract(variable.checked) {
    if (1-4, any combination, checked) {
        selections = space.concat(1-4)
    } else {
        alert error / refresh
    }
}

- Followed by:

conditionalAbstract()

4. Modal made through Materialize CSS -- Complete (could be improved)
- The alert() error appears for when the user generates without checking any boxes declaring character types to use
- I want to utilize the Modal I found from the Materialize CSS Ninja playlist because I like that I can customize the modal

5. Materialize CSS -- Complete (could be improved)
- This is actually where I need to start off, because now that I have the javascript baseline complete, I need to make this pretty

6. Make password hidden toggle with eye to signify asterisks

*/
