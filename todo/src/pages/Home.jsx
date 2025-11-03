import './Home.css'
import Login from '../components/Login';
import Register from '../components/Register';
import Modal from '../components/Modal';
import { useState, useEffect } from 'react';
import Aurora from '../components/Aurora';
import GradientText from '../components/GradientText'
import { Link, useSearchParams } from 'react-router-dom';

export default function Home() {
	const [isLoginOpen, setIsLoginOpen] = useState(false);
	const [isRegisterOpen, setIsRegisterOpen] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();
	const openLogin = () => setIsLoginOpen(true);
	const closeLogin = () => setIsLoginOpen(false);
	const openRegister = () => setIsRegisterOpen(true);
	const closeRegister = () => setIsRegisterOpen(false);

	useEffect(() => {
		if (searchParams.get('login') === '1') {
			openLogin();
			setSearchParams(prev => {
				const { login, ...rest } = Object.fromEntries(prev);
				return new URLSearchParams(rest);
			});
		}
	}, [searchParams, openLogin]);
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
				<div className="page-container"> 
					<h1>The most advanced todo list app ever created</h1>
					<p>Sign up for free and start using our app today</p>
					<div className="button-group">
						<button onClick={openRegister}>Sign up</button>
						<button onClick={openLogin}>Login</button>
					</div>
				<Modal isOpen={isRegisterOpen} onClose={closeRegister}>
					<Register onClose={closeRegister} />
				</Modal>
				<Modal isOpen={isLoginOpen} onClose={closeLogin}>
					<Login onClose={closeLogin} />
				</Modal>
				</div>
			</GradientText>
		</>
	)
}


