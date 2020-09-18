//base directory
var ksbizHomeUrl = TouchEnNxConfig.path.url;
var ksbizBaseUrl = TouchEnNxConfig.path.base;
var ksbizBaseJSUrl = ksbizBaseUrl + "/ksbiz/js";
var ksbizSvcUrl = ksbizBaseUrl + "/ksbiz/jsp";
var ksbizBasePath = nxbasepath + "/ksbiz";
var cxsignHome = ksbizBasePath + "/cxsign";
var ksbizloadflag = false;

// ksbiz Config
var KSBizConfig = {
	uitype : "html",	// native, html
	theme : "ksbiz",	// theme
	colorTheme : "orange", //orange(default), blue, yellow, red, brown, sky, green
	signSize : "defaults", // defaults, compact
	mobileUse : true,	// mobile browser available
	mobileTheme : "mobile", //mobile theme
	kslog : true,	// console log
	ksalert : true,	// alert
	isloaded : false,	// client loading status
	sid : "ksbizSid",	// session storage saved sid name
	licensealert : true,	// dev license check alert
	installpage : TouchEnNxConfig.installPage.ksbiz,
	installpageTarget : "parent",	// parent, top, popup, self
	installpagePopWidth : 650,		// popup install page width
	installpagePopHeight : 650,		// popup install page height
	certclickfocus : false,		// cert click password field focus on, default false
	verify : true,
	cbarr : [],
	certExport : {
		win : ksbizBaseUrl + "/ksbiz/module/KSbiz_CertExport.exe",
		mac : ksbizBaseUrl + "/ksbiz/module/KSbiz_CertExport_Mac.zip",
		ubuntu32 : ksbizBaseUrl + "/ksbiz/module/KSbiz_CertExport_Ubuntu_32bit.zip",
		ubuntu64 : ksbizBaseUrl + "/ksbiz/module/KSbiz_CertExport_Ubuntu_64bit.zip",
		fedora32 : ksbizBaseUrl + "/ksbiz/module/KSbiz_CertExport_Fedora_32bit.zip",
		fedora64 : ksbizBaseUrl + "/ksbiz/module/KSbiz_CertExport_Fedora_64bit.zip"
	},
	version:{
		extension :{
			exChromeExtVer		:	"1.0.0.0",
			exFirefoxExtVer		:	"1.0.2.5",
			exFirefoxJpmExtVer	:	"1.0.1.12",	
			exOperaExtVer		:	"1.0.1.14"
		},
		exHTMLVer			:	"2.1.1.7",
		exWinVer			:	"2.1.0.2640",
		exWin64Ver			:	"2.1.0.2640",
		exWinProtocolVer	:	"1.0.1.1243",
		daemonVer			:	"1.0.2.9",
		daemon64DownURL		:	"1.0.2.9",
		macDaemonVer		:   "1.0.1.4",
		exMacVer			:	"2.1.0.2640",
		exMacProtocolVer	:	"1.0.1.1392",
		exLinuxVer			:	"2.1.0.2640",
		exLinuxProtocolVer	:	"1.0.1.1101"
	},
	module : {
		extension : {
			exChromeExtDownURL	: "https://chrome.google.com/webstore/detail/dncepekefegjiljlfbihljgogephdhph",
			exFirefoxExtDownURL	: TouchEnNxConfig.path.base + "/extension/touchenex_firefox.xpi",
			exFirefoxJpmExtDownURL	: TouchEnNxConfig.path.base + "/extension/jpm_touchenex_firefox.xpi",
			exOperaExtDownURL	: TouchEnNxConfig.path.base + "/extension/touchenex_opera.nex"
		},
		exWinClient		            :	TouchEnNxConfig.path.base + "/ksbiz/module/KSbiz_Installer_32bit.exe",
		exWin64Client            	:	TouchEnNxConfig.path.base + "/ksbiz/module/KSbiz_Installer_64bit.exe",
		daemonDownURL	            :	TouchEnNxConfig.path.base + "/ksbiz/module/KSbiz_Installer_32bit.exe",
		daemon64DownURL             :   TouchEnNxConfig.path.base + "/ksbiz/module/KSbiz_Installer_32bit.exe",
		macDaemonDownURL			:	TouchEnNxConfig.path.base + "/ksbiz/module/KSbiz_Installer_Mac.pkg",
		exMacClient					:	TouchEnNxConfig.path.base + "/ksbiz/module/KSbiz_Installer_Mac.pkg",
		exMacProtocolDownURL		: 	TouchEnNxConfig.path.base + "/ksbiz/module/KSbiz_Installer_Mac.pkg",
		exUbuntu32Client			:	TouchEnNxConfig.path.base + "/ksbiz/module/KSbiz_Installer_Ubuntu_32bit.deb",
		exUbuntu32ProtocolDownURL	: 	TouchEnNxConfig.path.base + "/ksbiz/module/KSbiz_Installer_Ubuntu_32bit.deb",
		exUbuntu64Client			:	TouchEnNxConfig.path.base + "/ksbiz/module/KSbiz_Installer_Ubuntu_64bit.deb",
		exUbuntu64ProtocolDownURL	: 	TouchEnNxConfig.path.base + "/ksbiz/module/KSbiz_Installer_Ubuntu_64bit.deb",
		exFedora32Client			:	TouchEnNxConfig.path.base + "/ksbiz/module/KSbiz_Installer_Fedora_32bit.rpm",
		exFedora32ProtocolDownURL	: 	TouchEnNxConfig.path.base + "/ksbiz/module/KSbiz_Installer_Fedora_32bit.rpm",
		exFedora64Client			:	TouchEnNxConfig.path.base + "/ksbiz/module/KSbiz_Installer_Fedora_64bit.rpm",
		exFedora64ProtocolDownURL	: 	TouchEnNxConfig.path.base + "/ksbiz/module/KSbiz_Installer_Fedora_64bit.rpm"	
	},
	// length, alphabet, upper, lower, number, spchar, badchar
	certPwdDefaultRule : {length: 8, alphabet: true, number: true, spchar: true, badchar: true},
	certPwdCMPRule : {length: 10, alphabet: true, number: true, spchar: true, badchar: true}
};

// KSBizConfig.homeUrl = ksbizHomeUrl;
// KSBizConfig.baseUrl = ksbizBaseUrl;
// KSBizConfig.svc = ksbizBaseUrl + "/svc";

//"KOR", "ENG", "CHN", "JPN"
KSBizConfig.lang = "KOR";

// 로고이미지 URL 설정
if(KSBizConfig.lang == "KOR"){
	KSBizConfig.logoImageUrl = ksbizBaseUrl + "/ksbiz/sitelogo/default_logo.html";
} else {
	KSBizConfig.logoImageUrl = ksbizBaseUrl + "/ksbiz/sitelogo/default_logo.html";
}

// 전자서명 타이틀 이미지 URL 설정
if(KSBizConfig.lang == "KOR"){
	KSBizConfig.confirmSignTitleImageUrl = ksbizBaseUrl + "/ksbiz/sitelogo/sign_title.txt";
	//confirmSignTitleImageUrl = "",
} else {
	KSBizConfig.confirmSignTitleImageUrl = ksbizBaseUrl + "/ksbiz/sitelogo/sign_title.txt";
}

//인증서 캐쉬가 멀티 호스트에 사용될 때 domain을 설정. 예)".raonsecure.com
KSBizConfig.domain = "";

// 패스워드 오류에 대한 카운터 설정
KSBizConfig.passwordCounter = 5; // 1~5

// 전자서명에서 인증서 찾기 사용시 브라우저 인증서에 저장 여부 체크박스 설정
KSBizConfig.checkedtoSaveInBrowser = true;

// 저장매체의 타사 모듈 설치 종료후 에러메세지 호출 여부, 변경금지
KSBizConfig.installError = true;

// 인증서 선택창에서 마지막 사용한 저장매체가 자동으로 선택될 지 설정
KSBizConfig.cacheCertStore = false;

// 다국어 리소스 URL
KSBizConfig.langUrl = {
	b64 : {
		koreanUrl : ksbizBaseJSUrl + "/lang/lang_ko_b64.js",
		englishUrl :ksbizBaseJSUrl + "/lang/lang_en_b64.js",
		chaneseUrl :ksbizBaseJSUrl + "/lang/lang_zh_b64.js",
		japaneseUrl :ksbizBaseJSUrl + "/lang/lang_ja_b64.js"
	},
	koreanUrl : ksbizBaseJSUrl + "/lang/lang_ko.js",
	englishUrl :ksbizBaseJSUrl + "/lang/lang_en.js",
	chaneseUrl :ksbizBaseJSUrl + "/lang/lang_zh.js",
	japaneseUrl :ksbizBaseJSUrl + "/lang/lang_ja.js"
};

// real CA
KSBizConfig.ca = {
	yessign   : { host: "203.233.91.71", port: 4512, url: "https://fidoweb.yessign.or.kr:4512/cmp"},
	crosscert : { host : "211.192.169.90", port : 4512},
	signkorea : { host : "210.207.195.100", port : 4099},
	kica  : { host : "211.35.96.43", port : 4502},
	inipass : { host : "220.90.214.15", port : 4512}
};

//test CA
KSBizConfig.ca_test = {
	yessign   : {host: "203.233.91.231", port: 4512, url: "https://fidoweb.yessign.or.kr:4512/cmp"},
	crosscert : {host : "211.180.234.201", port : 4512},
	signkorea : {host : "211.175.81.101", port : 8099},
	//kica  : {host: "61.72.247.156", port : 4502}
	kica  : {host: "211.35.96.122", port : 4502},
	inipass : { host : "220.90.214.135", port : 4512}
};


// 인증서 발급/갱신 이후 추가저장매체 설정
KSBizConfig.additionalCopycert = true;

// 저장매체 설정 (BROWSER|LOCAL_DISK|REMOVABLE_DISK|PHONE|HSM|USIM)
KSBizConfig.certStoreFilter = "BROWSER|LOCAL_DISK|REMOVABLE_DISK|PHONE|HSM|USIM";

// 저장매체 준비중
KSBizConfig.prepareCertStore = "";
KSBizConfig.prepareCertStore_MultiOS = "PHONE|HSM|USIM";

// 인증서 선택창의 보안토근 저장매체 중 PC에 구동프로그램(드라이버)가 설치되어 있지 않더라도 리스트에 나타나도록하기 위해서 보안토큰이름과 버전을 설정.
//"eToken Pro 32K,XecureHSM:1.0.0.0,Vid_04e8&Pid_0007"
// 미지정인 경우 PC에 설치된 보안토큰 목록만 출력
KSBizConfig.hsmUsingDrivers = "";

// 휴대폰 인증서 저장매체 모비싸인을 위한 설정
KSBizConfig.mobisignConfig = {
	enable : true,
	download : "http://www.mobisign.kr/mobisigndll.htm",
	version : "5,0,4,4",
	sitecode : "1019999", //사이트 고유값으로 변경
	aclist : "23;yessignCA Class 1;1.2.410.200005.1.1.1;yessignCA Class 1;1.2.410.200005.1.1.2;yessignCA Class 1;1.2.410.200005.1.1.4;yessignCA Class 1;1.2.410.200005.1.1.5;yessignCA Class 1;1.2.410.200005.1.1.6.1;yessignCA Class 1;1.2.410.200005.1.1.6.8;yessignCA Class 2;1.2.410.200005.1.1.1;yessignCA Class 2;1.2.410.200005.1.1.2;yessignCA Class 2;1.2.410.200005.1.1.4;yessignCA Class 2;1.2.410.200005.1.1.5;yessignCA Class 2;1.2.410.200005.1.1.6.1;yessignCA Class 2;1.2.410.200005.1.1.6.8;signGATE CA4;1.2.410.200004.5.2.1.2;signGATE CA4;1.2.410.200004.5.2.1.7.1;signGATE CA4;1.2.410.200004.5.2.1.1;SignKorea CA2;1.2.410.200004.5.1.1.5;SignKorea CA2;1.2.410.200004.5.1.1.7;CrossCertCA2;1.2.410.200004.5.4.1.1;CrossCertCA2;1.2.410.200004.5.4.1.101;CrossCertCA2;1.2.410.200004.5.4.1.2;TradeSignCA2;1.2.410.200012.1.1.1;TradeSignCA2;1.2.410.200012.1.1.101;TradeSignCA2;1.2.410.200012.1.1.3;",
	aclist_test :"56;yessignCA-TEST;1.2.410.200005.1.1.1;yessignCA-TEST;1.2.410.200005.1.1.2;yessignCA-TEST;1.2.410.200005.1.1.4;yessignCA-TEST;1.2.410.200005.1.1.5;yessignCA-TEST;1.2.410.200005.1.1.6.1;yessignCA-TEST;1.2.410.200005.1.1.6.8;yessignCA-Test Class 0;1.2.410.200005.1.1.1;yessignCA-Test Class 0;1.2.410.200005.1.1.2;yessignCA-Test Class 0;1.2.410.200005.1.1.4;yessignCA-Test Class 0;1.2.410.200005.1.1.5;yessignCA-Test Class 0;1.2.410.200005.1.1.6.1;yessignCA-Test Class 0;1.2.410.200005.1.1.6.8;yessignCA-Test Class 1;1.2.410.200005.1.1.1;yessignCA-Test Class 1;1.2.410.200005.1.1.2;yessignCA-Test Class 1;1.2.410.200005.1.1.4;yessignCA-Test Class 1;1.2.410.200005.1.1.5;yessignCA-Test Class 1;1.2.410.200005.1.1.6.1;yessignCA-Test Class 1;1.2.410.200005.1.1.6.8;yessignCA-Test Class 2;1.2.410.200005.1.1.1;yessignCA-Test Class 2;1.2.410.200005.1.1.2;yessignCA-Test Class 2;1.2.410.200005.1.1.4;yessignCA-Test Class 2;1.2.410.200005.1.1.5;yessignCA-Test Class 2;1.2.410.200005.1.1.6.1;yessignCA-Test Class 2;1.2.410.200005.1.1.6.8;yessignCA-Test Class 3;1.2.410.200005.1.1.1;yessignCA-Test Class 3;1.2.410.200005.1.1.2;yessignCA-Test Class 3;1.2.410.200005.1.1.4;yessignCA-Test Class 3;1.2.410.200005.1.1.5;yessignCA-Test Class 3;1.2.410.200005.1.1.6.1;yessignCA-Test Class 3;1.2.410.200005.1.1.6.8;signGATE FTCA02;1.2.410.200004.5.2.1.2;signGATE FTCA02;1.2.410.200004.5.2.1.7.1;signGATE FTCA02;1.2.410.200004.2.201;signGATE FTCA02;1.2.410.200004.5.2.1.1;signGATE FTCA02;1.2.410.200004.2.202;signGATE FTCA04;1.2.410.200004.5.2.1.2;signGATE FTCA04;1.2.410.200004.5.2.1.7.1;signGATE FTCA04;1.2.410.200004.2.201;signGATE FTCA04;1.2.410.200004.5.2.1.1;signGATE FTCA04;1.2.410.200004.2.202;SignKorea Test CA;1.2.410.200004.5.1.1.5;SignKorea Test CA;1.2.410.200004.5.1.1.7;SignKorea Test CA2;1.2.410.200004.5.1.1.5;SignKorea Test CA2;1.2.410.200004.5.1.1.7;CrossCertCA-Test2;1.2.410.200004.5.4.1.1;CrossCertCA-Test2;1.2.410.200004.5.4.1.101;CrossCertCA-Test2;1.2.410.200004.5.4.1.2;CrossCertTestCA2;1.2.410.200004.5.4.1.1;CrossCertTestCA2;1.2.410.200004.5.4.1.101;CrossCertTestCA2;1.2.410.200004.5.4.1.2;TestTradeSignCA;1.2.410.200012.1.1.1;TestTradeSignCA;1.2.410.200012.1.1.101;TestTradeSignCA;1.2.410.200012.1.1.3;TradeSignCA2009Test2;1.2.410.200012.1.1.1;TradeSignCA2009Test2;1.2.410.200012.1.1.101;TradeSignCA2009Test2;1.2.410.200012.1.1.3;"
};

// 보안키보드 설정
//Ax-Plugin : npkcx, scsk, touchenkey, kings
//Non-Plugin: nosk, astx, touchennxkey
KSBizConfig.secureKeyboardConfig = {
	enable : false,
	product : "touchennxkey"
	// product : "nosk"
};

// 가상키보드 불가 설정 (default false)
KSBizConfig.disableScreenKeyboard = true;

// 보안키보드를 사용할 수 없을때 가상키보드 사용을 강제하는 설정 (default true)
KSBizConfig.forceScreenKeyboard = false;

// 가상키보드 설정
// product : transkey, nos
KSBizConfig.secureKeypadConfig = {
	product : "transkey",
	nativeKeypadUrl : ksbizSvcUrl + "/tk_crt.jsp"
	// product : "nos",
	// nativeKeypadUrl : TouchEnNxConfig.path.url + "/pluginfree/jsp/nppfs.pki.jsp"
}

// 모바일에서 가상키보드 사용여부 (default true)
KSBizConfig.mobileSecureKeypad = true;

// raon 보안키보드, 가상키보드 공개키
KSBizConfig.transkeyCert = "-----BEGIN CERTIFICATE-----MIIBCgKCAQEAqd5p7ts0eM4IkD/vQZlLbahssM6TpvqD7ih385xAdLD7OguCundT4znfzYK0HYFNlEmB7+oSWiOG3exCh3m1YtoERb0Ru3HyXkmCVNh95SP+b62jYC/GI8b1bPvszIVAUEqHZ9Wt/jA8y2R7haoSuVs/hky1ipOO+ubfi/nxWbi2QB8Ws6C30qeWH2dP6547C0fytzzUpcKaZVNdaQ+EXrneByaOylVTI7KWS6mW7LeSPLKE00NVED/EFzohme5Bj2bmj71MaGeFJJD7TnCtjRfcssgCJjN5IeLgpxOUMJt8i7gyVuIPpANd0vxEd1eS0GKCBfYJjRbJjSwIBDfTrwIDAQAB-----END CERTIFICATE-----";

// 키보드보안 인증서
KSBizConfig.secureKeyboardCert = "";
// touchennxkey
KSBizConfig.touchennxkeyCert = "-----BEGIN CERTIFICATE-----MIIBCgKCAQEAqd5p7ts0eM4IkD/vQZlLbahssM6TpvqD7ih385xAdLD7OguCundT4znfzYK0HYFNlEmB7+oSWiOG3exCh3m1YtoERb0Ru3HyXkmCVNh95SP+b62jYC/GI8b1bPvszIVAUEqHZ9Wt/jA8y2R7haoSuVs/hky1ipOO+ubfi/nxWbi2QB8Ws6C30qeWH2dP6547C0fytzzUpcKaZVNdaQ+EXrneByaOylVTI7KWS6mW7LeSPLKE00NVED/EFzohme5Bj2bmj71MaGeFJJD7TnCtjRfcssgCJjN5IeLgpxOUMJt8i7gyVuIPpANd0vxEd1eS0GKCBfYJjRbJjSwIBDfTrwIDAQAB-----END CERTIFICATE-----";

// 스마트 인증 설정
KSBizConfig.usim = {
	usingDrivers : "USIM_0001",
	certSelector : "mobile",
	displayDataAtMobile : false,
	siteDomain : "www.raonsecure.com",
	disableInHSM : false,
	raon : { download: "http://www.usimcert.com/popup/pop_install.php", siteCode : "600140027", displayDataAtMobile : false },
	dream : { download: "http://ids.smartcert.kr", host : "center.smartcert.kr", port : "443", displayDataAtMobile : true },
	sumion : { download: "http://www.mobileusim.com/download/install", host : "relay.mobileusim.com", port : "443", displayDataAtMobile : false }
};

// 인증서 목록에서 마지막 사용된 인증서를 가장 먼저 보여주는 기능
KSBizConfig.lastUsedCertSubject = false;

// 만료된 인증서 보이기 false: 미표시, true: 표시
KSBizConfig.disableExpireFilter = false;

// 만료된 인증서 경고툴팁 안보이기 false: 표시, true: 미표시
KSBizConfig.disableExpireWarn = false;

// 전자서명 값을 담을 히든폼의 폼이름
KSBizConfig.formName = "ksbizForm";

// 다건 전자서명 시 구분값
KSBizConfig.multiSignDelimiter = "|";

// 문자열 전자서명 시 구분값
KSBizConfig.stringsDelimiter = ":";

// 전자서명에 사용할 NONCE값
KSBizConfig.nonceUrl = ksbizSvcUrl + "/nonce.jsp";
KSBizConfig.nonce = null;
KSBizConfig.nonceKeyName = "ksbizNonce";

// 파일 전자서명 저장 옵션 KSBizConfig.0 : server에서 설정한 경로, 1 : default 경로, 2 : 서명파일을 읽어오는 경로와 저장하는 경로를 같게함, 3 : 사용자가 파일을 저장할 경로 선택
KSBizConfig.saveType = 1;

// 서명 알고리즘 (preferRsaPSS or rsaEncryption)
KSBizConfig.signAlgorithm = "preferRsaPSS";

// CMS envelopedData keyEncryption 알고리즘  (rsaOAEP or rsaEncryption)
KSBizConfig.cmsKeyEncryptionAlgorithm = "rsaOAEP";

// 전자서명 함수인 sign, login, autoLogin, autoSign 함수에서 디폴트 complete를 사용할 때 전자서명 후 채널 암호화를 사용할 것인지 설정함.
KSBizConfig.signAndEncrypt = false;

// 채널 암호화에 사용할 알고리즘 (SEED-CBC)
KSBizConfig.cipherAlgorithm = "SEED-CBC";

// autoLogin/autoSign의 자동 전자서명 옵션 지정
// 0 : 자동전자서명사용 안함, 1 : 저장된 인증서가 있을 경우 해당 인증서로 전자서명 저장된 인증서 없을 경우 에러, 2 : 저장된 인증서가 있을 경우 해당 인증서로 전자서명 저장된 인증서 없을 경우 인증서 선택창 표시,
// 3 : 인증서 선택창 표시 사용된 인증서 저장, 4 : 저장된 인증서 없을 경우 인증서 선택창 표시 사용된 인증서 저장
KSBizConfig.autoLoginType = 3;
KSBizConfig.autoSignType = 4;

// 채널암호화에 사용할 인증서
KSBizConfig.serverCertUrl = ksbizSvcUrl + "/servercert.jsp";
KSBizConfig.serverCert = "-----BEGIN CERTIFICATE-----\nMIIDNjCCAh6gAwIBAgIJAO4t+//wr+SBMA0GCSqGSIb3DQEBBQUAMGcxCzAJBgNV\nBAYTAktSMR0wGwYDVQQKExRSYW9uU2VjdXJlIENvLiwgTHRkLjEaMBgGA1UECxMR\nUXVhbGl0eSBBc3N1cmFuY2UxHTAbBgNVBAMTFFJhb25TZWN1cmUgQ28uLCBMdGQu\nMB4XDTE3MDYyNjA0NDQxN1oXDTE4MDYyNjA0NDQxN1owMjELMAkGA1UEBhMCS1Ix\nEzARBgNVBAoMCnJhb25zZWN1cmUxDjAMBgNVBAMMBWtzYml6MIIBIjANBgkqhkiG\n9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyiW6+8/PNpVtE5mEGOSr5eYYLjK+Ay3QVxMi\n9ATXA6suM4aOm3dOsIEh84AxPnY1wvi2CYpNIymmbDM0oxhvjWoBdoviEHEa3/eK\nFnhA8j1zOCU+dT/763FxEhW96EV6qzsZifx45vVxnG95p727zRWroAR7WmyHYOfk\nvXJQacswtmQcQ1Xy5bTcOqFoXyJni6xOCtJPmp+8KRVC/BH2jtsmCMeFx3YCK/op\n3jphmcN5Vp57gqmYclVr1imo3YNelhgCWVK90c7GCak/ee46kJd7h9HTD5QjSxHV\ngJYNzotTCMSrk+ntU6x7cjDnbvTsdlWZ1ZhPVHTVTlCPBU21WQIDAQABoxowGDAJ\nBgNVHRMEAjAAMAsGA1UdDwQEAwIF4DANBgkqhkiG9w0BAQUFAAOCAQEASzYL4T1n\ni0Jqw1D1uZ7VY7u1zYyeGLAZD4qx2dfimVHKybotfUdhbvW+Cv++tVsAKMDMntnc\nnLbbIRxbe6uT51aSL5SF/scpCh1qNEB86rMHZHGnItrZKt+v6W26JNMurVaW4b8T\nF/VahLXKjkhIB2CkJusACZOPyoXj1N+MJW/kSOzxndvyOXENEX+E3FC3Y1F2gTZW\ndV6I3v3DKT+jhauLRLpjfy6VQ6j/p8Y5qNsUnyhx40XszsLL5ORLDcIN+X2ex2Bg\n84rdw2zBWYNmC7Omw61/ld6jgvLJX3lSrkP/5ME3UR5p76astGxA/5t0AoqeJ1Wt\n7UQVHzWv6eGkbg==\n-----END CERTIFICATE-----\n";
//KSBizConfig.serverCert = "";

// 채널암호화에 사용할 인증서의 CA
//caCertUrl = ksbizBaseUrl + "/ca.cer";
KSBizConfig.caCert = "-----BEGIN CERTIFICATE-----\nMIIEHjCCAwagAwIBAgIJALcMNEp1tPYgMA0GCSqGSIb3DQEBCwUAMGcxCzAJBgNV\nBAYTAktSMR0wGwYDVQQKExRSYW9uU2VjdXJlIENvLiwgTHRkLjEaMBgGA1UECxMR\nUXVhbGl0eSBBc3N1cmFuY2UxHTAbBgNVBAMTFFJhb25TZWN1cmUgQ28uLCBMdGQu\nMB4XDTEzMDIwNzA5MDYyNVoXDTQzMDEzMTA5MDYyNVowZzELMAkGA1UEBhMCS1Ix\nHTAbBgNVBAoTFFJhb25TZWN1cmUgQ28uLCBMdGQuMRowGAYDVQQLExFRdWFsaXR5\nIEFzc3VyYW5jZTEdMBsGA1UEAxMUUmFvblNlY3VyZSBDby4sIEx0ZC4wggEiMA0G\nCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCqB0MsUuAi7pWVmRWaCS7kAactycMg\nhmOM7RiMbmXyHmatXJbrtOlNrGH8Xl4fdkCJjyUE2829zQy+lTJ2O3Uo3Nn7zK3+\n3Um9nDQXN2tapambthOXs0aHjnRCtuLMOSPlAx06o0yHP1nOGaV7hfY9PyJjIVh9\nLk/oFp5A+wsi0wiQ+INMDrm/6xZrooEY7/TLMnE4v+nr+cpIf3hSrvI1gGTykFtG\nCy2Le1huqaTKkE9K0CF/Sd8Kvebj6R+MhlieDXiMZXZD++pRmd4cAmGAmnGn4YdJ\nMyh16TCccPjT60KkMv84uNVjXBvnar8ZlzRQSgIhwp1KkRiMErMbVWCnAgMBAAGj\ngcwwgckwHQYDVR0OBBYEFPzIDKwqK4PCklaP6Mq4YXdq8McyMIGZBgNVHSMEgZEw\ngY6AFPzIDKwqK4PCklaP6Mq4YXdq8McyoWukaTBnMQswCQYDVQQGEwJLUjEdMBsG\nA1UEChMUUmFvblNlY3VyZSBDby4sIEx0ZC4xGjAYBgNVBAsTEVF1YWxpdHkgQXNz\ndXJhbmNlMR0wGwYDVQQDExRSYW9uU2VjdXJlIENvLiwgTHRkLoIJALcMNEp1tPYg\nMAwGA1UdEwQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHBRlEB4nu/gHwVFRzqb\nFOloR7aB0xIaMDykMWtovXHUQcTmmGyYQn0bMWaGVCD7SgRh1FisfciJzLP7f8OI\n5f7rA2tiBZD1PBtLMU7MytGIYlV/gcfWPbnqBVsKDm15AEUqH7ZahOm7np4d5Fr8\n7r1bj2baXQPKSNd9yjh89fl6LthWLEQRYKKwhPYAA/QkeB2RE9MftmuOXJ6MnYyy\nx5xEZK2ofqwrRBvDmV/PjwdCSxhloiJVFHrp8lKPCsZywJ3v9IPpudjgBQ7SWqhD\ncPNo2diGB2dQ252g36K1H7u3aT9Xha33MFQXTTEDzVDhaXzaGk7X6T9v25dsOyOa\nLAo=\n-----END CERTIFICATE-----";
//KSBizConfig.caCert = "";

// 채널암호화에 사용할 인증서 CRL 체크 여부
KSBizConfig.checkCRL = false;

// 채널암호화에 사용할 임시데이타
KSBizConfig.channelEncryptEmptyData = "ksbizDummyData=123";

// 채널 복호화시 사용하는 키값
KSBizConfig.encKeyName = "ksbizEnc";

// channelDecryptAsync에서 복호화된 데이터 표시를 위해서 jQuery.html() 대신에 element.outerHTML 사용할지 설정, 미지정시 false
KSBizConfig.useOuterHTML = false;

// 파일서명/파일암호화 포맷 설정  0 : fsig,fenv, 1 : sig,env
KSBizConfig.fileInfoType = 0;

// 채널암호화 URL
KSBizConfig.channelSvrUrl = ksbizSvcUrl + "/channel.jsp";

// 구간암호화2.0에 사용할 URL
KSBizConfig.lineServerURL = ksbizSvcUrl + "/line.jsp";

// 브라우저 인증서 허용 url 기본값은 현재 접속한 2차 도메인임
KSBizConfig.html5saveCertDomain = location.protocol + "//" + location.host;
//KSBizConfig.html5saveCertDomain = "https://bizdev.raonsecure.co.kr:8442";
KSBizConfig.html5saveCertUrl = cxsignHome + "/engine/wpki.html";

// 브라우저 인증서 내보내기/가져오기 연동 URL
KSBizConfig.browserCertExportUrl = KSBizConfig.html5saveCertDomain + cxsignHome + "/engine/certsync.jsp";

// 브라우저 내보내기 가져오기 인증코드 길이
KSBizConfig.certSyncAuthLength = 8;

// domain 범위 설정 1:자기자신, 2:2차도메인, 3:전체(*), 4:site custom
KSBizConfig.chkDomainType = 3;

// 금융결제원 공동저장소 사용여부 (default false)
KSBizConfig.yessignOpenCertUse = false;

// 클라우드 패스워드 오류에 대한 카운터 설정
KSBizConfig.cloudPasswordCounter = 10; // 10

// 금융결제원 공동저장소 관련정보
KSBizConfig.yessignOpenCertInfo = {
	apikey : "gp+M6OtduOza8bfEi46xj3QVDFsgy+qDChqjRp1k/7Ma6nL8MERyWhABBsVFpYskn8oqTP2xMV8k/mKjqIOassZbt3GGbIpYXvfzsw==",
	corpcode : "0001",
	mode : "",
	opencertUrl : "",
	relayUrl : "",
	cloud : true,
	disableCloudSync : false	//false: 전자서명시 금결원 동기화(기본값), true: 동기화 안함
};
KSBizConfig.yessignOpenCertInfo.opencertUrl_test = "https://fidoweb.yessign.or.kr:3100/v2/opencert.js";
KSBizConfig.yessignOpenCertInfo.opencertUrl_real = "https://www.yessign.or.kr:3100/v2/opencert.js";
KSBizConfig.yessignOpenCertInfo.relayUrl_test = "https://fidoweb.yessign.or.kr:3100/v2/relay.js";
KSBizConfig.yessignOpenCertInfo.relayUrl_real = "https://www.yessign.or.kr:3100/v2/relay.js";

// 모바일브라우저 테스트 여부 (default false)
KSBizConfig.mobileTest = true;

// 웹cmp 공인인증서 발급 여부
KSBizConfig.browserIssue = true;

// 브라우저 인증서 사용안내 레이어 팝업
KSBizConfig.browsercert_guide = true;

// 전자서명창 버전 표시 유무 (default true)
KSBizConfig.viewVersion = true;

// 인증서 CRL 확인 (default false)
KSBizConfig.certCRLCheck = false;

// 기본 저장소 선택 (browser/disk)
KSBizConfig.initStorage = "browser";

// 인증서 선택창에서 인증서 필터링 위한 인증서 발급자 DN 설정. '|'로 구분하여 여러개를 설정.
KSBizConfig.issuerCertFilter_n =
	"CN=CrossCertCA2,OU=AccreditedCA,O=CrossCert,C=KR|"
	+"CN=CrossCertCA3,OU=AccreditedCA,O=CrossCert,C=KR|"
	+"CN=signGATE CA4,OU=AccreditedCA,O=KICA,C=KR|"
	+"CN=signGATE CA5,OU=AccreditedCA,O=KICA,C=KR|"
	+"CN=SignKorea CA2,OU=AccreditedCA,O=SignKorea,C=KR|"
	+"CN=SignKorea CA3,OU=AccreditedCA,O=SignKorea,C=KR|"
	+"CN=TradeSignCA2,OU=AccreditedCA,O=TradeSign,C=KR|"
	+"CN=TradeSignCA3,OU=AccreditedCA,O=TradeSign,C=KR|"
	+"CN=yessignCA Class 1,OU=AccreditedCA,O=yessign,C=kr|"
	+"CN=yessignCA Class 2,OU=AccreditedCA,O=yessign,C=kr|"
	+"CN=INIPASS CA,OU=AccreditedCA,O=INIPASS,C=KR|"
	;

// GPKI 인증서 발급자 DN 설정
KSBizConfig.issuerCertFilter_g = ""
	+"CN=CA131100001,OU=GPKI,O=Government of Korea,C=KR|"	//GPKI 인증서 (행정용)
	+"CN=CA131100002,OU=GPKI,O=Government of Korea,C=KR|"	//GPKI 인증서 (공공 금융용)
	;

// EPKI 인증서 발급자 DN 설정
KSBizConfig.issuerCertFilter_e =
	"CN=CA134100031,OU=GPKI,O=Government of Korea,C=KR|"	//EPKI 인증서
	;

KSBizConfig.issuerCertFilter_test =
	"CN=SignKorea Test CA,OU=LicensedCA,O=SignKorea,C=KR|"
	+"CN=3280TestCAServer,OU=AccreditedCA,O=CrossCert,C=KR|"
	+"CN=signGATE FTCA04,OU=AccreditedCA,O=KICA,C=KR|"
	+"CN=TestTradeSignCA,OU=AccreditedCA,O=TradeSign,C=KR|"
	+"CN=yessignCA-Test Class 0,OU=AccreditedCA,O=yessign,C=kr|"
	+"CN=yessignCA-Test Class 1,OU=AccreditedCA,O=yessign,C=kr|"
	+"CN=yessignCA-Test Class 2,OU=AccreditedCA,O=yessign,C=kr|"
	+"CN=yessignCA-Test Class 3,OU=AccreditedCA,O=yessign,C=kr|"
	+"CN=SignKorea Test CA2,OU=AccreditedCA,O=SignKorea,C=KR|"
	+"CN=yessignCA-TEST,OU=LicensedCA,O=yessign,C=kr|"
	+"CN=signGATE FTCA02,OU=AccreditedCA,O=KICA,C=KR|"
	+"CN=yessignCA-TEST,OU=AccreditedCA,O=yessign,C=kr|"
	+"CN=SignKorea Test CA,OU=AccreditedCA,O=SignKorea,C=KR|"
	+"CN=TradeSignCA2009Test2,OU=AccreditedCA,O=TradeSign,C=KR|"
	+"CN=CrossCertTestCA2,OU=AccreditedCA,O=CrossCert,C=KR|"
	+"CN=yessignCA-Test Class 0,OU=AccreditedCA,O=yessign,C=kr|"
	//+"CN=NCATESTSign,OU=licensedCA,O=NCASign,C=KR|"
	+"CN=CrossCertTestCA,OU=AccreditedCA,O=CrossCert,C=KR|"
	+"CN=INIPASS TEST CA 2,OU=AccreditedCA,O=INIPASS,C=KR|"
	+"CN=yessignCA-Test Class 4,OU=AccreditedCA,O=yessign,C=kr|"
	;

// 테스트 NPKI
//KSBizConfig.issuerCertFilter = KSBizConfig.issuerCertFilter_test;
//모든 인증기관
KSBizConfig.issuerCertFilter = "";


// 개인용 인증서 정책 OID
KSBizConfig.policyOidCertFilter_p =
	"1.2.410.200004.5.1.1.5|"		//증권전산, 개인, 상호연동
	+"1.2.410.200004.5.1.1.9|"		//증권전산, 개인, 용도제한(개인)*
	+"1.2.410.200004.5.1.1.9.2|" 	//증권전산,   개인, 용도제한(카드)
	+"1.2.410.200004.5.2.1.2|"		//정보인증, 개인, 상호연동
	+"1.2.410.200004.5.2.1.7.1|"	//정보인증, 개인, 용도제한(은행)
	//+"1.2.410.200004.5.2.1.7.3|" 	//정보인증, 개인, 용도제한(카드)
	//+"1.2.410.200004.2.201|"    	//정보인증, 개인, 1등급(개발)
	//+"1.2.410.200004.5.3.1.9|"	//전산원,   개인, 상호연동
	//+"1.2.410.200004.5.3.1.4|"	//전산원,   개인 , 용도제한(개인)
	+"1.2.410.200004.5.4.1.1|"		//전자인증, 개인, 상호연동
	+"1.2.410.200004.5.4.1.101|"	//전자인증, 개인, 용도제한(은행)
	//+"1.2.410.200004.5.4.1.103|" 	//전자인증, 개인, 용도제한(카드)
	+"1.2.410.200005.1.1.1|"		//금결원,  개인, 상호연동
	+"1.2.410.200005.1.1.4|"		//금결원,  개인, 용도제한(은행,보험,카드)
	+"1.2.410.200012.1.1.1|"		//무역정보, 개인, 상호연동
	+"1.2.410.200012.1.1.101|"		//무역정보, 개인, 용도제한(은행)
	+"1.2.410.200004.5.5.1.1|"		//이니텍, 개인, 상호연동
	+"1.2.410.200004.5.5.1.3.1|"	//이니텍, 개인, 용도제한(제휴기관)
	;

// 법인용 인증서 정책 OID
KSBizConfig.policyOidCertFilter_c =
	"1.2.410.200004.5.1.1.7|"	//증권전산, 법인, 상호연동
	+"1.2.410.200004.5.2.1.1|"	//정보인증, 법인, 상호연동
	//+"1.2.410.200004.2.202|"    //정보인증, 법인, 1등급(개발)
	+"1.2.410.200004.5.3.1.2|"	//전산원,   법인, 상호연동
	+"1.2.410.200004.5.4.1.2|"	//전자인증, 법인, 상호연동
	+"1.2.410.200005.1.1.5|"	//금결원,  법인, 상호연동
	+"1.2.410.200005.1.1.2|"	//금결원,  법인, 용도제한(은행,보험,카드)
	+"1.2.410.200005.1.1.6.1|"	//금결원,  법인, 용도제한(기업뱅킹)
	+"1.2.410.200012.1.1.3|"	//무역정보, 법인, 상호연동
	+"1.2.410.200004.5.5.1.2|"		//이니텍, 법인, 상호연동
	+"1.2.410.200004.5.5.1.4.1|"	//이니텍, 법인, 용도제한(제휴기관)
	+"1.2.410.200004.5.5.1.4.2|"	//이니텍, 법인, 용도제한(세금계산서)
	;

// 전자세금용 법인용 인증서 정책 OID
KSBizConfig.policyOidCertFilter_Tax =
	"1.2.410.200004.5.2.1.5001|"	//정보인증, 법인, 전자세금용
	+"1.2.410.200005.1.1.6.8|"	 	//금결원,  법인, 이세로, 용도제한(세금계산서)
	+"1.2.410.200004.5.1.1.11|"	 	//증권전산,  개인, 이세로, 용도제한(세금계산서)
	+"1.2.410.200004.5.1.1.12|"	 	//증권전산,  법인, 이세로, 용도제한(세금계산서)
	+"1.2.410.200004.5.5.1.4.2|"	//이니텍, 법인, 용도제한(전자세금용)
	;

// GPKI, 대검찰청, 대법원 인증서 정책 OID
KSBizConfig.policyOidCertFilter_g = ""
	+"1.2.410.100001.2.2.1|"	//공무원 전자서명
	+"1.2.410.100001.2.2.2|"	//공공/민간 개인용 전자서명
	;

// EPKI 인증서 정책 OID
KSBizConfig.policyOidCertFilter_e =
	"1.2.410.100001.5.3.1.3|"		//개인용
	;

// NPKI 개인
//KSBizConfig.policyOidCertFilter = KSBizConfig.policyOidCertFilter_p;
//NPKI 개인 + 법인 + GPKI
//KSBizConfig.policyOidCertFilter = KSBizConfig.policyOidCertFilter_p + KSBizConfig.policyOidCertFilter_c + KSBizConfig.policyOidCertFilter_g;
//모든 인증서 정책
KSBizConfig.policyOidCertFilter = "";

KSBizConfig.complete = {
	// login, sign, autoLogin, autoSign에 사용할 디폴트 complete
	sign:function(result, context){
		if(result.status==1){
			document.ksbizForm.ksbizSig.value = result.data;
			if(document.ksbizForm.ksbizSigner!=null && result.signer!=null)
				document.ksbizForm.ksbizSigner.value = result.signer;
			if(document.ksbizForm.ksbizData!=null && result.rawData!=null)
				document.ksbizForm.ksbizData.value = result.rawData;
			if(document.ksbizForm.ksbizSignAlgorithm!=null && result.signAlgorithm!=null)
				document.ksbizForm.ksbizSignAlgorithm.value = result.signAlgorithm;
			document.ksbizForm.submit();
		} else if(result.status==0){
			alert("인증서 선택을 취소하였습니다.");
		} else if(result.status == -10301){
			//저장매체 설치를 위해 전자서명창이 닫히는 경우
		} else if(result.status!=0){
			alert("sign error:" + result.message + "[" + result.status + "]");
		}
	},
	// channelEncrypt에 사용할 디폴트 complete
	encrypt:function(result, context){
		if(result.status==1){
			document.ksbizForm.ksbizEnc.value = result.data;
			document.ksbizForm.submit();
		}
		else if(result.status!=0){
			alert("encrypt error:" + result.message + "[" + result.status + "]");
		}
	},
	//login, sign, autoLogin, autoSign에서 KSBizConfig.signAndEncrypt가 true일때  사용할 디폴트 complete
	signAndEncrypt : function(result, context){
		if(result.status==1){
			var data = "ksbizSig=" + encodeURIComponent(result.data);
			KeySharpBiz.channelEncrypt(data);
		}
		else if(result.status!=0){
			alert("sign error:" + result.message + "[" + result.status + "]");
		}
	},
	// login, sign, autoLogin, autoSign의 본인확인시 사용할 디폴트 complete
	signWithVidRandomAndEncrypt : function(result, context){
		if(result.status==1){
			if(result.vidRandom!=null && result.vidRandom!=""){

				var data = "ksbizSig=" + encodeURIComponent(result.data);
				data += "&ksbizVidRandom=" + encodeURIComponent(result.vidRandom);

				KeySharpBiz.channelEncrypt(data);
			}else{
				alert("vidRandom none");
			}
		}
		else if(result.status!=0){
			alert("sign error:" + result.message + "[" + result.status + "]");
		}
	}
};


// KSBizConfig.SystemMode "test", "real", "all"
KSBizConfig.SystemMode = "all";
if (typeof _SITE_SystemMode != "undefined") KSBizConfig.SystemMode = _SITE_SystemMode;

// KSBizConfig.lang
if (typeof _SITE_SystemLang != "undefined") KSBizConfig.lang = _SITE_SystemLang;
// KSBizConfig.langUrl
//KSBizConfig.langUrl = KSBizConfig.langUrl.b64;


// Object.keys polyfill
if (!Object.keys) {
	Object.keys = (function() {
		'use strict';
		var hasOwnProperty = Object.prototype.hasOwnProperty,
			hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
			dontEnums = ['toString','toLocaleString','valueOf','hasOwnProperty','isPrototypeOf','propertyIsEnumerable','constructor'],
			dontEnumsLength = dontEnums.length;
		return function(obj) {
			if (typeof obj !== 'function' && (typeof obj !== 'object' || obj === null)) {
				throw new TypeError('Object.keys called on non-object');
			}
			var result = [], prop, i;
			for (prop in obj) {
				if (hasOwnProperty.call(obj, prop)) {
					result.push(prop);
				}
			}
			if (hasDontEnumBug) {
				for (i = 0; i < dontEnumsLength; i++) {
					if (hasOwnProperty.call(obj, dontEnums[i])) {
						result.push(dontEnums[i]);
					}
				}
			}
			return result;
		};
	}());
}
// String.prototype.startsWith polyfill
if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position){
      position = position || 0;
      return this.substr(position, searchString.length) === searchString;
  };
}
// String.prototype.endsWith polyfill
if (!String.prototype.endsWith) {
	String.prototype.endsWith = function(searchString, position) {
		var subjectString = this.toString();
		if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
		  position = subjectString.length;
		}
		position -= searchString.length;
		var lastIndex = subjectString.indexOf(searchString, position);
		return lastIndex !== -1 && lastIndex === position;
	};
}

//////////////////////////////////
//KSBiz Config init...
//////////////////////////////////

if (KSBizConfig.SystemMode == "test") {
	KSBizConfig.issuerCertFilter = KSBizConfig.issuerCertFilter_test;
	KSBizConfig.ca = KSBizConfig.ca_test;
	KSBizConfig.mobisignConfig.aclist = KSBizConfig.mobisignConfig.aclist_test;
	KSBizConfig.yessignOpenCertInfo.mode = "test";
	KSBizConfig.yessignOpenCertInfo.opencertUrl = KSBizConfig.yessignOpenCertInfo.opencertUrl_test;
	KSBizConfig.yessignOpenCertInfo.relayUrl = KSBizConfig.yessignOpenCertInfo.relayUrl_test;
} else if (KSBizConfig.SystemMode == "real") {
	KSBizConfig.issuerCertFilter = KSBizConfig.issuerCertFilter;
	KSBizConfig.ca = KSBizConfig.ca;
	KSBizConfig.mobisignConfig.aclist = KSBizConfig.mobisignConfig.aclist;
	KSBizConfig.yessignOpenCertInfo.mode = "real";
	KSBizConfig.yessignOpenCertInfo.opencertUrl = KSBizConfig.yessignOpenCertInfo.opencertUrl_real;
	KSBizConfig.yessignOpenCertInfo.relayUrl = KSBizConfig.yessignOpenCertInfo.relayUrl_real;
} else if (KSBizConfig.SystemMode == "all") {
	KSBizConfig.issuerCertFilter = "";
	KSBizConfig.policyOidCertFilter = "";
	KSBizConfig.ca = KSBizConfig.ca_test;
	KSBizConfig.mobisignConfig.aclist = KSBizConfig.mobisignConfig.aclist;
	KSBizConfig.yessignOpenCertInfo.mode = "test";
	KSBizConfig.yessignOpenCertInfo.opencertUrl = KSBizConfig.yessignOpenCertInfo.opencertUrl_test;
	KSBizConfig.yessignOpenCertInfo.relayUrl = KSBizConfig.yessignOpenCertInfo.relayUrl_test;
}

// isMobile 체크시에 uagent 값을 참조하여 동작하도록 오버라이딩
if(KSBizConfig.mobileTest){
	if(typeof TOUCHENEX_UTIL.isMobile == "function"){
		TOUCHENEX_UTIL.isMobile = function() {
			var OSInfo = TOUCHENEX_UTIL.getOSInfo().platform;
			var ua = navigator.userAgent;
			if(OSInfo == "iOS" || OSInfo == "Android" || OSInfo == "Windows Phone"){
				return true;
			} else if(ua.indexOf("iPad") > 0 ||ua.indexOf("iPhone") > 0 || ua.indexOf("Android") > 0){
				return true;
			} else{
				return false;
			}
		}
	}
}

// cxsign 구동되는 경우 부모 config로 설정
try{
	if(parent && parent.KSBizConfig && location.href.indexOf(cxsignHome) > -1){
		if(location.href.indexOf("wpki.html") > -1){
			KSBizConfig = parent.KSBizConfig;
		} else {
			if(jQuery) {
				KSBizConfig = $.extend(true, {}, parent.KSBizConfig);
			} else {
				KSBizConfig = parent.KSBizConfig;
			}
			KSBizConfig.isloaded = false;
			TouchEnNxConfig.onload = false;
			if(!TOUCHENEX_UTIL.isMobile()){
				// colorTheme 적용
				if(typeof KSBizConfig.colorTheme != "undefined"){
					var colorCss;
					if(KSBizConfig.colorTheme == "blue"){
						colorCss = './css/default_blue.css';
					} else if(KSBizConfig.colorTheme == "yellow"){
						colorCss = "./css/default_yellow.css";
					} else if(KSBizConfig.colorTheme == "red"){
						colorCss = "./css/default_red.css";
					} else if(KSBizConfig.colorTheme == "brown"){
						colorCss = './css/default_brown.css';
					} else if(KSBizConfig.colorTheme == "sky"){
						colorCss = './css/default_sky.css';
					} else if(KSBizConfig.colorTheme == "green"){
						colorCss = './css/default_green.css';
					} else {
						colorCss = './css/default.css';
					}
					var head = document.getElementsByTagName('head')[0];
					var colorCssSetting = document.createElement("link");
					colorCssSetting.rel = "stylesheet";
					colorCssSetting.type = "text/css";
					colorCssSetting.href = colorCss;
					head.appendChild(colorCssSetting);
				}
			}
		}
	}
} catch(e){}

// 지원 불가 브라우저인 경우 강제 native 강제 설정
function nativeBrowserCheck(){
	if(KSBizConfig.uitype == "html"){
		if((TOUCHENEX_UTIL.isWin() && TOUCHENEX_UTIL.isSafari() && !TOUCHENEX_UTIL.isMobile())
		|| ( TOUCHENEX_UTIL.isIE() && TOUCHENEX_UTIL.getBrowserVer() < 10 )){
			KSBizConfig.uitype = "native";
		}
	} else {
		// if(!TOUCHENEX_UTIL.isWin()){
		// 	KSBizConfig.uitype = "html";
		// }
		if(TOUCHENEX_UTIL.isMobile()){
			KSBizConfig.uitype = "html";
		}
		if(TOUCHENEX_UTIL.isMac()){
			var macVersion = TOUCHENEX_UTIL.getOSInfo().version.split('.');
			if(macVersion[1] < 10){
				KSBizConfig.uitype = "html";
			}
		}
	}
}
nativeBrowserCheck();

// KSBizConfig.browserIssue 제약 체크
// false인 경우 인증서 native 발급
function browserIssueCheck(){
	if(KSBizConfig.browserIssue){
		if(KSBizConfig.uitype == "native"){
			KSBizConfig.browserIssue = false;
		}
		// TODO mac safari 체크 필요
		if((TOUCHENEX_UTIL.isWin() && TOUCHENEX_UTIL.isSafari()) ||
			(TOUCHENEX_UTIL.isIE() && TOUCHENEX_UTIL.getBrowserVer() < 11 )){
			KSBizConfig.browserIssue = false;
		}
	} else {
		if(TOUCHENEX_UTIL.isMobile()) KSBizConfig.browserIssue = true;
	}
}
browserIssueCheck();

//ios의 크롬, 파이어폭스를 제외한 나머지 브라우저의 wpki는 자신것을 보도록 설정
function wpkiCheck(){
	if(KSBizConfig.yessignOpenCertUse){
		KSBizConfig.html5saveCertDomain = location.protocol + "//" + location.host;
	} else {
		if(typeof TOUCHENEX_UTIL.getOSInfo != "undefined"){
			var OSInfo = TOUCHENEX_UTIL.getOSInfo().platform;
			if(TOUCHENEX_UTIL.isMobile() && OSInfo == "iOS"){
				if(!(navigator.userAgent.indexOf('CriOS') > -1 || navigator.userAgent.indexOf('FxiOS') > -1)){
					KSBizConfig.html5saveCertDomain = location.protocol + "//" + location.host;
				}
			}
		}
	}
}
wpkiCheck();

function colorThemeCheck(){
	if(typeof KSBizConfig.colorTheme == "undefined"){
		KSBizConfig.colorTheme = "orange";
	} 
}
colorThemeCheck();