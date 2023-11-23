import { createBrowserRouter } from "react-router-dom";
import UserList from "./pages/UserList";
import UserForm from "./pages/UserForm";
import { ROUTES } from "./contants";
const routes = [
  {
    path: ROUTES.HOME,
    element: <UserList />,
  },
  {
    path: ROUTES.USER_FORM,
    element: <UserForm />
  }
]

export const router = createBrowserRouter(routes);