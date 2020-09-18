$(document).ready(function(){
	// 타이틀 드래그, 우클릭, 드래그방지
	$("#container").draggable({"cancel":".contents,.pop_area"});
	document.oncontextmenu = function() { return false; };
	document.onselectstart = function() { return false; };
	$("li").on("dragstart", false);
	$(".btn_set").on("dragstart", false);
	$(".btn_area").on("dragstart", false);
	$("form").on("dragstart", false);
	$(".logo_box img").on("dragstart", false);
});
/**
 * initialize...
 */
$(function(){
	// more 닫기 버튼
	$(".btn_close").on("click", function(){
		$(".more_storage_box").hide();
	});
	// 팝업레이어 닫기
    $(".btn_pop_close").on("click", function(){
		// cert detail
		$(".pop_noti").hide();
		// cert exporter download
		$(".pop_dwn").hide();
		// background
    	$(".modal_bg").hide();
	});
	// 인증서 보기 닫기
    $(".pop_noti .btn_org").on("click", function(e){
		e.stopPropagation();
		e.preventDefault();
		$(".pop_noti").hide();
		$(".modal_bg").hide();
		if(ui.pastFocus){
			ui.pastFocus.focus();
			ui.pastFocus = null;
		}
	});
	// help 팝업 설정
	$(".help-layer .title .close").on("click", function(){
		$(".help-layer").hide();
	});
	// 전자서명창닫기, 취소 클릭
	$(".top_tit_area .btn_close").on("click", function(){
		if(!cxCtrl.isImportCertPage()){
			uiCtrl.winClose();
		} else{
			$(this).browserImportCancel();
		}
	});
	$(".contents .btn_area .btn_wht2").on("click", function(){
		if(!cxCtrl.isImportCertPage()){
			uiCtrl.winClose();
		} else{
			$(this).browserImportCancel();
		}

	});

	// 저장소 html 초기화
	if(typeof KSBizConfig.viewVersion != "undefined" && KSBizConfig.viewVersion == false){
		$(".top_tit_area .title .verT").css('display','none');
	} else{
		$(".htmlVer").html(KSBizConfig.version.exHTMLVer);
	}
	$(".choice_box").html("");
	$(".certi_lst").html("");
	$(".storage_lst li").removeClass("on").removeClass("disable").addClass("disable");
	$(".storage_more li").removeClass("on").removeClass("disable").addClass("disable");
	// .choice_box, .more_storage_box 다른곳 클릭하면 사라지도록
	$(document).on("click", function(event){
		try{
			$(".choice_box").each(function(i){
				if($(this).css("display") == "block"){
					$(".choice_box").hide();
					$(".storage_lst li").removeClass("clicked");
					$(".storage_more li").removeClass("clicked");
				}
			});
			if($(".more_storage_box").css("display") == "block"){
				$(".storage_lst li").removeClass("clicked");
				$(".storage_more li").removeClass("clicked");
				$(".more_storage_box").hide();
			}
		} catch(e){}
	});
    // 인증서 보기
    $(".tab_area li").each(function(i){
    	$(this).on("click", function(e){
    		$(".tab_area li").removeClass("on");
			$(".tab_area li").eq(i).addClass("on");
    		/* 일반/자세히 */
    		if( i == 0 ){
    			$(".tab1").show();
    			$(".tab2").hide();
    		} else{
    			$(".tab2").show();
    			$(".tab1").hide();
    		}
    	});
	});
	// cert export 다운로드 버튼
	$(".pop_dwn .btn_org").each(function(i){
		$(this).on("click", function(e){
			if(i == 0){
				if(TOUCHENEX_UTIL.isWin()){
					location.href = KSBizConfig.certExport.win;
				} else if(TOUCHENEX_UTIL.isMac()){
					if(KSBizConfig.yessignOpenCertUse && (TOUCHENEX_UTIL.isSafari() && TOUCHENEX_UTIL.getBrowserVer() >= 11)){
						window.open(KSBizConfig.certExport.mac,'_blank');
					} else{
						location.href = KSBizConfig.certExport.mac;
					}
				}
			} else if(i == 1){
				if(navigator.platform.indexOf("i686")>-1){
					location.href = KSBizConfig.certExport.ubuntu32;
				} else {
					location.href = KSBizConfig.certExport.ubuntu64;
				}
			} else if(i == 2){
				if(navigator.platform.indexOf("i686")>-1){
					location.href = KSBizConfig.certExport.fedora32;
				} else {
					location.href = KSBizConfig.certExport.fedora64;
				}
			}
		});
	});
	if(TOUCHENEX_UTIL.isLinux()){
		$(".export_down").hide();
		$(".export_down_linux").show();
	}
	// 전자서명 확인 버튼
	$('.password_area .btn_org').on("click", function(){
		if(cxCtrl.isExportCertPage()){
			$(this).browserExportCert();
		} else if(!cxCtrl.isUpdateCertPage()){
			ui.sign();
		} else{
			ui.updateCert();
		}
	});
	$('.browserCertCheck_area .btn_area .btn_org').on("click", function(){
		if(cxCtrl.isExportCertPage()){
			uiCtrl.winClose();
		}else if(cxCtrl.isImportCertPage()){
			$(this).browserImportCertInit();
		}
	});
	$(".issue_area .storage_area .btn_org").on("click", ui.issueSelectStorage);
	$(".issue_area .enter_area .btn_org").on("click", ui.issueInputPassword);
	$(".issue_area .pin_area .btn_org").on("click", ui.issueInputPin);
	// 비밀번호 엔터
	$('#certFrm input:password').on("keydown", function(e){
		if(e.which ==  13){
			$(this).blur();
			setTimeout(function(){
				$('.password_area .btn_org').click();
			}, 50);
		}
	});
	$('#popCertFrm input:password').on("keydown", function(e){
		if(e.which ==  13){
			$(this).blur();
			setTimeout(function(){
				$('.pop_pw .btn_org').click();
			}, 50);
		}
	});
	$('#popCertDeviceFrm input:password').on("keydown", function(e){
		if(e.which ==  13){
			$(this).blur();
			setTimeout(function(){
				$('.pop_pw_device .btn_org').click();
			});
		}
	});
	$('#issuePinFrm input:password').on("keydown", function(e){
		if(e.which ==  13){
			$(this).blur();
			setTimeout(function(){
				$('.issue_area .pin_area .btn_org').click();
			}, 50);
		}
	});
	// ESC
	$(document).keydown(function(event){
		if(event.keyCode != 27) return true;
		var chkESC = false;
		// choice_box
		$(".choice_box").each(function(){
			if($(this).css("display") != "none"){
				$(this).hide();
				chkESC = true;
			}
		});
		// more
		if(!chkESC){
			if($(".more_storage_box").css("display") != "none"){
				$(".more_storage_box").hide();
				$(".modal_bg").hide();
				chkESC = true;
			}
		}
		// 인증서 보기
		if(!chkESC){
			if($(".pop_noti").css("display") != "none"){
				$(".pop_noti").hide();
				$(".modal_bg").hide();
				chkESC = true;
			}
		}
		// pop_alert
		if(!chkESC){
			$(".pop_alert").each(function(i){
				var pop = $(".pop_alert").eq(i);
				if(pop.css("display") != "none"){
					pop.hide();
					$(".modal_bg").hide();
					chkESC = true;
					// 동작중인것이 있다면 callback을 초기화한다.
					if(cxInvokeCommon.callback.length > 0){
						kslog("[ESC keydown]", "cxInvokeCommon.callback init..")
						cxInvokeCommon.callback = [];
					}
				}
			});
		}
		// sign layer
		if(!chkESC){
			$(".password_area .btn_area .btn_wht2").click();
		}
	});
});

var ui = {
	pastFocus : null,
	alert : function(msg, callback){
		$(".pop_error .cmt").html(msg);
		$(".pop_error .btn_org").off("click").on("click", function(e){
			e.stopPropagation();
			e.preventDefault();
			ui.hiddenAndShow(true);
			$(".pop_error").hide();
			$(".pop_noti").hide();
			if(ui.pastFocus) {
				ui.pastFocus.focus();
				ui.pastFocus = null;
			}
			if(callback) setTimeout(callback, 5);
		});
		ui.hiddenAndShow(false);
		$(".pop_error").show();
		if($(".pop_error .cmt").height() > 30){
			$(".pop_error .alert_txt").addClass("long");
		} else {
			$(".pop_error .alert_txt").removeClass("long");
		}
		$(".pop_error .btn_org").focus();		
	},
	message : function(msg, callback){
		$(".pop_message .cmt").html(msg);
		$(".pop_message .btn_org").off("click").on("click", function(e){
			e.stopPropagation();
			e.preventDefault();
			ui.hiddenAndShow(true);
			$(".pop_message").hide();
			$(".more_storage_box").hide();
			$(".pop_noti").hide();
			if(ui.pastFocus) {
				ui.pastFocus.focus();
				ui.pastFocus = null;
			}
			if(callback) setTimeout(callback, 5);
		});
		ui.hiddenAndShow(false);
		$(".pop_message").show();
		if($(".pop_message .cmt").height() > 30){
			$(".pop_message .alert_txt").addClass("long");
		} else {
			$(".pop_message .alert_txt").removeClass("long");
		}
		$(".pop_message .btn_org").focus();
	},
	confirm : function(msg, okCallback, cancelCallback){
		$(".pop_confirm .cmt").html(msg);
		$(".pop_confirm .btn_org").off("click").on("click", function(e){
			e.stopPropagation();
			e.preventDefault();
			ui.hiddenAndShow(true);
			$(".pop_confirm").hide();
			if(okCallback) setTimeout(okCallback, 5);
		});
		$(".pop_confirm .btn_wht2").off("click").on("click", function(e){
			e.stopPropagation();
			e.preventDefault();
			ui.hiddenAndShow(true);
			$(".pop_confirm").hide();
			if(ui.pastFocus) {
				ui.pastFocus.focus();
				ui.pastFocus = null;
			}
			if(cancelCallback) setTimeout(cancelCallback, 5);
		});
		ui.hiddenAndShow(false);
		$(".pop_confirm").show();
		if($(".pop_confirm .cmt").height() > 30){
			$(".pop_confirm .alert_txt").addClass("long");
		} else {
			$(".pop_confirm .alert_txt").removeClass("long");
		}
		$(".pop_confirm .btn_org").focus();
	},
	loading : {
		seqCount: 0,
		seqTotal: 8,
		loadingInterval: null,
		start: function(){
			if($(".loading_bg").css("display") == "none"){
				$(".loading_bg").show();
				$(".loading").show();
				var movX = $(".loading").width();
				ui.loading.loadingInterval = setInterval( function(){
					ui.loading.seqCount++;
					if( ui.loading.seqCount >= ui.loading.seqTotal ) ui.loading.seqCount = 0;
					$(".loading").css('background-position-x', -movX * ui.loading.seqCount);
				}, 100);
			}
		},
		end: function(){
			clearInterval(ui.loading.loadingInterval);
			$(".loading").hide();
			$(".loading_bg").hide();
		}
	},
	kbdloading : {
		seqCount: 0,
		seqTotal: 8,
		loadingInterval: null,
		start: function(){
			if($(".kbd_loading_bg").css("display") == "none"){
				$(".kbd_loading_bg").show();
				$(".kbd_loading").show();
				var movX = $(".kbd_loading").width();
				ui.loading.loadingInterval = setInterval( function(){
					ui.loading.seqCount++;
					if( ui.loading.seqCount >= ui.loading.seqTotal ) ui.loading.seqCount = 0;
					$(".kbd_loading").css('background-position-x', -movX * ui.loading.seqCount);
				}, 100);
			}
		},
		end: function(){
			clearInterval(ui.loading.loadingInterval);
			$(".kbd_loading").hide();
			$(".kbd_loading_bg").hide();
		}
	},
	popLayerSaved : {
		alert : false,
		bg : false,
		popObj : null,
		moreStorage : false
	},
	hiddenAndShow : function(status){
		// status : false => hidden, true => show
		if(!status){
			// loading bar status
			if($(".loading").css("display") != "none"){
				ui.popLayerSaved.alert = true;
				ui.loading.end();
			} else {
				ui.popLayerSaved.alert = false;
			}
			// modal_bg status
			if($(".modal_bg").css("display") != "none"){
				ui.popLayerSaved.bg = true;
			} else {
				ui.popLayerSaved.bg = false;
				$(".modal_bg").show();
			}
			// more_storage_box status
			if($(".more_storage_box").css("display") != "none"){
				ui.popLayerSaved.moreStorage = true;
				$(".more_storage_box").hide();
			} else {
				ui.popLayerSaved.moreStorage = false;
			}
			// pop_alert status
			ui.popLayerSaved.popObj = null;
			$(".pop_alert").each(function(i){
				var pop = $(".pop_alert").eq(i);
				//if(pop.is(pop.show())){
				if(pop.css("display") != "none"){
					ui.popLayerSaved.popObj = pop;
					pop.hide();
				}
			});
		} else {
			if(ui.popLayerSaved.alert){
				ui.loading.start();
				ui.popLayerSaved.alert = false;
			} else {
				ui.loading.end();
			}
			if(ui.popLayerSaved.bg){
				$(".modal_bg").show();
				ui.popLayerSaved.bg = false;
			} else {
				$(".modal_bg").hide();
			}
			if(ui.popLayerSaved.moreStorage){
				$(".more_storage_box").show();
				ui.popLayerSaved.moreStorage = false;
			} else {
				$(".more_storage_box").hide();
			}
			if(ui.popLayerSaved.popObj){
				ui.popLayerSaved.popObj.show();
				ui.popLayerSaved.popObj = null;
			} else {
				ui.popLayerSaved.popObj = null;
			}
		}
	},
	setLogoImage : function(){
		DC_get(KSBizConfig.logoImageUrl, "", function(logoImg){
			if(logoImg){
				$(".logo_box img").attr("src","data:image/png;base64,"+logoImg);
			} else {
				$(".logo_box img").attr("src", "./images/default.png");
			}
			$(".logo_box").show();
		});
	},
	setWinPosition : function(defHeight){
		var contHeight = $("#container").height();
		if(contHeight == 0){
			contHeight = defHeight;
		}
		//var winHeight = $(parent.document).find("#cxsignLayer").height();;
		var winHeight = parent.innerHeight;
		var margin = 0;
		margin = (winHeight - contHeight) / 2 - 40;
		if(cxCtrl.isIssueCertPage()) margin = margin - 60;
		if(margin < 0) margin = 0;
		$("#container").css("margin-top", margin + "px");
	},
	setHelp : function(lang){
		if(!lang){
			lang = "kor";
		}
		$(".help-layer .title").css("background-image", "url('./images/helplayer-title-" + lang + ".png')");
		DC_get("help_layer_" + lang + ".html", "", function(res){
			$(".help-layer .content").html(res);
			$(".help-layer-btn, .help-btn").on("click", function(){
				var helpWin = window.open("about:blank", "pop_ksbiz_help", "directories=no,location=no,menubar=no,titlebar=no,status=no,resizable=yes,width=720px,height=800px");
				if(helpWin == null){
					ui.alert(uiCtrl.getLang("check_popup_block"));
				} else {
					helpWin.location.href = "./help_" + lang + ".html";
				}
			});
		});
	},
	initSignCompact : function(){
		var head = document.getElementsByTagName('head')[0];
		var compactCss = document.createElement("link");
		compactCss.rel = "stylesheet";
        compactCss.type = "text/css";
        compactCss.href = "./css/compact.css";
		head.appendChild(compactCss);
		$(".info_txt").css("display","none");
		$(".help-btn").css("display","none");
		KSBizConfig.browsercert_guide = false;
	},
	// transkey : 180px
	initSign : function(){
		if(KSBizConfig.signSize == "compact"){
			ui.initSignCompact();
		}
		$(".bank_info").hide();
		$(".account_info").hide();
		$(".manage_area").hide();
		$(".top_tit_area .title .lang").eq(0).html(uiCtrl.getLang("sign_dialog_title"));
		$(".password_area").show();
		// default height : 655px
		ui.setWinPosition(655);
	},
	initManage : function(){
		$(".logo_box").hide();
		$(".bank_info").hide();
		$(".account_info").hide();
		$(".btn_sign").hide();
		$(".password_area").hide();
		$(".top_tit_area .title .lang").eq(0).html(uiCtrl.getLang("manage_cert_dialog_title"));
		$(".manage_area").show();
		// default height : 543px
		ui.setWinPosition(543);
	},
	initIssue : function(){
		cxInvokeCommon.issueCopyInfo = {};
		$(".logo_box").hide();
		$(".bank_info").hide();
		$(".account_info").hide();
		$(".contents > .storage_area").hide();
		$(".certification_area").hide();
		$(".btn_sign").hide();
		$(".password_area").hide();
		$(".manage_area").hide();
		$(".issue_area .enter_area").hide();
		$(".top_tit_area .title .lang").eq(0).html(uiCtrl.getLang("request_cert"));
		$(".issue_area .storage_area").show();
		$(".issue_area").show();
		// default height : 223px
		ui.setWinPosition(223);
	},
	initExport : function(){
		$(".bank_info").hide();
		$(".account_info").hide();
		$(".manage_area").hide();
		$(".btn_sign").hide();
		$(".storage_area").hide();
		$(".browserCertCheck_area").hide();
		$(".top_tit_area .title .lang").eq(0).html(uiCtrl.getLang("between_export_cert"));
		$(".certification_area").css("margin-top","0");
		$(".certification_area .btn_set").show();
		$(".password_area").show();
		// default height : 655px
		ui.setWinPosition(355);
	},
	initExportBrowser : function(){
		$(".bank_info").hide();
		$(".account_info").hide();
		$(".manage_area").hide();
		$(".storage_area").hide();
		$(".btn_sign").hide();
		$(".password_area").hide();
		$(".certification_area").hide();
		$(".top_tit_area .title .lang").eq(0).html(uiCtrl.getLang("between_export_cert"));
		$(".browserCert_info_txt").html(uiCtrl.getLang("enter_import_number_cert"));
		$(".browserCertCheck_area").show();
		// default height : 655px
	},
	initImport : function(){
		$(".bank_info").hide();
		$(".account_info").hide();
		$(".manage_area").hide();
		$(".storage_area").hide();
		$(".btn_sign").hide();
		$(".password_area").hide();
		$(".certification_area").hide();
		$(".top_tit_area .title .lang").eq(0).html(uiCtrl.getLang("between_import_cert"));
		$(".browserCert_info_txt").html(uiCtrl.getLang("enter_export_number_cert"));
		$(".browserCertCheck_area").show();
		// default height : 655px
		ui.setWinPosition(330);
	},
	viewAccountInfo : function(dataArr){
		kslog("setAccountInfo.dataArr", dataArr);

		// init
		var accountInfoTbl = $(".account_info .type3 tbody");
		accountInfoTbl.html("");

		for(var i = 0; i < dataArr.length; i++){
			var data = dataArr[i];
			var trObj = $("<tr>").addClass("sp");
			var thObj = $("<th>").html(data.name);
			var tdObj = $("<td>").html(data.value);
			trObj.append(thObj).append(tdObj);
			accountInfoTbl.append(trObj);

			var nowNo = data.no;
			if(dataArr[i+1] && dataArr[i+1].no && dataArr[i+1].no > nowNo){
				accountInfoTbl.append('<tr class="dv"><td colspan="2"><span class="dash"></span></td></tr>');
			}
		}
		// scroll set
		$("tr.sp:even").css("background-color", "#f3f6fa");
		// view area
		$(".account_info").show();
		$(".scrollbar-inner").scrollbar();
	},
	setSignTitleImage : function (signTitleImage){
		if(signTitleImage){
			$(".bank_info img").attr("src","data:image/png;base64,"+signTitleImage);
			cxsign.viewSignImage=true;
		} else {
			$(".bank_info img").attr("src", "#");
			$(".bank_info").hide();
		}
	},
	initGrid : function(){
		// cert grid
		$('#grid').w2grid({
			name: 'grid',
			sortData: [{field: 'type', direction: 'asc'}],
			//autoLoad: false,
			keyboard: true,
			multiSelect: false,
			columns: [
				// { field: 'recid', caption: 'recid', size: '50px', sortable: true, attr: 'align=center' },
				// { field: 'expire_status', caption: 'isExpire', size: '50px', sortable: true },
				{ field: 'type', caption: uiCtrl.getLang("purpose"), size: '110px', sortable: true, resizable: true },
				{ field: 'user_name', caption: uiCtrl.getLang("user"), size: '132px', sortable: true, resizable: true },
				{ field: 'after_date', caption: uiCtrl.getLang("expire_date"), size: '78px', sortable: true, resizable: true },
				{ field: 'org', caption: uiCtrl.getLang("issuer"), size: '18%', sortable: true, resizable: true }
			],
			onKeydown: function(event) {},
			records: []
		});
		w2ui.grid.on('click', function(event) {
			var _idx = event.recid;
			//var _tr = $("tr[recid=" + _idx +"]");
			// var _tr = $("#grid_grid_rec_" + _idx);
			var _tr = $("#grid");
			var _trOffset = _tr.offset();

			if(typeof event.originalEvent.pageY != "undefined"){
				_trOffset = event.originalEvent.pageY - $("#container").offset().top;
			} else {
				_trOffset = _trOffset.top - ($("#container").offset().top - 50);
			}
			// set currentCert
			var gridList = cxCtrl.getCertGrid();
			var selectCert = gridList[_idx-1].cert;
			cxCtrl.setCurrentCert(selectCert.storage, selectCert.drive, selectCert.cid, selectCert.expire_status);
			if(cxsign.firstCert){
				cxsign.firstCert = false;
				$('#grid_grid_focus').val(uiCtrl.getLang("select_certificate_voice_msg") + gridList[_idx-1].type + gridList[_idx-1].user_name + gridList[_idx-1].after_date + gridList[_idx-1].org  +  uiCtrl.getLang("select_certificate_voice_select_msg"));
				$('#grid_grid_focus').attr('aria-label', uiCtrl.getLang("select_certificate_voice_msg") + gridList[_idx-1].type + gridList[_idx-1].user_name + gridList[_idx-1].after_date + gridList[_idx-1].org  +  uiCtrl.getLang("select_certificate_voice_select_msg"));
			} else {
				$('#grid_grid_focus').val(gridList[_idx-1].type + gridList[_idx-1].user_name + gridList[_idx-1].after_date + gridList[_idx-1].org  + uiCtrl.getLang("select_certificate_voice_select_msg"));
				$('#grid_grid_focus').attr('aria-label', gridList[_idx-1].type + gridList[_idx-1].user_name + gridList[_idx-1].after_date + gridList[_idx-1].org  +  uiCtrl.getLang("select_certificate_voice_select_msg"));
			}
			// KSBizConfig.certclickfocus set..
			if((cxCtrl.isSignPage() || cxCtrl.isUpdateCertPage()) && KSBizConfig.certclickfocus == true){
				if(cxsign.firstCertFocusCheck == true){

					kslog("w2ui.grid.click", "cxsign.firstCertFocusCheck false");
					if(document.getElementById("certpwd").readOnly != true){
						kslog("w2ui.grid.click", "certpwd focus");
						$("#certpwd").focus();
					} else {
						kslog("w2ui.grid.click", "certpwd readonly");
					}
				} else {
					kslog("w2ui.grid.click", "cxsign.firstCertFocusCheck true");
					cxsign.firstCertFocusCheck = true;
				}
			}

			for(var item in gridList){
				var cert = gridList[item];
				var pointX = 243;
				if(gridList.length > 4) pointX = 234;

				if(cert.recid == _idx && cert.expire_status == 'EXPIRE'){
					// var x = event.originalEvent.pageX - $("#container").offset().left;
					// var y = event.originalEvent.pageY - $("#container").offset().top;
					//$(".noti_layer").show().css("left", x).css("top", y);
					if(!KSBizConfig.disableExpireWarn){
						$(".noti_layer").stop().fadeIn(0).css("left", pointX).css("top", _trOffset).delay(2000).fadeOut(200);
						$(".noti_layer a").html(uiCtrl.getLang("cert_expire_message"));
						$("body").one("mouseup", function(e){
							$(".noti_layer").hide();
						});
					}
					break;
				} else if(cert.recid == _idx && cert.expire_status == 'BEFOREEXPIREMONTH'){
					if(!KSBizConfig.disableExpireWarn){
						$(".noti_layer").stop().fadeIn(0).css("left", pointX).css("top",  _trOffset).delay(2000).fadeOut(200);
						var msg = uiCtrl.getLang("cert_expire_warning_message").replace("%s", cert.after_date);
						$(".noti_layer a").html(msg);
						$("body").one("mouseup", function(e){
							$(".noti_layer").hide();
						});
					}
					break;
				} else {
					$(".noti_layer").hide();
				}
			}

			// yessign browser cert btn disable
			if(selectCert.storage == CXCONST.STORAGE.BROWSER){
				if((selectCert.type == "1.2.410.200005.1.1.1" && typeof selectCert.subjectDN != "undefined" && selectCert.subjectDN.toLowerCase().indexOf("personalb") > -1) || 
				(selectCert.type == "1.2.410.200005.1.1.5" && typeof selectCert.subjectDN != "undefined" && selectCert.subjectDN.toLowerCase().indexOf("corporation4ecb") > -1)){
				$("#copy").addClass("disable");
				$("#export").addClass("disable");
				} else {
					$("#copy").removeClass("disable");
					$("#export").removeClass("disable");
				}
			}
		});
		w2ui.grid.on('sort', function(event) {
			setTimeout( function(){
				if($("#grid_grid_data_0_0").attr('col') == "0"){
					ui.checkAuthImg()
				}
				if($("#grid_grid_records")){
					$("#grid_grid_records").scroll(function(event) {
						if($("#grid_grid_data_0_0").attr('col') == "0"){
							ui.checkAuthImg();
							$("#grid td").css("background-position-y", 0);
							$("#grid .w2ui-selected td").eq(2).css("background-position-y", -25);
						}
					});
				}
				$("#grid td").css("background-position-y", 0);
				$("#grid .w2ui-selected td").eq(2).css("background-position-y", -25);
			}, 1);
		});
		w2ui.grid.on('select', function(event) {
			setTimeout( function() {
				$("#grid td").css("background-position-y", 0);
				$("#grid .w2ui-selected td").eq(2).css("background-position-y", -25);
			}, 10);
		});
		w2ui.grid.on('unselect', function(event){
			var _idx = event.recid;
			var _tr = "";
			if(_idx){
				_tr = $("tr[recid=" + _idx +"]");
				if(_tr.hasClass("w2ui-record-hover")){
					setTimeout( function() {
						_tr.addClass("w2ui-selected");
					}, 10);
				}
			}
		});
	},
	initDraggable : function(){
		if(cxCtrl.isSignPage() || cxCtrl.isManageCertPage() || cxCtrl.isExportCertPage()){
			var containerDiv = $("#container");
			var dragInfoDiv = $(".drag_info");
			var dragAreaDiv = $(".drag_area");
			window["dragEventChk"] = -1;
			window["dragEvent"] = null;

			$(document).not($("#container")).on("dragenter", function(e){
				e.stopPropagation();
				e.preventDefault();
				dragEventChk = -1;
				dragAreaDiv.hide();
				dragInfoDiv.hide();
			});
			$(document).not($("#container")).on("dragover", function(e){
				e.stopPropagation();
				e.preventDefault();
				dragEventChk = -1;
				dragAreaDiv.hide();
				dragInfoDiv.hide();
			});
			$(document).not($("#container")).on("drop", function(e){
				dragEventChk = -1;
				e.stopPropagation();
				e.preventDefault();
			});
			$(containerDiv).on("dragenter", function(e){
				e.stopPropagation();
				e.preventDefault();
				dragAreaDiv.show();
				dragInfoDiv.show();
			});
			$(containerDiv).on("dragover", function(e){
				e.stopPropagation();
				e.preventDefault();
				dragAreaDiv.show();
				dragInfoDiv.show();
				dragEventChk++;
				try{
					clearTimeout(dragEvent);
				} catch(e){}
				dragEvent = setTimeout(function(){
					if(dragEventChk > -1){
						dragAreaDiv.hide();
						dragInfoDiv.hide();
					}
				}, 150);
			});
			$(containerDiv).on("drop", function(e){
				e.preventDefault();
				dragAreaDiv.hide();
				dragInfoDiv.hide();
				var files = e.originalEvent.dataTransfer.files;
				if(cxCtrl.isSignPage()){
					ui.makeb64data(files, ui.importSign);
				} else if(cxCtrl.isManageCertPage() || cxCtrl.isExportCertPage()){
					ui.makeb64data(files, ui.certImport);
				}
			});
		}
	},
	focus : function(){
		var focusLoop = function(startObj, endObj){
			startObj.on("keydown", function(e){
				if(e.which ==  9){
					if(e.shiftKey){
						e = e || window.event;
						if (e.preventDefault) {
							e.preventDefault();
						} else {
							e.returnValue = false;
						}
						$(this).blur();
						setTimeout(function(){
							endObj.focus();
						}, 5);
					}
				}
			});
			endObj.on("keydown", function(e){
				if(e.which == 9){
					if(!e.shiftKey){
						e = e || window.event;
						if (e.preventDefault) {
							e.preventDefault();
						} else {
							e.returnValue = false;
						}
						$(this).blur();
						setTimeout(function(){
							startObj.focus();
						}, 5);
					}
				}
			});
		}
		if(cxCtrl.isSignPage() || cxCtrl.isUpdateCertPage()){
			var currStorage = cxCtrl.getCurrentStorage();
			$("#" + currStorage).find("a").eq(0).addClass("start_focus");
			$(".password_area .btn_area .btn_wht2").addClass("end_focus");
			if(KSBizConfig.initStorage != "undefined" && cxsign.currentStorage == "browser" && KSBizConfig.initStorage == "disk" && $("#disk").hasClass("clicked")){
				$("#disk").find("a").eq(0).focus();
			} else {
				$("#" + currStorage).find("a").eq(0).focus();
			}
		} else if(cxCtrl.isManageCertPage()) {
			var currStorage = cxCtrl.getCurrentStorage();
			$("#" + currStorage).find("a").eq(0).addClass("start_focus");
			$(".manage_area .btn_area .btn_wht2").addClass("end_focus");
			$(".manage_area .btn_area .btn_wht2").focus();
		} else if(cxCtrl.isIssueCertPage()){
			$("#cmp_disk").find("a").eq(0).addClass("start_focus");
			$(".enter_area #issuepwd").addClass("start_focus");
			$(".pin_area #issuepinpwd").addClass("start_focus");
			$(".issue_area .btn_area .btn_wht2").addClass("end_focus");
			$(".storage_area .btn_area .btn_org").focus();	
		} else if(cxCtrl.isExportCertPage()){
			$(".btn_close").addClass("start_focus");
			$(".btn_area .btn_wht2").addClass("end_focus");
			$(".btn_area .btn_org").focus();
		} else if(cxCtrl.isImportCertPage()){	
			$("#browserCertCheck_area_data1").addClass("start_focus");
			$(".browserCertCheck_area .btn_area .btn_wht2").addClass("end_focus");
			$(".browserCertCheck_area .btn_area .btn_org").focus();
		}

		focusLoop($(".start_focus"), $(".end_focus"));
		// popupTabEvent;
		focusLoop($(".pop_start_focus"), $(".pop_end_focus"));
	},
	mobileChk : function(storage, d, callback){
		if(d.installed == "FALSE"){
			var installMsg = "";
			var returnClose = function(){
				uiCtrl.errorClose({
					status : uiCtrl.getOldErrorCode("INSTALLCLOSE"),
					message : ""
				});
			}
			if(storage == CXCONST.STORAGE.USIM){
				installMsg = uiCtrl.getLang("usim_driver_install_after_close_confirm");
			} else if(storage == CXCONST.STORAGE.HSM){
				installMsg = uiCtrl.getLang("hsm_driver_install_after_close_confirm");
			} else if(storage == CXCONST.STORAGE.PHONE){
				installMsg = uiCtrl.getLang("phone_install_after_close_confirm");
			}
			ui.confirm(installMsg, function(){
				if(TOUCHENEX_UTIL.isWin()){
					clientCtrl.downLocalLinkURL(d.downloadurl, function(result){
						returnClose();
					});
				} else {
					if(d.downloadurl.endsWith(".exe")){
						parent.location.href = d.downloadurl;
						returnClose();
					} else {
						var moduleWin = window.open("about:blank", "pop_drive_install", "directories=no,location=no,menubar=no,titlebar=no,status=no,resizable=yes,width=560px,height=420px");
						if(moduleWin == null){
							ui.alert(uiCtrl.getLang("check_popup_block"));
						} else {
							moduleWin.location.href = d.downloadurl;
							returnClose();
						}
					}
				}
			}, function(){
				if($(".pop_alert").css("display") == "none"){
					if(cxCtrl.chkBrowserStorage()){
						$("#" + CXCONST.STORAGE.LOCAL_DISK).storageClick(CXCONST.STORAGE.LOCAL_DISK);
					} else {
						$("#" + CXCONST.STORAGE.BROWSER).storageClick(CXCONST.STORAGE.BROWSER);
					}
				}
			});
		} else if(d.verify == "FALSE"){
			ui.confirm(uiCtrl.getLang("hsm_verify_fail"), function(){
				callback(storage, d.drive);
			}, function(){
				if($(".pop_alert").css("display") == "none"){
					if(cxCtrl.chkBrowserStorage()){
						$("#" + CXCONST.STORAGE.LOCAL_DISK).storageClick(CXCONST.STORAGE.LOCAL_DISK);
					} else {
						$("#" + CXCONST.STORAGE.BROWSER).storageClick(CXCONST.STORAGE.BROWSER);
					}
				}
			});
		} else {
			callback(storage, d.drive);
		}
	},
	popPwdInput : function(isSave, callback){
		$(".pop_pw .btn_org").off("click").on("click", function(e){
			e.stopPropagation();
			e.preventDefault();
			if($("#pop_cert").val() == ""){
				ui.alert(uiCtrl.getLang("require_password"));
			} else {
				secureKeyCtrl.encPwdEcrypt({"form":"popCertFrm","encFields":["pop_cert"]}, function(enc){
					kslog("uiAction.sign.enc", enc);
					if(enc && enc.encParams.length > 0){
						ui.hiddenAndShow(true);
						$(".pop_pw").hide();
						var savechecked = isSave;
						if(isSave){
							savechecked = $("#save_sign").prop("checked");
						}
						if(callback) setTimeout(callback(savechecked, enc.encParams[0]), 10);
					} else {
						$("#popCertFrm")[0].reset();
						ui.alert(uiCtrl.getLang("secure_keyboard_encrypt_error"));
					}
				});
			}
		});
		$(".pop_pw .btn_wht2").off("click").on("click", function(e){
			e.stopPropagation();
			e.preventDefault();
			ui.hiddenAndShow(false);
			$(".modal_bg").hide();
			$(".pop_pw").hide();
		});
		$("#popCertFrm")[0].reset();
		secureKeyCtrl.initKeypadForm($("#popCertFrm"));
		$(".chk_save").hide();
		var savechk = KSBizConfig.checkedtoSaveInBrowser?KSBizConfig.checkedtoSaveInBrowser:false;
		$("#save_sign").prop("checked", savechk);
		ui.hiddenAndShow(false);
		if(isSave){
			$(".chk_save").show();
		}
		$(".pop_pw").show();
		$(".pop_pw .btn_org").focus();
	},
	popPwdDeviceInput : function(callback){
		$(".pop_pw_device .btn_org").off("click").on("click", function(e){
			e.stopPropagation();
			e.preventDefault();
			if($("#pop_cert_device").val() == ""){
				ui.alert(uiCtrl.getLang("require_password"));
				$("#popCertDeviceFrm")[0].reset();
				return;
			}
			var storage = cxCtrl.getCurrentCert().storage;
			var drive = cxCtrl.getCurrentCert().drive;
			if(storage == CXCONST.STORAGE.USIM || ((storage == CXCONST.STORAGE.HSM || storage == CXCONST.STORAGE.PHONE) && drive && drive == "Mobile_USIMsmartCERT")){
				if($("#pop_cert_device").val().length != 8){
					ui.alert(uiCtrl.getLang("input_usim_password_fail"));
					$("#popCertDeviceFrm")[0].reset();
					return;
				}
			}
			secureKeyCtrl.encPwdEcrypt({"form":"popCertDeviceFrm","encFields":["pop_cert_device"]}, function(enc){
				kslog("uiAction.sign.enc", enc);
				if(enc && enc.encParams.length > 0){
					ui.hiddenAndShow(true);
					$(".pop_pw_device").hide();
					if(callback) setTimeout(callback(enc.encParams[0]), 10);
				} else {
					$("#popCertDeviceFrm")[0].reset();
					ui.alert(uiCtrl.getLang("secure_keyboard_encrypt_error"));
				}
			});
		});
		$(".pop_pw_device .btn_wht2").off("click").on("click", function(e){
			e.stopPropagation();
			e.preventDefault();
			ui.hiddenAndShow(false);
			$(".modal_bg").hide();
			$(".pop_pw_device").hide();
		});
		$("#popCertDeviceFrm")[0].reset();
		secureKeyCtrl.initKeypadForm($("#popCertDeviceFrm"));
		ui.hiddenAndShow(false);
		$(".pop_pw_device").show();
		$(".pop_pw_device .btn_org").focus();
	},
	popPwdChange : function(callback){
		$(".pop_change .btn_org").off("click").on("click", function(e){
			e.stopPropagation();
			e.preventDefault();
			if($("#pop_change_old").val() == ""){
				ui.alert(uiCtrl.getLang("input_cert_password"));
				return;
			}
			if($("#pop_change_new").val() == ""){
				ui.alert(uiCtrl.getLang("new_password_input"));
				return;
			}
			if($("#pop_change_new_more").val() == ""){
				ui.alert(uiCtrl.getLang("confirm_new_password_input"));
				return;
			}
			if($("#pop_change_new").val().length < KSBizConfig.certPwdDefaultRule.length){
				ui.alert(uiCtrl.getLang("short_new_password"));
				$("#popChangeFrm")[0].reset();
				return;
			}

			secureKeyCtrl.encPwdEcrypt({"form":"popChangeFrm","encFields":["pop_change_old", "pop_change_new", "pop_change_new_more"]}, function(enc){
				if(enc && enc.encParams.length == 3){
					var encStr = {pop_change_old:{}, pop_change_new:{}, pop_change_new_more:{}};
					var normalDec = function(str) {return str;}

					for(var i = 0; i < enc.encParams.length; i++){
						var tmpParam = enc.encParams[i];
						if(tmpParam.name == "pop_change_old") {
							encStr.pop_change_old.type = tmpParam.type;
							encStr.pop_change_old.enc = tmpParam.enc;
							if(tmpParam.type == "transkey" || tmpParam.type == "securekey"){
								encStr.pop_change_old.decFunc = function(req){return decode64(transkey_GetDecnxBiz(req))};
							} else if(tmpParam.type == "nos" || tmpParam.type == "nosk"){
								encStr.pop_change_old.decFunc = function(req){return decode64(nos_GetDeK(req))};
							} else {
								encStr.pop_change_old.decFunc = normalDec;	
							}
						}
						if(tmpParam.name == "pop_change_new") {
							encStr.pop_change_new.type = tmpParam.type;
							encStr.pop_change_new.enc = tmpParam.enc;
							if(tmpParam.type == "transkey" || tmpParam.type == "securekey"){
								encStr.pop_change_new.decFunc = function(req){return decode64(transkey_GetDecnxBiz(req))};
							} else if(tmpParam.type == "nos" || tmpParam.type == "nosk"){
								encStr.pop_change_new.decFunc = function(req){return decode64(nos_GetDeK(req))};
							} else {
								encStr.pop_change_new.decFunc = normalDec;	
							}
						}
						if(tmpParam.name == "pop_change_new_more") {
							encStr.pop_change_new_more.type = tmpParam.type;
							encStr.pop_change_new_more.enc = tmpParam.enc;
							if(tmpParam.type == "transkey" || tmpParam.type == "securekey"){
								encStr.pop_change_new_more.decFunc = function(req){return decode64(transkey_GetDecnxBiz(req))};
							} else if(tmpParam.type == "nos" || tmpParam.type == "nosk"){
								encStr.pop_change_new_more.decFunc = function(req){return decode64(nos_GetDeK(req))};
							} else {
								encStr.pop_change_new_more.decFunc = normalDec;	
							}
						}
					}
					if(encStr.pop_change_old.decFunc(encStr.pop_change_old.enc) == encStr.pop_change_new.decFunc(encStr.pop_change_new.enc)){
						ui.alert(uiCtrl.getLang("new_and_old_password_is_same"));
						$("#popChangeFrm")[0].reset();
						return;
					}
					if(encStr.pop_change_new.decFunc(encStr.pop_change_new.enc) != encStr.pop_change_new_more.decFunc(encStr.pop_change_new_more.enc)){
						ui.alert(uiCtrl.getLang("mismatch_new_password"));
						$("#popChangeFrm")[0].reset();
						return;
					}

					var chkFunc = null;
					var chkRule = KSBizConfig.certPwdDefaultRule;
					var chkResult = "";
					if(encStr.pop_change_new.type == "text"){
						chkFunc = cxUtil.checkCorrectNormal;
						chkResult = chkFunc(encStr.pop_change_new.enc, chkRule);
					} else if(encStr.pop_change_new.type == "transkey" || encStr.pop_change_new.type == "securekey"){
						chkFunc = cxUtil.checkCorrectUPW;
						chkResult = chkFunc("raon", encStr.pop_change_new.enc, chkRule);
					} else if(encStr.pop_change_new.type == "nosk" || encStr.pop_change_new.type == "nos"){
						chkFunc = cxUtil.checkCorrectUPW;
						chkResult = chkFunc("inca", encStr.pop_change_new.enc, chkRule);
					}
					if(chkResult != "success"){
						if(Array.isArray(chkResult)){
							var chkStr = chkResult.toString();
							if(chkRule.badchar && chkStr.indexOf("badchar") > -1){	// 금지 특수문자가 있는경우
								ui.alert(uiCtrl.getLang("invalid_password_bad_special_v2"));
								$("#popChangeFrm")[0].reset();
								return;
							}
							if(chkStr.indexOf("alphabet") > -1 && chkStr.indexOf("spchar") > -1){
								ui.alert(uiCtrl.getLang("invalid_password_not_only_number"));
								$("#popChangeFrm")[0].reset();
								return;
							}
							if(chkStr.indexOf("number") > -1 && chkStr.indexOf("spchar") > -1){
								ui.alert(uiCtrl.getLang("invalid_password_not_only_alpha"));
								$("#popChangeFrm")[0].reset();
								return;
							}
							if(chkStr.indexOf("alphabet") > -1 && chkStr.indexOf("number") > -1){
								ui.alert(uiCtrl.getLang("invalid_password_not_only_special"));
								$("#popChangeFrm")[0].reset();
								return;
							}
						}
					}
					ui.hiddenAndShow(true);
					$(".modal_bg").hide();
					$(".pop_change").hide();
					if(callback) setTimeout(callback(enc.encParams), 5);

				} else {
					$("#popChangeFrm")[0].reset();
					ui.alert(uiCtrl.getLang("secure_keyboard_encrypt_error"));
				}
			});
		});
		$(".pop_change .btn_wht2").off("click").on("click", function(e){
			e.stopPropagation();
			e.preventDefault();
			ui.hiddenAndShow(false);
			$(".modal_bg").hide();
			$(".pop_change").hide();
		});
		$("#popChangeFrm")[0].reset();
		secureKeyCtrl.initKeypadForm($("#popChangeFrm"));
		ui.hiddenAndShow(false);
		$(".pop_change").show();
		$(".pop_change .btn_org").focus();
	},
	popSelectDrive : function(callback){
		$(".pop_copy .btn_org").off("click").on("click", function(e){
			e.stopPropagation();
			e.preventDefault();

			var currDrive = cxCtrl.getSelectDrive();
			if(currDrive && Object.keys(currDrive).length == 0){
				ui.alert(uiCtrl.getLang("select_certstore_msg"));
				return;
			}

			ui.hiddenAndShow(true);
			$(".modal_bg").hide();
			$(".pop_copy").hide();
			if(callback) callback(cxCtrl.getSelectDrive());
		});
		$(".pop_copy .btn_wht2").off("click").on("click", function(e){
			e.stopPropagation();
			e.preventDefault();
			ui.hiddenAndShow(false);
			$(".choice_box").css("display","none")
			$(".modal_bg").hide();
			$(".pop_copy").hide();
		});
		// 부모창에 disable 가져오기
		$(".storage_area .storage_lst li").each(function(i){
			try {
				var currId = $(this).attr("id");
				if($(this).hasClass("disable")){
					if($("#copy_" + currId).length > 0){
						$("#copy_" + currId).removeClass("on").addClass("disable");
					}
				} else {
					if($("#copy_" + currId).length > 0){
						$("#copy_" + currId).removeClass("on").removeClass("disable");
					}
				}
			} catch(e){}
		});
		$(".storage_area .storage_more li").each(function(i){
			try {
				var currId = $(this).attr("id");
				if($(this).hasClass("disable")){
					if($("#copy_" + currId).length > 0){
						$("#copy_" + currId).removeClass("on").addClass("disable");
					}
				} else {
					if($("#copy_" + currId).length > 0){
						$("#copy_" + currId).removeClass("on").removeClass("disable");
					}
				}
			} catch(e){}
		});
		// current storage disabled
		var storage = cxCtrl.getCurrentStorage();
		var cert = cxCtrl.getCurrentCert(); 
		
		if(storage == CXCONST.STORAGE.BROWSER){
			var browserStorageNonDisable = function(certDetail){
				if(!KSBizConfig.yessignOpenCertInfo.cloud || !KSBizConfig.yessignOpenCertUse){
					$("#copy_" + storage).addClass("disable");
				} else{
					if(certDetail.source == "BOTH"){
						$("#copy_" + storage).addClass("disable");
					}
				}
				// selectDrive init
				cxCtrl.setSelectDrive();
				$(".pop_copy .storage_lst li").removeClass("clicked").removeClass("on");
				ui.hiddenAndShow(false);
				$(".pop_copy").show();
				$(".pop_copy .btn_org").focus();
			}
			browserCtrl.certDiskInfo(cert, browserStorageNonDisable);
		} else{
			if(storage == CXCONST.STORAGE.BROWSER || storage == CXCONST.STORAGE.LOCAL_DISK){
				$("#copy_" + storage).addClass("disable");
			}
			// selectDrive init
			cxCtrl.setSelectDrive();
			$(".pop_copy .storage_lst li").removeClass("clicked").removeClass("on");
			ui.hiddenAndShow(false);
			$(".pop_copy").show();
			$(".pop_copy .btn_org").focus();
		}
	},
	clickToggle : function(keyBtn){
		var obj;
		var kbdOnImg = "./images/ico/ico_keyboard_on.png";
		var kbdOffImg = "./images/ico/ico_keyboard_off.png";
		var kbdOvImg = "./images/ico/ico_keyboard_ov.png";
		
		if (keyBtn.type == "text" || keyBtn.type == "password") {
			obj = event;
		} else {
			keyBtn = keyBtn ? keyBtn : window.event;
			obj = keyBtn.target ? keyBtn.target : keyBtn.srcElement;
		}
		var id = keyBtn.id.substring(0, keyBtn.id.length - 7);
		var isChecked = keyBtn.src.substring(keyBtn.src.length - 'ico_keyboard_ov.png'.length) == 'ico_keyboard_ov.png';
		if(!isChecked) isChecked = keyBtn.src.substring(keyBtn.src.length - 'ico_keyboard_off.png'.length) == 'ico_keyboard_off.png';
		keyBtn.src = isChecked ? kbdOnImg : kbdOffImg;
		
		if(isChecked){
			transkey[id].useTranskey = true;
			transkey[id].inputObj.readOnly = true;
			tk.onKeyboard(transkey[id].inputObj);
		}else{
			transkey[id].clear();
			transkey[id].useTranskey = false;
			transkey[id].inputObj.readOnly = false;
			if(KSBizConfig.forceScreenKeyboard){
				transkey[id].inputObj.readOnly = true;
			} else {
				transkey[id].inputObj.readOnly = false;
			}
			if(tk.now!=null)
				tk.close();
		}
	},
    checkAuthImg : function(){
		var certList = cxCtrl.getCertGrid();
    	$("#grid tr").each(function(){
    		var _id = $(this).attr("recid");
    		if( _id ){
				var _obj = certList[_id-1];
				//cloud 아이콘 설정 이미지 교체 하기
				if(_obj.cloud && _obj.source == "OPENCERT"){
					if( _obj.expire_status == "EXPIRE") {
						$(this).find("td").eq(1).addClass('cloud_auth2').css("padding-left", 15);
					} else if( _obj.expire_status == "BEFOREEXPIREMONTH") {
						$(this).find("td").eq(1).addClass('cloud_auth1').css("padding-left", 15);
					} else {
						$(this).find("td").eq(1).addClass('cloud_auth3').css("padding-left", 15);
					}
				} else{
					if( _obj.expire_status == "EXPIRE") {
						$(this).find("td").eq(1).addClass('auth2').css("padding-left", 15);
					} else if( _obj.expire_status == "BEFOREEXPIREMONTH") {
						$(this).find("td").eq(1).addClass('auth1').css("padding-left", 15);
					} else {
						$(this).find("td").eq(1).addClass('auth3').css("padding-left", 15);
					}
				}

    		}
		});
    },
	storageClick: function(storage){
		if(storage){
			$("#" + storage).storageClick(storage);
		} else {
			ui.alert(uiCtrl.getLang("select_certstore_msg"));
		}
	},
	storageVitalize: function(){
		//storeList = BROWSER|LOCAL_DISK|REMOVABLE_DISK|USIM|HSM|PHONE
		if(!cxCtrl.isExportCertPage()){
			var storeList = KSBizConfig.certStoreFilter.toUpperCase();
		} else{
			var storeList = "BROWSER";
		}
		var storePrepareList = KSBizConfig.prepareCertStore.toUpperCase();
		//storePrepareList 가 있는 경우 돌아가는 chkReadyImg!
		chkReadyImg = function(obj, storage){
			if(storePrepareList.indexOf(storage) > -1){
				var imgsrc = obj.find(".bg_box .dis img").eq(0).attr("src");
				imgsrc = imgsrc.replace("_dis", "_ready");
				obj.find(".bg_box .dis img").eq(0).attr("src", imgsrc);
			}
		}
		if(cxCtrl.isSignPage() || cxCtrl.isManageCertPage() || cxCtrl.isUpdateCertPage()|| cxCtrl.isExportCertPage()){
			$(".storage_lst li").each(function(i){
				var storage = "";
				try {
					storage = cxCtrl.getStorageConfigName(i);
					$(this).attr("id", cxCtrl.getStorageDiskName(i));
					if(cxCtrl.isSignPage()){
						if(storeList.indexOf(storage) > -1 && storePrepareList.indexOf(storage) < 0){
							$(this).removeClass("disable");
						}
					} else if(cxCtrl.isManageCertPage()){
						if(cxCtrl.getStorageDisable("manage").indexOf(storage) < 0){
							if((i != 0 || !cxCtrl.chkBrowserStorage()) && storePrepareList.indexOf(storage) < 0){
								$(this).removeClass("disable");
							}
						}
					} else if(cxCtrl.isUpdateCertPage()){
						if(cxCtrl.getStorageDisable("issue").indexOf(storage) < 0){
							if((i != 0 || !cxCtrl.chkBrowserStorage()) && storePrepareList.indexOf(storage) < 0){
								$(this).removeClass("disable");
							}
						}
					}else if(cxCtrl.isExportCertPage()){
						if(storeList == storage){
							$(this).removeClass("disable");
						}
					}
					chkReadyImg($(this), storage);
					if(i == 0){
						if($(this).hasClass("disable")){
							cxCtrl.setCurrentStorage("disk");
						}
					}
				} catch(e){}
				// more
				if(i == 4){
					$(this).removeClass("disable");
					$(this).attr("id", "more");
				}
			});

			$(".storage_more li").each(function(i){
				var storage = "";
				try {
					storage = cxCtrl.getStorageConfigMoreName(i);
					$(this).attr("id", cxCtrl.getStorageDiskMoreName(i));
					if(cxCtrl.isSignPage()){
						if((storeList.indexOf(storage) > -1) && storePrepareList.indexOf(storage) < 0){
							$(this).removeClass("disable");
						}
					} else if(cxCtrl.isManageCertPage()){
						if((cxCtrl.getStorageDisable("manage").indexOf(storage) < 0) && storePrepareList.indexOf(storage) < 0){
							$(this).removeClass("disable");
						}
					} else if(cxCtrl.isUpdateCertPage()){
						if((cxCtrl.getStorageDisable("issue").indexOf(storage) < 0) && storePrepareList.indexOf(storage) < 0){
							$(this).removeClass("disable");
						}
					}
					chkReadyImg($(this), storage);
				} catch(e){}
			});
		}
		// 인증서 복사 스토리지
		if(cxCtrl.isManageCertPage()){
			$(".pop_copy .storage_lst li").each(function(i){
				var storage = "";
				try {
					storage = cxCtrl.getCopyStorageConfigName(i);
					$(this).attr("id", "copy_" + cxCtrl.getCopyStorageDiskName(i));
					if((storeList.indexOf(storage) > -1) && storePrepareList.indexOf(storage) < 0){
						$(this).removeClass("disable");
					}
					chkReadyImg($(this), storage);
				} catch(e){}
			});
		}
		// 인증서 발급 스토리지
		if(cxCtrl.isIssueCertPage()){
			$(".issue_area .storage_lst li").each(function(i){
				var storage = "";
				try {
					storage = cxCtrl.getCmpStorageConfigName(i);
					$(this).attr("id", "cmp_" + cxCtrl.getCmpStorageDiskName(i));
					if(storeList.indexOf(storage) > -1 
						&& cxCtrl.getStorageDisable("issue").indexOf(storage) < 0
						&& storePrepareList.indexOf(storage) < 0){
							$(this).removeClass("disable");
					}
					chkReadyImg($(this), storage);
				} catch(e){}
			});
		}
	},
	storageAddEvent: function(){
		if(!cxCtrl.isExportCertPage()){
			var storePrepareList = KSBizConfig.prepareCertStore.toUpperCase();
		}else{
			var storePrepareList = "BROWSER";
		}
		if(cxCtrl.isSignPage() || cxCtrl.isManageCertPage() || cxCtrl.isUpdateCertPage() || cxCtrl.isExportCertPage()){
			$(".storage_lst li a").each(function(i){
				$(this).off("click").on("click", function(evt){
					var storageObj = $(this).parent();
					// init..
					$(".choice_box").hide();
					$(".choice_box").html("");
					// storePrepareList, disable 처리
					if(i !== 4){
						if(cxCtrl.isSignPage()){
							if(storePrepareList.indexOf(cxCtrl.getStorageConfigName(i)) > -1){
								// if(i == 0 && cxCtrl.getBrowserDisabled()){
								// 	ui.alert(uiCtrl.getLang("not_support_browser"));
								// 	return;
								// } else {
								// 	ui.alert(uiCtrl.getLang("ready"));
								// 	return;
								// }
								return;
							}
						}
						if(storageObj.hasClass("disable")) return;
						$(this).storageClick(storageObj.attr("id"), evt);
					} else {
						// moreㅊㅇ ..
						setTimeout(function(){
							$(".more_storage_box").show();
						}, 50);
					}
				});
			});
			$(".storage_more li a").each(function(i){
				var storageObj = $(this).parent();
				$(this).off("click").on("click", function(evt){
					evt.stopPropagation();
					evt.preventDefault();
					// init..
					$(".choice_box").hide();
					$(".choice_box").html("");
					// storePrepareList, disable 처리
					if(cxCtrl.isSignPage()){
						if(storePrepareList.indexOf(cxCtrl.getStorageConfigMoreName(i)) > -1){
							// ui.alert(uiCtrl.getLang("ready"));
							return;
						}
					}
					if(storageObj.hasClass("disable")) return;
					$(this).storageClick(storageObj.attr("id"), evt);
				});
			});
		}
		// 인증서 복사 스토리지
		if(cxCtrl.isManageCertPage()){
			$(".pop_copy .storage_lst li a").each(function(i){
				$(this).off("click").on("click", function(evt){
					var storageObj = $(this).parent();
					// init..
					$(".choice_box").hide();
					$(".choice_box").html("");
					if(storageObj.hasClass("disable")) return;
					$(this).popStorageClick(storageObj.attr("id"), evt);
				});
			});
		}
		// 인증서 발급 스토리지
		if(cxCtrl.isIssueCertPage()){
			$(".issue_area .storage_lst li a").each(function(i){
				$(this).off("click").on("click", function(evt){
					var storageObj = $(this).parent();
					// init..
					$(".choice_box").hide();
					$(".choice_box").html("");
					if(storageObj.hasClass("disable")) return;
					$(this).popStorageClick(storageObj.attr("id"), evt);
				});
			});
		}
	},
	certActionAddEvent: function(){
		$(".btn_set .btn_wht").each(function(i){
			if(cxCtrl.isSignPage() || cxCtrl.isUpdateCertPage()){
				$(this).attr("id", cxCtrl.getCertActionBtn("sign",i));
			} else if(cxCtrl.isManageCertPage()){
				$(this).attr("id", cxCtrl.getCertActionBtn("manage",i-3));
			} else if(cxCtrl.isExportCertPage()){
				$(this).attr("id", cxCtrl.getCertActionBtn("browserExport",i));
			}
			$(this).off("click").on("click", function(e){
				e.stopPropagation();
				e.preventDefault();
				var funcName = "";
				if(cxCtrl.isSignPage() || cxCtrl.isUpdateCertPage()){
					funcName = cxCtrl.getCertBtnFunc("sign", i);
				} else if(cxCtrl.isManageCertPage()){
					funcName = cxCtrl.getCertBtnFunc("manage", i-3);
				} else if(cxCtrl.isExportCertPage()){
					funcName = cxCtrl.getCertBtnFunc("browserExport", i);
				}
				$(this)[funcName]();
			});
		});
	},
	makeb64data : function(files, callback){
		var maxSize = 100 * 1024;
		var fileSizeExceeded = 0;
		if(files.length == 0){
			ui.alert(uiCtrl.getLang("select_cert_file"));
		} else if(files.length == 1){
			// 확장자 체크
			if(files[0].name.toLowerCase().endsWith(".pfx") || files[0].name.toLowerCase().endsWith(".p12")){
				//file size check
				if(files[0].size > maxSize){
					ui.alert(uiCtrl.getLang("check_cert_file"));
				} else {
					cxUtil.dragsFileToBuffer(files[0], function(buf){
						var bufB64 = cxUtil.Uint8ToBase64(buf);
						callback({"type": "p12", "b64data": bufB64});
					});
				}
			} else {
				ui.alert(uiCtrl.getLang("check_cert_file"));
			}
		} else if(files.length == 2){
			var signChkder = false;
			var signChkkey = false;
			var sigChkder = false;
			var sigChkkey = false;
			var fileDer = {};
			var fileKey = {};
			for (var i = 0; i < files.length; i++) {
				var f = files[i];
				//file size check
				if(f.size > maxSize){
					fileSizeExceeded++;
				} else {
					if(f.name.toLowerCase() == "signcert.der") {
						fileDer = f;
						signChkder = true;
					}
					if(f.name.toLowerCase() == "signpri.key") {
						fileKey = f;
						signChkkey = true;
					}
					if(f.name.toLowerCase().endsWith("_sig.cer")) {
						fileDer = f;
						sigChkder = true;
					}
					if( f.name.toLowerCase().endsWith("_sig.key")) {
						fileKey = f;
						sigChkkey = true;
					}
				}
			}
			if(fileSizeExceeded > 0){
				ui.alert(uiCtrl.getLang("check_cert_file"));
			} else { 
				if((signChkder && signChkkey) || (sigChkder && sigChkkey)){
					cxUtil.dragsFileToBuffer(fileDer, function(buf0){
						var derB64 = cxUtil.Uint8ToBase64(buf0);
						cxUtil.dragsFileToBuffer(fileKey, function(buf1){
							var keyB64 = cxUtil.Uint8ToBase64(buf1);
							callback({"type": "cert", "b64data": derB64 + "__BIZ__" + keyB64});
						});
					});
				} else {
					ui.alert(uiCtrl.getLang("check_cert_file"));
				}
			}
		} else if(files.length == 4){
			var gpki = {}, kmcert = {};
			for(var i = 0; i < files.length; i++){
				var f = files[i];
				//file size check
				if(f.size > maxSize){
					fileSizeExceeded++;
				} else {
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
			}
			if(fileSizeExceeded > 0){
				ui.alert(uiCtrl.getLang("check_cert_file"));
			} else {
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
										ui.alert(uiCtrl.getLang("check_cert_file"));
									}
								});
							});
						});
					});
				} else {
					ui.alert(uiCtrl.getLang("check_cert_file"));
				}
			}
		} else {
			ui.alert(uiCtrl.getLang("check_cert_file"));
		}
	},
	sign : function(){
		if(!cxCtrl.isCurrentCert()){
			ui.alert(uiCtrl.getLang("select_cert"));
			return;
		}
		var storage = cxCtrl.getCurrentCert().storage;
		var drive = cxCtrl.getCurrentCert().drive;
		if( $("#certpwd").val() == ""){
			var inputMsg = "";
			if(storage == CXCONST.STORAGE.USIM){
				inputMsg = uiCtrl.getLang("input_usim_password");
			} else if(storage == CXCONST.STORAGE.HSM){
				inputMsg = uiCtrl.getLang("input_hsm_password");
			} else {
				inputMsg = uiCtrl.getLang("input_cert_password");
			}
			ui.alert(inputMsg, function(){
				$("#certpwd").focus();
			});
			return;
		}
		// raon usim 길이체크
		if( (storage == CXCONST.STORAGE.USIM
			|| ((storage == CXCONST.STORAGE.HSM || storage == CXCONST.STORAGE.PHONE)
				&& drive && drive == "Mobile_USIMsmartCERT"))
			&& $("#certpwd").val().length != 8){
			inputMsg = uiCtrl.getLang("input_usim_password_fail");
			ui.alert(inputMsg, function(){
				$("#certpwd").focus();
			});
			return;
		}
		var signCallback = function(data){
			uiCtrl.callbackClose(data);
		};
		// signStorage run
		secureKeyCtrl.encPwdEcrypt({"form":"certFrm","encFields":["certpwd"]}, function(enc){
			kslog("uiAction.sign.enc", enc);
			if(enc && enc.encParams.length > 0){
				var storage = cxCtrl.getCurrentCert().storage;
				var drive = cxCtrl.getCurrentCert().drive;
				var cid = cxCtrl.getCurrentCert().cid;
				var pwdStr = enc.encParams[0].enc;
				var pwdType = enc.encParams[0].type;
				var plain = cxCtrl.getPlainText();
				var options = cxCtrl.getOptions();

				if(CXCONST.STORAGE.BROWSER == storage){
					browserCtrl.signStorage(storage, cid, pwdStr, pwdType, plain, options, signCallback);
				} else {
					clientCtrl.signStorage(storage, drive, cid, pwdStr, pwdType, plain, options, signCallback);
				}
			} else {
				ui.alert(uiCtrl.getLang("secure_keyboard_encrypt_error"));
				return;
			}
		});
	},
	signCert : function(certObj, pwdObj){
		var certType = certObj.type;
		var certData = certObj.b64data;
		var pwdStr = pwdObj.enc;
		var pwdType = pwdObj.type;
		var plain = cxCtrl.getPlainText();
		var options = cxCtrl.getOptions();
		var signCallback = function(data){
			uiCtrl.callbackClose(data);
		};

		KeySharpBiz.isInstall(false, function(check){
			if(check){
				clientCtrl.signCert(certType, certData, pwdStr, pwdType, plain, options, signCallback);
			} else {
				browserCtrl.signCert(certType, certData, pwdStr, pwdType, plain, options, signCallback);
			}
		});
	},
	importSign : function(certObj){
		var chkBrowserStorage = $(".storage_lst li").eq(0).hasClass("disable");
		if(certObj.certtype != "undefined" && certObj.certtype == "gpki"){
			chkBrowserStorage = true;
		}
		ui.popPwdInput(!chkBrowserStorage, function(isSave, encPwdObj){
			if(isSave){
				var certType = certObj.type;
				var certData = certObj.b64data;
				var pwdStr = encPwdObj.enc;
				var pwdType = encPwdObj.type;
				browserCtrl.importCert(certType, certData, pwdStr, pwdType, function(res, error){
					if(error){
						uiCtrl.errorAlert(error);
					}
					if(res){
						ui.signCert(certObj, encPwdObj);
					}
				});
			} else {
				ui.signCert(certObj, encPwdObj);
			}
		});
	},
	certImport : function(certObj){
		ui.popPwdInput(false, function(isSave, encPwdObj){
			var storage = cxCtrl.getCurrentStorage();
			var drive = cxCtrl.getCurrentDrive();
			var certType = certObj.type;
			var certData = certObj.b64data;
			var pwdStr = encPwdObj.enc;
			var pwdType = encPwdObj.type;
			var tpwdStr = "";
			var tpwdType = "";
			var options = {};

			// import callback
			var certImportCertCallback = function(res, error){
				if(error) uiCtrl.errorAlert(error);
				if(res){
					if(cxCtrl.isExportCertPage()){
						kslog("ui.certImport.certImportCertCallback.isExportCertPage.res", res);
						res.pwdStr = pwdStr;
						res.pwdType = pwdType;
						$(this).browserExportCert(res);
					} else{
						ui.message(uiCtrl.getLang("cert_import_completed"), function(){
							var storageObj = $("#" + storage);
							storageObj.getDiskList(storage, drive);
						});
					}
				}
			};
			if(storage == CXCONST.STORAGE.BROWSER){
				browserCtrl.importCert(certType, certData, pwdStr, pwdType, certImportCertCallback);
			} else {
				if(storage == CXCONST.STORAGE.HSM
					|| (KSBizConfig.usim.certSelector.toLowerCase() == "pc"
						&& (storage == CXCONST.STORAGE.USIM || (storage == CXCONST.STORAGE.PHONE && drive.toUpperCase() == "MOBILE_USIMSMARTCERT")))
					){
					ui.popPwdDeviceInput(function(encDevicePwdObj){
						tpwdStr = encDevicePwdObj.enc;
						tpwdType = encDevicePwdObj.type;
						clientCtrl.importCert(storage, drive, certType, certData, pwdStr, pwdType, tpwdStr, tpwdType, options, certImportCertCallback);
					});
				} else {
					clientCtrl.importCert(storage, drive, certType, certData, pwdStr, pwdType, tpwdStr, tpwdType, options, certImportCertCallback);
				}
			}
		});
	},
	issueSelectStorage : function(){
		var selectDrive = cxCtrl.getSelectDrive();
		if(selectDrive.storage && selectDrive.storage){
			if(typeof cxInvokeCommon.issueCopyInfo.copy == "undefined" || !cxInvokeCommon.issueCopyInfo.copy){	// 인증서 발급인 경우
				if(selectDrive.storage != CXCONST.STORAGE.HSM){
					$("#issueFrm")[0].reset();
					secureKeyCtrl.initKeypadForm($("#issueFrm"));
					$(".issue_area .storage_area").hide();
					$(".issue_area .enter_area").show();
				} else {
					$("#issuePinFrm")[0].reset();
					secureKeyCtrl.initKeypadForm($("#issuePinFrm"));
					$(".issue_area .storage_area").hide();
					$(".issue_area .pin_area").show();
				}
			} else {	// 인증서 추가 복사인 경우
				var options = {};
				var storage = cxsign.issueCopyInfo.storage;
				var drive = cxsign.issueCopyInfo.drive;
				var cid = cxsign.issueCopyInfo.cid;
				var prdt = cxsign.issueCopyInfo.prdt;
				var prdt_type = cxsign.issueCopyInfo.prdt_type;
				var certCopyCallback = function(response, error){
					cxsign.issueCopyInfo = {};
					if(error){
						uiCtrl.errorAlert(error);
					} else {
						ui.message(uiCtrl.getLang("request_cert_success"), function(){uiCtrl.callbackClose("OK")});
					}
				};
				var certExportCallback = function(certData){				
					var certType = "p12";
					if(selectDrive.storage == CXCONST.STORAGE.BROWSER){
						browserCtrl.importCert(certType, certData, prdt, prdt_type, certCopyCallback);
					} else {
						if((certData).indexOf("|") > -1){
							var data = certData.split("|");
							certData = data[0];
						}
						if(selectDrive.storage == CXCONST.STORAGE.HSM
							|| (KSBizConfig.usim.certSelector.toLowerCase() == "pc"
								&& (selectDrive.storage == CXCONST.STORAGE.USIM || (selectDrive.storage == CXCONST.STORAGE.PHONE && tDrive.toUpperCase() == "MOBILE_USIMSMARTCERT")))
							){
								cxsign.issueCopyInfo.certData = certData;
								cxsign.issueCopyInfo.certType = certType;
								$("#issuePinFrm")[0].reset();
								secureKeyCtrl.initKeypadForm($("#issuePinFrm"));
								// 핀번호 입력
								$(".issue_area .storage_area").hide();
								$(".issue_area .pin_area").show();
						} else {
							clientCtrl.importCert(selectDrive.storage, selectDrive.drive, certType, certData, prdt, prdt_type, prdt, prdt_type, options, certCopyCallback);
						}
					}
				};
				if(cxsign.isbrowser){
					// 브라우저 발급 받은경우
					browserCtrl.exportCert(cid, prdt, prdt_type, "base64", certExportCallback);
				} else{
					if(selectDrive.storage == CXCONST.STORAGE.HSM
						|| (KSBizConfig.usim.certSelector.toLowerCase() == "pc"
							&& (selectDrive.storage == CXCONST.STORAGE.USIM || ( selectDrive.storage == CXCONST.STORAGE.PHONE && selectDrive.drive.toUpperCase() == "MOBILE_USIMSMARTCERT")))
						){
						$("#issuePinFrm")[0].reset();
						secureKeyCtrl.initKeypadForm($("#issuePinFrm"));
						// 핀번호 입력
						$(".issue_area .storage_area").hide();
						$(".issue_area .pin_area").show();
					} else {
						if(selectDrive.storage == CXCONST.STORAGE.BROWSER){
							clientCtrl.exportCert(storage, drive, cid, prdt, prdt_type, "p12", certExportCallback);
						} else{
							clientCtrl.issueCopyCert(selectDrive.storage, selectDrive.drive);
						}
					}
				}
			}
		} else {
			ui.alert(uiCtrl.getLang("select_certstore_msg"));
		}
	},
	issueInputPassword : function(){
		//issueFrm issuepwd issuepwd_more
		if($("#issuepwd").val() == ""){
			ui.alert(uiCtrl.getLang("new_password_input"));
			return;
		}
		if($("#issuepwd").val().length < KSBizConfig.certPwdCMPRule.length){
			ui.alert(uiCtrl.getLang("short_new_password_v2"));
			$("#issueFrm")[0].reset();
			return;
		}
		secureKeyCtrl.encPwdEcrypt({"form":"issueFrm","encFields":["issuepwd", "issuepwd_more"]}, function(enc){
			if(enc && enc.encParams.length == 2){
				var encStr = {issuepwd:{}, issuepwd_more:{}};
				var normalDec = function(str) {return str;}
				for(var i = 0; i < enc.encParams.length; i++){
					var tmpParam = enc.encParams[i];
					if(tmpParam.name == "issuepwd") {
						encStr.issuepwd.type = tmpParam.type;
						encStr.issuepwd.enc = tmpParam.enc;
						if(tmpParam.type == "transkey" || tmpParam.type == "securekey"){
							encStr.issuepwd.decFunc = function(req){return decode64(transkey_GetDecnxBiz(req))};
						} else if(tmpParam.type == "nos" || tmpParam.type == "nosk"){
							encStr.issuepwd.decFunc = function(req){return decode64(nos_GetDeK(req))};
						} else {
							encStr.issuepwd.decFunc = normalDec;	
						}
					}
					if(tmpParam.name == "issuepwd_more") {
						encStr.issuepwd_more.type = tmpParam.type;
						encStr.issuepwd_more.enc = tmpParam.enc;
						if(tmpParam.type == "transkey" || tmpParam.type == "securekey"){
							encStr.issuepwd_more.decFunc = function(req){return decode64(transkey_GetDecnxBiz(req))};
						} else if(tmpParam.type == "nos" || tmpParam.type == "nosk"){
							encStr.issuepwd_more.decFunc = function(req){return decode64(nos_GetDeK(req))};
						} else {
							encStr.issuepwd_more.decFunc = normalDec;	
						}
					}
				}
				if(encStr.issuepwd.decFunc(encStr.issuepwd.enc) != encStr.issuepwd_more.decFunc(encStr.issuepwd_more.enc)){
					ui.alert(uiCtrl.getLang("mismatch_new_password"));
					$("#issueFrm")[0].reset();
					return;
				}
				var chkFunc = null;
				var chkRule = KSBizConfig.certPwdCMPRule;
				var chkResult = "";
				if(encStr.issuepwd.type == "text"){
					chkFunc = cxUtil.checkCorrectNormal;
					chkResult = chkFunc(encStr.issuepwd.enc, chkRule);
				} else if(encStr.issuepwd.type == "transkey" || encStr.issuepwd.type == "securekey"){
					chkFunc = cxUtil.checkCorrectUPW;
					chkResult = chkFunc("raon", encStr.issuepwd.enc, chkRule);
				} else if(encStr.issuepwd.type == "nos" || encStr.issuepwd.type == "nosk"){
					chkFunc = cxUtil.checkCorrectUPW;
					chkResult = chkFunc("inca", encStr.issuepwd.enc, chkRule);
				}
				
				if(chkResult != "success"){
					// if(Array.isArray(chkResult)){
						var chkStr = chkResult.toString();
						if(chkRule.badchar && chkStr.indexOf("badchar") > -1){	// 금지 특수문자가 있는경우
							ui.alert(uiCtrl.getLang("invalid_password_bad_special_v2"));
							$("#issueFrm")[0].reset();
							return;
						}
						if(chkStr.indexOf("alphabet") > -1 && chkStr.indexOf("spchar") > -1){
							ui.alert(uiCtrl.getLang("invalid_password_not_only_number_v2"));
							$("#issueFrm")[0].reset();
							return;
						}
						if(chkStr.indexOf("number") > -1 && chkStr.indexOf("spchar") > -1){
							ui.alert(uiCtrl.getLang("invalid_password_not_only_alpha_v2"));
							$("#issueFrm")[0].reset();
							return;
						}
						if(chkStr.indexOf("alphabet") > -1 && chkStr.indexOf("number") > -1){
							ui.alert(uiCtrl.getLang("invalid_password_not_only_special_v2"));
							$("#issueFrm")[0].reset();
							return;
						}
						if(chkStr != "badchar"){
							ui.alert(uiCtrl.getLang("invalid_password_policy_violated_v2"));
							$("#issueFrm")[0].reset();
							return;
						}
					// }
				}
				var data = cxCtrl.getPlainText();
				var prdt = encStr.issuepwd.enc;
				var prdt_type = encStr.issuepwd.type;
				var selectDrive = cxCtrl.getSelectDrive();
				//브라우저 인증서발급
				if(selectDrive.storage == "browser"){
					browserCtrl.requestDiskCertificate(data.ca, data.referenceValue, data.secretValue, prdt, prdt_type, uiCtrl.callbackClose)
				} else{
					clientCtrl.requestDiskCertificate(data.ca, data.host, data.port,
						data.referenceValue, data.secretValue,
						selectDrive.storage, selectDrive.drive,
						prdt, prdt_type,
						data.options, uiCtrl.callbackClose);
				}

			} else {
				$("#issueFrm")[0].reset();
				ui.alert(uiCtrl.getLang("secure_keyboard_encrypt_error"));
			}
		});
	},
	issueInputPin : function(){
		//issueFrm issuepwd issuepwd_more
		if($("#issuepinpwd").val() == ""){
			ui.alert(uiCtrl.getLang("require_password"));
			return;
		}
		var selectDrive = cxCtrl.getSelectDrive();
		var tStorage = selectDrive.storage;
		var tDrive = selectDrive.drive;

		if((tStorage == CXCONST.STORAGE.USIM
			|| ((tStorage == CXCONST.STORAGE.HSM || tStorage == CXCONST.STORAGE.PHONE)
				&& tDrive && tDrive == "Mobile_USIMsmartCERT"))
			&& $("#issuepinpwd").val().length != 8){
			ui.alert(uiCtrl.getLang("input_usim_password_fail"));
			$("#issuePinFrm")[0].reset();
			return;
		}
		secureKeyCtrl.encPwdEcrypt({"form":"issuePinFrm","encFields":["issuepinpwd"]}, function(enc){
			if(enc && enc.encParams.length == 1){
				var encStr = enc.encParams[0];
				var prdt = encStr.enc;
				var prdt_type = encStr.type;

				if(typeof cxInvokeCommon.issueCopyInfo.copy == "undefined" || !cxInvokeCommon.issueCopyInfo.copy){	// 인증서 발급인 경우
					var data = cxCtrl.getPlainText();
					var selectDrive = cxCtrl.getSelectDrive();
					clientCtrl.requestDiskCertificate(data.ca, data.host, data.port,
						data.referenceValue, data.secretValue, tStorage, tDrive,
						prdt, prdt_type, data.options, uiCtrl.callbackClose);
				} else {	// 인증서 추가 복사인 경우
					if(cxsign.isbrowser){
						var certCopyCallback = function(response, error){
							cxsign.issueCopyInfo = {};
							if(error){
								uiCtrl.errorAlert(error);
							} else {
								ui.message(uiCtrl.getLang("request_cert_success"), function(){uiCtrl.callbackClose("OK")});
							}
						};
						var storage = cxsign.issueCopyInfo.storage;
						var drive = cxsign.issueCopyInfo.drive;
						var pwdStr = cxsign.issueCopyInfo.prdt;
						var pwdType = cxsign.issueCopyInfo.prdt_type;
						var certData = cxsign.issueCopyInfo.certData;
						var certType = cxsign.issueCopyInfo.certType;
						var options = {};
						clientCtrl.importCert(storage, drive, certType, certData, pwdStr, pwdType, prdt, prdt_type, options, certCopyCallback);

					} else{
						clientCtrl.issueCopyCert(tStorage, tDrive, prdt, prdt_type);
					}
					
				}
			} else {
				$("#issuePinFrm")[0].reset();
				ui.alert(uiCtrl.getLang("secure_keyboard_encrypt_error"));
			}
		});
	},
	updateCert : function(){
		if(!cxCtrl.isCurrentCert()){
			ui.alert(uiCtrl.getLang("select_cert"));
			return;
		}
		if( $("#certpwd").val() == ""){
			ui.alert(uiCtrl.getLang("input_cert_password"), function(){
				$("#certpwd").focus();
			});
			return;
		}

		secureKeyCtrl.encPwdEcrypt({"form":"certFrm","encFields":["certpwd"]}, function(enc){
			if(enc && enc.encParams.length > 0){
				// 새비밀번호가 필요한 경우 쓰자
				// if(!cxUtil.checkCorrectUPW("raon/inca", enc.encParams[0].enc, {length: 10, upper: true, lower: true, number: true, spchar: true})){
				// 	ui.alert("영대소문자, 숫자, 특수기호 모두 10글자 이상 포함되어야 합니다.");
				// 	return;
				// }
				var data = cxCtrl.getPlainText();
				var storage = cxCtrl.getCurrentCert().storage;
				var drive = cxCtrl.getCurrentCert().drive;
				var cid = cxCtrl.getCurrentCert().cid;
				var pwdStr = enc.encParams[0].enc;
				var pwdType = enc.encParams[0].type;
				var options = cxCtrl.getOptions();
				if(storage == "browser"){
					//새로운 비밀번호 필요
					browserCtrl.updateDiskCertificate(data.ca, cid, pwdStr, pwdType, uiCtrl.callbackClose);
				} else{
					clientCtrl.updateDiskCertificate(data.ca, data.host, data.port,
						storage, drive, cid, pwdStr, pwdType, options, uiCtrl.callbackClose);
				}
			} else {
				ui.alert(uiCtrl.getLang("secure_keyboard_encrypt_error"));
			}
		});
	},
	cloudClick : function(cloudEvent){
		if(cloudEvent == CXCONST.CLOUD.CONNECT || cloudEvent == CXCONST.CLOUD.DISCONNECT || cloudEvent == CXCONST.CLOUD.REMOVECERTFORMTRAY || cloudEvent == CXCONST.CLOUD.BROWSERIMPORT){
			var currentStorage = cxCtrl.getCurrentStorage();
			if($(".pop_area").css("display") != "none"){
				$(".pop_area").children().css("display", "none");
				if($(".kbd_loading_bg").css("display") != "none"){
					ui.loading.end();
				} else if($(".modal_bg").css("display") != "none"){
					$(".modal_bg").hide();
				}
			}
			if(currentStorage == "browser"){
				ui.storageClick("browser");
			}
		}
	}
};




// 저장소 클릭
$.fn.storageClick = function(storage, evt){
	kslog("ui.storageClick.storage", storage);
	var storageObj = $("#" + storage);
	// clicked 스타일 적용
	$(".storage_lst li").removeClass("clicked");
	$(".storage_more li").removeClass("clicked");
	storageObj.addClass("clicked");
	// set choice_box position
	var clickXY = {};
	if(evt){
		if(TOUCHENEX_UTIL.isWin() && TOUCHENEX_UTIL.isIE() && TOUCHENEX_UTIL.getBrowserVer() <= 10 && (storage == "usb" || storage == "hsm" || storage == "phone" )){
			var winY = window.pageYOffset;
			var winX = window.pageXOffset;
			var storageTop = winY+document.getElementById(storage).getBoundingClientRect().top;
			var storageBottom = winY+document.getElementById(storage).getBoundingClientRect().bottom;
			var storageLeft = winX+document.getElementById(storage).getBoundingClientRect().left;
			var storageRight = winX+document.getElementById(storage).getBoundingClientRect().right;
			if(evt.originalEvent.pageX == 0 || evt.originalEvent.pageX < 0 
				|| evt.originalEvent.pageX < storageLeft || evt.originalEvent.pageX > storageRight){
				clickXY.x = 50;
			} else{
				clickXY.x = evt.originalEvent.pageX - $(this).offset().left;
			}
			if(evt.originalEvent.pageY == 0 || evt.originalEvent.pageY < 0 
				|| evt.originalEvent.pageY < storageTop || evt.originalEvent.pageY > storageBottom){
				clickXY.y = 50;
			} else{
				clickXY.y = evt.originalEvent.pageY - $(this).offset().top;
			}
		} else{
			if(evt.originalEvent.pageX == 0 || evt.originalEvent.pageX < 0) {
				clickXY.x = 50;
			} else {
				clickXY.x = evt.originalEvent.pageX - $(this).offset().left;
			}
			if(evt.originalEvent.pageY == 0 || evt.originalEvent.pageY < 0) {
				clickXY.y = 50;
			} else {
				clickXY.y = evt.originalEvent.pageY - $(this).offset().top;
			}
		}
	}
	
	// help_popup setting
	if(typeof KSBizConfig.browsercert_guide != "undefined" && KSBizConfig.browsercert_guide && cxCtrl.isSignPage()){
		if(storage == CXCONST.STORAGE.BROWSER){
			$(".help-layer").show();
		} else {
			$(".help-layer").hide();
		}
	}

	var getDiskStatusCallback = function(diskList){
		kslog("ui.storageClick.getDiskStatusCallback.diskList", diskList);
		if(diskList){
			if(Object.keys(clickXY).length > 0){
				storageObj.find(".choice_box").css("top", clickXY.y).css("left", clickXY.x);
			}
			if(diskList.drives.length > 0){
				if(CXCONST.STORAGE.LOCAL_DISK == storage){ // hdd
					storageObj.getDiskList(storage, diskList.drives[0].drive);
				} else {
					storageObj.find(".choice_box").off("click");
					if(diskList.drives.length > 0){
						var liCnt = 0;
						for(var i in diskList.drives){
							var drive = diskList.drives[i];
							var driveName = drive.drive;
							var driveView = "";
							if(drive.name.startsWith("_RID_") && drive.name.replace("_RID_","") == ""){
								driveView = drive.drive;
							} else {
								driveView = uiCtrl.getLang(drive.name.replace("_RID_", ""));
							}

							var liTag = $("<li>").html("<a href='javascript:;'>" + driveView + "</a>");
							liTag.on("click", {
								"storage": storage,
								"drive": drive,
								"driveName": driveName
							}, function(e){
								if(storage == CXCONST.STORAGE.REMOVABLE_DISK){ // usb
									storageObj.getDiskList(e.data.storage, e.data.driveName);
								} else {
									ui.mobileChk(storage, e.data.drive, storageObj.getDiskList);
								}
							});

							if(cxCtrl.isUpdateCertPage() && (drive.writable != "TRUE" || drive.issue != "TRUE")){
								// not todo
							} else {
								liCnt = liCnt + 1;
								storageObj.find(".choice_box").append(liTag);
							}
						}
						// 목록이 하나만 있는 경우 바로 클릭
						if(liCnt == 1){
							storageObj.find("li").eq(0).click();
						} else {
							storageObj.find(".choice_box").show();
						}
					}
				}
			} else {
				kslog("ui.storageClick.diskList", "no drive");
				ui.alert(uiCtrl.getLang("insert_certstore_media"), function(){
					if(cxCtrl.chkBrowserStorage()){
						$("#" + CXCONST.STORAGE.LOCAL_DISK).storageClick(CXCONST.STORAGE.LOCAL_DISK);
					} else {
						$("#" + CXCONST.STORAGE.BROWSER).storageClick(CXCONST.STORAGE.BROWSER);
					}
				});
			}
		} else {
			kslog("ui.storageClick.diskList", "no diskList");
			ui.alert(uiCtrl.getLang("not_exist_disk_status"));
		}
	};

	// run
	if(CXCONST.STORAGE.BROWSER == storage){
		storageObj.getDiskList(storage);
	} else {
		clientCtrl.getDiskStatus(storage, getDiskStatusCallback);
	}
};
// 디스크 인증서 목록
$.fn.getDiskList = function(storage, drive){
	kslog("ui.getDiskList.storage", storage);
	kslog("ui.getDiskList.drive", drive);

	var getDiskListCallback = function(certList){
		kslog("ui.getDiskList.getDiskListCallback.certList", certList);
		
		// dream security 설치 필요한 경우 인증서창 종료
		if(typeof certList.installed && certList.installed == "FALSE"){
			ui.confirm(uiCtrl.getLang("usim_driver_install_after_close_confirm"), function(){
				clientCtrl.downLocalLinkURL(KSBizConfig.usim.dream.download, function(result){
					if(cxCtrl.isManageCertPage()){
						uiCtrl.winClose();
					} else {
						uiCtrl.errorClose({
							status : uiCtrl.getOldErrorCode("INSTALLCLOSE"),
							message : ""
						});
					}
				});
			});
			return;
		}

		// 바로 signStorage를 실행
		// 조건 ((USIM||PHONE) && usim.certSelector == mobile && MOBILE_USIMSMARTCERT) || PHONE && MOBISIGN)
		var directSignStorage = false;
		if(storage == CXCONST.STORAGE.USIM){
			if(KSBizConfig.usim.certSelector.toLowerCase() == "mobile"){
				if(drive.toUpperCase() == "MOBILE_USIMSMARTCERT"){
					directSignStorage = true;
				}
			}
		} else if(storage == CXCONST.STORAGE.PHONE){
			if(KSBizConfig.usim.certSelector.toLowerCase() == "mobile"){
				if(drive.toUpperCase() == "MOBILE_USIMSMARTCERT"){
					directSignStorage = true;
				}
			}
			if(drive.toUpperCase() == "MOBISIGN"){
				directSignStorage = true;
			}
		}

		if(directSignStorage && cxCtrl.isSignPage()){
			cxCtrl.setCurrentStorage(storage);
			cxCtrl.setCurrentDrive(drive);
			$(".storage_lst li").removeClass("on");
			$(".storage_more li").removeClass("on");
			$(".choice_box").hide();
			$(".more_storage_box").hide();
			$(".modal_bg").hide();
			$("#" + storage).addClass("on");
			if(storage == CXCONST.STORAGE.HSM || storage == CXCONST.STORAGE.USIM){
				$("#more").addClass("on");
			}
			clientCtrl.signStorage(storage, drive, null, null, null, cxCtrl.getPlainText(), cxCtrl.getOptions(), function(data){
				uiCtrl.callbackClose(data);
			});
			return;
		}

		if(certList){
			cxsign.firstCert = true;
			// certlist init
			cxCtrl.setCurrentCert();
			cxCtrl.setCertGrid([]);
			$(".import_info").hide();
			w2ui['grid'].clear();
			// certlist listup
			var gridList = [];
			if(certList.certSets.length > 0){
				for(var i in certList.certSets){
					var certObj = certList.certSets[i];
					certObj.storage = storage;
					certObj.drive = drive;
					var gridData = {};
					var afterDate = certObj.afterDate;
					if(afterDate.length > 0 && afterDate.indexOf(":") > -1){
						afterDate = afterDate.substring(0,10);
					}
					gridData.recid = Number(i)+1;
					gridData.expire_status = certObj.expire_status;
					if(storage == CXCONST.STORAGE.BROWSER && 
						((certObj.type == "1.2.410.200005.1.1.1" && typeof certObj.subjectDN != "undefined" && certObj.subjectDN.toLowerCase().indexOf("personalb") > -1) || 
						(certObj.type == "1.2.410.200005.1.1.5" && typeof certObj.subjectDN != "undefined" && certObj.subjectDN.toLowerCase().indexOf("corporation4ecb") > -1))){
						gridData.type = uiCtrl.getLang(certObj.type + "_b");
					} else {
						gridData.type = uiCtrl.getLang(certObj.type);
					}
					gridData.user_name = certObj.subjectCN;
					gridData.after_date = afterDate;
					gridData.org = 	uiCtrl.getLang(certObj.org);
					gridData.cert = certObj;
					gridData.cloud = certObj.cloud;
					gridData.source = certObj.source;
					gridList.push(gridData);
				}
				w2ui['grid'].add(gridList);
				if(!TOUCHENEX_UTIL.isMac()){
					$('#grid_grid_focus').attr("aria-live", "polite");
				}

				// set certGrid
				cxCtrl.setCertGrid(gridList);
				ui.checkAuthImg();
			} else {
				cxCtrl.setCurrentCert();
				if(cxCtrl.isSignPage() || cxCtrl.isManageCertPage()){
					$(".import_info").show();
				}
				if(cxCtrl.isSignPage() || cxCtrl.isUpdateCertPage()){
					cxsign.firstCertFocusCheck = true;
				}
			}
			// storage select
			cxCtrl.setCurrentStorage(storage);
			cxCtrl.setCurrentDrive(drive);
			$(".storage_lst li").removeClass("on");
			$(".storage_more li").removeClass("on");
			$(".choice_box").hide();
			$(".more_storage_box").hide();
			$(".modal_bg").hide();
			$("#" + storage).addClass("on");
			if(storage == CXCONST.STORAGE.HSM || storage == CXCONST.STORAGE.USIM){
				$("#more").addClass("on");
			}
			// 인증서 비밀번호 입력 안내 문구 변경
			if(storage == CXCONST.STORAGE.USIM){
				$(".password_area .info_txt").html(uiCtrl.getLang("new_info_for_usim"));
				$(".password_area form .lang").html(uiCtrl.getLang("warning_for_usim"));
			} else if(storage == CXCONST.STORAGE.HSM){
				$(".password_area .info_txt").html(uiCtrl.getLang("new_info_for_token"));
				$(".password_area form .lang").html(uiCtrl.getLang("warning_for_token"));
			} else {
				$(".password_area .info_txt").html(uiCtrl.getLang("new_info_for_else"));
				$(".password_area form .lang").html(uiCtrl.getLang("warning_for_else"));
			}
			// 인증서관리 해당 스토리지 버튼 disable
			$(".btn_set .btn_wht").each(function(i){
				var obj = $(this).attr("id");
				if(obj){
					if(cxCtrl.getStorageDisable(obj).indexOf(cxCtrl.getStorageConfig(storage)) > -1){
						$(this).addClass("disable");
					} else {
						$(this).removeClass("disable");
					}
				}
			});
			// 인증서 갱신인 경우 인증서 찾기버튼 disable
			if(cxCtrl.isUpdateCertPage()){
				$("#searchSign").addClass("disable");
			}
			// first cert select
			if(cxCtrl.isSignPage() || cxCtrl.isManageCertPage() || cxCtrl.isUpdateCertPage() || cxCtrl.isExportCertPage()){
				if(certList.certSets.length > 0){
					var firstRow = $("tr[index=0]").attr("recid");
					w2ui['grid'].click(firstRow);
				}
			}
			if($("#grid_grid_records")){
				$("#grid_grid_records").scroll(function(event) {
					if($("#grid_grid_data_0_0").attr('col') == "0"){
						ui.checkAuthImg();
						$("#grid td").css("background-position-y", 0);
						$("#grid .w2ui-selected td").eq(2).css("background-position-y", -25);
					}
				});
			}
		}
	}
	// getDiskList run
	if(CXCONST.STORAGE.BROWSER == storage){
		browserCtrl.getDiskList(storage, cxCtrl.getOptions(), getDiskListCallback);
	} else {
		clientCtrl.getDiskList(storage, drive, cxCtrl.getOptions(), getDiskListCallback);
	}
}
// 저장소, 드라이브 지정 (인증서복사, 공인인증센터)
$.fn.popStorageClick = function(storage, evt){
	kslog("ui.popStorageClick.storage", storage);
	var storageObj = $("#" + storage);
	var storageReal = storage.split("_");
	storageReal = storageReal[storageReal.length - 1];
	var currStorage = cxCtrl.getCurrentCert().storage;
	var currDrive = cxCtrl.getCurrentCert().drive;
	var popStorageClickOn = function(s, d){
		storageObj.parent().find("li").removeClass("on");
		storageObj.find(".choice_box").hide();
		storageObj.addClass("on");
		cxCtrl.setSelectDrive(s, d);
	}
	// clicked 스타일 적용
	$(".storage_lst li").removeClass("clicked");
	$(".storage_more li").removeClass("clicked");
	storageObj.addClass("clicked");
	// set choice_box position
	var clickXY = {};
	if(evt){
		if(evt.originalEvent.pageX == 0) {
			clickXY.x = 50;
		} else {
			clickXY.x = evt.originalEvent.pageX - $(this).offset().left;
		}
		if(evt.originalEvent.pageY == 0) {
			clickXY.y = 50;
		} else {
			clickXY.y = evt.originalEvent.pageY - $(this).offset().top;
		}
	}
	var getDiskStatusCallback = function(diskList){
		kslog("ui.popStorageClick.getDiskStatusCallback.diskList", diskList);
		if(diskList){
			if(Object.keys(clickXY).length > 0){
				storageObj.find(".choice_box").css("top", clickXY.y).css("left", clickXY.x);
			}
			if(diskList.drives.length > 0){
				if(CXCONST.STORAGE.LOCAL_DISK == storageReal){ // hdd
					popStorageClickOn(storageReal, diskList.drives[0].drive);
				} else {
					storageObj.find(".choice_box").off("click");
					if(diskList.drives.length > 0){
						var liCnt = 0;
						for(var i in diskList.drives){
							var drive = diskList.drives[i];
							var driveName = drive.drive;
							var driveView = "";
							if(drive.name.startsWith("_RID_") && drive.name.replace("_RID_","") == ""){
								driveView = drive.drive;
							} else {
								driveView = uiCtrl.getLang(drive.name.replace("_RID_", ""));
							}
							var liTag = $("<li>").html("<a href='javascript:;'>" + driveView + "</a>");
							liTag.on("click", {
								"storage": storageReal,
								"drive": drive,
								"driveName": driveName
							}, function(e){
								if(storageReal == CXCONST.STORAGE.REMOVABLE_DISK){ // usb
									popStorageClickOn(e.data.storage, e.data.driveName);
								} else {
									ui.mobileChk(storageReal, e.data.drive, popStorageClickOn);
								}
							});
							if(currStorage == storageReal && currDrive == driveName){
								// not to do
							} else {
								liCnt = liCnt + 1;
								if(cxCtrl.isManageCertPage()){
									if(drive.writable == "TRUE"){
										if(storageReal == CXCONST.STORAGE.USIM){
											ui.mobileChk(storageReal, diskList.drives[0], popStorageClickOn);
											return;
										} else {
											storageObj.find(".choice_box").append(liTag);
										}
									} else {
										if(diskList.drives.length == 1){
											liTag = $("<li>").html("&nbsp;");
											storageObj.find(".choice_box").append(liTag);
										} else{
											liCnt = liCnt - 1;
										}
									}
								} else if(cxCtrl.isIssueCertPage()){
									if(drive.writable == "TRUE" && storageReal == CXCONST.STORAGE.USIM){
										ui.mobileChk(storageReal, diskList.drives[0], popStorageClickOn);
										return;
									} else if(drive.issue == "TRUE" && drive.writable == "TRUE"){
										if(typeof cxInvokeCommon.issueCopyInfo.copy != "undefined" && cxInvokeCommon.issueCopyInfo.copy
											&& driveName == cxInvokeCommon.issueCopyInfo.drive){
											if(diskList.drives.length == 1){
												liTag = $("<li>").html("&nbsp;");
												storageObj.find(".choice_box").append(liTag);
											} else {
												liCnt = liCnt - 1;
												// not to do
											}
										} else {
											storageObj.find(".choice_box").append(liTag);
										}
									} else {
										if(diskList.drives.length == 1){
											liTag = $("<li>").html("&nbsp;");
											storageObj.find(".choice_box").append(liTag);
										}
									}
								}
							}
						}
						// 목록이 하나만 있는 경우 바로 클릭
						if(liCnt == 1){
							storageObj.find("li").eq(0).click();
						} else if(liCnt == 0){
							ui.alert(uiCtrl.getLang("insert_certstore_media"));
						} else {
							storageObj.find(".choice_box").show();
						}
						//storageObj.find(".choice_box").show();
					} else {
						/*
						var liTag = $("<li>").html("&nbsp;");
						storageObj.find(".choice_box").append(liTag);
						storageObj.find(".choice_box").show();
						*/
						ui.alert(uiCtrl.getLang("insert_certstore_media"));
					}
				}
			} else {
				kslog("ui.popStorageClick.diskList", "no drive");
				// var liTag = $("<li>").html("&nbsp;");
				// storageObj.find(".choice_box").append(liTag);
				// storageObj.find(".choice_box").show();
				ui.alert(uiCtrl.getLang("insert_certstore_media"));
			}
		} else {
			kslog("ui.popStorageClick.diskList", "no diskList");
			ui.alert(uiCtrl.getLang("not_exist_disk_status"));
		}
	};
	// run
	if(storageReal == CXCONST.STORAGE.BROWSER){
		popStorageClickOn(storageReal, null);
	} else {
		clientCtrl.getDiskStatus(storageReal, getDiskStatusCallback);
	}
};
// 인증서 보기
$.fn.viewCertDetail = function(){
	ui.pastFocus = $(this);
	var cert = cxCtrl.getCurrentCert();
	viewCertDetailCallback = function(certDetail){
		kslog("viewCertDetail.certDetail.viewCertDetailCallback", certDetail);
		// init
		$(".tab_area li").removeClass("on");
		$(".tab_area li").eq(0).addClass("on");
		$(".tab1").show();
		$(".tab2").hide();
		$(".gry_box .nomal_txt").html("");
		$(".type2 tbody").html("");
		// 일반
		$(".gry_box .nomal_txt").each(function(i){
			var normalTxt = "";
			switch(i){
				// 상태검증
				case 0:
					normalTxt = uiCtrl.getLang("cert_status_label");
					var certStatus = "";
					if(CXCONST.STORAGE.BROWSER == cert.storage){
						certStatus = uiCtrl.getLang("not_support_crl_status");
					} else if(KSBizConfig.certCRLCheck && certDetail.crl_status == "REVOKED") {
						certStatus = uiCtrl.getLang("cert_v_ERR_CERT_REVOKED");
					} else if(KSBizConfig.certCRLCheck && certDetail.crl_status == "CRLSERVER_ERROR") {
						certStatus = uiCtrl.getLang("CERT_CRL_VERIFY_ERR");
					} else {
						var currCert = cxCtrl.getCurrentCert();
						if(currCert.expireStatus == "NORMAL" || currCert.expireStatus == "NOTYET"){
							certStatus = uiCtrl.getLang("valid_cert");
						} else if(currCert.expireStatus == "EXPIRE"){
							certStatus = uiCtrl.getLang("cert_v_ERR_CERT_HAS_EXPIRED");
						} else if(currCert.expireStatus == "BEFOREEXPIREMONTH"){
							certStatus = uiCtrl.getLang("valid_cert");;
						} else {
							certStatus = "";
						}
					}
					var spanTxt = $("<span>").addClass("txt").html(certStatus);
					$(this).append(normalTxt).append(spanTxt);
					break;
				case 1:
					normalTxt = uiCtrl.getLang("subject_label");
					var spanTxt = $("<span>").addClass("txt").html(certDetail.subjectCN);
					$(this).append(normalTxt).append(spanTxt);
					break;
				case 2:
					normalTxt = uiCtrl.getLang("issuer_label");
					var spanTxt = $("<span>").addClass("txt").html(certDetail.issuer);
					$(this).append(normalTxt).append(spanTxt);
					break;
				case 3:
					normalTxt = uiCtrl.getLang("valid_date");
					var validTime = $("<span>").addClass("txt").html(certDetail.beforeDate).append(uiCtrl.getLang("from"));
					validTime.append("<br>" + certDetail.afterDate).append(uiCtrl.getLang("to"));
					var spanTxt = $("<div>").addClass("time_area").append(validTime);
					$(this).append(normalTxt).append(spanTxt);
					break;
				case 4:
					normalTxt = uiCtrl.getLang("pc_time");
					var spanTxt = $("<span>").addClass("txt").html(cxUtil.currentDate());
					$(this).append(normalTxt).append(spanTxt);
					break;
				default:
					break;
			}
		});
		// 자세히
		var makeDetailTrTxt = function(name, value){
			var trTxt = $("<tr>");
			var nameTxt = $("<td>").addClass("brln").html(name);
			var valTxt = "";
			if(value) {
				if(typeof value == "string" || typeof value == "number"){
					valTxt = $("<td>").html(value);
				} else {
					var str = cxUtil.printArr(value, 1);
					valTxt = $("<td>").html(str);
				}
			} else {
				var valTxt = $("<td>").html("");
			}
			$(trTxt).append(nameTxt).append(valTxt)
			$(".type2 tbody").append($(trTxt));
		};
		var trTxt = $("<tr>");
		var nameTxt = $("<th>").addClass("brln").html(uiCtrl.getLang("name"));
		var valTxt = $("<th>").html(uiCtrl.getLang("value"));
		$(".type2 tbody").append($(trTxt).append(nameTxt).append(valTxt));

		makeDetailTrTxt(uiCtrl.getLang("version"), certDetail.version);
		makeDetailTrTxt(uiCtrl.getLang("serial_number"), certDetail.serialNumber);
		if(certDetail.signAlgorithm != ""){
			makeDetailTrTxt(uiCtrl.getLang("sig_algorithm"), certDetail.signAlgorithm);
		}
		if(certDetail.publicAlgorithm != ""){
			makeDetailTrTxt(uiCtrl.getLang("pubkey_algorithm"), certDetail.publicAlgorithm);
		}
		makeDetailTrTxt(uiCtrl.getLang("issuer"), certDetail.issuer);
		makeDetailTrTxt(uiCtrl.getLang("not_before"), certDetail.beforeDate);
		makeDetailTrTxt(uiCtrl.getLang("not_after"), certDetail.afterDate);
		makeDetailTrTxt(uiCtrl.getLang("subject"), certDetail.subject);
		//makeDetailTrTxt(uiCtrl.getLang("Authority Key Identifier"), certDetail.version);
		if(certDetail.subjectKeyIdentifier != ""){
			makeDetailTrTxt(uiCtrl.getLang("Subject Key Identifier"), certDetail.subjectKeyIdentifier);
		}
		if(certDetail.keyUsage != ""){
			makeDetailTrTxt(uiCtrl.getLang("Key Usage"), certDetail.keyUsage);
		}
		if(certDetail.certificatePolicies != ""){
			makeDetailTrTxt(uiCtrl.getLang("Certificate Polices"), certDetail.certificatePolicies);
		}
		//makeDetailTrTxt(uiCtrl.getLang("Subject Alternative Name"), certDetail.version;
		if(certDetail.cRLDistributionPoints != ""){
			makeDetailTrTxt(uiCtrl.getLang("CRL Distribution Points"), certDetail.cRLDistributionPoints);
		}
		if(certDetail.authorityInfoAccess != ""){
			makeDetailTrTxt(uiCtrl.getLang("Authority Information Access"), certDetail.authorityInfoAccess);
		}
		//makeDetailTrTxt(uiCtrl.getLang("Finterprint Algorithm"), certDetail.version);
		//makeDetailTrTxt(uiCtrl.getLang("Fingerprint"), certDetail.version);
		if(typeof certDetail.source != "undefined"){
			makeDetailTrTxt(uiCtrl.getLang("Source"), certDetail.source);
		}
		if(typeof certDetail.cloud != "undefined"){
			makeDetailTrTxt(uiCtrl.getLang("Cloud"), certDetail.cloud.toString());
		}
		$(".modal_bg").show();
		$(".detail").show();
		$(".detail .btn_org").focus();
	};
	// certDiskInfo run
	if(cxCtrl.isCurrentCert()){
		if(CXCONST.STORAGE.BROWSER == cert.storage){
			browserCtrl.certDiskInfo(cert, viewCertDetailCallback);
		} else {
			clientCtrl.certDiskInfo(cert, viewCertDetailCallback);
		}
	} else {
		ui.alert(uiCtrl.getLang("select_cert"));
	}
}
// 인증서 찾아보기 후 서명
$.fn.certSearchSign = function(){
	$(".pop_dwn .btn_wht2").off("click").on("click", function(){
		$('#fileFrm')[0].reset();
		$("#importfiles").click();
	});
	$("#importfiles").off("change").on("change", function(e){
		var files = $(this)[0].files;
		if(cxCtrl.isExportCertPage()){
			$(".modal_bg").hide();
			$(".pop_dwn").hide();
			ui.makeb64data(files, ui.certImport);
		} else if(cxCtrl.isSignPage()){
			ui.makeb64data(files, ui.importSign);
		}
	});
	$(".modal_bg").show();
	$(".pop_dwn").show();
	$(".pop_dwn .btn_wht2").focus();
}
// 인증서 비밀번호 변경
$.fn.certChangePwd = function(){
	ui.pastFocus = $(this);
	if(cxCtrl.isCurrentCert()){
		var cert = cxCtrl.getCurrentCert();
		// change password callback
		var certChangePwdCallback = function(){
			ui.message(uiCtrl.getLang("changed_password"), function(){
				var storageObj = $("#" + cert.storage);
				storageObj.getDiskList(cert.storage, cert.drive);
			});
		};
		ui.popPwdChange(function(enc){
			if(cert.storage == CXCONST.STORAGE.BROWSER){
				browserCtrl.changePwdCert(cert.cid, enc[0].enc, enc[0].type, enc[1].enc, enc[1].type, certChangePwdCallback);
			} else {
				clientCtrl.changePwdCert(cert.storage, cert.drive, cert.cid, enc[0].enc, enc[0].type, enc[1].enc, enc[1].type, certChangePwdCallback);
			}
		});
	} else {
		ui.alert(uiCtrl.getLang("select_cert"));
	}
}
// 인증서 삭제
$.fn.certDelete = function(){
	ui.pastFocus = $(this);
	if(cxCtrl.isCurrentCert()){
		var cert = cxCtrl.getCurrentCert();
		ui.confirm(uiCtrl.getLang("delete_certificate_confirm"), function(){
			// delete callback
			var deleteDiskCertCallback = function(){
				ui.message(uiCtrl.getLang("delete_complete_notify"), function(){
					var storageObj = $("#" + cert.storage);
					storageObj.getDiskList(cert.storage, cert.drive);
				});
			};
			if(CXCONST.STORAGE.BROWSER == cert.storage){
				browserCtrl.deleteDiskCert(cert, deleteDiskCertCallback);
			} else {
				if(cert.storage == CXCONST.STORAGE.HSM
					|| (KSBizConfig.usim.certSelector.toLowerCase() == "pc"
						&& (cert.storage == CXCONST.STORAGE.USIM || (cert.storage == CXCONST.STORAGE.PHONE && cert.drive.toUpperCase() == "MOBILE_USIMSMARTCERT")))
					){
					ui.popPwdDeviceInput(function(encDevicePwdObj){
						var tpwdStr = encDevicePwdObj.enc;;
						var tpwdType = encDevicePwdObj.type;
						clientCtrl.deleteDiskCert(cert.storage, cert.drive, cert.cid, tpwdStr, tpwdType, deleteDiskCertCallback);
					});
				} else {
					clientCtrl.deleteDiskCert(cert.storage, cert.drive, cert.cid, null, null, deleteDiskCertCallback);
				}
			}
		});
	} else {
		ui.alert(uiCtrl.getLang("select_cert"));
	}
}
// 인증서 가져오기
$.fn.certImport = function(){
	ui.pastFocus = $(this);
	$('#fileFrm')[0].reset();
	$("#importfiles").off().on("change", function(e){
		var files = $(this)[0].files;
		ui.makeb64data(files, ui.certImport);
	});
	$("#importfiles").click();
}
// 인증서 내보내기
$.fn.certExport = function(){
	if(!($(this).attr("class").indexOf("disable") > -1)) {
		ui.pastFocus = $(this);
		if(cxCtrl.isCurrentCert()){
			var cert = cxCtrl.getCurrentCert();
			ui.popPwdInput(false, function(isSave, encPwdObj){
				var storage = cert.storage;
				var drive = cert.drive;
				var cid = cert.cid;
				var pwdStr = encPwdObj.enc;
				var pwdType = encPwdObj.type;
				var options = {};
				var certExportCallback = function(result){
					if(Object.keys(result).length > 0){
						if(!TOUCHENEX_UTIL.isWin() && TOUCHENEX_UTIL.isSafari()){
							var version = (navigator.userAgent.match(/(Version)\/?\s*(\.?\d+(\.\d+)*)/i)[2]).split(".");
							if(version[1] == "undefined"){
								version[1] = 0;
							}
							if(Number(version[0] + "." + version[1]) < 10.1){
								clientCtrl.downloadCert(result.filename, result.filedata, function(link){
									if(link){
										ui.message(uiCtrl.getLang("pop_download"), function(){
											top.location.href=link;
											ui.message(uiCtrl.getLang("cert_export_completed"), function(){
												var storageObj = $("#" + cert.storage);
												storageObj.getDiskList(cert.storage, cert.drive);
											});
										});
									} else {
										ui.alert(uiCtrl.getLang("crosscert_export_fail") + "(link not exist)");
									}
								});
							} else {
								cxUtil.downloadFile(result.filedata, result.filename);
								ui.message(uiCtrl.getLang("cert_export_completed"), function(){
									var storageObj = $("#" + cert.storage);
									storageObj.getDiskList(cert.storage, cert.drive);
								});
							}
						} else {
							cxUtil.downloadFile(result.filedata, result.filename);
							ui.message(uiCtrl.getLang("cert_export_completed"), function(){
								var storageObj = $("#" + cert.storage);
								storageObj.getDiskList(cert.storage, cert.drive);
							});
						}
					}
				};
	
				if(cxCtrl.getCurrentCert().storage == CXCONST.STORAGE.BROWSER){
					browserCtrl.exportCert(cert.cid, pwdStr, pwdType, "file", certExportCallback);
				} else {
					if(cxCtrl.getCurrentStorage() == CXCONST.STORAGE.HSM ||
					cxCtrl.getCurrentStorage() == CXCONST.STORAGE.USIM) {
						// 내보내기 불가임
					} else {
						clientCtrl.exportCert(cert.storage, cert.drive, cert.cid, pwdStr, pwdType, "raw", certExportCallback)
					}
				}
			});
		} else {
			ui.alert(uiCtrl.getLang("select_cert"));
		}
	}
}
// 인증서 복사
$.fn.certCopy = function(){
	if(!($(this).attr("class").indexOf("disable") > -1)) {
		ui.pastFocus = $(this);
		if(cxCtrl.isCurrentCert()){
			var cert = cxCtrl.getCurrentCert();
			cxCtrl.setSelectDrive();
			ui.popSelectDrive(function(driveObj){
				var tStorage = driveObj.storage;
				var tDrive = driveObj.drive;
				ui.popPwdInput(false, function(isSave, encPwdObj){
					var pwdStr = encPwdObj.enc;
					var pwdType = encPwdObj.type;
					var tpwdStr = "";
					var tpwdType = "";
					var options = {};
					var certCopyCallback = function(response, error){
						if(error){
							uiCtrl.errorAlert(error, function(){
								ui.storageClick(KSBizConfig.initStorage);
							});
						} else {
							ui.message(uiCtrl.getLang("copy_completed"), function(){
								if(cert.storage == CXCONST.STORAGE.BROWSER){
									ui.cloudClick(CXCONST.CLOUD.BROWSERIMPORT);
								} else{
									var storageObj = $("#" + cert.storage);
									storageObj.getDiskList(cert.storage, cert.drive);
								}
							});
						}
					};
					var certExportCallback = function(certData){
						var certType = "p12";
						if(tStorage == CXCONST.STORAGE.BROWSER){
							browserCtrl.importCert(certType, certData, pwdStr, pwdType, certCopyCallback);
						} else {
							if((certData).indexOf("|") > -1){
								var data = certData.split("|");
								certData = data[0];
							}
							if(tStorage == CXCONST.STORAGE.HSM
								|| (KSBizConfig.usim.certSelector.toLowerCase() == "pc"
									&& (tStorage == CXCONST.STORAGE.USIM || (tStorage == CXCONST.STORAGE.PHONE && tDrive.toUpperCase() == "MOBILE_USIMSMARTCERT")))
								){
								ui.popPwdDeviceInput(function(encDevicePwdObj){
									tpwdStr = encDevicePwdObj.enc;;
									tpwdType = encDevicePwdObj.type;
									clientCtrl.importCert(tStorage, tDrive, certType, certData, pwdStr, pwdType, tpwdStr, tpwdType, options, certCopyCallback);
								});
							} else {
								clientCtrl.importCert(tStorage, tDrive, certType, certData, pwdStr, pwdType, tpwdStr, tpwdType, options, certCopyCallback);
							}
						}
					};
	
					if(cert.storage == CXCONST.STORAGE.BROWSER){
						// browser -> disk
						if(cert.storage == tStorage){
							browserCtrl.copyBrowserCert(cert.cid, pwdStr, pwdType, certCopyCallback);
						} else{
							browserCtrl.exportCert(cert.cid, pwdStr, pwdType, "base64", certExportCallback);
						}
					} else {
						clientCtrl.exportCert(cert.storage, cert.drive, cert.cid, pwdStr, pwdType, "p12", certExportCallback);
						// if(tStorage == CXCONST.STORAGE.BROWSER){
						// 	// dist -> browser
						// 	clientCtrl.exportCert(cert.storage, cert.drive, cert.cid, pwdStr, pwdType, "p12", certExportCallback);
						// } else {
						// 	// disk -> disk
							// if(tStorage == CXCONST.STORAGE.HSM
							// 	|| (KSBizConfig.usim.certSelector.toLowerCase() == "pc"
							// 		&& (tStorage == CXCONST.STORAGE.USIM || (tStorage == CXCONST.STORAGE.PHONE && tDrive.toUpperCase() == "MOBILE_USIMSMARTCERT")))
							// 	){
							// 	ui.popPwdDeviceInput(function(encDevicePwdObj){
							// 		tpwdStr = encDevicePwdObj.enc;;
							// 		tpwdType = encDevicePwdObj.type;
							// 		clientCtrl.copyCert(cert.storage, cert.drive, tStorage, tDrive, cert.cid, pwdStr, pwdType, tpwdStr, tpwdType, certCopyCallback);								
							// 	});
							// } else {
							// 	clientCtrl.copyCert(cert.storage, cert.drive, tStorage, tDrive, cert.cid, pwdStr, pwdType, tpwdStr, tpwdType, certCopyCallback);
							// }
						// }
					}
				});
			})
		} else {
			ui.alert(uiCtrl.getLang("select_cert"));
		}
	}
}
//브라우저 인증서 내보내기 
$.fn.browserExportCert = function(res){
	var cert = cxCtrl.getCurrentCert();
	var exportInterval;
	var exportIntervalFun = function(data){
		var reqestData = "";
		reqestData = "req="+CXCONST.CERTSYNC.REQUEST.GET_STATUS;
		reqestData += "&acode="+data.acode;
		DC_get(KSBizConfig.browserCertExportUrl, reqestData, function(res){
			if(res != ""){
				res = JSON.parse(res);
				kslog("uiAction.browserExportCert.GET_STATUS.success_res",res);
				if(res.status == CXCONST.CERTSYNC.STATUS.DONE){
					clearInterval(exportInterval);
					ui.message(uiCtrl.getLang("cert_export_completed"),uiCtrl.winClose);
				} else if(res.status == CXCONST.CERTSYNC.STATUS.CANCEL){
					clearInterval(exportInterval);
					ui.message(uiCtrl.getLang("expired_export_number"));
				}
			}
		});
	}
	var certExportCallback = function(result, error){
		if(result.length > 0){
			var data = encodeURIComponent(result);
			var exportReqestData = {};
			exportReqestData = "req=" + CXCONST.CERTSYNC.REQUEST.UPSYNC;
			exportReqestData += "&aclen=" + KSBizConfig.certSyncAuthLength;
			exportReqestData += "&data="+data;

			DC_get(KSBizConfig.browserCertExportUrl, exportReqestData, function(res){
				if(res != ""){
					res = JSON.parse(res);
					ui.initExportBrowser();
					var first_data = res.acode.substr(0,KSBizConfig.certSyncAuthLength/2);
					var second_data = res.acode.substr(KSBizConfig.certSyncAuthLength/2);
					$("#browserCertCheck_area_data1").val(first_data);
					$("#browserCertCheck_area_data2").val(second_data);
					$("#browserCertCheck_area_data1").prop('readonly',true);
					$("#browserCertCheck_area_data2").prop('readonly',true);
					ui.focus();
					if(res.result=="OK"){
						kslog("uiAction.browserExportCert.UPSYNC_CERT.success_OK_data",res);
						exportInterval = setInterval(function(){exportIntervalFun(res)}, 500);
					} else{
						kslog("uiAction.browserExportCert.UPSYNC_CERT.success_result_err",res);
						ui.alert(uiCtrl.getLang("cert_export_fail"),uiCtrl.winClose);
					}
				} else{
					//통신 실패
					kslog("uiAction.browserExportCert_UPSYNC_CERT_error");
					ui.alert(uiCtrl.getLang("replay_txt"),uiCtrl.winClose);
				}
			});					
		} else {
			//result값이 없을 때
		}			
	};
	if(res){
		//인증서 찾기 또는 드래그를 통한 인증서를 가져와서 내보내기를 할 경우
		browserCtrl.exportCert(res.cid, res.pwdStr, res.pwdType, "base64", certExportCallback);
	} else{
		//인증서 선택이 안됬을 경우
		if(!cxCtrl.isCurrentCert()){
			ui.alert(uiCtrl.getLang("select_cert"));
			return;
		}
		//비밀번호가 비어있을 경우
		if( $("#certpwd").val() == ""){
			var inputMsg = "";
			inputMsg = uiCtrl.getLang("input_cert_password");
			ui.alert(inputMsg, function(){
				$("#certpwd").focus();
			});
			return;
		}
		if(cxCtrl.isCurrentCert()){
			secureKeyCtrl.encPwdEcrypt({"form":"certFrm","encFields":["certpwd"]}, function(enc){
				kslog("uiAction.browserExportCert.enc", enc);
				if(enc && enc.encParams.length > 0){
					var storage = cert.storage;
					var drive = cert.drive;
					var cid = cert.cid;
					var pwdStr = enc.encParams[0].enc;
					var pwdType = enc.encParams[0].type;
					var option = cxCtrl.getOptions();
					browserCtrl.exportCert(cert.cid, pwdStr, pwdType, "base64", certExportCallback);
				} else {
					ui.alert(uiCtrl.getLang("secure_keyboard_encrypt_error"),uiCtrl.winClose);
					
				}
			});
		};
	}
	
}
//브라우저 인증서 가져오기 init
$.fn.browserImportCertInit = function(){
	var importValue1 = $("#browserCertCheck_area_data1").val();
	var importValue2 =  $("#browserCertCheck_area_data2").val();
	cxsign.browserCertInfo.value = importValue1.concat(importValue2);
	if(importValue1 == "" || importValue2 == ""){
		ui.message(uiCtrl.getLang("enter_number"), function(){
			$("#browserCertCheck_area_data1").val('');
			$("#browserCertCheck_area_data2").val('');
		});
	} else if(importValue1.length < KSBizConfig.certSyncAuthLength/2 || importValue2.length < KSBizConfig.certSyncAuthLength/2){
		ui.message(uiCtrl.getLang("check_number"), function(){
			$("#browserCertCheck_area_data1").val('');
			$("#browserCertCheck_area_data2").val('');
		});
	} else{
		var importReqestData = "";
		importReqestData = "req=" + CXCONST.CERTSYNC.REQUEST.GET_STATUS;
		importReqestData += "&acode=" + cxsign.browserCertInfo.value;
		DC_get(KSBizConfig.browserCertExportUrl, importReqestData, function(res){
			if(res != ""){
				res = JSON.parse(res);
				kslog("uiAction.browserImportCertInit.GET_STATUS.success_res", res);
				if(res.status == CXCONST.CERTSYNC.STATUS.UP){
					var downReqestData = "";
					downReqestData = "req=" + CXCONST.CERTSYNC.REQUEST.DOWNSYNC;
					downReqestData += "&acode=" + cxsign.browserCertInfo.value;
					DC_get(KSBizConfig.browserCertExportUrl, downReqestData, function(res){
						if(res != ""){
							res = JSON.parse(res);
							kslog("uiAction.browserImportCertInit.DOWNSYNC_CERT.success_res", res);
							if(res.result=="OK"){
								kslog("uiAction.importCert.DOWNSYNC_CERT.success_res",res.data);
								data = decodeURIComponent(res.data);
								cxsign.browserCertInfo.cert = data;
								$(this).browserImportCert();
							} else {
								// 가져오기 실패
								kslog("uiAction.browserImportCertInit.DOWNSYNC_CERT.success_res_err",res);
								ui.alert(uiCtrl.getLang("unknown_error"));
							}
						} else{
							//통신 실패
							kslog("uiAction.browserImportCertInit.DOWNSYNC.error");
							uiCtrl.winClose();
						}
					});
				} else if(res.status == CXCONST.CERTSYNC.STATUS.DOWN){
					var cancelReqestData = "";
					cancelReqestData = "req=" + CXCONST.CERTSYNC.REQUEST.CANCEL;
					cancelReqestData += "&acode=" + cxsign.browserCertInfo.value;
					DC_get(KSBizConfig.browserCertExportUrl, cancelReqestData, function(res){
						if(res != ""){
							res = JSON.parse(res);
							kslog("uiAction.browserImportCertInit.CANCEL.success_res", res);
							if(res.result == "OK"){
								kslog("uiAction.browserImportCertInit.CANCEL.success_res", res);
								ui.alert(uiCtrl.getLang("replay_export"));
								if(cxsign.browserCertInfo.cert != ""){
									cxsign.browserCertInfo.cert= "";
									cxsign.browserCertInfo.value= "";
									cxsign.browserCertInfo.value= 0;
								}
								uiCtrl.winClose();
							} else{
								kslog("uiAction.browserImportCertInit.CANCEL.success_res_err", res);
								if(cxsign.browserCertInfo.cert != ""){
									cxsign.browserCertInfo.cert= "";
									cxsign.browserCertInfo.value= "";
									cxsign.browserCertInfo.value= 0;
								}
							}
						} else{
							//통신 실패
							kslog("uiAction.browserImportCertInit.CERTSYNC.error");
							uiCtrl.winClose();
						}
					});
				} else if(res.status == CXCONST.CERTSYNC.STATUS.CANCEL){
					ui.alert(uiCtrl.getLang("cant_export_number"));
					if(cxsign.browserCertInfo.cert != ""){
						cxsign.browserCertInfo.cert= "";
						cxsign.browserCertInfo.value= "";
						cxsign.browserCertInfo.value= 0;
					}
					return;				
				} else {
					ui.alert(uiCtrl.getLang("wrong_input"), function(){
						$("#browserCertCheck_area_data1").val('');
						$("#browserCertCheck_area_data2").val('');
					});
					kslog("uiAction.browserImportCertInit.GET_STATUS.error");
				}
			} else{
				//통신 실패
				kslog("uiAction.browserImportCertInit.GET_STATUS.error");
				uiCtrl.winClose();
			}
		});
	}
}
//브라우저 인증서 가져오기 
$.fn.browserImportCert = function(){
	$("#browserCertCheck_area_data1").val('');
	$("#browserCertCheck_area_data2").val('');
	if(cxsign.browserCertInfo.cert != ""){
		var certData = cxsign.browserCertInfo.cert;
		ui.popPwdInput(false, function(isSave, encPwdObj){
			var pwdStr = encPwdObj.enc;
			var pwdType = encPwdObj.type;
			var certType = "p12";
			var certCopyCallback = function(response, error){
				//error : 비밀번호 입력 잘못 했을 경우 - status가 DOWN이 아닐 경우 저장된 인증서는 지우고, 에러메시지 띄워줌
				if(error){
					if(error.status == "0017"){
						if(cxsign.browserCertInfo.pwdCount < KSBizConfig.passwordCounter -1){
							uiCtrl.errorAlert(error, function(){
								$(this).browserImportCert();
								cxsign.browserCertInfo.pwdCount++;
							});						
						} else{
							ui.alert(uiCtrl.getLang("wrong_password_counter_exceed").replace("%1", KSBizConfig.passwordCounter), uiCtrl.winClose);
						}
					} else{
						uiCtrl.errorAlert(error, uiCtrl.winClose);
					}
				} else {
					var importReqestCertData = "";
					importReqestCertData = "req=" + CXCONST.CERTSYNC.REQUEST.DONE;
					importReqestCertData += "&acode=" + cxsign.browserCertInfo.value;
					DC_get(KSBizConfig.browserCertExportUrl, importReqestCertData, function(res){
						if(res != ""){
							res = JSON.parse(res);
							kslog("uiAction.browserImportCert.DONE.success_res",res);
							var dispose =  function(){
								var disposeReqestData = "";
								disposeReqestData = "req=" + CXCONST.CERTSYNC.REQUEST.DISPOSE;
								disposeReqestData += "&acode=" + cxsign.browserCertInfo.value;
								DC_get(KSBizConfig.browserCertExportUrl, disposeReqestData, function(res){
									if(res != ""){
										res = JSON.parse(res);
										if(res.result == "OK"){
											kslog("uiAction.browserImportCert.DISPOSE.success_res",res);
											cxsign.browserCertInfo.cert= "";
											cxsign.browserCertInfo.value= "";
											cxsign.browserCertInfo.value= 0;
											uiCtrl.winClose();
										} else{
											kslog("uiAction.browserImportCertCallback.certCopyCallback.DISPOSE.success_res_err",res);
										}
									} else{
										//통신 실패
										kslog("uiAction.browserImportCertInit_UPSYNC_CERT_error");
										uiCtrl.winClose();
									}
								});
							}
							ui.message(uiCtrl.getLang("cert_import_completed"),dispose);	
						} else{
							//통신 실패
							kslog("uiAction.browserImportCert_UPSYNC_CERT_error");
							uiCtrl.winClose();
						}
					});
				}
			};
			browserCtrl.importCert(certType, certData, pwdStr, pwdType, certCopyCallback);	
		});
	} else {
		ui.alert(uiCtrl.getLang("nothing_cert"));
	}
}
//브라우저 인증서 가져오기 취소
$.fn.browserImportCancel = function(){
	if(cxsign.browserCertInfo.cert == ""){
		uiCtrl.winClose();
	} else{
		var cancelReqestData = "";
		cancelReqestData = "req=" + CXCONST.CERTSYNC.REQUEST.CANCEL;
		cancelReqestData += "&acode=" + cxsign.browserCertInfo.value;
		DC_get(KSBizConfig.browserCertExportUrl, cancelReqestData, function(res){
			if(res != ""){
				res = JSON.parse(res);
				kslog("uiAction.browserImportCancel.CANCEL.success_res", res);
				if(res.result == "OK"){
					kslog("uiAction.browserImportCancel.CANCEL.success_res", res);
					if(cxsign.browserCertInfo.cert != ""){
						cxsign.browserCertInfo.cert= "";
						cxsign.browserCertInfo.value= "";
						cxsign.browserCertInfo.value= 0;
					}
					uiCtrl.winClose();
				} else{
					kslog("uiAction.browserImportCancel.CANCEL.success_res_err", res);
					if(cxsign.browserCertInfo.cert != ""){
						cxsign.browserCertInfo.cert= "";
						cxsign.browserCertInfo.value= "";
						cxsign.browserCertInfo.value= 0;
					}
				}
			} else{
				//통신 실패
				kslog("uiAction.browserImportCancel.CERTSYNC.error");
				uiCtrl.winClose();
			}
		});
	}
}