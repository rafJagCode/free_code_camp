const isPalindrome = (string) => {
  let left = 0;
  let right = string.length - 1;
  while (left < right) {
    if (string[left] !== string[right]) return false;
    left++, right--;
  }
  return true;
};

const handleClick = () => {
  const val = document.getElementById("text-input").value;
  const resultEl = document.getElementById("result");
  if (!val.length) {
    alert("Please input a value");
    return;
  }
  const processed = val.replaceAll(/[^a-zA-Z0-9]/g, "").toLowerCase();
  console.log(processed);
  if (isPalindrome(processed)) resultEl.innerText = `${val} is a palindrome`;
  else resultEl.innerText = `${val} is not a palindrome`;
};
