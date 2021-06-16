
const { name, version } = require('../../package.json')

module.exports = {
    NAME       : name,
    VERSION    : version,
    CWD_DIR    : process.cwd(),
    REPO       : 'git@github.com:yeqisong/crx3-dev-template.git',
    PARAM_FILES: [
        'package.json',
        'manifest.json',
        'messages.json'
    ]
}