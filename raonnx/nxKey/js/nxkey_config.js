/**
****************************************************
TouchEnNx_config.js
****************************************************
| Version     작성자        수정일        변경사항 
 ---------  -------  -----------  ----------    
 | v1.0.0.2    허혜림    2018.01.31  
 | v1.0.0.1    허혜림    2017.12.20          

****************************************************
 Copyright ⒞ RaonSecure Co., Ltd. 
****************************************************
**/

var nxKeyConfig ={};
nxKeyConfig.version = {
	
	extension :   {
		exChromeExtVer		:	"1.0.0.0",
		exFirefoxExtVer		:	"1.0.2.5",
		exFirefoxJpmExtVer	:	"1.0.1.12",
		exOperaExtVer		:	"1.0.1.13"
	},
		
	/** 키보드보안 설정 */
		tkappiver			:	"1.0.0.57",
		tkappmver			:	"1.0.0.51",
		exWinVer			:	"1.0.0.65",
		exWin64Ver			:	"1.0.0.65",
		exWinProtocolVer	:	"1.0.1.1091",
		daemonVer			:	"1.0.2.4",
		daemon64DownURL		:	"1.0.2.4",
		exMacVer			:	"1.0.0.7",
		exMacProtocolVer	:	"1.0.1.1106"
};

nxKeyConfig.module = {
	
	extension	:{
		//exChromeExtDownURL	: "https://chrome.google.com/webstore/detail/dncepekefegjiljlfbihljgogephdhph",
		exChromeExtDownURL	: "https://download.raonsecure.com/extension/chrome/chrome.html",
		exFirefoxExtDownURL	: TouchEnNxConfig.path.base + "/extension/touchenex_firefox.xpi",
		exFirefoxJpmExtDownURL	: TouchEnNxConfig.path.base + "/extension/jpm_touchenex_firefox.xpi",
		exOperaExtDownURL	: TouchEnNxConfig.path.base + "/extension/touchenex_opera.nex"
	},
	
		exWinClient		            :	TouchEnNxConfig.path.base + "/nxKey/module/TouchEn_nxKey_32bit.exe",
		exWin64Client            	:	TouchEnNxConfig.path.base + "/nxKey/module/TouchEn_nxKey_64bit.exe",
		daemonDownURL	            :	TouchEnNxConfig.path.base + "/nxKey/module/TouchEn_nxKey_32bit.exe",
		//daemon64DownURL             :   TouchEnNxConfig.path.base + "/nxKey/module/TouchEn_nxKey_32bit.exe",
		exMacClient					:	TouchEnNxConfig.path.base + "/nxKey/module/TouchEn_nxKey_Installer.pkg",
		exMacProtocolDownURL		: 	TouchEnNxConfig.path.base + "/nxKey/module/TouchEn_nxKey_Installer.pkg"
};

/** 키보드보안 E2E 를 사용하지 않을 경우 주석해제*/
var TNK_SR = "";

/**	클라이언트 솔루션별 동작 설정*/
TouchEnNxConfig.solution={
		nxkey : {
				tekOption : {
					"pki": "TouchEnkeyEx",
				    "keyboardonly": "false",
				    "defaultenc": "false",
				    "verify": "0",
				    "defaultpaste": "true",
				    "iframename": "",
				    "usegetenc": "false",
				    "clearbufferonempty": "true",
				    "refreshsession": "true",
				    "improve": "true",
					"bstart": 0,
				    "setcallback": "false",
				    "usebspress": "false",
				    "ignoreprogress": "true",
				    "exformname": "",
				    "idbase": "false",
				    "allcrypt": "false",
					"browserinfo" : "",
				    "cert": "-----BEGIN CERTIFICATE-----MIID0TCCArmgAwIBAgIJAOvT64h8zh31MA0GCSqGSIb3DQEBBQUAMH8xCzAJBgNVBAYTAmtvMQ4wDAYDVQQIDAVzZW91bDEOMAwGA1UEBwwFc2VvdWwxDTALBgNVBAoMBHJhb24xDTALBgNVBAsMBHJhb24xCzAJBgNVBAMMAnJhMSUwIwYJKoZIhvcNAQkBFhZuamthbmdAbHVtZW5zb2Z0LmNvLmtyMB4XDTEzMDEyMjE2MzI1MloXDTEzMDIyMTE2MzI1MlowfzELMAkGA1UEBhMCa28xDjAMBgNVBAgMBXNlb3VsMQ4wDAYDVQQHDAVzZW91bDENMAsGA1UECgwEcmFvbjENMAsGA1UECwwEcmFvbjELMAkGA1UEAwwCcmExJTAjBgkqhkiG9w0BCQEWFm5qa2FuZ0BsdW1lbnNvZnQuY28ua3IwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCd9KKpIVcBkomsLs+yABiY02wRiBHnh3XEGJTD5hfJr1mxXOP4wdQFZtKMelOjY60vBRucmDjHqDLKMk4LAfhDsiIa37RJfdf4ffr2+JNWZPKJbMTJ5b2ssR1vjVzfBeDmNEVK32VOspL8VXM5sQK/NDkrilRDpBNZQFyXzZDMXlyRGeqf1ffxKx0egiKM18P8qjMRmQ9evqTxFzbUfr73KV6En6cfptSOtfq8vTcfwFdRWXJ4Bo184X/JseU6rbQ+B2Co/2aU2Rl2IM3TWIgXs/FXH4muT5vAbDD76a/UxeuiMLm+nisEVnljWXzBv+blIEr2C5EyRrcLZSQuRt/nAgMBAAGjUDBOMB0GA1UdDgQWBBSGctXaTyQ+ZTGVA+IKVMf4oztybzAfBgNVHSMEGDAWgBSGctXaTyQ+ZTGVA+IKVMf4oztybzAMBgNVHRMEBTADAQH/MA0GCSqGSIb3DQEBBQUAA4IBAQBOKEH54SHsKxyhIsTgOcvYqUpvGPbvYDDzJAEwyuU08SL9plOYE7Q/43JkaqKvced63aoDvFywnlWFSnQ3Vkmf3IJHk5RPgIYgh0rIaXe6hvlw1MKyYcSlakHayBk9HHNs/vfNxNQkSe20nFXXD6lNqyIJz9x0vLhIukh35W4Cs/sxoHcmhrzpxty75nEi4cH33uNGBb7DUgLcL3vvxDlFTLHExDUQQzY0bRYhtdiuXkSpd9xxsDAP0GW5Ah4JMThSmmsHLdJ8NcSCE8O0xZCT/j6j4IV7mS1arj46IEpVDgSTMGcqp3DpZ63JCpXjViTpFjEKYXpZf6HyfMvZ4nsj-----END CERTIFICATE-----",
					"srdk": TNK_SR,
					"generate_event": "false",
					"driverexcept": "0",
					"delayedck": "false",
					"shiftbypass": "true",
					"allowdup": "false",
					"enc2": "false",
				    "searchformname":"",
					"runtype": TouchEnNxConfig.runtype,
					"tk_isRunningSecurity" : "false"
				}
		}
};