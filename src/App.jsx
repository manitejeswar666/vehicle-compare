import './App.css'
import { vehicles } from './vehicles'

function App() {
  return (
    <div>
      <h1>Vehicle Comparison Tool</h1>
      <ul>
        {vehicles.map((v) => (
          <li key={v.id}>{v.name} — ₹{v.price} lakh</li>
        ))}
      </ul>
    </div>
  )
}

export default App