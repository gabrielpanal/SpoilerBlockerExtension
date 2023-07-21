// Saves options to chrome.storage

function getKeywords(){
  //....
  var saveArray = [];
  var element = document.getElementById('inputText');
  var text = element.value;
  var wordsArray = text.split(/\s+/);
  if(wordsArray[wordsArray.length - 1].length === 0){
    wordsArray.splice(wordsArray.length - 1, 1)
  }
  save(wordsArray);
}

function save(saveArray) {
  chrome.storage.sync.set({
    keywordsArray: saveArray
  }, function() {
    // Update status to user
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore() {
  chrome.storage.sync.get({
    keywordsArray: []
  }, function(items) {
    var restoredElement = document.querySelector('.keywords-container .input');
    restoredElement.querySelector('textarea').value = items.keywordsArray.join('\n');
  });
}

document.addEventListener('DOMContentLoaded', restore);
document.getElementById('block').addEventListener('click', getKeywords);