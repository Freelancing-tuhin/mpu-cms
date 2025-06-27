import { useEffect, useState } from 'react';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import CardBox from 'src/components/shared/CardBox';
import { getAllRecruiters } from 'src/services/recruiter';
import CreateRecruiterModal from './CreateRecruiterModal';
import RecruiterTable from './RecruiterTable';

const Recruiter = () => {
  const [recruiters, setRecruiters] = useState<any[]>([]);
  const [searchText] = useState('');
  const [loading, setLoading] = useState(false);

  const BCrumb = [
    { to: '/', title: 'Academics' },
    { to: '/academic-campus-info', title: 'Academic Info' },
    { title: 'Recruiters' },
  ];

  const getRecruiters = async () => {
    try {
      setLoading(true);
      const res = await getAllRecruiters();
      setRecruiters(res.result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRecruiters();
  }, []);

  const filtered = recruiters.filter((item) =>
    item.title?.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <>
      <BreadcrumbComp title="Recruiters" items={BCrumb} />
      <CardBox>
        <div className="flex justify-between items-center mb-4">
          <CreateRecruiterModal getRecruiters={getRecruiters} />
        </div>
        <RecruiterTable recruiters={filtered} getRecruiters={getRecruiters} loading={loading} />
      </CardBox>
    </>
  );
};

export default Recruiter;
