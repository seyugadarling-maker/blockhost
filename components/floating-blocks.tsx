"use client"

import { useEffect, useState } from "react"

export function FloatingBlocks() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const blocks = [
    { type: "grass", color: "from-green-600 to-green-800", delay: 0, x: "10%", y: "20%" },
    { type: "stone", color: "from-gray-500 to-gray-700", delay: 1, x: "85%", y: "30%" },
    { type: "diamond", color: "from-cyan-400 to-cyan-600", delay: 2, x: "15%", y: "70%" },
    { type: "emerald", color: "from-emerald-400 to-emerald-600", delay: 3, x: "80%", y: "65%" },
    { type: "obsidian", color: "from-purple-900 to-black", delay: 4, x: "50%", y: "15%" },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none">
      {blocks.map((block, i) => (
        <div
          key={i}
          className={`absolute transition-all duration-1000 ${mounted ? "opacity-30" : "opacity-0"}`}
          style={{
            left: block.x,
            top: block.y,
            animationDelay: `${block.delay}s`,
          }}
        >
          <div
            className={`h-24 w-24 rounded-lg bg-gradient-to-br ${block.color} shadow-2xl animate-float`}
            style={{
              animationDelay: `${block.delay}s`,
              transform: "perspective(500px) rotateX(15deg) rotateY(-15deg)",
            }}
          />
        </div>
      ))}
    </div>
  )
}
