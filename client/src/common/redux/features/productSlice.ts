import { createSlice } from "@reduxjs/toolkit"
import { Iattribute, Igallery, IproductInfor } from "../../interfaces/product"

const initialState = {
    productInfor:{} as IproductInfor,
    isSave:false as boolean,
    gallerys:[] as Igallery[],
    attributes:[] as Iattribute[],
    sizes:[],
    colors:[],
    productId: null as string|number|null
}

const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{
        setProductInfor: (state, action) =>{
            state.productInfor = action.payload
        },
        setGallerys:(state, action) =>{
            state.gallerys = action.payload
        },
        setAttributes:(state, action) =>{
            state.attributes = action.payload
        },
        setSizes:(state, action) =>{
            state.sizes = action.payload
        },
        setColors:(state, action) =>{
            state.colors = action.payload
        },
        SetIsSave:(state, action) =>{
            state.isSave = action.payload
        },
        setProductId:(state, action) =>{
            state.productId = action.payload
        },
    }
})

export const {setProductInfor,setGallerys,setAttributes,setSizes,setColors,SetIsSave,setProductId} = productSlice.actions

export default productSlice.reducer