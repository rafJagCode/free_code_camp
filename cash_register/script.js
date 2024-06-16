let price = 3.26;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

let valuesMap = new Map([
  ["PENNY", 0.01],
  ["NICKEL", 0.05],
  ["DIME", 0.1],
  ["QUARTER", 0.25],
  ["ONE", 1],
  ["FIVE", 5],
  ["TEN", 10],
  ["TWENTY", 20],
  ["ONE HUNDRED", 100],
]);

let inDrawer;

const updatePrice = () => {
  const priceEl = document.getElementById("screen-display");
  priceEl.innerText = `Total: $${price}`;
};

const updateDrawer = () => {
  for (const [key, val] of cid) {
    const id = key.toLowerCase().replaceAll(" ", "-");
    document.getElementById(id).innerText = `$${val}`;
  }
};

const calcBills = (change) => {
  const bills = [];
  for (let i = cid.length - 1; i >= 0; i--) {
    const [unit, amount] = cid[i];
    const unitVal = valuesMap.get(unit);
    if (change < unitVal) continue;
    const multi = Math.floor(change / unitVal);
    const used = +Math.min(amount, multi * unitVal).toFixed(2);
    if (0 - used === 0) continue;
    change = +(change - used).toFixed(2);
    bills.push([unit, used]);
    if (change < 0.01) return bills;
  }
  return null;
};

const updateReg = (bills) => {
  for (const [unit, used] of bills) {
    inDrawer = +(inDrawer - used).toFixed(2);
    const bill = cid.find((el) => el[0] === unit);
    bill[1] = +(bill[1] - used).toFixed(2);
  }
};

updatePrice();
updateDrawer();

const handleClick = () => {
  inDrawer = +cid.reduce((acc, curr) => acc + curr[1], 0).toFixed(2);
  let changeMsg;
  const val = +parseFloat(document.getElementById("cash").value).toFixed(2);
  if (val === NaN) return;
  if (val < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }
  if (!(val - price))
    changeMsg = "No change due - customer paid with exact cash";
  else {
    const change = +(val - price).toFixed(2);
    const bills = calcBills(change);
    if (!bills) changeMsg = "Status: INSUFFICIENT_FUNDS";
    else {
      updateReg(bills);
      changeMsg =
        (!+inDrawer ? "Status: CLOSED" : "Status: OPEN") +
        bills.reduce((acc, curr) => (acc += ` ${curr[0]}: $${+curr[1]}`), "");
    }
  }
  document.getElementById("change-due").innerText = changeMsg;
  updateDrawer();
};
