import { useQuery } from '@tanstack/react-query'
import axios from 'axios';

export const World = ({ endpoint }) => {
    const { status, error, data } = useQuery({
        queryKey: ['world'],
        queryFn: () => axios.get(endpoint),
    })

    if (status !== 'success') return null;

    const worldData = data.data;

    return <span>{worldData.name}</span>
}
