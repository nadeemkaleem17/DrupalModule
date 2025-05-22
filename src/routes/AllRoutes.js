import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AddBookPage, AddPage, BookDetail, BooksList, HomePage, LoginPage } from '../pages'
import SignupPage from '../pages/SignupPage/SignupPage'
import TemplatesPage from '../pages/Templates/TemplatesPage'
import { SharedBooks } from '../pages/SharedBooks/SharedBooks'
import {ProtectedRoute} from "./ProtectedRoutes"
export const AllRoutes = () => {
  return (
    <>
    <Routes>
        <Route path = "/" element = {<HomePage/>}/>
        <Route path="books" element={<ProtectedRoute><BooksList /> </ProtectedRoute>} />
        <Route path="shared-books" element={<SharedBooks />} />
        <Route path="add-page" element={<AddPage/>} />

        <Route path="/books/edit/:id" element={<AddBookPage />} />
        <Route path="books/:id" element={<BookDetail />} />
        <Route path = "/login" element = {<LoginPage/>}/>
        <Route path = "/register" element = {<SignupPage/>}/>
        <Route path = "/templates" element = {<TemplatesPage/>}/>

    </Routes>
    </>
  )
}
