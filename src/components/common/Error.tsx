interface ErrorProps {
    errorText: string;
}

export const ErrorComponent = ({errorText}: ErrorProps) => {
    return (
        <div className='error'>
            <p>{errorText}</p>
        </div>
    )
}