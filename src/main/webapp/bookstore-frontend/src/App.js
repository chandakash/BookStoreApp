import React from 'react'
import NavigationBar from './components/NavigationBar'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Welcome from './pages/Welcome'
import BookList from './pages/BookList'
import UserList from './pages/UserList'
const App = () => {
    return (
        <div>
            <NavigationBar/>
            <Routes>
                <Route path='/' element ={<Welcome/>}/>
                <Route path='/userlist' element={<UserList/>}/>
                <Route path='/booklist' element={<BookList/>}/>
            </Routes>
        </div>
    )
}

export default App
