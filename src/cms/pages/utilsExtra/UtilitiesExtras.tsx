import { link } from 'fs';
import { uniqueId } from 'lodash';
import SubLinks from 'src/cms/components/subLinks/SubLinks';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';

const UtilitiesExtras = () => {
  const BCrumb = [{ to: '/', title: 'Home' }, { title: 'Utilities & Extras' }];

  const items = [
    {
      title: 'Downloads',
      subtitle: 'Syllabus, schemes & PDFs',
      icon: 'mdi:file-download-outline',
      link: '/utils/downloads',
    },
    {
      title: 'Pop-Ups',
      subtitle: 'Homepage popup modals',
      icon: 'tabler:popup',
      link: '/utils/popups',
    },
    {
      title: 'Quick Links',
      subtitle: 'Fast access to key pages',
      icon: 'carbon:link',
      link: '/utils/quick-links',
    },
  ];

  return (
    <div className="p-4">
      <BreadcrumbComp title="Utilities & Extras" items={BCrumb} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {items.map((item) => (
          <SubLinks
            key={uniqueId()}
            icon={item.icon}
            title={item.title}
            subtitle={item.subtitle}
            link={item?.link}
          />
        ))}
      </div>
    </div>
  );
};

export default UtilitiesExtras;
