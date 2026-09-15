function filterProducts(products, intput, option, sort){
    const result = products.filter(product => {
        const checkName = product.name.trim().toLowerCase().includes(intput);
        const checkOption = option === "all" || product.brand === option;
        
        return checkName && checkOption;
    })

    if(sort === "asc") result.sort((a, b) => a.price - b.price);
    if(sort === "desc") result.sort((a, b) => b.price - a.price);

    return result;
}

export {filterProducts};