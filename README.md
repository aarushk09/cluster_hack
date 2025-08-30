# Digital Life Organizer

A comprehensive Next.js application designed to organize your digital life. **Currently featuring Tasks Management, Notes Organization, and Calendar/Events** with more organizational features coming in future releases.

## Current Features (v0.2.0)

### 🎯 Tasks & Todos
- Create, edit, and delete tasks
- Set priorities (low, medium, high)
- Add due dates and descriptions
- Mark tasks as completed
- Organize pending and completed tasks
- Local storage persistence

### 📝 Notes Organization
- Create and organize notes with categories
- Add tags for better organization
- Search through notes content
- Edit notes inline
- Rich categorization system

### 📅 Calendar & Events
- Schedule events and appointments
- Multiple view modes (day, week, month)
- Event categories with color coding
- Add locations and descriptions
- Upcoming events sidebar

## Upcoming Features (Future Releases)

The following features are planned for future releases:

### 🎯 Goals & Habits (Coming in v0.4.0)
- Set and track personal goals
- Build and maintain habits
- Progress tracking with visual indicators

### 📁 Files & Documents (Coming in v0.5.0)
- Organize files and folders
- Create folder hierarchies
- Link to external files

### 👥 Contacts (Coming in v0.6.0)
- Manage personal and professional contacts
- Categorize contacts
- Store detailed contact information

### 💰 Finance Tracker (Coming in v0.7.0)
- Track income and expenses
- Set and monitor budgets
- Financial overview dashboard

### 🔖 Bookmarks (Coming in v0.8.0)
- Save and organize web bookmarks
- Create bookmark folders
- Tag bookmarks for easy searching

## Getting Started

### Prerequisites
- Node.js 16.x or later
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aarushk09/cluster_hack.git
   cd cluster_hack
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Building for Production

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React hooks with localStorage persistence
- **Notifications**: React Hot Toast

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main application page
└── components/
    └── TasksTab.tsx         # Tasks management (current feature)
```

## Current Implementation Details

### Tasks Management
- **Create Tasks**: Add new tasks with title, description, priority, and due date
- **Edit & Delete**: Modify existing tasks or remove them
- **Priority System**: Visual indicators for low, medium, and high priority tasks
- **Due Dates**: Optional deadline tracking for tasks
- **Completion Tracking**: Mark tasks as done and view completed items separately
- **Persistence**: All tasks are saved locally and persist between sessions

### Data Persistence

All data is stored locally in the browser's localStorage, ensuring:
- ✅ No external dependencies
- ✅ Privacy-focused (data stays on your device)
- ✅ Instant loading and saving
- ⚠️ Data is device-specific (not synced across devices)

## Development Roadmap

This project follows an incremental development approach:

- **v0.1.0** - ✅ Tasks Management (Complete)
- **v0.2.0** - ✅ Notes Organization + Calendar & Events (Current)
- **v0.3.0** - 🎯 Goals & Habits (Next)
- **v0.4.0** - 📁 Files & Documents
- **v0.5.0** - 👥 Contacts Management
- **v0.6.0** - 💰 Finance Tracking
- **v0.7.0** - 🔖 Bookmarks Organization

Each release will add a new major feature while maintaining all previous functionality.

## Usage Tips

1. **Add Your First Task**: Click the "Add Task" button to create your first task
2. **Set Priorities**: Use the priority system to organize tasks by importance
3. **Track Progress**: Mark tasks as completed to see your progress
4. **Use Descriptions**: Add detailed descriptions for complex tasks
5. **Set Deadlines**: Add due dates to keep track of time-sensitive tasks

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ using Next.js and TypeScript**

**Current Status**: 🎯 Tasks Management, 📝 Notes Organization, and 📅 Calendar & Events features complete and ready to use!