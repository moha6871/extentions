chrome.storage.local.get(
  {
    display: '2M+',
    enableBalance: false,
    balance: '2,647,147 Robux',
  },
  function (result) {
    const display = result.display;
    const balance = result.balance;
    const enableBalance = result.enableBalance;
    const domObserver = new MutationObserver(() => {
      const robuxAmount = document.querySelector('#nav-robux-amount');
      const robuxBalance = document.querySelector('#nav-robux-balance')?.firstChild;

      if (robuxAmount) {
        if (robuxAmount.textContent != display) {
          robuxAmount.textContent = display;
        }
      }

      if (robuxBalance && enableBalance == true) {
        if (robuxBalance.nodeValue != balance) {
          robuxBalance.nodeValue = balance;
        }
      }
    });

    domObserver.observe(document, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }
);
