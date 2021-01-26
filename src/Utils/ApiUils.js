import axios from 'axios';

axios.defaults.headers.common.Accept = 'application/json';

const fetch = (endpoint) => {
    return axios
        .get(endpoint)
        .then((res) => res)
        .catch((err) => {
            console.error(
                'Error catch in Apiutils at fetch method. It will be thrown...'
            );
            throw err;
        });
}

export const getPoints = () => {
    const query = `http://localhost:8000/api/v1/stores/all`;
    return fetch(query)
        .then(res=> {
            const data = [];
            res.data.forEach(point=> {
                data.push({
                    lat: point.latitude,
                    lng: point.longitude,
                    color: point.color,
                    type: point.type
                })
            });
            return data;
        }).catch(e => {
            console.log(e);
            return [];
        });
};

export const getAddress = (latitude, longitude) => {
    const query = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
    return fetch(query)
        .then(res=> res.data.display_name? res.data.display_name : '')
        .catch(e => '');
};