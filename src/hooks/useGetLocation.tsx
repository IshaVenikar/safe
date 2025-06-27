import { useState } from 'react';
import axios from 'axios';
import { useJsApiLoader } from '@react-google-maps/api';

type Location = { lat: number; lng: number } | null;
type CityState = { city: string; state: string } | null;

export const useGetLocation = () => {
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [location, setLocation] = useState<Location>(null);
  const [cityState, setCityState] = useState<CityState>(null);

  // Only needed if you're showing a Google Map in the UI
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const res = await axios.get('https://nominatim.openstreetmap.org/reverse', {
        params: {
          lat,
          lon: lng,
          format: 'json',
        },
        headers: {
          'User-Agent': 'YourFurBabyApp/1.0', // required by Nominatim TOS
        },
      });

      const address = res.data.address;
      const city = address.city || address.town || address.village || '';
      const state = address.state || '';

      setCityState({ city, state });
    } catch (err) {
      console.error('Reverse geocoding failed:', err);
    }
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setLocation({ lat, lng });
        reverseGeocode(lat, lng);
        setLocationError(null);
        setLocating(false);
      },
      () => {
        setLocationError("Unable to retrieve your location.");
        setLocating(false);
      }
    );
  };

  return {
    location,
    cityState,
    locating,
    locationError,
    isLoaded,
    handleDetectLocation,
  };
};
