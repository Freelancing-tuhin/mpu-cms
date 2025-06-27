import { useEffect, useState } from 'react';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import CardBox from 'src/components/shared/CardBox';
import { getAllDownloads } from 'src/services/download';
import CreateDownloadModal from './CreateDownloadModal';
import DownloadTable from './DownloadTable';

export default function Downloads() {
  const [items, setItems] = useState<any[]>([]);
  const [searchText] = useState('');
  const [loading, setLoading] = useState(false);

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await getAllDownloads();
      setItems(res.result);
    } catch {
      console.error('Fetch error');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetch();
  }, []);

  const filtered = items.filter((i) => i.title?.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <>
      <BreadcrumbComp
        title="Downloads"
        items={[{ to: '/', title: 'Dashboard' }, { title: 'Downloads' }]}
      />
      <CardBox>
        <div className="flex justify-between items-center mb-4">
          <CreateDownloadModal refresh={fetch} />
        </div>
        <DownloadTable items={filtered} refresh={fetch} loading={loading} />
      </CardBox>
    </>
  );
}
