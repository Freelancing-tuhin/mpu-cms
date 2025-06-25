import { uniqueId } from 'lodash';
import SubLinks from 'src/cms/components/subLinks/SubLinks';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';

const UtilitiesExtras = () => {
  const BCrumb = [{ to: '/', title: 'Home' }, { title: 'Utilities & Extras' }];

  const items = [
    {
      title: 'Highlights',
      subtitle: 'Campus & academic highlights',
      icon: 'mdi:star-circle-outline',
    },
    {
      title: 'Downloads',
      subtitle: 'Syllabus, schemes & PDFs',
      icon: 'mdi:file-download-outline',
    },
    {
      title: 'Pop-Ups',
      subtitle: 'Homepage popup modals',
      icon: 'tabler:popup',
    },
    {
      title: 'Quick Links',
      subtitle: 'Fast access to key pages',
      icon: 'carbon:link',
    },
  ];

  return (
    <div className="p-4">
      <BreadcrumbComp title="Utilities & Extras" items={BCrumb} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {items.map((item, idx) => (
          <SubLinks key={uniqueId()} icon={item.icon} title={item.title} subtitle={item.subtitle} />
        ))}
      </div>
    </div>
  );
};

export default UtilitiesExtras;
