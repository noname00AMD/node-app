module.exports = function (session) {
    const Store = session.Store
    noob = function () {
    }

    class MySQLStore extends Store {

        constructor(opt = {}) {
            super(opt);
            this.serializer = opt.serializer || JSON
            this.client = opt.client
            this.scanCount = Number(opt.scanCount) || 100
            this.ttl = opt.ttl || 86400
        }

        get(sid, cb = noop) {
            this.client.get(sid, (err, data) => {
                if (err) return cb(err)
                if (!data) return cb()

                let result
                try {
                    result = this.serializer.parse(data)
                } catch (err) {
                    return cb(err)
                }
                return cb(null, result)
            })
        }

        set(sid, sess, cb = noop) {
            let args = [sid]

            let value
            try {
                value = this.serializer.stringify(sess)
            } catch (er) {
                return cb(er)
            }
            args.push(value)

            let ttl = 1
            if (!this.disableTTL) {
                ttl = this._getTTL(sess)
                args.push("EX", ttl)
            }

            if (ttl > 0) {
                this.client.set(args, cb)
            } else {
                // If the resulting TTL is negative we can delete / destroy the key
                this.destroy(sid, cb)
            }
        }

        destroy(sid, cb = noop) {
            let key = this.prefix + sid
            this.client.del(key, cb)
        }

        clear(cb = noop) {
            this._getAllKeys((err, keys) => {
                if (err) return cb(err)
                this.client.del(keys, cb)
            })
        }

        length(cb = noop) {
            this._getAllKeys((err, keys) => {
                if (err) return cb(err)
                return cb(null, keys.length)
            })
        }

        all(cb = noop) {

            this._getAllKeys((err, keys) => {
                if (err) return cb(err)
                if (keys.length === 0) return cb(null, [])

                this.client.mget(keys, (err, sessions) => {
                    if (err) return cb(err)

                    let result
                    try {
                        result = sessions.reduce((accum, data, index) => {
                            if (!data) return accum
                            data = this.serializer.parse(data)
                            data.id = keys[index]
                            accum.push(data)
                            return accum
                        }, [])
                    } catch (e) {
                        err = e
                    }
                    return cb(err, result)
                })
            })
        }

        _getTTL(sess) {
            let ttl
            if (sess && sess.cookie && sess.cookie.expires) {
                let ms = Number(new Date(sess.cookie.expires)) - Date.now()
                ttl = Math.ceil(ms / 1000)
            } else {
                ttl = this.ttl
            }
            return ttl
        }


    }

    return MySQLStore
}