const check = () => {
  const regex = new RegExp(
    "^((1{1}\\s?(\\({1}[0-9]{3}\\){1}|[0-9]{3}))|(\\({1}[0-9]{3}\\){1}|[0-9]{3}))(\\s[0-9]{3}|-{1}[0-9]{3}|[0-9]{3})(\\s[0-9]{4}|-{1}[0-9]{4}|[0-9]{4})$",
    "g"
  );
  const val = document.getElementById("user-input").value;
  const resultsEl = document.getElementById("results-div");
  if (!val.length) {
    alert("Please provide a phone number");
    return;
  }
  if (regex.test(val)) {
    resultsEl.innerText = `Valid US number: ${val}`;
  } else resultsEl.innerText = `Invalid US number: ${val}`;
};

const clearInput = () => {
  const resultsEl = document.getElementById("results-div");
  resultsEl.innerText = "";
};
