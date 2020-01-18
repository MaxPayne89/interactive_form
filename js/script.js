const $otherTextArea = $("#other-title");
$otherTextArea.hide();
const $selectBox = $("#title");

//add event listener on the select box to check for the value and the conditional rendering of the text area.
$selectBox.on("change", () => {
    if($selectBox.val() === 'other'){
        $otherTextArea.show()
    }else {
        $otherTextArea.hide();
    }
});