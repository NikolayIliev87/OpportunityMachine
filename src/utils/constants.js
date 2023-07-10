const prod = 'https://opportunity-machine-e9860cf7dfd2.herokuapp.com'

const dev = 'http://127.0.0.1:8000'

export const hostserver = process.env.NODE_ENV ==='development' ? dev : prod;