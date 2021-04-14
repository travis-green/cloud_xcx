// let {
//     NEW_URL,
//     isProdEnv
// } = require('../config/config.js')

/**
 * @desc 删除字符串首尾空
 * @param  {string} str 要处理的字符串
 * @return {string} 删除收尾空之后的字符串
 */
function trimStr(str = '') {
    return str.replace(/(^\s*)|(\s*$)/g, "")
}

function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

/*
  extend原型
*/
function extend() {
    var target = arguments[0] || {}; //目标对象
    var e = false; //是否进行深拷贝
    var h = 1; //参数个数
    var n = arguments.length; //实际传入的参数个数
    var temp; // 临时保存源参数
    if (typeof target === "boolean") {
        e = arguments[0];
        target = arguments[1] || {};
        //skip the boolean and target
        h = 2;
    }
    // Handle case when target is a string or something (possible in deep copy)
    if (typeof target !== "object" && typeof target !== "function") {
        target = {};
    }
    // extend object itself if only one argument is passed
    if (n === h) {
        target = this;
        --h;
    }
    for (; h < n; h++) {
        temp = arguments[h];
        if (typeof temp !== undefined) {
            for (var t in temp) {
                var src = target[t];
                var copy = temp[t];
                if (target === copy) {
                    continue;
                }
                if (
                    e &&
                    temp[t] &&
                    typeof temp[t] === "object" &&
                    !temp[t].nodeType
                ) {
                    //进行深拷贝
                    target[t] = extend(e, src || {}, temp[t]);
                } else {
                    //浅拷贝
                    if (temp[t] !== undefined) {
                        target[t] = temp[t];
                    }
                }
            }
        }
    }
    return target;
}
//数字转中文数字
function convertToChinese(num) {
    if (!/^\d*(\.\d*)?$/.test(num)) {
        console.log("Number is wrong!");
        return "Number is wrong!";
    }
    var AA = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九");
    var BB = new Array("", "十", "百", "千", "万", "亿", "点", "");
    var a = ("" + num).replace(/(^0*)/g, "").split("."),
        k = 0,
        re = "";
    for (var i = a[0].length - 1; i >= 0; i--) {
        switch (k) {
            case 0:
                re = BB[7] + re;
                break;
            case 4:
                if (!new RegExp("0{4}\\d{" + (a[0].length - i - 1) + "}$").test(a[0]))
                    re = BB[4] + re;
                break;
            case 8:
                re = BB[5] + re;
                BB[7] = BB[5];
                k = 0;
                break;
        }
        if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0)
            re = AA[0] + re;
        if (a[0].charAt(i) != 0) re = AA[a[0].charAt(i)] + BB[k % 4] + re;
        k++;
    }

    if (a.length > 1) {
        //加上小数部分(如果有小数部分)
        re += BB[6];
        for (var i = 0; i < a[1].length; i++) re += AA[a[1].charAt(i)];
    }
    re = re.replace("一十", "十");
    return re;
}

function spaceReplaceHollowString(content) {
    try {
        content = content.replace(/ /g, "");
    } catch (e) {
        throw e;
    }
    return content;
}
/*** @param {Object} datesStr */
function sprDay(datesStr) {
    datesStr = spaceReplaceHollowString(datesStr);
    var dataAllList = [];
    var dataAllListIndex = 0;
    var dateList = datesStr.split(",");
    dateList = dateList.sort();
    var year = null;
    for (var dIndex = 0; dIndex < dateList.length; dIndex++) {
        var dataStr = dateList[dIndex];
        var dateSplit = dataStr.split("-");
        if (dateSplit[0] !== year) {
            dataAllList[dataAllListIndex] = {
                year: dateSplit[0]
            };
            year = dateSplit[0];
            var mouthAllList = new Array();
            var mouthAllListIndex = 0;
            var mouth = null;
            for (var yearIndex = 0; yearIndex < dateList.length; yearIndex++) {
                var yearDataStr = dateList[yearIndex];
                yearDataStr = yearDataStr.split("-");
                if (yearDataStr[0] === year) {
                    if (mouth !== yearDataStr[1]) {
                        mouthAllList[mouthAllListIndex] = {
                            mouth: yearDataStr[1]
                        };
                        mouth = yearDataStr[1];
                        dataAllList[dataAllListIndex].mouth = mouthAllList;
                        var dayAllList = new Array();
                        var dayAllListIndex = 0;
                        var day = null;
                        var dayYear = 0;
                        for (var dayIndex = 0; dayIndex < dateList.length; dayIndex++) {
                            var dayDataStr = dateList[dayIndex];
                            dayYear++;
                            dayDataStr = dayDataStr.split("-");
                            if (dayDataStr[0] === year && dayDataStr[1] === mouth) {
                                dayAllList[dayAllListIndex] = dayDataStr[2];
                                dayAllListIndex++;
                                day = dayDataStr[2];
                            }
                            dataAllList[dataAllListIndex].mouth[
                                mouthAllListIndex
                            ].days = dayAllList;
                        }
                        mouthAllListIndex++;
                    }
                }
            }
            dataAllListIndex++;
        }
    }
    return dataAllList;
}

function unique(array) {
    array.sort()
    var re = [array[0]]
    for (var i = 1; i < array.length; i++) {
        if (array[i] !== re[re.length - 1]) {
            re.push(array[i])
        }
    }
    return re
}

function md5(string) {
    function md5_RotateLeft(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }

    function md5_AddUnsigned(lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }

    function md5_F(x, y, z) {
        return (x & y) | ((~x) & z);
    }

    function md5_G(x, y, z) {
        return (x & z) | (y & (~z));
    }

    function md5_H(x, y, z) {
        return (x ^ y ^ z);
    }

    function md5_I(x, y, z) {
        return (y ^ (x | (~z)));
    }

    function md5_FF(a, b, c, d, x, s, ac) {
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_F(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    };

    function md5_GG(a, b, c, d, x, s, ac) {
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_G(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    };

    function md5_HH(a, b, c, d, x, s, ac) {
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_H(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    };

    function md5_II(a, b, c, d, x, s, ac) {
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_I(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    };

    function md5_ConvertToWordArray(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWords_temp1 = lMessageLength + 8;
        var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
        var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        var lWordArray = Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    };

    function md5_WordToHex(lValue) {
        var WordToHexValue = "",
            WordToHexValue_temp = "",
            lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
        }
        return WordToHexValue;
    };

    function md5_Utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    };
    var x = Array();
    var k, AA, BB, CC, DD, a, b, c, d;
    var S11 = 7,
        S12 = 12,
        S13 = 17,
        S14 = 22;
    var S21 = 5,
        S22 = 9,
        S23 = 14,
        S24 = 20;
    var S31 = 4,
        S32 = 11,
        S33 = 16,
        S34 = 23;
    var S41 = 6,
        S42 = 10,
        S43 = 15,
        S44 = 21;
    string = md5_Utf8Encode(string);
    x = md5_ConvertToWordArray(string);
    a = 0x67452301;
    b = 0xEFCDAB89;
    c = 0x98BADCFE;
    d = 0x10325476;
    for (k = 0; k < x.length; k += 16) {
        AA = a;
        BB = b;
        CC = c;
        DD = d;
        a = md5_FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
        d = md5_FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = md5_FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = md5_FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = md5_FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = md5_FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = md5_FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = md5_FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = md5_FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = md5_FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = md5_FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = md5_FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = md5_FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = md5_FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = md5_FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = md5_FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = md5_GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = md5_GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = md5_GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = md5_GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
        a = md5_GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = md5_GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = md5_GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = md5_GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = md5_GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = md5_GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = md5_GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = md5_GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = md5_GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = md5_GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = md5_GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = md5_GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = md5_HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = md5_HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = md5_HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = md5_HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = md5_HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = md5_HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = md5_HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = md5_HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = md5_HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = md5_HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
        c = md5_HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = md5_HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = md5_HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = md5_HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = md5_HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = md5_HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = md5_II(a, b, c, d, x[k + 0], S41, 0xF4292244);
        d = md5_II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = md5_II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = md5_II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = md5_II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = md5_II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = md5_II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = md5_II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = md5_II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = md5_II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = md5_II(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = md5_II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = md5_II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = md5_II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = md5_II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = md5_II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = md5_AddUnsigned(a, AA);
        b = md5_AddUnsigned(b, BB);
        c = md5_AddUnsigned(c, CC);
        d = md5_AddUnsigned(d, DD);
    }
    return (md5_WordToHex(a) + md5_WordToHex(b) + md5_WordToHex(c) + md5_WordToHex(d)).toLowerCase();
}

// 初始化一个时间戳
function initTimeStamp() {
    let de = new Date()
    let y = de.getFullYear()
    let m = de.getMonth() + 1
    let d = de.getDate() + 1
    let deStr = y + '/' + m + '/' + d
    wx.setStorageSync('todayStamp', new Date(deStr).getTime())
}

function timestampFormat(timestamp) {
    if (!timestamp) {
        return ''
    } else {
        const year = new Date(timestamp).getFullYear()
        const month = new Date(timestamp).getMonth() + 1
        const day = new Date(timestamp).getDate()
        const hour = new Date(timestamp).getHours()
        const minute = new Date(timestamp).getMinutes()
        const second = new Date(timestamp).getSeconds()
        return `${year}/${month}/${day} ${hour < 10 ? '0' + hour : hour}:${(minute < 10 ? '0' + minute : minute)}:${(second < 10 ? '0' + second : second)}`
    }
}

function timestampFormat1(timestamp) {
    if (!timestamp) {
        return ''
    } else {
        const year = new Date(timestamp).getFullYear()
        const month = new Date(timestamp).getMonth() + 1
        const day = new Date(timestamp).getDate()
        return `${year}年${month}月${day}日`
    }
}

function timestampFormat2(timestamp) {
    if (!timestamp) {
        return ''
    } else {
        const year = new Date(timestamp).getFullYear()
        const month = new Date(timestamp).getMonth() + 1 >= 10 ? new Date(timestamp).getMonth() + 1 : '0' + (new Date(timestamp).getMonth() + 1)
        const day = new Date(timestamp).getDate() >= 10 ? new Date(timestamp).getDate() : '0' + (new Date(timestamp).getDate())
        return `${year}-${month}-${day}`
    }
}

function timeFormat(second) {
    if (!second) {
        return ''
    }
    const min = Math.floor(second % 3600);
    const hour = Math.floor(second / 3600)
    return hour > 0 ? hour + "小时" + Math.floor(min / 60) + "分钟" : Math.floor(min / 60) + "分钟"
}
// 随机取n-m之间的一个整数值
function getRandomNum(n, m) {
    return Math.floor(Math.random() * (m - n + 1) + n);
}

// 可输入 0.01 ~ 1的百分比, 根据概率返回true or false，传入一个概率值，例如0.5, 即50%
function getPercentRandom(probability) {
    var probability = probability * 100 || 1;
    var odds = Math.floor(Math.random() * 100);
    return odds < probability
}

// 随机生成N位字符串
function randomString(num = 32) {
    let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    let maxPos = chars.length
    let pwd = '';
    for (var i = 0; i < num; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos))
    }
    return pwd
}

//万能跳转解析
function universalJump(config, eventId) {
    let {
        title = '', jumpKey = '', param = '', reLaunch = false
    } = config
    try {
        if (param !== '') {
            param = JSON.parse(param)
        }
    } catch (error) {
        console.log('param参数非json字符串')
    }
    // 从万能跳转参数中寻找相关的字段值
    let findParamValue = (arr = [], key = 'targetUrl') => {
        let value = ''
        arr.map(item => {
            if (item.key === key) {
                value = item.value
            }
        })
        return value
    }
    switch (jumpKey) {
        case "USER_BENEFIT_LIST":
            //跳转到公益列表
            wx.navigateTo({
                url: '/sundry/volunteerTravelList/index'
            })
            break
        case "USER_INTERESTING_LIST":
            //跳转到趣味兼职列表
            wx.navigateTo({
                url: '/sundry/experienceEvaluationList/index'
            })
            break
        case "USER_NEW_PERSON_PAGE":
            //跳转到新人专区  
            wx.navigateTo({
                url: '/pages/noviceArea/index'
            });
            break
        // 静态页面
        case 'USER_STATIC_PAGE':
            var targetUrl = findParamValue(param, 'targetUrl')
            wx.navigateTo({
                url: `/pages/webview/webview?targetUrl=${encodeURIComponent(targetUrl)}&shareTitle=${encodeURIComponent(title)}`
            })
            break
        // 分享页面
        case 'USER_SHARE_PAGE':
            var targetUrl = findParamValue(param, 'targetUrl')
            let shareTitle = findParamValue(param, 'shareTitle')
            wx.navigateTo({
                url: `/pages/webview/webview?targetUrl=${encodeURIComponent(targetUrl)}&shareTitle=${encodeURIComponent(shareTitle)}`
            })
            break
        // 兼职详情页
        case 'USER_PART_JOB_DETAIL_PAGE':
            var partJobId = findParamValue(param, 'partJobId')
            if (eventId) {
                wx.navigateTo({
                    url: `/pages/partdetails/partdetails?partJobId=${partJobId}&positionId=${eventId}`
                })
            } else {
                wx.navigateTo({
                    url: `/pages/partdetails/partdetails?partJobId=${partJobId}`
                })
            }
            break
        // 兼职标签页
        case 'USER_PART_JOB_TAG_PAGE':
            var tagId = findParamValue(param, 'tagId')
            wx.navigateTo({
                url: `/pages/labelPage/labelPage?tagId=${tagId}`
            })
            break
        //义工旅行列表页
        case 'USER_TRAVEL_LIST_PAGE':
            wx.navigateTo({
                url: '/sundry/volunteerTravelList/index'
            })
            break
        // 小任务详情页
        case 'USER_TASK_DETAIL_PAGE':
            var taskBaseId = findParamValue(param, 'taskBaseId')
            wx.navigateTo({
                url: `/task/taskdetail/taskdetail?taskBaseId=${taskBaseId}`
            })
            break
        // 小任务列表页
        case 'USER_TASK_LIST_PAGE':
            wx.navigateTo({
                url: `/task/tasklist/tasklist`
            })
            break
        // 以少胜多往期话题页
        case 'USER_VOTE_HISTORY_LIST_PAGE':
            wx.navigateTo({
                url: `/pages/pastEvents/pastEvents`
            })
            break
        // 以少胜多列表页
        case 'USER_VOTE_LIST_PAGE':
            wx.navigateTo({
                url: `/topic/index/index`
            })
            break
        // 一级类目页
        case 'USER_PART_JOB_FIRST_CLASS_PAGE':
            var name = findParamValue(param, 'classificationName')
            var classId = findParamValue(param, 'classificationId')
            wx.navigateTo({
                url: `/pages/secondLevel/secondLevel?classificationId=${classId}&name=${name}`
            })
            break
        // 二级类目页
        case 'USER_PART_JOB_SECOND_CLASS_PAGE':
            var classId = findParamValue(param, 'classificationId')
            var secondClassId = findParamValue(param, "secondClassId")
            wx[reLaunch ? 'reLaunch' : 'navigateTo']({
                url: `/pages/secondLevel/secondLevel?classificationId=${classId}&name=${title}&secondClassId=${secondClassId}`
            })
            break
        // 新版体验测评页面
        case 'USER_EXPERIENCE_DETAIL':
            var configId = findParamValue(param, "configId")
            wx.navigateTo({
                url: `/sundry/expervation/home/index?configId=${configId}`
            })
            break
        // 小程序指定页面
        case 'USER_CLIENT_OPEN_MINI_APP':
            var url = findParamValue(param, 'path')
            // 补上开头的斜杠字符串 "/"
            const fdStart = url.indexOf("/")
            if (fdStart !== 0) {
                url = '/' + url
            }
            wx.navigateTo({
                url,
                fail() {
                    wx.showToast({
                        title: '团团丢失了你要访问的页面',
                        icon: 'none'
                    })
                    setTimeout(() => {
                        wx.switchTab({
                            url: '/pages/index/index'
                        })
                    }, 3500)
                }
            })
            break
        // 跳转三方小程序
        case 'USER_THIRD_MINI_APP_JUMP_PAGE':
            var appId = findParamValue(param, 'appId')
            var path = findParamValue(param, 'path') || ''
            wx.navigateToMiniProgram({
                appId,
                path
            })
            break
        case 'USER_INTEGRAL_MALL_GOODS_PAGE':
            var goodsId = findParamValue(param, 'goodsId')
            wx.navigateTo({
                url: `/qtsStore/beanGoods/goodsDetail/index?goodsId=${goodsId}`
            })
            break
        // 跳转商城
        case 'USER_INTEGRAL_MALL_NEW':
            wx.switchTab({
                url: `/pages/pointStore/index`,
            })
            break
        case 'USER_PART_JOB_TAG_PAGE_QTZP':
            wx.navigateTo({
                url: `/pages/labelPage/labelPage?tagId=1200`
            })
            break
        case 'USER_REPORT_STATIC_PAGE':
            const report_targetUrl = findParamValue(param, 'targetUrl')
            wx.navigateTo({
                url: `/pages/webview/webview?targetUrl=${encodeURIComponent(report_targetUrl)}`
            })
            break
        case 'USER_PART_JOB_COLLECT_PAG': // 兼职集合
            const collect_path = findParamValue(param, 'path')
            const obj = {
                5: 'highSalary', // 高薪兼职
                6: 'weekend', // 周末兼职
                7: 'rushWork' // 极速上岗
            }
            const type = obj[collect_path] || 'highSalary'
            wx.navigateTo({
                url: `/pages/collectionPage/index?type=${type}`
            })
            break
    }
}

function getCalendar(time) {
    let res = {}
    let date = time.getDate()
    let day = time.getDay()
    let year = time.getFullYear()
    let month = time.getMonth()
    switch (day) {
        case 1:
            day = '星期一'
            break;
        case 2:
            day = '星期二'
            break;
        case 3:
            day = '星期三'
            break;
        case 4:
            day = '星期四'
            break;
        case 5:
            day = '星期五'
            break;
        case 6:
            day = '星期六'
            break;
        case 0:
            day = '星期日'
            break;
    }
    switch (month) {
        case 0:
            // month ='January'
            month = 'Jan'
            break;
        case 1:
            // month ='February'
            month = 'Feb'
            break;
        case 2:
            // month ='March'
            month = 'Mar'
            break;
        case 3:
            // month ='April'
            month = 'Apr'
            break;
        case 4:
            // month ='May'
            month = 'May'
            break;
        case 5:
            // month ='June'
            month = 'Jun'
            break;
        case 6:
            // month ='July'
            month = 'Jul'
            break;
        case 7:
            // month ='August'
            month = 'Aug'
            break;
        case 8:
            // month ='September'
            month = 'Sep'
            break;
        case 9:
            // month ='October'
            month = 'Oct'
            break;
        case 10:
            // month ='November'
            month = 'Nov'
            break;
        case 11:
            // month ='December'
            month = 'Dec'
            break;
    }
    res.year = year
    res.month = month
    res.date = date
    res.day = day
    return res
}
/**
 * 节流函数
 * e.g:
 *  tap: util.throttle(function(e) {
 *  ...//函数体
 *  }, 1500),
 *
 */
function throttle(fn, gapTime = 1500) {
    let lastTime = new Date()
    return function () {
        let nowTime = +new Date()
        if (nowTime - lastTime > gapTime) {
            fn.apply(this, arguments)
            lastTime = nowTime
        }
    }
}

function toast(msg) {
    wx.showToast({
        title: typeof (msg) === 'string' ? msg : JSON.stringify(msg),
        icon: 'none'
    })
}
// type = 1 访问  type = 2 授权  type = 3 注册
function visitAdPro(type) {
    if (getApp().globalData.query.channelId) {
        let postData = {
            url: '/thirdCenter/miniApp/ad/visit',
            data: {
                channelId: getApp().globalData.query.channelId,
                type
            }
        }
        getApp().ajax(postData)
    }
}

function visitPush(pushCode) {
    let postData = {
        url: '/qtsWeChat/mini/app/push/hits',
        data: {
            pushCode
        }
    }
    getApp().ajax(postData)
}

function shareLogin(param) {
    //需不需要token 可能后续会要
    return new Promise((resolve, reject) => {
        // TODO
        let {
            navigateId,
            urlKey,
            partJobId,
            shareId,
            configId,
            shareUserId,
            activityId
        } = param
        switch (parseInt(navigateId)) {
            case 1:
                //跳转到首页老用户判断
                // wx.navigateTo({
                //   url: '/pages/dailySignUp/dailySignUp'
                // })
                break;
            case 2:
                //跳转到步数兑换
                wx.navigateTo({
                    url: `/punch/stepRedemption/index/index?shareUserId=${shareUserId}`
                })
                break;
            case 3:
                //用不到了
                // wx.navigateTo({
                //   url: `/sundry/expervation/home/index?configId=${configId}`
                // })
                break;
            case 4:
                //跳转加薪券详情页
                wx.navigateTo({
                    url: `/sundry/redEnvelope/redEnvelope?urlKey=${urlKey}&shareId=${shareId}`
                })
                break;
            case 5:
                //跳转早起打卡:注此处需要cardPunchId =》prod环境为14其他环境见yy后台
                wx.navigateTo({
                    url: `/punch/earlyPlaycard/home/index?cardPunchId=${isProdEnv ? '14' : '14'}`
                })
                break;
            case 6:
                //跳转兼职详情页
                wx.navigateTo({
                    url: `/pages/partdetails/partdetails?partJobId=${partJobId}`
                })
                break;
            case 7:
                //跳转小任务列表页
                wx.navigateTo({
                    url: '/task/tasklist/tasklist'
                })
                break;
            case 8:
                //跳转到每日签到首页
                wx.navigateTo({
                    url: '/pages/dailySignUp/dailySignUp?dailySignUpShare=true'
                })
                break;
            case 9:
                //跳转到体验测评页
                wx.navigateTo({
                    url: `/sundry/expervation/home/index?configId=${configId}&shareUserId=${shareUserId}`
                })
                break;
            case 10:
                wx.navigateTo({
                    url: `/pages/activityModel/activityModel?configId=${configId}&activityId=${activityId}`
                })
                break;
            case 11:
                wx.navigateTo({
                    url: `/pages/activityDetails/activityDetails?configId=${configId}&shareUserId=${shareUserId}&activityId=${activityId}&isSuccess=false`
                })
                break;
        }
        resolve(true)
    })
}

function objectValues() {
    if (!Object.values) {
        Object.values = (obj) => {
            if (obj != Object(obj)) throw new TypeError('Object.values called on a non-object')
            var val = [], key;
            for (key in Object) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    val.push(obj[key])
                }
            }
            return val
        }
    }
}

function setStorage(key, data) {
    wx.setStorage({
        key,
        data
    })
}

function requestSubscribeMessage(
    {
        key,
        init,
        cancel,
        success,
        fail,
        complete,
        notCompatible,
        ajaxFail
    }
) {
    getApp().ajax({
        url: "/qtsWeChat/wechat/subscribe/push/templateId/list",
        data: {
            pushKey: key
        }
    }).then(subscribeData => {
        if (subscribeData.success) {
            if (wx.canIUse('requestSubscribeMessage')) {
                // 成功弹起订阅消息弹窗
                init && init()
                wx.requestSubscribeMessage({
                    tmplIds: subscribeData.data,
                    success(res) {
                        if (res.errMsg === 'requestSubscribeMessage:ok') {
                            let flag = subscribeData.data.every(id => res[id] === 'reject')
                            // 点击取消按钮有cancel事件时
                            if (flag && cancel) {
                                cancel()
                                return
                            }
                            // 点击取消 return
                            if (flag) return
                            success && success(res, subscribeData.data)
                        }
                    },
                    fail(err) {
                        fail && fail(err)
                    },
                    // 成功取消失败都会走
                    complete() {
                        complete && complete()
                    }
                })
            } else {
                // 不兼容的时候
                notCompatible && notCompatible()
            }
        } else {
            wx.showToast({
                title: res.msg || "服务器错误，请稍后再试",
                icon: "none"
            })
            // 获取tmplIds失败
            ajaxFail && ajaxFail()
        }
    })
}

function userInfoStep() {
    return new Promise(resolve => {
        getApp().ajax({
            url: 'https://acm.qtshe.com/acm/getConfig',
            data: {
                key: 'product',
                dataId: 'infoCollection',
                group: 'miniAPP'
            }
        }).then(info => {
            if (info.data === 'true') {
                getApp().ajax({
                    url: '/accountCenter/userInfo/step'
                }).then(res => {
                    if (res.success) {
                        getApp().globalData.resumeInfo = res.data
                        resolve(res.data)
                    } else {
                        resolve(false)
                    }
                }, () => {
                    resolve(false)
                })
            } else {
                resolve('acmclose')
            }
        }, () => {
            resolve('acmclose')
        })
    })
}

function getUserInfoStep(type) {
    return new Promise(resolve => {
        userInfoStep().then(data => {
            if (data && data !== 'acmclose') {
                // 新人必跳
                if (data.newed) {
                    wx.navigateTo({
                        url: `/mine/registerResume/index/index?back=true&step=one`
                    })
                    // 重置为第一次
                    wx.setStorage({
                        key: 'visitTimes',
                        data: 1
                    })
                    wx.removeStorage({ key: 'visitAfterThreeDay' })
                    wx.removeStorage({ key: 'visitDay' })
                    resolve(false)
                } else {
                    if (type === 'login') {
                        resolve(true)
                        return
                    }
                    // 再次启动或者3天后
                    if (wx.getStorageSync('visitTimes') > 1 && wx.getStorageSync('visitAfterThreeDay')) {
                        if (!data.type || (data.type === 1 && (!data.finishDesc || !data.finishExperience)) || (data.type === 2 && !data.finishExperience)) {
                            wx.navigateTo({
                                url: `/mine/registerResume/index/index?back=true`
                            })
                            wx.setStorage({
                                key: 'visitAfterThreeDay',
                                data: false
                            })
                            resolve(false)
                        } else {
                            resolve(true)
                        }
                    } else {
                        resolve(true)
                    }
                }
            } else {
                if (data === 'acmclose') {
                    resolve('acmclose')
                } else {
                    resolve(true)
                }
            }
        })
    })
}

// 获取y/m/d
function initResumeTimeStamp(de) {
    // let de = new Date()
    let y = de.getFullYear()
    let m = de.getMonth() + 1
    let d = de.getDate()
    return y + '/' + m + '/' + d
}

// 获取天数差
function timeDiff(today, beday) {
    let todayTime = new Date(today).getTime()
    let bedayTime = new Date(beday).getTime()
    let usedTime = todayTime - bedayTime;  //两个时间戳相差的毫秒数
    let days = Math.floor(usedTime / (24 * 3600 * 1000))
    return days >= 3
}

// getStorage方法
function getStorage(key) {
    return new Promise((resolve, reject) => {
        wx.getStorage({
            key,
            success: res => {
                resolve(res.data)
            },
            fail: resolve(null)
        })
    })
}

// 安卓引流符合条件用户弹窗
function needGuidePop(source) {
    return new Promise(resolve => {
        getApp().ajax({
            url: '/taskThird/user/app/drainage/entrance',
            data: {
                businessSource: source // 0-未知；1-青豆签到；2-2020问答；3-青豆步数兑换；4-我的页面引流入口；5-H5引流页
            }
        }).then(res => {
            resolve(res)
        }, () => {
            resolve(false)
        })
    })
}

//活动配置跳转解析
function activityJump(config) {
    let {
        jumpKey = ''
    } = config
    console.log(config)
    // 从万能跳转参数中寻找相关的字段值
    switch (jumpKey) {
        // 静态页面
        case "USER_STATIC_PAGE":
            var targetUrl = config.jumpUrl
            wx.navigateTo({
                url: `/pages/webview/webview?targetUrl=${encodeURIComponent(targetUrl)})}`
            });
            break;
        // 分享页面
        case "USER_SHARE_PAGE":
            var targetUrl = config.jumpUrl
            wx.navigateTo({
                url: `/pages/webview/webview?targetUrl=${encodeURIComponent(targetUrl)}`
            });
            break;
        // 兼职详情页
        case "USER_PART_JOB_DETAIL_PAGE":
            var partJobId = config.partJobId
            wx.navigateTo({
                url: `/pages/partdetails/partdetails?partJobId=${partJobId}`
            });
            break;
        // 兼职标签页
        case "USER_PART_JOB_TAG_PAGE":
            var tagId = config.labelId
            wx.navigateTo({
                url: `/pages/labelPage/labelPage?tagId=${tagId}`
            });
            break;
        // 一级类目页
        case "USER_PART_JOB_FIRST_CLASS_PAGE":
            var name = config.classificationName
            var classId = config.classificationId
            wx.navigateTo({
                url: `/pages/secondLevel/secondLevel?classificationId=${classId}&name=${name}`
            });
            break;
        // 二级类目页
        case "USER_PART_JOB_SECOND_CLASS_PAGE":
            var name = config.classificationName
            var classId = config.classificationId
            var secondClassId = config.subId
            wx.navigateTo({
                url: `/pages/secondLevel/secondLevel?classificationId=${classId}&name=${name}&secondClassId=${secondClassId}`
            });
            break;
        // 兼职集合
        case 'USER_PART_JOB_COLLECT_PAGE':
            const collect_path = config.jobCollectType
            const obj = {
                5: 'highSalary', // 高薪兼职
                6: 'weekend', // 周末兼职
                7: 'rushWork' // 极速上岗
            }
            const type = obj[collect_path] || 'highSalary'
            wx.navigateTo({
                url: `/pages/collectionPage/index?type=${type}`
            })
            break
        // 首页
        case "USER_HOME_PAGE":
            wx.reLaunch({
                url: '/pages/index/index'
            });
            break
        //跳转到新人专区
        case "USER_NEW_PERSON_PAGE":
            wx.navigateTo({
                url: '/pages/noviceArea/index'
            });
            break
        // 名企兼职列表页
        case "USER_FAMOUS_JOB_LIST_PAGE":
            var brandId = config.brandId
            wx.navigateTo({
                url: `/partJob/famousTagList/index?id=${brandId}`
            });
            break
        // 大牌兼职列表页
        case "USER_BRAND_JOB_LIST_PAGE":
            wx.navigateTo({
                url: '/partJob/famousList/index'
            });
            break
        // 每日签到
        case "USER_DAILY_SIGNUP":
            wx.navigateTo({
                url: '/pages/dailySignUp/dailySignUp'
            });
            break
        // 2020宅家赚钱列表页
        case 'SHOP_ANSWER_2020_HOME':
            wx.navigateTo({
                url: `/qaconfig/index/index`
            })
            break
        // 早起打卡
        case 'USER_EARLY_PUNCH':
            wx.navigateTo({
                url: `/punch/earlyPlaycard/home/index?cardPunchId=14`
            })
            break
        // 步数兑换
        case 'USER_SPROT_PAGE':
            wx.navigateTo({
                url: `/punch/stepRedemption/index/index`
            })
            break
        // 福利社
        case 'USER_INTEGRAL_MALL_NEW':
            wx.reLaunch({
                url: '/pages/pointStore/index'
            });
            break
        // 天天抽奖
        // case 'USER_EXPERIENCE_RAFFLE_HOME': // 天天抽奖首页
        //   my.navigateTo({
        //     url: `/dailyRaffle/raffleIndex/index`
        //   })
        //   break
        // 小任务首页
        case 'USER_TASK_LIST_PAGE':
            wx.navigateTo({
                url: '/task/tasklist/tasklist'
            });
            break
        // 商品详情
        case 'USER_INTEGRAL_MALL_GOODS_PAGE':
            var goodsId = config.goodsId
            wx.navigateTo({
                url: `/qtsStore/beanGoods/goodsDetail/index?goodsId=${goodsId}`
            })
            break
        // 小任务
        case "USER_TASK_DETAIL_PAGE":
            var taskBaseId = config.taskBaseId
            wx.navigateTo({
                url: `/task/taskdetail/taskdetail?taskBaseId=${taskBaseId}`
            });
            break;
        case "USER_MINI_APP_JUMP_PAGE":
            var url = config.miniPath
            // 补上开头的斜杠字符串 "/"
            const fdStart = url.indexOf("/");
            // 兼容plugin://形式的插件链接也可以跳转
            const hasPlugin = url.indexOf('plugin://')
            if (fdStart !== 0 && hasPlugin === -1) {
                url = "/" + url;
            }
            try {
                wx.navigateTo({
                    url,
                    fail: err => {
                        toast('跳转失败，请联系客服')
                    }
                })
            } catch (err) {
                toast('跳转失败，请联系客服')
            }
            break
        // 公司主页
        // case 'USER_COMPANY_HOME_PAGE': 
        //   const companyId = config.companyId || ''
        //   my.navigateTo({
        //     url: `/pages/company/index?companyId=${companyId}`
        //   })
        //   break
    }
}


let DEVICEID = null
function getDeviceId() {
    if (DEVICEID) return DEVICEID
    else {
        DEVICEID = wx.getStorageSync('deviceId') || ''
        if (!DEVICEID) {
            DEVICEID = Math.random()
            wx.setStorage({
                key: "deviceId",
                data: DEVICEID
            })
        }
        return DEVICEID
    }
}

module.exports = {
    getDeviceId,
    formatTime,
    formatNumber,
    md5,
    extend,
    convertToChinese,
    sprDay,
    unique,
    setStorage,
    spaceReplaceHollowString,
    initTimeStamp,
    getRandomNum,
    getPercentRandom,
    randomString,
    trimStr,
    universalJump,
    getCalendar,
    throttle,
    toast,
    timestampFormat,
    timestampFormat1,
    timestampFormat2,
    timeFormat,
    visitAdPro,
    visitPush,
    shareLogin,
    objectValues,
    needGuidePop,
    requestSubscribeMessage,
    getUserInfoStep,
    userInfoStep,
    getStorage,
    initResumeTimeStamp,
    timeDiff,
    activityJump
}
