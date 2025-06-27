import { Table, Button } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { deleteNotice } from 'src/services/notice';
import EditNoticeModal from './EditNoticeModal';

const NoticeTable = ({ notices, refresh }: any) => {
  const [editData, setEditData] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const onEdit = (n: any) => {
    setEditData(n);
    setOpen(true);
  };
  const onDelete = async (id: string) => {
    await deleteNotice(id);
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
            {notices.map((n: any) => (
              <Table.Row key={n._id}>
                <Table.Cell>{n.date}</Table.Cell>
                <Table.Cell>{n.title}</Table.Cell>
                <Table.Cell>
                  <a
                    href={n.link_url}
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
                  <Button size="xs" color="gray" onClick={() => onEdit(n)}>
                    <Icon icon="material-symbols:edit-document" height={19} />
                  </Button>
                  <Button size="xs" color="failure" onClick={() => onDelete(n._id!)}>
                    <Icon icon="hugeicons:delete-03" height={19} />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      <EditNoticeModal data={editData} isOpen={open} setIsOpen={setOpen} refresh={refresh} />
    </>
  );
};

export default NoticeTable;
