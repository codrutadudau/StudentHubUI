import UserDashboard from '../components/User/Dashboard';
import QuizDashboard from '../components/Quiz/Dashboard';
import QuestionDashboard from '../components/Question/Dashboard';
import UserDetails from '../components/User/Details';
import QuizDetails from '../components/Quiz/Details';
import QuizView from '../components/Quiz/View';
import QuestionDetails from '../components/Question/Details';
import Student from '../components/Admin/Student';
import Teacher from '../components/Admin/Teacher';
import Course from '../components/Admin/Course';
import Classroom from '../components/Admin/Classroom';
import EditTeacher from '../components/Admin/EditTeacher';
import EditCourse from '../components/Admin/EditCourse';
import EditClassroom from '../components/Admin/EditClassroom';
import EditStudent from '../components/Admin/EditStudent';

export const adminRoutes = [
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
    {
        path:"/teachers",
        exact: true,
        component: Teacher,
    },
    {
        path:"/students",
        exact: true,
        component: Student,
    },
    {
        path:"/classrooms",
        exact: true,
        component: Classroom,
    },
    {
        path:"/courses",
        exact: true,
        component: Course,
    },
    {
        path:"/teachers/:id/edit",
        exact: true,
        component: EditTeacher,
    },
    {
        path:"/students/:id/edit",
        exact: true,
        component: EditStudent,
    },
    {
        path:"/classrooms/:id/edit",
        exact: true,
        component: EditClassroom,
    },
    {
        path:"/courses/:id/edit",
        exact: true,
        component: EditCourse,
    },
];
