const API_KEY = "6f712d9120a876df83ba6636";

const targetCurrencySelect = document.getElementById("target-currency");
const amountInput = document.getElementById("amount");
const convertButton = document.getElementById("display-button");
const clearButton = document.getElementById("clear-button");
const sourceCurrencySelect = document.getElementById("source-currency");
const compareList = document.getElementById("compare-list");
const compareButton = document.getElementById("compare-button");
const clearListButton = document.getElementById("clear-list-button");
const resultsContainer = document.querySelector(".results-container");
const compareContainer = document.querySelector(".compare-container");
const addToListButton = document.querySelector(".add-to-list-button");

let selectedCountries = [];

//Hiding the add to list button and compare div on default
addToListButton.style.display = "none";
compareContainer.style.display = "none";

//On selecting a specific currency "Add to list" button is visible
sourceCurrencySelect.addEventListener("change", () => {
  if (sourceCurrencySelect.value) {
    addToListButton.style.display = "inline-block";
  } else {
    addToListButton.style.display = "none";
  }
});

//Adds the specific chosen currency to the list
addToListButton.addEventListener("click", () => {
  const selectedCurrency = sourceCurrencySelect.value;
  if (
    selectedCurrency &&
    selectedCountries.length < 5 &&
    !selectedCountries.includes(selectedCurrency)
  ) {
    selectedCountries.push(selectedCurrency);

    const listItem = document.createElement("li");
    listItem.textContent = selectedCurrency;
    compareList.appendChild(listItem);

    if (selectedCountries.length > 0) {
      clearListButton.style.display = "inline-block";
    }

    if (selectedCountries.length >= 2) {
      compareButton.style.display = "inline-block";
    }

    if (selectedCountries.length === 5) {
      addToListButton.style.display = "none";
    }

    compareContainer.style.display = "block";
  }
});

//Clearing the listed currencies on clicking clear button
clearListButton.addEventListener("click", () => {
  selectedCountries = [];
  compareList.innerHTML = "";
  compareButton.style.display = "none";
  clearListButton.style.display = "none";
  compareContainer.style.display = "none";
});

//Companring the added currencies, sorting it and displaying in order
compareButton.addEventListener("click", async () => {
  const currencyValues = [];

  for (const currency of selectedCountries) {
    try {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`
      );
      const data = await response.json();
      const rateAgainstCurrency = data.conversion_rates[currency];

      if (rateAgainstCurrency) {
        currencyValues.push({
          currency,
          rateAgainstCurrency,
        });
      }
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
    }
  } 

  // Sort currencies by their value against USD in descending order
  currencyValues.sort((a, b) => a.rateAgainstCurrency - b.rateAgainstCurrency);

  // Clear the list and display the sorted currencies
  compareList.innerHTML = currencyValues
    .map(
      (item) =>
        `<li>1 USD : ${item.rateAgainstCurrency.toFixed(4)} ${
          item.currency
        }</li>`
    )
    .join("");
});

//fetching currency code for dropdoen options
fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/codes`)
  .then((response) => response.json())
  .then((data) => {
    const currencies = data.supported_codes;
    currencies.sort((a, b) => {
      if (a[1] < b[1]) return -1;
      if (a[1] > b[1]) return 1;
      return 0;
    });
    currencies.forEach((currency) => {
      const option = document.createElement("option");
      option.value = currency[0];
      option.text = `${currency[1]}`;
      sourceCurrencySelect.appendChild(option);
      targetCurrencySelect.appendChild(option.cloneNode(true));
    });
  });

//Fetching and displayming currency conversion data
convertButton.addEventListener("click", () => {
  const baseCurrency = sourceCurrencySelect.value;
  const targetCurrency = targetCurrencySelect.value;
  const amount = parseFloat(amountInput.value);

  if (!baseCurrency || !targetCurrency || isNaN(amount)) {
    alert("Please select both currencies and enter a valid amount.");
    return;
  }

  fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${baseCurrency}`)
    .then((response) => response.json())
    .then((data) => {
      const rate = data.conversion_rates[targetCurrency];
      if (rate) {
        const result = amount * rate;
        resultsContainer.innerHTML = `
          <h2>Conversion Results</h2>
          <div id="result">
            <div>
              <label>Source Currency:</label>
              <span id="result-source-currency">${baseCurrency}</span>
            </div>
            <div>
              <label>Target Currency:</label>
              <span id="result-target-currency">${targetCurrency}</span>
            </div>
            <div>
              <label>Units:</label>
              <span id="result-units">${amount}</span>
            </div>
            <div>
              <label>Exchange Rate:</label>
              <span id="exchange-rate">${rate.toFixed(4)}</span>
            </div>
            <div>
              <label>Total Amount:</label>
              <span id="total-amount">${result.toFixed(4)}</span>
            </div>
          </div>
        `;
      } else {
        alert("Conversion rate not available.");
      }
    })
    .catch((error) => {
      console.error("Error fetching conversion rate:", error);
    });
});

//Clearing the selected options and reloading the page
clearButton.addEventListener("click", () => {
  window.location.reload();
});
