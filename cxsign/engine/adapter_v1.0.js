/** old IE */
if( !window.console ) {
	window.console = window.console || {log:function(){}, debug:function(){}};
}

/**
 * tree logger
 */
var _logLevelRoot = {_level:1};
if( KSBizConfig && !KSBizConfig.kslog ) {
	_logLevelRoot = {_level:0};
}

var _logTime = function() {
	var a = new Date();
	return ""
	+ (a.getHours() > 9 ? a.getHours() : '0'+a.getHours() )
	+ (a.getMinutes() > 9 ? a.getMinutes() : '0'+a.getMinutes() )
	+ (a.getSeconds() > 9 ? a.getSeconds() : '0'+a.getSeconds() );
}

var _dummyLogger = {log:function() {}};
function setDebug( treeName, level ) {
	var targetLevel;
	if( treeName == null || treeName == "" || treeName == "." ) {
		targetLevel = _logLevelRoot;
	} else {
		var countLevel = _logLevelRoot;
		var trees = treeName.split(".");
		for( k in trees ) {
			var node = trees[k];
			var nextLevel = countLevel[ node ];
			if( nextLevel == null ) {
				countLevel[node] = nextLevel = {_level:1};
			}
			countLevel = nextLevel;
		}
		targetLevel = countLevel;
	}
	targetLevel._level = level;
}

function getLogger( treeName ) {
	var node = _logLevelRoot;
	var trees = treeName.split(".");
	if( node._level <= 0 ) {
		return _dummyLogger;
	} else {
		//find detail
		var countLevel = _logLevelRoot;
		var trees = treeName.split(".");
		//찾는도중 부모가 _level = 0 이면 disable
		for( node in trees ) {
			if( countLevel._level <= 0 ) return dummyLogger;
			var nextLevel = countLevel[ node ];
			if( nextLevel ) {
				countLevel = nextLevel;
			} else {
				break;
			}
		}
	}
	if (!Function.prototype.bind) {
		return {
			log : function( text ) {
				window.console.log("[adapter.js] ["+_logTime()+'] ['+treeName+'] : '+text );
			}
		};
	} else {
		return {
			log:window.console.log.bind( window.console, "[adapter.js] ["+_logTime()+'] [%s] : %s', treeName)
		};
	}

}


/**
 * 동적 스크립트 로딩 시 기본 경로 설정
 */
var BASE_REL_PATH = "../..";


/**
 * prevent overwrap load
 * NULL : 찾지 못하거나 설정 안된 상태
 * PURE : HTML5 환경
 * SWF : Flash 지원 환경
 * NATV : 네이티브 프로그램 연동 환경
 **/
var CONST_ENGINE_NULL = 0;
var CONST_ENGINE_PURE = 1;
var CONST_ENGINE_SWF = 2;
var CONST_ENGINE_NATV = 3;
var EngineMode = 0;

/**
 * postMessage 지원 여부
 */
var CrossMessageSupport = (window.postMessage != null && typeof window.postMessage !== "undefined");

//
/** IE 10 미만 또는 FF 7 미만은 CrossMessage 시 String 만 지원됨 */
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

function loadScripts(originSrcs, callback, failed, async) {
	getLogger("loadScripts").log( originSrcs );
	if( !callback ) {
		callback = function() {
			getLogger("loadScripts").log( "None callback" );
		};
	};
	var head = document.getElementsByTagName('head')[0];
	var srcs = [];
	if( typeof originSrcs == "string" ) {
		srcs.push( originSrcs );
	} else {
		for(var k=0; k<originSrcs.length; k++) {
			srcs.push( originSrcs[k] );
		}
	}

	var loadJs = function(src, onLoaded) {
		var script = document.createElement('script');
		var nextCall;
		script.type = 'text/javascript';
		script.src = src;
		
		// most browser
		if (script.addEventListener){
			script.addEventListener('load', onLoaded, false );
			//TODO : error 
			script.addEventListener('error', failed, false );
		} else {
			// IE 6, 7, 8
			script.attachEvent( 'onreadystatechange', function(){
			if(script.readyState == 'complete' || script.readyState == 'loaded'){
				onLoaded();
			}}, false );
		}
		
		head.appendChild(script);
	};
	if( async ) {
		for( var i=0; i<src.length; i++ ) {
			var jsIdx = i;
			loadJs( src, function() {
				srcs[ jsIdx ] = null;
				//check cleared
				for( k in src ) {
					if( srcs[ k ] != null ) return;
				}
				//all src is loaded
				callback();
			});
		}
	} else {
		var recurr = function() {
			var nextSrc = srcs.shift();
			if( nextSrc ) {
				loadJs( nextSrc, recurr );
			} else {
				callback();
			}
		};
		loadJs(srcs.shift(), recurr);
	}
}



var CallbackManager = new function() {
	var funcIdxCount = 0; //case false 를 피하기 위해 1부터 카운팅
	var callbackBufferedTable = {};

	this.register = function( request, successFunc,  failedFunc ) {
		var funcID = (funcIdxCount++);
		callbackBufferedTable[funcID] = {
			'data' : request,
			'successFunc' : successFunc,
			'failedFunc' : failedFunc
		};

		getLogger("CallbackManager.register").log("register callbackId:"+funcID);
		return funcID;
	};

	this.doCallback = function( idx, isSuccess, data ) {
		var callbackSpec = callbackBufferedTable[ idx ];
		if( !callbackSpec ) {
			getLogger("CallbackManager.doCallback").log("Not exist callback. idx:"+idx);
			return;
		}

		delete callbackBufferedTable[ idx ];

		var callbackFunc = isSuccess ? callbackSpec['successFunc'] : callbackSpec['failedFunc'];
		if( !callbackFunc ) {
			getLogger("CallbackManager.doCallback").log("Callback idx is exist but has no [staus:"+ (isSuccess ? "success" : "failed") +"]");
			return;
		}
		var callbackTarget = callbackSpec['target'];

		if( typeof callbackFunc === "string" ) {
			var funcStr = callbackFunc+".apply(null, args);";
			new Function( 'args', funcStr ) ( [data] );
		} else {
			callbackFunc.apply(callbackTarget, [data]);
		}
	};
};

var wrapperEngine = function() {
	var origin;

	this.isAvailable = function() {
		if( origin == null ) return false;
		return true;
	};

	this.loadEngine = function(onLoaded, onFailed) {
		if( !isAvailable() ) {
			getLogger("wrapperIF").log("origin engine is null");
			return;
		}
		origin.loadEngine(onLoaded, onFailed);
	};

	this.invoke = function(req, onResult) {
		if( !isAvailable() ) {
			getLogger("wrapperIF").log("origin engine is null");
			return;
		}
		origin.invoke(req, onResult);
	};
};

function wrapEngine( engine ) {
	new wrapperEngine( engine );
}

var flashIF = new function() {
	var option = {swfVersion:"11.4"};

	this.isAvailable = function() {
//		if( swfobject.hasFlashPlayerVersion( option.swfVersion ) ) {
//			return true;
//		}
		return false;
	}

	this.loadEngine = function(onLoaded, onFailed) {
		getLogger("FlashEngine.loadEngine").log("loadEngine", document.getElementById("XWCCore"));
		var flashvars = {};
		var param = {};
		param.menu = "false";
		param.allowScriptAccess = "always";
		param.fullScreen = "false";
		param.scale = "noscale";
		//param.bgcolor = "#000000";
		param.loop = "false";
		param.quality = "high"
		//param.wmode = "window";
		//param.wmode = "opaque";
		param.wmode = "transparent";

		var attributes = {};
		attributes.align = "top";
		attributes.id = "XWCCoreSWF";
		attributes.name = "XWCCoreSWF";

		swfobject.embedSWF("/CrossSign/Canary/core/XWCCore.swf", "XWCModulePlace", 10, 2, "8.0.0", "expressInstall.swf", flashvars, param, attributes, function(e) { console.log(e); });
		Q("#embedPlaceForImport")[0].style.visibility = 'hidden';
	}

	this.invoke = function( method, req, onOK, onError) {
		onError("not_support");

		var xwcModule = window["XWCCoreSWF"] || document["XWCCoreSWF"];;

		//Flash Mode
		var raw = req.raw;
		if( !raw ) raw = JSON.stringify( req );
		setTimeout(function() {
			console.log("Flash call : "+raw);
			xwcModule.callXWC( raw );
		}, 1);
	}
};

var pureIF = new function() {
	this.isAvailable = function() {
		if( window["XWCCore"] != null ) return true;
		/** check html5 */
		var webCryptoSupported = !!(window.crypto || window.msCrypto);
		if( webCryptoSupported ) {
			var webCrypto = (window.crypto || window.msCrypto);
			if( webCrypto.subtle || webCrypto.webkitSubtle ) {
				return true;
			}
		} 
		
		if( Uint8Array ) {
			/** for IE10. SoftMode(Uint8Array) */
			return true;
		} 
		return false;
	}

	this.loadEngine = function( option, onLoaded, onFailed ) {
		if( this.isAvailable() && window["XWCCore"] != null ) {
			window["XWCCore"].loadEngine( option, onLoaded, onFailed );
		} else {
			onFailed("not support");
		}
	}

	this.invoke = function( method, req, onOK, onError) {
		window["XWCCore"].callDirect( method, req, onOK, onError );
	}
};

var natvIF = new function() {
//	var remoteXWCUrl = "https://localhost:48180/callXWC";
	var remoteXWCUrl = "https://127.0.0.1:48180/callXWC";
	var xdrCount = 0;
	var pendingXDR = [];

	function removeXDR( xdrCountIdx ) {
		// indexOf isn't always supported, you can also use jQuery.inArray()
		//var index = pendingXDR.indexOf(xdr);
		var index = -1;
		for(var i=0; i<pendingXDR.length; i++) {
			if( pendingXDR[i] [0] == xdrCountIdx ) {
				index = i;
				break;
			}
		}
		if( index == -1 ) {
			getLogger("NVXdr").log("---- Can't find XDR Idx : "+xdrCountIdx);
			return;
		}

		if (index >= 0) {
			pendingXDR.splice(index, 1);
		}
	}

	function jsonpRequest(data, onOK, onErr) {
		//TODO : push javascript src to  header(loop time is data segment block count), raise callback(remove javascript)
		//ex:) req : data=123456789012345678901234567890
	}

	function ajaxRequest(data, onOK, onErr) {
		var jsonString = JSON.stringify( data );

		// IE8 & 9 only Cross domain JSON GET request
		// TODO : IE10 use XMLHttpRequest
		if ('XDomainRequest' in window && window.XDomainRequest !== null) {

			var xdr = new XDomainRequest(); // Use Microsoft XDR
			var pidx = (xdrCount++);
			xdr.open('post', remoteXWCUrl );
			xdr.onload = function () {
				getLogger("NVXdr").log("---- XDR Ok : "+xdr.responseText);
				var msg = JSON.parse( xdr.responseText );
				removeXDR( pidx );
				setTimeout( function() { onOK(msg); }, 100 );
			};

			xdr.onerror = function() {
				getLogger("NVXdr").log("---- XDR Err");
				removeXDR( pidx );
				onErr();
			};
	        xdr.ontimeout = function () {
	        	removeXDR( pidx );
	        	getLogger("NVXdr").log("---- XDR Timeout");
	        };
	        // this also needs to be set
	        xdr.onprogress = function() { };
	        getLogger("NVXdr").log("---- XDR Send ready");
			xdr.send( jsonString );
			getLogger("NVXdr").log("---- XDR Sended");
			pendingXDR.push( [pidx, xdr] );
		}

		// IE7 and lower can't do cross domain
		else if (navigator.userAgent.indexOf('MSIE') != -1 &&
				 parseInt(navigator.userAgent.match(/MSIE ([\d.]+)/)[1], 10) < 8) {
		   return false;
		}

		// Do normal jQuery AJAX for everything else
		else {
			var xHttp = new XMLHttpRequest();
			xHttp.onreadystatechange = function() {
				if( this.readyState == 4 ) {
					if( this.status == 200 ) {
						var msg = JSON.parse( xHttp.responseText );
						//console.log("[response]===========================");
						//console.log(msg);
						//console.log("=====================================");
						onOK( msg );
					} else {
						onErr( "HTTP status : "+this.status );
					}
				}
			};
			xHttp.open("post", remoteXWCUrl, true);
			xHttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
			//console.log("[send]===========================");
			//console.log("url :: " + jsonString);
			//console.log("jsonStr :: " + jsonString);
			//console.log("=================================");
			xHttp.send( jsonString );
		}
	}

	function jsonProc( request, retry ) {
		if( !retry ) retry = 0;
		ajaxRequest( request, function( response ) {
			//registered 일 경우 loop request 를 간소화시키고
			//not_yet 일 경우는 그냥 loop
			//exCall 일 경우 loop 이전에 XWC 한번 호출해줌
			if( response.status == "registered" || response.status == "not_yet" || response.status == "exCall" ) {
				if( response.status == "registered" ) {
					request = {
						method : "getNvCallResult"
						,feedbackId : request.feedbackId,
					};
				} else if( response.status == "exCall" ) {
					var callSpec = response.data;
					XWC.callFromEngine( callSpec );
				}
			}
			/*
			else if( response.status == "done" ) {
				//끝
				CallbackManager.doCallback( request.callbackId, true, response );
			} else {
				CallbackManager.doCallback( request.callbackId, false, response.status );
			}
			*/
		}, function( msg ) {
			//CallbackManager.doCallback( request.callbackId, false, "natv_net_error" );
			//임시. IE 간헐적 오류가 너무 잦아서
			if( retry >= 10 ) {
				CallbackManager.doCallback( request.callbackId, false, "natv_net_error" );
			} else {
				setTimeout( function() {
					jsonProc( request, retry+1 );
				},200);
			}
		});
	};

	this.isAvailable = function() {
		return true;
	};

	this.loadEngine = function( option, onLoaded, onFailed ) {
		//TODO : Check local and download
		setTimeout( function() {
			natvIF.invoke( "disk_getStatus", {storage:"disk"}, function() {
				onLoaded();
			}, function() {
				//if( confirm( getRes("confirm_install_natv_program") ) ) {
				if( confirm("응용프로그램 실행이 필요합니다\n프로그램을 다운로드받아 계속 진행하려면 확인을 누르십시오") ) {
					location.href = "/CrossSign/Canary/CrossSign_Install_win.exe";
					//TODO : Check loop???
				}
			} );
		}, 500);
		return true;
	}

	this.invoke = function( method, req, onOK, onError) {
		var cbId = CallbackManager.register( req, onOK, onError );
		var invokeReq = {
			method : method
			, callbackId : cbId
			, request : req
		};
		jsonProc( invokeReq );
	}
}



var defaultEngineOption = {
	//preferList : [CONST_ENGINE_PURE, CONST_ENGINE_SWF, CONST_ENGINE_NATV]
	preferList : [CONST_ENGINE_PURE]
};
function loadEngine(options, onLoaded, onFailed) {
	getLogger("loadEngine").log( "Start. option:"+JSON.stringify(options) );

	if( typeof(options) === "function" ) {
		onLoaded = options;
		options = null;
	}
	if( !options ) {
		options = defaultEngineOption;
	}

	var applyOption = options;
	for( key in defaultEngineOption ) {
		if( !options[key] ) {
			applyOption[key] = defaultEngineOption[key];
		}
	}

	if( applyOption.preferList == null || applyOption.preferList.length <= 0 ) {
		alert("[CrossSign] preferList is null");
		onFailed("impl_error");
		return;
	}

	EngineMode = CONST_ENGINE_NULL;
	var tryList = [];
	for( var i=0; i<applyOption.preferList.length; i++ ) {
		tryList.push( applyOption.preferList[i] );
	}

	(function recuTry() {
		if( tryList.length > 0 ) {
			tryMode = tryList.shift();
			var engineImpl;
			var engineOpt;
			if( tryMode == CONST_ENGINE_PURE ) {
				engineImpl = pureIF;
				engineOpt = applyOption["html5Option"];
			} else if ( tryMode == CONST_ENGINE_SWF ) {
				engineImpl = flashIF;
				engineOpt = applyOption["flashOption"];
			} else if ( tryMode == CONST_ENGINE_NATV ) {
				engineImpl = natvIF;
				engineOpt = applyOption["natvOption"];
			} else {
				alert("[CrossSign] invalid engine const : "+tryMode);
				onFailed("invalid_engine");
				return;
			}

			if( engineImpl.isAvailable() ) {
				engineImpl.loadEngine(engineOpt, function(loadedResult) {
					EngineMode = tryMode;
					getLogger("loadEngine").log(" loadedEngine result : "+EngineMode);
					/** onLoad 에서 오버라이딩할 수 있으므로 먼저 호출한다 */
					onLoaded( loadedResult );
					//setCrossMessageListener();
				}, recuTry);
			} else {
				recuTry();
			}
		} else {
			onFailed();
		}
	}) ();

}


function getRes() {
	var args = arguments;
	var msg = MessageResource[ args[0] ];
	if( !msg ) {
		if( arguments.length > 1 ) {
			return "iPKI 보안 처리중 오류가 발생하였습니다. 원인 : "+arguments[1];
		}
		return "iPKI 보안 처리중 오류가 발생하였습니다";
	}
	return msg.replace(/{(\d+)}/g, function(match, number) {
		var dVar = args[ parseInt(number) ];
		return typeof dVar != 'undefined' ? dVar : match;
	});
}

function getCoreEngine(engineMode) {
	if( !engineMode ) {
		engineMode = EngineMode;
	}
	if( engineMode == CONST_ENGINE_PURE ) {
		return pureIF;
	} else if( engineMode == CONST_ENGINE_SWF ) {
		return flashIF;
	} else if( engineMode == CONST_ENGINE_NATV ) {
		return natvIF;
	} else {
		throw new Error("Invalid engineMode : "+engineMode);
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * CrossMessage Processor
 */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var isAddedMessageListener = false;
var bindedCrossTarget;
var bindedCrossOrigin;
var bindedCrossWID;

function setCrossMessageListener() {
	if( !isAddedMessageListener ) {
		/**
		 * for IE8
		 */
		if (typeof window.addEventListener != 'undefined') {
		    window.addEventListener('message', onRecvCrossMessage, false);
		} else if (typeof window.attachEvent != 'undefined') {
		    window.attachEvent('onmessage', onRecvCrossMessage);
		}
		isAddedMessageListener = true;
	}
}

function onRecvCrossMessage(e) {
	var rawData;
	var data = e.data;

	//old IE
	if( typeof data === "string" ) {
		rawData = data;
		getLogger("onRecvCrossMessage").log( "onCrossMessage", data );
		try {
			data = JSON.parse( data );
		} catch(e) {
			getLogger("onRecvCrossMessage").log("Ignore invalid json : "+data);
			return;
		}
	} else {
		rawData = JSON.stringify( data );
	}
	data.raw = rawData;

	if( !data['XWCMessage'] ) {
		return;
	}

	if( !bindedCrossTarget ) {
		bindedCrossTarget = e.source;
		bindedCrossOrigin = e.origin;
		bindedCrossWID = data['wid'];
	}

	var xwcArgs = ( data.args && data.args.length > 0 ) ? data.args[0] : {};
//	XWC.invoke( data.method, xwcArgs, function(response) {
	XWC[ data.method ] ( xwcArgs, function(response) {
		sendCrossMessage({
			XWCMessage : true
			,wid : data.wid
			,method : "doCallback"
			,args : [ data.feedbackID, true, [response] ]
		});
	}, function(error) {
		sendCrossMessage({
			XWCMessage : true
			,wid : data.wid
			,method : "doCallback"
			,args : [ data.feedbackID, false, [error] ]
		});
	} );
}

function callXWC( data ) {
	if( typeof data.callbackIdx === "function" ) {
		var consumerFunc = data.callbackIdx;
		data.callbackIdx = null;
		consumerFunc( data );
		return;
	}

	/**
	 * feedbackID
	 * method
	 * param
	 * env
	 */
	if( XWC[data.method] ) {
		XWC[ data.method ] ( data );
	} else {
		XWC.invoke( data.method, data );
	}
}


function sendCrossMessage(message) {
	if( CrossMessageSupport && bindedCrossTarget ) {
		if( IsModernCross ) {
			if( typeof message != "string" ) {
				message = JSON.stringify(message);
			}
			bindedCrossTarget.postMessage( message, bindedCrossOrigin);
		} else {
			bindedCrossTarget.window.postMessage(message, bindedCrossOrigin);
		}
	}
}

function crossCall(func, args) {
	if( !args ) args = [];
	var message = {
        XWCMessage : true,
        wid : bindedCrossWID,
        method : func,
        args : args
    };
	sendCrossMessage( message );
}

var IDT_BROWSER = "browser", IDT_DISK = "disk", IDT_USB = "usb" , IDT_TOKEN = "token", IDT_HSM = "hsm", IDT_SPHONE = "sphone", IDT_CLOUD = "cloud" , IDT_PHONE = "phone";
var IDT_STORAGES = [IDT_BROWSER, IDT_DISK, IDT_USB, IDT_TOKEN, IDT_HSM, IDT_SPHONE, IDT_CLOUD, IDT_PHONE];
function resolveCID( spec ) {
	var s,i;
	var cid = spec.cid;
	if( !cid ) return;

	for(var k=0; k<IDT_STORAGES.length; k++) {
		if( cid.indexOf(IDT_STORAGES[k]) == 0 ) {
			s = IDT_STORAGES[k];
			i = cid.substring( IDT_STORAGES[k].length );
			break;
		}
	}

	if( !s ) {
		s = "unknown";
		i = cid;
	}
	if( !spec.storage ) {
		spec.storage = s;
	}
	spec.cid = i;
}

function resolveStorage( cid ) {
	for(var k=0; k<IDT_STORAGES.length; k++) {
		if( cid.substring(0, IDT_STORAGES[k].length) == IDTS[k] ) {
			return IDTS[k];
		}
	}
}

var storageSpec = {
	browser : {
		type : "pkcs8"
	},
	disk : {
		type : "pkcs8"
	},
	hsm : {
		type : "hsm"
	},
	sphone : {
		type : "pkcs8"
	},
	usb : {
		type : "pkcs8"
	},
	cloud : {
		type : "pkcs12"
	}
};
function getStorageSpec( storage ) {
	return storageSpec[ storage ];
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * XWC 모듈에서 호출되어지는 외부 함수들
 */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
(function(referWindow) {
	var baseNS;
	if( typeof referWindow.XWC === "undefined" ) {
		baseNS = referWindow.XWC = {};
	} else {
		return;
	}

	/**
	 * method : hook대상 함수 이름
	 * hookEvents : {onCall, onResolved, onRejected}
	 * onCall(
	 */
	baseNS.hook = function(method, hookEvents) {
		var orgFunc = XWC[method];
		var onCall = hookEvents['onCall'];
		var onResolved = hookEvents['onResolved'];
		var onRejected = hookEvents['onRejected'];
		XWC[method] = function(spec, resolved, rejected) {
			if( onCall && onCall( spec, resolved, rejected, orgFunc ) == true ) {
				return;
			}

			var hookResolved, hookRejected;
			if( !onResolved ) {
				hookResolved = resolved;
			} else {
				hookResolved = function(response) {
					onResolved( response, spec, resolved, rejected );
				}
			}
			if( !onRejected ) {
				hookRejected = rejected;
			} else {
				hookRejected = function(error) {
					onRejected( error, spec, resolved, rejected );
				}
			}
			orgFunc( spec, hookResolved, hookRejected );
		};
	}



	/** 인증서 제출(PKCS7Sign) 인증서 갱신(UpdateCert)시 핸들러 */
	baseNS.handleXKey = null;

	/*
	baseNS.storageImpl = {
		browser : referWindow.storage_browserImpl,
		disk : referWindow.storage_diskImpl,
		hsm : referWindow.storage_notSupport,
		sphone : referWindow.storage_sphoneImpl,
		cloud : referWindow.storage_cloudImpl
	};
	*/

	baseNS.onerror = function( err ) {
		if( typeof err == "string" ) {
			alert( "[DefaultErrorImpl] : "+err );
		} else {
			alert( "[DefaultErrorImpl] : ("+(err.status||"")+") "+err.error );
		}
	};

	//onErr 이 string 이면 alert 으로 처리해줌. onErr 이 없으면 기본 에러로 처리하도록 도와줌
	function wrapDefaultReject( onErr ) {
		if( onErr && typeof onErr == "string" ) {
			var msg = onErr;
			onErr = function() {
				alert( msg );
			}
		} else {
			onErr = baseNS.onerror;
		}
		return onErr;
	}

	baseNS.invoke = function( func, request, onOK, onErr ) {
		if( !request ) {
			request = {};
		}
		var interfaceObj = getCoreEngine( );

		if( onOK && !onErr ) {
			onErr = function(err) {
				getLogger("invoke").log(func+" invoke has not onErr. Error : "+err);
			}
		}

		interfaceObj.invoke( func, request, onOK, onErr );
	}

	baseNS.PING = function( spec, resolved, rejected ) {
		if( EngineMode == CONST_ENGINE_NULL ) {
			getLogger("PING").log("PING is ignored cause XWCCore not yet loaded");
			return;
		}
		XWC.invoke("PING", spec, resolved, rejected);
	}

	/*
	baseNS.sign = function( spec, resolved, rejected ) {
		rejected = wrapDefaultReject( rejected );

		//Show Window
		crossCall("ShowWindow");

		//Component Initialize

		//Show Certificate List

		XWC.onUserReject = function() {
			crossCall("CloseWindow");
			crossCall("doCallback", [spec.feedbackID, false, ["cancel"] ], spec);
		};

		XWC.onSubmitCert = function( req ) {
			//OnPasswordInput Handler
			req.env = spec.env;
			req.policy = spec.args[0];
			req.plainText = spec.args[1];
			XWC.invoke("sign", req, function( result ) {
				if( resolved ) resolved( result );
				crossCall("CloseWindow", [], spec);
				crossCall("doCallback", [spec.feedbackID, true, [result.signedData] ]);
			}, function(err) {
				rejected( err );
				if( err.error == "exceed_try_token" ) {
					crossCall("CloseWindow");
					crossCall("doCallback", [spec.feedbackID, false, [err.error] ]);
				}
			});
		};
	}
	*/

	baseNS.sign = function( spec, resolved, rejected) {
		XWC.invoke("sign", spec, resolved, rejected);
	}

//	baseNS.issueCert = function( spec, resolved, rejected) {
//		XWC.invoke("issueCert", spec.args[0], resolved, rejected);
//	}

	baseNS.issueCert = function( spec, resolved, rejected) {
		XWC.invoke("issueCert", spec, resolved, rejected);
	}

	baseNS.copyCert = function( spec, resolved, rejected ) {
		XWC.invoke("copyCert", spec, resolved, rejected);
	}

	baseNS.loadCertList = function( spec, resolved, rejected ) {
		XWC.invoke("loadCertList", spec, resolved, rejected);
	}

	baseNS.loadCertInfo = function( spec, resolved, rejected ) {
		XWC.invoke("loadCertInfo", spec, resolved, rejected);
	}

	baseNS.changePassword = function( spec, resolved, rejected ) {
		XWC.invoke("updateCertCredential", spec, resolved, rejected);
	}

	baseNS.importCert = function( spec, resolved, rejected) {
		XWC.invoke("importCert", spec, resolved, rejected);
	}

	baseNS.removeCert = function( spec, resolved, rejected) {
		XWC.invoke("removeCert", spec, resolved, rejected);
	}

	baseNS.importCertFromData = function(spec, resolved, rejected) {
		XWC.invoke("importCertFromData", spec, resolved, rejected);
	}

	baseNS.exportCert = function( spec, resolved, rejected ) {
		if( EngineMode == CONST_ENGINE_NATV ) {
			XWC.invoke("exportCert", spec, function(result) {
				location.href = "http://127.0.0.1:40188/getExported";
				resolved();
			}, rejected);
		} else {
			XWC.invoke("exportCert", spec, resolved, rejected);
		}
	}
	
	baseNS.copyBrowserCert = function( spec, resolved, rejected) {
		XWC.invoke("copyBrowserCert", spec, resolved, rejected);
	}

	baseNS.setYessignCloudOptions = function(spec, resolved, rejected) {
		XWC.invoke("setYessignCloudOptions", spec, resolved, rejected);
	}

	/**
	 * Not html5 mode
	 */
	baseNS.callFromEngine = function( cbRequest ) {
		var cbId = cbRequest.callbackId;
		if( cbId ) {
			XWC.fromEngine[ cbRequest.method ] ( cbRequest.request, function( data ) {
				XWC.invoke("onJSCallback", {
					request : {
						ffid : cbId,
						data : data
					}
				});
			}, function(err) {
				XWC.invoke("onJSCallback", {
					request : {
						ffid : cbId,
						data : err
					}
				});
			} );
		} else {
			XWC.fromEngine[ cbRequest.method ] ( cbRequest.request );
		}
	}
	
	baseNS.copyBrowserCert = function( spec, resolved, rejected) {
		XWC.invoke("copyBrowserCert", spec, resolved, rejected);
	}

	var fromEngine = baseNS.fromEngine = {};

	fromEngine.onEngineInvokedCallback = function(spec) {
		var cbId = spec.callbackId;
		var isSuccess = spec.isSuccess;
		var data = spec.request;
		CallbackManager.doCallback(cbId, isSuccess, data);
	}

	fromEngine.getStorageAndCrdt = function(spec, resolved, rejected) {
		baseNS.getStorageAndCrdt( spec, resolved, rejected );
	}

	fromEngine.getStorageStatus = function(spec, resolved, rejected) {
		var storageImpl = baseNS.storageImpl[spec.storage];
		if( !storageImpl ) {
			alert("해당 저장소("+spec.storage+")는 현재 환경에서 지원할 수 없습니다");
			spec.status = "invalid_storage";
			rejected( spec );
			return;
		}

		if( resolved != null ) {
			spec.pResolved = function() {
				resolved(spec, storageImpl);
			};
			spec.pRejected = rejected;
		}

		storageImpl.getStatus( spec );
	}

	fromEngine.loadCertList = function(spec, resolved, rejected) {
		fromEngine.getStorageStatus( spec, function( rSpec, storageImpl ) {
			spec.pResolved = resolved;
			spec.pRejected = rejected;
			storageImpl.loadList( spec );
		}, rejected);
	}

	fromEngine.loadCertData = function(spec, resolved, rejected) {
		fromEngine.getStorageStatus( spec, function( rSpec, storageImpl ) {
			spec.pResolved = resolved;
			spec.pRejected = rejected;
			storageImpl.loadData( spec );
		}, rejected);
	}

	fromEngine.deleteCertData = function(spec, resolved, rejected) {
		fromEngine.getStorageStatus( spec, function( rSpec, storageImpl ) {
			spec.pResolved = resolved;
			spec.pRejected = rejected;
			storageImpl.deleteData( spec );
		}, rejected);
	}

	fromEngine.saveCertData = function(spec, resolved, rejected) {
		fromEngine.getStorageStatus( spec, function( rSpec, storageImpl ) {
			spec.pResolved = resolved;
			spec.pRejected = rejected;
			storageImpl.saveData( spec );
		}, rejected);
	}

	fromEngine.cmpGateService = function(request, resolved, rejected) {

	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/**
	 * External Storage Interface
	 */
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


	function storageCallback( req ) {
		if( req.pResolved != null ) {
			if( req.status === 'ok' ) {
				req.pResolved( req );
			} else {
				req.pRejected( req );
			}
			delete req['pResolved'];
			delete req['pRejected'];
		} else {
			if( req.callbackIdx != null ) {
				req.method = "onExternalCallback";
				callXWC( req );
			} else {
				getLogger("storageCallback").log("Invalid storage callback : "+req);
			}
		}
	}

	baseNS.openFileForImport = function() {
		var fileOpenerrDiv = document.querySelector("#fileOpener");
		if( fileOpenerrDiv == null ) {
			fileOpenerDiv = document.createElement("div");
			fileOpenerDiv.setAttribute("id", "fileOpener");
			fileOpenerDiv.style.display = "none";
			document.body.appendChild( fileOpenerDiv );
		}
		fileOpenerDiv.innerHTML = "";
		var fileOpener = document.createElement("input");
		fileOpener.setAttribute("type", "file");
		fileOpener.setAttribute("multiple", "multiple");
		fileOpener.addEventListener("change", function() {
			importCertFromFiles(this.files, 'manage')
		});
		fileOpener.click();
	}


	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/**
	 * CMPGate Util
	 */
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var cmpTID = 0;
	function createXhttp() {
		var xhttp;
		if (window.XMLHttpRequest) {
		    xhttp = new XMLHttpRequest();
		} else {
		    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		return xhttp;
	}

	function openCmpGateSession( nextStep, rejected ) {
		var xhttp = createXhttp();

		xhttp.onreadystatechange = function() {
			if( xhttp.readyState == 4 ) {
				if( xhttp.status == 200 ) {
					try {
						var resp = JSON.parse( xhttp.responseText );
						if( resp.status == "accepted" || resp.status == "idle" ) {
							nextStep();
						} else if( resp.status == "busy" ) {
							//이상 상태. 중지
							rejected("busy");
						} else if( resp.status == "ready" || resp.status == "op" ) {
							//이전 프로세스가 동작중.. 잠시후에 다시 시도하라는 메시지를 출력
							//이상 상태. 중지
							rejected("busy");
						} else if( resp.status == "done" ) {
							//이상동작
							//이전 프로세스가 동작중.. 잠시후에 다시 시도하라는 메시지를 출력
							//이상 상태. 중지
							rejected("busy");
						}
					} catch(e) {
						rejected(e);
						return;
					}
					//nextStep();
				} else {
					rejected( "Response status : "+xhttp.status );
				}
			}
		}
		xhttp.open("POST", "/csign/cmpGate.jsp", true);
		xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=utf-8');
		xhttp.send( "org=yessign&actions=status"+"&tid="+(++cmpTID) );
	}

	function waitAndRecv(resolved, rejected, startTime)  {
		var xhttp = createXhttp();

		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4 ) {
				if( xhttp.status == 200 ) {
					var resp = JSON.parse( xhttp.responseText );
					if( resp.status == "accepted" || resp.status == "idle" ) {
						//이상 상태. 중지
						rejected("Invalid status("+resp.status+")");
					} else if( resp.status == "busy" ) {
						//이상 상태. 중지
						rejected("Invalid status("+resp.status+")");
					} else if( resp.status == "ready" || resp.status == "op" ) {
						//아직 메시지 전송중
						setTimeout( function() {
							waitAndRecv(resolved, rejected, startTime);
						}, 3000);
					} else if( resp.status == "done" ) {
						//정상
						resolved( resp.data );
					} else {
						//이상 상태. 중지
						rejected("Invalid status("+resp.status+")");
					}
				} else {
					rejected( "Response status : "+xhttp.status );
				}
			}
		};

		xhttp.open("POST", "/csign/cmpGate.jsp", true);
		xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=utf-8');
		xhttp.send( "actions=status"+"&tid="+(++cmpTID) );
	}


	baseNS.cmpGateService = function(request) {
		if( typeof request === "string" ) {
			request = JSON.parse( request );
		}
		var xhttp = createXhttp();

		var onRecv = function(data) {
			var resp = JSON.parse( xhttp.responseText );
			resp.method = "onExternalCallback";
			resp.callbackIdx = request.callbackIdx;
			resp.data = data;
			callXWC( resp );
		}

		var onReject = function(err) {
			var resp = JSON.parse( xhttp.responseText );
			resp.method = "onExternalCallback";
			resp.callbackIdx = request.callbackIdx;
			resp.error = err;
			callXWC( resp );
		}

		var openAndNextStep = function() {
			xhttp.onreadystatechange = function() {
				if (xhttp.readyState == 4 ) {
					if( xhttp.status == 200 ) {
						var resp = JSON.parse( xhttp.responseText );
						if( resp.status == "accepted" || resp.status == "idle" ) {
							waitAndRecv( onRecv, onReject, new Date().getTime() );
						} else if( resp.status == "busy" ) {
							//이상 상태. 중지
							onReject("Invalid status("+resp.status+")");
						} else if( resp.status == "ready" || resp.status == "op" ) {
							//이상 상태. 중지
							onReject("Invalid status("+resp.status+")");
						} else if( resp.status == "done" ) {
							//이상 상태. 중지
							onReject("Invalid status("+resp.status+")");
						}
					} else {
						onReject( "invalid http status : "+xhttp.status );
					}
				}
			};

			xhttp.open("POST", "/csign/cmpGate.jsp", true);
			xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=utf-8');
			var postData = "&tid="+(++cmpTID);
			for(key in request) {
				if( key !== "callbackIdx" && key !== "method" )
					postData += "&" + key +"="+ encodeURIComponent( request[key] );
			}
			postData = postData.substring(1);
			xhttp.send( postData );
		}

		openCmpGateSession(openAndNextStep, onReject)
	}

	getLogger("onLoaded").log("XWC Adapter Initialized");

}) (window);
