import { useState } from 'react'
import './App.css'
import { vehicles } from './vehicles'

function App() {
  const [leftId, setLeftId] = useState(1)
  const [rightId, setRightId] = useState(2)

  const left = vehicles.find((v) => v.id === leftId)
  const right = vehicles.find((v) => v.id === rightId)

  return (
    <div className="app">
      <h1>Vehicle Comparison Tool</h1>

      <div className="pickers">
        <select value={leftId} onChange={(e) => setLeftId(Number(e.target.value))}>
          {vehicles.map((v) => (
            <option key={v.id} value={v.id}>{v.name}</option>
          ))}
        </select>

        <span>vs</span>

        <select value={rightId} onChange={(e) => setRightId(Number(e.target.value))}>
          {vehicles.map((v) => (
            <option key={v.id} value={v.id}>{v.name}</option>
          ))}
        </select>
      </div>

      <div className="cards">
        <div className="card">
          <h2>{left.name}</h2>
          <p>Type: {left.type}</p>
          <p>Price: ₹{left.price} lakh</p>
          <p>Mileage: {left.mileage} km/l</p>
          <p>Engine: {left.engine} cc</p>
          <p>Power: {left.power} bhp</p>
          <p>Seats: {left.seats}</p>
        </div>

        <div className="card">
          <h2>{right.name}</h2>
          <p>Type: {right.type}</p>
          <p>Price: ₹{right.price} lakh</p>
          <p>Mileage: {right.mileage} km/l</p>
          <p>Engine: {right.engine} cc</p>
          <p>Power: {right.power} bhp</p>
          <p>Seats: {right.seats}</p>
        </div>
      </div>
    </div>
  )
}

export default App