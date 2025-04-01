import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import 'react-responsive-pagination/themes/classic.css';
import ResponsivePagination from 'react-responsive-pagination';
import ResponsivePaginationComponent from 'react-responsive-pagination';
import { counterContext } from '../common/MainContext';
import { ToastContainer, toast } from 'react-toastify';
export default function Product() {
  let { count, setCount } = useContext(counterContext)
  let [category, setCategory] = useState([])
  let [brand, setBrand] = useState([])
  let [product, setProduct] = useState([])

  let [sorting, setSorting] = useState(null)
  let [loadingStatus, setLoadingStatus] = useState(false)

  let [categorieFilter, setCategoryFilter] = useState([]) //Category Filter State
  let [brandFilter, setBrandFilter] = useState([]) //Brand Filter State
  let [rating, setrationg] = useState(null) //Brand Filter State
  let [priceFilter, setPriceFilter] = useState([null, null]) //Brand Filter State

  let [currentPage, setCurrentPage] = useState(1) //1
  let [totalPage, setTotalPage] = useState(0) //14



  let getCategory = () => {
    axios.get('https://wscubetech.co/ecommerce-api/categories.php')
      .then((res) => res.data)
      .then((finalres) => {
        setCategory(finalres.data)
      })
  }
  let getBrand = () => {
    axios.get('https://wscubetech.co/ecommerce-api/brands.php')
      .then((res) => res.data)
      .then((finalres) => {
        setBrand(finalres.data)
      })
  }

  let getProduct = () => {
    setLoadingStatus(true)
    axios.get(`https://wscubetech.co/ecommerce-api/products.php`, {
      params: {
        page: currentPage,
        limit: 12,
        sorting: sorting,
        name: '',
        price_from: priceFilter[0],
        price_to: priceFilter[1],
        discount_from: '',
        discount_to: '',
        rating: rating,
        brands: brandFilter.toString(),
        categories: categorieFilter.toString()     //["beauty","fragrances"]  // beauty,fragrances
      }
    }).then((res) => res.data)
      .then((finalRes) => {


        setTotalPage(finalRes.total_pages) //14

        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
        setProduct(finalRes.data)
        setLoadingStatus(false)
      })
  }

  useEffect(() => {
    getCategory()
    getBrand()
  }, [])


  //Category Filter

  let getCheckCategory = (event) => {
    if (event.target.checked) {
      //Checked CheckBox
      setCategoryFilter([...categorieFilter, event.target.value])
      //  console.log(event.target.value)
    }
    else {
      //unChecked CheckBox
      //ram

      //["ram","ravi","raj"]
      let finalANs = categorieFilter.filter((value) => value != event.target.value)


      setCategoryFilter(finalANs)
    }
  }

  let getCheckBrand = (event) => {
    if (event.target.checked) {
      //Checked CheckBox
      setBrandFilter([...brandFilter, event.target.value])
      //  console.log(event.target.value)
    }
    else {
      //unChecked CheckBox
      //ram

      //["ram","ravi","raj"]
      let finalANs = brandFilter.filter((value) => value != event.target.value)


      setBrandFilter(finalANs)
    }
  }

  useEffect(() => {
    getProduct()
  }, [sorting, categorieFilter, brandFilter, rating, priceFilter, currentPage])

  let clearAll = () => {
    setSorting(null)
    setCategoryFilter([])
    setBrandFilter([])
    setrationg(null)
    setPriceFilter([null, null])
    setCurrentPage(1)
  }
  return (
    <>
      <ToastContainer />
      <div className='my-7 grid grid-cols-[20%_auto] gap-5'>


        <div>

          <button className='bg-red-600 text-white p-3' onClick={clearAll}>Clear All Filter</button>

          {count}
          <button className='bg-red-600 text-white p-3' onClick={() => setCount(count - 1)}>Change Counter</button>
          <div className='border-1 border-[#ccc] p-3 h-[220px] overflow-y-scroll'>
            <h3 className='font-bold'>categories </h3>

            <ul>
              {category.map((items, index) => <li className='mt-3'>
                <input type="checkbox" onChange={getCheckCategory} checked={categorieFilter.includes(items.slug)} value={items.slug} />

                {items.name} </li>)}


            </ul>
          </div>

          <div className='border-1 border-[#ccc] p-3 h-[220px] overflow-y-scroll'>
            <h3 className='font-bold'>Brand </h3>

            <ul>
              {brand.map((items, index) => <li className='mt-3'>
                <input type="checkbox" onChange={getCheckBrand} value={items.slug} />

                {items.name} </li>)}
            </ul>
          </div>

          <div className='border-1 border-[#ccc] p-3'>
            <h3 className='font-bold'>Price </h3>

            <ul>
              <li className='mt-3'>  <input type="radio" name='price' onChange={() => setPriceFilter([10, 250])} />   Rs. 10 to Rs. 250 </li>
              <li className='mt-3'>  <input type="radio" name='price' onChange={() => setPriceFilter([250, 500])} />   Rs. 250 to Rs. 500 </li>
              <li className='mt-3'>  <input type="radio" name='price' onChange={() => setPriceFilter([500, 1000])} />   Rs. 500 to Rs. 1000 </li>
              <li className='mt-3'>  <input type="radio" name='price' onChange={() => setPriceFilter([1000, 88888888888])} />   Rs. 1000 to Above </li>

            </ul>
          </div>

          <div className='border-1 border-[#ccc] p-3'>
            <h3 className='font-bold'>DISCOUNT RANGE </h3>

            <ul>
              <li className='mt-3'>  <input type="radio" />   5% and above </li>
              <li className='mt-3'>  <input type="radio" />  10% and above </li>
              <li className='mt-3'>  <input type="radio" />   15% and above </li>
              <li className='mt-3'>  <input type="radio" />   20% and above </li>

            </ul>
          </div>
          <div className='border-1 border-[#ccc] p-3'>
            <h3 className='font-bold'>Rating </h3>

            <ul>
              <li className='mt-3'>  <input type="radio" name='rating' onChange={() => setrationg(4)} />  4★ & above </li>
              <li className='mt-3'>  <input type="radio" name='rating' onChange={() => setrationg(3)} />  3★ & above </li>
              <li className='mt-3'>  <input type="radio" name='rating' onChange={() => setrationg(2)} />  2★ & above </li>
              <li className='mt-3'>  <input type="radio" name='rating' onChange={() => setrationg(1)} />   1★ & above </li>

            </ul>
          </div>
        </div>
        <div className='mr-7'>
          <div className='flex justify-end'>
            <select name="" id="" className='border-1' onChange={(event) => setSorting(event.target.value)}>
              <option value={1}>Name : A to Z</option>
              <option value={2}>Name : Z to A</option>
              <option value={3}>Price : Low to High</option>
              <option value={4}>Price : High to Low</option>
            </select>
          </div>
          <div>
            <div className='grid  grid-cols-4 gap-5'>
              {

                loadingStatus ?
                  <>
                    <LoadingFunction />
                    <LoadingFunction />
                    <LoadingFunction />
                    <LoadingFunction />

                  </>
                  :

                  product.map((items, index) => <ProductItems pdata={items} />)


              }
            </div>

            <ResponsivePagination
              current={currentPage}
              total={totalPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </>

  )
}


function ProductItems({ pdata }) {
  let { cart, setCart } = useContext(counterContext)
  let { image, name, description, price, id } = pdata;

  let checkProductinCart = cart.filter((items) => items.id == id)

  let [qty, setQty] = useState((checkProductinCart.length == 1) ? checkProductinCart[0].quantity : 1) //2
  console.log(checkProductinCart)

  let addtoCart = () => {
    let cartObj = {
      name,
      image,
      price,

      quantity: 1,
      id
    }
    setCart([...cart, cartObj])
    toast.success("Product Added to Cart")

  }


  return (
    <div className='shadow-2xl'>
      <img src={image} />

      <div className='p-3'>
        <h3 className='font-bold mb-4 text-red-600'>
          {name} {id}
        </h3>

        <p className='line-clamp-2'>
          {description}
        </p>

        <h4 className='font-bold mt-4'>

          Rs  {price}
        </h4>
        {checkProductinCart.length == 1

          ?
          <div className='flex justify-end mx-auto'>
            <button onClick={() => {
              
              setQty(qty - 1)
              
              let qtyUpdateFinal = cart.filter((items) => {
                if (items.id == id) {
                  //Id Matched
                  items['quantity'] = qty - 1
                }
                return items
          
              })
              setCart(qtyUpdateFinal)
              toast.success("quantity Update in Cart"+id)
              
              }} 
              
              
              
              className='bg-red-500 p-[5px_10px]'>-</button>
            <input className='w-[50px] border-1 text-center' value={qty} type="text" />
            <button onClick={() =>{
               setQty(qty + 1)
               let qtyUpdateFinal = cart.filter((items) => {
                if (items.id == id) {
                  //Id Matched
                  items['quantity'] = qty + 1
                }
                return items
          
              })
              setCart(qtyUpdateFinal)
              toast.success("quantity Update in Cart"+id)
            }} className='bg-red-500 p-[5px_10px]'>+</button>
          </div>
          :
          <button onClick={addtoCart} className='bg-red-600 text-white p-1 mt-4'>Add to Cart</button>

        }

      </div>
    </div>
  )
}


function LoadingFunction() {
  return (
    <div class="mx-auto w-full max-w-sm rounded-md border border-blue-300 p-4">
      <div class="flex animate-pulse space-x-4">
        <div class="size-10 rounded-full bg-gray-200"></div>
        <div class="flex-1 space-y-6 py-1">
          <div class="h-2 rounded bg-gray-200"></div>
          <div class="space-y-3">
            <div class="grid grid-cols-3 gap-4">
              <div class="col-span-2 h-2 rounded bg-gray-200"></div>
              <div class="col-span-1 h-2 rounded bg-gray-200"></div>
            </div>
            <div class="h-2 rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  )
}