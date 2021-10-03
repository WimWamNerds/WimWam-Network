import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import tw from 'tailwind-styled-components';

const Input = tw.input`h-9 text-gray-300 rounded-full pl-3 w-10/12 outline-none transform transition-all duration-200 bg-fbhover input-cursor border-4 border-solid border-gray-400 border-opacity-50 box-content
`;

const SignUp = () => {
	const [enteredEmail, setEnteredEmail] = useState('');
	const [enteredPassword, setEnteredPassword] = useState('');
	const [enteredUsername, setEnteredUsername] = useState('');

	// const [error, setError] = useState('');
	// const [loading, setLoading] = useState(false);
	const history = useHistory();

	const handleSubmit = async (event) => {
		// event.preventDefault();
		// setEnteredEmail('');
		// setEnteredPassword('');
		// try {
		// 	setError('');
		// 	setLoading(true);
		// 	await login(enteredEmail, enteredPassword);
		history.push('/');
		// } catch (error) {
		// 	setError('failed to login');
		// 	console.log(error);
		// }
		// setLoading(false);
	};

	return (
		<>
			<div className=' h-full items-center justify-center flex flex-col'>
				<p className='text-3xl lg:text-7xl lg:font-medium m-5'>
					Welcome To Social Snap
				</p>
				<p className='text-xl lg:text-5xl lg:font-medium m-5'>
					Connect to the World!
				</p>
				{/* {error !== '' && <h1>{error}</h1>} */}
				<form className='bg-fbnav border border-solid rounded-lg m-2 flex flex-col items-center justify-center space-y-4 p-4 w-96'>
					<h1 className='text-4xl font-bold'>SignUp</h1>
					<label>Enter Username</label>
					<Input
						type='text'
						placeholder='Enter username'
						value={enteredUsername}
						onChange={(event) => setEnteredUsername(event.target.value)}
					></Input>
					<label>Enter Email</label>
					<Input
						type='text'
						placeholder='Enter email'
						value={enteredEmail}
						onChange={(event) => setEnteredEmail(event.target.value)}
					></Input>
					<label>Enter Password</label>
					<Input
						type='password'
						placeholder='Enter password'
						value={enteredPassword}
						onChange={(event) => setEnteredPassword(event.target.value)}
					></Input>
					<button
						type='submit'
						className='w-36 h-8 mt-5 rounded-sm bg-blue-700 text-center border-solid border border-blue-700'
						onClick={handleSubmit}
					>
						SignUp
					</button>
					<h2>Already have an Account? </h2>
					<Link to='/login'>
						<button className='w-52 bg-green-600 h-8 text-white'>Log In</button>
					</Link>
				</form>
			</div>
		</>
	);
};

export default SignUp;
