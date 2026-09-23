import { useState, useEffect } from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import './App.css'

function isBetter(field, mine, theirs) {
  if (mine === theirs) return false
  return field.better === 'high' ? mine > theirs : mine < theirs
}

function formatValue(field, value) {
  return `${field.prefix || ''}${value}${field.suffix}`
}

function VehicleCard({ v, other, fields, side }) {
  return (
    <div className={`card ${side}`}>
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
  const [categories, setCategories] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [categoryKey, setCategoryKey] = useState('cars')
  const [firstId, setFirstId] = useState(1)
  const [secondId, setSecondId] = useState(2)

  useEffect(() => {
    fetch('/api/vehicles')
      .then((res) => {
        if (!res.ok) throw new Error(`Server replied ${res.status}`)
        return res.json()
      })
      .then((data) => {
        setCategories(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div className="app"><p className="status">Loading vehicles…</p></div>
  }

  if (error) {
    return <div className="app"><p className="status error">Could not load vehicles: {error}</p></div>
  }

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
        <span className="vs">VS</span>
        <select value={secondId} onChange={(e) => setSecondId(e.target.value)}>
          {items.map((v) => (
            <option key={v.id} value={v.id}>{v.name}</option>
          ))}
        </select>
      </div>

      <p className="legend">Neon green = the better value for that spec.</p>

      <div className="cards">
        <VehicleCard v={first} other={second} fields={category.fields} side="card-a" />
        <VehicleCard v={second} other={first} fields={category.fields} side="card-b" />
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
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#8b93b8' }} stroke="#2a2f4a" />
                <YAxis tick={{ fontSize: 11, fill: '#8b93b8' }} stroke="#2a2f4a" />
                <Tooltip
                  cursor={{ fill: 'rgba(0, 240, 255, 0.08)' }}
                  contentStyle={{ background: '#0a0c1e', border: '1px solid #00f0ff', color: '#e5e7eb' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  <Cell fill="#00f0ff" />
                  <Cell fill="#ff00aa" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App