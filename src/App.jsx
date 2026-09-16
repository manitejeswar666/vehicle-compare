import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import './App.css'
import { vehicles } from './vehicles'

const metrics = [
  { key: 'price', label: 'Price (₹ lakh)' },
  { key: 'mileage', label: 'Mileage (km/l)' },
  { key: 'power', label: 'Power (bhp)' },
  { key: 'engine', label: 'Engine (cc)' },
]

function App() {
  const [firstId, setFirstId] = useState(1)
  const [secondId, setSecondId] = useState(2)

  const first = vehicles.find((v) => v.id === Number(firstId))
  const second = vehicles.find((v) => v.id === Number(secondId))

  return (
    <div>
      <h1>Vehicle Comparison Tool</h1>

      <div>
        <select value={firstId} onChange={(e) => setFirstId(e.target.value)}>
          {vehicles.map((v) => (
            <option key={v.id} value={v.id}>{v.name}</option>
          ))}
        </select>

        <span> vs </span>

        <select value={secondId} onChange={(e) => setSecondId(e.target.value)}>
          {vehicles.map((v) => (
            <option key={v.id} value={v.id}>{v.name}</option>
          ))}
        </select>
      </div>

      <div className="cards">
        <div className="card">
          <h2>{first.name}</h2>
          <p>Brand: {first.brand}</p>
          <p>Type: {first.type}</p>
          <p>Price: ₹{first.price} lakh</p>
          <p>Mileage: {first.mileage} km/l</p>
          <p>Engine: {first.engine} cc</p>
          <p>Power: {first.power} bhp</p>
          <p>Seats: {first.seats}</p>
        </div>

        <div className="card">
          <h2>{second.name}</h2>
          <p>Brand: {second.brand}</p>
          <p>Type: {second.type}</p>
          <p>Price: ₹{second.price} lakh</p>
          <p>Mileage: {second.mileage} km/l</p>
          <p>Engine: {second.engine} cc</p>
          <p>Power: {second.power} bhp</p>
          <p>Seats: {second.seats}</p>
        </div>
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
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App