import { useEffect, useState } from 'react';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import CardBox from 'src/components/shared/CardBox';
import SearchBox from 'src/components/shared/SearchBox';
import SchoolTable from './SchoolTable';
import CreateSchoolModal from './CreateSchoolModal';
import { getAllSchools } from 'src/services/school';

const School = () => {
  const BCrumb = [
    { to: '/', title: 'Academics' },
    { to: '/academic-campus-info', title: 'Academic Info' },
    { title: 'School' },
  ];

  const [schools, setSchools] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch all schools from API
  const getSchools = async () => {
    try {
      setLoading(true);
      const response = await getAllSchools();
      setSchools(response.result); // assuming response = { result: [...] }
    } catch (error) {
      console.error('Failed to fetch schools:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSchools();
  }, []);

  // Search filter (client-side)
  const filteredSchools = schools.filter((school) =>
    school.title?.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <div>
      <BreadcrumbComp title="School" items={BCrumb} />

      <CardBox>
        <div className="flex justify-between items-center mb-4">
          <SearchBox value={searchText} onChange={(e: any) => setSearchText(e.target.value)} />
          <CreateSchoolModal getSchools={getSchools} />
        </div>

        <SchoolTable
          schools={filteredSchools}
          totalPages={totalPages}
          getSchools={getSchools}
          searchText={searchText}
          loading={loading}
        />
      </CardBox>
    </div>
  );
};

export default School;
