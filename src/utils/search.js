export const arraySearchProduct = (array, keyword) => {
    const searchTerm = keyword.toLowerCase()
    return array.filter(value => {
        if (!isNaN(+keyword)) {
            // return value.id==keyword
            return String(value.id).match(new RegExp(keyword, 'g'))
        }
        else{
        return value.name.toLowerCase().match(new RegExp(searchTerm, 'g')) ||
        value.description.toLowerCase().match(new RegExp(searchTerm, 'g'))
        }
    })
}

export const arraySearchClient = (array, keyword) => {
    const searchTerm = keyword.toLowerCase()
    return array.filter(value => {
        if (!isNaN(+keyword)) {
            // return value.id==keyword
            return String(value.id).match(new RegExp(keyword, 'g'))
        }
        else {
        return value.name.toLowerCase().match(new RegExp(searchTerm, 'g')) ||
        value.address.toLowerCase().match(new RegExp(searchTerm, 'g')) ||
        value.contact.toLowerCase().match(new RegExp(searchTerm, 'g')) ||
        value.city.toLowerCase().match(new RegExp(searchTerm, 'g'))
        }
    })
}

export const arraySearchProfiles = (array, keyword) => {
    const searchTerm = keyword.toLowerCase()
    return array.filter(value => {
        if (!isNaN(+keyword)) {
            return String(value.user).match(new RegExp(keyword, 'g'))
        }
        else{
        return value.user_email.toLowerCase().match(new RegExp(searchTerm, 'g'))
        }
    })
}

export const arraySearchOpportunitiesGeneral = (array, keyword) => {
    const searchTerm = keyword.toLowerCase()
    return array.filter(value => {
        if (!isNaN(+keyword)) {
            return String(value.id).match(new RegExp(keyword, 'g'))
        }
        else{
        return value.name.toLowerCase().match(new RegExp(searchTerm, 'g')) ||
        value.username.toLowerCase().match(new RegExp(searchTerm, 'g'))
        }
    })
}

export const arraySearchOpportunitiesProduct = (array, keyword) => {
    const searchTerm = keyword.toLowerCase()
    return array.filter(value => {
        if (!isNaN(+keyword)) {
            return value.products.some((product) => 
            String(product.product.id).match(new RegExp(keyword, 'g')))
        }
        else{
            return value.products.some((product) =>
            product.product.name.toLowerCase().match(new RegExp(searchTerm, 'g')))
        }
    })
}

export const arraySearchOpportunitiesClient = (array, keyword) => {
    const searchTerm = keyword.toLowerCase()
    return array.filter(value => {
        if (!isNaN(+keyword)) {
            return String(value.client.id).match(new RegExp(keyword, 'g'))
        }
        else{
        return value.client.name.toLowerCase().match(new RegExp(searchTerm, 'g')) ||
        value.client.city.toLowerCase().match(new RegExp(searchTerm, 'g'))
        }
    })
}

export const arraySearchOpportunitiesDate = (array, start_date, end_date) => {
    
    return array.filter(value => {
        let opp_close_date = new Date(value.close_date).getTime()
        if (end_date == 'all') {
            return (start_date <= opp_close_date)
        }
        else if (start_date == 'all') {
            return (opp_close_date <= end_date)
        }
        else if (start_date !== 'all' && end_date !== 'all') {
            return (start_date <= opp_close_date && opp_close_date <= end_date)
        }
    })
}
