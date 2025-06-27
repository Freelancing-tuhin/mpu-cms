import { useEffect, useState } from 'react';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import CardBox from 'src/components/shared/CardBox';
import { getAllNewsPosts } from 'src/services/newsPost';
import CreateNewsPostModal from './CreateNewsPostModal';
import NewsPostTable from './NewsPostTable';

const NewsPost = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [searchText] = useState('');
  const [loading, setLoading] = useState(false);

  const breadcrumb = [{ to: '/', title: 'Dashboard' }, { title: 'News Posts' }];

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await getAllNewsPosts();
      setPosts(res.result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filtered = posts.filter((p) => p.title?.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <>
      <BreadcrumbComp title="News Posts" items={breadcrumb} />
      <CardBox>
        <div className="flex justify-between items-center mb-4">
          <CreateNewsPostModal refresh={fetchPosts} />
        </div>
        <NewsPostTable posts={filtered} refresh={fetchPosts} loading={loading} />
      </CardBox>
    </>
  );
};

export default NewsPost;
