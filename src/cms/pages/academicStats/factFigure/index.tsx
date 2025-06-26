import { useEffect, useState } from 'react';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import CardBox from 'src/components/shared/CardBox';
import SearchBox from 'src/components/shared/SearchBox';
import { getAllFactFigures } from 'src/services/factFigure';
import CreateFactFigureModal from './CreateFactFigureModal';
import FactFigureTable from './FactFigureTable';

const FactFigure = () => {
  const [factFigures, setFactFigures] = useState<any[]>([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);

  const BCrumb = [
    { to: '/', title: 'Academics' },
    { to: '/academic-campus-info', title: 'Academic Info' },
    { title: 'Fact & Figures' },
  ];

  const getFactFigures = async () => {
    try {
      setLoading(true);
      const res = await getAllFactFigures();
      setFactFigures(res.result);
    } catch (error) {
      console.error('Error fetching:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFactFigures();
  }, []);

  const filtered = factFigures.filter((item) =>
    item.caption?.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <>
      <BreadcrumbComp title="Fact & Figures" items={BCrumb} />
      <CardBox>
        <div className="flex justify-between items-center mb-4">
          <SearchBox value={searchText} onChange={(e: any) => setSearchText(e.target.value)} />
          <CreateFactFigureModal getFactFigures={getFactFigures} />
        </div>
        <FactFigureTable
          factFigures={filtered}
          getFactFigures={getFactFigures}
          searchText={searchText}
        />
      </CardBox>
    </>
  );
};

export default FactFigure;
