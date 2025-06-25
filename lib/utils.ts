import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  isToday,
  isSameMonth,
} from "date-fns"
import type { Event, CalendarDate } from "./types"

export function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export function generateCalendarDates(currentDate: Date, events: Event[]): CalendarDate[] {
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const calendarStart = startOfWeek(monthStart)
  const calendarEnd = endOfWeek(monthEnd)

  const dates = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  })

  return dates.map((date) => ({
    date,
    isCurrentMonth: isSameMonth(date, currentDate),
    isToday: isToday(date),
    events: events.filter((event) => isSameDay(new Date(event.date), date)),
  }))
}

export function formatTime(time: string): string {
  const [hours, minutes] = time.split(":")
  const hour = Number.parseInt(hours)
  const ampm = hour >= 12 ? "PM" : "AM"
  const displayHour = hour % 12 || 12
  return `${displayHour}:${minutes} ${ampm}`
}

export function getEventColorClasses(color: string) {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-100 text-blue-800 border-blue-200",
    green: "bg-green-100 text-green-800 border-green-200",
    purple: "bg-purple-100 text-purple-800 border-purple-200",
    orange: "bg-orange-100 text-orange-800 border-orange-200",
    red: "bg-red-100 text-red-800 border-red-200",
    indigo: "bg-indigo-100 text-indigo-800 border-indigo-200",
    teal: "bg-teal-100 text-teal-800 border-teal-200",
    pink: "bg-pink-100 text-pink-800 border-pink-200",
    cyan: "bg-cyan-100 text-cyan-800 border-cyan-200",
    yellow: "bg-yellow-100 text-yellow-800 border-yellow-200",
  }
  return colorMap[color] || "bg-gray-100 text-gray-800 border-gray-200"
}

export function checkEventConflicts(events: Event[]): boolean {
  if (events.length <= 1) return false

  const sortedEvents = events.sort((a, b) => a.time.localeCompare(b.time))

  for (let i = 0; i < sortedEvents.length - 1; i++) {
    const currentEvent = sortedEvents[i]
    const nextEvent = sortedEvents[i + 1]

    const currentEnd = addMinutesToTime(currentEvent.time, currentEvent.duration)
    if (currentEnd > nextEvent.time) {
      return true
    }
  }

  return false
}

function addMinutesToTime(time: string, minutes: number): string {
  const [hours, mins] = time.split(":").map(Number)
  const totalMinutes = hours * 60 + mins + minutes
  const newHours = Math.floor(totalMinutes / 60)
  const newMins = totalMinutes % 60
  return `${newHours.toString().padStart(2, "0")}:${newMins.toString().padStart(2, "0")}`
}
