"use client"

import { useState } from "react"
import Link from "next/link"
import cx from "classnames"
import {
  PieChart,
  Sliders,
  Music,
  HelpCircle,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: PieChart,
  },
  {
    label: "Advance",
    href: "/advance",
    icon: Sliders,
  },
  {
    label: "Intertain",
    href: "/intertain",
    icon: Music,
  },
  {
    label: "Asisstensi",
    href: "/asistensi",
    icon: HelpCircle,
  },
]

export default function MinimizableSidebar() {
  // Default minimized
  const [isCollapsed, setIsCollapsed] = useState(true)

  return (
    <div
      className={cx(
        "h-screen bg-white border-r shadow-md flex flex-col transition-all z-50 duration-300 ease-in-out overflow-hidden",
        {
          "w-60": !isCollapsed,
          "w-16": isCollapsed,
        }
      )}
    >
      <div className="p-4 flex items-center justify-between">
        {/* Title transitions to hidden when collapsed */}
        <div
          className={cx(
            "text-xl font-bold whitespace-nowrap overflow-hidden transition-all duration-300",
            {
              "opacity-0 w-0": isCollapsed,
              "opacity-100 w-auto mr-2": !isCollapsed,
            }
          )}
        >
          My Sidebar
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-600 hover:text-gray-900"
        >
          {isCollapsed ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />}
        </button>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2 px-2">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className={cx(
                  "flex items-center gap-3 py-2 px-2 hover:bg-gray-100 rounded-md transition-all duration-300 ease-in-out",
                  { "justify-center": isCollapsed }
                )}
              >
                <item.icon className="h-5 w-5" />
                <span
                  className={cx(
                    "whitespace-nowrap overflow-hidden transition-all duration-300",
                    {
                      "opacity-0 w-0": isCollapsed,
                      "opacity-100 w-auto": !isCollapsed,
                    }
                  )}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
