import './App.css';
import "./scss/index.scss";
import "./scss/chart.scss";
import Layout from './components/Layout';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Dashboard from './page/Dashboard';
import AddProjectPage from './page/AddProject';
import RankingPage from './page/RankingPage';



function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path='/' element={<Dashboard />} />
        <Route path='/object/:id' element={<AddProjectPage />} />
        <Route path='/rank' element={<RankingPage />} />

      </Route>
    )
  )

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
