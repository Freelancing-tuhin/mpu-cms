import { useEffect, useState } from 'react';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import CardBox from 'src/components/shared/CardBox';
import SearchBox from 'src/components/shared/SearchBox';
import { getAllTestimonials } from 'src/services/testimonial';
import CreateTestimonialModal from './CreateTestimonialModal';
import TestimonialTable from './TestimonialTable';

const Testimonial = () => {
  const [items, setItems] = useState<any[]>([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);

  const BCrumb = [
    { to: '/', title: 'Home' },
    { to: '/testimonials', title: 'Testimonials' },
    { title: '' },
  ];

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await getAllTestimonials();
      setItems(res.result);
    } catch (e) {
      console.error('fetch error', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const filtered = items.filter((t) => t.title?.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <>
      <BreadcrumbComp title="Testimonials" items={BCrumb} />
      <CardBox>
        <div className="flex justify-between items-center mb-4">
          <SearchBox value={searchText} onChange={(e: any) => setSearchText(e.target.value)} />
          <CreateTestimonialModal refresh={fetch} />
        </div>
        <TestimonialTable items={filtered} refresh={fetch} loading={loading} />
      </CardBox>
    </>
  );
};

export default Testimonial;
