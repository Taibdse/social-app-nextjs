import { Icons } from '@/common/constants';
import { getSocials } from '@/common/storage';
import { formatDate, formatTime } from '@/common/utils';
import Loading from '@/components/Loading';
import SocialService from '@/services/socialService';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';

export default function SocialDetailsPage() {
  const [isLoading, setLoading] = useState(false);
  const [notfound, setNotfound] = useState(false);
  const [social, setSocial] = useState<any>(null);
  const router = useRouter();
  const { id }: any = router.query;
  console.log({ id })

  useEffect(() => {
    if (id) getSocialDetails();
  }, [id]);

  const getSocialDetails = async () => {
    // setLoading(true)
    // try {
    //   const res = await SocialService.getById(id);
    //   console.log(res)
    //   setSocial(res.data);
    //   if (!res.data) setNotfound(true);
    // } catch (error) {
    //   setNotfound(true);
    // } finally {
    //   setLoading(false);
    // }
    const socials = getSocials();
    const foundSocial = socials.find((s: any) => s.id === id);
    if (!foundSocial) setNotfound(true);
    setSocial(foundSocial);
  }

  if (isLoading) return <Loading isLoading />

  if (notfound) return <h1 className='mt-5 text-center'>Not found</h1>

  if (social) return (
    <div className='pb-5'>
      <div className="row mt-5">
        <div className="col-md-5">
          <div className={styles['title']}>{social.title}</div>
          <div className='row mt-4'>
            <div className='col-sm-6 d-flex align-items-start mb-5 gap-2 pr-0'>
              <Image src={Icons.Date} width={33} height={33} alt="" />
              <div className={styles['datetime-field-value']}>{formatDate(new Date(social.startAt))}</div>
            </div>
            <div className='col-sm-6 d-flex align-items-center mb-5 gap-2 pl-0'>
              <Image src={Icons.Time} alt="" width={33} height={33} className="" />
              <div className={styles['datetime-field-value']}>{formatTime(new Date(social.startAt))}</div>
            </div>
            <div className='col-12 d-flex align-items-center mb-3 gap-2'>
              <Image src={Icons.Marker} width={17} height={17} alt="" />
              <div className={styles['field-value']}>{social.venue}</div>
            </div>
            <div className='col-4 d-flex align-items-center mb-3 gap-2'>
              <Image width={17} height={17} src={Icons.People} alt="" />
              <div className={styles['field-value']}>{social.capacity} people</div>
            </div>
            <div className='col-3 d-flex align-items-center mb-3 gap-2'>
              <Image width={17} height={17} src={Icons.Dollar} alt="" />
              <div className={styles['field-value']}>{social.price ? '$' : ''}{social.price}</div>
            </div>
          </div>
        </div>
        <div className="col-md-7">
          <div
            style={{ backgroundImage: `url(${social.banner})` }}
            className={styles['banner']}
          ></div>
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-6'>
          <div className={styles['description']}>{social.description}</div>
        </div>
      </div>
    </div>
  )
}
