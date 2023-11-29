import './App.css';
import "./scss/index.scss";
import "./scss/chart.scss";
import Sidebar from './components/Sidebar';
import Chart from "./components/Chart"
import Layout from './components/Layout';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Dashboard from './page/Dashboard';
import AddProjectPage from './page/AddProject';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>  
      <Route path='/' element={<Dashboard />} />
      <Route path='/object-user/:id' element={<AddProjectPage />} />
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
