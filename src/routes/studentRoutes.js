import ClassroomDashboard from '../components/Student/Classroom';
import QuizzesDashboard from '../components/Student/Quizzes';
import QuizAttempt from '../components/Student/QuizAttempt';
import QuizReview from '../components/Student/QuizReview';

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
    {
        path:"/quizzes/:id/view",
        exact: true,
        component: QuizReview,
    },
];
