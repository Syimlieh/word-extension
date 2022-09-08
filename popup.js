document.addEventListener("DOMContentLoaded", () => {
  //   var background = chrome.extension.getBackgroundPage();

  //   console.log("word", background);
  //   let word = background.word;
  let elem = document.createElement("p");
  elem.innerHTML = "word";
  document.getElementById("popword").appendChild(elem);
  const connectButton = document.getElementById("popwordConnectButton");
  // let page = chrome.extension.getBackgroundPage();
  // page.foo();
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    if (tab.url === undefined || tab.url.indexOf("chrome") == 0) {
      elem.innerHTML =
        '<span style="font-family: lobster, sans-serif">Eye Dropper</span> can\'t access <i>Chrome pages</i>';
    } else if (tab.url.indexOf("file") === 0) {
      elem.innerHTML =
        '<span style="font-family: lobster, sans-serif">Eye Dropper</span> can\'t access <i>local pages</i>';
    } else {
      connectButton.onclick = async function (e) {
        chrome.tabs.sendMessage(tabs[0].id, {
          from: "popup",
          info: "connection_start",
        });
        window.close();
      };
    }
  });

  //listening for message from content scripts
  // chrome.runtime.onMessage.addListener(function (
  //   request,
  //   sender,
  //   sendResponse
  // ) {
  //   if (request) {
  //     let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${request.text}`;
  //     async function apiCall() {
  //       const response = await fetch(url);
  //       const responseJson = await response.json();
  //       console.log(responseJson);
  //       return await responseJson;
  //     }

  //     apiCall()
  //       .then((movies) => {
  //         if (movies) {
  //           console.log(movies);
  //           const mappingData =
  //             movies[0]?.meanings[0]?.definitions[0]?.definition;
  //           console.log(mappingData);
  //           elem.innerHTML = request ? mappingData : "wording";
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error.message); // 'An error has occurred: 404'
  //       });
  //   }

  //   if (request.type) {
  //     document.body.style.backgroundColor = "green";
  //     sendResponse({ status: "done" });
  //   }
  // });

  chrome.storage.local.get(["word_defination"], (response) => {
    console.log("response: " + JSON.stringify(response));
    if (response.word_defination) {
      let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${response.word_defination.text}`;
      async function apiCall() {
        const response = await fetch(url);
        const responseJson = await response.json();
        console.log(responseJson);
        return await responseJson;
      }

      apiCall()
        .then((movies) => {
          if (movies) {
            console.log(movies);
            const mappingData =
              movies[0]?.meanings[0]?.definitions[0]?.definition;
            console.log(mappingData);
            elem.innerHTML = response.word_defination ? mappingData : "wording";
          }
        })
        .catch((error) => {
          console.log(error.message); // 'An error has occurred: 404'
        });
    }
  });
});
