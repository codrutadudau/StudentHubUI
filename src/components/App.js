import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import axios from 'axios';
import '../assets/scss/style.scss';
import Dashboard from './Dashboard';
import Header from './Header/Header';
import HomePage from './HomePage';
import Login from './Auth/Signin';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import AdminRoute from './AdminRoute';
import Signup from './Auth/Signup';
import UserDashboard from './User/Dashboard';
import QuizDashboard from './Quiz/Dashboard';
import QuestionDashboard from './Question/Dashboard';
import UserDetails from './User/Details';
import QuizDetails from './Quiz/Details';
import QuizView from './Quiz/View';
import QuestionDetails from './Question/Details';
import AdminDashboard from './Admin/Dashboard';
import Layout from './Layout';

function App() {
    axios.interceptors.request.use(function (config) {
        const token = sessionStorage.getItem("token");
        config.headers.Authorization = `Bearer ${token}`;

        return config;
    });

    return (
        <Router>
            {/* <Header /> */}
            <Switch>
                <PublicRoute path="/" exact component={HomePage} restricted={true} />
                <PublicRoute path="/sign-in" component={Login} restricted={true} />
                <PublicRoute path="/sign-up" component={Signup} restricted={true} />
                <PrivateRoute path="/dashboard" exact component={Dashboard} layout={Layout}/>
                <PrivateRoute path="/user/:id" component={UserDetails} layout={Layout}/>
                <PrivateRoute path="/users" exact component={UserDashboard} layout={Layout}/>
                <PrivateRoute path="/quizzes" exact component={QuizDashboard} layout={Layout}/>
                <PrivateRoute path="/quizzes/create" exact component={QuizDetails} layout={Layout}/>
                <PrivateRoute path="/questions" exact component={QuestionDashboard} layout={Layout}/>
                <PrivateRoute path="/quiz/:id/view" exact component={QuizView} layout={Layout}/>
                <PrivateRoute path="/quiz/:id/:action" exact component={QuizDetails} layout={Layout}/>
                <PrivateRoute path="/questions/create" exact component={QuestionDetails} layout={Layout}/>
                <PrivateRoute path="/question/:id/:action" exact component={QuestionDetails} layout={Layout}/>
                <AdminRoute path="/admin" component={AdminDashboard} layout={Layout}/>
            </Switch>
        </Router>
    );
}

export default App;
