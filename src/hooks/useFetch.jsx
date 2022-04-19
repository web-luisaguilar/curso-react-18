import { useState, useEffect } from 'react';

export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPendig, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async (url) => {
            try {
                let res = await fetch(url);

                if (!res.ok) {
                    throw {
                        err: true,
                        status: res.status,
                        statusText: !res.statusText
                            ? 'Ocurrio un Error'
                            : res.statusText,
                    };
                }

                let data = await res.json();

                setIsPending(false);
                setData(data);
                setError({ err: false });
            } catch (err) {
                setIsPending(true);
                setError(err);
            }
        };

        getData(url);
    }, [url]);

    return { data, isPendig, error };
};