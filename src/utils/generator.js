import wordBase from "../english_words/words_alpha.txt";

function randomIndex(max = 307103) {
  return Math.floor(Math.random() * max);
}

function indexArray(number = 7) {
  const arr = [];
  let i = 0;

  while (i < number) {
    arr.push(randomIndex());
    i++;
  }
  return arr;
}

function wordArray(glossary, number = 7) {
  const arr = [];
  let i = 0;
  let indices = indexArray(number);

  while (i < number) {
    arr.push(glossary[indices[i]]);
    i++;
  }
  return arr;
}

export function generateWords() {
  return fetch(wordBase)
    .then((response) => response.text())
    .then((textContent) => {
      const glossary = textContent.split("\r\n");
      const randomWords = wordArray(glossary, 10);
      return randomWords;
    })
    .catch((err) => console.error(err, "Something didn't got right"));
}
