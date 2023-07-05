export const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export const calcClientProductPrice = (price, discount) => {
    let total = price - (price * (discount/100))
    
    return total
}

export const calcClientProductTotalNetPrice = (price, discount, VAT, quantity) => {
    let clientPrice = price - (price * (discount/100))
    let total = (clientPrice + (clientPrice * (VAT/100))) * quantity

    return total
}

export const clacTotalProductsValue = (opportunity_products, selectedClient) => {
    let total = 0;
    opportunity_products.map(({product,quantity}) => 
    total = total + calcClientProductTotalNetPrice(product.price, selectedClient.discount, 20, quantity))

    return total;
}

