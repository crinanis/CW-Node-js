import React from 'react';
import {Body} from '../../components/MyApp/Body';
import {Footer} from '../../components/MyApp/Footer';
import {Comments} from '../../components/MyApp/Comments';
import {MenuPreview} from '../../components/MenuPreview/MenuPreview';
import {useUserAuth} from "../../context/UserAuthContext";

export const Home = () => {
    const {user} = useUserAuth();

    return (
        <>
            {
                !user &&
                <>
                    <Body/>
                    <MenuPreview/>
                    <Footer/>
                </>
            }
            {
                user &&
                <>
                    <Body/>
                    <MenuPreview/>
                    <Footer/>
                    <Comments/>
                </>
            }
        </>
    )
}
