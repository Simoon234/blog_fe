import './lp.css';
// @ts-ignore
import img from '../../images/lp1.jpg';

export const LandingPage = () => {
    return (
        <>
            <section className='wrapper'>
                <div className='lp-header'>
                    <h1>This is our blog!</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, animi assumenda consectetur cupiditate dicta distinctio doloremque, fugit, in iste magnam molestiae nemo neque nobis optio quam qui quis reprehenderit vel!</p>
                </div>
                <div className='image-container'>
                    <img src={img} alt="landing page image. "/>
                </div>
            </section>
        </>
    )
}