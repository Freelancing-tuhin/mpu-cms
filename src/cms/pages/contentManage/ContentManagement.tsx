import { uniqueId } from 'lodash';
import SubLinks from 'src/cms/components/subLinks/SubLinks';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';

const ContentManagement = () => {
  const BCrumb = [{ to: '/', title: 'Home' }, { title: 'Content Management' }];

  const items = [
    {
      title: 'Pages',
      subtitle: 'Static site content',
      icon: 'fluent:document-page-24-regular',
    },
    {
      title: 'Blog Posts',
      subtitle: 'Latest articles and insights',
      icon: 'tabler:news',
    },
    {
      title: 'News Updates',
      subtitle: 'Campus and institute news',
      icon: 'material-symbols:breaking-news-alt-1',
    },
    {
      title: 'Press Releases',
      subtitle: 'Official media statements',
      icon: 'material-symbols:campaign-outline',
    },
    {
      title: 'Announcements',
      subtitle: 'Important notifications',
      icon: 'lucide:megaphone',
    },
    {
      title: 'Notices',
      subtitle: 'Student and admin notices',
      icon: 'solar:document-text-bold-duotone',
    },
  ];

  return (
    <div className="p-4">
      <BreadcrumbComp title="Content Management" items={BCrumb} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {items.map((item, idx) => (
          <SubLinks key={uniqueId()} icon={item.icon} title={item.title} subtitle={item.subtitle} />
        ))}
      </div>
    </div>
  );
};

export default ContentManagement;
