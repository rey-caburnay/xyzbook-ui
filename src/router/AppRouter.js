import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import AddBook from '../components/AddBook';
import BooksList from '../components/BooksList';
import BookMgt from '../components/BooksMgt'
import BookDtls from '../components/BookDtls';
import Authors from '../components/Authors';
import Publishers from '../components/Publishers';
import EditBook from '../components/EditBook';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <section className='page-section mt-10' >
        <div className="container-flex">
          <Routes>
            <Route element={<BooksList/>} path="/" exact={"true"}/>
            <Route element={<BooksList/>} path="/books"/>
         
            <Route element={<AddBook/>} path="/add"  />
            <Route element={<EditBook/>} path="/edit/:id"  />
           
            <Route element={<BookMgt/>} path="/bookmgt"  />
            <Route element={<BookDtls/>} path="/book/:id"  />
            <Route element={<Authors/>} path="/authors"  />
            <Route element={<Publishers/>} path="/publishers"  />

         
       
          </Routes>
        </div>
        </section>
  
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;