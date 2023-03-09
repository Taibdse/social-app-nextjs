import { defaultSocialValues, Icons, privacyOptions, socialFormValidationSchema, tags } from '@/common/constants';
import { saveSocial } from '@/common/storage';
import { formatDateTime } from '@/common/utils';
import BadgeField from '@/components/BadgeField';
import BannerUploadDialog from '@/components/BannerUploadDialog';
import CheckField from '@/components/CheckField';
import ContentEditableField from '@/components/ContentEditableField';
import InputField from '@/components/InputField';
import Loading from '@/components/Loading';
import SocialService from '@/services/socialService';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useMemo, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import styles from './styles.module.css';

declare const window: any;

export default function CreateSocialPage() {
  const [selectedBanner, setSelectedBanner] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const uploadDialogRef: any = useRef();
  const router = useRouter();
  const socialForm = useForm({
    resolver: yupResolver(socialFormValidationSchema),
    defaultValues: defaultSocialValues,
    mode: 'onChange',
  });

  const { control } = socialForm;
  const bannerBackground = useMemo(() => (selectedBanner ? `url(${selectedBanner}) 50% 50% no-repeat` : 'none'), [selectedBanner]);
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

    const date = new Date(`${startAtDate} ${startAtTime}`);
    if (date <= new Date()) {
      return toast.error('Please select the future datetime!');
    }

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
    setLoading(true);
    try {
      const res = await SocialService.create(data);
      toast.success('Created social successfully!');
      saveSocial(res.data);
      router.push(`/social/details/${res.data.id}`);
    } catch (error) {
      console.log(error);
      toast.error('Failed to create social!');
    } finally {
      setLoading(false);
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
              <Image src={Icons.Date} width={33} height={33} alt="" />
              <InputField
                type="date"
                placeholder='Date'
                control={control}
                name="startAtDate"
                formGroupProps={{ className: 'w-100' }}
              />
            </div>
            <div className='col-sm-6 d-flex align-items-start mb-5 gap-2'>
              <Image src={Icons.Time} alt="" width={33} height={33} />
              <InputField
                type="time"
                placeholder='Time'
                control={control}
                name="startAtTime"
                formGroupProps={{ className: 'w-100' }}
              />
            </div>
            <div className='col-12 d-flex align-items-start mb-3 gap-2'>
              <Image src={Icons.Marker} width={17} height={17} className="mt-3" alt="" />
              <InputField
                placeholder='Venue'
                control={control}
                name="venue"
                formGroupProps={{ className: 'w-100' }}
              />
            </div>
            <div className='col-6 d-flex align-items-start mb-3 gap-2'>
              <Image width={17} height={17} src={Icons.People} className="mt-3" alt="" />
              <InputField
                type="number"
                placeholder='Max capacity'
                control={control}
                name="capacity"
                formGroupProps={{ className: 'w-100' }}
              />
            </div>
            <div className='col-6 d-flex align-items-start mb-3 gap-2'>
              <Image width={17} height={17} src={Icons.Dollar} className="mt-3" alt="" />
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
                <Image width={28} height={28} src={Icons.UploadBanner} alt="" className={'mr-10'} />
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
      <Loading isLoading={isLoading} />
    </div>
  )
}
