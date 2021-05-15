import App from './../components/App';

export default function renderApp() {
  document.querySelector('.root').innerHTML = `
    ${App(window.dataStore)}
  `;
}
