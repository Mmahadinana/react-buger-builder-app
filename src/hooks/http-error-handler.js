import { useEffect,useState } from 'react';

export default httpClient => {
    const [ error, setError ] = useState(null);
    

        const resInter = httpClient.interceptors.response.use(res =>res, err => {
                setError(err)
            });
        const reqInter = httpClient.interceptors.request.use(req => {
                setError(null)
                return req;
            })
     

        useEffect(() => {
            return () => {
                httpClient.interceptors.request.eject(reqInter);
                httpClient.interceptors.response.eject(resInter);
                }
        }, [resInter,reqInter]);
        
       const errorHandler = () => {
            setError(null)
        }
        
        return [error, errorHandler];
    
};