const fs = require('fs');
const path = require('path');

const rootPath = path.join(__dirname, '..');

module.exports =  function transformer({ headers }) {
  const config = {
    version: 2,
    public: true,
    name: 'training-fady-app.vercel.app',
    alias: 'training-fady-app.vercel.app',
    regions: ['bru'],
    builds: [
      { src: 'public/**', use: '@vercel/static' },
      { src: 'config/fallback-route.js', use: '@vercel/node' },
    ],
    routes: [
      {
        src: '/(.*).(js.map|js|css|txt|html|png)',
        dest: '/public/$1.$2',
        headers: { 'Cache-Control': 's-maxage=31536000,immutable' },
      },
      { src: '/(login|logout)', dest: '/config/fallback-route.js' },
      {
        src: '/(.*)',
        dest: '/public/index.html',
        headers: { 'Cache-Control': 'no-cache', ...headers },
      },
    ],
  };
  fs.writeFileSync(
    path.join(rootPath, 'vercel.json'),
    JSON.stringify(config, null, 2),
    { encoding: 'utf8' }
  );
};
