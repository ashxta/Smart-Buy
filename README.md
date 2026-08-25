# SmartBuy AI Dashboard

You are an expert frontend engineer and UI/UX designer.

I am participating in an ACG case-study competition and have selected:

Technology Case Study 1: Smart Buy – AI-based Raw Material Price Prediction – Digital PM

I already have the case-study solution concept. I now need ONLY a polished FRONTEND DEMO that I can run locally in VS Code and show to judges.

IMPORTANT:

- Do NOT build a backend.

- Do NOT build FastAPI.

- Do NOT build Python.

- Do NOT build a database.

- Do NOT require an API.

- Do NOT require external ML services.

- Do NOT make network/API calls.

- Everything must run entirely in the browser.

- Use realistic DEMO/SIMULATED data.

- Clearly label the application as "Prototype / Demonstration Data".

- The purpose is a visual competition prototype/demo, not production ML.

==================================================

PRODUCT

==================================================

Name:

SmartBuy AI

Tagline:

"From Price Prediction to Smarter Procurement"

The product is an AI-powered procurement decision-support dashboard for ACG Films & Foils.

The business problem:

ACG is exposed to raw-material price volatility, particularly:

1. Aluminium

2. PVC Resin

Raw-material prices can be affected by:

- Historical commodity prices

- Crude oil / energy prices

- USD/INR

- Demand

- Freight/logistics

- Global supply conditions

- Market shocks

SmartBuy AI should visually demonstrate how AI forecasting can help procurement teams decide:

BUY NOW

PARTIAL BUY / WAIT

WATCH / DEFER

The system is DECISION SUPPORT only.

It must NOT claim to automatically purchase anything.

==================================================

TECH STACK

==================================================

Use:

- React

- TypeScript

- Vite

- Tailwind CSS

- Recharts

- Lucide React icons

If Tailwind configuration makes the setup unnecessarily complicated, use clean CSS instead.

The project must run with:

npm install

npm run dev

and nothing else.

==================================================

OVERALL UI

==================================================

Make this look like a premium enterprise AI product.

Think:

Bloomberg Terminal + modern SaaS dashboard + enterprise procurement platform.

Do NOT make it look like a college/student project.

Use:

- Dark navy background

- Blue/cyan accent

- White/light typography

- Subtle borders

- Glass/gradient cards

- Clean spacing

- Professional charts

- Rounded cards

- Minimal animations

- Responsive layout

The UI should look good in a screen recording.

Create a professional top navigation:

SmartBuy AI logo/name

Navigation:

Dashboard

Forecast

Market Drivers

Scenario Analysis

Procurement

Model Performance

On the right:

Material selector:

Aluminium ▼

PVC Resin ▼

and a small status:

● Prototype Demo

==================================================

PAGE 1 — EXECUTIVE DASHBOARD

==================================================

This is the most important page.

At the top:

"SmartBuy AI"

"Turn commodity price volatility into procurement action."

Add KPI cards:

1. Current Price

Example:

₹247/kg

2. 6-Month Forecast

Example:

₹268/kg

3. Expected Movement

Example:

+8.5%

4. AI Confidence

Example:

84%

5. Procurement Recommendation

Example:

BUY NOW

Use realistic-looking demo values.

Do NOT say these are actual ACG numbers.

Below the KPIs:

Large "Price Trajectory" chart.

Show:

Historical Price

AI Forecast

Forecast Upper Bound

Forecast Lower Bound

Use 12 months historical data + 6 months forecast.

Make the transition between historical and forecast visually obvious.

Add a vertical/visual marker:

"Forecast Begins"

==================================================

PROCUREMENT RECOMMENDATION CARD

==================================================

Create a large right-side card:

"AI Procurement Recommendation"

Example:

BUY NOW

Expected price movement:

+8.5%

Inventory cover:

18 days

Supplier lead time:

30 days

Confidence:

High

Reason:

"Forecast indicates upward price pressure while current inventory cover is below supplier lead time. Consider locking part of the near-term requirement."

Add:

"Human approval required"

Do NOT make this look like an automatic purchase.

==================================================

PAGE 2 — FORECAST

==================================================

Create a dedicated forecasting screen.

Header:

"AI Price Forecast"

Subtitle:

"6-month forward outlook based on historical and market-driver signals."

Material tabs:

Aluminium

PVC Resin

Large interactive chart.

Show:

Actual

AI Forecast

Upper Confidence Bound

Lower Confidence Bound

Add forecast cards:

Next Month

₹252/kg

+2.1%

3 Months

₹260/kg

+5.3%

6 Months

₹268/kg

+8.5%

Add a section:

"Forecast Summary"

Trend:

Bullish / Stable / Bearish

Confidence:

High

Expected volatility:

Moderate

Add a small explanation:

"Prototype forecast generated from simulated historical and market-driver data."

==================================================

PAGE 3 — MARKET DRIVERS

==================================================

Create:

"Why is the model predicting this?"

Show a feature-importance visualization.

Example:

Historical Price Trend      42%

Crude Oil / Energy          24%

Industrial Demand           15%

USD / INR                   11%

Freight                      8%

Use attractive horizontal bars.

Also create "Market Signals":

Crude Oil

↑ +6.2%

Impact: HIGH

USD/INR

↑ +2.1%

Impact: MEDIUM

Industrial Demand

↑ +3.8%

Impact: HIGH

Freight

→ Stable

Impact: LOW

Create an "AI Explanation" card:

"Aluminium prices are expected to rise primarily because the historical trend remains positive and energy-related pressure is increasing. Currency movement adds additional upward pressure."

Clearly label this as:

"AI-generated prototype explanation"

==================================================

PAGE 4 — SCENARIO ANALYSIS

==================================================

This should be visually impressive.

Title:

"What If the Market Changes?"

Subtitle:

"Simulate external market shocks and observe their potential impact."

Create sliders:

Crude Oil:

-20% to +20%

USD/INR:

-10% to +10%

Demand:

-20% to +20%

Freight:

-20% to +20%

As the slider changes, dynamically update:

Forecast Price

Expected Change

Risk Level

Procurement Recommendation

Example:

Crude Oil +10%

Current forecast:

₹268/kg

Scenario forecast:

₹276/kg

Impact:

+3.0%

Recommendation:

BUY NOW

Add a comparison chart:

Base Forecast

vs

Scenario Forecast

IMPORTANT:

Clearly label:

"Scenario simulation — not a guaranteed market prediction."

==================================================

PAGE 5 — PROCUREMENT

==================================================

Create a procurement decision workspace.

Title:

"Procurement Decision Center"

Inputs:

Material:

Aluminium

Required Quantity:

10,000 kg

Current Inventory:

4,500 kg

Monthly Consumption:

3,000 kg

Supplier Lead Time:

30 days

Current Price:

₹247/kg

Then calculate/display:

Inventory Cover:

45 days

Forecasted Price:

₹268/kg

Potential Price Exposure:

₹210,000

AI Recommendation:

PARTIAL BUY

Suggested Action:

"Lock 60% of near-term requirement and review remaining quantity after the next market update."

Create a visual:

Current Inventory

████████████░░░░

Required Quantity

████████████████████

Add buttons:

"Simulate Purchase"

"View Recommendation"

These buttons should only simulate UI behavior.

Do not connect to a real purchasing system.

==================================================

PAGE 6 — MODEL PERFORMANCE

==================================================

Create:

"Model Performance"

Show a comparison between:

Naïve Baseline

SmartBuy AI

Metrics:

MAPE

MAE

RMSE

Directional Accuracy

Use realistic DEMO numbers such as:

Naïve Baseline

MAPE: 8.4%

MAE: 18.2

RMSE: 23.7

Directional Accuracy: 54%

SmartBuy AI

MAPE: 5.7%

MAE: 12.6

RMSE: 17.4

Directional Accuracy: 71%

BUT VERY IMPORTANT:

These are NOT real ACG results.

Display a visible label:

"Prototype metrics using simulated demonstration data."

Also show:

Actual vs Predicted chart.

Add:

"Walk-Forward Validation"

with a visual timeline:

Train → Predict → Move Forward → Retrain → Predict

Explain briefly:

"The prototype uses time-aware validation to mimic real-world forecasting."

==================================================

INTERACTIONS

==================================================

Everything should feel functional.

Implement:

1. Material selector

   Aluminium ↔ PVC Resin

2. Navigation between pages

3. Scenario sliders dynamically change results

4. Procurement inputs dynamically update:

   - inventory cover

   - exposure

   - recommendation

5. Forecast period buttons:

   1M

   3M

   6M

6. Hover tooltips on charts

7. Recommendation dynamically changes based on simulated conditions

8. Smooth transitions

9. Loading animation when changing material

10. Toast notification when clicking simulated actions

==================================================

DEMO DATA

==================================================

Create realistic-looking static/generated data directly in the frontend.

Do NOT fetch data from the internet.

Generate monthly historical data for approximately 18–24 months.

Then generate 6 future forecast points.

Create separate datasets for:

Aluminium

PVC Resin

Use realistic fluctuations rather than perfectly straight lines.

The data should look believable for a demo but MUST be clearly labelled:

"Prototype / Demonstration Data"

==================================================

DASHBOARD STORY

==================================================

The entire product should tell this story:

MARKET DATA

↓

AI FORECAST

↓

EXPLAINABILITY

↓

SCENARIO ANALYSIS

↓

PROCUREMENT RECOMMENDATION

↓

BUSINESS ACTION

This should be visually obvious.

==================================================

DESIGN DETAILS

==================================================

Add a small sidebar or top status indicator:

Data Status

● Demo Data

Model Status

● SmartBuy AI Online

Last Updated

25 Aug 2026

Forecast Horizon

6 Months

Add subtle badges:

HIGH CONFIDENCE

MODERATE RISK

PROTOTYPE

Use icons from Lucide.

Use tooltips where useful.

Avoid excessive text.

The judges should understand the product within 10 seconds.

==================================================

LANDING / DASHBOARD HERO

==================================================

The dashboard hero should say:

"Turn Price Volatility

Into Procurement Advantage."

Subtitle:

"SmartBuy AI forecasts raw-material prices and converts market signals into explainable procurement recommendations."

Then show:

[ BUY NOW ]

with:

Aluminium

+8.5% expected increase

High confidence

==================================================

IMPORTANT COMPETITION REQUIREMENTS

==================================================

The prototype will be used for:

1. PPT screenshots

2. 1–3 minute competition video

3. Live judge demonstration

Therefore prioritize:

- Visual quality

- Clear storytelling

- Smooth interactions

- Realistic charts

- Professional enterprise appearance

- Fast loading

- No broken pages

- No backend dependencies

==================================================

CODE REQUIREMENTS

==================================================

Create the COMPLETE project.

Do not just provide snippets.

Create:

package.json

vite.config.ts

tsconfig.json

index.html

src/main.tsx

src/App.tsx

src/index.css

and any reusable components needed.

Keep the architecture clean:

src/

  components/

  data/

  pages/

  types/

  utils/

Use reusable components for:

KPI cards

Charts

Recommendation cards

Metric cards

Sliders

Tables

Badges

Navigation

==================================================

FINAL REQUIREMENT

==================================================

After building:

1. Run the project/build mentally or using available tools.

2. Fix TypeScript errors.

3. Fix JSX errors.

4. Make sure all navigation works.

5. Make sure charts render.

6. Make sure sliders work.

7. Make sure Aluminium/PVC switching works.

8. Make sure procurement calculations update.

9. Make sure the project runs with:

npm install

npm run dev

10. Do NOT introduce a backend.

The final result must be a polished, frontend-only SmartBuy AI competition prototype that I can open in VS Code and immediately run.

DO NOT give me a long explanation first.

BUILD THE FRONTEND.
i will publish on github and then deploy on vercel

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d3bb8618-411e-4c19-9b0a-3bd158d96fe6).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
