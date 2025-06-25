"use client"

import type React from "react"

import type { Event } from "@/lib/types"
import { formatTime } from "@/lib/utils"
import { useState } from "react"

interface EventTooltipProps {
  events: Event[]
  children: React.ReactNode
}

export function EventTooltip({ events, children }: EventTooltipProps) {
  const [isVisible, setIsVisible] = useState(false)

  if (events.length === 0) {
    return <>{children}</>
  }

  return (
    <div className="relative" onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
      {children}
      {isVisible && (
        <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2">
          <div className="bg-white rounded-lg shadow-lg border p-3 min-w-48 max-w-64">
            <div className="space-y-2">
              {events.map((event) => (
                <div key={event.id} className="text-sm">
                  <div className="font-medium text-gray-900">{event.title}</div>
                  <div className="text-gray-600">
                    {formatTime(event.time)} • {event.duration}min
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2">
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
