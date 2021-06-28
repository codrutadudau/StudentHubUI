import CourseDashboard from "../components/Course/Dashboard";
import QuizDashboard from '../components/Quiz/Dashboard';
import QuizDetails from '../components/Quiz/Details';
import QuizView from '../components/Quiz/View';
import QuestionDetails from '../components/Question/Details';
import QuestionDashboard from '../components/Question/Dashboard';
import QuizReview from '../components/Student/QuizReview';

export const teacherRoutes = [
    {
        path:"/courses",
        exact: true,
        component: CourseDashboard,
    },
    {
        path:"/quizzes",
        exact: true,
        component: QuizDashboard, 
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
        path:"/quizzes/create",
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
    {
        path:"/questions",
        exact: true,
        component: QuestionDashboard,
    },
    {
        path:"/quizzes/:id/view",
        exact: true,
        component: QuizReview,
    },
];
