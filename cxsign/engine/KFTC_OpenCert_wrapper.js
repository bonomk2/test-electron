/** 
 * wrapper case1 : Safari Ver < 12
 * wrapper case2 : IE11 problem
 */
(function() {
    var isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
                   navigator.userAgent &&
                   navigator.userAgent.indexOf('CriOS') == -1 &&
                   navigator.userAgent.indexOf('FxiOS') == -1;
    
    var wrapper;

	//금결원 클라우드 API에서 crypto를 wrapper하는 비정상적 문제로 crossmessage로 강제 호출
	isSafari = true;
    if( isSafari ) {
        function createCrossInvokeFunc(funcName) {
            return function() {
                var args = Array.prototype.slice.call(arguments);
				var cCall = {XWCMessage:true, method:funcName, args:args};
				var lastArg = args.pop();
				if( typeof(lastArg) === "function" ) {
					window.ksbiz_opencert_callback = lastArg;
				} else {
					window.ksbiz_opencert_callback = args.pop();
					args.push( lastArg );
				}
				////wpki.html
                doResponse( cCall );
            };
        }
        wrapper = {
            init : createCrossInvokeFunc("opencert_init"),
            mergeCertInfos : createCrossInvokeFunc("opencert_mergeCertInfos"),
            setPKCS12 : createCrossInvokeFunc("opencert_setPKCS12"),
            getPKCS12 : createCrossInvokeFunc("opencert_getPKCS12"),
            removePKCS12 : createCrossInvokeFunc("opencert_removePKCS12")
        }
    } else {
        var singletone;
        var cachedInited;
        function getKFTCFrame() {
            return document.getElementById("KFTC_OpenCert_frame");
        }
        function wrapFunc(funcName) {
            return function() {
                singletone[funcName].apply( singletone, arguments );
            }
        }
        wrapper = {
            init : function(apikey, callback) {
                if( window.isKFTCFrameLoaded ) {
                    callback( cachedInited );
                } else {
                    var iframe = getKFTCFrame();
                    iframe.onload = function() {
                        window.isKFTCFrameLoaded = true;
                        singletone = getKFTCFrame().contentWindow.OpenCert.getInstance();
                        singletone.init(apikey, function(res) {
                            cachedInited = res;
                            callback( res );
                        });
                    }
                    iframe.src = location.pathname.lastIndexOf("wpki.html") != -1 ? "KFTC_OpenCert.html" : "../KFTC_OpenCert.html";
                }
            },
            mergeCertInfos : wrapFunc("mergeCertInfos"),
            setPKCS12 : wrapFunc("setPKCS12"),
            getPKCS12 : wrapFunc("getPKCS12"),
            removePKCS12 : wrapFunc("removePKCS12")
        };
    }

	window.OpenCert = {
		getInstance : function() { return wrapper; }
	}
}) ();