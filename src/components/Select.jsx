import currencyCodes from '../data/currencyCodes'
import { Dropdown } from "primereact/dropdown";
import '../Global.css'

export default function Select({ setState, selected, name }) {
  const onlyCodes = Object.keys(currencyCodes)

  const options = onlyCodes.map((code) => {
    return { name: currencyCodes[code], code }
  })

  const handleChange = (event) => {
    setState(event.value)
  }

  return (
    <span className="p-float-label">
      <Dropdown
        inputId={name}
        value={selected}
        onChange={handleChange}
        options={options}
        optionLabel="name"
        className='select'
      />
      <label htmlFor={name}>{name}</label>
    </span>
  );
}