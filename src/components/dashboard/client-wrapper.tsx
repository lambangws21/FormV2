// app/ClientWrapper.tsx
"use client"

import React from "react"
import BehindOthersNavbar from "@/components/navbar/navbar"
import MinimizableSidebar from "@/components/sidebar/sidebar"


export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className=" min-h-screen bg-purple-300/40">
   
      <BehindOthersNavbar />
      <div className=" flex min-h-screen">
        <MinimizableSidebar />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
