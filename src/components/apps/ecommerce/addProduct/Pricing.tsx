import { Label, Radio, TextInput, Button } from 'flowbite-react';
import CardBox from 'src/components/shared/CardBox';
import { useEffect, useState } from 'react';

const Pricing = ({ eventData, setEventData }: any) => {
  const [stallType, setStallType] = useState<'single' | 'multiple'>('single');

  const handleInputChange = (index: number, field: string, value: any) => {
    const updatedTickets = [...eventData.tickets];
    updatedTickets[index][field] = value;
    setEventData({ ...eventData, tickets: updatedTickets });
  };

  const addTicket = () => {
    setEventData({
      ...eventData,
      tickets: [...eventData.tickets, { ticketName: '', ticketPrice: '', quantity: '', area: '' }],
    });
  };

  useEffect(() => {
    setEventData({
      ...eventData,
      tickets: [
        ...eventData.tickets,
        { ticketName: eventData?.title, ticketPrice: '', quantity: 1, area: '' },
      ],
    });
  }, []);

  return (
    <CardBox>
      <h5 className="card-title mb-4">Add Stalls</h5>

      <div className="flex gap-4 mb-4">
        <label className="flex items-center gap-2">
          <Radio
            name="stallType"
            value="single"
            checked={stallType === 'single'}
            onChange={() => {
              setStallType('single');
            }}
          />
          Single Land
        </label>
        <label className="flex items-center gap-2">
          <Radio
            name="stallType"
            value="multiple"
            checked={stallType === 'multiple'}
            onChange={() => setStallType('multiple')}
          />
          Multiple Stalls
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {eventData.tickets
          .slice(0, stallType === 'single' ? 1 : undefined)
          .map((ticket: any, index: number) => (
            <div key={index} className="border p-4 rounded-lg">
              {stallType === 'multiple' && (
                <>
                  <div className="mb-2 block mt-3">
                    <Label htmlFor={`ticketName-${index}`} value="Stall Name" />
                  </div>
                  <TextInput
                    id={`ticketName-${index}`}
                    type="text"
                    name="ticketName"
                    value={ticket.ticketName}
                    onChange={(e) => handleInputChange(index, 'ticketName', e.target.value)}
                    placeholder="Enter ticket name"
                  />
                </>
              )}
              {stallType === 'single' && (
                <input type="hidden" name="ticketName" value={eventData.title} />
              )}

              <div className="mb-2 block mt-3">
                <Label htmlFor={`ticketPrice-${index}`} value="Rent Amount" />
              </div>
              <TextInput
                id={`ticketPrice-${index}`}
                type="number"
                name="ticketPrice"
                value={ticket.ticketPrice}
                onChange={(e) => handleInputChange(index, 'ticketPrice', e.target.value)}
                placeholder="Enter rent price"
              />
              {/* <div className="mb-2 block mt-3">
                <Label htmlFor={`quantity-${index}`} value="Stalls Available" />
              </div>
              <TextInput
                id={`quantity-${index}`}
                type="number"
                name="quantity"
                value={ticket.quantity}
                onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
                placeholder="Enter stall quantity"
              /> */}
              <div className="mb-2 block mt-3">
                <Label htmlFor={`area-${index}`} value="Stalls Area(sqft)" />
              </div>
              <TextInput
                id={`area-${index}`}
                type="number"
                name="area"
                value={ticket.area}
                onChange={(e) => handleInputChange(index, 'area', e.target.value)}
                placeholder="Enter stall area"
              />
              {stallType === 'multiple' && (
                <Button
                  color="red"
                  className="mt-3"
                  onClick={() => {
                    setEventData({
                      ...eventData,
                      tickets: eventData.tickets.filter((_: any, i: any) => i !== index),
                    });
                  }}
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
      </div>

      {stallType === 'multiple' && (
        <Button color="primary" className="mt-3 w-44" onClick={addTicket}>
          Add More
        </Button>
      )}
    </CardBox>
  );
};

export default Pricing;
