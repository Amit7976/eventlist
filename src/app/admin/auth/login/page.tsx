import { auth } from '@/nextAuth/auth';
import { redirect } from 'next/navigation';
import MainContent from './MainContent';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const page = async () => {


  const session = await auth();

  if (session?.user) {
    redirect("/admin")
  }


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  return (
    <>
      <div className='bg-white dark:bg-neutral-900'>
        <Header position='relative' />
        <MainContent />
        <Footer />
     </div>
    </>
  )
}

export default page