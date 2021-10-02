import React from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import Logo from '../../assets/logo.png';

import { Container } from './styles';
import { FormBorder, Form } from '../Login/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

interface Inputs {
  email: string;
  password: string;
  confirmpwd: string;
  name: string;
}

const CreateAccount: React.FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] =
    React.useState<boolean>(false);
  const [isConfirmPwdVisible, setIsConfirmPwdVisible] =
    React.useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const history = useHistory();

  const onSubmit: SubmitHandler<Inputs> = ({ email, password, confirmpwd, name }) => {
    console.log(email, password, confirmpwd, name);
  };

  return (
    <Container>
      <FormBorder>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="logo">
            <img src={Logo} alt="logo" />
            <h1>Create account</h1>
          </div>
          <input
            type="email"
            placeholder="Email"
            {...register('email', { required: 'Field cannot be empty!' })}
          ></input>
          <p>{errors.email?.message}</p>

          <div>
            <input
              autoComplete=""
              placeholder="Password"
              type={isPasswordVisible ? 'text' : 'password'}
              {...register('password', {
                required: 'Field cannot be empty!',
                minLength: {
                  value: 5,
                  message: 'Minimum of 5 characters.',
                },
              })}
            />
            <div onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
              <FontAwesomeIcon
                color="purple"
                size="2x"
                icon={isPasswordVisible ? faEyeSlash : faEye}
              />
            </div>
          </div>
          <p>{errors.password?.message}</p>

          <div>
            <input
              autoComplete=""
              placeholder="Confirm password"
              type={isConfirmPwdVisible ? 'text' : 'password'}
              {...register('confirmpwd', {
                required: 'Field cannot be empty!',
                minLength: {
                  value: 5,
                  message: 'Minimum of 5 characters.',
                },
              })}
            />
            <div onClick={() => setIsConfirmPwdVisible(!isConfirmPwdVisible)}>
              <FontAwesomeIcon
                color="purple"
                size="2x"
                icon={isConfirmPwdVisible ? faEyeSlash : faEye}
              />
            </div>
          </div>
          <p>{errors.confirmpwd?.message}</p>

          <input
            placeholder="Name"
            {...register('name', {
              required: 'Field cannot be empty!',
              minLength: {
                value: 6,
                message: 'Minimum of 6 characters',
              },
              maxLength: {
                value: 30,
                message: 'Maximum of 30 characters',
              },
            })}
          />
          <p>{errors.name?.message}</p>

          <span className="redirect redirect-appear" onClick={() => history.push('/login')}>Login instead</span>
          <button type="submit">Create account</button>
        </Form>
      </FormBorder>
    </Container>
  );
};

export default CreateAccount;
