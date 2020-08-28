$(document).ready(function(){
	// 타이틀 드래그, 우클릭, 드래그방지
	//$("#container").draggable({"cancel":".contents,.pop_noti"});
	document.oncontextmenu = function() { return false; };
	document.onselectstart = function() { return false; };
	$("li").on("dragstart", false);
	$(".btn_set").on("dragstart", false);
	$(".btn_area").on("dragstart", false);
	$("form").on("dragstart", false);
	$("#container").children("div").each(function() {
		cxsign.area.push($(this).attr("class"));
	});
});

/**
 * initialize...
 */

var ui = {
	pastFocus : null,
	alert : function(msg, callback){
		$(".pop_error .txt").html(msg);
		$(".pop_error .btn_blu").off("click").on("click", function(e){
			ui.hiddenAndShow(true);
			$(".pop_error").hide();
			if(ui.pastFocus) {
				ui.pastFocus.focus();
				ui.pastFocus = null;
			}
			/* 20200820 박규리 : [웹접근성] 확인 클릭 후 포커스 이동 */
			$(".top_tit_area .title .lang").focus();
			if(callback){setTimeout(callback, 5);}
		});
		ui.hiddenAndShow(false);
		$(".pop_error").show();
		if($(".pop_error .txt").height() > 30){
			$(".pop_error .noti_area").addClass("long");
		} else {
			$(".pop_error .noti_area").removeClass("long");
		}
		/* 20200820 박규리 : [웹접근성] alert tabindex 는 101부터 시작 */
		$(".pop_error .noti_area span").eq(1).attr("tabindex","102");
		$(".pop_error .btn_blu").attr("tabindex","103");
		$(".pop_error .title").attr("tabindex","101").focus();
	},

	message : function(msg, callback){
		$(".pop_message .txt").html(msg);
		$(".pop_message .btn_blu").off("click").on("click", function(e){
			ui.hiddenAndShow(true);
			$(".pop_message").hide();
			if(ui.pastFocus) {
				ui.pastFocus.focus();
				ui.pastFocus = null;
			}
			/* 20200820 박규리 : [웹접근성] 확인 클릭 후 포커스 이동 */
			$(".top_tit_area .title .lang").focus();
			if(callback){setTimeout(callback, 5);}
		});
		ui.hiddenAndShow(false);
		$(".pop_message").show();
		// $(".pop_message .btn_blu").focus();
		/* 20200820 박규리 : [웹접근성] alert tabindex 는 107부터 시작 */
		$(".pop_message .noti_area span").eq(1).attr("tabindex","108");
		$(".pop_message .btn_area .btn_blu").attr("tabindex","109");
		$(".pop_message .title").attr("tabindex","107").focus();
	},

	confirm : function(msg, okCallback, cancelCallback){
		$(".pop_confirm .txt").html(msg);
		$(".pop_confirm .btn_blu").off("click").on("click", function(e){
			ui.hiddenAndShow(true);
			$(".pop_confirm").hide();
			/* 20200820 박규리 : [웹접근성] 확인 클릭 후 포커스 이동 */
			$(".top_tit_area .title .lang").focus();
			if(okCallback){setTimeout(okCallback, 5);}
		});
		$(".pop_confirm .btn_gry").off("click").on("click", function(e){
			ui.hiddenAndShow(true);
			$(".pop_confirm").hide();
			if(ui.pastFocus) {
				ui.pastFocus.focus();
				ui.pastFocus = null;
			}
			/* 20200820 박규리 : [웹접근성] 취소 클릭 후 포커스 이동 */
			$(".top_tit_area .title .lang").focus();
			if(cancelCallback){	setTimeout(cancelCallback, 5);}
		});
		ui.hiddenAndShow(false);
		$(".pop_confirm").show();
		if($(".pop_confirm .txt").height() > 30){
			$(".pop_confirm .noti_area").addClass("long");
		} else {
			$(".pop_confirm .noti_area").removeClass("long");
		}
		/* 20200820 박규리 : [웹접근성] alert tabindex 는 104부터 시작 */
		$(".pop_confirm .noti_area span").eq(1).attr("tabindex","105");
		$(".pop_confirm .btn_blu").attr("tabindex","106");
		$(".pop_confirm .title").attr("tabindex","104").focus();
		// $(".pop_confirm .btn_blu").focus();
	},

	loading : {
		seqCount: 0,
		seqTotal: 14,
		loadingInterval: null,
		start: function(){
			if($(".loading_bg").css("display") == "none"){
				$(".loading").css('top',($('#wrap').height()/2)-($(".loading").height()/2));
				$(".loading").css('left',($('#wrap').width()/2)-($(".loading").width()/2));
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
	popLayerSaved : {
		alert : false,
		bg : false,
		popObj : null
	},
	hiddenAndShow : function(status){
		$(".modal_bg").css("height", $("#wrap").height());
		
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
			// pop_area status
			ui.popLayerSaved.popObj = null;
			$(".pop_area").each(function(i){
				var pop = $(".pop_area").eq(i);
				//if(pop.is(pop.show())){
				if(pop.css("display") != "none"){
					ui.popLayerSaved.popObj = pop;
					pop.hide();
				}
			});
		} else {
			if(ui.popLayerSaved.alert){
				ui.loading.start();
			} else {
				ui.loading.end();
			}
			if(ui.popLayerSaved.bg){
				$(".modal_bg").show();
			} else {
				$(".modal_bg").hide();
			}
			if(ui.popLayerSaved.popObj){
				ui.popLayerSaved.popObj.show();
			} else {
				ui.popLayerSaved.popObj = null;
			}
		}
			
	},

	setWinPosition : function(defHeight){
		var contHeight = $("#container").height();
		if(contHeight == 0){
			contHeight = defHeight;
		}
		//var winHeight = $(parent.document).find("#cxsignLayer").height();
		var winHeight = parent.innerHeight;
		var margin = 0;
		margin = (winHeight - contHeight) / 2 - 40;
		if(margin < 0) margin = 0;
		$("#container").css("margin-top", margin + "px");
	},
	
	//	전체 area 중, 보여줄 area만 show
	init : function(show_area) {
		var tmp = cxsign.area.slice();
		for(var i=0; i<show_area.length; i++) {
			var str = show_area[i];
			if(str == ".info_rac"){
				if($(".info_rac").css("display") == "none"){
					$(".info_rac").css("display","block");
				}
			} else {
				if($(".info_rac").css("display") != "none"){
					$(".info_rac").css("display","none");
				}
			}
			if(tmp.indexOf(str) > -1) {
				$("."+str).show();
				tmp.splice(tmp.indexOf(str), 1);
			}
		}
		for(var j=0; j<tmp.length; j++) {
			$("."+tmp[j]).hide();
		}
	} ,

	// 전자서명 ui
	initSign : function(){
		$(".btn_back").off("click").on("click", function(){
			uiCtrl.winClose();
		});
		var show_area = ["manage_area"];
		ui.init(show_area);
		$("#manage_menu").getDiskList("browser");
		$(".info_rac").hide();
		if(cxCtrl.isSignPage()){
			$(".top_tit_area .title .lang").eq(0).html(uiCtrl.getLang("sign_dialog_title"));
		} else{
			$(".top_tit_area .title .lang").eq(0).html(uiCtrl.getLang("update_cert"));
		}
	},
	/*
		20200820 박규리 : [웹접근성] focus 함수 추가
		focus : tabindex 설정후 title에 focus()
		location : focus 호출하는 함수명
	*/
	focus : function(location){
		//focus 제거
		$(".top_tit_area .title .lang").blur();
		// remove tabindex
		$( '*' ).removeAttr( 'tabindex' );
		// 뒤로가기 tabindex 1로 고정
		$(".btn_back").attr('tabindex','1');
		var tidx = 3;
		if(location == "getDiskList"){
			var i;
			for(i =0; i<$(".cert_lst a").length; i++){
				$(".cert_lst a").eq(i).attr('tabindex', tidx++);
			}
		} else if(location == "viewSignDetail"){
			$(".table_box table thead tr").eq(i).attr('tabindex', -1);
			for(var i =0; i<$(".table_box table tbody tr").length; i++){
				$(".table_box table tbody tr").eq(i).attr('tabindex', tidx++);
			}
			$(".sign_area .btn_area .btn_blu").attr('tabindex', tidx++);
			$(".sign_area .btn_area .btn_gry").attr('tabindex', tidx++);
		} else if(location == "signCert"){
			$(".sign_password_area .cert_lst a").eq(0).attr('tabindex', tidx++);
			$(".password_area #certFrm .input_set strong").attr('tabindex', tidx++);
			$(".password_area #certFrm .input_set input").attr('tabindex', tidx++);
			$(".password_area .btn_area .btn_blu").attr('tabindex', tidx++);
			$(".password_area .btn_area .btn_gry").attr('tabindex', tidx++);
			$(".top_tit_area .title .lang").removeAttr("tabindex");
		} else if(location == "popCheckUi"){
			$(".password_area #certFrm .input_set strong").attr('tabindex', tidx++);
			$(".password_area #certFrm .input_set input").attr('tabindex', tidx++);
			$(".password_area .btn_area .btn_blu").attr('tabindex', tidx++);
			$(".password_area .btn_area .btn_gry").attr('tabindex', tidx++);
		} else if(location == "exportCert" || location == "initImport"){
			$(".browser_export_area_check .top_rac .top_txt").attr('tabindex', tidx++);
			$(".browser_export_area_check .input_set #browserCertCheck_area_data1").attr('tabindex', tidx++);
			$(".browser_export_area_check .input_set #browserCertCheck_area_data2").attr('tabindex', tidx++);
			$(".browser_export_area_check .btn_area .btn_blu ").attr('tabindex', tidx++);
		} else if(location == "viewCertDetail"){
			$(".cert_detail_area .cert_lst a").eq(0).attr('tabindex', tidx++);
			$(".cert_detail_area .btn_area .btn_blu").attr('tabindex', tidx++);
			$(".cert_detail_area .btn_area .btn_gry").attr('tabindex', tidx++);
			for(var i =0; i<$(".table_box table tbody tr").length; i++){
				$(".table_box table tbody tr").eq(i).attr('tabindex', tidx++);
			}
		} else if(location == "certChangePwd"){
			$(".pwd_change_area .cert_lst a").eq(0).attr('tabindex', tidx++);
			$(".pwd_change_area #popChangeFrm .input_set .tit strong").eq(0).attr('tabindex', tidx++);
			$(".pwd_change_area #popChangeFrm .input_set .gry span").eq(0).attr('tabindex', tidx++);
			$(".pwd_change_area #popChangeFrm .input_set3 strong").eq(0).attr('tabindex', tidx++);
			$(".pwd_change_area #popChangeFrm .input_set3 #pop_change_old").attr('tabindex', tidx++);
			$(".pwd_change_area #popChangeFrm .input_set3 strong").eq(1).attr('tabindex', tidx++);
			$(".pwd_change_area #popChangeFrm .input_set3 #pop_change_new").attr('tabindex', tidx++);
			$(".pwd_change_area #popChangeFrm .input_set3 strong").eq(2).attr('tabindex', tidx++);
			$(".pwd_change_area #popChangeFrm .input_set3 #pop_change_new_more").attr('tabindex', tidx++);
			$(".pwd_change_area #popChangeFrm .btn_area .btn_blu").attr('tabindex', tidx++);
			$(".pwd_change_area #popChangeFrm .btn_area .btn_gry").attr('tabindex', tidx++);
		} else if(location == "initIssue"){
			$(".issue_area #issueFrm .input_set strong").eq(0).attr('tabindex', tidx++);
			$(".issue_area #issueFrm .input_set strong").eq(1).attr('tabindex', tidx++);
			$(".issue_area #issueFrm .input_set #issuepwd").attr('tabindex', tidx++);
			$(".issue_area #issueFrm .input_set strong").eq(2).attr('tabindex', tidx++);
			$(".issue_area #issueFrm .input_set #issuepwd_more").attr('tabindex', tidx++);
			$(".issue_area #issueFrm .btn_area .btn_blu").attr('tabindex', tidx++);
			$(".issue_area #issueFrm .btn_area .btn_gry").attr('tabindex', tidx++);
		} else if(location == "certNothing"){
			$(".cert_add_area a").eq(0).attr('tabindex', tidx++);
			$(".cert_add_area p").eq(0).attr('tabindex', tidx++);
		}
		//info_rac 이 있는 경우 info_rac에도 tabindex 설정
		if($(".info_rac").css("display") != "none"){
			if($(".info_rac .info_lst li").length > 0) {
				for(var j = 0; j<$(".info_rac .info_lst li").length; j++){
					$(".info_rac .info_lst li").eq(j).attr('tabindex', tidx++);
				}
			} else if($(".info_rac .info_lst ol").length > 0){
				for(var j = 0; j<$(".info_rac .info_lst ol").length; j++){
					$(".info_rac .info_lst ol").eq(j).attr('tabindex', tidx++);
				}
			}
		}
		// title tabindex 2로 고정
		setTimeout( function(){
			$(".top_tit_area .title .lang").attr("tabindex", "2").focus();
		}, 200);
	},
	// 서명 내용 자세히
	viewAccountInfo : function(dataArr) {
		kslog("setAccountInfo.dataArr", dataArr);
		
		var table_box = $(".sign_area > .table_box");
		$(".sign_area > .table_box").html("").append($("<table/>").attr("class", "type1"));
		
		table_box.find(".type1").append($("<colgroup/>"));
		table_box.find(".type1 > colgroup").append($("<col/>").attr("style", "width: 30%"));
		table_box.find(".type1 > colgroup").append($("<col/>").attr("style", "width: 70%"));
		table_box.find(".type1").append($("<thead/>").append($("<tr/>")));
		table_box.find(".type1 > thead > tr").append($("<th/>", {class: "brln", text: "구분"}));
		table_box.find(".type1 > thead > tr").append($("<th/>").text("값"));		
		table_box.find(".type1").append($("<tbody>"));
		
		var tbody = table_box.find(".type1 > tbody");
		for(var i = 0; i < dataArr.length; i++){
			var data = dataArr[i];
			var trObj = $("<tr>").addClass("sp");
			var thObj = $("<th>").html(data.name);
			var tdObj = $("<td>").html(data.value);
			trObj.append(thObj).append(tdObj);
			tbody.append(trObj);
			
			var nowNo = data.no;
			if(dataArr[i+1] && dataArr[i+1].no && dataArr[i+1].no > nowNo){
				tbody.append('<tr class="dv"><td colspan="2"><span class="dash"></span></td></tr>');
			}
		}
		//$(".account_info").hide();
	},
	
	//	서명 내용 보여줌
	viewSignDetail : function() {
		/* 20200820 박규리 : [웹접근성] 아이폰에서 타이틀명을 이전것을 읽어주는 문제 때문에 "" 추가 */
		$(".top_tit_area .title .lang").eq(0).html("");
		$(".top_tit_area .title .lang").eq(0).html(uiCtrl.getLang("sign_dialog_title"));
	},
	
	// 인증서 암호 입력 ui
	signPassword : function() {
		var show_area = ["sign_password_area", "password_area",".info_rac"];
		ui.init(show_area);
		/* 20200820 박규리 : [웹접근성] 아이폰에서 타이틀명을 이전것을 읽어주는 문제 때문에 "" 추가 */
		$(".top_tit_area .title .lang").eq(0).html("");
		$(".top_tit_area .title .lang").eq(0).html(uiCtrl.getLang("sign_dialog_title"));
		$(".info_lst").empty();
		$(".info_lst").append($("<li>").append(uiCtrl.getLang("new_warn_message")));
	},
	
	// 인증서 관리 ui
	initManage : function(){
		$(".btn_back").off("click").on("click", uiCtrl.winClose);
		var show_area=["manage_area", ".info_rac"];
		ui.init(show_area);
		$("#manage_menu").getDiskList("browser");
		$(".info_lst").empty();
		$(".info_lst").append($("<li>").append(uiCtrl.getLang("mobile_manage_cert_msg_1")));
		$(".info_lst").append($("<li>").append(uiCtrl.getLang("mobile_manage_cert_msg_2")));
		/* 20200820 박규리 : [웹접근성] 아이폰에서 타이틀명을 이전것을 읽어주는 문제 때문에 "" 추가 */
		$(".top_tit_area .title .lang").eq(0).html("");
		$(".top_tit_area .title .lang").eq(0).html(uiCtrl.getLang("manage_cert_dialog_title"));
	},

	// 내보내기 ui
	initExport : function(){
		$(".btn_back").off("click").on("click", uiCtrl.winClose);
		var show_area = ["manage_area", ".info_rac"];
		ui.init(show_area);
		/* 20200820 박규리 : [웹접근성] 아이폰에서 타이틀명을 이전것을 읽어주는 문제 때문에 "" 추가 */
		$(".top_tit_area .title .lang").eq(0).html("");
		$(".top_tit_area .title .lang").eq(0).html(uiCtrl.getLang("export_cert"));
		$("#export_cert").getDiskList("browser");
		$(".info_lst").empty();
		$(".info_lst").append($("<li>").append(uiCtrl.getLang("choice_cert")));
		$(".info_lst").append($("<li>").append(uiCtrl.getLang("proceed_import_cert")));
	},

	// 내보내기 인증코드 ui
	exportBrowserUi : function(){
		var show_area = ["browser_export_area_check",".info_rac"];
		ui.init(show_area);
		$(".browser_export_area_check .import_img").css("display","none");
		/* 20200820 박규리 : [웹접근성] 아이폰에서 타이틀명을 이전것을 읽어주는 문제 때문에 "" 추가 */
		$(".top_tit_area .title .lang").eq(0).html("");
		$(".top_tit_area .title .lang").eq(0).html(uiCtrl.getLang("export_cert"));
		$(".info_lst").empty();
		$(".info_lst").append($("<ol>").append(uiCtrl.getLang("cert_conversion_down")));
		$(".info_lst").append($("<ol>").append(uiCtrl.getLang("export_enter_cert_number")));
	},
	
	//가져오기 ui
	initImport : function(){
		cxsign.policyID = "ImportCert";
		$(".btn_back").on("click", function(e){
			$(this).importCancel();
		});
		$(".browser_export_area_check > .btn_area > .btn_blu").on("click", function(e){
			$(this).importCertInit();
		});
		var show_area = ["browser_export_area_check",".info_rac"];
		ui.init(show_area);
		$(".browser_export_area_check .export_img").css("display","none");
		/* 20200820 박규리 : [웹접근성] 아이폰에서 타이틀명을 이전것을 읽어주는 문제 때문에 "" 추가 */
		$(".top_tit_area .title .lang").eq(0).html("");
		$(".top_tit_area .title .lang").eq(0).html(uiCtrl.getLang("import_cert"));
		$(".info_lst").empty();
		$(".info_lst").append($("<ol>").append(uiCtrl.getLang("cert_conversion_down")));
		$(".info_lst").append($("<ol>").append(uiCtrl.getLang("import_enter_cert_number")));
		/* 20200820 박규리 : [웹접근성] 가져오기화면에서 focus 설정 */
		ui.focus("initImport");
	},

	//인증서발급
	initIssue : function(){
		$(".btn_back").off("click").on("click", function(){
			uiCtrl.winClose();
		});
		$(".issue_area .btn_area .btn_gry").on("click", function(){
			uiCtrl.winClose();
		});	
		$(".issue_area .btn_area .btn_blu").on("click", function(){
			ui.issueInputPassword();
		});
		var show_area = ["issue_area"];
		ui.init(show_area);
		/* 20200820 박규리 : [웹접근성] 아이폰에서 타이틀명을 이전것을 읽어주는 문제 때문에 "" 추가 */
		$(".top_tit_area .title .lang").eq(0).html("");
		$(".top_tit_area .title .lang").eq(0).html(uiCtrl.getLang("request_cert"));
		/* 20200820 박규리 : [웹접근성] 인증서 발급화면에서 focus 설정 */
		ui.focus("initIssue");
	},

	//인증서갱신
	initUpdate : function(){
		$(".btn_back").off("click").on("click", function(){
			uiCtrl.winClose();
		});
		var show_area = ["password_area"];
		ui.init(show_area);
		/* 20200820 박규리 : [웹접근성] 아이폰에서 타이틀명을 이전것을 읽어주는 문제 때문에 "" 추가 */
		$(".top_tit_area .title .lang").eq(0).html("");
		$(".top_tit_area .title .lang").eq(0).html(uiCtrl.getLang("update_cert"));
	},
	
	//비밀번호 입력 화면
	pwdCheckUi : function(){
		if(cxCtrl.isExportCertPage()){
			$(".btn_back").off("click").on("click", ui.initExport);
			$(".password_area > .btn_area > .btn_blu").on("click", function(e){
				$(this).exportCert();
			});
			$(".password_area > .btn_area > .btn_gry").on("click", ui.initExport);
		} else if(cxCtrl.isImportCertPage()){
			$(".btn_back").off("click").on("click", ui.initImport);
			$(".password_area > .btn_area > .btn_blu").on("click", function(e){
				$(this).importCert();
			});
			$(".password_area > .btn_area > .btn_gry").on("click", ui.initImport);
		} else if(cxCtrl.isUpdateCertPage()){
			$(".btn_back").off("click").on("click", ui.initSign);
			$(".password_area > .btn_area > .btn_blu").on("click", function(e){
				$(this).updateCert();
			});
			$(".password_area > .btn_area > .btn_gry").on("click", ui.initSign);
		}
		$(".manage_area").hide();
		$(".info_rac").hide();
		$(".browser_export_area_check").hide();
		$(".top_tit_area .title .lang").eq(0).html("");
		$(".top_tit_area .title .lang").eq(0).html(uiCtrl.getLang("new_password_dialog_title"));
		$("#certpwd").val("");
		$(".password_area").show();
		$(".password_area").show();
		if($(".info_rac").css("display") == "none"){
			$(".info_rac").css("display","block");
			$(".info_lst").empty();
			$(".info_lst").append($("<li>").append(uiCtrl.getLang("new_warn_message")));
		}
		/* 20200820 박규리 : [웹접근성] 인증서 암호 입력화면에서 focus 설정 */
		ui.focus("popCheckUi");
	},

	//인증서 없을 때
	certNothing : function(){
		var show_area = ["cert_add_area",".info_rac"];
		ui.init(show_area);
		$(".info_lst").empty();
		$(".info_lst").append($("<li>").append("브라우저 인증서만 제출 가능합니다."));
		$(".info_lst").append($("<li>").append("브라우저 인증서가 없는 경우, 여기를 클릭해서 인증서 가져오기를 진행하시면 됩니다."));
		$("#btn_plus").off("click").on("click", function(e) {
			ui.initImport();
		});
		/* 20200820 박규리 : [웹접근성] 인증서 없을 때 화면에서 focus 설정 */
		ui.focus("certNothing");
	},
	// 인증서 암호 변경 체크
	popPwdChange : function(callback) {
		$("#popChangeFrm > .btn_area > .btn_blu").off("click").on("click", function(e) {
			if($("#pop_change_old").val() == ""){
				//ui.hiddenAndShow(false);
				ui.alert(uiCtrl.getLang("input_cert_password"));
				return;
			}
			if($("#pop_change_new").val() == ""){
				//ui.hiddenAndShow(false);
				ui.alert(uiCtrl.getLang("new_password_input"));
				return;
			}
			if($("#pop_change_new_more").val() == ""){
				//ui.hiddenAndShow(false);
				ui.alert(uiCtrl.getLang("confirm_new_password_input"));
				return;
			}
			if($("#pop_change_new").val().length < KSBizConfig.certPwdDefaultRule.length){
				//ui.hiddenAndShow(false);
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
							} else {
								encStr.pop_change_old.decFunc = normalDec;	
							}
						}
						if(tmpParam.name == "pop_change_new") {
							encStr.pop_change_new.type = tmpParam.type;
							encStr.pop_change_new.enc = tmpParam.enc;
							if(tmpParam.type == "transkey" || tmpParam.type == "securekey"){
								encStr.pop_change_new.decFunc = function(req){return decode64(transkey_GetDecnxBiz(req))};
							} else {
								encStr.pop_change_new.decFunc = normalDec;	
							}
						}
						if(tmpParam.name == "pop_change_new_more") {
							encStr.pop_change_new_more.type = tmpParam.type;
							encStr.pop_change_new_more.enc = tmpParam.enc;
							if(tmpParam.type == "transkey" || tmpParam.type == "securekey"){
								encStr.pop_change_new_more.decFunc = function(req){return decode64(transkey_GetDecnxBiz(req))};
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
					chkFunc = cxUtil.checkCorrectNormal;
					chkResult = chkFunc(encStr.pop_change_new.enc, chkRule);
					
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
					if(callback) setTimeout(callback(enc.encParams), 5);
	
				} else {
					$("#popChangeFrm")[0].reset();
					ui.alert(uiCtrl.getLang("secure_keyboard_encrypt_error"));
				}
			});
		});
		
		$("#popChangeFrm")[0].reset();
		secureKeyCtrl.initKeypadForm($("#popChangeFrm"));
		//ui.hiddenAndShow(false);
		$(".pop_change").show();
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
	
    checkAuthImg : function(area_nm, gridCertInfo){
		var certList = cxCtrl.getCertList();
		/* 20200820 박규리 : [웹접근성] 인증서를 a태그로 감싸도록 추가 하여 'a' 추가 */
    	$("." +area_nm+" > .cert_lst > a > li").each(function(idx){
			var _obj = certList[idx];
			if(area_nm == "manage_area"){
				var cert = gridCertInfo[idx];
			} else{
				var cert = gridCertInfo;
			}
			if(typeof cert.cloud != "undefined"){
				if(cert.source == "OPENCERT" && cert.cloud){
					if( _obj.expire_status == "EXPIRE" || _obj.expireStatus == "EXPIRE") {
						$(this).addClass('cloud_auth2');
					} else if( _obj.expire_status == "BEFOREEXPIREMONTH" || _obj.expireStatus == "BEFOREEXPIREMONTH") {
						$(this).addClass('cloud_auth1');
					} else {
						$(this).addClass('cloud_auth3');
					}
				} 
			} else{
				if( _obj.expire_status == "EXPIRE" || _obj.expireStatus == "EXPIRE") {
					$(this).addClass('auth2');
				} else if( _obj.expire_status == "BEFOREEXPIREMONTH" || _obj.expireStatus == "BEFOREEXPIREMONTH") {
					$(this).addClass('auth1');
				} else {
					$(this).addClass('auth3');
				}
			}
		});
    },

    // 전자서명 실행
    sign : function(){
		if( $("#certpwd").val() == ""){
			var inputMsg = "";
			inputMsg = uiCtrl.getLang("input_cert_password");
			ui.alert(inputMsg);
			return;
		}
		var signCallback = function(data){
			//alert창 추가하기
			uiCtrl.callbackClose(data);
		}
		// signStorage run
		secureKeyCtrl.encPwdEcrypt({"form":"certFrm","encFields":["certpwd"]}, function(enc){
			kslog("uiAction.sign.enc", enc);
			if(enc && enc.encParams.length > 0){
				var drive = cxCtrl.getCurrentCert().drive;
				var cid = cxCtrl.getCurrentCert().cid;
				var pwdStr = enc.encParams[0].enc;
				var pwdType = enc.encParams[0].type;
				var plain = cxCtrl.getPlainText();
				var options = cxCtrl.getOptions();

				browserCtrl.signStorage("browser", cid, pwdStr, pwdType, plain, options, signCallback);
			} else {
				ui.alert(uiCtrl.getLang("secure_keyboard_encrypt_error"));
				return;
			}
		});
    },
    // 인증서 요약 박스 그리기
    makeCertlTrTxt : function(name, value, liCreate){
		var pageName = $(".top_tit_area .title .lang").eq(0).html();
		if(!liCreate){
			if(pageName == uiCtrl.getLang("cert_detail_view_dialog_title")) {
				var li = $(".cert_detail_area > .cert_lst").find("li");
			} else if(pageName == uiCtrl.getLang("change_password_dialog_title")) {
				var li = $(".pwd_change_area > .cert_lst").find("li");
			} else if(pageName == uiCtrl.getLang("sign_dialog_title")) {
				var li = $(".sign_password_area > .cert_lst").find("li");
			}
		} else{
			var li = liCreate;
		}
    	$(li).find(".txt_box").append($("<div/>").attr("class", "txt_set"));
		$(li).find(".txt_set:last-child").append($("<div/>").attr("class", "lft_box").append($("<span/>", {class: "txt", text: name})));
		
		if(value) {
			if(typeof value == "string" || typeof value == "number") {
				$(li).find(".txt_set:last-child").append($("<div/>").attr("class", "rgt_box").append($("<span/>", {class: "txt", text: uiCtrl.getLang(value)})));
			} else {
				$(li).find(".txt_set:last-child").append($("<div/>").attr("class", "rgt_box").append($("<span/>", {class: "txt", text: uiCtrl.getLang(cxUtil.printArr(value, 1))})));
			}
		} else {
			$(li).find(".txt_set:last-child").append($("<div/>").attr("class", "rgt_box").append($("<span/>", {class: "txt", text: ""})));
		}
	},
	//키패드
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
	//인증서발급
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
				browserCtrl.requestDiskCertificate(data.ca, data.referenceValue, data.secretValue, prdt, prdt_type, uiCtrl.callbackClose)
			} else {
				$("#issueFrm")[0].reset();
				ui.alert(uiCtrl.getLang("secure_keyboard_encrypt_error"));
			}
		});
	},
	cloudClick: function(cloudEvent){
		if(cloudEvent == CXCONST.CLOUD.CONNECT || cloudEvent == CXCONST.CLOUD.DISCONNECT || cloudEvent == CXCONST.CLOUD.REMOVECERTFORMTRAY){
			if(cxCtrl.isManageCertPage() || cxCtrl.isSignPage() || cxCtrl.isUpdateCertPage()){
				$("#manage_menu").getDiskList("browser");
			} else if(cxCtrl.isExportCertPage()){
				$("#export_cert").getDiskList("browser");
			}		
		}
	}
};

// 디스크 인증서 목록
$.fn.getDiskList = function(storage, drive){
	kslog("ui.getDiskList.storage", storage);
	kslog("ui.getDiskList.drive", drive);
	var getDiskListCallback = function(certList){
		kslog("ui.getDiskList.getDiskListCallback.certList", certList);
		
		if(certList){
			// certlist init
			$(".manage_area > .cert_lst").html("");
			cxCtrl.setCurrentCert();
			// certlist listup
			var gridList = [];
			if(certList.certSets.length > 0){
				for(var i in certList.certSets){
					var certObj = certList.certSets[i];
					var li = document.createElement("li");
					/* 20200820 박규리 : [웹접근성] 안드로이드에서 인증서전체가 읽히지 않아 a 태그 추가 */
					$(".manage_area > .cert_lst").append($("<a href='javascript:;' style='display:block'>").append($(li).append($("<div/>").attr("class", "info_area"))));
					$(li).find(".info_area").append($("<strong/>", {
						class: "tit",
						text: certObj.subjectCN
					})).append($("</a>")).append($("<div/>").attr("class", "txt_box"));
					ui.makeCertlTrTxt(uiCtrl.getLang("issuer"), uiCtrl.getLang(certObj.org) ,li);
					if(storage == CXCONST.STORAGE.BROWSER &&
						((certObj.type == "1.2.410.200005.1.1.1" && typeof certObj.subjectDN != "undefined" && certObj.subjectDN.toLowerCase().indexOf("personalb") > -1) || 
			            (certObj.type == "1.2.410.200005.1.1.5" && typeof certObj.subjectDN != "undefined" && certObj.subjectDN.toLowerCase().indexOf("corporation4ecb") > -1))
						
					){
						ui.makeCertlTrTxt(uiCtrl.getLang("purpose"), uiCtrl.getLang(certObj.type + "_b"), li);
					} else {
						ui.makeCertlTrTxt(uiCtrl.getLang("purpose"), uiCtrl.getLang(certObj.type), li);
					}
					ui.makeCertlTrTxt(uiCtrl.getLang("expire_date"), certObj.afterDate, li);
					/* 20200820 박규리 : [웹접근성] 선택되었습니다. 문구 추가 */
					$(li).find(".info_area").append($("<span style='opacity:0' font-size:'0em'>선택되었습니다</span>"));
					if(cxCtrl.isManageCertPage()) {
						$(".manage_area a").each(function(i) {
							$(this).off("click").on("click", function(e) {
								var thisCert = certList.certSets[$(".manage_area a").index($(this))];
								cxCtrl.setCurrentCert(storage, drive, thisCert.cid, thisCert.expire_status);
				    			$(this).viewCertDetail();
				    		});
						});
					} else if(cxCtrl.isSignPage()) {
						$(".manage_area a").each(function(i) {
							$(this).off("click").on("click", function(e) {
								var thisCert = certList.certSets[$(".manage_area a").index($(this))];
								cxCtrl.setCurrentCert(storage, drive, thisCert.cid, thisCert.expire_status);
								if((cxsign.viewArr).length >0){
									$(this).viewSignDetail();
								} else{
									ui.signPassword();
									$(this).signCert();
								}
				    			
				    		});
						});
					} else if(cxCtrl.isExportCertPage() || cxCtrl.isUpdateCertPage()){
						$(".manage_area a").each(function(i) {
							$(this).off("click").on("click", function(e) {
								var thisCert = certList.certSets[$(".manage_area a").index($(this))];
								cxCtrl.setCurrentCert(storage, drive, thisCert.cid, thisCert.expire_status);
				    			ui.pwdCheckUi();
				    		});
						});
					}
					gridList.push(certObj);
				}	
				cxCtrl.setCertList(gridList);
				ui.checkAuthImg("manage_area",certList.certSets);
				/* 20200820 박규리 : [웹접근성] 인증서 목록 보여주는 화면에 focus 설정 */
				ui.focus("getDiskList");
			} else {
				ui.certNothing();
			}
			// 인증서 비밀번호 입력 안내 문구 변경
			//$(".password_area .info_txt").html(uiCtrl.getLang("new_info_for_else"));
			//$(".password_area form .lang").html(uiCtrl.getLang("warning_for_else"));
		}
	}
	// getDiskList run
	browserCtrl.getDiskList(storage, cxCtrl.getOptions(), getDiskListCallback);
}

//인증서 자세히 보기
$.fn.viewCertDetail = function(){
	$(".info_rac").css("display","none");
	var cert = cxCtrl.getCurrentCert();
	viewCertDetailCallback = function(certDetail){
		kslog("certDetail@@", certDetail);
		// init
		$(".btn_back").off("click").on("click", ui.initManage);
		var show_area = ["cert_detail_area"];
		ui.init(show_area);
		/* 20200820 박규리 : [웹접근성] 아이폰에서 타이틀명을 이전것을 읽어주는 문제 때문에 "" 추가 */
		$(".top_tit_area .title .lang").eq(0).html("");
		$(".top_tit_area .title .lang").eq(0).html(uiCtrl.getLang("cert_detail_view_dialog_title"));
		
		// 선택된 인증서
		var li = document.createElement("li");
		$(".cert_detail_area > .cert_lst").html("").append($("<a href='javascript:;' style='display:block'>").append($(li).append($("<div/>").attr("class", "info_area"))));
		$(li).find(".info_area").append($("<strong/>", {
			class: "tit",
			text: certDetail.subjectCN
		})).append($("</a>")).append($("<div/>").attr("class", "txt_box"));
		
		ui.makeCertlTrTxt(uiCtrl.getLang("issuer"), certDetail.issuer.substring(certDetail.issuer.indexOf("=")+1, certDetail.issuer.indexOf(",")));
		if(typeof certDetail.certificatePolicies.Certificate_Policy != "undefined") {
			ui.makeCertlTrTxt(uiCtrl.getLang("purpose"), certDetail.certificatePolicies.Certificate_Policy[0].Policy_Identifier);
		}
		ui.makeCertlTrTxt(uiCtrl.getLang("expire_date"), certDetail.afterDate);
		
		//	버튼 이벤트
		$(".cert_detail_area > .btn_area > a:first-child").off("click").on("click", function(e) {
			$(this).certDelete();
		});
		$(".cert_detail_area > .btn_area > a:last-child").off("click").on("click", function(e) {
			$(this).certChangePwd();
		});
		
		var gridList = [];
		gridList.push(cert);
		cxCtrl.setCertList(gridList);
		ui.checkAuthImg("cert_detail_area",certDetail);
		
		// 자세히
		var table_box = $(".cert_detail_area > .table_box");
		$(".cert_detail_area > .table_box").html("").append($("<table/>").attr("class", "type1"));
		
		table_box.find(".type1").append($("<colgroup/>"));
		table_box.find(".type1 > colgroup").append($("<col/>").attr("style", "width: 30%"));
		table_box.find(".type1 > colgroup").append($("<col/>").attr("style", "width: 70%"));
		
		table_box.find(".type1").append($("<thead/>").append($("<tr/>")));
		table_box.find(".type1 > thead > tr").append($("<th/>", {class: "brln", text: uiCtrl.getLang("name")}));
		table_box.find(".type1 > thead > tr").append($("<th/>").text(uiCtrl.getLang("value")));
		
		table_box.find(".type1").append($("<tbody/>"));
		
		var makeDetailTrTxt = function(name, value){
			table_box.find(".type1 > tbody").append($("<tr/>"));
			table_box.find(".type1 > tbody tr:last-child").append($("<th/>", {class: "brln", text: name}));
			if(value) {
				if(typeof value == "string" || typeof value == "number"){
					table_box.find(".type1 > tbody tr:last-child").append($("<td/>").text(value));
					//table_box.find(".type1 > tbody tr:last-child").append($("<td/>").text(value).css("width", ($(".cert_detail_area > .table_box").width())*0.7));
				} else {
					table_box.find(".type1 > tbody tr:last-child").append($("<td/>").text(cxUtil.printArr(value, 1)));
				}
			} else {
				table_box.find(".type1 > tbody tr:last-child").append($("<td/>"));
			}
		};
		
		makeDetailTrTxt(uiCtrl.getLang("version"), certDetail.version);
		makeDetailTrTxt(uiCtrl.getLang("serial_number"), certDetail.serialNumber);
		if(certDetail.signAlgorithm != ""){
			makeDetailTrTxt(uiCtrl.getLang("sig_algorithm"), certDetail.signAlgorithm);
		}
		if(certDetail.publicAlgorithm != ""){
			makeDetailTrTxt(uiCtrl.getLang("pubkey_algorithm"), certDetail.publicAlgorithm);
		}
		makeDetailTrTxt(uiCtrl.getLang("issuer"), certDetail.issuer.substring(certDetail.issuer.indexOf("=")+1, certDetail.issuer.indexOf(",")));
		makeDetailTrTxt(uiCtrl.getLang("not_before"), certDetail.beforeDate.split(" ")[0]);
		makeDetailTrTxt(uiCtrl.getLang("not_after"), certDetail.afterDate.split(" ")[0]);
		makeDetailTrTxt(uiCtrl.getLang("subject"), certDetail.subject);
		if(certDetail.subjectKeyIdentifier != ""){
			makeDetailTrTxt(uiCtrl.getLang("Subject Key Identifier"), certDetail.subjectKeyIdentifier);
		}
		if(certDetail.keyUsage != ""){
			makeDetailTrTxt(uiCtrl.getLang("Key Usage"), certDetail.keyUsage);
		}
		if(certDetail.certificatePolicies != ""){
			makeDetailTrTxt(uiCtrl.getLang("Certificate Policies"), certDetail.certificatePolicies);
		}
		if(certDetail.cRLDistributionPoints != ""){
			makeDetailTrTxt(uiCtrl.getLang("CRL Distribution Points"), certDetail.cRLDistributionPoints);
		}
		if(certDetail.authorityInfoAccess != ""){
			makeDetailTrTxt(uiCtrl.getLang("Authority Information Access"), certDetail.authorityInfoAccess);
		}
		if(typeof certDetail.source != "undefined"){
			makeDetailTrTxt(uiCtrl.getLang("Source"), certDetail.source);
		}
		if(typeof certDetail.cloud != "undefined"){
			makeDetailTrTxt(uiCtrl.getLang("Cloud"), certDetail.cloud.toString());
		}
		ui.focus("viewCertDetail");
	};
	
	if(cxCtrl.isCurrentCert()){
		browserCtrl.certDiskInfo(cert, viewCertDetailCallback);
	} else {
		ui.alert(uiCtrl.getLang("select_cert"));
	}
}

// 인증서 비밀번호 변경
$.fn.certChangePwd = function(){
	$(".btn_back").off("click").on("click", function() {
		$(this).viewCertDetail();
	});
	var show_area = ["pwd_change_area",".info_rac"];
	ui.init(show_area);
	$(".info_lst").empty();
	$(".info_lst").append($("<li>").append(uiCtrl.getLang("new_warn_message")));
	/* 20200820 박규리 : [웹접근성] 아이폰에서 타이틀명을 이전것을 읽어주는 문제 때문에 "" 추가 */
	$(".top_tit_area .title .lang").eq(0).html("");
	$(".top_tit_area .title .lang").eq(0).html(uiCtrl.getLang("change_password_dialog_title"));
	
	viewCertDetailCallback = function(certDetail){
		// 선택된 인증서
		var li = document.createElement("li");
		$(".pwd_change_area > .cert_lst").html("").append($("<a href='javascript:;' style='display:block'>").append($(li).append($("<div/>").attr("class", "info_area"))));
		$(li).find(".info_area").append($("<strong/>", {
			class: "tit",
			text: certDetail.subjectCN
		})).append($("</a>")).append($("<div/>").attr("class", "txt_box"));
		
		ui.makeCertlTrTxt(uiCtrl.getLang("issuer"), certDetail.issuer.substring(certDetail.issuer.indexOf("=")+1, certDetail.issuer.indexOf(",")));
		if(typeof certDetail.certificatePolicies.Certificate_Policy != "undefined") {
			ui.makeCertlTrTxt(uiCtrl.getLang("purpose"), certDetail.certificatePolicies.Certificate_Policy[0].Policy_Identifier);
		}
		ui.makeCertlTrTxt(uiCtrl.getLang("expire_date"), certDetail.afterDate);
		
		var gridList = [];
		gridList.push(cert);
		cxCtrl.setCertList(gridList);
		ui.checkAuthImg("pwd_change_area",certDetail);

		ui.focus("certChangePwd");
	};
	
	if(cxCtrl.isCurrentCert()){
		var cert = cxCtrl.getCurrentCert();
		browserCtrl.certDiskInfo(cert, viewCertDetailCallback);
		
		// change password callback
		var certChangePwdCallback = function(){
			ui.message(uiCtrl.getLang("changed_password"), function(){
				cxCtrl.setCurrentCert("browser", cxCtrl.getCurrentDrive(), cert.cid, cert.expireStatus);
				//$(cert).viewCertDetail();
				ui.initManage();
			});
		};
		
		ui.popPwdChange(function(enc){
			browserCtrl.changePwdCert(cert.cid, enc[0].enc, enc[0].type, enc[1].enc, enc[1].type, certChangePwdCallback);
		});
		
		$("#popChangeFrm > .btn_area > .btn_gry").on("click", function() {
			browserCtrl.certDiskInfo(cert, viewCertDetailCallback);
			$(this).viewCertDetail();
		});
		 
	} else {
		ui.hiddenAndShow(false);
		ui.alert(uiCtrl.getLang("select_cert"));
	}
	
}

// 인증서 삭제
$.fn.certDelete = function(){
	if(cxCtrl.isCurrentCert()){
		var cert = cxCtrl.getCurrentCert();
		ui.confirm(uiCtrl.getLang("delete_certificate_confirm"), function(){
			// delete callback
			var deleteDiskCertCallback = function(){
				ui.message(uiCtrl.getLang("delete_complete_notify"), function(){
					var storageObj = $("#" + cert.storage);
					storageObj.getDiskList(cert.storage, cert.drive);
					ui.initManage()
				});
			};
			browserCtrl.deleteDiskCert(cert, deleteDiskCertCallback);
		});
	} else {
		ui.alert(uiCtrl.getLang("select_cert"));
	}
	
};

//	서명 내용 보기
$.fn.viewSignDetail = function(){
	//	ui
	var show_area = ["sign_area"];
	ui.init(show_area);
	//	취소 버튼 이벤트
	$(".sign_area .btn_gry").on("click", ui.initSign);
	$(".btn_back").off("click").on("click", ui.initSign);
	
	if(cxCtrl.isCurrentCert()){
		//	확인 버튼 이벤트
		$(".sign_area > .btn_area >.btn_blu ").off("click").on("click", function() {
			ui.signPassword();
			$(this).signCert();
		});
	} else {
		ui.alert(uiCtrl.getLang("select_cert"));
	}
	/* 20200820 박규리 : [웹접근성] 전자 서명 작성 화면에 focus설정 */
	ui.focus("viewSignDetail");
}

//	전자 서명 (비밀번호 넣는 화면보여줌)
$.fn.signCert = function(){
	$(".password_area > .btn_area > .btn_blu").off("click").on("click", ui.sign);
	if((cxsign.viewArr).length > 0){
		$(".password_area > .btn_area > .btn_gry").off("click").on("click", function(){
			$(this).viewSignDetail();
		});
		$(".btn_back").off("click").on("click", function() {
			$(this).viewSignDetail();
		});
	} else{
		$(".password_area > .btn_area > .btn_gry").off("click").on("click", ui.initSign);
		$(".btn_back").off("click").on("click", ui.initSign);
	}
	
	var cert = cxCtrl.getCurrentCert();
	viewCertDetailCallback = function(certDetail){
		// 선택된 인증서
		var li = document.createElement("li");
		$(".sign_password_area > .cert_lst").html("").append($("<a style = 'display:block'>").append($(li).append($("<div/>").attr("class", "info_area"))));
		$(li).find(".info_area").append($("<strong/>", {
			class: "tit",
			text: certDetail.subjectCN
		})).append($("</a>")).append($("<div/>").attr("class", "txt_box"));
		
		ui.makeCertlTrTxt(uiCtrl.getLang("issuer"), certDetail.issuer.substring(certDetail.issuer.indexOf("=")+1, certDetail.issuer.indexOf(",")));
		if(typeof certDetail.certificatePolicies.Certificate_Policy != "undefined") {
			ui.makeCertlTrTxt(uiCtrl.getLang("purpose"), certDetail.certificatePolicies.Certificate_Policy[0].Policy_Identifier);
		}
		ui.makeCertlTrTxt(uiCtrl.getLang("expire_date"), certDetail.afterDate);
		
		var gridList = [];
		gridList.push(cert);
		cxCtrl.setCertList(gridList);
		ui.checkAuthImg("sign_password_area",certDetail);
		/* 20200820 박규리 : [웹접근성] 전자서명 화면에서 focus 설정 */
		ui.focus("signCert");
	}
	
	if(cxCtrl.isCurrentCert()){
		browserCtrl.certDiskInfo(cert, viewCertDetailCallback);
	} else {
		ui.alert(uiCtrl.getLang("select_cert"));
	}
	
}

// 내보내기 실행
$.fn.exportCert = function(){
	$(".browser_export_area_check .btn_blu").on("click", function(){
		uiCtrl.winClose();
		return;
	});
	//비밀번호가 비어있을 경우
	if( $("#certpwd").val() == ""){
		ui.alert(uiCtrl.getLang("input_cert_password"));
	} else{
		var cert = cxCtrl.getCurrentCert();

		var exportInterval;
		var exportIntervalFun = function(data){
			var reqestData = "";
			reqestData = "req="+CXCONST.CERTSYNC.REQUEST.GET_STATUS;
			reqestData += "&acode="+data.acode;
			DC_get(KSBizConfig.browserCertExportUrl, reqestData, function(res){
				if(res != ""){
					res = JSON.parse(res);
					kslog("uiAction.exportCert.GET_STATUS.success_res",res);
					if(res.status == CXCONST.CERTSYNC.STATUS.DONE){
						clearInterval(exportInterval);
						ui.message(uiCtrl.getLang("cert_export_completed"),uiCtrl.winClose);
					} else if(res.status == CXCONST.CERTSYNC.STATUS.CANCEL){
						clearInterval(exportInterval);
						ui.message(uiCtrl.getLang("expired_export_number"), uiCtrl.winClose);
					}
				}
			});
		}
		secureKeyCtrl.encPwdEcrypt({"form":"certFrm","encFields":["certpwd"]}, function(enc){
			kslog("uiAction.exportCert.enc", enc);
			if(enc && enc.encParams.length > 0){
				var storage = cert.storage;
				var drive = cert.drive;
				var cid = cert.cid;
				var pwdStr = enc.encParams[0].enc;
				var pwdType = enc.encParams[0].type;
				var option = cxCtrl.getOptions();
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
								ui.exportBrowserUi();
								var first_data = res.acode.substr(0,KSBizConfig.certSyncAuthLength/2);
								var second_data = res.acode.substr(KSBizConfig.certSyncAuthLength/2);
								$("#browserCertCheck_area_data1").val(first_data);
								$("#browserCertCheck_area_data2").val(second_data);
								$("#browserCertCheck_area_data1").prop('readonly',true);
								$("#browserCertCheck_area_data2").prop('readonly',true);
								if(res.result=="OK"){
									kslog("uiAction.exportCert.UPSYNC_CERT.success_OK_res",res);
									exportInterval = setInterval(function(){exportIntervalFun(res)}, 500);
								} else{
									kslog("uiAction.exportCert.UPSYNC_CERT.success_result_err",res);
									ui.alert(uiCtrl.getLang("cert_export_fail"),uiCtrl.winClose);
								}
							} else{
								//통신 실패
								kslog("uiAction.exportCert.UPSYNC_CERT.error");
								ui.alert(uiCtrl.getLang("replay_txt"),uiCtrl.winClose);
							}
							ui.focus("exportCert");	
						});					
					} else {
						//result값이 없을 때
					}	
				};
				browserCtrl.exportCert(cert.cid, pwdStr, pwdType, "base64", certExportCallback);
			} else {
				ui.alert(uiCtrl.getLang("secure_keyboard_encrypt_error"),uiCtrl.winClose);
				
			}
		});
	}
}

//가져오기
$.fn.importCertInit = function(){
	var importValue1 = $("#browserCertCheck_area_data1").val();
	var importValue2 = $("#browserCertCheck_area_data2").val();
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
	} else {
		var importReqestData = "";
		importReqestData = "req=" + CXCONST.CERTSYNC.REQUEST.GET_STATUS;
		importReqestData += "&acode=" + cxsign.browserCertInfo.value;
		DC_get(KSBizConfig.browserCertExportUrl, importReqestData, function(res){
			if(res != ""){
				res = JSON.parse(res);
				kslog("uiAction.importCertInit.GET_STATUS.success_res", res);
				if(res.status == CXCONST.CERTSYNC.STATUS.UP){
					var downReqestData = "";
					downReqestData = "req=" + CXCONST.CERTSYNC.REQUEST.DOWNSYNC;
					downReqestData += "&acode=" + cxsign.browserCertInfo.value;
					DC_get(KSBizConfig.browserCertExportUrl, downReqestData, function(res){
						if(res != ""){
							res = JSON.parse(res);
							kslog("uiAction.importCertInit.DOWNSYNC_CERT.success_res", res);
							if(res.result=="OK"){
								kslog("uiAction.importCertInit.DOWNSYNC_CERT.success_data",res.data);
								cxsign.browserCertInfo.cert = res.data;
								ui.pwdCheckUi();
							} else {
								// 가져오기 실패
								kslog("uiAction.importCertInit.DOWNSYNC_CERT.success_data_err",res);
								ui.alert(uiCtrl.getLang("unknown_error"));
							}
						} else{
							//통신 실패
							kslog("uiAction.importCertInit.UPSYNC_CERT.error");
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
							kslog("uiAction.importCertInit.CANCEL.success_res", res);
							if(res.result == "OK"){
								kslog("uiAction.importCertInit.CANCEL.success_res", res);
								ui.alert(uiCtrl.getLang("replay_export"));
								if(cxsign.browserCertInfo.cert != ""){
									cxsign.browserCertInfo.cert= "";
									cxsign.browserCertInfo.value= "";
									cxsign.browserCertInfo.value= 0;
								}
								uiCtrl.winClose();
							} else{
								kslog("uiAction.importCertInit.CANCEL.success_res_err", res);
								if(cxsign.browserCertInfo.cert != ""){
									cxsign.browserCertInfo.cert= "";
									cxsign.browserCertInfo.value= "";
									cxsign.browserCertInfo.value= 0;
								}
							}
						} else{
							//통신 실패
							kslog("uiAction.importCertInit.CERTSYNC.error");
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
				kslog("uiAction.importCertInit.UPSYNC_CERT.error");
				uiCtrl.winClose();
			}
		});
	}
}

// 가져오기 실행
$.fn.importCert = function(){
	$("#browserCertCheck_area_data1").val('');
	$("#browserCertCheck_area_data2").val('');
	if( $("#certpwd").val() == ""){
		ui.alert(uiCtrl.getLang("input_cert_password"));
	} else{
		if(cxsign.browserCertInfo.cert != ""){
			var certData = cxsign.browserCertInfo.cert;
			secureKeyCtrl.encPwdEcrypt({"form":"certFrm","encFields":["certpwd"]}, function(enc){
				if(enc && enc.encParams.length > 0){
					var pwdStr = enc.encParams[0].enc;
					var pwdType = enc.encParams[0].type;
					var certType = "p12";
					var certCopyCallback = function(response, error){
						//error : 비밀번호 입력 잘못 했을 경우 - status가 DOWN이 아닐 경우 저장된 인증서는 지우고, 에러메시지 띄워줌
						if(error){
							if(error.status == "0017"){
								if(cxsign.browserCertInfo.pwdCount < KSBizConfig.passwordCounter -1){
									uiCtrl.errorAlert(error, function(){
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
									kslog("uiAction.importCert.DONE.success_res",res);
									var dispose =  function(){
										var disposeReqestData = "";
										disposeReqestData = "req=" + CXCONST.CERTSYNC.REQUEST.DISPOSE;
										disposeReqestData += "&acode=" + cxsign.browserCertInfo.value;
										DC_get(KSBizConfig.browserCertExportUrl, disposeReqestData, function(res){
											if(res != ""){
												res = JSON.parse(res);
												if(res.result == "OK"){
													kslog("uiAction.importCert.DISPOSE.success_res",res);
													cxsign.browserCertInfo.cert= "";
													cxsign.browserCertInfo.value= "";
													cxsign.browserCertInfo.value= 0;
													// cxsign.policyID = "DigitalSign";
													// $(".password_area #certpwd").val('');
													// ui.initSign();
													uiCtrl.winClose();
												} else{
													kslog("uiAction.importCert.certCopyCallback.DISPOSE.success_res_err",res);
												}
											} else{
												//통신 실패
												kslog("uiAction.importCert.UPSYNC_CERT.error");
												uiCtrl.winClose();
											}
										});
									}
									ui.message(uiCtrl.getLang("cert_import_completed"),dispose);	
								} else{
									//통신 실패
									kslog("uiAction.importCert.UPSYNC_CERT.error");
									uiCtrl.winClose();
								}
							});
						}
					};
				};
				browserCtrl.importCert(certType, certData, pwdStr, pwdType, certCopyCallback);	
			});
		} else {
			ui.alert(uiCtrl.getLang("nothing_cert"));
		}
	}
}

//인증서 취소 
$.fn.importCancel = function(){
	if(cxsign.browserCertInfo.cert == ""){
		uiCtrl.winClose();
	} else{
		var cancelReqestData = "";
		cancelReqestData = "req=" + CXCONST.CERTSYNC.REQUEST.CANCEL;
		cancelReqestData += "&acode=" + cxsign.browserCertInfo.value;
		DC_get(KSBizConfig.browserCertExportUrl, cancelReqestData, function(res){
			if(res != ""){
				res = JSON.parse(res);
				kslog("uiAction.browserExportCertUi.CANCEL.success_res", res);
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
				kslog("uiAction.browserImportCertInit_CERTSYNC_error");
				uiCtrl.winClose();
			}
		});
	}
}

//인증서갱신
$.fn.updateCert = function(){
	if( $("#certpwd").val() == ""){
		var inputMsg = "";
		inputMsg = uiCtrl.getLang("input_cert_password");
		ui.alert(inputMsg);
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
			var cid = cxCtrl.getCurrentCert().cid;
			var pwdStr = enc.encParams[0].enc;
			var pwdType = enc.encParams[0].type;
			//새로운 비밀번호 필요
			browserCtrl.updateDiskCertificate(data.ca, cid, pwdStr, pwdType, uiCtrl.callbackClose);
		} else {
			ui.alert(uiCtrl.getLang("secure_keyboard_encrypt_error"));
		}
	});
}