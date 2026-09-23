import { categories } from '../src/vehicles.js'

export default function handler(req, res) {
  const { type } = req.query

  if (!type) {
    return res.status(200).json(categories)
  }

  if (!categories[type]) {
    return res.status(404).json({ error: `Unknown type: ${type}` })
  }

  return res.status(200).json(categories[type])
}