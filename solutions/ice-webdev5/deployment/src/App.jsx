
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import SiteLayout from './components/SiteLayout'
import Home from './components/Home'
import MyWork from './components/MyWork'

function App() {
  return <HashRouter>
    <Routes>
      <Route path='/' element={<SiteLayout/>}>
        <Route index element={<Home/>}></Route>
        <Route path='my-work' element={<MyWork/>}></Route>
      </Route>
    </Routes>
  </HashRouter>
}

export default App
