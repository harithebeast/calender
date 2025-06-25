"use client"

import type { Event } from "@/lib/types"
import { formatTime, getEventColorClasses } from "@/lib/utils"

interface EventCardProps {
  event: Event
  onClick: () => void
  isConflicted?: boolean
}

export function EventCard({ event, onClick, isConflicted }: EventCardProps) {
  return (
    <div
      className={`
        px-2 py-1 rounded-md text-xs font-medium cursor-pointer
        border transition-all duration-200 hover:shadow-sm
        ${getEventColorClasses(event.color)}
        ${isConflicted ? "ring-2 ring-red-300" : ""}
      `}
      onClick={onClick}
    >
      <div className="truncate">{event.title}</div>
      <div className="text-xs opacity-75">{formatTime(event.time)}</div>
    </div>
  )
}
