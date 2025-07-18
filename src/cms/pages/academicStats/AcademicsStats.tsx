import { uniqueId } from 'lodash';
import SubLinks from 'src/cms/components/subLinks/SubLinks';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';

const AcademicsStats = () => {
  const BCrumb = [{ to: '/', title: 'Home' }, { title: 'Academic Statistics' }];

  const items = [
    {
      title: 'Fact Figures',
      subtitle: 'Key institutional metrics',
      icon: 'tabler:chart-infographic',
      link: '/academic-statistics/fact-figures',
    },
    {
      title: 'Recruiters',
      subtitle: 'Top hiring partners',
      icon: 'fluent:people-community-28-regular',
      link: '/academic-statistics/recruiters',
    },
    {
      title: 'Placements',
      subtitle: 'Student placement data',
      icon: 'solar:hand-money-linear',
      link: '/academic-statistics/placements',
    },
    {
      title: 'Testimonials',
      subtitle: 'What people say about us',
      icon: 'ph:quote-duotone',
      link: '/academic-statistics/testimonial',
    },
  ];

  return (
    <div className="p-4">
      <BreadcrumbComp title="Academic Statistics" items={BCrumb} />

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

export default AcademicsStats;
