/**
****************************************************
TouchEnNx_port_checker.js
****************************************************
| Version     작성자        수정일        변경사항 
 ---------  -------  -----------  ----------    
| v1.0.0.2    허혜림    2017.12.26      
| v1.0.0.1    백서린    2017.01.20      최초

****************************************************
 Copyright ⒞ RaonSecure Co., Ltd. 
 * 본 코드에 대한 모든 권한은 (주)라온시큐어 있으며 동의없이 사용/배포/가공할 수 없습니다.
****************************************************
**/

var isDebug = false;
var local_host = "wss://127.0.0.1";
var start_port = 34581;
var end_port;
var current_port;
var check_count = 3;

function cklog(str){
	if(isDebug) console.log("[exworker] " + str);
}

function wsPortScan(exwsParam) {
	isDebug = exwsParam.debug;
	cklog("isDebug :: " + isDebug);
	if(exwsParam.port)
		start_port = exwsParam.port;
	if(exwsParam.localhost)
		local_host = exwsParam.localhost;
	if(exwsParam.chkCnt)
		check_count = exwsParam.chkCnt;
	end_port = start_port + check_count;
	current_port = start_port;
	wsPortScanWorker();
}

function wsPortScanWorker() {
	if (current_port >= end_port) {
		postMessage("false");
		return;
	}
	try {
		cklog("connect :: " + local_host + ":" + current_port + "/");
		var ws = new WebSocket(local_host + ":" + current_port + "/");
		ws.onopen = function() {
			cklog("onopen");
			ws.send({});
		};
		ws.onmessage = function(event) {
			cklog("response :: " + event.data);
			ws.close();
			postMessage(current_port);
		};
		ws.onerror = function() {
			current_port++;
			wsPortScanWorker();
		};
		ws.onclose = function() {
			cklog("onclose");
		};
	} catch (e) {
		cklog("exception :: " + e);
		postMessage("false");
		return;
	}
}

self.addEventListener('message', function(e) {
	self.wsPortScan(e.data);
}, false);
