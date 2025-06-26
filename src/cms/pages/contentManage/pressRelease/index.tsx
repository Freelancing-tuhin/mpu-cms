import { useEffect, useState } from 'react';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import CardBox from 'src/components/shared/CardBox';
import SearchBox from 'src/components/shared/SearchBox';
import { getAllPressReleases } from 'src/services/pressRelease';
import CreatePressReleaseModal from './CreatePressReleaseModal';
import PressReleaseTable from './PressReleaseTable';

const PressRelease = () => {
  const [releases, setReleases] = useState<any[]>([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);

  const crumbs = [{ to: '/', title: 'Dashboard' }, { title: 'Press Releases' }];

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await getAllPressReleases();
      setReleases(res.result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const filtered = releases.filter((r) =>
    r.title?.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <>
      <BreadcrumbComp title="Press Releases" items={crumbs} />
      <CardBox>
        <div className="flex justify-between items-center mb-4">
          <SearchBox value={searchText} onChange={(e: any) => setSearchText(e.target.value)} />
          <CreatePressReleaseModal refresh={fetch} />
        </div>
        <PressReleaseTable releases={filtered} refresh={fetch} loading={loading} />
      </CardBox>
    </>
  );
};

export default PressRelease;
