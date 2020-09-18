var ksbizExtInterface = {
	commonError : function(callback, result){
		kslog("ksbizExtInterface.commonError.result", result);
		var errorObj = {};
		if(result.res){
			var errorCode = result.res.toString();
			if(errorCode && errorCode < 0){
				// not to do..
			} else {
				if(errorCode && errorCode.length > 4){
					errorCode = errorCode.substring(0, 4).toUpperCase();
				}
			}
			errorObj.status = errorCode;
		} else {
			errorObj.status = "9001";
		}
		if(result.err){
			errorObj.message = result.err;
		} else {
			errorObj.message = "ERROR";
		}
		if(callback) callback("", errorObj);
	},
	init : function(callback){
		var reqJSON = {"verify":"true"};
		if(typeof KSBizConfig.verify != "undefined" && KSBizConfig.verify != null) {
			reqJSON = {"verify":"" + KSBizConfig.verify};
		}
		var initCallbackFunc = function(result){
			kslog("ksbizExtInterface.init.result", result);
			if(result.res == "0"){
				if(callback) callback(true);
			} else {
				if(result.err) alert("[ksbizAct.init] init Fail [" + result.res + "] " + result.err);
				if(callback) ksbizExtInterface.commonError(callback, result);
			}
		};
		ksbizInterface.invoke("init", reqJSON, initCallbackFunc);
	},
	getVersion : function(callback){
		var getVersionCallbackFunc = function(result){
			if(result.res == "0"){
				if(callback) callback(result.data);
			} else {
				if(callback) ksbizExtInterface.commonError(callback, result);
			}
		};
		ksbizInterface.invoke("getVersion", {}, getVersionCallbackFunc);
	},
	manageCertificate : function(callback){
		var manageCertificateCallbackFunc = function(result){
			if(result.res == "0"){
				if(callback) callback(true);
			} else {
				if(callback) ksbizExtInterface.commonError(callback, result);
			}
		};
		ksbizInterface.invoke("manageCertificateWithComplete", {}, manageCertificateCallbackFunc);
	},
	resetCertificate : function(callback){
		var resetCertificateCallbackFunc = function(result){
			if(result.res == "0"){
				if(callback) callback(true);
			} else {
				if(callback) ksbizExtInterface.commonError(callback, result);
			}
		};
		ksbizInterface.invoke("resetCertificate", {}, resetCertificateCallbackFunc);
	},
	setProperty : function(key, value, callback){
		var reqJSON = {
			"properties":[
				{
					"key":key,
					"value":encodeURIComponent(value)
				}
			]
		};
		var setPropertyCallbackFunc = function(result){
			if(result.res == "0"){
				if(callback) callback(true);
			} else {
				if(callback) ksbizExtInterface.commonError(callback, result);
			}
		};
		ksbizInterface.invoke("setProperty", reqJSON, setPropertyCallbackFunc);
	},
	setProperties : function(properties, callback){
		var propObjArr = [];
		var propKeys = Object.keys(properties);
		var propSize = propKeys.length;
		for(var i=0; i< propSize; i++){
			var propObj = {};
			propObj.key = propKeys[i];
			propObj.value = encodeURIComponent(properties[propKeys[i]]);
			propObjArr.push(propObj);
		}

		var reqJSON = {
			"properties":propObjArr
		};
		var setPropertiesCallbackFunc = function(result){
			if(result.res == "0"){
				if(callback) callback(true);
			} else {
				if(callback) ksbizExtInterface.commonError(callback, result);
			}
		};
		ksbizInterface.invoke("setProperty", reqJSON, setPropertiesCallbackFunc);
	},
	getProperty : function(key, callback){
		var reqJSON = {
			"key":key
		};
		var getPropertyCallbackFunc = function(result){
			if(result.res == "0"){
				if(callback) callback(result.data);
			} else {
				if(callback) ksbizExtInterface.commonError(callback, result);
			}
		};
		ksbizInterface.invoke("getProperty", reqJSON, getPropertyCallbackFunc);
	},
	setLang : function(lang, resource, callback){
		var reqJSON = {
			"lang":lang, "rs": resource
		};
		var setLangCallbackFunc = function(result){
			if(result.res == "0"){
				if(callback) callback(true);
			} else {
				if(callback) ksbizExtInterface.commonError(callback, result);
			}
		};
		ksbizInterface.invoke("setLang", reqJSON, setLangCallbackFunc);
	},
	sign : function(data, options, callback){
		var reqJSON = {
			"data":encodeURIComponent(data),
			"options":options
		};
		var signCallbackFunc = function(result){
			if(result.res == "0"){
				if(callback) callback(result.data);
			} else {
				if(callback) ksbizExtInterface.commonError(callback, result);
			}
		};
		ksbizInterface.invoke("sign", reqJSON, signCallbackFunc);
	},
	signFile : function(srcfile, destfile, options, callback){
		var reqJSON = {
			"srcfile":srcfile,
			"destfile":destfile,
			"options":options
		};
		var signFileCallbackFunc = function(result){
			if(result.res == "0"){
				if(callback) callback(result.data);
			} else {
				if(callback) ksbizExtInterface.commonError(callback, result);
			}
		};
		ksbizInterface.invoke("signFile", reqJSON, signFileCallbackFunc);
	},
	addSignFile : function(srcfile, destfile, options, callback){
		var reqJSON = {
			"srcfile":srcfile,
			"destfile":destfile,
			"options":options
		};
		var addSignFileCallbackFunc = function(result){
			if(result.res == "0"){
				if(callback) callback(result.data);
			} else {
				if(callback) ksbizExtInterface.commonError(callback, result);
			}
		};
		ksbizInterface.invoke("addSignFile", reqJSON, addSignFileCallbackFunc);
	},
	encryptFile : function(srcfile, destfile, options, callback){
		var reqJSON = {
			"srcfile":srcfile,
			"destfile":destfile,
			"options":options
		};
		var encryptFileCallbackFunc = function(result){
			if(result.res == "0"){
				if(callback) callback(result.data);
			} else {
				if(callback) ksbizExtInterface.commonError(callback, result);
			}
		};
		ksbizInterface.invoke("encryptFile", reqJSON, encryptFileCallbackFunc);
	},
	decryptFile : function(srcfile, destfile, options, callback){
		var reqJSON = {
			"srcfile": srcfile,
			"destfile":destfile,
			"options":options
		};
		var decryptFileCallbackFunc = function(result){
			if(result.res == "0"){
				if(callback) callback(result.data);
			} else {
				if(callback) ksbizExtInterface.commonError(callback, result);
			}
		};
		ksbizInterface.invoke("decryptFile", reqJSON, decryptFileCallbackFunc);
	},
	compressFile : function(srcfile, destfile, options, callback){
		var reqJSON = {
			"srcfile": srcfile,
			"destfile": destfile,
			"options":options
		};
		var compressFileCallbackFunc = function(result){
			if(result.res == "0"){
				if(callback) callback(result.data);
			} else {
				if(callback) ksbizExtInterface.commonError(callback, result);
			}
		};
		ksbizInterface.invoke("compressFile", reqJSON, compressFileCallbackFunc);
	},
	uncompressFile : function(srcfile, destfile, options, callback){
		var reqJSON = {
			"srcfile": srcfile,
			"destfile": destfile,
			"options": options
		};
		var uncompressFileCallbackFunc = function(result){
			if(result.res == "0"){
				if(callback) callback(result.data);
			} else {
				if(callback) ksbizExtInterface.commonError(callback, result);
			}
		};
		ksbizInterface.invoke("uncompressFile", reqJSON, uncompressFileCallbackFunc);
	},
	signFileUrl : function(url, options, callback){
		var reqJSON = {
			"url": url,
			"options": options
		};
		var signFileUrlCallbackFunc = function(result){
			if(result.res == "0"){
				if(callback) callback(result.data);
			} else {
				if(callback) ksbizExtInterface.commonError(callback, result);
			}
		};
		ksbizInterface.invoke("signFileUrl", reqJSON, signFileUrlCallbackFunc);
	},
	encryptFileUrl : function(url, options, callback){
		var reqJSON = {
			"url": url,
			"options": options
		};
		var encryptFileUrlCallbackFunc = function(result){
			if(result.res == "0"){
				if(callback) callback(result.data);
			} else {
				if(callback) ksbizExtInterface.commonError(callback, result);
			}
		};
		ksbizInterface.invoke("encryptFileUrl", reqJSON, encryptFileUrlCallbackFunc);
	},
	signAndChannelEncryptFileUrl : function(url, options, callback){
		var reqJSON = {
			"url": url,
			"options": options
		};
		var signAndChannelEncryptFileUrlCallbackFunc = function(result){
			if(result.res == "0"){
				if(callback) callback(result.data);
			} else {
				if(callback) ksbizExtInterface.commonError(callback, result);
			}
		};
		ksbizInterface.invoke("signAndChannelEncryptFileUrl", reqJSON, signAndChannelEncryptFileUrlCallbackFunc);
	},
	addSignFileUrl : function(downloadUrl, uploadUrl, options, callback){
		var reqJSON = {
			"downloadUrl": downloadUrl,
			"uploadUrl": uploadUrl,
			"options": options
		};
		var addSignFileUrlCallbackFunc = function(result){
			if(result.res == "0"){
				if(callback) callback(result.data);
			} else {
				if(callback) ksbizExtInterface.commonError(callback, result);
			}
		};
		ksbizInterface.invoke("addSignFileUrl", reqJSON, addSignFileUrlCallbackFunc);
	},
	channelDecryptFileUrl : function(url, sid, data, options, callback){
		var reqJSON = {
			"url": url,
			"csid": sid,
			"data": encodeURIComponent(data),
			"options": options
		};
		var channelDecryptFileUrlCallbackFunc = function(result){
			if(result.res == "0"){
				if(callback) callback(result.data);
			} else {
				if(callback) ksbizExtInterface.commonError(callback, result);
			}
		};
		ksbizInterface.invoke("channelDecryptFileUrl", reqJSON, channelDecryptFileUrlCallbackFunc);
	},
	decryptFileUrl : function(url, options, callback){
		var reqJSON = {
			"url": url,
			"options": options
		};
		var decryptFileUrlCallbackFunc = function(result){
			if(result.res == "0"){
				if(callback) callback(result.data);
			} else {
				if(callback) ksbizExtInterface.commonError(callback, result);
			}
		};
		ksbizInterface.invoke("decryptFileUrl", reqJSON, decryptFileUrlCallbackFunc);
	},
	requestCertificate : function(ca, host, port, referenceValue, secretValue, options, callback){
		var reqJSON = {
			"ca": ca,
			"host": host,
			"port": port,
			"referenceValue": referenceValue,
			"secretValue": secretValue,
			"options":options
		};
		var requestCertificateCallbackFunc = function(result){
			if(result.res == "0"){
				if(callback) callback(result.data);
			} else {
				if(callback) ksbizExtInterface.commonError(callback, result);
			}
		};
		ksbizInterface.invoke("requestCertificate", reqJSON, requestCertificateCallbackFunc);
	},
	updateCertificate : function(ca, host, port, options, callback){
		var reqJSON = {
			"ca": ca,
			"host": host,
			"port": port,
			"options": options
		};
		var updateCertificateCallbackFunc = function(result){
			if(result.res == "0"){
				if(callback) callback(result.data);
			} else {
				if(callback) ksbizExtInterface.commonError(callback, result);
			}
		};
		ksbizInterface.invoke("updateCertificate", reqJSON, updateCertificateCallbackFunc);
	},
	deleteCertificate : function(subjectDN, options, callback){
		var reqJSON = {
			"subjectDN": subjectDN,
			"options": options
		};
		var deleteCertificateCallbackFunc = function(result){
			if(result.res == "0"){
				if(callback) callback(result.data);
			} else {
				if(callback) ksbizExtInterface.commonError(callback, result);
			}
		};
		ksbizInterface.invoke("updateCertificate", reqJSON, deleteCertificateCallbackFunc);
	},
	channel2Init : function(options, callback){
		var reqJSON = {
			"options": options
		};
		var channel2InitCallbackFunc = function(result){
			if(result.res == "0"){
				if(callback) callback(result.data);
			} else {
				if(callback) ksbizExtInterface.commonError(callback, result);
			}
		};
		ksbizInterface.invoke("channel2Init", reqJSON, channel2InitCallbackFunc);
	},
	channel2Verify : function(shandshake, options, callback){
		var reqJSON = {
			"shandshake": shandshake,
			"options": options
		};
		var channel2VerifyCallbackFunc = function(result){
			if(result.res == "0"){
				if(callback) callback(result.data);
			} else {
				if(callback) ksbizExtInterface.commonError(callback, result);
			}
		};
		ksbizInterface.invoke("channel2Verify", reqJSON, channel2VerifyCallbackFunc);
	},
	channel2Final : function(sfinished, options, callback){
		var reqJSON = {
			"sfinished": sfinished,
			"options": options
		};
		var channel2FinalCallbackFunc = function(result){
			if(result.res == "0"){
				if(callback) callback(true);
			} else {
				if(callback) ksbizExtInterface.commonError(false, result);
			}
		};
		ksbizInterface.invoke("channel2Final", reqJSON, channel2FinalCallbackFunc);
	},
	channel2Encrypt : function(data, options, callback){
		var reqJSON = {
			"data": encodeURIComponent(data),
			"options": options
		};
		var channel2EncryptCallbackFunc = function(result){
			if(result.res == "0"){
				if(callback) callback(result.data);
			} else {
				if(callback) ksbizExtInterface.commonError(callback, result);
			}
		};
		ksbizInterface.invoke("channel2Encrypt", reqJSON, channel2EncryptCallbackFunc);
	},
	channel2Decrypt : function(data, options, callback){
		var reqJSON = {
			"data": encodeURIComponent(data),
			"options": options
		};
		var channel2DecryptCallbackFunc = function(result){
			if(result.res == "0"){
				if(result.data){
					if(callback) callback(result.data);
				} else {
					if(callback) callback("");
				}
			} else {
				if(callback) ksbizExtInterface.commonError(callback, result);
			}
		};
		ksbizInterface.invoke("channel2Decrypt", reqJSON, channel2DecryptCallbackFunc);
	},

	//////////////////////////////////////////
	// HTML5 - NativeClient Interface..
	//////////////////////////////////////////
	getDiskStatus : function(storage, callback){
		var reqJSON = {
			"storage": storage
		};
		var getDiskStatusCallbackFunc = function(result){
			if(result.res == "0"){
				if(result.data){
					if(callback) callback(result.data);
				} else {
					if(callback) callback("");
				}
			} else {
				if(callback) ksbizExtInterface.commonError(callback, result);
			}
		};
		ksbizInterface.invoke("getDiskStatus", reqJSON, getDiskStatusCallbackFunc);
	},
	getDiskList : function(storage, drive, options, callback){
		var reqJSON = {
			"storage": storage,
			"drive": drive,
			"options": options
		};
		var getDiskListCertCallbackFunc = function(result){
			if(result.res == "0"){
				if(result.data){
					if(callback) callback(result.data);
				} else {
					if(callback) callback("");
				}
			} else {
				if(callback) ksbizExtInterface.commonError(callback, result);
			}
		};
		ksbizInterface.invoke("getDiskList", reqJSON, getDiskListCertCallbackFunc);
	},
	certDiskInfo : function(storage, drive, cid, callback){
		var reqJSON = {
			"storage": storage,
			"drive": drive,
			"cid": cid
		};
		var certDiskInfoCallbackFunc = function(result){
			if(result.res == "0"){
				if(result.data){
					if(callback) callback(result.data);
				} else {
					if(callback) callback("");
				}
			} else {
				if(callback) ksbizExtInterface.commonError(callback, result);
			}
		};
		ksbizInterface.invoke("certDiskInfo", reqJSON, certDiskInfoCallbackFunc);
	},
	deleteDiskCert : function(storage, drive, cid, tprdt, tprdt_type, callback){
		var reqJSON = {
			"storage": storage,
			"drive": drive,
			"cid": cid,
			"tprdt": tprdt,
			"tprdt_type": tprdt_type
		};
		var deleteDiskCertCallbackFunc = function(result){
			if(result.res == "0"){
				if(result.data){
					if(callback) callback(result.data);
				} else {
					if(callback) callback("");
				}
			} else {
				if(callback) ksbizExtInterface.commonError(callback, result);

			}
		};
		ksbizInterface.invoke("deleteDiskCert", reqJSON, deleteDiskCertCallbackFunc);
	},
	signStorage : function(storage, drive, cid, prdt, prdt_type, data, options, callback){
		var reqJSON = {
			"storage": storage,
			"drive": drive,
			"cid": cid,
			"prdt": prdt,
			"prdt_type": prdt_type,
			"data": data,
			"options": options
		};
		var signCallbackFunc = function(result){
			if(result.res == "0"){
				if(result.data){
					if(callback) callback(result.data);
				} else {
					if(callback) callback("");
				}
			} else {
				if(callback) ksbizExtInterface.commonError(callback, result);
			}
		};
		ksbizInterface.invoke("signStorage", reqJSON, signCallbackFunc);
	},
	signCert : function(type, b64data, prdt, prdt_type, data, options, callback){
		var reqJSON = {
			"type": type,
			"b64data": b64data,
			"prdt": prdt,
			"prdt_type": prdt_type,
			"data": data,
			"options": options
		};
		var signCertCallbackFunc = function(result){
			if(result.res == "0"){
				if(result.data){
					if(callback) callback(result.data);
				} else {
					if(callback) callback("");
				}
			} else {
				if(callback) ksbizExtInterface.commonError(callback, result);
			}
		};
		ksbizInterface.invoke("signCert", reqJSON, signCertCallbackFunc);
	},
	importDiskCert : function(storage, drive, type, b64data, prdt, prdt_type, tprdt, tprdt_type, options, callback){
		var reqJSON = {
			"storage": storage,
			"drive": drive,
			"type": type,
			"b64data": b64data,
			"prdt": prdt,
			"prdt_type": prdt_type,
			"tprdt": tprdt,
			"tprdt_type": tprdt_type,
			"options": options
		};
		var importDiskCertCallbackFunc = function(result){
			if(result.res == "0"){
				if(result.data){
					if(callback) callback(result.data);
				} else {
					if(callback) callback("");
				}
			} else {
				if(callback) ksbizExtInterface.commonError(callback, result);
			}
		};
		ksbizInterface.invoke("importDiskCert", reqJSON, importDiskCertCallbackFunc);
	},
	changePwdDiskCert : function(storage, drive, cid, prdt, prdt_type, nprdt, nprdt_type, callback){
		var reqJSON = {
			"storage": storage,
			"drive": drive,
			"cid": cid,
			"prdt": prdt,
			"prdt_type": prdt_type,
			"nprdt": nprdt,
			"nprdt_type": nprdt_type
		}
		var changePwdDiskCertCallbackFunc = function(result){
			if(result.res == "0"){
				if(result.data){
					if(callback) callback(result.data);
				} else {
					if(callback) callback("");
				}
			} else {
				if(callback) ksbizExtInterface.commonError(callback, result);
			}
		};
		ksbizInterface.invoke("changePwdDiskCert", reqJSON, changePwdDiskCertCallbackFunc);
	},
	exportDiskCert : function(storage, drive, cid, prdt, prdt_type, callback){
		var reqJSON = {
			"storage": storage,
			"drive": drive,
			"cid": cid,
			"prdt": prdt,
			"prdt_type": prdt_type
		};
		var exportDiskCertCallbackFunc = function(result){
			if(result.res == "0"){
				if(result.data){
					if(callback) callback(result.data);
				} else {
					if(callback) callback("");
				}
			} else {
				if(callback) ksbizExtInterface.commonError(callback, result);
			}
		};
		ksbizInterface.invoke("exportDiskCert", reqJSON, exportDiskCertCallbackFunc);
	},
	makeLocalLinkURL : function(filename, filedata, callback){
		var reqJSON = {
			"filename": encodeURIComponent(filename),
			"filedata": filedata
		};
		var makeLocalLinkURLCallbackFunc = function(result){
			if(result.res == "0"){
				if(result.data){
					if(callback) callback(result.data);
				} else {
					if(callback) callback("");
				}
			} else {
				if(callback) ksbizExtInterface.commonError(callback, result);
			}
		};
		ksbizInterface.invoke("makeLocalLinkURL", reqJSON, makeLocalLinkURLCallbackFunc);
	},
	downLocalLinkURL : function(url, callback){
		var reqJSON = {
			"url": url
		};
		var downLocalLinkURLFunc = function(result){
			if(result.res == "0"){
				if(result.data){
					if(callback) callback(result.data);
				} else {
					if(callback) callback("");
				}
			} else {
				if(callback) ksbizExtInterface.commonError(callback, result);
			}
		};
		ksbizInterface.invoke("downLocalLinkURL", reqJSON, downLocalLinkURLFunc);
	},
	getDiskCert : function(storage, drive, cid, prdt, prdt_type, callback){
		var reqJSON = {
			"storage": storage,
			"drive": drive,
			"cid": cid,
			"prdt": prdt,
			"prdt_type": prdt_type
		};
		var getDiskCertCallbackFunc = function(result){
			if(result.res == "0"){
				if(result.data){
					if(callback) callback(result.data);
				} else {
					if(callback) callback("");
				}
			} else {
				if(callback) ksbizExtInterface.commonError(callback, result);
			}
		};
		ksbizInterface.invoke("getDiskCert", reqJSON, getDiskCertCallbackFunc);
	},
	copyDiskCert : function(fStorage, fDrive, tStorage, tDrive, cid, prdt, prdt_type, tprdt, tprdt_type, callback){
		var reqJSON = {
			"fStorage": fStorage,
			"fDrive": fDrive,
			"tStorage": tStorage,
			"tDrive": tDrive,
			"cid": cid,
			"prdt": prdt,
			"prdt_type": prdt_type,
			"tprdt": tprdt,
			"tprdt_type": tprdt_type
		};
		var copyDiskCertCallbackFunc = function(result){
			if(result.res == "0"){
				if(result.data){
					if(callback) callback(result.data);
				} else {
					if(callback) callback("");
				}
			} else {
				if(callback) ksbizExtInterface.commonError(callback, result);
			}
		};
		ksbizInterface.invoke("copyDiskCert", reqJSON, copyDiskCertCallbackFunc);
	},
	requestDiskCertificate : function(ca, host, port, referenceValue, secretValue, storage, drive, prdt, prdt_type, options, callback){
		var reqJSON = {
			"ca": ca,
			"host": host,
			"port": port,
			"referenceValue": referenceValue,
			"secretValue": secretValue,
			"storage": storage,
			"drive": drive,
			"prdt": prdt,
			"prdt_type": prdt_type,
			"options":options
		};
		var requestCertificateCallbackFunc = function(result){
			if(result.res == "0"){
				if(callback) callback(result.data);
			} else {
				if(callback) ksbizExtInterface.commonError(callback, result);
			}
		};
		ksbizInterface.invoke("requestDiskCertificate", reqJSON, requestCertificateCallbackFunc);
	},
	updateDiskCertificate : function(ca, host, port, storage, drive, cid, prdt, prdt_type, options, callback){
		var reqJSON = {
			"ca": ca,
			"host": host,
			"port": port,
			"storage": storage,
			"drive": drive,
			"cid": cid,
			"prdt": prdt,
			"prdt_type": prdt_type,
			"options": options
		};
		var updateCertificateCallbackFunc = function(result){
			if(result.res == "0"){
				if(callback) callback(result.data);
			} else {
				if(callback) ksbizExtInterface.commonError(callback, result);
			}
		};
		ksbizInterface.invoke("updateDiskCertificate", reqJSON, updateCertificateCallbackFunc);
	},
	lineEncrypt : function(data, options, callback){
		var reqJSON = {
			"data" : data,
			"options" : options
		}
		var lineEncryptCallbackFunc = function(result){
			if(result.res == "0"){
				if(callback) callback(result.data);
			} else{
				if(callback) ksbizExtInterface.commonError(callback, result);
			}
		};
		ksbizInterface.invoke("lineEncrypt", reqJSON, lineEncryptCallbackFunc);
	},
	lineDecryptAsync : function(data, options, callback){
		var reqJSON = {
			"data": encodeURIComponent(data),
			"options": options
		};
		var lineDecryptAsyncCallbackFunc = function(result){
			if(result.res == "0"){
				if(result.data){
					if(callback) callback(result.data);
				} else {
					if(callback) callback("");
				}
			} else {
				if(callback) ksbizExtInterface.commonError(callback, result);
			}
		};
		ksbizInterface.invoke("lineDecryptAsync", reqJSON, lineDecryptAsyncCallbackFunc);
	},
	simpleEncrypt : function(data, options, callback){
		var reqJSON = {
			"data" : data,
			"options" : options
		}
		var simpleEncryptCallbackFunc = function(result){
			if(result.res == "0"){
				if(callback) callback(result.data);
			} else{
				if(callback) ksbizExtInterface.commonError(callback, result);
			}
		};
		ksbizInterface.invoke("simpleEncrypt", reqJSON, simpleEncryptCallbackFunc);
	},
	simpleDecryptAsync : function(data, options, callback){
		var reqJSON = {
			"data": encodeURIComponent(data),
			"options": options
		};
		var simpleDecryptAsyncCallbackFunc = function(result){
			if(result.res == "0"){
				if(result.data){
					if(callback) callback(result.data);
				} else {
					if(callback) callback("");
				}
			} else {
				if(callback) ksbizExtInterface.commonError(callback, result);
			}
		};
		ksbizInterface.invoke("simpleDecryptAsync", reqJSON, simpleDecryptAsyncCallbackFunc);
	}
};