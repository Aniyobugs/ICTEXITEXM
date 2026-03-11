# Backend (Express + MongoDB)

Setup:

1. Install dependencies

```bash
cd BACKEND
npm install
```

2. Create `.env` from `.env.example` and set `MONGO_URI`, `SESSION_SECRET` and `CLIENT_URL`.

3. Run server

```bash
npm run dev
```

API endpoints (session-based auth):

- `POST /api/auth/register` { name, email, password, confirmPassword }
- `POST /api/auth/login` { email, password }
- `POST /api/auth/logout`
- `GET /api/auth/me`

- `GET /api/tasks` (protected)
- `POST /api/tasks` (protected)
- `GET /api/tasks/:id` (protected)
- `PUT /api/tasks/:id` (protected)
- `DELETE /api/tasks/:id` (protected)

Sessions are stored in MongoDB using `connect-mongo`.

## Deployment notes

- When the frontend is hosted on a different origin, set `CLIENT_URL` to
  the frontend's full URL (e.g. `https://ictexitexm.vercel.app`).
- In production the session cookie uses `SameSite=None` so that it can be
  included on cross-origin requests. Browsers require `secure` cookies
  when `SameSite=None`, so both backend and frontend must be served over HTTPS.
