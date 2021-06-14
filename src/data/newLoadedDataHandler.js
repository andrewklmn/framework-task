export default function newLoadedDataHandler(data, url) {
  if (data.status === 'error') {
    return Promise.reject(data.message);
  }
  localStorage.setItem(encodeURI(url), JSON.stringify(data.articles));
  localStorage.setItem(encodeURI(url + '-lastReadAt'), Date.now()); // TODO
  return Promise.resolve(data.articles);
}
