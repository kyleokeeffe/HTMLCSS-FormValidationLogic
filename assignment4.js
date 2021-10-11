
/*
    COMP125-007: Assignment 4
    Kyle O'Keeffe
    301156790
    Mar. 19, 2021
*/

var formArray=document.getElementsByTagName("form")[0];

var allFilledTest = {
    errorField: document.getElementById("allFilledErrorField"),
    testElements: document.forms[0].querySelectorAll("input"),
    testResult: true,
    errorMessage: "Please make sure all the fields are filled out"
}

var provinceTest = {
    entryField: document.getElementById("provinceField"),
    errorField: document.getElementById("provinceErrorField"),
    testAgainst: ["ON","QC","MN","AB","SK","BC"],
    testResult: true,
    errorMessage: "Invalid province, please select one of the following: QC, ON, MN, SK, AB, BC"
};

var postalCodeTest = {
    entryField: document.getElementById("postalCodeField"),
    errorField: document.getElementById("postalCodeErrorField"),
    testPattern: /^[A-Za-z]([0-9])([A-Za-z])(\s{1})?([0-9])([A-Za-z])[0-9]$/,
    testResult: true,
    errorMessage: "Invalid postal code, please make sure it is in the format a0a0a0"
};

var emailTest = {
    entryField: document.getElementById("emailField"),
    errorField: document.getElementById("emailErrorField"),
    testPattern: /^[_a-zA-z0-9\-]+@[a-zA-z0-9\-]+([\.a-zA-z0-9\-])(\.[a-z]{2,6})$/,
    testResult: true,
    errorMessage: "Invalid email, please make sure it is the format this@there.that"
};

var ageTest = {
    entryField: document.getElementById("ageField"),
    errorField: document.getElementById("ageErrorField"),
    testAgainst: 18,
    testResult: true,
    errorMessage: "Please enter an age over 18"
};

var passwordTest = {
    entryField: document.getElementById("passwordField"),
    errorField: document.getElementById("passwordErrorField"),
    testPattern: /([A-Z+0-9+a-z*]{6,20})/,
    testResult: true,
    errorMessage: "Please make sure the password is at least 6 characters and includes at least one upper case letter and one numeric digit"
};

var confirmTest = {
    entryField: document.getElementById("confirmField"),
    errorField: document.getElementById("confirmErrorField"),
    testAgainst:document.getElementById("passwordField"),
    testResult: true,
    errorMessage: "Please make sure the password fields match"
};

var testList=[allFilledTest, provinceTest, emailTest, postalCodeTest, ageTest, passwordTest, confirmTest];

function validateForm(event){
    if (event.preventDefault)
        event.preventDefault();
    else
        event.returnValue=false;

    for(var i =0;i<testList.length;i++)    
        testList[i].testResult=true;
    
    testList.forEach(RunValidationTests);
    testList.forEach(DisplayValidationTestResults);
    
    var overallTest=true;

    for(var i =0;i<testList.length;i++){
        if(testList[i].testResult==false)
            overallTest=false;
        else if(testList[i].testResult==true)
            overallTest=overallTest;
    }  

    if(overallTest==true){
        alert("Thanks for registering with our website, your customer record was created successfully.")
    }
}

function RunValidationTests(thisTest){
    if (thisTest==allFilledTest){
        for(var i = 0;i<thisTest.testElements.length;i++){ 
            if(thisTest.testElements[i].value == ""){
                thisTest.testElements[i].style.backgroundColor="orange";
                thisTest.testResult=false;
            }
            else 
                thisTest.testElements[i].style.backgroundColor="white";
        }
    }
    else if (thisTest==provinceTest){
        for(var i =0;i<thisTest.testAgainst.length;i++){
            if(thisTest.entryField.value.toUpperCase() == thisTest.testAgainst[i]){
                thisTest.testResult=true;
                break;
            }
            else{
                thisTest.testResult=false;
                continue;
            }           
        }
    }
    else if(thisTest.testPattern){
        thisTest.testResult=thisTest.testPattern.test(thisTest.entryField.value);
    }
    else if(thisTest==ageTest)
        thisTest.testResult=(thisTest.entryField.value>=thisTest.testAgainst);
    else if(thisTest==confirmTest)
        thisTest.testResult=(thisTest.entryField.value==thisTest.testAgainst.value);
}

function DisplayValidationTestResults(thisTest){
    try{
        if(thisTest.testResult==false){
            throw thisTest.errorMessage;
        }
        else if(thisTest.testResult==true){
            //thisTest.errorField.style.display="none";
            thisTest.errorField.innerHTML="";
            if(thisTest!=allFilledTest)
                thisTest.entryField.style.backgroundColor="white";
        }
    }
    catch(thisErrorMessage){
        //thisTest.errorField.style.display="block";
        thisTest.errorField.innerHTML=thisTest.errorMessage;
        if(thisTest!=allFilledTest)
            thisTest.entryField.style.backgroundColor="orange";
    }
}

function setUpPage(){
    createEventListeners();
}

function createEventListeners(){
    if(formArray.addEventListener)
        formArray.addEventListener("submit", validateForm, false);
    else if (formArray.attachEvent)
        formArray.attachEvent("onsubmit", validateForm);
}

if(window.addEventListener)
    window.addEventListener("load", setUpPage, false);
else if (window.attachEvent)
    window.attachEvent("onload", setUpPage);

