import HomePage from '../components/HomePage';
import Signin from '../components/Auth/Signin';
import Signup from '../components/Auth/Signup';

export const publicRoutes = [
    {
        path: "/",
        exact: true,
        component: HomePage,
        restricted: true,
    },
    {
        path: "/sign-in",
        exact: false,
        component: Signin,
        restricted: true,
    },
    {
        path:"/sign-up",
        exact: false,
        component: Signup,
        restricted: true,
    },
];