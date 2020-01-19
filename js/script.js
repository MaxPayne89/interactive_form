//set all jquery vars at the top of the file
const $otherTextArea = $("#other-title");
const $selectBoxDesign = $("#design");
const $selectBoxColor = $("#color");
const $selectBoxJob = $("#title");
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
$selectBoxDesign.on("change", () => {
    if($selectBoxDesign.val() === 'Select Theme'){
        $selectBoxColor.find("option").hide().end().append('<option value="select" selected>Please select a T-shirt theme</option>');
        //$("#color:last-child").attr('selected', 'selected');
    }else if($selectBoxDesign.val() === "js puns" ){
        //remove the Please select option
        $selectBoxColor.find('option[value="select"]').remove();
        $selectBoxColor.find("option").hide();
        //only show the ones matching the regex. Could have used the index in this case 
        //but it's somewhat safe to extend the number of options this way
        $selectBoxColor.find("option").filter(function() {
            return jsPunsRegex.test($(this).text());
        }).show();
        //select the first visible option value
        $selectBoxColor.find("option:visible").first().prop('selected', true);
    } else {
        $selectBoxColor.find('option[value="select"]').remove();
        $selectBoxColor.find("option").hide();
        $selectBoxColor.find("option").filter(function() {
            return jsShirtRegex.test($(this).text());
        }).show();
        $selectBoxColor.find("option:visible").first().prop('selected', true);
    }
});
//hide the text area from the get-go
$otherTextArea.hide();
$selectBoxDesign.change();