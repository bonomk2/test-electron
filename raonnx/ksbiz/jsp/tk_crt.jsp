<%@ page contentType="text/html; charset=euc-kr" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
</head>
<script type="text/javascript" src="../transkey/transkey.js"></script>
<script type="text/javascript" src="../transkey/rsa_oaep_files/rsa_oaep-min.js"></script>
<script type="text/javascript" src="../transkey/jsbn/jsbn-min.js"></script>
<script type="text/javascript" src="../transkey/TranskeyLibPack_op.js"></script>
<link rel="stylesheet" type="text/css" href="../transkey/transkey.css" />
<script>
transkey_isDraggable = false;
</script>
<body style="overflow-x:hidden; overflow-y:hidden; border:0;" scroll="no">
	<form action="" id="form" name="form" method="post">
	<div id="transkey1" name="transkey1">
		인증서 암호 : <input type="password" id="password_crt"  name="password_crt" data-tk-kbdType="qwerty_crt_native" data-tk-kbdxy="0 -108" style="width:488px" readOnly autocomplete="off" ></input>
	</div>
	</form>
	<span id="setkey"></span><br>
	<span id="result"></span>
	<script>
	var transkey2;
	
		function InitechCrtTransKey(){
            tk_useTranskey = true;
			initTranskey();
            document.getElementById("password_crt").focus();
		}
		
		function onCrtEnter(){
			var encRandomData = new GenKey().GenerateKey(128);
			var chiperData = transkey["password_crt"].getCipherData(encRandomData,"crt");
			callInitechCrt(encRandomData,chiperData);
		}
		
		function callInitechCrt(encRandomData,chiperData){
            var sPort = location.port;
            if(sPort.length<=0){
		        sPort = '80';
		    }
			location.href = "transkey://"+location.hostname+":"+sPort+"/?rand="+encRandomData+"&result="+chiperData;
		}
		
		function onfocusInput(){
			InitechCrtTransKey();
		}

		if(window.attachEvent)
			window.attachEvent("onload",function(){onfocusInput()});
		else
			window.addEventListener("load",function(){onfocusInput();},false);
		
		Transkey.prototype.done = function(){
			tk.now.done();
			tk.close();
			onCrtEnter();
		};
		
	</script>
  </body>
</html>