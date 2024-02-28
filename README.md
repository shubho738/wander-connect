# WanderConnect

This project is a social media site designed for travelers, offering all the standard social media functionalities along with the ability to create travel journals. It is built using Next.js, NextAuth, Redux Toolkit, SWR, TanStack React Infinite Queries, TypeScript, SCSS modules for styling, and follows a full-stack architecture with Prisma and MongoDB for data storage.

## Features

### Full Stack Development
- **Frontend:** Built with Next.js, for efficient server-side rendering and a smooth user experience.
- **Backend:** Utilizes Next.js API routes as the backend, providing a simple and integrated way to handle API requests and responses. Uses Prisma as the ORM to interact with the MongoDB database.

### Authentication
- **NextAuth:** Authentication is implemented using NextAuth.

### Responsive Design
- **Mobile-First Approach:** Designed to be responsive from the ground up, ensuring a seamless experience across devices of all sizes.

### Performance Optimization
- **Fast and Responsive:** The site is optimized for performance, providing a fast and responsive experience for users.

### React Component-Based Architecture
- **Reusable Components:** Components are designed to be modular and reusable, promoting a consistent look and feel throughout the application. Effort has been dedicated to make the UI as reusable as possible.

### Custom Hooks
- **Reusable Logic:** Utilizes custom hooks for encapsulating and reusing logic across components, promoting code reusability and maintainability.

### Global State Management with Redux
- **Centralized State:** Uses Redux Toolkit to manage global application state, ensuring that data is consistent across all components.

### Data Fetching
- Implements various data fetching methods, including server-side data fetching and client-side data fetching with SWR.  Utilizes the `mutate` function of SWR to update data on the client side, triggering re-renders of components using that data and providing a real-time data update experience for users. This ensures that data is always up-to-date without the need for manual refreshes.

### Infinite Scrolling
- **Efficient Data Loading:** Uses `TanStack React Infinite Queries` to fetch data as the user scrolls, providing a seamless browsing experience without the need for manual pagination.

### Dark Mode
- Includes a dark mode feature.

## Installation

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Start the development server using `npm run dev`.


## Environment Variables

The following environment variables need to be set for the application to work properly:

- `DATABASE_URL`: MongoDB connection string.
- `NEXT_PUBLIC_API_URL`: URL of the API.
- `NEXTAUTH_SECRET`: Secure random string for NextAuth.
- `NEXTAUTH_JWT_SECRET`: Secure random string for JWT.

Create a `.env.local` file at the root of the project and set these variables accordingly.