<%@ page language="java" pageEncoding="utf-8"%>
<%@ page import="java.io.*, java.net.*, java.nio.charset.*, java.security.*, java.security.cert.*, java.util.*, javax.net.ssl.*"%>
<%@ page session="false" %>
<%!
	static SSLContext custSSLCtx = null;
	static {
		//SSLContext
		try {
			TrustManager[] certs = new TrustManager[] {
				new X509TrustManager() {
					@Override
	                public X509Certificate[] getAcceptedIssuers() {
	                    return null;
	                }
					@Override
	                public void checkServerTrusted(X509Certificate[] chain, String authType) throws CertificateException {}
					@Override
	                public void checkClientTrusted(X509Certificate[] chain, String authType) throws CertificateException {}
	            }
			};
			custSSLCtx = SSLContext.getInstance("SSL");
			custSSLCtx.init(null, certs, new SecureRandom());
			//HttpsURLConnection.setDefaultSSLSocketFactory(sslCtx.getSocketFactory());
		} catch(Throwable th) {
			throw new RuntimeException();
		}
	}

	private static String getDataString(Map<String, String> params, String encode) throws UnsupportedEncodingException{
	    StringBuilder result = new StringBuilder();
	    boolean first = true;
	    for(Map.Entry<String, String> entry : params.entrySet()){
	        if (first)
	            first = false;
	        else
	            result.append("&");
	        result.append(URLEncoder.encode(entry.getKey(), encode));
	        result.append("=");
	        result.append(URLEncoder.encode(entry.getValue(), encode));
	    }
	    return result.toString();
	}

	private static byte[] post(String uri, HashMap data, String encode) throws IOException {
		String urlParameters = getDataString( data, encode );
		byte[] postData = urlParameters.getBytes( StandardCharsets.UTF_8 );
		int postDataLength = postData.length;
		URL url = new URL( uri );
		HttpsURLConnection conn= (HttpsURLConnection) url.openConnection();
		conn.setSSLSocketFactory( custSSLCtx.getSocketFactory() );

		conn.setDoOutput(true);
		conn.setInstanceFollowRedirects(false);
		conn.setRequestProperty("User-Agent", "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0))");
		conn.setRequestMethod("POST");
		conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
		conn.setRequestProperty("charset", "utf-8");
		conn.setRequestProperty("Content-Length", Integer.toString(postDataLength ));
		conn.setUseCaches(false);
		try(DataOutputStream wr = new DataOutputStream(conn.getOutputStream())) {
		   wr.write( postData );
		   wr.flush();
		   wr.close();
		}
		InputStream is = conn.getInputStream();
        ByteArrayOutputStream buffer = new ByteArrayOutputStream();
        int nRead;
        byte[] bytes = new byte[16384];
        while ((nRead = is.read(bytes, 0, bytes.length)) != -1) {
          buffer.write(bytes, 0, nRead);
        }
        return buffer.toByteArray();
	}
%>
<%
    if( "20".equals(request.getParameter("reqcode")) ) {
        HashMap map = new HashMap();
        map.put("menuNum", request.getParameter("menuNum") );
        map.put("reqcode", request.getParameter("reqcode"));
        map.put("cacode", request.getParameter("cacode"));
        map.put("certpolicy", request.getParameter("certpolicy"));
        map.put("regno", request.getParameter("regno"));
        map.put("userid", request.getParameter("userid"));
        map.put("detailname", request.getParameter("detailname"));
        map.put("usermail", request.getParameter("usermail"));
        map.put("ra_system", request.getParameter("ra_system"));
        String index = new String(post("https://demo.initech.com:8511/initech/demo/pc/crossweb_ex_web6/cert_center_public/issue_result.jsp", map, "euc-kr"), "utf-8");
        out.write( index );
        return;
    } else if( "28".equals(request.getParameter("reqcode")) ) {
        HashMap map = new HashMap();
        map.put("menuNum", request.getParameter("menuNum") );
        map.put("reqcode", request.getParameter("reqcode"));
        map.put("cacode", request.getParameter("cacode"));
        map.put("certpolicy", request.getParameter("certpolicy"));
        map.put("regno", request.getParameter("regno"));
        map.put("userid", request.getParameter("userid"));
        map.put("detailname", request.getParameter("detailname"));
        map.put("usermail", request.getParameter("usermail"));
        map.put("ra_system", request.getParameter("ra_system"));
        String index = new String(post("https://demo.initech.com:8511/initech/demo/pc/crossweb_ex_web6/cert_center_public/renew_result.jsp", map, "euc-kr"), "utf-8");
        out.write( index );
        return;
    } //폐지
%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        h2 {margin-bottom:0px; margin-top:0px}
        .json_data {width:100%}
        .storage {width:100px}
        td {border:1px solid #333333; overflow:hidden;}
        .subjectCN {}
        .afterDate {width:100px}
        .sstorage {width:50px}
        .removeBtns {width:150px}
    </style>
    <script src="3rdparty/jquery-3.3.1.min.js"></script>
    <link rel="stylesheet" type="text/css" href="3rdparty/jquery-ui-git.css">
    <script src="3rdparty/jquery-ui-git.js"></script>

    <script type='text/javascript'>
    window['TouchEnNxConfig'] = {'path':{'base':'../../../..'}, 'installPage':{}};
    window['nxbasepath'] = "/raonnx";
    window['TOUCHENEX_UTIL'] = {
    	isWin : function(){},
    	isSafari : function(){},
    	isIE : function() { return navigator.userAgent.toLowerCase().indexOf("msie") != -1; },
    	getBrowserVer : function(){},
    	isMobile : function(){}
    };
    /*
    var KSBizConfig = {
        yessignOpenCertUse:true,
        yessignOpenCertInfo : {opencertUrl:"https://fidoweb.yessign.or.kr:3100/v2/opencert.js", relayUrl:"https://fidoweb.yessign.or.kr:3100/v2/relay.js"},
        html5saveCertDomain : "https://bizdev.raonsecure.co.kr:8446",
        html5saveCertUrl : "/raonnx/ksbiz/cxsign/engine/wpki.html"
    };
    */
    </script>
    <!-- 위 주석코드 KSBizConfig.js 에서 parent 를 찾아가도록 하는 구문 때문에 충돌 -->
    <script type="text/javascript" src="../../../js/ksbiz_config.js"></script>

    <script src="../../crossXWC.js"></script>
    <script src="jumin.js"></script>
    <script>
        if( localStorage['firebug'] == "true" ) {
            //console.log("tes....");
            document.write('\x3Cscript type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/firebug-lite/1.4.0/firebug-lite.js">\x3C/script>');
            setTimeout( function() {
                Firebug.chrome.open(); //close, trigger
            }, 1500);
        }
        function triggerFirebug() {
            if( localStorage['firebug'] != "true" ) localStorage['firebug'] = "true";
            else localStorage['firebug'] = "false";
            location.reload();
        }

        $(document).ready(function() {
            $("#optMethod").change( function() {
                $("#optJSON").val( getOption($(this).val()) );
            });
        });
        
    </script>
    <script>

    function getOption(func) {
        var opt = localStorage['opt_'+func];
        if( opt == null ) {
            if( func == "loadCertList" ) {
                opt = '"options" : {"disableExpireFilter":true, "disableYessignCertSync":true}';
            } else if( func == "sign" ) {
                opt = '"options" : {"resetCertificate":true, "signAlgorithm":"preferRsaPSS", "dataType":"strings", "multiSign":false, "multiSignDelimiter":"", "format":"", "signedAttribute":""}';
            } else if( func == "updateCert" ) {
                opt = '"options" : {"disableYessignCertSync":true}';
            }
        }
        return opt;
    }

    function resetOption(func) {
        delete localStorage['opt_'+func];
    }

    function setOption(func, val) {
        localStorage['opt_'+func] = val;
    }

    function mapAndExec( func, event ) {
        if( event.ctrlKey ) {
            $("#optMethod").val( func );
            $("#optMethod").change();
            $("#optdialog").dialog({title:"request option wrap", resizable: true,height: "auto",width: 600,modal: true,
                buttons: {
                    "OK": function() {
                        setOption(func, $("#optJSON").val());
                        $( this ).dialog( "close" );
                    },
                    "CANCEL": function() {
                        $( this ).dialog( "close" );
                    },
                    "RESET": function() {
                        resetOption(func);
                        $("#optMethod").change();
                    }
                }
            });
            return;
        }

        var opt = getOption(func);
        if( opt != null && opt.trim() != "" ) opt = "\n\t,"+opt;

        var inputJson;
        if( func == "PING" ) { inputJson =
'{ \n\
    "method" : "PING",  \n\
    "request": { \n\
        "forceEngineOptions" : { \n\
            "logLevel" : "0",  \n\
            "enableExpStoratge" : "true", \n\
            "yessignOpenCertInfo": {"apikey":"gp+M6OtduOza8bfEi46xj3QVDFsgy+qDChqjRp1k/7Ma6nL8MERyWhABBsVFpYskn8oqTP2xMV8k/mKjqIOassZbt3GGbIpYXvfzsw==", "FO_MODE":true} \n\
        }@{opt} \n\
    } \n\
}';
        } else if( func == "loadCertList" ) { inputJson =
'{ \n\
    "method" : "loadCertList", \n\
    "request": { \n\
        "storage": "@{arguments[2]}"@{opt} \n\
    } \n\
}';
        } else if( func == "loadCertInfo" ) { inputJson =
'{ \n\
    "method" : "loadCertInfo", \n\
    "request": { \n\
        "storage": "@{arguments[2]}", \n\
        "cid": "@{arguments[3]}"@{opt} \n\
    } \n\
}';
        } else if( func == "removeCert" ) { inputJson =
'{ \n\
    "method" : "removeCert", \n\
    "request": { \n\
        "storage": "@{arguments[2]}", \n\
        "cid": "@{arguments[3]}", \n\
        "crdt": "@{arguments[4]}"@{opt} \n\
    } \n\
}';
        } else if( func == "changePassword" ) { inputJson =
'{ \n\
    "method" : "changePassword", \n\
    "request": { \n\
        "storage": "@{arguments[2]}", \n\
        "cid": "@{arguments[3]}", \n\
        "crdt": "@{arguments[4]}", \n\
        "newCrdt": "@{arguments[5]}"@{opt} \n\
    } \n\
}';
        } else if( func == "importCertFromData" ) { inputJson =
'{ \n\
    "method" : "importCertFromData", \n\
    "request": { \n\
        "storage": "@{arguments[2]}", \n\
        "type": "@{arguments[3]}", \n\
        "b64data": "@{arguments[4]}", \n\
        "crdt": "@{arguments[5]}"@{opt} \n\
    } \n\
}';
        } else if( func == "exportCert" ) { inputJson =
'{ \n\
    "method" : "exportCert", \n\
    "request": { \n\
        "storage": "@{arguments[2]}", \n\
        "type" : "@{arguments[3]}", \n\
        "cid" : "@{arguments[4]}", \n\
        "crdt" : "@{arguments[5]}"@{opt} \n\
    } \n\
}';
        } else if( func == "sign" ) { inputJson =
'{ \n\
    "method" : "sign", \n\
    "request": { \n\
        "storage": "@{arguments[2]}", \n\
        "cid" : "@{arguments[3]}", \n\
        "crdt" : "@{arguments[4]}", \n\
        "data" : "@{arguments[5]}"@{opt} \n\
    } \n\
}';
        } else if( func == "issueCert" ) { inputJson =
'{ \n\
    "method" : "issueCert", \n\
    "request": { \n\
        "storage": "@{arguments[2]}", \n\
        "orgName" : "@{arguments[3]}", \n\
        "cmpUrl" : "@{arguments[4]}", \n\
        "refnum" : "@{arguments[5]}", \n\
        "authcode" : "@{arguments[6]}", \n\
        "crdt" : "@{arguments[7]}"@{opt} \n\
    } \n\
}';
        } else if( func == "updateCert" ) { inputJson =
'{ \n\
    "method" : "updateCert", \n\
    "request": { \n\
        "storage": "@{arguments[2]}", \n\
        "orgName" : "@{arguments[3]}", \n\
        "cmpUrl" : "@{arguments[4]}", \n\
        "cid" : "@{arguments[5]}", \n\
        "crdt" : "@{arguments[6]}", \n\
        "newCrdt" : "@{arguments[7]}"@{opt} \n\
    } \n\
}';
        } else if( func == "copyBrowserCert" ) { inputJson =
'{ \n\
    "method" : "copyBrowserCert", \n\
    "request": { \n\
        "storage": "@{arguments[2]}", \n\
        "cid" : "@{arguments[3]}", \n\
        "crdt" : "@{arguments[4]}"@{opt} \n\
    } \n\
}';
        } else if( func == "setYessignCloudOptions" ) { inputJson =
'{ \n\
	"method" : "setYessignCloudOptions", \n\
	"request": { \n\
		"@{arguments[2]}": { \n\
			listCloudOption : @{arguments[3]}, \n\
			loadSyncDisabled : false, \n\
			loadCloudOption : @{arguments[4]}, \n\
			saveCloudOption : @{arguments[5]} \n\
		}@{opt} \n\
	} \n\
}';
        }

		for(var i=2;i<=7;i++) {
			inputJson = inputJson.replace("@{arguments["+i+"]}", arguments[i] );
        }
        inputJson = inputJson.replace("@{opt}", opt );
		
        $("#req_json").val( inputJson );
        if( event.shiftKey ) {
            execute();
        }
    }

    function getRegHistory() {
        var rhs = localStorage['registHistory'];
        if( !rhs ) {
            return {};
        }
        return JSON.parse( rhs );
    }

    function setRegHistory(data) {
        localStorage['registHistory'] = JSON.stringify(data);
    }

    function execute() {
        $("#resp_json").val("");
        var preRequest = JSON.parse( $("#req_json").val() );
        if( preRequest.request.crdt == "" || preRequest.request.newCrdt == "" ) {
            alert("CRDT is null");
            return;
        }
        console.log( preRequest );
        XWC [preRequest.method] ( preRequest.request, function(resp) {
            $("#resp_json").val( JSON.stringify(resp, null, 2 ) );

            //certList test
            /*
            subjectCN
            org
            cpoid
            beforeDate
            afterDate
            //extend
            subjectDN
            issuerDN
            source
            */

            if( preRequest.method == "loadCertList" ) {
                $("#cidList").empty();
                $("#certList tbody").empty();
                document.querySelector("#certList th:first-child").innerText = "cid ("+resp.certSets.length+")";
                var remove = function(elem, removeLocal, removeRemote) {
                    var id = $(elem).closest("tr").find("td input").val();
                    var request = {storage:"browser2", cid:id, testMode:true, removeLocal:removeLocal, removeRemote:removeRemote};
                    console.log("Remove : ",id);
                    XWC.removeCert( request, function(result) {
                        alert("삭제 완료\n요청: "+removeLabel(request)+"\n결과: "+removeLabel(result));
                    }, function(cause) {
                        console.log( cause );
                        alert("삭제 실패\n요청: "+removeLabel(request)+"\n결과: "+JSON.stringify(cause));
                    } );
                }
                var removeLabel = function(r) { var a = r.removeLocal?"로컬삭제 ":""; a+=r.removeRemote?"공동저장소삭제":""; return a; }
                var hist = getRegHistory();
                var nHist = {};
                for( var i=0; i<resp.certSets.length; i++ ) {
                    var set = resp.certSets[i];
                    for( key in hist ) {
                        if( hist[key].cid == set.cid || set.subjectCN.indexOf(key) == 0 ) {
                            nHist[key] = hist[key];
                            nHist[key].cid = set.cid; //source 가 달라지게 되면 cid 는 fingerprint가 될테니
                            break;
                        }
                    }

                    $("#cidList").append( $("<option>").val(set.cid) );
                    var removeLocal = $("<button>").text("로컬").click( function() {remove(this,true,false);});
                    var removeRemote = $("<button>").text("원격").click( function() {remove(this,false,true);});
                    var removeBoth = $("<button>").text("모두").click( function() {remove(this,true,true);});
                    var tr = $("<tr>")
                    .append( $("<td>").append(  $("<input type='text' style='width:440px'>").val(set.cid).click(function() { $(this).select();})   ) )
                    .append( $("<td>").text(set.subjectCN) )
                    .append( $("<td>").text(set.beforeDate) )
                    .append( $("<td>").text(set.afterDate) )
                    .append( $("<td>").text(set.source) )
                    .append( $("<td>").append( removeLocal ).append( removeRemote ).append( removeBoth ) );
                    $("#certList tbody").append( tr );
                }
                setRegHistory( nHist );
                //$("#sync_log").val( XWCCore.getBrowser2SyncInfo().join("\n") );
            } else if( preRequest.method == "issueCert" ) {
                var hist = getRegHistory();
                registData.cid = resp.cid;
                hist[ $("#detailname").val() ] = registData;
                setRegHistory( hist );
            } else if( preRequest.method == "updateCert" ) {
                var hist = getRegHistory();
                delete hist[ $("#detailname").val() ];
                setRegHistory( hist );
            }
        }, function(e) {
            console.log( e );
            $("#resp_json").val( JSON.stringify(e) );
        } );

    }

    function downloadPFX() {
        var data = JSON.parse( $("#resp_json").val() );
        if( data && data.data && data.data.filedata ) {
            data = data.data
        } else {
            alert("exportCert 가 먼저 실행되지 않았거나 실패함");
            return;
        }
        var element = document.createElement('a');
        element.setAttribute('href', 'data:application/octet-stream;base64,' + data.filedata);
        element.setAttribute('download', data.filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        setTimeout( function() {document.body.removeChild(element);}, 5000 );
    }

    var cxUtil = {
        dragsFileToBuffer : function(file, callback) {
            var reader = new FileReader();
            var loadedBuffer = new Uint8Array();
            if( file.size > 99999 ) {
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
        }
    };
	$(document).ready( function() {
	    var callback = function( result ) {
	        $("#importCert_type").val( result.type );
	        $("#importCert_data").val( result.b64data );
	    };
	    $("#importCert_files").off("change").on("change", function(e){
            var files = $(this)[0].files;
            if(files.length == 1){
                // 확장자 체크
                if(files[0].name.toLowerCase().endsWith(".pfx") || files[0].name.toLowerCase().endsWith(".p12")){
                    cxUtil.dragsFileToBuffer(files[0], function(buf){
                        var bufB64 = cxUtil.Uint8ToBase64(buf);
                        callback({"type": "p12", "b64data": bufB64});
                    });
                } else {
                    alert("파일 한개는 .pfx 또는 .p12만 가능");
                }
            } else if(files.length == 2){
                var chkder = false;
                var chkkey = false;
                var fileDer = {};
                var fileKey = {};
                for (var i = 0; i < files.length; i++) {
                    var f = files[i];
                    if(f.name.toLowerCase() == "signcert.der") {
                        fileDer = f;
                        chkder = true;
                    }
                    if(f.name.toLowerCase() == "signpri.key") {
                        fileKey = f;
                        chkkey = true;
                    }
                }
                if(chkder && chkkey){
                    cxUtil.dragsFileToBuffer(fileDer, function(buf0){
                        var derB64 = cxUtil.Uint8ToBase64(buf0);
                        cxUtil.dragsFileToBuffer(fileKey, function(buf1){
                            var keyB64 = cxUtil.Uint8ToBase64(buf1);
                            callback({"type": "cert", "b64data": derB64 + "__BIZ__" + keyB64});
                        });
                    });
                } else {
                    alert(".der .key 쌍 파일만");
                }
            } else if(files.length == 4){
                var gpki = {}, kmcert = {};
                for(var i = 0; i < files.length; i++){
                    var f = files[i];
                    if(f.name.toLowerCase().endsWith("_sig.cer")) {
                        gpki.sigCert = true;
                        gpki.sigCertFile = f.name.replace("_sig.cer","");
                        gpki.sigCertObj = f;
                    } else if(f.name.toLowerCase().endsWith("_sig.key")) {
                        gpki.sigKey = true;
                        gpki.sigKeyFile = f.name.replace("_sig.key","");
                        gpki.sigKeyObj = f;
                    } else if(f.name.toLowerCase().endsWith("_env.cer")) {
                        gpki.envCert = true;
                        gpki.envCertFile = f.name.replace("_env.cer","");
                        gpki.envCertObj = f;
                    } else if(f.name.toLowerCase().endsWith("_env.key")) {
                        gpki.envKey = true;
                        gpki.envKeyFile = f.name.replace("_env.key","");
                        gpki.envKeyObj = f;
                    } else if(f.name.toLowerCase() == "signcert.der") {
                        kmcert.signCert = true;
                        kmcert.signCertObj = f;
                    } else if(f.name.toLowerCase() == "signpri.key") {
                        kmcert.signPri = true;
                        kmcert.signPriObj = f;
                    } else if(f.name.toLowerCase() == "kmcert.der") {
                        kmcert.kmCert = true;
                        kmcert.kmCertObj = f;
                    } else if(f.name.toLowerCase() == "kmpri.key") {
                        kmcert.kmPri = true;
                        kmcert.kmPriObj = f;
                    }
                }
                var certFile = [];
                if(gpki.sigCert && gpki.sigKey && gpki.envCert && gpki.envKey){
                    if(gpki.sigCertFile == gpki.sigKeyFile
                        && gpki.sigKeyFile == gpki.envCertFile
                        && gpki.envCertFile == gpki.envKeyFile){
                        certFile.push(gpki.sigCertObj);
                        certFile.push(gpki.sigKeyObj);
                        certFile.push(gpki.envCertObj);
                        certFile.push(gpki.envKeyObj);
                        certFile.push("gpki");
                    }
                } else if(kmcert.signCert && kmcert.signPri && kmcert.kmCert && kmcert.kmPri){
                    certFile.push(kmcert.signCertObj);
                    certFile.push(kmcert.signPriObj);
                    certFile.push(kmcert.kmCertObj);
                    certFile.push(kmcert.kmPriObj);
                    certFile.push("kmcert");
                }
                if(certFile.length >= 4){
                    cxUtil.dragsFileToBuffer(certFile[0], function(buf0){
                        var signCertB64 = cxUtil.Uint8ToBase64(buf0);
                        cxUtil.dragsFileToBuffer(certFile[1], function(buf1){
                            var signKeyB64 = cxUtil.Uint8ToBase64(buf1);
                            cxUtil.dragsFileToBuffer(certFile[2], function(buf2){
                                var envCertB64 = cxUtil.Uint8ToBase64(buf2);
                                cxUtil.dragsFileToBuffer(certFile[3], function(buf3){
                                    var envKeyB64 = cxUtil.Uint8ToBase64(buf3);
                                    if(signCertB64 && signKeyB64 && envCertB64 && envKeyB64){
                                        if(certFile[4] != "undefined"){
                                            callback({"type": "cert", "b64data": signCertB64 + "__BIZ__" + signKeyB64 + "__BIZ__" + envCertB64 + "__BIZ__" + envKeyB64, "certtype": certFile[4]});
                                        } else {
                                            callback({"type": "cert", "b64data": signCertB64 + "__BIZ__" + signKeyB64 + "__BIZ__" + envCertB64 + "__BIZ__" + envKeyB64});
                                        }
                                    } else {
                                        alert("파일 이상");
                                    }
                                });
                            });
                        });
                    });
                } else {
                    alert("파일 이상");
                }
            } else {
                alert("파일 이상");
            }

        });

        $("#readForm").submit(function(e) {
            var form = $(this);
            var url = form.attr('action');
            $.ajax({
                type: "POST",
                url: url,
                data: form.serialize(),
                complete : function() { $("#acdialog").dialog( "close" ); },
                success: function(data) {
                    var ht = $.parseHTML(data);
                    if( $("[name=reqcode]").val() == "20" ) {
                        var refnum = $(ht).find("td.text-left").eq(0).text();
                        var authcode = $(ht).find("td.text-left").eq(1).text();
                        if( refnum.length <= 3 ) {
                            alert("오류 : "+refnum+" : "+authcode);
                            return;
                        } else {
                            $("#issueCert_refnum").val(refnum);
                            $("#issueCert_authcode").val(authcode);
                        }
                    } else {

                    }

                },
             });
             e.preventDefault(); // avoid to execute the actual submit of the form.
        });
	} );


    var registData = {};
	function acRegist() {
	    $("#detailname")[0].oninput = null;
	    $("#registList").empty();
	    var jum = jumin()[0];
	    $("[name=reqcode]").val( "20" );
	    $("#regno").val( jum );
	    $("#userid").val( "T"+jum );
	    $("#detailname").val( "홍길동"+jum.substring(0,2)+jum.substring( jum.length-2, jum.length )+"(HONG)" );
        $("#acdialog").dialog({resizable: false,height: "auto",width: 600,modal: true,
            buttons: {
                "참인발급": function() {
                    registData = {cacode:$("[name=cacode]").val(), certpolicy:$("[name=certpolicy]").val(), regno:$("#regno").val(), userid:$("#userid").val(), usermail:$("#usermail").val()};
                    $("#readForm").submit();
                },
                "취소": function() {
                    $( this ).dialog( "close" );
                }
            }
        });
	}

	function acUpdate() {
	    var hist = getRegHistory();
	    $("#detailname")[0].oninput = function() {
	        var d = hist[ $("#detailname").val() ];
	        if( d ) {
	            $("#updateCert_cid").val( d.cid );
	            $("[name=cacode]").val( d.cacode );
	            $("[name=certpolicy]").val( d.certpolicy );
	            $("#regno").val( d.regno );
	            $("#userid").val( d.userid );
	            $("#usermail").val( d.usermail );
	        }
	    }
	    $("#registList").empty();
	    for( key in hist ) $("#registList").append( $("<option>").val(key) );

        $("[name=reqcode]").val( "28" );
        $("#regno").val( "" );
        $("#userid").val( "" );
        $("#detailname").val( "" );
        $("#acdialog").dialog({resizable: false,height: "auto",width: 600,modal: true,
            buttons: {
                "갱신등록": function() {
                    $("#readForm").submit();
                },
                "취소": function() {
                    $( this ).dialog( "close" );
                }
            }
        });
    }

    function SF_POPUP() {
        var win = window.open("http://redirecturl.com#tab");
        alert( win );
    }
    </script>
</head>
<body>
<div style="display:table;text-align : center;width:100%;">
    <div style="display:table-cell;padding: 5px;">
    <h2>
        Request &nbsp;&nbsp;<button onclick="execute()">Execute</button>
    </h2>
    <textarea id="req_json" rows="10" class="json_data"></textarea>
    </div>

    <div style="display:table-cell;padding: 5px;">
    <h2>
        Response &nbsp;&nbsp;<button onclick="$('#resp_json').val('')">Clear</button>
    </h2>
    <textarea id="resp_json" rows="10" class="json_data"></textarea>
    </div>
</div>


<div style="width:100%; height:200px; border:1px solid; overflow-y:auto">
    <table id="certList">
        <thead>
            <tr>
                <th class="fph" style="width:450px">cid</th>
                <th class="subjectCN">subjectCN</th>
                <th class="notAfter">beforeDate</th>
                <th class="notAfter">afterDate</th>
                <th class="sstorage">저장소</th>
                <th class="removeBtns">강제삭제</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
</div>

<hr>
<h5>
    Funcs <button onclick="javascript:alert(XWCCore.getBrowser2SyncInfo())">SyncLog</button> <button onclick="javascript:triggerFirebug()">firebug</button> <button onclick='$("input[placeholder=crdt],input[placeholder=newCrdt]").val("q")'>CRDT Q</button>
</h5>

<datalist id="storages">
    <option value="browser">
    <option value="browser2">
    <option value="kftc_browser">
</datalist>

<datalist id="importType">
    <option value="cert">
    <option value="p12">
</datalist>

<datalist id="cidList">
</datalist>

<button onclick="SF_POPUP()">SF POPUP</button> <p>
<button onclick="mapAndExec( $(this).text(), event)">loadEngine</button> <p>
<button onclick="mapAndExec( $(this).text(), event, $('#loadCertList_storage').val() )">PING</button> <p>
<button onclick="mapAndExec( $(this).text(), event, $('#loadCertList_storage').val() )">loadCertList</button> <input type="text" id="loadCertList_storage" list="storages" class="storage" value="browser2" placeholder="storage"> <p>
<button onclick="mapAndExec( $(this).text(), event, $('#loadCertInfo_storage').val(), $('#loadCertInfo_cid').val() )">loadCertInfo</button> <input type="text" id="loadCertInfo_storage" list="storages" class="storage" value="browser2" placeholder="storage"> <input type="text" class="cid" id="loadCertInfo_cid" list="cidList" placeholder="cid"> <p>
<button onclick="mapAndExec( $(this).text(), event, $('#removeCert_storage').val(), $('#removeCert_cid').val()  )">removeCert</button> <input type="text" id="removeCert_storage" list="storages" class="storage" value="browser2" placeholder="storage">  <input type="text" class="cid" id="removeCert_cid" list="cidList" placeholder="cid">  <p>
<button onclick="mapAndExec( $(this).text(), event, $('#updateCertCredential_storage').val(), $('#updateCertCredential_cid').val(), $('#updateCertCredential_crdt').val(), $('#updateCertCredential_newCrdt').val()  )">changePassword</button> <input type="text" id="updateCertCredential_storage" list="storages" class="storage" value="browser2" placeholder="storage">  <input type="text" class="cid" id="updateCertCredential_cid" list="cidList" placeholder="cid"> <input type="text" class="crdt" id="updateCertCredential_crdt" placeholder="crdt"> <input type="text" class="crdt" id="updateCertCredential_newCrdt" placeholder="crdt"> <p>
<button onclick="mapAndExec( $(this).text(), event, $('#importCert_storage').val(), $('#importCert_type').val(), $('#importCert_data').val(), $('#importCert_crdt').val() )">importCertFromData</button> <input type="text" id="importCert_storage" list="storages" class="storage" value="browser2" placeholder="storage"> <input type="text" id="importCert_type" list="importType" value="cert" placeholder="cert or p12"> <input type="text" id="importCert_data" value="" placeholder="Base64data (delim:__BIZ__)"> <input type="text" class="crdt" id="importCert_crdt" placeholder="crdt"> <input type="file" id="importCert_files" multiple> <p>
<button onclick="mapAndExec( $(this).text(), event, $('#exportCert_storage').val(), $('#exportCert_type').val(), $('#exportCert_cid').val(), $('#exportCert_crdt').val() )">exportCert</button> <input type="text" id="exportCert_storage" list="storages" class="storage" value="browser2" placeholder="storage"> <input type="text" id="exportCert_type" value="pkcs12" placeholder="raw or pkcs12"> <input type="text" class="cid" id="exportCert_cid" list="cidList" placeholder="cid"> <input type="text" class="crdt" id="exportCert_crdt" placeholder="crdt"> <button onclick="downloadPFX()">결과 PFX 저장</button> <p>
<button onclick="mapAndExec( $(this).text(), event, $('#sign_storage').val(), $('#sign_cid').val(), $('#sign_crdt').val(), $('#sign_data').val() )">sign</button> <input type="text" id="sign_storage" list="storages" class="storage" value="browser2" placeholder="storage"> <input type="text" class="cid" id="sign_cid" list="cidList" placeholder="cid"> <input type="text" class="crdt" id="sign_crdt" placeholder="crdt"> <input type="text" class="cid" id="sign_data" value="plaintext1234567890abcdefghijklmnopqrstuvwxyz한글!@#$%^&*()_+|[]{}<>" placeholder="data"> <p>
<button onclick="mapAndExec( $(this).text(), event, $('#issueCert_storage').val(), $('#issueCert_org').val(), $('#issueCert_url').val(), $('#issueCert_refnum').val(), $('#issueCert_authcode').val(), $('#issueCert_crdt').val()  )">issueCert</button> <button onclick="acRegist()">참인발급</button> <input type="text" id="issueCert_storage" list="storages" class="storage" value="browser2" placeholder="storage"> <input type="text" id="issueCert_org" value="yessign" placeholder="org"> <input type="text" id="issueCert_url" value="https://fidoweb.yessign.or.kr:4512/cmp" placeholder="url"> <input type="text" id="issueCert_refnum" placeholder="refnum"> <input type="text" id="issueCert_authcode" placeholder="authcode"> <input type="text" class="crdt" id="issueCert_crdt" placeholder="crdt"> <p>
<button onclick="mapAndExec( $(this).text(), event, $('#updateCert_storage').val(), $('#updateCert_org').val(), $('#updateCert_url').val(), $('#updateCert_cid').val(), $('#updateCert_crdt').val(), $('#updateCert_newCrdt').val()  )">updateCert</button> <button onclick="acUpdate()">갱신등록</button> <input type="text" id="updateCert_storage" list="storages" class="storage" value="browser2" placeholder="storage"> <input type="text" id="updateCert_org" value="yessign" placeholder="org"> <input type="text" id="updateCert_url" placeholder="url" value="https://fidoweb.yessign.or.kr:4512/cmp" > <input type="text" class="cid" id="updateCert_cid" list="cidList" placeholder="cid"> <input type="text" class="crdt" id="updateCert_crdt" placeholder="crdt"> <input type="text" class="crdt" id="updateCert_newCrdt" placeholder="newCrdt"> <p>
<button onclick="mapAndExec( $(this).text(), event, $('#copyBrowserCert_storage').val(), $('#copyBrowserCert_cid').val(), $('#copyBrowserCert_crdt').val()  )">copyBrowserCert</button>  <input type="text" id="copyBrowserCert_storage" list="storages" class="storage" value="browser2" placeholder="storage">  <input type="text" class="cid" id="copyBrowserCert_cid" list="cidList" placeholder="cid"> <input type="text" class="crdt" id="copyBrowserCert_crdt" placeholder="crdt">  <p>
<button onclick="mapAndExec( $(this).text(), event, $('#cloudOpt_method').val(), $('#cloudOpt_list').val(), $('#cloudOpt_load').val(), $('#cloudOpt_save').val()  )">setYessignCloudOptions</button> 
<select id='cloudOpt_method'>
  <option value='sign' selected="selected">sign</option>
  <option value='loadCertList'>loadCertList</option>
  <option value='removeCert'>removeCert</option>
  <option value='updateCertCredential'>updateCertCredential</option>
  <option value='exportCert'>exportCert</option>
  <option value='issueCert'>issueCert</option>
  <option value='updateCert'>updateCert</option>
</select>

<select id='cloudOpt_list'>
  <option value='null'>null</option>
  <option value='"{method:"tray"}"' selected="selected">tray</option>
  <option value='"{method:"window"}"'>window</option>
</select>

<select id='cloudOpt_load'>
  <option value='null'>null</option>
  <option value='"{method:"tray"}"' selected="selected">tray</option>
  <option value='"{method:"window"}"' >window</option>
</select>

<select id='cloudOpt_save' value='{method:"window"}'>
  <option value='null'>Select an option...</option>
  <option value='"{method:"tray"}"'>tray</option>
  <option value='"{method:"window"}"' selected="selected">window</option>
</select> <p>


<div id="optdialog" style="display:none">
    <table class="table">
        <colgroup>
            <col style="width:30%">
            <col style="">
        </colgroup>
        <tbody>
            <tr>
                <td>래핑함수</td>
                <td>
                    <select class="form-control" id="optMethod">
                        <option value="none" selected="selected">--NONE--</option>
                        <option value="loadCertList">loadCertList</option>
                        <option value="loadCertInfo">loadCertInfo</option>
                        <option value="removeCert">removeCert</option>
                        <option value="changePassword">changePassword</option>
                        <option value="importCertFromData">importCertFromData</option>
                        <option value="exportCert">exportCert</option>
                        <option value="sign">sign</option>
                        <option value="issueCert">issueCert</option>
                        <option value="updateCert">updateCert</option>
                        <option value="copyBrowserCert">copyBrowserCert</option>
                        <option value="setYessignCloudOption">setYessignCloudOption</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>JSON</td>
                <td>
                    <textarea rows=10 id="optJSON" style='width:420px'></textarea>
                </td>
            </tr>
        </tbody>
    </table>
</div>


<div id="acdialog" style="display:none">
<form id="readForm" name="readForm" action="./index.jsp" method="post">
    <input type="hidden" id="menuNum" name="menuNum">
    <input type="hidden" name="reqcode" value="20">
    <datalist id="registList">
    </datalist>
    <table class="table">
        <caption>공인인증서 발급을 위한 입력 항목, 입력 내용을 나타낸 표</caption>
        <colgroup>
            <col style="width:30%">
            <col style="">
        </colgroup>
        <thead>
            <tr>
                <th scope="col">입력 항목</th>
                <th scope="col">입력 내용</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>발급기관(CA)</td>
                <td>
                    <select class="form-control" name="cacode">
                        <option value="01">(01) 금융결제원(KFTC)</option>
                        <!-- <option value='03'>(03) 전자인증(CrossCert)</option> -->
                        <option value="04">(04) 코스콤(SignKorea)</option>
                        <option value="05">(05) 정보인증(SignGate)</option>
                        <option value="09">(09) 이니텍(INIPASS)</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>인증서 종류(정책)</td>
                <td>
                    <select class="form-control" name="certpolicy">
                        <option value="01">(01) 범용 개인인증서</option>
                        <option value="02">(02) 용도제한용 기업인증서</option>
                        <option value="04" selected="">(04) 용도제한용 개인인증서</option>
                        <option value="05">(05) 범용 기업인증서</option>
                        <option value="06">(06) 브라우저 개인 인증서</option>
                        <option value="07">(07) 브라우저 기업 인증서</option>
                        <option value="68">(68) 전자세금계산용인증서</option>
                        <option value="61">(61) 용도제한용 기업뱅킹 인증서</option>
                        <option value="81">(81) 범용 기업인증서 (INIPASS - 3개월)</option>
                </select>
                </td>
            </tr>
            <tr>
                <td>주민/사업자 번호</td>
                <td>
                    <input type="text" class="form-control" id="regno" name="regno" value="7500301103421">
                </td>
            </tr>
            <tr>
                <td>사용자 ID</td>
                <td>
                    <input type="text" title="" class="form-control" id="userid" name="userid" value="T7500301103421">
                </td>
            </tr>
            <tr>
                <td>이름/법인명</td>
                <td>
                    <input type="text" list="registList" class="form-control" id="detailname" name="detailname" value="홍길동(HONG)">
                </td>
            </tr>
            <tr>
                <td>전자우편(e-mail)</td>
                <td>
                    <input type="text" title="" class="form-control" id="usermail" name="usermail" value="gildong.hong@initech.com">
                </td>
            </tr>
            <tr>
                <td>RA 서버 선택</td>
                <td style="text-align:left" class="custom-control custom-radio">
<!-- 											<input type="radio" title="" class="form-control" name="ra_system" value="gateway_ra"> Gateway RA Server(2048) -->
                    <input type="radio" title="" class="ustom-control-input" name="ra_system" value="RA" checked=""> RA Server (2048)
                </td>
            </tr>
        </tbody>
    </table>
</form>
</div>

</body>
</html>