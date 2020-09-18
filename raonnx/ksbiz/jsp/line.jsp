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
	private String xSSReplace(String sid, String certPem)
	{
		String returnSidVal = sid;
		String returnCertPemVal = certPem;
		String retrunVal = "";
		if(sid != null){
			returnSidVal = returnSidVal.replaceAll("&", "&amp;");
			returnSidVal = returnSidVal.replaceAll("#", "&#35;");
			returnSidVal = returnSidVal.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
			returnSidVal = returnSidVal.replaceAll("\\(", "&#40;").replaceAll("\\)", "&#41;");
			returnSidVal = returnSidVal.replaceAll("'", "&#39;");
			returnSidVal = returnSidVal.replaceAll("eval\\((.*)\\)", "");
			returnSidVal = returnSidVal.replaceAll("\"","&#34;");
		}
		if(certPem != null){
			returnCertPemVal = returnCertPemVal.replaceAll("&", "&amp;");
			returnCertPemVal = returnCertPemVal.replaceAll("#", "&#35;");
			returnCertPemVal = returnCertPemVal.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
			returnCertPemVal = returnCertPemVal.replaceAll("\\(", "&#40;").replaceAll("\\)", "&#41;");
			returnCertPemVal = returnCertPemVal.replaceAll("'", "&#39;");
			returnCertPemVal = returnCertPemVal.replaceAll("eval\\((.*)\\)", "");
			returnCertPemVal = returnCertPemVal.replaceAll("\"","&#34;");
			returnCertPemVal = returnCertPemVal.replaceAll("\n","\\\\n");
		}
		retrunVal = "{\"sid\":\""+returnSidVal+"\", \"serverCert\":\""+returnCertPemVal+"\"}";
		return retrunVal;
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
	String sid = ""; 
	try 
	{
		ksobj.libInit();
		KSBizLogger.log("lib init success");
		sid = ksobj.genSid(session.getId());
		certPem = ksobj.getPemServerCert();
		if(ksobj.getErrorCode() != 0)
			throw new KSBizException(ksobj.getErrorMsg(), ksobj.getErrorCode());
		session.setAttribute("KSBIZ_SID", sid);
	}
	catch(KSBizException e) 
	{
		//프로젝트 환경에 맞게 에러처리 필요.
		KSBizLogger.setLog(true);
		KSBizLogger.log("KSBException occured : " + e.getMessage());
		KSBizLogger.setLog(false);
	}
	
	//KSBizLogger.setLog(true);
	//KSBizLogger.log("[SID][RemoteAddr]: " + request.getRemoteAddr() + " [KSBIZ_SID]: " +  session.getAttribute("KSBIZ_SID"));
	KSBizLogger.log("[SERVERCERT][RemoteAddr]: " + request.getRemoteAddr() + " [SERVERCERT]: " +  certPem);
	//KSBizLogger.setLog(false);
%>
<%=xSSReplace(sid,certPem)%>