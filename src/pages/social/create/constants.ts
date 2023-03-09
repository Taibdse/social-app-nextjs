import { validateHhMm } from '@/common/utils';
import * as yup from 'yup';

export const socialFormValidationSchema = yup
  .object()
  .shape({
    title: yup.string().required('Title is required!'),
    startAtDate: yup.date()
      .typeError('Date value is required!')
      .required('Date is required!'),
    startAtTime: yup.string()
      .typeError('Time value is required!')
      .required('Time is required!')
      .test('time-format', 'Time format error!', (value: string): boolean => {
        console.log(value)
        return validateHhMm(value);
      }),
    venue: yup.string().required('Venue is required!'),
    capacity: yup.number()
      .typeError('Must be number')
      .integer('Must be integer value!')
      .min(1, 'Min is 1')
      .max(10000, 'Max is 10000')
      .required('Capacity is required!'),
    description: yup.string().required('Description is required!'),
    tags: yup.array().min(1, 'Tags are required!'),
    privacy: yup.string().required('Privacy is required!'),
  })
  .required();

export const defaultSocialValues = {
  title: '',
  startAtDate: null,
  startAtTime: null,
  venue: '',
  capacity: '',
  price: null,
  description: '',
  banner: '',
  tags: [],
  isManualApprove: false,
  privacy: null,
}

export const privacyOptions = [
  { value: 'Public', label: 'Public' },
  { value: 'Curated Audience', label: 'Curated Audience' },
  { value: 'Community Only', label: 'Community Only' },
]

export const tags = [
  'Engineering',
  'Product ',
  'Marketing',
  'Design',
]
