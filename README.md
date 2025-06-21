# Chat App

A full-stack real-time chat application with image sharing, user authentication, and online status, built with React (Vite), Express, MongoDB, Socket.io, and Cloudinary.

## Features

- User authentication (sign up, login, logout)
- Real-time messaging with Socket.io
- Image sharing in chat
- Online users indicator
- Profile management (avatar upload)
- Theme customization (DaisyUI themes)
- Responsive UI

## Tech Stack

- **Frontend:** React, Vite, Zustand, DaisyUI, Tailwind CSS, React Router, Socket.io-client
- **Backend:** Node.js, Express, MongoDB (Mongoose), Socket.io, Cloudinary, JWT, bcryptjs
- **Deployment:** Vercel (frontend), Railway (backend, or Vercel serverless functions)

## Project Structure

```
.
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── lib/
│   ├── config/
│   ├── middleware/
│   ├── seeds/
│   ├── .env
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB database (Atlas or local)
- Cloudinary account (for image uploads)

### Environment Variables

Create a `.env` file in `backend/`:

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV=development
```

### Installation

1. **Clone the repo:**

   ```sh
   git clone https://github.com/your-username/chat-app.git
   cd chat-app
   ```

2. **Install dependencies:**

   ```sh
   npm install
   cd backend && npm install
   cd ../frontend && npm install
   ```

3. **Seed the database (optional):**
   ```sh
   cd backend
   node seeds/user.seed.js
   ```

### Running Locally

**Backend:**

```sh
cd backend
npm run dev
```

**Frontend:**

```sh
cd frontend
npm run dev
```

Frontend runs on [http://localhost:5173](http://localhost:5173)  
Backend runs on [http://localhost:3000](http://localhost:3000)

## Deployment

### Vercel (Frontend)

1. Push your code to GitHub.
2. Import the `frontend/` directory in Vercel as a project.
3. Set the build command to `npm run build` and output directory to `dist`.
4. Set environment variables for the backend API URL if needed.
5. Deploy!

### Railway or Vercel (Backend)

- Deploy the backend to [Railway](https://railway.app/) or as Vercel serverless functions.
- Update the frontend [`axiosInstance`](frontend/src/lib/axios.js) `baseURL` to point to your deployed backend.

## License

[ISC](LICENSE)

---

**Made with ❤️ by Bashar Mohamed**
