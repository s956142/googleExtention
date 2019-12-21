chrome.runtime.onInstalled.addListener(function() {
  // 擴充元件初始化要做的動作
  chrome.storage.onChanged.addListener(function(changes, namespace) {
    // 監控主流程的storage變化
    console.log("storage change");
    for (var key in changes) {
      var storageChange = changes[key];
      console.log(
        'Storage key "%s" in namespace "%s" changed. ' +
          'Old value was "%s", new value is "%s".',
        key,
        namespace,
        storageChange.oldValue,
        storageChange.newValue
      );
    }
  });
  /****
   *
   * chrome.storage.sync
   * chrome.storage.local
   * 差異為是否會同步到在同使用者個其他裝置chrome
   * local為本地裝置
   * 但若是離線狀態
   * storage.sync 等同於 storage.local
   */
  // 監控主流程的storage變化
  chrome.storage.sync.set({ color: "#3aa757" }, function() {
    console.log("The color is green.");
  });
  chrome.storage.local.set({ testChange: "a" }, function() {
    // 新增欄位不會觸發change
  });
  chrome.storage.local.set({ testChange: "b" }, function() {
    // 這會觸發change
  });
  chrome.storage.local.set({ testChange: "c" }, function() {
    // 這也會觸發change
  });
  chrome.storage.local.set({ count: 0 }, function() {
    // 設定count
  });
  /**
   * 在browser重啟始會紀錄addRules的狀態，下面這段不怕遺失
   * google建議在每頁都取消與重新註冊事件，因為每個頁面都會重新創建物件結構，雖然重建會增加效能損耗，相較之下(不銷毀)會比較快速完成運算邏輯
   * 
   */
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        //conditions 觸發擴充元件條件
        //actions 觸發時對應事件
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "tpu.thinkpower.com.tw" }
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});
