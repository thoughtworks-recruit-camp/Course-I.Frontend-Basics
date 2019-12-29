// var request = new XMLHttpRequest();
// request.onreadystatechange=showContents;
// function showContents(){
//   if (request.readyState === XMLHttpRequest.DONE) {
//     if (request.status===200) {
//       document.write(JSON.stringify(JSON.parse(request.responseText)));
//
//     }else {
//       document.write('Problem occurred!')
//     }
//   }
// }
// window.onload =function () {
//   request.open('GET', 'https://api.github.com/repos/thoughtworks-recruit-camp/Course-I.Frontend-Basics');
//   request.send()
//
// };
//
//


var ajax = {
  request: function (url, method, callback, body) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function handleResponse() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          callback(xhr);
        } else {
          alert('Problem occurred!');
        }
      }
    };
    xhr.open(method.toUpperCase(), url);
    xhr.send(body);
  }
};

function myCallback(xhr) {
  alert(xhr.responseText);
}

window.onload = function () {
  var requestButton = document.getElementById("request-button");
  requestButton.onclick= function (){
    var requestURL = document.getElementById("ajax-url").getAttribute("value");
    ajax.request(requestURL, "get", myCallback);
  }
};