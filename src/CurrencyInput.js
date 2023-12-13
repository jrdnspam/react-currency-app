const CurrencyInput = ({ amount, currency, currencies, onAmountChange, onCurrencyChange, exchangeRates }) => {
  return (
    <div>
      <input value={amount} onChange={(e) => onAmountChange(e.target.value) }/>
      <select value={currency} onChange={(e) => onCurrencyChange(e.target.value)}>
        {currencies.map(currency => (
          <option value={currency}>
            {currency}
          </option>
        ))}
      </select>
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

export default CurrencyInput;