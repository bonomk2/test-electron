(function( win ) {
	/**
	 * Check duplicated
	 */
	if( !win.XWC ) {
		win.XWC = XWC = {};
	} else {
		win.XWC.log("global", "iCrossWin already loaded");
		return;
	}
	
	
	if( KSBizConfig.yessignOpenCertUse  && !(TOUCHENEX_UTIL.isIE() && TOUCHENEX_UTIL.getBrowserVer() < 11)) {
		var corp = KSBizConfig.yessignOpenCertInfo.corpcode;
		var cDate = new Date();
		var dd = cDate.getDate();
		var mm = cDate.getMonth()+1;
		var today = cDate.getFullYear() + (mm<10?'0'+mm:mm) + (dd<10?'0'+dd:dd);
		var query = "?dt="+today+"&corp="+corp;
		document.write('\x3Cscript type="text/javascript" src="' + KSBizConfig.yessignOpenCertInfo.opencertUrl + query+'">\x3C/script>');
	}

	var log;
	if( kslog ) {
		//log = kslog.bind( null, "[crossXWC.js] " );
		log = function(where, message) {
			kslog("[crossXWC.js] "+where, message);
		}
	} else {
		log = function (where, message) {
			console.log("[crossXWC.js] "+where+" "+ message);
		}
	}
	XWC.log = log;
	
	var IsModernCross = (function(){
		//TODO : firefox 6 below
	    var undef,
	        v = 3,
	        div = document.createElement('div'),
	        all = div.getElementsByTagName('i');
	    while (
	        div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
	        all[0]
	    );
	    //return v > 4 ? v : undef;
	    if( v != undef && v < 10 ) {
	    	return true;
	    }
	    
	    try {
	    	var FFUA = "firefox";
	    	var navUA = navigator.userAgent.toLowerCase();
	    	var ffnameIdx = navUA.toLowerCase().indexOf( FFUA );
	    	
	    	if( ffnameIdx != -1 ) {
	    		var VER = navUA.substring(ffnameIdx+FFUA.length);
	    		var VER_TRIM = "";
	    		
	    		var startDec = 0;
	    		for(var i=0;i<VER.length;i++) {
	    			try {
	    				var ch = VER.charAt(i);
	    				var chi = parseInt(ch);
	    				if( ch >= 0 && ch <= 9 ) {
		    				startDec = i;
		    				break;
		    			}
	    			} catch(e) {}
	    		}
	    		
	    		for(var i=startDec; i<VER.length; i++) {
	    			var ch = VER.charAt(i);
	    			var chi = -1;
	    			try {
	    				chi = parseInt(ch);
	    			} catch(e) {}
	    			if( ch == '.' || ch >= 0 && ch <= 9 ) {
	    				VER_TRIM += ch;
	    			} else {
	    				break;
	    			}
	    		}
	    		if( parseFloat(VER_TRIM) < 7 ) {
	    			return true;
	    		}
	    	}
	    } catch(e) {
	    }
	    
	    return false;
	}());
	
	var CrossMessageSupport = (window.postMessage != null && typeof window.postMessage !== "undefined");
	
	function addListener(elem, event, func, flag) {
		if( elem.attachEvent ) {
			elem.attachEvent('on'+event, func, flag);
		} else {
			elem.addEventListener(event, func, flag);
		}
	}
	
	function removeListener(elem, event, func, flag) {
		if( elem.detachEvent ) {
			elem.detachEvent('on'+event, func, flag);
		} else {
			elem.removeEventListener(event, func, flag);
		}
	}
	
	var IS_XWC_LOADED = false;
	var XWC_BUFFERED_REQUEST = [];
	var funcIdxCount = 1; //case false 를 피하기 위해 1부터 카운팅
	var feedbackFuncTable = {};
	
	function crossInvoke( method, request, successCallback, failedCallback ) {
		var args = [request];
		if( IS_XWC_LOADED ) {
			sendMessage({
				method : method, 
				args : args,
				feedbackID : (successCallback||failedCallback) ? registerFeedback(successCallback, failedCallback ) : null
			});
			return;
		}
		
		var isFirstRequest = ( XWC_BUFFERED_REQUEST.length == 0 );
		XWC_BUFFERED_REQUEST.push( {
			method : method,
			args : args,
			successCallback : successCallback,
			failedCallback : failedCallback
		});
		if( ! isFirstRequest ) return; // Loading
		
		// PING-PONG callback
		var onLoadFeedbackID = registerFeedback( function() {
			//On PONG
			IS_XWC_LOADED = true;
			
			/**
			 * 로딩대기시간동안 버퍼링된 요청 함수들을 차례대로 전송 한다.
			 */
			for(var i=0; i<XWC_BUFFERED_REQUEST.length; i++) {
				var buffered = XWC_BUFFERED_REQUEST[i];
				sendMessage({
					method : buffered.method,
					args : buffered.args,
					feedbackID : (buffered.successCallback||buffered.failedCallback) ? registerFeedback(buffered.successCallback, buffered.failedCallback ) : null
				});
			}
			XWC_BUFFERED_REQUEST = [];
		}, function( cause ) {
			//Error
			for(var i=0; i<XWC_BUFFERED_REQUEST.length; i++) {
				var buffered = XWC_BUFFERED_REQUEST[i];
				try {
					if( buffered.failedCallback ) buffered.failedCallback( cause );					
				} catch(e) { log("unknownFailedCallback",e); }
			}
			XWC_BUFFERED_REQUEST = [];
		});
		/**
		 * PKIFrame 으로부터 feedback call 이 호출되었는지 주기적으로 체크함. 
		 * 중첩되지 않도록 위의 PING-PONG의 동일한 feedbackID 를 사용
		 */
		( function reCurrChecker(count) {
			if( isExistFeedback( onLoadFeedbackID ) ) {
				if( count > 15 ) {
					//stop loop
					doCallback( onLoadFeedbackID, false, ["xwcLoadTimeout"]);
					return;
				}
				
				try {
					/** 이 message가 PKIFrame 에 도달하면 PKIFrame 은 feedbackID 를 그대로 다시 post 응답하여 콜백이 호출되게 됨 */
					sendMessage({
						method : 'PING',
						args : [],
						feedbackID : onLoadFeedbackID
					});
				} catch(e) {
				}
				setTimeout( function() { reCurrChecker( count+1 ); }, 1000 );
			}
		} ) ( 0 );
		
	}
	
	//send Cross message
	function sendMessage(message) {
		message.XWCMessage = true;
		if( CrossMessageSupport ) {
			var saveCertDomain = KSBizConfig.html5saveCertDomain;
			var saveCertUrl = KSBizConfig.html5saveCertUrl;
			if( !document.getElementById( "XWC_service_iframe" ) ) {
				var div = document.createElement("div");
				log("sendMessage", "Create iframe");
				div.innerHTML = "<iframe seamless style='position: absolute; border: 0px; margin:0px; padding:0px; width:0px; height:0px;' id='XWC_service_iframe' src='" + saveCertDomain + saveCertUrl + "' marginheight='0' marginwidth='0' frameborder='0'></iframe>";
				//금결원 클라우드 트레이 아이콘,윈도우 때문에 전체화면 점유 필요
				//div.innerHTML = "<iframe seamless style='position: absolute; border: 0px; margin:0px; padding:0px; width: 100%;height: 100%;top: 0px;' id='XWC_service_iframe' src='" + saveCertDomain + saveCertUrl + "' marginheight='0' marginwidth='0' frameborder='0'></iframe>";
				document.body.appendChild( div );
			}
			var gateWin = document.getElementById( "XWC_service_iframe" ).contentWindow;
			if( ! IsModernCross ) {
				gateWin.postMessage(message, saveCertDomain);
			} else {
				gateWin.postMessage( JSON.stringify(message), saveCertDomain);
			}
			log("sendMessage", "Sended Message");
		}
	}
	
	
	/**
	 * 보안에 문제가 될 수 있는 리플렉션 함수는 추가하지 말도록
	 */
	RemoteInvokeTarget = {};
	
	/*
	RemoteInvokeTarget.onError = function(idx, cause) {
		var callbackSpec = feedbackFuncTable[idx];
		if( !callbackSpec ) {
			log("iCrossWin.doCallback", "Unknown callback id : "+idx);
			return;
		}
		
		delete feedbackFuncTable[ idx ];
		
		var callbackFunc = callbackSpec['failedFunc'];
		if( !callbackFunc ) {
			log("iCrossWin.doCallback", "Not exist callback. successCallBack?:"+isSuccess);
			return;
		}
		var callbackTarget = callbackSpec['target'];
		
		if( typeof callbackFunc === "string" ) {
			var funcStr = callbackFunc+".apply(null, args);";
			new Function( 'args', funcStr ) ( [cause] );
		} else {
			callbackFunc.apply(callbackTarget, [cause]);
		}
	}
	*/
	
	RemoteInvokeTarget.doCallback = function(fid, isSuccess, args) {
		doCallback( fid, isSuccess, args );
	};
	
	function _ksbiz_opencert_callback() {
		log("opencert callback",arguments);
		sendMessage({
			method:"ksbiz_opencert_callback",
			args:Array.prototype.slice.call(arguments)
		});
	}
	
	//only safari
	//어떤식으로든 동적로딩하면 동작하지 않는 알 수 없는 구조라 윗부분에서 정적 로딩(document.write)
	var root = self;
	RemoteInvokeTarget.opencert_init = function(apikey) {
		if( !root.window.__ksbiz__OpenCert ) {
			var isDev = true;
			var corp = "099";
			var cDate = new Date();
			var dd = cDate.getDate();
			var mm = cDate.getMonth()+1;
			var today = cDate.getFullYear() + (mm<10?'0'+mm:mm) + (dd<10?'0'+dd:dd);
			var query = "?dt="+today+"&corp="+corp;
			if( !root.window.OpenCert ) {
				_ksbiz_opencert_callback({error:"failed opencert js loading"});
				return;
			}
			root.window.__ksbiz__OpenCert = root.window.OpenCert.getInstance();
			root.window.__ksbiz__OpenCert.init(apikey, function(result) {
				window._opencertInitCached = result;
				//공동저장소 옵션(cloud=false)일 경우 이 함수는 없음
				if( root.window.__ksbiz__OpenCert.setEventListener ) {
					root.window.__ksbiz__OpenCert.setEventListener("changeCertInfos", function(cloudEvent) {
						try {
							ui.cloudClick( cloudEvent );
						} catch(e) {
							log("opencert_init",e);
						}
					});
				}
				_ksbiz_opencert_callback( result );
			});
		} else _ksbiz_opencert_callback( window._opencertInitCached );
	}
	
	RemoteInvokeTarget.opencert_mergeCertInfos = function(localCertInfos, option) {
		root.window.__ksbiz__OpenCert.mergeCertInfos(localCertInfos, _ksbiz_opencert_callback, option);
	}
	
	RemoteInvokeTarget.opencert_setPKCS12 = function(pkcs12, certInfo, apipwd, option) {
		log("root.openCert.setPKCS12.option", option);
		root.window.__ksbiz__OpenCert.setPKCS12(pkcs12, certInfo, apipwd, _ksbiz_opencert_callback, option);
	}
	
	RemoteInvokeTarget.opencert_getPKCS12 = function(fph, apipwd, clientNonce) {
		root.window.__ksbiz__OpenCert.getPKCS12(fph, apipwd, clientNonce, _ksbiz_opencert_callback);
	}
	
	RemoteInvokeTarget.opencert_removePKCS12 = function(fph) {
		root.window.__ksbiz__OpenCert.removePKCS12(fph, _ksbiz_opencert_callback);
	}
	
	//Safari CORSS only. false case 코드 revoke 보류.
	var isCORSS = true;
				   
	function _ksbiz_asyncStorage_resolved() {
		log("asyncStorage resolved : ",arguments);
		sendMessage({
			method:"ksbiz_asyncStorage_callback",
			args:[ {data:Array.prototype.slice.call(arguments)} ]
		});
	}
	
	function _ksbiz_asyncStorage_rejected(err) {
		log("asyncStorage rejected : ",err);
		sendMessage({
			method:"ksbiz_asyncStorage_callback",
			args:[ {error:err||"none desc"} ]
		});
	}
	
	var CORSS_POP_DOMAIN = null;
	var CORSS_POP_URL = null;
	var CORSS_POP_OPTION = "width=250,height=110,top="+(window.screen.height-110)+",left=0,status=no,toolbar=no,scrollbars=no,menubar=no,location=no"; //300,100
	var baseWin;
	if(KSBizConfig.yessignOpenCertUse){
		baseWin = top.window;
	} else {
		baseWin = parent.window;
	}
	var baseDoc = baseWin.document;
	if( window.addEventListener ) window.addEventListener("unload", function(e) {
		if(baseWin._XWCORSSWIN&&!baseWin._XWCORSSWIN.closed) 
			baseWin._XWCORSSWIN.close();
	});
	
	function CORSS( data ) {	
		if( !baseWin._XWCORSSWIN || baseWin._XWCORSSWIN.closed ) {
			var checkCrossDockAndInvoke = function() {
				var bindChkInterval = setInterval(function() {
					baseWin._XWCORSSWIN.postMessage({method:"lstorage_openCross"}, CORSS_POP_DOMAIN);
				}, 500);
				RemoteInvokeTarget.lstorage_onCrossOpened = function() {
					//baseWin._XWCORSSWIN.blur(); baseWin.focus();
					//baseWin.open().close();
					clearInterval( bindChkInterval );
					RemoteInvokeTarget.lstorage_onCrossOpened = function() {} //prevent duplicate call
					baseWin._XWCORSSWIN.postMessage(data, CORSS_POP_DOMAIN);						
				};
			}
			//baseWin.open 으로 하면 으로 팝업이 top으로 응답하므로 받지 못함
			baseWin._XWCORSSWIN = window.open(CORSS_POP_URL, "wstorage_sf", CORSS_POP_OPTION);
			if( !baseWin._XWCORSSWIN || baseWin._XWCORSSWIN.closed ) { //popup is blocked. raise user interaction
				var fixedDiv = baseDoc.createElement("div");
				fixedDiv.setAttribute("id", "_sfOcpPopupLayer");
				fixedDiv.style.cssText = "background-color:#11111188; z-index:9999999; position: fixed; top: 0px; left:0px; right:0px; bottom:0px; margin:0px; padding:0px; width:100%; height:100%; font-family: 맑은 고딕,Malgun Gothic,돋음,Dotum,Arial,sans-serif;";
				var ckDiv = baseDoc.createElement("div");
				ckDiv.style.cssText = 'width:305px;height:150px; background:#fff; position: relative; margin-top:-86px; margin-left:-154px; top:40%; left:50%; padding:15px;';
				var ckh3 = baseDoc.createElement("h3");
				ckh3.style.cssText = 'display:block;height:38px; padding-left: 18px; border-bottom: 1px solid #dedede; font-weight: bold; font-size: 15px; letter-spacing: -1px; line-height: 38px; margin-top:0;';
				ckh3.innerHTML = '알림';
				var ckCont = baseDoc.createElement("div");
				ckCont.style.cssText = 'padding:20px 20px 17px; margin:0;';
				var ckTxt = baseDoc.createElement("div");
				ckTxt.style.cssText = 'display: inline-block; width: 100%; vertical-align: middle; text-align: center;';
				var ckSpan = baseDoc.createElement("span");
				ckSpan.style.cssText = 'display: inline-block; width: auto; text-align: left; vertical-align: middle; word-break: break-all; font-size: 13px; color: #545454; line-height: 20px;';
				ckSpan.innerHTML = '브라우저 저장소 사용을 위해 새창을 엽니다.';
				var ckBtn = baseDoc.createElement("div");
				ckBtn.style.cssText = 'display: block; margin-top: 20px; width:100%; text-align: center; position: relative;';
				var btn = baseDoc.createElement("button");
				btn.style.cssText = 'width: 168px; display: inline-block; position: relative; height: 30px;background: #f6861f;border: 1px solid #f16d02;font-weight: bold; font-size: 13px;color: #fff; letter-spacing: -1px; vertical-align: top; cursor: pointer;';
				btn.innerHTML = '확인';
				btn.addEventListener('mouseover', function(){
					btn.style.cssText = 'width: 168px; display: inline-block; position: relative; height: 30px;background: #f59821;border: 1px solid #f16d02;font-weight: bold; font-size: 13px;color: #fff; letter-spacing: -1px; vertical-align: top; cursor: pointer;';
				});
				btn.addEventListener('mouseout', function(){
					btn.style.cssText = 'width: 168px; display: inline-block; position: relative; height: 30px;background: #f6861f;border: 1px solid #f16d02;font-weight: bold; font-size: 13px;color: #fff; letter-spacing: -1px; vertical-align: top; cursor: pointer;';
				});
				btn.addEventListener('click', function() {
					btn.style.cssText = 'width: 168px; display: inline-block; position: relative; height: 30px;background: #dc7026;border: 1px solid #f16d02;font-weight: bold; font-size: 13px;color: #fff; letter-spacing: -1px; vertical-align: top; cursor: pointer;';
					baseDoc.body.removeChild( baseDoc.querySelector("#_sfOcpPopupLayer") );
					baseWin._XWCORSSWIN = window.open(CORSS_POP_URL, "wstorage_sf", CORSS_POP_OPTION);
					if( !baseWin._XWCORSSWIN ) {
						alert("팝업 사용이 불가능하여 인증서 저장소를 사용할 수 없습니다");
						return;
					}
					setTimeout(function() {baseWin._XWCORSSWIN.blur();window.focus();}, 1000);				
					baseWin._XWCORSSWIN.blur();baseWin.focus();					
					//window.open("about:blank","xwcBlur","width=0, height=0").close();
					checkCrossDockAndInvoke();
				});
				ckDiv.appendChild( ckh3 );
				ckTxt.appendChild( ckSpan );
				ckCont.appendChild( ckTxt );
				ckBtn.appendChild( btn );
				ckCont.appendChild( ckBtn );
				ckDiv.appendChild( ckCont );
				
				fixedDiv.appendChild( ckDiv );
				baseDoc.body.appendChild( fixedDiv );
			} else checkCrossDockAndInvoke();
		} else {
			baseWin._XWCORSSWIN.postMessage(data, CORSS_POP_DOMAIN);
		}
	}
	
	function _lstorage_bind(funcName) {
		if( ! isCORSS ) {
			return function() {
				var args = Array.prototype.slice.call(arguments);
				args.push(_ksbiz_asyncStorage_resolved);
				args.push(_ksbiz_asyncStorage_rejected);
				RemoteInvokeTarget._storageImpl[ funcName ].apply( RemoteInvokeTarget._storageImpl, args );
			}
		} else {
			//passthrough
			return function() {
				CORSS( {method : "lstorage_"+funcName, args : Array.prototype.slice.call(arguments)} );
			}			
		}
	}
	
	RemoteInvokeTarget.lstorage_onCrossResolved = _ksbiz_asyncStorage_resolved;
	RemoteInvokeTarget.lstorage_onCrossRejected = function(errStr) { _ksbiz_asyncStorage_rejected(JSON.parse(errStr)); };
	RemoteInvokeTarget.lstorage_install = function(options, cod) {
		//Not used
		if( ! isCORSS ) {
			var storageImpls = new Function("options", cod+" return storageImpl(options)") (options);
			RemoteInvokeTarget._storageImpl = storageImpls[options.target];
			RemoteInvokeTarget._storageImpl.importStorage( _ksbiz_asyncStorage_resolved, _ksbiz_asyncStorage_rejected );
		} else {
			CORSS_POP_DOMAIN = options.crossPopDomain;
			CORSS_POP_URL = options.crossPopDomain+options.crossPopPath;
			CORSS( {method : "lstorage_install", args : [options]} );
		}
	}
	RemoteInvokeTarget.lstorage_keys = _lstorage_bind("keys");
	RemoteInvokeTarget.lstorage_getData = _lstorage_bind("getData");
	RemoteInvokeTarget.lstorage_getMap = _lstorage_bind("getMap");
	RemoteInvokeTarget.lstorage_setData = _lstorage_bind("setData");
	RemoteInvokeTarget.lstorage_getLength = _lstorage_bind("getLength");
	RemoteInvokeTarget.lstorage_remove = _lstorage_bind("remove");
	
	function onCrossMessage(e) {
		var data = e.data;
		log("global.onCrossMessage", data);
		
		if( !data ) return;
		
		/** IE 8,9 */
		if( typeof data == "string" ) {
			try {
				data = JSON.parse( data );
			} catch(e) {
				log("global.onCrossMessage.invalidJson", data);
				return;
			}
		}
		var saveCertDomain = KSBizConfig.html5saveCertDomain;
		if( !data.XWCMessage || e.origin !=  saveCertDomain ) {
			//ignore
			return;
		}
		
		onMessage( data );
	}
	
	//received message
	function onMessage(data) {
		var invokeTarget = RemoteInvokeTarget;
		var func = invokeTarget[data.method];
		var args = data.args || [];
		if( func ) {
			func.apply(invokeTarget,  args );
		} else {
			log("CrossWin.onMessage", "Invalid XWC message : "+JSON.stringify(data) );
		}
	}
	
	function doCallback(idx, isSuccess, args) {
		//for IE
		args = args || [];
		
		var callbackSpec = feedbackFuncTable[idx];
		if( !callbackSpec ) {
			log("iCrossWin.doCallback", "Unknown callback id : "+idx);
			return;
		}
		
		/** remove from table */
		delete feedbackFuncTable[ idx ];
			
		var callbackFunc = (isSuccess) ? callbackSpec['successFunc'] : callbackSpec['failedFunc'];
		if( !callbackFunc ) {
			log("iCrossWin.doCallback", "Not exist callback. successCallBack?:"+isSuccess);
			return;
		}
		var callbackTarget = callbackSpec['target'];
		
		callbackFunc.apply(callbackTarget, args);
	}

	function registerFeedback(successFunc, failedFunc, target) {
		var funcID = (funcIdxCount++);
		log("iCrossWin.registerFeedback", "Registered : "+funcID);
		feedbackFuncTable[funcID] = {
			'successFunc' : successFunc,
			'failedFunc' : failedFunc,
			'target' : target
		};
		return funcID;
	}

	function isExistFeedback(fid) {
		if ( feedbackFuncTable[fid] ) {
			return true;
		}
		return false;
	}
	
	/**
	 * Register onMessage event
	 * for IE8 
	 */
	if (typeof window.addEventListener != 'undefined') {
	    window.addEventListener('message', onCrossMessage, false);
	} else if (typeof window.attachEvent != 'undefined') {
	    window.attachEvent('onmessage', onCrossMessage);
	}
	
	win.loadEngine = function(option, onSuccess, onFailed) {
		if( localStorage && Uint8Array ) {
			var logLevel = (window['KSBizConfig'] && window['KSBizConfig'].kslog ? 0 : 5);
			XWC.PING( option || {}, onSuccess, function(cause) {
				if( cause == "xwcLoadTimeout" ) {
					alert( "보안 프레임 로딩에 실패하였습니다" );
				} else if( cause == "accessDenied" ) {
					alert( "크로스 도메인 설정 오류. 크로스 도메인("+KSBizConfig.html5saveCertDomain+")에서 현재 도메인을 허용하도록 설정해 주십시오" );
				}
				
				onFailed( cause );
			});
		} else {
			onFailed();
		}
	}
	XWC.PING = crossInvoke.bind(this, "PING");
	XWC.loadCertList = crossInvoke.bind(this, "loadCertList");
	XWC.loadCertInfo = crossInvoke.bind(this, "loadCertInfo");
	XWC.removeCert = crossInvoke.bind(this, "removeCert");
	XWC.sign = crossInvoke.bind(this, "sign");
	XWC.importCertFromData = crossInvoke.bind(this, "importCertFromData");
	XWC.changePassword = crossInvoke.bind(this, "updateCertCredential"); 
	XWC.exportCert = crossInvoke.bind(this, "exportCert");
	XWC.issueCert = crossInvoke.bind(this, "issueCert");
	XWC.updateCert = crossInvoke.bind(this, "updateCert");
	XWC.copyBrowserCert = crossInvoke.bind(this, "copyBrowserCert");
	XWC.setYessignCloudOptions = crossInvoke.bind(this, "setYessignCloudOptions");
}) ( window );