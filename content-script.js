chrome.runtime.onMessage.addListener((message, sender) => {
  if (message?.from === "popup" && message?.info === "connection_start") {
    console.log("message", message);
    window.addEventListener("mouseup", mouseUpped);
    function mouseUpped() {
      setTimeout(() => {
        let selectedText = window.getSelection().toString();
        console.log("SElected Text ", selectedText);
        if (selectedText.length > 0) {
          let message = {
            text: selectedText,
          };
          console.log("Message: ", message);
          chrome.runtime.sendMessage(message);
          chrome.storage.local.get("word_defination", (response) => {
            chrome.storage.local.set({ word_defination: message });
          });
        }
      }, 500);
    }
  }
});

// function mouseUpped() {
//   let selectedText = window.getSelection().toString();
//   console.log("SElected Text ", selectedText);
//   if (selectedText.length > 0) {
//     let message = {
//       text: selectedText,
//     };
//     chrome.runtime.sendMessage(message);
//   }
// }
// chrome.runtime.onConnect.addListener(function (port) {
//   port.onMessage.addListener(function (message) {
//     console.log("message", message);
//     if (port.name === "word") {
//       const idToQuery = message.id;
//       console.log("query", idToQuery);
//       window.addEventListener("mouseup", function () {
//         let selectedText = this.window.getSelection().toString();
//         if (selectedText.length > 0) {
//           let message = {
//             text: selectedText,
//           };
//           postMessage({
//             message,
//           });
//           chrome.runtime.sendMessage(message);
//         }
//       });
//     }
//     console.log(message);
//   });
// }); //
