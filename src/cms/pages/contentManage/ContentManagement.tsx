import { uniqueId } from 'lodash';
import SubLinks from 'src/cms/components/subLinks/SubLinks';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';

const ContentManagement = () => {
  const BCrumb = [{ to: '/', title: 'Home' }, { title: 'Content Management' }];

  const items = [
    // {
    //   title: 'Pages',
    //   subtitle: 'Static site content',
    //   icon: 'fluent:document-page-24-regular',
    //   link: '/content-management/pages',
    // },
    // {
    //   title: 'Blog Posts',
    //   subtitle: 'Latest articles and insights',
    //   icon: 'tabler:news',
    //   link: '/content-management/blog',
    // },
    {
      title: 'News Updates',
      subtitle: 'Campus and institute news',
      icon: 'material-symbols:breaking-news-alt-1',
      link: '/content-management/news',
    },
    {
      title: 'Press Releases',
      subtitle: 'Official media statements',
      icon: 'material-symbols:campaign-outline',
      link: '/content-management/press',
    },
    {
      title: 'Announcements',
      subtitle: 'Important notifications',
      icon: 'lucide:megaphone',
      link: '/content-management/announcements',
    },
    {
      title: 'Notices',
      subtitle: 'Student and admin notices',
      icon: 'solar:document-text-bold-duotone',
      link: '/content-management/notices',
    },
  ];

  return (
    <div className="p-4">
      <BreadcrumbComp title="Content Management" items={BCrumb} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {items.map((item) => (
          <SubLinks
            key={uniqueId()}
            icon={item.icon}
            title={item.title}
            subtitle={item.subtitle}
            link={item.link}
          />
        ))}
      </div>
    </div>
  );
};

export default ContentManagement;
