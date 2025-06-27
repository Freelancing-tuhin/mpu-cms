// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { lazy, useContext } from 'react';
import { createBrowserRouter } from 'react-router';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import School from 'src/cms/pages/academicInfo/school/School';
import CampusLife from 'src/cms/pages/academicInfo/campus/campus';
import FactFigure from 'src/cms/pages/academicStats/factFigure';
import Recruiter from 'src/cms/pages/academicStats/recruiter';
import Placement from 'src/cms/pages/academicStats/placement';
import Testimonial from 'src/cms/pages/academicStats/testimonial';
import NewsPost from 'src/cms/pages/contentManage/newsPost';
import PressRelease from 'src/cms/pages/contentManage/pressRelease';
import Announcement from 'src/cms/pages/contentManage/accouncement';
import Notice from 'src/cms/pages/contentManage/notice';
import Login from 'src/views/authentication/auth1/Login';
import EventGallery from 'src/cms/pages/media/eventGallery';
import Carousel from 'src/cms/pages/media/carousel';
import Gallery from 'src/cms/pages/media/gallery';
import Glimpses from 'src/cms/pages/media/glimps';
import YouTube from 'src/cms/pages/media/youtube';
import AcademicHighlights from 'src/cms/pages/media/highLights';
import Downloads from 'src/cms/pages/utilsExtra/download';

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

const Router = [
  {
    path: '/login',
    element: <Login />,
  },
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
      {
        path: '/academic/CampusLife',
        exact: true,
        element: (
          <>
            <CampusLife />
          </>
        ),
      },
      {
        path: '/academic-statistics/fact-figures',
        exact: true,
        element: (
          <>
            <FactFigure />
          </>
        ),
      },
      {
        path: '/academic-statistics/recruiters',
        exact: true,
        element: (
          <>
            <Recruiter />
          </>
        ),
      },
      {
        path: '/academic-statistics/placements',
        exact: true,
        element: (
          <>
            <Placement />
          </>
        ),
      },
      {
        path: '/academic-statistics/testimonial',
        exact: true,
        element: (
          <>
            <Testimonial />
          </>
        ),
      },
      {
        path: '/content-management/news',
        exact: true,
        element: (
          <>
            <NewsPost />
          </>
        ),
      },
      {
        path: '/content-management/press',
        exact: true,
        element: (
          <>
            <PressRelease />
          </>
        ),
      },
      {
        path: '/content-management/announcements',
        exact: true,
        element: (
          <>
            <Announcement />
          </>
        ),
      },
      {
        path: '/content-management/notices',
        exact: true,
        element: (
          <>
            <Notice />
          </>
        ),
      },
      {
        path: '/media/carousel',
        exact: true,
        element: (
          <>
            <Carousel />
          </>
        ),
      },
      {
        path: '/media/event-gallery',
        exact: true,
        element: (
          <>
            <EventGallery />
          </>
        ),
      },
      {
        path: '/media/gallery',
        exact: true,
        element: (
          <>
            <Gallery />
          </>
        ),
      },
      {
        path: '/media/glimpses',
        exact: true,
        element: (
          <>
            <Glimpses />
          </>
        ),
      },
      {
        path: '/media/videos',
        exact: true,
        element: (
          <>
            <YouTube />
          </>
        ),
      },
      {
        path: '/media/highlights',
        exact: true,
        element: (
          <>
            <AcademicHighlights />
          </>
        ),
      },

      {
        path: '/utils/downloads',
        exact: true,
        element: (
          <>
            <Downloads />
          </>
        ),
      },
    ],
  },
];

const router = createBrowserRouter(Router);

export default router;
