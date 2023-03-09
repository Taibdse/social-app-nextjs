import { Form } from 'react-bootstrap';
import { useController } from 'react-hook-form';

interface ContentEditableFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  control: any;
  defaultValue?: string
}

export default function ContentEditableField(props: ContentEditableFieldProps) {
  const {
    name,
    control,
    defaultValue,
    ...rest
  } = props;
  const {
    field,
    fieldState: { invalid, error },
  } = useController({ name, control });

  const handleChange = (e: any) => {
    field.onChange(e.target.textContent);
  }

  return (
    <>
      <div
        {...rest}
        {...field}
        onInput={handleChange}
        contentEditable
        suppressContentEditableWarning
      >{defaultValue}</div>
      {invalid && (
        <Form.Text className="text-danger">
          {error?.message}
        </Form.Text>
      )}
    </>
  )
}
