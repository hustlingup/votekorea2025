// Netlify build script — runs via netlify.toml [build] command.
// Reads environment variables set in Netlify dashboard and writes config.js.
const fs = require('fs');

const required = [
  'FIREBASE_API_KEY', 'FIREBASE_AUTH_DOMAIN', 'FIREBASE_DATABASE_URL',
  'FIREBASE_PROJECT_ID', 'FIREBASE_STORAGE_BUCKET',
  'FIREBASE_MESSAGING_SENDER_ID', 'FIREBASE_APP_ID', 'KAKAO_JS_KEY'
];
const missing = required.filter(k => !process.env[k]);
if (missing.length) {
  console.error('Missing environment variables:', missing.join(', '));
  process.exit(1);
}

const out = `window.SITE_CONFIG = {
  firebase: {
    apiKey: "${process.env.FIREBASE_API_KEY}",
    authDomain: "${process.env.FIREBASE_AUTH_DOMAIN}",
    databaseURL: "${process.env.FIREBASE_DATABASE_URL}",
    projectId: "${process.env.FIREBASE_PROJECT_ID}",
    storageBucket: "${process.env.FIREBASE_STORAGE_BUCKET}",
    messagingSenderId: "${process.env.FIREBASE_MESSAGING_SENDER_ID}",
    appId: "${process.env.FIREBASE_APP_ID}",
    measurementId: "${process.env.FIREBASE_MEASUREMENT_ID || ''}"
  },
  kakaoKey: "${process.env.KAKAO_JS_KEY}"
};
`;

fs.writeFileSync('config.js', out);
console.log('config.js generated from environment variables.');
