import {createBrowserRouter} from 'react-router-dom'
import HomePage from '../pages/HomePage'
import NewTasksPage from '../pages/NewTaskPage'
import EditTaskPage from '../pages/EditTaskPage'
import RootLayout from '../layout/RootLayout'
import ErrorPage from '../pages/ErrorPage'

export const router = createBrowserRouter([

  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: '/new',
        element: <NewTasksPage />
      },
      {
        path: '/:_id',
        element: <EditTaskPage />
      }
    ]
  }
])


