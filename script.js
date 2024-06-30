const Base_Url =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg")

const dropdowns = document.querySelectorAll(".dropdown select");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    select.append(newOption);
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
  }
  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
  function updateFlag(element) {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
  }
}

btn.addEventListener("click", async (e) => {
  e.preventDefault();
  let amount = document.querySelector("form input");
  let amtVal = amount.value;

  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  // console.log(fromCurr.value,toCurr.value);
  const URL = `${Base_Url}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
//   console.log(data);
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
//   console.log(rate);
  const finalAmount = rate * amount.value;
//   console.log(final_Amount);
msg.innerText = `${amount.value} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
});
