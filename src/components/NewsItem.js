import { newsItemClass, newsImageClass } from '../style.css';

export default function NewsItem({ title, urlToImage, description, url }) {
  return `
    <div class="${newsItemClass}">
      <h3>${title}</h3>
      ${urlToImage ? `<img class="${newsImageClass}" src="${urlToImage}"/>` : ''}      
      <p>${description}</p>
      <a target="_blank" href="${url}">Read more ... </a>
    </div>
  `;
}
