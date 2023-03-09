import styles from './styles.module.css';
import Spinner from 'react-bootstrap/Spinner';

interface LoadingProps {
  isLoading?: boolean
}

export default function Loading(props: LoadingProps) {
  const { isLoading } = props;
  if (!isLoading) return null;

  return (
    <div className={styles['loading']}>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  )
}
