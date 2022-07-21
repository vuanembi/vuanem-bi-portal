import { PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import { Center, Icon } from '@chakra-ui/react';
import { MdOutlineLock } from 'react-icons/md';

import { useAuth } from '../feature/auth/provider/auth.context';

const ProtectedRoute = ({ children }: PropsWithChildren) => {
    const { pathname } = useRouter();
    const { user } = useAuth();

    const featurePath = '/' + pathname.split('/')[1];

    if (user && user.feature.map(({ name }) => name).includes(featurePath)) {
        return children as JSX.Element;
    }

    return (
        <Center mt="15vh">
            <Icon as={MdOutlineLock} boxSize="md" color="purple.400" />
        </Center>
    );
};

export default ProtectedRoute;
