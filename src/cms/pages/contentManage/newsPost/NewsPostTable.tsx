import { Table, Button } from 'flowbite-react';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { deleteNewsPost } from 'src/services/newsPost';
import EditNewsPostModal from './EditNewsPostModal';

const NewsPostTable = ({ posts, refresh }: any) => {
  const [editData, setEditData] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const onEdit = (item: any) => {
    setEditData(item);
    setOpen(true);
  };
  const onDelete = async (id: string) => {
    await deleteNewsPost(id);
    refresh();
  };

  return (
    <>
      <div className="overflow-x-auto rounded border border-gray-300">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>Image</Table.HeadCell>
            <Table.HeadCell>Title</Table.HeadCell>
            <Table.HeadCell>Tag</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {posts.map((p: any) => (
              <Table.Row key={p._id}>
                <Table.Cell>{p.date?.slice(0, 10)}</Table.Cell>
                <Table.Cell>
                  <img
                    src={p.featured_image}
                    alt={p.title}
                    className="h-16 w-16 object-contain rounded"
                  />
                </Table.Cell>
                <Table.Cell>{p.title}</Table.Cell>
                <Table.Cell>{p.tag}</Table.Cell>
                <Table.Cell className="flex gap-2">
                  <Button size="xs" color="gray" onClick={() => onEdit(p)}>
                    <Icon icon="material-symbols:edit-document" height={19} />
                  </Button>
                  <Button size="xs" color="failure" onClick={() => onDelete(p._id!)}>
                    <Icon icon="hugeicons:delete-03" height={19} />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      <EditNewsPostModal data={editData} isOpen={open} setIsOpen={setOpen} refresh={refresh} />
    </>
  );
};

export default NewsPostTable;
