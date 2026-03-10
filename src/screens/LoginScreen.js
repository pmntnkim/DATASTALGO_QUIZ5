import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import FormComponent from '../components/FormComponent';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { clearAuthError, loginUser } from '../store/slices/authSlice';

function LoginScreen() {
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  useEffect(() => () => dispatch(clearAuthError()), [dispatch]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser(formValues));
  };

  return (
    <div className="auth-layout">
      <FormComponent
        title="Login"
        fields={[
          { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'you@email.com' },
          { name: 'password', label: 'Password', type: 'password', required: true, placeholder: '••••••' },
        ]}
        values={formValues}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Sign In"
      />
      {loading && <Loader text="Signing in..." />}
      <Message text={error} type="error" />
      <p className="screen-link">
        No account yet? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default LoginScreen;
