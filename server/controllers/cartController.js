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
        const product = await ProductModel.findOne({_id:productId})
        if(!product){
            return res.status(404).json({
                message:"Sản phẩm không tồn tại"
            })
        }
        if (!cart) {
            const newCart = new CartModel({
                userId: userId,
                items: [
                    {
                        productId: productId,
                        attributeId: attributeId,
                        quantity: quantity,
                        totalPrice:Number(product.price_new * quantity)
                    }
                ],
                total:Number(product.price_new * quantity)
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
                        quantity,
                        totalPrice:Number(product.price_new * quantity)
                    }
                )
                const sumTotal = cart.items.reduce((sum,cartItem)=> sum + cartItem.totalPrice, 0)
                cart.total = sumTotal
                await cart.save()
                return res.status(200).json({
                    message: "Thêm mới sản phẩm vào giỏ hàng thành công"
                })
            }else{
                checkProduct.quantity = checkProduct.quantity + quantity
                // totalPrice = 200
                //client gửi lên : số lượng 3; giá sp 50 ; 50 * 3 = 150
                // cộng dồn: 200 + 150 = 350

                // tính lại
                // sl hiện tại là 3
                 //client gửi lên : số lượng 3 + sl hiện tại = 6
                 // totalPrice = 6 * giá sp 
                 checkProduct.totalPrice = Number(checkProduct.quantity * product.price_new)
                 const sumTotal = cart.items.reduce((sum,cartItem)=> sum + cartItem.totalPrice, 0)
                 cart.total = sumTotal
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
        // {productId: "jdhfjdfh", attributeId:"dfjjdfhdj", quantity:3 , totalPrice:200}
        const product = await ProductModel.findOne({_id:cartItem.productId})
        const attribute = product.attributes.find((item) => item._id == cartItem.attributeId )
        if(cartItem.quantity < attribute.instock){
            cartItem.quantity = Number(cartItem.quantity + 1)
            cartItem.totalPrice =Number(product.price_new * cartItem.quantity)
            const sumTotal = cart.items.reduce((sum,cartItem)=> sum + cartItem.totalPrice, 0)
            cart.total = sumTotal
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
        const product = await ProductModel.findOne({_id:cartItem.productId})
        cartItem.quantity = Number(cartItem.quantity - 1)
        cartItem.totalPrice =Number(product.price_new * cartItem.quantity)
        if(cartItem.quantity == 0){
            const newItems = cart.items.filter((item) => item._id !== cartItem._id )
            cart.items = newItems
        }
        const sumTotal = cart.items.reduce((sum,cartItem)=> sum + cartItem.totalPrice, 0)
        cart.total = sumTotal
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
            cartItem.totalPrice =Number(product.price_new * cartItem.quantity)
            const sumTotal = cart.items.reduce((sum,cartItem)=> sum + cartItem.totalPrice, 0)
            cart.total = sumTotal
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

