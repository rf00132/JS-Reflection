const submitButton = document.getElementById("submit-btn");
const skipButton = document.getElementById("skip-btn");
const emailField = document.getElementById("email-field");
const regExp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const dataStorageArea = document.getElementById("stored-data-display");

let testBool = false;
let imageToAdd = document.getElementById("image-to-add");

let newLink = "";
CreateImageUrl();
imageToAdd.setAttribute("src", newLink);


let users = []

function SubmitEvent(){
    if(CheckForValidEmail()){
        RemoveError();
        AssignPictureToEmail();
        BuildDataArea();
        CreateImageUrl();
    }
    else{
        ShowInvalidEmailError();
    } 
}

function SkipEvent(){
    CreateImageUrl();
}

//when this function spits out a no the script doesnt refresh.
function checkURL(url) {
    var request = new XMLHttpRequest();

    request.open("GET", url, true);

    request.send();

    request.onload = function() {

        status = request.status;

        if (status == 200) //if(statusText == OK)
        {
            testBool = true;
            newLink = url;
            ChangeImage();
        } else {
            CreateImageUrl();
        }
    }
}

function CreateImageUrl(){
    let retVal = "https://picsum.photos/id/"+ GetRandomId() +"/400";
  
    if(checkURL(retVal)){
       
        setTimeout(CreateImageUrl, 500);
    }
}

function GetRandomId(){

    let x = Math.floor(Math.random()*800) + 1;
    console.log(x);
    return x;
}

class User{
    constructor(email, image){
        this.email = email;
        this.images = [image] 
        this.RebuildStorageDiv();
    }

    AddImage(addImage){
        this.images = [...this.images, addImage];
        this.RebuildStorageDiv();
    }

    RebuildStorageDiv(){
        this.storageDivHTML = "<div><h3>" + this.email + "</h3><div>" + this.MakeImgHTML() + "</div></div>";
    }

    MakeImgHTML(){
        let retStr = "";
        for(let i=0; i<this.images.length; i++){
            retStr += "<img src='" + this.images[i] + "' alt='"+ this.email +", image number: " + i + "'>";
        }
        return retStr;
    }
}

function BuildDataArea(){
    let buildString = ""
    for(let i = 0; i < users.length; i++){
        
        buildString += users[i].storageDivHTML;
    }
    dataStorageArea.innerHTML = buildString;
}

function AssignPictureToEmail(){
    if(CheckForCurrentUser()){
        users.push(new User(emailField.value, imageToAdd.getAttribute("src")));
    } 
}

//checks for a user of the same email, assigns the image to them if t
function CheckForCurrentUser(){
    for(let i = 0; i < users.length; i++){
        if(users[i].email === emailField.value){
            users[i].AddImage(imageToAdd.getAttribute("src"));
            return false;
        }
    }
    return true;
}



function ChangeImage(){
    imageToAdd.setAttribute("src", newLink);
    testBool = false;
}

function CheckForValidEmail(){
    return regExp.test(emailField.value);
}

function ShowInvalidEmailError(){
    document.getElementById("warning-field").textContent = "Invalid Email";
}

function RemoveError(){
    document.getElementById("warning-field").textContent = "";
}


submitButton.addEventListener("click", SubmitEvent);
skipButton.addEventListener("click", SkipEvent);