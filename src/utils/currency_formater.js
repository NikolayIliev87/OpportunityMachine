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

export const clacTotalOpportunitiesValueAll = (opportunities) => {
    let total = 0;
    opportunities.map((opportunity) => 
    total = total + clacTotalProductsValue(opportunity.products, opportunity.client))

    return total;
}

export const clacTotalOpportunitiesValueWon = (opportunities) => {
    let total = 0;
    opportunities.filter(opp => opp.status == "Won").map((opportunity) => 
    total = total + clacTotalProductsValue(opportunity.products, opportunity.client))

    return total;
}

export const clacTotalOpportunitiesValueOngoing = (opportunities) => {
    let total = 0;
    opportunities.filter(opp => opp.status == "Ongoing").map((opportunity) => 
    total = total + clacTotalProductsValue(opportunity.products, opportunity.client))

    return total;
}

export const clacTotalOpportunitiesValueLost = (opportunities) => {
    let total = 0;
    opportunities.filter(opp => opp.status == "Lost").map((opportunity) => 
    total = total + clacTotalProductsValue(opportunity.products, opportunity.client))

    return total;
}


