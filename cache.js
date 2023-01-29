const LRU = require('lru-cache')
const options = {
    max: 1000,

    // for use with tracking overall storage size
    maxSize: 5000,
    sizeCalculation: (value, key) => {
        return 1
    },

    // for use when you need to clean up something when objects
    // are evicted from the cache
    dispose: (value, key, reason) => {

    },
    disposeAfter: function (value, key, reason) {
        // if (key === "allCategory") {
        //     category.findAll().then((rs, err) => {
        //         cache.set("allCategory", rs)
        //     })
        // }
    },

    // how long to live in ms
    ttl: 60*1000*60,
    ttlAutopurge: false,
    ttlResolutiion: 60*1000*10 ,
    // return stale items before removing from cache?
    allowStale: false,

    updateAgeOnGet: true,
    updateAgeOnHas: false,

    // async method to use for cache.fetch(), for
    // stale-while-revalidate type of behavior
    fetchMethod: async (key, staleValue, {options, signal}) => {
    }
}

const cache = new LRU(options)
module.exports = cache
