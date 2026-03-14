import { useState } from 'react';
import PageIntro from '../components/ui/PageIntro';
import useLanguage from '../hooks/useLanguage';
import useToast from '../hooks/useToast';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { t } = useLanguage();
  const { showToast } = useToast();

  const handleSubmit = (event) => {
    event.preventDefault();
    showToast(t.loginSuccess, 'success');
  };

  return (
    <section className='py-4 auth-page'>
      <PageIntro eyebrow={t.loginEyebrow} title={t.loginTitle} description={t.loginIntro} />

      <div className='d-flex justify-content-center'>
        <div className='card p-4 shadow-sm border-0 auth-card'>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='loginEmail' className='form-label'>
                Email address
              </label>
              <input
                id='loginEmail'
                type='email'
                className='form-control'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='loginPassword' className='form-label'>
                Password
              </label>
              <input
                id='loginPassword'
                type='password'
                className='form-control'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            <button type='submit' className='btn btn-dark w-100'>
              {t.login}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
