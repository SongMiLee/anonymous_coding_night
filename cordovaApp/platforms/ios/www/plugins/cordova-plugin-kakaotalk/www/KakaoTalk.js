cordova.define("cordova-plugin-kakaotalk.KakaoTalk", function(require, exports, module) {
var exec = require('cordova/exec');

var KakaoTalk = {
	login: function (successCallback, errorCallback) {
		exec(successCallback, errorCallback, "KakaoTalk", "login", []);
    },
	logout: function (successCallback, errorCallback) {
		exec(successCallback, errorCallback, 'KakaoTalk', 'logout', []);
	}
};

module.exports = KakaoTalk;
});
