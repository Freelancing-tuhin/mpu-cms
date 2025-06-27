import { useEffect, useState } from 'react';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import CardBox from 'src/components/shared/CardBox';
// import CampusLifeTable from './CampusLifeTable';
// import CreateCampusLifeModal from './CreateCampusLifeModal';
import { getAllCampusLifeHighlights } from 'src/services/campus'; // <- your API service
import CreateCampusLifeModal from './CreateCampusLifeModal';
import CampusLifeTable from './CampusLifeTable';

const CampusLife = () => {
  const BCrumb = [
    { to: '/', title: 'Academics' },
    { to: '/academic-campus-info', title: 'Academic Info' },
    { title: 'Campus Life' },
  ];

  const [highlights, setHighlights] = useState<any[]>([]);
  const [totalPages] = useState(1);
  const [searchText] = useState<any>('');
  const [loading, setLoading] = useState(false);

  // Fetch highlights from API
  const getHighlights = async () => {
    try {
      setLoading(true);
      const response = await getAllCampusLifeHighlights();
      setHighlights(response.result); // assuming { result: [...] }
    } catch (error) {
      console.error('Failed to fetch campus life highlights:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHighlights();
  }, []);

  const filteredHighlights = highlights.filter((highlight) =>
    highlight.title?.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <div>
      <BreadcrumbComp title="Campus Life Highlights" items={BCrumb} />

      <CardBox>
        <div className="flex justify-between items-center mb-4">
          {/*  */}
          <CreateCampusLifeModal getHighlights={getHighlights} />
        </div>

        <CampusLifeTable
          highlights={filteredHighlights}
          totalPages={totalPages}
          getHighlights={getHighlights}
          searchText={searchText}
          loading={loading}
        />
      </CardBox>
    </div>
  );
};

export default CampusLife;
