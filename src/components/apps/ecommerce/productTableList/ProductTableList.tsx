import CardBox from 'src/components/shared/CardBox';
// import React from 'react';
import EventTable from './EventTable';
import { getEvent } from 'src/service/getEvents';
import { useContext, useState } from 'react';
import { AuthContext } from 'src/context/authContext/AuthContext';
import SearchBox from 'src/components/shared/SearchBox';
// import SearchBox from 'src/views/forms/searchBox/SearchBox';

const ProductTablelist = () => {
  const { user }: any = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState(null);

  const getEvents = async (page = 1) => {
    try {
      const response = await getEvent({
        filter: { page: page, limit: 4, search: searchText, organizerId: user?._id },
      });
      setEvents(response.result || []);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  return (
    <>
      <CardBox>
        <div className="flex justify-between items-center">
          <SearchBox
            setSearchText={setSearchText}
            searchText={searchText}
            getOrganizer={getEvents}
            placeholder={'Search by space name..'}
          />
        </div>

        <EventTable
          events={events}
          totalPages={totalPages}
          getEvents={getEvents}
          searchText={searchText}
        />
      </CardBox>
    </>
  );
};

export default ProductTablelist;
