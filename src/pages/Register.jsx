import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageIntro from '../components/ui/PageIntro';
import useLanguage from '../hooks/useLanguage';
import useToast from '../hooks/useToast';

function Register() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [event.target.name]: event.target.value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [event.target.name]: '',
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (/\s/.test(formData.username)) {
      newErrors.username = 'Username should not contain spaces';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Password must be 8+ chars, with Upper, Lower, Number and Special char';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      showToast(t.registerSuccess, 'success');
      navigate('/login');
    }
  };

  return (
    <section className='py-4'>
      <PageIntro eyebrow={t.registerEyebrow} title={t.registerTitle} description={t.registerIntro} />

      <div className='d-flex justify-content-center'>
        <div className='card p-4 shadow-sm border-0 register-card'>
          <form onSubmit={handleSubmit} noValidate>
            {[
              { id: 'name', label: 'Name', type: 'text' },
              { id: 'username', label: 'Username', type: 'text' },
              { id: 'email', label: 'Email address', type: 'email' },
              { id: 'password', label: 'Password', type: 'password' },
              { id: 'confirmPassword', label: 'Confirm Password', type: 'password' },
            ].map((field) => (
              <div className='mb-3' key={field.id}>
                <label htmlFor={field.id} className='form-label'>
                  {field.label}
                </label>
                <input
                  id={field.id}
                  type={field.type}
                  name={field.id}
                  className={`form-control ${errors[field.id] ? 'is-invalid' : ''}`}
                  value={formData[field.id]}
                  onChange={handleChange}
                />
                {errors[field.id] && <div className='invalid-feedback d-block'>{errors[field.id]}</div>}
                {field.id === 'password' && (
                  <div className='form-text'>Use 8+ chars with upper, lower, number and symbol.</div>
                )}
              </div>
            ))}

            <button type='submit' className='btn btn-primary w-100'>
              {t.register}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Register;
