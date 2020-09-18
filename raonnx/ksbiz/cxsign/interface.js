// invoke common
var cxInvokeCommon = {
	callback : [],
	pwdErrCount : 0,
	issueCopyInfo : {},
	addCallback : function(callback){
		ui.loading.start();
		cxInvokeCommon.callback.push(callback);
	},
	errorCheck : function(error){
		var errorObj = {};
		if(error.status){
			var errorCode = error.status.toString();
			if(errorCode && errorCode.length > 4){
				errorCode = errorCode.substring(0, 4).toUpperCase();
			}
			errorObj.status = errorCode;
		} else {
			errorObj.status = "9000";
		}
		if((errorObj.status == "0017" || errorObj.status == "005D") && typeof error.code != "undefined" && error.code == "incorrect_crdt"){
			errorObj.status = "0063";
			if(typeof error.failCount != "undefined" && typeof error.failCount != "maxFailCount"){
				errorObj.message = uiCtrl.getErrorMsg(errorObj.status);
				errorObj.failCount = error.failCount;
				errorObj.maxFailCount = error.maxFailCount;
			} else {
				errorObj.message = uiCtrl.getErrorMsg(errorObj.status);
			}
		} else{
			errorObj.message = uiCtrl.getErrorMsg(errorObj.status);
		}
		return errorObj;
	},
	runCallback : function(response, error){
		if(error) error = cxInvokeCommon.errorCheck(error);
		if(cxInvokeCommon.callback.length > 0){
			var callfn = cxInvokeCommon.callback[0];
			cxInvokeCommon.callback.splice(0, 1);
			callfn(response, error);
		}
	},
	removeCallback : function(){
		if(cxInvokeCommon.callback.length > 0){
			var callfn = cxInvokeCommon.callback[0];
			cxInvokeCommon.callback.splice(0, 1);
		}
		return true;
	},
	// error 발생시에 alert
	commonCallback : function(response, error){
		ui.loading.end();
		if(error) error = cxInvokeCommon.errorCheck(error);
		if(error){
			kslog("invokeCallback.commonCallback", error);
			cxInvokeCommon.removeCallback();
			uiCtrl.errorAlert(error);
		} else {
			cxInvokeCommon.runCallback(response);
		}
	},
	// error 발생시에 close
	closeCallback : function(response, error){
		ui.loading.end();
		if(error) error = cxInvokeCommon.errorCheck(error);
		if(error){
			kslog("invokeCallback.closeCallback", error);
			cxInvokeCommon.removeCallback();
			uiCtrl.errorClose(error);
		} else {
			cxInvokeCommon.runCallback(response);
		}
	},
	getDiskListCallback : function(response, error){
		ui.loading.end();
		if(error) error = cxInvokeCommon.errorCheck(error);
		if(error){
			kslog("invokeCallback.getDiskListCallback", error);
			cxInvokeCommon.removeCallback();
			//class clicked 제거
			$(".storage_lst li").removeClass("clicked");
			$(".storage_more li").removeClass("clicked");
			if(error.status == uiCtrl.getErrorCode("DEVICEINIT")){	// smart/phone cancel
				// not to do
				ui.storageClick(KSBizConfig.initStorage)
			} else {
				uiCtrl.errorAlert(error, function(){
					ui.storageClick(KSBizConfig.initStorage)
				});
			}
		} else {
			cxInvokeCommon.runCallback(response);
		}
	},
	changePwdCertCallback : function(response, error){
		ui.loading.end();
		if(error) error = cxInvokeCommon.errorCheck(error);
		if(error){
			kslog("invokeCallback.changePwdCertCallback", error);
			cxInvokeCommon.removeCallback();
			if(error.status == uiCtrl.getErrorCode("CHANGECERTPWD_OLDPWD")){
				if(cxInvokeCommon.pwdErrCount < KSBizConfig.passwordCounter - 1){
					cxInvokeCommon.pwdErrCount += 1;
					uiCtrl.errorAlert(error, function(){
						$("#pwChange").click();
						if(TOUCHENEX_UTIL.isMobile()){
							$("#popChangeFrm")[0].reset();
						}
					});
				} else {
					error.message = uiCtrl.getLang("wrong_password_counter_exceed").replace("%1", KSBizConfig.passwordCounter);
					uiCtrl.errorAlert(error);
				}
			} else if(error.status == uiCtrl.getErrorCode("CLOUD_WRONG_PASSWORD")){
				error.message = uiCtrl.getLang("cloud_wrong_password_message").replace("%2", error.maxFailCount);
				error.message += uiCtrl.getLang("cloud_wrong_password_failcounter").replace("%1", error.failCount);
				uiCtrl.errorAlert(error, function(){
					$("#pwChange").click();
				});	
			} else if(error.status == uiCtrl.getErrorCode("CLOUD_WRONG_PASSWORD_EXCEED")){
				error.message = uiCtrl.getLang("cloud_wrong_password_counter_exceed").replace("%1", KSBizConfig.cloudPasswordCounter);
				uiCtrl.errorAlert(error);
			} else {
				uiCtrl.errorAlert(error);
			}
		} else {
			cxInvokeCommon.runCallback(response);
		}
	},
	// sign callback
	signCallback : function(response, error){
		ui.loading.end();
		if(error) error = cxInvokeCommon.errorCheck(error);
		if(error){
			kslog("clientCtrl.signCallback.error", error);
			cxInvokeCommon.removeCallback();
			if(error.status == uiCtrl.getErrorCode("PRIPWDNOTMATCH") || error.status == uiCtrl.getErrorCode("HSMLOGIN") || error.status == uiCtrl.getErrorCode("P12PWDNOTMATCH")){
				if(cxInvokeCommon.pwdErrCount < KSBizConfig.passwordCounter - 1){
					cxInvokeCommon.pwdErrCount += 1;
					error.status = "";
					error.message = uiCtrl.getLang("wrong_password_msg");
					error.message += uiCtrl.getLang("wrong_password_counter_msg").replace("%1", KSBizConfig.passwordCounter).replace("%2", cxInvokeCommon.pwdErrCount);
					uiCtrl.errorAlert(error, function(){
						$("#certFrm")[0].reset();
						if(TOUCHENEX_UTIL.isMobile()){
							$("#certFrm")[0].reset();
						}
					});		
				} else {
						error.status = "";
						error.message = uiCtrl.getLang("wrong_password_counter_exceed").replace("%1", KSBizConfig.passwordCounter);
						uiCtrl.errorAlert(error, function(){
							error.status = uiCtrl.getOldErrorCode("PASSWORD_NOT_MATCH");
							error.message = uiCtrl.getLang("wrong_password");
							uiCtrl.errorClose(error);
						});
					}
			} else if(error.status == uiCtrl.getErrorCode("CACHENOTEXIST")){	// autosign=1
				uiCtrl.errorClose(error);
			} else if(error.status == uiCtrl.getErrorCode("CACHENOTEXISTREOPEN")){	// autosign=2
				cxCtrl.setSignOption("autosign", 0);
				init.initConfig();
			} else if(error.status == uiCtrl.getErrorCode("PKCS7SIGN")){	// 모바일 서명 후 에러가 난 경우 체크
				var currStore = cxCtrl.getCurrentStorage();
				if(currStore == CXCONST.STORAGE.USIM || currStore == CXCONST.STORAGE.HSM || currStore == CXCONST.STORAGE.PHONE){
					uiCtrl.errorAlert(error);
				} else {
					uiCtrl.errorAlert(error, function(){
						uiCtrl.errorClose(error);
					});
				}
			} else if(error.status == uiCtrl.getErrorCode("CLOUD_WRONG_PASSWORD")){
				error.message = uiCtrl.getLang("cloud_wrong_password_message").replace("%2", error.maxFailCount);
				error.message += uiCtrl.getLang("cloud_wrong_password_failcounter").replace("%1", error.failCount);
				uiCtrl.errorAlert(error, function(){
					$("#certFrm")[0].reset();
				});	
			} else if(error.status == uiCtrl.getErrorCode("CLOUD_WRONG_PASSWORD_EXCEED")){
				error.message = uiCtrl.getLang("cloud_wrong_password_counter_exceed").replace("%1", KSBizConfig.cloudPasswordCounter);
				uiCtrl.errorAlert(error, function(){
					$("#certFrm")[0].reset();
				});	
			} else if(error.status == uiCtrl.getErrorCode("HSM_LOCKED")){
				error.message = uiCtrl.getLang("hsm_pin_locked");
				uiCtrl.errorAlert(error, function(){
					$("#certFrm")[0].reset();
				});	
			} else {
				uiCtrl.errorClose(error);
			}
		} else {
			if(cxCtrl.getCurrentStorage() == CXCONST.STORAGE.LOCAL_DISK || cxCtrl.getCurrentStorage() == CXCONST.STORAGE.REMOVABLE_DISK){
				if(cxCtrl.getOptions().autosign
					&& (cxCtrl.getOptions().autosign == "3" || cxCtrl.getOptions().autosign == "4")){
					sessionStorage.setItem("autosign", true);
				}
			}
			cxInvokeCommon.runCallback(response);
		}
	},
	requestDiskCertificateCallback : function(response, error){ 
		ui.loading.end();
		if(error) error = cxInvokeCommon.errorCheck(error);
		if(error){
			kslog("invokeCallback.requestDiskCertificateCallback", error);
			cxInvokeCommon.removeCallback();
			uiCtrl.errorAlert(error, function(){
				// 참조번호 인가코드 에러인 경우 close
				if(error.status == uiCtrl.getErrorCode("REQUESTCERT_REFNUM") || error.status == uiCtrl.getErrorCode("REQUESTCERT_AUTHCODE")){
					uiCtrl.errorClose(error);
				}
			});
		} else {
			var storage = response.storage;
			var drive = response.drive;
			var cid = response.cid;
			cxsign.issueCopyInfo.storage = storage;
			cxsign.issueCopyInfo.drive = drive;
			cxsign.issueCopyInfo.cid = cid;
			if(!cxInvokeCommon.issueCopyInfo.prdt){
				cxsign.issueCopyInfo.prdt = response.prdt;
			} else{
				cxsign.issueCopyInfo.prdt = cxInvokeCommon.issueCopyInfo.prdt;
			}
			if(!cxInvokeCommon.issueCopyInfo.prdt_type){
				cxsign.issueCopyInfo.prdt_type = response.prdt_type;
			} else{
				cxsign.issueCopyInfo.prdt_type = cxInvokeCommon.issueCopyInfo.prdt_type;
			}

			if(((storage == CXCONST.STORAGE.LOCAL_DISK || storage == CXCONST.STORAGE.REMOVABLE_DISK || storage == CXCONST.STORAGE.BROWSER || storage == "browser2") && cxCtrl.getOptions().additionalCopycert) 
			&& !((response.type == "1.2.410.200005.1.1.1" && typeof response.subjectDN != "undefined" && response.subjectDN.toLowerCase().indexOf("personalb") > -1) || 
			(response.type == "1.2.410.200005.1.1.5" && typeof response.subjectDN != "undefined" && response.subjectDN.toLowerCase().indexOf("corporation4ecb") > -1)) 
			&& !TOUCHENEX_UTIL.isMobile()) {
				ui.confirm(uiCtrl.getLang("additional_copycert"), function(){
					cxInvokeCommon.issueCopyInfo.storage = storage;
					cxInvokeCommon.issueCopyInfo.drive = drive;
					cxInvokeCommon.issueCopyInfo.cid = cid;
					cxInvokeCommon.issueCopyInfo.copy = true;
					kslog("cxInvokeCommon.requestDiskCertificateCallback.issueCopyInfo", cxInvokeCommon.issueCopyInfo);
					if(storage == CXCONST.STORAGE.BROWSER || storage == "browser2"){
						var storageList = cxCtrl.getStorageDisable("copyTarget");
						cxCtrl.setStorageDisable("issue", storageList + "|BROWSER");
					} else if(storage == CXCONST.STORAGE.LOCAL_DISK){
						var storageList = cxCtrl.getStorageDisable("copyTarget");
						cxCtrl.setStorageDisable("issue", storageList + "|LOCAL_DISK");
					} else if(storage == CXCONST.STORAGE.REMOVABLE_DISK){
						var storageList = cxCtrl.getStorageDisable("copyTarget");
						cxCtrl.setStorageDisable("issue", storageList);
					}
					// interface callback remove
					cxInvokeCommon.removeCallback();
					// issue_area init
					$(".storage_lst li").removeClass("on").removeClass("disable").removeClass("clicked").addClass("disable");
					$(".storage_more li").removeClass("on").removeClass("disable").removeClass("clicked").addClass("disable");
					cxCtrl.setSelectDrive();
					$(".choice_box").html("");
					$(".issue_area .enter_area").hide();
					$(".issue_area .pin_area").hide();
					$(".issue_area .storage_area").show();
					ui.storageVitalize();
					ui.storageAddEvent();
					$(".issue_area .storage_area .btn_wht2, .issue_area .pin_area .btn_wht2").off("click").on("click", function(){
						uiCtrl.callbackClose("OK");
					});

				}, function(){
					ui.alert(uiCtrl.getLang("request_cert_success"), function(){
						cxInvokeCommon.runCallback("OK");
					});
				});
			} else {
				ui.alert(uiCtrl.getLang("request_cert_success"), function(){
					cxInvokeCommon.runCallback("OK");
				});
			}
		}
	},
	updateDiskCertificateCallback : function(response, error){
		ui.loading.end();
		if(error) error = cxInvokeCommon.errorCheck(error);
		if(error){
			kslog("invokeCallback.updateDiskCertificateCallback", error);
			cxInvokeCommon.removeCallback();
			if(error.status == uiCtrl.getErrorCode("UPDATECERET_PWD_INVALID")){
				if(cxInvokeCommon.pwdErrCount < KSBizConfig.passwordCounter - 1){
					cxInvokeCommon.pwdErrCount += 1;
					error.message = uiCtrl.getLang("wrong_password_msg");
					error.message += uiCtrl.getLang("wrong_password_counter_msg").replace("%1", KSBizConfig.passwordCounter).replace("%2", cxInvokeCommon.pwdErrCount);
					uiCtrl.errorAlert(error, function(){
						$("#certFrm")[0].reset();
					});
				} else {
					error.message = uiCtrl.getLang("wrong_password_counter_exceed").replace("%1", KSBizConfig.passwordCounter);
					uiCtrl.errorAlert(error, function(){
						uiCtrl.winClose();
					});
				}
			} else if(error.status == uiCtrl.getErrorCode("CLOUD_WRONG_PASSWORD")){
				error.message = uiCtrl.getLang("cloud_wrong_password_message").replace("%2", error.maxFailCount);
				error.message += uiCtrl.getLang("cloud_wrong_password_failcounter").replace("%1", error.failCount);
				uiCtrl.errorAlert(error, function(){
					$("#certFrm")[0].reset();
				});	
			} else if(error.status == uiCtrl.getErrorCode("CLOUD_WRONG_PASSWORD_EXCEED")){
				error.message = uiCtrl.getLang("cloud_wrong_password_counter_exceed").replace("%1", KSBizConfig.cloudPasswordCounter);
				uiCtrl.errorAlert(error, function(){
					$("#certFrm")[0].reset();
				});	
			} else {
				uiCtrl.errorAlert(error);
			}
		} else {
			ui.alert(uiCtrl.getLang("update_cert_success"), function(){
				cxInvokeCommon.runCallback(response);
			});
		}
	},
	issueCopyCertCallback : function(response, error){
		ui.loading.end();
		if(error) error = cxInvokeCommon.errorCheck(error);
		if(error){
			kslog("invokeCallback.commonCallback", error);
			cxInvokeCommon.removeCallback();
			uiCtrl.errorAlert(error);
		} else {
			ui.alert(uiCtrl.getLang("request_cert_success"), function(){
				cxInvokeCommon.runCallback("OK");
			});
		}
	},
	exportCertCallback : function(response, error){
		ui.loading.end();
		if(error) error = cxInvokeCommon.errorCheck(error);
		if(error){
			kslog("invokeCallback.exportCertCallback", error);
			cxInvokeCommon.removeCallback();
			if(cxCtrl.isExportCertPage()){
				if(error.status == uiCtrl.getErrorCode("PRIPWDNOTMATCH") || error.status == uiCtrl.getErrorCode("HSMLOGIN") || error.status == uiCtrl.getErrorCode("P12PWDNOTMATCH")){
					if(cxInvokeCommon.pwdErrCount < KSBizConfig.passwordCounter - 1){
						cxInvokeCommon.pwdErrCount += 1;
						error.status = "";
						error.message = uiCtrl.getLang("wrong_password_msg");
						error.message += uiCtrl.getLang("wrong_password_counter_msg").replace("%1", KSBizConfig.passwordCounter).replace("%2", cxInvokeCommon.pwdErrCount);
						uiCtrl.errorAlert(error, function(){
							if(TOUCHENEX_UTIL.isMobile()){
								$("#certFrm")[0].reset();
							} else {
								$("#certFrm")[0].reset();
							}
						});
					} else {
						error.status = "";
						error.message = uiCtrl.getLang("wrong_password_counter_exceed").replace("%1", KSBizConfig.passwordCounter);
						uiCtrl.errorAlert(error, function(){
							error.status = uiCtrl.getOldErrorCode("PASSWORD_NOT_MATCH");
							error.message = uiCtrl.getLang("wrong_password");
							uiCtrl.errorClose(error);
						});
					} 
				} else if(error.status == uiCtrl.getErrorCode("CLOUD_WRONG_PASSWORD")){
					error.message = uiCtrl.getLang("cloud_wrong_password_message").replace("%2", error.maxFailCount);
					error.message += uiCtrl.getLang("cloud_wrong_password_failcounter").replace("%1", error.failCount);
					uiCtrl.errorAlert(error, function(){
						$("#certFrm")[0].reset();
					});	
				} else if(error.status == uiCtrl.getErrorCode("CLOUD_WRONG_PASSWORD_EXCEED")){
						error.message = uiCtrl.getLang("cloud_wrong_password_counter_exceed").replace("%1", KSBizConfig.cloudPasswordCounter);
						uiCtrl.errorAlert(error, function(){
							$("#certFrm")[0].reset();
						});	
					} else{
						uiCtrl.errorAlert(error, function(){
							uiCtrl.errorClose(error);
						});
					}					
			} else if(error.status == uiCtrl.getErrorCode("CLOUD_WRONG_PASSWORD")){
				error.message = uiCtrl.getLang("cloud_wrong_password_message").replace("%2", error.maxFailCount);
				error.message += uiCtrl.getLang("cloud_wrong_password_failcounter").replace("%1", error.failCount);
				uiCtrl.errorAlert(error, function(){
					$("#certFrm")[0].reset();
				});	
			} else {
				if(error.status == uiCtrl.getErrorCode("CLOUD_WRONG_PASSWORD_EXCEED")){
					error.message = uiCtrl.getLang("cloud_wrong_password_counter_exceed").replace("%1", KSBizConfig.cloudPasswordCounter);
					uiCtrl.errorAlert(error, function(){
						$("#certFrm")[0].reset();
					});	
				} else{
					uiCtrl.errorAlert(error, function(){
						$("#certFrm")[0].reset();
					});
				}
			}
		} else {
			cxInvokeCommon.runCallback(response);
		}
	}
};

// client storage interface
var clientCtrl = {
	getDiskStatus : function(storage, callback){
		if(KeySharpBiz.chkInit(arguments)){
			cxInvokeCommon.addCallback(callback);
			ksbizExtInterface.getDiskStatus(storage, cxInvokeCommon.commonCallback);
		}
	},
	getDiskList : function(storage, drive, options, callback){
		if(KeySharpBiz.chkInit(arguments)){
			cxInvokeCommon.addCallback(callback);
			if(!options) options = {};
			options.issuerCertFilter = KSBizConfig.issuerCertFilter;
			options.policyOidCertFilter = KSBizConfig.policyOidCertFilter;
			ksbizExtInterface.getDiskList(storage, drive, options, cxInvokeCommon.getDiskListCallback);
		}
	},
	certDiskInfo : function(cert, callback){
		if(KeySharpBiz.chkInit(arguments)){
			cxInvokeCommon.addCallback(callback);
			ksbizExtInterface.certDiskInfo(cert.storage, cert.drive, cert.cid, cxInvokeCommon.commonCallback);
		}
	},
	deleteDiskCert : function(storage, drive, cid, tprdt, tprdt_type, callback){
		if(KeySharpBiz.chkInit(arguments)){
			cxInvokeCommon.addCallback(callback);
			ksbizExtInterface.deleteDiskCert(storage, drive, cid, tprdt, tprdt_type, cxInvokeCommon.commonCallback);
		}
	},
	signStorage : function(storage, drive, cid, pwdStr, pwdType, plain, options, callback){
		if(KeySharpBiz.chkInit(arguments)){
			cxInvokeCommon.addCallback(callback);
			ksbizExtInterface.signStorage(storage, drive, cid, pwdStr, pwdType, plain, options, cxInvokeCommon.signCallback);
		}
	},
	signCert : function(certType, certData, pwdStr, pwdType, plain, options, callback){
		if(KeySharpBiz.chkInit(arguments)){
			cxInvokeCommon.addCallback(callback);
			ksbizExtInterface.signCert(certType, certData, pwdStr, pwdType, plain, options, cxInvokeCommon.signCallback);
		}
	},
	importCert : function(storage, drive, type, b64data, prdt, prdt_type, tprdt, tprdt_type, options, callback){
		if(KeySharpBiz.chkInit(arguments)){
			cxInvokeCommon.addCallback(callback);
			importCertCallback = function(response, error){
				ui.loading.end();
				if(error){
					kslog("clientCtrl.importCert.error", error);
					ui.loading.end();
					cxInvokeCommon.runCallback(false, error);
					return;
				}

				// dream security 설치 필요한 경우 인증서창 종료
				if(typeof response.installed != "undefined" && response.installed == "FALSE"){
					if(cxCtrl.isManageCertPage()){
						uiCtrl.winClose();
					} else {
						uiCtrl.errorClose({
							status : uiCtrl.getOldErrorCode("INSTALLCLOSE"),
							message : ""
						});
					}
					return;
				}

				cxInvokeCommon.runCallback(true);
			}
			ksbizExtInterface.importDiskCert(storage, drive, type, b64data, prdt, prdt_type, tprdt, tprdt_type, options, importCertCallback);
		}
	},
	changePwdCert : function(storage, drive, cid, prdt, prdt_type, nprdt, nprdt_type, callback){
		if(KeySharpBiz.chkInit(arguments)){
			cxInvokeCommon.addCallback(callback);
			ksbizExtInterface.changePwdDiskCert(storage, drive, cid, prdt, prdt_type, nprdt, nprdt_type, cxInvokeCommon.changePwdCertCallback);
		}
	},
	exportCert : function(storage, drive, cid, prdt, prdt_type, type, callback){
		if(KeySharpBiz.chkInit(arguments)){
			cxInvokeCommon.addCallback(callback);
			if(type == "raw"){
				ksbizExtInterface.exportDiskCert(storage, drive, cid, prdt, prdt_type, cxInvokeCommon.commonCallback);
			} else if(type == "p12") {
				ksbizExtInterface.getDiskCert(storage, drive, cid, prdt, prdt_type, cxInvokeCommon.commonCallback);
			}
		}
	},
	downloadCert : function(filename, filedata, callback){
		if(KeySharpBiz.chkInit(arguments)){
			cxInvokeCommon.addCallback(callback);
			ksbizExtInterface.makeLocalLinkURL(filename, filedata, cxInvokeCommon.commonCallback);
		}
	},
	downLocalLinkURL : function(url, callback){
		if(KeySharpBiz.chkInit(arguments)){
			cxInvokeCommon.addCallback(callback);
			ksbizExtInterface.downLocalLinkURL(url, cxInvokeCommon.commonCallback);
		}
	},
	copyCert : function(fStorage, fDrive, tStorage, tDrive, cid, prdt, prdt_type, tprdt, tprdt_type, callback){
		if(KeySharpBiz.chkInit(arguments)){
			cxInvokeCommon.addCallback(callback);
			ksbizExtInterface.copyDiskCert(fStorage, fDrive, tStorage, tDrive, cid, prdt, prdt_type, tprdt, tprdt_type, cxInvokeCommon.commonCallback);
		}
	},
	requestDiskCertificate : function(ca, host, port, referenceValue, secretValue, storage, drive, prdt, prdt_type, options, callback){
		if(KeySharpBiz.chkInit(arguments)){
			cxInvokeCommon.addCallback(callback);
			cxInvokeCommon.issueCopyInfo = {};
			cxInvokeCommon.issueCopyInfo.prdt = prdt;
			cxInvokeCommon.issueCopyInfo.prdt_type = prdt_type;
			ksbizExtInterface.requestDiskCertificate(ca, host, port, referenceValue, secretValue, storage, drive, prdt, prdt_type, options, cxInvokeCommon.requestDiskCertificateCallback);
		}
	},
	updateDiskCertificate : function(ca, host, port, storage, drive, cid, prdt, prdt_type, options, callback){
		if(KeySharpBiz.chkInit(arguments)){
			cxInvokeCommon.addCallback(callback);
			ksbizExtInterface.updateDiskCertificate(ca, host, port, storage, drive, cid, prdt, prdt_type, options, cxInvokeCommon.updateDiskCertificateCallback);
		}
	},
	issueCopyCert : function(tStorage, tDrive, tprdt, tprdt_type){
		if(KeySharpBiz.chkInit(arguments)){
			cxInvokeCommon.addCallback(uiCtrl.callbackClose);
			var fStorage = cxInvokeCommon.issueCopyInfo.storage;
			var fDrive = cxInvokeCommon.issueCopyInfo.drive;
			var cid = cxInvokeCommon.issueCopyInfo.cid;
			var prdt = cxInvokeCommon.issueCopyInfo.prdt;
			var prdt_type = cxInvokeCommon.issueCopyInfo.prdt_type;
			ksbizExtInterface.copyDiskCert(fStorage, fDrive, tStorage, tDrive, cid, prdt, prdt_type, tprdt, tprdt_type, cxInvokeCommon.issueCopyCertCallback);
		}
	}
};

// browser storage interface
var browserCtrl = {
	getBrowserStorageType : function(){
		if(KSBizConfig.yessignOpenCertUse){
			return "browser2";
		} else {
			return "browser";
		}
	},
	getDiskList : function(storage, options, callback){
		cxInvokeCommon.addCallback(callback);
		if(!options) options = {};
		options.issuerCertFilter = KSBizConfig.issuerCertFilter;
		options.policyOidCertFilter = KSBizConfig.policyOidCertFilter;
		options.securekeyboard = KSBizConfig.secureKeyboardConfig;
		if(cxCtrl.getOptions() && typeof cxCtrl.getOptions().disableExpireFilter != "undefined"){
			options.disableExpireFilter = cxCtrl.getOptions().disableExpireFilter;
		} else {
			options.disableExpireFilter = KSBizConfig.disableExpireFilter;
		}
		setTimeout(function(){
			storage = browserCtrl.getBrowserStorageType();
			kslog("browserCtrl.getDiskList XWC.loadCertList request", {"storage": storage,"options": options});
			XWC.loadCertList({"storage": storage,"options": options}, function(response){
				kslog("browserCtrl.getDiskList XWC.loadCertList response", response);
				cxInvokeCommon.commonCallback(response);
			}, function(error) {
				kslog("browserCtrl.getDiskList XWC.loadCertList error", error);
				cxInvokeCommon.commonCallback(null, error);
			});
		});
	},
	certDiskInfo : function(cert, callback){
		cxInvokeCommon.addCallback(callback);
		setTimeout(function(){
			var oldstorage = cert.storage;
			cert.storage = browserCtrl.getBrowserStorageType();
			kslog("browserCtrl.certDiskInfo XWC.loadCertInfo request", cert);
			XWC.loadCertInfo(cert, function(response){
				cert.storage = oldstorage;
				kslog("browserCtrl.certDiskInfo XWC.loadCertInfo response", response);
				cxInvokeCommon.commonCallback(response);
			},function(error){
				cert.storage = oldstorage;
				kslog("browserCtrl.certDiskInfo XWC.loadCertInfo error", error);
				cxInvokeCommon.commonCallback(null, error);
			});
		});
	},
	deleteDiskCert : function(cert, callback){
		cxInvokeCommon.addCallback(callback);
		setTimeout(function(){
			var oldstorage = cert.storage;
			cert.storage = browserCtrl.getBrowserStorageType();
			kslog("browserCtrl.deleteDiskCert XWC.removeCert request", cert);
			XWC.removeCert(cert, function(result) {
				cert.storage = oldstorage;
				kslog("browserCtrl.deleteDiskCert XWC.removeCert response", result);
				cxInvokeCommon.commonCallback(true);
			},function(error){
				cert.storage = oldstorage;
				kslog("browserCtrl.deleteDiskCert XWC.removeCert error", error);
				cxInvokeCommon.commonCallback(false, error);
			});
		});
	},
	signStorage : function(storage, cid, pwdStr, pwdType, plain, options, callback){
		cxInvokeCommon.addCallback(callback);
		var spec = {};
		spec.storage = browserCtrl.getBrowserStorageType();
		spec.cid = cid;
		spec.data = plain;
		spec.options = options;
		spec.options.securekeyboard = KSBizConfig.secureKeyboardConfig;
		spec.crdt = pwdStr;
		spec.crdt_type = pwdType;
		setTimeout(function(){
			kslog("browserCtrl.signStorage XWC.sign request", spec);
			XWC.sign(spec, function(response) {
				kslog("browserCtrl.signStorage XWC.sign response", response);
				cxInvokeCommon.signCallback(response);
			}, function(error){
				kslog("browserCtrl.signStorage XWC.sign error", error);
				cxInvokeCommon.signCallback(null, error);
			});
		});
	},
	signCert : function(certType, certData, pwdStr, pwdType, plain, options, callback){
		cxInvokeCommon.addCallback(callback);
		var spec = {};
		spec.storage = "none";
		spec.data = plain;
		spec.options = options;
		spec.options.securekeyboard = KSBizConfig.secureKeyboardConfig;
		spec.type = certType;
		spec.b64data = certData;
		spec.crdt = pwdStr;
		spec.crdt_type = pwdType;
		setTimeout(function(){
			kslog("browserCtrl.signCert XWC.sign request", spec);
			XWC.sign(spec, function(response){
				kslog("browserCtrl.signCert XWC.sign response", response);
				cxInvokeCommon.signCallback(response);
			}, function(error){
				kslog("browserCtrl.signCert XWC.sign error", error);
				cxInvokeCommon.signCallback(null, error);
			});
		});
	},
	importCert : function(certType, certData, pwdStr, pwdType, callback){
		cxInvokeCommon.addCallback(callback);
		var spec = {};
		spec.storage = browserCtrl.getBrowserStorageType();
		spec.options = {};
		spec.options.securekeyboard = KSBizConfig.secureKeyboardConfig;
		spec.type = certType;
		if(certData.indexOf("|") != -1){
			var data = certData.split("|");
			spec.b64data = data[0];
			spec.timestamp = data[1];
		} else{
			spec.b64data = certData;
		}
		spec.crdt = pwdStr;
		spec.crdt_type = pwdType;
		spec.overwrite = true;
		setTimeout(function(){
			kslog("browserCtrl.importCert XWC.importCertFromData request", spec);
			XWC.importCertFromData(spec, function(response){
				ui.loading.end();
				kslog("browserCtrl.importCert XWC.importCertFromData response", response);
				cxInvokeCommon.runCallback(response);
			}, function(error){
				ui.loading.end();
				kslog("browserCtrl.importCert XWC.importCertFromData error", error);
				if(TOUCHENEX_UTIL.isMobile()){
					$("#certFrm")[0].reset();
				}
				cxInvokeCommon.runCallback(false, error);
			});
		});
	},
	changePwdCert : function(cid, prdt, prdt_type, nprdt, nprdt_type, callback){
		cxInvokeCommon.addCallback(callback);
		var spec = {};
		spec.storage = browserCtrl.getBrowserStorageType();
		spec.cid = cid;
		spec.crdt = prdt;
		spec.crdt_type = prdt_type;
		spec.newCrdt = nprdt;
		spec.newCrdt_type = nprdt_type;
		spec.options = {};
		spec.options.securekeyboard = KSBizConfig.secureKeyboardConfig;
		setTimeout(function(){
			kslog("browserCtrl.changePwdCert XWC.changePassword request", spec);
			XWC.changePassword(spec, function() {
				cxInvokeCommon.changePwdCertCallback(true);
			}, function(error) {
				cxInvokeCommon.changePwdCertCallback(false, error);
			});
		});
	},
	exportCert : function(cid, crdt, crdt_type, exportType, callback){
		cxInvokeCommon.addCallback(callback);
		var spec = {};
		spec.storage = browserCtrl.getBrowserStorageType();
		spec.cid = cid;
		spec.crdt = crdt;
		spec.crdt_type = crdt_type;
		spec.exportType = exportType;
		spec.options = {};
		spec.options.securekeyboard = KSBizConfig.secureKeyboardConfig;
		setTimeout(function(){
			kslog("browserCtrl.exportCert XWC.exportCert request", spec);
			XWC.exportCert(spec, function(result) {
				cxInvokeCommon.exportCertCallback(result.data);
			}, function(error){
				cxInvokeCommon.exportCertCallback("", error);
			});
		});
	},
	requestDiskCertificate : function(orgName, refnum, authcode, crdt, crdt_type, callback){
		cxInvokeCommon.addCallback(callback);
		var spec = {};
		spec.storage = browserCtrl.getBrowserStorageType();
		spec.orgName = orgName;
		spec.cmpUrl = KSBizConfig.ca[orgName].url;
		spec.refnum = refnum;
		spec.authcode = authcode;
		spec.crdt = crdt;
		spec.crdt_type = crdt_type;
		spec.options = {};
		spec.options.securekeyboard = KSBizConfig.secureKeyboardConfig;
		setTimeout(function(){
			kslog("browserCtrl.exportCert XWC.requestDiskCertificate request", spec);
			XWC.issueCert(spec, function(result) {
				cxsign.isbrowser = true;
				result.storage = browserCtrl.getBrowserStorageType();
				result.prdt = crdt;
				result.prdt_type = crdt_type;
				cxInvokeCommon.requestDiskCertificateCallback(result);
			}, function(error){
				cxInvokeCommon.requestDiskCertificateCallback("", error);
			});
		});
	},
	updateDiskCertificate : function(orgName,cid, crdt, crdt_type, callback){
		cxInvokeCommon.addCallback(callback);
		var spec = {};
		spec.storage = browserCtrl.getBrowserStorageType();
		spec.orgName = orgName;
		spec.cmpUrl = KSBizConfig.ca[orgName].url;
		spec.cid = cid;
		spec.crdt = crdt;
		spec.crdt_type = crdt_type;
		spec.newCrdt = crdt;
		spec.newCrdt_type = crdt_type;
		spec.options = {};
		spec.options.securekeyboard = KSBizConfig.secureKeyboardConfig;
		setTimeout(function(){
			kslog("browserCtrl.exportCert XWC.updateDiskCertificate request", spec);
			XWC.updateCert(spec, function(result) {
				cxInvokeCommon.updateDiskCertificateCallback(result);
			}, function(error){
				cxInvokeCommon.updateDiskCertificateCallback("", error);
			});
		});
	},
	//브라우저끼리 인증서 복사 시 사용할 interface정의
	copyBrowserCert : function(cid, crdt, crdt_type, callback){
		cxInvokeCommon.addCallback(callback);
		var spec = {};
		spec.storage = browserCtrl.getBrowserStorageType();
		spec.cid = cid;
		spec.crdt = crdt;
		spec.crdt_type = crdt_type;
		spec.options = {};
		spec.options.securekeyboard = KSBizConfig.secureKeyboardConfig;
		setTimeout(function(){
			kslog("browserCtrl.copyBrowserCert XWC.copyBrowserCert request", spec);
			XWC.copyBrowserCert(spec, function(result) {
				cxInvokeCommon.exportCertCallback(result.data);
			}, function(error){
				cxInvokeCommon.exportCertCallback("", error);
			});
		});
	},
	hashPlainText : function(plainText, msgType, callback){
		cxInvokeCommon.addCallback(callback);
		var spec = {};
		spec.plainText = plainText;
		spec.msgType = msgType;
		setTimeout(function(){
			kslog("browserCtrl.hashPlainText request", spec);
			XWC.hashPlainText(spec, function(response){
				cxInvokeCommon.runCallback(response);
			}, function(error){
				cxInvokeCommon.runCallback(error);
			});
		});
	},
	signSmartUsim : function(b64SignedData, b64Signer, hashedData, plainText, sourceData, msgType, callback){
		cxInvokeCommon.addCallback(callback);
		var spec = {};
		spec.b64SignedData = b64SignedData;
		spec.b64Signer = b64Signer;
		spec.hashedData = hashedData;
		spec.plainText = plainText;
		spec.sourceData = sourceData;
		spec.msgType = msgType;
		setTimeout(function(){
			kslog("browserCtrl.signSmartUsim request", spec);
			XWC.signSmartUsim(spec, function(response){
				cxInvokeCommon.runCallback(response);
			}, function(error){
				cxInvokeCommon.runCallback(error);
			});
		});
	}
};

// ERROR CODE
var CXSIGN_ERROR = {
	"0001" : {codename : "PRAMISNULL"},
	"0002" : {codename : "SESSIONNOTEXIST"},
	"0003" : {codename : "PROPERTYNOTEXIST"},
	"0004" : {codename : "RESULTNOTEXIST"},
	"0005" : {codename : "UILIBLOADFAILED"},
	"0006" : {codename : "UILIBNOTSUPPORT"},
	"0007" : {codename : "UILIBPOPUPFAILED"},
	"0008" : {codename : "NOTYETSUPPORT"},
	"0009" : {codename : "NOTSUPPORT"},
	"000A" : {codename : "FILECOMPRESS"},
	"000B" : {codename : "FILEUNCOMPRESS"},
	"000C" : {codename : "CHANNELINIT_SERVERCERT", desc : "crypto_error"},
	"000D" : {codename : "CHANNELINIT_MAKESKEY", desc : "crypto_error"},
	"000F" : {codename : "CHANNELINIT_MAKEP7ED", desc : "crypto_error"},
	"0010" : {codename : "CHANNEL_NOTINIT", desc : "crypto_error"},
	"0011" : {codename : "CHANNEL_ENCRYPT", desc : "crypto_error"},
	"0012" : {codename : "CHANNEL_DECRYPT", desc : "crypto_error"},
	"0013" : {codename : "CHANNELINIT_CACERT_VERIFY", desc : "crypto_error"},
	"0014" : {codename : "INVALIDDRIVER"},
	"0015" : {codename : "CERTLOAD"},
	"0016" : {codename : "CERTNOTEXIST"},
	"0017" : {codename : "PRIPWDNOTMATCH", desc : "wrong_password_msg"},	// 비밀번호 틀림
	"0018" : {codename : "PRIKEYLOAD"},
	"0019" : {codename : "PKCS7SIGN"},
	"001A" : {codename : "DELETECERT"},
	"001B" : {codename : "COPYCERT"},
	"001C" : {codename : "SAVECERT"},
	"001D" : {codename : "MAKEPKCS12", desc : "wrong_password_msg"},	// 비밀번호 틀림
	"001E" : {codename : "TBETCEXECUTE"},
	"001F" : {codename : "TBETCEXIST"},
	"0020" : {codename : "PKCS7LOAD"},
	"0021" : {codename : "PKCS7SIGNEDDATAADDSINGER"},
	"0022" : {codename : "PKCS7SIGNEDDATAVERIFY"},
	"0023" : {codename : "PKCS7EVELOPEDDATA"},
	"0024" : {codename : "FINDCERTLIST"},
	"0025" : {codename : "HSMLOGIN", desc : "incorrect_hsm_password"},	// HSM 비밀번호 틀림
	"0026" : {codename : "VIRTUALKEY"},
	"0027" : {codename : "USERCANCEL"},	// 취소
	"0028" : {codename : "FILENOTEXIST"},
	"0029" : {codename : "IMPORTP12"},
	"002A" : {codename : "DEVICENOT", desc : "not_exist_hsm"},
	"002B" : {codename : "CACHENOTEXIST", desc : "autosign_not_saved"},			// autosign = 1 인 경우 에러를 document로 내린다.
	"002C" : {codename : "CACHENOTEXISTREOPEN"},	// autosign = 2 인 경우 클라이언트에서 응답받고 창을 띄운다.
	"002D" : {codename : "SIGN", desc : "xmldsig_fail"},
	"002E" : {codename : "SIGNFILE"},
	"002F" : {codename : "ADDSIGNFILE"},
	"0030" : {codename : "UPLOAD"},
	"0031" : {codename : "DOWNLOAD"},
	"0032" : {codename : "CHANNEL2_SHSM_FORMAT", desc : "crypto_error"},
	"0033" : {codename : "CHANNEL2_CACERT_VERIFY", desc : "crypto_error"},
	"0034" : {codename : "CHANNEL2_SKE_VERIFY", desc : "crypto_error"},
	"0035" : {codename : "CHANNEL2_MAKE_ECDHKEYPAIR", desc : "crypto_error"},
	"0036" : {codename : "CHANNEL2_MAKE_CKESIGN", desc : "crypto_error"},
	"0037" : {codename : "CHANNEL2_MAKE_PMS", desc : "crypto_error"},
	"0038" : {codename : "CHANNEL2_MAKE_MS", desc : "crypto_error"},
	"0049" : {codename : "CHANNEL2_MAKE_CF", desc : "crypto_error"},
	"004A" : {codename : "CHANNEL2_CERTREEQ_NOTEXIST", desc : "crypto_error"},
	"004B" : {codename : "CHANNEL2_CERTREEQ_VERIFY", desc : "crypto_error"},
	"004C" : {codename : "CHANNEL2_MAKE_CERTREQ_SIGN", desc : "crypto_error"},
	"004D" : {codename : "CHANNEL2_VERIFY_SF", desc : "crypto_error"},
	"004E" : {codename : "CHANNEL2_NOTINIT", desc : "crypto_error"},
	"004F" : {codename : "CHANNEL2_ENCRYPT", desc : "crypto_error"},
	"0050" : {codename : "CHANNEL2_DECRYPT", desc : "crypto_error"},
	"0051" : {codename : "CHANNEL2_SHSP_FORMAT", desc : "crypto_error"},
	"0052" : {codename : "IMPORT_CERT", desc : "crosscert_import_fail"},
	"0053" : {codename : "P12PWDNOTMATCH", desc : "wrong_password_msg"},	// p12 비밀번호 틀림
	"0054" : {codename : "CHANGECERTPWD"},
	"0055" : {codename : "REQUESTCERT", desc : "request_cert_fail"},
	"0056" : {codename : "REQUESTCERT_PWD_INVALID", desc : "request_cert_fail"},
	"0057" : {codename : "UPDATECERET", desc : "update_cert_fail"},
	"0058" : {codename : "UPDATECERET_PWD_INVALID", desc : "wrong_old_password_msg"},
	"0059" : {codename : "HEXDATA"},
	"005A" : {codename : "ALLOWPROC"},
	"005B" : {codename : "DEVICEINIT", desc : "certstore_error"},	// 연동 디바이스 초기화 오류
	"005C" : {codename : "USIMPWDLEN8", desc : "input_usim_password_fail"},
	"005D" : {codename : "CHANGECERTPWD_OLDPWD", desc : "wrong_old_password_msg"},	// 비번변경 이전 비번 틀림
	"005E" : {codename : "REQUESTCERT_REFNUM","desc":"request_cert_fail_refnum"},
	"005F" : {codename : "REQUESTCERT_AUTHCODE","desc":"request_cert_fail_authcode"},
	"0060" : {codename : "MAKELOCALLINKURL"},	// 로컬 다운로드 서버 생성 실패
	"0061" : {codename : "CERT_NOT_ALLOW", desc : "not_allow_cert_policy"}, //정책상 허용되지 않은 인증서
	"0062" : {codename : "CLOUD_WRONG_PASSWORD_EXCEED", desc : "cloud_wrong_password_counter_exceed"}, //10회이상 오입력한 클라우드 인증서
	"0063" : {codename : "CLOUD_WRONG_PASSWORD", desc : "cloud_wrong_password_counter"}, //클라우드 인증서 비밀번호 오류
	"0064" : {codename : "CLOUD_EXPIR_CERT", desc : "cloud_expire_cert"}, //클라우드에 만료된 인증서 저장시 나오는 오류
	"0F01" : {codename : "VERIFYSIG_KSBIZMAIN"},	// KSbizMain 라이브러리 변조
	"0F02" : {codename : "VERIFYSIG_KSBIZAPP"},	// KSbizApp 라이브러리 변조
	"0F03" : {codename : "VERIFYSIG_KSBIZ"},	// KSbiz.exe 파일 변조
	"0F04" : {codename : "HSM_LOCKED", desc : "hsm_pin_locked"},	// HSM 잠김
	"5053" : {codename : "CERT_ALREADY_EXIST"},	// 인증서가 이미 존재함
	"5054" : {codename : "CERT_NOT_SUPPORT", desc : "not_supported_cert"},	// 미지원 인증기관
	"5055" : {codename : "API_ERROR", desc : "api_key_error"}, // 발급된 API Key 값이 해당 도메인을 포함하고있지 않음
	"5056" : {codename : "API_LOAD_ERROR", desc : "api_key_load_error"} //발급받지 않은 API Key값 사용
};

KSBIZ_OLD_ERROR = {
	"-1004" : {codename : "PASSWORD_NOT_MATCH"},
	"-10301" : {codename : "INSTALLCLOSE"}
};