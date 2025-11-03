import './Register.css'
import GradientText from '../components/GradientText'
import { useUser } from '../context/useUser'
import { useNavigate } from 'react-router-dom'

export default function Register({ onClose }) {
    const { user, setUser, signUp } = useUser()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if (user.password !== user.confirmPassword) {
            alert('Passwords do not match')
            return
        }
        
        signUp()
            .then(() => {
                onClose()
                navigate('/?login=1')
            })
            .catch((error) => {
                alert(error)
            })
    }

    return (
        <>
            <div className='register-container'>
                <GradientText
                    colors={["#3A29FF", "#FF94B4", "#FF3232", "#FF94B4", "#3A29FF"]}
                    animationSpeed={5}
                    showBorder={false}
                    className="custom-class"
                >
                    <h1>Create your account</h1>
                    <p>Join us! Please enter your details.</p>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="register-nickname">Nickname</label>
                        <input
                            id="register-nickname"
                            type="text"
                            placeholder="Nickname"
                            value={user.nickname}
                            onChange={(e) => setUser({ ...user, nickname: e.target.value })}
                        />
                        <label htmlFor="register-email">Email</label>
                        <input
                            id="register-email"
                            type="email"
                            placeholder="Email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                        />
                        <label htmlFor="register-password">Password</label>
                        <input
                            id="register-password"
                            type="password"
                            placeholder="Password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                        />
                        <label htmlFor="register-confirm">Confirm password</label>
                        <input
                            id="register-confirm"
                            type="password"
                            placeholder="Confirm password"
                            value={user.confirmPassword}
                            onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                        />
                        <button type="submit">Create account</button>
                    </form>
                </GradientText>
            </div>
        </>

    )
}


