// register service worker

if ('serviceWorker' in navigator) {
  // 卸载sw
  // navigator.serviceWorker.getRegistrations().then(function (registrations) {
  //   console.log('已注册sw: ', registrations);
  //   for (let registration of registrations) {
  //     console.log('卸载sw: ', registration);
  //     registration.unregister()
  //   }
  // }).catch(function (err) {
  //   console.log('Service Worker registration failed: ', err)
  // })

  if (!navigator.serviceWorker.controller) {
    console.log('register worker');
    navigator.serviceWorker.register('sw.js').then(function (reg) {
      if (reg.installing) {
        console.log('Service worker installing');
      } else if (reg.waiting) {
        console.log('Service worker installed');
      } else if (reg.active) {
        console.log('Service worker active');
      }
  
    }).catch(function (error) {
      // registration failed
      console.log('Registration failed with ' + error);
    });
  } else {
    console.log('Service worker actived', navigator.serviceWorker.controller);
  }
  setInterval(() => {
    fetch('img/bountyHunters.jpg').then((res)=>{
      console.log(11, res.url);
    })
  }, 3000);
}

// function for loading each image via XHR

function imgLoad (imgJSON) {
  // return a promise for an image loading
  return new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest();
    request.open('GET', imgJSON.url);
    request.responseType = 'blob';

    request.onload = function () {
      if (request.status == 200) {
        var arrayResponse = [];
        arrayResponse[0] = request.response;
        arrayResponse[1] = imgJSON;
        resolve(arrayResponse);
      } else {
        reject(Error('Image didn\'t load successfully; error code:' + request.statusText));
      }
    };

    request.onerror = function () {
      reject(Error('There was a network error.'));
    };

    // Send the request
    request.send();
  });
}

var imgSection = document.querySelector('section');

window.onload = function () {

  // load each set of image, alt text, name and caption
  for (var i = 0; i <= Gallery.images.length - 1; i++) {
    imgLoad(Gallery.images[i]).then(function (arrayResponse) {

      var myImage = document.createElement('img');
      var myFigure = document.createElement('figure');
      var imageURL = window.URL.createObjectURL(arrayResponse[0]);

      myImage.src = imageURL;
      myImage.setAttribute('alt', arrayResponse[1].alt);
      imgSection.appendChild(myFigure);
      myFigure.appendChild(myImage);

    }, function (Error) {
      console.log(Error);
    });
  }
};
