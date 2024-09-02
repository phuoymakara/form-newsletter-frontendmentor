/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import Image from "next/image";
import data from '@/data.json';
import { useEffect, useState } from "react";
import { Card } from "@/components/card";
import { ConfirmPayment } from "@/components/order";
import { SubmitForm } from "@/components/form";
import { SuccessState } from "@/components/success";
export interface IProducts{
  id: number;
  name: string;
  category: string;
  price: number;
  image:{
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
}

export interface IProductCart{
  id: number;
  name: string;
  price: number;
  qty: number;
  price_perUnit: number;
  image?: string;
}
export interface ICart{
  products: IProductCart[] | [];
  total: number;
}
//const [cart,setCart] = useState<ICart>()


export default function Home() {
  const [isSuccess,setIsSuccess] = useState(false)
  const[email,setEmail]= useState('')
  const [products,setProducts] = useState<Array<IProducts>>([])
  const [cart,setCart] = useState<ICart>({
    products: [],
    total: 0,
  })
  const[isOrder,setIsOrder] = useState<boolean>(false)

  useEffect(() =>{
    if(products.length<=0){
      setProducts(data)
    }
  },[])

  const handleCancelProduct = (id:number) =>{
    setCart((pre: ICart) =>{
      let newProduct = [...pre.products]
      if(id){
        newProduct = newProduct.filter((ft) => ft.id !== id)
      }
      const updatedTotal = newProduct.reduce((sum, prod) => sum + prod.price_perUnit, 0) ;
      return{
        products: newProduct,
        total: updatedTotal
      }
    })
  }
  //let cartss= 
  return (
    <>
     {!isSuccess && <div className="flex p-6 justify-center items-center">
        <SubmitForm  setEmail={setEmail} setIsSuccess={setIsSuccess}/>
      </div>
      }
     { isSuccess &&  <div className="flex justify-center items-center pt-10">
        <SuccessState email={email}/>
      </div>}
    </>
  );
}
