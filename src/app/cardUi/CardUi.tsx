// "use client"

// import React from "react"
// import Card from "@/components/dashboard/cardui"


// export default function DashboardPage() {
//   return (
//     <div className="p-6 space-y-6">
//       {/* Header */}
//       <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

//       {/* Baris 1: Next Game & Games Statistic */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <Card className="p-4">
//           <div className="flex items-center justify-between">
//             <h2 className="text-lg font-semibold">Next game</h2>
//             <a href="#" className="text-sm text-blue-500 hover:underline">
//               View calendar
//             </a>
//           </div>
//           <div className="mt-4 flex items-center gap-4">
//             <div className="flex flex-col items-center text-center">
//               <img
//                 src="/juventus.png"
//                 alt="Juventus"
//                 className="w-12 h-12 object-contain"
//               />
//               <p className="text-sm">Juventus</p>
//             </div>
//             <span className="text-sm text-gray-500">VS</span>
//             <div className="flex flex-col items-center text-center">
//               <img
//                 src="/sassuolo.png"
//                 alt="Sassuolo"
//                 className="w-12 h-12 object-contain"
//               />
//               <p className="text-sm">Sassuolo</p>
//             </div>
//           </div>
//           <p className="mt-2 text-gray-500 text-sm">Serie A | 21:00, 11 Nov 2020</p>
//         </Card>

//         <Card className="p-4">
//           <div className="flex items-center justify-between">
//             <h2 className="text-lg font-semibold">Games statistic</h2>
//             <a href="#" className="text-sm text-blue-500 hover:underline">
//               View all statistic
//             </a>
//           </div>
//           <div className="mt-4">
//             {/* Bar/statistic sederhana, contoh placeholder */}
//             <div className="bg-gray-200 rounded-full h-3 w-full">
//               <div className="bg-blue-500 h-3 rounded-full" style={{ width: "70%" }} />
//             </div>
//             <div className="flex justify-between text-sm mt-2">
//               <span>PL 8</span>
//               <span>Victories 6</span>
//               <span>Draws 1</span>
//               <span>Lost 1</span>
//             </div>
//           </div>
//         </Card>
//       </div>

//       {/* Baris 2: Standings & beberapa info kecil (possession, price, dsb.) */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <Card className="p-4">
//           <div className="flex items-center justify-between mb-2">
//             <h2 className="text-lg font-semibold">Standings</h2>
//             <a href="#" className="text-sm text-blue-500 hover:underline">
//               View all
//             </a>
//           </div>
//           <div className="space-y-1 text-sm">
//             <div className="flex justify-between">
//               <span>#1 Juventus</span>
//               <span>19 pts</span>
//             </div>
//             <div className="flex justify-between">
//               <span>#2 Atalanta</span>
//               <span>16 pts</span>
//             </div>
//             <div className="flex justify-between">
//               <span>#3 Inter</span>
//               <span>15 pts</span>
//             </div>
//             <div className="flex justify-between">
//               <span>#4 Napoli</span>
//               <span>13 pts</span>
//             </div>
//             <div className="flex justify-between">
//               <span>#5 Milan</span>
//               <span>13 pts</span>
//             </div>
//             <div className="flex justify-between">
//               <span>#6 Roma</span>
//               <span>12 pts</span>
//             </div>
//           </div>
//         </Card>

//         <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
//           <Card className="p-4 flex flex-col items-center">
//             <p className="text-sm text-gray-500">Possession</p>
//             <p className="text-xl font-semibold">65%</p>
//           </Card>
//           <Card className="p-4 flex flex-col items-center">
//             <p className="text-sm text-gray-500">Overall Price</p>
//             <p className="text-xl font-semibold">$690.2m</p>
//           </Card>
//           <Card className="p-4 flex flex-col items-center">
//             <p className="text-sm text-gray-500">Transfer Budget</p>
//             <p className="text-xl font-semibold">$240.6m</p>
//           </Card>
//           <Card className="p-4 flex flex-col items-center">
//             <p className="text-sm text-gray-500">Average Score</p>
//             <p className="text-xl font-semibold">7.2</p>
//           </Card>
//         </div>
//       </div>

//       {/* Baris 3: CTA card */}
//       <Card className="p-4 flex items-center justify-between">
//         <div>
//           <h2 className="text-lg font-semibold mb-1">Don't forget</h2>
//           <p className="text-sm text-gray-500">Setup training for next week</p>
//           <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">
//             Go to training center
//           </button>
//         </div>
//         {/* Contoh elemen dekorasi (gambar / ilustrasi) */}
//         <img
//           src="/training.png"
//           alt="Training illustration"
//           className="w-32 h-32 object-contain"
//         />
//       </Card>
//     </div>
//   )
// }
