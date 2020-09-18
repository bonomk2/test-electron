<%@page language="java" contentType="text/html;charset=utf-8" pageEncoding="utf-8"%>
<%@page import="com.raonsecure.ksbiz.*"%>
<%@page import="com.raonsecure.ksbiz.log.*"%>
<%
response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
response.setHeader("Access-Control-Max-Age", "3600");
response.setHeader("Access-Control-Allow-Headers", "x-requested-with");
response.setHeader("Access-Control-Allow-Origin", "*");
%>
<%
	response.setHeader("Cache-Control","no-cache"); 
	response.setHeader("Pragma","no-cache"); 
	response.setDateHeader ("Expires", -1);
%>
<%
	KSBiz_v2 ksobj = new KSBiz_v2();
	String nonce = "";
	try 
	{
		ksobj.libInit();
		KSBizLogger.log("lib init success");
		
		nonce = ksobj.genNonce();
		if(ksobj.getErrorCode() < 0)
			throw new KSBizException(ksobj.getErrorMsg(), ksobj.getErrorCode());
		session.setAttribute("KSBIZ_NONCE", nonce);
	}
	catch(KSBizException e) 
	{
		KSBizLogger.log("KSBException occured : " + e.getMessage());
	}
	
	
	//KSBizLogger.setLog(true);
	KSBizLogger.log("[NONCE][RemoteAddr]: " + request.getRemoteAddr() + " [KSBIZ_NONCE]: " +  session.getAttribute("KSBIZ_NONCE"));
	//KSBizLogger.setLog(false);
%>
<%=nonce%>