# Modern Calendar App

A beautiful, responsive calendar application built with React, Next.js, and Tailwind CSS. This app provides an intuitive interface for managing events and appointments with a modern design.

## 🚀 Features

- **Interactive Calendar View**: Monthly calendar with intuitive navigation
- **Event Management**: Create, view, and manage events with detailed information
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, modern interface built with Tailwind CSS and shadcn/ui components
- **Event Categories**: Color-coded events for easy organization
- **Time Management**: Set event duration and time slots
- **Real-time Updates**: Instant updates when creating or modifying events

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Package Manager**: npm/pnpm

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (version 18 or higher)
- npm or pnpm package manager

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd calendar-app
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 3. Run the Development Server

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
calendar-app/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── calendar.tsx       # Main calendar component
│   ├── create-event-modal.tsx  # Event creation modal
│   ├── event-card.tsx     # Event display component
│   ├── event-modal.tsx    # Event details modal
│   ├── date-cell.tsx      # Individual date cell
│   └── ui/               # shadcn/ui components
├── data/                 # Static data
│   └── events.json       # Sample events data
├── hooks/                # Custom React hooks
│   └── use-mobile.tsx    # Mobile detection hook
├── lib/                  # Utility functions and types
│   ├── types.ts          # TypeScript type definitions
│   └── utils.ts          # Utility functions
└── public/               # Static assets
```

## 🎯 Usage

### Creating Events

1. Click the "New Event" button in the top-right corner
2. Fill in the event details:
   - **Title**: Event name
   - **Date**: Select the event date
   - **Time**: Choose start time
   - **Duration**: Set event duration (15, 30, 60, or 90 minutes)
   - **Color**: Choose from 10 different color options
   - **Description**: Add optional event description
3. Click "Create Event" to save

### Viewing Events

- Events are displayed as colored cards on their respective dates
- Click on any event to view its details
- Events are color-coded for easy identification

### Navigation

- Use the arrow buttons to navigate between months
- Click "Today" to quickly return to the current month
- The calendar automatically highlights today's date

## 🎨 Customization

### Adding New Event Colors

To add new event colors, modify the `getEventColorClasses` function in `lib/utils.ts`:

```typescript
export function getEventColorClasses(color: string) {
  const colorMap: Record<string, string> = {
    // Add your custom colors here
    custom: "bg-custom-100 text-custom-800 border-custom-200",
    // ... existing colors
  }
  return colorMap[color] || "bg-gray-100 text-gray-800 border-gray-200"
}
```

### Modifying Event Duration Options

Edit the duration options in `components/create-event-modal.tsx`:

```typescript
const DURATION_OPTIONS = [
  { value: 15, label: "15 minutes" },
  { value: 30, label: "30 minutes" },
  // Add more options as needed
]
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

This project uses:
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Tailwind CSS for styling

## 🐛 Troubleshooting

### Hydration Errors

If you encounter hydration errors, ensure that:
- All client-side only code is wrapped in `useEffect`
- Dynamic values like `Date.now()` are handled properly
- Browser-specific APIs are only called on the client side

### Common Issues

1. **Port already in use**: Change the port in `package.json` scripts
2. **TypeScript errors**: Run `npm run build` to check for type issues
3. **Styling issues**: Ensure Tailwind CSS is properly configured

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

If you encounter any issues or have questions, please:
1. Check the troubleshooting section above
2. Search existing issues in the repository
3. Create a new issue with detailed information

---

**Happy coding! 🎉** 
