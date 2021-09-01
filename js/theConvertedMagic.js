"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var submitButton = document.getElementById("submit-btn");
var emailField = document.getElementById("email-field");
var regExp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
var dataStorageArea = document.getElementById("stored-data-display");
var testBool = false;
var imageToAdd = document.getElementById("image-to-add");
var newLink = "";
CreateImageUrl();
imageToAdd.setAttribute("src", newLink);
var users = [];

function SubmitEvent() {
  if (CheckForValidEmail()) {
    RemoveError();
    AssignPictureToEmail();
    BuildDataArea();
    CreateImageUrl();
  } else {
    ShowInvalidEmailError();
  }
} //when this function spits out a no the script doesnt refresh.


function checkURL(url) {
  console.log("checking url");
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.send();

  request.onload = function () {
    status = request.status;

    if (status == 200) //if(statusText == OK)
      {
        console.log("image exists pogchamp");
        testBool = true;
        newLink = url;
        ChangeImage();
      } else {
      console.log("uh oh, no image sadge");
      CreateImageUrl();
    }
  };
}

function CreateImageUrl() {
  var retVal = "https://picsum.photos/id/" + GetRandomId() + "/400";
  console.log("making new URL");

  if (checkURL(retVal)) {
    console.log("URL returned bad, re running method");
    setTimeout(CreateImageUrl, 500);
  }
}

function GetRandomId() {
  console.log("getting id");
  var x = Math.floor(Math.random() * 800) + 1;
  console.log(x);
  return x;
}

var User = /*#__PURE__*/function () {
  function User(email, image) {
    _classCallCheck(this, User);

    this.email = email;
    this.images = [image];
    this.RebuildStorageDiv();
  }

  _createClass(User, [{
    key: "AddImage",
    value: function AddImage(addImage) {
      this.images = [].concat(_toConsumableArray(this.images), [addImage]);
      this.RebuildStorageDiv();
    }
  }, {
    key: "RebuildStorageDiv",
    value: function RebuildStorageDiv() {
      this.storageDivHTML = "<div><h3>" + this.email + "</h3><div>" + this.MakeImgHTML() + "</div></div>";
    }
  }, {
    key: "MakeImgHTML",
    value: function MakeImgHTML() {
      var retStr = "";

      for (var i = 0; i < this.images.length; i++) {
        retStr += "<img src='" + this.images[i] + "' alt='" + this.email + ", image number: " + i + "'>";
      }

      return retStr;
    }
  }]);

  return User;
}();

function BuildDataArea() {
  var buildString = "";

  for (var i = 0; i < users.length; i++) {
    buildString += users[i].storageDivHTML;
  }

  dataStorageArea.innerHTML = buildString;
}

function AssignPictureToEmail() {
  if (CheckForCurrentUser()) {
    users.push(new User(emailField.value, imageToAdd.getAttribute("src")));
  }
} //checks for a user of the same email, assigns the image to them if t


function CheckForCurrentUser() {
  for (var i = 0; i < users.length; i++) {
    if (users[i].email === emailField.value) {
      users[i].AddImage(imageToAdd.getAttribute("src"));
      return false;
    }
  }

  return true;
}

function ChangeImage() {
  console.log("changin image");
  imageToAdd.setAttribute("src", newLink);
  testBool = false;
}

function CheckForValidEmail() {
  return regExp.test(emailField.value);
}

function ShowInvalidEmailError() {
  document.getElementById("warning-field").textContent = "Invalid Email";
}

function RemoveError() {
  document.getElementById("warning-field").textContent = "";
}


submitButton.addEventListener("click", SubmitEvent);