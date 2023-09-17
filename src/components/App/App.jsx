import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AnimePage from '../../pages/AnimePage/AnimePage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import Main from '../../pages/Main/Main';
import RegisterPage from '../../pages/RegisterPage/RegisterPage';
import Header from '../Header/Header';
import s from './app.module.css';
import ProfilePage from '../../pages/ProfilePage/ProfilePage';
import { useDispatch } from 'react-redux';
import { checkAuth } from '../../redux/entities/User/thunks/checkAuth';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch])

  return (
    <BrowserRouter>
      <div className={s.headerWrapper}>
        <Header />
      </div>
      <Routes>
        <Route path='/' element={<Main></Main>}></Route>
        <Route path='/:animeId' element={<AnimePage></AnimePage>}></Route>
        <Route path='/signup' element={<RegisterPage></RegisterPage>}></Route>
        <Route path='/signin' element={<LoginPage></LoginPage>}></Route>
        <Route path='/profile' element={<ProfilePage></ProfilePage>}></Route>
        <Route path='*' element={<div>Not found page</div>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
