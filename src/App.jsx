import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import './App.css'
import { vehicles } from './vehicles'

const metrics = [
  { key: 'price', label: 'Price (₹ lakh)' },
  { key: 'mileage', label: 'Mileage (km/l)' },
  { key: 'power', label: 'Power (bhp)' },
  { key: 'engine', label: 'Engine (cc)' },
]

function VehicleCard({ v }) {
  return (
    <div className="card">
      <h2>{v.name}</h2>
      <p><span>Brand</span> {v.brand}</p>
      <p><span>Type</span> {v.type}</p>
      <p><span>Price</span> ₹{v.price} lakh</p>
      <p><span>Mileage</span> {v.mileage} km/l</p>
      <p><span>Engine</span> {v.engine} cc</p>
      <p><span>Power</span> {v.power} bhp</p>
      <p><span>Seats</span> {v.seats}</p>
    </div>
  )
}

function App() {
  const [firstId, setFirstId] = useState(1)
  const [secondId, setSecondId] = useState(2)

  const first = vehicles.find((v) => v.id === Number(firstId))
  const second = vehicles.find((v) => v.id === Number(secondId))

  return (
    <div className="app">
      <h1>Vehicle Comparison Tool</h1>
      <p className="subtitle">Pick two vehicles and compare their specs side by side.</p>

      <div className="selectors">
        <select value={firstId} onChange={(e) => setFirstId(e.target.value)}>
          {vehicles.map((v) => (
            <option key={v.id} value={v.id}>{v.name}</option>
          ))}
        </select>
        <span className="vs">vs</span>
        <select value={secondId} onChange={(e) => setSecondId(e.target.value)}>
          {vehicles.map((v) => (
            <option key={v.id} value={v.id}>{v.name}</option>
          ))}
        </select>
      </div>

      <div className="cards">
        <VehicleCard v={first} />
        <VehicleCard v={second} />
      </div>

      <div className="charts">
        {metrics.map((m) => (
          <div className="chart" key={m.key}>
            <h3>{m.label}</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={[
                  { name: first.name, value: first[m.key] },
                  { name: second.name, value: second[m.key] },
                ]}
              >
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App