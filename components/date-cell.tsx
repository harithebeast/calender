"use client"

import type React from "react"

import type { CalendarDate, Event } from "@/lib/types"
import { EventCard } from "./event-card"
import { EventTooltip } from "./event-tooltip"
import { checkEventConflicts, cn } from "@/lib/utils"
import { format } from "date-fns"

interface DateCellProps {
  calendarDate: CalendarDate
  onEventClick: (event: Event) => void
  onDateClick: (date: Date) => void
}

export function DateCell({ calendarDate, onEventClick, onDateClick }: DateCellProps) {
  const { date, isCurrentMonth, isToday, events } = calendarDate
  const hasConflicts = checkEventConflicts(events)
  const displayedEvents = events.slice(0, 3)
  const hiddenEventsCount = events.length - displayedEvents.length

  const handleDateClick = (e: React.MouseEvent) => {
    // Only trigger date click if clicking on empty space (not on events)
    if (e.target === e.currentTarget || (e.target as HTMLElement).closest(".date-number")) {
      onDateClick(date)
    }
  }

  return (
    <EventTooltip events={events}>
      <div
        className={cn(
          "min-h-24 p-2 border-r border-b border-gray-100 bg-white hover:bg-gray-50 transition-colors duration-200 cursor-pointer",
          !isCurrentMonth && "bg-gray-50 text-gray-400",
          isToday && "bg-blue-50",
        )}
        onClick={handleDateClick}
      >
        <div className="flex justify-between items-start mb-1">
          <span
            className={cn(
              "text-sm font-medium date-number",
              isToday && "bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs",
              !isCurrentMonth && "text-gray-400",
            )}
          >
            {format(date, "d")}
          </span>
          {hasConflicts && <div className="w-2 h-2 bg-red-400 rounded-full" title="Schedule conflicts"></div>}
        </div>

        <div className="space-y-1">
          {displayedEvents.map((event) => (
            <EventCard key={event.id} event={event} onClick={() => onEventClick(event)} isConflicted={hasConflicts} />
          ))}
          {hiddenEventsCount > 0 && <div className="text-xs text-gray-500 px-2 py-1">+{hiddenEventsCount} more</div>}
        </div>
      </div>
    </EventTooltip>
  )
}
