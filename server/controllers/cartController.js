import CartModel from "../models/cartModel.js"
import ProductModel from "../models/productModel.js"

export const getCarts = async (req, res) => {
    try {
        const carts = await CartModel.findOne({
            userId: req.params.userId
        })
        .populate('items.productId')
        return res.status(200).json(carts)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const addToCart = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { productId, attributeId, quantity } = req.body
        const cart = await CartModel.findOne({ userId: userId })
        if (!cart) {
            const newCart = new CartModel({
                userId: userId,
                items: [
                    {
                        productId: productId,
                        attributeId: attributeId,
                        quantity: quantity
                    }
                ],
            })
            await newCart.save()
            return res.status(200).json({
                message: "Tạo giỏ hàng mới thành công"
            })
        } else {
            const checkProduct = cart.items.find((item) => (item.productId == productId && item.attributeId == attributeId))
            console.log(checkProduct)
            if (!checkProduct) {
                cart.items.push(
                    {
                        productId,
                        attributeId,
                        quantity
                    }
                )
                await cart.save()
                return res.status(200).json({
                    message: "Thêm mới sản phẩm vào giỏ hàng thành công"
                })
            }else{
                checkProduct.quantity = checkProduct.quantity + quantity
                await cart.save()
                return res.status(200).json({
                    message: "Đã tăng số lượng sản phẩm"
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const increaseCart = async(req,res) =>{
    try {
        const userId = req.params.userId;
        const { productId, attributeId } = req.body
        const cart = await CartModel.findOne({ userId: userId })
        const cartItem = cart.items.find((cart) => (cart.productId == productId && cart.attributeId == attributeId) )
        const product = await ProductModel.findOne({_id:cartItem.productId})
        const attribute = product.attributes.find((item) => item._id == cartItem.attributeId )
        if(cartItem.quantity < attribute.instock){
            cartItem.quantity = Number(cartItem.quantity + 1)
        }
        await cart.save()
        return res.status(200).json({
            message:"Tăng số lượng thành công !"
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}
export const decreaseCart = async(req,res) =>{
    try {
        const userId = req.params.userId;
        const { productId, attributeId } = req.body
        const cart = await CartModel.findOne({ userId: userId })
        const cartItem = cart.items.find((cart) => (cart.productId == productId && cart.attributeId == attributeId) )
      
        cartItem.quantity = Number(cartItem.quantity - 1)
        if(cartItem.quantity == 0){
            const newItems = cart.items.filter((item) => item._id !== cartItem._id )
            cart.items = newItems
        }
        await cart.save()
        return res.status(200).json({
            message:"Giảm số lượng thành công !"
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}
export const updateQuantityCart = async(req,res) =>{
    try {
        const userId = req.params.userId;
        const { productId, attributeId,quantity } = req.body
        const cart = await CartModel.findOne({ userId: userId })
        const cartItem = cart.items.find((cart) => (cart.productId == productId && cart.attributeId == attributeId) )
        const product = await ProductModel.findOne({_id:cartItem.productId})
        const attribute = product.attributes.find((item) => item._id == cartItem.attributeId )
        if(quantity < attribute.instock){
            cartItem.quantity = Number(quantity)
        }else{
            return res.status(400).json({
                message:"Cập nhật số lượng thất bại !"
            }) 
        }
        await cart.save()
        return res.status(200).json({
            message:"Cập nhật số lượng thành công !"
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

