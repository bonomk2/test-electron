<%@page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@page import="com.raonsecure.ksbiz.*"%>
<%@page import="com.raonsecure.ksbiz.log.*"%>
<%
response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
response.setHeader("Access-Control-Max-Age", "3600");
response.setHeader("Access-Control-Allow-Headers", "x-requested-with");
response.setHeader("Access-Control-Allow-Origin", "*");
%>
<%!
	private String xSSReplace(String value)
	{
		  String returnVal = value;
		  
		  if(value != null){
			  returnVal = returnVal.replaceAll("&", "&amp;");
			  returnVal = returnVal.replaceAll("#", "&#35;");
			  returnVal = returnVal.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
			  returnVal = returnVal.replaceAll("\\(", "&#40;").replaceAll("\\)", "&#41;");
			  returnVal = returnVal.replaceAll("'", "&#39;");
			  returnVal = returnVal.replaceAll("eval\\((.*)\\)", "");
			  returnVal = returnVal.replaceAll("\"","&#34;");
		  }
		  
		  return returnVal;
	}
%>
<%
	response.setHeader("Cache-Control","no-cache"); 
	response.setHeader("Pragma","no-cache"); 
	response.setDateHeader ("Expires", -1);
%>
<%
	KSBiz_v2 ksobj = new KSBiz_v2();
	String certPem = ""; 
	try 
	{
		ksobj.libInit();
		KSBizLogger.log("lib init success");
		
		certPem = ksobj.getPemServerCert();
		if(ksobj.getErrorCode() != 0)
			throw new KSBizException(ksobj.getErrorMsg(), ksobj.getErrorCode());
	}
	catch(KSBizException e) 
	{
		//프로젝트 환경에 맞게 에러처리 필요.
		KSBizLogger.setLog(true);
		KSBizLogger.log("KSBException occured : " + e.getMessage());
		KSBizLogger.setLog(false);
	}
	
	//KSBizLogger.setLog(true);
	KSBizLogger.log("[SERVERCERT][RemoteAddr]: " + request.getRemoteAddr() + " [SERVERCERT]: " +  certPem);
	//KSBizLogger.setLog(false);
%>
<%=xSSReplace(certPem)%>