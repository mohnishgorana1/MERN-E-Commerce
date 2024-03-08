import { Link } from 'react-router-dom'

function MensProductListingPage() {
  return (
    <div className='w-full h-[86vh] font-bold text-3xl text-center sm:text-5xl flex flex-col gap-8 justify-center items-center bg-gray-300 text-gray-800'>
      <h1>Page is in Maintenance State!</h1>
      <div className='text-lg font-normal'>
        Check all <Link to='/products' className='font-semibold text-blue-500 hover:underline'>Products</Link>        
      </div>
    </div>
    
  )
}

export default MensProductListingPage