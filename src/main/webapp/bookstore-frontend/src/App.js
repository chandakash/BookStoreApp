import React from 'react'
import NavigationBar from './components/NavigationBar'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Book from './pages/Book'
import Welcome from './pages/Welcome'
import BookList from './pages/BookList'
const App = () => {
    return (
        <div>
            <NavigationBar/>
            <Routes>
                <Route path='/' element ={<Welcome/>}/>
                <Route path='/book' element={<Book/>}/>
                <Route path='/booklist' element={<BookList/>}/>
            </Routes>
        </div>
    )
}

export default App
