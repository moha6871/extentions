chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason == 'install') {
    console.log('This is a first install!');
    chrome.tabs.create({ url: 'https://bigbobux.leonhub.com/installed' });
  } else if (details.reason == 'update') {
    chrome.storage.local.get(['display'], function (result) {
      var thisVersion = chrome.runtime.getManifest().version;
      var previousVersion = details.previousVersion;
      var display = result.display || '2M+';
      console.log('Updated from ' + previousVersion + ' to ' + thisVersion + '!');
      chrome.tabs.create({
        url: `https://bigbobux.leonhub.com/updated?display=${encodeURIComponent(
          display
        )}&version=${encodeURIComponent(thisVersion)}&previousVersion=${encodeURIComponent(
          previousVersion
        )}`,
      });
    });
  }
});

chrome.action.onClicked.addListener(() => {
  chrome.runtime.openOptionsPage();
});
