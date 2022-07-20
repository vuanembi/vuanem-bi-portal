import { Button, Icon } from '@chakra-ui/react';
import { FaGoogle } from 'react-icons/fa';
import {
    useGoogleLogin,
    GoogleLoginResponse,
    GoogleLoginResponseOffline,
} from 'react-google-login';

import { useAuth } from '../provider/auth.context';

type Response = GoogleLoginResponse | GoogleLoginResponseOffline;

const SignIn = () => {
    const { signIn } = useAuth();

    const onSuccess = (res: Response) => {
        const { accessToken: token } = res as GoogleLoginResponse;
        signIn(token);
    };

    const { signIn: onClick } = useGoogleLogin({
        onSuccess,
        clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
        cookiePolicy: 'single_host_origin',
    });

    return (
        <Button
            variant="ghost"
            bgColor="purple.400"
            color="white"
            _hover={{}}
            leftIcon={<Icon as={FaGoogle} fontSize="0.9rem" />}
            onClick={onClick}
        >
            Sign In
        </Button>
    );
};

export default SignIn;
