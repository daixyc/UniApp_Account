//返回的结果
function successDate(msg, code, obj) {
    const successData = {
        code: code,
        msg: msg,
        data: obj
    };
    return successData;
}


module.exports.successDate = successDate;