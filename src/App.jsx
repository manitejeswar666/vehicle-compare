import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import './App.css'
import { categories } from './vehicles'

function isBetter(field, mine, theirs) {
  if (mine === theirs) return false
  return field.better === 'high' ? mine > theirs : mine < theirs
}

function formatValue(field, value) {
  return `${field.prefix || ''}${value}${field.suffix}`
}

function VehicleCard({ v, other, fields }) {
  return (
    <div className="card">
      <h2>{v.name}</h2>
      <p><span>Brand</span> {v.brand}</p>
      {fields.map((f) => (
        <p key={f.key} className={isBetter(f, v[f.key], other[f.key]) ? 'win' : ''}>
          <span>{f.label}</span> {formatValue(f, v[f.key])}
        </p>
      ))}
    </div>
  )
}

function App() {
  const [categoryKey, setCategoryKey] = useState('cars')
  const [firstId, setFirstId] = useState(1)
  const [secondId, setSecondId] = useState(2)

  const category = categories[categoryKey]
  const items = category.items
  const first = items.find((v) => v.id === Number(firstId))
  const second = items.find((v) => v.id === Number(secondId))

  function changeCategory(key) {
    setCategoryKey(key)
    setFirstId(categories[key].items[0].id)
    setSecondId(categories[key].items[1].id)
  }

  return (
    <div className="app">
      <h1>Vehicle Comparison Tool</h1>
      <p className="subtitle">Compare cars, bikes and EVs side by side.</p>

      <div className="tabs">
        {Object.entries(categories).map(([key, cat]) => (
          <button
            key={key}
            className={key === categoryKey ? 'tab active' : 'tab'}
            onClick={() => changeCategory(key)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="selectors">
        <select value={firstId} onChange={(e) => setFirstId(e.target.value)}>
          {items.map((v) => (
            <option key={v.id} value={v.id}>{v.name}</option>
          ))}
        </select>
        <span className="vs">vs</span>
        <select value={secondId} onChange={(e) => setSecondId(e.target.value)}>
          {items.map((v) => (
            <option key={v.id} value={v.id}>{v.name}</option>
          ))}
        </select>
      </div>

      <p className="legend">Green = the better value for that spec.</p>

      <div className="cards">
        <VehicleCard v={first} other={second} fields={category.fields} />
        <VehicleCard v={second} other={first} fields={category.fields} />
      </div>

      <div className="charts">
        {category.fields.map((f) => (
          <div className="chart" key={f.key}>
            <h3>{f.title}</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={[
                  { name: first.name, value: first[f.key] },
                  { name: second.name, value: second[f.key] },
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