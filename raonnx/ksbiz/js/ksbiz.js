if ( !window.console ) console = {log : function( msg ) {}};

var KeySharpBiz = {
	bizInit : function(callback) {
		kslog("KeySharpBiz.bizInit", "start");
		TOUCHENEX_CHECK.check([ keysharpbizInfo ], function(check){
			if ( check.status ) {
				kslog("KeySharpBiz.bizInit", check);
				if ( TOUCHENEX_CHECK.chkInfoStatus.info[0].licExpire ) {
					var licExpire = TOUCHENEX_CHECK.chkInfoStatus.info[0].licExpire;
					if(KSBizConfig.licensealert) alert("라이센스 유효기간은 " + licExpire + " 까지입니다.");
				}
				TOUCHENEX_LOADING(function(){
					KSBizConfig.isloaded = true;
					KeySharpBiz.init(function(result){
						if(result){
							if(callback) callback(true);
						} else {
							if(callback) callback(false);
						}
					});
					kslog("KeySharpBiz.bizInit", "end");
				});
			} else {
				ksBizInstallPage();
			}
		});
	},

	//KeySharpBiz.chkInit(arguments)
	chkInit : function(callFunc) {
		var argParams = Array.prototype.slice.call(callFunc);
		if(!KSBizConfig.isloaded){
			// os/browser spec check
			if(KSbiz_SupportCheck()){
				KeySharpBiz.bizInit(function(loaded){
					if(loaded){
						(callFunc.callee).apply(this, argParams);
					} else {
						chkInit(callFunc);
					}
				});
			} else {
				kslog("KeySharpBiz.chkInit.KSbiz_SupportCheck", false);
				//안내페이지 이동시 사용
				//location.href = TouchEnNxConfig.installPage;
				return false;
			}
		} else {
			kslog("KeySharpBiz.chkInit", true);
			return true;
		}
		kslog("KeySharpBiz.chkInit", false);
		return false;
	},

    isInstall : function (goInstall, completeCallback) {
    	TOUCHENEX_CHECK.check([ keysharpbizInfo ], function(check){
            if(completeCallback != undefined) {
            	if(goInstall){
            		if(check.status){
            			completeCallback(check.status);
            		} else {
						ksBizInstallPage();
            		}
            	} else {
            		completeCallback(check.status);
            	}
            }
    	});
    },
    init : function(callback) {
		ksbizExtInterface.init(function(result, error){
			if(error){
				alert("초기화에 실패하였습니다. [" + error.status + "] " + error.message);
				if(callback) callback(false);
			} else {
				if(result){
					var properties = ksbizGetInitProperty();
					//kslog("KeySharpBiz.init.properties", properties);
					ksbizExtInterface.setProperties(properties, function(result, error){
						if(error){
							alert("초기설정에 실패하였습니다.");
							if(callback) callback(false);
						} else {
							if(result){
								nativeBrowserCheck();
								if(KSBizConfig.uitype == "native"){
									KeySharpBiz.setLang(KSBizConfig.lang, function(result){
										if(result){
											if(callback) callback(true);
										} else {
											alert("언어설정이 실패하였습니다.");
											if(callback) callback(false);
										}
									});
								} else {
									// HTML UI는 별도 설정
									if(callback) callback(true);
								}
							} else {
								alert("초기설정에 실패하였습니다.");
								if(callback) callback(false);
							}
						}
					});
				} else {
					alert("초기화에 실패하였습니다.");
					if(callback) callback(false);
				}
			}
		});
    },

	setProperty : function(key, value, callback){
		if(KeySharpBiz.chkInit(arguments)){
			ksbizExtInterface.setProperty(key, value, callback);
		}
	},

	getProperty : function(key, callback){
		if(KeySharpBiz.chkInit(arguments)){
			ksbizExtInterface.getProperty(key, callback);
		}
	},
	// manageCertificate
	manageCertificate : function(complete){
		var manageCertificateCallback = function(result, error){
			if(error){
				if(error.status != -10301){
					alert("[KeySharpBiz.manageCertificate] Run Fail [" + error.status + "] " + error.message);
				}
			} else {
				if(typeof complete == "function"){
					complete(result);
				} else if(typeof complete == "object"){
					complete.complete(result, complete.context);
				}
			}
		};
		
		nativeBrowserCheck();
		if(KSBizConfig.uitype == "native"){
			if(KeySharpBiz.chkInit(arguments)){
				ksbizExtInterface.manageCertificate(manageCertificateCallback);
			}
		} else {
			var data = {};
			data.policyID = "ManageCert";
			XWC.cxsign(data, manageCertificateCallback);
		}
	},
	// resetCertificate
	resetCertificate : function(complete){
		if(!TOUCHENEX_UTIL.isMobile()){
			if(KeySharpBiz.chkInit(arguments)){
				ksbizExtInterface.resetCertificate(function(result, error){
					if(error){
						alert("[KeySharpBiz.resetCertificate] Run Fail [" + error.status + "] " + error.message);
					} else {
						if(typeof complete == "function"){
							complete(result);
						} else if(typeof complete == "object"){
							complete.complete(result, complete.context);
						}
					}
				});
			}
		} else{
			if(typeof complete == "function"){
				complete(result);
			} else if(typeof complete == "object"){
				complete.complete(result, complete.context);
			}
		}

	},

	// getMACAddress
	getMACAddress : function(complete){
		if(KeySharpBiz.chkInit(arguments)){
			ksbizExtInterface.getProperty("MACAddress", function(result, error){
				if(error){
					alert("[KeySharpBiz.getMACAddress] Run Fail [" + error.status + "] " + error.message);
				} else {
					if(typeof complete == "function"){
						complete(result);
					} else if(typeof complete == "object"){
						complete.complete(result, complete.context);
					}
				}
			});
		}
	},

	// getVersion
	getVersion : function(complete){
		if(KeySharpBiz.chkInit(arguments)){
			ksbizExtInterface.getVersion(function(version){
				if(typeof complete == "function"){
					complete(version);
				} else if(typeof complete == "object"){
					complete.complete(version, complete.context);
				} else {
					return version;
				}
			});
		}
	},

	setLang : function(lang, callback){
		kslog("KeySharpBiz.setLang.lang", lang);
	    var langUrl = "";
	    if(lang == "KOR" || lang == "korean"){
	        langUrl = KSBizConfig.langUrl.b64.koreanUrl;
	        lang = "korean";
	    }
	    else if(lang == "ENG" || lang == "english"){
	        langUrl = KSBizConfig.langUrl.b64.englishUrl;
	        lang = "english";
	    }
	    else if(lang == "CHN" || lang == "chinese"){
	        langUrl = KSBizConfig.langUrl.b64.chaneseUrl;
	        lang = "chinese";
	    }
	    else if(lang == "JPN" || lang == "japanese"){
	        langUrl = KSBizConfig.langUrl.b64.japaneseUrl;
	        lang = "japanese";
	    }
	    else if(lang == "VIE" || lang == "vietnam"){
	        langUrl = KSBizConfig.langUrl.b64.vietnamUrl;
	        lang = "vietnam";
	    }
	    else if(lang == "IDN" || lang == "indonesia"){
	        langUrl = KSBizConfig.langUrl.b64.indonesiaUrl;
	        lang = "indonesia";
	    }
	    DC_get(langUrl, "", function(data){
	    	if(data){
				KSBizConfig.lang = lang;
				nativeBrowserCheck();
	    		if(KSBizConfig.uitype == "native"){
		    		if(KeySharpBiz.chkInit(arguments)){
			    		ksbizExtInterface.setLang(lang, data, function(result, error){
			    			if(error){
			    				kslog("KeySharpBiz.setLang.result", "언어설정에 실패");
			    				if(callback) callback(false);
			    			} else {
				    			if(result){
				    				kslog("KeySharpBiz.setLang.result", "success");
				    				if(callback) callback(true);
				    			} else {
				    				kslog("KeySharpBiz.setLang.result", "언어설정에 실패");
				    				if(callback) callback(false);
				    			}
			    			}
			    		});
		    		}
	    		}
	    	} else {
	    		kslog("KeySharpBiz.setLang.result", "언어URL 가져오기 실패");
	    		if(callback) callback(false);
	    	}
	    });
	},

	// sign.jsp
	sign : function(data, complete, options){
		if(!options) options = {};
        if(!options.signedAttribute) options.signedAttribute = "signingTime";
        if(options.signType == "signedData") {
            options.attributeAsData = false;
            options.signedAttribute = null;
        }

        if(!options.signAlgorithm) options.signAlgorithm = KSBizConfig.signAlgorithm;
        if(!options.disableExpireFilter) options.disableExpireFilter = KSBizConfig.disableExpireFilter;
        if(!options.disableExpireWarn) options.disableExpireWarn = KSBizConfig.disableExpireWarn;

        if(typeof data === "object"){
            var submitForm = document.forms[KSBizConfig.formName];
            if(submitForm != null){
                submitForm.method = "post";
                if(data.action) submitForm.action = data.action;
                if(data.method) submitForm.method = data.method;
                if(data.target) submitForm.target = data.target;
            }
            if(data.nodeName && data.nodeName.toLowerCase() === "form"){
            	data = nxBizFormSerialize(data);
            	kslog("KeySharpBiz.sign.form.serialize", data);
            } else {
                data = data.data;
            }
        }

        TouchEnNx.processingbar(true);
        var bucket = {"data":data, "complete":complete, "options":options, "bizcallback":KeySharpBiz.signCallback};
        ksbizAct.preSign(bucket);
	},

	signCallback : function(bucket){
		kslog("KeySharpBiz.signCallback", bucket);
		TouchEnNx.processingbar(false);

		if(bucket.complete){
			var complete = bucket.complete;
			var result = bucket.result;

			if(typeof complete == "function"){
				complete(result);
			} else if(typeof complete == "object"){
				complete.complete(result, complete.context);
			} else {
				// eval(complete)(result);
				TOUCHENEX_UTIL.runCallback(complete, result);
			}
		} else {
			// default callback
			KSBizConfig.complete.sign(bucket.result);
		}
	},

	// login.jsp
	login : function(data, complete, options){
		if(!options) options = {};
        if(!options.addNonce) options.addNonce = true;
        options.signedAttribute = "certStoreType";
        options.attributeAsData = true;
        options.resetCertificate = true;
        options.cacheCert = true;

        KeySharpBiz.sign(data, complete, options);
	},

	// autologin.jsp
    autoLogin : function(data, complete, options){
    	if(!options) options = {};
        if(options.autosign == null) options.autosign = KSBizConfig.autoLoginType;
        KeySharpBiz.login(data, complete, options);
    },

    // autosign.jsp
    autoSign : function(data, complete, options){
    	if(!options) options = {};
        if(options.autosign == null) options.autosign = KSBizConfig.autoSignType;
        KeySharpBiz.sign(data, complete, options);
    },

    // mdSign.jsp
    mdSign : function(data, complete, options){
    	if(!options) options = {};
        options.dataType = "sha256-md";
        KeySharpBiz.sign(data, complete, options);
    },

    // TODO not used..
    autoMdSign : function(data, complete, options){
    	if(!options) options = {};
        if(options.autosign == null) options.autosign = KSBizConfig.autoSignType;
        KeySharpBiz.mdSign(data, complete, options);
    },

    // multiSign.jsp
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

    // confirmSign-form.jsp, confirmSign-formstring.jsp, confirmSign-strings.jsp
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

    // confirmMultiSign-formstring.jsp, confirmMultiSign-strings.jsp
    confirmMultiSign : function(data, format, complete, options){
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
        if(data.nodeName && data.nodeName.toLowerCase() === "form"){
            alert("not supported data type");
            return;
        }
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
        }
        options.attributeAsData = true;
        options.signedAttribute = "format,certStoreType";
        KeySharpBiz.sign(data, complete, options);
    },

	// channelEncrypt.jsp
	channelEncrypt : function(data, complete, options){
		if(KeySharpBiz.chkInit(arguments)){
			if(!options) options = {};
	        if(!options.cipherAlgorithm) KSBizConfig.cipherAlgorithm;

            if( typeof data === "object"){
                var submitForm = document.forms[KSBizConfig.formName];
                if(submitForm != null){
                    submitForm.method = "post";
                    if(data.action) submitForm.action = data.action;
                    if(data.method) submitForm.method = data.method;
                    if(data.target) submitForm.target = data.target;
                }

                if(data.nodeName && data.nodeName.toLowerCase() === "form"){
                	data = nxBizFormSerialize(data);
                	kslog("KeySharpBiz.channelEncrypt.form.serialize", data);
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

            TouchEnNx.processingbar(true);
            var bucket = {"data":data, "complete":complete, "options":options, "bizcallback":KeySharpBiz.channelEncryptCallback};
            ksbizAct.channelInit(bucket);
		}
	},

	channelEncryptCallback : function(bucket){
		TouchEnNx.processingbar(false);
		kslog("KeySharpBiz.channelEncryptCallback", bucket);
		if(bucket){
			if(bucket.complete){
				var complete = bucket.complete;
				var result = bucket.result;

				if(typeof complete == "function"){
					complete(result);
				} else if(typeof complete == "object"){
					complete.complete(result, complete.context);
				} else {
					// eval(complete)(result);
					TOUCHENEX_UTIL.runCallback(complete, result);
				}
			} else {
				// default callback
				KSBizConfig.complete.encrypt(bucket.result);
			}
		} else {
			alert("동작중 에러가 발생하였습니다.");
		}
	},

	channelDecryptAsync : function(data, elementIdOrComplete, options){
		if(KeySharpBiz.chkInit(arguments)){
	        if(!options)	options = {};
	        if(!options.cipherAlgorithm) options.cipherAlgorithm = KSBizConfig.cipherAlgorithm;

	        var bucket = {"data":data, "complete":elementIdOrComplete, "options":options, "bizcallback":KeySharpBiz.channelDecryptAsyncCallback};
	        ksbizAct._symDeCrypt(bucket);
		}
	},

	channelDecryptAsyncCallback : function(bucket){
    	kslog("KeySharpBiz.channelDecryptAsyncCallback", bucket);
		if(bucket.complete){
			var complete = bucket.complete;
			var result = bucket.result;

	        if(typeof complete == 'string'){
                if(result.status == 1){
                    if(KSBizConfig.useOuterHTML){
                        var element = document.getElementById(complete);
                        if(element){
                            element.outerHTML = bucket.result.data;
                        } else{
                        	kslog("KeySharpBiz.channelDecryptAsyncCallback.outerHTML error", complete + " not found");
                        }
                    } else {
                        jQuery('#'+complete).html(bucket.result.data);
                    }
                } else if (result.status != 0){
                	kslog("KeySharpBiz.channelDecryptAsyncCallback.dec fail", result.status);
                    alert("복호화 실패:" + bucket.result.message + ":" + result.status);
                }
	        } else {
            	complete(result, complete.context);
            }
		} else {
			alert('콜백이 없습니다.');
		}
	},

	// file 관련 공통 콜백
	// signFile, addSignFile, channelEncryptFile, passwordEncryptFile, passwordDecryptFile, compressFile, uncompressFile
	fileProcessCallback : function(bucket){
		kslog("KeySharpBiz.fileProcessCallback", bucket);
		TouchEnNx.processingbar(false);

		if(bucket.complete){
			var complete = bucket.complete;
			var result = bucket.result;

			if(typeof complete == "function"){
				complete(result);
			} else if(typeof complete == "object"){
				complete.complete(result, complete.context);
			} else {
				// eval(complete)(result);
				TOUCHENEX_UTIL.runCallback(complete, result);
			}
		} else {
			// default callback
		}
	},

    signFile : function(srcfile, destfile, complete, options){
		// window native only
		if(TOUCHENEX_UTIL.isWin()){
			KSBizConfig.uitype = "native";
		} else {
			alert("준비중입니다.");
			return;
		}
    	if(KeySharpBiz.chkInit(arguments)){
    		if(!options) options = {};
    		if(options.autosign == null) options.autosign = KSBizConfig.autoSignType;
    		if(options.saveType == null) options.saveType = KSBizConfig.saveType;
    		if(!options.signAlgorithm && KSBizConfig.signAlgorithm)
    			options.signAlgorithm = KSBizConfig.signAlgorithm;

    		if(!srcfile) srcfile = "";
    		if(!destfile) destfile = "";

            TouchEnNx.processingbar(true);
            var bucket = {"srcfile":srcfile, "destfile":destfile,"complete":complete, "options":options, "bizcallback":KeySharpBiz.fileProcessCallback};
            ksbizAct.signFile(bucket);
    	}
    },

    addSignFile : function(srcfile, destfile, complete, options){
		// window native only
		if(TOUCHENEX_UTIL.isWin()){
			KSBizConfig.uitype = "native";
		} else {
			alert("준비중입니다.");
			return;
		}
    	if(KeySharpBiz.chkInit(arguments)){
    		if(!options) options = {};
    		if(options.autosign == null) options.autosign = KSBizConfig.autoSignType;
    		if(options.saveType == null) options.saveType = KSBizConfig.saveType;
    		if(!options.signAlgorithm && KSBizConfig.signAlgorithm)
    			options.signAlgorithm = KSBizConfig.signAlgorithm;

    		if(!srcfile) srcfile = "";
    		if(!destfile) destfile = "";

            TouchEnNx.processingbar(true);
            var bucket = {"srcfile":srcfile, "destfile":destfile,"complete":complete, "options":options, "bizcallback":KeySharpBiz.fileProcessCallback};
            ksbizAct.addSignFile(bucket);
    	}
    },

    // // File ChannelEncrypt / ChannelDecrypt
    // channelEncryptFile : function(srcfile, destfile, complete, options){
    // 	if(KeySharpBiz.chkInit(arguments)){
    //         if(!options) options = {};
    //         options.envelopeType = 0;
    //         if(!options.cipherAlgorithm) options.cipherAlgorithm = KSBizConfig.cipherAlgorithm;
    //         if(!options.cmsKeyEncryptionAlgorithm && KSBizConfig.cmsKeyEncryptionAlgorithm)
    //             options.cmsKeyEncryptionAlgorithm = KSBizConfig.cmsKeyEncryptionAlgorithm;

    //         TouchEnNx.processingbar(true);
    //         var bucket = {"srcfile":srcfile, "destfile":destfile,"complete":complete, "options":options, "bizcallback":KeySharpBiz.fileProcessCallback};
    //         ksbizAct.channelEncryptFile(bucket);
    // 	}
    // },

    // channelDecryptFile : function(srcfile, destfile, complete, options){
    // 	if(KeySharpBiz.chkInit(arguments)){
    //         if(!srcfile) srcfile = "";
    //         if(!destfile) destfile = "";
    //         if(!options) options = {};
    //         if(!options.cipherAlgorithm) options.cipherAlgorithm = KSBizConfig.cipherAlgorithm;

    //         TouchEnNx.processingbar(true);
    //         var bucket = {"srcfile":srcfile, "destfile":destfile,"complete":complete, "options":options, "bizcallback":KeySharpBiz.fileProcessCallback};
    //         ksbizAct.channelDecryptFile(bucket);
    // 	}
    // },

    // // File Password Encrypt / Decrypt
    // passwordEncryptFile : function(srcfile, destfile, complete, options){
    // 	if(KeySharpBiz.chkInit(arguments)){
    //     	if(!options) options = {};
    //         options.envelopeType = 3;

    //         TouchEnNx.processingbar(true);
    //         var bucket = {"srcfile":srcfile, "destfile":destfile,"complete":complete, "options":options, "bizcallback":KeySharpBiz.fileProcessCallback};
    //         ksbizAct.encryptFile(bucket);
    // 	}
    // },

    // passwordDecryptFile : function(srcfile, destfile, complete, options){
    // 	if(KeySharpBiz.chkInit(arguments)){
    //     	if(!options) options = {};

    //         TouchEnNx.processingbar(true);
    //         var bucket = {"srcfile":srcfile, "destfile":destfile,"complete":complete, "options":options, "bizcallback":KeySharpBiz.fileProcessCallback};
    //         ksbizAct.decryptFile(bucket);
    // 	}
    // },

    // File Compress / Uncompress
    compressFile : function(srcfile, destfile, complete, options){
		// window native only
		if(TOUCHENEX_UTIL.isWin()){
			KSBizConfig.uitype = "native";
		} else {
			alert("준비중입니다.");
			return;
		}
    	if(KeySharpBiz.chkInit(arguments)){
            if(!srcfile){
                alert("입력파일명 에러");
                return;
            }
            if(!destfile){
                alert("출력파일명 에러");
                return;
            }
            if(!options) options = {};
            TouchEnNx.processingbar(true);
            var bucket = {"srcfile":srcfile, "destfile":destfile,"complete":complete, "options":options, "bizcallback":KeySharpBiz.fileProcessCallback};
            ksbizAct.compressFile(bucket);
    	}
    },

    uncompressFile : function(srcfile, destfile, complete, options){
		// window native only
		if(TOUCHENEX_UTIL.isWin()){
			KSBizConfig.uitype = "native";
		} else {
			alert("준비중입니다.");
			return;
		}
    	if(KeySharpBiz.chkInit(arguments)){
            if(!srcfile){
                alert("입력파일명 에러");
                return;
            }
            if(!destfile){
                alert("출력파일명 에러");
                return;
            }
            if(!options) options = {};
            TouchEnNx.processingbar(true);
            var bucket = {"srcfile":srcfile, "destfile":destfile,"complete":complete, "options":options, "bizcallback":KeySharpBiz.fileProcessCallback};
            ksbizAct.uncompressFile(bucket);
    	}
    },

    signFileUrl : function(url, complete, options) {
		// window native only
		if(TOUCHENEX_UTIL.isWin()){
			KSBizConfig.uitype = "native";
		} else {
			alert("준비중입니다.");
			return;
		}
    	if(KeySharpBiz.chkInit(arguments)){
    		if(!url){
    			alert("url not exist");
    			return;
    		}
    		if(!options) options = {};
    		if(options.autosign == null) options.autosign = KSBizConfig.autoSignType;
    		//if(options.saveType == null) options.saveType = KSBizConfig.saveType;
    		if(!options.signAlgorithm && KSBizConfig.signAlgorithm)
    			options.signAlgorithm = KSBizConfig.signAlgorithm;

            TouchEnNx.processingbar(true);
            var bucket = {"url":url, "complete":complete, "options":options, "bizcallback":KeySharpBiz.fileProcessCallback};
            ksbizAct.signFileUrl(bucket);
    	}
    },

    // channelEncryptFileUrl : function(url, complete, options){
    // 	if(KeySharpBiz.chkInit(arguments)){
    // 		if(!url){
    // 			alert("url not exist");
    // 			return;
    // 		}
    // 		if(!options) options = {};
    // 		options.envelopeType = 0;
    // 		if(options.saveType == null) options.saveType = KSBizConfig.saveType;
    // 		if(!options.cipherAlgorithm) options.cipherAlgorithm = KSBizConfig.cipherAlgorithm;
    // 		if(!options.cmsKeyEncryptionAlgorithm && KSBizConfig.cmsKeyEncryptionAlgorithm)
    // 			options.cmsKeyEncryptionAlgorithm = KSBizConfig.cmsKeyEncryptionAlgorithm;

    //         TouchEnNx.processingbar(true);
    //         var bucket = {"url":url, "complete":complete, "options":options, "bizcallback":KeySharpBiz.fileProcessCallback};
    //         ksbizAct.channelEncryptFileUrl(bucket);
    // 	}
    // },

    // passwordEncryptFileUrl : function(url, complete, options){
    // 	if(KeySharpBiz.chkInit(arguments)){
    // 		if(!url){
    // 			alert("url not exist");
    // 			return;
    // 		}
    // 		if(!options) options = {};
    // 		options.envelopeType = 3;
    // 		if(!options.cipherAlgorithm) options.cipherAlgorithm = KSBizConfig.cipherAlgorithm;

    //         TouchEnNx.processingbar(true);
    //         var bucket = {"url":url, "complete":complete, "options":options, "bizcallback":KeySharpBiz.fileProcessCallback};
    //         ksbizAct.encryptFileUrl(bucket);
    // 	}
    // },

    // signAndChannelEncryptFileUrl : function(url, complete, options){
    // 	if(KeySharpBiz.chkInit(arguments)){
    // 		if(!url){
    // 			alert("url not exist");
    // 			return;
    // 		}
    // 		if(!options) options = {};
    // 		options.envelopeType = 0;
    // 		if(!options.cipherAlgorithm) options.cipherAlgorithm = KSBizConfig.cipherAlgorithm;
    // 		if(!options.cmsKeyEncryptionAlgorithm && KSBizConfig.cmsKeyEncryptionAlgorithm)
    // 			options.cmsKeyEncryptionAlgorithm = KSBizConfig.cmsKeyEncryptionAlgorithm;
    // 		if(options.autosign == null) options.autosign = KSBizConfig.autoSignType;
    // 		if(!options.signAlgorithm && KSBizConfig.signAlgorithm)
    // 			options.signAlgorithm = KSBizConfig.signAlgorithm;

    //         TouchEnNx.processingbar(true);
    //         var bucket = {"url":url, "complete":complete, "options":options, "bizcallback":KeySharpBiz.fileProcessCallback};
    //         ksbizAct.signAndChannelEncryptFileUrl(bucket);
    // 	}
    // },

    addSignFileUrl : function(downloadUrl, uploadUrl, complete, options){
		// window native only
		if(TOUCHENEX_UTIL.isWin()){
			KSBizConfig.uitype = "native";
		} else {
			alert("준비중입니다.");
			return;
		}
    	if(KeySharpBiz.chkInit(arguments)){
    		if(!downloadUrl){
    			alert("downloadUrl not exist");
    			return;
    		}
    		if(!uploadUrl){
    			alert("uploadUrl not exist");
    			return;
    		}
    		if(!options) options = {};
    		//if(options.saveType == null) options.saveType = KSBizConfig.saveType;
    		if(!options.signAlgorithm && KSBizConfig.signAlgorithm)
    			options.signAlgorithm = KSBizConfig.signAlgorithm;

            TouchEnNx.processingbar(true);
            var bucket = {"downloadUrl":downloadUrl, "uploadUrl":uploadUrl, "complete":complete, "options":options, "bizcallback":KeySharpBiz.fileProcessCallback};
            ksbizAct.addSignFileUrl(bucket);
    	}
    },

    // channelDecryptFileUrl : function(url, data, complete, options){
    // 	if(KeySharpBiz.chkInit(arguments)){
    // 		if(!url){
    // 			alert("url not exist");
    // 			return;
    // 		}
    // 		if(!data){
    // 			data = KSBizConfig.channelEncryptEmptyData;
    // 		}
    // 		if(!options) options = {};
    // 		if(!options.cipherAlgorithm) options.cipherAlgorithm = KSBizConfig.cipherAlgorithm;
    // 		if(!options.encKeyName) options.encKeyName = KSBizConfig.encKeyName;
    // 		if(options.saveType == null) options.saveType = KSBizConfig.saveType;

    //         TouchEnNx.processingbar(true);
    //         var bucket = {"url":url, "data":data, "complete":complete, "options":options, "bizcallback":KeySharpBiz.fileProcessCallback};
    //         ksbizAct.channelDecryptFileUrl(bucket);
    // 	}
    // },

    // passwordDecryptFileUrl : function(url, complete, options){
    // 	if(KeySharpBiz.chkInit(arguments)){
    // 		if(!url){
    // 			alert("url not exist");
    // 			return;
    // 		}
    // 		if(!options) options = {};
    // 		options.envelopeType = 3;
    // 		if(!options.cipherAlgorithm) options.cipherAlgorithm = KSBizConfig.cipherAlgorithm;

    //         TouchEnNx.processingbar(true);
    //         var bucket = {"url":url, "complete":complete, "options":options, "bizcallback":KeySharpBiz.fileProcessCallback};
    //         ksbizAct.decryptFileUrl(bucket);
    // 	}
    // },

    // certcenter common callback
    certCenterCallback : function(bucket){
		kslog("KeySharpBiz.certCenterCallback", bucket);
		TouchEnNx.processingbar(false);

		if(bucket.complete){
			var complete = bucket.complete;
			var result = bucket.result;

			if(typeof complete == "function"){
				complete(result);
			} else if(typeof complete == "object"){
				complete.complete(result, complete.context);
			} else {
				// eval(complete)(result);
				TOUCHENEX_UTIL.runCallback(complete, result);
			}
		} else {
			// default callback
		}
    },

    requestCertificate : function(ca, referenceValue, secretValue, complete, options){
		if(!referenceValue){
			alert("참조번호가 필요합니다.");
			return;
		}
		if(!secretValue){
			alert("인가코드가 필요합니다.");
			return;
		}

		var info = KSBizConfig.ca[ca];
		if(!info || !info.host || !info.port){
			alert("not supported ca:" + ca);
			return;
		}
		if(!options) options = {};
		if(!options.certStoreFilter) options.certStoreFilter = KSBizConfig.certStoreFilter;
		if(!options.additionalCopycert) options.additionalCopycert = KSBizConfig.additionalCopycert;
		if(!options.disableExpireFilter) options.disableExpireFilter = KSBizConfig.disableExpireFilter;
		if(!options.disableExpireWarn) options.disableExpireWarn = KSBizConfig.disableExpireWarn;
		
		TouchEnNx.processingbar(true);
		var bucket = {"ca":ca, "host":info.host, "port":info.port, "referenceValue":referenceValue, "secretValue":secretValue, "complete":complete, "options":options, "bizcallback":KeySharpBiz.certCenterCallback};
		ksbizAct.requestCertificate(bucket);

    },

    updateCertificate : function(ca, complete, options){
		var info = KSBizConfig.ca[ca];
		if(!info || !info.host || !info.port){
			alert("not supported ca:" + ca);
			return;
		}
		if(!options) options = {};
		if(!options.certStoreFilter) options.certStoreFilter = KSBizConfig.certStoreFilter;
		if(!options.additionalCopycert) options.additionalCopycert = KSBizConfig.additionalCopycert;
		if(!options.disableExpireFilter) options.disableExpireFilter = KSBizConfig.disableExpireFilter;
		if(!options.disableExpireWarn) options.disableExpireWarn = KSBizConfig.disableExpireWarn;
		
		TouchEnNx.processingbar(true);
		var bucket = {"ca":ca, "host":info.host, "port":info.port, "complete":complete, "options":options, "bizcallback":KeySharpBiz.certCenterCallback};
		ksbizAct.updateCertificate(bucket);
    },

    deleteCertificate : function(subjectDN, complete, options){
    	if(KeySharpBiz.chkInit(arguments)){
    		if(!options) options = {};
            TouchEnNx.processingbar(true);
            var bucket = {"subjectDN":subjectDN, "complete":complete, "options":options, "bizcallback":KeySharpBiz.certCenterCallback};
            ksbizAct.deleteCertificate(bucket);
    	}
	},
	
	// channelEncrypt 채널 	
	symEncrypt : function(data, complete, options){
		if(KeySharpBiz.chkInit(arguments)){
            TouchEnNx.processingbar(true);
			if(!options) options = {};
			options.cipherAlgorithm = options.cipherAlgorithm || KSBizConfig.cipherAlgorithm;
			
			if(typeof data === "object"){
				var submitForm = document.forms[KSBizConfig.formName];
				if(submitForm != null){
					submitForm.method = "post";
					if(data.action) submitForm.action = data.action;
					if(data.method) submitForm.method = data.method;
					if(data.target) submitForm.target = data.target;
				}
				if(data.nodeName && data.nodeName.toLowerCase() === "form"){
					data = nxBizFormSerialize(data);
					kslog("KeySharpBiz.symEncrypt.form.serialize", data);
				} else {
					data = data.data;
				}
			}
			
            var bucket = {"data":data, "complete":complete, "options":options, "bizcallback":KeySharpBiz.symEncryptCallback};
            ksbizAct._symEnCrypt(bucket);
		}
	},
	
	symEncryptCallback : function(bucket){
		TouchEnNx.processingbar(false);
		kslog("KeySharpBiz.symEncryptCallback", bucket);
		if(bucket){
			if(bucket.complete){
				var complete = bucket.complete;
				var result = bucket.result;

				if(typeof complete == "function"){
					complete(result);
				} else if(typeof complete == "object"){
					complete.complete(result, complete.context);
				} else {
					// eval(complete)(result);
					TOUCHENEX_UTIL.runCallback(complete, result);
				}
			}
		} else {
			alert("동작중 에러가 발생하였습니다.");
		}
	},
	
	symDecrypt : function(data, complete, options){
		if(KeySharpBiz.chkInit(arguments)){
            TouchEnNx.processingbar(true);
			if(!options) options = {};
			options.cipherAlgorithm = options.cipherAlgorithm || KSBizConfig.cipherAlgorithm;
			
            var bucket = {"data":data, "complete":complete, "options":options, "bizcallback":KeySharpBiz.symDecryptCallback};
            ksbizAct._symDeCrypt(bucket);
		}
	},

	symDecryptCallback : function(bucket){
		TouchEnNx.processingbar(false);
		kslog("KeySharpBiz.symDecryptCallback", bucket);
		if(bucket){
			if(bucket.complete){
				var complete = bucket.complete;
				var result = bucket.result;

				if(typeof complete == "function"){
					complete(result);
				} else if(typeof complete == "object"){
					complete.complete(result, complete.context);
				} else {
					// eval(complete)(result);
					TOUCHENEX_UTIL.runCallback(complete, result);
				}
			}
		} else {
			alert("동작중 에러가 발생하였습니다.");
		}
	},

	// TODO
	setPolicyOidCertFilter : function(oid){

	},
	setIssuerCertFilter : function(issuer){

	},
	getDeviceInfo : function(){

	},

	// browserExport
	browserExportCert : function(options){
		if(!options) options = {};
		nativeBrowserCheck();
		if(KSBizConfig.uitype == "native"){
			//웹에서 native로 내보내기 할 경우
			KSBizConfig.uitype = "html";
		}
        TouchEnNx.processingbar(true);
        var bucket = {"options":options, "bizcallback":KeySharpBiz.browserExportCertCallback};
        ksbizAct.browserExportCert(bucket);
	},

	//browserExport callback
	browserExportCertCallback : function(bucket){
		kslog("KeySharpBiz.browserExportCert", bucket);
		TouchEnNx.processingbar(false);
	},

	// browserImport
	browserImportCert : function(options){
		if(!options) options = {};
		nativeBrowserCheck();
		if(KSBizConfig.uitype == "native"){
			//웹에서 native로 가져오기 할 경우
			KSBizConfig.uitype = "html";
		}
        TouchEnNx.processingbar(true);
        var bucket = {"options":options, "bizcallback":KeySharpBiz.browserImportCertCallback};
        ksbizAct.browserImportCert(bucket);
	},

	//browserImport callback
	browserImportCertCallback : function(bucket){
		kslog("KeySharpBiz.browserImportCert", bucket);
		TouchEnNx.processingbar(false);
	},

	lineEncrypt : function(data, complete, options){
		if(KeySharpBiz.chkInit(arguments)){
			if(!options) options = {};
			if(options.checkCRL==null && KSBizConfig.checkCRL!=null) options.checkCRL = KSBizConfig.checkCRL;
			if(!options.cipherAlgorithm) options.cipherAlgorithm = KSBizConfig.cipherAlgorithm;
			if(options.cmsKeyEncryptionAlgorithm == null && KSBizConfig.cmsKeyEncryptionAlgorithm != null) options.cmsKeyEncryptionAlgorithm = KSBizConfig.cmsKeyEncryptionAlgorithm;
			
			if( typeof data === "object"){
				var submitForm = document.forms[KSBizConfig.formName];
				if(submitForm != null){
					submitForm.method = "post";
					if(data.action) submitForm.action = data.action;
					if(data.method) submitForm.method = data.method;
					if(data.target) submitForm.target = data.target;
				}

				if(data.nodeName && data.nodeName.toLowerCase() === "form"){
					data = nxBizFormSerialize(data);
					kslog("KeySharpBiz.lineEncrypt.form.serialize", data);
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
			TouchEnNx.processingbar(true);
			var bucket = {"data" : data,"complete" : complete, "options" : options, "bizcallback" : KeySharpBiz.lineEncryptCallback};
			ksbizAct.lineEncrypt(bucket)
		}
	},

	lineEncryptCallback : function(bucket){
		TouchEnNx.processingbar(false);
		kslog("KeySharpBiz.lineEncryptCallback", bucket);
		if(bucket){
			if(bucket.complete){
				var complete = bucket.complete;
				var result = bucket.result;

				if(typeof complete == "function"){
					complete(result);
				} else if(typeof complete == "object"){
					complete.complete(result, complete.context);
				} else {
					// eval(complete)(result);
					TOUCHENEX_UTIL.runCallback(complete, result);
				}
			} else {
				// default callback
				KSBizConfig.complete.encrypt(bucket.result);
			}
		} else {
			alert("동작중 에러가 발생하였습니다.");
		}
	},

	lineDecryptAsync : function(data, elementIdOrComplete, options){
		if(KeySharpBiz.chkInit(arguments)){
			if(!options)	options = {};
			if(!options.cipherAlgorithm) options.cipherAlgorithm = KSBizConfig.cipherAlgorithm;

			var bucket = {"data":data, "complete":elementIdOrComplete, "options":options, "bizcallback":KeySharpBiz.lineDecryptAsyncCallback};
			ksbizAct.lineDecryptAsync(bucket);
		}
	},

	lineDecryptAsyncCallback : function(bucket){
		kslog("KeySharpBiz.lineDecryptAsyncCallback", bucket);
		if(bucket.complete){
			var complete = bucket.complete;
			var result = bucket.result;

			if(typeof complete == 'string'){
				if(result.status == 1){
					if(KSBizConfig.useOuterHTML){
						var element = document.getElementById(complete);
						if(element){
							element.outerHTML = bucket.result.data;
						} else{
							kslog("KeySharpBiz.lineDecryptAsyncCallback.outerHTML error", complete + " not found");
						}
					} else {
						jQuery('#'+complete).html(bucket.result.data);
					}
				} else if (result.status != 0){
					kslog("KeySharpBiz.lineDecryptAsyncCallback.dec fail", result.status);
					alert("복호화 실패:" + bucket.result.message + ":" + result.status);
				}
			} else {
				complete(result, complete.context);
			}
		} else {
			alert('콜백이 없습니다.');
		}
	},

	simpleEncrypt : function(data, complete, options){
		if(KeySharpBiz.chkInit(arguments)){
			if(!options) options = {};
			if(options.checkCRL==null && KSBizConfig.checkCRL!=null) options.checkCRL = KSBizConfig.checkCRL;
			if(!options.cipherAlgorithm) options.cipherAlgorithm = KSBizConfig.cipherAlgorithm;
			if(options.cmsKeyEncryptionAlgorithm == null && KSBizConfig.cmsKeyEncryptionAlgorithm != null) options.cmsKeyEncryptionAlgorithm = KSBizConfig.cmsKeyEncryptionAlgorithm;
			
			if( typeof data === "object"){
				var submitForm = document.forms[KSBizConfig.formName];
				if(submitForm != null){
					submitForm.method = "post";
					if(data.action) submitForm.action = data.action;
					if(data.method) submitForm.method = data.method;
					if(data.target) submitForm.target = data.target;
				}

				if(data.nodeName && data.nodeName.toLowerCase() === "form"){
					data = nxBizFormSerialize(data);
					kslog("KeySharpBiz.simpleEncrypt.form.serialize", data);
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

			TouchEnNx.processingbar(true);
			var bucket = {"data" : data,"complete" : complete, "options" : options, "bizcallback" : KeySharpBiz.simpleEncryptCallback};
			ksbizAct.simpleEncrypt(bucket)
		}
	},

	simpleEncryptCallback : function(bucket){
		TouchEnNx.processingbar(false);
		kslog("KeySharpBiz.simpleEncryptCallback", bucket);
		if(bucket){
			if(bucket.complete){
				var complete = bucket.complete;
				var result = bucket.result;

				if(typeof complete == "function"){
					complete(result);
				} else if(typeof complete == "object"){
					complete.complete(result, complete.context);
				} else {
					// eval(complete)(result);
					TOUCHENEX_UTIL.runCallback(complete, result);
				}
			} else {
				// default callback
				KSBizConfig.complete.encrypt(bucket.result);
			}
		} else {
			alert("동작중 에러가 발생하였습니다.");
		}
	},

	simpleDecryptAsync : function(data, elementIdOrComplete, options){
		if(KeySharpBiz.chkInit(arguments)){
			if(!options)	options = {};
			if(!options.cipherAlgorithm) options.cipherAlgorithm = KSBizConfig.cipherAlgorithm;

			var bucket = {"data":data, "complete":elementIdOrComplete, "options":options, "bizcallback":KeySharpBiz.simpleDecryptAsyncCallback};
			ksbizAct.simpleDecryptAsync(bucket);
		}
	},

	simpleDecryptAsyncCallback : function(bucket){
		kslog("KeySharpBiz.simpleDecryptAsyncCallback", bucket);
		if(bucket.complete){
			var complete = bucket.complete;
			var result = bucket.result;

			if(typeof complete == 'string'){
				if(result.status == 1){
					if(KSBizConfig.useOuterHTML){
						var element = document.getElementById(complete);
						if(element){
							element.outerHTML = bucket.result.data;
						} else{
							kslog("KeySharpBiz.simpleDecryptAsyncCallback.outerHTML error", complete + " not found");
						}
					} else {
						jQuery('#'+complete).html(bucket.result.data);
					}
				} else if (result.status != 0){
					kslog("KeySharpBiz.simpleDecryptAsyncCallback.dec fail", result.status);
					alert("복호화 실패:" + bucket.result.message + ":" + result.status);
				}
			} else {
				complete(result, complete.context);
			}
		} else {
			alert('콜백이 없습니다.');
		}
	}
};





//////////////////////////////
//common util function
//////////////////////////////

function kslog( func, value ) {
	if ( KSBizConfig.kslog ) {
		// if(!window.console) console = {log:function(msg){alert(msg);}};
		if ( !window.console ) console = { log : function( msg ) {} };
		var strlog;
		try {
			if ( typeof value == "undefined" ) {
				strlog = "[undefined]";
			} else {
				if ( typeof value == "function" ) {
					strlog = "[function] " + value;
				} else if ( typeof value == "number" ) {
					strlog = "[number] " + value;
				} else if ( typeof value == "string" ) {
					strlog = "[string] " + value;
				} else if ( typeof value == "boolean" ) {
					strlog = "[boolean] " + value;
				} else if ( typeof value == "object" ) {
					strlog = "[json] " + JSON.stringify(value);
				} else {
					strlog = "[other] " + value.toString();
				}
			}
		} catch(e) {
			strlog = " ksbiz [exception] " + value.toString();
			console.log(value);
		}
		try {
			console.log("[ksbiz] " + TOUCHENEX_CONST.frameName + func + " : " + strlog);
		} catch(e) {
		}

		return;
	}
}

function ksalert( func, value ) {
	if ( KSBizConfig.ksalert ) {
		var msg;
		try {
			if ( value ) {
				if ( typeof value == "object" ) {
					msg = JSON.stringify(value);
				} else if ( typeof value == "function" ) {
					msg = value;
				} else if ( typeof value == "number" ) {
					msg = value;
				} else if ( typeof value == "string" ) {
					msg = value;
				} else if ( typeof value == "boolean" ) {
					msg = value;
				} else {
					msg = value.toString();
				}
			}
		} catch(e) {
			msg = "[exception] " + value;
		}

		if ( func ) {
			alert(func + " : " + msg);
		} else {
			alert(msg);
		}
		return;
	}
}

function tbCbCtrl(cmd, param) {
	if(!param) return null;
	if(cmd == 'push' && param){
		var cid = new Date().getTime() + '_' + TOUCHENEX_UTIL.random();
		KSBizConfig.cbarr.push({"cid":cid, "callback":param});
		//kslog('tbCbCtrl add :: ', param);
		return cid;
	} else if(cmd == 'pop' && param){
		for (var i=0; i < KSBizConfig.cbarr.length; i++){
			var cb = KSBizConfig.cbarr[i];
			if(cb.cid == param) {
				//kslog('tbCbCtrl pop :: ', cb.cid);
				var callback = cb.callback;
				KSBizConfig.cbarr.splice(i,1);
				return callback;
			}
		}
	}
	return null;
}

function ksbizGenSid() {
	var sid = new Date().getTime() + '' + TOUCHENEX_UTIL.random();
	if(typeof localStorage == "object"){
		localStorage.setItem(KSBizConfig.sid, sid);
		kslog('ksbizGenSid generate', localStorage.getItem(KSBizConfig.sid));
		return sid;
	} else {
		KeySharpBiz_createCookie(KSBizConfig.sid, sid);
		kslog('ksbizGenSid generate', KeySharpBiz_readCookie(KSBizConfig.sid));
		return sid;
	}
}

function ksbizGetSid(){
	if(typeof localStorage == "object"){
		if(!localStorage.getItem(KSBizConfig.sid)){
			return ksbizGenSid();
		} else {
			return localStorage.getItem(KSBizConfig.sid);
		}
	} else {
		if(!KeySharpBiz_readCookie(KSBizConfig.sid)){
			return ksbizGenSid();
		} else {
			return KeySharpBiz_readCookie(KSBizConfig.sid);
		}
	}
}

function nxBizFormSerialize(form) {
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

function DC_get(url, data, callback){
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
				//kslog("DC_get.response", resText);
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
	kslog("DC_get.url", url);
	kslog("DC_get.data", data);
	httpReqObj.send(data);
}

function ksbizGetInitProperty(){
	try{
		var properties = {};
		properties["IssuerCertFilter"] = KSBizConfig.issuerCertFilter;
		properties["PolicyOidCertFilter"] = KSBizConfig.policyOidCertFilter;
		properties["certStoreFilter"] = KSBizConfig.certStoreFilter;

		properties["hsm.usingDrivers"] = KSBizConfig.hsmUsingDrivers;
		properties["cacheCertStore"] = KSBizConfig.cacheCertStore;
		properties["documentURL"] = document.URL;
		properties["lastUsedCertSubject"] = KSBizConfig.lastUsedCertSubject;

		properties["mobisign.enable"] = KSBizConfig.mobisignConfig.enable;
		properties["mobisign.download"] =KSBizConfig.mobisignConfig.download;
		properties["mobisign.version"] = KSBizConfig.mobisignConfig.version;
		properties["mobisign.sitecode"] = KSBizConfig.mobisignConfig.sitecode;
		properties["mobisign.aclist"] = KSBizConfig.mobisignConfig.aclist;

		properties["securekeyboard.enable"] = KSBizConfig.secureKeyboardConfig.enable;
		properties["securekeyboard.product"] = KSBizConfig.secureKeyboardConfig.product;
		properties["securekeyboard.showMessage"] = KSBizConfig.secureKeyboardConfig.showMessage;
		properties["forceScreenKeyboard"] = KSBizConfig.forceScreenKeyboard;
		if(KSBizConfig.disableScreenKeyboard != null){
			properties["disableScreenKeyboard"] = KSBizConfig.disableScreenKeyboard;
		} else {
			properties["disableScreenKeyboard"] = false;
		}
		if(KSBizConfig.secureKeypadConfig != null){
			if(KSBizConfig.secureKeypadConfig.product != null) {
				properties["secureKeypad"] = KSBizConfig.secureKeypadConfig.product;
			} else {
				properties["secureKeypad"] = "transkey";
			}
			if(KSBizConfig.secureKeypadConfig.nativeKeypadUrl != null){
				if(KSBizConfig.secureKeypadConfig.product == "nos"){
					properties["nosNative"] = KSBizConfig.secureKeypadConfig.nativeKeypadUrl;
				} else {
					properties["transkeyNative"] = KSBizConfig.secureKeypadConfig.nativeKeypadUrl;
				}
			}
		}

		if(KSBizConfig.usim != null) {
			properties["usim.usingDrivers"] = KSBizConfig.usim.usingDrivers;
			properties["usim.certSelector"] = KSBizConfig.usim.certSelector;
			properties["usim.displayDataAtMobile"] = KSBizConfig.usim.displayDataAtMobile;
			properties["usim.siteDomain"] = KSBizConfig.usim.siteDomain;
			properties["usim.disableInHSM"] = KSBizConfig.usim.disableInHSM;

			if(KSBizConfig.usim.raon != null){
				properties["usim.raon.download"] = KSBizConfig.usim.raon.download;
				properties["usim.raon.displayDataAtMobile"] = KSBizConfig.usim.raon.displayDataAtMobile;
				properties["usim.raon.siteCode"] = KSBizConfig.usim.raon.siteCode;
			}
			if(KSBizConfig.usim.dream != null){
				properties["usim.dream.download"] = KSBizConfig.usim.dream.download;
				properties["usim.dream.displayDataAtMobile"] = KSBizConfig.usim.dream.displayDataAtMobile;
				properties["usim.dream.host"] = KSBizConfig.usim.dream.host;
				properties["usim.dream.port"] = KSBizConfig.usim.dream.port;
			}
			if(KSBizConfig.usim.sumion != null){
				properties["usim.sumion.download"] = KSBizConfig.usim.sumion.download;
				properties["usim.sumion.displayDataAtMobile"] = KSBizConfig.usim.sumion.displayDataAtMobile;
				properties["usim.sumion.host"] = KSBizConfig.usim.sumion.host;
				properties["usim.sumion.port"] = KSBizConfig.usim.sumion.port;
			}
		}

		if(TOUCHENEX_UTIL.isMac() || TOUCHENEX_UTIL.isLinux())
			KSBizConfig.prepareCertStore=KSBizConfig.prepareCertStore_MultiOS;
		if(KSBizConfig.prepareCertStore != null)
			properties["prepareCertStore"] = KSBizConfig.prepareCertStore;
		if(KSBizConfig.checkCRL != null)
			properties["checkCRL"] = KSBizConfig.checkCRL;
		if(KSBizConfig.passwordCounter != null)
			properties["passwordCounter"] = KSBizConfig.passwordCounter;
		if(KSBizConfig.installError != null)
			properties["installError"] = KSBizConfig.installError;
		if(KSBizConfig.fileInfoType != null)
			properties["fileInfoType"] = KSBizConfig.fileInfoType;
		//kslog("ksbizGetInitProperty init property", properties);
		if(KSBizConfig.certclickfocus != null){
			properties["certclickfocus"] = KSBizConfig.certclickfocus;
		}
		if(KSBizConfig.viewVersion != null)
			properties["viewVersion"] = KSBizConfig.viewVersion;
		if(KSBizConfig.certCRLCheck != null)
			properties["certCRLCheck"] = KSBizConfig.certCRLCheck;
		if(KSBizConfig.colorTheme != null)
			properties["colorTheme"] = KSBizConfig.colorTheme;
		return properties;
     } catch(e){ alert("init\n" + e); }
}

var ksBizInstallPage = function(){
	if(typeof KSBizConfig.installpageTarget == "undefined")
		KSBizConfig.installpageTarget = "self";
	var goInstallMsg = "안전한 홈페이지 사용을 위해 공인인증 솔루션 설치페이지로 이동합니다.";
	var goInstall = function(fr){
		var tmpTosPage = KSBizConfig.installpage.substring(0, KSBizConfig.installpage.indexOf("?"));
		if(fr && fr == 'parent'){
			KSBizConfig.installpage = tmpTosPage + "?" + "url=" + encodeURIComponent(parent.location.href);
			parent.location.href = KSBizConfig.installpage;
		} else if(fr == 'popup'){
			try{
				KSBizConfig.installpage = tmpTosPage + "?" + "popup=yes&url=" + encodeURIComponent(parent.location.href);
				var ksbizInstallPageOption = "directories=no,location=no,menubar=no,titlebar=no,status=no,resizable=yes,width=" + KSBizConfig.installpagePopWidth + "px,height=" + KSBizConfig.installpagePopHeight + "px";
				var ksbizInstallWin = window.open("about:blank", "pop_ksbiz_install", ksbizInstallPageOption);
				if(typeof cxsign != "undefined" && location.href.indexOf(cxsignHome) > -1){
					if(ksbizInstallWin == null){
						alert(uiCtrl.getLang("check_popup_block"));
						ui.loading.end();
						// 브라우저 스토리지 비활성화인 경우 인증서 창을 닫는다.
						if($(".storage_area .storage_lst #browser").hasClass("disable")){
							uiCtrl.winClose();
						}
						
						// ui.alert(uiCtrl.getLang("check_popup_block"), function(){
						// 	ui.loading.end();
						// 	// 브라우저 스토리지 비활성화인 경우 인증서 창을 닫는다.
						// 	if($(".storage_area .storage_lst #browser").hasClass("disable")){
						// 		uiCtrl.winClose();
						// 	}
						// });
					} else {
						KeySharpBiz.popInstallCheckLoop = setInterval(function(){
							//ui.loading.start();
							KeySharpBiz.isInstall(false, function(check){
								if(check){
									ui.loading.end();
									clearInterval(KeySharpBiz.popInstallCheckLoop);
								} else {
									kslog("ksBizInstallPage", "popup install check.......");
								}
							});
						}, 500);
						ksbizInstallWin.location.href = KSBizConfig.installpage;
						// 브라우저 스토리지 비활성화인 경우 인증서 창을 닫는다.
						if($(".storage_area .storage_lst #browser").hasClass("disable")){
							uiCtrl.winClose();
						}
					}
				} else {
					TouchEnNx.processingbar(false);
					if(ksbizInstallWin == null){
						alert("팝업차단을 확인해주세요.");
					} else {
						ksbizInstallWin.location.href = KSBizConfig.installpage;
					}
				}
			} catch(e){
				alert(e);
			}
		} else if(fr == 'top'){
			KSBizConfig.installpage = tmpTosPage + "?" + "url=" + encodeURIComponent(location.href);
			top.location.href = KSBizConfig.installpage;			
		} else {
			KSBizConfig.installpage = tmpTosPage + "?" + "url=" + encodeURIComponent(location.href);
			location.href = KSBizConfig.installpage;
		}
	}
	if(typeof ui == "undefined"){
		alert(goInstallMsg);
		goInstall(KSBizConfig.installpageTarget);
	} else {
		if(parent && cxsign && location.href.indexOf(cxsignHome) > -1){
			if (cxCtrl.isSignPage()){
				goInstallMsg += "<br>※ 설치 취소시, 브라우저인증서로<br>이동됩니다";
			}
			// ui.alert(goInstallMsg, function(){
			// 	goInstall('parent');
			// });
			ui.confirm(goInstallMsg, function(){
				if(!$(".storage_area .storage_lst #browser").hasClass("disable")){
					$(".storage_area .storage_lst #browser").storageClick('browser');
				}
				goInstall(KSBizConfig.installpageTarget);
			}, function(){
				if($(".pop_copy").css("display") != "none"){
					$(".pop_copy").css("display","none")
				}
				if(!$(".storage_area .storage_lst #browser").hasClass("disable") && !cxCtrl.isIssueCertPage()){
					$(".storage_area .storage_lst #browser").storageClick('browser');
					ui.focus();
				} else if(!$(".issue_area .storage_lst #cmp_disk").hasClass("disable")) {
					$(".issue_area .storage_lst #cmp_disk").popStorageClick('cmp_browser');
					ui.focus();
				} else {
					ui.alert("프로그램 설치후 이용 가능합니다.", function(){
						uiCtrl.winClose();
					});
				}
			});
		} else {
			alert(goInstallMsg);
			goInstall(KSBizConfig.installpageTarget);
		}
	}
}

// KSBizConfig.uitype available check
// native : natvie only
// html : HTML only
// all : native/html both use
function ksbizUitypeChk(){
	if((TOUCHENEX_UTIL.isWin() && TOUCHENEX_UTIL.isSafari())
			|| ( TOUCHENEX_UTIL.isIE() && TOUCHENEX_UTIL.getBrowserVer() < 10 )){
		return "native";
	}
	if(!TOUCHENEX_UTIL.isWin()){
		return "html";
	}
	return "all";
}

//////////////////////////////
//TouchEnKey nxBizEncryption
//////////////////////////////
function TK_GetEncnxBiz(frmName, eleName, pubKey, callback){
	if(tekOption.idbase == "true")	frmName = "";
	fnGetEncYTCallback = callback;
	var req = {
		"key": "GetEncDataYT",
		"pubkey": pubKey,
		"id": eleName,
		"formName": frmName
	};
  TK_RequestEx(null, req);
}

//////////////////////////////
//from past version function
//////////////////////////////
function KeySharpBiz_createCookie(name,value,days) {
	var expires = "";
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		expires = "; expires="+date.toGMTString();
	}

	if (KSBizConfig.domain != "" && document.location.hostname.indexOf(KSBizConfig.domain) >= 0) {
		document.cookie = name+"="+value+expires+"; path=/; domain=" + KSBizConfig.domain;
	} else {
		document.cookie = name+"="+value+expires+"; path=/";
	}
}

function KeySharpBiz_readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) {
			return c.substring(nameEQ.length,c.length);
		}
	}
	return "";
}

function KeySharpBiz_eraseCookie(name) {
	KeySharpBiz_createCookie(name,"",-1);
}


//////////////////////////////
// raonnx use
//////////////////////////////
function KSbiz_SupportCheck() {
	try {
		if (TOUCHENEX_UTIL.chkOS(TOUCHENEX_UTIL.getOSInfo(), keysharpbizInfo.reqSpec.OS)) {
			if (TOUCHENEX_UTIL.isWin()) {
				if (TOUCHENEX_UTIL.isIE() && parseInt(TOUCHENEX_UTIL.getBrowserVer()) >= parseInt(keysharpbizInfo.reqSpec.Browser.MSIE)) return true;
				else if (TOUCHENEX_UTIL.isChrome() && parseInt(TOUCHENEX_UTIL.getBrowserVer()) >= parseInt(keysharpbizInfo.reqSpec.Browser.CHROME)) return true;
				else if (TOUCHENEX_UTIL.isFirefox() && parseInt(TOUCHENEX_UTIL.getBrowserVer()) >= parseInt(keysharpbizInfo.reqSpec.Browser.FIREFOX)) return true;
				else if (TOUCHENEX_UTIL.isOpera() && parseInt(TOUCHENEX_UTIL.getBrowserVer()) >= parseInt(keysharpbizInfo.reqSpec.Browser.OPERA)) return true;
				else if (TOUCHENEX_UTIL.isSafari() && parseInt(TOUCHENEX_UTIL.getBrowserVer()) >= parseInt(keysharpbizInfo.reqSpec.Browser.SAFARI_WIN)) return true;
				else if (TOUCHENEX_UTIL.isEdge()) return true;
				else {
					alert("현재 사용중인 브라우저는 최신버전이 아닙니다. 최신버전으로 업데이트 후 이용부탁드립니다.");
					return false;
				}
			}
			else if (TOUCHENEX_UTIL.isMac()) {
				if (TOUCHENEX_UTIL.isChrome() && parseInt(TOUCHENEX_UTIL.getBrowserVer()) >= parseInt(keysharpbizInfo.reqSpec.Browser.CHROME)) return true;
				else if (TOUCHENEX_UTIL.isFirefox() && parseInt(TOUCHENEX_UTIL.getBrowserVer()) >= parseInt(keysharpbizInfo.reqSpec.Browser.FIREFOX)) return true;
				else if (TOUCHENEX_UTIL.isOpera() && parseInt(TOUCHENEX_UTIL.getBrowserVer()) >= parseInt(keysharpbizInfo.reqSpec.Browser.OPERA)) return true;
				else if (TOUCHENEX_UTIL.isSafari() && parseInt(TOUCHENEX_UTIL.getBrowserVer()) >= parseInt(keysharpbizInfo.reqSpec.Browser.SAFARI_MAC)) return true;
				else if (TOUCHENEX_UTIL.isEdge()) return true;
				else {
					alert("현재 사용중인 브라우저는 최신버전이 아닙니다. 최신버전으로 업데이트 후 이용부탁드립니다.");
					return false;
				}
			}
			else if (TOUCHENEX_UTIL.isLinux()) {
				if (TOUCHENEX_UTIL.isChrome() && parseInt(TOUCHENEX_UTIL.getBrowserVer()) >= parseInt(keysharpbizInfo.reqSpec.Browser.CHROME)) return true;
				else if (TOUCHENEX_UTIL.isFirefox() && parseInt(TOUCHENEX_UTIL.getBrowserVer()) >= parseInt(keysharpbizInfo.reqSpec.Browser.FIREFOX)) return true;
				else if (TOUCHENEX_UTIL.isOpera() && parseInt(TOUCHENEX_UTIL.getBrowserVer()) >= parseInt(keysharpbizInfo.reqSpec.Browser.OPERA)) return true;
				else if (TOUCHENEX_UTIL.isSafari() && parseInt(TOUCHENEX_UTIL.getBrowserVer()) >= parseInt(keysharpbizInfo.reqSpec.Browser.SAFARI_MAC)) return true;
				else {
					alert("현재 사용중인 브라우저는 최신버전이 아닙니다. 최신버전으로 업데이트 후 이용부탁드립니다.");
					return false;
				}
			} 
		} else {
			alert("현재 미지원 운영체제에서 사용중입니다. Windows 환경에서 이용부탁드립니다.");
			return false;
		}
	} catch (e) {
		alert("미지원환경입니다.");
		return false;
	}
}

function ksbiz_loading() {
	exlog("==============loading================");
	try {
		if(!ksbizloadflag){
			TOUCHENEX_CHECK.check([keysharpbizInfo] , "KS_loading_callback");
			ksbizloadflag=true;
		}
	} catch (e) {
		exlog("biz_loading fail", "exception : "+e);
	}
}

function ksbiz_loading_callback(check) {
	exlog("biz_loading_callback", check);
	try {
        currStatus = check;
        if (currStatus.status) {
            keysharpbizInfo.bizInstalled = currStatus.status;
            TOUCHENEX_LOADING("biz_loadingCallback");
        } else {
        	biz_notInstall(currStatus);
        }
    } catch (e) {
		exlog("biz_loading_callback", "exception : "+e);
	}
}

function biz_loadingCallback(check) {
//console.log("==============biz_loadingCallback================");	
}

function ksbiz_extensionInstall() {
	if(TOUCHENEX_UTIL.isChrome() || TOUCHENEX_UTIL.isFirefox() || TOUCHENEX_UTIL.isOpera()){
		biz_extensiondownload();
	}
}

function ksbiz_extensiondownload() {
    TOUCHENEX_INSTALL.download('biz', 'extension');
}

function ksbiz_installPage() {
    if (typeof ksbiz_installpage == "undefined") {
     	location.href = TouchEnNxConfig.installPage.ksbiz;
    }
}

function ksbiz_isInstallcheck() {
    try {
        ksbiz_installCheck('ksbiz_installCheckCallback');
    } catch (e) {
		exlog("ksbiz_isInstallcheck fail", "exception : "+e);
	}
}

function ksbiz_installCheck(callback) {
    try {
        TOUCHENEX_CHECK.check([keysharpbizInfo], callback);
  	} catch (e) {
		exlog("ksbiz_installCheck callback fail", "exception : "+e);
	}
}

function ksbiz_installCheckCallback(check) {
    try {
        currStatus = check;
        if (currStatus.status) {
            keysharpbizInfo.isInstalled = currStatus.status;
            if (typeof Keysharp_installpage != "undefined") {
                ksbiz_moveMainPage();
            }
        } else {
            ksbiz_notInstall(currStatus); 
        }
    } catch (e) {
		exlog("ksbiz_installCheckCallback fail", "exception : "+e);
	}
}

function ksbiz_moveMainPage() {
    location.href = keysharpbizInfo.tkMainpage;
}

function ksbiz_notInstall(currStatus) {
	try {
        if (!currStatus.status) {
			keysharpbizInfo.bizInstalled = currStatus.status;
            if (typeof ksbiz_installpage == "undefined") {
            	biz_installPage();
            } else {
                if (!currStatus.info[0].isInstalled) {
                    if (!currStatus.info[0].extension) {
                        if (TOUCHENEX_UTIL.isChrome() || TOUCHENEX_UTIL.isFirefox() || (TOUCHENEX_UTIL.isOpera())) {
                            ////KS_extensiondownload();
                            keysharpbizInfo.exInstalled = false;
                        }
                    }//test
                    else{
                    	keysharpbizInfo.exInstalled = true;
                    }

                    if (!currStatus.info[0].client || !currStatus.info[0].EX) {
                        keysharpbizInfo.clInstalled = false;
                    }//test
                    else{
                    	keysharpbizInfo.clInstalled = true;
                    }
                } else {
                    if (typeof ksbiz_installpage != "undefined") {
                        ksbiz_moveMainPage();
                    }
                }
            }
        } else {
            keysharpbizInfo.isInstalled = currStatus.status;
            if (typeof ksbiz_installpage != "undefined") {
                ksbiz_moveMainPage();
            }
        }
    } catch (e) {
		exlog("ksbiz_notInstall fail", "exception : "+e);
	}
}

function ksbiz_download(ostype) {
	if( TOUCHENEX_UTIL.isWin() && (TouchEnNxConfig.runtype == "onlydaemon" || TouchEnNxConfig.runtype == "mainextension"))
	{
		TOUCHENEX_INSTALL.download('biz', 'daemon');
	}
	else
	{
		if(typeof ostype != "undefined")
		{
			var bit = TOUCHENEX_UTIL.getOSInfo().bit;			
			ostype = ostype.concat(bit);
		}
		TOUCHENEX_INSTALL.download('biz', 'client', ostype);
	}
}
