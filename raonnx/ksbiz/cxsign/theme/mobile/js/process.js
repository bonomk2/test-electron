$(document).ready(function(){
	// html language set
	uiCtrl.setLang(function(){
		// loaded frame
		parent.XWC.onLoadedFrame();
	});
});
//임시로 넣어놈
KSBizConfig.secureKeyboardConfig = {
	enable : false,
	product : "touchennxkey"
	// product : "nosk"
};
KSBizConfig.forceScreenKeyboard = false;


var CXCONST = {
	"STORAGE" : {
		"BROWSER" : "browser",
		"LOCAL_DISK" : "disk",
		"REMOVABLE_DISK" : "usb",
		"USIM" : "smart",
		"HSM" : "hsm",
		"PHONE" : "phone"
	},
	"FILE" : {
		"MAX_BUFFER_LENGTH" : 1024*10
	},
	"LANG" : {},
	"CERTSYNC" : {
		//UP:송신부가 인증서를 서버에 업로드한 상태
		//DOWN:수신부가 인증서를 다운받은 상태
		//DONE:수신부가 인증서를 단말기에 저장한 상태
		//CANCEL:수신부가 인증서를 저장 취소한 상태
		"STATUS" : {
			"UP" : "UP",
			"DOWN" : "DOWN",
			"DONE" : "DONE",
			"CANCEL" : "CANCEL"
		},
		//UPSYNC_CERT : 송신부에서 인증서 내보내기 
		//DOWNSYNC_CERT :  수신부에서 인증서 가져오기
		//DONE :  수신부에서 인증서 가져오기를 완료한 경우
		//DISPOSE : 수신부에서 인증서 가져오기를 종료하는 경우
		//CANCEL : 수신부가 인증서를 저장 취소
		//GET_STATUS : 상태값 가져오기
		"REQUEST" : {
			"UPSYNC" : "UPSYNC_CERT",
			"DOWNSYNC" : "DOWNSYNC_CERT",
			"DONE" : "DONE",
			"DISPOSE" : "DISPOSE",
			"CANCEL" : "CANCEL",
			"GET_STATUS" : "GET_STATUS"
		},
		"RESPONSE" : {
			"OK" : "OK"
		}
	},
	"CLOUD" : {
		//CONNECT : 클라우드에 연결한 시점
		//DISCONNECT : 클라우드 연결이 끊긴 시점
		//INIT : 클라우드 init 함수 콜백이 호출되는 시점
		//SETPKCS12 : 클라우드 setPKCS12 콜백이 호출되는 시점
		//REMOVEPKCS12 : 클라우드 removePKCS12 콜백이 호출되는 시점
		//REMOVECERTFORMTRAY : 트레이 관리 창에서 인증서를 삭제한 시점
		"CONNECT" : "connect",
		"DISCONNECT" : "disconnect",
		"INIT" : "init",
		"SETPKCS12" : "setPKCS12",
		"REMOVEPKCS12" : "removePKCS12",
		"REMOVECERTFORMTRAY" : "removeCertFromTray"
	}
};

var cxsign = {
	"isloaded": false,
	"browserDisabled": false,
	"env": {},
	"policyID": "",
	"plainText": "",
	"sourceEncoding": "",
	"viewSignData": false,
	"viewSignImage": false,
	"viewArr": [],
	"signOptions": {},
	"parentCallback": new Function(),
	"currentStorage": "browser",
	"currentDrive": "",
	"currentCert": {
		"storage": "",
		"drive": "",
		"cid": "",
		"subjectDN": "",
		"expireStatus": ""
	},
	"selectDrive": {
		"storage": "",
		"drive": ""
	},
	"copyStorageList": [
		{"config": "BROWSER", "disk": CXCONST.STORAGE.BROWSER},
		{"config": "LOCAL_DISK", "disk": CXCONST.STORAGE.LOCAL_DISK},
		{"config": "REMOVABLE_DISK", "disk": CXCONST.STORAGE.REMOVABLE_DISK},
		{"config": "USIM", "disk": CXCONST.STORAGE.USIM},
		{"config": "HSM", "disk": CXCONST.STORAGE.HSM}
	],
	"cmpStorageList": [
		{"config": "LOCAL_DISK", "disk": CXCONST.STORAGE.LOCAL_DISK},
		{"config": "REMOVABLE_DISK", "disk": CXCONST.STORAGE.REMOVABLE_DISK},
		{"config": "USIM", "disk": CXCONST.STORAGE.USIM},
		{"config": "HSM", "disk": CXCONST.STORAGE.HSM},
		{"config": "PHONE", "disk": CXCONST.STORAGE.PHONE}
	],
	"storageDisable" : {
		"delete" : "BROWSER",
		"pwChange" : "BROWSER",
		"issue" : "BROWSER",
		"issueMulti" : "BROWSER",
		"manage" : "BROWSER",
		"manageMulti" : "BROWSER"
	},
	"certList": [],
	"browserCertInfo" : {
		"cert" : "",
		"value" :"",
		"pwdCount" : 0 
	},
	"issueCopyInfo" : {},
	"area" : []
}

if(!TOUCHENEX_UTIL.isWin()){
	cxsign.storageDisable.issue = cxsign.storageDisable.issueMulti;
	cxsign.storageDisable.manage = cxsign.storageDisable.manageMulti;
	KSBizConfig.prepareCertStore=KSBizConfig.prepareCertStore_MultiOS;
}

var init = {
	initConfig : function(request, callback){
		if(request && callback){
			cxsign.policyID = request.policyID;
			cxsign.plainText = request.plainText;
			cxsign.sourceEncoding = request.sourceEncoding;
			cxsign.signOptions = request.options;
			cxsign.parentCallback = callback;
		}
		cxInvokeCommon.pwdErrCount = 0;

		// KSBizConfig.certStoreFilter browser storage remove
		// default drive setting
		if(cxCtrl.chkBrowserStorage()){
			alert(uiCtrl.getLang("not_support_browser"));
			uiCtrl.winClose();
		} else {
			if(cxCtrl.isIssueCertPage() || cxCtrl.isUpdateCertPage()){
				if(cxsign.plainText.ca == "yessign"){
					cxsign.currentStorage = CXCONST.STORAGE.BROWSER;
				} else{
					alert(uiCtrl.getLang("not_support_browser"));
					uiCtrl.winClose();
				}
			}
		}

		if(cxCtrl.isSignPage()|| cxCtrl.isUpdateCertPage()){
			var options = cxCtrl.getOptions();
			// pdf 서명은 rsaEncryption만 지원
			if(options.dataType == "sha256-md"){
				cxsign.signOptions.signAlgorithm = "rsaEncryption";
			}
			
			// autosign
			if(options.autosign && (options.autosign == 1 || options.autosign == 2 || options.autosign == 4)){
				if(sessionStorage.getItem("autosign")){
					var plain = cxCtrl.getPlainText();
					var options = cxCtrl.getOptions();
					var signCallback = function(data){
						uiCtrl.callbackClose(data);
					};
					clientCtrl.signStorage(null, null, null, null, null, plain, options, signCallback);
					return;
				}
			}

			// 데이타표시 전자서명 설정
			if(options.attributeAsData && options.signedAttribute
				&& options.signedAttribute.toLowerCase().indexOf("format") > -1){
				try{
					if(options.dataType){
						var formatArr = [];
						var dataArr = [];
						// string format
						if(options.dataType == "strings" && options.delimiter){
							formatArr = options.format.split(options.delimiter);
							if(options.multiSign && options.multiSignDelimiter){
								dataArr = cxCtrl.getPlainText().split(options.multiSignDelimiter);
							} else {
								dataArr.push(cxCtrl.getPlainText());
							}
							for(var i = 0; i < dataArr.length; i++){
								var data = dataArr[i];
								var dataSplitArr = data.split(options.delimiter);
								for(var j = 0; j < formatArr.length; j++){
									var name = formatArr[j];
									var value = dataSplitArr[j];
									var result = {"no":i + 1, "name":name, "value":value};
									cxsign.viewArr.push(result);
								}
							}
						} else if(options.dataType == "form-urlencoded"){
							// formdata format name1=value1&name2=value2
							if(options.multiSign && options.multiSignDelimiter){
								formatArr = options.format.split(options.multiSignDelimiter);
								dataArr = cxCtrl.getPlainText().split(options.multiSignDelimiter);
							} else {
								formatArr.push(options.format);
								dataArr.push(cxCtrl.getPlainText());
							}
							for(var i = 0; i < formatArr.length; i++){
								var data = dataArr[i];
								var format = formatArr[i];
								var formatSplitArr = format.split("&");
								var dataSplitArr = data.split("&");
								// format 순서와 형식을 기준으로 data가 붙는다.
								var dataDiv = {};
								for(var j = 0; j < dataSplitArr.length; j++){
									var d = dataSplitArr[j].split("=");
									var d0 = d[0]?d[0]:"";
									var d1 = d[1]?d[1]:"";
									dataDiv[d0] = decodeURIComponent(d1);
								}
								for(var j = 0; j < formatSplitArr.length; j++){
									var f = formatSplitArr[j].split("=");
									var f0 = f[0]?f[0]:"";
									var f1 = f[1]?f[1]:"";
									var result = {"no":i + 1, "name":decodeURIComponent(f1), "value":dataDiv[f0]};
									cxsign.viewArr.push(result);
								}
							}
						}
						kslog("init.initConfig.signdataView", cxsign.viewArr);
						cxsign.viewSignData = true;
					}
				} catch(e){
					ui.alert(uiCtrl.getLang("list_cert_error"));
				}
				// 전자서명 타이틀 이미지 설정
				if(options.confirmSignTitleImage){
					ui.setSignTitleImage(options.confirmSignTitleImage);
				}
			} else {
				// 로고이미지 설정
				//ui.setLogoImage();
			}
			if(CXCONST.STORAGE.BROWSER == cxsign.currentStorage){
				ui.loading.start();
				loadEngine( null, function() {
					ui.loading.end();
					ui.initSign();
					parent.XWC.showIFrame();
					init.window();
				}, function(){
					alert(uiCtrl.getLang("not_support_browser"));
					uiCtrl.winClose();
				});
			} else {
				/*
				ui.initSign();
				parent.XWC.showIFrame();
				init.window();
				*/
				uiCtrl.winClose();
			}
		} else if(cxCtrl.isManageCertPage()){
			// 인증서 관리시에는 만료된 인증서를 보여준다.
			KSBizConfig.disableExpireFilter = true;
			// 인증서 관리시에는 만료/만료예정 툴팁을 띄우지 않는다.
			KSBizConfig.disableExpireWarn = true;
			if(CXCONST.STORAGE.BROWSER == cxsign.currentStorage){
				ui.loading.start();
				loadEngine( null, function() {
					ui.loading.end();
					ui.initManage();
					parent.XWC.showIFrame();
					init.window();
				}, function(){
					alert(uiCtrl.getLang("not_support_browser"));
					uiCtrl.winClose();
				});
			} else {
				/*
				ui.initManage();
				parent.XWC.showIFrame();
				int.window();
				*/
				uiCtrl.winClose();
			}
		} else if(cxCtrl.isExportCertPage()){
			if(CXCONST.STORAGE.BROWSER == cxsign.currentStorage){
				ui.loading.start();
				loadEngine( null, function() {
					ui.loading.end();
					ui.initExport();
					parent.XWC.showIFrame();
					init.window();
				}, function(){
					alert(uiCtrl.getLang("not_support_browser"));
					uiCtrl.winClose();
				});
			} else {
				uiCtrl.winClose();
				return false;
			}
		} else if(cxCtrl.isImportCertPage()){
			if(CXCONST.STORAGE.BROWSER == cxsign.currentStorage){
				ui.loading.start();
				loadEngine( null, function() {
					ui.loading.end();
					ui.initImport();
					parent.XWC.showIFrame();
					init.window();
				}, function(){
					alert(uiCtrl.getLang("not_support_browser"));
					uiCtrl.winClose();
				});
			} else {
				uiCtrl.winClose();
				return false;
			}
		} else if(cxCtrl.isIssueCertPage()){
			if(CXCONST.STORAGE.BROWSER == cxsign.currentStorage){
				ui.loading.start();
				loadEngine( null, function() {
					ui.loading.end();
					ui.initIssue();
					parent.XWC.showIFrame();
					init.window();
				}, function(){
					alert(uiCtrl.getLang("not_support_browser"));
					uiCtrl.winClose();
				});
			} else {
				uiCtrl.winClose();
				return false;
			}
		}
	},
	window : function(){
		// 데이터표시 전자서명 내용 표시
		if(cxsign.viewSignData) ui.viewAccountInfo(cxsign.viewArr);
		// 전자서명 이미지 표시
		//if(cxsign.viewSignImage) $(".bank_info").show();
		// 저장소 버튼 활성화
		//ui.storageVitalize();
		// 전자서명, 인증서관리 페이지인 경우 UI 설정
		// if(cxCtrl.isSignPage() || cxCtrl.isManageCertPage() || cxCtrl.isExportCertPage() || cxCtrl.isImportCertPage() || cxCtrl.isUpdateCertPage()){
		// 	// 인증서 관리 기능 버튼 click event
		// 	ui.certActionAddEvent();
		// }
		// 키보드보안, 가상키보드 설정
		secureKeyCtrl.initEncPwd();
		// isloaded = true
		cxsign.isloaded = true;
	}
};

var cxCtrl = {
	returnResult : function(data, error){
		cxsign.parentCallback(data, error);
	},
	getBrowserDisabled : function(){
		return cxsign.browserDisabled;
	},
	getPlainText : function(){
		return cxsign.plainText;
	},
	getOptions : function(){
		return cxsign.signOptions;
	},
	setSignOption : function(name, value){
		cxsign.signOptions[name] = value;
	},
	getPageType : function(){
		if(cxsign.policyID == "DigitalSign"){
			return "sign";
		} else if(cxsign.policyID == "ManageCert"){
			return "managecert";
		} else if(cxsign.policyID == "IssueCert"){
			return "issuecert";
		} else if(cxsign.policyID == "ExportCert"){
			return "exportCert"
		} else if(cxsign.policyID == "ImportCert"){
			return "importCert"	
		} else if(cxsign.policyID == "UpdateCert"){
			return "updatecert";
		} else {
			return "sign";
		}
	},
	getPolicyID : function(){
		return cxsign.policyID;
	},
	getEnv : function(){
		return cxsign.env;
	},
	chkBrowserStorage : function(){
		// TODO Browser 저장소 불가한 조건이 추가된다면 이곳에서....
		return (window.location.protocol == "http:")
			|| (cxsign.signOptions && cxsign.signOptions.signType && cxsign.signOptions.signType == "PKCS1")
			|| (cxsign.signOptions && cxsign.signOptions.signType && cxsign.signOptions.signType == "signedData")
			|| cxCtrl.getBrowserDisabled()
			|| (TOUCHENEX_UTIL.isIE() && TOUCHENEX_UTIL.getBrowserVer() < 10)
			|| (TOUCHENEX_UTIL.isSafari() && TOUCHENEX_UTIL.getBrowserVer() < 8)
			|| (KSBizConfig.yessignOpenCertUse && (TOUCHENEX_UTIL.isIE() && TOUCHENEX_UTIL.getBrowserVer() < 11));
	},
	isSignPage : function(){
		if(cxCtrl.getPageType() == "sign"){
			return true;
		}
		return false;
	},
	isManageCertPage : function(){
		if(cxCtrl.getPageType() == "managecert"){
			return true;
		}
		return false;
	},
	isExportCertPage : function(){
		if(cxCtrl.getPageType() == "exportCert"){
			return true;
		}
		return false;
	},
	isImportCertPage : function(){
		if(cxCtrl.getPageType() == "importCert"){
			return true;
		}
		return false;
	},
	isIssueCertPage : function(){
		if(cxCtrl.getPageType() == "issuecert"){
			return true;
		}
		return false;
	},
	isUpdateCertPage : function(){
		if(cxCtrl.getPageType() == "updatecert"){
			return true;
		}
		return false;
	},
	getStorageConfig : function(value){
		var len = Object.keys(CXCONST.STORAGE).length;
		for(var name in CXCONST.STORAGE){
			if(CXCONST.STORAGE[name] == value){
				return name;
			}
		}
		return "";
	},
	getStorageConfigName : function(i){
		return cxsign.storageList[i].config;
	},
	getStorageConfigMoreName : function(i){
		return cxsign.storageMoreList[i].config;
	},
	getCopyStorageConfigName : function(i){
		return cxsign.copyStorageList[i].config;
	},
	getCmpStorageConfigName : function(i){
		return cxsign.cmpStorageList[i].config;
	},
	getStorageDiskName : function(i){
		return cxsign.storageList[i].disk;
	},
	getStorageDiskMoreName : function(i){
		return cxsign.storageMoreList[i].disk;
	},
	getCopyStorageDiskName : function(i){
		return cxsign.copyStorageList[i].disk;
	},
	getCmpStorageDiskName : function(i){
		return cxsign.cmpStorageList[i].disk;
	},
	getStorageDisable : function(status){
		var result = cxsign.storageDisable[status];
		if(result) return result;
		return ""
	},
	setStorageDisable : function(status, value){
		cxsign.storageDisable[status] = value;
	},
	getCurrentCert : function(){
		return cxsign.currentCert;
	},
	setCurrentCert : function(storage, drive, cid, expireStatus){
		if(!storage) storage = "";
		if(!drive) drive = "";
		if(!cid) cid = "";
		if(!expireStatus) expireStatus = "";
		if(storage == "" && drive == "" && cid == "" && expireStatus == ""){
			cxsign.currentCert = {};
		} else {
			cxsign.currentCert.storage = storage;
			cxsign.currentCert.drive = drive;
			cxsign.currentCert.cid = cid;
			cxsign.currentCert.expireStatus = expireStatus;
		}
	},
	getSelectDrive : function(){
		return cxsign.selectDrive;
	},
	setSelectDrive : function(storage, drive){
		if(!storage) storage = "";
		if(!drive) drive = "";
		if(storage == "" && drive == ""){
			cxsign.selectDrive = {};
		} else {
			cxsign.selectDrive.storage = storage;
			cxsign.selectDrive.drive = drive;
		}
	},
	getCurrentStorage : function(){
		return cxsign.currentStorage;
	},
	setCurrentStorage : function(storage){
		cxsign.currentStorage = storage;
	},
	getCurrentDrive : function(){
		return cxsign.currentDrive;
	},
	setCurrentDrive : function(drive){
		if(!drive) drive = "";
		cxsign.currentDrive = drive;
	},
	isCurrentCert : function(){
		if(cxsign.currentCert && Object.keys(cxsign.currentCert).length > 0){
			return true;
		} else {
			return false;
		}
	},
	getCertActionBtn : function(type, index){
		return cxsign.certActionBtn[type][index];
	},
	getCertBtnFunc: function(type, index){
		var funcName = cxsign.certActionBtn[type][index];
		return cxsign.certActionBtn.func[funcName];
	},
	setCertList: function(certList){
		cxsign.certList = certList;
	},
	getCertList: function(){
		return cxsign.certList;
	}
};

var cxUtil = {
	removeStorageList : function(reqStor){
		var chkBrowserIdx = KSBizConfig.certStoreFilter.toUpperCase().indexOf(reqStor);
		if(chkBrowserIdx > -1){
			var certStoreFilterArr = KSBizConfig.certStoreFilter.split("|");
			for(var i in certStoreFilterArr){
				if(certStoreFilterArr[i].toUpperCase() == reqStor){
					certStoreFilterArr.splice(i, 1);
				}
			}
			KSBizConfig.certStoreFilter = "";
			for(var i in certStoreFilterArr){
				var storage = certStoreFilterArr[i];
				if(i > 0)
					KSBizConfig.certStoreFilter += "|";
				KSBizConfig.certStoreFilter += storage;
			}
		}
	},
	leadingZeros : function(n, digits) {
		var zero = '';
		 n = n.toString();
		 if (n.length < digits) {
			for (i = 0; i < digits - n.length; i++)
			 zero += '0';
		 }
		return zero + n;
	},
	currentDate : function (){
		var d = new Date();
		var s =
		this.leadingZeros(d.getFullYear(), 4) + '-' +
		this.leadingZeros(d.getMonth() + 1, 2) + '-' +
		this.leadingZeros(d.getDate(), 2) + ' ' +
		this.leadingZeros(d.getHours(), 2) + ':' +
		this.leadingZeros(d.getMinutes(), 2) + ':' +
		this.leadingZeros(d.getSeconds(), 2);
		return s;
	},
	printArr : function(arr){
		var msg = "";
		var arrLen = Object.keys(arr).length;
		var keysArr = Object.keys(arr);
		for(var i=0; i < arrLen; i++){
			if(typeof arr[keysArr[i]] == "object"){
				if(keysArr[i] != 0){
					msg += keysArr[i]+"::";
				}
				msg += cxUtil.printArr(arr[keysArr[i]]);
			} else {
				msg += keysArr[i] + ":"+arr[keysArr[i]];
			}
		}
		return msg;
	},
	dragsFileToBuffer : function(file, callback) {
		var reader = new FileReader();
		var loadedBuffer = new Uint8Array();
		if( file.size > CXCONST.FILE.MAX_BUFFER_LENGTH ) {
			return;
		}
		reader.onloadstart = function(e) {};
		reader.onload = function(event) {
			var newData = new Uint8Array(event.target.result);
			var newArray = new Uint8Array(loadedBuffer.byteLength+newData.byteLength);
			newArray.set(loadedBuffer,0);
			newArray.set(newData, loadedBuffer.byteLength);
			loadedBuffer = newArray;
		};
		reader.onloadend = function(event) {
			callback(loadedBuffer);
		};
		var fileSlice = function( file, start, end ) {
			if( file.webkitSlice ) {
				return file.webkitSlice( start, end );
			} else if( file.mozSlice ) {
				return file.mozSlice( start, end );
			} else if( file.slice ) {
				return file.slice( start, end );
			} else {
				throw new Error("Can't support file slice");
			}
		}
		reader.readAsArrayBuffer( fileSlice(file, 0, file.size) );
	},
	Uint8ToBase64 : function(buffer, callback) {
		var CHUNK_SIZE = 0x8000; //arbitrary number
		var index = 0;
		var length = buffer.length;
		var result = '';
		var slice;
		while (index < length) {
		  slice = buffer.subarray(index, Math.min(index + CHUNK_SIZE, length));
		  result += String.fromCharCode.apply(null, slice);
		  index += CHUNK_SIZE;
		}
		return btoa(result);
	},
	downloadFile : function(b64val, fileName) {
		var base64ToU8 = function(base64) {
			var binary_string =  window.atob(base64);
			var len = binary_string.length;
			var bytes = new Uint8Array( len );
			for (var i = 0; i < len; i++)        {
				bytes[i] = binary_string.charCodeAt(i);
			}
			return bytes;
		}
		var mimeType = 'application/octet-stream';
		var blob = new Blob([ base64ToU8(b64val) ], {type: mimeType});
		if( navigator.msSaveOrOpenBlob ) {
			navigator.msSaveOrOpenBlob( blob, fileName );
		} else {
			var a = document.createElement('a');
			var url = window.URL.createObjectURL(blob);
			a.href = url;
			a.download = fileName;
			document.body.appendChild(a);
			a.style = 'display: none';
			a.click();
			document.body.removeChild( a );
		}
		setTimeout(function() {
			return window.URL.revokeObjectURL(url);
		}, 20000 );
	},
	checkCorrectNormal : function(input, required) {
		if(!required) {
			required = {
				length: 8,
				alphabet: true,
				upper: true,
				lower: true,
				number: true,
				spchar: true,
				badchar: true
			}
		}
		if (required.alphabet) {
			required.upper = false;
			required.lower = false;
		}
		var chkAlphabet = /[a-zA-Z]/g;
		var chkUpper = /[A-Z]/g;
		var chkLower = /[a-z]/g;
		var chkNum = /[0-9]/g;
		//var chkCo = /[`\-=\\\[\];',./~!@#$%^&*()_+|{}:"<>? ]/g;
		var chkCo = /[`\-=\[\];,./~!@#$%^&*()_+{}:<>? ]/g;
		var chkBadCo = /['"\\|]/g;
		if(input.length < required.length) return "length";

		var result = [];
		if(required.alphabet && !chkAlphabet.test(input)) result.push("alphabet");
		if(required.upper && !chkUpper.test(input)) result.push("upper");
		if(required.lower && !chkLower.test(input)) result.push("lower");
		if(required.number && !chkNum.test(input)) result.push("number");
		if(required.spchar && !chkCo.test(input)) result.push("spchar");
		if(required.badchar && chkBadCo.test(input)) result.push("badchar");
		if(result.length > 0){
			return result;
		}
		return "success";
	},
	checkCorrectUPW : function(type, rEnc, required) {
		var input = "";
		try{
			if(type == "raon"){
				input = transkey_GetDecnxBiz(rEnc);
			} else if(type == "inca"){
				input = nos_GetDeK(rEnc);
			}
		} catch(e){
			ksalert("cxUtil.checkCorrectUPW", "decrypt fail");
			return false;
		}
		var passCodeFuncs = {};
		if (!required) {
			required = {
				length: 8,
				alphabet: true,
				upper: true,
				lower: true,
				number: true,
				spchar: true,
				badchar: true
			}
		}
		if (required.alphabet) {
			passCodeFuncs['alphabet'] = function (code) {
				if ((code >= 'A' && code <= 'Z') || (code >= 'a' && code <= 'z')) {
					return true;
				}
			};
			required.upper = false;
			required.lower = false;
		}
		if (required.upper) {
			passCodeFuncs['upper'] = function (code) {
				if (code >= 'A' && code <= 'Z') {
					return true;
				}
			};
		}
		if (required.lower) {
			passCodeFuncs['lower'] = function (code) {
				if (code >= 'a' && code <= 'z') {
					return true;
				}
			};
		}
		if (required.number) {
			passCodeFuncs['number'] = function (code) {
				if (code >= '0' && code <= '9') {
					return true;
				}
			};
		}
		if (required.spchar) {
			passCodeFuncs['spchar'] = function (code) {
				//var spchar = "~`!@#$%^&*()-_=+\\|[{]};:'\",<.>/? ";
				var spchar = "~`!@#$%^&*()-_=+[{]};:,<.>/? ";
				return spchar.indexOf(code) > -1;
			};
		}
		if (required.badchar) {
			passCodeFuncs['badchar'] = function (code) {
				var badchar = "'\"\\|";
				return badchar.indexOf(code) > -1;
			};
		}
		var badcharChk = false;
		var passCodeCheck = function (code) {
			for (key in passCodeFuncs) {
				if(key != 'badchar'){
					var checkFunc = passCodeFuncs[key];
					if (checkFunc(code)) {
						delete passCodeFuncs[key];
						break;
					}
				} else {
					var checkFunc = passCodeFuncs[key];
					if (checkFunc(code)) {
						badcharChk = true;
						break;
					}
				}
			}
		}
		var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		var chr1, chr2,	chr3 = "";
		var enc1, enc2,	enc3, enc4 = "";
		var i = 0;
		// remove all characters that are not A-Z, a-z, 0-9, +, /, or =
		var base64test = /[^A-Za-z0-9\+\/\=]/g;
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		var length = 0;
		do {
			enc1 = keyStr.indexOf(input.charAt(i++));
			enc2 = keyStr.indexOf(input.charAt(i++));
			enc3 = keyStr.indexOf(input.charAt(i++));
			enc4 = keyStr.indexOf(input.charAt(i++));
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
			passCodeCheck(String.fromCharCode(chr1));
			length++;
			if (enc3 != 64) {
				passCodeCheck(String.fromCharCode(chr2));
				length++;
			}
			if (enc4 != 64) {
				passCodeCheck(String.fromCharCode(chr3));
				length++;
			}
			chr1 = chr2 = chr3 = "";
			enc1 = enc2 = enc3 = enc4 = "";
		} while (i < input.length);
		if (length < required.length) {
			return "length";
		}
		if(!badcharChk) delete passCodeFuncs['badchar'];
		if(Object.keys(passCodeFuncs).length > 0){
			return Object.keys(passCodeFuncs);
		}
		return "success";
	}
};


var uiCtrl = {
	winClose : function(obj){
		if(cxCtrl.isSignPage()){
			cxCtrl.returnResult({signedData:""});
		} else {
			cxCtrl.returnResult(obj);
		}
	},
	callbackClose : function(data, error){
		cxCtrl.returnResult(data, error);
	},
	errorClose : function(error){
		cxCtrl.returnResult({signedData:""}, error);
	},
	errorAlert: function(error, callback){
		var msg = error.message ? error.message : "";
		if(error.status){
			msg = msg + " [" + error.status + "]";
		} else {
			msg = msg;
		}
		ui.alert(msg, callback);
	},
	setLang : function(callback){
		var lang = KSBizConfig.lang;
	    if(lang == "KOR" || lang == "korean"){
			langUrl = KSBizConfig.langUrl.b64.koreanUrl;
			//ui.setHelp("kor");
	    } else if(lang == "ENG" || lang == "english"){
			langUrl = KSBizConfig.langUrl.b64.englishUrl;
			//ui.setHelp("eng");
	    } else if(lang == "CHN" || lang == "chinese"){
			langUrl = KSBizConfig.langUrl.b64.chaneseUrl;
			//ui.setHelp("chn");
	    } else if(lang == "JPN" || lang == "japanese"){
			langUrl = KSBizConfig.langUrl.b64.japaneseUrl;
			//ui.setHelp("jpn");
		} else {
			langUrl = KSBizConfig.langUrl.b64.koreanUrl;
			//ui.setHelp("kor");
		}
	    DC_get(langUrl, "", function(data){
			data = TOUCHENEX_UTIL.Base64.decode(data);
			data = JSON.parse(data);
			CXCONST.LANG = data;
			$(".lang").each(function(i){
				var langId = $(this).html();
				var langStr = CXCONST.LANG[langId];
				if(langStr){
					$(this).html(langStr);
				}
			});
			callback();
		});
	},
	getLang : function(id){
		var langStr = CXCONST.LANG[id];
		if(langStr){
			return langStr.replace(/\n/gi,"<br>");
		} else {
			return id;
		}
	},
	getErrorCode : function(codename){
		var len = Object.keys(CXSIGN_ERROR).length;
		for(var code in CXSIGN_ERROR){
			if(CXSIGN_ERROR[code] && CXSIGN_ERROR[code].codename && CXSIGN_ERROR[code].codename == codename){
				return code;
			}
		}
		return "";
	},
	getErrorMsg : function(code){
		if(CXSIGN_ERROR[code] && CXSIGN_ERROR[code].desc){
			return uiCtrl.getLang(CXSIGN_ERROR[code].desc);
		} else {
			return uiCtrl.getLang("unknown_error");
		}
	},
	getOldErrorCode : function(codename){
		var len = Object.keys(KSBIZ_OLD_ERROR).length;
		for(var code in KSBIZ_OLD_ERROR){
			if(KSBIZ_OLD_ERROR[code] && KSBIZ_OLD_ERROR[code].codename && KSBIZ_OLD_ERROR[code].codename == codename){
				return code;
			}
		}
		return "";
	}
};

var secureKeyCtrl = {
	kbd : "",
	kpad : "",
	// tmp parameters area..
	tkLoadingCheckLoop : null,
	keyEncResult : {},
	encPwdEncryptLoop : null,

	initEncPwd : function(callback){
		ui.loading.start();

		// 가상키보드 설정
		// 모바일은 무조건 키패드 강제설정
		if(KSBizConfig.mobileSecureKeypad){
			secureKeyCtrl.kpad = KSBizConfig.secureKeypadConfig.product;
			KSBizConfig.forceScreenKeyboard = true;
		} else {
			secureKeyCtrl.kpad = "";
			KSBizConfig.forceScreenKeyboard = false;
		}

		// document 내 password 필드 속성 설정
		var formsArr = document.forms;
		for(var i = 0; i < formsArr.length; i++){
			var frm = formsArr[i];
			if(frm.name){
				for(var j=0; j < frm.elements.length; j++){
					var chkElement = frm.elements[j];
					if(chkElement.type == "password"){
						// raonsecure
						if(secureKeyCtrl.kpad == "transkey"){
							//chkElement.setAttribute("data-tk-isCrt","true");
							chkElement.setAttribute("data-tk-kbdType","qwerty");
							//chkElement.setAttribute("data-tk-cssName","crt");
							//chkElement.setAttribute("data-tk-keyboard","qwerty_crt");
							chkElement.setAttribute("data-tk-useinput", "true");
							chkElement.setAttribute("data-tk-bottom", "true");
							/*20200820 박규리 : [웹접근성] onclick -> onfocus*/
							chkElement.setAttribute("onfocus","mtk.onKeyboard(this);");
						}
					}
				}
			}
		}

		// 초기화
		if(secureKeyCtrl.kpad == "transkey"){
			// transkey enter event set
			mTranskey.prototype.done = secureKeyCtrl.enterClick;
			initmTranskey();
		}

		// 보안키보드별 설정
		if(secureKeyCtrl.kpad == "transkey"){
			secureKeyCtrl.setPwdReadonly();
		} else if(secureKeyCtrl.kpad == ""){
			KSBizConfig.secureKeyboardConfig.enable = false;
			secureKeyCtrl.kbd = "";
			ui.loading.end();
		}
	},
	enterClick : function(param){
		if(secureKeyCtrl.kpad == "transkey"){
			var currId = mtk.now.id;
			mtk.now.done();
			mtk.close();
			/* 20200820 박규리 : [웹접근성] 입력완료후 currId에 따라 focus 설정 */
			if(currId && currId == "certpwd"){
				var e = $.Event("keydown");
				console.log("################", e);
				e.ctrlKey = false;
				e.which = 13;
				setTimeout(function(){$('#' + currId).trigger(e);},10);
				setTimeout( function(){$(".password_area .btn_area .btn_blu").focus();}, 100);
			} else if(currId && currId == "pop_change_old"){
				setTimeout( function(){$(".pwd_change_area #popChangeFrm .input_set3 strong").eq(1).focus();}, 100);
			} else if(currId && currId == "pop_change_new"){
				setTimeout( function(){$(".pwd_change_area #popChangeFrm .input_set3 strong").eq(2).focus();}, 100);
			} else if(currId && currId == "pop_change_new_more"){
				setTimeout( function(){$(".pwd_change_area #popChangeFrm .btn_area .btn_blu").focus();}, 100);
			} else if(currId && currId == "issuepwd"){
				setTimeout( function(){$(".issue_area #issueFrm .input_set strong").eq(2).focus();}, 100);
			} else if(currId && currId == "issuepwd_more"){
				setTimeout( function(){$(".issue_area #issueFrm .btn_area .btn_blu").focus();}, 100);
			}
		}
	},
	setPwdReadonly : function(){
		KSBizConfig.secureKeyboardConfig.enable = false;
		secureKeyCtrl.kbd = "";
		ui.loading.end();
	},
	encPwdEcrypt : function(params, callback) {
		//{"form":frm,"encFields":["certpwd"]}
		ui.loading.start();
		var frmName = params.form;
		var encFields = params.encFields;
		if(!(encFields instanceof Array)) encFields = [encFields];
		secureKeyCtrl.keyEncResult = {"form":frmName, "encParams":[]};
		if(!encFields || encFields.length == 0){
			ui.alert(uiCtrl.getLang("secure_keyboard_param_error"));
			callback("");
			return;
		}

		var result = {};
		var encStageArr = [];
		var encStageCnt = 0;
		for(var i = 0; i < encFields.length; i++){
			var encEle = encFields[i];
			secureKeyCtrl.keyEncResult.encParams.push({"name" : encEle, "type": "text", "enc" : ""});
			if(secureKeyCtrl.kpad != ""){
				secureKeyCtrl.keyEncResult.encParams[i].type = secureKeyCtrl.kpad;
				if(secureKeyCtrl.kpad == "transkey"){
					secureKeyCtrl.keyEncResult.encParams[i].enc = transkey_GetEncnxBiz(KSBizConfig.transkeyCert, encEle);
				}
			} else {
				secureKeyCtrl.keyEncResult.encParams[i].enc = document.getElementById(encEle).value;
			}
		}

		if(encStageArr.length == 0){
			//kslog("secureKeyCtrl.encPwdEcrypt secureKeyCtrl.keyEncResult", secureKeyCtrl.keyEncResult);
			result = secureKeyCtrl.keyEncResult;
			secureKeyCtrl.keyEncResult = {};
			ui.loading.end();
			callback(result);
		} else {
			ui.loading.end();
			ui.alert(uiCtrl.getLang("secure_keyboard_support_error"));
			return;
		}
	},
	initKeypadForm : function(frm){
		var imgObj = frm.find("img");
		if(imgObj.length > 0){
			for(var i = 0; i < imgObj.length; i++){
				var imgTag = imgObj[i];
				if(imgTag.id.endsWith("_toggle") && imgTag.src.endsWith("_on.png")){
					imgTag.click();
				}
			}
		}
	}
}
