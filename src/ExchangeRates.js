import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExchangeRateList = () => {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [exchangeRates, setExchangeRates] = useState(null);
  const [currencies, setCurrencies] = useState([]);

  const fetchCurrencies = async () => {
    try {
      const response = await axios.get('https://api.frankfurter.app/currencies');
      setCurrencies(Object.keys(response.data));
    } catch (error) {
      console.error('Error fetching currencies:', error);
      setCurrencies([]);
    }
  };

  const fetchExchangeRates = async () => {
    try {
      const response = await axios.get(`https://api.frankfurter.app/latest?from=${baseCurrency}`);
      setExchangeRates(response.data.rates);
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      setExchangeRates(null);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  useEffect(() => {
    fetchExchangeRates();
  }, [baseCurrency]);

  const handleBaseCurrencyChange = (newBaseCurrency) => {
    setBaseCurrency(newBaseCurrency);
  };

  return (
    <div>
      <h2>Exchange Rates for {baseCurrency}</h2>
      <label>Select Base Currency:</label>
      <select value={baseCurrency} onChange={(e) => handleBaseCurrencyChange(e.target.value)}>
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>

      {exchangeRates ? (
        <ul>
          {Object.entries(exchangeRates).map(([currency, rate]) => (
            <li key={currency}>
              {currency}: {rate}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading exchange rates...</p>
      )}
    </div>
  );
};

export default ExchangeRateList;
