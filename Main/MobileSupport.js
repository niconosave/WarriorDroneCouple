function isAndroid() {
        return navigator.userAgent.match(/Android/i);
    }
function isBlackBerry() {
	return navigator.userAgent.match(/BlackBerry/i);
}
function isIOS() {
	return navigator.userAgent.match(/iPhone|iPad|iPod/i);
}
function isOpera() {
	return navigator.userAgent.match(/Opera Mini/i);
}
function isWindows() {
	return navigator.userAgent.match(/IEMobile/i);
}
function isMobile() {
	return (isAndroid() || isBlackBerry() || isIOS() || isOpera() || isWindows());
}