import { Table, Button } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { deleteEventGallery } from 'src/services/eventGallery';
import EditEventGalleryModal from './EditEventGalleryModal';

const EventGalleryTable = ({ galleries, refresh, loading }: any) => {
  const [editData, setEditData] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const onEdit = (g: any) => {
    setEditData(g);
    setOpen(true);
  };
  const onDelete = async (id: string) => {
    await deleteEventGallery(id);
    refresh();
  };

  return (
    <>
      <div className="overflow-x-auto rounded border border-gray-300">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Title</Table.HeadCell>
            <Table.HeadCell>Tag</Table.HeadCell>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>Cover</Table.HeadCell>
            <Table.HeadCell>Folder</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {galleries.map((g: any) => (
              <Table.Row key={g._id}>
                <Table.Cell>{g.title}</Table.Cell>
                <Table.Cell>{g.tag}</Table.Cell>
                <Table.Cell>{g.date?.slice(0, 10)}</Table.Cell>
                <Table.Cell>
                  {g.cover_photo && (
                    <img
                      src={g.cover_photo}
                      alt={g.title}
                      className="h-16 w-16 object-contain rounded"
                    />
                  )}
                </Table.Cell>
                <Table.Cell>{g.folder_name}</Table.Cell>
                <Table.Cell className="flex gap-2">
                  <Button size="xs" color="gray" onClick={() => onEdit(g)}>
                    <Icon icon="material-symbols:edit-document" />
                  </Button>
                  <Button size="xs" color="failure" onClick={() => onDelete(g._id!)}>
                    <Icon icon="hugeicons:delete-03" />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      <EditEventGalleryModal data={editData} isOpen={open} setIsOpen={setOpen} refresh={refresh} />
    </>
  );
};

export default EventGalleryTable;
