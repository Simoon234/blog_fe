import {ReactNode} from "react";
import './common.css';

interface Props {
    children: ReactNode
}

export const Section = ({children}: Props) => {
    return (
        <section className='section'>
            {children}
        </section>
    )
}