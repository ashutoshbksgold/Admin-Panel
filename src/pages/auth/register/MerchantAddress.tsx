import { Icon } from '@iconify/react';
import { Box, Button, Card, MenuItem, TextField, Typography, Container, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';

//googlemaps
import {
  GoogleMap,
  Marker,
  InfoWindow,
  LoadScript,
  Autocomplete,
  useLoadScript,
} from '@react-google-maps/api';
import { toast } from 'react-hot-toast';

const mapContainerStyle = {
  width: '550px',
  height: '300px',
};

const center = {
  lat: 26.8733961, // Default center latitude (change this to your preferred default)
  lng: 80.955944, // Default center longitude (change this to your preferred default)
};

const MerchantAddress = ({ addressSubmit }: any) => {
  const [map, setMap] = useState<any | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<any | null>(null);
  const [fullAddress, setFullAddress] = useState('');

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8',
    libraries: ['places'],
  });

  const onLoad = (map: any) => {
    setMap(map);
  };

  const onMarkerClick = (marker: any) => {
    setSelectedMarker(marker);
  };

  const handlePlaceSelect = (place: any) => {
    const location = place.geometry?.location;
    console.log('log: location', location);
    if (location) {
      const lat = location.lat();
      const lng = location.lng();
      const address = place.formatted_address || '';
      const pincode = place.address_components?.find(
        (component: any) => component.types[0] === 'postal_code'
      )?.long_name;

      console.log('log: Latitude:', lat);
      console.log('log: Longitude:', lng);
      console.log('log: Address:', address);
      console.log('log: Pincode:', pincode);
    }
  };

  const handleSubmit = async () => {
    if (fullAddress.length < 5) {
      return toast.error('Please enter a full address');
    }
    addressSubmit(fullAddress, { postalAddress: '', coordinates: [26.8733961, 80.955944] });
  };

  return (
    <Card sx={{ px: 6, py: 5, maxWidth: 660, width: '100%' }}>
      <TextField
        multiline
        fullWidth
        minRows={5}
        onChange={(e: any) => setFullAddress(e.target.value)}
        label="Enter Full Address"
        required
      />

      <Box mt={2}>
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={13}
            onLoad={onLoad}
          >
            <Marker position={center} onClick={() => onMarkerClick(center)} />
            {selectedMarker && (
              <InfoWindow position={selectedMarker} onCloseClick={() => setSelectedMarker(null)}>
                <div>
                  <p>Click on the map to select a location.</p>
                </div>
              </InfoWindow>
            )}

            <Autocomplete
              onLoad={(autocomplete: any) =>
                (autocomplete.placeChanged = () => {
                  const place = autocomplete.getPlace() as any;
                  handlePlaceSelect(place);
                })
              }
            >
              <input type="text" placeholder="Search for a location" />
            </Autocomplete>
          </GoogleMap>
        )}
      </Box>

      <Box mt={3}>
        <Button variant="contained" onClick={handleSubmit} fullWidth>
          Continue
        </Button>
      </Box>
    </Card>
  );
};

export default MerchantAddress;
