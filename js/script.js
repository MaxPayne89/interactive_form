//set all jquery and selector vars at the top of the file
const $otherTextArea = $("#other-title");
const $selectBoxDesign = $("#design");
const $selectBoxColor = $("#color");
const $selectBoxColorOptions = $("#color").find("option");
const $selectBoxJob = $("#title");
const checkboxes = document.querySelectorAll(".activities input");
const totalCostDOM = document.createElement('div');
let totalCost = 0;
let labelText = document.createTextNode(`${totalCost}`);
totalCostDOM.appendChild(labelText)
//regexes
const jsPunsRegex = /\DJS Puns shirt only\D/;
const jsShirtRegex = /JS shirt only\D/;

//add event listener on the select box to check for the value and the conditional rendering of the text area.
$selectBoxJob.on("change", () => {
    if($selectBoxJob.val() === 'other'){
        $otherTextArea.show()
    }else {
        $otherTextArea.hide();
    }
});
//add event listener on the design select
$selectBoxDesign.on("change", () => {
    if($selectBoxDesign.val() === 'Select Theme'){
        //append the required option and make it selected by default
        $selectBoxColorOptions.hide().end().append('<option value="select" selected>Please select a T-shirt theme</option>');
    }else if($selectBoxDesign.val() === "js puns" ){
        //remove the Please select option
        $selectBoxColor.find('option[value="select"]').remove();
        $selectBoxColorOptions.hide();
        //only show the ones matching the regex. Could have used the index in this case 
        //but it's somewhat safe to extend the number of options this way
        $selectBoxColorOptions.filter(function() {
            return jsPunsRegex.test($(this).text());
        }).show();
        //select the first visible option value
        $selectBoxColor.find("option:visible").first().prop('selected', true);
    } else {
        //same procedure with a different regex. Might refactor later.
        $selectBoxColor.find('option[value="select"]').remove();
        $selectBoxColorOptions.hide();
        $selectBoxColorOptions.filter(function() {
            return jsShirtRegex.test($(this).text());
        }).show();
        $selectBoxColor.find("option:visible").first().prop('selected', true);
    }
});
//add event listener on the activities fieldset
$(".activities").on('change', (element) => {
    const clicked = element.target;
    const clickedDateAndTime = clicked.getAttribute('data-day-and-time');
    const elementCost = parseInt(clicked.getAttribute('data-cost'));
    //add or subtract the element's cost
    if(clicked.checked){
        totalCost += elementCost;
    }else {
        totalCost -= elementCost;
    }
    checkboxes.forEach((element) => {
        let elementDateAndTime = element.getAttribute('data-day-and-time');
        if(elementDateAndTime === clickedDateAndTime && element !== clicked){
            if(clicked.checked){
                element.disabled = true;
            }else {
                element.disabled = false;
            }
        };
    });
    document.querySelector(".activities div").textContent = `Total: $${totalCost}`;
});
//add event listener on the payment section select
document.querySelector("#payment").addEventListener('change', (event) => {
    if(event.target.value === 'credit card'){
        //hide the other two div's based on the target's value
        document.querySelector("#credit-card").style.visibility = 'visible';
        document.querySelector("#paypal").style.visibility = 'hidden';
        document.querySelector("#bitcoin").style.visibility = 'hidden';
    }else if(event.target.value == 'paypal'){
        document.querySelector("#credit-card").style.visibility = 'hidden';
        document.querySelector("#paypal").style.visibility = 'visible';
        document.querySelector("#bitcoin").style.visibility = 'hidden';
    }else {
        document.querySelector("#credit-card").style.visibility = 'hidden';
        document.querySelector("#paypal").style.visibility = 'hidden';
        document.querySelector("#bitcoin").style.visibility = 'visible';
    }
});
//add event listener on submit
document.querySelector('form').addEventListener('submit', (event) => {
    //prevent the post to index.html
    event.preventDefault();
    const inputName = document.querySelector("#name");
    //validate the name
    if(!inputIsEmpty(inputName)){
        redBorder(inputName);
    }else {
        removeBorder(inputName);
    };
    //validate the email
    const mailField = document.querySelector("#mail");
    const mailAdress = mailField.value;
    if(!emailValidator(mailAdress)){
        redBorder(mailField);
    }else {
        removeBorder(mailField);
    };
    //validate the acticity section
    const checkboxes = Array.from(document.querySelectorAll(".activities > label > input"));
    const oneIsChecked = checkboxValidator(checkboxes);
    if(!oneIsChecked){
        redBorder(document.querySelector(".activities"));
    }else {
        removeBorder(document.querySelector(".activities"));
    };
    //validate the credit card inputs
    //first, check whether the credit card option is selected
    const selectPaymentElement = document.querySelector("#payment");
    if(selectPaymentElement.value === 'credit card'){
        //check validity of the cc number
        const creditCardField = document.querySelector("#cc-num");
        const creditCardNumber = creditCardField.value;
        const isValidCreditCard = checkCreditCardNumber(creditCardNumber);
        //validate the zip code
        const zipCodeField = document.querySelector("#zip");
        const zipCode = zipCodeField.value;
        const isValidZipCode = checkZipCode(zipCode);
        //validate the cvv
        const cvvField = document.querySelector("#cvv");
        const cvv = cvvField.value;
        const isValidCvv = checkCvv(cvv);
        //check ccNum
        if(!isValidCreditCard){
            redBorder(creditCardField);
        }else {
            removeBorder(creditCardField);
        };
        //check Zip code
        if(!isValidZipCode){
            redBorder(zipCodeField);
        }else {
            removeBorder(zipCodeField);
        };
        //check cvv
        if(!isValidCvv){
            redBorder(cvvField);
        }else {
            removeBorder(cvvField);
        }
    }
});
//check cc number function
checkCreditCardNumber = (str) => {
    const ccRegEx = /\d{13,16}/;
    return ccRegEx.test(str);
};
//check zip code function
checkZipCode = (str) => {
    const zipRegEx = /\d{5}/;
    return zipRegEx.test(str);
};
//check cvv function
checkCvv = (str) => {
    const cvvRegEx = /\d{3}/;
    return cvvRegEx.test(str);
}
//remove border
removeBorder = (element) => {
    element.style.border = "";
};
//set element's border
redBorder = (element) => {
    element.style.border = "3px solid #FF0000";
};
//function that determines whether an input field is left blank 
inputIsEmpty = (element) => {
    const trimmedInput = element.value.trim();
    if(trimmedInput){
        return true;
    }else {
        return false;
    };
};
//matches regex against the user's provided input
emailValidator = (emailAdress) => {
    const emailRegex = /\S+@\S+\.(com|net|de)/;
    return emailRegex.test(emailAdress);
};
//loop over inputs and check whether at least one checkbox is selected
checkboxValidator = (arrOfElements) => {
    filteredElements = arrOfElements.filter(element => {
        return element.checked;
    });
    if(filteredElements.length >= 1){
        return true;
    }else {
        return false;
    };
}
//hide the text area from the get-go
$otherTextArea.hide();
//triger the event listener
$selectBoxDesign.change();
//append the total cost div
document.querySelector(".activities").appendChild(totalCostDOM);
//select the payment method select element
Array.from(document.querySelector("#payment").children).forEach(child => {
    if(child.value === 'select method'){
        child.style.display = 'none';
    }else if(child.value === 'credit card'){
        child.setAttribute('selected', true);
    }
})