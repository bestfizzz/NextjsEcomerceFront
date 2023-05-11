import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import SlideShow from '@/components/SlideShow';
import { Typography } from '@material-tailwind/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState([])
  const [slideVisibility, setSlideVisibility] = useState(true)
  useEffect(() => {
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
        {!products ? '' : products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </Layout>
  )
}
