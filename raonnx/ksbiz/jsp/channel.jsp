<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="com.raonsecure.ksbiz.*"%>
<%@page import="com.raonsecure.ksbiz.log.*"%>
<%@page import="java.util.Enumeration"%>
<%
//	response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
//	response.setHeader("Access-Control-Max-Age", "3600");
//	response.setHeader("Access-Control-Allow-Headers", "x-requested-with");
//	response.setHeader("Access-Control-Allow-Origin", "*");
	response.setHeader("Cache-Control","no-cache"); 
	response.setHeader("Pragma","no-cache"); 
	response.setDateHeader ("Expires", -1);
%>
<%
	KSBizLogger.setLog(true);
	KSBizLogger.log("---------- Web App(ksbiz_server.jsp) ----------");
	KSBizLogger.logWithTime("[RemoteAddr]: " + request.getRemoteAddr());
	KSBizLogger.logWithTime("[RemoteSessionID]: " + session.getId());

	String output = String.valueOf(KSBizConst.SVR_INTERNAL_ERROR);
	try{
		
		// 1. 요청 정보 확인
		// ksbiz_server.jsp?&msg=data&option=reset
		// parameter {
		// 		required 	msg
		// 		optional 	option
		// }
		String msg = request.getParameter("msg");		
		if(msg == null || msg.equals("")){			
			throw new KSBizException(new String("msg is null."), KSBizConst.SVR_BAD_REQUEST_PARAMS);
		}

		String option = request.getParameter("option");
		if(option == null || option.equals("")){
			option = null;
		}	
		
		// 2. option 처리
		// reset : 세션에 등록된 모든 변수 제거
		else if(option.equals("reset")){
			Enumeration names = session.getAttributeNames();
			while(names.hasMoreElements()) {
				String name = names.nextElement().toString();
				String value = session.getAttribute(name).toString();
				KSBizLogger.logWithTime(name + ":" + value);
				
				session.removeAttribute(name);					
			}
		}
		
		// 3. 모듈 객체 생성
		KSBiz_v2 ksbiz = (KSBiz_v2)session.getAttribute("KSBIZ_OBJ");
		if(ksbiz == null){
	  		ksbiz = new KSBiz_v2();
	  		try {
				ksbiz.libInit();
			}
			catch(KSBizException e)	{				
				throw new KSBizException(new String("init is failed."), KSBizConst.SVR_INTERNAL_ERROR);				
			}		
		}

		// 4. 키 교환 채널 메시지 처리
		try{
			output = ksbiz.processServerMsg(msg);
			session.setAttribute("KSBIZ_OBJ", ksbiz);
		}
		catch(KSBizException e){
			if(e.getErrorCode() == KSBizConst.CHL_KSBIZ_STATUS_ERROR)
				throw new KSBizException(new String("it is in wrong order."), KSBizConst.SVR_STATUS_ERROR);
			else{
				KSBizLogger.logWithTime("KSBException - inner : (" + e.getErrorCode() + ")" + e.getMessage());	
				throw new KSBizException(new String("process is failed."), KSBizConst.SVR_INTERNAL_ERROR);
			}
		}
		
		
	}
	catch(KSBizException e) {
		int err = e.getErrorCode();				
		KSBizLogger.logWithTime("KSBException - outer : (" + e.getErrorCode() + ")" + e.getMessage());	
		
		output = String.valueOf(err);
	}

	KSBizLogger.log("---------- Server Web Application ----------");
	KSBizLogger.setLog(false);
%>
<%=output%>