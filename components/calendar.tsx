"use client"

import { useState, useEffect, useRef } from "react"
import { format, addMonths, subMonths } from "date-fns"
import { ChevronLeft, ChevronRight, CalendarIcon, Plus } from "lucide-react"
import type { Event, CalendarDate, CreateEventData } from "@/lib/types"
import { generateCalendarDates } from "@/lib/utils"
import { DateCell } from "./date-cell"
import { EventModal } from "./event-modal"
import { CreateEventModal } from "./create-event-modal"
import eventsData from "@/data/events.json"

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export function Calendar() {
  const [currentDate, setCurrentDate] = useState<Date | null>(null)
  const [events, setEvents] = useState<Event[]>([])
  const [calendarDates, setCalendarDates] = useState<CalendarDate[]>([])
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isEventModalOpen, setIsEventModalOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [selectedDateForCreation, setSelectedDateForCreation] = useState<Date | undefined>()
  const idCounter = useRef(0)

  // Initialize currentDate on client side only
  useEffect(() => {
    setCurrentDate(new Date())
  }, [])

  useEffect(() => {
    setEvents(eventsData as Event[])
  }, [])

  useEffect(() => {
    if (currentDate) {
      setCalendarDates(generateCalendarDates(currentDate, events))
    }
  }, [currentDate, events])

  const goToPreviousMonth = () => {
    if (currentDate) {
      setCurrentDate(subMonths(currentDate, 1))
    }
  }

  const goToNextMonth = () => {
    if (currentDate) {
      setCurrentDate(addMonths(currentDate, 1))
    }
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event)
    setIsEventModalOpen(true)
  }

  const handleDateClick = (date: Date) => {
    setSelectedDateForCreation(date)
    setIsCreateModalOpen(true)
  }

  const handleCreateEvent = (eventData: CreateEventData) => {
    const newEvent: Event = {
      ...eventData,
      id: `event-${++idCounter.current}`, // Stable ID generation
    }
    setEvents((prev) => [...prev, newEvent])
  }

  const closeEventModal = () => {
    setIsEventModalOpen(false)
    setSelectedEvent(null)
  }

  const closeCreateModal = () => {
    setIsCreateModalOpen(false)
    setSelectedDateForCreation(undefined)
  }

  const openCreateModal = () => {
    setSelectedDateForCreation(undefined)
    setIsCreateModalOpen(true)
  }

  // Don't render until currentDate is initialized on client
  if (!currentDate) {
    return (
      <div className="max-w-7xl mx-auto p-4 bg-white">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <CalendarIcon className="text-blue-600" size={28} />
          <h1 className="text-2xl font-bold text-gray-900">{format(currentDate, "MMMM yyyy")}</h1>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={openCreateModal}
            className="px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-1"
          >
            <Plus size={16} />
            <span>New Event</span>
          </button>
          <button
            onClick={goToToday}
            className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Today
          </button>
          <div className="flex items-center border border-gray-300 rounded-md">
            <button onClick={goToPreviousMonth} className="p-2 hover:bg-gray-50 transition-colors">
              <ChevronLeft size={16} />
            </button>
            <button onClick={goToNextMonth} className="p-2 hover:bg-gray-50 transition-colors border-l border-gray-300">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        {/* Days of Week Header */}
        <div className="grid grid-cols-7 bg-gray-50">
          {DAYS_OF_WEEK.map((day) => (
            <div
              key={day}
              className="p-3 text-center text-sm font-medium text-gray-700 border-r border-gray-200 last:border-r-0"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Dates */}
        <div className="grid grid-cols-7">
          {calendarDates.map((calendarDate, index) => (
            <DateCell
              key={index}
              calendarDate={calendarDate}
              onEventClick={handleEventClick}
              onDateClick={handleDateClick}
            />
          ))}
        </div>
      </div>

      {/* Event Modal */}
      <EventModal event={selectedEvent} isOpen={isEventModalOpen} onClose={closeEventModal} />

      {/* Create Event Modal */}
      <CreateEventModal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        onCreateEvent={handleCreateEvent}
        selectedDate={selectedDateForCreation}
      />
    </div>
  )
}
