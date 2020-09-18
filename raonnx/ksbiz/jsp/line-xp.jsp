<%@ page contentType="text/html; charset=utf-8" %>
<%@ page buffer="16kb" %>
<%@ page language="java"%>
<%@ page import="java.io.*" %>
<%@ page import="java.util.*" %>
<%@ page import="java.net.URLEncoder"%>
<%@ page import="org.apache.commons.logging.*" %>
<%@ page import="com.tobesoft.xplatform.data.*" %>
<%@ page import="com.tobesoft.xplatform.tx.*" %>
<%@page import="com.raonsecure.ksbiz.*"%>
<%@page import="com.raonsecure.ksbiz.log.*"%>
<%
response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
response.setHeader("Access-Control-Max-Age", "3600");
response.setHeader("Access-Control-Allow-Headers", "x-requested-with");
response.setHeader("Access-Control-Allow-Origin", "*");
%>
<%!
	private ArrayList<String> xSSReplace(String sid, String certPem)
	{
		String returnSidVal = sid;
		String returnCertPemVal = certPem;
		ArrayList <String> retrunVal = new ArrayList<String>();

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
		retrunVal.add(returnSidVal);
        retrunVal.add(returnCertPemVal);
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
	String serverCert = ""; 
	String serverSid = ""; 
	try 
	{
		ksobj.libInit();
		KSBizLogger.log("lib init success");
		serverSid = ksobj.genSid(session.getId());
		serverCert = ksobj.getPemServerCert();
		if(ksobj.getErrorCode() != 0)
			throw new KSBizException(ksobj.getErrorMsg(), ksobj.getErrorCode());
		session.setAttribute("KSBIZ_SID", serverSid);
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
	KSBizLogger.log("[SERVERCERT][RemoteAddr]: " + request.getRemoteAddr() + " [SERVERCERT]: " +  serverCert);
	//KSBizLogger.setLog(false);
    ArrayList <String> serverReplaceVal = new ArrayList <String>();
    serverReplaceVal = xSSReplace(serverSid,serverCert);

	//------------ OUT Dataset START -------------------------------------------
	VariableList ot_vl = new VariableList();
	DataSetList  ot_dl = new DataSetList();

	try {
		int	row;
		DataSet infods = new DataSet("bizEncInfo");
		infods.addColumn("servercert", DataTypes.STRING, (short)4096);
		infods.addColumn("serversid", DataTypes.STRING, (short)32);

        row = infods.newRow();
        infods.set(row, "servercert", serverReplaceVal.get(1));
        infods.set(row, "serversid", serverReplaceVal.get(0));
		ot_dl.add(infods);

		ot_vl.add("ErrorCode", "0");
		ot_vl.add("ErrorMsg" , "SUCCESS");
	} catch ( Exception e ) {
		ot_vl.add("ErrorCode", "-1");
		ot_vl.add("ErrorMsg" , "FAIL");
	}
	
	ByteArrayOutputStream out1 = new ByteArrayOutputStream();
	PlatformResponse res = new PlatformResponse(out1, PlatformType.CONTENT_TYPE_XML, "utf-8");
	PlatformData pData = new PlatformData();
	pData.setDataSetList(ot_dl);
	pData.setVariableList(ot_vl);

	res.setData(pData);
	res.sendData();
	out1.close();

	String strXMLData = "";
	strXMLData = new String(out1.toByteArray(), "utf-8");	
	out.println(strXMLData);
	//------------ OUT End -------------------------------------------//			
%>