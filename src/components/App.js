import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../scss/style.scss';
import Dashboard from './Dashboard';
import Header from './Header';
import HomePage from './HomePage';
import Login from './Auth/Signin';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Signup from './Auth/Signup';
import QuizDashboard from './Quiz/Dashboard';
import QuestionDashboard from './Question/Dashboard';
import ProfileDetails from './Profile/Details';
import QuizDetails from './Quiz/Details';
import QuestionDetails from './Question/Details';
import AnswerDetails from './Answer/Details';

function App() {
    const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn);

    return (
        <Router>
            <Header />
            <Switch>
                <PublicRoute path="/" exact component={HomePage} restricted={true} />
                <PublicRoute path="/sign-in" component={Login} restricted={true} />
                <PublicRoute path="/sign-up" component={Signup} restricted={true} />
                <PrivateRoute path="/dashboard" exact component={Dashboard} />
                <PrivateRoute path="/profile/edit/:id" exact component={ProfileDetails} />
                <PrivateRoute path="/quizzes" exact component={QuizDashboard} />
                <PrivateRoute path="/questions" exact component={QuestionDashboard} />
                <PrivateRoute path="/quiz/:id" exact component={QuizDetails} />
                <PrivateRoute path="/question/:id" exact component={QuestionDetails} />
                <PrivateRoute path="/answer/:id" exact component={AnswerDetails} />
            </Switch>
        </Router>
    );
}

export default App;
