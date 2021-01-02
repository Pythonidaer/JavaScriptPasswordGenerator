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

// Builds Arrays for special, number, and lowercase Characters
sArr = [` `, `!`, `"`, `#`, `$`, `%`, `&`, `'`, `(`, `)`, `*`, `+`, `,`, `-`, `.`, `/`, `:`, `;`, `<`, `=`, `>`, `?`, `@`, `\[`, `\\`, `\]`, `^`, `_`, `\``, `{`, `|`, `}`, `~`];
nArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
lArr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
// Declares function to return string values converte to Uppercase Characters
var toUpperCase = function (x) {
    return x.toUpperCase();
};
// Maps lowercase Array turned uppercase to a new array
uArr = lArr.map(toUpperCase);

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
    // let checkedBoxes = document.querySelectorAll(`input[type="checkbox"]:checked`);
    let checkedBoxes = document.querySelectorAll(`input[type="checkbox"]:checked.my-checkbox`);
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

    // If all char types unchecked, make alert modal popup; else hide modal.
    (checkedBoxes.length == 0) && (document.getElementById('generateBtn').classList.add('modal-trigger')) ||
    (checkedBoxes.length !== 0) && (document.getElementById('generateBtn').classList.remove('modal-trigger'));
    // If alert modal pops up, explain the TypeError within the console.     
    (document.getElementById('generateBtn').classList.contains('modal-trigger')) && (console.log(`%cThis is an expected error that only appears when the user does'nt choose 1 or more character checkboxes.`, `color: #66ff00;`))

    // Assigns shorthand to checked boxes; NOTE: each will result in either true or false (see: Declaration Center for more context)
    let s = specialChar.checked;
    let n = numericChar.checked;
    let l = lowercaseChar.checked;
    let u = uppercaseChar.checked;

    // (if 1+ boxes checked) then (empty array concatenated w/ corresponding character arrays)
    (s && n && l && u) && (selections = space.concat(sArr, nArr, lArr, uArr)) ||
    (s && n && u) && (selections = space.concat(sArr, nArr, uArr)) ||
    (s && n && l) && (selections = space.concat(sArr, nArr, lArr)) ||
    (s && l && u) && (selections = space.concat(sArr, lArr, uArr)) ||
    (n && l && u) && (selections = space.concat(nArr, lArr, uArr)) ||
    (s && n) && (selections = space.concat(sArr, nArr)) ||
    (s && l) && (selections = space.concat(sArr, lArr)) ||
    (s && u) && (selections = space.concat(sArr, uArr)) ||
    (l && n) && (selections = space.concat(lArr, nArr)) ||
    (l && u) && (selections = space.concat(lArr, uArr)) ||
    (n && u) && (selections = space.concat(nArr, uArr)) ||
    (s) && (selections = space.concat(sArr)) ||
    (l) && (selections = space.concat(lArr)) ||
    (n) && (selections = space.concat(nArr)) ||
    (u) && (selections = space.concat(uArr))

    // initializes i at 0; if i is less than passwordLength (string coerced to number); increase i by 1)
    // During for loop, assign a random element from selections array to randomizeSelections, then push it to the password array
    for (var i = 0; i < passwordLength; i++) {
        randomizeSelections = selections[Math.floor(Math.random() * selections.length)];
        password.push(randomizeSelections);
    }l

    // Takes the array of random characters, joins and returns them, so that the (8-128) elements become one singular element 
    generatedPassword = password.join("");
    // Calls function to replace password/textarea text content with the string value of the final password
    writePassword(generatedPassword);
    // Copies password after generating it
    copyPassword();
    };

    // This will change the text content of a pargraph or textarea element to the password generated above, for display/copy purposes.
    function writePassword(generatedPassword) {
        document.getElementById("completedPassword").textContent = generatedPassword;
        document.getElementById("completedPassword").placeholder = generatedPassword;
    };

    // Grabs password text, creates a placeholder, pastes text into placeholder, copies placeholder text, and lastly removes placeholder
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
Dark Mode Center
==============================================================================
*/
// Specifically search for name=theme so other checkboxes are not selected
var toggler = document.querySelector('input[name=theme]');

// When checkbox (toggler) is changed (checked or unchecked) set HTML to data-theme dark or light.
toggler.addEventListener('change', function() {
    if(this.checked) {
        trans()
        document.documentElement.setAttribute('data-theme', 'dark')
    } else {
        trans()
        document.documentElement.setAttribute('data-theme', 'light')
    }
})

// Add transition to HTML only when user toggles dark and light mode, then remove a second later.
let trans = () => {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
        document.documentElement.classList.remove('transition')
    }, 1000)
}


/*
==============================================================================
Suggested Improvements:
==============================================================================
*/

/*
1. Remove '& Copy' from Generate button and make a clipboard icon to make more intuitive and explicit.

2. Create a feature that displays random password in asterisks, with an eyeball icon to indicate view/hide toggle.

3. Refactor 15 conditionals (checkbox options) into a function / use objects to achieve DRY methodology.
*/