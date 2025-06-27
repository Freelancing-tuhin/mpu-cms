import { useEffect, useState } from 'react';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import CardBox from 'src/components/shared/CardBox';
import SearchBox from 'src/components/shared/SearchBox';
import { getAllYouTube } from 'src/services/youtube';
import CreateYouTubeModal from './CreateYouTubeModal';
import YouTubeTable from './YouTubeTable';

const YouTube = () => {
  const [items, setItems] = useState<any[]>([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);

  const crumbs = [{ to: '/', title: 'Dashboard' }, { title: 'YouTube Videos' }];

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await getAllYouTube();
      setItems(res.result);
    } catch {
      console.error('Failed fetch');
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
      <BreadcrumbComp title="YouTube Videos" items={crumbs} />
      <CardBox>
        <div className="flex justify-between items-center mb-4">
          <SearchBox value={searchText} onChange={(e: any) => setSearchText(e.target.value)} />
          <CreateYouTubeModal refresh={fetch} />
        </div>
        <YouTubeTable items={filtered} refresh={fetch} loading={loading} />
      </CardBox>
    </>
  );
};

export default YouTube;
