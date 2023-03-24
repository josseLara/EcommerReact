import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Layout from './components/Layout';
import ProductDescription from './Page/ProductDescription';
import Favorites from './Page/Favorites';
import Profile from './Page/Profile';
import Cart from './Page/Cart';
import Login from './Page/Login';
import SignUp from './Page/SignUp';
import Home from './Page/Home';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { getTokenSave } from './services/auth';
import { setProfile } from './features/user/userSlice';

function App() {
  let profile = useSelector((state: RootState) => state.user);
  let dispatch = useDispatch();

  if (!profile.profileGoogle.change) {
    getTokenSave(dispatch, setProfile)

  }
  return (
    <BrowserRouter>
      <Routes>
        {/* login */}
        <Route
          path="/"
          element={
            <Login />
          } />
        {/* home */}
        <Route
          path="/home"
          element={
            profile.profileGoogle.change ?
            <Layout>
              <Home />
            </Layout>:<Login/>
          } />
        {/* Productos Descuento */}
        <Route
          path="/description"
          element={
            profile.profileGoogle.change ?
            <Layout>
              <ProductDescription />
            </Layout>:
            <Login/>
          } />
        {/* favorites */}
        <Route
          path="/favorites"
          element={
                profile.profileGoogle.change ?
                  <Layout><Favorites /></Layout> :
                  <Login />
          }
        />
        <Route
          path="/profile"
          element={
            profile.profileGoogle.change ?
            <Layout>
              <Profile />
            </Layout>: <Login/>
          }
        />
        <Route
          path="/cart"
          element={
            profile.profileGoogle.change ?
            <Layout>
              <Cart />
            </Layout>:
            <Login/>
          }
        />
        <Route
          path="/signUp"
          element={
            <SignUp />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
