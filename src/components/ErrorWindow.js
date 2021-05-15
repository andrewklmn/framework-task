import { contentClass } from '../style.css';

export function ErrorWindow(text) {
  return `
    <div class="${contentClass}" style="color: red;">
      ${text}
    </div>
  `;
}
