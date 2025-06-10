// vue-cli的配置文件
const isProd = process.env.NODE_ENV === 'production';
const cdn = {
    js: ['vue.min.js', 'vuex.min.js', 'axios.min.js', 'vue-router.min.js']
};

module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'https://zzf.net.cn'
            }
        }
    },
    configureWebpack: require('./webpack.config'),
    chainWebpack: config => {
        if (isProd) {
            config.plugin('html').tap(args => {
                args[0].cdn = cdn;
                args[0].env = process.env.NODE_ENV;
                return args;
            });
        }
    }
};
