"use client"

import type { Event } from "@/lib/types"
import { formatTime, getEventColorClasses } from "@/lib/utils"
import { X, Clock, Calendar, MapPin, FileText } from "lucide-react"
import { format } from "date-fns"

interface EventModalProps {
  event: Event | null
  isOpen: boolean
  onClose: () => void
}

export function EventModal({ event, isOpen, onClose }: EventModalProps) {
  if (!isOpen || !event) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">{event.title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center space-x-3">
            <Calendar size={16} className="text-gray-500" />
            <span className="text-gray-700">{format(new Date(event.date), "EEEE, MMMM d, yyyy")}</span>
          </div>

          <div className="flex items-center space-x-3">
            <Clock size={16} className="text-gray-500" />
            <span className="text-gray-700">
              {formatTime(event.time)} • {event.duration} minutes
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <div className={`w-4 h-4 rounded-full ${getEventColorClasses(event.color).split(" ")[0]}`}></div>
            <span className="text-gray-700 capitalize">{event.color} category</span>
          </div>

          {event.location && (
            <div className="flex items-center space-x-3">
              <MapPin size={16} className="text-gray-500" />
              <span className="text-gray-700">{event.location}</span>
            </div>
          )}

          {event.description && (
            <div className="flex items-start space-x-3">
              <FileText size={16} className="text-gray-500 mt-0.5" />
              <span className="text-gray-700">{event.description}</span>
            </div>
          )}
        </div>

        <div className="flex justify-end p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
