import { useState, useEffect } from "react";
import Select from "./components/Select";
import { api } from "./services/apiConfig";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import "./Global.css";

import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons

export default function App() {
  const [fromCode, setFromCode] = useState({
    name: "United States Dollar",
    code: "USD",
  });
  const [toCode, setToCode] = useState({
    name: "United States Dollar",
    code: "USD",
  });
  const [rates, setRates] = useState({});
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(1);
  const windowWidth = window.innerWidth;

  const getData = async () => {
    try {
      const response = await api.get();

      if (response.status === 200) {
        setRates(response.data.rates);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setAmount(event.value);
  };

  const handleConversion = (fromCode, toCode) => {
    const fromCurrency = rates[fromCode.code];
    const toCurrency = rates[toCode.code];

    const conversionResult = (toCurrency / fromCurrency) * amount;

    let decimals = 2;

    if (conversionResult < 0.0001) {
      decimals = 6;
    } else if (conversionResult < 0.001) {
      decimals = 5;
    } else if (conversionResult < 0.01) {
      decimals = 4;
    } else if (conversionResult < 0.1) {
      decimals = 3;
    }
    setResult(Math.trunc(conversionResult * 10 ** decimals) / 10 ** decimals);
  };

  const handleClickButtonChange = () => {
    setFromCode(toCode);
    setToCode(fromCode);
    handleConversion(toCode, fromCode);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    handleConversion(fromCode, toCode)
  }, [fromCode, toCode])

  return (
    <div className="container">
      <div className="input-container">
        <div>
          <Select setState={setFromCode} selected={fromCode} name="from" />
          <InputNumber
            value={amount}
            onValueChange={handleChange}
            mode="currency"
            currency={fromCode.code}
            locale="en-US"
          />
        </div>
        <Button
          icon={`pi ${
            windowWidth > 768 ? "pi-arrow-right-arrow-left" : "pi-sort-alt"
          }`}
          rounded
          text
          raised
          severity="info"
          onClick={handleClickButtonChange}
        />
        <div>
          <Select setState={setToCode} selected={toCode} name="to" />
          <InputNumber
            value={result || 1}
            mode="currency"
            currency={toCode.code}
            locale="en-US"
            disabled
          />
        </div>
      </div>
      <Button
        label="Convert"
        raised
        severity="info"
        onClick={() => handleConversion(fromCode, toCode)}
      />
    </div>
  );
}
