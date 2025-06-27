import { link } from 'fs';
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
      link: '/media/carousel',
    },
    {
      title: 'Event Gallery',
      subtitle: 'Images from events',
      icon: 'solar:calendar-mark-bold-duotone',
      link: '/media/event-gallery',
    },
    {
      title: 'Gallery',
      subtitle: 'Photo albums & folders',
      icon: 'ph:image-duotone',
      link: '/media/gallery',
    },
    {
      title: 'Glimpses',
      subtitle: 'Snapshots of moments',
      icon: 'mdi:camera-image',
      link: '/media/glimpses',
    },
    {
      title: 'Videos',
      subtitle: 'Embedded YouTube videos',
      icon: 'solar:play-circle-bold-duotone',
      link: '/media/videos',
    },
    {
      title: 'Media Folder',
      subtitle: 'Organise all uploads',
      icon: 'material-symbols:folder-open',
      link: '/media/media-folder',
    },
  ];

  return (
    <div className="p-4">
      <BreadcrumbComp title="Media & Visual Content" items={BCrumb} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {items.map((item) => (
          <SubLinks
            key={uniqueId()}
            icon={item.icon}
            title={item.title}
            subtitle={item.subtitle}
            link={item?.link}
          />
        ))}
      </div>
    </div>
  );
};

export default MediaVisualContent;
