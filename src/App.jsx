import { useState, useEffect } from "react";
import Select from "./components/Select/Select";
import { api } from './services/apiConfig';

export default function App() {
  const [fromCode, setFromCode] = useState("USD");
  const [toCode, setToCode] = useState("USD");
  const [rates, setRates] = useState({})
  const [amount, setAmount] = useState(1)
  const [result, setResult] = useState()

  const getData = async () => {
    try {
      const response = await api.get()

      if (response.status === 200) {
        setRates(response.data.rates)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = (event) => {
    setAmount(event.target.value)
  }
  
  const handleClick = () => {
    const fromCurrency = rates[fromCode]
    const toCurrency = rates[toCode]

    setResult((((toCurrency / fromCurrency) * amount).toFixed(2)))
  }

  useEffect(() => {
    getData()
  }, []);
  return (
    <div>
      <input type="number" name='ammount' onChange={handleChange} value={amount}/>
      <Select setState={setFromCode} />
      <Select setState={setToCode} />
      <button onClick={handleClick}></button>
      {result && <p>{result}</p>}
    </div>
  );
}
