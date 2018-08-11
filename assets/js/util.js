const access_token = "_LAi__eFhDVZeVgsWuWyG9CwdXIcEjx50MHr-OOtRhpit59roVfsgtLQZaklHdCOv2QJ4bLI8D3CcQQNZaV-E0OmoMxpi2nCbWuzkUV8nAKTBFSqvvvD8oo5Fg7dWnYx";

let myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + access_token);

function storageAvailable(type) {
  try {
      var storage = window[type],
          x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
  }
  catch(e) {
      return e instanceof DOMException && (
          e.code === 22 ||
          e.code === 1014 ||
          e.name === 'QuotaExceededError' ||
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
          storage.length !== 0;
  }
}
