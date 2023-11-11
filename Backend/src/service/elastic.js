import { client } from "config/elastic";
import Model from "../config/sequelize";
const index_name = 'search-product'
async function initData() {
    const option = [
        {
            model: Model.product_detail,
            as: "product_details",
        },
        {
            model: Model.branch,
            as: 'id_branch_branch'
        },
        {
            model: Model.image,
            as: "images"
        },
        {
            model: Model.category,
            as: "id_category_category"
        },
        {
            model: Model.review,
            as: "reviews"
        }
    ]
    let data = await Model.product.findAll({ include: option });
    data = data.map(item => {
        let newitem = { ...item.dataValues, branch: item.id_branch_branch.dataValues.name, category: item.id_category_category.name }
        return newitem
    })
    const result = await client.helpers.bulk({
        datasource: data,
        pipeline: "ent-search-generic-ingestion",
        onDocument: (doc) => ({ index: { _index: 'search-product' } }),
    });
}
function convertObjectToArrayWithKeys(obj) {
    const result = [];
    for (const key in obj) {
        result.push({ [key]: obj[key] });
    }
    return result;
}
async function search(query) {
    const response = await client.search({
        index: "search-product",
        body: {
            query: {
                multi_match: {
                    query: query,
                    fuzziness: "AUTO",
                    "fields": ["description", "name", 'category', 'branch'],
                },
            },
        },
    });
    return response.hits.hits.map(item => {
        return item._source
    })
}
async function filter(minPrice = 0, maxPrice = 999, size = 0) {
    const option = [
        {
            "match": {
                "product.product_details.size": size == 0 ? {
                    "lte": 99
                } : size
            }
        },
        {
            "range": {
                "product_price": {
                    "gte": price_min,
                    "lte": price_max
                }
            }
        }
    ]
    const response = await client.search({
        index: "search-product",
        body: {
            query: {
                "bool": {
                    "must": option
                }
            },
        },
    });
    return response.hits.hits.map(item => {
        return item._source
    })
}
async function deleteData(id = 0) {
    try {
        const response = id == 0 ? await client.deleteByQuery({
            index: index_name,
            body: {
                query: {
                    match_all: {}
                }
            }
        }) : await client.delete({
            index: 'ten-index',
            id: id
        });

        console.log('Dữ liệu đã được xóa khỏi index:', response);
    } catch (error) {
        console.error('Lỗi khi xóa dữ liệu:', error);
    }
}
export { deleteData, initData, search, filter }