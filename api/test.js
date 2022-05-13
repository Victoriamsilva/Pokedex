(async () => {
    const { connectRedis } = require('./database/redis')

    const client = await connectRedis()

    const obj = {
        users_one: {
            '_id -1': { name: 'victoria' },
            'page: 1 - limit: 1': [{ name: 'victoria' }]
        }
    }

    await client.hSet('users_one', '_id - 1', JSON.stringify({ name: ' Victoria' }))
    await client.hSet('users_one', 'page: 1 - limit: 1', JSON.stringify({ name: ' Victoria' }))
    await client.del('users_one')
    const value = await client.hGetAll('users_one')
    console.log('value', value)
})()