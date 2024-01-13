import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Dashboard from './screens/Home/Dashboard.jsx'
import Quizzes from './screens/Quizzes.jsx'
import Help from './screens/Help.jsx'
import Feedback from './screens/Feedback.jsx'
import Trash from './screens/Trash.jsx'
import Layout from './Layout.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='/home' element={<Dashboard/>}></Route>
      <Route path='/quizzes' element={<Quizzes/>}></Route>
      <Route path='/help' element={<Help/>}></Route>
      <Route path='/feedback' element={<Feedback/>} ></Route>
      <Route path='/trash' element={<Trash/>}></Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
