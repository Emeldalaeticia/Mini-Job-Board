import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Addjob from './components/Addjob';
import JobDetailsModal from './components/JobDetailsModal';


const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/addjob',
    element: <Addjob />,
  },
  {
    path: '/jobdetails',
    element: <JobDetailsModal />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>
);
