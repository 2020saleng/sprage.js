if (process.env.NODE_ENV === 'production') {
    module.exports = require('./dist/Sprage.min.js')
} else {
    module.exports = require('./dist/Sprage.js')
}