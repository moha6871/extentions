const defaultData = {
  display: '2M+',
  enableBalance: false,
  balance: '2,647,147 Robux',
};
var userData;

function unsaved() {
  if (
    userData[this.dataset.dataname] !== this.value &&
    userData[this.dataset.dataname] !== this.checked
  ) {
    const toast = bootstrap.Toast.getOrCreateInstance(document.getElementById('unsavedToast'));
    if (toast.isShown()) return;
    toast.show();
  } else {
    bootstrap.Toast.getInstance(document.getElementById('unsavedToast'))?.dispose();
  }
}

function set_theme() {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.setAttribute('data-bs-theme', 'dark');
  } else {
    document.body.setAttribute('data-bs-theme', 'light');
  }
}

// Saves options to chrome.storage
function save_options(e) {
  e.preventDefault();
  chrome.storage.local.set(
    {
      display: document.getElementById('displayInput').value,
      enableBalance: document.getElementById('enableBalanceInput').checked,
      balance: document.getElementById('balanceInput').value,
    },
    function () {
      // Update status to let user know options were saved.
      bootstrap.Toast.getOrCreateInstance(document.getElementById('savedToast')).show();
      bootstrap.Toast.getInstance(document.getElementById('unsavedToast'))?.dispose();
      restore_options();
    }
  );
}

function reset_options() {
  chrome.storage.local.set(defaultData, function () {
    // Update status to let user know options were saved.
    bootstrap.Toast.getOrCreateInstance(document.getElementById('resetToast')).show();
    bootstrap.Toast.getInstance(document.getElementById('unsavedToast'))?.dispose();
    restore_options();
  });
}

function reset_field(e) {
  e.preventDefault();
  const target = document.querySelector(this.dataset.input);
  const fieldDefaultData = defaultData[target.dataset.dataname];
  target.value = fieldDefaultData;
  bootstrap.Toast.getOrCreateInstance(document.getElementById('resetToast')).show();
  unsaved.call(target);
}

function balance_option() {
  if (!document.getElementById('enableBalanceInput').checked) {
    new bootstrap.Tooltip(document.querySelector('#balanceField'), {
      title: "Enable 'Overwrite Balance' first!",
      placement: 'bottom',
    });
    document.getElementById('balanceInput').classList.add('text-body-tertiary');
    document.getElementById('balanceField').classList.add('text-body-tertiary');
    document.getElementById('balanceInput').disabled = true;
    document.getElementById('resetBalance').disabled = true;
  } else {
    bootstrap.Tooltip.getInstance('#balanceField')?.dispose();
    document.getElementById('balanceInput').classList.remove('text-body-tertiary');
    document.getElementById('balanceField').classList.remove('text-body-tertiary');
    document.getElementById('balanceInput').disabled = false;
    document.getElementById('resetBalance').disabled = false;
  }
}

function restore_options() {
  chrome.storage.local.get(defaultData, function (items) {
    userData = items;
    document.getElementById('displayInput').value = items.display;
    document.getElementById('enableBalanceInput').checked = items.enableBalance;
    document.getElementById('balanceInput').value = items.balance;
    balance_option();
  });
}
document.addEventListener('DOMContentLoaded', restore_options, set_theme);
document.addEventListener('DOMContentLoaded', set_theme);
document.getElementById('resetButton').addEventListener('click', reset_options);
document.getElementById('settings').addEventListener('submit', save_options);
document.getElementById('enableBalanceInput').addEventListener('change', balance_option);
document.getElementById('resetDisplay').addEventListener('click', reset_field);
document.getElementById('resetBalance').addEventListener('click', reset_field);
document.getElementById('displayInput').addEventListener('input', unsaved);
document.getElementById('balanceInput').addEventListener('input', unsaved);
document.getElementById('displayInput').addEventListener('change', unsaved);
document.getElementById('balanceInput').addEventListener('change', unsaved);
document.getElementById('enableBalanceInput').addEventListener('change', unsaved);
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', set_theme);
