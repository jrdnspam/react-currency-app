const ExchangeRates = ({ currency, currencies, onCurrencyChange, exchangeRates }) => {
  return (
    <div>
       {exchangeRates && (
        <div>
          <h3>Exchange Rates:</h3>
          <select value={currency} onChange={(e) => onCurrencyChange(e.target.value)}>
        {currencies.map(currency => (
          <option value={currency}>
            {currency}
          </option>
        ))}
      </select>
          <ul>
            {currencies.map((currencyOption) => (
              <li key={currencyOption}>
                {currencyOption}: {exchangeRates[currencyOption]}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default ExchangeRates;