import { Label, Card, TextInput } from 'flowbite-react';
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
  getLatLng,
} from 'react-google-places-autocomplete';

const ActivityDetails = ({ eventData, setEventData }: any) => {
  const handleLocationChange = async (location: any) => {
    if (!location) return;

    try {
      const placeId = location.value.place_id; // Get place_id
      const results = await geocodeByPlaceId(placeId); // Fetch place details
      const { lat, lng } = await getLatLng(results[0]); // Get lat & lng
      const formattedAddress = results[0].formatted_address; // Get formatted address

      setEventData({
        ...eventData,
        location: {
          address: formattedAddress,
          latitude: lat,
          longitude: lng,
        },
      });

      console.log('Selected Location:', { formattedAddress, lat, lng });
    } catch (error) {
      console.error('Error fetching location details:', error);
    }
  };

  return (
    <Card className="p-6 shadow-md">
      <h5 className="text-lg font-semibold mb-4">Address</h5>

      {/* Location Input */}
      <div className="mb-4">
        <Label htmlFor="location" value="Location" className="font-medium" />
        <GooglePlacesAutocomplete
          selectProps={{
            value: eventData.location?.address || '',
            onChange: handleLocationChange,
          }}
        />
        <div className="font-semibold text-black mt-4">Selected Address:</div>
        <div>{eventData.location?.address}</div>
      </div>

      {/* Location Description Input */}
      <div className="mb-4">
        <Label htmlFor="locationDescription" value="Location Description" />
        <TextInput
          id="locationDescription"
          name="location_description"
          type="text"
          value={eventData.location_description}
          onChange={(e) => setEventData({ ...eventData, location_description: e.target.value })}
          className="form-control"
          placeholder="Location Details"
        />
      </div>
    </Card>
  );
};

export default ActivityDetails;
