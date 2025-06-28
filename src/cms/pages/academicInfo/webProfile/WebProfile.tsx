import CardBox from 'src/components/shared/CardBox';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import WebProfileForm from './Form';

const WebProfile = () => {
  const BCrumb = [
    { to: '/', title: 'Academics' },
    { to: '/academic-campus-info', title: 'Web Profile' },
    { title: 'Web Profile' },
  ];

  return (
    <div>
      <BreadcrumbComp title="School" items={BCrumb} />
      <WebProfileForm />
    </div>
  );
};

export default WebProfile;
