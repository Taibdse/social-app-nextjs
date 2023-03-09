import { Icons } from '@/common/constants';
import { formatDateTime } from '@/common/utils';
import BadgeField from '@/components/BadgeField';
import BannerUploadDialog from '@/components/BannerUploadDialog';
import CheckField from '@/components/CheckField';
import ContentEditableField from '@/components/ContentEditableField';
import InputField from '@/components/InputField';
import SocialService from '@/services/socialService';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import { useMemo, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
// import { defaultSocialValues, privacyOptions, socialFormValidationSchema, tags } from './constants';
import styles from './styles.module.css';

declare const window: any;

export default function CreateSocialSection() {
  const [selectedBanner, setSelectedBanner] = useState<string | null>(null);
  const uploadDialogRef: any = useRef();
  const socialForm = useForm({
    resolver: yupResolver(socialFormValidationSchema),
    defaultValues: defaultSocialValues,
    mode: 'onChange',
  });

  const { control } = socialForm;
  const bannerBackground = useMemo(() => (selectedBanner ? `url(${selectedBanner}) no-repeat` : 'none'), [selectedBanner]);
  const handleOpenUploadDialog = () => {
    uploadDialogRef.current.setShow(true);
    if (selectedBanner) uploadDialogRef.current.setSelectedBanner(selectedBanner);
  }

  const handleSaveBanner = (banner: string | null) => {
    setSelectedBanner(banner);
    uploadDialogRef.current.setShow(false);
  }

  const handleCreateSocial = async () => {
    window.socialForm = socialForm;
    const isFormValid = await socialForm.trigger();
    if (!isFormValid) {
      return toast.error('Please check input fields!');
    } else if (!selectedBanner) {
      return toast.error('Please select banner!');
    }
    const {
      title,
      startAtDate,
      startAtTime,
      venue,
      capacity,
      price,
      description,
      tags,
      isManualApprove,
      privacy
    } = socialForm.getValues();
    const data = {
      title,
      startAt: formatDateTime(startAtDate, startAtTime),
      venue,
      capacity,
      price,
      description,
      banner: selectedBanner,
      tags,
      isManualApprove,
      privacy
    }
    console.log(data)

    try {
      const res = await SocialService.create(data);
      console.log(res);
      toast.success('Created social successfully!');
    } catch (error) {
      console.log(error);
      toast.error('Failed to create social!');
    }
  }

  return (
    <div className='pb-5'>
      <div className="row mt-5">
        <div className="col-md-5">
          <ContentEditableField
            name="title"
            control={control}
            className={styles['event-title']}
            defaultValue='Untitle Event'
          />
          <div className='row mt-4'>
            <div className='col-sm-6 d-flex align-items-start mb-5 gap-2'>
              <img src={Icons.Date} className="" alt="" />
              <InputField
                type="date"
                placeholder='Date'
                control={control}
                name="startAtDate"
                formGroupProps={{ className: 'w-100' }}
              />
            </div>
            <div className='col-sm-6 d-flex align-items-start mb-5 gap-2'>
              <img src={Icons.Time} alt="" className={classNames(styles['icon-lg'])} />
              <InputField
                type="time"
                placeholder='Time'
                control={control}
                name="startAtTime"
                formGroupProps={{ className: 'w-100' }}
              />
            </div>
            <div className='col-12 d-flex align-items-start mb-3 gap-2'>
              <img src={Icons.Marker} className="mt-3" alt="" />
              <InputField
                placeholder='Venue'
                control={control}
                name="venue"
                formGroupProps={{ className: 'w-100' }}
              />
            </div>
            <div className='col-6 d-flex align-items-start mb-3 gap-2'>
              <img src={Icons.People} className="mt-3" alt="" />
              <InputField
                type="number"
                placeholder='Max capacity'
                control={control}
                name="capacity"
                formGroupProps={{ className: 'w-100' }}
              />
            </div>
            <div className='col-6 d-flex align-items-start mb-3 gap-2'>
              <img src={Icons.Dollar} className="mt-3" alt="" />
              <InputField
                type="number"
                placeholder='Cost per person'
                control={control}
                name="price"
                formGroupProps={{ className: 'w-100' }}
              />
            </div>
          </div>
        </div>
        <div className="col-md-7">
          <div
            style={{ background: bannerBackground }}
            className={styles['upload-banner']}
            onClick={handleOpenUploadDialog}
          >
            {!selectedBanner && (
              <div>
                <img src={Icons.UploadBanner} alt="" className={'mr-10'} />
                <span className='ml-3'>Add a banner</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-6'>
          <div className='mb-4'>
            <InputField
              name='description'
              label='Description'
              placeholder='Description of your event..'
              as="textarea"
              className={styles['event-desc-input']}
              formGroupProps={{ className: 'mb-3' }}
              control={control}
            />
          </div>

          <div className={styles['event-settings-box']}>
            <div className={styles['event-settings-box__header']}>Settings</div>
            <div className='my-4'>
              <CheckField
                name="isManualApprove"
                control={control}
                label="I want to approve attendees"
                type='checkbox'
              />
            </div>

            <div className='mb-4'>
              <CheckField
                label='Privacy'
                labelProps={{ className: styles['event-settings-box__label'] }}
                options={privacyOptions}
                control={control}
                name="privacy"
                type='radio'
              />
            </div>
            <div className='mb-4'>
              <Form.Label className={styles['event-settings-box__label']}>Tag your social</Form.Label>
              <div className='text-normal'>Pick tags for our curation engine to work its magin</div>
            </div>
            <div className='mb-4'>
              <BadgeField
                name="tags"
                control={control}
                options={tags}
              />
            </div>
          </div>
          <div className='mt-4 mb-5'>
            <button onClick={handleCreateSocial} className={styles['create-social-btn']}>CREATE SOCIAL</button>
          </div>
        </div>
      </div>
      <BannerUploadDialog
        onSave={handleSaveBanner}
        ref={uploadDialogRef}
      />
    </div>
  )
}
