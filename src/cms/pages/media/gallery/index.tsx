import { useEffect, useState } from 'react';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import CardBox from 'src/components/shared/CardBox';
import { getAllGalleries } from 'src/services/gallery';
import CreateGalleryModal from './CreateGalleryModal';
import GalleryTable from './GalleryTable';

const Gallery = () => {
  const [items, setItems] = useState<any[]>([]);
  const [searchText] = useState('');
  const [loading, setLoading] = useState(false);

  const crumbs = [{ to: '/', title: 'Dashboard' }, { title: 'Galleries' }];

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await getAllGalleries();
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
      <BreadcrumbComp title="Galleries" items={crumbs} />
      <CardBox>
        <div className="flex justify-between items-center mb-4">
          <CreateGalleryModal refresh={fetch} />
        </div>
        <GalleryTable items={filtered} refresh={fetch} loading={loading} />
      </CardBox>
    </>
  );
};

export default Gallery;
