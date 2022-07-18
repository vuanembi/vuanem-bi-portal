import { Button, Icon } from '@chakra-ui/react';

import { FaGoogle } from 'react-icons/fa';

import {
    useGoogleLogin,
    GoogleLoginResponse,
    GoogleLoginResponseOffline,
} from 'react-google-login';

type Response = GoogleLoginResponse | GoogleLoginResponseOffline;

const SignIn = () => {
    const onSuccess = (res: Response) => {
        console.log(res);
    };

    const { signIn } = useGoogleLogin({
        onSuccess,
        clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
        cookiePolicy: 'single_host_origin',
    });

    return (
        <Button
            colorScheme="purple"
            leftIcon={<Icon as={FaGoogle} fontSize="0.9rem" />}
            onClick={signIn}
        >
            Sign In
        </Button>
    );
};

export default SignIn;
