import { uniqueId } from 'lodash';
import SubLinks from 'src/cms/components/subLinks/SubLinks';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';

const MediaVisualContent = () => {
  const BCrumb = [{ to: '/', title: 'Home' }, { title: 'Media & Visual Content' }];

  const items = [
    {
      title: 'Carousel',
      subtitle: 'Homepage slider banners',
      icon: 'tabler:carousel-horizontal',
    },
    {
      title: 'Event Gallery',
      subtitle: 'Images from events',
      icon: 'solar:calendar-mark-bold-duotone',
    },
    {
      title: 'Gallery',
      subtitle: 'Photo albums & folders',
      icon: 'ph:image-duotone',
    },
    {
      title: 'Glimpses',
      subtitle: 'Snapshots of moments',
      icon: 'mdi:camera-image',
    },
    {
      title: 'Videos',
      subtitle: 'Embedded YouTube videos',
      icon: 'solar:play-circle-bold-duotone',
    },
    {
      title: 'Media Folder',
      subtitle: 'Organise all uploads',
      icon: 'material-symbols:folder-open',
    },
  ];

  return (
    <div className="p-4">
      <BreadcrumbComp title="Media & Visual Content" items={BCrumb} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {items.map((item, idx) => (
          <SubLinks key={uniqueId()} icon={item.icon} title={item.title} subtitle={item.subtitle} />
        ))}
      </div>
    </div>
  );
};

export default MediaVisualContent;
