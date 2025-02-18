"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Search } from "lucide-react"
import { usePathname } from "next/navigation"
import cx from "classnames"

// Fungsi untuk menampilkan nama route yang aktif
function getRouteName(path: string | null): string {
  if (!path || path === "/") return "Home"
  const segment = path.replace(/^\//, "")
  return segment.charAt(0).toUpperCase() + segment.slice(1)
}

// Peta "selanjutnya" untuk path -> ke mana link forward?
// Ketika di home ("/"), link next: "/dashboard" => label "Dashboard"
// Ketika di "/dashboard" -> link next: "/advance" => label "Advance"
// Ketika di "/advance" -> link next: "/intertain" => label "Intertain"
// Ketika di "/intertain" -> link next: "/asisstensi" => label "Asisstensi"
// Ketika di "/asisstensi" -> link next: "/" => label "Home"
const nextRouteMap: Record<string, { label: string; href: string }> = {
  "/": { label: "Dashboard", href: "/dashboard" },
  "/dashboard": { label: "Advance", href: "/advance" },
  "/advance": { label: "Intertain", href: "/intertain" },
  "/intertain": { label: "Asisstensi", href: "/asisstensi" },
  "/asisstensi": { label: "Home", href: "/" },
}

export default function BehindOthersNavbar() {
  const [searchTerm, setSearchTerm] = useState("")
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const mobileSearchRef = useRef<HTMLDivElement | null>(null)

  const pathname = usePathname() // string | null
  const safePath = pathname || "/"

  // Nama route aktif (mis. "Home" jika "/", "Dashboard" jika "/dashboard", dll.)
  const activeMenu = getRouteName(pathname)

  // Cari link "selanjutnya" berdasarkan path
  const nextLink = nextRouteMap[safePath]
    ? nextRouteMap[safePath]
    : { label: "Home", href: "/" }

  // Tutup input search jika klik di luar (hanya untuk mobile)
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (mobileSearchRef.current && !mobileSearchRef.current.contains(e.target as Node)) {
        setMobileSearchOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <header
      className="fixed top-0 left-0 w-full backdrop-blur-sm bg-white/90 border-b shadow-sm z-0 h-14 flex items-center px-4"
    >
      <nav className="flex items-center gap-6 ml-16 mr-auto">
        {/* Link route aktif di kiri */}
        <Link
          href={safePath}
          className="font-semibold transition-colors hover:text-gray-700"
        >
          {activeMenu}
        </Link>

        {/* Link route selanjutnya di kanan */}
        <Link
          href={nextLink.href}
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          {nextLink.label}
        </Link>
      </nav>

      {/* Search di layar lebar (desktop) */}
      <div className="relative hidden md:block">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md py-1 pr-8 pl-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search..."
        />
        <Search className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
      </div>

      {/* Search di layar kecil (mobile/tablet) dengan animasi */}
      <div className="relative md:hidden ml-4" ref={mobileSearchRef}>
        <div className="flex items-center">
          <button
            onClick={() => setMobileSearchOpen((prev) => !prev)}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <Search className="w-5 h-5" />
          </button>

          <div
            className={cx(
              "relative ml-2 overflow-hidden transition-all duration-300 ease-in-out transform origin-left",
              {
                "w-0 scale-x-0": !mobileSearchOpen,
                "w-40 scale-x-100": mobileSearchOpen,
              }
            )}
          >
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus={mobileSearchOpen}
              className="border border-gray-300 rounded-md py-1 pr-8 pl-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-full"
              placeholder="Search..."
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        </div>
      </div>
    </header>
  )
}
