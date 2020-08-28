<%@ page language="java" contentType="application/json" pageEncoding="euc-kr"%>
<%@ page session="false" %>
<%@ page import="java.io.*,java.util.*,java.lang.*,java.text.*,java.security.SecureRandom,iniline.certsync.*" %>
<%!
	//비활성화된 엔트리 자동 삭제 타임아웃 설정
	//CertSyncTool.REMOVE_TIMEOUT = 1000 * 60 * 10; //10분
%>
<%
	response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
	response.setHeader("Access-Control-Max-Age", "3600");
	response.setHeader("Access-Control-Allow-Headers", "x-requested-with");
	response.setHeader("Access-Control-Allow-Origin", "*");

	response.setHeader("Cache-Control","no-cache"); 
	response.setHeader("Pragma","no-cache"); 
	response.setDateHeader ("Expires", -1);

	out.clear();
	response.setHeader("Cache-Control","no-store");
	response.setHeader("Pragma", "no-cache");
	response.setDateHeader("Expires", 0);
	if(request.getProtocol().equals("HTTP/1.1")) {
		response.setHeader("Cache-Control", "no-cache");
	}
	
	CertSyncTool syncTool = null;
	
	//메모리 저장방식. 서버가 한대일 경우 사용
	syncTool = new MemoryCertSyncTool();
	
	//파일 저장 방식. 여러 서버가 NAS로 파일을 공유하는 환경에서 사용. 
	//syncTool = new FileCertSyncTool( "D:/temp/certsync" );
	
	//메모리 저장방식. 여러 서버가 서로 공유하는 환경. 서버는 10대를 넘을 수 없음. 모든 서버가 반드시 배열의 순서를 똑같이 맞춰야 함
	/*
	syncTool = new MultiServerCertSyncTool( new String[] {
		"http://localhost:8080/CertSync.jsp"
		,"http://localhost:8081/CertSync.jsp"
	} );
	*/
	
	syncTool.dispatch( request, response );
%>