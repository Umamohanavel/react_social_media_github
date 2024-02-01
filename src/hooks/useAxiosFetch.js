import { useEffect, useState } from 'react'
import axios from 'axios';

const useAxiosFetch = (dataUrl) => {       //kudukra url la dataUrl la ulla vaangikrom i.e we need one url to fetch data
    const [data, setData] = useState([]);   //to givr data
    const [fetchError, setFetchError] = useState(null);   //to fetch error
    const [isLoading, setIsLoading] = useState(false);   // while loading its load complete data

    useEffect(() => {
        let isMounted = true;    //whether its work or not load or not
        const source =  axios.CancelToken.source();
        
        const fetchData = async (url) => {
            setIsLoading(true);
            try{
                const response = await axios.get(url, {
                    CancelToken: source.token
                });
                if (isMounted) {
                    setData(response.data);
                    setFetchError(null);
                }
            } catch(err) {
                if (isMounted) {
                    setFetchError(err.message);
                    setData([]);
                }
            } finally {
                isMounted && setTimeout( () => setIsLoading(false), 2000 );
            }
        }

        fetchData(dataUrl);

        const cleanUp = ()  => {
            isMounted = false;
            source.cancel();
        }

        return cleanUp;
    }, [dataUrl] );

    return {data, fetchError, isLoading}
}

export default useAxiosFetch;