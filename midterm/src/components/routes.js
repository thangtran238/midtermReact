import AddPage from "./AddPage";
import AdminPage from "./AdminPage";
import UpdatePage from "./UpdatePage";

export const routes = [
  {
    path: '/',
    element: <AdminPage />,
    index : true
  },
  {
    path: '/add',
    element: <AddPage />,
    index : false
  },
  {
    path: '/update/:id',
    element: <UpdatePage />,
    index: false
  }
]