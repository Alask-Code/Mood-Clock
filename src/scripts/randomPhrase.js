export default function randomPhrase (phraseList) {
  return phraseList[Math.floor(Math.random() * phraseList.length)];
}
