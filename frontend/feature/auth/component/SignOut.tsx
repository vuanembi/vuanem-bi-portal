import { GoogleLogout } from 'react-google-login';

const SignOut = () => {
    const onSuccess = () => {
        console.log(123);
    };
    return (
        <GoogleLogout
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}
            buttonText="Logout"
            onLogoutSuccess={onSuccess}
        ></GoogleLogout>
    );
};

export default SignOut;
