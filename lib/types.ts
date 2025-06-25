export interface Event {
  id: string
  title: string
  date: string
  time: string
  duration: number
  color: string
  description?: string
  location?: string
}

export interface CalendarDate {
  date: Date
  isCurrentMonth: boolean
  isToday: boolean
  events: Event[]
}

// Add new interface for creating events
export interface CreateEventData {
  title: string
  date: string
  time: string
  duration: number
  color: string
  description?: string
  location?: string
}
