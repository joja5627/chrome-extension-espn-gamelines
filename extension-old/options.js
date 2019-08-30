const video = document.getElementById('live-video');
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const counter = document.getElementById('counter');

(function initializeCounter() {
  counter.textContent = 0;
})();

startButton.addEventListener('click', function () {
  if (startButton.disabled) {
    return;
  } else {
    startButton.disabled = true;
    startButton.classList.add('button-inactive');
    startButton.classList.remove('button-active');
    stopButton.disabled = false;
    stopButton.classList.add('button-active');
    stopButton.classList.remove('button-inactive');
  }
});

stopButton.addEventListener('click', function () {
  if (stopButton.disabled) {
    return;
  } else {
    stopButton.disabled = true;
    stopButton.classList.add('button-inactive');
    stopButton.classList.remove('button-active');
    startButton.disabled = false;
    startButton.classList.add('button-active');
    startButton.classList.remove('button-inactive');
  }
});

navigator.mediaDevices
  .getUserMedia({ video: true, audio: false })
  .then(stream => {
    video.srcObject = stream;
    video.play();
  })
  .catch(err => {
    console.error('An error occurred! ' + err);
  });

const canvas = document.getElementById('canvas');
let token;

const takePicture = () => {
  counter.textContent = parseInt(++counter.textContent, 10);
  var context = canvas.getContext('2d');
  var width = canvas.width;
  var height = canvas.height;
  if (width && height) {
    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);

    const dataUri = canvas.toDataURL('image/jpeg', 1);
    const data = dataUri.split(',')[1];
    const bytes = window.atob(data);
    const buf = new ArrayBuffer(bytes.length);
    const byteArr = new Uint8Array(buf);
    for (let i = 0; i < bytes.length; i++) {
      byteArr[i] = bytes.charCodeAt(i);
    }

    async function getCurrentTab(callback) {
      await chrome.tabs.query(
        {
          active: true,
          currentWindow: true,
        },
        tabs => {
          callback(tabs[0]);
        }
      );
    }

    async function displayTab(tab) {
      let tabURL = tab.url;
      await fetch('http://localhost:8080/api/webcam', {
        method: 'POST',
        body: byteArr,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/octet-stream',
          tabUrl: tabURL,
          tokenId: token,
        },
      });
    }

    getCurrentTab(displayTab);
  }
};

const userTokenId = () => {
  // USE THIS TO RESET YOUR TOKEN
  try {
    function deleteUserIdFromStorage(callback) {
      chrome.storage.sync.remove('userid', function() {
        callback();
      });
    }
  } catch (error) {
    console.log(chrome.runtime.lastError);
  }
  async function deltedToken() {
    console.log('deleted');
  }
  deleteUserIdFromStorage(deltedToken);

  async function getUserIdFromStorage(callback) {
    await chrome.storage.sync.get('userid', async items => {
      let userid = items.userid;
      if (userid) {
        callback(userid);
      } else {
        let randomPool = new Uint8Array(32);
        crypto.getRandomValues(randomPool);
        let hex = '';
        for (let i = 0; i < randomPool.length; i++) {
          hex += randomPool[i].toString(16);
        }
        console.log(hex, 'else');
        await chrome.storage.sync.set({ userid: hex }, () => {
          callback(hex);
        });
      }
    });
  }

  async function useToken(userid) {
    token = userid;
    console.log(token);
  }
  getUserIdFromStorage(useToken);
};

userTokenId();

let interval;
startButton.onclick = function() {
  interval = setInterval(takePicture, 5000);
};

stopButton.onclick = function() {
  clearInterval(interval);
};
