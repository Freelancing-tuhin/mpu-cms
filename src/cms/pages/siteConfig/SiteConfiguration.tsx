import { uniqueId } from 'lodash';
import SubLinks from 'src/cms/components/subLinks/SubLinks';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';

const SiteConfiguration = () => {
  const BCrumb = [{ to: '/', title: 'Home' }, { title: 'Site Configuration' }];

  const items = [
    {
      title: 'Main Menu',
      subtitle: 'Control primary navigation',
      icon: 'mdi:menu',
    },
    {
      title: 'Header Links',
      subtitle: 'Quick links in top bar',
      icon: 'ph:link-simple-bold',
    },
    {
      title: 'Sidebar Menus',
      subtitle: 'Left side navigation controls',
      icon: 'fluent:panel-left-text-24-regular',
    },
    {
      title: 'Footer Links',
      subtitle: 'Bottom navigation links',
      icon: 'ic:round-footer',
    },
    {
      title: 'Footer Info',
      subtitle: 'Institutional info in footer',
      icon: 'material-symbols:info-outline-rounded',
    },
    {
      title: 'Settings',
      subtitle: 'Global site configuration',
      icon: 'solar:settings-bold-duotone',
    },
  ];

  return (
    <div className="p-4">
      <BreadcrumbComp title="Site Configuration" items={BCrumb} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {items.map((item, idx) => (
          <SubLinks key={uniqueId()} icon={item.icon} title={item.title} subtitle={item.subtitle} />
        ))}
      </div>
    </div>
  );
};

export default SiteConfiguration;
