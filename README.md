# Expo Kit

A minimal, clean, mobile-first monorepo starter powered by **Expo**, **Bun**, **Hono**, **oRPC**, **Drizzle ORM**, and **BetterAuth**.

This template gives you a full-stack foundation to rapidly build cross-platform apps with a modern TypeScript workflow.

---

## 🚀 What’s Inside

### **Apps**

- **apps/mobile** — Expo app (React Native)
- **apps/server** — Bun + Hono API server

### **Packages**

- **packages/api** — oRPC router definitions
- **packages/auth** — BetterAuth shared logic
- **packages/db** — Drizzle ORM + migrations + schema

---

## 🗂 Monorepo Structure

```
expo-kit
├── apps
│   ├── mobile      # Expo app
│   └── server      # Bun + Hono server
├── packages
│   ├── api         # oRPC routers
│   ├── auth        # BetterAuth shared utils
│   └── db          # Drizzle schema & migrations
└── package.json
```

---

## 🛠 Setup

Install dependencies:

```bash
bun install
```

---

## ▶️ Development

Run **all workspaces**:

```bash
bun run dev
```

Run Expo app:

```bash
bun app
```

Run API server:

```bash
bun srv
```

Run DB utilities:

```bash
bun db
```

---

## ⚙️ Environment Variables

### **apps/server/.env**

```
DATABASE_URL=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
CORS_ORIGIN=
```

### **apps/mobile/.env**

```
EXPO_PUBLIC_SERVER_URL=
```

---

## 📦 Scripts (root)

- **dev** – run all workspaces
- **app** – run Expo app
- **srv** – run API server
- **db** – run DB package
- **lint / format / check** – hygiene tools using Biome

---

## 🧱 Tech Stack

- **Expo (React Native)**
- **Bun** runtime
- **Hono** API framework
- **tRPC** for end-to-end types
- **Drizzle ORM** + SQL migrations
- **BetterAuth** for authentication
- **Biome** for lint/format
