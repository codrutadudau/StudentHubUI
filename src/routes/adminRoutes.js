// import Dashboard from './Dashboard';
// import AdminSidebar from './Sidebar/AdminSidebar';
// import HomePage from './HomePage';
// import Login from './Auth/Signin';
// import PrivateRoute from './PrivateRoute';
// import PublicRoute from './PublicRoute';
// import AdminRoute from './AdminRoute';
// import Signup from './Auth/Signup';
import UserDashboard from '../components/User/Dashboard';
import QuizDashboard from '../components/Quiz/Dashboard';
import QuestionDashboard from '../components/Question/Dashboard';
import UserDetails from '../components/User/Details';
import QuizDetails from '../components/Quiz/Details';
import QuizView from '../components/Quiz/View';
import QuestionDetails from '../components/Question/Details';
import AdminDashboard from '../components/Admin/Dashboard';

export const adminRoutes = [
    {
        path: "/dashboard",
        exact: true,
        component: AdminDashboard,
    },
    {
        path:"/user/:id",
        exact: false,
        component: UserDetails,
    },
    {
        path:"/users",
        exact: true,
        component: UserDashboard,
    },
    {
        path:"/quizzes",
        exact: true,
        component: QuizDashboard, 
    },
    {
        path:"/quizzes/create",
        exact: true,
        component: QuizDetails, 
    },
    {
        path:"/questions",
        exact: true,
        component: QuestionDashboard, 
    },   
    {             
        path:"/quiz/:id/view",
        exact: true,
        component: QuizView,
    },
    {
        path:"/quiz/:id/:action",
        exact: true,
        component: QuizDetails,
    },
    {
        path:"/questions/create",
        exact: true,
        component: QuestionDetails,
    },
    {
        path:"/question/:id/:action",
        exact: true,
        component: QuestionDetails,
    },
];
