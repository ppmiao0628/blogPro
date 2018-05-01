const crypto = require('crypto');

module.exports = {
    MD5_SUFFIX: '阿jdkajsdk萨jdkajsdk德就jdkajsdk爱看ksjdkjfskjkuiouq24m.,kJAKjJJSGJBVNHJEUIuohasjdbewhu',
    md5: function (str) {
        let obj = crypto.createHash('md5');
        obj.update(str + this.MD5_SUFFIX);
        return obj.digest('hex');
    }
}