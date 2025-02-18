"use client"

import SideBar from "@/components/sidebar/sidebar"
import Navbar from "@/components/navbar/navbar"
import React from "react"
import Dashboard from "@/components/dashboard/dashboard"

export default function Page() {
  return (
    <div className="flex flex-col h-screen">
      {/* Navbar di atas */}
      <Navbar />

      {/* Bagian utama: Sidebar + konten */}
      <div className="flex flex-1">
        <SideBar />
        <main className="flex-1 overflow-auto p-4 mt-10">
          {/* Konten halaman Anda di sini */}
          <h1 className="text-xl font-semibold">Halaman Utama</h1>
          <p className="mt-2 text-gray-700">Selamat datang di halaman utama.</p>
          <Dashboard/>
        </main>
      </div>
    </div>
  )
}
