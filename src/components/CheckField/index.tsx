import { IOption } from '@/types/social';
import { Form, FormCheckProps, FormGroupProps, FormLabelProps } from 'react-bootstrap';
import { useController } from 'react-hook-form';

interface CheckFieldProps extends FormCheckProps {
  name: string;
  control: any;
  label?: string;
  formGroupProps?: FormGroupProps;
  labelProps?: FormLabelProps;
  options?: IOption[]
}

export default function CheckField(props: CheckFieldProps) {
  const {
    name,
    control,
    label,
    className,
    formGroupProps,
    labelProps,
    type,
    options = [],
    ...rest
  } = props;
  const {
    field,
    fieldState: { invalid, error },
  } = useController({ name, control });

  return (
    <Form.Group className={formGroupProps?.className}>
      {label && <Form.Label {...labelProps}>{label}</Form.Label>}
      {type === 'checkbox' && (
        <Form.Check
          id={`control_${name}`}
          className={className}
          type={type}
          label={label}
          {...rest}
          {...field}
        />
      )}

      <div>
        {type === 'radio' && options.map((option: IOption) => (
          <Form.Check
            inline
            label={option.label}
            type={'radio'}
            key={option.value}
            {...field}
            value={option.value}
          />
        ))}
      </div>

      {invalid && (
        <Form.Text className="text-danger">
          {error?.message}
        </Form.Text>
      )}
    </Form.Group>
  )
}
