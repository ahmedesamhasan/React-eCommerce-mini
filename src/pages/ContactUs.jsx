import { useFormik } from 'formik';
import * as Yup from 'yup';
import PageIntro from '../components/ui/PageIntro';
import useLanguage from '../hooks/useLanguage';
import useToast from '../hooks/useToast';
import { formMessages } from '../data/formMessages';

function ContactUs() {
  const { t } = useLanguage();
  const { showToast } = useToast();

  const validationSchema = Yup.object({
    firstName: Yup.string().required(formMessages.firstNameRequired),
    lastName: Yup.string().required(formMessages.lastNameRequired),
    email: Yup.string().email(formMessages.invalidEmail).required(formMessages.emailRequired),
    phone: Yup.string(),
    message: Yup.string()
      .min(10, formMessages.messageMin)
      .max(500, formMessages.messageMax)
      .required(formMessages.messageRequired),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
    },
    validationSchema,
    onSubmit: (_, { resetForm }) => {
      showToast(t.successContact, 'success');
      resetForm();
    },
  });

  return (
    <section className='py-4'>
      <PageIntro eyebrow={t.contactEyebrow} title={t.sendMessage} description={t.formIntro} />

      <div className='d-flex justify-content-center'>
        <div className='card p-4 shadow-sm border-0 contact-card'>
          <form onSubmit={formik.handleSubmit} noValidate>
            <div className='row mb-3'>
              <div className='col-md-6'>
                <label htmlFor='firstName' className='form-label'>
                  First Name
                </label>
                <input
                  id='firstName'
                  type='text'
                  name='firstName'
                  className={`form-control ${
                    formik.touched.firstName && formik.errors.firstName ? 'is-invalid' : ''
                  }`}
                  {...formik.getFieldProps('firstName')}
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <div className='invalid-feedback d-block'>{formik.errors.firstName}</div>
                )}
              </div>

              <div className='col-md-6'>
                <label htmlFor='lastName' className='form-label'>
                  Last Name
                </label>
                <input
                  id='lastName'
                  type='text'
                  name='lastName'
                  className={`form-control ${
                    formik.touched.lastName && formik.errors.lastName ? 'is-invalid' : ''
                  }`}
                  {...formik.getFieldProps('lastName')}
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <div className='invalid-feedback d-block'>{formik.errors.lastName}</div>
                )}
              </div>
            </div>

            <div className='row mb-3'>
              <div className='col-md-6'>
                <label htmlFor='email' className='form-label'>
                  Email Address
                </label>
                <input
                  id='email'
                  type='email'
                  name='email'
                  className={`form-control ${
                    formik.touched.email && formik.errors.email ? 'is-invalid' : ''
                  }`}
                  {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className='invalid-feedback d-block'>{formik.errors.email}</div>
                )}
              </div>

              <div className='col-md-6'>
                <label htmlFor='phone' className='form-label'>
                  Phone Number
                </label>
                <input
                  id='phone'
                  type='text'
                  name='phone'
                  className='form-control'
                  {...formik.getFieldProps('phone')}
                />
              </div>
            </div>

            <div className='mb-3'>
              <label htmlFor='message' className='form-label'>
                Message
              </label>
              <textarea
                id='message'
                name='message'
                rows='5'
                className={`form-control ${
                  formik.touched.message && formik.errors.message ? 'is-invalid' : ''
                }`}
                {...formik.getFieldProps('message')}
              />
              {formik.touched.message && formik.errors.message && (
                <div className='invalid-feedback d-block'>{formik.errors.message}</div>
              )}
            </div>

            <button type='submit' className='btn btn-primary w-100'>
              {t.submit}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;
