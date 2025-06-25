import SubLinks from 'src/cms/components/subLinks/SubLinks';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';

const AcademicInfo = () => {
  const BCrumb = [{ to: '/', title: 'Home' }, { title: 'Academics' }];

  const items = [
    {
      title: 'Schools',
      subtitle: 'Manage school information',
      icon: 'solar:buildings-bold-duotone', // 🏫 clean institution icon
      link: '/academic/school',
    },
    {
      title: 'Campus Life',
      subtitle: 'Explore campus activities',
      icon: 'ph:tree-duotone', // 🌳 modern campus/culture icon
      link: '/academic/campus-life',
    },
    {
      title: 'Admissions',
      subtitle: 'Handle admission process',
      icon: 'material-symbols:school-rounded', // 🎓 premium education icon
      link: '/academic/admissions',
    },
    {
      title: 'Web-Profile',
      subtitle: 'Edit public institute profile',
      icon: 'tabler:world-www', // 🌐 clean web icon
      link: '/academic/web-profile',
    },
  ];

  return (
    <div className="p-4">
      <BreadcrumbComp title="Academics" items={BCrumb} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {items.map((item, idx) => (
          <SubLinks
            key={idx}
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

export default AcademicInfo;
