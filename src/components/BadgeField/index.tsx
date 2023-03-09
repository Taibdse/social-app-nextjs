import { useMemo } from 'react';
import { Form, FormGroupProps } from 'react-bootstrap';
import { useController } from 'react-hook-form';
import Badge from '../Badge';

interface BadgeFieldProps {
  name: string;
  control: any;
  label?: string;
  options: string[];
  formGroupProps?: FormGroupProps;
  labelProps?: FormGroupProps;
}

export default function BadgeField(props: BadgeFieldProps) {
  const { name, control, label, formGroupProps, labelProps, options } = props;
  const {
    field,
    fieldState: { invalid, error },
  } = useController({ name, control });

  const unSelectedItems = useMemo(() => options.filter(option => !field.value?.includes(option)), [options, field.value])

  const handleSelectOption = (option: string) => {
    field.onChange([...field.value, option]);
  }

  const handleRemoveOption = (option: string) => {
    field.onChange(field.value?.filter((opt: string) => opt !== option));
  }

  return (
    <Form.Group className={formGroupProps?.className}>
      {label && <Form.Label {...labelProps}>{label}</Form.Label>}


      <div className='d-flex align-items-center mt-2 gap-2'>
        {field.value.map((selectedItem: string) => (
          <Badge
            key={selectedItem}
            text={selectedItem}
            canRemove
            onRemove={() => handleRemoveOption(selectedItem)}
          />
        ))}
      </div>
      <div className='d-flex align-items-center mt-2 gap-2'>
        {unSelectedItems.map(it => (<Badge text={it} key={it} onClick={() => handleSelectOption(it)} />))}
      </div>
      {invalid && (
        <Form.Text className="text-danger">
          {error?.message}
        </Form.Text>
      )}
    </Form.Group>
  )
}
