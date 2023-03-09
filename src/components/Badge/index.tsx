import classNames from 'classnames';
import styles from './styles.module.css';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  canRemove?: boolean;
  onRemove?: () => void
}

export default function Badge(props: BadgeProps) {
  const { text, onRemove, canRemove, ...rest } = props;

  const handleRemove = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (onRemove) onRemove();
  }

  return (
    <div className={classNames(styles['badge'], rest.className, { [styles['removeable']]: canRemove })} {...rest}>
      <span>{text}</span>
      {canRemove && <img src='/assets/img/icons/times.svg' onClick={handleRemove} />}
    </div>
  )
}
