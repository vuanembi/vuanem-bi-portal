import { useRouter } from 'next/router';
import { useContext, createContext, PropsWithChildren } from 'react';
import {
    useQueryClient,
    useQuery,
    useMutation,
    UseMutateFunction,
} from 'react-query';
import { useLocalStorage } from 'react-use';
import jwt from 'jwt-decode';

import { AuthResponse, authenticate } from '../service/auth.api';
import * as UserService from '../../user/service/user.api';

type AuthContextProps = Partial<AuthResponse> & {
    signIn: UseMutateFunction<AuthResponse, unknown, string, unknown>;
    signOut: () => void;
};

export const AuthContext = createContext<AuthContextProps>(
    {} as AuthContextProps,
);

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const [token, setToken, removeToken] = useLocalStorage<string | undefined>(
        'token',
    );

    const { data: user } = useQuery(
        'user',
        () => {
            const decodedToken = jwt<UserService.User>(token as string);
            return UserService.getOne(decodedToken.id);
        },
        {
            enabled: !!token,
        },
    );

    const { mutate: signIn } = useMutation(authenticate, {
        onSuccess: async (res) => {
            setToken(res.token);
            queryClient.setQueryData('user', res.user);
        },
    });

    const signOut = () => {
        removeToken();
        queryClient.setQueryData('user', undefined);
        router.push('/');
        router.reload();
    };

    return (
        <AuthContext.Provider value={{ user, token, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
