
export   const fetchAddress = async (latitude: number, longitude: number): Promise<any | null> => {
    const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.status === 'OK' && data.results && data.results.length > 0) {
            const response = {
                address_components: data.results[0].address_components,
                formatted_address: data.results[0].formatted_address
            }
            return response
        } else {
            console.error('No address found for the provided latitude and longitude.');
            return null;
        }
    } catch (error) {
        console.error('Error fetching address:', error);
        return null;
    }
};
