
async function getProducts() {
    try{
        const response = await fetch("./public/products.json");
        if(!response.ok){
            throw new Error("Không lấy được sản phẩm!");
        }
        const products = await response.json();
        return products;
    }catch(error){
        throw error;
    }
}

export {getProducts};
