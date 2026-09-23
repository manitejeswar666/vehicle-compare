# Vehicle Comparison Tool

Compare cars, bikes, EV cars and EV bikes side by side, with the better value for each spec highlighted.

**Live:** https://vehicle-compare-two.vercel.app
**API:** https://vehicle-compare-two.vercel.app/api/vehicles?type=evCars

## Built with
- React + Vite
- Recharts for the charts
- Vercel serverless function for the API
- Plain CSS (cyberpunk theme)

## Features
- Four categories, each with its own specs (EVs show range, battery and charging time)
- Winner highlight: the better value for each spec glows green
- Data served from a REST endpoint: `/api/vehicles`, `/api/vehicles?type=bikes`, 404 for unknown types
- Loading and error states
- Responsive layout