// pages/index.tsx
import React from "react";
import { Component as MyBarChart } from "@/components/chart/chart-component";

export default function HomePage() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Dashboard</h1>
      <MyBarChart />
    </div>
  );
}
