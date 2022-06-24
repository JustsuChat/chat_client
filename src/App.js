// import { fetchUserProfile, setLogin } from 'app/globalSlice';
// import AuthPage from 'components/AuthPage';
// import Footer from 'components/Footer';
// import Header from 'components/Header';
// import NotFoundPage from 'components/NotFoundPage';
// import ProtectedRoute from 'components/ProtectedRoute';
// import Course from 'features/Courses';
import Home from "./features/Home";
import Login from "./features/Login";
// import Me from 'features/Me';
// import OnlineExam from 'features/OnlineExam';
// import PerPart from 'features/PerPart';
// import WordNote from 'features/WordNote';
// import React, { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import { fetchLevels } from './features/Levels/levelSlice';
// import './App.css';
// import Level from 'features/Levels';
// import { fetchClassOfUser } from 'features/Me/meSlice';
// import Classes from 'features/Classes';
// import Schedule from 'features/Schedule';

function App() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   dispatch(fetchLevels());
  //   if (token) {
  //     dispatch(fetchUserProfile());
  //     dispatch(fetchClassOfUser());
  //   }
  // }, []);

  return (
    <BrowserRouter>
      <div className="App">
        {/* <Header /> */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/auth" component={Login} />
        </Switch>

        {/* <Footer /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
