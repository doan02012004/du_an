// model cart

const cart = {
    _id: "dfjdhfjdfh",
    userId: "hdjfhdjfh",
    items:[
        {
            productId: "dfjdhfjdhfj0d9f9", // 900
            quantity: 1,
            attributeId: "dfjdhfjdfja0909",
        },
        {
            productId: "dfjdhfjdhfj0d9f9", // 900
            quantity: 1,
            attributeId: "dfjdhfjdfja0909",
        },
        {
            productId: "dfjdhfjdhfj0d9f9", // 900
            quantity: 1,
            attributeId: "dfjdhfjdfja0909",
        }
    ]
}



// 
{
    // ...,
    items:[
        {
            productId: "dfjdhfjdhfj0d9f9", // 900
            quantity: 1,
            attributeId: "dfjdhfjdfja0909",
        },
        {
            productId: "dfjdhfjdhfj0d9f9", // 900
            quantity: 1,
            attributeId: "dfjdhfjdfja0909",
        },
        {
            productId: "dfjdhfjdhfj0d9f9", // 900
            quantity: 1,
            attributeId: "dfjdhfjdfja0909",
        }
    ]
}

const product ={
    ...cart,
    attribute:[
        {
            _id:"",
            size:"",
            color:"",
            instock:0
        }
    ]
}

// CartItem