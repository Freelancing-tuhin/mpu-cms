import { useEffect, useState } from 'react';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import CardBox from 'src/components/shared/CardBox';
import { getAllEventGalleries } from 'src/services/eventGallery';
import CreateEventGalleryModal from './CreateEventGalleryModal';
import EventGalleryTable from './EventGalleryTable';

const EventGallery = () => {
  const [galleries, setGalleries] = useState<any[]>([]);
  const [searchText] = useState('');
  const [loading, setLoading] = useState(false);

  const crumbs = [{ to: '/', title: 'Home' }, { title: 'Event Galleries' }];

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await getAllEventGalleries();
      setGalleries(res.result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const filtered = galleries.filter((g) =>
    g.title?.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <>
      <BreadcrumbComp title="Event Galleries" items={crumbs} />
      <CardBox>
        <div className="flex justify-between items-center mb-4">
          <CreateEventGalleryModal refresh={fetch} />
        </div>
        <EventGalleryTable galleries={filtered} refresh={fetch} loading={loading} />
      </CardBox>
    </>
  );
};

export default EventGallery;
