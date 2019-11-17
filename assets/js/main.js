alert("Welcome to the sweetest password generator ever. To generate your awesome new password, use the scroll bar to select the desired password length, select at least one of the password criteria, and click Generate Password.")


const resultElement = document.getElementById('result');
const lengthElement = document.getElementById('pwLength');
const uppercaseElement = document.getElementById('uppercase');
const lowercaseElement = document.getElementById('lowercase');
const numbersElement = document.getElementById('numbers');
const symbolsElement = document.getElementById('symbols');
const generateElement = document.getElementById('generate');
const clipboardElement = document.getElementById('clipboard');


const randomFunctions = {
    lower: getRandomLower,
    upper: getRandomCapital,
    numbers: getRandomNumbers,
    symbols: getRandomSymbols
};
//Generate Event Listen
generateElement.addEventListener('click', () => {

    const pwlength = +lengthElement.value;
    const hasLower = lowercaseElement.checked;
    const hasUpper = uppercaseElement.checked;
    const hasNumbers = numbersElement.checked;
    const hasSymbols = symbolsElement.checked;
    resultElement.innerText = generatePassword(hasLower, hasUpper,
        hasNumbers, hasSymbols, pwlength);

});


// Copy password to clipboard
clipboardElement.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultElement.value;

    if (!password) {
        return;
    }
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard');

})

//Generate PW Function
function generatePassword(lower, upper, numbers, symbols, pwLength) {

    let generatedPassword = '';
    const typesCount = lower + upper + numbers + symbols;

    console.log('typesCount: ', typesCount);

    const typesArr = [{ lower }, { upper }, { numbers }, { symbols }].filter(
        item => Object.values(item)[0]
    );

    // console.log('typesArr: ', typesArr);

    if (typesCount === 0) {
        return '',
            alert("You must select at least one password criteria");
    }

    for (let i = 0; i < pwLength; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            // console.log('funcName: ', funcName);

            generatedPassword += randomFunctions[funcName]();
        });
    }
    const finalPassword = generatedPassword;
    return finalPassword;
    console.log(generatedPassword);
}

//Generate Functions//

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomCapital() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumbers() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbols() {
    const symbols = "#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
    return symbols[Math.floor(Math.random() * symbols.length)];

}

// console.log(Math.floor(Math.random() * 26) + 97);

console.log(getRandomSymbols());

var slider = document.getElementById("pwLength");
var output = document.getElementById("length");
output.innerHTML = slider.value;

slider.oninput = function () {
    output.innerHTML = this.value;
}

