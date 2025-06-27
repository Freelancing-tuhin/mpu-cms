import { useEffect, useState } from 'react';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import CardBox from 'src/components/shared/CardBox';
import SearchBox from 'src/components/shared/SearchBox';
import { getAllGlimpses } from 'src/services/glimpses';
import CreateGlimpsesModal from './CreateGlimpsesModal';
import GlimpsesTable from './GlimpsesTable';

const Glimpses = () => {
  const [items, setItems] = useState<any[]>([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);

  const crumbs = [{ to: '/', title: 'Dashboard' }, { title: 'Glimpses' }];

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await getAllGlimpses();
      setItems(res.result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const filtered = items.filter((i) => i.title?.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <>
      <BreadcrumbComp title="Glimpses" items={crumbs} />
      <CardBox>
        <div className="flex justify-between items-center mb-4">
          <SearchBox value={searchText} onChange={(e: any) => setSearchText(e.target.value)} />
          <CreateGlimpsesModal refresh={fetch} />
        </div>
        <GlimpsesTable items={filtered} refresh={fetch} loading={loading} />
      </CardBox>
    </>
  );
};

export default Glimpses;
