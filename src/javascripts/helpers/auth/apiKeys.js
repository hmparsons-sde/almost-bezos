// const firebaseConfig = {
//   apiKey: 'AIzaSyD-0COTIX_j7knzziEWXLjZbyr2oSqelUI',
//   authDomain: 'almost-c67bb.firebaseapp.com',
//   databaseURL: 'https://almost-c67bb-default-rtdb.firebaseio.com',
//   projectId: 'almost-c67bb',
//   storageBucket: 'almost-c67bb.appspot.com',
//   appId: '1:521901952539:web:f4e5a3a0f7bcee335db2be',
//   measurementId: 'G-YX8P6J8WDX'
// };

// export default firebaseConfig;
const firebaseConfig = {
  apiKey: process.env.APP_API_KEY,
  authDomain: process.env.APP_AUTH_DOMAIN,
  databaseURL: process.env.APP_DATABASE_URL,
  projectId: process.env.APP_PROJECT_ID,
  storageBucket: process.env.APP_STORAGE_BUCKET,
  appId: process.env.APP_APP_ID,
  measurementId: process.env.APP_MEASUREMENT_ID,
};

export default firebaseConfig;
