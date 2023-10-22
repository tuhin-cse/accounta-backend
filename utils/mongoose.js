export function paginate(schema) {
    schema.statics.paginate = async function (filters, options) {
        let page = +options.page || 1
        let limit = +options.limit || 10
        const skip = (page - 1) * limit;
        const totalDocs = await this.countDocuments(filters);
        const totalPages = Math.ceil(totalDocs / limit);
        let query = this.find(filters, options.select)
        if (options.sort) {
        query.sort(options.sort)
    }
    if (options.populate) {
        query.populate(options.populate)
    }
    const docs = await query.skip(skip).limit(limit);
    return {
        page,
        limit,
        totalDocs,
        totalPages,
        docs
    };
};
}


export function aggregatePaginate(schema) {
    schema.statics.aggregatePaginate = async function (pipeline, options = {}, after = []) {
        let page = +options.page || 1
        let limit = +options.limit || 10
        const skip = (page - 1) * limit;
        const result = await this.aggregate([
            ...pipeline,
            ...(options.sort ? [{$sort: options.sort}] : []),
            {
                $facet: {
                    docs: [
                        {$skip: skip},
                        {$limit: limit},
                        ...(after || [])
                    ],
                    totalDocs: [
                        {$count: 'count'}
                    ],
                }
            },
            {
                $project: {
                    docs: 1,
                    totalDocs: {$arrayElemAt: ['$totalDocs.count', 0]},
                    page: {$literal: page},
                    limit: {$literal: limit},
                    totalPages: {$ceil: {$divide: [{$arrayElemAt: ['$totalDocs.count', 0]}, Number(limit)]}}
                }
            }
        ])
        return result[0]
    };
}