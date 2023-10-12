import Image from 'next/image'
import image from '../../../../public/hero-image.png'
import FormSignUp from './form-sign-up/FormSignUp'


const page = () => {

  return (
    <>
      
        <div className='h-[100vh] w-full flex justify-center items-center'>
          <div className='grid grid-cols-1 xl:grid-cols-2 gap-5 w-full h-full '>
          <div className='p-12 max-w-[500px] mx-auto'>
                <Image width={100} height={100} sizes="100vw" className="h-full w-full object-contain" src={image} alt='demo-image' />
              </div>
            <div className='flex justify-center items-center p-2 md:p-20'>
              <FormSignUp/>
            </div>
          </div>
        </div>
    
    </>

  )
}

export default page