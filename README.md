# FAQ Management System

A full-stack application for managing FAQs with multi-language support, rich text editing, and real-time translation capabilities.

---
## Backend APIs
```bash
# Fetch FAQs in English (default)
curl https://faq-management-system-backend.onrender.com/api/faqs/

# Fetch FAQs in Hindi
curl https://faq-management-system-backend.onrender.com/api/faqs?lang=hi

# Fetch FAQs in Bengali
curl https://faq-management-system-backend.onrender.com/api/faqs?lang=bn
```

---

## Features
- *Multi-language Support*: FAQs available in English, Hindi, and Bengali.
- *WYSIWYG Editor*: Rich text editing using CKEditor.
- *Real-time Translation*: Auto-translation via Google Translate API.
- *CRUD Operations*: Create, Read, Update, Delete FAQs.
- *Admin Interface*: User-friendly dashboard for managing content.

---

### Assumption
- The editor will always edit the FAQs in English Language.
---

## Technologies Used

### Frontend
- React.js
- CKEditor 5 (with Premium Features)
- React Router (Navigation)

### Backend
- Node.js
- Express.js
- MongoDB (Database)
- Mongoose (ORM)
- Google Cloud Translation API

---

## Installation

### Prerequisites
- Node.js (v18+)
- MongoDB (v6+)
- Google Cloud Project (for Translation API)

### Steps

#### Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
    

3. Install Dependencies
    ```bash
    npm install
    ```
    

4. Create a .env file. (See [Configuration](#Configuration))

5. Start the Server
    ```bash
    npm Start
    ```
    

#### Frontend Setup
1. Navigate to the Frontend Folder
    ```bash
    cd frontend
    ```
    
    
2. Install Dependencies
    ```bash
    npm install
    ```
    

3. Create a .env file (See [Configuration](#Configuration))
4. Start the application
    ```bash
    npm Start
    ```
    

## Configuration

### Backend (.env)
```bash
env
MONGODB_URI= MONGO DB URI
PORT=8000
GOOGLE_API_KEY=your-google-api_key 
```



### Frontend (.env)
```bash
env
KEY=
```


## Folder Structure


```bash
faq-system/
├── backend/
│   ├── models/        # MongoDB schemas
│   ├── routes/        # API endpoints
│   ├── services/      # Translation/caching logic
│   ├── app.js         # Server setup
│   ├── .env           # Environment variables
│
├── frontend/
│   ├── public/        # Static assets
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── App.js       # Root component
│   │   ├── index.js     # Entry point
│   ├── .env           # Frontend config
```
## Contributing
1. Fork the Repository
2. Create a feature branch:
    ```bash
    git checkout -b feat/new-feature
    ```
3. Submit a pull request
