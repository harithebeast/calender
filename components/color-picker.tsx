"use client"

interface ColorPickerProps {
  selectedColor: string
  onColorChange: (color: string) => void
}

const COLORS = [
  { name: "Blue", value: "blue", bg: "bg-blue-500" },
  { name: "Green", value: "green", bg: "bg-green-500" },
  { name: "Purple", value: "purple", bg: "bg-purple-500" },
  { name: "Orange", value: "orange", bg: "bg-orange-500" },
  { name: "Red", value: "red", bg: "bg-red-500" },
  { name: "Indigo", value: "indigo", bg: "bg-indigo-500" },
  { name: "Teal", value: "teal", bg: "bg-teal-500" },
  { name: "Pink", value: "pink", bg: "bg-pink-500" },
  { name: "Cyan", value: "cyan", bg: "bg-cyan-500" },
  { name: "Yellow", value: "yellow", bg: "bg-yellow-500" },
]

export function ColorPicker({ selectedColor, onColorChange }: ColorPickerProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Event Color</label>
      <div className="grid grid-cols-5 gap-2">
        {COLORS.map((color) => (
          <button
            key={color.value}
            type="button"
            onClick={() => onColorChange(color.value)}
            className={`
              w-8 h-8 rounded-full ${color.bg} transition-all duration-200
              ${selectedColor === color.value ? "ring-2 ring-offset-2 ring-gray-400 scale-110" : "hover:scale-105"}
            `}
            title={color.name}
          />
        ))}
      </div>
    </div>
  )
}
