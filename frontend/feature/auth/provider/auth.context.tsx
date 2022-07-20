import {
    useContext,
    createContext,
    PropsWithChildren,
} from 'react';
import { useQuery, useMutation, UseMutateFunction } from 'react-query';
import { useLocalStorage } from 'react-use';
import jwt from 'jwt-decode';

import { AuthResponse, authenticate } from '../service/auth.api';
import { User, getOne } from '../../user/service/user.api';

type AuthContextProps = Partial<AuthResponse> & {
    signIn: UseMutateFunction<AuthResponse, unknown, string, unknown>;
};

export const AuthContext = createContext<AuthContextProps>(
    {} as AuthContextProps,
);

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [token, setToken] = useLocalStorage('token', '');

    const { mutate: signIn } = useMutation(authenticate, {
        onSuccess: (res) => {
            const { token } = res;
            setToken(token);
        },
    });

    const { data: user } = useQuery<User>(
        'user',
        () => {
            const decodedToken = jwt<User>(token || '');
            return getOne(decodedToken.id);
        },
        { enabled: !!token },
    );

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                signIn,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
