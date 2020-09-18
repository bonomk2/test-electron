var ksbizAct = {
		
	/////////// sign block ////////////////////////
	preSign : function(bucket){
		kslog("ksbizAct.preSign", bucket);
        if(bucket.options.addNonce){
            DC_get(KSBizConfig.nonceUrl, "", function(nonce){
            	if(nonce){
                    if(nonce.length != 20){
						alert("전자서명 실패[nonce 오류]:" + nonce.length);
						bucket.result = {};
						bucket.result.status = "9999";
						bucket.result.message = "[ksbizAct.preSign] nonce value is length error";
						bucket.bizcallback(bucket);
                        return;
                    }
                    if(bucket.data.length > 0) bucket.data += "&";
                    var nonceKeyName = KSBizConfig.nonceKeyName || "ksbizNonce";
                    bucket.data += nonceKeyName + "=" + encodeURIComponent(nonce);
                    ksbizAct.setSignTitleImage(bucket);
            	} else {
            		bucket.result = {};
        			bucket.result.status = "9999";
            		bucket.result.message = "[ksbizAct.preSign] nonce value is not exist";
        			bucket.bizcallback(bucket);
            	}
            });
        } else {
        	ksbizAct.setSignTitleImage(bucket);
        }
	},
	
	setSignTitleImage : function(bucket){
		kslog("ksbizAct.setSignTitleImage", bucket);
        if(bucket.options.confirmSignTitleImageUrl){
            DC_get(bucket.options.confirmSignTitleImageUrl, "", function(img){
            	if(img){
            		bucket.options.confirmSignTitleImage = img;
            		ksbizAct.sign(bucket);
            	} else {
            		bucket.result = {};
            		bucket.result.result = "9999";
            		bucket.result.message = "[ksbizAct.setSignTitleImage] signTitleImage is not exist";
        			bucket.bizcallback(bucket);
            	}
            });
        } else {
        	ksbizAct.sign(bucket);
        }
	},

	sign : function(bucket){
		kslog("ksbizAct.sign", bucket);
		var resSignCallback = function(data, error){
			if(error){
				bucket.result = {};
				bucket.result.status = error.status;
				bucket.result.message = error.message; 
				bucket.bizcallback(bucket);				
			} else {
				if(data.signedData){
					bucket.result = {};
					bucket.result.status = 1;
					bucket.result.data = data.signedData;
					if(data.vidRandom) bucket.result.vidRandom = data.vidRandom;
					if(data.signAlgorithm) bucket.result.signAlgorithm = data.signAlgorithm;
					if(data.signer) bucket.result.signer = TOUCHENEX_UTIL.Base64.decode(data.signer);
					if(data.rawData) bucket.result.rawData = TOUCHENEX_UTIL.Base64.decode(data.rawData);
					if(data.fileName) bucket.result.fileName = TOUCHENEX_UTIL.Base64.decode(data.fileName);
					bucket.bizcallback(bucket);
				} else {
					bucket.result = {};
					bucket.result.status = 0;
					bucket.result.data = "";
					bucket.result.vidRandom = "";
					bucket.bizcallback(bucket);			
				}
			}
		};
		
		nativeBrowserCheck();
		if(KSBizConfig.uitype == "native"){
			if(KeySharpBiz.chkInit(arguments)){
				// set logoImage
		        ksbizAct.loadLogoImage(KSBizConfig.logoImageUrl, function(result){
		        	if(result){
				        if(bucket.options.subjectCertFilter || bucket.options.resetCertificate){
				        	ksbizExtInterface.resetCertificate();
				        }
				        
						ksbizExtInterface.sign(bucket.data, bucket.options, resSignCallback);
		        	} else {
		        		bucket.result = {};
		    			bucket.result.status = "9999";
		    			bucket.result.message = "[ksbizAct.setLogoImage] logoImage setting fail";
		    			bucket.bizcallback(bucket);
		        	}
		        });
			}
		} else {
			if(bucket.options.subjectCertFilter || bucket.options.resetCertificate){
	        	bucket.options.resetCertificate = true;
			}
			var data = {};
			data.policyID = "DigitalSign";
			data.sourceEncoding = bucket.options.encoding?bucket.options.encoding:"utf-8";
			data.plainText = bucket.data;
			data.options = bucket.options;
			
			XWC.cxsign(data, resSignCallback);
		}
	},

	/////////// channelEncrypt block ////////////////////////
	channelInit : function(bucket) {
		kslog("ksbizAct.channelInit", bucket);
		// 1. clientR 생성
		ksbizExtInterface.channel2Init({}, function(clientR, error){
			if(error){
				bucket.result = {};
				bucket.result.status = error.status;
				bucket.result.message = "[ksbizAct.channelInit] channel2Init Fail : " + error.message;
				bucket.bizcallback(bucket);
			} else {
				if(clientR && clientR.random){
					kslog("ksbizAct.channelInit.clientR", clientR);
					var cRandom = clientR.random;
					var cStatus = clientR.status;
					
					// 2. 서버에게 clientR 전송
					var keyValue = "msg=" + encodeURIComponent(cRandom);
					DC_get(KSBizConfig.channelSvrUrl, keyValue, function(serverCRKE){
						kslog("ksbizAct.channelInit.serverCRKE", serverCRKE);
						if(serverCRKE){
							if(!serverCRKE.startsWith("-")){
								bucket.serverCRKE = serverCRKE;
								// 클라이언트가 3인 경우 발급한 랜덤값으로 reset
								//if(cStatus == "3") {
									//bucket.options.reset = true;
								//}
								// 3. 서버로부터 전달받은 serverCRKE를 다음단계로 패스
								ksbizAct._sendClientFinished(bucket);
							} else {
								// 서버에 키교환이 완료 된 상태일때
								if(serverCRKE == "-10702"){
									// 서버와 클라이언트가 이미 키교환을 했으므로 성공 처리
									if(cStatus == "3") {
										kslog("ksbizAct.channelInit", "Already Key Exchange... success return..");
										ksbizAct._symEnCrypt(bucket); // block encrypt..
									} else {
										// 서버세션 리셋후 재발급
										var resetParam = keyValue += "&option=reset";
										DC_get(KSBizConfig.channelSvrUrl, keyValue, function(resetServerCRKE){
											kslog("ksbizAct.channelInit.resetServerCRKE", resetServerCRKE);
											if(resetServerCRKE){
												if(!resetServerCRKE.startsWith("-")){
													// reSession을 통한 경우 reset 값을 셋..
													bucket.serverCRKE = resetServerCRKE;
													bucket.options.reset = true;
													ksbizAct._sendClientFinished(bucket);
												} else {
													bucket.result = {};
													bucket.result.status = resetServerCRKE;
													bucket.result.message = "[ksbizAct.channelInit] DC_get reSession Fail";
													bucket.bizcallback(bucket);
												}
											} else {
												bucket.result = {};
												bucket.result.status = "9999";
												bucket.result.message = "[ksbizAct.channelInit] DC_get reSession Fail response not exist";
												bucket.bizcallback(bucket);
											}
										});
									}
								} else if (serverCRKE == "-10703"){
									// 서버세션 리셋후 재발급
									var resetParam = keyValue += "&option=reset";
									DC_get(KSBizConfig.channelSvrUrl, keyValue, function(resetServerCRKE){
										kslog("ksbizAct.channelInit.resetServerCRKE", resetServerCRKE);
										if(resetServerCRKE){
											if(!resetServerCRKE.startsWith("-")){
												// reSession을 통한 경우 reset 값을 셋..
												bucket.serverCRKE = resetServerCRKE;
												bucket.options.reset = true;
												ksbizAct._sendClientFinished(bucket);
											} else {
												bucket.result = {};
												bucket.result.status = resetServerCRKE;
												bucket.result.message = "[ksbizAct.channelInit] DC_get reSession Fail";
												bucket.bizcallback(bucket);
											}
										} else {
											bucket.result = {};
											bucket.result.status = "9999";
											bucket.result.message = "[ksbizAct.channelInit] DC_get reSession Fail response not exist";
											bucket.bizcallback(bucket);
										}
									});
								} else {
									var errMsg = "";
									if(serverCRKE == "-10701"){
										errMsg = "url parameter invalid";
									} else {
										errMsg = "server error";
									}
									bucket.result = {};
									bucket.result.status = serverCRKE;
									bucket.result.message = "[ksbizAct.channelInit] DC_get serverCRKE Fail : " + errMsg;
									bucket.bizcallback(bucket);
								}
							}
						} else {
							bucket.result = {};
							bucket.result.status = "9999";
							bucket.result.message = "[ksbizAct.channelInit] DC_get Fail response not exist";
							bucket.bizcallback(bucket);
						}
					});
				} else {
					bucket.result = {};
					bucket.result.status = "9999";
					bucket.result.message = "[ksbizAct.channelInit] channel2Init Fail clientR not exist";
					bucket.bizcallback(bucket);
				}
			}
		});
	},
	
	_sendClientFinished : function(bucket) {
		kslog("ksbizAct._sendClientFinished", bucket);
		// 1. serverCRKE 검증 & clientKEF 생성
		ksbizExtInterface.channel2Verify(bucket.serverCRKE, bucket.options, function(clientKEF, error){ //..callback1
			if(error){
				bucket.result = {};
				bucket.result.status = error.status;
				bucket.result.message = "[ksbizAct._sendClientFinished] channel2Verify Fail : " + error.message; 
				bucket.bizcallback(bucket);
			} else {
				if(clientKEF){
					kslog("ksbizAct._sendClientFinished.clientKEF", clientKEF);
					// 2. 서버에게 clientKEF 전송
					var keyValue = "msg=" + encodeURIComponent(clientKEF);
					DC_get(KSBizConfig.channelSvrUrl, keyValue, function(serverF){ //..callback2
						kslog("ksbizAct._sendClientFinished.serverF", serverF);
						if(serverF){
							if(!serverF.startsWith("-")){
								bucket.serverF = serverF;
								// 3. 서버로부터 전달받은 serverF를 다음단계로 패스
								ksbizAct._verifyServerFinished(bucket); //..callback3
							} else {
								var errMsg = "";
								if(serverF == "-10701"){
									errMsg = "url parameter invalid";
								} else {
									errMsg = "server error";
								}
								bucket.result = {};
								bucket.result.status = serverF;
								bucket.result.message = "[ksbizAct._sendClientFinished] DC_get serverF Fail";
								bucket.bizcallback(bucket);
							}
						} else {
							bucket.result = {};
							bucket.result.status = "9999";
							bucket.result.message = "[ksbizAct._sendClientFinished] DC_get Fail response not exist";
							bucket.bizcallback(bucket);
						}
					});
				} else {
					bucket.result = {};
					bucket.result.status = "9999";
					bucket.result.message = "[ksbizAct._sendClientFinished] channel2Verify Fail clientKEF not exist";
					bucket.bizcallback(bucket);
				}
			}
		});
	},
	
	_verifyServerFinished : function(bucket) {
		kslog("ksbizAct._verifyServerFinished", bucket);		
		// 1. serverF 검증
		ksbizExtInterface.channel2Final(bucket.serverF, bucket.options, function(isSuccess, error){
			if(error){
				bucket.result = {};
				bucket.result.status = error.status;
				bucket.result.message = "[ksbizAct._verifyServerFinished] channel2Final Fail : " + error.message; 
				bucket.bizcallback(bucket);
			} else {
				if(isSuccess){
					kslog("ksbizAct._verifyServerFinished.isSuccess", isSuccess);
					ksbizAct._symEnCrypt(bucket); // block encrypt..
					// bucket.result = {};
					// bucket.result.status = "1";
					// bucket.bizcallback(bucket);
				} else {
					bucket.result = {};
					bucket.result.status = "9999";
					bucket.result.message = "[ksbizAct._verifyServerFinished] channel2Final Fail isSuccess not exist";
					bucket.bizcallback(bucket);
				}
			}
		});
	},
	
	_symEnCrypt : function(bucket){
		kslog("ksbizAct._symEnCrypt", bucket);
		ksbizExtInterface.channel2Encrypt(bucket.data, bucket.options, function(encStr, error){
			if(error){
				bucket.result = {};
				bucket.result.status = error.status;
				bucket.result.message = "[ksbizAct._symEnCrypt] channel2Encrypt Fail : " + error.message; 
				bucket.bizcallback(bucket);
			} else {
				if(encStr){
					kslog("ksbizAct._symEnCrypt.encStr", encStr);
					bucket.result = {};
					bucket.result.status = "1";
					bucket.result.data = encStr;
					bucket.bizcallback(bucket);
				} else {
					bucket.result = {};
					bucket.result.status = "9999";
					bucket.result.message = "[ksbizAct._symEnCrypt] channel2Encrypt Fail encStr not exist";
					bucket.bizcallback(bucket);
				}
			}
		});
	},
	
	_symDeCrypt : function(bucket){
		kslog("ksbizAct._symDeCrypt", bucket);
		ksbizExtInterface.channel2Decrypt(bucket.data, bucket.options, function(decStr, error){
			if(error){
				bucket.result = {};
				bucket.result.status = error.status;
				bucket.result.message = "[ksbizAct._symDeCrypt] channel2Decrypt Fail : " + error.message; 
				bucket.bizcallback(bucket);
			} else {
				if(decStr){
					kslog("ksbizAct._symDeCrypt.decStr", decStr);
					bucket.result = {};
					bucket.result.status = "1";
					bucket.result.data = decStr;
					bucket.bizcallback(bucket);
				} else {
					bucket.result = {};
					bucket.result.status = "9999";
					bucket.result.message = "[ksbizAct._symDeCrypt] channel2Decrypt Fail decStr not exist";
					bucket.bizcallback(bucket);
				}
			}
		});
	},

	/////////// signFile block ////////////////////////
	signFile : function(bucket){
		ksbizAct.loadLogoImage(KSBizConfig.logoImageUrl, function(result){
        	if(result){
				ksbizExtInterface.signFile(bucket.srcfile, bucket.destfile, bucket.options, function(data, error){
					if(error){
						bucket.result = {};
						bucket.result.status = error.status;
						bucket.result.message = "[ksbizAct.signFile] signFile Fail [" + error.status + "] " + error.message; 
						bucket.bizcallback(bucket);
					} else {
						if(data.fileName){
							bucket.result = {};
							bucket.result.status = 1;
							bucket.result.fileName = data.fileName;
							bucket.bizcallback(bucket);
						} else {
							bucket.result = {};
							bucket.result.status = 0;
							bucket.result.fileName = "";
							bucket.bizcallback(bucket);
						}
					}
				});
        	} else {
        		bucket.result = {};
    			bucket.result.status = "9999";
    			bucket.result.message = "[ksbizAct.setLogoImage] logoImage setting fail";
    			bucket.bizcallback(bucket);
        	}
        });
	},
    
	addSignFile : function(bucket){
		ksbizAct.loadLogoImage(KSBizConfig.logoImageUrl, function(result){
        	if(result){
				ksbizExtInterface.addSignFile(bucket.srcfile, bucket.destfile, bucket.options, function(data, error){
					if(error){
						bucket.result = {};
						bucket.result.status = error.status;
						bucket.result.message = "[ksbizAct.addSignFile] addSignFile Fail [" + error.status + "] " + error.message; 
						bucket.bizcallback(bucket);
					} else {
						if(data.fileName){
							bucket.result = {};
							bucket.result.status = 1;
							bucket.result.fileName = data.fileName;
							bucket.bizcallback(bucket);
						} else {
							bucket.result = {};
							bucket.result.status = 0;
							bucket.result.fileName = "";
							bucket.bizcallback(bucket);
						}
					}
				});
        	} else {
        		bucket.result = {};
    			bucket.result.status = "9999";
    			bucket.result.message = "[ksbizAct.setLogoImage] logoImage setting fail";
    			bucket.bizcallback(bucket);
        	}
        });
	},
	
	channelEncryptFile : function(bucket){
        ksbizAct.setServerCert(function(setServerCertResult){
        	if(setServerCertResult){
            	if(setServerCertResult.status == 1){
            		
            		ksbizAct.setCACert(function(setCACertResult){
                    	if(setCACertResult){
                        	if(setServerCertResult.status == 1){
                        		ksbizAct.encryptFile(bucket);
                        	} else {
                        		bucket.result = setCACertResult;
                        		bucket.bizcallback(bucket);
                        	}
                    	} else {
                    		bucket.result = {};
                			bucket.result.status = "9999";
                			bucket.result.message = "[ksbizAct.channelEncryptFile] setCACert Fail";
                			bucket.bizcallback(bucket);
                    	}
            		});
            	} else {
            		bucket.result = setServerCertResult;
            		bucket.bizcallback(bucket);
            	}
        	} else {
        		bucket.result = {};
    			bucket.result.status = "9999";
    			bucket.result.message = "[ksbizAct.channelEncryptFile] setServerCert Fail";
    			bucket.bizcallback(bucket);
        	}
        });
	},
	
	encryptFile : function(bucket){
        if(!bucket.srcfile) bucket.srcfile = "";
        if(!bucket.destfile) bucket.destfile = "";
        if(!bucket.options)	bucket.options = {};
        if(!bucket.options.cipherAlgorithm) bucket.options.cipherAlgorithm = KSBizConfig.cipherAlgorithm;
        if(!bucket.options.saveType) bucket.options.saveType = KSBizConfig.saveType;
        if(!bucket.options.cmsKeyEncryptionAlgorithm && KSBizConfig.cmsKeyEncryptionAlgorithm)
        	bucket.options.cmsKeyEncryptionAlgorithm = KSBizConfig.cmsKeyEncryptionAlgorithm;
        
        ksbizExtInterface.encryptFile(bucket.srcfile, bucket.destfile, bucket.options, function(data, error){
			if(error){
				bucket.result = {};
				bucket.result.status = error.status;
				bucket.result.message = "[ksbizAct.encryptFile] encryptFile Fail [" + error.status + "] " + error.message; 
				bucket.bizcallback(bucket);
			} else {
				if(data.fileName){
					bucket.result = {};
					bucket.result.status = 1;
					bucket.result.fileName = data.fileName;
					bucket.bizcallback(bucket);
				} else {
					bucket.result = {};
					bucket.result.status = 9999;
					bucket.result.message = "[ksbizAct.encryptFile] encryptFile Fail";
					bucket.bizcallback(bucket);
				}
			}
        });
	},
	
	decryptFile : function(bucket){
        if(!bucket.srcfile) bucket.srcfile = "";
        if(!bucket.destfile) bucket.destfile = "";
        if(!bucket.options)	bucket.options = {};
        if(!bucket.options.cipherAlgorithm) bucket.options.cipherAlgorithm = KSBizConfig.cipherAlgorithm;
        if(!bucket.options.saveType) bucket.options.saveType = KSBizConfig.saveType;
        
        ksbizExtInterface.decryptFile(bucket.srcfile, bucket.destfile, bucket.options, function(data, error){
			if(error){
				bucket.result = {};
				bucket.result.status = error.status;
				bucket.result.message = "[ksbizAct.decryptFile] decryptFile Fail [" + error.status + "] " + error.message; 
				bucket.bizcallback(bucket);
			} else {
				if(data.fileName){
					bucket.result = {};
					bucket.result.status = 1;
					bucket.result.fileName = data.fileName;
					bucket.bizcallback(bucket);
				} else {
					bucket.result = {};
					bucket.result.status = 9999;
					bucket.result.message = "[ksbizAct.decryptFile] decryptFile Fail";
					bucket.bizcallback(bucket);
				}
			}
        });
	},
	
	compressFile : function(bucket){
        if(!bucket.options)	bucket.options = {};
        ksbizExtInterface.compressFile(bucket.srcfile, bucket.destfile, bucket.options, function(data, error){
			if(error){
				bucket.result = {};
				bucket.result.status = error.status;
				bucket.result.message = "[ksbizAct.compressFile] compressFile Fail [" + error.status + "] " + error.message; 
				bucket.bizcallback(bucket);
			} else {
				if(data.fileName){
					bucket.result = {};
					bucket.result.status = 1;
					bucket.result.fileName = data.fileName;
					bucket.bizcallback(bucket);
				} else {
					bucket.result = {};
					bucket.result.status = 9999;
					bucket.result.message = "[ksbizAct.compressFile] compressFile Fail";
					bucket.bizcallback(bucket);
				}
			}
        });
	},
	
	uncompressFile : function(bucket){
        if(!bucket.options)	bucket.options = {};
        ksbizExtInterface.uncompressFile(bucket.srcfile, bucket.destfile, bucket.options, function(data, error){
			if(error){
				bucket.result = {};
				bucket.result.status = error.status;
				bucket.result.message = "[ksbizAct.uncompressFile] uncompressFile Fail [" + error.status + "] " + error.message; 
				bucket.bizcallback(bucket);
			} else {
				if(data.fileName){
					bucket.result = {};
					bucket.result.status = 1;
					bucket.result.fileName = data.fileName;
					bucket.bizcallback(bucket);
				} else {
					bucket.result = {};
					bucket.result.status = 9999;
					bucket.result.message = "[ksbizAct.uncompressFile] uncompressFile Fail";
					bucket.bizcallback(bucket);
				}
			}
        });
	},
	
	signFileUrl : function(bucket){
		ksbizAct.loadLogoImage(KSBizConfig.logoImageUrl, function(result){
        	if(result){
				ksbizExtInterface.signFileUrl(bucket.url, bucket.options, function(data, error){
					if(error){
						bucket.result = {};
						bucket.result.status = error.status;
						bucket.result.message = "[ksbizAct.signFileUrl] signFileUrl Fail [" + error.status + "] " + error.message; 
						bucket.bizcallback(bucket);
					} else {
						if(data.fileName){
							bucket.result = {};
							bucket.result.status = 1;
							bucket.result.fileName = data.fileName;
							bucket.bizcallback(bucket);
						} else {
							bucket.result = {};
							bucket.result.status = 0;
							bucket.result.fileName = "";
							bucket.bizcallback(bucket);
						}
					}
				});
        	} else {
        		bucket.result = {};
    			bucket.result.status = "9999";
    			bucket.result.message = "[ksbizAct.setLogoImage] logoImage setting fail";
    			bucket.bizcallback(bucket);
        	}
        });
	},
	
	channelEncryptFileUrl : function(bucket){
		ksbizAct.setServerCert(function(setServerCertResult){
        	if(setServerCertResult){
            	if(setServerCertResult.status == 1){
            		ksbizAct.setCACert(function(setCACertResult){
                    	if(setCACertResult){
                        	if(setServerCertResult.status == 1){
                        		ksbizAct.encryptFileUrl(bucket);
                        	} else {
                        		bucket.result = setCACertResult;
                        		bucket.bizcallback(bucket);
                        	}
                    	} else {
                    		bucket.result = {};
                			bucket.result.status = "9999";
                			bucket.result.message = "[ksbizAct.channelEncryptFileUrl] setCACert Fail";
                			bucket.bizcallback(bucket);
                    	}
            		});
            		
            	} else {
            		bucket.result = setServerCertResult;
            		bucket.bizcallback(bucket);
            	}
        	} else {
        		bucket.result = {};
    			bucket.result.status = "9999";
    			bucket.result.message = "[ksbizAct.channelEncryptFileUrl] setServerCert Fail";
    			bucket.bizcallback(bucket);
        	}
        });
	},
	
	encryptFileUrl : function(bucket){
		ksbizExtInterface.encryptFileUrl(bucket.url, bucket.options, function(data, error){
			if(error){
				bucket.result = {};
				bucket.result.status = error.status;
				bucket.result.message = "[ksbizAct.encryptFileUrl] encryptFileUrl Fail [" + error.status + "] " + error.message; 
				bucket.bizcallback(bucket);
			} else {
				if(data.fileName){
					bucket.result = {};
					bucket.result.status = 1;
					bucket.result.fileName = data.fileName;
					bucket.bizcallback(bucket);
				} else {
					bucket.result = {};
					bucket.result.status = 0;
					bucket.result.fileName = "";
					bucket.bizcallback(bucket);
				}
			}
		});
	},
	
	signAndChannelEncryptFileUrl : function(bucket){
		ksbizAct.setServerCert(function(setServerCertResult){
        	if(setServerCertResult){
            	if(setServerCertResult.status == 1){
            		
            		ksbizAct.setCACert(function(setCACertResult){
                    	if(setCACertResult){
                        	if(setServerCertResult.status == 1){
                        		
                        		ksbizAct.loadLogoImage(KSBizConfig.logoImageUrl, function(result){
                                	if(result){
                                		
                        				ksbizExtInterface.signAndChannelEncryptFileUrl(bucket.url, bucket.options, function(data, error){
                        					if(error){
                        						bucket.result = {};
                        						bucket.result.status = error.status;
                        						bucket.result.message = "[ksbizAct.signAndChannelEncryptFileUrl] signAndChannelEncryptFileUrl Fail [" + error.status + "] " + error.message; 
                        						bucket.bizcallback(bucket);
                        					} else {
                        						if(data.fileName){
                        							bucket.result = {};
                        							bucket.result.status = 1;
                        							bucket.result.fileName = data.fileName;
                        							bucket.bizcallback(bucket);
                        						} else {
                        							bucket.result = {};
                        							bucket.result.status = 0;
                        							bucket.result.fileName = "";
                        							bucket.bizcallback(bucket);
                        						}
                        					}
                        				});
                                	} else {
                                		bucket.result = {};
                            			bucket.result.status = "9999";
                            			bucket.result.message = "[ksbizAct.signAndChannelEncryptFileUrl] logoImage setting fail";
                            			bucket.bizcallback(bucket);
                                	}
                                });
                        	} else {
                        		bucket.result = setCACertResult;
                        		bucket.bizcallback(bucket);
                        	}
                    	} else {
                    		bucket.result = {};
                			bucket.result.status = "9999";
                			bucket.result.message = "[ksbizAct.signAndChannelEncryptFileUrl] setCACert Fail";
                			bucket.bizcallback(bucket);
                    	}
            		});
            	} else {
            		bucket.result = setServerCertResult;
            		bucket.bizcallback(bucket);
            	}
        	} else {
        		bucket.result = {};
    			bucket.result.status = "9999";
    			bucket.result.message = "[ksbizAct.signAndChannelEncryptFileUrl] setServerCert Fail";
    			bucket.bizcallback(bucket);
        	}
        });
	},
	
	addSignFileUrl : function(bucket){
		ksbizAct.loadLogoImage(KSBizConfig.logoImageUrl, function(result){
        	if(result){
				ksbizExtInterface.addSignFileUrl(bucket.downloadUrl, bucket.uploadUrl, bucket.options, function(data, error){
					if(error){
						bucket.result = {};
						bucket.result.status = error.status;
						bucket.result.message = "[ksbizAct.addSignFileUrl] addSignFileUrl Fail [" + error.status + "] " + error.message; 
						bucket.bizcallback(bucket);
					} else {
						if(data.fileName){
							bucket.result = {};
							bucket.result.status = 1;
							bucket.result.fileName = data.fileName;
							bucket.bizcallback(bucket);
						} else {
							bucket.result = {};
							bucket.result.status = 0;
							bucket.result.fileName = "";
							bucket.bizcallback(bucket);
						}
					}
				});
        	} else {
        		bucket.result = {};
    			bucket.result.status = "9999";
    			bucket.result.message = "[ksbizAct.addSignFileUrl] logoImage setting fail";
    			bucket.bizcallback(bucket);
        	}
        });
	},
	
	channelDecryptFileUrl : function(bucket){
		
		ksbizAct.setServerCert(function(setServerCertResult){
        	if(setServerCertResult){
            	if(setServerCertResult.status == 1){
            		
            		ksbizAct.setCACert(function(setCACertResult){
                    	if(setCACertResult){
                        	if(setServerCertResult.status == 1){
                        		
                        		ksbizAct.loadLogoImage(KSBizConfig.logoImageUrl, function(result){
                                	if(result){
                                		
                                		// SID 가져오기~~~~~
//                                        var sid = this._getSid();
//                                        if(sid.length!=20){
//                                            alert("복호화에 실패했습니다.[sid 오류]");
//                                            return;
//                                        }
                                		var sid = "AAAAAA";
                                		
                        				ksbizExtInterface.channelDecryptFileUrl(bucket.url, sid, bucket.data, bucket.options, function(data, error){
                        					if(error){
                        						bucket.result = {};
                        						bucket.result.status = error.status;
                        						bucket.result.message = "[ksbizAct.channelDecryptFileUrl] channelDecryptFileUrl Fail [" + error.status + "] " + error.message; 
                        						bucket.bizcallback(bucket);
                        					} else {
                        						if(data.fileName){
                        							bucket.result = {};
                        							bucket.result.status = 1;
                        							bucket.result.fileName = data.fileName;
                        							bucket.bizcallback(bucket);
                        						} else {
                        							bucket.result = {};
                        							bucket.result.status = 0;
                        							bucket.result.fileName = "";
                        							bucket.bizcallback(bucket);
                        						}
                        					}
                        				});
                                	} else {
                                		bucket.result = {};
                            			bucket.result.status = "9999";
                            			bucket.result.message = "[ksbizAct.channelDecryptFileUrl] logoImage setting fail";
                            			bucket.bizcallback(bucket);
                                	}
                                });
                        	} else {
                        		bucket.result = setCACertResult;
                        		bucket.bizcallback(bucket);
                        	}
                    	} else {
                    		bucket.result = {};
                			bucket.result.status = "9999";
                			bucket.result.message = "[ksbizAct.channelDecryptFileUrl] setCACert Fail";
                			bucket.bizcallback(bucket);
                    	}
            		});
            	} else {
            		bucket.result = setServerCertResult;
            		bucket.bizcallback(bucket);
            	}
        	} else {
        		bucket.result = {};
    			bucket.result.status = "9999";
    			bucket.result.message = "[ksbizAct.channelDecryptFileUrl] setServerCert Fail";
    			bucket.bizcallback(bucket);
        	}
        });
	},
	
	decryptFileUrl : function(bucket){
		ksbizExtInterface.decryptFileUrl(bucket.url, bucket.options, function(data, error){
			if(error){
				bucket.result = {};
				bucket.result.status = error.status;
				bucket.result.message = "[ksbizAct.decryptFileUrl] decryptFileUrl Fail [" + error.status + "] " + error.message; 
				bucket.bizcallback(bucket);
			} else {
				if(data.fileName){
					bucket.result = {};
					bucket.result.status = 1;
					bucket.result.fileName = data.fileName;
					bucket.bizcallback(bucket);
				} else {
					bucket.result = {};
					bucket.result.status = 0;
					bucket.result.fileName = "";
					bucket.bizcallback(bucket);
				}
			}
		});
	},
	
	requestCertificate : function(bucket){
		var requestCertificateCallback = function(data, error){
			if(error){
				bucket.result = {};
				bucket.result.status = error.status;
				bucket.result.message = "[ksbizAct.requestCertificate] requestCertificate Fail :: " + error.message;
				if(error.status == "005E" || error.status == "005F"){
					bucket.result.status = "0";
					bucket.result.message = "user cancel";
				}
				bucket.bizcallback(bucket);
			} else {
				if(data){
					bucket.result = {};
					bucket.result.status = 1;
					bucket.result.message = data;
					bucket.bizcallback(bucket);
				} else {
					bucket.result = {};
					bucket.result.status = 0;
					bucket.result.message = "user cancel";
					bucket.bizcallback(bucket);
				}
			}
		};

		nativeBrowserCheck();
		if(KSBizConfig.uitype == "native"){
			if(KeySharpBiz.chkInit(arguments)){
				ksbizExtInterface.requestCertificate(bucket.ca, bucket.host, bucket.port, bucket.referenceValue, bucket.secretValue, bucket.options, requestCertificateCallback);
			}
		} else {
			var data = {};
			data.policyID = "IssueCert";
			data.plainText = bucket;
			data.options = bucket.options;
			XWC.cxsign(data, requestCertificateCallback);
		}
	},
	
	updateCertificate : function(bucket){
		var updateCertificateCallback = function(data, error){
			if(error){
				bucket.result = {};
				bucket.result.status = error.status;
				bucket.result.message = "[ksbizAct.updateCertificate] updateCertificate Fail :: " + error.message;
				bucket.bizcallback(bucket);
			} else {
				if(data){
					bucket.result = {};
					bucket.result.status = 1;
					bucket.result.message = data;
					bucket.bizcallback(bucket);
				} else {
					bucket.result = {};
					bucket.result.status = 0;
					bucket.result.message = "user cancel";
					bucket.bizcallback(bucket);
				}
			}
		};

		nativeBrowserCheck();
		if(KSBizConfig.uitype == "native"){
			if(KeySharpBiz.chkInit(arguments)){
				ksbizAct.loadLogoImage(KSBizConfig.logoImageUrl, function(result){
					if(result){
						ksbizExtInterface.updateCertificate(bucket.ca, bucket.host, bucket.port, bucket.options, updateCertificateCallback);
					} else {
						bucket.result = {};
						bucket.result.status = "9999";
						bucket.result.message = "[ksbizAct.updateCertificate] logoImage setting fail";
						bucket.bizcallback(bucket);
					}
				});
			}
		} else {
			var data = {};
			data.policyID = "UpdateCert";
			data.plainText = bucket;
			data.options = bucket.options;
			XWC.cxsign(data, updateCertificateCallback);
		}
	},
	
	deleteCertificate : function(bucket){
		ksbizExtInterface.deleteCertificate(bucket.subjectDN, bucket.options, function(data, error){
			if(error){
				bucket.result = {};
				bucket.result.status = error.status;
				bucket.result.message = "[ksbizAct.deleteCertificate] deleteCertificate Fail :: " + error.message;
				bucket.bizcallback(bucket);
			} else {
				if(data){
					bucket.result = {};
					bucket.result.status = 1;
					bucket.result.message = data;
					bucket.bizcallback(bucket);
				} else {
					bucket.result = {};
					bucket.result.status = 0;
					bucket.result.message = "";
					bucket.bizcallback(bucket);
				}
			}
		});
	},
	
	// browserExport
	browserExportCert : function(bucket){
		kslog("ksbizAct.browserExportCert", bucket);
		var resExportCallback = function(data, error){
			if(error){
				bucket.result = {};
				bucket.result.status = error.status;
				bucket.result.message = error.message; 
				bucket.bizcallback(bucket);				
			} else {
				bucket.result = {};
				bucket.result.status = 0;
				bucket.result.data = "";
				bucket.result.vidRandom = "";
				bucket.bizcallback(bucket);			
			}
		};
		
		if(bucket.options.subjectCertFilter || bucket.options.resetCertificate){
			bucket.options.resetCertificate = true;
		}
		var data = {};
		data.policyID = "ExportCert";
		data.sourceEncoding = bucket.options.encoding?bucket.options.encoding:"utf-8";
		data.options = bucket.options;
		
		XWC.cxsign(data, resExportCallback);

	},

	// browserImport
	browserImportCert : function(bucket){
		kslog("ksbizAct.browserImportCert", bucket);
		var resImportallback = function(data, error){
			if(error){
				bucket.result = {};
				bucket.result.status = error.status;
				bucket.result.message = error.message; 
				bucket.bizcallback(bucket);				
			} else {
				bucket.result = {};
				bucket.result.status = 0;
				bucket.result.data = "";
				bucket.result.vidRandom = "";
				bucket.bizcallback(bucket);			
			}
		};
		
		if(bucket.options.subjectCertFilter || bucket.options.resetCertificate){
			bucket.options.resetCertificate = true;
		}
		var data = {};
		data.policyID = "ImportCert";
		data.sourceEncoding = bucket.options.encoding?bucket.options.encoding:"utf-8";
		data.options = bucket.options;
		
		XWC.cxsign(data, resImportallback);

	},
	
    loadLogoImage : function(url, callback){
    	kslog("ksbizAct.loadLogoImage.url", url);
    	if(KSBizConfig.logoImage){
    		ksbizExtInterface.setProperty("logoImage", KSBizConfig.logoImage, callback);
    	} else {
			if(url){
				DC_get(url, "", function(result){
					if(result){
						//kslog("ksbizAct.loadLogoImage.result", result);
						kslog("ksbizAct.loadLogoImage.result", "success");
						KSBizConfig.logoImage = result;
						ksbizExtInterface.setProperty("logoImage", KSBizConfig.logoImage, callback);    				
					} else {
						kslog("ksbizAct.loadLogoImage.result", "logoImage not exist");
						if(callback) callback(false);
					}
				});
			} else {
				if(callback) callback(true);
			}
    	};
    },
    
    setServerCert : function(callback){
		var setServerCertCallback = function(result, error){
			if(error){
				result = {};
				result.status = error.status;
				result.message = "[ksbizAct.setServerCert] SetServerCert Fail [" + error.status + "] " + error.message;
				callback(result);				
			} else {
				if(result){
					result = {};
					result.status = 1;
					callback(result);
				} else {
					result = {};
					result.status = "9999";
					result.message = "[ksbizAct.setServerCert] ServerCert SetProperty Fail";
					callback(result);				
				}
			}
		};
		var setServerCertError = function(){
			var result = {};
			result.status = "9999";
			result.message = "[ksbizAct.setServerCert] ServerCert not exist";
			callback(result);
		};
		
		if(KSBizConfig.serverCert){
			ksbizExtInterface.setProperty("serverCert", KSBizConfig.serverCert, setServerCertCallback);
    	} else {
    		if(KSBizConfig.serverCertUrl){
    			DC_get(KSBizConfig.serverCertUrl, "", function(svrCert){
    				if(svrCert){
						KSBizConfig.serverCert = svrCert;
						ksbizExtInterface.setProperty("serverCert", svrCert, setServerCertCallback);
    				} else {
    					setServerCertError();
    				}
    			});
    		} else {
    			setServerCertError();
    		}
    	}
    },
    
    setCACert : function(callback){
		var setCACertCallback = function(result, error){
			if(error){
				result = {};
				result.status = error.status;
				result.message = "[ksbizAct.setCACert] SetCACert Fail [" + error.status + "] " + error.message;
				callback(result);				
			} else {
				if(result){
					result = {};
					result.status = 1;
					callback(result);
				} else {
					result = {};
					result.status = "9999";
					result.message = "[ksbizAct.setCACert] CACert SetProperty Fail";
					callback(result);
				}
			}
		};
		var setCACertError = function(){
			var result = {};
			result.status = "9999";
			result.message = "[ksbizAct.setCACert] CACert not exist";
			callback(result);
		};
		
		if(KSBizConfig.caCert){
			ksbizExtInterface.setProperty("caCert", KSBizConfig.caCert, setCACertCallback);
    	} else {
    		if(KSBizConfig.caCertUrl){
    			DC_get(KSBizConfig.caCertUrl, "", function(caCert){
    				if(caCert){
    					KSBizConfig.caCert = caCert;
    					ksbizExtInterface.setProperty("caCert", caCert, setCACertCallback);
    				} else {
    					setCACertError();
    				}
    			});
    		} else {
    			setCACertError();
    		}
    	}
	},
	lineEncrypt : function(bucket){
		kslog("ksbizAct.lineEncrypt", bucket);
		var lineEncryptCallback = function(encStr, error){
			if(error){
				bucket.result = {};
				bucket.result.status = error.status;
				bucket.result.message = "[ksbizAct.lineEncrypt] lineEncrypt Fail : " + error.message; 
				bucket.bizcallback(bucket);
			} else {
				if(encStr){
					kslog("ksbizAct.lineEncrypt.encStr", encStr);
					bucket.result = {};
					bucket.result.status = "1";
					bucket.result.data = encStr;
					bucket.bizcallback(bucket);
				} else {
					bucket.result = {};
					bucket.result.status = "9999";
					bucket.result.message = "[ksbizAct.lineEncrypt] lineEncrypt Fail encStr not exist";
					bucket.bizcallback(bucket);
				}
			}
		} 
		//caCert
		if(!bucket.options.caCert) {
			if(KSBizConfig.caCert) {
				bucket.options.caCert = KSBizConfig.caCert;
			}
		}
		if(!KSBizConfig.serverCert || !KSBizConfig.serverSid){
			DC_get(KSBizConfig.lineServerURL, "", function(res){
				kslog("[ksbizAct.lineEncrypt.server]", res);
				if(res.length != ""){
					var resJSON = JSON.parse(res);
					var serverSid = resJSON.sid;
					var serverCert = resJSON.serverCert;
					//serverCert
					if(serverCert != ""){
						KSBizConfig.serverCert = serverCert;
						bucket.options.serverCert = KSBizConfig.serverCert;
						kslog("[ksbizAct.lineEncrypt.serverCert]",bucket.options.serverCert);
						//serverSid
						if(serverSid.length != 20){
							alert("암호화에 실패하였습니다. [serverSid 오류]");
						} else{
							KSBizConfig.serverSid = serverSid;
							bucket.options.serverSid = KSBizConfig.serverSid;
							kslog("[ksbizAct.lineEncrypt.bucket]", bucket);
							ksbizExtInterface.lineEncrypt(bucket.data, bucket.options, lineEncryptCallback);
						}
					} else{
						alert("서버 인증서를 가져올 수 없습니다.");
					}
				} else {
					alert("서버 인증서를 가져올 수 없습니다.");
				}
			});
		} else {
			bucket.options.serverCert = KSBizConfig.serverCert;
			bucket.options.serverSid = KSBizConfig.serverSid;
			ksbizExtInterface.lineEncrypt(bucket.data, bucket.options, lineEncryptCallback);
		}
	},
	lineDecryptAsync : function(bucket){
		kslog("ksbizAct.lineDecryptAsync", bucket);
		ksbizExtInterface.lineDecryptAsync(bucket.data, bucket.options, function(decStr, error){
			if(error){
				bucket.result = {};
				bucket.result.status = error.status;
				bucket.result.message = "[ksbizAct.lineDecryptAsync] lineDecryptAsync Fail : " + error.message; 
				bucket.bizcallback(bucket);
			} else {
				if(decStr){
					kslog("ksbizAct.lineDecryptAsync.decStr", decStr);
					bucket.result = {};
					bucket.result.status = "1";
					bucket.result.data = decStr;
					bucket.bizcallback(bucket);
				} else {
					bucket.result = {};
					bucket.result.status = "9999";
					bucket.result.message = "[ksbizAct.lineDecryptAsync] lineDecryptAsync Fail decStr not exist";
					bucket.bizcallback(bucket);
				}
			}
		});
	},
	simpleEncrypt : function(bucket){
		kslog("ksbizAct.simpleEncrypt", bucket);
		var simpleEncryptCallback = function(encStr, error){
			if(error){
				bucket.result = {};
				bucket.result.status = error.status;
				bucket.result.message = "[ksbizAct.simpleEncrypt] simpleEncrypt Fail : " + error.message; 
				bucket.bizcallback(bucket);
			} else {
				if(encStr){
					kslog("ksbizAct.simpleEncrypt.encStr", encStr);
					bucket.result = {};
					bucket.result.status = "1";
					bucket.result.data = encStr;
					bucket.bizcallback(bucket);
				} else {
					bucket.result = {};
					bucket.result.status = "9999";
					bucket.result.message = "[ksbizAct.simpleEncrypt] simpleEncrypt Fail encStr not exist";
					bucket.bizcallback(bucket);
				}
			}
		}
		//caCert
		if(!bucket.options.caCert) {
			if(KSBizConfig.caCert) {
				bucket.options.caCert = KSBizConfig.caCert;
			}
		}
		//serverCert
		if(!bucket.options.serverCert){
			if(KSBizConfig.serverCert == ""){
				DC_get(KSBizConfig.serverCertUrl, "", function(serverCert){
					kslog("[ksbizAct.simpleEncrypt.server]", serverCert);
					if(serverCert.length != ""){
						KSBizConfig.serverCert = serverCert;
						bucket.options.serverCert = KSBizConfig.serverCert;
						ksbizExtInterface.simpleEncrypt(bucket.data, bucket.options, simpleEncryptCallback);
					} else{
						alert("서버 인증서를 가져올 수 없습니다.");
					}
				});
			} else{
				bucket.options.serverCert = KSBizConfig.serverCert;
				ksbizExtInterface.simpleEncrypt(bucket.data, bucket.options, simpleEncryptCallback);
			}		
		}
	},
	simpleDecryptAsync : function(bucket){
		kslog("ksbizAct.simpleDecryptAsync", bucket);
		ksbizExtInterface.simpleDecryptAsync(bucket.data, bucket.options, function(decStr, error){
			if(error){
				bucket.result = {};
				bucket.result.status = error.status;
				bucket.result.message = "[ksbizAct.simpleDecryptAsync] simpleDecryptAsync Fail : " + error.message; 
				bucket.bizcallback(bucket);
			} else {
				if(decStr){
					kslog("ksbizAct.simpleDecryptAsync.decStr", decStr);
					bucket.result = {};
					bucket.result.status = "1";
					bucket.result.data = decStr;
					bucket.bizcallback(bucket);
				} else {
					bucket.result = {};
					bucket.result.status = "9999";
					bucket.result.message = "[ksbizAct.simpleDecryptAsync] simpleDecryptAsync Fail decStr not exist";
					bucket.bizcallback(bucket);
				}
			}
		});
	}
};