import './NotFound.css'
import GradientText from '../components/GradientText'
import { Link } from 'react-router-dom'
import Aurora from '../components/Aurora'

export default function NotFound() {
    return (
        <>
            <Aurora
                colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
                blend={0.5}
                amplitude={1.0}
                speed={0.5}
            />
        <GradientText
            colors={["#3A29FF", "#FF94B4", "#FF3232", "#FF94B4", "#3A29FF"]}
            animationSpeed={5}
            showBorder={false}
            className="custom-class"
        >
            <div className="not-found-container">
            <h1>404</h1>
            <p>Page not found</p>
            </div>  
        </GradientText>
        </>
    );
}
