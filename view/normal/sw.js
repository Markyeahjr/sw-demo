//sw.js

// 静态缓存资源
let resources = [
  'index.html',
  'css/style.css',
  'js/app.js',
  'js/image-list.js',
  'img/star-wars-logo.jpg',
  'img/bountyHunters.jpg',
  'img/myLittleVader.jpg',
  'img/snowTroopers.jpg'
];

// 缓存cachestorage的名称
let cacheStorageName = `maxhub-presentation-front`;

/**
* 当浏览器解析完sw.js时, 触发install事件
*/
self.addEventListener('install', function (e) {
  console.log('install');
  // 预缓存
  e.waitUntil(caches.open(cacheStorageName).then((cache) => {
    console.log('precache or update resources', resources);
    return cache.addAll(resources);
  }).then(() => {
    console.log('skipWaiting');
    self.skipWaiting();
  }));
});

/**
 * sw激活时, 触发activate事件
 */
self.addEventListener('activate', function (e) {
  console.log('activate');
  // e.waitUntil(self.clients.claim().then(()=>{
  //   console.log('claim');
  // }));
});

/**
 * 拦截请求
 */
addEventListener('fetch', function (e) {
  console.log('fetch', e.request.url);
  e.respondWith((async () => {
    // 匹配缓存
    const cachedResponse = await caches.match(e.request);
    if (cachedResponse) {
      return cachedResponse;
    }

    try {
      const response = await fetch(e.request);
      return response;
    } catch (error) {
      console.log('error', error);
      return caches.match('img/myLittleVader.jpg');
    }
  })())
});