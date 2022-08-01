import React, {createContext, ReactNode, useEffect, useReducer, useState} from "react"
import Reducer from "./Reducer";
import {UserInfo} from "../pages/Settings/Settings";

type  User = {
    user: UserInfo | null;
    isFetching: boolean;
    error: boolean;
    dispatch: any;
}

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user") as string) || null,
    isFetching: false,
    error: false,
    dispatch: false
};

export const Context = createContext<User>(INITIAL_STATE);

export const ContextProvider = ({ children }: {children: ReactNode}) => {
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user]);

    return (
        <Context.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </Context.Provider>
    );
};