import React from "react";

interface LayoutDashboardProps {
  children: React.ReactNode;
}

export default function LayoutDashboard({ children }: LayoutDashboardProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Bagian layout, misalnya sidebar, header, dsb. */}
      <div className="p-4">
        {/* Render children di sini */}
        {children}
      </div>
    </div>
  );
}
