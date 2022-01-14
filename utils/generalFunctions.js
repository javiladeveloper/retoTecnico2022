let getPagination = (page, size) => {
    const limit = size ? +size : 4;
    const offset =  page * limit ;
    return { limit, offset };
}

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: items } = data;
    const currentPage = +page;
    const totalDataPerPage = items.length
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, items, totalPages, currentPage, totalDataPerPage };
};

module.exports = {
    getPagination,
    getPagingData
}