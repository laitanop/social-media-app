import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';

type Props = {};

const HomePage = (props: Props) => {
    const [user, loading, error] = useAuthState(auth);
    console.log('user', user);
    return <div>indexhome</div>;
};

export default HomePage;
