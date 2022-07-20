import { useRouter } from 'next/router';
import { useState, useContext, createContext, PropsWithChildren } from 'react';
import {
    useQueryClient,
    useQuery,
    useMutation,
    UseMutateFunction,
} from 'react-query';
import { useLocalStorage } from 'react-use';
import jwt from 'jwt-decode';

import { AuthResponse, authenticate } from '../service/auth.api';
import { User, getOne } from '../../user/service/user.api';

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

    const [user, setUser] = useState<User | undefined>(undefined);

    const [token, setToken, removeToken] = useLocalStorage<string | undefined>(
        'token',
    );

    useQuery(
        'user',
        () => {
            const decodedToken = jwt<User>(token as string);
            return getOne(decodedToken.id);
        },
        { onSuccess: (user) => setUser(user), enabled: !!token },
    );

    const { mutate: signIn } = useMutation(authenticate, {
        onSuccess: async (res) => {
            const { token, user } = res;
            setToken(token);
            setUser(user);
        },
    });

    const signOut = () => {
        removeToken();
        setUser(undefined);
        router.push('/');
    };

    return (
        <AuthContext.Provider value={{ user, token, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
