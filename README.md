# MiniBlog

A minimal React + TypeScript blogging platform where users can create, view, and manage posts. Supports public browsing and authenticated author workflows.

## Table of Contents

- [MiniBlog](#miniblog)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Tech Stack](#tech-stack)
  - [Features](#features)
  - [Screenshots](#screenshots)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Available Scripts](#available-scripts)
  - [Project Structure](#project-structure)
  - [Configuration](#configuration)
  - [Data Model](#data-model)
  - [Decisions \& Notes](#decisions--notes)
  - [Future Improvements](#future-improvements)

## Description

MiniBlog provides a lightweight interface to publish and manage blog posts. Guests can read posts; authenticated users can create, edit, and delete their own content. Built to demonstrate a clean React + TypeScript component architecture with routing, form handling, and basic state management.

## Tech Stack

- React (with functional components + hooks)
- TypeScript
- React Router
- TailwindCSS
- Tooling: Node.js, npm / yarn
- Firebase

## Features

Public:

- Browse all published posts (image, title, author, tags, preview)
- View full post detail
- About page

Authenticated:

- Create post (title, image URL, body, comma-separated tags)
- Edit own posts
- Delete own posts
- Dashboard listing only user’s posts
- Logout

General:

- Tag parsing / normalization
- Basic form validation feedback
- Navigation adapts to auth state

## Screenshots

(Add images or animated GIFs here: /screenshots/home.png, /screenshots/dashboard.png)

## Installation

Prerequisites:

- Node.js (LTS recommended)
- npm or yarn

Clone and install:

```bash
git clone https://github.com/your-username/miniblog.git
cd miniblog
npm install
```

## Usage

Development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build (if configured):

```bash
npm run preview
```

Run tests (if added):

```bash
npm test
```

## Available Scripts

Adjust to match package.json.

- dev: Run local dev server with hot reload
- build: TypeScript + bundler production build
- lint: Run linter (add if configured)
- test: Run unit tests (add if configured)

## Project Structure

```
/src
  /components
  /pages
  /hooks
  /contexts
  /services (API / auth helpers)
  /types
  main.tsx / index.tsx
```

(Adjust based on actual layout.)

## Configuration

Environment variables (example if using Firebase—replace with actual):

```
VITE_SCANNER_API_KEY=''
VITE_SCANNER_AUTH_DOMAIN=''
VITE_SCANNER_PROJECT_ID=''
VITE_SCANNER_STORAGE_BUCKET=''
VITE_SCANNER_MESSAGING_SENDER_ID=''
VITE_SCANNER_APP_ID=''
```

Steps:

1. Copy `.env.example` to `.env.development`
2. Fill values (never commit secrets)
3. Restart dev server after changes

Example `.env.example`:

```
VITE_API_BASE_URL=https://api.example.com
```

Tag Handling:

- User enters comma or space separated tags
- Normalized to lowercase, trimmed, deduplicated

## Data Model

Example Post shape (TypeScript):

```ts
export interface Post {
	id: string
	title: string
	imageUrl: string
	body: string
	tags: string[]
	authorId: string
	authorName: string
	createdAt: string
	updatedAt?: string
}
```

## Decisions & Notes

- Functional components with hooks for simplicity
- Separation of UI (components) vs feature pages
- Minimal global state; scoped state where possible
- Explicit types to reduce runtime errors

## Future Improvements

- Full-text search
- Tag filtering page
- Pagination or infinite scroll
- Rich text or markdown editor
- Draft vs published status
- Accessibility audit improvements
- Unit + integration tests
- Dark mode toggle
