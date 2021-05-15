export default function checkIfErrorExistsInAnswer(data, url) {
  if (data.status === 'error') {
    return Promise.reject(data.message);
  }
  localStorage.setItem(encodeURI(url), JSON.stringify(data.articles));
  localStorage.setItem(encodeURI(url + '-lastReadAt'), Date.now());
  return data.articles;
}
