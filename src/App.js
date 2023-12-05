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
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';



function App() {
  const [info, setInfo] = useState();
  const [allInfo, setAllInfo] = useState([])
  const [currentStudent, setCurrentStudent] = useState(0);

  const students = useSelector(state => state.students);

  useEffect(() => {
    console.log(students)
  }, [students])

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path='/' element={<Dashboard allInfo={allInfo} setAllInfo={setAllInfo} info={info} setInfo={setInfo} currentStudent={currentStudent} setCurrentStudent={setCurrentStudent} />} />
        <Route path='/object-user/:id' element={<AddProjectPage allInfo={allInfo} setAllInfo={setAllInfo} info={info} setInfo={setInfo} currentStudent={currentStudent} />} />
      </Route>
    )
  )

  return (
    <RouterProvider router={router} />
  );
}

export default App;
