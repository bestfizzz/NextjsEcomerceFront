import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import SlideShow from '@/components/SlideShow';
import { Typography, Spinner, Alert } from '@material-tailwind/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState([])
  const [slideVisibility, setSlideVisibility] = useState()
  const [openAlert, setOpenAlert] = useState(false);
  useEffect(() => {
    if (openAlert == true) {
      setInterval(() => {
        setOpenAlert(false);
      }, 3000)
    }
  }, [openAlert])

  useEffect(() => {
    if (window.innerWidth <= 690) {
      setSlideVisibility(false)
    } else {
      setSlideVisibility(true)
    }
    window.addEventListener(
      "resize",
      () => {
        if (window.innerWidth <= 690) {
          setSlideVisibility(false)
        } else {
          setSlideVisibility(true)
        }
      }
    );
    axios.get('/api/products').then(response => {
      setProducts(response.data)
    }
    )
  }, [])

  return (
    <Layout>
      {slideVisibility ? <SlideShow /> : ''}
      <div className='mt-6 w-full border-b border-[#8f95ab]'>
        <Typography variant="h1">Products</Typography>
      </div>
      <div className="grid grid-cols-1 gap-4 justify-items-center mt-6
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4 
        xl:grid-cols-5
        xxl:grid-cols-6
        ">
        {!products ?
          <div className="flex justify-center">
            <Spinner className="h-12 w-12" />
          </div>
          :
          products.map((product, index) => (
            <ProductCard key={index} product={product} setOpenAlert={setOpenAlert} />
          ))}
      </div>
      <Alert
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }}
        className=' w-[95%] top-[15%] fixed'
      >
        Cart is updated
      </Alert>
    </Layout>
  )
}
