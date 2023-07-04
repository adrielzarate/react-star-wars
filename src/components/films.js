import { useQueries } from '@tanstack/react-query'
import axios from 'axios';
import Badge from "@nextui-org/react/badge";
import { generateKey } from '../utils/helpers';

export const Films = ({ endpoints }) => {
    const userQueries = useQueries({
        queries: endpoints.map((endpoint) => {
            return {
                queryKey: ['film', endpoint],
                queryFn: () => axios.get(endpoint),
            }
        }),
    });

    if (userQueries.length > 0) {
        return (
            <>
                {userQueries.map(film => {
                    if (film.status !== 'success') return null;

                    const { title } = film.data.data;
                    const key = generateKey(title)

                    return <Badge disableOutline isSquared key={key} size="md" css={{ marginRight: '5px', marginBottom: '5px' }}>{title}</Badge>
                })}
            </>
        );
    }

    return <Badge disableOutline isSquared size="md" variant="flat">None</Badge>
}
