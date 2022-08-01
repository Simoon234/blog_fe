import './success.css';

export const Success = ({text}: {text: string}) => {
    return <div className='success'>
        <p>{text}</p>
    </div>
}