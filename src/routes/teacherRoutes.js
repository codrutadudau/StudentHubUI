import CourseDashboard from "../components/Course/Dashboard";
import QuizDashboard from '../components/Quiz/Dashboard';

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
];
