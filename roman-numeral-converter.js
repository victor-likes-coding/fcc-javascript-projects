"MeDiCaL XaVIer";
const romanPairs = {
  M: 1000,
  D: 500,
  C: 100,
  L: 50,
  X: 10,
  V: 5,
  I: 1,
};
const repeatableLetters = "MCXI".split("");
const romanLetters = Object.keys(romanPairs).join("");

const weCanRepeat = (letter) => {
  return repeatableLetters.includes(letter);
};

// need function to change ordering of roman letters when we need to repeat a letter more than 3 times

const convertToRoman = (number) => {
  let romanString = "";
  let remainder = number;
  const pairs = Object.entries(romanPairs);
  for (let romanPair of pairs) {
    const [letter, letterValue] = romanPair;
    const count = Math.floor(remainder / letterValue);
    remainder %= letterValue;
    console.log(letter, letterValue, count, remainder);
    if (count > 3) {
      console.log(`Roman String currently: ${romanString}`)
      remainder = remainder + letterValue * count;
      let modifiedRemainder =
        Math.floor(remainder / remainder) * letterValue * count;

      const indexOfLetter = romanLetters.indexOf(letter);
      const previousLetterIndex = indexOfLetter - 1;
      const previousLetter = romanLetters[previousLetterIndex];
      const previousLetterValue = romanPairs[previousLetter];
      if (previousLetter === romanString[romanString.length - 1]) {
      modifiedRemainder += previousLetterValue;
      }
      const differenceCount = previousLetterValue - letterValue;
      console.log(
        `previousLetter: ${previousLetter}, value: ${previousLetterValue}, remainder: ${modifiedRemainder} differenceCount: ${differenceCount}`
      );
      if (differenceCount === modifiedRemainder) {
        if (previousLetter === romanString[romanString.length - 1]) {
          romanString = romanString.substring(0, romanString.length - 1);
        }
        console.log(
          `Roman String: ${romanString}, modifiedRemaining: ${modifiedRemainder}`
        );
        console.log(
          `This is it, ${modifiedRemainder}, ${letter.concat(previousLetter)}`
        );
        romanString = romanString.concat(letter.concat(previousLetter));
      } else {
        console.log("Trying the 10x value")
        const tenLetterIndex = indexOfLetter - 2;
        const tenLetter = romanLetters[tenLetterIndex];
        const tenLetterValue = romanPairs[tenLetter];

        const differenceCount = tenLetterValue - letterValue;
        console.log(
          `remainder: ${modifiedRemainder} differenceCount: ${differenceCount}`
        );
        if (differenceCount === modifiedRemainder) {
          romanString = romanString.substring(0, romanString.length - 1);
          romanString = romanString.concat(letter.concat(tenLetter));
          console.log(`remainder: ${remainder} modified: ${modifiedRemainder}`)
        }
      }
    } else if (count > 0) {
      romanString = romanString.concat(letter.repeat(count));
    }
    remainder %= letterValue;

  }

  return romanString;
};

console.log(convertToRoman(44), 'XLIV');
// console.log(convertToRoman(2014), 'MMXIV');
// console.log(convertToRoman(3999), "MMMCMXCIX");
