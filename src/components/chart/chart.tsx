// pages/index.tsx
import React from "react";
import { Component as MyBarChart } from "@/components/chart/chart-component";

export default function HomePage() {
  return (
    <div className="p-4">
      <MyBarChart />
    </div>
  );
}
