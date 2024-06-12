var loginBtn = document.getElementById("loginBtn");
var signUpBtn = document.getElementById("signUpBtn");
var logoutBtn = document.getElementById("logoutBtn");

var emailLogin = document.getElementById("emailLogin");
var passwordLogin = document.getElementById("passwordLogin");

var nameSignUp = document.getElementById("nameSignUp");
var emailSignUp = document.getElementById("emailSignUp");
var passwordSignUp = document.getElementById("passwordSignUp");

var signUp = document.getElementById("signUp");
var login = document.getElementById("login");

var signUpMsg = document.getElementById("signUpMsg");
var loginMsg = document.getElementById("loginMsg");

var signUpCard = document.getElementById("signUpCard");
var loginCard = document.getElementById("loginCard");
var home = document.getElementById("home");

login.addEventListener("click", showSignUp);
signUp.addEventListener("click", showLogin);

function showSignUp() {
  loginCard.classList.add("d-none");
  loginCard.classList.remove("d-flex");
  signUpCard.classList.add("d-flex");
  signUpCard.classList.remove("d-none");
  home.classList.add("d-none");
  home.classList.remove("d-flex");
  loginMsg.innerHTML = "";
}

function showLogin() {
  loginCard.classList.add("d-flex");
  loginCard.classList.remove("d-none");
  signUpCard.classList.add("d-none");
  signUpCard.classList.remove("d-flex");
  home.classList.add("d-none");
  home.classList.remove("d-flex");
  signUpMsg.innerHTML = "";
}
var welcomeName = document.getElementById("welcomeName");
var username;
function showHome(username) {
  welcomeName.innerHTML = "Welcome ";
  loginCard.classList.add("d-none");
  loginCard.classList.remove("d-flex");
  signUpCard.classList.add("d-none");
  home.classList.remove("d-none");
  home.classList.add("d-flex");
  welcomeName.innerHTML += username;
}

var usersArr;
(function () {
  if (localStorage.getItem("user") == null) usersArr = [];
  else {
    usersArr = JSON.parse(localStorage.getItem("user"));
  }
})();

signUpBtn.addEventListener("click", signUpUser);

function signUpUser() {
  if (signUpCheck()) {
    signUpMsg.innerHTML = `<span style="color: rgb(40, 167, 69);">sucess</span>`;
    var user = {
      uName: nameSignUp.value,
      uEmail: emailSignUp.value,
      uPass: passwordSignUp.value,
    };

    usersArr.push(user);
    localStorage.setItem("user", JSON.stringify(usersArr));
  }
}

function signUpCheck() {
  var checkResult = true;

  if (
    nameSignUp.value == "" ||
    nameSignUp.value == "" ||
    nameSignUp.value == ""
  ) {
    checkResult = false;
    signUpMsg.innerHTML = `<span style="color: #DC3541;">All inputs are required</span>`;
  }

  for (var i = 0; i < usersArr.length; i++) {
    if (emailSignUp.value == usersArr[i].uEmail) {
      checkResult = false;
      signUpMsg.innerHTML = `<span style="color: #DC3541;">Email already exists</span>`;
      break;
    }
  }

  return checkResult;
}

loginBtn.addEventListener("click", loginAcc);

function loginAcc() {
  if (loginCheck()) showHome(username);
}

logoutBtn.addEventListener("click", function () {
  emailLogin.value = "";
  passwordLogin.value = "";
  showLogin();
});

function loginCheck() {
  if (emailLogin.value == "" || passwordLogin.value == "") {
    loginMsg.innerHTML = `<span style="color: #DC3541;">All inputs are required</span>`;
    return false;
  }

  for (var i = 0; i < usersArr.length; i++) {
    if (
      emailLogin.value == usersArr[i].uEmail &&
      passwordLogin.value == usersArr[i].uPass
    ) {
      username = usersArr[i].uName;
      return true;
    }
  }

  loginMsg.innerHTML = `<span style="color: #DC3541;">incorrect email or password</span>`;
  return false;
}
