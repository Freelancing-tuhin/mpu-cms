import { useEffect, useState } from 'react';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import CardBox from 'src/components/shared/CardBox';
import { getAllAnnouncements } from 'src/services/announcement';
import CreateAnnouncementModal from './CreateAnnouncementModal';
import AnnouncementTable from './AnnouncementTable';

const Announcement = () => {
  const [items, setItems] = useState<any[]>([]);
  const [searchText] = useState('');
  const [loading, setLoading] = useState(false);

  const crumb = [{ to: '/', title: 'Dashboard' }, { title: 'Announcements' }];

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await getAllAnnouncements();
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

  const filtered = items.filter((item) =>
    item.title?.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <>
      <BreadcrumbComp title="Announcements" items={crumb} />
      <CardBox>
        <div className="flex justify-between items-center mb-4">
          <CreateAnnouncementModal refresh={fetch} />
        </div>
        <AnnouncementTable announcements={filtered} refresh={fetch} loading={loading} />
      </CardBox>
    </>
  );
};

export default Announcement;
