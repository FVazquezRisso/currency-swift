import currencyCodes from '../../data/currencyCodes'

export default function Select({ setState }) {
  const onlyCodes = Object.keys(currencyCodes)

  const handleChange = (event) => {
    setState(event.target.value)
  }

  return (
    <select onChange={handleChange} defaultValue='USD'>
      {
        onlyCodes.map((code) => {
          return <option key={code} value={code}>{code} - {currencyCodes[code]}</option>
        })
      }
    </select>
  )
}