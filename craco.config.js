const CracoLessPlugin = require('craco-less');

module.exports = {
    babel: {
        plugins: [
            [
                "import",
                {
                    "libraryName": "antd",
                    "libraryDirecrtory": "es",
                    "style": "true"
                }
            ]
        ]
    },
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        javascriptEnabled: true
                    }
                }
            }
        }
    ]
}