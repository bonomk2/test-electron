(function( win ) {
	var console = window.console || {log:function(){}};
	function log(where, message) {
		kslog("[xwckit.js]", "[" + where + "] " + message);
	}

	//Check duplicated
	if( win.XWC ) {
		log("global", "iCrossWin already loaded");
		return;
	}
	win.XWC = XWC = {};
	
	var CONST_DOMAIN = location.origin ? location.origin : location.protocol + "//" + location.host;
	//내보내기하기 위해 임시로..!! window환경

	if(TOUCHENEX_UTIL.isMobile()){
		var CONST_CXSIGN_URI = cxsignHome + "/theme/" + KSBizConfig.mobileTheme + "/ksbizpure.html";
	}else{
		var CONST_CXSIGN_URI = cxsignHome + "/theme/" + KSBizConfig.theme + "/ksbizpure.html";
	}
		
	function createIFrame( pageURL ) {
		//fixed div
		var iWinRoot = document.createElement("div");
		iWinRoot.setAttribute("id", "cxsignLayer");
		iWinRoot.style.cssText = "z-index:9999999; position: fixed; top: 0px; left:0px; right:0px; bottom:0px; margin:0px; padding:0px; width:100%; height:100%; display:none;";

		//iframe
		var ifrStr = "";
		ifrStr += "<iframe seamless allowTransparency='true' style='width:100%; height:100%; position: relative; border: 0px; margin:0px; padding:0px;";
		ifrStr += " id='cxsignIfr' name='cxsignIfr' ";
		ifrStr += "src='" + pageURL + "' ";
		ifrStr += "marginheight='0' marginwidth='0' frameborder='0'>";
		ifrStr += "</iframe>";
		iWinRoot.innerHTML = ifrStr;
		document.body.appendChild( iWinRoot );
	}

	function disposeIFrame() {
		document.body.removeChild( document.getElementById("cxsignLayer") );
	}

	function getIFrame() {
		return window.frames['cxsignIfr'];
	}

	function showIFrame() {
		var iWinRoot = document.getElementById("cxsignLayer");
		if( iWinRoot ) {
			iWinRoot.style.display = "";
		}
	}

	XWC.cxsign = function(data, callback) {
		// os/browser spec check
		if(!TOUCHENEX_UTIL.isMobile()){
			if(!KSbiz_SupportCheck()){
				kslog("XWC.cxsign.KSbiz_SupportCheck", false);
				TouchEnNx.processingbar(false); // 프로세스 처리바 종료
				return false;
			}
		}
		//init page
		createIFrame( CONST_DOMAIN + CONST_CXSIGN_URI );
		var onCallback = function( result, error) {
			disposeIFrame();
			callback( result, error );
		};

		XWC.showIFrame = function(){
			showIFrame();
		};

		XWC.onLoadedFrame = function() {
			// TODO policy value init.....
			var env = {
				reqTime : new Date().getTime(),
				policy : {Time: "2017-02-21 12:55:43", Nonce: "123456789", Action: "SignedData"}
			};
			var req = {
				env : env
			};
			if( typeof( data ) === "string" ) {
				req.plainText = data;
			} else {
				for( k in data ) {
					req[k] = data[k];
				}
			}
			//showIFrame();
			getIFrame().init.initConfig(req,onCallback);
		};

		
		var relayLoadScr = function(url, onJsLoaded){
			var newScript = document.createElement("script");
			newScript.type = "text/javascript";	
			try {
				newScript.onload = onJsLoaded;
				newScript.onreadystatechange = onJsLoaded;
				newScript.src = url;
				document.getElementsByTagName("head")[0].appendChild(newScript);
			} catch (e) {
				kslog("[xwckit.js]", "relayLoadScr error :: " + url);
			}
		};
		
		//var IS_SAFARI = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
			//			navigator.userAgent && navigator.userAgent.indexOf('CriOS') == -1 && navigator.userAgent.indexOf('FxiOS') == -1;
		if(KSBizConfig.yessignOpenCertUse && !(TOUCHENEX_UTIL.isIE() && TOUCHENEX_UTIL.getBrowserVer() < 11)){
			var corp = KSBizConfig.yessignOpenCertInfo.corpcode;
			var cDate = new Date();
			var dd = cDate.getDate();
			var mm = cDate.getMonth()+1;
			var today = cDate.getFullYear() + (mm<10?'0'+mm:mm) + (dd<10?'0'+dd:dd);
			var query = "?dt="+today+"&corp="+corp;

			if(typeof jQuery != "function"){
				relayLoadScr(cxsignHome + "/theme/assets/js/jquery-1.11.3.min.js", function(){
					relayLoadScr(KSBizConfig.yessignOpenCertInfo.relayUrl + query, function(){
						kslog("[xwckit.js]", "relay.js(jQuery) load success..");
					});
				});
			} else {
				relayLoadScr(KSBizConfig.yessignOpenCertInfo.relayUrl + query, function(){
					kslog("[xwckit.js]", "relay.js load success..");
				});
			}
		}
		
	};
	
}) ( window );
