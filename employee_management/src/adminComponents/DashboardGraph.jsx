import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Sample data for monthly events (replace with real values later)
const data = [
  { month: "Jan", current: 12, previous: 10 },
  { month: "Feb", current: 15, previous: 14 },
  { month: "Mar", current: 8, previous: 9 },
  { month: "Apr", current: 20, previous: 18 },
  { month: "May", current: 17, previous: 21 },
  { month: "Jun", current: 22, previous: 19 },
  { month: "Jul", current: 13, previous: 11 },
  { month: "Aug", current: 19, previous: 20 },
  { month: "Sep", current: 16, previous: 14 },
  { month: "Oct", current: 23, previous: 22 },
  { month: "Nov", current: 25, previous: 24 },
  { month: "Dec", current: 18, previous: 20 },
];

function DashboardGraph() {
  return (
    <div className="w-full h-full bg-white p-4  shadow">
      <h2 className="text-xl font-semibold mb-4">Monthly Events Comparison</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="previous"
            stroke="#8884d8"
            strokeWidth={2}
            name="Previous Year"
          />
          <Line
            type="monotone"
            dataKey="current"
            stroke="#82ca9d"
            strokeWidth={2}
            name="Current Year"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DashboardGraph;
