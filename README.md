# Historical Chat Application

A full-stack web application that allows users to have conversations with historical figures. The application features user authentication, real-time chat functionality, and intelligent guardrail logic to ensure historically accurate discussions.

![React](https://img.shields.io/badge/React-19.2.4-blue)
![Django](https://img.shields.io/badge/Django-5.x-green)
![Redux](https://img.shields.io/badge/Redux-Toolkit-purple)

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Backend API Documentation](#backend-api-documentation)
  - [Authentication Endpoints](#authentication-endpoints)
  - [Chat Endpoints](#chat-endpoints)
- [Frontend Overview](#frontend-overview)
- [Guardrail System](#guardrail-system)
- [Screenshots](#screenshots)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

The Historical Chat Application is an educational platform that enables users to engage in simulated conversations with famous historical figures. The current implementation features **Albert Einstein**, with the architecture designed to easily support additional historical figures.

### Key Capabilities

- **User Authentication**: Secure registration and login system
- **Chat Interface**: Real-time messaging with historical AI personas
- **Guardrail System**: Intelligent filtering to prevent anachronistic discussions
- **Responsive Design**: Works on desktop and mobile devices

---

## Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.4 | UI Framework |
| React Router DOM | 7.13.1 | Client-side routing |
| Redux Toolkit | 2.11.2 | State management |
| React Redux | 9.2.0 | React bindings for Redux |
| Axios | (included in api.js) | HTTP client |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| Django | 5.x | Web Framework |
| Django REST Framework | Latest | REST API |
| SQLite3 | Default | Database |
| JWT Authentication | - | Token-based auth |

---

## Project Structure

```
DATASTALGO_QUIZ5/
├── backend/                    # Django Backend
│   ├── backend/               # Django project settings
│   │   ├── settings.py        # Main configuration
│   │   ├── urls.py           # URL routing
│   │   ├── wsgi.py           # WSGI entry point
│   │   └── asgi.py           # ASGI entry point
│   ├── base_app/              # Core application
│   │   ├── models.py         # Data models
│   │   ├── views.py          # API views
│   │   ├── serializers.py    # DRF serializers
│   │   └── urls.py           # App URL routing
│   ├── authentication/        # User authentication
│   │   ├── models.py         # User model extensions
│   │   ├── views.py          # Auth views
│   │   ├── serializers.py    # Auth serializers
│   │   └── urls.py           # Auth URL routing
│   ├── conversations/         # Chat functionality
│   │   ├── models.py         # Conversation models
│   │   ├── views.py          # Chat views
│   │   ├── serializers.py    # Chat serializers
│   │   └── urls.py           # Chat URL routing
│   ├── db.sqlite3            # SQLite database
│   ├── manage.py             # Django management script
│   └── requirements.txt     # Python dependencies
│
├── src/                       # React Frontend
│   ├── components/           # Reusable UI components
│   │   ├── ConversationItem.js
│   │   ├── EmptyState.js
│   │   ├── FormComponent.js
│   │   ├── Loader.js
│   │   └── Message.js
│   ├── screens/              # Page components
│   │   ├── HomeScreen.js     # Main chat screen
│   │   ├── LoginScreen.js    # Login page
│   │   └── RegisterScreen.js # Registration page
│   ├── services/              # API services
│   │   ├── api.js            # Main API service
│   │   └── mockApi.js        # Mock API (development)
│   ├── store/                # Redux store
│   │   ├── store.js          # Store configuration
│   │   └── slices/           # Redux slices
│   │       ├── authSlice.js  # Auth state management
│   │       └── chatSlice.js  # Chat state management
│   ├── App.js                # Root component
│   ├── App.css               # Global styles
│   └── index.js              # Entry point
│
├── public/                    # Static public assets
├── package.json              # Node.js dependencies
├── .gitignore               # Git ignore rules
└── README.md                 # This file
```

---

## Features

### 1. User Authentication
- **Registration**: Create new user accounts with name, email, and password
- **Login**: Secure authentication with JWT tokens
- **Session Management**: Persistent login with Redux state management
- **Logout**: Secure session termination

### 2. Chat System
- **Real-time Messaging**: Send and receive messages in real-time
- **Historical Personas**: Chat with AI-powered historical figures
- **Message History**: View conversation history within a session
- **Typing Indicators**: Visual feedback during message sending

### 3. Guardrail System
- **Temporal Validation**: Prevents discussions about events after the historical figure's death
- **Keyword Filtering**: Blocks modern topics (internet, smartphones, social media, etc.)
- **Smart Refusal**: Provides contextually appropriate decline messages

### 4. User Interface
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Loading States**: Visual feedback during API calls
- **Error Handling**: User-friendly error messages
- **Empty States**: Helpful prompts when no messages exist

---

## Getting Started

### Prerequisites

#### For Frontend:
- Node.js (v14 or higher)
- npm or yarn

#### For Backend:
- Python (v3.8 or higher)
- Django 5.x
- Django REST Framework

---

### Installation

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd DATASTALGO_QUIZ5
```

#### 2. Set Up the Backend

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt
```

#### 3. Set Up the Frontend

```bash
# Navigate to root directory
cd ..

# Install Node.js dependencies
npm install
```

---

### Running the Application

#### Option 1: Full Stack (Frontend + Backend)

**Start the Django Backend:**

```bash
cd backend
python manage.py migrate
python manage.py runserver
```

The backend will run at: `http://localhost:8000`

**Start the React Frontend:**

```bash
# In a new terminal
npm start
```

The frontend will run at: `http://localhost:3000`

#### Option 2: Frontend Only (with Mock API)

The frontend is configured to use a mock API by default for development:

```bash
npm start
```

This uses `src/services/mockApi.js` which simulates all backend responses locally.

---

## Backend API Documentation

### Base URL
```
http://localhost:8000/api/
```

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register/` | Register a new user |
| POST | `/auth/login/` | Login and get JWT token |
| POST | `/auth/logout/` | Logout and invalidate token |
| GET | `/auth/me/` | Get current user info |

#### Register User
```http
POST /auth/register/
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

#### Login User
```http
POST /auth/login/
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

---

### Chat Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/chat/figure/` | Get current historical figure info |
| POST | `/chat/message/` | Send a message to the historical figure |
| GET | `/chat/history/` | Get conversation history |

#### Get Figure Info
```http
GET /chat/figure/
Authorization: Bearer <jwt_token>
```

Response:
```json
{
  "id": "einstein",
  "name": "Albert Einstein",
  "died": 1955,
  "persona": "I am Albert Einstein, theoretical physicist..."
}
```

#### Send Message
```http
POST /chat/message/
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "message": "What is your theory of relativity?"
}
```

Response:
```json
{
  "message": "That's a fascinating question...",
  "refused": false
}
```

---

## Frontend Overview

### State Management (Redux)

The application uses Redux Toolkit for state management:

#### Auth Slice (`src/store/slices/authSlice.js`)
- `user`: Current logged-in user
- `loading`: Authentication loading state
- `error`: Authentication error messages

#### Chat Slice (`src/store/slices/chatSlice.js`)
- `figure`: Current historical figure
- `messages`: Conversation messages
- `loadingFigure`: Figure loading state
- `sending`: Message sending state
- `error`: Chat error messages

### Screens

1. **LoginScreen**: User login with email/password
2. **RegisterScreen**: New user registration
3. **HomeScreen**: Main chat interface with historical figure

### API Services

- **`src/services/api.js`**: Production API calls to Django backend
- **`src/services/mockApi.js`**: Mock API for development/testing

---

## Guardrail System

The guardrail system prevents users from discussing anachronistic topics with historical figures. It operates on two levels:

### 1. Temporal Validation
Detects years after the historical figure's death:
- Years > 1955 (Einstein's death year) are blocked
- Examples: "What happened in 2020?", "Tell me about 1985"

### 2. Keyword Filtering
Blocks modern technologies and cultural phenomena:
```
Internet, Smartphone, iPhone, Android, TikTok, Facebook,
Instagram, YouTube, Twitter, Bitcoin, Cryptocurrency,
ChatGPT, AI Assistant, Marvel, Avengers, Netflix, COVID,
Pandemic, WiFi, Laptop, Tablet, App Store
```

### Response When Blocked
When a message is refused, the historical figure responds with:
> "I must respectfully decline to discuss that topic. As Albert Einstein, who passed away in 1955, I cannot engage with events, technologies, or cultural phenomena that occurred after my time."

---

## Screenshots

### Login Screen
- Email and password fields
- "Sign In" button
- Link to registration page

### Registration Screen
- Name, email, and password fields
- "Register" button
- Link to login page

### Home Screen (Chat)
- Sidebar showing logged-in user and current chat mode
- Message feed showing conversation history
- Input form for sending new messages
- Logout button

---

## Future Enhancements

### Planned Features

1. **Multiple Historical Figures**
   - Add more historical personalities (Newton, Tesla, Marie Curie, etc.)
   - Figure selection interface

2. **Advanced AI Integration**
   - Replace simple response templates with LLM-powered responses
   - More contextual and accurate historical conversations

3. **Conversation Persistence**
   - Save chat history to database
   - Load previous conversations

4. **User Profiles**
   - User profile management
   - Chat history per user

5. **Admin Panel**
   - Manage historical figures
   - View usage statistics

6. **WebSocket Support**
   - Real-time bidirectional communication
   - Typing indicators

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Acknowledgments

- Create React App for the frontend boilerplate
- Django REST Framework for the backend API
- Redux Toolkit for state management
- Albert Einstein for the inspiration (pun intended!)

---

## Support

For support, please open an issue on the GitHub repository or contact the maintainers.

---

**Note**: The frontend currently uses a mock API (`src/services/mockApi.js`) for development. To connect to the actual Django backend, update the API calls in `src/services/api.js` to point to your backend server.

