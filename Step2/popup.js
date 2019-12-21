(function() {
  let changeColor = document.getElementById("changeColor");
  changeColor.onclick = function() {
    chrome.storage.sync.get("color", function(data) {
      changeColor.style.backgroundColor = data.color;
      changeColor.setAttribute("value", data.color);
    });
  };
  let changeColor2 = document.getElementById("changeColorTest");
  changeColor2.onclick = function(element) {
    let color = changeColor.value;
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.executeScript(tabs[0].id, {
        code: 'document.body.style.backgroundColor = "' + color + '";'
      });
    });
  };
  chrome.storage.local.get(["count"], function(result) {
    console.log("Value currently is " + result.count);
    chrome.storage.local.set({ count: ++result.count }, function() {
      console.log("set count", result.count);
      // 設定count測試進入時間
    });
    document.getElementById("text").textContent = result.count;
  });
})();
