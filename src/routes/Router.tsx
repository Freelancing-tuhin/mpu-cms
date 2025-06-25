// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { lazy, useContext } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import { AuthContext } from 'src/context/authContext/AuthContext';
import School from 'src/cms/pages/academicInfo/school/School';

const AcademicInfo = Loadable(lazy(() => import('src/cms/pages/academicInfo/AcademicInfo')));
const AcademicsStats = Loadable(lazy(() => import('src/cms/pages/academicStats/AcademicsStats')));
const ContentManagement = Loadable(
  lazy(() => import('src/cms/pages/contentManage/ContentManagement')),
);
const MediaVisualContent = Loadable(lazy(() => import('src/cms/pages/media/MediaVisualContent')));
const SiteConfiguration = Loadable(
  lazy(() => import('src/cms/pages/siteConfig/SiteConfiguration')),
);
const UtilitiesExtras = Loadable(lazy(() => import('src/cms/pages/utilsExtra/UtilitiesExtras')));

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));

/* ****Pages***** */
const Dashboard1 = Loadable(lazy(() => import('../views/dashboard/Dashboard1')));
const Dashboard2 = Loadable(lazy(() => import('../views/dashboard/Dashboard2')));

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user }: any = useContext(AuthContext);
  return user ? children : <Navigate to="/auth/auth2/login" replace />;
};
const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      {
        path: '/',
        exact: true,
        element: (
          <>
            <AcademicInfo />
          </>
        ),
      },
      {
        path: '/academic-statistics',
        exact: true,
        element: (
          <>
            <AcademicsStats />
          </>
        ),
      },
      {
        path: '/content-management',
        exact: true,
        element: (
          <>
            <ContentManagement />
          </>
        ),
      },
      {
        path: '/media-visual-content',
        exact: true,
        element: (
          <>
            <MediaVisualContent />
          </>
        ),
      },
      {
        path: '/site-links',
        exact: true,
        element: (
          <>
            <SiteConfiguration />
          </>
        ),
      },
      {
        path: '/utilities-extras',
        exact: true,
        element: (
          <>
            <UtilitiesExtras />
          </>
        ),
      },
    ],
  },
  {
    path: '/',
    element: <FullLayout />,
    children: [
      {
        path: '/academic/school',
        exact: true,
        element: (
          <>
            <School />
          </>
        ),
      },
    ],
  },
];

const router = createBrowserRouter(Router);

export default router;
