import { useQueries } from '@tanstack/react-query'
import axios from 'axios';
import Badge from "@nextui-org/react/badge";
import { generateKey } from '../utils/helpers';

export const Species = ({ endpoints }) => {
    const userQueries = useQueries({
        queries: endpoints.map((endpoint) => {
            return {
                queryKey: ['specie', endpoint],
                queryFn: () => axios.get(endpoint),
            }
        }),
    });

    if (userQueries.length > 0) {
        return (
            <>
                {userQueries.map(specie => {
                    if (specie.status !== 'success') return null;

                    const { name } = specie.data.data;
                    const key = generateKey(name)

                    return <Badge disableOutline isSquared color="warning" size="md" key={key}>{name}</Badge>
                })}
            </>
        );
    }

    return <Badge disableOutline isSquared variant="flat" color="warning" size="md">None</Badge>
}
