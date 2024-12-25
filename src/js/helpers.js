import { TIMEOUT_SEC } from './config';

export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    // console.log(res);
    const data = await res.json();
    // console.log(data);
    if (!res.ok) throw new Error(`${data.message} 🛑 ${res.status}`);
    return data;
  } catch (err) {
    throw err;
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    const fetchRecipe = fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(uploadData),
    });
    const res = await Promise.race([fetchRecipe, timeout(TIMEOUT_SEC)]);
    // console.log(res);
    const data = await res.json();
    // console.log(data);
    if (!res.ok) throw new Error(`${data.message} 🛑 ${res.status}`);
    return data;
  } catch (err) {
    throw err;
  }
};
