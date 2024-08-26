import CartModel from "../models/cartModel.js"
import ProductModel from "../models/productModel.js"

export const getCarts = async (req, res) => {
    try {
        const carts = await CartModel.find({
            userId: req.params.userId
        })
            .populate('items.productId')
        if (!carts) {
            return res.status(404).json({
                message: "Cart not found !"
            })
        }
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
