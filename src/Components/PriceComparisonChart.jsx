import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { format } from "date-fns";

const PriceComparisonChart = ({ priceData }) => {
  if (!priceData || priceData.length === 0) return null;

  const formattedData = priceData.map((entry) => ({
    date: format(new Date(entry.date), "MMM d"),
    price: entry.price,
  }));

  return (
    <div className="mt-10">
      <h3 className="text-xl font-bold mb-4">📈 Price Comparison Chart</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis unit="৳" />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#82ca9d" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceComparisonChart;
