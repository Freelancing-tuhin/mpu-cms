import { useEffect, useState } from 'react';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import CardBox from 'src/components/shared/CardBox';
import SearchBox from 'src/components/shared/SearchBox';
import { getAllPlacements } from 'src/services/placement';
import CreatePlacementModal from './CreatePlacementModal';
import PlacementTable from './PlacementTable';

const Placement = () => {
  const [placements, setPlacements] = useState<any[]>([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);

  const BCrumb = [
    { to: '/', title: 'Academics' },
    { to: '/academic-campus-info', title: 'Academic Info' },
    { title: 'Placements' },
  ];

  const getPlacements = async () => {
    try {
      setLoading(true);
      const res = await getAllPlacements();
      setPlacements(res.result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPlacements();
  }, []);

  const filtered = placements.filter((item) =>
    item.title?.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <>
      <BreadcrumbComp title="Placements" items={BCrumb} />
      <CardBox>
        <div className="flex justify-between items-center mb-4">
          <SearchBox value={searchText} onChange={(e: any) => setSearchText(e.target.value)} />
          <CreatePlacementModal getPlacements={getPlacements} />
        </div>
        <PlacementTable placements={filtered} getPlacements={getPlacements} loading={loading} />
      </CardBox>
    </>
  );
};

export default Placement;
