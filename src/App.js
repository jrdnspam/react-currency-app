import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import CurrencyInput from "./CurrencyInput"; // importing CurrencyInput Component
import ExchangeRates from "./ExchangeRates";
import Navbar from "./Navbar";
import Footer from "./Footer";

function App() {
  const [amountOne, setAmountOne] = useState(1);
  const [amountTwo, setAmountTwo] = useState(1.52);
  const [currencyOne, setCurrencyOne] = useState("USD");
  const [currencyTwo, setCurrencyTwo] = useState("AUD");

  const [currencyRates, setCurrencyRates] = useState([]);

  const CURRENCY_API = `https://api.frankfurter.app/latest`;
  useEffect(() => {
    axios
      .get(CURRENCY_API)
      .then((response) => setCurrencyRates(response.data.rates))
      .catch((err) => {
        console.log(err);
        setCurrencyRates(null);
      });
  }, []);

  const formatCurrency = (number) => {
    return number.toFixed(2);
  };

  const handleAmountOneChange = (amountOne) => {
    setAmountTwo(
      formatCurrency(
        (amountOne * currencyRates[currencyTwo]) / currencyRates[currencyOne]
      )
    );
    setAmountOne(amountOne);
  };

  const handleAmountTwoChange = (amountTwo) => {
    setAmountOne(
      formatCurrency(
        (amountTwo * currencyRates[currencyOne]) / currencyRates[currencyTwo]
      )
    );
    setAmountTwo(amountTwo);
  };

  const handleCurrencyOneChange = (currencyOne) => {
    setAmountTwo(
      formatCurrency(
        (amountOne * currencyRates[currencyTwo]) / currencyRates[currencyOne]
      )
    );
    setCurrencyOne(currencyOne);
  };
  const handleCurrencyTwoChange = (currencyTwo) => {
    setAmountOne(
      formatCurrency(
        (amountTwo * currencyRates[currencyOne]) / currencyRates[currencyTwo]
      )
    );
    setCurrencyTwo(currencyTwo);
  };

  return (
    <div>
      <Navbar />
      <div id="main">
        <div class="card">
          <h1>Currency Converter:</h1>
          {currencyRates ? (
            <>
              <CurrencyInput
                amount={amountOne}
                currency={currencyOne}
                currencies={Object.keys(currencyRates)}
                onAmountChange={handleAmountOneChange}
                onCurrencyChange={handleCurrencyOneChange}
              />
              <CurrencyInput
                amount={amountTwo}
                currency={currencyTwo}
                currencies={Object.keys(currencyRates)}
                onAmountChange={handleAmountTwoChange}
                onCurrencyChange={handleCurrencyTwoChange}
              />
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div class="card">
          <ExchangeRates />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
