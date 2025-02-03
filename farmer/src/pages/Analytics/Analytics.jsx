import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const overviewData = [
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
    <div className="p-6 bg-white">
      <h1 className="text-2xl mb-2">Dashboard for digital agriculture business management</h1>
      <p className="text-sm text-gray-600 mb-6">
        The slide showcases a dashboard providing a visual overview of how agriculture business is performing with a wide range of key performance indicators. It covers aspects like total area, total crop, yield, revenue, weather forecast, task schedules and environment details.
      </p>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="col-span-3">
          <div className="space-y-1">
            <div className="bg-green-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src="/api/placeholder/24/24" alt="area icon" className="opacity-80" />
                  <span>Total Area</span>
                </div>
                <span className="text-xl">15 ha</span>
              </div>
            </div>
            
            <div className="bg-green-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src="/api/placeholder/24/24" alt="crop icon" className="opacity-80" />
                  <span>Total Crop</span>
                </div>
                <span className="text-xl">09 ha</span>
              </div>
            </div>
            
            <div className="bg-green-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src="/api/placeholder/24/24" alt="yield icon" className="opacity-80" />
                  <span>Total Yield</span>
                </div>
                <span className="text-xl">99 ton</span>
              </div>
            </div>
            
            <div className="bg-green-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src="/api/placeholder/24/24" alt="revenue icon" className="opacity-80" />
                  <span>Total Revenue</span>
                </div>
                <span className="text-xl">$ 15,000.00</span>
              </div>
            </div>
            
            <div className="bg-green-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src="/api/placeholder/24/24" alt="hurricane icon" className="opacity-80" />
                  <span>Hurricane</span>
                </div>
                <div className="text-right">
                  <div>W 24mph</div>
                  <div>S 38 mph</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Column */}
        <div className="col-span-5">
          <div className="mb-8">
            <h2 className="text-lg mb-4">Overview</h2>
            <LineChart width={400} height={200} data={overviewData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="Expected" stroke="#4F8A10" dot={true} />
              <Line type="monotone" dataKey="Actual" stroke="#87B56A" dot={true} />
            </LineChart>
          </div>

          <div className="mb-8">
            <h2 className="text-lg mb-2">Yield</h2>
            <div className="flex items-center mb-2">
              <span className="text-sm">Cabbage</span>
            </div>
            <BarChart width={400} height={200} data={yieldData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Expected" fill="#4F8A10" />
              <Bar dataKey="Actual" fill="#87B56A" />
            </BarChart>
          </div>

          <div>
            <h2 className="text-lg mb-4">Weather</h2>
            <div className="space-y-4">
              <WeatherRow
                day="Today"
                date="Aug 08"
                icon="🌧"
                wind="W 3 mph"
                humidity={76}
              />
              <WeatherRow
                day="Sun"
                date="Aug 09"
                icon="☁"
                wind="SW 7 mph"
                humidity={51}
              />
              <WeatherRow
                day="Sat"
                date="Aug 06"
                icon="⚪"
                wind="WNM 12 mph"
                humidity={34}
              />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-4">
          <div className="mb-8">
            <h2 className="text-lg mb-4">Tasks</h2>
            <div className="space-y-2">
              <TaskRow icon="🌱" task="Soil Test" plot="Plot 17" area="4.6 ha" date="13/05/2023" />
              <TaskRow icon="🌿" task="Plant Crop" plot="Plot 22" area="3.6 ha" date="20/05/2023" />
              <TaskRow icon="🌾" task="Harvest" plot="Plot 2" area="2 ha" date="23/05/2023" />
              <TaskRow icon="🌾" task="Harvest" plot="Plot 9" area="4.6 ha" date="25/05/2023" />
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg mb-4">Reminder</h2>
            <div className="space-y-2">
              <ReminderRow crop="Potato" amount="0.55 ton" field="Field 11-DA" date="6/17/2023" status="Due Today" />
              <ReminderRow crop="Tomato" amount="70.24 ton" field="Field 1-VC" date="6/14/2023" status="Due Today" />
              <ReminderRow crop="Brinjal" amount="0.57 ton" field="Field 10-LV" date="6/14/2023" status="Due Tomorrow" />
              <ReminderRow crop="Potato" amount="0.85 ton" field="Field 9-DP" date="6/13/2023" status="Due Next Week" />
              <ReminderRow crop="Potato" amount="0.85 ton" field="Field 18-EA" date="6/11/2023" status="Due Next Week" />
            </div>
          </div>

          <div>
            <h2 className="text-lg mb-4">Soil Details</h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 bg-green-50 p-4">
              <SoilDetailRow label="Soil Texture" value="15 Acres" />
              <SoilDetailRow label="PH Value" value="5.5" />
              <SoilDetailRow label="Organic Matter" value="53 Acres" />
              <SoilDetailRow label="Magnesium" value="3.7" />
              <SoilDetailRow label="Buffer Index" value="9 Acres" />
              <SoilDetailRow label="Iron" value="5.3" />
              <SoilDetailRow label="Nitrogen" value="25" />
              <SoilDetailRow label="Magnesium" value="East" />
              <SoilDetailRow label="Add Text Here" value="5.4" />
              <SoilDetailRow label="Add Text Here" value="0.3" />
              <SoilDetailRow label="Add Text Here" value="49" />
              <SoilDetailRow label="Add Text Here" value="0.3" />
            </div>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-4">
        This graph/chart is linked to excel and changes automatically based on data. Just left click on it and select "edit data".
      </p>
    </div>
  );
};

const WeatherRow = ({ day, date, icon, wind, humidity }) => (
  <div className="flex items-center justify-between text-sm">
    <div className="flex items-center gap-4">
      <div>
        <div>{day}</div>
        <div className="text-gray-500">{date}</div>
      </div>
      <span className="text-xl">{icon}</span>
    </div>
    <div>{wind}</div>
    <div className="flex items-center gap-1">
      <span>💧</span>
      <span>{humidity}</span>
    </div>
  </div>
);

const TaskRow = ({ icon, task, plot, area, date }) => (
  <div className="flex items-center justify-between text-sm">
    <div className="flex items-center gap-3">
      <span className="text-xl">{icon}</span>
      <span>{task}</span>
    </div>
    <span className="bg-green-600 text-white px-3 py-1 rounded">{plot}</span>
    <span>{area}</span>
    <span>{date}</span>
  </div>
);

const ReminderRow = ({ crop, amount, field, date, status }) => (
  <div className="flex items-center justify-between text-sm">
    <span className="bg-green-600 text-white px-3 py-1 rounded">{crop}</span>
    <span>{amount}</span>
    <span>{field}</span>
    <span>{date}</span>
    <span className={`px-2 py-1 rounded text-white ${
      status === 'Due Today' ? 'bg-red-500' :
      status === 'Due Tomorrow' ? 'bg-yellow-500' :
      'bg-blue-500'
    }`}>
      {status}
    </span>
  </div>
);

const SoilDetailRow = ({ label, value }) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-600">{label}</span>
    <span>{value}</span>
  </div>
);

export default Analytics;