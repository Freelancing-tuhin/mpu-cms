import { Table, Button } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { deleteCarousel } from 'src/services/carousel';
import EditCarouselModal from './EditCarouselModal';

const CarouselTable = ({ slides, refresh, loading }: any) => {
  const [editData, setEditData] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const onEdit = (s: any) => {
    setEditData(s);
    setOpen(true);
  };
  const onDelete = async (id: string) => {
    await deleteCarousel(id);
    refresh();
  };

  return (
    <>
      <div className="overflow-x-auto rounded border border-gray-300">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Order</Table.HeadCell>
            <Table.HeadCell>Title</Table.HeadCell>
            <Table.HeadCell>Text</Table.HeadCell>
            <Table.HeadCell>Image</Table.HeadCell>
            <Table.HeadCell>Link</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {slides.map((s: any) => (
              <Table.Row key={s._id}>
                <Table.Cell>{s.order}</Table.Cell>
                <Table.Cell>{s.title}</Table.Cell>
                <Table.Cell className="truncate max-w-xs">{s.text}</Table.Cell>
                <Table.Cell>
                  {s.slide_image && (
                    <img
                      src={s.slide_image}
                      alt={s.title}
                      className="h-16 w-16 object-contain rounded"
                    />
                  )}
                </Table.Cell>
                <Table.Cell>
                  <a
                    href={s.link_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600"
                  >
                    View
                  </a>
                </Table.Cell>
                <Table.Cell className="flex gap-2">
                  <Button size="xs" color="gray" onClick={() => onEdit(s)}>
                    <Icon icon="material-symbols:edit-document" />
                  </Button>
                  <Button size="xs" color="failure" onClick={() => onDelete(s._id!)}>
                    <Icon icon="hugeicons:delete-03" />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      <EditCarouselModal data={editData} isOpen={open} setIsOpen={setOpen} refresh={refresh} />
    </>
  );
};

export default CarouselTable;
