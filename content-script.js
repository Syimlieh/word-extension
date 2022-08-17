console.log("Hello World");

window.addEventListener("mouseup", mouseUpped);

function mouseUpped() {
  let selectedText = window.getSelection().toString();
  console.log("SElected Text ", selectedText);
  if (selectedText.length > 0) {
    let message = {
      text: selectedText,
    };
    chrome.runtime.sendMessage(message);
  }
}
