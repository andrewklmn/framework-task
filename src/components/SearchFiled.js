export default function SearchField({ searchWord }) {
  return `
    Search by:
    <input onchange="performSearch(this.value);" value="${
      searchWord ? searchWord : ''
    }" placeholder="Enter word or phrase"/>
  `;
}
