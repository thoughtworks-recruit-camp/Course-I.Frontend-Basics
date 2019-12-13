function isQualified(username, password) {
  return username === "123" && password === "123";
}

function checkInput() {
  var usernameInput = document.getElementById('username-input');
  var passwordInput = document.getElementById('password-input');
  username = usernameInput.value;
  password = passwordInput.value;
  if (isQualified(username, password)) {
    alert("登陆成功。");
  } else if (!username || !password) {
    alert("用户名或密码未填写！");
  } else {
    passwordInput.value = "";
    alert("用户名或密码错误！");
  }
}


window.onload = function () {
  var loginButton = document.getElementById('login-button');
  loginButton.onclick = checkInput;
};