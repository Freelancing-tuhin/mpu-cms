import { Label, TextInput, Card, Checkbox } from 'flowbite-react';
import { useState } from 'react';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const ActivityDetails = ({ eventData, setEventData }: any) => {
  const [selectedOffDays, setSelectedOffDays] = useState<string[]>([]);

  const handleTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    period: string,
    type: 'start' | 'end',
  ) => {
    const currentHours = eventData.opening_hours[period] || '';
    const times = currentHours.split(' - ');

    if (type === 'start') {
      times[0] = formatTime(event.target.value);
    } else {
      times[1] = formatTime(event.target.value);
    }

    setEventData({
      ...eventData,
      opening_hours: {
        ...eventData.opening_hours,
        [period]: times.join(' - '),
      },
    });
  };

  const formatTime = (time: string) => {
    const [hour, minute] = time.split(':');
    const hourInt = parseInt(hour, 10);
    const ampm = hourInt >= 12 ? 'PM' : 'AM';
    const formattedHour = hourInt % 12 === 0 ? 12 : hourInt % 12;
    return `${formattedHour}:${minute} ${ampm}`;
  };

  const handleOffDayChange = (day: string) => {
    let updatedOffDays = [...selectedOffDays];

    if (updatedOffDays.includes(day)) {
      updatedOffDays = updatedOffDays.filter((d) => d !== day);
    } else {
      updatedOffDays.push(day);
    }

    setSelectedOffDays(updatedOffDays);
    setEventData({
      ...eventData,
      opening_hours: {
        ...eventData.opening_hours,
        off: updatedOffDays.join(', '), // Store as comma-separated string
      },
    });
  };

  return (
    <Card className="p-6 shadow-md">
      <h5 className="text-lg font-semibold mb-4">Date & Time</h5>

      {/* Start & End Dates */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="startDate" value="Start Date" className="font-medium" />
          <TextInput
            id="startDate"
            type="date"
            name="startDate"
            value={eventData.startDate}
            onChange={(e) => setEventData({ ...eventData, startDate: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="endDate" value="End Date" className="font-medium" />
          <TextInput
            id="endDate"
            type="date"
            name="endDate"
            value={eventData.endDate}
            onChange={(e) => setEventData({ ...eventData, endDate: e.target.value })}
          />
        </div>
      </div>

      {/* Weekdays Opening Hours */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="weekdays-start" value="Weekdays Opening Time" className="font-medium" />
          <TextInput
            id="weekdays-start"
            type="time"
            onChange={(e) => handleTimeChange(e, 'weekdays', 'start')}
          />
        </div>
        <div>
          <Label htmlFor="weekdays-end" value="Weekdays Closing Time" className="font-medium" />
          <TextInput
            id="weekdays-end"
            type="time"
            onChange={(e) => handleTimeChange(e, 'weekdays', 'end')}
          />
        </div>
      </div>

      {/* Weekend Opening Hours */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="weekend-start" value="Weekend Opening Time" className="font-medium" />
          <TextInput
            id="weekend-start"
            type="time"
            onChange={(e) => handleTimeChange(e, 'weekend', 'start')}
          />
        </div>
        <div>
          <Label htmlFor="weekend-end" value="Weekend Closing Time" className="font-medium" />
          <TextInput
            id="weekend-end"
            type="time"
            onChange={(e) => handleTimeChange(e, 'weekend', 'end')}
          />
        </div>
      </div>

      {/* Off Days - Checkboxes */}
      <div className="mb-4">
        <Label value="Select Off Days" className="font-medium" />
        <div className="grid grid-cols-2 gap-2 mt-2">
          {daysOfWeek.map((day) => (
            <label key={day} className="flex items-center space-x-2">
              <Checkbox
                checked={selectedOffDays.includes(day)}
                onChange={() => handleOffDayChange(day)}
              />
              <span>{day}</span>
            </label>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ActivityDetails;
