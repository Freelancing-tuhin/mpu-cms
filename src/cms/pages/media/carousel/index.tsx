import { useEffect, useState } from 'react';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import CardBox from 'src/components/shared/CardBox';
import SearchBox from 'src/components/shared/SearchBox';
import { getAllCarousels } from 'src/services/carousel';
import CreateCarouselModal from './CreateCarouselModal';
import CarouselTable from './CarouselTable';

const Carousel = () => {
  const [slides, setSlides] = useState<any[]>([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);

  const crumbs = [{ to: '/', title: 'Dashboard' }, { title: 'Carousel Slides' }];

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await getAllCarousels();
      setSlides(res.result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const filtered = slides.filter((sl) =>
    sl.title?.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <>
      <BreadcrumbComp title="Carousel Slides" items={crumbs} />
      <CardBox>
        <div className="flex justify-between items-center mb-4">
          <SearchBox value={searchText} onChange={(e: any) => setSearchText(e.target.value)} />
          <CreateCarouselModal refresh={fetch} />
        </div>
        <CarouselTable slides={filtered} refresh={fetch} loading={loading} />
      </CardBox>
    </>
  );
};

export default Carousel;
