var spoiler;
var allElements = document.querySelectorAll('h1, h2, h3, h4, h5, p, a, caption, span, td');
var predictions = [];

chrome.storage.sync.get({
  keywordsArray: []
}, function(items) {
  extractKeywords(items.keywordsArray);
});

function extractKeywords(keywordsArray){
  var promises = []; 

  for (var i = 0; i < allElements.length; i++) {
    var response = readContent(allElements[i]);
    promises.push(response); 
  }

  Promise.all(promises)
  .then(function(results) {
    var predictions = results.map(function(result) {
      return result;
    });
    for (var i = 0; i < keywordsArray.length; i++) {
      replace(keywordsArray[i], predictions);
    }
  })
  .catch(function(error) {
    console.error(error);
  });
}

function readContent(content){
  return new Promise(function(resolve, reject){
    chrome.runtime.sendMessage({ action: 'analyzeContent', text: content.innerText}, function(response) {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(response.result);
      }
      });
  })
}

function replace(keyword, preds){
  for (var i = 0; i < allElements.length; i++) {
    if(allElements[i].innerText.toLowerCase().includes(keyword.toLowerCase())){
        if(preds[i] == "True"){
        console.log(allElements[i]);
        allElements[i].style.color='transparent';
        allElements[i].style.textShadow='0 0 8px rgba(0,0,0,0.5)';
      }
    }
  }
}

function functionSample(prediction){
  if(prediction == 'True'){
    console.log("Spoiler asd asl")
    // console.log(allElements[i])
  }
}
