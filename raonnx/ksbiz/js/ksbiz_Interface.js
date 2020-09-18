/**
****************************************************
TouchEnNxBiz_Interface.js
****************************************************
| Version     작성자        수정일        변경사항
 ---------  -------  -----------  ----------
| v1.0.0.1    주성준    2017.06.07      최초

****************************************************
 Copyright ⒞ RaonSecure Co., Ltd.
****************************************************
**/

var KSBIZ;

var keysharpbizInfo = {
	"exPluginCallName"	: "KSBIZ",
	"exPluginName"		: "KSBIZ",
	"exPluginInfo"		: "keysharpbizInfo",
	"exModuleName"		: "biz",
	"tkInstallpage"		: TouchEnNxConfig.installPage,
	"tkMainpage"		: TouchEnNxConfig.tkMainpage,
	"bizInstalled"		: false,
	"exInstalled"		: false,
	"clInstalled"		: false,
	"exErrFunc"			:"TK_CommonError",
	"exErrFunc2"		: "",//모듈 변조시 FAQ 페이지로 이동 로직 추가
	"exErrSpec"			: "ksbizInterface.exSpecError",
	"lic"				: TouchEnNxConfig.lic,

	// Module Info, 플러그인 설치파일 경로
	"moduleInfo" : {
		"exWinVer"			: KSBizConfig.version.exWinVer,
		"exWinClient"		: KSBizConfig.module.exWinClient,
		"exWin64Ver"		: KSBizConfig.version.exWin64Ver,
		"exWin64Client"		: KSBizConfig.module.exWin64Client,
		"exMacVer"			: KSBizConfig.version.exMacVer,
		"exMacClient"		: KSBizConfig.module.exMacClient,
		"exLinuxVer"		: KSBizConfig.version.exLinuxVer,
		"exUbuntu32Client"	: KSBizConfig.module.exUbuntu32Client,
		"exUbuntu64Client"	: KSBizConfig.module.exUbuntu64Client,
		"exFedora32Client"	: KSBizConfig.module.exFedora32Client,
		"exFedora64Client"	: KSBizConfig.module.exFedora64Client
	},

	// EX Protocol Info, EX를 포함한 플러그인 클라이언트 파일 경로
	"exProtocolInfo" : {
		"exWinProtocolVer"			: KSBizConfig.version.exWinProtocolVer,
		"exWinProtocolDownURL"		: KSBizConfig.module.exWinVer,
		"exWin64ProtocolDownURL"	: KSBizConfig.module.exWin64Ver,
		"exMacProtocolVer"			: KSBizConfig.version.exMacProtocolVer,
		"exMacProtocolDownURL"		: KSBizConfig.module.exMacClient,
		"exLinuxProtocolVer"		: KSBizConfig.version.exLinuxProtocolVer,
		"exUbuntu32ProtocolDownURL"	: KSBizConfig.module.exUbuntu32Client,
		"exUbuntu64ProtocolDownURL"	: KSBizConfig.module.exUbuntu64Client,
		"exFedora32ProtocolDownURL"	: KSBizConfig.module.exFedora32Client,
		"exFedora64ProtocolDownURL"	: KSBizConfig.module.exFedora64Client
	},

	//////////////////////////////////////////////////////////////
	//////       CrossEX AREA DO NOT EDIT !!
	//////////////////////////////////////////////////////////////
	"isInstalled"		: false,
	"exProtocolName"	: "touchenex",
	"exExtHeader"		: "touchenex",
	"exNPPluginId"		: "touchenexPlugin",
	"exNPMimeType"		: "application/x-raon-touchenex",
	"exFormName"		: "__CROSSEX_FORM__",
	"exFormDataName"	: "__CROSSEX_DATA__",
	"exEdgeInfo" : {
		"isUse"			: TouchEnNxConfig.daemon.info.isUse,
		"addScript"		: TouchEnNxConfig.commonPath+"TouchEnNx_daemon.js",
		"portChecker"	: TouchEnNxConfig.commonPath+"TouchEnNx_port_checker.js",
		"localhost"		: TouchEnNxConfig.daemon.info.localhost,
		"edgeStartPort"	: TouchEnNxConfig.daemon.info.edgeStartPort,
		"portChkCnt"	: TouchEnNxConfig.daemon.info.portChkCnt,
		"allSupport"	: false,
		"daemonVer"		: KSBizConfig.version.daemonVer,
		"macDaemonVer"	: KSBizConfig.version.macDaemonVer,
		"daemonDownURL"	: KSBizConfig.module.daemonDownURL,
		"daemon64DownURL" : KSBizConfig.module.daemon64DownURL,
		"macDaemonDownURL" : KSBizConfig.module.macDaemonDownURL,
		"supportBrowser" : TouchEnNxConfig.daemon.SupportBrowser,
		"macSupportBrowser" : TouchEnNxConfig.daemon.macSupportBrowser,
		"linuxSupportBrowser" : TouchEnNxConfig.daemon.linuxSupportBrowser
	},
	// module minimum specification
	// PASS, ALL, NO
	"checkSpec"	: true,
	"reqSpec"	: {
		"OS"	: {
			"WINDOWS"	: "5.1",	// XP=5.1, VISTA=6.0, Win7=6.1, Win8=6.2, Win8.1=6.3, Win10=6.4/10.0
			"MACOSX"	: "PASS",	// Leopard=10.5, Snow Leopard=10.6, Lion=10.7, Mountain Lion=10.8, Mavericks=10.9, Yosemite=10.10, El Capitan=10.11
			"LINUX"		: "PASS"
		},
		"Browser": {
			"MSIE"		: TouchEnNxConfig.moduleMinVer.MSIE,
			"EDGE"		: TouchEnNxConfig.moduleMinVer.Edge,
			"CHROME"	: TouchEnNxConfig.moduleMinVer.chromeMinVer,
			"FIREFOX"	: TouchEnNxConfig.moduleMinVer.FireFoxMinVer,
			"OPERA"		: TouchEnNxConfig.moduleMinVer.OperaMinVer,
			"SAFARI_WIN": TouchEnNxConfig.moduleMinVer.SafariMinVer,
			"SAFARI_MAC": TouchEnNxConfig.moduleMinVer.SafariMinVerMac
		}
	},
	//////////////////////////////////////////////////////////////
	//////       CrossEX AREA DO NOT EDIT !!
	//////////////////////////////////////////////////////////////
	"isInstalled"		: false,
	"exProtocolName"	: "touchenex",
	"exExtHeader"		: "touchenex",
	"exNPPluginId"		: "touchenexPlugin",
	"exNPMimeType"		: "application/x-raon-touchenex",
	"exSiteName"		: "raon",
	// Extension Info
	"exExtensionInfo" : {
		"exChromeExtVer"		: KSBizConfig.version.extension.exChromeExtVer,
		"exChromeExtDownURL"	: KSBizConfig.module.extension.exChromeExtDownURL,
		"exFirefoxExtVer"		:  KSBizConfig.version.extension.exFirefoxExtVer,
		"exFirefoxExtDownURL"	:  KSBizConfig.module.extension.exFirefoxExtDownURL,
		"exFirefoxJpmExtVer"		:  KSBizConfig.version.extension.exFirefoxJpmExtVer,
		"exFirefoxJpmExtDownURL"	:  KSBizConfig.module.extension.exFirefoxJpmExtDownURL,
		"exFirefoxExtIcon"		: "",//48*48 icon
		"exOperaExtVer"			:  KSBizConfig.version.extension.exOperaExtVer,
		"exOperaExtDownURL"		:  KSBizConfig.module.extension.exOperaExtDownURL
	}
};
var ksbizInvoke = function(args){
	args[1].sid  = ksbizGetSid();
	kslog("ksbizInvoke", args);
	//invoke args : cmd, params, ksbizExCallback, cid
	KSBIZ.Invoke(args[0], [args[1]], args[2], args[3]);
};
var ksbizExCallback = "ksbizInterface.commonCallback";
var ksbizInterface = {
	// CrossEX 통신 응답에 대한 처리만을 common에서 하고 업무별 응답에 대한 처리는 가각 인터페이스 callback 에서 처리한다.
	commonCallback  : function(result){
		try{
			var testJSON = JSON.stringify(result);
			kslog("ksbizInterface.commonCallback", result);

			var statusCode = -1;
			statusCode = Number(result.status);
			if(statusCode == 0) {
				if(result.callback){
					//kslog("ksbizInterface.commonCallback.cbid", result.callback);
					if(result.callback){
						var cbFunc = tbCbCtrl('pop', result.callback);
						if(cbFunc){
							cbFunc(result.reply);
						}
					}
				}
			} else {
				kslog("ksbizInterface.commonCallback [exception] status", statusCode);
				this.exCommonError(result);
			}
		} catch (e) {
			kslog("ksbizInterface.commonCallback [exception] result", result);
			ksalert("ksbizInterface.commonCallback", "처리 중 오류가 발생하였습니다.\n" + "result : "+result + "\nexception : " + e);
		}
	},
	exCommonError : function( response ){
		alert("exCommonError" + JSON.stringify(response));
	},
	exSpecError : function( type, reqSpec ){
		if(type == "OS"){
			var printOS = "";
			if(TOUCHENEX_UTIL.isWin()){
				var winName = "";
				//XP=5.1, XP(x64)=5.2, VISTA=6.0, Win7=6.1, Win8=6.2, Win8.1=6.3, Win10=10.0
				if(reqSpec.WINDOWS == "5.1") winName = "XP";
				else if(reqSpec.WINDOWS == "5.2") winName = "XP";
				else if(reqSpec.WINDOWS == "6.0") winName = "VISTA";
				else if(reqSpec.WINDOWS == "6.1") winName = "Win7";
				else if(reqSpec.WINDOWS == "6.2") winName = "Win8";
				else if(reqSpec.WINDOWS == "6.3") winName = "Win8.1";
				else if(reqSpec.WINDOWS == "10.0") winName = "Win10";
				printOS = "WINDOWS " + winName + "이상";
			} else if(TOUCHENEX_UTIL.isMac()) printOS = "MACOSX " + reqSpec.MACOSX + "이상";
			else if(TOUCHENEX_UTIL.isLinux()) printOS = "LINUX " + reqSpec.LINUX + "이상";
			else printOS = "UNDEFINED OS";

			alert("지원하지 않는 운영체제입니다.");
		} else if (type == "BROWSER"){
			var printBrowser = "";
			if(TOUCHENEX_UTIL.isIE()) printBrowser = "IE " + reqSpec.MSIE + "이상";
			else if(TOUCHENEX_UTIL.isEdge()) printBrowser = "Edge " + reqSpec.EDGE + "이상";
			else if(TOUCHENEX_UTIL.isChrome()) printBrowser = "Chrome " + reqSpec.CHROME + "이상";
			else if(TOUCHENEX_UTIL.isFirefox()) printBrowser = "Firefox " + reqSpec.FIREFOX + "이상";
			else if(TOUCHENEX_UTIL.isOpera()) printBrowser = "Opera " + reqSpec.OPERA + "이상";
			else if(TOUCHENEX_UTIL.isSafari() && TOUCHENEX_UTIL.isWin()) printBrowser = "Safari " + reqSpec.SAFARI_WIN + "이상";
			else if(TOUCHENEX_UTIL.isSafari() && TOUCHENEX_UTIL.isMac()) printBrowser = "Safari " + reqSpec.SAFARI_MAC + "이상";
			else printBrowser = "UNDEFINED BROWSER";

			alert("지원하지 않는 브라우저입니다.");
		}
		return;
	},
	cmd : [
		"init", "getResult", "getVersion", "getVersion", "getProperty", "setProperty", "setPropertyJson", 
		"manageCertificateWithComplete", "setLang", "resetCertificate", "sign", "requestCertificate", 
		"updateCertificate", "deleteCertificate", "signFile", "addSignFile", "signFileUrl", "addSignFileUrl", 
		"encryptFile", "decryptFile", "encryptFileUrl", "decryptFileUrl", "channelDecryptFile", "channelDecryptFileUrl", 
		"compressFile", "uncompressFile", "signAndChannelEncryptFileUrl", 
		"channel2Init", "channel2Verify", "channel2Final", "channel2Encrypt", "channel2Decrypt",
		"getDiskStatus", "getDiskCert", "getDiskList", "certDiskInfo", "signStorage", "signCert", "copyDiskCert", 
		"deleteDiskCert", "changePwdDiskCert", "exportDiskCert", "importDiskCert", "getDiskFilePath", 
		"makeLocalLinkURL", "downLocalLinkURL", "requestDiskCertificate", "updateDiskCertificate", "lineEncrypt", "lineDecryptAsync", "simpleEncrypt", "simpleDecryptAsync"
	],
	invoke : function(cmd, params, callback){
		var cid = tbCbCtrl('push', callback);
		var inArray = function(needle, haystack) {
			var len = haystack.length;
			for(var i=0; i<len; i++) if(haystack[i] == needle) return true;
			return false;
		}
		try{
			if(!inArray(cmd, ksbizInterface.cmd)){
				alert('[ksbizInterface.invoke] need cmd');
				return;
			}
			if(!params) params = {};
			ksbizInvoke([cmd, params, ksbizExCallback, cid]);
		} catch(e){
			alert('[ksbizInterface.invoke] exception');
			return;
		}
	}
};
