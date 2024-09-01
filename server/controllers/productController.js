
import ProductModel from "../models/productModel.js"
import Category from "../models/categoryModel.js";
export const createProduct = async (req, res) => {
    try {
        const product = await ProductModel.create(req.body)
        return res.status(200).json(product)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}
export const getAllProduct = async (req, res) => {
    try {
        const { _slug, _minPrice, _maxPrice,_limit, _page,_sizes,_colors,_search,sell_order } = req.query;
        const limit = _limit|| 2 ;
        const page = parseInt(_page)|| 1;
        const skip = limit * (page-1)
        let sort = {}
        let query = {
            $and:[{price_new:{$gte:_minPrice || 0}},{price_new:{$lte:_maxPrice || 10000000}}]
        };
        if(sell_order){
            if(sell_order == 'productnew'){
                sort["createdAt"] = -1
            }
            if(sell_order == 'asc'){
                sort["price_new"] = 1
            }
            if(sell_order == 'desc'){
                sort["price_new"] = -1
            }

        }
        if (_slug) {
            // Tìm categoryId dựa trên slug
            const arraySlug = _slug.split(',')
            const category = await Category.find({
                slug: {$in: arraySlug}
            });
            if (category) {
                const newCategoryId = category.map((item) => item._id)
              query['categoryId'] = {$in:newCategoryId}
            } else {
              return res.status(404).json({ message: 'Category not found' });
            }
          }

          if(_sizes){
            query['sizes'] = {$in:_sizes.split(',')}
          }
          if(_colors){
            query['colors'] = {
                $elemMatch:{
                    name:{$in:_colors.split(',').map((name) => new RegExp(name, 'i'))}
                }
            }
          }
          if(_search){
            query['name'] = {$regex:`${_search}`,$options: "i"  }
          }
        const products = await ProductModel
        .find(query)
        .limit(limit)
        .skip(skip)
        .sort(sort)
        .populate('categoryId')
        const total = await ProductModel.countDocuments(query)
        const totalPage = Math.ceil(total/limit)
        return res.status(200).json({
            products,
            total,
            totalPage,
            currentPage:page
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const getProductSlider = async (req, res) => {
    try {
        const genderQuery = req.query._gender|| '';
        const featuredQuery = req.query._isFeatured || '';
        const discountQuery = req.query._isSale || '';
        const queryProduct = {}
        if(genderQuery){
            queryProduct["gender"] = {$in:[genderQuery,'unisex']}
        }
        if(featuredQuery){
            queryProduct["featured"] = featuredQuery
        }
        if(discountQuery){
            queryProduct["discount"] = {$gte:discountQuery}
        }
        const products = await ProductModel.find(queryProduct).populate('categoryId')
        return res.status(200).json(products)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const updateAttributeProduct = async (req, res) => {
    try {
        const product = await ProductModel.findById({ _id: req.params.productId })
        const newAttributes = product.attributes.map((item) => item._id == req.body._id ? req.body : item)
        product.attributes = newAttributes
        await product.save()
        return res.status(200).json({
            message: 'Cập nhật số lượng thành công'
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}
export const addSizes = async (req, res) => {
    try {
        const product = await ProductModel.findById({ _id: req.params.productId })
        const newSizes = [...product.sizes, ...req.body.sizes]
        const newAttributes = [...product.attributes, ...req.body.attributes]
        product.sizes = newSizes
        product.attributes = newAttributes
        await product.save()
        return res.status(200).json({
            message: 'Cập nhật size thành công'
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}
export const addColors = async (req, res) => {
    try {
        const product = await ProductModel.findById({ _id: req.params.productId })
        const newColors = [...product.colors, ...req.body.colors]
        product.colors = newColors
        product.gallerys.push(...req.body.gallerys)
        product.attributes.push(...req.body.attributes)
        await product.save()
        return res.status(200).json({
            message: 'Cập nhật màu sắc thành công'
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}
export const getByIdProduct = async (req, res) => {
    try {

        const product = await ProductModel.findById(req.params.productId).populate('categoryId colors')
        if (!product) {
            return res.status(404).json({
                message: "Product Not Found"
            })
        }
        return res.status(200).json(product)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}
export const updateInforProduct = async (req, res) => {
    try {
        const updateProduct = await ProductModel.findByIdAndUpdate({ _id: req.params.productId },
            {
                name: req.body.name,
                categoryId: req.body.categoryId,
                discount: req.body.discount,
                price_new: req.body.price_new,
                price_old: req.body.price_old,
                description: req.body.description,
                featured: req.body.featured,
                status: req.body.status,
                gender: req.body.gender
            },
            { new: true }
        )
        return res.status(200).json(updateProduct)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}
export const updateGallery = async (req, res) => {
    try {

        const product = await ProductModel.findById({ _id: req.params.productId })
        const newGallerys = product.gallerys.map((item) => item._id == req.body._id ? req.body : item)
        product.gallerys = newGallerys
        await product.save()
        return res.status(200).json({
            message: "Update thành công"
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const deleteProduct = async (req, res) => {
    try {

        const product = await ProductModel.findByIdAndDelete(req.params.productId)
        if (!product) {
            return res.status(404).json({
                message: "Product Not Found"
            })
        }
        return res.status(200).json(product)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}
export const deleteSize = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.productId)
        if (!product) {
            return res.status(404).json({
                message: "Product Not Found"
            })
        }
        const newSize = product.sizes.filter((item) => item !== req.body.size)
        const newAttributes = product.attributes.filter((item) => item.size !== req.body.size)
        product.sizes = newSize
        product.attributes = newAttributes
        await product.save()
        return res.status(200).json({
            message: "Xóa size thành công !"
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}
export const deleteColor = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.productId ).populate("colors")
        if (!product) {
            return res.status(404).json({
                message: "Product Not Found"
            })
        }
        product.colors = product.colors.filter((item) => item.name !== req.body.name)
        product.gallerys = product.gallerys.filter((item) => item.name !== req.body.name)
        product.attributes = product.attributes.filter((item) => item.color !== req.body.name)
        await product.save()
        return res.status(200).json({
            message: "Xóa màu sắc thành công !"
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}


