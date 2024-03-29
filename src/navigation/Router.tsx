import { createBrowserRouter, Navigate } from 'react-router-dom'
import MainLayout from '../pages/layout/MainLayout'
import MonitoringPage from '../pages/monitoring/MonitoringPage'
import { DetailsServicePage } from '../pages/detailsServicePage/DetailsServicePage'
import ErrorPage from '../pages/ErrorPage/ErrorPage'
import LoginPage from '../pages/loginPage/LoginPage'
import { PasswordRecoveryPage } from '../pages/passwordRecoveryPage/PasswordRecoveryPage'
import { PasswordResetPage } from '../pages/passwordResetPage/PasswordResetPage'

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: '/monitoraggio', element: <MonitoringPage /> },
      { path: '/monitoraggio/eservice/:id', element: <DetailsServicePage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/recupero-password', element: <PasswordRecoveryPage /> },
      { path: '/ripristino-password', element: <PasswordResetPage /> },
      { path: '*', element: <ErrorPage /> },
    ],
  },
  {
    path: '/',
    element: <Navigate replace to="/monitoraggio" />,
  },
])
export { router }
