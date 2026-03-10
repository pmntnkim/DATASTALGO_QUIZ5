import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import FormComponent from '../components/FormComponent';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { clearAuthError, registerUser } from '../store/slices/authSlice';

function RegisterScreen() {
  const [formValues, setFormValues] = useState({ name: '', email: '', password: '' });
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
    dispatch(registerUser(formValues));
  };

  return (
    <div className="auth-layout">
      <FormComponent
        title="Register"
        fields={[
          { name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Your name' },
          { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'you@email.com' },
          { name: 'password', label: 'Password', type: 'password', required: true, placeholder: '••••••' },
        ]}
        values={formValues}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Register"
      />
      {loading && <Loader text="Creating account..." />}
      <Message text={error} type="error" />
      <p className="screen-link">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default RegisterScreen;
