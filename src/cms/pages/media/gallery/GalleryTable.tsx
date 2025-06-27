import { Table, Button } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { deleteGallery } from 'src/services/gallery';
import EditGalleryModal from './EditGalleryModal';

const GalleryTable = ({ items, refresh }: any) => {
  const [editData, setEditData] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const onEdit = (i: any) => {
    setEditData(i);
    setOpen(true);
  };
  const onDelete = async (id: string) => {
    await deleteGallery(id);
    refresh();
  };

  return (
    <>
      <div className="overflow-x-auto rounded border border-gray-300">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>Title</Table.HeadCell>
            <Table.HeadCell>Tag</Table.HeadCell>
            <Table.HeadCell>Cover</Table.HeadCell>
            <Table.HeadCell>Folder</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {items.map((i: any) => (
              <Table.Row key={i._id}>
                <Table.Cell>{i.date?.slice(0, 10)}</Table.Cell>
                <Table.Cell>{i.title}</Table.Cell>
                <Table.Cell>{i.tag}</Table.Cell>
                <Table.Cell>
                  {i.cover_photo && (
                    <img
                      src={i.cover_photo}
                      alt={i.title}
                      className="h-16 w-16 object-contain rounded"
                    />
                  )}
                </Table.Cell>
                <Table.Cell>{i.folder_name}</Table.Cell>
                <Table.Cell className="flex gap-2">
                  <Button size="xs" color="gray" onClick={() => onEdit(i)}>
                    <Icon icon="material-symbols:edit-document" />
                  </Button>
                  <Button size="xs" color="failure" onClick={() => onDelete(i._id!)}>
                    <Icon icon="hugeicons:delete-03" />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      <EditGalleryModal data={editData} isOpen={open} setIsOpen={setOpen} refresh={refresh} />
    </>
  );
};

export default GalleryTable;
