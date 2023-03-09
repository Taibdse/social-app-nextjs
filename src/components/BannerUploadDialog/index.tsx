import classNames from 'classnames';
import { forwardRef, useImperativeHandle, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from './styles.module.css';

const banners = [
  'https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_1.jpg',
  'https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_2.jpg',
  'https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_3.jpg',
  'https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_4.jpg',
  'https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_5.jpg',
  'https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_6.jpg',
  'https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_7.jpg',
  'https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_8.jpg',
  'https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_9.jpg',
  'https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_10.jpg',
]

function BannerUploadDialog(props: any, ref: any) {
  const { onSave, onClose, ...rest } = props;
  const [selectedBanner, setSelectedBanner] = useState<string | null>(null);
  const [show, setShow] = useState<boolean>(false);

  const handleSelect = (banner: string) => {
    setSelectedBanner(banner)
  }

  const handleSave = () => {
    onSave(selectedBanner);
  }

  const handleClose = () => {
    setShow(false);
  }

  useImperativeHandle(ref, () => ({
    setSelectedBanner,
    setShow
  }), [selectedBanner])

  return (
    <Modal
      {...rest}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      dialogClassName={styles['modal-90w']}
      centered
      show={show}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Choose a banner
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='row'>
          {banners.map((banner: string) => (
            <div className='col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-3' key={banner}>
              <img
                onClick={() => handleSelect(banner)}
                src={banner}
                alt={banner}
                className={classNames(styles['banner'], {
                  [styles['selected']]: selectedBanner === banner
                })}
              />
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className={styles['close-btn']} onClick={handleClose}>Close</Button>
        <Button className={styles['save-btn']} onClick={handleSave}>Save</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default forwardRef(BannerUploadDialog)
