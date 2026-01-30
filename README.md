# चलचित्र - Video Streaming Platform

A modern, feature-rich video streaming platform built with React and Tailwind CSS, offering a YouTube-like experience with a sleek dark theme.

![React](https://img.shields.io/badge/React-18.x-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-cyan)
![Vite](https://img.shields.io/badge/Vite-5.x-purple)
![License](https://img.shields.io/badge/license-MIT-green)

## 🎯 Features

### Core Functionality
- **Video Streaming** - High-quality video playback with advanced controls
- **User Authentication** - Secure login and registration with JWT
- **Channel Management** - Create, customize, and manage your channel
- **Video Upload** - Multi-step upload process with metadata and thumbnails
- **Playlists** - Create and organize videos into collections
- **Subscriptions** - Follow channels and manage notification preferences
- **Comments & Likes** - Full engagement system with real-time updates
- **Search & Discovery** - Advanced search with category filters
- **User Profiles** - Customizable profiles with avatar and cover images

### User Experience
- **Dark Theme** - Elegant black (#000000) and dark gray (#272727) design
- **Responsive Design** - Seamless experience across all devices (mobile, tablet, desktop)
- **Grid & List Views** - Multiple viewing options for content browsing
- **Real-time Updates** - Live like counts, comment updates, and subscriber counts
- **Smooth Scrolling** - Optimized vertical and infinite scroll
- **Video Player Controls** - Full playback control with quality selection
- **Drag & Drop Upload** - Intuitive file upload interface

### Design Features
- **Color Palette**
  - Primary Dark: `#0C1A0D` (Deep Green)
  - Primary Accent: `#3C6C69` (Teal)
  - Background: `#000000` (Black)
  - Card Background: `#272727` (Dark Gray)
  - Hover State: `#3a3a3a` (Lighter Gray)
  - Text Primary: `#FFFFFF` (White)
  - Text Secondary: `#9CA3AF` (Gray-400)

## 🛠️ Tech Stack

### Frontend
- **React 18.x** - UI library with hooks
- **React Router v6** - Navigation and routing
- **Redux Toolkit** - State management
- **Tailwind CSS 3.x** - Utility-first CSS framework
- **Vite 5.x** - Fast build tool and dev server
- **Lucide React** - Modern icon library
- **Axios** - HTTP client for API requests

### Backend Integration
- RESTful API architecture
- JWT-based authentication
- Multipart form data for file uploads
- Real-time data synchronization

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/streamhub.git
cd streamhub
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Configure environment variables**
Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:8000
VITE_API_VERSION=v1
```

4. **Start the development server**
```bash
npm run dev
# or
yarn dev
```

The application will open at `http://localhost:5173`

5. **Build for production**
```bash
npm run build
# or
yarn build
```

## 🏗️ Project Structure

```
चलचित्र/
├── public/
│   ├── index.html
│   └── favicon.ico
│
├── src/
│   ├── App.css
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   │
│   ├── assets/
│   │   └── react.svg
│   │
│   ├── auth/
│   │   ├── store.js                    # Redux store configuration
│   │   ├── authSlice.js                # Authentication state management
│   │   └── videoSlice.js               # Video state management
│   │
│   ├── Pages/
│   │   ├── Home.jsx                    # Homepage with video grid
│   │   ├── Video.jsx                   # Video player page
│   │   ├── Channel.jsx                 # Channel profile page
│   │   ├── Login.jsx                   # User login page
│   │   ├── Signup.jsx                  # User registration page
│   │   ├── Profile.jsx                 # User profile page
│   │   ├── UploadVideo.jsx             # Video upload interface
│   │   ├── Playlist.jsx                # Single playlist view
│   │   ├── AllPlaylists.jsx            # All playlists page
│   │   ├── Subscription.jsx            # Single subscription view
│   │   └── AllSubscriptions.jsx        # Subscriptions feed
│   │
│   ├── components/
│   │   ├── Header/
│   │   │   ├── Header.jsx              # Main header component
│   │   │   ├── Logo.jsx                # StreamHub logo
│   │   │   ├── SideNav.jsx             # Sidebar navigation
│   │   │   └── SideNavPopUp.jsx        # Mobile sidebar popup
│   │   ├── Input.jsx                   # Reusable input component
│   │   ├── Loading.jsx                 # Loading spinner
│   │   ├── Videos.jsx                  # Video card component
│   │   └── Playlists.jsx               # Playlist component
│   │
│   └── utils/
│       ├── axios.js                     # Axios instance configuration
│       ├── helpers.js                   # Helper functions (formatViews, timeAgo, etc.)
│       ├── toggleLikeSubscribe.js       # Like/subscribe toggle logic
│       └── getSubscriptions.js          # Subscription fetching utility
│
├── .env                                 # Environment variables
├── .gitignore                           # Git ignore rules
├── package.json                         # Project dependencies
├── package-lock.json                    # Dependency lock file
├── tailwind.config.js                   # Tailwind configuration
├── postcss.config.js                    # PostCSS configuration
├── vite.config.js                       # Vite bundler configuration
└── README.md                            # Project documentation
```

## 🎨 Key Components

### Pages

#### **Home.jsx**
- Video grid layout with responsive columns (1-4 based on screen size)
- Category navigation bar
- Search functionality
- Infinite scroll for video loading
- Video thumbnails with duration badges

#### **Video.jsx**
- Video player with full controls
- Channel information with subscribe button
- Like/dislike functionality with real-time counts
- Comments section with add/like features
- Recommended videos sidebar
- View count and upload date display

#### **Channel.jsx**
- Channel cover image and avatar
- Channel statistics (subscribers, videos, views, join date)
- Subscribe and notification bell controls
- Videos and About tabs
- Grid/List view toggle for videos
- Channel description and social links

#### **Login.jsx**
- Username or email login
- Password with visibility toggle
- Form validation with error messages
- Forgot password link
- Redirect to signup

#### **Signup.jsx**
- Full name, username, email, password fields
- Password confirmation
- Avatar upload (optional)
- Cover image upload (optional)
- Real-time validation
- Username format validation

#### **UploadVideo.jsx**
- 3-step upload wizard:
  1. **File Upload** - Drag & drop or browse
  2. **Video Details** - Title, description, category, tags, thumbnail
  3. **Settings & Upload** - Visibility, comments, ratings
- Upload progress bar
- Success confirmation screen

#### **Profile.jsx**
- User information display
- Edit profile functionality
- Avatar and cover image management
- Account settings

#### **Playlist.jsx**
- Playlist details and metadata
- Video list with play all option
- Add/remove videos
- Playlist privacy settings

#### **AllPlaylists.jsx**
- Grid/List view of all playlists
- Search and filter functionality
- Create new playlist button
- Playlist thumbnails (2x2 grid of videos)
- Public/Private indicators

#### **AllSubscriptions.jsx**
- Latest videos from subscribed channels
- Filter options (All, New, Unwatched, Notifications On)
- Grid/List view toggle
- Channel avatars and info
- Notification management

### Components

#### **Header/**
- **Header.jsx** - Main navigation bar with search, upload, and user menu
- **Logo.jsx** - StreamHub logo with link to home
- **SideNav.jsx** - Sidebar with navigation links
- **SideNavPopUp.jsx** - Mobile-responsive sidebar overlay

#### **Reusable Components**
- **Input.jsx** - Styled input field with validation
- **Loading.jsx** - Loading spinner component
- **Videos.jsx** - Video card with thumbnail and metadata
- **Playlists.jsx** - Playlist card component

### Utilities

#### **axios.js**
Axios instance with base configuration:
```javascript
import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});

export default instance;
```

#### **helpers.js**
Helper functions for data formatting:
- `formatViews(views)` - Format view counts (1.2M, 856K, etc.)
- `timeAgo(date)` - Convert dates to relative time
- `formatDate(date)` - Format dates for display
- `formatDuration(seconds)` - Convert seconds to MM:SS format

#### **toggleLikeSubscribe.js**
Functions for toggling likes and subscriptions:
- `toggleVideoLike(videoId, setVideo)` - Toggle video like
- `toggleSubscribe(channelId, setVideo)` - Toggle channel subscription

#### **getSubscriptions.js**
Utility for fetching user subscriptions

## 📡 API Endpoints

### Authentication
```
POST   /api/v1/users/register          # User registration
POST   /api/v1/users/login             # User login
POST   /api/v1/users/logout            # User logout
GET    /api/v1/users/current-user      # Get current user
```

### Videos
```
GET    /api/v1/videos                  # Get all videos
GET    /api/v1/videos/:id              # Get video details
POST   /api/v1/videos                  # Upload video
PATCH  /api/v1/videos/:id              # Update video
DELETE /api/v1/videos/:id              # Delete video
PATCH  /api/v1/videos/:id/toggle-publish # Toggle publish status
```

### Comments
```
GET    /api/v1/comments/:videoId       # Get video comments
POST   /api/v1/comments/:videoId       # Add comment
PATCH  /api/v1/comments/:commentId     # Update comment
DELETE /api/v1/comments/:commentId     # Delete comment
```

### Likes
```
POST   /api/v1/likes/toggle/v/:videoId    # Toggle video like
POST   /api/v1/likes/toggle/c/:commentId  # Toggle comment like
GET    /api/v1/likes/videos                # Get liked videos
```

### Subscriptions
```
POST   /api/v1/subscriptions/c/:channelId # Toggle subscription
GET    /api/v1/subscriptions               # Get user subscriptions
GET    /api/v1/subscriptions/u/:subscriberId # Get subscriber list
```

### Channels
```
GET    /api/v1/users/c/:username       # Get channel by username
GET    /api/v1/users/c/:channelId      # Get channel details
PATCH  /api/v1/users/update-account    # Update channel info
PATCH  /api/v1/users/avatar            # Update avatar
PATCH  /api/v1/users/cover-image       # Update cover image
```

### Playlists
```
GET    /api/v1/playlists/:playlistId   # Get playlist
POST   /api/v1/playlists                # Create playlist
PATCH  /api/v1/playlists/:playlistId   # Update playlist
DELETE /api/v1/playlists/:playlistId   # Delete playlist
PATCH  /api/v1/playlists/add/:videoId/:playlistId    # Add video
PATCH  /api/v1/playlists/remove/:videoId/:playlistId # Remove video
GET    /api/v1/playlists/user/:userId  # Get user playlists
```

## 🎯 Usage Examples

### Redux State Management

```jsx
import { useSelector, useDispatch } from 'react-redux';

function Component() {
  const user = useSelector((state) => state.auth.userData);
  const videos = useSelector((state) => state.video.videos);
  const dispatch = useDispatch();
  
  return (
    <div>
      <h1>Welcome {user?.fullname}</h1>
      <p>Total Videos: {videos.length}</p>
    </div>
  );
}
```

### API Calls with Axios

```jsx
import axios from '../utils/axios';

// Fetch video details
const getVideoDetails = async (videoId) => {
  try {
    const { data } = await axios.get(`/api/v1/videos/${videoId}`);
    console.log(data.data);
  } catch (error) {
    console.error('Error fetching video:', error);
  }
};

// Upload video
const uploadVideo = async (formData) => {
  try {
    const { data } = await axios.post('/api/v1/videos', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    console.log('Upload successful:', data);
  } catch (error) {
    console.error('Upload failed:', error);
  }
};
```

### Helper Functions

```jsx
import { formatViews, timeAgo, formatDate } from '../utils/helpers';

function VideoCard({ video }) {
  return (
    <div>
      <h3>{video.title}</h3>
      <p>{formatViews(video.views)} views</p>
      <p>{timeAgo(video.createdAt)}</p>
      <p>Published: {formatDate(video.createdAt)}</p>
    </div>
  );
}
```

### Toggle Like/Subscribe

```jsx
import { toggleVideoLike, toggleSubscribe } from '../utils/toggleLikeSubscribe';

function VideoPlayer({ video, setVideo }) {
  return (
    <div>
      <button onClick={() => toggleVideoLike(video._id, setVideo)}>
        {video.hasLiked ? 'Unlike' : 'Like'} ({video.likesCount})
      </button>
      
      <button onClick={() => toggleSubscribe({ 
        channelId: video.owner._id, 
        setVideo 
      })}>
        {video.owner.isSubscribed ? 'Unsubscribe' : 'Subscribe'}
      </button>
    </div>
  );
}
```

## 🎨 Design System

### Color Palette
```css
/* Primary Colors */
--primary-dark: #0C1A0D;      /* Deep green */
--primary-teal: #3C6C69;      /* Teal accent */

/* Background Colors */
--bg-black: #000000;          /* Main background */
--bg-card: #272727;           /* Card background */
--bg-hover: #3a3a3a;          /* Hover state */

/* Text Colors */
--text-primary: #FFFFFF;      /* Primary text */
--text-secondary: #9CA3AF;    /* Secondary text */
--text-muted: #6B7280;        /* Muted text */
```

### Typography
```css
/* Headings */
.heading-xl { @apply text-4xl font-bold; }
.heading-lg { @apply text-3xl font-bold; }
.heading-md { @apply text-2xl font-bold; }
.heading-sm { @apply text-xl font-semibold; }

/* Body Text */
.text-body { @apply text-base text-white; }
.text-secondary { @apply text-sm text-gray-400; }
.text-muted { @apply text-xs text-gray-500; }
```

### Spacing System
```css
/* Padding */
p-2  /* 8px */
p-4  /* 16px */
p-6  /* 24px */
p-8  /* 32px */

/* Gaps */
gap-2  /* 8px */
gap-4  /* 16px */
gap-6  /* 24px */
gap-8  /* 32px */
```

### Shadow Styles
```css
/* Card shadows */
shadow-xl shadow-black/40          /* Default card shadow */
shadow-2xl shadow-gray-800/30      /* Hover card shadow */

/* Button shadows */
shadow-lg shadow-teal-900/40       /* Teal button shadow */
hover:shadow-xl hover:shadow-teal-800/50  /* Hover state */
```

### Border Radius
```css
rounded-lg    /* 8px - Cards */
rounded-xl    /* 12px - Large cards */
rounded-2xl   /* 16px - Containers */
rounded-full  /* Circles/Pills */
```

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **HTTP-only Cookies** - Secure token storage
- **Input Validation** - Client and server-side validation
- **XSS Protection** - Sanitized user inputs
- **CSRF Protection** - Token-based request verification
- **File Upload Validation** - Type and size restrictions
- **Password Hashing** - Secure password storage
- **Rate Limiting** - API request throttling

## 📱 Responsive Design

### Breakpoints
```javascript
// Tailwind breakpoints
sm: '640px'   // Mobile landscape
md: '768px'   // Tablet
lg: '1024px'  // Desktop
xl: '1280px'  // Large desktop
2xl: '1536px' // Extra large desktop
```

### Grid Layouts
```jsx
// Video grid responsive columns
grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4

// Playlist grid
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3

// Stats grid
grid grid-cols-2 md:grid-cols-4
```

## 🚀 Performance Optimization

- **Code Splitting** - Lazy loading for routes
- **Image Optimization** - Proper sizing and lazy loading
- **Memoization** - React.memo for expensive components
- **Virtual Scrolling** - Efficient list rendering
- **API Response Caching** - Reduced server requests
- **Debounced Search** - Optimized search input
- **Optimized Re-renders** - Proper state management

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Coding Standards
- Follow ESLint configuration
- Use Prettier for code formatting
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Kunal Kumar Maurya** - *Initial work* - (https://github.com/Unknown-083)

## 🙏 Acknowledgments

- Design inspiration from YouTube
- Icons by [Lucide React](https://lucide.dev/)
- UI components styled with [Tailwind CSS](https://tailwindcss.com/)
- Build tool by [Vite](https://vitejs.dev/)
- State management with [Redux Toolkit](https://redux-toolkit.js.org/)

## 📞 Support

- **Email**: support@streamhub.com
- **LinkedIn**: https://www.linkedin.com/in/kunal-kumar-maurya-7750511a6/

## 🗺️ Roadmap

### Version 2.0 (Planned)
- [ ] Live streaming support with WebRTC
- [ ] Advanced analytics dashboard for creators
- [ ] Mobile applications (iOS & Android)
- [ ] Multi-language support (i18n)
- [ ] Advanced search with filters and sorting
- [ ] Push notification system
- [ ] AI-powered content recommendation
- [ ] Monetization features (ads, subscriptions)
- [ ] Community posts and stories
- [ ] Collaborative playlists

### Version 1.5 (In Progress)
- [ ] Video quality selector (360p, 720p, 1080p, 4K)
- [ ] Playlist sharing and embedding
- [ ] Watch later functionality
- [ ] Video trimming/basic editing
- [ ] Closed captions/subtitles support
- [ ] Picture-in-picture mode
- [ ] Dark/Light theme toggle
- [ ] Export/Import playlists
- [ ] Channel verification badges
- [ ] Advanced comment moderation

### Version 1.0 (Current)
- [x] User authentication and authorization
- [x] Video upload and streaming
- [x] Channel pages with customization
- [x] Playlists creation and management
- [x] Comments and likes system
- [x] Subscription management
- [x] Search functionality
- [x] Responsive design
- [x] Grid and list views
- [x] User profiles

---

**Built with ❤️ using React, Redux, Tailwind CSS, and Vite**

**चलचित्र** - *Your Entertainment Universe*