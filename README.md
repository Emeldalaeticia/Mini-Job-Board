<<<<<<< HEAD
# Mini-Job-Board
=======
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
<<<<<<< HEAD
>>>>>>> d9fe23d (initial commit)
=======
>>>>>>> d9fe23d (initial commit)

Remote Jobs Board READ.MD

A React-based job board application that displays remote job listings from the Remotive API, with filtering capabilities.



 Features

- Browse remote jobs from various categories
- Filter by job type, category, and location
- Search job titles and descriptions
- View detailed job information
- Responsive design for all devices

Technologies Used

- React.js
-Typescript
- shadcn/ui (Tailwind CSS components)
- Remotive API
- Vite (build tool)

Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher) or yarn
- Git

 Local Setup Instructions

 1. Clone the Repository

```bash
git clone https://github.com/your-username/remote-jobs-board.git
cd remote-jobs-board

2. Install Dependencies

npm install
# or
yarn install

3. Environment Setup
Create a .env file in the root directory with the following content:

env

VITE_API_BASE_URL=https://remotive.com/api/remote-jobs

4. Run the Development Server

npm run dev
# or
yarn dev
The application will be available at http://localhost:5173

5. Build for Production
npm run build
# or
yarn build

Project Structure

remote-jobs-board/
├── public/               # Static files
├── src/
│   ├── components/       # Reusable components
│   ├── services/         # API service layer
│   ├── App.jsx           # Main application component
│   └── main.jsx          # Application entry point
├── .env                  # Environment variables
├── vite.config.js        # Vite configuration
└── package.json          # Project dependencies

Available Scripts
dev: Runs the app in development mode

build: Builds the app for production

preview: Locally preview production build

lint: Runs ESLint

format: Formats code with Prettier
>>>>>>> ee4c3d1baa8ba5e21e8ec01c36de172134dd42f5
