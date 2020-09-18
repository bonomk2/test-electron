// 채널 암호화에 사용할 알고리즘 (SEED-CBC)
var KSBizConfig = {
    lineServerURL : "../../raonnx/ksbiz/jsp/line.jsp",
    serverCert : "",
    cipherAlgorithm : "SEED-CBC",
    formName : "ksbizForm",
    channelEncryptEmptyData : "ksbizDummyData=123",
    version : "2,1,0,2640",
    CLSID : "B3AE9257-2649-43D9-87F0-96AFAFE6E12E",
    installPath : "../../raonnx/ksbiz/module/KSbiz.cab",
    serverCertUrl : "../../raonnx/ksbiz/jsp/servercert.jsp",
    serverCert : "-----BEGIN CERTIFICATE-----\nMIIDNjCCAh6gAwIBAgIJAO4t+//wr+SBMA0GCSqGSIb3DQEBBQUAMGcxCzAJBgNV\nBAYTAktSMR0wGwYDVQQKExRSYW9uU2VjdXJlIENvLiwgTHRkLjEaMBgGA1UECxMR\nUXVhbGl0eSBBc3N1cmFuY2UxHTAbBgNVBAMTFFJhb25TZWN1cmUgQ28uLCBMdGQu\nMB4XDTE3MDYyNjA0NDQxN1oXDTE4MDYyNjA0NDQxN1owMjELMAkGA1UEBhMCS1Ix\nEzARBgNVBAoMCnJhb25zZWN1cmUxDjAMBgNVBAMMBWtzYml6MIIBIjANBgkqhkiG\n9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyiW6+8/PNpVtE5mEGOSr5eYYLjK+Ay3QVxMi\n9ATXA6suM4aOm3dOsIEh84AxPnY1wvi2CYpNIymmbDM0oxhvjWoBdoviEHEa3/eK\nFnhA8j1zOCU+dT/763FxEhW96EV6qzsZifx45vVxnG95p727zRWroAR7WmyHYOfk\nvXJQacswtmQcQ1Xy5bTcOqFoXyJni6xOCtJPmp+8KRVC/BH2jtsmCMeFx3YCK/op\n3jphmcN5Vp57gqmYclVr1imo3YNelhgCWVK90c7GCak/ee46kJd7h9HTD5QjSxHV\ngJYNzotTCMSrk+ntU6x7cjDnbvTsdlWZ1ZhPVHTVTlCPBU21WQIDAQABoxowGDAJ\nBgNVHRMEAjAAMAsGA1UdDwQEAwIF4DANBgkqhkiG9w0BAQUFAAOCAQEASzYL4T1n\ni0Jqw1D1uZ7VY7u1zYyeGLAZD4qx2dfimVHKybotfUdhbvW+Cv++tVsAKMDMntnc\nnLbbIRxbe6uT51aSL5SF/scpCh1qNEB86rMHZHGnItrZKt+v6W26JNMurVaW4b8T\nF/VahLXKjkhIB2CkJusACZOPyoXj1N+MJW/kSOzxndvyOXENEX+E3FC3Y1F2gTZW\ndV6I3v3DKT+jhauLRLpjfy6VQ6j/p8Y5qNsUnyhx40XszsLL5ORLDcIN+X2ex2Bg\n84rdw2zBWYNmC7Omw61/ld6jgvLJX3lSrkP/5ME3UR5p76astGxA/5t0AoqeJ1Wt\n7UQVHzWv6eGkbg==\n-----END CERTIFICATE-----\n",
    caCert : "-----BEGIN CERTIFICATE-----\nMIIEHjCCAwagAwIBAgIJALcMNEp1tPYgMA0GCSqGSIb3DQEBCwUAMGcxCzAJBgNV\nBAYTAktSMR0wGwYDVQQKExRSYW9uU2VjdXJlIENvLiwgTHRkLjEaMBgGA1UECxMR\nUXVhbGl0eSBBc3N1cmFuY2UxHTAbBgNVBAMTFFJhb25TZWN1cmUgQ28uLCBMdGQu\nMB4XDTEzMDIwNzA5MDYyNVoXDTQzMDEzMTA5MDYyNVowZzELMAkGA1UEBhMCS1Ix\nHTAbBgNVBAoTFFJhb25TZWN1cmUgQ28uLCBMdGQuMRowGAYDVQQLExFRdWFsaXR5\nIEFzc3VyYW5jZTEdMBsGA1UEAxMUUmFvblNlY3VyZSBDby4sIEx0ZC4wggEiMA0G\nCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCqB0MsUuAi7pWVmRWaCS7kAactycMg\nhmOM7RiMbmXyHmatXJbrtOlNrGH8Xl4fdkCJjyUE2829zQy+lTJ2O3Uo3Nn7zK3+\n3Um9nDQXN2tapambthOXs0aHjnRCtuLMOSPlAx06o0yHP1nOGaV7hfY9PyJjIVh9\nLk/oFp5A+wsi0wiQ+INMDrm/6xZrooEY7/TLMnE4v+nr+cpIf3hSrvI1gGTykFtG\nCy2Le1huqaTKkE9K0CF/Sd8Kvebj6R+MhlieDXiMZXZD++pRmd4cAmGAmnGn4YdJ\nMyh16TCccPjT60KkMv84uNVjXBvnar8ZlzRQSgIhwp1KkRiMErMbVWCnAgMBAAGj\ngcwwgckwHQYDVR0OBBYEFPzIDKwqK4PCklaP6Mq4YXdq8McyMIGZBgNVHSMEgZEw\ngY6AFPzIDKwqK4PCklaP6Mq4YXdq8McyoWukaTBnMQswCQYDVQQGEwJLUjEdMBsG\nA1UEChMUUmFvblNlY3VyZSBDby4sIEx0ZC4xGjAYBgNVBAsTEVF1YWxpdHkgQXNz\ndXJhbmNlMR0wGwYDVQQDExRSYW9uU2VjdXJlIENvLiwgTHRkLoIJALcMNEp1tPYg\nMAwGA1UdEwQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHBRlEB4nu/gHwVFRzqb\nFOloR7aB0xIaMDykMWtovXHUQcTmmGyYQn0bMWaGVCD7SgRh1FisfciJzLP7f8OI\n5f7rA2tiBZD1PBtLMU7MytGIYlV/gcfWPbnqBVsKDm15AEUqH7ZahOm7np4d5Fr8\n7r1bj2baXQPKSNd9yjh89fl6LthWLEQRYKKwhPYAA/QkeB2RE9MftmuOXJ6MnYyy\nx5xEZK2ofqwrRBvDmV/PjwdCSxhloiJVFHrp8lKPCsZywJ3v9IPpudjgBQ7SWqhD\ncPNo2diGB2dQ252g36K1H7u3aT9Xha33MFQXTTEDzVDhaXzaGk7X6T9v25dsOyOa\nLAo=\n-----END CERTIFICATE-----",
    serverSid : "",
    cmsKeyEncryptionAlgorithm : "rsaOAEP",
    signAlgorithm : "preferRsaPSS",
    formName : "ksbizForm",
    nonceUrl : "../../raonnx/ksbiz/jsp/nonce.jsp",
    nonce : null,
    nonceKeyName : "ksbizNonce",
    multiSignDelimiter : "|",
    stringsDelimiter : ""
};
// 휴대폰 인증서 저장매체 모비싸인을 위한 설정
KSBizConfig.mobisignConfig = {
	enable : true,
	download : "http://www.mobisign.kr/mobisigndll.htm",
	version : "5,0,4,4",
	sitecode : "1019999", //사이트 고유값으로 변경
	aclist : "23;yessignCA Class 1;1.2.410.200005.1.1.1;yessignCA Class 1;1.2.410.200005.1.1.2;yessignCA Class 1;1.2.410.200005.1.1.4;yessignCA Class 1;1.2.410.200005.1.1.5;yessignCA Class 1;1.2.410.200005.1.1.6.1;yessignCA Class 1;1.2.410.200005.1.1.6.8;yessignCA Class 2;1.2.410.200005.1.1.1;yessignCA Class 2;1.2.410.200005.1.1.2;yessignCA Class 2;1.2.410.200005.1.1.4;yessignCA Class 2;1.2.410.200005.1.1.5;yessignCA Class 2;1.2.410.200005.1.1.6.1;yessignCA Class 2;1.2.410.200005.1.1.6.8;signGATE CA4;1.2.410.200004.5.2.1.2;signGATE CA4;1.2.410.200004.5.2.1.7.1;signGATE CA4;1.2.410.200004.5.2.1.1;SignKorea CA2;1.2.410.200004.5.1.1.5;SignKorea CA2;1.2.410.200004.5.1.1.7;CrossCertCA2;1.2.410.200004.5.4.1.1;CrossCertCA2;1.2.410.200004.5.4.1.101;CrossCertCA2;1.2.410.200004.5.4.1.2;TradeSignCA2;1.2.410.200012.1.1.1;TradeSignCA2;1.2.410.200012.1.1.101;TradeSignCA2;1.2.410.200012.1.1.3;",
	aclist_test :"56;yessignCA-TEST;1.2.410.200005.1.1.1;yessignCA-TEST;1.2.410.200005.1.1.2;yessignCA-TEST;1.2.410.200005.1.1.4;yessignCA-TEST;1.2.410.200005.1.1.5;yessignCA-TEST;1.2.410.200005.1.1.6.1;yessignCA-TEST;1.2.410.200005.1.1.6.8;yessignCA-Test Class 0;1.2.410.200005.1.1.1;yessignCA-Test Class 0;1.2.410.200005.1.1.2;yessignCA-Test Class 0;1.2.410.200005.1.1.4;yessignCA-Test Class 0;1.2.410.200005.1.1.5;yessignCA-Test Class 0;1.2.410.200005.1.1.6.1;yessignCA-Test Class 0;1.2.410.200005.1.1.6.8;yessignCA-Test Class 1;1.2.410.200005.1.1.1;yessignCA-Test Class 1;1.2.410.200005.1.1.2;yessignCA-Test Class 1;1.2.410.200005.1.1.4;yessignCA-Test Class 1;1.2.410.200005.1.1.5;yessignCA-Test Class 1;1.2.410.200005.1.1.6.1;yessignCA-Test Class 1;1.2.410.200005.1.1.6.8;yessignCA-Test Class 2;1.2.410.200005.1.1.1;yessignCA-Test Class 2;1.2.410.200005.1.1.2;yessignCA-Test Class 2;1.2.410.200005.1.1.4;yessignCA-Test Class 2;1.2.410.200005.1.1.5;yessignCA-Test Class 2;1.2.410.200005.1.1.6.1;yessignCA-Test Class 2;1.2.410.200005.1.1.6.8;yessignCA-Test Class 3;1.2.410.200005.1.1.1;yessignCA-Test Class 3;1.2.410.200005.1.1.2;yessignCA-Test Class 3;1.2.410.200005.1.1.4;yessignCA-Test Class 3;1.2.410.200005.1.1.5;yessignCA-Test Class 3;1.2.410.200005.1.1.6.1;yessignCA-Test Class 3;1.2.410.200005.1.1.6.8;signGATE FTCA02;1.2.410.200004.5.2.1.2;signGATE FTCA02;1.2.410.200004.5.2.1.7.1;signGATE FTCA02;1.2.410.200004.2.201;signGATE FTCA02;1.2.410.200004.5.2.1.1;signGATE FTCA02;1.2.410.200004.2.202;signGATE FTCA04;1.2.410.200004.5.2.1.2;signGATE FTCA04;1.2.410.200004.5.2.1.7.1;signGATE FTCA04;1.2.410.200004.2.201;signGATE FTCA04;1.2.410.200004.5.2.1.1;signGATE FTCA04;1.2.410.200004.2.202;SignKorea Test CA;1.2.410.200004.5.1.1.5;SignKorea Test CA;1.2.410.200004.5.1.1.7;SignKorea Test CA2;1.2.410.200004.5.1.1.5;SignKorea Test CA2;1.2.410.200004.5.1.1.7;CrossCertCA-Test2;1.2.410.200004.5.4.1.1;CrossCertCA-Test2;1.2.410.200004.5.4.1.101;CrossCertCA-Test2;1.2.410.200004.5.4.1.2;CrossCertTestCA2;1.2.410.200004.5.4.1.1;CrossCertTestCA2;1.2.410.200004.5.4.1.101;CrossCertTestCA2;1.2.410.200004.5.4.1.2;TestTradeSignCA;1.2.410.200012.1.1.1;TestTradeSignCA;1.2.410.200012.1.1.101;TestTradeSignCA;1.2.410.200012.1.1.3;TradeSignCA2009Test2;1.2.410.200012.1.1.1;TradeSignCA2009Test2;1.2.410.200012.1.1.101;TradeSignCA2009Test2;1.2.410.200012.1.1.3;"
};
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
// 가상키보드 설정
// product : transkey, nos
KSBizConfig.secureKeypadConfig = {
	product : "transkey",
	nativeKeypadUrl :"../../raonnx/ksbiz/jsp/tk_crt.jsp"
	// product : "nos",
	// nativeKeypadUrl : TouchEnNxConfig.path.url + "/pluginfree/jsp/nppfs.pki.jsp"
}

function DC_get(url,data, callback){
	if(!url) {
		alert('URL이 없습니다.');
		return;
	}
	if(!callback) {
		alert('callback이 필요합니다.');
		return;
	}

	var httpReqObj;
	if (window.XMLHttpRequest) {
		httpReqObj = new XMLHttpRequest();
	} else {
		httpReqObj = new ActiveXObject("Microsoft.XMLHTTP");
	}
	httpReqObj.onreadystatechange = function() {
		if (httpReqObj.readyState == 4) {
			if (httpReqObj.status == 200) {
				var resText = httpReqObj.responseText;
				resText = resText.replace(/^\s*/,'').replace(/\s*$/, '');
				callback(resText);
			} else {
				alert("통신중 에러가 발생하였습니다. [" + httpReqObj.status + "]");
				callback("");
			}
		}
	};
	var method = "post";
	if(url.indexOf("lang_") > -1) method = "get";
	if(url.indexOf(".html") > -1) method = "get";
	if(url.indexOf(".txt") > -1) method = "get";
	httpReqObj.open(method, url, true);
	httpReqObj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
	httpReqObj.send(data);
}
var KeySharpBiz={
    lineEncrypt : function(data, complete, options){
        var bizobj = document.ksbizObj;
        //options
        if(!options) options = {};
        if(!options.cipherAlgorithm) options.cipherAlgorithm = KSBizConfig.cipherAlgorithm;
        //caCert
		if(!options.caCert) {
            if(KSBizConfig.caCert){
                options.caCert = KSBizConfig.caCert;
            }
        }
        //data
        if( typeof data === "object"){
            var submitForm = document.forms[KSBizConfig.formName];
            if(submitForm != null){
                submitForm.method = "post";
                if(data.action) submitForm.action = data.action;
                if(data.method) submitForm.method = data.method;
                if(data.target) submitForm.target = data.target;
            }

            if(data.nodeName && data.nodeName.toLowerCase() === "form"){
                data = KeySharpBiz.nxBizFormSerialize(data);
            } else if(data.nodeName && data.nodeName.toLowerCase() === "a"){
                var pos = data.href.indexOf('?');
                if(pos >= 0){
                    if(submitForm) submitForm.action = data.href.substring(0, pos);
                    data = data.href.substring(pos+1);
                } else{
                    if(submitForm)  submitForm.action = data.href;
                    data = "";
                }
            } else{
                data = data.data;
            }
        }
        if(!data) data = KSBizConfig.channelEncryptEmptyData;

		if(!KSBizConfig.serverCert || !KSBizConfig.serverSid){
			DC_get(KSBizConfig.lineServerURL, "", function(res){
				if(res.length != ""){
					var resJSON = JSON.parse(res);
					var serverSid = resJSON.sid;
					var serverCert = resJSON.serverCert;
					//serverCert
					if(serverCert != ""){
						KSBizConfig.serverCert = serverCert;
						options.serverCert = KSBizConfig.serverCert;
						//serverSid
						if(serverSid.length != 20){
							alert("암호화에 실패하였습니다. [serverSid 오류]");
						} else{
							KSBizConfig.serverSid = serverSid;
                            options.serverSid = KSBizConfig.serverSid;
                            var optString = JSON.stringify(options);
                            var encryptData = "";
                            try {
                                encryptData = bizobj.lineEncrypt(data, optString);
                                if(encryptData){
                                    encryptDataJSON = JSON.parse(encryptData);
                                    complete(encryptDataJSON);
                                } else{
                                    alert("동작중 에러가 발생하였습니다. [lineEncrypt]");
                                }
                            } catch(e) {
                                alert("동작중 에러가 발생하였습니다. [lineEncrypt]");
                            }
						}
					} else{
						alert("서버인증서를 가져올 수 없습니다.");
					}
				} else {
					alert("서버인증서를 가져올 수 없습니다.");
				}
			});
		} else {
			options.serverCert = KSBizConfig.serverCert;
            options.serverSid = KSBizConfig.serverSid;
            var encryptData = bizobj.lineEncrypt(data, JSON.stringify(options));
            if(encryptData){
                encryptDataJSON = JSON.parse(encryptData);
                complete(encryptDataJSON);
            } else{
                alert("동작중 에러가 발생하였습니다. [lineEncrypt]");
            }
		}
    },
    lineDecryptAsync : function(data, complete, options){
        var bizobj = document.ksbizObj;
        if(!options) options = {};
        if(!options.cipherAlgorithm) options.cipherAlgorithm = KSBizConfig.cipherAlgorithm;
        var optString =  JSON.stringify(options);
        var decryptData = "";
        try {
            decryptData = bizobj.lineDecrypt(data, optString);
            if(decryptData){
                decryptDataJSON = JSON.parse(decryptData);
                complete(decryptDataJSON);
            } else{
                alert("동작중 에러가 발생하였습니다. [lineDecryptAsync]");
            }
        } catch(e) {
            alert("동작중 에러가 발생하였습니다. [lineDecryptAsync]");
        }
    },
    simpleEncrypt : function(data, complete, options){
        var bizobj = document.ksbizObj;
        //options
        if(!options) options = {};
        if(!options.cipherAlgorithm) options.cipherAlgorithm = KSBizConfig.cipherAlgorithm;
        //caCert
		if(!options.caCert) {
            if(KSBizConfig.caCert){
                options.caCert = KSBizConfig.caCert;
            }
        }
        //data
        if( typeof data === "object"){
            var submitForm = document.forms[KSBizConfig.formName];
            if(submitForm != null){
                submitForm.method = "post";
                if(data.action) submitForm.action = data.action;
                if(data.method) submitForm.method = data.method;
                if(data.target) submitForm.target = data.target;
            }

            if(data.nodeName && data.nodeName.toLowerCase() === "form"){
                data = KeySharpBiz.nxBizFormSerialize(data);
            } else if(data.nodeName && data.nodeName.toLowerCase() === "a"){
                var pos = data.href.indexOf('?');
                if(pos >= 0){
                    if(submitForm) submitForm.action = data.href.substring(0, pos);
                    data = data.href.substring(pos+1);
                } else{
                    if(submitForm)  submitForm.action = data.href;
                    data = "";
                }
            } else{
                data = data.data;
            }
        }
        if(!data) data = KSBizConfig.channelEncryptEmptyData;
        if(!options.serverCert){
			if(KSBizConfig.serverCert == ""){
				DC_get(KSBizConfig.serverCertUrl, "", function(serverCert){
					if(serverCert.length != ""){
						KSBizConfig.serverCert = serverCert;
						options.serverCert = KSBizConfig.serverCert;
                        var optString =  JSON.stringify(options);
                        var simpleEncyptData = "";
                        try {
                            simpleEncyptData = bizobj.simpleEncrypt(data, optString);
                            if(simpleEncyptData){
                                simpleEncyptDataJSON = JSON.parse(simpleEncyptData);
                                complete(simpleEncyptDataJSON);
                            } else{
                                alert("동작중 에러가 발생하였습니다. [simpleEncrypt]");
                            }
                        } catch(e) {
                            alert("동작중 에러가 발생하였습니다. [simpleEncrypt]");
                        }
					} else{
						alert("서버인증서를 가져올 수 없습니다.");
					}
				});
			} else {
				options.serverCert = KSBizConfig.serverCert;
                var optString =  JSON.stringify(options);
                var simpleEncyptData = "";
                try {
                    simpleEncyptData = bizobj.simpleEncrypt(data, optString);
                    if(simpleEncyptData){
                        simpleEncyptDataJSON = JSON.parse(simpleEncyptData);
                        complete(simpleEncyptDataJSON);
                    } else{
                        alert("동작중 에러가 발생하였습니다. [simpleEncrypt]");
                    }
                } catch(e) {
                    alert("동작중 에러가 발생하였습니다. [simpleEncrypt]");
                }
			}		
		}
    },
    simpleDecryptAsync : function(data, complete, options){
        var bizobj = document.ksbizObj;
        if(!options) options = {};
        if(!options.cipherAlgorithm) options.cipherAlgorithm = KSBizConfig.cipherAlgorithm;
        var optString =  JSON.stringify(options);
        var simpleDecryptData = "";
        try {
            simpleDecryptData = bizobj.simpleDecrypt(data, optString);
            if(simpleDecryptData){
                simpleDecryptDataJSON = JSON.parse(simpleDecryptData);
                complete(simpleDecryptDataJSON);
            } else{
                alert("동작중 에러가 발생하였습니다. [simpleDecryptAsync]");
            }
        } catch(e) {
            alert("동작중 에러가 발생하였습니다. [simpleDecryptAsync]");
        }
    },
    appendObject : function(){
        var object = document.createElement('OBJECT');
        object.setAttribute('ID','ksbizObj');
        object.setAttribute('CLASSID','CLSID:'+KSBizConfig.CLSID);
        object.setAttribute('CODEBASE', KSBizConfig.installPath+'#version='+KSBizConfig.version);
        document.body.appendChild( object );
    },
    //document.write로 처리
    createObjectString : function(){
        document.write('<OBJECT ID="ksbizObj" CLASSID="CLSID:'+KSBizConfig.CLSID +'" CODEBASE="'+KSBizConfig.installPath+'#version='+KSBizConfig.version +'"><param name="init" value="AAA"></OBJECT>');
    },
    getVersion : function(){
        var ksbizObj = document.ksbizObj;
        var version = ksbizObj.getVersion();
        alert(version)
    },
    initProperty : function(property){
        var bizobj = document.ksbizObj;
        var setProperty = "{key:"+property.initKey+"|| value:"+property.initVar+"}"; 
        bizobj.KSBIZ_SetInitProperties(setProperty);
    },
    signProperty : function(property){
        var bizobj = document.ksbizObj;
        var setProperty = "{key:"+property.signKey+"|| value:"+property.signVar+"}"; 
        bizobj.KSBIZ_SetSignProperties(setProperty);
    },
    initSign : function(complete){
        var bizobj = document.ksbizObj;
        var nRct = bizobj.KSBIZ_Init();
        var nRctJSON = JSON.parse(nRct);
        var result={};
        if(nRctJSON.res == 0){
            result.status = nRctJSON.res;
            complete(nRctJSON.res);
        } else {
            result.status = nRctJSON.res;
            complete(nRctJSON.res);
        }
    },
    sign : function(data, complete, options){
        //KeySharpBiz.initSign(initProperty);
        var bizobj = document.ksbizObj;
        //options 처리
        if(!options) options = {};
        
        if(!options.signedAttribute) options.signedAttribute = "signingTime";
        if(options.signType == "signedData") {
            options.attributeAsData = false;
            options.signedAttribute = null;
        }

        if(!options.signAlgorithm) options.signAlgorithm = KSBizConfig.signAlgorithm;

        if(typeof data === "object"){
            var submitForm = document.forms[KSBizConfig.formName];
            if(submitForm != null){
                submitForm.method = "post";
                if(data.action) submitForm.action = data.action;
                if(data.method) submitForm.method = data.method;
                if(data.target) submitForm.target = data.target;
            }
            if(data.nodeName && data.nodeName.toLowerCase() === "form"){
            	data = KeySharpBiz.nxBizFormSerialize(data);
            } else {
                data = data.data;
            }
        }
        var signedData;

        //ksbiz_internal.js - presign부분
        if(options.addNonce){
            DC_get(KSBizConfig.nonceUrl, "", function(nonce){
            	if(nonce){
                    if(nonce.length != 20){
						alert("전자서명 실패[nonce 오류]:" + nonce.length);
						result = {};
						result.status = "9999";
						result.message = "[ksbizAct.preSign] nonce value is length error";
						complete();
                        return;
                    }
                    if(data.length > 0) data += "&";
                    var nonceKeyName = KSBizConfig.nonceKeyName || "ksbizNonce";
                    data += nonceKeyName + "=" + encodeURIComponent(nonce);
                    if(options.confirmSignTitleImageUrl){
                        //ksbiz_internal.js - setSignTitleImage부분
                        DC_get(options.confirmSignTitleImageUrl, "", function(img){
                            if(img){
                                options.confirmSignTitleImage = img;
                                //options 처리
                                var strOptions="";
                                for (key in options){
                                    strOptions += "{key:"+key+"|| value:"+options[key]+"}"
                                }
                                bizobj.KSBIZ_SetSignProperties(strOptions);
                                signedData = bizobj.KSBIZ_ShowUI(data);
                            } else {
                                result = {};
                                result.result = "9999";
                                result.message = "[ksbizAct.setSignTitleImage] signTitleImage is not exist";
                                complete();
                            }
                        });
                    } else {
                        var strOptions="";
                        for (key in options){
                            strOptions += "{key:"+key+"|| value:"+options[key]+"}"
                        }
                        bizobj.KSBIZ_SetSignProperties(strOptions);
                        signedData = bizobj.KSBIZ_ShowUI(data);
                    }
            	} else {
            		result = {};
        			result.status = "9999";
            		result.message = "[ksbizAct.preSign] nonce value is not exist";
        			complete();
            	}
            });
        } else {
            if(options.confirmSignTitleImageUrl){
                //ksbiz_internal.js - setSignTitleImage부분
                DC_get(options.confirmSignTitleImageUrl, "", function(img){
                    if(img){
                        options.confirmSignTitleImage = img;
                        //options 처리
                        var strOptions="";
                        for (key in options){
                            strOptions += "{key:"+key+"|| value:"+options[key]+"}"
                        }
                        bizobj.KSBIZ_SetSignProperties(strOptions);
                        signedData = bizobj.KSBIZ_ShowUI(data);
                    } else {
                        result = {};
                        result.result = "9999";
                        result.message = "[ksbizAct.setSignTitleImage] signTitleImage is not exist";
                        complete();
                    }
                });
            } else {
                //options 처리
                var strOptions="";
                for (key in options){
                    strOptions += "{key:"+key+"|| value:"+options[key]+"}"
                }
                bizobj.KSBIZ_SetSignProperties(strOptions);
                signedData = bizobj.KSBIZ_ShowUI(data);
            }
        }

        if(signedData){
            signedDataJSON = JSON.parse(signedData);
            if(signedDataJSON.data.signedData){
                var result = {};
                result.status = 1;
                result.data = signedDataJSON.data.signedData;
                if(signedDataJSON.vidRandom) result.vidRandom = signedDataJSON.data.vidRandom;
                if(signedDataJSON.signAlgorithm) result.signAlgorithm = signedDataJSON.data.signAlgorithm;
                complete(result);
            } else{
                var result = {};
                result.status = 0;
                result.data = "";
                result.vidRandom = "";
                complete(result);
            }
        } else{
            alert("동작중 에러가 발생하였습니다. [sign]");
        }
        //bizobj.KSBIZ_ShowUI(data, options);
        
    },
    multiSign : function(data, complete, options){
        if(!options) options = {};
		options.multiSign = true;
		
    	options.multiSignDelimiter = options.multiSignDelimiter || KSBizConfig.multiSignDelimiter;
        if(!options.multiSignDelimiter){
            alert("missing 'multiSignDelimiter' option or 'KSBizConfig.multiSignDelimiter' config" );
            return;
        }
        if(options.addNonce){
            alert("not supported addNonce option");
            return;
        }
        if(data.nodeName && data.nodeName.toLowerCase() === "form" ){
            alert("not supported data type");
            return;
        }
        options.attributeAsData = true;
        options.signedAttribute = "certStoreType";
        KeySharpBiz.sign(data, complete, options);
    },
    confirmSign : function(data, format, complete, options){
    	if(!options) options = {};
        if(!format){
            alert("missing 'format' parameter");
            return;
        } else {
        	options.format = format;
		}
		options.dataType = data.dataType || "form-urlencoded";
        if(options.dataType == "strings"){
            options.delimiter = options.delimiter || KSBizConfig.stringsDelimiter;
            if(!options.delimiter){
                alert("missing 'delimiter' option or 'KSBizConfig.stringsDelimiter' config" );
                return;
            }
            if(options.addNonce){
                alert("not supported addNonce option");
                return;
            }
        }
        options.attributeAsData = true;
        options.signedAttribute = "format,certStoreType";
        KeySharpBiz.sign(data, complete, options);
    },
    nxBizFormSerialize : function(form) {
        if (!form || form.nodeName !== "FORM") return;
        var i, j, q = [];
        for (i = form.elements.length - 1; i >= 0; i = i - 1) {
            if (form.elements[i].name === "") continue;
            switch (form.elements[i].nodeName) {
                case 'INPUT':
                    switch (form.elements[i].type) {
                        case 'text':
                        case 'hidden':
                        case 'password':
                        case 'button':
                        case 'reset':
                        case 'submit':
                            q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                            break;
                        case 'checkbox':
                        case 'radio':
                            if (form.elements[i].checked) {
                                q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                            }
                            break;
                        case 'file':
                            break;
                    }
                    break;
                case 'TEXTAREA':
                    q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                    break;
                case 'SELECT':
                    switch (form.elements[i].type) {
                        case 'select-one':
                            q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                            break;
                        case 'select-multiple':
                            for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
                                if (form.elements[i].options[j].selected) {
                                    q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].options[j].value));
                                }
                            }
                            break;
                    }
                    break;
                case 'BUTTON':
                    switch (form.elements[i].type) {
                        case 'reset':
                        case 'submit':
                        case 'button':
                            q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                            break;
                    }
                    break;
            }
        }
        return q.join("&");
    }
}
KeySharpBiz.createObjectString();



