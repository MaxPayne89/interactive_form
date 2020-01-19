//set all jquery and selector vars at the top of the file
const $otherTextArea = $("#other-title");
const $selectBoxDesign = $("#design");
const $selectBoxColor = $("#color");
const $selectBoxColorOptions = $("#color").find("option");
const $selectBoxJob = $("#title");
const checkboxes = document.querySelectorAll(".activities input");
//const totalCostDOM = `<label><p>${totalCost}</p></label>`;
let totalCost = 0;
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
});
//hide the text area from the get-go
$otherTextArea.hide();
$selectBoxDesign.change();