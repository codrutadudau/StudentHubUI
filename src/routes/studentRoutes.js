import ClassroomDashboard from '../components/Student/Classroom';
import QuizzesDashboard from '../components/Student/Quizzes';
import QuizAttempt from '../components/Student/QuizAttempt';

export const studentRoutes = [
    {
        path:"/classroom",
        exact: true,
        component: ClassroomDashboard,
    },
    {
        path:"/quizzes",
        exact: true,
        component: QuizzesDashboard,
    },
    {
        path:"/quizzes/:id/take",
        exact: true,
        component: QuizAttempt,
    },
];
