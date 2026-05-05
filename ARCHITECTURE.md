# Project Architecture Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [System Architecture](#system-architecture)
3. [Tech Stack](#tech-stack)
4. [Base64 Conversion](#base64-conversion)
5. [Data Flow](#data-flow)
6. [Project Structure](#project-structure)
7. [API Endpoints](#api-endpoints)
8. [Component Architecture](#component-architecture)
9. [State Management](#state-management)
10. [Error Handling](#error-handling)

---

## Project Overview

**Image ⇄ Base64 App** is a full-stack web application that enables users to:
- Upload images and convert them to Base64 format
- Store images in a database with their Base64 representations
- View, download, and delete images from a gallery
- Download Base64 code for integration into applications

---

## System Architecture

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT LAYER (React)                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Pages (Home, Gallery, NotFound)                     │   │
│  │  Components (Header, UploadForm, ImageCard, Loader)  │   │
│  │  Services (imageApi - centralized API calls)         │   │
│  │  Router (React Router v7.14.2)                       │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │
                    HTTP/REST API
                         │
┌────────────────────────┴────────────────────────────────────┐
│                    SERVER LAYER (Node.js)                    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Routes (imageRoutes)                                │   │
│  │  Controllers (imageController)                       │   │
│  │  Models (Image Schema)                               │   │
│  │  Database (MongoDB)                                  │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────┘
```

---

## Tech Stack

### Frontend
- **React 19.2.5** - UI library
- **React Router 7.14.2** - Client-side routing with 404 handling
- **React Hot Toast 2.6.0** - Toast notifications for user feedback
- **Axios 1.16.0** - HTTP client for API communication
- **Tailwind CSS 4.2.4** - Utility-first CSS framework
- **Vite 8.0.10** - Build tool and dev server

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM

---

## Base64 Conversion

### What is Base64?

Base64 is a binary-to-text encoding scheme that represents binary data in a printable ASCII string format. It uses 64 characters from the alphabet (A-Z, a-z, 0-9, +, /) to encode data.

### Why Base64?

1. **Data Embedding** - Embed images directly in HTML/CSS/JSON
2. **Transmission** - Safely transmit binary data over text-based protocols
3. **Storage** - Store binary data as strings in databases
4. **Compatibility** - Works across different systems and platforms
5. **Data URIs** - Create `data:` URLs for immediate browser display

### Base64 Encoding Process

```
Binary Image Data
       ↓
   [File Upload]
       ↓
   [FileReader API]
   (readAsDataURL)
       ↓
Base64 String
(data:image/png;base64,iVBORw0KGgo...)
       ↓
[Stored in Database]
       ↓
[Can be displayed directly in <img> tags]
```

### JavaScript Base64 Conversion

**In the Browser (Client-side):**
```javascript
// Convert File to Base64
const reader = new FileReader();
reader.onload = (e) => {
  const base64String = e.target.result; // data:image/png;base64,...
};
reader.readAsDataURL(file);
```

**Characteristics:**
- **Size Increase**: Base64 is ~33% larger than original binary
- **Format**: `data:image/[type];base64,[encoded-data]`
- **URL Compatible**: Can be used directly in `<img src="">` tags
- **Browser Native**: No external libraries needed

### Example Base64 Output

```
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA
AADIAAAACCAYAAAAq7XbDAAAA...
(continues for several kilobytes)
```

---

## Data Flow

### Image Upload Flow

```
1. USER INTERACTION
   User selects image file
         ↓
2. CLIENT-SIDE PROCESSING
   - UploadForm component captures file
   - FileReader API reads file as DataURL (Base64)
   - Show filename and enable upload button
         ↓
3. API REQUEST
   - POST /api/image/upload
   - FormData with file object
   - Loader shown to user
         ↓
4. SERVER PROCESSING
   - Receive multipart FormData
   - Extract file buffer
   - Convert to Base64 string
   - Create Image document
         ↓
5. DATABASE STORAGE
   - Save to MongoDB:
     {
       fileName: "photo.jpg",
       imageUrl: "data:image/jpeg;base64,...",
       createdAt: "2026-05-05T...",
       _id: "65a7b..."
     }
         ↓
6. CLIENT UPDATE
   - Success toast shown
   - 2 second delay
   - Auto-redirect to gallery
   - Gallery fetches all images
```

### Image Gallery Display Flow

```
1. PAGE LOAD
   Gallery component mounts
         ↓
2. SKELETON LOADERS
   Show animated placeholder cards
         ↓
3. FETCH REQUEST
   - GET /api/image/all
   - imageApi.fetchAllImages()
         ↓
4. SERVER RESPONSE
   Return array of image documents
   with fileName and Base64 imageUrl
         ↓
5. RENDER IMAGES
   - Map through images array
   - Display Base64 in <img> tag
   - Show Base64 code in textarea
   - Enable Download/Delete buttons
```

### Image Download Flow

```
1. USER CLICKS DOWNLOAD
   handleDownload(base64, fileName)
         ↓
2. CREATE LINK ELEMENT
   const a = document.createElement('a')
   a.href = base64
   a.download = fileName
         ↓
3. TRIGGER DOWNLOAD
   a.click()
         ↓
4. BROWSER ACTION
   Browser downloads data URI as file
   with original filename
```

### Image Delete Flow

```
1. USER CLICKS DELETE
   handleDelete(imageId)
         ↓
2. API REQUEST
   - DELETE /api/image/{id}
         ↓
3. DATABASE UPDATE
   Remove document from MongoDB
         ↓
4. LOADER SHOWN
   2 second delay
         ↓
5. GALLERY REFRESH
   Re-fetch all images
   Update display
```

---

## Project Structure

```
client/
├── src/
│   ├── pages/                    # Page Components
│   │   ├── Home.jsx             # Upload page with toast & redirect
│   │   ├── Gallery.jsx          # Image gallery with skeleton loaders
│   │   └── NotFound.jsx         # 404 error page
│   │
│   ├── components/              # Reusable Components
│   │   ├── Header.jsx           # Navigation with gray theme
│   │   ├── Loader.jsx           # Animated loading spinner
│   │   ├── UploadForm.jsx       # File input & upload button
│   │   └── ImageCard.jsx        # Individual image display (unused)
│   │
│   ├── services/                # API & Business Logic
│   │   └── imageApi.js          # Centralized API client
│   │
│   ├── App.jsx                  # Main routing with Toaster
│   ├── main.jsx                 # React DOM entry point
│   ├── index.css                # Global styles
│   └── STRUCTURE.md             # Project structure doc
│
├── package.json                 # Dependencies & scripts
├── vite.config.js              # Vite configuration
├── eslint.config.js            # ESLint rules
└── README.md                   # Project README

server/
├── server.js                   # Express server entry
├── package.json               # Node dependencies
│
├── routes/
│   └── imageRoutes.js        # Image endpoints
│
├── controllers/
│   └── imageController.js    # Request handlers
│
├── models/
│   └── Image.js              # MongoDB schema
│
└── db/
    └── index.js              # MongoDB connection
```

---

## API Endpoints

### Base URL
```
http://localhost:5000/api/image
```

### Endpoints

#### 1. Upload Image
```
POST /upload
Content-Type: multipart/form-data

Request Body:
- image: File (binary file data)

Response (200 OK):
{
  "success": true,
  "message": "Image uploaded successfully"
}

Response (400 Error):
{
  "error": "Image upload failed"
}
```

#### 2. Get All Images
```
GET /all

Response (200 OK):
{
  "images": [
    {
      "_id": "65a7b...",
      "fileName": "photo.jpg",
      "imageUrl": "data:image/jpeg;base64,...",
      "createdAt": "2026-05-05T07:44:02.000Z"
    },
    ...
  ]
}
```

#### 3. Delete Image
```
DELETE /:id

Parameters:
- id: MongoDB image document ID

Response (200 OK):
{
  "success": true,
  "message": "Image deleted successfully"
}

Response (404 Error):
{
  "error": "Image not found"
}
```

---

## Component Architecture

### Page Components

#### Home.jsx
- **Purpose**: Image upload page
- **State**: `file`, `loading`
- **Features**:
  - File selection with validation
  - Upload with loader
  - Success/Error toast notifications
  - Auto-redirect to gallery on success
- **Lifecycle**: Mounts → Upload → Toast → Redirect

#### Gallery.jsx
- **Purpose**: Display all uploaded images
- **State**: `images`, `loading`, `fetching`
- **Features**:
  - Skeleton loaders during fetch
  - Grid layout (2 columns on desktop)
  - Base64 code display in textarea
  - Download and delete buttons
- **Lifecycle**: Mount → Fetch → Render → Display

#### NotFound.jsx
- **Purpose**: 404 error page
- **Route**: `*` (catch-all)
- **Features**:
  - Gray theme styling
  - Helpful navigation links
  - Back to home button

### Reusable Components

#### Header.jsx
- **Purpose**: Navigation bar
- **Props**: None (uses React Router Link)
- **Features**:
  - Logo with gradient text
  - Upload and Gallery links
  - Sticky positioning
  - Gray hover states

#### UploadForm.jsx
- **Purpose**: File input form
- **Props**: `file`, `setFile`, `onUpload`, `isLoading`
- **Features**:
  - File input with dashed border
  - Upload button with disabled state
  - File name display
  - Gray button styling

#### Loader.jsx
- **Purpose**: Loading spinner
- **Props**: None
- **Features**:
  - Full-screen overlay
  - Animated spinner image
  - Processing text

---

## State Management

### Client-Side State

**Home Page State:**
```javascript
const [file, setFile] = useState(null)           // Selected file
const [loading, setLoading] = useState(false)    // Upload in progress
const navigate = useNavigate()                   // Router navigation
```

**Gallery Page State:**
```javascript
const [images, setImages] = useState([])         // All images
const [loading, setLoading] = useState(false)    // Delete in progress
const [fetching, setFetching] = useState(true)   // Initial fetch
```

### Data Flow Pattern

```
Event → State Update → Re-render → API Call → State Update → Re-render
```

### Toast Notifications

**Success Toast:**
```javascript
toast.success("Image uploaded successfully!")
```

**Error Toast:**
```javascript
toast.error("Upload failed! Please try again.")
```

---

## Error Handling

### Client-Side Error Handling

#### Upload Errors
```javascript
try {
  await imageApi.uploadImage(file)
  toast.success("Image uploaded successfully!")
} catch (error) {
  toast.error("Upload failed! Please try again.")
  setLoading(false)
}
```

#### Delete Errors
```javascript
try {
  await imageApi.deleteImage(id)
  // Success handling
} catch (error) {
  console.error("Delete failed:", error)
  setLoading(false)
}
```

### Network Error Types

1. **Upload Failure**: Network error or server rejection
2. **Fetch Failure**: Cannot retrieve images from server
3. **Delete Failure**: Image not found or server error

### User Feedback

- **Success**: Green toast notification
- **Error**: Red toast notification
- **Loading**: Full-screen loader with spinner
- **Empty State**: Text message in gallery

---

## Routing Architecture

### Route Structure

```
/                    → Home (Upload page)
/gallery             → Gallery (Image display)
/*                   → NotFound (404 page)
```

### Router Setup

**React Router v7.14.2**
```javascript
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/gallery" element={<Gallery />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>
```

### Navigation Flow

```
Upload Page (/)
    ↓ [User uploads image]
    ↓ [Success toast]
    ↓ [2 second delay]
    ↓ useNavigate("/gallery")
    ↓
Gallery Page (/gallery)
    ↓ [User clicks Upload link]
    ↓
Upload Page (/)
    
Invalid Route (e.g., /invalid)
    ↓
NotFound Page (/*) → 404 error display
    ↓ [User clicks Back to Home]
    ↓
Upload Page (/)
```

---

## Performance Considerations

### Optimizations

1. **Skeleton Loaders**: Show placeholders while fetching
2. **Image Lazy Loading**: Images load as needed
3. **Base64 Caching**: Browser caches Base64 data
4. **Conditional Rendering**: Only render visible images
5. **Debounced State Updates**: Prevents excessive re-renders

### Base64 Size Impact

- **Original Image**: 1 MB
- **Base64 Encoded**: ~1.33 MB (33% increase)
- **Storage**: Keep images reasonably sized for database

### Load Times

```
Upload Process:       ~2 seconds (with loader)
Gallery Load:         ~1-2 seconds (with skeleton)
Image Download:       Instant (data URI in memory)
```

---

## Security Considerations

### Current Implementation

1. **File Upload**: Accept image files only
2. **Server Validation**: Validate file type on backend
3. **Database**: MongoDB with mongoose schema validation
4. **CORS**: Cross-origin requests configured

### Best Practices (Future)

1. **File Size Limit**: Restrict upload size
2. **File Type Validation**: Server-side MIME type check
3. **Authentication**: Add user authentication
4. **Authorization**: Restrict image access by user
5. **Rate Limiting**: Prevent upload spam

---

## Database Schema

### Image Collection

```javascript
{
  _id: ObjectId,
  fileName: String,           // Original filename
  imageUrl: String,           // Full Base64 data URI
  createdAt: Date,            // Timestamp
  updatedAt: Date             // Last modified
}
```

**Example Document:**
```json
{
  "_id": "65a7b8c9d0e1f2g3h4i5j6k7",
  "fileName": "vacation.jpg",
  "imageUrl": "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
  "createdAt": "2026-05-05T07:44:02.000Z",
  "updatedAt": "2026-05-05T07:44:02.000Z"
}
```

---

## Development Workflow

### Local Development

```bash
# Terminal 1: Frontend
cd client
bun run dev
# Access: http://localhost:5174

# Terminal 2: Backend
cd server
npm start
# Running on: http://localhost:5000
```

### Build for Production

```bash
# Client build
cd client
bun run build
# Output: dist/

# Server: Deploy to hosting service
# Database: Use cloud MongoDB (Atlas)
```

---

## Future Enhancements

1. **Image Editing**: Add crop, rotate, filter features
2. **User Accounts**: Authentication and personal galleries
3. **Sharing**: Generate shareable links
4. **Batch Upload**: Multiple files at once
5. **Image Optimization**: Automatic compression
6. **Advanced Search**: Filter by date, size, type
7. **Mobile App**: React Native version
8. **API Documentation**: Swagger/OpenAPI specs

---

## Dependencies Summary

### Frontend
```json
{
  "react": "^19.2.5",
  "react-dom": "^19.2.5",
  "react-router-dom": "^7.14.2",
  "react-hot-toast": "^2.6.0",
  "axios": "^1.16.0",
  "tailwindcss": "^4.2.4",
  "vite": "^8.0.10"
}
```

### Backend
```json
{
  "express": "latest",
  "mongoose": "latest",
  "cors": "latest",
  "dotenv": "latest"
}
```

---

