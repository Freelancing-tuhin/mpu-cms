import { Table, Button } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { deleteAnnouncement } from 'src/services/announcement';
import EditAnnouncementModal from './EditAnnouncementModal';

const AnnouncementTable = ({ announcements, refresh }: any) => {
  const [editData, setEditData] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const onEdit = (a: any) => {
    setEditData(a);
    setOpen(true);
  };
  const onDelete = async (id: string) => {
    await deleteAnnouncement(id);
    refresh();
  };

  return (
    <>
      <div className="overflow-x-auto rounded border border-gray-300">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>Title</Table.HeadCell>
            <Table.HeadCell>Link</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {announcements.map((a: any) => (
              <Table.Row key={a._id}>
                <Table.Cell>{a.date}</Table.Cell>
                <Table.Cell>{a.title}</Table.Cell>
                <Table.Cell>
                  <a
                    href={a.link_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600"
                  >
                    <Button color="blue" size="xs" className="bg-blue-500">
                      <Icon icon="mdi:link-variant" height="18" />
                    </Button>
                  </a>
                </Table.Cell>
                <Table.Cell className="flex gap-2">
                  <Button size="xs" onClick={() => onEdit(a)} color="gray">
                    <Icon icon="material-symbols:edit-document" height={19} />
                  </Button>
                  <Button size="xs" onClick={() => onDelete(a._id!)} color="failure">
                    <Icon icon="hugeicons:delete-03" height={19} />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      <EditAnnouncementModal data={editData} isOpen={open} setIsOpen={setOpen} refresh={refresh} />
    </>
  );
};

export default AnnouncementTable;
