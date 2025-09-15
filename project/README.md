# Contracts Dashboard

A modern React + Tailwind CSS single-page application for managing SaaS contracts with AI-powered insights and analytics.

## 🚀 Features

- **Authentication System**: Mock JWT authentication with localStorage persistence
- **Contract Management**: View, search, filter, and paginate contracts
- **Detailed Contract View**: Interactive clause exploration with AI insights
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **File Upload Simulation**: Drag & drop interface with progress tracking
- **Modern UI Components**: Reusable components with consistent design system
- **State Management**: Context API with custom hooks
- **Routing**: Protected routes with React Router DOM

## 🛠 Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM v6
- **State Management**: React Context API + useReducer
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Vercel/Netlify ready

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Button.tsx
│   ├── Layout.tsx
│   ├── LoadingSpinner.tsx
│   ├── Pagination.tsx
│   ├── ProtectedRoute.tsx
│   ├── StatusBadge.tsx
│   ├── RiskBadge.tsx
│   ├── SearchBar.tsx
│   ├── FilterDropdown.tsx
│   ├── EmptyState.tsx
│   └── UploadModal.tsx
├── pages/               # Main application pages
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   ├── ContractDetail.tsx
│   ├── Insights.tsx
│   ├── Reports.tsx
│   └── Settings.tsx
├── context/             # Context providers
│   ├── AuthContext.tsx
│   └── ContractsContext.tsx
├── hooks/               # Custom hooks
│   ├── useAuth.ts
│   └── useContracts.ts
├── App.tsx              # Main app component
└── main.tsx            # App entry point
```

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd contracts-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Demo Credentials

- **Username**: Any username (e.g., "admin", "john", "demo")
- **Password**: `test123`

## 📊 Features Overview

### 1. Authentication
- Mock JWT-based authentication
- Persistent login state with localStorage
- Protected routes with automatic redirect
- User profile management

### 2. Contract Dashboard
- **Search & Filter**: Search by contract name or parties, filter by status and risk level
- **Pagination**: 10 contracts per page with navigation controls
- **Responsive Table**: Contract details with status badges and risk indicators
- **Quick Actions**: Click any contract row to view details

### 3. Contract Detail View
- **Metadata Display**: Contract parties, dates, status, and risk assessment
- **Interactive Clauses**: Click to expand clause details with confidence scores
- **AI Insights**: Risk analysis and recommendations with severity indicators
- **Evidence Panel**: Side drawer with contract snippets and relevance scores

### 4. File Upload
- **Drag & Drop Interface**: Modern file upload with visual feedback
- **Progress Tracking**: Real-time upload progress simulation
- **Multiple File Support**: Upload multiple contracts simultaneously
- **Error Handling**: Simulated upload failures with retry options

### 5. Additional Pages
- **Insights**: Contract portfolio analytics and metrics
- **Reports**: Downloadable reports with custom date ranges
- **Settings**: User profile, notifications, and security preferences

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6, #1D4ED8)
- **Success**: Green (#10B981, #065F46)
- **Warning**: Yellow (#F59E0B, #92400E)
- **Danger**: Red (#EF4444, #991B1B)
- **Neutral**: Gray scale (#F9FAFB to #111827)

### Component Variants
- **Buttons**: Primary, Secondary, Danger, Ghost
- **Badges**: Status (Active, Expired, Renewal Due), Risk (Low, Medium, High)
- **Form Controls**: Consistent focus states and validation

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 📱 Responsive Design

The application is fully responsive with:
- **Mobile-first approach** with Tailwind CSS
- **Collapsible sidebar** on mobile devices
- **Adaptive table layouts** with horizontal scrolling
- **Touch-friendly interactions** for mobile users
- **Optimized content density** across screen sizes

## 🔒 Security Features

- **Protected Routes**: Automatic redirect to login for unauthenticated users
- **Token Management**: Secure storage and validation of JWT tokens
- **Session Persistence**: Remember login state across browser sessions
- **Input Validation**: Form validation with error handling

## 🧪 Mock Data

The application uses a comprehensive mock dataset (`public/contracts.json`) featuring:
- **5 Sample Contracts** with realistic business scenarios
- **Multiple Contract Types**: Software licenses, cloud services, marketing, real estate
- **Varied Risk Levels**: Low, medium, and high-risk contracts
- **Different Statuses**: Active, expired, and renewal due contracts
- **Rich Metadata**: Parties, dates, values, clauses, and AI insights

## 🚀 Deployment

### Vercel Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy to Vercel:
```bash
npx vercel --prod
```

### Netlify Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to Netlify

### Environment Variables

No environment variables are required for the mock version. For production deployment with real APIs, add:

```env
VITE_API_BASE_URL=https://your-api.com
VITE_JWT_SECRET=your-jwt-secret
```

## 🛣 Future Enhancements

### Phase 1
- Real API integration with backend services
- Advanced search with full-text indexing
- Export functionality for contracts and reports
- Email notifications for contract renewals

### Phase 2
- AI-powered contract analysis integration
- Document comparison and version control
- Advanced analytics dashboard with charts
- Team collaboration features

### Phase 3
- Integration with popular CRM systems
- Automated contract renewal workflows
- Advanced reporting with business intelligence
- Mobile application development

## 📝 Technical Decisions

### State Management
- **Context API** chosen for simplicity and built-in React support
- **useReducer** for complex state transitions
- **Custom hooks** for business logic abstraction

### Styling
- **Tailwind CSS** for rapid development and consistent design
- **Component-based architecture** for reusability
- **Mobile-first responsive design** approach

### Data Flow
- **Single source of truth** with Context providers
- **Optimistic UI updates** for better user experience
- **Error boundaries** for graceful error handling

### Performance
- **Pagination** to handle large contract lists
- **Lazy loading** for route-based code splitting
- **Memoization** for expensive calculations

## 🐛 Known Limitations

1. **Mock Authentication**: Uses localStorage instead of secure HTTP-only cookies
2. **Static Data**: No real backend integration (uses JSON file)
3. **File Upload**: Simulated only - no actual file processing
4. **Search**: Client-side filtering only (no server-side search)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💡 Assumptions Made

1. **User Roles**: Single user role (admin) for MVP simplicity
2. **Data Volume**: Optimized for small to medium contract portfolios (< 1000 contracts)
3. **Browser Support**: Modern browsers with ES2020 support
4. **Network**: Assumes reliable internet connection for SPA functionality
5. **File Types**: Contract uploads limited to PDF, DOC, DOCX formats
6. **Security**: Mock authentication suitable for demo purposes only

---

Built with ❤️ using React, TypeScript, and Tailwind CSS