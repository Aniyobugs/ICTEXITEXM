# Frontend (React + Vite)

> **Cookie policy:** the backend sets a `sid` session cookie with
> `SameSite=None` and `secure=true` in production so it can be sent from the
> Vercel domain to the Render domain.  Make sure `VITE_API_BASE_URL` points to
> the backend origin and both sites use HTTPS.


Setup:

1. Install dependencies

```bash
cd FRONTEND
npm install
```

2. Create a `.env` file (you can copy from `.env.example` below) and set `VITE_API_BASE_URL` to the address of your backend if it is not running on the default `http://localhost:5000`.

   ```
   # FRONTEND/.env.example
   VITE_API_BASE_URL=https://your-backend.example.com
   ```

   > **Deployment tip:** On platforms like Vercel or Render, set `VITE_API_BASE_URL` in the project’s Environment Variables/Settings page. Vite will replace `import.meta.env.VITE_API_BASE_URL` at build time with the value you provide.

3. Run dev server

```bash
npm run dev
```

The app includes routes for `/register`, `/login` and `/dashboard`.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
