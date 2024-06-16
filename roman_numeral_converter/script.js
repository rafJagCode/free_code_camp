const numMap = new Map([
  [1000, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
]);

const firstEqSmaller = (num) => {
  for (const [arabic, roman] of numMap) {
    if (arabic <= num) return { arabic, roman };
  }
};

const convertToRoman = (n) => {
  let result = "";
  while (n) {
    const { arabic, roman } = firstEqSmaller(n);
    const multi = Math.floor(n / arabic);
    n -= multi * arabic;
    result += roman.repeat(multi);
  }
  return result;
};

const handleClick = () => {
  let outputVal = "";
  const outputEl = document.getElementById("output");
  const val = document.getElementById("number").value;
  if (!val.length) outputVal = "Please enter a valid number";
  else if (Number(val) < 1)
    outputVal = "Please enter a number greater than or equal to 1";
  else if (Number(val) >= 4000)
    outputVal = "Please enter a number less than or equal to 3999";
  else outputVal = convertToRoman(Number(val));
  outputEl.innerText = outputVal;
  outputEl.style.display = "block";
};
