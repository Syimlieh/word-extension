console.log("THis is a background Script");

chrome.runtime.onMessage.addListener(receiver);

var word = "Word Defination";

function receiver(request, sender, sendResponse) {
  console.log("word from background", word);
  word = request.text;
}
function foo() {
  console.log("I'm defined in background.js");
}
