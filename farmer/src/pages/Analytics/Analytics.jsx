import React from 'react';
import './Analytics.css'; // Import the external CSS
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const salesData = [
  { name: 'Jan', Expected: 10, Actual: 12 },
  { name: 'Feb', Expected: 15, Actual: 18 },
  { name: 'Mar', Expected: 20, Actual: 22 },
  { name: 'Apr', Expected: 12, Actual: 15 },
  { name: 'May', Expected: 15, Actual: 18 },
  { name: 'Jun', Expected: 25, Actual: 28 },
  { name: 'Jul', Expected: 30, Actual: 28 },
  { name: 'Aug', Expected: 32, Actual: 30 },
  { name: 'Sep', Expected: 28, Actual: 25 },
  { name: 'Oct', Expected: 20, Actual: 18 },
  { name: 'Nov', Expected: 15, Actual: 14 },
  { name: 'Dec', Expected: 12, Actual: 13 }
];

const yieldData = [
  { name: 'Yield 1', Expected: 65, Actual: 60 },
  { name: 'Yield 2', Expected: 70, Actual: 65 },
  { name: 'Yield 3', Expected: 45, Actual: 30 },
  { name: 'Yield 4', Expected: 20, Actual: 15 }
];

const Analytics = () => {
  
  return (
    <div className="analytics-container">
      <h1 className="title">Agriculture Business Dashboard</h1>
      <p className="description">
        A dashboard providing a visual overview of agriculture performance, covering key metrics like crop yield, revenue, weather forecasts, and task schedules.
      </p>

      <div className="grid-layout">
        <div className="left-column">
          <StatCard title="Total Crop" value="09 ha" />
          <StatCard title="Total Yield" value="99 ton" />
          <StatCard title="Total Revenue" value="₹15,000.00" />
          <StatCard title="Hurricane" value="W 24mph | S 38mph" />
          <TaskSection title="Weather">
            <p>Today: Aug 08</p>
            <p>Wind: W 3 mph</p>
            <p>Temperature: 76°F</p>
          </TaskSection>
        </div>

        <div className="middle-column">
          <ChartCard title="Sales Data">
            <LineChart width={400} height={200} data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="Expected" stroke="#4F8A10" dot={true} />
              <Line type="monotone" dataKey="Actual" stroke="#87B56A" dot={true} />
            </LineChart>
          </ChartCard>

          <ChartCard title="Yield">
            <BarChart width={400} height={200} data={yieldData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Expected" fill="#4F8A10" />
              <Bar dataKey="Actual" fill="#87B56A" />
            </BarChart>
          </ChartCard>
        </div>

        <div className="right-column">
          <TaskSection title="Tasks">
            <TaskRow icon="🌱" task="Soil Test" date="13/05/2023" />
            <TaskRow icon="🌿" task="Plant Crop" date="20/05/2023" />
            <TaskRow icon="🌾" task="Harvest" date="23/05/2023" />
          </TaskSection>

          <TaskSection title="Reminders">
            <ReminderRow crop="Potato" amount="0.55 ton" field="Field 11-DA" date="6/17/2023" status="Due Today" />
            <ReminderRow crop="Tomato" amount="70.24 ton" field="Field 1-VC" date="6/14/2023" status="Due Tomorrow" />
          </TaskSection>

          <TaskSection title="Soil Details">
            <p>Soil Texture: 15 Acres</p>
            <p>Organic Matter: 53 Acres</p>
            <p>Buffer Index: 9 Acres</p>
            <p>Nitrogen: 54</p>
            <p>Iron: 3.7</p>
            <p>Magnesium: 25</p>
          </TaskSection>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="stat-card">
    <p>{title}</p>
    <h2>{value}</h2>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="chart-card">
    <h2>{title}</h2>
    {children}
  </div>
);

const TaskSection = ({ title, children }) => (
  <div className="task-section">
    <h2>{title}</h2>
    {children}
  </div>
);

const TaskRow = ({ icon, task, date }) => (
  <div className="task-row">
    <span>{icon}</span>
    <p>{task}</p>
    <p>{date}</p>
  </div>
);

const ReminderRow = ({ crop, amount, field, date, status }) => (
  <div className="reminder-row">
    <span className="badge">{crop}</span>
    <p>{amount}</p>
    <p>{field}</p>
    <p>{date}</p>
    <span className={`status-badge ${status.replace(' ', '-').toLowerCase()}`}>{status}</span>
  </div>
);

export default Analytics;