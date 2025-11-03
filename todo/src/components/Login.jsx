import './Login.css'
import GradientText from '../components/GradientText'
import { useUser } from '../context/useUser'
import { useNavigate } from 'react-router-dom'

export default function Login({ onClose }) {
    const { user, setUser, signIn } = useUser()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        signIn().then(() => {
            onClose()
            navigate('/todos')
        })
        .catch((error) => {
            alert(error)
        })
    }

    return (
        <>
            <div className='login-container'>
                <GradientText
				colors={["#3A29FF", "#FF94B4", "#FF3232", "#FF94B4", "#3A29FF"]}
				animationSpeed={5}
				showBorder={false}
				className="custom-class"
			>
                <h1>Log in to your account</h1>
                <p>Welcome back! Please enter your details.</p>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input 
                    id="email" 
                    type="email" 
                    placeholder="Enter your email" 
                    value={user.email} 
                    onChange={(e) => setUser({...user, email: e.target.value})
                    } />
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" placeholder="Password" 
                    value={user.password} 
                    onChange={(e) => setUser({...user, password: e.target.value})
                    } />
                    <button type="submit">Sign in</button>
                </form>
            </GradientText>
            </div>
        </>

    )
}
