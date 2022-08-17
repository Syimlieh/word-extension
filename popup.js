(() => {
  //   var background = chrome.extension.getBackgroundPage();

  //   console.log("word", background);
  //   let word = background.word;
  let elem = document.createElement("p");
  elem.innerHTML = "word";
  document.getElementById("popword").appendChild(elem);
  // let page = chrome.extension.getBackgroundPage();
  // page.foo();

  //listening for message from content scripts
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    if (request) {
      let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${request.text}`;
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
            elem.innerHTML = request ? mappingData : "wording";
          }
        })
        .catch((error) => {
          console.log(error.message); // 'An error has occurred: 404'
        });
    }

    if (request.type) {
      document.body.style.backgroundColor = "green";
      sendResponse({ status: "done" });
    }
  });
})();
