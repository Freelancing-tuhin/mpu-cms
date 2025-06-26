import { useEffect, useState } from 'react';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import CardBox from 'src/components/shared/CardBox';
import SearchBox from 'src/components/shared/SearchBox';
import { getAllNotices } from 'src/services/notice';
import CreateNoticeModal from './CreateNoticeModal';
import NoticeTable from './NoticeTable';

const Notice = () => {
  const [notices, setNotices] = useState<any[]>([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);

  const crumbs = [{ to: '/', title: 'Dashboard' }, { title: 'Notices' }];

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await getAllNotices();
      setNotices(res.result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const filtered = notices.filter((item) =>
    item.title?.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <>
      <BreadcrumbComp title="Notices" items={crumbs} />
      <CardBox>
        <div className="flex justify-between items-center mb-4">
          <SearchBox value={searchText} onChange={(e: any) => setSearchText(e.target.value)} />
          <CreateNoticeModal refresh={fetch} />
        </div>
        <NoticeTable notices={filtered} refresh={fetch} loading={loading} />
      </CardBox>
    </>
  );
};

export default Notice;
