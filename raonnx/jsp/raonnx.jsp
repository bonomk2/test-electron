
<%String TouchEnNxpath = "/raonnx";%>
<!-- TouchEnNx Start-->
<script type='text/javascript' charset='utf-8' src='<%=TouchEnNxpath%>/cmn/json2.js'></script>
<script type='text/javascript' charset='utf-8' src='<%=TouchEnNxpath%>/cmn/TouchEnNx.js'></script>
<script type='text/javascript' charset='utf-8' src='<%=TouchEnNxpath%>/cmn/TouchEnNx_exproto.js'></script>
<script type='text/javascript' charset='utf-8' src='<%=TouchEnNxpath%>/cmn/TouchEnNx_install.js'></script>
<script type='text/javascript' charset='utf-8' src='<%=TouchEnNxpath%>/cmn/TouchEnNx_daemon.js'></script>
<!-- TouchEnNx End-->

<!-- TouchEn nxKey Start -->
<!-- 키보드보안 적용시 주석 해제 필요
<script type='text/javascript' charset='utf-8' src='<%=TouchEnNxpath%>/nxKey/js/nxkey_config.js'></script>
<script type='text/javascript' charset='utf-8' src='<%=TouchEnNxpath%>/nxKey/js/TouchEnNxKey_Interface.js'></script>
<script type='text/javascript' charset='utf-8' src='<%=TouchEnNxpath%>/nxKey/js/TouchEnNxKey.js'></script>
-->
<!-- TouchEn nxKey End -->

<!-- TouchEn nxcr Start -->
<!--
<script type='text/javascript' charset='utf-8' src='<%=TouchEnNxpath%>/nxCR/js/nxcr_config.js'></script>
<script type='text/javascript' charset='utf-8' src='<%=TouchEnNxpath%>/nxCR/js/NXCertRelay_Interface.js'></script>
<script type='text/javascript' charset='utf-8' src='<%=TouchEnNxpath%>/nxCR/js/NXCertRelay.js'></script>
-->
<!-- TouchEn nxcr End -->

<!-- TouchEn nxfw Start -->
<!--
<script type='text/javascript' charset='utf-8' src='<%=TouchEnNxpath%>/nxFw/js/nxfw_config.js'></script>
<script type='text/javascript' charset='utf-8' src='<%=TouchEnNxpath%>/nxFw/js/TouchEnNxFirewall_Interface.js'></script>
<script type='text/javascript' charset='utf-8' src='<%=TouchEnNxpath%>/nxFw/js/TouchEnNxFirewall.js'></script>
-->
<!-- TouchEn nxfw End -->
<!-- 
<script type='text/javascript' charset='utf-8' src='<%=TouchEnNxpath%>/nxWeb/js/nxweb_config.js'></script>
<script type='text/javascript' charset='utf-8' src='<%=TouchEnNxpath%>/nxWeb/js/TouchEnNxWeb_Interface.js'></script>
<script type='text/javascript' charset='utf-8' src='<%=TouchEnNxpath%>/nxWeb/js/TouchEnNxWeb.js'></script>
 -->
<!-- ksbiz start -->
<script type='text/javascript' charset='utf-8' src='<%=TouchEnNxpath%>/ksbiz/js/ksbiz_config.js'></script>
<script type='text/javascript' charset='utf-8' src='<%=TouchEnNxpath%>/ksbiz/js/ksbiz_Interface.js'></script>
<script type='text/javascript' charset='utf-8' src='<%=TouchEnNxpath%>/ksbiz/js/ksbiz_extend.js'></script>
<script type='text/javascript' charset='utf-8' src='<%=TouchEnNxpath%>/ksbiz/js/ksbiz_internal.js'></script>
<script type='text/javascript' charset='utf-8' src='<%=TouchEnNxpath%>/ksbiz/js/ksbiz.js'></script>
<script type='text/javascript' charset='utf-8' src='<%=TouchEnNxpath%>/ksbiz/cxsign/xwckit.js'></script>
<!-- ksbiz End -->

<!--  
<link rel='stylesheet' type='text/css' charset='utf-8' href='/raonsecure/transkey/transkey.css'</link>
<script type='text/javascript' charset='utf-8' src='/raonsecure/transkey/transkey.js'></script>
-->
<!-- TouchEnNx Start-->
<script type='text/javascript' charset='utf-8' src='<%=TouchEnNxpath%>/cmn/TouchEnNx_loader.js'></script>
<!-- TouchEnNx End-->

<script type='text/javascript'>
// uitype 
function uitypechange(val){
	KSBizConfig.uitype = val;
}
var htmlchecked, nativechecked;
if(KSBizConfig.uitype == "html"){
	htmlchecked = "checked";
	nativechecked = "";
} else {
	htmlchecked = "";
	nativechecked = "checked";	
}
var htmlcheckedstr = '<input type="radio" name="uitype" onclick="uitypechange(this.value)" value="html" ' + htmlchecked + '>html';
var nativecheckedstr = '<input type="radio" name="uitype" onclick="uitypechange(this.value)" value="native" ' + nativechecked + '>native';
document.write(htmlcheckedstr);
document.write(nativecheckedstr);

//signSize
function signSize(val){
	KSBizConfig.signSize = val;
}
var compact, defaults;
if(KSBizConfig.signSize == "compact"){
	compact = "checked";
	defaults = "";
} else {
	compact = "";
	defaults = "checked";	
}
var compactstr = '<input type="radio" name="signSize" onclick="signSize(this.value)" value="compact" ' + compact + '>compact';
var defaultsstr = '<input type="radio" name="signSize" onclick="signSize(this.value)" value="defaults" ' + defaults + '>defaults';
document.write("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;signSize : ");
document.write(compactstr);
document.write(defaultsstr);

//colorTheme
function colorThemeChange(val){
	KSBizConfig.colorTheme = val;
}
var bluechecked, orangechecked, yellowchecked, redchecked, brownchecked, skychecked, greenchecked;
if(KSBizConfig.colorTheme == "blue"){
	bluechecked = "checked";
	orangechecked = "";
	yellowchecked = "";	
	redchecked = "";
	brownchecked = "";
	skychecked = "";
	greenchecked = "";
} else if(KSBizConfig.colorTheme == "orange") {
	bluechecked = "";
	orangechecked = "checked";
	yellowchecked = "";		
	redchecked = "";
	brownchecked = "";
	skychecked = "";
	greenchecked = "";
} else if(KSBizConfig.colorTheme == "yellow"){
	bluechecked = "";
	orangechecked = "";
	yellowchecked = "checked";	
	redchecked = "";
	brownchecked = "";
	skychecked = "";
	greenchecked = "";
} else if(KSBizConfig.colorTheme == "red"){
	bluechecked = "";
	orangechecked = "";
	yellowchecked = "";	
	redchecked = "checked";
	brownchecked = "";
	skychecked = "";
	greenchecked = "";
} else if(KSBizConfig.colorTheme == "brown"){
	bluechecked = "";
	orangechecked = "";
	yellowchecked = "";	
	redchecked = "";
	brownchecked = "checked";
	skychecked = "";
	greenchecked = "";
} else if(KSBizConfig.colorTheme == "brown"){
	bluechecked = "";
	orangechecked = "";
	yellowchecked = "";	
	redchecked = "";
	brownchecked = "";
	skychecked = "checked";
	greenchecked = "";
} else if(KSBizConfig.colorTheme == "green"){
	bluechecked = "";
	orangechecked = "";
	yellowchecked = "";	
	redchecked = "";
	brownchecked = "";
	skychecked = "";
	greenchecked = "checked";
}
var bluecheckedstr = '<input type="radio" name="colorThemeChange" onclick="colorThemeChange(this.value)" value="blue" ' + bluechecked + '>blue';
var orangecheckedstr = '<input type="radio" name="colorThemeChange" onclick="colorThemeChange(this.value)" value="orange" ' + orangechecked + '>orange';
var yellowcheckedstr = '<input type="radio" name="colorThemeChange" onclick="colorThemeChange(this.value)" value="yellow" ' + yellowchecked + '>yellow';
var redcheckedstr = '<input type="radio" name="colorThemeChange" onclick="colorThemeChange(this.value)" value="red" ' + redchecked + '>red';
var browncheckedstr = '<input type="radio" name="colorThemeChange" onclick="colorThemeChange(this.value)" value="brown" ' + brownchecked + '>brown';
var skycheckedstr = '<input type="radio" name="colorThemeChange" onclick="colorThemeChange(this.value)" value="sky" ' + skychecked + '>sky';
var greencheckedstr = '<input type="radio" name="colorThemeChange" onclick="colorThemeChange(this.value)" value="green" ' + greenchecked + '>green';
document.write("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;colorThemeChange : ");
document.write(orangecheckedstr);
document.write(bluecheckedstr);
document.write(yellowcheckedstr);
document.write(redcheckedstr);
document.write(browncheckedstr);
document.write(skycheckedstr);
document.write(greencheckedstr);
//KSBizConfig.certCRLCheck
function certCRLCheckChange(val){
	KSBizConfig.certCRLCheck = val;
	kslog("KSBizConfig.certCRLCheck", KSBizConfig.certCRLCheck);
}
var certCRLCheck_true, certCRLCheck_false;
if(typeof KSBizConfig.certCRLCheck != "undefined" && KSBizConfig.certCRLCheck == false){
	certCRLCheck_true = "";
	certCRLCheck_false = "checked";
} else {
	certCRLCheck_true = "checked";
	certCRLCheck_false = "";
}
var certCRLCheck_true_checkedstr = '<input type="radio" name="certCRLCheck" onclick="certCRLCheckChange(true)" value="true" ' + certCRLCheck_true + '>true';
var certCRLCheck_false_checkedstr = '<input type="radio" name="certCRLCheck" onclick="certCRLCheckChange(false)" value="false" ' + certCRLCheck_false + '>false';
document.write("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;certCRLCheck : ");
document.write(certCRLCheck_true_checkedstr);
document.write(certCRLCheck_false_checkedstr);



//initStorage
function initStoragechange(val){
	KSBizConfig.initStorage = val;
}
var browser, disk;
if(KSBizConfig.initStorage == "browser"){
	browserchecked = "checked";
	diskchecked = "";
} else {
	browserchecked = "";
	diskchecked = "checked";	
}
var browsercheckedstr = '<input type="radio" name="initStorage" onclick="initStoragechange(this.value)" value="browser" ' + browserchecked + '>browser';
var diskcheckeddstr = '<input type="radio" name="initStorage" onclick="initStoragechange(this.value)" value="disk" ' + diskchecked + '>disk';
document.write("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;initStorage : ");
document.write(browsercheckedstr);
document.write(diskcheckeddstr);


// KSBizConfig.forceScreenKeyboard
function forceScreenKeyboardChange(val){
	KSBizConfig.forceScreenKeyboard = val;
	kslog("KSBizConfig.forceScreenKeyboard", KSBizConfig.forceScreenKeyboard);
}
var forceScreenKeyboard_true, forceScreenKeyboard_false;
if(typeof KSBizConfig.forceScreenKeyboard != "undefined" && KSBizConfig.forceScreenKeyboard == false){
	forceScreenKeyboard_true = "";
	forceScreenKeyboard_false = "checked";
} else {
	forceScreenKeyboard_true = "checked";
	forceScreenKeyboard_false = "";
}
var forceScreenKeyboard_true_checkedstr = '<input type="radio" name="forceScreenKeyboard" onclick="forceScreenKeyboardChange(true)" value="true" ' + forceScreenKeyboard_true + '>true';
var forceScreenKeyboard_false_checkedstr = '<input type="radio" name="forceScreenKeyboard" onclick="forceScreenKeyboardChange(false)" value="false" ' + forceScreenKeyboard_false + '>false';
document.write("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;forceScreenKeyboard : ");
document.write(forceScreenKeyboard_true_checkedstr);
document.write(forceScreenKeyboard_false_checkedstr);


// KSBizConfig.secureKeyboardConfig.enable
function secureKeyboardEnableChange(val){
	KSBizConfig.secureKeyboardConfig.enable = val;
	kslog("KSBizConfig.secureKeyboardConfig.enable", KSBizConfig.secureKeyboardConfig.enable);
}
var secureKeyboardEnable_true, secureKeyboardEnable_false;
if(typeof KSBizConfig.secureKeyboardConfig.enable != "undefined" && KSBizConfig.secureKeyboardConfig.enable == false){
	secureKeyboardEnable_true = "";
	secureKeyboardEnable_false = "checked";
} else {
	secureKeyboardEnable_true = "checked";
	secureKeyboardEnable_false = "";
}
var secureKeyboardEnable_true_checkedstr = '<input type="radio" name="secureKeyboardConfigEnable" onclick="secureKeyboardEnableChange(true)" value="true" ' + secureKeyboardEnable_true + '>true';
var secureKeyboardEnable_false_checkedstr = '<input type="radio" name="secureKeyboardConfigEnable" onclick="secureKeyboardEnableChange(false)" value="false" ' + secureKeyboardEnable_false + '>false';
document.write("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;secureKeyboardConfig.enable : ");
document.write(secureKeyboardEnable_true_checkedstr);
document.write(secureKeyboardEnable_false_checkedstr);




// KSBizConfig.viewVersion
function viewVersionChange(val){
	KSBizConfig.viewVersion = val;
	kslog("KSBizConfig.viewVersion", KSBizConfig.viewVersion);
}
var viewVersion_true, viewVersion_false;
if(typeof KSBizConfig.viewVersion != "undefined" && KSBizConfig.viewVersion == false){
	viewVersion_true = "";
	viewVersion_false = "checked";
} else {
	viewVersion_true = "checked";
	viewVersion_false = "";
}
var viewVersion_true_checkedstr = '<input type="radio" name="viewVersion" onclick="viewVersionChange(true)" value="true" ' + viewVersion_true + '>true';
var viewVersion_false_checkedstr = '<input type="radio" name="viewVersion" onclick="viewVersionChange(false)" value="false" ' + viewVersion_false + '>false';
document.write("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;viewVersion : ");
document.write(viewVersion_true_checkedstr);
document.write(viewVersion_false_checkedstr);



// KSBizConfig.secureKeyboardConfig.product
function securekeyboardchange(val){
	KSBizConfig.secureKeyboardConfig.product = val;
	kslog("KSBizConfig.secureKeyboardConfig.product", KSBizConfig.secureKeyboardConfig.product);
}
var securekeyboard_raon, securekeyboard_nosk,securekeyboard_astx;
if(KSBizConfig.secureKeyboardConfig.product == "touchennxkey"){
	securekeyboard_raon = "checked";
	securekeyboard_nosk = "";
	securekeyboard_astx = "";
} else if(KSBizConfig.secureKeyboardConfig.product == "nosk") {
	securekeyboard_raon = "";
	securekeyboard_nosk = "checked";
	securekeyboard_astx = "";
} else if(KSBizConfig.secureKeyboardConfig.product == "astx"){
	securekeyboard_raon = "";
	securekeyboard_nosk = "";
	securekeyboard_astx = "checked";
}
var securekeyboard_raon_checkedstr = '<input type="radio" name="secureKeyboardConfig" onclick="securekeyboardchange(this.value)" value="touchennxkey" ' + securekeyboard_raon + '>touchennxkey';
var securekeyboard_nosk_checkedstr = '<input type="radio" name="secureKeyboardConfig" onclick="securekeyboardchange(this.value)" value="nosk" ' + securekeyboard_nosk + '>nosk';
var securekeyboard_astx_checkedstr = '<input type="radio" name="secureKeyboardConfig" onclick="securekeyboardchange(this.value)" value="astx" ' + securekeyboard_astx + '>astx';
document.write("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;secureKeyboardConfig.product : ");
document.write(securekeyboard_raon_checkedstr);
document.write(securekeyboard_nosk_checkedstr);
document.write(securekeyboard_astx_checkedstr);


// // KSBizConfig.secureKeypadConfig.product
function securekeypadchange(val){
	KSBizConfig.secureKeypadConfig.product = val;
	if(val == "transkey"){
		KSBizConfig.secureKeypadConfig.nativeKeypadUrl = ksbizSvcUrl + "/tk_crt.jsp";
	} else if(val == "nos"){
		KSBizConfig.secureKeypadConfig.nativeKeypadUrl = TouchEnNxConfig.path.url + "/pluginfree/jsp/nppfs.pki.jsp";
	}
	kslog("KSBizConfig.secureKeypadConfig.product", KSBizConfig.secureKeypadConfig.product);
	kslog("KSBizConfig.secureKeypadConfig.nativeKeypadUrl", KSBizConfig.secureKeypadConfig.nativeKeypadUrl);
}
var securekeykeypad_transkey, securekeykeypad_nos;
if(KSBizConfig.secureKeypadConfig.product == null || KSBizConfig.secureKeypadConfig.product == "transkey"){
	securekeykeypad_transkey = "checked";
	securekeykeypad_nos = "";
} else {
	securekeykeypad_transkey = "";
	securekeykeypad_nos = "checked";
}
var securekeykeypad_transkey_checkedstr = '<input type="radio" name="secureKeypad" onclick="securekeypadchange(this.value)" value="transkey" ' + securekeykeypad_transkey + '>transkey';
var securekeykeypad_nos_checkedstr = '<input type="radio" name="secureKeypad" onclick="securekeypadchange(this.value)" value="nos" ' + securekeykeypad_nos + '>nos';
document.write("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;secureKeypad : ");
document.write(securekeykeypad_transkey_checkedstr);
document.write(securekeykeypad_nos_checkedstr);

//KSBizConfig.yessignOpenCertUse;
function yessignOpenCertUsechange(val){
	KSBizConfig.yessignOpenCertUse = val;
	if(KSBizConfig.yessignOpenCertUse){
		KSBizConfig.html5saveCertDomain = location.protocol + "//" + location.host;
	} else {
		if(typeof TOUCHENEX_UTIL.getOSInfo != "undefined"){
			var OSInfo = TOUCHENEX_UTIL.getOSInfo().platform;
			if(TOUCHENEX_UTIL.isMobile() && OSInfo == "iOS"){
				if(!(navigator.userAgent.indexOf('CriOS') > -1 || navigator.userAgent.indexOf('FxiOS') > -1)){
					KSBizConfig.html5saveCertDomain = location.protocol + "//" + location.host;
				}
			} else{
				KSBizConfig.html5saveCertDomain = location.protocol + "//" + location.host;
			}
		}
	}
	kslog("KSBizConfig.yessignOpenCertUse", KSBizConfig.yessignOpenCertUse);
	kslog("KSBizConfig.html5saveCertDomain", KSBizConfig.html5saveCertDomain);
}
var yessignOpenCertUse_true, yessignOpenCertUse_false;
if(KSBizConfig.yessignOpenCertUse){
	yessignOpenCertUse_true = "checked";
	yessignOpenCertUse_false = "";
} else {
	yessignOpenCertUse_true = "";
	yessignOpenCertUse_false = "checked";
}
var yessignOpenCertUse_true_checkedstr = '<input type="radio" name="yessignOpenCertUse" onclick="yessignOpenCertUsechange(true)" value="true" ' + yessignOpenCertUse_true + '>true';
var yessignOpenCertUse_false_checkedstr = '<input type="radio" name="yessignOpenCertUse" onclick="yessignOpenCertUsechange(false)" value="false" ' + yessignOpenCertUse_false + '>false';
document.write("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;yessignOpenCertUse : ");
document.write(yessignOpenCertUse_true_checkedstr);
document.write(yessignOpenCertUse_false_checkedstr);

// KSBizConfig.mobileUse;
// function mobileUsechange(val){
// 	KSBizConfig.mobileUse = val;
// 	kslog("KSBizConfig.mobileUse", KSBizConfig.mobileUse);
// }
// var mobileUse_true, mobileUse_false;
// if(KSBizConfig.mobileUse){
// 	mobileUse_true = "checked";
// 	mobileUse_false = "";
// } else {
// 	mobileUse_true = "";
// 	mobileUse_false = "checked";
// }
// var mobileUse_true_checkedstr = '<input type="radio" name="mobileUse" onclick="mobileUsechange(true)" value="true" ' + mobileUse_true + '>true';
// var mobileUse_false_checkedstr = '<input type="radio" name="mobileUse" onclick="mobileUsechange(false)" value="false" ' + mobileUse_false + '>false';
// document.write("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mobileUse : ");
// document.write(mobileUse_true_checkedstr);
// document.write(mobileUse_false_checkedstr);


// KSBizConfig.mobileSecureKeypad
function mobileSecureKeypadchange(val){
	KSBizConfig.mobileSecureKeypad = val;
	kslog("KSBizConfig.mobileSecureKeypad", KSBizConfig.mobileSecureKeypad);
}
var mobileSecureKeypad_true, mobileSecureKeypad_false;
if(KSBizConfig.mobileSecureKeypad){
	mobileSecureKeypad_true = "checked";
	mobileSecureKeypad_false = "";
} else {
	mobileSecureKeypad_true = "";
	mobileSecureKeypad_false = "checked";
}
var mobileSecureKeypad_true_checkedstr = '<input type="radio" name="mobileSecureKeypad" onclick="mobileSecureKeypadchange(true)" value="true" ' + mobileSecureKeypad_true + '>true';
var mobileSecureKeypad_false_checkedstr = '<input type="radio" name="mobileSecureKeypad" onclick="mobileSecureKeypadchange(false)" value="false" ' + mobileSecureKeypad_false + '>false';
document.write("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mobileSecureKeypad : ");
document.write(mobileSecureKeypad_true_checkedstr);
document.write(mobileSecureKeypad_false_checkedstr);

// KSBizConfig.browserIssue
// function browserIssuechange(val){
// 	KSBizConfig.browserIssue = val;
// 	kslog("KSBizConfig.browserIssue", KSBizConfig.browserIssue);
// }
// var browserIssue_true, browserIssue_false;
// if(KSBizConfig.browserIssue){
// 	browserIssue_true = "checked";
// 	browserIssue_false = "";
// } else {
// 	browserIssue_true = "";
// 	browserIssue_false = "checked";
// }
// var browserIssue_true_checkedstr = '<input type="radio" name="browserIssue" onclick="browserIssuechange(true)" value="true" ' + browserIssue_true + '>true';
// var browserIssue_false_checkedstr = '<input type="radio" name="browserIssue" onclick="browserIssuechange(false)" value="false" ' + browserIssue_false + '>false';
// document.write("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;browserIssue : ");
// document.write(browserIssue_true_checkedstr);
// document.write(browserIssue_false_checkedstr);


</script>
