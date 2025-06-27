import { useEffect, useState } from 'react';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import CardBox from 'src/components/shared/CardBox';
import { getAllAcademicHighlights } from 'src/services/academicHighlights';
import CreateAcademicHighlightModal from './CreateAcademicHighlightModal';
import AcademicHighlightsTable from './AcademicHighlightsTable';

export default function AcademicHighlights() {
  const [items, setItems] = useState<any[]>([]);
  const [searchText] = useState('');
  const [loading, setLoading] = useState(false);

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await getAllAcademicHighlights();
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
        title="Academic Highlights"
        items={[{ to: '/', title: 'Dashboard' }, { title: 'Academic Highlights' }]}
      />
      <CardBox>
        <div className="flex justify-between items-center mb-4">
          <CreateAcademicHighlightModal refresh={fetch} />
        </div>
        <AcademicHighlightsTable items={filtered} refresh={fetch} loading={loading} />
      </CardBox>
    </>
  );
}
