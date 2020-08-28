window.ksBuildDate='2020-02-19 10:10:03.20'; 
//Safari Shim
if( window.crypto && window.crypto.webkitSubtle ) {
/*! WebCrypto API shim v0.1.4, (c) 2015 Artem S Vybornov <vybornov@gmail.com>, opensource.org/licenses/MIT */
!function(e,r){"function"==typeof define&&define.amd?define([],function(){return r(e)}):"object"==typeof module&&module.exports?module.exports=r(e):r(e)}("undefined"!=typeof self?self:this,function(e){"use strict";function r(e){return btoa(e).replace(/\=+$/,"").replace(/\+/g,"-").replace(/\//g,"_")}function t(e){return e+="===",e=e.slice(0,-e.length%4),atob(e.replace(/-/g,"+").replace(/_/g,"/"))}function n(e){for(var r=new Uint8Array(e.length),t=0;t<e.length;t++)r[t]=e.charCodeAt(t);return r}function a(e){return e instanceof ArrayBuffer&&(e=new Uint8Array(e)),String.fromCharCode.apply(String,e)}function o(e){var r={name:(e.name||e||"").toUpperCase().replace("V","v")};switch(r.name){case"SHA-1":case"SHA-256":case"SHA-384":case"SHA-512":break;case"AES-CBC":case"AES-GCM":case"AES-KW":e.length&&(r.length=e.length);break;case"HMAC":e.hash&&(r.hash=o(e.hash)),e.length&&(r.length=e.length);break;case"RSAES-PKCS1-v1_5":e.publicExponent&&(r.publicExponent=new Uint8Array(e.publicExponent)),e.modulusLength&&(r.modulusLength=e.modulusLength);break;case"RSASSA-PKCS1-v1_5":case"RSA-OAEP":e.hash&&(r.hash=o(e.hash)),e.publicExponent&&(r.publicExponent=new Uint8Array(e.publicExponent)),e.modulusLength&&(r.modulusLength=e.modulusLength);break;default:throw new SyntaxError("Bad algorithm name")}return r}function i(e){return{HMAC:{"SHA-1":"HS1","SHA-256":"HS256","SHA-384":"HS384","SHA-512":"HS512"},"RSASSA-PKCS1-v1_5":{"SHA-1":"RS1","SHA-256":"RS256","SHA-384":"RS384","SHA-512":"RS512"},"RSAES-PKCS1-v1_5":{"":"RSA1_5"},"RSA-OAEP":{"SHA-1":"RSA-OAEP","SHA-256":"RSA-OAEP-256"},"AES-KW":{128:"A128KW",192:"A192KW",256:"A256KW"},"AES-GCM":{128:"A128GCM",192:"A192GCM",256:"A256GCM"},"AES-CBC":{128:"A128CBC",192:"A192CBC",256:"A256CBC"}}[e.name][(e.hash||{}).name||e.length||""]}function u(e){(e instanceof ArrayBuffer||e instanceof Uint8Array)&&(e=JSON.parse(decodeURIComponent(escape(a(e)))));var r={kty:e.kty,alg:e.alg,ext:e.ext||e.extractable};switch(r.kty){case"oct":r.k=e.k;case"RSA":["n","e","d","p","q","dp","dq","qi","oth"].forEach(function(t){t in e&&(r[t]=e[t])});break;default:throw new TypeError("Unsupported key type")}return r}function s(e,r){if(e instanceof ArrayBuffer&&(e=new Uint8Array(e)),r||(r={pos:0,end:e.length}),r.end-r.pos<2||r.end>e.length)throw new RangeError("Malformed DER");var t=e[r.pos++],n=e[r.pos++];if(n>=128){if(n&=127,r.end-r.pos<n)throw new RangeError("Malformed DER");for(var o=0;n--;)o<<=8,o|=e[r.pos++];n=o}if(r.end-r.pos<n)throw new RangeError("Malformed DER");var i;switch(t){case 2:i=e.subarray(r.pos,r.pos+=n);break;case 3:if(e[r.pos++])throw new Error("Unsupported bit string");n--;case 4:i=new Uint8Array(e.subarray(r.pos,r.pos+=n)).buffer;break;case 5:i=null;break;case 6:var u=btoa(a(e.subarray(r.pos,r.pos+=n)));if(!(u in d))throw new Error("Unsupported OBJECT ID "+u);i=d[u];break;case 48:i=[];for(var c=r.pos+n;r.pos<c;)i.push(s(e,r));break;default:throw new Error("Unsupported DER tag 0x"+t.toString(16))}return i}function c(e,r){r||(r=[]);var t=0,a=0,o=r.length+2;if(r.push(0,0),e instanceof Uint8Array){t=2,a=e.length;for(u=0;u<a;u++)r.push(e[u])}else if(e instanceof ArrayBuffer){t=4,a=e.byteLength,e=new Uint8Array(e);for(u=0;u<a;u++)r.push(e[u])}else if(null===e)t=5,a=0;else if("string"==typeof e&&e in S){var i=n(atob(S[e]));t=6,a=i.length;for(u=0;u<a;u++)r.push(i[u])}else if(e instanceof Array){for(u=0;u<e.length;u++)c(e[u],r);t=48,a=r.length-o}else{if(!("object"==typeof e&&3===e.tag&&e.value instanceof ArrayBuffer))throw new Error("Unsupported DER value "+e);t=3,a=(e=new Uint8Array(e.value)).byteLength,r.push(0);for(var u=0;u<a;u++)r.push(e[u]);a++}if(a>=128){var s=a,a=4;for(r.splice(o,0,s>>24&255,s>>16&255,s>>8&255,255&s);a>1&&!(s>>24);)s<<=8,a--;a<4&&r.splice(o,4-a),a|=128}return r.splice(o-2,2,t,a),r}function p(e,r,t,n){Object.defineProperties(this,{_key:{value:e},type:{value:e.type,enumerable:!0},extractable:{value:void 0===t?e.extractable:t,enumerable:!0},algorithm:{value:void 0===r?e.algorithm:r,enumerable:!0},usages:{value:void 0===n?e.usages:n,enumerable:!0}})}function l(e){return"verify"===e||"encrypt"===e||"wrapKey"===e}function y(e){return"sign"===e||"decrypt"===e||"unwrapKey"===e}if("function"!=typeof Promise)throw"Promise support required";var f=e.crypto||e.msCrypto;if(f){var h=f.subtle||f.webkitSubtle;if(h){var g=e.Crypto||f.constructor||Object,A=e.SubtleCrypto||h.constructor||Object,m=(e.CryptoKey||e.Key||Object,e.navigator.userAgent.indexOf("Edge/")>-1),b=!!e.msCrypto&&!m,w=!f.subtle&&!!f.webkitSubtle;if(b||w){var d={KoZIhvcNAQEB:"1.2.840.113549.1.1.1"},S={"1.2.840.113549.1.1.1":"KoZIhvcNAQEB"};if(["generateKey","importKey","unwrapKey"].forEach(function(e){var c=h[e];h[e]=function(g,A,m){var d,S,v,k=[].slice.call(arguments);switch(e){case"generateKey":d=o(g),S=A,v=m;break;case"importKey":d=o(m),S=k[3],v=k[4],"jwk"===g&&((A=u(A)).alg||(A.alg=i(d)),A.key_ops||(A.key_ops="oct"!==A.kty?"d"in A?v.filter(y):v.filter(l):v.slice()),k[1]=function(e){var r=u(e);return b&&(r.extractable=r.ext,delete r.ext),n(unescape(encodeURIComponent(JSON.stringify(r)))).buffer}(A));break;case"unwrapKey":d=k[4],S=k[5],v=k[6],k[2]=m._key}if("generateKey"===e&&"HMAC"===d.name&&d.hash)return d.length=d.length||{"SHA-1":512,"SHA-256":512,"SHA-384":1024,"SHA-512":1024}[d.hash.name],h.importKey("raw",f.getRandomValues(new Uint8Array(d.length+7>>3)),d,S,v);if(w&&"generateKey"===e&&"RSASSA-PKCS1-v1_5"===d.name&&(!d.modulusLength||d.modulusLength>=2048))return g=o(g),g.name="RSAES-PKCS1-v1_5",delete g.hash,h.generateKey(g,!0,["encrypt","decrypt"]).then(function(e){return Promise.all([h.exportKey("jwk",e.publicKey),h.exportKey("jwk",e.privateKey)])}).then(function(e){return e[0].alg=e[1].alg=i(d),e[0].key_ops=v.filter(l),e[1].key_ops=v.filter(y),Promise.all([h.importKey("jwk",e[0],d,!0,e[0].key_ops),h.importKey("jwk",e[1],d,S,e[1].key_ops)])}).then(function(e){return{publicKey:e[0],privateKey:e[1]}});if((w||b&&"SHA-1"===(d.hash||{}).name)&&"importKey"===e&&"jwk"===g&&"HMAC"===d.name&&"oct"===A.kty)return h.importKey("raw",n(t(A.k)),m,k[3],k[4]);if(w&&"importKey"===e&&("spki"===g||"pkcs8"===g))return h.importKey("jwk",function(e){var t=s(e),n=!1;t.length>2&&(n=!0,t.shift());var o={ext:!0};switch(t[0][0]){case"1.2.840.113549.1.1.1":var i=["n","e","d","p","q","dp","dq","qi"],u=s(t[1]);n&&u.shift();for(var c=0;c<u.length;c++)u[c][0]||(u[c]=u[c].subarray(1)),o[i[c]]=r(a(u[c]));o.kty="RSA";break;default:throw new TypeError("Unsupported key type")}return o}(A),m,k[3],k[4]);if(b&&"unwrapKey"===e)return h.decrypt(k[3],m,A).then(function(e){return h.importKey(g,e,k[4],k[5],k[6])});var K;try{K=c.apply(h,k)}catch(e){return Promise.reject(e)}return b&&(K=new Promise(function(e,r){K.onabort=K.onerror=function(e){r(e)},K.oncomplete=function(r){e(r.target.result)}})),K=K.then(function(e){return"HMAC"===d.name&&(d.length||(d.length=8*e.algorithm.length)),0==d.name.search("RSA")&&(d.modulusLength||(d.modulusLength=(e.publicKey||e).algorithm.modulusLength),d.publicExponent||(d.publicExponent=(e.publicKey||e).algorithm.publicExponent)),e=e.publicKey&&e.privateKey?{publicKey:new p(e.publicKey,d,S,v.filter(l)),privateKey:new p(e.privateKey,d,S,v.filter(y))}:new p(e,d,S,v)})}}),["exportKey","wrapKey"].forEach(function(e){var o=h[e];h[e]=function(s,p,f){var g=[].slice.call(arguments);switch(e){case"exportKey":g[1]=p._key;break;case"wrapKey":g[1]=p._key,g[2]=f._key}if((w||b&&"SHA-1"===(p.algorithm.hash||{}).name)&&"exportKey"===e&&"jwk"===s&&"HMAC"===p.algorithm.name&&(g[0]="raw"),!w||"exportKey"!==e||"spki"!==s&&"pkcs8"!==s||(g[0]="jwk"),b&&"wrapKey"===e)return h.exportKey(s,p).then(function(e){return"jwk"===s&&(e=n(unescape(encodeURIComponent(JSON.stringify(u(e)))))),h.encrypt(g[3],f,e)});var A;try{A=o.apply(h,g)}catch(e){return Promise.reject(e)}return b&&(A=new Promise(function(e,r){A.onabort=A.onerror=function(e){r(e)},A.oncomplete=function(r){e(r.target.result)}})),"exportKey"===e&&"jwk"===s&&(A=A.then(function(e){return(w||b&&"SHA-1"===(p.algorithm.hash||{}).name)&&"HMAC"===p.algorithm.name?{kty:"oct",alg:i(p.algorithm),key_ops:p.usages.slice(),ext:!0,k:r(a(e))}:((e=u(e)).alg||(e.alg=i(p.algorithm)),e.key_ops||(e.key_ops="public"===p.type?p.usages.filter(l):"private"===p.type?p.usages.filter(y):p.usages.slice()),e)})),!w||"exportKey"!==e||"spki"!==s&&"pkcs8"!==s||(A=A.then(function(e){return e=function(e){var r,a=[["",null]],o=!1;switch(e.kty){case"RSA":for(var i=["n","e","d","p","q","dp","dq","qi"],u=[],s=0;s<i.length&&i[s]in e;s++){var p=u[s]=n(t(e[i[s]]));128&p[0]&&(u[s]=new Uint8Array(p.length+1),u[s].set(p,1))}u.length>2&&(o=!0,u.unshift(new Uint8Array([0]))),a[0][0]="1.2.840.113549.1.1.1",r=u;break;default:throw new TypeError("Unsupported key type")}return a.push(new Uint8Array(c(r)).buffer),o?a.unshift(new Uint8Array([0])):a[1]={tag:3,value:a[1]},new Uint8Array(c(a)).buffer}(u(e))})),A}}),["encrypt","decrypt","sign","verify"].forEach(function(e){var r=h[e];h[e]=function(t,n,a,i){if(b&&(!a.byteLength||i&&!i.byteLength))throw new Error("Empy input is not allowed");var u=[].slice.call(arguments),s=o(t);if(b&&"decrypt"===e&&"AES-GCM"===s.name){var c=t.tagLength>>3;u[2]=(a.buffer||a).slice(0,a.byteLength-c),t.tag=(a.buffer||a).slice(a.byteLength-c)}u[1]=n._key;var p;try{p=r.apply(h,u)}catch(e){return Promise.reject(e)}return b&&(p=new Promise(function(r,t){p.onabort=p.onerror=function(e){t(e)},p.oncomplete=function(t){t=t.target.result;if("encrypt"===e&&t instanceof AesGcmEncryptResult){var n=t.ciphertext,a=t.tag;(t=new Uint8Array(n.byteLength+a.byteLength)).set(new Uint8Array(n),0),t.set(new Uint8Array(a),n.byteLength),t=t.buffer}r(t)}})),p}}),b){var v=h.digest;h.digest=function(e,r){if(!r.byteLength)throw new Error("Empy input is not allowed");var t;try{t=v.call(h,e,r)}catch(e){return Promise.reject(e)}return t=new Promise(function(e,r){t.onabort=t.onerror=function(e){r(e)},t.oncomplete=function(r){e(r.target.result)}})},e.crypto=Object.create(f,{getRandomValues:{value:function(e){return f.getRandomValues(e)}},subtle:{value:h}}),e.CryptoKey=p}w&&(f.subtle=h,e.Crypto=g,e.SubtleCrypto=A,e.CryptoKey=p)}}}});
}// Generated by Haxe 3.4.7
(function ($hx_exports, $global) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var DateTools = function() { };
DateTools.__name__ = ["DateTools"];
DateTools.__format_get = function(d,e) {
	switch(e) {
	case "%":
		return "%";
	case "A":
		return DateTools.DAY_NAMES[d.getDay()];
	case "B":
		return DateTools.MONTH_NAMES[d.getMonth()];
	case "C":
		return StringTools.lpad(Std.string(d.getFullYear() / 100 | 0),"0",2);
	case "D":
		return DateTools.__format(d,"%m/%d/%y");
	case "F":
		return DateTools.__format(d,"%Y-%m-%d");
	case "I":case "l":
		var hour = d.getHours() % 12;
		return StringTools.lpad(Std.string(hour == 0 ? 12 : hour),e == "I" ? "0" : " ",2);
	case "M":
		return StringTools.lpad(Std.string(d.getMinutes()),"0",2);
	case "R":
		return DateTools.__format(d,"%H:%M");
	case "S":
		return StringTools.lpad(Std.string(d.getSeconds()),"0",2);
	case "T":
		return DateTools.__format(d,"%H:%M:%S");
	case "Y":
		return Std.string(d.getFullYear());
	case "a":
		return DateTools.DAY_SHORT_NAMES[d.getDay()];
	case "b":case "h":
		return DateTools.MONTH_SHORT_NAMES[d.getMonth()];
	case "d":
		return StringTools.lpad(Std.string(d.getDate()),"0",2);
	case "e":
		return Std.string(d.getDate());
	case "H":case "k":
		return StringTools.lpad(Std.string(d.getHours()),e == "H" ? "0" : " ",2);
	case "m":
		return StringTools.lpad(Std.string(d.getMonth() + 1),"0",2);
	case "n":
		return "\n";
	case "p":
		if(d.getHours() > 11) {
			return "PM";
		} else {
			return "AM";
		}
		break;
	case "r":
		return DateTools.__format(d,"%I:%M:%S %p");
	case "s":
		return Std.string(d.getTime() / 1000 | 0);
	case "t":
		return "\t";
	case "u":
		var t = d.getDay();
		if(t == 0) {
			return "7";
		} else if(t == null) {
			return "null";
		} else {
			return "" + t;
		}
		break;
	case "w":
		return Std.string(d.getDay());
	case "y":
		return StringTools.lpad(Std.string(d.getFullYear() % 100),"0",2);
	default:
		throw new js__$Boot_HaxeError("Date.format %" + e + "- not implemented yet.");
	}
};
DateTools.__format = function(d,f) {
	var r_b = "";
	var p = 0;
	while(true) {
		var np = f.indexOf("%",p);
		if(np < 0) {
			break;
		}
		var len = np - p;
		r_b += len == null ? HxOverrides.substr(f,p,null) : HxOverrides.substr(f,p,len);
		r_b += Std.string(DateTools.__format_get(d,HxOverrides.substr(f,np + 1,1)));
		p = np + 2;
	}
	var len1 = f.length - p;
	r_b += len1 == null ? HxOverrides.substr(f,p,null) : HxOverrides.substr(f,p,len1);
	return r_b;
};
DateTools.format = function(d,f) {
	return DateTools.__format(d,f);
};
var EReg = function(r,opt) {
	this.r = new RegExp(r,opt.split("u").join(""));
};
EReg.__name__ = ["EReg"];
EReg.prototype = {
	match: function(s) {
		if(this.r.global) {
			this.r.lastIndex = 0;
		}
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) {
			return this.r.m[n];
		} else {
			throw new js__$Boot_HaxeError("EReg::matched");
		}
	}
	,__class__: EReg
};
var Exception = function(msg,cause) {
	this.message = msg;
	this.cause = cause;
};
Exception.__name__ = ["Exception"];
Exception.prototype = {
	getMessage: function() {
		return this.message;
	}
	,getCause: function() {
		return this.cause;
	}
	,toString: function() {
		return Type.getClassName(js_Boot.getClass(this)) + "(" + (this.message == null ? "" : this.message + ")");
	}
	,__class__: Exception
};
var HxOverrides = function() { };
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.dateStr = function(date) {
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var h = date.getHours();
	var mi = date.getMinutes();
	var s = date.getSeconds();
	return date.getFullYear() + "-" + (m < 10 ? "0" + m : "" + m) + "-" + (d < 10 ? "0" + d : "" + d) + " " + (h < 10 ? "0" + h : "" + h) + ":" + (mi < 10 ? "0" + mi : "" + mi) + ":" + (s < 10 ? "0" + s : "" + s);
};
HxOverrides.strDate = function(s) {
	var _g = s.length;
	switch(_g) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d["setTime"](0);
		d["setUTCHours"](k[0]);
		d["setUTCMinutes"](k[1]);
		d["setUTCSeconds"](k[2]);
		return d;
	case 10:
		var k1 = s.split("-");
		return new Date(k1[0],k1[1] - 1,k1[2],0,0,0);
	case 19:
		var k2 = s.split(" ");
		var y = k2[0].split("-");
		var t = k2[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw new js__$Boot_HaxeError("Invalid date format : " + s);
	}
};
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) {
		return undefined;
	}
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(len == null) {
		len = s.length;
	} else if(len < 0) {
		if(pos == 0) {
			len = s.length + len;
		} else {
			return "";
		}
	}
	return s.substr(pos,len);
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var LZZerorize = function() { };
LZZerorize.__name__ = ["LZZerorize"];
LZZerorize.pus = function(a) {
	if(a != null) {
		LZZerorize.list.push(a);
	}
};
LZZerorize.z = function() {
	var _g = 0;
	var _g1 = LZZerorize.list;
	while(_g < _g1.length) {
		var bb = _g1[_g];
		++_g;
		var _g3 = 0;
		var _g2 = bb.length;
		while(_g3 < _g2) {
			var i = _g3++;
			bb.b[i] = 0;
		}
	}
	LZZerorize.list = [];
};
var List = function() { };
List.__name__ = ["List"];
var Log = function() { };
Log.__name__ = ["Log"];
Log.registerTracer = function() {
	Log.orgTrace = haxe_Log.trace;
	haxe_Log.trace = Log.ksTrace;
};
Log.ksTrace = function(v,inf) {
	if(inf != null) {
		var level = Log.DEFAULT_LEVEL;
		if(inf.customParams != null && inf.customParams.length > 0) {
			try {
				var lastParam = inf.customParams[inf.customParams.length - 1];
				if(typeof(lastParam) == "number" && ((lastParam | 0) === lastParam)) {
					level = lastParam;
				}
			} catch( e ) {
			}
		}
		var tag = Log._TAGS[level];
		var msg = tag + "] " + DateTools.format(new Date(),"%H:%M:%S") + " [" + inf.className + "." + inf.methodName + ":" + inf.lineNumber + "] " + Std.string(v);
		Log.HBUF.push(msg);
		if(Log.HBUF.length > 20) {
			Log.HBUF.shift();
		}
		if(level < Log.FILTER_LEVEL) {
			return;
		}
		window.console.log(msg);
	} else {
		Log.orgTrace(v,{ fileName : "Log.hx", lineNumber : 48, className : "Log", methodName : "ksTrace"});
	}
};
Log.getTag = function(level) {
	return Log._TAGS[level];
};
Math.__name__ = ["Math"];
var Reflect = function() { };
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		return null;
	}
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) {
			a.push(f);
		}
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	if(typeof(f) == "function") {
		return !(f.__name__ || f.__ename__);
	} else {
		return false;
	}
};
Reflect.isObject = function(v) {
	if(v == null) {
		return false;
	}
	var t = typeof(v);
	if(!(t == "string" || t == "object" && v.__enum__ == null)) {
		if(t == "function") {
			return (v.__name__ || v.__ename__) != null;
		} else {
			return false;
		}
	} else {
		return true;
	}
};
Reflect.deleteField = function(o,field) {
	if(!Object.prototype.hasOwnProperty.call(o,field)) {
		return false;
	}
	delete(o[field]);
	return true;
};
Reflect.copy = function(o) {
	var o2 = { };
	var _g = 0;
	var _g1 = Reflect.fields(o);
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		o2[f] = Reflect.field(o,f);
	}
	return o2;
};
var Std = function() { };
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) {
		v = parseInt(x);
	}
	if(isNaN(v)) {
		return null;
	}
	return v;
};
var StringBuf = function() {
	this.b = "";
};
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	__class__: StringBuf
};
var StringTools = function() { };
StringTools.__name__ = ["StringTools"];
StringTools.startsWith = function(s,start) {
	if(s.length >= start.length) {
		return HxOverrides.substr(s,0,start.length) == start;
	} else {
		return false;
	}
};
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	if(!(c > 8 && c < 14)) {
		return c == 32;
	} else {
		return true;
	}
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) ++r;
	if(r > 0) {
		return HxOverrides.substr(s,r,l - r);
	} else {
		return s;
	}
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) ++r;
	if(r > 0) {
		return HxOverrides.substr(s,0,l - r);
	} else {
		return s;
	}
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.lpad = function(s,c,l) {
	if(c.length <= 0) {
		return s;
	}
	while(s.length < l) s = c + s;
	return s;
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	while(true) {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
		if(!(n > 0)) {
			break;
		}
	}
	if(digits != null) {
		while(s.length < digits) s = "0" + s;
	}
	return s;
};
var Type = function() { };
Type.__name__ = ["Type"];
Type.getClassName = function(c) {
	var a = c.__name__;
	if(a == null) {
		return null;
	}
	return a.join(".");
};
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	case 9:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7],args[8]);
	case 10:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7],args[8],args[9]);
	case 11:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7],args[8],args[9],args[10]);
	case 12:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7],args[8],args[9],args[10],args[11]);
	case 13:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7],args[8],args[9],args[10],args[11],args[12]);
	case 14:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7],args[8],args[9],args[10],args[11],args[12],args[13]);
	default:
		throw new js__$Boot_HaxeError("Too many arguments");
	}
};
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
};
var csafe_SignAndVerifier = function() { };
csafe_SignAndVerifier.__name__ = ["csafe","SignAndVerifier"];
csafe_SignAndVerifier.prototype = {
	__class__: csafe_SignAndVerifier
};
var app_CMPSignAndVerifier = function() {
	this.attrs = new haxe_ds_StringMap();
};
app_CMPSignAndVerifier.__name__ = ["app","CMPSignAndVerifier"];
app_CMPSignAndVerifier.__interfaces__ = [csafe_SignAndVerifier];
app_CMPSignAndVerifier.createForNewIssue = function(stor,pubKeyAlgo,option,rHandle) {
	pubKeyAlgo.generateKey(option,rHandle.chain("CMPContext.generateIR.generateKey").ok(function(generatedKeyPair) {
		var csav = new app_CMPSignAndVerifier();
		var generatedPrivateRandom = new haxe_io_Bytes(new ArrayBuffer(20));
		new csafe_math_prng_Random().nextBytes(generatedPrivateRandom,0,20);
		csav.storage = stor;
		var _this = csav.attrs;
		if(__map_reserved["random"] != null) {
			_this.setReserved("random",generatedPrivateRandom);
		} else {
			_this.h["random"] = generatedPrivateRandom;
		}
		csav.pusavk = generatedKeyPair.publicKey;
		csav.ppsavk = generatedKeyPair.privateKey;
		csav.pubKey = csafe_x509_X509PublicKeyInfo.struct.create(null,csav.pusavk);
		rHandle.onOk(csav);
	},{ fileName : "CMPSignAndVerifier.hx", lineNumber : 73, className : "app.CMPSignAndVerifier", methodName : "createForNewIssue"}));
};
app_CMPSignAndVerifier.prototype = {
	getCertificate: function() {
		throw new js__$Boot_HaxeError(new Exception("CMPSignAndVerifier.getCertificate must not called"));
	}
	,getAttribute: function(id) {
		var _this = this.attrs;
		var key = id;
		if(__map_reserved[key] != null) {
			return _this.getReserved(key);
		} else {
			return _this.h[key];
		}
	}
	,getPublicKey: function() {
		return this.pubKey;
	}
	,sign: function(algo,data,rHandle) {
		csafe_asn1_impl_AlgorithmID.derive(algo).sign(this.ppsavk,data,rHandle);
	}
	,verify: function(algo,data,source,rHandle) {
		csafe_asn1_impl_AlgorithmID.derive(algo).verify(this.pusavk,data,source,rHandle);
	}
	,saveToStorage: function(spec,issuedCert,rHandle) {
		var pkcs8PrivKey = csafe_pkcs_pkcs8_PKCS8PrivateKey.struct.create(null,this.ppsavk);
		pkcs8PrivKey.addAttribute(csafe_asn1_ObjectID.id_randomNum,csafe_asn1_ASN1Primitive.createBitString(this.getAttribute("random")));
		spec.data = { cert : issuedCert, priv : pkcs8PrivKey.encode()};
		app_certstorage_CertResolver.saveResolvedSet(spec,$bind(rHandle,rHandle.onOk),$bind(rHandle,rHandle.onErr));
	}
	,__class__: app_CMPSignAndVerifier
};
var haxe_IMap = function() { };
haxe_IMap.__name__ = ["haxe","IMap"];
var haxe_ds_StringMap = function() {
	this.h = { };
};
haxe_ds_StringMap.__name__ = ["haxe","ds","StringMap"];
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	setReserved: function(key,value) {
		if(this.rh == null) {
			this.rh = { };
		}
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) {
			return null;
		} else {
			return this.rh["$" + key];
		}
	}
	,keys: function() {
		return HxOverrides.iter(this.arrayKeys());
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) {
			out.push(key);
		}
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) {
				out.push(key.substr(1));
			}
			}
		}
		return out;
	}
	,__class__: haxe_ds_StringMap
};
var app_CertOID = function() { };
app_CertOID.__name__ = ["app","CertOID"];
app_CertOID.init = function() {
	app_CertOID.oidMap = new haxe_ds_StringMap();
	app_CertOID.register("1.2.410.200005.1.1.1","01","yessign",app_CertOID.TYPE_PERSONAL,"범용");
	app_CertOID.register("1.2.410.200005.1.1.4","04","yessign",app_CertOID.TYPE_PERSONAL,"은행/보험/신용카드용");
	app_CertOID.register("1.2.410.200005.1.1.5","05","yessign",app_CertOID.TYPE_COPOR,"법인 범용");
	app_CertOID.register("1.2.410.200005.1.1.2","02","yessign",app_CertOID.TYPE_COPOR,"은행/보험/신용카드용");
	app_CertOID.register("1.2.410.200005.1.1.6.3","63","yessign",app_CertOID.TYPE_SPECIAL,"법인 조달청 구매업무용");
	app_CertOID.register("1.2.410.200005.1.1.6.5","65","yessign",app_CertOID.TYPE_SPECIAL,"법인 재정경제부 고액 현금거래 보고 업무용");
	app_CertOID.register("1.2.410.200005.1.1.6.8","68","yessign",app_CertOID.TYPE_COPOR,"기업 전자세금용");
	app_CertOID.register("1.2.410.200005.1.1.3","03","yessign",app_CertOID.TYPE_COPOR,"서버용(SSL)");
	app_CertOID.register("1.2.410.200005.1.1.6.X","6X","yessign",app_CertOID.TYPE_COPOR,"법인 용도 제한용");
	app_CertOID.register("1.2.410.200004.5.2.1.2","01","KICA",app_CertOID.TYPE_PERSONAL,"범용(1등급)");
	app_CertOID.register("1.2.410.200004.5.2.1.7.1","04","KICA",app_CertOID.TYPE_PERSONAL,"은행용");
	app_CertOID.register("1.2.410.200004.5.2.1.7.2","06","KICA",app_CertOID.TYPE_PERSONAL,"증권용");
	app_CertOID.register("1.2.410.200004.5.2.1.7.2","03","KICA",app_CertOID.TYPE_PERSONAL,"신용카드용");
	app_CertOID.register("1.2.410.200004.5.2.1.1","05","KICA",app_CertOID.TYPE_COPOR,"범용(1등급)");
	app_CertOID.register("1.2.410.200004.5.1.1.5","01","SignKorea",app_CertOID.TYPE_PERSONAL,"상호연동(범용)");
	app_CertOID.register("1.2.410.200004.5.1.1.9","06","SignKorea",app_CertOID.TYPE_PERSONAL,"증권용");
	app_CertOID.register("1.2.410.200004.5.1.1.7","05","SignKorea",app_CertOID.TYPE_COPOR,"상호연동(범용)");
	app_CertOID.register("1.2.410.200004.5.4.1.1","01","CrossCert",app_CertOID.TYPE_PERSONAL,"상호연동(범용)");
	app_CertOID.register("1.2.410.200004.5.4.1.101","04","CrossCert",app_CertOID.TYPE_PERSONAL,"은행용");
	app_CertOID.register("1.2.410.200004.5.4.1.102","06","CrossCert",app_CertOID.TYPE_PERSONAL,"은행용");
	app_CertOID.register("1.2.410.200004.5.4.1.103","03","CrossCert",app_CertOID.TYPE_PERSONAL,"신용카드 은행용");
	app_CertOID.register("1.2.410.200004.5.4.1.104","","CrossCert",app_CertOID.TYPE_PERSONAL,"전자민원 은행용");
	app_CertOID.register("1.2.410.200004.5.4.1.2","02","CrossCert",app_CertOID.TYPE_COPOR,"법인 상호연동(범용)");
	app_CertOID.register("1.2.410.200012.1.1.1","01","TradeSign",app_CertOID.TYPE_PERSONAL,"상호연동(범용)");
	app_CertOID.register("1.2.410.200012.1.1.101","04","TradeSign",app_CertOID.TYPE_PERSONAL,"은행용");
	app_CertOID.register("1.2.410.200012.1.1.103","13","TradeSign",app_CertOID.TYPE_PERSONAL,"증권용");
	app_CertOID.register("1.2.410.200012.1.1.103","13","TradeSign",app_CertOID.TYPE_PERSONAL,"신용카드용");
	app_CertOID.register("1.2.410.200012.1.1.3","05","TradeSign",app_CertOID.TYPE_COPOR,"상호연동(범용)");
	app_CertOID.register("1.2.410.200004.5.3.1.1","05","NCASign",app_CertOID.TYPE_GOVER,"상호연동(범용)");
	app_CertOID.register("1.2.410.200004.5.3.1.2","05","NCASign",app_CertOID.TYPE_COPOR,"상호연동(범용)");
	app_CertOID.register("1.2.410.200004.5.3.1.9","01","NCASign",app_CertOID.TYPE_PERSONAL,"상호연동(범용)");
	app_CertOID.register("1.2.410.200004.2.201","04","NCASign",app_CertOID.TYPE_PERSONAL,"용도제한");
	app_CertOID.register("1.2.410.100001.2.1.1","00","GPKI",app_CertOID.TYPE_GOVER,"전자관인");
	app_CertOID.register("1.2.410.100001.2.1.2","00","GPKI",app_CertOID.TYPE_GOVER,"컴퓨터용");
	app_CertOID.register("1.2.410.100001.2.1.3","00","GPKI",app_CertOID.TYPE_GOVER,"특수목적용");
	app_CertOID.register("1.2.410.100001.2.1.4","00","GPKI",app_CertOID.TYPE_GOVER,"공공/민간전자관인");
	app_CertOID.register("1.2.410.100001.2.1.5","00","GPKI",app_CertOID.TYPE_GOVER,"공공/민간컴퓨터용");
	app_CertOID.register("1.2.410.100001.2.1.6","00","GPKI",app_CertOID.TYPE_GOVER,"공공/민간특수목적용");
	app_CertOID.register("1.2.410.100001.2.2.1","00","GPKI",app_CertOID.TYPE_PERSONAL,"공무원");
	app_CertOID.register("1.2.410.100001.2.2.2","00","GPKI",app_CertOID.TYPE_PERSONAL,"공공/민간용");
	app_CertOID.register("1.2.410.200004.5.5.1.1","01","INIPASS",app_CertOID.TYPE_PERSONAL,"범용");
	app_CertOID.register("1.2.410.200004.5.5.1.2","02","INIPASS",app_CertOID.TYPE_COPOR,"법인 범용");
	app_CertOID.register("1.2.410.200004.5.5.1.3.1","04","INIPASS",app_CertOID.TYPE_PERSONAL,"개인 제휴제한");
	app_CertOID.register("1.2.410.200004.5.5.1.4.1","05","INIPASS",app_CertOID.TYPE_COPOR,"법인 제휴제한");
	app_CertOID.register("1.2.410.200004.5.5.1.4.2","05","INIPASS",app_CertOID.TYPE_COPOR,"법인 전자세금제한");
	app_CertOID.register("1.2.410.100001.5.3.1.3","01","EPKI",app_CertOID.TYPE_PERSONAL,"개인");
	app_CertOID.register("1.2.410.300001.2.2.2","01","MPKI",app_CertOID.TYPE_PERSONAL,"개인");
	return 99;
};
app_CertOID.isNPKI = function(cert) {
	var certPolicies = cert.getResolvedExtension(csafe_x509_ext_CertificatePolicies);
	var cipherName = cert.getPublicKey().getAlgorithm().getCipherName();
	if(certPolicies != null && certPolicies.getPolicyInformations().length > 0 && certPolicies.getPolicyInformations()[0].getPolicyIdentifier() != null && cipherName != null) {
		var oid = certPolicies.getPolicyInformations()[0].getPolicyIdentifier().oid;
		if((StringTools.startsWith(oid,"1.2.410.200005.1.1.") || StringTools.startsWith(oid,"1.2.410.200004.5.2.1.") || StringTools.startsWith(oid,"1.2.410.200004.5.1.1.") || StringTools.startsWith(oid,"1.2.410.200004.5.4.1.") || StringTools.startsWith(oid,"1.2.410.200012.1.1.") || StringTools.startsWith(oid,"1.2.410.200004.") || StringTools.startsWith(oid,"1.2.410.200004.5.5.1") || StringTools.startsWith(oid,"1.2.410.100001.2.2.") || StringTools.startsWith(oid,"1.2.410.100001.5.3.1.3") || StringTools.startsWith(oid,"1.2.410.300001.2.2.2")) && cipherName.toLowerCase() == "rsa") {
			return true;
		}
	}
	return false;
};
app_CertOID.register = function(oid,code,org,type,usage) {
	var desc = app_CertOID.getKrOrg(org) + " " + app_CertOID.getKrType(type) + " " + usage;
	var _this = app_CertOID.oidMap;
	var value = { code : code, org : org, type : type, usage : usage, desc : desc};
	if(__map_reserved[oid] != null) {
		_this.setReserved(oid,value);
	} else {
		_this.h[oid] = value;
	}
};
app_CertOID.getKrOrg = function(name) {
	var wName = name.toLowerCase();
	if(wName == "yessign") {
		return "금융결제원";
	} else if(wName == "kica" || wName == "signgate") {
		return "한국정보인증";
	} else if(wName == "signkorea") {
		return "코스콤";
	} else if(wName == "crosscert") {
		return "한국전자인증";
	} else if(wName == "tradesign") {
		return "한국무역정보통신";
	} else if(wName == "ncasign") {
		return "한국정보사회진흥원";
	} else if(wName == "gpki") {
		return "행정전자서명";
	} else if(wName == "epki") {
		return "교육부";
	} else if(wName == "mpki") {
		return "국방인증관리센터";
	} else {
		return "알수없음";
	}
};
app_CertOID.getKrType = function(type) {
	if(type == app_CertOID.TYPE_PERSONAL) {
		return "개인";
	} else if(type == app_CertOID.TYPE_COPOR) {
		return "법인";
	} else if(type == app_CertOID.TYPE_GOVER) {
		return "기관";
	} else if(type == app_CertOID.TYPE_SPECIAL) {
		return "특수";
	} else {
		return "알수없음";
	}
};
app_CertOID.getSpec = function(oid) {
	if(app_CertOID.inited != 99) {
		app_CertOID.inited = app_CertOID.init();
	}
	var _this = app_CertOID.oidMap;
	var rSpec = __map_reserved[oid] != null ? _this.getReserved(oid) : _this.h[oid];
	if(rSpec == null) {
		rSpec = { code : "00", org : "Unknown", type : 4, usage : "알수없음", desc : "알수없음"};
	}
	return rSpec;
};
app_CertOID.toString = function(oid) {
	if(app_CertOID.inited != 99) {
		app_CertOID.inited = app_CertOID.init();
	}
	var spec = app_CertOID.getSpec(oid);
	return app_CertOID.getKrOrg(spec.org) + " " + app_CertOID.getKrType(spec.type) + " " + Std.string(spec.usage);
};
var app_ErrorCodes = function() { };
app_ErrorCodes.__name__ = ["app","ErrorCodes"];
app_ErrorCodes.remap = function(method,req,resp) {
	var remapError = { };
	var code = resp;
	if(typeof(resp) != "string" && Object.prototype.hasOwnProperty.call(resp,"code")) {
		code = Reflect.field(resp,"code");
		var dCode = Reflect.field(resp,"errorDetail");
		var _g = 0;
		var _g1 = Reflect.fields(resp);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			remapError[f] = Reflect.field(resp,f);
		}
		if((code == null ? "null" : "" + code) == "2423") {
			code = "not_yessign";
		}
		if((code == null ? "null" : "" + code) == "2212") {
			code = "cloud_password_exceed";
		}
		if((code == null ? "null" : "" + code) == "2424") {
			code = "cloud_expire_cert";
		}
		if(Reflect.field(resp,"errorDetail")) {
			var errDetail = Reflect.field(resp,"errorDetail");
			if(Std.string(errDetail.code) == "2203") {
				code = "check_api_key";
			}
		}
	}
	if(typeof(code) == "string") {
		var eCode = Reflect.field(app_ErrorCodes.codeMap,code);
		if(eCode != null) {
			if(method == "updateCertCredential" && eCode == "0017") {
				eCode = "005D";
			}
			if(method == "updateCert" && eCode == "0017") {
				eCode = "0058";
			}
			remapError.status = eCode + "0000";
		} else {
			if(method == "issueCert") {
				remapError.status = "00550000";
			} else if(method == "updateCert") {
				remapError.status = "00570000";
			} else {
				remapError.status = "99990000";
			}
			remapError.message = code;
		}
		return remapError;
	}
	return resp;
};
var haxe_ds_IntMap = function() {
	this.h = { };
};
haxe_ds_IntMap.__name__ = ["haxe","ds","IntMap"];
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
haxe_ds_IntMap.prototype = {
	remove: function(key) {
		if(!this.h.hasOwnProperty(key)) {
			return false;
		}
		delete(this.h[key]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) if(this.h.hasOwnProperty(key)) {
			a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe_ds_IntMap
};
var app_JsonFFI = function() { };
app_JsonFFI.__name__ = ["app","JsonFFI"];
app_JsonFFI.callJS = function(method,message,callback) {
	XWC.fromEngine[method](message,callback,function(err) {
		callback(err);
	});
};
app_JsonFFI.removeExpiredCallback = function(timeout) {
	var removed = 0;
	var idx = app_JsonFFI.extCallbackMap.keys();
	while(idx.hasNext()) {
		var idx1 = idx.next();
		var callbackInfo = app_JsonFFI.extCallbackMap.h[idx1];
		if(callbackInfo != null) {
			if(new Date().getTime() - callbackInfo.time > timeout) {
				app_JsonFFI.extCallbackMap.remove(idx1);
				++removed;
			}
		}
	}
	return removed;
};
app_JsonFFI.nextCallbackIdx = function() {
	app_JsonFFI.removeExpiredCallback(app_JsonFFI.expireTimeout);
	var tryCount = 0;
	while(true) {
		if(++tryCount > app_JsonFFI.BUFFER_NUM) {
			if(app_JsonFFI.removeExpiredCallback(app_JsonFFI.expireTimeout / 3) == 0) {
				return -1;
			}
		}
		app_JsonFFI.extCallbackIdxCount++;
		if(app_JsonFFI.extCallbackIdxCount > app_JsonFFI.BUFFER_NUM) {
			app_JsonFFI.extCallbackIdxCount = 0;
		}
		if(app_JsonFFI.extCallbackMap.h[app_JsonFFI.extCallbackIdxCount] == null) {
			break;
		}
	}
	return app_JsonFFI.extCallbackIdxCount;
};
app_JsonFFI.callJSCallback = function(method,request,callback) {
	var callbackId = -1;
	var callRequest_callbackId;
	var callRequest_method = method;
	var callRequest_request = request;
	if(callback != null) {
		callbackId = app_JsonFFI.nextCallbackIdx();
		if(callbackId == -1) {
			callback({ status : "error", error : "callback_buffer_exceed"});
			return;
		}
		app_JsonFFI.extCallbackMap.h[callbackId] = callback;
		callRequest_callbackId = callbackId;
	}
	haxe_Log.trace("Can't support callback",{ fileName : "JsonFFI.hx", lineNumber : 105, className : "app.JsonFFI", methodName : "callJSCallback"});
};
app_JsonFFI.onJSCallback = function(response) {
	var callbackIdx = response.ffid;
	var callback = app_JsonFFI.extCallbackMap.h[callbackIdx];
	if(callback != null) {
		app_JsonFFI.extCallbackMap.remove(callbackIdx);
		callback(response.data);
	} else {
		haxe_Log.trace("Not exist callback(" + callbackIdx + ") : " + Std.string(response),{ fileName : "JsonFFI.hx", lineNumber : 121, className : "app.JsonFFI", methodName : "onJSCallback"});
	}
};
var app_KeySharpMain = $hx_exports["XWCCore"] = function() { };
app_KeySharpMain.__name__ = ["app","KeySharpMain"];
app_KeySharpMain.callJS = function(method,message,callback) {
	if(method == "onEngineInvokedCallback") {
		haxe_Log.trace("Response : " + Std.string(message),{ fileName : "KeySharpMain.hx", lineNumber : 66, className : "app.KeySharpMain", methodName : "callJS"});
	} else if(callback != null) {
		haxe_Log.trace("JsCall (" + method + ") (expect callback) : " + Std.string(message),{ fileName : "KeySharpMain.hx", lineNumber : 69, className : "app.KeySharpMain", methodName : "callJS"});
	} else {
		haxe_Log.trace("JsCall (" + method + ") : " + Std.string(message),{ fileName : "KeySharpMain.hx", lineNumber : 71, className : "app.KeySharpMain", methodName : "callJS"});
	}
	XWC.fromEngine[method](message,callback,function(err) {
		callback(err);
	});
};
app_KeySharpMain.onJSCallback = function(response,onOK,onError) {
	if(typeof(response) == "string") {
		response = JSON.parse(response);
	}
	app_JsonFFI.onJSCallback(response.request);
};
app_KeySharpMain.copyBrowserCert = function(spec,onOK,onError) {
	app_certstorage_CertResolver.loadResolvedSet(spec,function(result) {
		if(result.meta.syncResult == "not_yessign") {
			onError("not_yessign");
		} else {
			onOK(result.meta);
		}
	},onError);
};
app_KeySharpMain.sign = function(spec,onOK,onError) {
	var options = spec.options;
	if(options == null) {
		options = { };
	}
	if(options.resetCertificate == true) {
		js_Browser.getSessionStorage().removeItem("XWC_CCID");
	}
	if(options.CrossWebFunc != null) {
		app_KeySharpMain.procSFilter(spec,onOK,onError);
		return;
	}
	app_certstorage_CertResolver.resolveSAV(spec,function(sav) {
		var rHandle = common_ResultHandler.create("KeySharpMain.sign").err(onError,{ fileName : "KeySharpMain.hx", lineNumber : 124, className : "app.KeySharpMain", methodName : "sign"});
		var signAlgo = csafe_asn1_impl_AlgorithmID.rsaEncryption;
		if("rsaEncryption" == options.signAlgorithm) {
			signAlgo = csafe_asn1_impl_AlgorithmID.rsaEncryption;
		} else if("preferRsaPSS" == options.signAlgorithm) {
			signAlgo = csafe_asn1_impl_AlgorithmID.rsaPSS;
		} else {
			haxe_Log.trace("Unknown sign Algorithm : " + Std.string(options.signAlgorithm),{ fileName : "KeySharpMain.hx", lineNumber : 132, className : "app.KeySharpMain", methodName : "sign"});
			signAlgo = csafe_asn1_impl_AlgorithmID.rsaEncryption;
		}
		var signedAttrs = options.signedAttribute != null ? (js_Boot.__cast(options.signedAttribute , String)).split(",") : [];
		if(options.dataType == "sha256-md") {
			var sd = csafe_pkcs_pkcs7_SignedData.struct.create();
			sd.addHashAlgorithm(csafe_asn1_impl_AlgorithmID.sha256);
			var attrs = [];
			if(util_StringUtil.isExist(signedAttrs,"signingTime")) {
				var signTime = new csafe_asn1_impl_ChoiceOfTime();
				signTime.setDate(new Date());
				attrs.push(new csafe_asn1_impl_Attribute(csafe_asn1_ObjectID.signingTime,signTime));
			}
			var rHandle2 = rHandle.chain("KeySharpMain.sign.sign").ok(function() {
				var cInfo = new csafe_pkcs_ContentInfo();
				cInfo.setContent(csafe_asn1_ObjectID.pkcs7_signedData,sd);
				var rHandle21 = haxe_crypto_Base64.encode(cInfo.encode());
				var rHandle22 = haxe_crypto_Base64.encode(sav.getAttribute("random"));
				onOK({ signedData : rHandle21, vidRandom : rHandle22});
			},{ fileName : "KeySharpMain.hx", lineNumber : 146, className : "app.KeySharpMain", methodName : "sign"});
			var tmp = util_Hex.toBytes(spec.data);
			sd.addSignHashed(tmp,csafe_asn1_impl_AlgorithmID.rsaEncryption,sav,attrs,rHandle2);
		} else if(options.dataType == "strings" || options.dataType == "form-urlencoded" || options.dataType == "base64" || util_StringUtil.isNull(options.dataType)) {
			var plainTextFull = spec.data;
			if(plainTextFull == null) {
				plainTextFull = "";
			}
			var plainTextArr;
			if(options.multiSign == true) {
				plainTextArr = plainTextFull.split(spec.options.multiSignDelimiter);
			} else {
				plainTextArr = [plainTextFull];
			}
			if(plainTextArr.length <= 0) {
				onError("no_plaintext");
				return;
			}
			if(util_StringUtil.isExist(signedAttrs,"format")) {
				var _g1 = 0;
				var _g = plainTextArr.length;
				while(_g1 < _g) {
					var i = _g1++;
					var s = options.format;
					plainTextArr[i] += "&__USER_CONFIRM_FORMAT=" + encodeURIComponent(s);
				}
			}
			if(util_StringUtil.isExist(signedAttrs,"certStoreType")) {
				var _g11 = 0;
				var _g2 = plainTextArr.length;
				while(_g11 < _g2) {
					var i1 = _g11++;
					plainTextArr[i1] += "&__CERT_STORE_MEDIA_TYPE=" + (js_Boot.__cast(spec.storage , String)).toUpperCase();
				}
			}
			var retData = null;
			if(options.signType == "PKCS1") {
				var p1SignHandler = rHandle.chain("KeySharpMain.sign.sign");
				p1SignHandler.ok(function(signed) {
					if(retData == null) {
						if(options.cacheCert == true) {
							js_Browser.getSessionStorage().setItem("XWC_CCID",sav.getAttribute("cid"));
						}
						if(options.signAlgorithm == null || options.signAlgorithm == "preferRsaPSS") {
							options.signAlgorithm = "rsaPSS";
						}
						retData = { signedData : haxe_crypto_Base64.encode(signed), dataType : "sign", rawData : haxe_crypto_Base64.encode(haxe_io_Bytes.ofString(spec.data)), signAlgorithm : options.signAlgorithm, signer : haxe_crypto_Base64.encode(haxe_io_Bytes.ofString(util_PEM.encode("CERTIFICATE",sav.getCertificate().encode()))), vidRandom : haxe_crypto_Base64.encode(sav.getAttribute("random"))};
					} else {
						retData.signedData += Std.string(spec.options.multiSignDelimiter) + haxe_crypto_Base64.encode(signed);
					}
					if(plainTextArr.length > 0) {
						var tmp1 = haxe_io_Bytes.ofString(plainTextArr.shift());
						sav.sign(signAlgo,tmp1,p1SignHandler);
					} else {
						onOK(retData);
					}
				},{ fileName : "KeySharpMain.hx", lineNumber : 185, className : "app.KeySharpMain", methodName : "sign"});
				if(signAlgo.equalsOID(csafe_asn1_impl_AlgorithmID.rsaEncryption)) {
					signAlgo = csafe_asn1_impl_AlgorithmID.sha256WithRSAEncryption;
				}
				var rawBB;
				if(options.encoding == "euckr") {
					var rawBB1 = JSTextEncoder("euc-kr",{ "NONSTANDARD_allowLegacyEncoding" : true});
					var rawBB2 = plainTextArr.shift();
					rawBB = haxe_io_Bytes.ofData(rawBB1.encode(rawBB2));
				} else {
					rawBB = haxe_io_Bytes.ofString(plainTextArr.shift());
				}
				sav.sign(signAlgo,rawBB,p1SignHandler);
			} else {
				var sd1 = null;
				var p7SignHandler = rHandle.chain("KeySharpMain.sign.sign");
				p7SignHandler.ok(function() {
					var cInfo1 = new csafe_pkcs_ContentInfo();
					cInfo1.setContent(csafe_asn1_ObjectID.pkcs7_signedData,sd1);
					if(retData == null) {
						if(options.cacheCert == true) {
							js_Browser.getSessionStorage().setItem("XWC_CCID",sav.getAttribute("cid"));
						}
						retData = { signedData : haxe_crypto_Base64.encode(cInfo1.encode()), vidRandom : haxe_crypto_Base64.encode(sav.getAttribute("random"))};
					} else {
						retData.signedData += Std.string(spec.options.multiSignDelimiter) + haxe_crypto_Base64.encode(cInfo1.encode());
					}
					if(plainTextArr.length > 0) {
						sd1 = csafe_pkcs_pkcs7_SignedData.struct.create();
						sd1.addHashAlgorithm(csafe_asn1_impl_AlgorithmID.sha256);
						var tmp2 = csafe_asn1_ObjectID.pkcs7_data;
						var tmp3 = plainTextArr.shift();
						sd1.setContentInfo(tmp2,tmp3);
						var attrs1 = [];
						if(util_StringUtil.isExist(signedAttrs,"signingTime")) {
							var signTime1 = new csafe_asn1_impl_ChoiceOfTime();
							signTime1.setDate(new Date());
							attrs1.push(new csafe_asn1_impl_Attribute(csafe_asn1_ObjectID.signingTime,signTime1));
						}
						sd1.addSign(signAlgo,sav,attrs1,p7SignHandler);
					} else {
						onOK(retData);
					}
				},{ fileName : "KeySharpMain.hx", lineNumber : 224, className : "app.KeySharpMain", methodName : "sign"});
				sd1 = csafe_pkcs_pkcs7_SignedData.struct.create();
				sd1.addHashAlgorithm(csafe_asn1_impl_AlgorithmID.sha256);
				var tmp4 = csafe_asn1_ObjectID.pkcs7_data;
				var tmp5 = plainTextArr.shift();
				sd1.setContentInfo(tmp4,tmp5);
				var attrs2 = [];
				if(util_StringUtil.isExist(signedAttrs,"signingTime")) {
					var signTime2 = new csafe_asn1_impl_ChoiceOfTime();
					signTime2.setDate(new Date());
					attrs2.push(new csafe_asn1_impl_Attribute(csafe_asn1_ObjectID.signingTime,signTime2));
				}
				sd1.addSign(signAlgo,sav,attrs2,p7SignHandler);
			}
		} else {
			onError("invalid_sign_option : dataType:" + Std.string(options.dataType));
			return;
		}
	},onError);
};
app_KeySharpMain.procSFilter = function(spec,onOK,onError) {
	var options = spec.options;
	var policyMap = options.policyMap;
	app_certstorage_CertResolver.resolveSAV(spec,function(sav) {
		var secureNonceBytes = haxe_io_Bytes.ofString(policyMap.SecureNonce);
		var tri_digestedNonce = util_CryptUtil.repeatHash(new csafe_crypto_hash_Sha256(),secureNonceBytes,3);
		var encKey = tri_digestedNonce.sub(0,16);
		var encIv = tri_digestedNonce.sub(16,16);
		var certB64 = "-----BEGIN CERTIFICATE-----\n" + haxe_crypto_Base64.encode(sav.getCertificate().encode()) + "\n-----END CERTIFICATE-----\n";
		var privRand = sav.getAttribute("random");
		var rHandle = common_ResultHandler.create("procSFilter.sign").err(onError,{ fileName : "KeySharpMain.hx", lineNumber : 286, className : "app.KeySharpMain", methodName : "procSFilter"});
		var tmp = csafe_asn1_impl_AlgorithmID.sha256WithRSAEncryption;
		var tmp1 = rHandle.ok(function(signed) {
			var tmp2 = csafe_asn1_impl_AlgorithmID.seed_CBC;
			var tmp3 = rHandle.chain("randEnc").ok(function(encrypted) {
				var randB64 = haxe_crypto_Base64.encode(encrypted);
				var authB64 = haxe_crypto_Base64.encode(signed);
				var signMode = policyMap.SignatureMode;
				if(signMode == null) {
					var data = "_shttp_client_certificate_=" + encodeURIComponent(certB64) + "&_shttp_client_auth_info_=" + encodeURIComponent(authB64) + "&_shttp_client_vid_random_=" + encodeURIComponent(randB64);
					onOK(data);
				} else {
					var signAlgo = csafe_asn1_impl_AlgorithmID.rsaEncryption;
					var sd = null;
					sd = csafe_pkcs_pkcs7_SignedData.struct.create();
					sd.addHashAlgorithm(csafe_asn1_impl_AlgorithmID.sha256);
					sd.setContentInfo(csafe_asn1_ObjectID.pkcs7_data,js_Boot.__cast(spec.data , String));
					var attrs = [];
					var signTime = new csafe_asn1_impl_ChoiceOfTime();
					signTime.setDate(new Date());
					attrs.push(new csafe_asn1_impl_Attribute(csafe_asn1_ObjectID.signingTime,signTime));
					var tmp4 = rHandle.chain("procSFilter.sign7").ok(function() {
						var cInfo = new csafe_pkcs_ContentInfo();
						cInfo.setContent(csafe_asn1_ObjectID.pkcs7_signedData,sd);
						var signB64 = haxe_crypto_Base64.encode(cInfo.encode());
						var data1 = "_shttp_client_certificate_=" + encodeURIComponent(certB64) + "&_shttp_client_auth_info_=" + encodeURIComponent(authB64) + "&_shttp_client_vid_random_=" + encodeURIComponent(randB64) + "&_shttp_client_plaintext_=" + "&_shttp_client_signature_=" + encodeURIComponent(signB64);
						onOK(data1);
					},{ fileName : "KeySharpMain.hx", lineNumber : 307, className : "app.KeySharpMain", methodName : "procSFilter"});
					sd.addSign(signAlgo,sav,attrs,tmp4);
				}
			},{ fileName : "KeySharpMain.hx", lineNumber : 288, className : "app.KeySharpMain", methodName : "procSFilter"});
			tmp2.encrypt(encKey,privRand,{ iv : encIv},tmp3);
		},{ fileName : "KeySharpMain.hx", lineNumber : 287, className : "app.KeySharpMain", methodName : "procSFilter"}).err(onError,{ fileName : "KeySharpMain.hx", lineNumber : 287, className : "app.KeySharpMain", methodName : "procSFilter"});
		sav.sign(tmp,secureNonceBytes,tmp1);
	},onError);
};
app_KeySharpMain.issueCert = function(spec,onOK,onError) {
	if(spec.org == "inilineCA") {
		onError("not_support_cmp");
	} else {
		haxe_Log.trace("IssueCert spec : " + Std.string(spec),{ fileName : "KeySharpMain.hx", lineNumber : 331, className : "app.KeySharpMain", methodName : "issueCert"});
		var ctx = new csafe_cmp_CMPContext(spec.org);
		ctx.set_orgName(spec.orgName);
		ctx.set_url(spec.cmpUrl);
		var tmp = haxe_io_Bytes.ofString(spec.refnum);
		ctx.set_senderKID(tmp);
		var tmp1 = haxe_io_Bytes.ofString(spec.authcode);
		ctx.set_authCode(tmp1);
		var rHandle = common_ResultHandler.create("Main.issueCert.generateSAV").err(onError,{ fileName : "KeySharpMain.hx", lineNumber : 341, className : "app.KeySharpMain", methodName : "issueCert"});
		var spec1 = spec.storage;
		var tmp2 = csafe_asn1_impl_AlgorithmID.rsa;
		var tmp3 = rHandle.ok(function(csav) {
			haxe_Log.trace("Generated CSAV",{ fileName : "KeySharpMain.hx", lineNumber : 346, className : "app.KeySharpMain", methodName : "issueCert"});
			ctx.set_newSvMech(csav);
			var client = new csafe_cmp_CMPClient(ctx,new app_YessignCMPTransport(ctx));
			var tmp4 = rHandle.chain("Main.issueCert.issueCert").ok(function(issuedCert) {
				var tmp5 = rHandle.chain("Main.issueCert.save").ok(function(commited) {
					var tmp6 = rHandle.chain("Main.issueCert.save").ok(function() {
						var certInfo = app_certstorage_CertResolver.extractCertInfo(issuedCert,true);
						var rInfo = { };
						rInfo.cid = commited.cid;
						rInfo.afterDate = certInfo.afterDate;
						rInfo.subjectDN = certInfo.subjectDN;
						rInfo.type = certInfo.type;
						onOK(rInfo);
					},{ fileName : "KeySharpMain.hx", lineNumber : 353, className : "app.KeySharpMain", methodName : "issueCert"});
					client.doConfirm(tmp6);
				},{ fileName : "KeySharpMain.hx", lineNumber : 351, className : "app.KeySharpMain", methodName : "issueCert"});
				csav.saveToStorage(spec,issuedCert,tmp5);
			},{ fileName : "KeySharpMain.hx", lineNumber : 349, className : "app.KeySharpMain", methodName : "issueCert"});
			client.issueCertificate(tmp4);
		},{ fileName : "KeySharpMain.hx", lineNumber : 344, className : "app.KeySharpMain", methodName : "issueCert"});
		app_CMPSignAndVerifier.createForNewIssue(spec1,tmp2,{ keyLength : 2048},tmp3);
	}
};
app_KeySharpMain.updateCert = function(spec,onOK,onError) {
	if(spec.org == "inilineCA") {
		onError("not_support_cmp");
	} else {
		var ctx = new csafe_cmp_CMPContext(spec.org);
		ctx.set_orgName(spec.orgName);
		ctx.set_url(spec.cmpUrl);
		app_certstorage_CertResolver.resolveSAV(spec,function(oldSav) {
			ctx.set_oldSvMech(oldSav);
			var rHandle = common_ResultHandler.create("Main.updateCert.generateSAV").err(onError,{ fileName : "KeySharpMain.hx", lineNumber : 384, className : "app.KeySharpMain", methodName : "updateCert"});
			var spec1 = spec.storage;
			var tmp = csafe_asn1_impl_AlgorithmID.rsa;
			var tmp1 = rHandle.ok(function(csav) {
				ctx.set_newSvMech(csav);
				var client = new csafe_cmp_CMPClient(ctx,new app_YessignCMPTransport(ctx));
				var tmp2 = rHandle.chain("Main.updateCert").ok(function(issuedCert) {
					spec.crdt = spec.newCrdt;
					var removeCID = Reflect.field(spec,"cid");
					var tmp3 = rHandle.chain("Main.updateCert.save").ok(function(commited) {
						var tmp4 = rHandle.chain("Main.updateCert.save").ok(function() {
							var certInfo = app_certstorage_CertResolver.extractCertInfo(issuedCert,true);
							var rInfo = { };
							rInfo.cid = commited.cid;
							rInfo.afterDate = certInfo.afterDate;
							rInfo.subjectDN = certInfo.subjectDN;
							rInfo.type = certInfo.type;
							var ignoreFailed = function() {
								onOK(rInfo);
							};
							spec.cid = removeCID;
							spec.forceMode = true;
							spec.removeLocal = true;
							spec.removeRemote = false;
							app_certstorage_CertResolver.deleteCertData(spec,ignoreFailed,ignoreFailed);
						},{ fileName : "KeySharpMain.hx", lineNumber : 398, className : "app.KeySharpMain", methodName : "updateCert"});
						client.doConfirm(tmp4,true);
					},{ fileName : "KeySharpMain.hx", lineNumber : 395, className : "app.KeySharpMain", methodName : "updateCert"});
					csav.saveToStorage(spec,issuedCert,tmp3);
				},{ fileName : "KeySharpMain.hx", lineNumber : 391, className : "app.KeySharpMain", methodName : "updateCert"});
				client.updateCertificate(tmp2);
			},{ fileName : "KeySharpMain.hx", lineNumber : 387, className : "app.KeySharpMain", methodName : "updateCert"});
			app_CMPSignAndVerifier.createForNewIssue(spec1,tmp,{ keyLength : 2048},tmp1);
		},onError);
	}
};
app_KeySharpMain.removeCert = function(request,onOK,onError) {
	app_certstorage_CertResolver.deleteCertData(request,onOK,onError);
};
app_KeySharpMain.exportCert = function(spec,onOK,onError) {
	if(spec.type == "raw") {
		app_certstorage_CertResolver.loadForSerialize(spec,onOK,onError);
	} else {
		app_certstorage_CertResolver.exportPFXFile(spec,onOK,onError);
	}
};
app_KeySharpMain.copyCert = function(spec,onOK,onError) {
	app_certstorage_CertResolver.copyTo(spec,onOK,onError);
};
app_KeySharpMain.loadCertInfo = function(spec,onOK,onError) {
	app_certstorage_CertResolver.getDetailedCertInfo(spec,onOK,onError);
};
app_KeySharpMain.loadCertList = function(spec,onOK,onError) {
	app_certstorage_CertResolver.list(spec,function(list) {
		var filteredList = [];
		var excludeFilterFuncs = [];
		var options = spec.options != null ? spec.options : { };
		excludeFilterFuncs.push({ func : function(set) {
			var afterDate = HxOverrides.strDate(set.info.afterDate).getTime();
			var currDate = new Date().getTime();
			var expireBase = 2592000000.;
			var isExclude = false;
			set.info.expire_status = "NORMAL";
			if(afterDate < currDate) {
				set.info.expire_status = "EXPIRE";
				if(options.disableExpireFilter != true) {
					isExclude = true;
				}
			} else if(afterDate - expireBase < currDate && options.disableExpireWarn != true) {
				set.info.expire_status = "BEFOREEXPIREMONTH";
			}
			return isExclude;
		}, name : "DateFilter"});
		if(!util_StringUtil.isNull(options.issuerCertFilter)) {
			excludeFilterFuncs.push({ func : function(set1) {
				var issuerCertFilterArr = (js_Boot.__cast(options.issuerCertFilter , String)).split("|");
				var _g1 = 0;
				var _g = issuerCertFilterArr.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(!util_StringUtil.isNull(issuerCertFilterArr[i]) && util_CryptUtil.equalsDN(set1.info.issuerDN,issuerCertFilterArr[i])) {
						return false;
					}
				}
				return true;
			}, name : "IssuerFilter"});
		}
		if(!util_StringUtil.isNull(options.subjectCertFilter)) {
			excludeFilterFuncs.push({ func : function(set2) {
				if(util_CryptUtil.equalsDN(set2.info.subjectDN,options.subjectCertFilter)) {
					return false;
				}
				return true;
			}, name : "SubjectFilter"});
		}
		if(!util_StringUtil.isNull(options.policyOidCertFilter)) {
			var oids = options.policyOidCertFilter.split("|");
			excludeFilterFuncs.push({ func : function(set3) {
				if(util_StringUtil.isExist(oids,set3.info.type)) {
					return false;
				}
				return true;
			}, name : "OIDFilter"});
		}
		if(options.cacheCertFilter == true) {
			var ccid = js_Browser.getSessionStorage().getItem("XWC_CCID");
			if(!util_StringUtil.isNull(ccid)) {
				excludeFilterFuncs.push({ func : function(set4,cid) {
					if(cid == ccid) {
						return false;
					}
					return true;
				}, name : "CacheFilter"});
			}
		}
		var _g2 = 0;
		var _g11 = Reflect.fields(list);
		while(_g2 < _g11.length) {
			var cid1 = _g11[_g2];
			++_g2;
			var set5 = Reflect.field(list,cid1);
			if(set5.info == null) {
				if(set5.meta != null) {
					set5.info = set5.meta;
				} else {
					set5.info = app_certstorage_CertResolver.extractCertInfo(new csafe_x509_X509Certificate(set5.cert));
				}
			}
			var isFiltered = false;
			var _g3 = 0;
			var _g21 = excludeFilterFuncs.length;
			while(_g3 < _g21) {
				var i1 = _g3++;
				var isExclude1 = excludeFilterFuncs[i1].func;
				try {
					if(isExclude1(set5,cid1)) {
						isFiltered = true;
						break;
					}
				} catch( e ) {
					if (e instanceof js__$Boot_HaxeError) e = e.val;
					haxe_Log.trace("Failed filter : " + excludeFilterFuncs[i1].name + " : " + Std.string(e),{ fileName : "KeySharpMain.hx", lineNumber : 539, className : "app.KeySharpMain", methodName : "loadCertList", customParams : [Log.ERROR]});
				}
			}
			if(!isFiltered) {
				var item = set5.info;
				item.cid = cid1;
				filteredList.push(item);
			}
		}
		onOK({ certSets : filteredList});
	},onError);
};
app_KeySharpMain.decrypt = function(spec,onOK,onError) {
	var ksEncText = haxe_crypto_Base64.decode(spec.encryptedText);
	var sid = ksEncText.sub(0,20);
	var encryptedLength = util_ConvUtil.bytesToInt(ksEncText.sub(20,4));
	var encrypted = ksEncText.sub(24,encryptedLength);
	var hmac = ksEncText.sub(24 + encryptedLength,20);
	csafe_asn1_impl_AlgorithmID.seed_CBC.decrypt(util_Hex.toBytes(spec.key),encrypted,{ iv : util_Hex.toBytes(spec.iv)},common_ResultHandler.create("KeySharpMain.decrypt").ok(function(decrypted) {
		var tmp = decrypted.toString();
		onOK({ data : tmp});
	},{ fileName : "KeySharpMain.hx", lineNumber : 671, className : "app.KeySharpMain", methodName : "decrypt"}).err(onError,{ fileName : "KeySharpMain.hx", lineNumber : 671, className : "app.KeySharpMain", methodName : "decrypt"}));
};
app_KeySharpMain.getFunction = function(funcName) {
	if(funcName == "PING") {
		return app_KeySharpMain.PING;
	}
	if(funcName == "decrypt") {
		return app_KeySharpMain.decrypt;
	}
	var tmp = funcName == "getStorageStatus";
	if(funcName == "loadCertList") {
		return app_KeySharpMain.loadCertList;
	}
	if(funcName == "deleteCertData") {
		return app_certstorage_CertResolver.deleteCertData;
	}
	if(funcName == "copyCert") {
		return app_certstorage_CertResolver.copyTo;
	}
	if(funcName == "updateCertCredential") {
		return app_certstorage_CertResolver.updateCredential;
	}
	if(funcName == "sign") {
		return app_KeySharpMain.sign;
	}
	if(funcName == "issueCert") {
		return app_KeySharpMain.issueCert;
	}
	if(funcName == "updateCert") {
		return app_KeySharpMain.updateCert;
	}
	if(funcName == "removeCert") {
		return app_KeySharpMain.removeCert;
	}
	if(funcName == "exportCert") {
		return app_KeySharpMain.exportCert;
	}
	if(funcName == "importCertFromData") {
		return app_certstorage_CertResolver.importCertFromData;
	}
	if(funcName == "loadCertInfo") {
		return app_KeySharpMain.loadCertInfo;
	}
	if(funcName == "onJSCallback") {
		return app_KeySharpMain.onJSCallback;
	}
	if(funcName == "copyBrowserCert") {
		return app_KeySharpMain.copyBrowserCert;
	}
	if(funcName == "setYessignCloudOptions") {
		return app_certstorage_Browser2_$1.setYessignCloudOptions;
	}
	throw new js__$Boot_HaxeError(new Exception("Invalid function : " + funcName));
};
app_KeySharpMain.getBrowser2SyncInfo = function() {
	return app_certstorage_Browser2.getSyncLogs();
};
app_KeySharpMain.vlog = function() {
	js_Browser.alert(Log.HBUF.join("\n"));
};
app_KeySharpMain.removeTest = function(spec,resolved,rejected) {
	app_certstorage_Browser2.removeTest(spec,resolved,rejected);
};
app_KeySharpMain.PING = function(request,onOK,onError) {
	if(request != null) {
		if(Object.prototype.hasOwnProperty.call(request,"logLevel")) {
			Log.FILTER_LEVEL = request.logLevel;
		}
		if(Object.prototype.hasOwnProperty.call(request,"forceEngineOptions")) {
			app_KeySharpMain.loadEngine(request.forceEngineOptions,onOK,onError);
			return;
		}
	}
	onOK("ok");
};
app_KeySharpMain.crdtTransform = function(request,requestField,type) {
	if(type == "text" || type == null) {
		if(Object.prototype.hasOwnProperty.call(request,requestField)) {
			request[requestField] = haxe_io_Bytes.ofString(request[requestField]);
			LZZerorize.pus(request[requestField]);
		}
	} else if(type == "transkey" || request.options.securekeyboard.product == "touchennxkey" && type == "securekey") {
		if(Object.prototype.hasOwnProperty.call(request,requestField)) {
			var b64 = transkey_GetDecnxBiz(request[requestField]);
			request[requestField] = haxe_crypto_Base64.decode(b64);
			b64 = null;
			LZZerorize.pus(request[requestField]);
		}
	} else if(type == "nosk" || type == "nos") {
		if(Object.prototype.hasOwnProperty.call(request,requestField)) {
			var b641 = nos_GetDeK(request[requestField]);
			request[requestField] = haxe_crypto_Base64.decode(b641);
			b641 = null;
			LZZerorize.pus(request[requestField]);
		}
	} else if(!util_StringUtil.isNull(type)) {
		throw new js__$Boot_HaxeError(new Exception("invalid_crdt_type"));
	}
};
app_KeySharpMain.doJsonRequest = function(value,onResult) {
	var tes = JSON.parse("{ \"method\":\"PING\", \"reqeust\":{} }");
	var dyn = JSON.parse(value);
	var result = null;
	app_KeySharpMain.callDirect(dyn.method,dyn.request,function(res) {
		result = JSON.stringify({ result : "ok", data : JSON.stringify(res)});
		if(onResult != null) {
			onResult(result);
		}
	},function(err) {
		result = JSON.stringify({ result : "error", message : err});
		if(onResult != null) {
			onResult(result);
		}
	});
	return result;
};
app_KeySharpMain.callDirect = function(method,request,onOK,onError) {
	if(app_KeySharpMain.STATUS == app_KeySharpMain.STATUS_IDLE) {
		onError("module_init_idle");
		return;
	} else if(app_KeySharpMain.STATUS == app_KeySharpMain.STATUS_INITIALIZING) {
		onError("module_init_failed");
		return;
	} else if(app_KeySharpMain.STATUS == app_KeySharpMain.STATUS_ERROR) {
		onError("module_init_failed");
		return;
	} else if(app_KeySharpMain.STATUS == app_KeySharpMain.STATUS_OK) {
		app_KeySharpMain.doService(method,request,onOK,onError);
	}
};
app_KeySharpMain.doService = function(method,request,onOK,onError) {
	var wrapOnOK = function(result) {
		haxe_Log.trace("KeysharpCore.responseOK(" + method + ") : " + JSON.stringify(result),{ fileName : "KeySharpMain.hx", lineNumber : 852, className : "app.KeySharpMain", methodName : "doService", customParams : [Log.DEBUG]});
		LZZerorize.z();
		try {
			onOK(result);
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			haxe_Log.trace("resolved function error",{ fileName : "KeySharpMain.hx", lineNumber : 857, className : "app.KeySharpMain", methodName : "doService"});
			throw js__$Boot_HaxeError.wrap(e);
		}
	};
	var wrapOnError = function(error) {
		LZZerorize.z();
		var remaped = app_ErrorCodes.remap(method,request,error);
		haxe_Log.trace("KeysharpCore.responseError(" + method + ") : " + JSON.stringify(remaped) + ", org:" + JSON.stringify(error),{ fileName : "KeySharpMain.hx", lineNumber : 864, className : "app.KeySharpMain", methodName : "doService", customParams : [Log.DEBUG]});
		try {
			onError(remaped);
		} catch( e1 ) {
			if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
			haxe_Log.trace("resolved function error",{ fileName : "KeySharpMain.hx", lineNumber : 868, className : "app.KeySharpMain", methodName : "doService"});
			throw js__$Boot_HaxeError.wrap(e1);
		}
	};
	haxe_Log.trace("KeyshapCore.request(" + method + ") : " + JSON.stringify(request),{ fileName : "KeySharpMain.hx", lineNumber : 872, className : "app.KeySharpMain", methodName : "doService", customParams : [Log.DEBUG]});
	try {
		haxe_Log.trace("KeysharpCore crdt transform start",{ fileName : "KeySharpMain.hx", lineNumber : 875, className : "app.KeySharpMain", methodName : "doService", customParams : [Log.DEBUG]});
		app_KeySharpMain.crdtTransform(request,"crdt",request.crdt_type);
		app_KeySharpMain.crdtTransform(request,"newCrdt",request.newCrdt_type);
		haxe_Log.trace("KeysharpCore crdt transform done",{ fileName : "KeySharpMain.hx", lineNumber : 878, className : "app.KeySharpMain", methodName : "doService", customParams : [Log.DEBUG]});
	} catch( e2 ) {
		if (e2 instanceof js__$Boot_HaxeError) e2 = e2.val;
		wrapOnError("crdt_error:" + Std.string(e2));
		return;
	}
	var func = app_KeySharpMain.getFunction(method);
	request.method = method;
	func(request,wrapOnOK,wrapOnError);
};
app_KeySharpMain.main = function() {
	Log.registerTracer();
};
app_KeySharpMain.loadEngine = function(options,onLoaded,onFailed) {
	if(options != null) {
		if(Object.prototype.hasOwnProperty.call(options,"logLevel")) {
			Log.FILTER_LEVEL = options.logLevel;
		}
		if(options.yessignOpenCertInfo != null) {
			app_certstorage_Browser2.cloud = options.yessignOpenCertInfo.cloud;
			app_certstorage_Browser2.EncLKEY = options.yessignOpenCertInfo.apikey;
			if(options.yessignOpenCertInfo.FO_MODE) {
				app_certstorage_Browser2_$1.FO_MODE = true;
			}
		}
		if(options.storageVersionSpec == "1") {
			app_certstorage_CertResolver.getStorageSpec("browser").implClass = app_certstorage_Browser1;
			app_certstorage_CertResolver.getStorageSpec("browser2").implClass = app_certstorage_Browser2;
		}
	}
	var onInited = function() {
		var buildDate = window.ksBuildDate;
		onLoaded({ buildDate : buildDate, SSA : app_js_WebCryptoAlgorithmImpl.RSA_SSA_MODE, PSS : app_js_WebCryptoAlgorithmImpl.RSA_PSS_MODE, SoftMode : !app_js_WebCryptoWrapper.isAvailable()});
	};
	if(app_KeySharpMain.STATUS == app_KeySharpMain.STATUS_OK) {
		onInited();
		return;
	}
	app_KeySharpMain.STATUS = app_KeySharpMain.STATUS_INITIALIZING;
	try {
		haxe_Log.trace("KeySharpCore load start ",{ fileName : "KeySharpMain.hx", lineNumber : 1024, className : "app.KeySharpMain", methodName : "loadEngine", customParams : [Log.DEBUG]});
		csafe_CrossSafe.install();
		haxe_Log.trace("KeySharpCore crypto installed",{ fileName : "KeySharpMain.hx", lineNumber : 1026, className : "app.KeySharpMain", methodName : "loadEngine", customParams : [Log.DEBUG]});
		app_KeySharpMain.STATUS = app_KeySharpMain.STATUS_OK;
		onInited();
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		haxe_Log.trace(e,{ fileName : "KeySharpMain.hx", lineNumber : 1032, className : "app.KeySharpMain", methodName : "loadEngine"});
		app_KeySharpMain.STATUS = app_KeySharpMain.STATUS_ERROR;
		onFailed(e);
	}
};
var csafe_cmp_transport_CMPTransport = function() { };
csafe_cmp_transport_CMPTransport.__name__ = ["csafe","cmp","transport","CMPTransport"];
csafe_cmp_transport_CMPTransport.prototype = {
	__class__: csafe_cmp_transport_CMPTransport
};
var app_YessignCMPTransport = function(ctx) {
	this.ctx = ctx;
};
app_YessignCMPTransport.__name__ = ["app","YessignCMPTransport"];
app_YessignCMPTransport.__interfaces__ = [csafe_cmp_transport_CMPTransport];
app_YessignCMPTransport.prototype = {
	doRequest: function(message,rHandle,ignoreMessage) {
		if(ignoreMessage == null) {
			ignoreMessage = false;
		}
		var reqMsg = new csafe_cmp_transport_CMPMessage();
		reqMsg.set_includeLength(false);
		reqMsg.set_version(csafe_cmp_transport_CMPMessage.V_PKIX_DRAFT);
		haxe_Log.trace("SEND : " + message.encode().toHex(),{ fileName : "YessignCMPTransport.hx", lineNumber : 55, className : "app.YessignCMPTransport", methodName : "doRequest"});
		reqMsg.set_includeLength(true);
		reqMsg.set_contentMsg(message);
		var reqMsgEncoded = reqMsg.encode();
		var data = haxe_crypto_Base64.encode(reqMsgEncoded);
		var xhttp = new XMLHttpRequest();
		var tmp = this.ctx.get_url();
		xhttp.open("POST",tmp);
		xhttp.setRequestHeader("Content-Type","application/pkixcmp");
		xhttp.onreadystatechange = function() {
			if(xhttp.readyState == 4) {
				if(xhttp.status == 200) {
					var recvBytes = haxe_crypto_Base64.decode(StringTools.trim(xhttp.responseText));
					haxe_Log.trace("RECV : " + recvBytes.toHex(),{ fileName : "YessignCMPTransport.hx", lineNumber : 70, className : "app.YessignCMPTransport", methodName : "doRequest"});
					var respCMPMessage = csafe_cmp_transport_CMPMessage.resolve(true,recvBytes);
					var responseMessage = respCMPMessage.get_contentMsg();
					if(!ignoreMessage && responseMessage == null) {
						rHandle.onErr("response message is null");
						return;
					}
					rHandle.onOk(responseMessage);
				} else {
					var key = "ERR_" + xhttp.status;
					var _this = app_YessignCMPTransport.HERR_MAP;
					var errMessage = __map_reserved[key] != null ? _this.getReserved(key) : _this.h[key];
					if(errMessage == null) {
						errMessage = "HTTP CMP Response code : " + xhttp.status;
					}
					rHandle.onErr(errMessage);
				}
			}
		};
		xhttp.send(data);
	}
	,close: function() {
	}
	,__class__: app_YessignCMPTransport
};
var app_certstorage_AsyncBrowserStorage = function() { };
app_certstorage_AsyncBrowserStorage.__name__ = ["app","certstorage","AsyncBrowserStorage"];
app_certstorage_AsyncBrowserStorage.prototype = {
	__class__: app_certstorage_AsyncBrowserStorage
};
var util_Hex = function() { };
util_Hex.__name__ = ["util","Hex"];
util_Hex.toHexInt = function(hex) {
	if(hex >= util_Hex._st_digit && hex <= util_Hex._en_digit) {
		return hex - util_Hex._st_digit;
	} else if(hex >= util_Hex._st_hex && hex <= util_Hex._en_hex) {
		return hex - util_Hex._st_hex + 10;
	} else if(hex >= util_Hex._stu_hex && hex <= util_Hex._enu_hex) {
		return hex - util_Hex._stu_hex + 10;
	} else {
		return -1;
	}
};
util_Hex.toBytes = function(hex) {
	var length = hex.length / 2 | 0;
	var a = new haxe_io_Bytes(new ArrayBuffer(length));
	var _g1 = 0;
	var _g = length;
	while(_g1 < _g) {
		var i = _g1++;
		var hexChars = HxOverrides.substr(hex,i * 2,2);
		var hex1 = HxOverrides.cca(hexChars,0);
		var hexVal = (hex1 >= util_Hex._st_digit && hex1 <= util_Hex._en_digit ? hex1 - util_Hex._st_digit : hex1 >= util_Hex._st_hex && hex1 <= util_Hex._en_hex ? hex1 - util_Hex._st_hex + 10 : hex1 >= util_Hex._stu_hex && hex1 <= util_Hex._enu_hex ? hex1 - util_Hex._stu_hex + 10 : -1) << 4;
		var hex2 = HxOverrides.cca(hexChars,1);
		hexVal |= hex2 >= util_Hex._st_digit && hex2 <= util_Hex._en_digit ? hex2 - util_Hex._st_digit : hex2 >= util_Hex._st_hex && hex2 <= util_Hex._en_hex ? hex2 - util_Hex._st_hex + 10 : hex2 >= util_Hex._stu_hex && hex2 <= util_Hex._enu_hex ? hex2 - util_Hex._stu_hex + 10 : -1;
		a.b[i] = hexVal & 255;
	}
	return a;
};
util_Hex.toString = function(array,separator) {
	if(separator == null) {
		separator = "";
	}
	return array.toHex();
};
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	this.b.bufferValue = data;
	data.hxBytes = this;
	data.bytes = this.b;
};
haxe_io_Bytes.__name__ = ["haxe","io","Bytes"];
haxe_io_Bytes.alloc = function(length) {
	return new haxe_io_Bytes(new ArrayBuffer(length));
};
haxe_io_Bytes.ofString = function(s) {
	var a = [];
	var i = 0;
	while(i < s.length) {
		var c = s.charCodeAt(i++);
		if(55296 <= c && c <= 56319) {
			c = c - 55232 << 10 | s.charCodeAt(i++) & 1023;
		}
		if(c <= 127) {
			a.push(c);
		} else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	return new haxe_io_Bytes(new Uint8Array(a).buffer);
};
haxe_io_Bytes.ofData = function(b) {
	var hb = b.hxBytes;
	if(hb != null) {
		return hb;
	}
	return new haxe_io_Bytes(b);
};
haxe_io_Bytes.fastGet = function(b,pos) {
	return b.bytes[pos];
};
haxe_io_Bytes.prototype = {
	blit: function(pos,src,srcpos,len) {
		if(pos < 0 || srcpos < 0 || len < 0 || pos + len > this.length || srcpos + len > src.length) {
			throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
		}
		if(srcpos == 0 && len == src.b.byteLength) {
			this.b.set(src.b,pos);
		} else {
			this.b.set(src.b.subarray(srcpos,srcpos + len),pos);
		}
	}
	,sub: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) {
			throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
		}
		return new haxe_io_Bytes(this.b.buffer.slice(pos + this.b.byteOffset,pos + this.b.byteOffset + len));
	}
	,getInt32: function(pos) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		return this.data.getInt32(pos,true);
	}
	,setInt32: function(pos,v) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		this.data.setInt32(pos,v,true);
	}
	,getString: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) {
			throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
		}
		var s = "";
		var b = this.b;
		var fcc = String.fromCharCode;
		var i = pos;
		var max = pos + len;
		while(i < max) {
			var c = b[i++];
			if(c < 128) {
				if(c == 0) {
					break;
				}
				s += fcc(c);
			} else if(c < 224) {
				s += fcc((c & 63) << 6 | b[i++] & 127);
			} else if(c < 240) {
				var c2 = b[i++];
				s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);
			} else {
				var c21 = b[i++];
				var c3 = b[i++];
				var u = (c & 15) << 18 | (c21 & 127) << 12 | (c3 & 127) << 6 | b[i++] & 127;
				s += fcc((u >> 10) + 55232);
				s += fcc(u & 1023 | 56320);
			}
		}
		return s;
	}
	,toString: function() {
		return this.getString(0,this.length);
	}
	,toHex: function() {
		var s_b = "";
		var chars = [];
		var str = "0123456789abcdef";
		var _g1 = 0;
		var _g = str.length;
		while(_g1 < _g) {
			var i = _g1++;
			chars.push(HxOverrides.cca(str,i));
		}
		var _g11 = 0;
		var _g2 = this.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			var c = this.b[i1];
			s_b += String.fromCharCode(chars[c >> 4]);
			s_b += String.fromCharCode(chars[c & 15]);
		}
		return s_b;
	}
	,__class__: haxe_io_Bytes
};
var app_certstorage_Browser1 = function() { };
app_certstorage_Browser1.__name__ = ["app","certstorage","Browser1"];
app_certstorage_Browser1.getStatus = function(spec,resolved,rejected) {
	resolved({ status : "ok"});
};
app_certstorage_Browser1.getPKID = function(spec) {
	var pkid = spec.pkid;
	if(pkid == null || StringTools.trim(pkid) == "") {
		pkid = "NPKI";
	}
	pkid = "XWC_" + pkid;
	return pkid;
};
app_certstorage_Browser1.dissemble = function(spec,resolved) {
	haxe_Log.trace("current origin(load) : " + window.location.origin,{ fileName : "Browser1.hx", lineNumber : 56, className : "app.certstorage.Browser1", methodName : "dissemble"});
	var deff = function(e) {
		try {
			haxe_Log.trace("================ Storage reset forced. cause : ",{ fileName : "Browser1.hx", lineNumber : 59, className : "app.certstorage.Browser1", methodName : "dissemble"});
			haxe_Log.trace(e,{ fileName : "Browser1.hx", lineNumber : 60, className : "app.certstorage.Browser1", methodName : "dissemble"});
			resolved({ });
		} catch( e1 ) {
		}
	};
	var pkid = app_certstorage_Browser1.getPKID(spec);
	var storage = js_Browser.getLocalStorage();
	var pkdata;
	try {
		pkdata = JSON.parse(storage.getItem(pkid));
		if(pkdata == null || pkdata.caKeys == null || pkdata.userKeys == null || pkdata.metaKeys == null) {
			deff("init storage");
			return;
		}
		var cb = haxe_crypto_Base64.decode(pkdata.caKeys);
		var ub = haxe_crypto_Base64.decode(pkdata.userKeys);
		var mb = haxe_crypto_Base64.decode(pkdata.metaKeys);
		var _g1 = 0;
		var _g = ub.length;
		while(_g1 < _g) {
			var i = _g1++;
			ub.b[i] = (cb.b[i] ^ ub.b[i]) & 255;
		}
		csafe_asn1_impl_AlgorithmID.sha256.digest(ub,common_ResultHandler.create("BrDDK").ok(function(ubhk) {
			var tmp = csafe_asn1_impl_AlgorithmID.aes256_CBC;
			var tmp1 = { iv : app_certstorage_Browser1.DMK.sub(0,16)};
			var tmp2 = common_ResultHandler.create("BrDDK").ok(function(out) {
				var rmd = JSON.parse(out.toString());
				Reflect.deleteField(rmd,haxe_crypto_Base64.encode(cb.sub(0,20)));
				try {
					resolved(rmd);
				} catch( e2 ) {
					if (e2 instanceof js__$Boot_HaxeError) e2 = e2.val;
					haxe_Log.trace(e2,{ fileName : "Browser1.hx", lineNumber : 86, className : "app.certstorage.Browser1", methodName : "dissemble"});
				}
			},{ fileName : "Browser1.hx", lineNumber : 80, className : "app.certstorage.Browser1", methodName : "dissemble"}).err(deff,{ fileName : "Browser1.hx", lineNumber : 80, className : "app.certstorage.Browser1", methodName : "dissemble"});
			tmp.decrypt(ubhk,mb,tmp1,tmp2);
		},{ fileName : "Browser1.hx", lineNumber : 79, className : "app.certstorage.Browser1", methodName : "dissemble"}).err(deff,{ fileName : "Browser1.hx", lineNumber : 79, className : "app.certstorage.Browser1", methodName : "dissemble"}));
	} catch( e3 ) {
		if (e3 instanceof js__$Boot_HaxeError) e3 = e3.val;
		deff(e3);
		return;
	}
};
app_certstorage_Browser1.commit = function(spec,metaKey,resolved,rejected) {
	haxe_Log.trace("current origin(commit) : " + window.location.origin,{ fileName : "Browser1.hx", lineNumber : 98, className : "app.certstorage.Browser1", methodName : "commit"});
	var pkid = app_certstorage_Browser1.getPKID(spec);
	var storage = js_Browser.getLocalStorage();
	var orgData = storage.getItem(pkid);
	var pkdata = JSON.parse(orgData);
	var cb;
	var ub;
	var mb;
	if(pkdata == null) {
		pkdata = { };
	}
	if(pkdata.caKeys == null) {
		cb = new haxe_io_Bytes(new ArrayBuffer(1328));
		csafe_asn1_impl_AlgorithmID.getRandomValues(cb);
		pkdata.caKeys = haxe_crypto_Base64.encode(cb);
		var metaDum = new haxe_io_Bytes(new ArrayBuffer(2589));
		csafe_asn1_impl_AlgorithmID.getRandomValues(metaDum);
		metaKey[haxe_crypto_Base64.encode(cb.sub(0,20))] = haxe_crypto_Base64.encode(metaDum);
	} else {
		cb = haxe_crypto_Base64.decode(pkdata.caKeys);
	}
	var mks = JSON.stringify(metaKey);
	ub = new haxe_io_Bytes(new ArrayBuffer(cb.length + (mks.length * 0.1 | 0)));
	csafe_asn1_impl_AlgorithmID.getRandomValues(ub);
	pkdata.userKeys = haxe_crypto_Base64.encode(ub);
	var _g1 = 0;
	var _g = ub.length;
	while(_g1 < _g) {
		var i = _g1++;
		ub.b[i] = (cb.b[i] ^ ub.b[i]) & 255;
	}
	csafe_asn1_impl_AlgorithmID.sha256.digest(ub,common_ResultHandler.create("BrEEK").ok(function(ubhk) {
		csafe_asn1_impl_AlgorithmID.aes256_CBC.encrypt(ubhk,haxe_io_Bytes.ofString(mks),{ iv : app_certstorage_Browser1.DMK.sub(0,16)},common_ResultHandler.create("BrDDK").ok(function(out) {
			pkdata.metaKeys = haxe_crypto_Base64.encode(out);
			var saveData = JSON.stringify(pkdata);
			storage.setItem(pkid,saveData);
			var savedData = storage.getItem(pkid);
			if(saveData.length == savedData.length) {
				resolved();
			} else {
				rejected("storage is full");
				storage.setItem(pkid,orgData);
			}
		},{ fileName : "Browser1.hx", lineNumber : 126, className : "app.certstorage.Browser1", methodName : "commit"}).err(rejected,{ fileName : "Browser1.hx", lineNumber : 126, className : "app.certstorage.Browser1", methodName : "commit"}));
	},{ fileName : "Browser1.hx", lineNumber : 125, className : "app.certstorage.Browser1", methodName : "commit"}).err(rejected,{ fileName : "Browser1.hx", lineNumber : 125, className : "app.certstorage.Browser1", methodName : "commit"}));
};
app_certstorage_Browser1.list = function(spec,resolved,rejected) {
	app_certstorage_Browser1.dissemble(spec,function(certSets) {
		haxe_Log.trace("LocalCertList",{ fileName : "Browser1.hx", lineNumber : 154, className : "app.certstorage.Browser1", methodName : "list"});
		haxe_Log.trace(certSets,{ fileName : "Browser1.hx", lineNumber : 155, className : "app.certstorage.Browser1", methodName : "list"});
		resolved(certSets);
	});
};
app_certstorage_Browser1.resolveSAV = function(spec,resolved,rejected) {
	app_certstorage_Browser1.loadResolvedSet(spec,function(dataSet) {
		var attrMap = new haxe_ds_StringMap();
		var value = spec.cid;
		if(__map_reserved["cid"] != null) {
			attrMap.setReserved("cid",value);
		} else {
			attrMap.h["cid"] = value;
		}
		resolved(new csafe_DefaultSignAndVerifier(dataSet.cert,dataSet.priv,attrMap));
	},rejected);
};
app_certstorage_Browser1.getCertificate = function(spec,resolved,rejected) {
	app_certstorage_Browser1.dissemble(spec,function(data) {
		var loadedResult = data[spec.cid];
		if(loadedResult != null) {
			var cert = new csafe_x509_X509Certificate(loadedResult.cert);
			resolved(cert);
		} else {
			rejected("cert_not_exist");
		}
	});
};
app_certstorage_Browser1.loadResolvedSet = function(spec,resolved,rejected) {
	var p8error = function() {
		rejected("incorrect_crdt");
	};
	app_certstorage_Browser1.dissemble(spec,function(data) {
		var loadedResult = data[spec.cid];
		if(loadedResult == null) {
			rejected("cert_not_exist");
			return;
		}
		var cert = new csafe_x509_X509Certificate(loadedResult.cert);
		var encryptedPriv = csafe_pkcs_pkcs8_PKCS8EncryptedPrivateKey.struct.create(null,haxe_crypto_Base64.decode(loadedResult.priv));
		encryptedPriv.decrypt(spec.crdt,common_ResultHandler.create("CertContext.resolve2").ok(function(decryptedPriv) {
			var priv = decryptedPriv.encode();
			var resolvedSet = { cert : cert, priv : priv, kmCert : null, kmPriv : null, meta : loadedResult.meta};
			if(loadedResult.kmCert != null && loadedResult.kmPriv != null) {
				var kmCert = new csafe_x509_X509Certificate(loadedResult.kmCert);
				var encryptedKMPriv = csafe_pkcs_pkcs8_PKCS8EncryptedPrivateKey.struct.create(null,haxe_crypto_Base64.decode(loadedResult.kmPriv));
				encryptedKMPriv.decrypt(spec.crdt,common_ResultHandler.create("CertContext.resolve2.km").ok(function(decryptedKMPriv) {
					var kmPriv = decryptedKMPriv.encode();
					resolvedSet.kmCert = kmCert;
					resolvedSet.kmPriv = kmPriv;
					resolved(resolvedSet);
				},{ fileName : "Browser1.hx", lineNumber : 199, className : "app.certstorage.Browser1", methodName : "loadResolvedSet"}).err(p8error,{ fileName : "Browser1.hx", lineNumber : 199, className : "app.certstorage.Browser1", methodName : "loadResolvedSet"}));
			} else {
				resolved(resolvedSet);
			}
		},{ fileName : "Browser1.hx", lineNumber : 192, className : "app.certstorage.Browser1", methodName : "loadResolvedSet"}).err(p8error,{ fileName : "Browser1.hx", lineNumber : 192, className : "app.certstorage.Browser1", methodName : "loadResolvedSet"}));
	});
};
app_certstorage_Browser1.saveResolvedSet = function(spec,resolved,rejected) {
	app_certstorage_Browser1.dissemble(spec,function(data) {
		var resolvedSet = spec.data;
		var encryptedPriv = new csafe_pkcs_pkcs8_PKCS8EncryptedPrivateKey();
		var cid = spec.cid;
		if(cid != null && StringTools.trim(cid) != "") {
			if(!Object.prototype.hasOwnProperty.call(data,cid)) {
				rejected("cert_not_exist");
				return;
			}
		} else {
			cid = app_certstorage_CertResolver.makeCID(resolvedSet.cert);
			if(Object.prototype.hasOwnProperty.call(data,cid) && spec.overwrite != true) {
				rejected("cid_already_exist");
				return;
			}
		}
		if(app_certstorage_Browser1.getPKID(spec) == "XWC_NPKI" && !app_CertOID.isNPKI(resolvedSet.cert)) {
			rejected("not_support_cert");
			return;
		}
		if(resolvedSet.meta == null) {
			resolvedSet.meta = app_certstorage_CertResolver.extractCertInfo(resolvedSet.cert);
		}
		encryptedPriv.encrypt(csafe_asn1_impl_AlgorithmID.seed_CBC,spec.crdt,resolvedSet.priv,common_ResultHandler.create("External.saveResolvedSet").ok(function(encrypted) {
			var set = { cert : haxe_crypto_Base64.encode(resolvedSet.cert.encode()), priv : haxe_crypto_Base64.encode(encrypted), meta : resolvedSet.meta};
			if(resolvedSet.kmCert != null && resolvedSet.kmPriv != null) {
				var encryptedKMPriv = new csafe_pkcs_pkcs8_PKCS8EncryptedPrivateKey();
				encryptedKMPriv.encrypt(csafe_asn1_impl_AlgorithmID.seed_CBC,spec.crdt,resolvedSet.kmPriv,common_ResultHandler.create("External.saveResolvedSet").ok(function(kmEncrypted) {
					var tmp = resolvedSet.kmCert.encode();
					set.kmCert = haxe_crypto_Base64.encode(tmp);
					set.kmPriv = haxe_crypto_Base64.encode(kmEncrypted);
					data[cid] = set;
					app_certstorage_Browser1.commit(spec,data,function() {
						resolved({ cid : cid});
					},rejected);
				},{ fileName : "Browser1.hx", lineNumber : 250, className : "app.certstorage.Browser1", methodName : "saveResolvedSet"}).err(rejected,{ fileName : "Browser1.hx", lineNumber : 250, className : "app.certstorage.Browser1", methodName : "saveResolvedSet"}));
			} else {
				data[cid] = set;
				app_certstorage_Browser1.commit(spec,data,function() {
					resolved({ cid : cid});
				},rejected);
			}
		},{ fileName : "Browser1.hx", lineNumber : 241, className : "app.certstorage.Browser1", methodName : "saveResolvedSet"}).err(rejected,{ fileName : "Browser1.hx", lineNumber : 241, className : "app.certstorage.Browser1", methodName : "saveResolvedSet"}));
	});
};
app_certstorage_Browser1.loadForSerialize = function(spec,resolved,rejected) {
	app_certstorage_Browser1.dissemble(spec,function(data) {
		var set = data[spec.cid];
		resolved({ cert : set.cert, priv : set.priv, kmCert : set.kmCert, kmPriv : set.kmPriv, meta : set.meta});
	});
};
app_certstorage_Browser1.saveForSerialize = function(spec,resolved,rejected) {
	if(spec.meta == null) {
		spec.meta = app_certstorage_CertResolver.extractCertInfo(new csafe_x509_X509Certificate(spec.cert));
	}
	app_certstorage_Browser1.dissemble(spec,function(data) {
		data[spec.cid] = { cert : spec.cert, priv : spec.priv, kmCert : spec.kmCert, kmPriv : spec.kmPriv, meta : spec.meta};
		app_certstorage_Browser1.commit(spec,data,resolved,rejected);
	});
};
app_certstorage_Browser1.remove = function(spec,resolved,rejected) {
	app_certstorage_Browser1.dissemble(spec,function(data) {
		Reflect.deleteField(data,spec.cid);
		app_certstorage_Browser1.commit(spec,data,resolved,rejected);
	});
};
var app_certstorage_Browser1_$1 = function() { };
app_certstorage_Browser1_$1.__name__ = ["app","certstorage","Browser1_1"];
app_certstorage_Browser1_$1.getStatus = function(spec,resolved,rejected) {
	resolved({ status : "ok"});
};
app_certstorage_Browser1_$1.isReserved = function(key) {
	if(!(StringTools.startsWith(key,"CAKEY") || StringTools.startsWith(key,"lastModified"))) {
		return key == "VERSION";
	} else {
		return true;
	}
};
app_certstorage_Browser1_$1.getStorage = function(spec,resolved,rejected) {
	var storage = getAsyncXWCStorage();
	var migrationAndResolve = function() {
		app_certstorage_Browser1.list(spec,function(certSets) {
			var cids = Reflect.fields(certSets);
			var saveData = { VERSION : app_certstorage_Browser1_$1.VERSION};
			var _g = 0;
			while(_g < cids.length) {
				var cid = [cids[_g]];
				++_g;
				try {
					var orgSet = Reflect.field(certSets,cid[0]);
					var cert = new csafe_x509_X509Certificate(orgSet.cert);
					var meta = app_certstorage_CertResolver.extractCertInfo(cert);
					var random = [new haxe_io_Bytes(new ArrayBuffer(24))];
					csafe_asn1_impl_AlgorithmID.getRandomValues(random[0]);
					var xLen = 0;
					var _g1 = 0;
					var _g2 = random[0].length;
					while(_g1 < _g2) {
						var i = _g1++;
						xLen ^= random[0].b[i];
					}
					var dnisLen = xLen + 1;
					var dnis = [new haxe_io_Bytes(new ArrayBuffer(dnisLen))];
					csafe_asn1_impl_AlgorithmID.getRandomValues(dnis[0]);
					var derived = haxe_crypto_Sha256.make(util_BytesUtil.concat([app_certstorage_Browser1_$1.DMK,random[0]]));
					var body = new app_certstorage_NXBytesBuffer();
					body.add(haxe_io_Bytes.ofString(JSON.stringify(meta)));
					body.add(cert.encode());
					body.add(haxe_crypto_Base64.decode(orgSet.priv));
					if(orgSet.kmCert != null && orgSet.kmPriv != null) {
						body.add(new csafe_x509_X509Certificate(orgSet.kmCert).encode());
						body.add(haxe_crypto_Base64.decode(orgSet.kmPriv));
					}
					var migrationAndResolve1 = csafe_asn1_impl_AlgorithmID.rc4;
					var migrationAndResolve2 = body.getBytes();
					var random1 = random[0];
					var migrationAndResolve3 = common_ResultHandler.create("Browser1_1").ok((function(dnis1,random2,cid1) {
						return function(e) {
							var value = haxe_crypto_Base64.encode(util_BytesUtil.concat([random2[0],dnis1[0],e]));
							saveData[cid1[0]] = value;
						};
					})(dnis,random,cid),{ fileName : "Browser1_1.hx", lineNumber : 61, className : "app.certstorage.Browser1_1", methodName : "getStorage"}).err(rejected,{ fileName : "Browser1_1.hx", lineNumber : 61, className : "app.certstorage.Browser1_1", methodName : "getStorage"});
					migrationAndResolve1.encrypt(derived,migrationAndResolve2,{ iv : random1},migrationAndResolve3);
				} catch( e1 ) {
					if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
					haxe_Log.trace("Migration failed item : " + cid[0],{ fileName : "Browser1_1.hx", lineNumber : 65, className : "app.certstorage.Browser1_1", methodName : "getStorage"});
					haxe_Log.trace(e1,{ fileName : "Browser1_1.hx", lineNumber : 66, className : "app.certstorage.Browser1_1", methodName : "getStorage"});
				}
			}
			storage.setData(saveData,null,function(notUse) {
				resolved(storage);
			},rejected);
		},rejected);
	};
	storage.getData("VERSION",function(v) {
		if(v == null) {
			migrationAndResolve();
		} else if(v != app_certstorage_Browser1_$1.VERSION) {
			storage.reset(function() {
				migrationAndResolve();
			},rejected);
		} else {
			resolved(storage);
		}
	},function(err) {
		if(err == "cert_not_exist") {
			migrationAndResolve();
		} else {
			rejected(err);
		}
	});
	return storage;
};
app_certstorage_Browser1_$1.list = function(spec,resolved,rejected) {
	app_certstorage_Browser1_$1.getStorage(spec,function(storage) {
		storage.getMap(function(map) {
			var keys = Reflect.fields(map);
			var rMap = { };
			var _g = 0;
			while(_g < keys.length) {
				var k = keys[_g];
				++_g;
				if(!app_certstorage_Browser1_$1.isReserved(k)) {
					try {
						var meta = app_certstorage_Browser1_$1.resolveMeta(Reflect.field(map,k));
						rMap[k] = { meta : meta};
					} catch( e ) {
						if (e instanceof js__$Boot_HaxeError) e = e.val;
						haxe_Log.trace("Ignore entry : " + k,{ fileName : "Browser1_1.hx", lineNumber : 104, className : "app.certstorage.Browser1_1", methodName : "list"});
						haxe_Log.trace(e,{ fileName : "Browser1_1.hx", lineNumber : 105, className : "app.certstorage.Browser1_1", methodName : "list"});
					}
				}
			}
			resolved(rMap);
		},function(err) {
			resolved({ });
		});
	},rejected);
};
app_certstorage_Browser1_$1.loadMeta = function(spec,resolved,rejected) {
	app_certstorage_Browser1_$1.getStorage(spec,function(storage) {
		storage.getData(spec.cid,function(data) {
			var meta;
			try {
				meta = app_certstorage_Browser1_$1.resolveMeta(data);
			} catch( e ) {
				if (e instanceof js__$Boot_HaxeError) e = e.val;
				rejected(e);
				return;
			}
			resolved(meta);
		},rejected);
	},rejected);
};
app_certstorage_Browser1_$1.getDNIS = function(random) {
	var xLen = 0;
	var _g1 = 0;
	var _g = random.length;
	while(_g1 < _g) {
		var i = _g1++;
		xLen ^= random.b[i];
	}
	return xLen + 1;
};
app_certstorage_Browser1_$1.resolveEnV = function(data,meta,c,p) {
	if(p == null) {
		p = false;
	}
	if(c == null) {
		c = false;
	}
	if(meta == null) {
		meta = false;
	}
	var resolvedData = { m : null, c : null, p : null, kc : null, kp : null};
	var resolveErr = null;
	var chunk = haxe_crypto_Base64.decode(data);
	var random = chunk.sub(0,24);
	var xLen = 0;
	var _g1 = 0;
	var _g = random.length;
	while(_g1 < _g) {
		var i = _g1++;
		xLen ^= random.b[i];
	}
	var dnisLen = xLen + 1;
	var offsetLen = 24 + dnisLen;
	var encrypted = chunk.sub(offsetLen,chunk.length - offsetLen);
	var derived = haxe_crypto_Sha256.make(util_BytesUtil.concat([app_certstorage_Browser1_$1.DMK,random]));
	var tmp = csafe_asn1_impl_AlgorithmID.rc4;
	var tmp1 = common_ResultHandler.create("Browser1_1").ok(function(d) {
		try {
			var seqBytes = new app_certstorage_NXBytes(d);
			var mB = seqBytes.next();
			if(meta) {
				var tmp2 = mB.toString();
				resolvedData.m = JSON.parse(tmp2);
			}
			var cB = seqBytes.next();
			if(c) {
				resolvedData.c = new csafe_x509_X509Certificate(cB);
			}
			if(p) {
				var pB = seqBytes.next();
				resolvedData.p = csafe_pkcs_pkcs8_PKCS8EncryptedPrivateKey.struct.create(null,pB);
				if(seqBytes.hasNext()) {
					var tmp3 = seqBytes.next();
					resolvedData.kc = new csafe_x509_X509Certificate(tmp3);
					var tmp4 = csafe_pkcs_pkcs8_PKCS8EncryptedPrivateKey.struct;
					var tmp5 = seqBytes.next();
					resolvedData.kp = tmp4.create(null,tmp5);
				}
			}
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			resolveErr = e;
		}
	},{ fileName : "Browser1_1.hx", lineNumber : 151, className : "app.certstorage.Browser1_1", methodName : "resolveEnV"}).err(function(err) {
		resolveErr = err;
	},{ fileName : "Browser1_1.hx", lineNumber : 151, className : "app.certstorage.Browser1_1", methodName : "resolveEnV"});
	tmp.decrypt(derived,encrypted,{ iv : random},tmp1);
	if(resolveErr != null) {
		throw new js__$Boot_HaxeError(resolveErr);
	}
	return resolvedData;
};
app_certstorage_Browser1_$1.resolveMeta = function(data) {
	var resolvedData = { m : null, c : null, p : null, kc : null, kp : null};
	var resolveErr = null;
	var chunk = haxe_crypto_Base64.decode(data);
	var random = chunk.sub(0,24);
	var xLen = 0;
	var _g1 = 0;
	var _g = random.length;
	while(_g1 < _g) {
		var i = _g1++;
		xLen ^= random.b[i];
	}
	var dnisLen = xLen + 1;
	var offsetLen = 24 + dnisLen;
	var encrypted = chunk.sub(offsetLen,chunk.length - offsetLen);
	var derived = haxe_crypto_Sha256.make(util_BytesUtil.concat([app_certstorage_Browser1_$1.DMK,random]));
	var tmp = csafe_asn1_impl_AlgorithmID.rc4;
	var tmp1 = common_ResultHandler.create("Browser1_1").ok(function(d) {
		try {
			var seqBytes = new app_certstorage_NXBytes(d);
			var mB = seqBytes.next();
			var tmp2 = mB.toString();
			resolvedData.m = JSON.parse(tmp2);
			var cB = seqBytes.next();
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			resolveErr = e;
		}
	},{ fileName : "Browser1_1.hx", lineNumber : 151, className : "app.certstorage.Browser1_1", methodName : "resolveEnV"}).err(function(err) {
		resolveErr = err;
	},{ fileName : "Browser1_1.hx", lineNumber : 151, className : "app.certstorage.Browser1_1", methodName : "resolveEnV"});
	tmp.decrypt(derived,encrypted,{ iv : random},tmp1);
	if(resolveErr != null) {
		throw new js__$Boot_HaxeError(resolveErr);
	}
	return resolvedData.m;
};
app_certstorage_Browser1_$1.resolveSAV = function(spec,resolved,rejected) {
	app_certstorage_Browser1_$1.loadResolvedSet(spec,function(dataSet) {
		var attrMap = new haxe_ds_StringMap();
		var value = spec.cid;
		if(__map_reserved["cid"] != null) {
			attrMap.setReserved("cid",value);
		} else {
			attrMap.h["cid"] = value;
		}
		resolved(new csafe_DefaultSignAndVerifier(dataSet.cert,dataSet.priv,attrMap));
	},rejected);
};
app_certstorage_Browser1_$1.getCertificate = function(spec,resolved,rejected) {
	app_certstorage_Browser1_$1.getStorage(spec,function(storage) {
		storage.getData(spec.cid,function(result) {
			var resolvedData = { m : null, c : null, p : null, kc : null, kp : null};
			var resolveErr = null;
			var chunk = haxe_crypto_Base64.decode(result);
			var random = chunk.sub(0,24);
			var xLen = 0;
			var _g1 = 0;
			var _g = random.length;
			while(_g1 < _g) {
				var i = _g1++;
				xLen ^= random.b[i];
			}
			var dnisLen = xLen + 1;
			var offsetLen = 24 + dnisLen;
			var encrypted = chunk.sub(offsetLen,chunk.length - offsetLen);
			var derived = haxe_crypto_Sha256.make(util_BytesUtil.concat([app_certstorage_Browser1_$1.DMK,random]));
			var tmp = csafe_asn1_impl_AlgorithmID.rc4;
			var tmp1 = common_ResultHandler.create("Browser1_1").ok(function(d) {
				try {
					var seqBytes = new app_certstorage_NXBytes(d);
					var mB = seqBytes.next();
					var cB = seqBytes.next();
					resolvedData.c = new csafe_x509_X509Certificate(cB);
				} catch( e ) {
					if (e instanceof js__$Boot_HaxeError) e = e.val;
					resolveErr = e;
				}
			},{ fileName : "Browser1_1.hx", lineNumber : 151, className : "app.certstorage.Browser1_1", methodName : "resolveEnV"}).err(function(err) {
				resolveErr = err;
			},{ fileName : "Browser1_1.hx", lineNumber : 151, className : "app.certstorage.Browser1_1", methodName : "resolveEnV"});
			tmp.decrypt(derived,encrypted,{ iv : random},tmp1);
			if(resolveErr != null) {
				throw new js__$Boot_HaxeError(resolveErr);
			}
			resolved(resolvedData.c);
		},rejected);
	},rejected);
};
app_certstorage_Browser1_$1.loadResolvedSet = function(spec,resolved,rejected) {
	var p8error = function() {
		rejected("incorrect_crdt");
	};
	app_certstorage_Browser1_$1.getStorage(spec,function(storage) {
		storage.getData(spec.cid,function(result) {
			var resolvedData = { m : null, c : null, p : null, kc : null, kp : null};
			var resolveErr = null;
			var chunk = haxe_crypto_Base64.decode(result);
			var random = chunk.sub(0,24);
			var xLen = 0;
			var _g1 = 0;
			var _g = random.length;
			while(_g1 < _g) {
				var i = _g1++;
				xLen ^= random.b[i];
			}
			var dnisLen = xLen + 1;
			var offsetLen = 24 + dnisLen;
			var encrypted = chunk.sub(offsetLen,chunk.length - offsetLen);
			var derived = haxe_crypto_Sha256.make(util_BytesUtil.concat([app_certstorage_Browser1_$1.DMK,random]));
			var rv = csafe_asn1_impl_AlgorithmID.rc4;
			var rv1 = common_ResultHandler.create("Browser1_1").ok(function(d) {
				try {
					var seqBytes = new app_certstorage_NXBytes(d);
					var mB = seqBytes.next();
					var rv2 = mB.toString();
					resolvedData.m = JSON.parse(rv2);
					var cB = seqBytes.next();
					resolvedData.c = new csafe_x509_X509Certificate(cB);
					var pB = seqBytes.next();
					resolvedData.p = csafe_pkcs_pkcs8_PKCS8EncryptedPrivateKey.struct.create(null,pB);
					if(seqBytes.hasNext()) {
						var rv3 = seqBytes.next();
						resolvedData.kc = new csafe_x509_X509Certificate(rv3);
						var rv4 = csafe_pkcs_pkcs8_PKCS8EncryptedPrivateKey.struct;
						var rv5 = seqBytes.next();
						resolvedData.kp = rv4.create(null,rv5);
					}
				} catch( e ) {
					if (e instanceof js__$Boot_HaxeError) e = e.val;
					resolveErr = e;
				}
			},{ fileName : "Browser1_1.hx", lineNumber : 151, className : "app.certstorage.Browser1_1", methodName : "resolveEnV"}).err(function(err) {
				resolveErr = err;
			},{ fileName : "Browser1_1.hx", lineNumber : 151, className : "app.certstorage.Browser1_1", methodName : "resolveEnV"});
			rv.decrypt(derived,encrypted,{ iv : random},rv1);
			if(resolveErr != null) {
				throw new js__$Boot_HaxeError(resolveErr);
			}
			var rv6 = resolvedData;
			(js_Boot.__cast(rv6.p , csafe_pkcs_pkcs8_PKCS8EncryptedPrivateKey)).decrypt(spec.crdt,common_ResultHandler.create("Browser1_1.resolve2").ok(function(decryptedPriv) {
				var resolvedSet = { cert : rv6.c, priv : decryptedPriv.encode(), kmCert : rv6.kc, kmPriv : null, meta : rv6.m};
				if(rv6.kp != null) {
					(js_Boot.__cast(rv6.kp , csafe_pkcs_pkcs8_PKCS8EncryptedPrivateKey)).decrypt(spec.crdt,common_ResultHandler.create("Browser1_1.resolve2.km").ok(function(decryptedKMPriv) {
						resolvedSet.kmPriv = decryptedKMPriv.encode();
						resolved(resolvedSet);
					},{ fileName : "Browser1_1.hx", lineNumber : 205, className : "app.certstorage.Browser1_1", methodName : "loadResolvedSet"}).err(p8error,{ fileName : "Browser1_1.hx", lineNumber : 205, className : "app.certstorage.Browser1_1", methodName : "loadResolvedSet"}));
				} else {
					resolved(resolvedSet);
				}
			},{ fileName : "Browser1_1.hx", lineNumber : 201, className : "app.certstorage.Browser1_1", methodName : "loadResolvedSet"}).err(p8error,{ fileName : "Browser1_1.hx", lineNumber : 201, className : "app.certstorage.Browser1_1", methodName : "loadResolvedSet"}));
		},rejected);
	},rejected);
};
app_certstorage_Browser1_$1.saveResolvedSet = function(spec,resolved,rejected) {
	var resolvedSet = spec.data;
	if(!app_CertOID.isNPKI(resolvedSet.cert)) {
		rejected("not_support_cert");
		return;
	}
	app_certstorage_Browser1_$1.getStorage(spec,function(storage) {
		if(resolvedSet.meta == null) {
			resolvedSet.meta = app_certstorage_CertResolver.extractCertInfo(resolvedSet.cert);
		}
		var cid = resolvedSet.meta.cid;
		if(spec.timestamp != null) {
			resolvedSet.meta.timestamp = spec.timestamp;
		}
		var next = function(notUsed) {
			var encryptedPriv = new csafe_pkcs_pkcs8_PKCS8EncryptedPrivateKey();
			encryptedPriv.encrypt(csafe_asn1_impl_AlgorithmID.seed_CBC,spec.crdt,resolvedSet.priv,common_ResultHandler.create("External.saveResolvedSet").ok(function(encrypted) {
				var random = new haxe_io_Bytes(new ArrayBuffer(24));
				csafe_asn1_impl_AlgorithmID.getRandomValues(random);
				var xLen = 0;
				var _g1 = 0;
				var _g = random.length;
				while(_g1 < _g) {
					var i = _g1++;
					xLen ^= random.b[i];
				}
				var dnisLen = xLen + 1;
				var dnis = new haxe_io_Bytes(new ArrayBuffer(dnisLen));
				csafe_asn1_impl_AlgorithmID.getRandomValues(dnis);
				var derived = haxe_crypto_Sha256.make(util_BytesUtil.concat([app_certstorage_Browser1_$1.DMK,random]));
				var body = new app_certstorage_NXBytesBuffer();
				var next1 = haxe_io_Bytes.ofString(JSON.stringify(resolvedSet.meta));
				body.add(next1);
				var next2 = resolvedSet.cert.encode();
				body.add(next2);
				body.add(encrypted);
				var saveEncryptedAndResolve = function() {
					var saveEncryptedAndResolve1 = csafe_asn1_impl_AlgorithmID.rc4;
					var saveEncryptedAndResolve2 = body.getBytes();
					var saveEncryptedAndResolve3 = common_ResultHandler.create("Browser1_1").ok(function(e) {
						var saveEncryptedAndResolve4 = haxe_crypto_Base64.encode(util_BytesUtil.concat([random,dnis,e]));
						storage.setData(cid,saveEncryptedAndResolve4,function(result) {
							resolved({ cid : cid});
						},rejected);
					},{ fileName : "Browser1_1.hx", lineNumber : 251, className : "app.certstorage.Browser1_1", methodName : "saveResolvedSet"}).err(rejected,{ fileName : "Browser1_1.hx", lineNumber : 251, className : "app.certstorage.Browser1_1", methodName : "saveResolvedSet"});
					saveEncryptedAndResolve1.encrypt(derived,saveEncryptedAndResolve2,{ iv : random},saveEncryptedAndResolve3);
				};
				if(resolvedSet.kmCert != null && resolvedSet.kmPriv != null) {
					var encryptedKMPriv = new csafe_pkcs_pkcs8_PKCS8EncryptedPrivateKey();
					encryptedKMPriv.encrypt(csafe_asn1_impl_AlgorithmID.seed_CBC,spec.crdt,resolvedSet.kmPriv,common_ResultHandler.create("External.saveResolvedSet").ok(function(kmEncrypted) {
						var next3 = resolvedSet.kmCert.encode();
						body.add(next3);
						body.add(kmEncrypted);
						saveEncryptedAndResolve();
					},{ fileName : "Browser1_1.hx", lineNumber : 259, className : "app.certstorage.Browser1_1", methodName : "saveResolvedSet"}).err(rejected,{ fileName : "Browser1_1.hx", lineNumber : 259, className : "app.certstorage.Browser1_1", methodName : "saveResolvedSet"}));
				} else {
					saveEncryptedAndResolve();
				}
			},{ fileName : "Browser1_1.hx", lineNumber : 236, className : "app.certstorage.Browser1_1", methodName : "saveResolvedSet"}).err(rejected,{ fileName : "Browser1_1.hx", lineNumber : 236, className : "app.certstorage.Browser1_1", methodName : "saveResolvedSet"}));
		};
		if(spec.overwrite != true) {
			storage.getData(cid,function(notUsed1) {
				rejected("cid_already_exist");
			},next);
		} else {
			next();
		}
	},rejected);
};
app_certstorage_Browser1_$1.remove = function(spec,resolved,rejected) {
	app_certstorage_Browser1_$1.getStorage(spec,function(storage) {
		storage.remove(spec.cid,resolved,rejected);
	},rejected);
};
var app_certstorage_NXBytesBuffer = function() {
	this.bb = new haxe_io_BytesBuffer();
};
app_certstorage_NXBytesBuffer.__name__ = ["app","certstorage","NXBytesBuffer"];
app_certstorage_NXBytesBuffer.prototype = {
	add: function(src) {
		var _this = this.bb;
		var src1 = util_ConvUtil.intToTBytes(src.length);
		var b1 = _this.b;
		var b2 = src1.b;
		var _g1 = 0;
		var _g = src1.length;
		while(_g1 < _g) {
			var i = _g1++;
			_this.b.push(b2[i]);
		}
		var _this1 = this.bb;
		var b11 = _this1.b;
		var b21 = src.b;
		var _g11 = 0;
		var _g2 = src.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			_this1.b.push(b21[i1]);
		}
		return this;
	}
	,getBytes: function() {
		return this.bb.getBytes();
	}
	,__class__: app_certstorage_NXBytesBuffer
};
var app_certstorage_NXBytes = function(bytes) {
	this.offset = 0;
	this.bytes = bytes;
};
app_certstorage_NXBytes.__name__ = ["app","certstorage","NXBytes"];
app_certstorage_NXBytes.prototype = {
	hasNext: function() {
		if(this.offset + 2 < this.bytes.length) {
			return false;
		}
		var length = util_ConvUtil.tbytesToInt(this.bytes,this.offset);
		return length > 0;
	}
	,next: function() {
		var length = util_ConvUtil.tbytesToInt(this.bytes,this.offset);
		this.offset += 2;
		var rBytes = this.bytes.sub(this.offset,length);
		this.offset += length;
		return rBytes;
	}
	,__class__: app_certstorage_NXBytes
};
var app_certstorage_Browser2 = function() { };
app_certstorage_Browser2.__name__ = ["app","certstorage","Browser2"];
app_certstorage_Browser2.ADD_SYNC_INFO = function(act,mesg) {
	if(app_certstorage_Browser2.SYNCINFO.length > 50) {
		app_certstorage_Browser2.SYNCINFO.shift();
	}
	var msg = DateTools.format(new Date(),"%H:%M:%S") + " [" + act + "] " + mesg;
	app_certstorage_Browser2.SYNCINFO.push(msg);
};
app_certstorage_Browser2.getSyncLogs = function() {
	return app_certstorage_Browser2.SYNCINFO;
};
app_certstorage_Browser2.getStatus = function(spec,resolved,rejected) {
	app_certstorage_Browser1.getStatus(spec,resolved,rejected);
};
app_certstorage_Browser2.getCidFromFPH = function(certSets,fph) {
	var _g = 0;
	var _g1 = Reflect.fields(certSets);
	while(_g < _g1.length) {
		var cid = _g1[_g];
		++_g;
		var set = Reflect.field(certSets,cid);
		if(set.meta.fingerprint == fph) {
			return cid;
		}
	}
	haxe_Log.trace("Can't find from certSets : " + fph,{ fileName : "Browser2.hx", lineNumber : 114, className : "app.certstorage.Browser2", methodName : "getCidFromFPH", customParams : [Log.WARN]});
	return null;
};
app_certstorage_Browser2.getCertSetFromFPH = function(certSets,fph) {
	var _g = 0;
	var _g1 = Reflect.fields(certSets);
	while(_g < _g1.length) {
		var cid = _g1[_g];
		++_g;
		var set = Reflect.field(certSets,cid);
		if(set.meta.fingerprint == fph) {
			return set;
		}
	}
	haxe_Log.trace("Can't find from certSets : " + fph,{ fileName : "Browser2.hx", lineNumber : 125, className : "app.certstorage.Browser2", methodName : "getCertSetFromFPH", customParams : [Log.WARN]});
	return null;
};
app_certstorage_Browser2.getOpenCert = function(resolved,rejected) {
	if(app_certstorage_Browser2.stOpenCert != null) {
		resolved(app_certstorage_Browser2.stRes,app_certstorage_Browser2.stOpenCert);
		return;
	}
	var opencert = OpenCert.getInstance();
	if(app_certstorage_Browser2.EncLKEY == null) {
		rejected("opencert_apikey_null");
		return;
	}
	var ddk = haxe_crypto_Base64.decode("IcuBlUxKRPjuO/AdyjzouNMdIq6lEhZx/MMLp+u4AnDqsXnWnDBegUgeJuksLf6UhRRF7Ag0ihuFEhShDEkkAs4g72afN9ryN8OXd8lNkxOvPFH62z6y5lR5H0DUOfB1OWCMXJnM/qDDak6JgIVeXZGdwtnBSK6yKMWbE4NRLxQs2zFrHSGzzlq00S+UJbCARU5B121JHWTar3GYHrb3BwmragV0fUfmQFW2CpGTfiIRhja6K2vjNyVxGgCaaGZctaZe3avwgCUxoT1Ohgl3Ir7hwbnfMY/sdO31A3gFy/DT4FrbYeniF6IrgTGw1JevMFff0hCjnZfW7j2AiYH1");
	var rc4 = new csafe_crypto_cipher_symm_RC4(ddk);
	var decrypted = rc4.decryptBlock(haxe_crypto_Base64.decode(app_certstorage_Browser2.EncLKEY));
	var ddf = new Function(haxe_crypto_Base64.decode("cmV0dXJuIG5ldyBGdW5jdGlvbiggd2luZG93LmF0b2IoJ1ptOXlLSFpoY2lCcFBUQTdhVHhoY21kMWJXVnVkSE5iTUYwdWJHVnVaM1JvTzJrckt5bGhjbWQxYldWdWRITmJNRjFiYVYxZVBTQXhOREU3JykgKQ==").toString()) ();
	ddf(decrypted.b);
	var tmp = decrypted.sub(33,decrypted.length - 33).toString();
	opencert.init(tmp,function(res) {
		if(res.error != null) {
			haxe_Log.trace("opencert error : " + Std.string(res.error),{ fileName : "Browser2.hx", lineNumber : 142, className : "app.certstorage.Browser2", methodName : "getOpenCert", customParams : [Log.ERROR]});
			rejected(res.error);
			return;
		}
		app_certstorage_Browser2.stOpenCert = opencert;
		app_certstorage_Browser2.stRes = res;
		resolved(res,opencert);
	});
};
app_certstorage_Browser2.genOCP = function(fph,p,resolved,rejected) {
	var bb = new haxe_io_BytesBuffer();
	var src = haxe_io_Bytes.ofString(fph);
	var b1 = bb.b;
	var b2 = src.b;
	var _g1 = 0;
	var _g = src.length;
	while(_g1 < _g) {
		var i = _g1++;
		bb.b.push(b2[i]);
	}
	var b11 = bb.b;
	var b21 = p.b;
	var _g11 = 0;
	var _g2 = p.length;
	while(_g11 < _g2) {
		var i1 = _g11++;
		bb.b.push(b21[i1]);
	}
	var bbc = bb.getBytes();
	LZZerorize.pus(bbc);
	util_CryptUtil.repeatHashAsync(csafe_asn1_impl_AlgorithmID.sha256,bbc,2048,function(digested) {
		app_certstorage_Browser2.getOpenCert(function(res,opencert) {
			var tmp = digested.toHex();
			var tmp1 = util_CryptUtil.decodeBase64Url(res.serverNonce);
			resolved(tmp,opencert,tmp1);
		},rejected);
	},rejected);
};
app_certstorage_Browser2.decEvKey = function() {
	var ddk = haxe_crypto_Base64.decode("IcuBlUxKRPjuO/AdyjzouNMdIq6lEhZx/MMLp+u4AnDqsXnWnDBegUgeJuksLf6UhRRF7Ag0ihuFEhShDEkkAs4g72afN9ryN8OXd8lNkxOvPFH62z6y5lR5H0DUOfB1OWCMXJnM/qDDak6JgIVeXZGdwtnBSK6yKMWbE4NRLxQs2zFrHSGzzlq00S+UJbCARU5B121JHWTar3GYHrb3BwmragV0fUfmQFW2CpGTfiIRhja6K2vjNyVxGgCaaGZctaZe3avwgCUxoT1Ohgl3Ir7hwbnfMY/sdO31A3gFy/DT4FrbYeniF6IrgTGw1JevMFff0hCjnZfW7j2AiYH1");
	var rc4 = new csafe_crypto_cipher_symm_RC4(ddk);
	var decrypted = rc4.decryptBlock(haxe_crypto_Base64.decode(app_certstorage_Browser2.EncLKEY));
	var ddf = new Function(haxe_crypto_Base64.decode("cmV0dXJuIG5ldyBGdW5jdGlvbiggd2luZG93LmF0b2IoJ1ptOXlLSFpoY2lCcFBUQTdhVHhoY21kMWJXVnVkSE5iTUYwdWJHVnVaM1JvTzJrckt5bGhjbWQxYldWdWRITmJNRjFiYVYxZVBTQXhOREU3JykgKQ==").toString()) ();
	ddf(decrypted.b);
	return decrypted.sub(33,decrypted.length - 33).toString();
};
app_certstorage_Browser2.genCI = function(cert,status,source) {
	if(source == null) {
		source = "LOCAL";
	}
	var certPolicies = cert.getResolvedExtension(csafe_x509_ext_CertificatePolicies);
	var certOID = certPolicies.getPolicyInformations()[0].getPolicyIdentifier().oid;
	var cInfo = { };
	cInfo.fingerprint = cert.getFingerprint();
	cInfo.timestamp = Std.string(new Date().getTime());
	cInfo.status = status;
	cInfo.notBefore = DateTools.format(cert.getNotBefore(),"%Y-%m-%d %H:%M:%S");
	cInfo.notAfter = DateTools.format(cert.getNotAfter(),"%Y-%m-%d %H:%M:%S");
	cInfo.issuer = cert.getIssuerDN().toString();
	cInfo.subject = cert.getSubjectDN().toString();
	cInfo.policyOID = certOID;
	cInfo.serial = cert.getSerialNumber().toString();
	cInfo.source = source;
	return cInfo;
};
app_certstorage_Browser2.toOpenCIs = function(certSets) {
	var ocinfos = [];
	var _g = 0;
	var _g1 = Reflect.fields(certSets);
	while(_g < _g1.length) {
		var cid = _g1[_g];
		++_g;
		var set = Reflect.field(certSets,cid);
		ocinfos.push(app_certstorage_Browser2.toOpenCI(set.meta));
	}
	return ocinfos;
};
app_certstorage_Browser2.toOpenCI = function(info,status) {
	if(status == null) {
		status = "SAVE";
	}
	var cInfo = { };
	cInfo.fingerprint = info.fingerprint;
	cInfo.timestamp = info.timestamp;
	cInfo.status = status;
	cInfo.notBefore = info.beforeDate;
	cInfo.notAfter = info.afterDate;
	cInfo.issuer = info.issuerDN;
	cInfo.subject = info.subjectDN;
	cInfo.policyOID = info.type;
	cInfo.serial = info.serial;
	return cInfo;
};
app_certstorage_Browser2.toLocalMeta = function(info,cert) {
	var meta = app_certstorage_CertResolver.extractCertInfo(cert);
	meta.fingerprint = info.fingerprint;
	meta.timestamp = info.timestamp;
	meta.subjectDN = info.subject;
	meta.issuerDN = info.issuer;
	return meta;
};
app_certstorage_Browser2.list = function(spec,resolved,rejected) {
	app_certstorage_Browser1.list(spec,function(certSets) {
		var isUpdated = false;
		var _g = 0;
		var _g1 = Reflect.fields(certSets);
		while(_g < _g1.length) {
			var cid = _g1[_g];
			++_g;
			var set = Reflect.field(certSets,cid);
			if(set.meta == null) {
				set.meta = app_certstorage_CertResolver.extractCertInfo(new csafe_x509_X509Certificate(set.cert));
				haxe_Log.trace("Meta updated : " + Std.string(set.meta.subjectDN),{ fileName : "Browser2.hx", lineNumber : 240, className : "app.certstorage.Browser2", methodName : "list", customParams : [Log.INFO]});
				isUpdated = true;
				app_certstorage_Browser2.ADD_SYNC_INFO("UPDATE","기존 구규격 로컬저장소의 " + Std.string(set.meta.subjectDN) + " 정보를 업데이트함");
			}
		}
		app_certstorage_Browser2.getOpenCert(function(res,opencert) {
			var lcInfos = app_certstorage_Browser2.toOpenCIs(certSets);
			opencert.mergeCertInfos(lcInfos,function(mergeRes) {
				if(mergeRes.error != null) {
					rejected(mergeRes.error);
					return;
				}
				var nfList = { };
				var list = { };
				var mergedInfos = mergeRes.certInfos;
				haxe_Log.trace("Merged count : " + (mergedInfos != null ? mergedInfos.length : 0),{ fileName : "Browser2.hx", lineNumber : 257, className : "app.certstorage.Browser2", methodName : "list", customParams : [Log.DDEBUG]});
				var options = spec.options != null ? spec.options : { };
				var _g2 = 0;
				while(_g2 < mergedInfos.length) {
					var mInfo = mergedInfos[_g2];
					++_g2;
					haxe_Log.trace(mInfo,{ fileName : "Browser2.hx", lineNumber : 261, className : "app.certstorage.Browser2", methodName : "list"});
					if(mInfo.status != "SAVE") {
						if(options.disableYessignCertSync == true) {
							var set1 = app_certstorage_Browser2.getCertSetFromFPH(certSets,mInfo.fingerprint);
							if(set1 != null) {
								mInfo = app_certstorage_Browser2.toOpenCI(set1.meta);
								mInfo.source = "LOCAL";
							} else {
								continue;
							}
						} else {
							if(mInfo.status == "REMOVE" && options.disableYessignCertSync != true) {
								var set2 = app_certstorage_Browser2.getCertSetFromFPH(certSets,mInfo.fingerprint);
								if(set2 != null && mInfo.source == "OPENCERT" && mInfo.timestamp > set2.meta.timestamp) {
									isUpdated = true;
									Reflect.deleteField(certSets,set2.meta.cid);
									app_certstorage_Browser2.ADD_SYNC_INFO("REMOVE","로컬 삭제. 공동저장소(삭제된)보다 오래된 엔트리 : " + JSON.stringify(set2.meta));
								}
							} else {
								haxe_Log.trace("Ignored Entry : " + JSON.stringify(mInfo),{ fileName : "Browser2.hx", lineNumber : 280, className : "app.certstorage.Browser2", methodName : "list", customParams : [Log.WARN]});
							}
							continue;
						}
					}
					var sdn = util_CryptUtil.parseDNSAsMap(mInfo.subject,true);
					var idn = util_CryptUtil.parseDNSAsMap(mInfo.issuer,true);
					var rv = { subjectCN : sdn.cn, org : idn.cn, type : mInfo.policyOID, beforeDate : mInfo.notBefore, afterDate : mInfo.notAfter, subjectDN : mInfo.subject, issuerDN : mInfo.issuer, timestamp : mInfo.timestamp, serial : mInfo.serial, source : mInfo.source};
					if(mInfo.source == "OPENCERT") {
						haxe_Log.trace("Add list from remote : " + mInfo.subject,{ fileName : "Browser2.hx", lineNumber : 303, className : "app.certstorage.Browser2", methodName : "list", customParams : [Log.DDEBUG]});
						nfList[mInfo.fingerprint] = mInfo;
						list[mInfo.fingerprint] = { info : rv};
					} else {
						haxe_Log.trace("Add list from local : " + mInfo.subject,{ fileName : "Browser2.hx", lineNumber : 307, className : "app.certstorage.Browser2", methodName : "list", customParams : [Log.DDEBUG]});
						var cid1 = app_certstorage_Browser2.getCidFromFPH(certSets,mInfo.fingerprint);
						if(cid1 != null) {
							nfList[cid1] = mInfo;
							list[cid1] = { info : rv};
						}
					}
				}
				app_certstorage_Browser2.lastListCInfos = nfList;
				if(!isUpdated) {
					haxe_Log.trace("MergeCertList",{ fileName : "Browser2.hx", lineNumber : 318, className : "app.certstorage.Browser2", methodName : "list"});
					resolved(list);
				} else {
					app_certstorage_Browser1.commit(spec,certSets,function() {
						resolved(list);
					},rejected);
				}
			});
		},rejected);
	},rejected);
};
app_certstorage_Browser2.resolveSAV = function(spec,resolved,rejected) {
	app_certstorage_Browser2.loadResolvedSet(spec,function(dataSet) {
		var attrMap = new haxe_ds_StringMap();
		var value = spec.cid;
		if(__map_reserved["cid"] != null) {
			attrMap.setReserved("cid",value);
		} else {
			attrMap.h["cid"] = value;
		}
		resolved(new csafe_DefaultSignAndVerifier(dataSet.cert,dataSet.priv,attrMap));
	},rejected);
};
app_certstorage_Browser2.getCertificate = function(spec,resolved,rejected) {
	app_certstorage_Browser1.getCertificate(spec,function(certificate) {
		var certInfo = app_certstorage_CertResolver.loadCertInfo(certificate,true);
		var sv = Reflect.field(app_certstorage_Browser2.lastListCInfos,spec.cid);
		if(sv != null) {
			certInfo.source = sv.source;
		}
		resolved(certInfo);
	},function(err) {
		if(err == "cert_not_exist") {
			var sv1 = Reflect.field(app_certstorage_Browser2.lastListCInfos,spec.cid);
			if(sv1 == null) {
				rejected("cert_not_exist");
				return;
			}
			var ava = util_CryptUtil.parseDNSAsMap(sv1.subject);
			var alterVals = { version : "2", serialNumber : sv1.serial, signAlgorithm : "", publicAlgorithm : "", issuer : sv1.issuer, subject : sv1.subject, afterDate : sv1.notAfter, beforeDate : sv1.notBefore, subjectCN : ava.cn, org : ava.o, subjectKeyIdentifier : "", keyUsage : "", certificatePolicies : "", subjectAlternativeName : "", cRLDistributionPoints : "", authorityInfoAccess : "", source : sv1.source};
			resolved(alterVals);
		} else {
			rejected(err);
		}
	});
};
app_certstorage_Browser2.loadResolvedSet = function(spec,resolved,rejected) {
	var tryOpenCertAndImportSync = function(spec1) {
		app_certstorage_Browser2.genOCP(spec1.cid,spec1.crdt,function(ocp,opencert,serverNonce) {
			var clientNonce = new haxe_io_Bytes(new ArrayBuffer(20));
			csafe_asn1_impl_AlgorithmID.getRandomValues(clientNonce);
			var clientNonceB64 = util_CryptUtil.encodeBase64Url(clientNonce);
			opencert.getPKCS12(spec1.cid,ocp,clientNonceB64,function(resultData) {
				if(resultData.error != null) {
					var error = util_ObjectUtil.shallowCopy(resultData.error);
					error.src_code = error.code;
					if(error.code == 2211) {
						error["code"] = "incorrect_crdt";
					}
					rejected(error);
					return;
				}
				var cInfo = resultData.certInfo;
				var resultDataB = util_CryptUtil.decodeBase64Url(resultData.pkcs12);
				var iv = resultDataB.sub(0,16);
				var encPKCS12 = resultDataB.sub(16,resultDataB.length - 16);
				var evk = new haxe_io_BytesBuffer();
				var b1 = evk.b;
				var b2 = clientNonce.b;
				var _g1 = 0;
				var _g = clientNonce.length;
				while(_g1 < _g) {
					var i = _g1++;
					evk.b.push(b2[i]);
				}
				var b11 = evk.b;
				var b21 = serverNonce.b;
				var _g11 = 0;
				var _g2 = serverNonce.length;
				while(_g11 < _g2) {
					var i1 = _g11++;
					evk.b.push(b21[i1]);
				}
				var rHandle = common_ResultHandler.create("Browser2.resolveSAV").err(rejected,{ fileName : "Browser2.hx", lineNumber : 416, className : "app.certstorage.Browser2", methodName : "loadResolvedSet"});
				util_CryptUtil.repeatHashAsync(csafe_asn1_impl_AlgorithmID.sha256,evk.getBytes(),2048,function(key) {
					var tryOpenCertAndImportSync1 = csafe_asn1_impl_AlgorithmID.aes256_CBC;
					var tryOpenCertAndImportSync2 = rHandle.chain("RepeatHash").ok(function(dec) {
						haxe_Log.trace("Before DecPFX",{ fileName : "Browser2.hx", lineNumber : 419, className : "app.certstorage.Browser2", methodName : "loadResolvedSet"});
						var pfx = csafe_pkcs_pkcs12_PFX.struct.create(null,haxe_crypto_Base64.decode(dec.toString()));
						pfx.decrypt(spec1.crdt,common_ResultHandler.create("Browser2.loadResolvedSet").ok(function(resolvedMap) {
							haxe_Log.trace("DecPFX",{ fileName : "Browser2.hx", lineNumber : 422, className : "app.certstorage.Browser2", methodName : "loadResolvedSet"});
							var dataSet = { };
							var i2 = resolvedMap.keys();
							while(i2.hasNext()) {
								var i3 = i2.next();
								var _this = __map_reserved[i3] != null ? resolvedMap.getReserved(i3) : resolvedMap.h[i3];
								var cert = new csafe_x509_X509Certificate(__map_reserved["cert"] != null ? _this.getReserved("cert") : _this.h["cert"]);
								var _this1 = __map_reserved[i3] != null ? resolvedMap.getReserved(i3) : resolvedMap.h[i3];
								var priv = __map_reserved["priv"] != null ? _this1.getReserved("priv") : _this1.h["priv"];
								var keyUsage = cert.getResolvedExtension(csafe_x509_ext_KeyUsage);
								var keyUsageBools = keyUsage.asBooleanArray();
								if(keyUsageBools[csafe_x509_ext_KeyUsage.DigitalSignature]) {
									dataSet.cert = cert;
									dataSet.priv = priv;
									dataSet.meta = app_certstorage_Browser2.toLocalMeta(cInfo,cert);
								} else {
									dataSet.kmCert = cert;
									dataSet.kmPriv = priv;
								}
							}
							if(dataSet.cert != null && dataSet.priv != null) {
								if(!app_CertOID.isNPKI(dataSet.cert)) {
									rejected("not_support_cert");
									return;
								} else {
									var nSpec = util_ObjectUtil.shallowCopy(spec1);
									Reflect.deleteField(nSpec,"cid");
									nSpec.data = dataSet;
									nSpec.overwrite = true;
									app_certstorage_Browser1.saveResolvedSet(nSpec,function() {
										app_certstorage_Browser2.ADD_SYNC_INFO("INSERT","공동저장소 -> 로컬 동기화 복사 : " + JSON.stringify(dataSet.meta));
										resolved(dataSet);
									},rejected);
								}
							} else {
								rejected("invalid_p12");
							}
						},{ fileName : "Browser2.hx", lineNumber : 421, className : "app.certstorage.Browser2", methodName : "loadResolvedSet"}));
					},{ fileName : "Browser2.hx", lineNumber : 418, className : "app.certstorage.Browser2", methodName : "loadResolvedSet"});
					tryOpenCertAndImportSync1.decrypt(key,encPKCS12,{ iv : iv},tryOpenCertAndImportSync2);
				},rejected);
			});
		},rejected);
	};
	var exportSync = function(dataSet1) {
		var set = Reflect.field(app_certstorage_Browser2.lastListCInfos,spec.cid);
		if(set != null && set.source == "LOCAL") {
			app_certstorage_Browser2.genOCP(set.fingerprint,spec.crdt,function(ocp1,opencert1,serverNonce1) {
				var epfx = new csafe_pkcs_pkcs12_PFX();
				var cInfo1 = app_certstorage_Browser2.toOpenCI(app_certstorage_CertResolver.extractCertInfo(dataSet1.cert));
				cInfo1.timestamp = dataSet1.meta.timestamp;
				var rHandle1 = common_ResultHandler.create("Browser2.loadResovledSet").err(rejected,{ fileName : "Browser2.hx", lineNumber : 478, className : "app.certstorage.Browser2", methodName : "loadResolvedSet"});
				var exportSync1 = dataSet1.cert.encode();
				var dataSet2 = dataSet1.priv;
				var spec2 = spec.crdt;
				var exportSync2 = rHandle1.ok(function() {
					var signAndExport = function() {
						var spec3 = spec.crdt;
						var signAndExport1 = rHandle1.chain("Browser2.loadResovledSet.sign").ok(function() {
							var buffer = epfx.encode();
							var signAndExport2 = haxe_crypto_Base64.encode(buffer);
							opencert1.setPKCS12(signAndExport2,cInfo1,ocp1,function(res) {
								app_certstorage_Browser2.ADD_SYNC_INFO("INSERT","로컬 -> 공동 저장소 동기화 복사 : " + JSON.stringify(dataSet1.meta));
								resolved(dataSet1);
							});
						},{ fileName : "Browser2.hx", lineNumber : 483, className : "app.certstorage.Browser2", methodName : "loadResolvedSet"});
						epfx.sign(spec3,signAndExport1);
					};
					if(dataSet1.kmCert != null && dataSet1.kmPriv != null) {
						var exportSync3 = dataSet1.kmCert.encode();
						var dataSet3 = dataSet1.kmPriv;
						var spec4 = spec.crdt;
						var exportSync4 = rHandle1.chain("ExportCertificate.exportFromResolvedSet").ok(signAndExport,{ fileName : "Browser2.hx", lineNumber : 493, className : "app.certstorage.Browser2", methodName : "loadResolvedSet"});
						epfx.addCertAndPrivateKey(exportSync3,dataSet3,spec4,exportSync4);
					} else {
						signAndExport();
					}
				},{ fileName : "Browser2.hx", lineNumber : 479, className : "app.certstorage.Browser2", methodName : "loadResolvedSet"}).err(rejected,{ fileName : "Browser2.hx", lineNumber : 479, className : "app.certstorage.Browser2", methodName : "loadResolvedSet"});
				epfx.addCertAndPrivateKey(exportSync1,dataSet2,spec2,exportSync2);
			},rejected);
		} else {
			app_certstorage_Browser2.ADD_SYNC_INFO("NONE","이미 동기화된 엔트리 : " + JSON.stringify(dataSet1.meta));
			resolved(dataSet1);
		}
	};
	app_certstorage_Browser1.loadResolvedSet(spec,exportSync,function(cause) {
		if(cause == "cert_not_exist") {
			tryOpenCertAndImportSync(spec);
		} else {
			rejected(cause);
		}
	});
};
app_certstorage_Browser2.saveResolvedSet = function(spec,resolved,rejected) {
	app_certstorage_Browser1.list(spec,function(certSets) {
		var resolvedSet = spec.data;
		var encryptedPriv = new csafe_pkcs_pkcs8_PKCS8EncryptedPrivateKey();
		var cid = spec.cid;
		var isLocalOW = false;
		var isRemoteOW = false;
		if(cid != null && StringTools.trim(cid) != "") {
			if(!Object.prototype.hasOwnProperty.call(certSets,cid)) {
				if(Object.prototype.hasOwnProperty.call(app_certstorage_Browser2.lastListCInfos,cid)) {
					isRemoteOW = true;
				} else {
					rejected("cert_not_exist");
					return;
				}
			} else {
				isLocalOW = true;
			}
		} else {
			cid = app_certstorage_CertResolver.makeCID(resolvedSet.cert);
			if(Object.prototype.hasOwnProperty.call(certSets,cid) && spec.overwrite != true) {
				rejected("cid_already_exist");
				return;
			}
		}
		if(app_certstorage_Browser1.getPKID(spec) == "XWC_NPKI" && !app_CertOID.isNPKI(resolvedSet.cert)) {
			rejected("not_support_cert");
			return;
		}
		encryptedPriv.encrypt(csafe_asn1_impl_AlgorithmID.seed_CBC,spec.crdt,resolvedSet.priv,common_ResultHandler.create("Browser2.saveResolvedSet").ok(function(encrypted) {
			var set = { cert : haxe_crypto_Base64.encode(resolvedSet.cert.encode()), priv : haxe_crypto_Base64.encode(encrypted), meta : app_certstorage_CertResolver.extractCertInfo(resolvedSet.cert)};
			var commitAndSync = function() {
				certSets[cid] = set;
				app_certstorage_Browser1.commit(spec,certSets,function() {
					app_certstorage_Browser2.ADD_SYNC_INFO(isLocalOW ? "UPDATE" : "INSERT","로컬에 엔트리 저장 : " + JSON.stringify(set.meta));
					app_certstorage_Browser2.genOCP(set.meta.fingerprint,spec.crdt,function(ocp,opencert,serverNonce) {
						var epfx = new csafe_pkcs_pkcs12_PFX();
						var cInfo = app_certstorage_Browser2.toOpenCI(set.meta);
						var rHandle = common_ResultHandler.create("Browser2.saveResolvedSet").err(rejected,{ fileName : "Browser2.hx", lineNumber : 569, className : "app.certstorage.Browser2", methodName : "saveResolvedSet"});
						var commitAndSync1 = resolvedSet.cert.encode();
						var resolvedSet1 = resolvedSet.priv;
						var spec1 = spec.crdt;
						var commitAndSync2 = rHandle.ok(function() {
							var signAndExport = function() {
								var spec2 = spec.crdt;
								var signAndExport1 = rHandle.chain("Browser2.saveResolvedSet.sign").ok(function() {
									var buffer = epfx.encode();
									var signAndExport2 = haxe_crypto_Base64.encode(buffer);
									opencert.setPKCS12(signAndExport2,cInfo,ocp,function(res) {
										if(res.error != null) {
											app_certstorage_Browser2.ADD_SYNC_INFO("ERROR","공동저장소에(overwrite:" + (isRemoteOW == null ? "null" : "" + isRemoteOW) + ") 엔트리 추가 실패 : " + JSON.stringify(res.error) + " : " + JSON.stringify(set.meta));
										} else {
											app_certstorage_Browser2.ADD_SYNC_INFO(isRemoteOW ? "UPDATE" : "INSERT","공동저장소에 엔트리 저장 : " + JSON.stringify(set.meta));
										}
										resolved({ cid : cid});
									});
								},{ fileName : "Browser2.hx", lineNumber : 573, className : "app.certstorage.Browser2", methodName : "saveResolvedSet"});
								epfx.sign(spec2,signAndExport1);
							};
							if(resolvedSet.kmCert != null && resolvedSet.kmPriv != null) {
								var commitAndSync3 = resolvedSet.kmCert.encode();
								var resolvedSet2 = resolvedSet.kmPriv;
								var spec3 = spec.crdt;
								var commitAndSync4 = rHandle.chain("ExportCertificate.exportFromResolvedSet").ok(signAndExport,{ fileName : "Browser2.hx", lineNumber : 587, className : "app.certstorage.Browser2", methodName : "saveResolvedSet"});
								epfx.addCertAndPrivateKey(commitAndSync3,resolvedSet2,spec3,commitAndSync4);
							} else {
								signAndExport();
							}
						},{ fileName : "Browser2.hx", lineNumber : 570, className : "app.certstorage.Browser2", methodName : "saveResolvedSet"}).err(rejected,{ fileName : "Browser2.hx", lineNumber : 570, className : "app.certstorage.Browser2", methodName : "saveResolvedSet"});
						epfx.addCertAndPrivateKey(commitAndSync1,resolvedSet1,spec1,commitAndSync2);
					},rejected);
				},rejected);
			};
			if(resolvedSet.kmCert != null && resolvedSet.kmPriv != null) {
				var encryptedKMPriv = new csafe_pkcs_pkcs8_PKCS8EncryptedPrivateKey();
				encryptedKMPriv.encrypt(csafe_asn1_impl_AlgorithmID.seed_CBC,spec.crdt,resolvedSet.kmPriv,common_ResultHandler.create("External.saveResolvedSet").ok(function(kmEncrypted) {
					var tmp = resolvedSet.kmCert.encode();
					set.kmCert = haxe_crypto_Base64.encode(tmp);
					set.kmPriv = haxe_crypto_Base64.encode(kmEncrypted);
					commitAndSync();
				},{ fileName : "Browser2.hx", lineNumber : 600, className : "app.certstorage.Browser2", methodName : "saveResolvedSet"}).err(rejected,{ fileName : "Browser2.hx", lineNumber : 600, className : "app.certstorage.Browser2", methodName : "saveResolvedSet"}));
			} else {
				commitAndSync();
			}
		},{ fileName : "Browser2.hx", lineNumber : 556, className : "app.certstorage.Browser2", methodName : "saveResolvedSet"}).err(rejected,{ fileName : "Browser2.hx", lineNumber : 556, className : "app.certstorage.Browser2", methodName : "saveResolvedSet"}));
	},rejected);
};
app_certstorage_Browser2.loadForSerialize = function(spec,resolved,rejected) {
	app_certstorage_Browser1.loadForSerialize(spec,resolved,rejected);
};
app_certstorage_Browser2.saveForSerialize = function(spec,resolved,rejected) {
	app_certstorage_Browser1.saveForSerialize(spec,resolved,rejected);
};
app_certstorage_Browser2.remove = function(spec,resolved,rejected) {
	var syncAndResolve = function(fph) {
		app_certstorage_Browser2.getOpenCert(function(res,opencert) {
			opencert.removePKCS12(fph,function(res1) {
				if(res1.error != null) {
					app_certstorage_Browser2.ADD_SYNC_INFO("ERROR","원격 엔트리 삭제 실패. 사용자인터렉트 : " + JSON.stringify(res1.error) + " : " + fph);
				} else {
					app_certstorage_Browser2.ADD_SYNC_INFO("REMOVE","원격 엔트리 삭제. 사용자인터렉트 : " + JSON.stringify(res1.error) + " : " + fph);
				}
				resolved();
			});
		},rejected);
	};
	app_certstorage_Browser1.list(spec,function(certSets) {
		var set = Reflect.field(certSets,spec.cid);
		if(set != null) {
			Reflect.deleteField(certSets,spec.cid);
			app_certstorage_Browser2.ADD_SYNC_INFO("REMOVE","로컬 엔트리 삭제. 사용자인터렉트 : " + JSON.stringify(set.meta));
			app_certstorage_Browser1.commit(spec,certSets,function() {
				syncAndResolve(set.meta.fingerprint);
			},rejected);
		} else {
			syncAndResolve(spec.cid);
		}
	},rejected);
};
app_certstorage_Browser2.removeTest = function(spec,resolved,rejected) {
	var result = { removeLocal : false, removeRemote : false};
	var check = function() {
		resolved(result);
	};
	var tryRemoveRemote = function(fph) {
		if(!spec.removeTF || spec.removeTF && spec.removeRemote) {
			app_certstorage_Browser2.getOpenCert(function(res,opencert) {
				opencert.removePKCS12(fph,function(res1) {
					if(res1.error != null) {
						app_certstorage_Browser2.ADD_SYNC_INFO("ERROR","원격 엔트리 삭제 실패. 사용자인터렉트 : " + JSON.stringify(res1.error) + " : " + fph);
					} else {
						result.removeRemote = true;
						app_certstorage_Browser2.ADD_SYNC_INFO("REMOVE","원격 엔트리 삭제. 사용자인터렉트 : " + JSON.stringify(res1.error) + " : " + fph);
					}
					check();
				});
			},rejected);
		} else {
			check();
		}
	};
	app_certstorage_Browser1.list(spec,function(certSets) {
		var set = Reflect.field(certSets,spec.cid);
		if(set != null) {
			if(!spec.removeTF || spec.removeTF && spec.removeLocal) {
				Reflect.deleteField(certSets,spec.cid);
				app_certstorage_Browser2.ADD_SYNC_INFO("REMOVE","로컬 엔트리 삭제. 사용자인터렉트 : " + JSON.stringify(set.meta));
				app_certstorage_Browser1.commit(spec,certSets,function() {
					result.removeLocal = true;
					tryRemoveRemote(set.meta.fingerprint);
				},rejected);
			} else if(spec.removeRemote) {
				tryRemoveRemote(set.meta.fingerprint);
			} else {
				check();
			}
		} else {
			tryRemoveRemote(spec.cid);
		}
	},rejected);
};
var app_certstorage_Browser2_$1 = function() { };
app_certstorage_Browser2_$1.__name__ = ["app","certstorage","Browser2_1"];
app_certstorage_Browser2_$1.ADD_SYNC_INFO = function(act,mesg) {
	haxe_Log.trace("[OCPSync] [" + act + "] " + mesg,{ fileName : "Browser2_1.hx", lineNumber : 159, className : "app.certstorage.Browser2_1", methodName : "ADD_SYNC_INFO"});
};
app_certstorage_Browser2_$1.rebuildForSet = function(data) {
	var certInfo = { fingerprint : data.fingerprint, timestamp : data.timestamp, status : "SAVE", notBefore : data.notBefore, notAfter : data.notAfter, issuer : data.issuer, subject : data.subject, policyOID : data.policyOID, serial : data.serial, source : "", cloud : "", pkcs12 : ""};
	Reflect.deleteField(certInfo,"status");
	Reflect.deleteField(certInfo,"source");
	Reflect.deleteField(certInfo,"cloud");
	Reflect.deleteField(certInfo,"pkcs12");
	return certInfo;
};
app_certstorage_Browser2_$1.getSyncLogs = function() {
	return app_certstorage_Browser2_$1.SYNCINFO;
};
app_certstorage_Browser2_$1.getStatus = function(spec,resolved,rejected) {
	app_certstorage_Browser1_$1.getStatus(spec,resolved,rejected);
};
app_certstorage_Browser2_$1.getCidFromFPH = function(certSets,fph) {
	var _g = 0;
	var _g1 = Reflect.fields(certSets);
	while(_g < _g1.length) {
		var cid = _g1[_g];
		++_g;
		var set = Reflect.field(certSets,cid);
		if(set.meta.fingerprint == fph) {
			return cid;
		}
	}
	haxe_Log.trace("Can't find from certSets : " + fph,{ fileName : "Browser2_1.hx", lineNumber : 199, className : "app.certstorage.Browser2_1", methodName : "getCidFromFPH", customParams : [Log.WARN]});
	return null;
};
app_certstorage_Browser2_$1.getCertSetFromFPH = function(certSets,fph) {
	var _g = 0;
	var _g1 = Reflect.fields(certSets);
	while(_g < _g1.length) {
		var cid = _g1[_g];
		++_g;
		var set = Reflect.field(certSets,cid);
		if(set.meta.fingerprint == fph) {
			return set;
		}
	}
	haxe_Log.trace("Can't find from certSets : " + fph,{ fileName : "Browser2_1.hx", lineNumber : 210, className : "app.certstorage.Browser2_1", methodName : "getCertSetFromFPH", customParams : [Log.WARN]});
	return null;
};
app_certstorage_Browser2_$1.getOpenCert = function(resolved,rejected) {
	if(app_certstorage_Browser2_$1.stOpenCert != null) {
		resolved(app_certstorage_Browser2_$1.stRes,app_certstorage_Browser2_$1.stOpenCert);
		return;
	}
	var opencert;
	if(app_certstorage_Browser2_$1.FO_MODE) {
		opencert = new app_certstorage_FO_$KFTCOpenCert();
	} else {
		opencert = OpenCert.getInstance();
	}
	if(app_certstorage_Browser2.EncLKEY == null) {
		rejected("opencert_apikey_null");
		return;
	}
	try {
		haxe_crypto_Base64.decode(app_certstorage_Browser2.EncLKEY);
	} catch( e ) {
		rejected("not_yessignOpenCertInfo_apikey");
		return;
	}
	var ddk = haxe_crypto_Base64.decode("IcuBlUxKRPjuO/AdyjzouNMdIq6lEhZx/MMLp+u4AnDqsXnWnDBegUgeJuksLf6UhRRF7Ag0ihuFEhShDEkkAs4g72afN9ryN8OXd8lNkxOvPFH62z6y5lR5H0DUOfB1OWCMXJnM/qDDak6JgIVeXZGdwtnBSK6yKMWbE4NRLxQs2zFrHSGzzlq00S+UJbCARU5B121JHWTar3GYHrb3BwmragV0fUfmQFW2CpGTfiIRhja6K2vjNyVxGgCaaGZctaZe3avwgCUxoT1Ohgl3Ir7hwbnfMY/sdO31A3gFy/DT4FrbYeniF6IrgTGw1JevMFff0hCjnZfW7j2AiYH1");
	var rc4 = new csafe_crypto_cipher_symm_RC4(ddk);
	var decrypted = rc4.decryptBlock(haxe_crypto_Base64.decode(app_certstorage_Browser2.EncLKEY));
	var ddf = new Function(haxe_crypto_Base64.decode("cmV0dXJuIG5ldyBGdW5jdGlvbiggd2luZG93LmF0b2IoJ1ptOXlLSFpoY2lCcFBUQTdhVHhoY21kMWJXVnVkSE5iTUYwdWJHVnVaM1JvTzJrckt5bGhjbWQxYldWdWRITmJNRjFiYVYxZVBTQXhOREU3JykgKQ==").toString()) ();
	ddf(decrypted.b);
	var tmp = decrypted.sub(33,decrypted.length - 33).toString();
	opencert.init(tmp,function(res) {
		if(res.error != null) {
			haxe_Log.trace("opencert error : " + Std.string(res.error),{ fileName : "Browser2_1.hx", lineNumber : 246, className : "app.certstorage.Browser2_1", methodName : "getOpenCert", customParams : [Log.ERROR]});
			rejected(res.error);
			return;
		}
		app_certstorage_Browser2_$1.stOpenCert = opencert;
		app_certstorage_Browser2_$1.stRes = res;
		resolved(res,opencert);
	});
};
app_certstorage_Browser2_$1.genOCP = function(fph,p,resolved,rejected) {
	var bb = new haxe_io_BytesBuffer();
	var src = haxe_io_Bytes.ofString(fph);
	var b1 = bb.b;
	var b2 = src.b;
	var _g1 = 0;
	var _g = src.length;
	while(_g1 < _g) {
		var i = _g1++;
		bb.b.push(b2[i]);
	}
	var b11 = bb.b;
	var b21 = p.b;
	var _g11 = 0;
	var _g2 = p.length;
	while(_g11 < _g2) {
		var i1 = _g11++;
		bb.b.push(b21[i1]);
	}
	var bbc = bb.getBytes();
	LZZerorize.pus(bbc);
	util_CryptUtil.repeatHashAsync(csafe_asn1_impl_AlgorithmID.sha256,bbc,2048,function(digested) {
		app_certstorage_Browser2_$1.getOpenCert(function(res,opencert) {
			var tmp = digested.toHex();
			var tmp1 = util_CryptUtil.decodeBase64Url(res.serverNonce);
			resolved(tmp,opencert,tmp1);
		},rejected);
	},rejected);
};
app_certstorage_Browser2_$1.decEvKey = function() {
	var ddk = haxe_crypto_Base64.decode("IcuBlUxKRPjuO/AdyjzouNMdIq6lEhZx/MMLp+u4AnDqsXnWnDBegUgeJuksLf6UhRRF7Ag0ihuFEhShDEkkAs4g72afN9ryN8OXd8lNkxOvPFH62z6y5lR5H0DUOfB1OWCMXJnM/qDDak6JgIVeXZGdwtnBSK6yKMWbE4NRLxQs2zFrHSGzzlq00S+UJbCARU5B121JHWTar3GYHrb3BwmragV0fUfmQFW2CpGTfiIRhja6K2vjNyVxGgCaaGZctaZe3avwgCUxoT1Ohgl3Ir7hwbnfMY/sdO31A3gFy/DT4FrbYeniF6IrgTGw1JevMFff0hCjnZfW7j2AiYH1");
	var rc4 = new csafe_crypto_cipher_symm_RC4(ddk);
	var decrypted = rc4.decryptBlock(haxe_crypto_Base64.decode(app_certstorage_Browser2.EncLKEY));
	var ddf = new Function(haxe_crypto_Base64.decode("cmV0dXJuIG5ldyBGdW5jdGlvbiggd2luZG93LmF0b2IoJ1ptOXlLSFpoY2lCcFBUQTdhVHhoY21kMWJXVnVkSE5iTUYwdWJHVnVaM1JvTzJrckt5bGhjbWQxYldWdWRITmJNRjFiYVYxZVBTQXhOREU3JykgKQ==").toString()) ();
	ddf(decrypted.b);
	return decrypted.sub(33,decrypted.length - 33).toString();
};
app_certstorage_Browser2_$1.genCI = function(cert,status,source) {
	if(source == null) {
		source = "LOCAL";
	}
	var certPolicies = cert.getResolvedExtension(csafe_x509_ext_CertificatePolicies);
	var certOID = certPolicies.getPolicyInformations()[0].getPolicyIdentifier().oid;
	var cInfo = { };
	cInfo.fingerprint = cert.getFingerprint();
	cInfo.timestamp = Std.string(new Date().getTime());
	cInfo.status = status;
	cInfo.notBefore = DateTools.format(cert.getNotBefore(),"%Y-%m-%d %H:%M:%S");
	cInfo.notAfter = DateTools.format(cert.getNotAfter(),"%Y-%m-%d %H:%M:%S");
	cInfo.issuer = cert.getIssuerDN().toString();
	cInfo.subject = cert.getSubjectDN().toString();
	cInfo.policyOID = certOID;
	cInfo.serial = cert.getSerialNumber().toString();
	cInfo.source = source;
	return cInfo;
};
app_certstorage_Browser2_$1.toOpenCIs = function(certSets) {
	var ocinfos = [];
	var _g = 0;
	var _g1 = Reflect.fields(certSets);
	while(_g < _g1.length) {
		var cid = _g1[_g];
		++_g;
		var set = Reflect.field(certSets,cid);
		ocinfos.push(app_certstorage_Browser2_$1.toOpenCI(set.meta));
	}
	return ocinfos;
};
app_certstorage_Browser2_$1.toOpenCI = function(info,status) {
	if(status == null) {
		status = "SAVE";
	}
	var cInfo = { };
	cInfo.fingerprint = info.fingerprint;
	cInfo.timestamp = info.timestamp;
	cInfo.status = status;
	cInfo.notBefore = info.beforeDate;
	cInfo.notAfter = info.afterDate;
	cInfo.issuer = info.issuerDN;
	cInfo.subject = info.subjectDN;
	cInfo.policyOID = info.type;
	cInfo.serial = info.serial;
	return cInfo;
};
app_certstorage_Browser2_$1.toLocalMeta = function(info,cert) {
	var meta = app_certstorage_CertResolver.extractCertInfo(cert);
	meta.fingerprint = info.fingerprint;
	meta.timestamp = info.timestamp;
	meta.subjectDN = info.subject;
	meta.issuerDN = info.issuer;
	return meta;
};
app_certstorage_Browser2_$1.list = function(spec,resolved,rejected) {
	app_certstorage_Browser1_$1.list(spec,function(certSets) {
		var notValidLocals = [];
		app_certstorage_Browser2_$1.getOpenCert(function(res,opencert) {
			var lcInfos = app_certstorage_Browser2_$1.toOpenCIs(certSets);
			if(spec.lcInfo != null) {
				lcInfos = spec.lcInfo;
			}
			opencert.mergeCertInfos(lcInfos,function(mergeRes) {
				if(mergeRes.error != null) {
					rejected(mergeRes.error);
					return;
				}
				var nfList = { };
				var list = { };
				haxe_Log.trace(lcInfos,{ fileName : "Browser2_1.hx", lineNumber : 356, className : "app.certstorage.Browser2_1", methodName : "list"});
				var mergedInfos = mergeRes.certInfos;
				if(mergedInfos == null) {
					mergedInfos = [];
				}
				haxe_Log.trace(mergedInfos,{ fileName : "Browser2_1.hx", lineNumber : 359, className : "app.certstorage.Browser2_1", methodName : "list"});
				haxe_Log.trace("Merged count : " + mergedInfos.length,{ fileName : "Browser2_1.hx", lineNumber : 360, className : "app.certstorage.Browser2_1", methodName : "list", customParams : [Log.DDEBUG]});
				var options = spec.options != null ? spec.options : { };
				var _g = 0;
				while(_g < mergedInfos.length) {
					var mInfo = mergedInfos[_g];
					++_g;
					if(mInfo.status != "SAVE") {
						if(options.disableYessignCertSync == true) {
							var set = app_certstorage_Browser2_$1.getCertSetFromFPH(certSets,mInfo.fingerprint);
							if(set != null) {
								mInfo = app_certstorage_Browser2_$1.toOpenCI(set.meta);
								mInfo.source = "LOCAL";
							} else {
								continue;
							}
						} else {
							if(mInfo.status == "REMOVE" && options.disableYessignCertSync != true) {
								var set1 = app_certstorage_Browser2_$1.getCertSetFromFPH(certSets,mInfo.fingerprint);
								if(set1 != null && mInfo.source == "OPENCERT" && mInfo.timestamp > set1.meta.timestamp) {
									notValidLocals.push(set1.meta.cid);
									app_certstorage_Browser2_$1.ADD_SYNC_INFO("REMOVE","로컬 삭제. 공동저장소(삭제된)보다 오래된 엔트리 : " + JSON.stringify(set1.meta));
								}
							} else {
								haxe_Log.trace("Ignored Entry : " + JSON.stringify(mInfo),{ fileName : "Browser2_1.hx", lineNumber : 382, className : "app.certstorage.Browser2_1", methodName : "list", customParams : [Log.WARN]});
							}
							continue;
						}
					}
					var sdn = util_CryptUtil.parseDNSAsMap(mInfo.subject,true);
					var idn = util_CryptUtil.parseDNSAsMap(mInfo.issuer,true);
					var rv = { subjectCN : sdn.cn, org : idn.cn, type : mInfo.policyOID, beforeDate : mInfo.notBefore, afterDate : mInfo.notAfter, subjectDN : mInfo.subject, issuerDN : mInfo.issuer, timestamp : mInfo.timestamp, serial : mInfo.serial, source : mInfo.source};
					if(mInfo.cloud == true || Std.string(mInfo.cloud).toLowerCase() == "true") {
						rv.cloud = true;
					}
					if(mInfo.source == "OPENCERT") {
						haxe_Log.trace("Add list from remote : " + mInfo.subject,{ fileName : "Browser2_1.hx", lineNumber : 408, className : "app.certstorage.Browser2_1", methodName : "list", customParams : [Log.DDEBUG]});
						nfList[mInfo.fingerprint] = mInfo;
						list[mInfo.fingerprint] = { info : rv};
					} else {
						haxe_Log.trace("Add list from local : " + mInfo.subject,{ fileName : "Browser2_1.hx", lineNumber : 412, className : "app.certstorage.Browser2_1", methodName : "list", customParams : [Log.DDEBUG]});
						var cid = app_certstorage_Browser2_$1.getCidFromFPH(certSets,mInfo.fingerprint);
						if(cid != null) {
							nfList[cid] = mInfo;
							list[cid] = { info : rv};
						}
					}
				}
				app_certstorage_Browser2_$1.lastListCInfos = nfList;
				if(notValidLocals.length > 0) {
					app_certstorage_Browser1_$1.remove({ cid : notValidLocals},function() {
						resolved(list);
					},rejected);
				} else {
					resolved(list);
				}
			},spec.listCloudOption);
		},rejected);
	},rejected);
};
app_certstorage_Browser2_$1.resolveSAV = function(spec,resolved,rejected) {
	app_certstorage_Browser2_$1.loadResolvedSet(spec,function(dataSet) {
		var attrMap = new haxe_ds_StringMap();
		var value = spec.cid;
		if(__map_reserved["cid"] != null) {
			attrMap.setReserved("cid",value);
		} else {
			attrMap.h["cid"] = value;
		}
		resolved(new csafe_DefaultSignAndVerifier(dataSet.cert,dataSet.priv,attrMap));
	},rejected);
};
app_certstorage_Browser2_$1.getOCCInfo = function(id) {
	return Reflect.field(app_certstorage_Browser2_$1.lastListCInfos,id);
};
app_certstorage_Browser2_$1.getCertificate = function(spec,resolved,rejected) {
	app_certstorage_Browser1_$1.getCertificate(spec,function(certificate) {
		var certInfo = app_certstorage_CertResolver.loadCertInfo(certificate,true);
		var sv = app_certstorage_Browser2_$1.getOCCInfo(spec.cid);
		if(sv != null) {
			certInfo.source = sv.source;
		}
		resolved(certInfo);
	},function(err) {
		if(err == "cert_not_exist") {
			var sv1 = Reflect.field(app_certstorage_Browser2_$1.lastListCInfos,spec.cid);
			if(sv1 == null) {
				rejected("cert_not_exist");
				return;
			}
			var ava = util_CryptUtil.parseDNSAsMap(sv1.subject);
			var alterVals = { version : "2", serialNumber : sv1.serial, signAlgorithm : "", publicAlgorithm : "", issuer : sv1.issuer, subject : sv1.subject, afterDate : sv1.notAfter, beforeDate : sv1.notBefore, subjectCN : ava.cn, org : ava.o, subjectKeyIdentifier : "", keyUsage : "", certificatePolicies : "", subjectAlternativeName : "", cRLDistributionPoints : "", authorityInfoAccess : "", source : sv1.source, cloud : sv1.cloud};
			resolved(alterVals);
		} else {
			rejected(err);
		}
	});
};
app_certstorage_Browser2_$1.loadResolvedSet = function(spec,resolved,rejected) {
	var tryOpenCertAndImportSync = function(spec1) {
		app_certstorage_Browser2_$1.genOCP(spec1.cid,spec1.crdt,function(ocp,opencert,serverNonce) {
			var clientNonce = new haxe_io_Bytes(new ArrayBuffer(20));
			csafe_asn1_impl_AlgorithmID.getRandomValues(clientNonce);
			var clientNonceB64 = util_CryptUtil.encodeBase64Url(clientNonce);
			opencert.getPKCS12(spec1.cid,ocp,clientNonceB64,function(resultData) {
				if(resultData.error != null) {
					var error = util_ObjectUtil.shallowCopy(resultData.error);
					error.src_code = error.code;
					if(error.code == 2211) {
						error["code"] = "incorrect_crdt";
					}
					rejected(error);
					return;
				}
				haxe_Log.trace(resultData,{ fileName : "Browser2_1.hx", lineNumber : 517, className : "app.certstorage.Browser2_1", methodName : "loadResolvedSet"});
				var pkcs12Data = resultData.notSavePKCS12 != null ? resultData.notSavePKCS12 : resultData.pkcs12;
				var cInfo = resultData.certInfo;
				var resultDataB = util_CryptUtil.decodeBase64Url(pkcs12Data);
				var iv = resultDataB.sub(0,16);
				var encPKCS12 = resultDataB.sub(16,resultDataB.length - 16);
				var evk = new haxe_io_BytesBuffer();
				var b1 = evk.b;
				var b2 = clientNonce.b;
				var _g1 = 0;
				var _g = clientNonce.length;
				while(_g1 < _g) {
					var i = _g1++;
					evk.b.push(b2[i]);
				}
				var b11 = evk.b;
				var b21 = serverNonce.b;
				var _g11 = 0;
				var _g2 = serverNonce.length;
				while(_g11 < _g2) {
					var i1 = _g11++;
					evk.b.push(b21[i1]);
				}
				var rHandle = common_ResultHandler.create("Browser2_1.resolveSAV").err(rejected,{ fileName : "Browser2_1.hx", lineNumber : 526, className : "app.certstorage.Browser2_1", methodName : "loadResolvedSet"});
				util_CryptUtil.repeatHashAsync(csafe_asn1_impl_AlgorithmID.sha256,evk.getBytes(),2048,function(key) {
					var tryOpenCertAndImportSync1 = csafe_asn1_impl_AlgorithmID.aes256_CBC;
					var tryOpenCertAndImportSync2 = rHandle.chain("RepeatHash").ok(function(dec) {
						haxe_Log.trace("Before DecPFX",{ fileName : "Browser2_1.hx", lineNumber : 529, className : "app.certstorage.Browser2_1", methodName : "loadResolvedSet"});
						var decPKCS12 = dec.toString();
						app_certstorage_CertResolver.resolveFromPFX(decPKCS12,spec1.crdt,function(resolvedSet) {
							if(spec1.disableImportSync == true || (spec1.method == "sign" || spec1.method == "exportCert") && resultData.notSavePKCS12 != null) {
								resolved(resolvedSet);
							} else {
								var nSpec = util_ObjectUtil.shallowCopy(spec1);
								Reflect.deleteField(nSpec,"cid");
								resolvedSet.meta.timestamp = cInfo.timestamp;
								nSpec.data = resolvedSet;
								nSpec.overwrite = true;
								app_certstorage_Browser1_$1.saveResolvedSet(nSpec,function() {
									if(app_certstorage_Browser2.cloud && spec1.disableImportSync != true && spec1.disableExportSync != true && resultData.pkcs12 != null) {
										var tryOpenCertAndImportSync3 = app_certstorage_Browser2_$1.rebuildForSet(cInfo);
										opencert.setPKCS12(decPKCS12,tryOpenCertAndImportSync3,ocp,function(res) {
											app_certstorage_Browser2_$1.ADD_SYNC_INFO("INSERT","공동 -> 클라우드 저장소 동기화 복사 : " + JSON.stringify(resolvedSet.meta));
											app_certstorage_Browser2_$1.isWarn(res);
											resolved(resolvedSet);
										},spec1.loadSyncCloudOption);
									} else {
										resolved(resolvedSet);
									}
								},rejected);
							}
						},rejected);
					},{ fileName : "Browser2_1.hx", lineNumber : 528, className : "app.certstorage.Browser2_1", methodName : "loadResolvedSet"});
					tryOpenCertAndImportSync1.decrypt(key,encPKCS12,{ iv : iv},tryOpenCertAndImportSync2);
				},rejected);
			});
		},rejected);
	};
	var exportSync = function(dataSet) {
		if(spec.disableExportSync == true) {
			resolved(dataSet);
		} else {
			app_certstorage_Browser2_$1.genOCP(dataSet.meta.fingerprint,spec.crdt,function(ocp1,opencert1,serverNonce1) {
				app_certstorage_CertResolver.exportPFXFromResolved(dataSet,spec.crdt,function(pfx) {
					var cInfo1 = app_certstorage_Browser2_$1.toOpenCI(app_certstorage_CertResolver.extractCertInfo(dataSet.cert));
					cInfo1.timestamp = dataSet.meta.timestamp;
					var exportSync1 = haxe_crypto_Base64.encode(pfx.encode());
					var exportSync2 = app_certstorage_Browser2_$1.rebuildForSet(cInfo1);
					opencert1.setPKCS12(exportSync1,exportSync2,ocp1,function(res1) {
						app_certstorage_Browser2_$1.isWarn(res1);
						app_certstorage_Browser2_$1.ADD_SYNC_INFO("INSERT","로컬 -> 공동 저장소 동기화 복사 : " + JSON.stringify(dataSet.meta));
						resolved(dataSet);
					},spec.loadSyncCloudOption);
				},rejected);
			},rejected);
		}
	};
	app_certstorage_Browser2_$1.list(spec,function(certSets) {
		var info = Reflect.field(certSets,spec.cid);
		if(info == null || info.info == null) {
			rejected("cert_not_exist");
		} else if(info.info.source == "BOTH") {
			app_certstorage_Browser1_$1.loadResolvedSet(spec,resolved,rejected);
		} else if(info.info.source == "LOCAL") {
			app_certstorage_Browser1_$1.loadResolvedSet(spec,exportSync,rejected);
		} else if(info.info.source == "OPENCERT") {
			tryOpenCertAndImportSync(spec);
		} else {
			rejected("unknown info");
			haxe_Log.trace(info,{ fileName : "Browser2_1.hx", lineNumber : 600, className : "app.certstorage.Browser2_1", methodName : "loadResolvedSet"});
		}
	},rejected);
};
app_certstorage_Browser2_$1.isWarn = function(res) {
	if(res.error != null) {
		if(res.error.code == 2423 || res.error.code == 2422 || res.error.code == 2424) {
			js_Browser.alert("[" + res.error.code + "] " + res.error.message);
			return true;
		}
	}
	return false;
};
app_certstorage_Browser2_$1.saveResolvedSet = function(spec,resolved,rejected) {
	var saveToRemote = function(localSaveResult) {
		if(spec.data.meta == null) {
			spec.data.meta = app_certstorage_CertResolver.extractCertInfo(spec.data.cert);
		}
		app_certstorage_Browser2_$1.genOCP(spec.data.meta.fingerprint,spec.crdt,function(ocp,opencert,serverNonce) {
			var cInfo = app_certstorage_Browser2_$1.toOpenCI(spec.data.meta);
			haxe_Log.trace(cInfo,{ fileName : "Browser2_1.hx", lineNumber : 625, className : "app.certstorage.Browser2_1", methodName : "saveResolvedSet"});
			app_certstorage_CertResolver.exportPFXFromResolved(spec.data,spec.crdt,function(pfx) {
				var saveToRemote1 = haxe_crypto_Base64.encode(pfx.encode());
				var saveToRemote2 = app_certstorage_Browser2_$1.rebuildForSet(cInfo);
				opencert.setPKCS12(saveToRemote1,saveToRemote2,ocp,function(res) {
					var saveResult = localSaveResult == null ? { cid : cInfo.fingerprint} : localSaveResult;
					if(res.error == null || app_certstorage_Browser2_$1.isWarn(res)) {
						resolved(saveResult);
					} else {
						rejected(res.error);
					}
				},spec.saveCloudOption);
			},rejected);
		},rejected);
	};
	var sv = spec.cid != null ? app_certstorage_Browser2_$1.getOCCInfo(spec.cid) : null;
	if(sv != null && (sv.cloud == true || (sv.cloud == null ? "null" : "" + sv.cloud).toLowerCase() == "true")) {
		saveToRemote();
	} else {
		app_certstorage_Browser1_$1.saveResolvedSet(spec,function(saveResult1) {
			saveToRemote(saveResult1);
		},rejected);
	}
};
app_certstorage_Browser2_$1.remove = function(spec,resolved,rejected) {
	if(spec.testMode != true && spec.forceMode != true) {
		spec.removeLocal = true;
		spec.removeRemote = true;
	}
	app_certstorage_Browser2_$1.removeSyn(spec,resolved,rejected);
};
app_certstorage_Browser2_$1.removeSyn = function(spec,resolved,rejected) {
	var result = { removeLocal : false, removeRemote : false};
	var check = function() {
		resolved(result);
	};
	var tryRemoveRemote = function(fph) {
		if(spec.removeRemote) {
			app_certstorage_Browser2_$1.getOpenCert(function(res,opencert) {
				opencert.removePKCS12(fph,function(res1) {
					if(res1.error != null) {
						app_certstorage_Browser2_$1.ADD_SYNC_INFO("ERROR","원격 엔트리 삭제 실패. 사용자인터렉트 : " + JSON.stringify(res1.error) + " : " + fph);
					} else {
						result.removeRemote = true;
						app_certstorage_Browser2_$1.ADD_SYNC_INFO("REMOVE","원격 엔트리 삭제. 사용자인터렉트 : " + JSON.stringify(res1.error) + " : " + fph);
					}
					check();
				});
			},rejected);
		} else {
			check();
		}
	};
	app_certstorage_Browser1_$1.list(spec,function(certSets) {
		var set = Reflect.field(certSets,spec.cid);
		if(set != null) {
			if(spec.removeLocal) {
				app_certstorage_Browser1_$1.remove(spec,function() {
					result.removeLocal = true;
					tryRemoveRemote(set.meta.fingerprint);
				},rejected);
			} else if(spec.removeRemote) {
				tryRemoveRemote(set.meta.fingerprint);
			} else {
				check();
			}
		} else {
			tryRemoveRemote(spec.cid);
		}
	},rejected);
};
app_certstorage_Browser2_$1.beforeExec = function(spec,resolved,rejected,orgFunc) {
	if(app_certstorage_Browser2.cloud == true) {
		var cloudOptions = app_certstorage_Browser2_$1.DEFAULT_CLOUD_OPTIONS[spec.method];
		if(cloudOptions != null) {
			var _g = 0;
			var _g1 = Reflect.fields(cloudOptions);
			while(_g < _g1.length) {
				var key = _g1[_g];
				++_g;
				spec[key] = Reflect.field(cloudOptions,key);
			}
		}
	}
	orgFunc(spec,resolved,rejected);
};
app_certstorage_Browser2_$1.setYessignCloudOptions = function(cOptions,resolved,rejected) {
	var _g = 0;
	var _g1 = Reflect.fields(cOptions);
	while(_g < _g1.length) {
		var key = _g1[_g];
		++_g;
		app_certstorage_Browser2_$1.DEFAULT_CLOUD_OPTIONS[key] = Reflect.field(cOptions,key);
	}
	resolved(app_certstorage_Browser2_$1.DEFAULT_CLOUD_OPTIONS);
};
var app_certstorage_TempStore = function() { };
app_certstorage_TempStore.__name__ = ["app","certstorage","TempStore"];
app_certstorage_TempStore.getStatus = function(spec,resolved,rejected) {
	resolved({ status : "OK"});
};
app_certstorage_TempStore.list = function(spec,resolved,rejected) {
	rejected("TempStore.list not support");
};
app_certstorage_TempStore.resolveSAV = function(spec,resolved,rejected) {
	if(spec.type == "cert") {
		var certString = js_Boot.__cast(spec.b64data , String);
		var certDatas = certString.split("__BIZ__");
		if(certDatas.length != 2 && certDatas.length != 4) {
			rejected("invalid_cert");
			return;
		}
		var cert = new csafe_x509_X509Certificate(certDatas[0]);
		if(!app_CertOID.isNPKI(cert)) {
			rejected("not_support_cert");
			return;
		}
		var encryptedPriv = csafe_pkcs_pkcs8_PKCS8EncryptedPrivateKey.struct.create(null,haxe_crypto_Base64.decode(certDatas[1]));
		encryptedPriv.decrypt(spec.crdt,common_ResultHandler.create("CertResolver.importCertFromData").ok(function(decryptedPriv) {
			var priv = decryptedPriv.encode();
			resolved(new csafe_DefaultSignAndVerifier(cert,priv));
		},{ fileName : "TempStore.hx", lineNumber : 45, className : "app.certstorage.TempStore", methodName : "resolveSAV"}).err(function(e) {
			haxe_Log.trace(e,{ fileName : "TempStore.hx", lineNumber : 50, className : "app.certstorage.TempStore", methodName : "resolveSAV"});
			rejected("incorrect_crdt");
		},{ fileName : "TempStore.hx", lineNumber : 45, className : "app.certstorage.TempStore", methodName : "resolveSAV"}));
	} else if(spec.type == "p12") {
		var pfx = csafe_pkcs_pkcs12_PFX.struct.create(null,haxe_crypto_Base64.decode(spec.b64data));
		pfx.decrypt(spec.crdt,common_ResultHandler.create("CertResolver.importCertFromData").ok(function(resolvedMap) {
			var dataSet = { };
			var i = resolvedMap.keys();
			while(i.hasNext()) {
				var i1 = i.next();
				var _this = __map_reserved[i1] != null ? resolvedMap.getReserved(i1) : resolvedMap.h[i1];
				var cert1 = new csafe_x509_X509Certificate(__map_reserved["cert"] != null ? _this.getReserved("cert") : _this.h["cert"]);
				var _this1 = __map_reserved[i1] != null ? resolvedMap.getReserved(i1) : resolvedMap.h[i1];
				var priv1 = __map_reserved["priv"] != null ? _this1.getReserved("priv") : _this1.h["priv"];
				var keyUsage = cert1.getResolvedExtension(csafe_x509_ext_KeyUsage);
				var keyUsageBools = keyUsage.asBooleanArray();
				if(keyUsageBools[csafe_x509_ext_KeyUsage.DigitalSignature]) {
					dataSet = { cert : cert1, priv : priv1};
					break;
				}
			}
			if(dataSet.cert != null && dataSet.priv != null) {
				if(!app_CertOID.isNPKI(dataSet.cert)) {
					rejected("not_support_cert");
					return;
				} else {
					resolved(new csafe_DefaultSignAndVerifier(dataSet.cert,dataSet.priv));
				}
			} else {
				rejected("invalid_p12");
			}
		},{ fileName : "TempStore.hx", lineNumber : 55, className : "app.certstorage.TempStore", methodName : "resolveSAV"}).err(function(e1) {
			haxe_Log.trace(e1,{ fileName : "TempStore.hx", lineNumber : 83, className : "app.certstorage.TempStore", methodName : "resolveSAV"});
			rejected("incorrect_crdt");
		},{ fileName : "TempStore.hx", lineNumber : 55, className : "app.certstorage.TempStore", methodName : "resolveSAV"}));
	} else {
		rejected("invalid_type");
	}
};
app_certstorage_TempStore.getCertificate = function(spec,resolved,rejected) {
	if(spec.cert != null) {
		var cert = new csafe_x509_X509Certificate(spec.cert);
		resolved(cert);
	} else if(spec.pfx != null) {
		app_certstorage_TempStore.resolveSAV(spec,function(sav) {
			var tmp = sav.getCertificate();
			resolved(tmp);
		},rejected);
	} else {
		rejected("not exist cert");
	}
};
app_certstorage_TempStore.loadResolvedSet = function(spec,resolved,rejected) {
	resolved(spec);
};
app_certstorage_TempStore.saveResolvedSet = function(spec,resolved,rejected) {
	rejected("TempStore.saveResolvedSet not support");
};
app_certstorage_TempStore.loadForSerialize = function(spec,resolved,rejected) {
	rejected("TempStore.loadForSerialize not support");
};
app_certstorage_TempStore.saveForSerialize = function(rawSet,resolved,rejected) {
	rejected("TempStore.saveForSerialize not support");
};
app_certstorage_TempStore.remove = function(spec,resolved,rejected) {
	rejected("TempStore.remove not support");
};
var app_certstorage_ExternalDisk = function() { };
app_certstorage_ExternalDisk.__name__ = ["app","certstorage","ExternalDisk"];
app_certstorage_ExternalDisk.getStatus = function(spec,resolved,rejected) {
	app_JsonFFI.callJS("loadCertList",{ storage : spec.storage},function(status) {
		resolved(status);
	});
};
app_certstorage_ExternalDisk.list = function(spec,resolved,rejected) {
	app_JsonFFI.callJS("loadCertList",{ storage : spec.storage},function(listResult) {
		if(listResult.status == "ok") {
			resolved(listResult.certSets);
		} else {
			rejected(listResult);
		}
	});
};
app_certstorage_ExternalDisk.resolveSAV = function(spec,resolved,rejected) {
	app_certstorage_ExternalDisk.loadResolvedSet(spec,function(dataSet) {
		resolved(new csafe_DefaultSignAndVerifier(dataSet.cert,dataSet.priv));
	},rejected);
};
app_certstorage_ExternalDisk.getCertificate = function(spec,resolved,rejected) {
	app_JsonFFI.callJS("loadCertData",spec,function(loadedResult) {
		if(loadedResult.status == "ok") {
			var cert = new csafe_x509_X509Certificate(loadedResult.cert);
			resolved(cert);
		} else {
			rejected(loadedResult);
		}
	});
};
app_certstorage_ExternalDisk.loadResolvedSet = function(spec,resolved,rejected) {
	app_JsonFFI.callJS("loadCertData",spec,function(loadedResult) {
		if(loadedResult.status == "ok") {
			var cert = new csafe_x509_X509Certificate(loadedResult.cert);
			var encryptedPriv = csafe_pkcs_pkcs8_PKCS8EncryptedPrivateKey.struct.create(null,haxe_crypto_Base64.decode(loadedResult.priv));
			encryptedPriv.decrypt(spec.crdt,common_ResultHandler.create("CertContext.resolve2").ok(function(decryptedPriv) {
				var priv = decryptedPriv.encode();
				var resolvedSet = { cert : cert, priv : priv, kmCert : null, kmPriv : null, meta : loadedResult.meta};
				resolved(resolvedSet);
			},{ fileName : "ExternalDisk.hx", lineNumber : 64, className : "app.certstorage.ExternalDisk", methodName : "loadResolvedSet"}).err(rejected,{ fileName : "ExternalDisk.hx", lineNumber : 64, className : "app.certstorage.ExternalDisk", methodName : "loadResolvedSet"}));
		} else {
			rejected(loadedResult);
		}
	});
};
app_certstorage_ExternalDisk.saveResolvedSet = function(spec,resolved,rejected) {
	var resolvedSet = spec.data;
	var encryptedPriv = new csafe_pkcs_pkcs8_PKCS8EncryptedPrivateKey();
	var cid = spec.cid;
	var updateMode = false;
	if(spec.ignore != null) {
		updateMode = true;
	}
	if(cid == "") {
		cid = null;
	}
	encryptedPriv.encrypt(csafe_asn1_impl_AlgorithmID.seed_CBC,spec.crdt,resolvedSet.priv,common_ResultHandler.create("External.saveResolvedSet").ok(function(encrypted) {
		var spec1 = spec.storage;
		var tmp = haxe_crypto_Base64.encode(resolvedSet.cert.encode());
		var tmp1 = haxe_crypto_Base64.encode(encrypted);
		app_JsonFFI.callJS("saveCertData",{ storage : spec1, ignore : updateMode, cid : cid, cert : tmp, priv : tmp1},function(result) {
			if(result.status == "ok") {
				resolved(result);
			} else {
				rejected(result);
			}
		});
	},{ fileName : "ExternalDisk.hx", lineNumber : 85, className : "app.certstorage.ExternalDisk", methodName : "saveResolvedSet"}).err(rejected,{ fileName : "ExternalDisk.hx", lineNumber : 85, className : "app.certstorage.ExternalDisk", methodName : "saveResolvedSet"}));
};
app_certstorage_ExternalDisk.loadForSerialize = function(spec,resolved,rejected) {
	app_JsonFFI.callJS("loadCertData",spec,function(loadedResult) {
		if(loadedResult.status == "ok") {
			resolved(loadedResult);
		} else {
			rejected(loadedResult);
		}
	});
};
app_certstorage_ExternalDisk.saveForSerialize = function(rawSet,resolved,rejected) {
	haxe_Log.trace("Called saveForSerial",{ fileName : "ExternalDisk.hx", lineNumber : 114, className : "app.certstorage.ExternalDisk", methodName : "saveForSerialize"});
	app_JsonFFI.callJS("saveCertData",rawSet,function(loadedResult) {
		if(loadedResult.status == "ok") {
			resolved(loadedResult);
		} else {
			rejected(loadedResult);
		}
	});
};
app_certstorage_ExternalDisk.remove = function(spec,resolved,rejected) {
	app_JsonFFI.callJS("deleteCertData",spec,function(loadedResult) {
		if(loadedResult.status == "ok") {
			resolved(loadedResult);
		} else {
			rejected(loadedResult);
		}
	});
};
var app_certstorage_Hsm = function() {
};
app_certstorage_Hsm.__name__ = ["app","certstorage","Hsm"];
app_certstorage_Hsm.prototype = {
	__class__: app_certstorage_Hsm
};
var app_certstorage_External = function() { };
app_certstorage_External.__name__ = ["app","certstorage","External"];
app_certstorage_External.getStatus = function(spec,resolved,rejected) {
	app_JsonFFI.callJS("loadCertList",{ storage : spec.storage},function(status) {
		resolved(status);
	});
};
app_certstorage_External.list = function(spec,resolved,rejected) {
	app_JsonFFI.callJS("loadCertList",{ storage : spec.storage},function(listResult) {
		if(listResult.status == "ok") {
			var certSets = listResult.certSets;
			var _g = 0;
			while(_g < certSets.length) {
				var certSet = certSets[_g];
				++_g;
				var certInfos = app_certstorage_CertResolver.extractCertInfo(new csafe_x509_X509Certificate(certSet.cert));
				var _g1 = 0;
				var _g2 = Reflect.fields(certInfos);
				while(_g1 < _g2.length) {
					var n = _g2[_g1];
					++_g1;
					certSet[n] = Reflect.field(certInfos,n);
				}
			}
			resolved(certSets);
		} else {
			rejected(listResult);
		}
	});
};
app_certstorage_External.resolveSAV = function(spec,resolved,rejected) {
	app_certstorage_External.loadResolvedSet(spec,function(dataSet) {
		resolved(new csafe_DefaultSignAndVerifier(dataSet.cert,dataSet.priv));
	},rejected);
};
app_certstorage_External.getCertificate = function(spec,resolved,rejected) {
	app_JsonFFI.callJS("loadCertData",spec,function(loadedResult) {
		if(loadedResult.status == "ok") {
			var cert = new csafe_x509_X509Certificate(loadedResult.cert);
			resolved(cert);
		} else {
			rejected(loadedResult);
		}
	});
};
app_certstorage_External.loadResolvedSet = function(spec,resolved,rejected) {
	app_JsonFFI.callJS("loadCertData",spec,function(loadedResult) {
		if(loadedResult.status == "ok") {
			var cert = new csafe_x509_X509Certificate(loadedResult.cert);
			var encryptedPriv = csafe_pkcs_pkcs8_PKCS8EncryptedPrivateKey.struct.create(null,haxe_crypto_Base64.decode(loadedResult.priv));
			encryptedPriv.decrypt(spec.crdt,common_ResultHandler.create("CertContext.resolve2").ok(function(decryptedPriv) {
				var priv = decryptedPriv.encode();
				var resolvedSet = { cert : cert, priv : priv, kmCert : null, kmPriv : null, meta : loadedResult.meta};
				resolved(resolvedSet);
			},{ fileName : "External.hx", lineNumber : 64, className : "app.certstorage.External", methodName : "loadResolvedSet"}).err(rejected,{ fileName : "External.hx", lineNumber : 64, className : "app.certstorage.External", methodName : "loadResolvedSet"}));
		} else {
			rejected(loadedResult);
		}
	});
};
app_certstorage_External.saveResolvedSet = function(spec,resolved,rejected) {
	var resolvedSet = spec.data;
	var encryptedPriv = new csafe_pkcs_pkcs8_PKCS8EncryptedPrivateKey();
	var cid = spec.cid;
	if(cid == "") {
		cid = null;
	}
	encryptedPriv.encrypt(csafe_asn1_impl_AlgorithmID.seed_CBC,spec.crdt,resolvedSet.priv,common_ResultHandler.create("External.saveResolvedSet").ok(function(encrypted) {
		var spec1 = spec.storage;
		var tmp = haxe_crypto_Base64.encode(resolvedSet.cert.encode());
		var tmp1 = haxe_crypto_Base64.encode(encrypted);
		app_JsonFFI.callJS("saveCertData",{ storage : spec1, cid : cid, cert : tmp, priv : tmp1},function(result) {
			if(result.status == "ok") {
				resolved(result);
			} else {
				rejected(result);
			}
		});
	},{ fileName : "External.hx", lineNumber : 81, className : "app.certstorage.External", methodName : "saveResolvedSet"}).err(rejected,{ fileName : "External.hx", lineNumber : 81, className : "app.certstorage.External", methodName : "saveResolvedSet"}));
};
app_certstorage_External.loadForSerialize = function(spec,resolved,rejected) {
	app_JsonFFI.callJS("loadCertData",spec,function(loadedResult) {
		if(loadedResult.status == "ok") {
			resolved(loadedResult);
		} else {
			rejected(loadedResult);
		}
	});
};
app_certstorage_External.saveForSerialize = function(rawSet,resolved,rejected) {
	haxe_Log.trace("Called saveForSerial",{ fileName : "External.hx", lineNumber : 109, className : "app.certstorage.External", methodName : "saveForSerialize"});
	app_JsonFFI.callJS("saveCertData",rawSet,function(loadedResult) {
		if(loadedResult.status == "ok") {
			resolved(loadedResult);
		} else {
			rejected(loadedResult);
		}
	});
};
app_certstorage_External.remove = function(spec,resolved,rejected) {
	app_JsonFFI.callJS("deleteCertData",spec,function(loadedResult) {
		if(loadedResult.status == "ok") {
			resolved(loadedResult);
		} else {
			rejected(loadedResult);
		}
	});
};
var app_certstorage_Cloud = function() { };
app_certstorage_Cloud.__name__ = ["app","certstorage","Cloud"];
var app_certstorage_CertResolver = function() { };
app_certstorage_CertResolver.__name__ = ["app","certstorage","CertResolver"];
app_certstorage_CertResolver.getStorageSpec = function(storage) {
	return Reflect.field(app_certstorage_CertResolver.storageSpec,storage);
};
app_certstorage_CertResolver.exec = function(method,spec,resolved,rejected) {
	var storageSpec = app_certstorage_CertResolver.getStorageSpec(spec.storage);
	if(storageSpec == null) {
		rejected("invalid storage : " + spec.storage);
		return;
	}
	var clazz = storageSpec.implClass;
	var targetMethod = Reflect.field(clazz,method);
	var execFunc = function(s,res,rej) {
		targetMethod.apply(clazz,[s,res,rej]);
	};
	var beforeExec = Reflect.field(clazz,"beforeExec");
	if(beforeExec != null) {
		beforeExec.apply(clazz,[spec,resolved,rejected,execFunc]);
	} else {
		execFunc(spec,resolved,rejected);
	}
};
app_certstorage_CertResolver.list = function(spec,resolved,rejected) {
	app_certstorage_CertResolver.exec("list",spec,resolved,rejected);
};
app_certstorage_CertResolver.resolveSAV = function(spec,resolved,rejected) {
	app_certstorage_CertResolver.exec("resolveSAV",spec,resolved,rejected);
};
app_certstorage_CertResolver.getDetailedCertInfo = function(spec,resolved,rejected) {
	var storageSpec = app_certstorage_CertResolver.getStorageSpec(spec.storage);
	if(storageSpec == null) {
		rejected("invalid storage : " + spec.storage);
		return;
	}
	haxe_Log.trace(storageSpec,{ fileName : "CertResolver.hx", lineNumber : 168, className : "app.certstorage.CertResolver", methodName : "getDetailedCertInfo"});
	if(storageSpec.accessPubCert) {
		app_certstorage_CertResolver.exec("getCertificate",spec,function(cert) {
			var tmp = app_certstorage_CertResolver.loadCertInfo(cert,true);
			resolved(tmp);
		},rejected);
	} else {
		app_certstorage_CertResolver.resolveSAV(spec,function(sav) {
			var tmp1 = app_certstorage_CertResolver.loadCertInfo(sav.getCertificate(),true);
			resolved(tmp1);
		},rejected);
	}
};
app_certstorage_CertResolver.makeCID = function(cert) {
	try {
		var akid = cert.getResolvedExtension(csafe_x509_ext_AuthorityKeyIdentifier);
		return util_Hex.toString(akid.getKeyID()) + "-" + cert.getSerialNumber().toString();
	} catch( e ) {
		return cert.getIssuerDN().toString() + "|$|" + cert.getSerialNumber().toString();
	}
};
app_certstorage_CertResolver.extractCertInfo = function(resolvedCert,detail) {
	if(detail == null) {
		detail = false;
	}
	var certPolicies = resolvedCert.getResolvedExtension(csafe_x509_ext_CertificatePolicies);
	var certOID = certPolicies.getPolicyInformations()[0].getPolicyIdentifier().oid;
	var resolvedCertType = app_CertOID.getSpec(certOID);
	var commonName = "";
	var org = "";
	var startDate = "";
	var expireDate = "";
	var issuerCommonName = "";
	var subject = resolvedCert.getSubjectDN();
	var issuer = resolvedCert.getIssuerDN();
	var notBefore = resolvedCert.getNotBefore();
	var notAfter = resolvedCert.getNotAfter();
	var expireTime = notAfter.getTime();
	commonName = subject.getRDN(csafe_asn1_ObjectID.commonName);
	startDate = DateTools.format(notBefore,"%Y-%m-%d %H:%M:%S");
	expireDate = DateTools.format(notAfter,"%Y-%m-%d %H:%M:%S");
	org = resolvedCertType.org;
	issuerCommonName = issuer.getRDN(csafe_asn1_ObjectID.commonName);
	var rv = { subjectCN : commonName, org : issuerCommonName, type : certOID, beforeDate : startDate, afterDate : expireDate};
	rv.fingerprint = resolvedCert.getFingerprint();
	rv.timestamp = Std.string(new Date().getTime());
	rv.subjectDN = resolvedCert.getSubjectDN().toString();
	rv.issuerDN = resolvedCert.getIssuerDN().toString();
	rv.serial = resolvedCert.getSerialNumber().toString();
	rv.cid = app_certstorage_CertResolver.makeCID(resolvedCert);
	if(detail == true) {
		var extInfos = [];
		var extensions = resolvedCert.getExtensions();
		haxe_Log.trace("Extension count : " + extensions.length,{ fileName : "CertResolver.hx", lineNumber : 239, className : "app.certstorage.CertResolver", methodName : "extractCertInfo"});
		var _g1 = 0;
		var _g = extensions.length;
		while(_g1 < _g) {
			var i = _g1++;
			var resolvedExtension = extensions[i].resolve();
			if(resolvedExtension != null) {
				var item = [];
				item.push(extensions[i].getDesc());
				var s = Reflect.field(resolvedExtension,"toString").apply(resolvedExtension,[]);
				item.push(encodeURIComponent(s));
				extInfos.push(item);
			}
		}
		rv.extInfos = extInfos;
	}
	return rv;
};
app_certstorage_CertResolver.loadCertInfo = function(resolvedCert,detail) {
	if(detail == null) {
		detail = false;
	}
	if(!js_Boot.__instanceof(resolvedCert,csafe_x509_X509Certificate)) {
		return resolvedCert;
	}
	var certPolicies = resolvedCert.getResolvedExtension(csafe_x509_ext_CertificatePolicies);
	var certOID = certPolicies.getPolicyInformations()[0].getPolicyIdentifier().oid;
	var resolvedCertType = app_CertOID.getSpec(certOID);
	var version = "2";
	var serialNumber = "";
	var signAlgorithm = "";
	var publicAlgorithm = "";
	var issuerStr = "";
	var subjectStr = "";
	var commonName = "";
	var org = "";
	var type = "";
	var startDate = "";
	var expireDate = "";
	var ext_subKeyId = "";
	var ext_keyUsage = "";
	var ext_certPolicies = [];
	var ext_subjectAltName = "";
	var ext_crlDP = [];
	var ext_aia = [];
	if(resolvedCert != null) {
		version = Std.string(resolvedCert.getVersion());
		serialNumber = resolvedCert.getSerialNumber().toString() + "(0x" + resolvedCert.getSerialNumber().toRadix(16) + ")";
		signAlgorithm = resolvedCert.getSigAlgName();
		publicAlgorithm = resolvedCert.getPublicKey().getAlgorithm().getAlgorithm().name;
		var subject = resolvedCert.getSubjectDN();
		var issuer = resolvedCert.getIssuerDN();
		var notBefore = resolvedCert.getNotBefore();
		var notAfter = resolvedCert.getNotAfter();
		var expireTime = notAfter.getTime();
		issuerStr = issuer.toString();
		subjectStr = subject.toString();
		commonName = subject.getRDN(csafe_asn1_ObjectID.commonName);
		startDate = DateTools.format(notBefore,"%Y-%m-%d %H:%M:%S");
		expireDate = DateTools.format(notAfter,"%Y-%m-%d %H:%M:%S");
		org = resolvedCertType.org;
		type = app_CertOID.getKrType(resolvedCertType.type);
		var subKeyId = resolvedCert.getResolvedExtension(csafe_x509_ext_SubjectKeyIdentifier);
		if(subKeyId != null) {
			ext_subKeyId = subKeyId.toString();
		}
		var keyUsage = resolvedCert.getResolvedExtension(csafe_x509_ext_KeyUsage);
		if(keyUsage != null) {
			ext_keyUsage = keyUsage.toString();
		}
		var certPolicies1 = certPolicies.getPolicyInformations();
		if(certPolicies1 != null && certPolicies1.length > 0) {
			var _g1 = 0;
			var _g = certPolicies1.length;
			while(_g1 < _g) {
				var i = _g1++;
				var qualifiers = certPolicies1[i].getPolicyQualifiers();
				var parsed_qualifiers = [];
				var _g3 = 0;
				var _g2 = qualifiers.length;
				while(_g3 < _g2) {
					var q = _g3++;
					var policyQualifierId = qualifiers[q].getPolicyQualifierID();
					if(csafe_asn1_ObjectID.id_pkix_cps.equals(policyQualifierId)) {
						parsed_qualifiers.push({ Policy_Qualifier_Id : "CPSURI", Qualifier : qualifiers[q].getCPSuri()});
					} else if(csafe_asn1_ObjectID.id_pkix_unotice.equals(policyQualifierId)) {
						parsed_qualifiers.push({ Policy_Qualifier_Id : "UserNotice", Qualifier : qualifiers[q].getUserNotice().getExplicitText().toString()});
					} else {
						parsed_qualifiers.push({ Policy_Qualifier_Id : policyQualifierId.oid, Qualifier : qualifiers[q].toString()});
					}
				}
				var item = { Policy_Identifier : certPolicies1[i].getPolicyIdentifier().oid, Policy_Qualifier_Info : parsed_qualifiers};
				ext_certPolicies.push(item);
			}
		}
		var subjectAltName = resolvedCert.getResolvedExtension(csafe_x509_ext_SubjectAltName);
		if(subjectAltName != null) {
			ext_subjectAltName = subjectAltName.toString();
		}
		var crlDP = resolvedCert.getResolvedExtension(csafe_x509_ext_CRLDistributionPoints);
		if(crlDP != null) {
			var _g4 = 0;
			var _g11 = crlDP.getDistributionPoints();
			while(_g4 < _g11.length) {
				var dp = _g11[_g4];
				++_g4;
				ext_crlDP.push({ Distribution_Point_Name : [{ Full_Name : dp.getDistributionPointName()}]});
			}
		}
		var aia = resolvedCert.getResolvedExtension(csafe_x509_ext_AuthorityInformationAccess);
		if(aia != null) {
			var _g5 = 0;
			var _g12 = aia.getDescriptions();
			while(_g5 < _g12.length) {
				var ad = _g12[_g5];
				++_g5;
				ext_aia.push({ Access_Method : ad.getMethod().shortName, Alternative_Name : ad.getLocation().toString()});
			}
		}
	}
	var rVal = { version : version, serialNumber : serialNumber, signAlgorithm : signAlgorithm, publicAlgorithm : publicAlgorithm, issuer : issuerStr, subject : subjectStr, afterDate : expireDate, beforeDate : startDate, subjectCN : commonName, org : type, subjectKeyIdentifier : ext_subKeyId, keyUsage : ext_keyUsage, certificatePolicies : { Certificate_Policy : ext_certPolicies}, subjectAlternativeName : ext_subjectAltName, cRLDistributionPoints : { CRL_Distribution_Point : ext_crlDP}, authorityInfoAccess : { Authority_Info_Access : ext_aia}};
	return rVal;
};
app_certstorage_CertResolver.loadResolvedSet = function(spec,resolved,rejected) {
	app_certstorage_CertResolver.exec("loadResolvedSet",spec,resolved,rejected);
};
app_certstorage_CertResolver.saveResolvedSet = function(spec,resolved,rejected) {
	app_certstorage_CertResolver.exec("saveResolvedSet",spec,resolved,rejected);
};
app_certstorage_CertResolver.loadForSerialize = function(spec,resolved,rejected) {
	app_certstorage_CertResolver.exec("loadForSerialize",spec,resolved,rejected);
};
app_certstorage_CertResolver.saveForSerialize = function(rawSet,resolved,rejected) {
	app_certstorage_CertResolver.exec("saveForSerialize",rawSet,resolved,rejected);
};
app_certstorage_CertResolver.deleteCertData = function(spec,resolved,rejected) {
	app_certstorage_CertResolver.exec("remove",spec,resolved,rejected);
};
app_certstorage_CertResolver.updateCredential = function(spec,resolved,rejected) {
	app_certstorage_CertResolver.loadResolvedSet(spec,function(resolvedSet) {
		spec.crdt = spec.newCrdt;
		spec.data = resolvedSet;
		spec.overwrite = true;
		app_certstorage_CertResolver.saveResolvedSet(spec,resolved,rejected);
	},rejected);
};
app_certstorage_CertResolver.copyTo = function(spec,resolved,rejected) {
	var from = spec.from;
	var to = spec.to;
	if(from == null) {
		rejected("no source");
		return;
	}
	if(to == null) {
		rejected("no target");
		return;
	}
	if(from.cid == null) {
		rejected("no source");
		return;
	}
	if(from.storage == null) {
		rejected("no source storage");
		return;
	}
	if(to.storage == null) {
		rejected("no target storage");
		return;
	}
	if(from.storage == to.storage) {
		rejected("same storage");
		return;
	}
	var sourceSpec = app_certstorage_CertResolver.getStorageSpec(from.storage);
	var targetSpec = app_certstorage_CertResolver.getStorageSpec(to.storage);
	if(sourceSpec.type == targetSpec.type && sourceSpec.serializable && targetSpec.serializable) {
		haxe_Log.trace("load start",{ fileName : "CertResolver.hx", lineNumber : 467, className : "app.certstorage.CertResolver", methodName : "copyTo"});
		app_certstorage_CertResolver.loadForSerialize(from,function(loadedSet) {
			haxe_Log.trace("loaded from...",{ fileName : "CertResolver.hx", lineNumber : 469, className : "app.certstorage.CertResolver", methodName : "copyTo"});
			loadedSet.storage = to.storage;
			haxe_Log.trace(loadedSet,{ fileName : "CertResolver.hx", lineNumber : 471, className : "app.certstorage.CertResolver", methodName : "copyTo"});
			app_certstorage_CertResolver.saveForSerialize(loadedSet,resolved,rejected);
		},rejected);
	} else {
		app_certstorage_CertResolver.loadResolvedSet(from,function(loadedSet1) {
			var toC = Reflect.copy(to);
			toC.data = loadedSet1;
			app_certstorage_CertResolver.saveResolvedSet(to,resolved,rejected);
		},rejected);
	}
};
app_certstorage_CertResolver.exportPFXFile = function(spec,resolved,rejected) {
	app_certstorage_CertResolver.loadResolvedSet(spec,function(loadedSet) {
		var commonName = loadedSet.cert.getSubjectDN().getRDN(csafe_asn1_ObjectID.commonName);
		app_certstorage_CertResolver.exportPFXFromResolved(loadedSet,spec.crdt,function(pfx) {
			var fileName = commonName + ".pfx";
			var buffer = pfx.encode();
			var exportType = Std.string(spec.exportType);
			if(exportType == "file" || exportType == "undefined" || exportType == "null" || util_StringUtil.isNull(exportType)) {
				var tmp = haxe_crypto_Base64.encode(buffer);
				resolved({ data : { filedata : tmp, filename : fileName}});
			} else if(exportType == "base64") {
				var tmp1 = haxe_crypto_Base64.encode(buffer).toString() + "|" + loadedSet.meta.timestamp;
				resolved({ data : tmp1});
			} else {
				rejected("unknown_exportType : " + exportType);
			}
		},rejected);
	},rejected);
};
app_certstorage_CertResolver.exportPFXFromResolved = function(loadedSet,crdt,resolved,rejected) {
	var rHandle = common_ResultHandler.create("CertResolver.exportPFXFromResolved").err(rejected,{ fileName : "CertResolver.hx", lineNumber : 534, className : "app.certstorage.CertResolver", methodName : "exportPFXFromResolved"});
	var epfx = new csafe_pkcs_pkcs12_PFX();
	haxe_Log.trace(loadedSet.meta,{ fileName : "CertResolver.hx", lineNumber : 536, className : "app.certstorage.CertResolver", methodName : "exportPFXFromResolved"});
	var tmp = loadedSet.cert.encode();
	var loadedSet1 = loadedSet.priv;
	var tmp1 = rHandle.chain("addCertAndPrivateKey").ok(function() {
		var signAndExport = function() {
			var signAndExport1 = rHandle.chain("CertResolver.exportFromResolvedSet.sign").ok(function() {
				haxe_Log.trace(haxe_crypto_Base64.encode(epfx.encode()),{ fileName : "CertResolver.hx", lineNumber : 543, className : "app.certstorage.CertResolver", methodName : "exportPFXFromResolved"});
				resolved(epfx);
			},{ fileName : "CertResolver.hx", lineNumber : 541, className : "app.certstorage.CertResolver", methodName : "exportPFXFromResolved"});
			epfx.sign(crdt,signAndExport1);
		};
		if(loadedSet.kmCert != null && loadedSet.kmPriv != null) {
			var tmp2 = loadedSet.kmCert.encode();
			var loadedSet2 = loadedSet.kmPriv;
			var tmp3 = rHandle.chain("CertResolver.exportPFXFromResolved").ok(signAndExport,{ fileName : "CertResolver.hx", lineNumber : 548, className : "app.certstorage.CertResolver", methodName : "exportPFXFromResolved"});
			epfx.addAsOCPForm(tmp2,loadedSet2,crdt,tmp3);
		} else {
			signAndExport();
		}
	},{ fileName : "CertResolver.hx", lineNumber : 538, className : "app.certstorage.CertResolver", methodName : "exportPFXFromResolved"});
	epfx.addAsOCPForm(tmp,loadedSet1,crdt,tmp1);
};
app_certstorage_CertResolver.resolveFromPFX = function(pfxB64,crdt,resolved,rejected) {
	var pfx = csafe_pkcs_pkcs12_PFX.struct.create(null,haxe_crypto_Base64.decode(pfxB64.toString()));
	pfx.verifyAndDecrypt(crdt,common_ResultHandler.create("CertResolver.resolveFromPFX").ok(function(resolvedMap) {
		haxe_Log.trace("DecPFX",{ fileName : "CertResolver.hx", lineNumber : 560, className : "app.certstorage.CertResolver", methodName : "resolveFromPFX"});
		var dataSet = { };
		var i = resolvedMap.keys();
		while(i.hasNext()) {
			var i1 = i.next();
			var _this = __map_reserved[i1] != null ? resolvedMap.getReserved(i1) : resolvedMap.h[i1];
			var cert = new csafe_x509_X509Certificate(__map_reserved["cert"] != null ? _this.getReserved("cert") : _this.h["cert"]);
			var _this1 = __map_reserved[i1] != null ? resolvedMap.getReserved(i1) : resolvedMap.h[i1];
			var priv = __map_reserved["priv"] != null ? _this1.getReserved("priv") : _this1.h["priv"];
			var keyUsage = cert.getResolvedExtension(csafe_x509_ext_KeyUsage);
			var keyUsageBools = keyUsage.asBooleanArray();
			if(keyUsageBools[csafe_x509_ext_KeyUsage.DigitalSignature]) {
				dataSet.cert = cert;
				dataSet.priv = priv;
				dataSet.meta = app_certstorage_CertResolver.extractCertInfo(cert);
			} else {
				dataSet.kmCert = cert;
				dataSet.kmPriv = priv;
			}
		}
		if(dataSet.cert != null && dataSet.priv != null) {
			if(!app_CertOID.isNPKI(dataSet.cert)) {
				rejected("not_support_cert");
			} else {
				resolved(dataSet);
			}
		} else {
			rejected("invalid_p12");
		}
	},{ fileName : "CertResolver.hx", lineNumber : 559, className : "app.certstorage.CertResolver", methodName : "resolveFromPFX"}).err(rejected,{ fileName : "CertResolver.hx", lineNumber : 559, className : "app.certstorage.CertResolver", methodName : "resolveFromPFX"}));
};
app_certstorage_CertResolver.saveP12 = function(filename,buffer) {
	var blob = new Blob([buffer.b.bufferValue],{ type : "application/octet-stream"});
	if(window.navigator.msSaveBlob) {
		window.navigator.msSaveBlob(blob,filename);
		return;
	}
	var URL = window.URL || window.webkitURL;
	var downloadUrl = URL.createObjectURL(blob);
	if(filename) {
		var a = document.createElement("a");
		a.style.display = "none";
		if(typeof(a.download) == "undefined") {
			window.location = downloadUrl;
		} else {
			a.href = downloadUrl;
			a.download = filename;
			document.body.appendChild(a);
			a.click();
		}
	} else {
		window.location = downloadUrl;
	}
	haxe_Timer.delay(function() {
		URL.revokeObjectURL(downloadUrl);
	},30000);
};
app_certstorage_CertResolver.importCertFromData = function(spec,onOK,onError) {
	var invokeValue = util_ObjectUtil.shallowCopyExclude(spec,["b64data"]);
	invokeValue.data = { };
	if(spec.type == "cert") {
		var certString = js_Boot.__cast(spec.b64data , String);
		var certDatas = certString.split("__BIZ__");
		if(certDatas.length != 2 && certDatas.length != 4) {
			onError("invalid_cert");
			return;
		}
		var cert = new csafe_x509_X509Certificate(certDatas[0]);
		var encryptedPriv = csafe_pkcs_pkcs8_PKCS8EncryptedPrivateKey.struct.create(null,haxe_crypto_Base64.decode(certDatas[1]));
		encryptedPriv.decrypt(spec.crdt,common_ResultHandler.create("CertResolver.importCertFromData").ok(function(decryptedPriv) {
			if(spec.storage == "none") {
				onOK();
				return;
			}
			var priv = decryptedPriv.encode();
			if(certDatas.length == 4) {
				var kmCert = new csafe_x509_X509Certificate(certDatas[2]);
				var encryptedKMPriv = csafe_pkcs_pkcs8_PKCS8EncryptedPrivateKey.struct.create(null,haxe_crypto_Base64.decode(certDatas[3]));
				encryptedKMPriv.decrypt(spec.crdt,common_ResultHandler.create("CertResolver.importCertFromData").ok(function(decryptedKMPriv) {
					var kmPriv = decryptedKMPriv.encode();
					var resolvedSet = app_certstorage_CertResolver.extractCertInfo(cert);
					var resolvedSet1 = { cert : cert, priv : priv, kmCert : kmCert, kmPriv : kmPriv, meta : resolvedSet};
					invokeValue.data = resolvedSet1;
					app_certstorage_CertResolver.saveResolvedSet(invokeValue,onOK,onError);
				},{ fileName : "CertResolver.hx", lineNumber : 647, className : "app.certstorage.CertResolver", methodName : "importCertFromData"}).err(function(e) {
					haxe_Log.trace(e,{ fileName : "CertResolver.hx", lineNumber : 654, className : "app.certstorage.CertResolver", methodName : "importCertFromData"});
					onError("incorrect_crdt");
				},{ fileName : "CertResolver.hx", lineNumber : 647, className : "app.certstorage.CertResolver", methodName : "importCertFromData"}));
			} else {
				var resolvedSet2 = app_certstorage_CertResolver.extractCertInfo(cert);
				var resolvedSet3 = { cert : cert, priv : priv, kmCert : null, kmPriv : null, meta : resolvedSet2};
				invokeValue.data = resolvedSet3;
				app_certstorage_CertResolver.saveResolvedSet(invokeValue,onOK,onError);
			}
		},{ fileName : "CertResolver.hx", lineNumber : 637, className : "app.certstorage.CertResolver", methodName : "importCertFromData"}).err(function(e1) {
			haxe_Log.trace(e1,{ fileName : "CertResolver.hx", lineNumber : 663, className : "app.certstorage.CertResolver", methodName : "importCertFromData"});
			onError("incorrect_crdt");
		},{ fileName : "CertResolver.hx", lineNumber : 637, className : "app.certstorage.CertResolver", methodName : "importCertFromData"}));
	} else if(spec.type == "p12") {
		var pfx = csafe_pkcs_pkcs12_PFX.struct.create(null,haxe_crypto_Base64.decode(spec.b64data));
		pfx.decrypt(spec.crdt,common_ResultHandler.create("CertResolver.importCertFromData").ok(function(resolvedMap) {
			if(spec.storage == "none") {
				onOK();
				return;
			}
			var i = resolvedMap.keys();
			while(i.hasNext()) {
				var i1 = i.next();
				var _this = __map_reserved[i1] != null ? resolvedMap.getReserved(i1) : resolvedMap.h[i1];
				var cert1 = new csafe_x509_X509Certificate(__map_reserved["cert"] != null ? _this.getReserved("cert") : _this.h["cert"]);
				var _this1 = __map_reserved[i1] != null ? resolvedMap.getReserved(i1) : resolvedMap.h[i1];
				var priv1 = __map_reserved["priv"] != null ? _this1.getReserved("priv") : _this1.h["priv"];
				var keyUsage = cert1.getResolvedExtension(csafe_x509_ext_KeyUsage);
				var keyUsageBools = keyUsage.asBooleanArray();
				if(keyUsageBools[csafe_x509_ext_KeyUsage.DigitalSignature]) {
					invokeValue.data.cert = cert1;
					invokeValue.data.priv = priv1;
				} else if(keyUsageBools[csafe_x509_ext_KeyUsage.KeyEncipherment]) {
					invokeValue.data.kmCert = cert1;
					invokeValue.data.kmPriv = priv1;
				}
			}
			app_certstorage_CertResolver.saveResolvedSet(invokeValue,onOK,onError);
		},{ fileName : "CertResolver.hx", lineNumber : 668, className : "app.certstorage.CertResolver", methodName : "importCertFromData"}).err(function(e2) {
			haxe_Log.trace(e2,{ fileName : "CertResolver.hx", lineNumber : 690, className : "app.certstorage.CertResolver", methodName : "importCertFromData"});
			onError("incorrect_crdt");
		},{ fileName : "CertResolver.hx", lineNumber : 668, className : "app.certstorage.CertResolver", methodName : "importCertFromData"}));
	} else {
		onError("invalid_type");
	}
};
var app_certstorage_FO_$KFTCOpenCert = function() {
	if(js_Browser.getSessionStorage() != null) {
		if(js_Browser.getSessionStorage().getItem("kftcOpenCertFO") == "1") {
			app_certstorage_FO_$KFTCOpenCert.MAX_TIMEOUT = app_certstorage_FO_$KFTCOpenCert.MAX_TIMEOUT / 2 | 0;
		}
	}
	this.opencert = OpenCert.getInstance();
};
app_certstorage_FO_$KFTCOpenCert.__name__ = ["app","certstorage","FO_KFTCOpenCert"];
app_certstorage_FO_$KFTCOpenCert.createTimeoutCallback = function(origin) {
	var called = false;
	var onceCallback = function(arg1,arg2,arg3,arg4,arg5,arg6) {
		if(!called) {
			called = true;
			haxe_Log.trace("original called",{ fileName : "FO_KFTCOpenCert.hx", lineNumber : 34, className : "app.certstorage.FO_KFTCOpenCert", methodName : "createTimeoutCallback"});
			origin(arg1,arg2,arg3,arg4,arg5,arg6);
		} else {
			haxe_Log.trace("Ignore KFTCOpenCert callback(timeout)",{ fileName : "FO_KFTCOpenCert.hx", lineNumber : 37, className : "app.certstorage.FO_KFTCOpenCert", methodName : "createTimeoutCallback"});
		}
	};
	haxe_Timer.delay(function() {
		if(!called) {
			called = true;
			haxe_Log.trace("Changed OpenCert FailOver mode",{ fileName : "FO_KFTCOpenCert.hx", lineNumber : 45, className : "app.certstorage.FO_KFTCOpenCert", methodName : "createTimeoutCallback"});
			app_certstorage_FO_$KFTCOpenCert.FO_MODE = true;
			if(js_Browser.getSessionStorage() != null) {
				js_Browser.getSessionStorage().setItem("kftcOpenCertFO","1");
			}
			alert("현재 공동저장소가 무응답 상태이므로 로컬인증서만 사용합니다");
			onceCallback({ });
		} else {
			haxe_Log.trace("no fo",{ fileName : "FO_KFTCOpenCert.hx", lineNumber : 52, className : "app.certstorage.FO_KFTCOpenCert", methodName : "createTimeoutCallback"});
		}
	},app_certstorage_FO_$KFTCOpenCert.MAX_TIMEOUT);
	return onceCallback;
};
app_certstorage_FO_$KFTCOpenCert.__super__ = OpenCert;
app_certstorage_FO_$KFTCOpenCert.prototype = $extend(OpenCert.prototype,{
	init: function(apikey,callback) {
		if(app_certstorage_FO_$KFTCOpenCert.FO_MODE) {
			callback({ serverNonce : util_CryptUtil.encodeBase64Url(new haxe_io_Bytes(new ArrayBuffer(20)))});
		} else {
			this.opencert.init(apikey,app_certstorage_FO_$KFTCOpenCert.createTimeoutCallback(callback));
		}
	}
	,mergeCertInfos: function(localCertInfos,callback,option) {
		if(app_certstorage_FO_$KFTCOpenCert.FO_MODE) {
			var _g = 0;
			while(_g < localCertInfos.length) {
				var cInfo = localCertInfos[_g];
				++_g;
				cInfo.source = "LOCAL";
			}
			callback({ certInfos : localCertInfos});
		} else {
			this.opencert.mergeCertInfos(localCertInfos,app_certstorage_FO_$KFTCOpenCert.createTimeoutCallback(callback));
		}
	}
	,setPKCS12: function(pkcs12,certInfo,apipwd,callback,option) {
		if(app_certstorage_FO_$KFTCOpenCert.FO_MODE) {
			callback({ });
		} else {
			haxe_Log.trace("1111111",{ fileName : "FO_KFTCOpenCert.hx", lineNumber : 81, className : "app.certstorage.FO_KFTCOpenCert", methodName : "setPKCS12"});
			this.opencert.setPKCS12(pkcs12,certInfo,apipwd,app_certstorage_FO_$KFTCOpenCert.createTimeoutCallback(callback));
		}
	}
	,getPKCS12: function(fingerprint,apipwd,clientNonce,callback) {
		if(app_certstorage_FO_$KFTCOpenCert.FO_MODE) {
			callback({ error : "FO_MODE"});
		} else {
			this.opencert.getPKCS12(fingerprint,apipwd,clientNonce,app_certstorage_FO_$KFTCOpenCert.createTimeoutCallback(callback));
		}
	}
	,removePKCS12: function(fingerprint,callback) {
		if(app_certstorage_FO_$KFTCOpenCert.FO_MODE) {
			callback({ });
		} else {
			this.opencert.removePKCS12(fingerprint,app_certstorage_FO_$KFTCOpenCert.createTimeoutCallback(callback));
		}
	}
	,__class__: app_certstorage_FO_$KFTCOpenCert
});
var app_certstorage_KFTCBrowser = function() { };
app_certstorage_KFTCBrowser.__name__ = ["app","certstorage","KFTCBrowser"];
app_certstorage_KFTCBrowser.genOCP = function(fph,p,resolved,rejected) {
	var bb = new haxe_io_BytesBuffer();
	var src = haxe_io_Bytes.ofString(fph);
	var b1 = bb.b;
	var b2 = src.b;
	var _g1 = 0;
	var _g = src.length;
	while(_g1 < _g) {
		var i = _g1++;
		bb.b.push(b2[i]);
	}
	var b11 = bb.b;
	var b21 = p.b;
	var _g11 = 0;
	var _g2 = p.length;
	while(_g11 < _g2) {
		var i1 = _g11++;
		bb.b.push(b21[i1]);
	}
	var bbc = bb.getBytes();
	LZZerorize.pus(bbc);
	util_CryptUtil.repeatHashAsync(csafe_asn1_impl_AlgorithmID.sha256,bbc,2048,function(digested) {
		var tmp = digested.toHex();
		resolved(tmp);
	},rejected);
};
app_certstorage_KFTCBrowser.decEvKey = function() {
	return app_certstorage_KFTCBrowser.EncLKEY;
};
app_certstorage_KFTCBrowser.genCI = function(cert,status) {
	var certPolicies = cert.getResolvedExtension(csafe_x509_ext_CertificatePolicies);
	var certOID = certPolicies.getPolicyInformations()[0].getPolicyIdentifier().oid;
	var cInfo = { };
	cInfo.fingerprint = cert.getFingerprint();
	cInfo.timestamp = Std.string(new Date().getTime());
	cInfo.status = status;
	cInfo.notBefore = DateTools.format(cert.getNotBefore(),"%Y-%m-%d %H:%M:%S");
	cInfo.notAfter = DateTools.format(cert.getNotAfter(),"%Y-%m-%d %H:%M:%S");
	cInfo.issuer = cert.getIssuerDN().toString();
	cInfo.subject = cert.getSubjectDN().toString();
	cInfo.policyOID = certOID;
	return cInfo;
};
app_certstorage_KFTCBrowser.createLocalCIs = function() {
	var lcis = [];
	var storage = js_Browser.getLocalStorage();
	var data = storage.getItem(app_certstorage_KFTCBrowser.LOCALKEY);
	if(util_StringUtil.isNull(data)) {
		lcis = [];
	} else {
		lcis = JSON.parse(data);
	}
	return lcis;
};
app_certstorage_KFTCBrowser.getStatus = function(spec,resolved,rejected) {
	resolved({ status : "OK"});
};
app_certstorage_KFTCBrowser.sInit = function(spec,resolved,rejected) {
	var lcis = [];
	var storage = js_Browser.getLocalStorage();
	var data = storage.getItem(app_certstorage_KFTCBrowser.LOCALKEY);
	if(util_StringUtil.isNull(data)) {
		lcis = [];
	} else {
		lcis = JSON.parse(data);
	}
	var lcInfos = lcis;
	var startTime = new Date().getTime();
	var merger = function(res) {
		if(res.error != null) {
			rejected(res.error);
			return;
		}
		var opencert = res.opencert;
		var serverNonce = res.serverNonce;
		haxe_Log.trace("KFTCBrowser init. " + (new Date().getTime() - startTime) + "ms",{ fileName : "KFTCBrowser.hx", lineNumber : 106, className : "app.certstorage.KFTCBrowser", methodName : "sInit"});
		var lcis1 = [];
		var storage1 = js_Browser.getLocalStorage();
		var data1 = storage1.getItem(app_certstorage_KFTCBrowser.LOCALKEY);
		if(util_StringUtil.isNull(data1)) {
			lcis1 = [];
		} else {
			lcis1 = JSON.parse(data1);
		}
		var lcInfosExcludeP12 = lcis1;
		var _g = 0;
		while(_g < lcInfosExcludeP12.length) {
			var lcInfo = lcInfosExcludeP12[_g];
			++_g;
			Reflect.deleteField(lcInfo,"pkcs12");
		}
		opencert.mergeCertInfos(lcInfosExcludeP12,function(mergeRes) {
			if(mergeRes.error != null) {
				rejected(mergeRes.error);
				return;
			}
			var list = { };
			var mergedInfos = mergeRes.certInfos;
			var _g1 = 0;
			while(_g1 < mergedInfos.length) {
				var mInfo = mergedInfos[_g1];
				++_g1;
				haxe_Log.trace(mInfo,{ fileName : "KFTCBrowser.hx", lineNumber : 121, className : "app.certstorage.KFTCBrowser", methodName : "sInit"});
				if(mInfo.status != "SAVE") {
					continue;
				}
				var sdn = util_CryptUtil.parseDNSAsMap(mInfo.subject,true);
				var idn = util_CryptUtil.parseDNSAsMap(mInfo.issuer,true);
				var rv = { subjectCN : sdn.cn, org : idn.cn, type : mInfo.policyOID, beforeDate : mInfo.notBefore, afterDate : mInfo.notAfter, subjectDN : mInfo.subject, issuerDN : mInfo.issuer, source : mInfo.source};
				list[mInfo.fingerprint] = { info : rv};
			}
			app_certstorage_KFTCBrowser.cachedIOP = { opencert : opencert, serverNonce : serverNonce, mergedList : list, getLocalCI : function(fp,readOnly) {
				if(readOnly == null) {
					readOnly = false;
				}
				var _g2 = 0;
				while(_g2 < lcInfos.length) {
					var lcInfo1 = lcInfos[_g2];
					++_g2;
					if(lcInfo1.fingerprint == fp) {
						if(readOnly) {
							var rv1 = Reflect.copy(lcInfo1);
							Reflect.deleteField(rv1,"pkcs12");
							return rv1;
						}
						return lcInfo1;
					}
				}
				return null;
			}, removeLocalCI : function(fp1) {
				var _g11 = 0;
				var _g3 = lcInfos.length;
				while(_g11 < _g3) {
					var i = _g11++;
					var rv2 = lcInfos[i];
					if(rv2.fingerprint == fp1) {
						lcInfos.splice(i,1);
						return rv2;
					}
				}
				return null;
			}, newLocalCI : function(data2) {
				lcInfos.push(data2);
			}, commitLocal : function() {
				haxe_Log.trace("Local Commit list",{ fileName : "KFTCBrowser.hx", lineNumber : 174, className : "app.certstorage.KFTCBrowser", methodName : "sInit"});
				haxe_Log.trace(lcInfos,{ fileName : "KFTCBrowser.hx", lineNumber : 175, className : "app.certstorage.KFTCBrowser", methodName : "sInit"});
				js_Browser.getLocalStorage().setItem(app_certstorage_KFTCBrowser.LOCALKEY,JSON.stringify(lcInfos));
			}};
			resolved(app_certstorage_KFTCBrowser.cachedIOP);
		});
	};
	if(app_certstorage_KFTCBrowser.cachedIOP != null) {
		merger(app_certstorage_KFTCBrowser.cachedIOP);
	} else {
		var opencert1 = OpenCert.getInstance();
		opencert1.init(app_certstorage_KFTCBrowser.EncLKEY,function(res1) {
			res1.opencert = opencert1;
			merger(res1);
		});
	}
};
app_certstorage_KFTCBrowser.list = function(spec,resolved,rejected) {
	app_certstorage_KFTCBrowser.sInit(spec,function(iop) {
		resolved(iop.mergedList);
	},rejected);
};
app_certstorage_KFTCBrowser.resolveSAV = function(spec,resolved,rejected) {
	app_certstorage_KFTCBrowser.genOCP(spec.cid,spec.crdt,function(ocp) {
		haxe_Log.trace(ocp,{ fileName : "KFTCBrowser.hx", lineNumber : 206, className : "app.certstorage.KFTCBrowser", methodName : "resolveSAV"});
		app_certstorage_KFTCBrowser.sInit(spec,function(iop) {
			var opencert = iop.opencert;
			var mergedList = iop.mergedList;
			haxe_Log.trace(iop.serverNonce,{ fileName : "KFTCBrowser.hx", lineNumber : 210, className : "app.certstorage.KFTCBrowser", methodName : "resolveSAV"});
			var serverNonce = util_CryptUtil.decodeBase64Url(iop.serverNonce);
			var clientNonce = new haxe_io_Bytes(new ArrayBuffer(20));
			csafe_asn1_impl_AlgorithmID.getRandomValues(clientNonce);
			var clientNonceB64 = util_CryptUtil.encodeBase64Url(clientNonce);
			var cidData = Reflect.field(mergedList,spec.cid);
			var cInfo = cidData.info;
			haxe_Log.trace(serverNonce,{ fileName : "KFTCBrowser.hx", lineNumber : 217, className : "app.certstorage.KFTCBrowser", methodName : "resolveSAV"});
			haxe_Log.trace(clientNonce,{ fileName : "KFTCBrowser.hx", lineNumber : 218, className : "app.certstorage.KFTCBrowser", methodName : "resolveSAV"});
			var resolvePKCS12 = function(dec) {
				var pfx = csafe_pkcs_pkcs12_PFX.struct.create(null,dec);
				haxe_Log.trace("Before DecPFX",{ fileName : "KFTCBrowser.hx", lineNumber : 223, className : "app.certstorage.KFTCBrowser", methodName : "resolveSAV"});
				pfx.decrypt(spec.crdt,common_ResultHandler.create("").ok(function(resolvedMap) {
					haxe_Log.trace("DecPFX",{ fileName : "KFTCBrowser.hx", lineNumber : 225, className : "app.certstorage.KFTCBrowser", methodName : "resolveSAV"});
					var dataSet = { };
					var i = resolvedMap.keys();
					while(i.hasNext()) {
						var i1 = i.next();
						var _this = __map_reserved[i1] != null ? resolvedMap.getReserved(i1) : resolvedMap.h[i1];
						var cert = new csafe_x509_X509Certificate(__map_reserved["cert"] != null ? _this.getReserved("cert") : _this.h["cert"]);
						var _this1 = __map_reserved[i1] != null ? resolvedMap.getReserved(i1) : resolvedMap.h[i1];
						var priv = __map_reserved["priv"] != null ? _this1.getReserved("priv") : _this1.h["priv"];
						var keyUsage = cert.getResolvedExtension(csafe_x509_ext_KeyUsage);
						var keyUsageBools = keyUsage.asBooleanArray();
						if(keyUsageBools[csafe_x509_ext_KeyUsage.DigitalSignature]) {
							dataSet = { cert : cert, priv : priv};
							break;
						}
					}
					if(dataSet.cert != null && dataSet.priv != null) {
						if(!app_CertOID.isNPKI(dataSet.cert)) {
							rejected("not_support_cert");
							return;
						} else if(cInfo.source == "LOCAL") {
							var resolvePKCS121 = haxe_crypto_Base64.encode(dec);
							opencert.setPKCS12(resolvePKCS121,cInfo,ocp,function(res) {
								resolved(new csafe_DefaultSignAndVerifier(dataSet.cert,dataSet.priv));
							});
						} else if(cInfo.source == "OPENCERT") {
							cInfo.pkcs12 = haxe_crypto_Base64.encode(dec);
							iop.newLocalCI(cInfo);
							iop.commitLocal();
							resolved(new csafe_DefaultSignAndVerifier(dataSet.cert,dataSet.priv));
						} else {
							resolved(new csafe_DefaultSignAndVerifier(dataSet.cert,dataSet.priv));
						}
					} else {
						rejected("invalid_p12");
					}
				},{ fileName : "KFTCBrowser.hx", lineNumber : 224, className : "app.certstorage.KFTCBrowser", methodName : "resolveSAV"}));
			};
			if(cInfo != null) {
				if(cInfo.source == "LOCAL" || cInfo.source == "BOTH") {
					var tmp = haxe_crypto_Base64.decode(iop.getLocalCI(spec.cid).pkcs12);
					resolvePKCS12(tmp);
				} else if(cInfo.source == "OPENCERT") {
					opencert.getPKCS12(spec.cid,ocp,clientNonceB64,function(resultData) {
						if(resultData.error != null) {
							rejected(resultData.error);
							return;
						}
						var resultDataB = util_CryptUtil.decodeBase64Url(resultData.pkcs12);
						var iv = resultDataB.sub(0,16);
						var encPKCS12 = resultDataB.sub(16,resultDataB.length);
						var evk = new haxe_io_BytesBuffer();
						var b1 = evk.b;
						var b2 = clientNonce.b;
						var _g1 = 0;
						var _g = clientNonce.length;
						while(_g1 < _g) {
							var i2 = _g1++;
							evk.b.push(b2[i2]);
						}
						var b11 = evk.b;
						var b21 = serverNonce.b;
						var _g11 = 0;
						var _g2 = serverNonce.length;
						while(_g11 < _g2) {
							var i3 = _g11++;
							evk.b.push(b21[i3]);
						}
						var rHandle = common_ResultHandler.create("KFTCBrowser.resolveSAV").err(rejected,{ fileName : "KFTCBrowser.hx", lineNumber : 284, className : "app.certstorage.KFTCBrowser", methodName : "resolveSAV"});
						util_CryptUtil.repeatHashAsync(csafe_asn1_impl_AlgorithmID.sha256,evk.getBytes(),2048,function(key) {
							var tmp1 = csafe_asn1_impl_AlgorithmID.aes256_CBC;
							var tmp2 = rHandle.chain("RepeatHash").ok(resolvePKCS12,{ fileName : "KFTCBrowser.hx", lineNumber : 286, className : "app.certstorage.KFTCBrowser", methodName : "resolveSAV"});
							tmp1.decrypt(key,encPKCS12,{ iv : iv},tmp2);
						},rejected);
					});
				} else {
					haxe_Log.trace(cInfo,{ fileName : "KFTCBrowser.hx", lineNumber : 290, className : "app.certstorage.KFTCBrowser", methodName : "resolveSAV"});
					rejected("invalid_certInfo_source[" + cInfo.source + "]");
				}
			} else {
				rejected("cert_not_exist");
			}
		},rejected);
	},rejected);
};
app_certstorage_KFTCBrowser.getCertificate = function(spec,resolved,rejected) {
};
app_certstorage_KFTCBrowser.loadResolvedSet = function(spec,resolved,rejected) {
	rejected("TempStore.loadResolvedSet not support");
};
app_certstorage_KFTCBrowser.saveResolvedSet = function(spec,resolved,rejected) {
	var resolvedSet = spec.data;
	var fp = spec.cid;
	if(util_StringUtil.isNull(fp)) {
		fp = (js_Boot.__cast(resolvedSet.cert , csafe_x509_X509Certificate)).getFingerprint();
	}
	app_certstorage_KFTCBrowser.genOCP(fp,spec.crdt,function(ocp) {
		app_certstorage_KFTCBrowser.sInit(spec,function(iop) {
			var mergedList = iop.mergedList;
			var cid = spec.cid;
			var cInfo = null;
			if(!util_StringUtil.isNull(cid)) {
				cInfo = Reflect.field(mergedList,cid);
				if(cInfo == null) {
					rejected("cert_not_exist");
					return;
				}
			} else {
				cInfo = app_certstorage_KFTCBrowser.genCI(resolvedSet.cert,"SAVE");
			}
			app_certstorage_CertResolver.exportPFXFile({ storage : "none", exportType : "base64", cert : resolvedSet.cert, priv : resolvedSet.priv, crdt : spec.crdt},function(result) {
				var p12b64 = result.data;
				var tmp = new Date().getTime();
				cInfo.timestamp = Std.string(tmp);
				var lcInfo = iop.getLocalCI(cInfo.fingerprint);
				if(lcInfo != null) {
					lcInfo.timestamp = cInfo.timestamp;
					lcInfo.pkcs12 = cInfo.pkcs12;
				} else {
					cInfo.pkcs12 = p12b64;
					iop.newLocalCI(cInfo);
				}
				iop.commitLocal();
				var opencert = iop.opencert;
				opencert.setPKCS12(p12b64,cInfo,ocp,function(res) {
					if(res.error == null) {
						resolved();
					} else {
						rejected(res.error);
					}
				});
			},rejected);
		},rejected);
	},rejected);
};
app_certstorage_KFTCBrowser.loadForSerialize = function(spec,resolved,rejected) {
	rejected("TempStore.loadForSerialize not support");
};
app_certstorage_KFTCBrowser.saveForSerialize = function(rawSet,resolved,rejected) {
	rejected("TempStore.saveForSerialize not support");
};
app_certstorage_KFTCBrowser.remove = function(spec,resolved,rejected) {
	app_certstorage_KFTCBrowser.sInit(spec,function(iop) {
		var removed = iop.removeLocalCI(spec.cid,true);
		iop.commitLocal();
		iop.opencert.removePKCS12(spec.cid,function(res) {
			if(res.error != null && removed == null) {
				rejected(res.error);
				return;
			} else {
				resolved();
			}
		});
	},rejected);
};
var csafe_asn1_impl_AlgorithmImplSpec = function() { };
csafe_asn1_impl_AlgorithmImplSpec.__name__ = ["csafe","asn1","impl","AlgorithmImplSpec"];
csafe_asn1_impl_AlgorithmImplSpec.prototype = {
	__class__: csafe_asn1_impl_AlgorithmImplSpec
};
var app_js_WebCryptoAlgorithmImpl = function() {
};
app_js_WebCryptoAlgorithmImpl.__name__ = ["app","js","WebCryptoAlgorithmImpl"];
app_js_WebCryptoAlgorithmImpl.__interfaces__ = [csafe_asn1_impl_AlgorithmImplSpec];
app_js_WebCryptoAlgorithmImpl.toUint8 = function(data) {
	return data.b;
};
app_js_WebCryptoAlgorithmImpl.toBytes = function(data) {
	if(js_Boot.__instanceof(data,ArrayBuffer)) {
		return haxe_io_Bytes.ofData(js_Boot.__cast(data , ArrayBuffer));
	} else if(js_Boot.__instanceof(data,Uint8Array)) {
		return haxe_io_Bytes.ofData((js_Boot.__cast(data , Uint8Array)).buffer);
	} else {
		throw new js__$Boot_HaxeError(new Exception("Invalid parameter for toBytes"));
	}
};
app_js_WebCryptoAlgorithmImpl.prototype = {
	getRandomValues: function(data) {
		if(data.length <= app_js_WebCryptoAlgorithmImpl.MAX_RANDOM_LEN) {
			app_js_WebCryptoWrapper.getRandomValues(data.b);
		} else {
			var fragLen = data.length / app_js_WebCryptoAlgorithmImpl.MAX_RANDOM_LEN + 1 | 0;
			var temp = new haxe_io_Bytes(new ArrayBuffer(app_js_WebCryptoAlgorithmImpl.MAX_RANDOM_LEN));
			var _g1 = 0;
			var _g = fragLen;
			while(_g1 < _g) {
				var i = _g1++;
				var nextLen = (i + 1) * app_js_WebCryptoAlgorithmImpl.MAX_RANDOM_LEN <= data.length ? app_js_WebCryptoAlgorithmImpl.MAX_RANDOM_LEN : data.length % app_js_WebCryptoAlgorithmImpl.MAX_RANDOM_LEN;
				app_js_WebCryptoWrapper.getRandomValues(temp.b);
				data.blit(i * app_js_WebCryptoAlgorithmImpl.MAX_RANDOM_LEN,temp,0,nextLen);
			}
		}
	}
	,encrypt: function(algorithm,key,data,parameter,rHandle) {
		this.crypt(1,algorithm,key,data,parameter,rHandle);
	}
	,decrypt: function(algorithm,key,data,parameter,rHandle) {
		this.crypt(2,algorithm,key,data,parameter,rHandle);
	}
	,getSoftCipher: function(algorithm,key) {
		var cipher = null;
		var mode = new csafe_crypto_mode_CBC();
		var pad = new csafe_crypto_padding_PadPkcs5();
		var cipherName = algorithm.getCipherName();
		if(cipherName == "SEED-CBC") {
			cipher = new csafe_crypto_cipher_symm_SEED(key);
		} else if(cipherName == "3DES-CBC") {
			cipher = new csafe_crypto_cipher_symm_TripleDes(key);
		} else if(cipherName == "RC4-CBC") {
			cipher = new csafe_crypto_cipher_symm_RC4(key);
			mode = new csafe_crypto_mode_ECB();
			pad = new csafe_crypto_padding_PadNull();
		} else if(cipherName == "RC2-CBC") {
			cipher = new csafe_crypto_cipher_symm_RC2(key);
		} else if(cipherName == "3DES-CBC") {
			cipher = new csafe_crypto_cipher_symm_TripleDes(key);
		} else {
			return null;
		}
		var cipherImpl = new csafe_crypto_Cipher(cipher,mode,pad);
		return cipherImpl;
	}
	,crypt: function(mode,algorithm,key,data,parameter,rHandle) {
		var _gthis = this;
		haxe_Log.trace("tryCall : " + "WebCryptoWrapper.crypt",{ fileName : "ResultHandler.hx", lineNumber : 121, className : "common.ResultHandler", methodName : "tryCall", customParams : [{ fileName : "WebCryptoAlgorithmImpl.hx", lineNumber : 174, className : "app.js.WebCryptoAlgorithmImpl", methodName : "crypt"}]});
		try {
			var softCipher = _gthis.getSoftCipher(algorithm,key);
			if(softCipher != null) {
				try {
					var cipherParams = new csafe_crypto_cipher_CipherParams();
					if(parameter != null && parameter.iv != null) {
						cipherParams.iv = parameter.iv;
					}
					var cipherDirection = mode == 1 ? csafe_crypto_cipher_CipherDirection.ENCRYPT : csafe_crypto_cipher_CipherDirection.DECRYPT;
					softCipher.init(cipherDirection,cipherParams);
					var outBuffer = new haxe_io_BytesOutput();
					softCipher["final"](data,0,data.length,outBuffer);
					var tmp = outBuffer.getBytes();
					rHandle.onOk(tmp);
				} catch( err ) {
					if (err instanceof js__$Boot_HaxeError) err = err.val;
					rHandle.onErr(Std.string(err));
				}
			} else {
				var cipherIV = null;
				if(parameter != null) {
					if(parameter.iv != null) {
						cipherIV = parameter.iv.b;
					}
				}
				var algSpec = { name : algorithm.getCipherName()};
				if(cipherIV != null) {
					algSpec.iv = cipherIV;
				}
				var cryptFunc;
				if(algSpec.name == "RSA") {
					algSpec.name = "RSA-OAEP";
				}
				if(mode == 1) {
					cryptFunc = app_js_WebCryptoWrapper.encrypt;
				} else {
					cryptFunc = app_js_WebCryptoWrapper.decrypt;
				}
				_gthis.importKey(algorithm,key,rHandle.chain("WebCryptoWrapper.crypt.importKey").ok(function(cryptoKey) {
					cryptFunc(algSpec,cryptoKey,data.b,function(crypted) {
						var tmp1;
						if(js_Boot.__instanceof(crypted,ArrayBuffer)) {
							tmp1 = haxe_io_Bytes.ofData(js_Boot.__cast(crypted , ArrayBuffer));
						} else if(js_Boot.__instanceof(crypted,Uint8Array)) {
							tmp1 = haxe_io_Bytes.ofData((js_Boot.__cast(crypted , Uint8Array)).buffer);
						} else {
							throw new js__$Boot_HaxeError(new Exception("Invalid parameter for toBytes"));
						}
						rHandle.onOk(tmp1);
					},$bind(rHandle,rHandle.onErr));
				},{ fileName : "WebCryptoAlgorithmImpl.hx", lineNumber : 215, className : "app.js.WebCryptoAlgorithmImpl", methodName : "crypt"}));
			}
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			rHandle.onErr(e);
		}
	}
	,sign: function(algorithm,key,data,rHandle) {
		var resolvedKey = null;
		var mech = algorithm.getMech();
		if(mech == "sign") {
			if(js_Boot.__instanceof(key,haxe_io_Bytes)) {
				var p8k = csafe_pkcs_pkcs8_PKCS8PrivateKey.struct.create(null,js_Boot.__cast(key , haxe_io_Bytes));
				var algo = p8k.getASN1("privateKeyAlgorithm");
				algo.getAny("parameter").setNull();
				if(p8k.childs[4] != null) {
					(js_Boot.__cast(p8k.childs[4] , csafe_asn1_ASN1ConSpec)).spec = null;
				}
				key = p8k.encode();
				var signerr = function(err) {
					if(algorithm.equalsOID(csafe_asn1_impl_AlgorithmID.sha256WithRSAEncryption)) {
						haxe_Log.trace("rsassa",{ fileName : "WebCryptoAlgorithmImpl.hx", lineNumber : 254, className : "app.js.WebCryptoAlgorithmImpl", methodName : "sign"});
						csafe_crypto_cipher_asymm_rsa_RSASSASignature.sign(key,data,rHandle);
					} else if(algorithm.equalsOID(csafe_asn1_impl_AlgorithmID.rsaPSS)) {
						haxe_Log.trace("rsapss",{ fileName : "WebCryptoAlgorithmImpl.hx", lineNumber : 257, className : "app.js.WebCryptoAlgorithmImpl", methodName : "sign"});
						csafe_crypto_cipher_asymm_rsa_RSAPSSSignature.sign(key,data,rHandle);
					} else {
						rHandle.onErr("can't sign: " + err);
					}
				};
				try {
					app_js_WebCryptoWrapper.importKey("pkcs8",key.b,{ name : algorithm.getSignName(), hash : { name : algorithm.getDigestName()}},false,["sign"],function(cryptoKey) {
						var signSpec = { name : algorithm.getSignName(), hash : { name : algorithm.getDigestName()}};
						if(signSpec.name == "RSA-PSS") {
							signSpec.saltLength = 128;
						}
						try {
							app_js_WebCryptoWrapper.sign(signSpec,cryptoKey,data.b,function(signed) {
								var tmp;
								if(js_Boot.__instanceof(signed,ArrayBuffer)) {
									tmp = haxe_io_Bytes.ofData(js_Boot.__cast(signed , ArrayBuffer));
								} else if(js_Boot.__instanceof(signed,Uint8Array)) {
									tmp = haxe_io_Bytes.ofData((js_Boot.__cast(signed , Uint8Array)).buffer);
								} else {
									throw new js__$Boot_HaxeError(new Exception("Invalid parameter for toBytes"));
								}
								rHandle.onOk(tmp);
							},signerr);
						} catch( er ) {
							if (er instanceof js__$Boot_HaxeError) er = er.val;
							signerr(er);
						}
					},signerr);
				} catch( e ) {
					if (e instanceof js__$Boot_HaxeError) e = e.val;
					signerr(e);
				}
			} else {
				app_js_WebCryptoWrapper.sign({ name : algorithm.getSignName()},key,data.b,$bind(rHandle,rHandle.onOk),$bind(rHandle,rHandle.onErr));
			}
		} else if(mech == "hmac") {
			if(js_Boot.__instanceof(key,haxe_io_Bytes)) {
				app_js_WebCryptoWrapper.importKey("raw",key.b,{ name : "HMAC", hash : { name : algorithm.getDigestName()}},false,["sign"],function(cryptoKey1) {
					app_js_WebCryptoWrapper.sign({ name : "HMAC", hash : { name : algorithm.getDigestName()}},cryptoKey1,data.b,function(signed1) {
						var tmp1;
						if(js_Boot.__instanceof(signed1,ArrayBuffer)) {
							tmp1 = haxe_io_Bytes.ofData(js_Boot.__cast(signed1 , ArrayBuffer));
						} else if(js_Boot.__instanceof(signed1,Uint8Array)) {
							tmp1 = haxe_io_Bytes.ofData((js_Boot.__cast(signed1 , Uint8Array)).buffer);
						} else {
							throw new js__$Boot_HaxeError(new Exception("Invalid parameter for toBytes"));
						}
						rHandle.onOk(tmp1);
					},$bind(rHandle,rHandle.onErr));
				},$bind(rHandle,rHandle.onErr));
			} else {
				app_js_WebCryptoWrapper.sign({ name : "HMAC", hash : { name : algorithm.getDigestName()}},key,data.b,$bind(rHandle,rHandle.onOk),$bind(rHandle,rHandle.onErr));
			}
		} else if(mech == "pbmac") {
			if(csafe_asn1_impl_AlgorithmID.PBEtricMAC.equalsOID(algorithm)) {
				var tmp2 = csafe_crypto_cipher_pbe_PBEtriMac.mac(key,data);
				rHandle.onOk(tmp2);
			} else {
				var tmp3 = "Unknown mechanism : " + mech + " " + algorithm.getAlgorithm().oid;
				rHandle.onErr(tmp3);
			}
		} else {
			var tmp4 = "Unknown mechanism : " + mech + " " + algorithm.getAlgorithm().oid;
			rHandle.onErr(tmp4);
		}
	}
	,verify: function(algorithm,key,signature,data,rHandle) {
		var resolvedKey = null;
		var mech = algorithm.getMech();
		if(mech == "sign") {
			if(app_js_WebCryptoAlgorithmImpl.RSA_SSA_MODE == 1 && algorithm.equalsOID(csafe_asn1_impl_AlgorithmID.sha256WithRSAEncryption)) {
				csafe_crypto_cipher_asymm_rsa_RSASSASignature.verify(key,signature,data,rHandle);
				return;
			}
			if(js_Boot.__instanceof(key,haxe_io_Bytes)) {
				app_js_WebCryptoWrapper.importKey("spki",key.b,{ name : algorithm.getSignName(), hash : { name : algorithm.getDigestName()}},false,["verify"],function(cryptoKey) {
					app_js_WebCryptoWrapper.verify({ name : algorithm.getSignName()},cryptoKey,signature.b,data.b,function(isValid) {
						rHandle.onOk(isValid);
					},$bind(rHandle,rHandle.onErr));
				},$bind(rHandle,rHandle.onErr));
			} else {
				app_js_WebCryptoWrapper.verify({ name : algorithm.getSignName()},key,signature.b,data.b,$bind(rHandle,rHandle.onOk),$bind(rHandle,rHandle.onErr));
			}
		} else if(mech == "hmac") {
			if(js_Boot.__instanceof(key,haxe_io_Bytes)) {
				app_js_WebCryptoWrapper.importKey("raw",key.b,{ name : "HMAC", hash : { name : algorithm.getDigestName()}},false,["verify"],function(cryptoKey1) {
					app_js_WebCryptoWrapper.verify({ name : "HMAC", hash : { name : algorithm.getDigestName()}},cryptoKey1,signature.b,data.b,function(isValid1) {
						rHandle.onOk(isValid1);
					},$bind(rHandle,rHandle.onErr));
				},$bind(rHandle,rHandle.onErr));
			} else {
				app_js_WebCryptoWrapper.verify({ name : "HMAC", hash : { name : algorithm.getDigestName()}},key,signature.b,data.b,$bind(rHandle,rHandle.onOk),$bind(rHandle,rHandle.onErr));
			}
		} else {
			var tmp = "Unknown mechanism : " + mech + " " + algorithm.getAlgorithm().oid;
			rHandle.onErr(tmp);
		}
	}
	,digest: function(algorithm,data,rHandle) {
		if(data.length == 0) {
			if(algorithm.equalsOID(csafe_asn1_impl_AlgorithmID.md5)) {
				var tmp = csafe_crypto_hash_Md5.encode(data);
				rHandle.onOk(tmp);
			} else if(algorithm.equalsOID(csafe_asn1_impl_AlgorithmID.sha1)) {
				var tmp1 = csafe_crypto_hash_Sha1.encode(data);
				rHandle.onOk(tmp1);
			} else if(algorithm.equalsOID(csafe_asn1_impl_AlgorithmID.sha256)) {
				var tmp2 = csafe_crypto_hash_Sha256.encode(data);
				rHandle.onOk(tmp2);
			} else {
				var tmp3 = "unsuppor_algo_" + algorithm.getAlgorithm().oid;
				rHandle.onErr(tmp3);
			}
			return;
		}
		app_js_WebCryptoWrapper.digest({ name : algorithm.getDigestName()},data.b,function(digested) {
			var tmp4;
			if(js_Boot.__instanceof(digested,ArrayBuffer)) {
				tmp4 = haxe_io_Bytes.ofData(js_Boot.__cast(digested , ArrayBuffer));
			} else if(js_Boot.__instanceof(digested,Uint8Array)) {
				tmp4 = haxe_io_Bytes.ofData((js_Boot.__cast(digested , Uint8Array)).buffer);
			} else {
				throw new js__$Boot_HaxeError(new Exception("Invalid parameter for toBytes"));
			}
			rHandle.onOk(tmp4);
		},$bind(rHandle,rHandle.onErr));
	}
	,generateKey: function(algorithm,parameter,rHandle) {
		if(csafe_asn1_impl_AlgorithmID.rsa.equalsOID(algorithm) || csafe_asn1_impl_AlgorithmID.rsaEncryption.equalsOID(algorithm)) {
			var pubExp = new Uint8Array([1,0,1]);
			if(parameter == null) {
				parameter = { publicExponent : util_ArrayUtil.toBytes([1,0,1]), modulusLength : 2048};
			}
			if(parameter.modulusLength == null) {
				parameter.modulusLength = 2048;
			}
			if(parameter.publicExponent != null) {
				pubExp = parameter.publicExponent.b;
			}
			var algoSpec = { name : "RSASSA-PKCS1-v1_5", modulusLength : parameter.modulusLength, publicExponent : pubExp, hash : { name : "SHA-256"}};
			app_js_WebCryptoWrapper.generateKey(algoSpec,true,["sign","verify"],function(generated) {
				var genPubKeyBytes;
				var genPrivKeyBytes;
				app_js_WebCryptoWrapper.exportKey("spki",generated.publicKey,function(encodedPubKey) {
					if(js_Boot.__instanceof(encodedPubKey,ArrayBuffer)) {
						genPubKeyBytes = haxe_io_Bytes.ofData(js_Boot.__cast(encodedPubKey , ArrayBuffer));
					} else if(js_Boot.__instanceof(encodedPubKey,Uint8Array)) {
						genPubKeyBytes = haxe_io_Bytes.ofData((js_Boot.__cast(encodedPubKey , Uint8Array)).buffer);
					} else {
						throw new js__$Boot_HaxeError(new Exception("Invalid parameter for toBytes"));
					}
					app_js_WebCryptoWrapper.exportKey("pkcs8",generated.privateKey,function(encodedPrivKey) {
						if(js_Boot.__instanceof(encodedPrivKey,ArrayBuffer)) {
							genPrivKeyBytes = haxe_io_Bytes.ofData(js_Boot.__cast(encodedPrivKey , ArrayBuffer));
						} else if(js_Boot.__instanceof(encodedPrivKey,Uint8Array)) {
							genPrivKeyBytes = haxe_io_Bytes.ofData((js_Boot.__cast(encodedPrivKey , Uint8Array)).buffer);
						} else {
							throw new js__$Boot_HaxeError(new Exception("Invalid parameter for toBytes"));
						}
						rHandle.onOk({ publicKey : genPubKeyBytes, privateKey : genPrivKeyBytes});
					},$bind(rHandle,rHandle.onErr));
				},$bind(rHandle,rHandle.onErr));
			},$bind(rHandle,rHandle.onErr));
		} else {
			var tmp = "Not support " + algorithm.getAlgorithm().name;
			rHandle.onErr(tmp);
		}
	}
	,deriveKey: function(algorithm,baseKey,derivedKeyType,rHandle) {
	}
	,deriveBits: function(algorithm,baseKey,length,rHandle) {
	}
	,importKey: function(algorithm,keyData,rHandle) {
		var cipherName = algorithm.getCipherName();
		if(cipherName == "SEED-CBC" || cipherName == "3DES-CBC" || cipherName == "RC2-CBC" || cipherName == "RC4-CBC") {
			rHandle.onOk(keyData.b);
		} else if(algorithm.getCipherName() == "RSA") {
			app_js_WebCryptoWrapper.importKey("spki",keyData.b,{ name : "RSA-OAEP", hash : { name : "SHA-1"}},true,["encrypt"],$bind(rHandle,rHandle.onOk),$bind(rHandle,rHandle.onErr));
		} else {
			app_js_WebCryptoWrapper.importKey("raw",keyData.b,{ name : cipherName},true,["encrypt","decrypt"],$bind(rHandle,rHandle.onOk),$bind(rHandle,rHandle.onErr));
		}
	}
	,exportKey: function(algorithm,format,key,rHandle) {
	}
	,wrapKey: function(algorithm,key,wrappingKey,rHandle) {
	}
	,unwrapKey: function(algorithm,wrappedKey,unwrappingKey,rHandle) {
	}
	,__class__: app_js_WebCryptoAlgorithmImpl
};
var app_js_WebCryptoWrapper = function() { };
app_js_WebCryptoWrapper.__name__ = ["app","js","WebCryptoWrapper"];
app_js_WebCryptoWrapper.ssubtle = function() {
	if(!app_js_WebCryptoWrapper.window.crypto.subtle) {
		return app_js_WebCryptoWrapper.window.crypto.webkitSubtle;
	} else {
		return true;
	}
};
app_js_WebCryptoWrapper.encrypt = function(algorithm,key,buffer,resolved,rejected) {
	if(app_js_WebCryptoWrapper.window.msCrypto) {
		var resolve = resolved;
		var reject = rejected;
		try {
			var op = app_js_WebCryptoWrapper.window.msCrypto.subtle.encrypt(algorithm,key,buffer);
			op.onerror = reject;
			op.oncomplete = function(evt) {
				resolve(evt.target.result);
			};
		} catch( ex ) {
			if (ex instanceof js__$Boot_HaxeError) ex = ex.val;
			reject(ex);
		}
	} else {
		(app_js_WebCryptoWrapper.window.crypto.subtle || app_js_WebCryptoWrapper.window.crypto.webkitSubtle).encrypt(algorithm,key,buffer).then(resolved,rejected);
	}
};
app_js_WebCryptoWrapper.decrypt = function(algorithm,key,buffer,resolved,rejected) {
	if(app_js_WebCryptoWrapper.window.msCrypto) {
		var resolve = resolved;
		var reject = rejected;
		try {
			var op = app_js_WebCryptoWrapper.window.msCrypto.subtle.decrypt(algorithm,key,buffer);
			op.onerror = reject;
			op.oncomplete = function(evt) {
				resolve(evt.target.result);
			};
		} catch( ex ) {
			if (ex instanceof js__$Boot_HaxeError) ex = ex.val;
			reject(ex);
		}
	} else {
		(app_js_WebCryptoWrapper.window.crypto.subtle || app_js_WebCryptoWrapper.window.crypto.webkitSubtle).decrypt(algorithm,key,buffer).then(resolved,rejected);
	}
};
app_js_WebCryptoWrapper.sign = function(algorithm,key,buffer,resolved,rejected) {
	if(app_js_WebCryptoWrapper.window.msCrypto) {
		var resolve = resolved;
		var reject = rejected;
		try {
			var op = app_js_WebCryptoWrapper.window.msCrypto.subtle.sign(algorithm,key,buffer);
			op.onerror = reject;
			op.oncomplete = function(evt) {
				resolve(evt.target.result);
			};
		} catch( ex ) {
			if (ex instanceof js__$Boot_HaxeError) ex = ex.val;
			reject(ex);
		}
	} else {
		(app_js_WebCryptoWrapper.window.crypto.subtle || app_js_WebCryptoWrapper.window.crypto.webkitSubtle).sign(algorithm,key,buffer).then(resolved,rejected);
	}
};
app_js_WebCryptoWrapper.verify = function(algorithm,key,signature,buffer,resolved,rejected) {
	if(app_js_WebCryptoWrapper.window.msCrypto) {
		var resolve = resolved;
		var reject = rejected;
		try {
			var op = app_js_WebCryptoWrapper.window.msCrypto.subtle.verify(algorithm,key,signature,buffer);
			op.onerror = reject;
			op.oncomplete = function(evt) {
				resolve(evt.target.result);
			};
		} catch( ex ) {
			if (ex instanceof js__$Boot_HaxeError) ex = ex.val;
			reject(ex);
		}
	} else {
		(app_js_WebCryptoWrapper.window.crypto.subtle || app_js_WebCryptoWrapper.window.crypto.webkitSubtle).verify(algorithm,key,signature,buffer).then(resolved,rejected);
	}
};
app_js_WebCryptoWrapper.digest = function(algorithm,buffer,resolved,rejected) {
	if(app_js_WebCryptoWrapper.window.msCrypto) {
		var resolve = resolved;
		var reject = rejected;
		try {
			var op = app_js_WebCryptoWrapper.window.msCrypto.subtle.digest(algorithm,buffer);
			op.onerror = reject;
			op.oncomplete = function(evt) {
				resolve(evt.target.result);
			};
		} catch( ex ) {
			if (ex instanceof js__$Boot_HaxeError) ex = ex.val;
			reject(ex);
		}
	} else {
		(app_js_WebCryptoWrapper.window.crypto.subtle || app_js_WebCryptoWrapper.window.crypto.webkitSubtle).digest(algorithm,buffer).then(resolved,rejected);
	}
};
app_js_WebCryptoWrapper.generateKey = function(algorithm,extractable,keyUsages,resolved,rejected) {
	if(app_js_WebCryptoWrapper.window.msCrypto) {
		var resolve = resolved;
		var reject = rejected;
		try {
			var op = app_js_WebCryptoWrapper.window.msCrypto.subtle.generateKey(algorithm,extractable,keyUsages);
			op.onerror = reject;
			op.oncomplete = function(evt) {
				resolve(evt.target.result);
			};
		} catch( ex ) {
			if (ex instanceof js__$Boot_HaxeError) ex = ex.val;
			reject(ex);
		}
	} else {
		(app_js_WebCryptoWrapper.window.crypto.subtle || app_js_WebCryptoWrapper.window.crypto.webkitSubtle).generateKey(algorithm,extractable,keyUsages).then(resolved,rejected);
	}
};
app_js_WebCryptoWrapper.deriveKey = function(algorithm,baseKey,derivedKeyType,extractable,keyUsages,resolved,rejected) {
	if(app_js_WebCryptoWrapper.window.msCrypto) {
		rejected("not_support");
	} else {
		(app_js_WebCryptoWrapper.window.crypto.subtle || app_js_WebCryptoWrapper.window.crypto.webkitSubtle).deriveKey(algorithm,baseKey,derivedKeyType,extractable,keyUsages).then(resolved,rejected);
	}
};
app_js_WebCryptoWrapper.deriveBits = function(algorithm,baseKey,length,resolved,rejected) {
	if(app_js_WebCryptoWrapper.window.msCrypto) {
		var resolve = resolved;
		var reject = rejected;
		try {
			var op = app_js_WebCryptoWrapper.window.msCrypto.subtle.deriveBits(algorithm,baseKey,length);
			op.onerror = reject;
			op.oncomplete = function(evt) {
				resolve(evt.target.result);
			};
		} catch( ex ) {
			if (ex instanceof js__$Boot_HaxeError) ex = ex.val;
			reject(ex);
		}
	} else {
		(app_js_WebCryptoWrapper.window.crypto.subtle || app_js_WebCryptoWrapper.window.crypto.webkitSubtle).deriveBits(algorithm,baseKey,length).then(resolved,rejected);
	}
};
app_js_WebCryptoWrapper.importKey = function(format,keyData,algorithm,extractable,keyUsages,resolved,rejected) {
	if(app_js_WebCryptoWrapper.window.msCrypto) {
		var resolve = resolved;
		var reject = rejected;
		try {
			var op = app_js_WebCryptoWrapper.window.msCrypto.subtle.importKey(format,keyData,algorithm,extractable,keyUsages);
			op.onerror = reject;
			op.oncomplete = function(evt) {
				resolve(evt.target.result);
			};
		} catch( ex ) {
			if (ex instanceof js__$Boot_HaxeError) ex = ex.val;
			reject(ex);
		}
	} else {
		(app_js_WebCryptoWrapper.window.crypto.subtle || app_js_WebCryptoWrapper.window.crypto.webkitSubtle).importKey(format,keyData,algorithm,extractable,keyUsages).then(resolved,rejected);
	}
};
app_js_WebCryptoWrapper.exportKey = function(format,key,resolved,rejected) {
	if(app_js_WebCryptoWrapper.window.msCrypto) {
		var resolve = resolved;
		var reject = rejected;
		try {
			var op = app_js_WebCryptoWrapper.window.msCrypto.subtle.exportKey(format,key);
			op.onerror = reject;
			op.oncomplete = function(evt) {
				resolve(evt.target.result);
			};
		} catch( ex ) {
			if (ex instanceof js__$Boot_HaxeError) ex = ex.val;
			reject(ex);
		}
	} else {
		(app_js_WebCryptoWrapper.window.crypto.subtle || app_js_WebCryptoWrapper.window.crypto.webkitSubtle).exportKey(format,key).then(resolved,rejected);
	}
};
app_js_WebCryptoWrapper.wrapKey = function(format,key,wrappingKey,wrapAlgorithm,resolved,rejected) {
};
app_js_WebCryptoWrapper.unwrapKey = function(format,wrappedKey,unwrappingKey,unwrapAlgorithm,unwrappedKeyAlgorithm,extractable,keyUsages,resolved,rejected) {
};
app_js_WebCryptoWrapper.getRandomValues = function(stored) {
	if(app_js_WebCryptoWrapper.window.msCrypto) {
		app_js_WebCryptoWrapper.window.msCrypto.getRandomValues(stored);
	} else {
		app_js_WebCryptoWrapper.window.crypto.getRandomValues(stored);
	}
};
app_js_WebCryptoWrapper.convertOperationToPromise = function(orgCryptoAPI,resolve,reject) {
	try {
		var op = orgCryptoAPI();
		op.onerror = reject;
		op.oncomplete = function(evt) {
			resolve(evt.target.result);
		};
	} catch( ex ) {
		if (ex instanceof js__$Boot_HaxeError) ex = ex.val;
		reject(ex);
	}
};
app_js_WebCryptoWrapper.isAvailable = function() {
	if(!(app_js_WebCryptoWrapper.window.msCrypto != null && app_js_WebCryptoWrapper.window.msCrypto.subtle != null)) {
		if(app_js_WebCryptoWrapper.window.crypto) {
			if(app_js_WebCryptoWrapper.window.crypto.subtle == null) {
				return app_js_WebCryptoWrapper.window.crypto.webkitSubtle != null;
			} else {
				return true;
			}
		} else {
			return false;
		}
	} else {
		return true;
	}
};
var app_natv_RawCryptoAlgorithmImpl = function() {
};
app_natv_RawCryptoAlgorithmImpl.__name__ = ["app","natv","RawCryptoAlgorithmImpl"];
app_natv_RawCryptoAlgorithmImpl.__interfaces__ = [csafe_asn1_impl_AlgorithmImplSpec];
app_natv_RawCryptoAlgorithmImpl.resolveDigestAlgo = function(algo) {
	var digestName = algo.getDigestName();
	if(digestName == "MD5") {
		return csafe_asn1_impl_AlgorithmID.md5;
	} else if(digestName == "SHA-1") {
		return csafe_asn1_impl_AlgorithmID.sha1;
	} else if(digestName == "SHA-256") {
		return csafe_asn1_impl_AlgorithmID.sha256;
	} else if(digestName == "SHA-384") {
		return csafe_asn1_impl_AlgorithmID.sha384;
	} else if(digestName == "SHA-512") {
		return csafe_asn1_impl_AlgorithmID.sha512;
	} else {
		throw new js__$Boot_HaxeError(new Exception("Invalid signAlgo : " + algo.getAlgorithm().oid));
	}
};
app_natv_RawCryptoAlgorithmImpl.prototype = {
	getRandomValues: function(data) {
		new csafe_math_prng_Random().nextBytes(data,0,data.length);
	}
	,createCipher: function(algorithm,key) {
		var cipher = null;
		var mode = new csafe_crypto_mode_CBC();
		var pad = new csafe_crypto_padding_PadPkcs5();
		var cipherName = algorithm.getCipherName();
		if(cipherName == "AES-CBC") {
			cipher = new csafe_crypto_cipher_symm_Aes(256,key);
		} else if(cipherName == "SEED-CBC") {
			cipher = new csafe_crypto_cipher_symm_SEED(key);
		} else if(cipherName == "3DES-CBC") {
			cipher = new csafe_crypto_cipher_symm_TripleDes(key);
		} else if(cipherName == "RC4-CBC") {
			cipher = new csafe_crypto_cipher_symm_RC4(key);
			mode = new csafe_crypto_mode_ECB();
			pad = new csafe_crypto_padding_PadNull();
		} else if(cipherName == "RC2-CBC") {
			cipher = new csafe_crypto_cipher_symm_RC2(key);
		} else if(cipherName == "3DES-CBC") {
			cipher = new csafe_crypto_cipher_symm_TripleDes(key);
		} else if(cipherName == "RSA") {
			var x509PubKey = csafe_x509_X509PublicKeyInfo.struct.create(key);
			var pubKeyBytes = x509PubKey.getPrimitive("publicKey").asByteArray();
			cipher = csafe_crypto_cipher_asymm_rsa_RSA.ofASN1(csafe_asn1_ASN1.decode(null,pubKeyBytes));
		} else {
			return null;
		}
		var cipherImpl = new csafe_crypto_Cipher(cipher,mode,pad);
		return cipherImpl;
	}
	,cryptFunc: function(cipherDirection,algorithm,key,data,parameter) {
		var cipher = this.createCipher(algorithm,key);
		if(cipher == null) {
			throw new js__$Boot_HaxeError(new Exception("Can't support crypt algorithm : " + algorithm.getAlgorithm().name));
		}
		var cipherParams = new csafe_crypto_cipher_CipherParams();
		if(parameter != null && parameter.iv != null) {
			cipherParams.iv = parameter.iv;
		}
		cipher.init(cipherDirection,cipherParams);
		var outBuffer = new haxe_io_BytesOutput();
		cipher["final"](data,0,data.length,outBuffer);
		return outBuffer.getBytes();
	}
	,encrypt: function(algorithm,key,data,parameter,rHandle) {
		try {
			rHandle.onOk(this.cryptFunc(csafe_crypto_Cipher.ENCRYPT,algorithm,key,data,parameter));
		} catch( err ) {
			if (err instanceof js__$Boot_HaxeError) err = err.val;
			rHandle.onErr(Std.string(err));
		}
	}
	,decrypt: function(algorithm,key,data,parameter,rHandle) {
		try {
			var decrypted = this.cryptFunc(csafe_crypto_Cipher.DECRYPT,algorithm,key,data,parameter);
			rHandle.onOk(decrypted);
		} catch( err ) {
			if (err instanceof js__$Boot_HaxeError) err = err.val;
			rHandle.onErr(Std.string(err));
		}
	}
	,sign: function(algorithm,key,data,rHandle) {
		var mech = algorithm.getMech();
		if(mech == "sign") {
			if(algorithm.equalsOID(csafe_asn1_impl_AlgorithmID.sha256WithRSAEncryption)) {
				csafe_crypto_cipher_asymm_rsa_RSASSASignature.sign(key,data,rHandle);
			} else if(algorithm.equalsOID(csafe_asn1_impl_AlgorithmID.rsaPSS)) {
				csafe_crypto_cipher_asymm_rsa_RSAPSSSignature.sign(key,data,rHandle);
			} else {
				rHandle.onErr("Not support signAlgo : " + Std.string(algorithm));
			}
		} else if(mech == "hmac") {
			if(csafe_asn1_impl_AlgorithmID.hmacSHA1.equalsOID(algorithm)) {
				var hmac = new csafe_crypto_hash_HMAC(new csafe_crypto_hash_Sha1());
				var macData = hmac.calculate(key,data);
				rHandle.onOk(macData);
			} else {
				rHandle.onErr("Can't support hmac algorithm : " + algorithm.getAlgorithm().oid);
			}
		} else if(mech == "pbmac") {
			if(csafe_asn1_impl_AlgorithmID.PBEtricMAC.equalsOID(algorithm)) {
				rHandle.onOk(csafe_crypto_cipher_pbe_PBEtriMac.mac(key,data));
			} else {
				rHandle.onErr("Unknown mechanism : " + mech + " " + algorithm.getAlgorithm().oid);
			}
		} else {
			rHandle.onErr("Unknown mechanism : " + mech + " " + algorithm.getAlgorithm().oid);
		}
	}
	,verify: function(algorithm,key,signature,data,rHandle) {
		var mech = algorithm.getMech();
		if(mech == "sign") {
			try {
				var xKey = csafe_x509_X509PublicKeyInfo.struct.create(null,js_Boot.__cast(key , haxe_io_Bytes));
				var publicKeyASN1 = csafe_asn1_ASN1.decode(null,xKey.getRawPublic());
				var rsa = csafe_crypto_cipher_asymm_rsa_RSA.ofASN1(publicKeyASN1,true);
				var decryptedHash = rsa.verify(signature);
				algorithm.digest(data,rHandle.chain("RawCrypto.verify").ok(function(digested) {
					var isEquals = util_BytesUtil.equals(decryptedHash,digested);
					if(!isEquals && digested.length != decryptedHash.length) {
						var decryptedHashAsn1 = csafe_pkcs_pkcs7_DigestInfo.struct.create(null,decryptedHash);
						isEquals = util_BytesUtil.equals(decryptedHashAsn1.getDigested(),digested);
					}
					haxe_Log.trace("Dec Hash : " + util_Hex.toString(decryptedHash),{ fileName : "RawCryptoAlgorithmImpl.hx", lineNumber : 223, className : "app.natv.RawCryptoAlgorithmImpl", methodName : "verify"});
					haxe_Log.trace("Digested  : " + util_Hex.toString(digested),{ fileName : "RawCryptoAlgorithmImpl.hx", lineNumber : 224, className : "app.natv.RawCryptoAlgorithmImpl", methodName : "verify"});
					rHandle.onOk(isEquals);
				},{ fileName : "RawCryptoAlgorithmImpl.hx", lineNumber : 216, className : "app.natv.RawCryptoAlgorithmImpl", methodName : "verify"}));
			} catch( e ) {
				if (e instanceof js__$Boot_HaxeError) e = e.val;
				rHandle.onErr("Invalid X509PublicKey : " + Std.string(e));
			}
		} else if(mech == "hmac") {
			if(csafe_asn1_impl_AlgorithmID.hmacSHA1.equalsOID(algorithm)) {
				var hmac = new csafe_crypto_hash_HMAC(new csafe_crypto_hash_Sha1());
				var macData = hmac.calculate(key,data);
				var tmp = util_BytesUtil.equals(macData,signature);
				rHandle.onOk(tmp);
			} else {
				var tmp1 = "Can't support hmac algorithm : " + algorithm.getAlgorithm().oid;
				rHandle.onErr(tmp1);
			}
		} else {
			var tmp2 = "Unknown mechanism : " + mech + " " + algorithm.getAlgorithm().oid;
			rHandle.onErr(tmp2);
		}
	}
	,digest: function(algorithm,data,rHandle) {
		if(algorithm.getDigestName() == "MD5") {
			rHandle.onOk(new csafe_crypto_hash_Md5().calculate(data));
		} else if(algorithm.getDigestName() == "SHA-1") {
			rHandle.onOk(new csafe_crypto_hash_Sha1().calculate(data));
		} else if(algorithm.getDigestName() == "SHA-256") {
			rHandle.onOk(new csafe_crypto_hash_Sha256().calculate(data));
		} else {
			rHandle.onErr("NotSupportedDigest : " + algorithm.getAlgorithm().name);
		}
	}
	,generateKey: function(algorithm,parameter,rHandle) {
		if(csafe_asn1_impl_AlgorithmID.rsa.equalsOID(algorithm) || csafe_asn1_impl_AlgorithmID.rsaEncryption.equalsOID(algorithm)) {
			try {
				var bitLength = 2048;
				var publicExponent = "0x010001";
				if(parameter != null) {
					if(parameter.modulusLength != null) {
						bitLength = parameter.modulusLength;
					}
					if(parameter.publicExponent != null) {
						publicExponent = parameter.publicExponent;
					}
				}
				var genRSA = csafe_crypto_cipher_asymm_rsa_RSA.generate(bitLength,publicExponent);
				var x509PubKey = new csafe_x509_X509PublicKeyInfo();
				x509PubKey.setASN1("algorithm",csafe_asn1_impl_AlgorithmID.rsaEncryption);
				x509PubKey.setRawPublic(genRSA.toASN1(true).encode());
				var pkcs8Key = new csafe_pkcs_pkcs8_PKCS8PrivateKey();
				pkcs8Key.setASN1("privateKeyAlgorithm",csafe_asn1_impl_AlgorithmID.rsaEncryption);
				pkcs8Key.setRawPrivate(genRSA.toASN1().encode());
				rHandle.onOk({ publicKey : x509PubKey.encode(), privateKey : pkcs8Key.encode()});
			} catch( e ) {
				if (e instanceof js__$Boot_HaxeError) e = e.val;
				rHandle.onErr(Std.string(e));
			}
		} else {
			throw new js__$Boot_HaxeError(new Exception("Not support " + algorithm.getAlgorithm().name));
		}
	}
	,deriveKey: function(algorithm,baseKey,derivedKeyType,rHandle) {
	}
	,deriveBits: function(algorithm,baseKey,length,rHandle) {
	}
	,importKey: function(algorithm,keyData,rHandle) {
	}
	,exportKey: function(algorithm,format,key,rHandle) {
	}
	,wrapKey: function(algorithm,key,wrappingKey,rHandle) {
	}
	,unwrapKey: function(algorithm,wrappedKey,unwrappingKey,rHandle) {
	}
	,__class__: app_natv_RawCryptoAlgorithmImpl
};
var common_ByteChunk = function(spec,pos,length) {
	if(pos == null) {
		pos = 0;
	}
	this.capacity = 0;
	this._limit = 0;
	this.pos = 0;
	this.initPos = 0;
	this.isFirst = false;
	if(typeof(spec) == "number" && ((spec | 0) === spec)) {
		this.dataBuff = new haxe_io_Bytes(new ArrayBuffer(spec));
	} else if(js_Boot.__instanceof(spec,haxe_io_Bytes)) {
		this.dataBuff = spec;
		this.initPos = pos;
		if(length == null) {
			length = spec.length;
		}
		this.capacity = this._limit = length;
	} else if((spec instanceof Array) && spec.__enum__ == null) {
		this.dataBuff = new haxe_io_Bytes(new ArrayBuffer(spec.length));
		this.initPos = pos;
		if(length == null) {
			length = spec.length;
		}
		var _g1 = 0;
		var _g = length;
		while(_g1 < _g) {
			var i = _g1++;
			this.dataBuff.b[i] = spec[i] & 255;
		}
		this.capacity = this._limit = length;
	} else {
		throw new js__$Boot_HaxeError(new Exception("Invalid spec : " + Std.string(spec)));
	}
};
common_ByteChunk.__name__ = ["common","ByteChunk"];
common_ByteChunk.resolve = function(dVar) {
	var byteChunk;
	if(typeof(dVar) == "string") {
		byteChunk = new common_ByteChunk(haxe_crypto_Base64.decode(js_Boot.__cast(dVar , String)));
	} else if(js_Boot.__instanceof(dVar,haxe_io_Bytes)) {
		byteChunk = new common_ByteChunk(js_Boot.__cast(dVar , haxe_io_Bytes));
	} else if(js_Boot.__instanceof(dVar,common_ByteChunk)) {
		byteChunk = dVar;
	} else {
		throw new js__$Boot_HaxeError(new Exception("Parameter is not ByteChunk"));
	}
	return byteChunk;
};
common_ByteChunk.prototype = {
	arrangeSizeAndReset: function(keepData,size) {
		if(isNaN(size)) {
			throw new js__$Boot_HaxeError(new Exception("Invalid arrange size : " + size));
		}
		if(size > this.capacity) {
			this.initPos = 0;
			if(!keepData) {
				this.dataBuff = new haxe_io_Bytes(new ArrayBuffer(size));
			} else {
				var temp = new haxe_io_Bytes(new ArrayBuffer(size));
				temp.blit(0,this.dataBuff,0,Math.min(temp.length,this.dataBuff.length) | 0);
				this.dataBuff = temp;
			}
			this.capacity = this._limit = size;
			this.isFirst = true;
		} else {
			this._limit = size;
		}
		this.pos = 0;
	}
	,reset: function() {
		this.pos = 0;
	}
	,absolutePos: function(added) {
		if(added == null) {
			return this.initPos;
		} else {
			if(this.pos + added > this._limit) {
				throw new js__$Boot_HaxeError(new Exception("position is overflow. (added:" + added + ")" + this.info()));
			}
			var rPos = this.initPos + this.pos;
			this.pos += added;
			return rPos;
		}
	}
	,position: function(newPos) {
		if(newPos != null) {
			if(newPos < 0 || newPos >= this._limit) {
				throw new js__$Boot_HaxeError(new Exception("position(" + newPos + " overflow : " + this._limit));
			}
			this.pos = newPos;
		}
		return this.pos;
	}
	,limit: function(newLimit) {
		if(newLimit != null) {
			this._limit = newLimit;
		}
		return this._limit;
	}
	,info: function() {
		return "initPos:" + this.initPos + ", pos:" + this.pos + ", limit:" + this._limit;
	}
	,skip: function(size) {
		return this.absolutePos(size);
	}
	,slice: function(limit) {
		if(this.pos + limit > this._limit) {
			throw new js__$Boot_HaxeError(new Exception("position is overflow. (sliceCount:" + limit + ")" + this.info()));
		}
		return new common_ByteChunk(this.dataBuff,this.initPos + this.pos,limit);
	}
	,sliceAndSkip: function(limit) {
		var chunk = this.slice(limit);
		this.pos += limit;
		return chunk;
	}
	,getInt32: function() {
		var absPos = this.absolutePos(4);
		return this.dataBuff.getInt32(absPos);
	}
	,get: function(data) {
		if(data == null) {
			var _this = this.dataBuff;
			var pos = this.absolutePos(1);
			return _this.b[pos];
		} else if(js_Boot.__instanceof(data,haxe_io_Bytes)) {
			var bytesData = data;
			var absPos = this.absolutePos(bytesData.length);
			var _g1 = 0;
			var _g = bytesData.length;
			while(_g1 < _g) {
				var i = _g1++;
				bytesData.b[i] = this.dataBuff.b[absPos + i] & 255;
			}
			return 0;
		} else if(typeof(data) == "number" && ((data | 0) === data)) {
			return this.dataBuff.b[this.initPos + data];
		} else {
			throw new js__$Boot_HaxeError(new Exception("Invalid parameter : " + Std.string(data)));
		}
	}
	,getBytes: function() {
		if(this.isFirst) {
			return this.dataBuff;
		}
		var data = new haxe_io_Bytes(new ArrayBuffer(this.remaining()));
		this.get(data);
		return data;
	}
	,getString: function(encode) {
		if(encode == null) {
			encode = "utf-8";
		}
		if(encode != "utf-8" && encode != "utf-16") {
			throw new js__$Boot_HaxeError(new Exception("Not supported charset : " + encode));
		}
		return this.getBytes().toString();
	}
	,put: function(data) {
		if((data instanceof Array) && data.__enum__ == null) {
			var absPos = this.absolutePos(data.length);
			var _g1 = 0;
			var _g = data.length;
			while(_g1 < _g) {
				var i = _g1++;
				this.dataBuff.b[absPos + i] = data[i] & 255;
			}
		} else if(typeof(data) == "number" && ((data | 0) === data)) {
			var _this = this.dataBuff;
			var pos = this.absolutePos(1);
			_this.b[pos] = data & 255;
		} else if(js_Boot.__instanceof(data,haxe_io_Bytes)) {
			var bytes = data;
			var pos1 = this.absolutePos(bytes.length);
			var _g11 = 0;
			var _g2 = bytes.length;
			while(_g11 < _g2) {
				var i1 = _g11++;
				this.dataBuff.b[pos1 + i1] = bytes.b[i1] & 255;
			}
		} else {
			throw new js__$Boot_HaxeError(new Exception("Invalid parameter : " + Std.string(data)));
		}
	}
	,writeTo: function(buffer) {
		if(js_Boot.__instanceof(buffer,haxe_io_BytesBuffer)) {
			var _this = js_Boot.__cast(buffer , haxe_io_BytesBuffer);
			var src = this.dataBuff;
			var pos = this.initPos;
			var len = this._limit;
			if(pos < 0 || len < 0 || pos + len > src.length) {
				throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
			}
			var b1 = _this.b;
			var b2 = src.b;
			var _g1 = pos;
			var _g = pos + len;
			while(_g1 < _g) {
				var i = _g1++;
				_this.b.push(b2[i]);
			}
		} else if((buffer instanceof Array) && buffer.__enum__ == null) {
			var arr = buffer;
			var _g11 = 0;
			var _g2 = this.dataBuff.length;
			while(_g11 < _g2) {
				var i1 = _g11++;
				arr.push(this.dataBuff.b[this.initPos + i1]);
			}
		}
	}
	,remaining: function() {
		return this._limit - this.pos;
	}
	,array: function(p) {
		if(p == null) {
			p = 0;
		}
		if(this.isFirst && p == 0 && this._limit == this.dataBuff.length) {
			return this.dataBuff;
		}
		return this.dataBuff.sub(this.initPos + p,this._limit - p);
	}
	,absoluteBuffer: function() {
		return this.dataBuff;
	}
	,equals: function(target,startIndex) {
		if(startIndex == null) {
			startIndex = 0;
		}
		if(js_Boot.__instanceof(target,common_ByteChunk)) {
			if(target.limit() != this._limit) {
				return false;
			}
			var offset = target.initPos + startIndex;
			var targetBuff = target.absoluteBuffer();
			var _g1 = 0;
			var _g = this._limit;
			while(_g1 < _g) {
				var i = _g1++;
				if(this.dataBuff.b[this.initPos + i] != target.get(offset + i)) {
					return false;
				}
			}
			return true;
		} else if((target instanceof Array) && target.__enum__ == null) {
			var _g11 = 0;
			var _g2 = this._limit;
			while(_g11 < _g2) {
				var i1 = _g11++;
				if(this.dataBuff.b[this.initPos + i1] != target[i1 + startIndex]) {
					return false;
				}
			}
			return true;
		} else {
			throw new js__$Boot_HaxeError(new Exception("Unsupport target : " + Std.string(target)));
		}
	}
	,__class__: common_ByteChunk
};
var common_DefaultReject = function() { };
common_DefaultReject.__name__ = ["common","DefaultReject"];
common_DefaultReject.defaultReject = function(err) {
	haxe_Log.trace(err,{ fileName : "DefaultReject.hx", lineNumber : 5, className : "common.DefaultReject", methodName : "defaultReject"});
};
common_DefaultReject.wrap = function(reject,preReject) {
	if(reject == null) {
		if(preReject == null) {
			return common_DefaultReject.defaultReject;
		} else {
			return function(err) {
				try {
					preReject(err);
				} catch( e ) {
					if (e instanceof js__$Boot_HaxeError) e = e.val;
					haxe_Log.trace("Error on preReject : " + Std.string(e),{ fileName : "DefaultReject.hx", lineNumber : 17, className : "common.DefaultReject", methodName : "wrap"});
				}
				common_DefaultReject.defaultReject(err);
			};
		}
	} else if(preReject == null) {
		return reject;
	} else {
		return function(err1) {
			try {
				preReject(err1);
			} catch( e1 ) {
				if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
				haxe_Log.trace("Error on preReject : " + Std.string(e1),{ fileName : "DefaultReject.hx", lineNumber : 30, className : "common.DefaultReject", methodName : "wrap"});
			}
			reject(err1);
		};
	}
};
var common_ResultHandler = function() {
	this.noLog = false;
};
common_ResultHandler.__name__ = ["common","ResultHandler"];
common_ResultHandler.create = function(name) {
	var rHandler = new common_ResultHandler();
	rHandler.name = name;
	return rHandler;
};
common_ResultHandler.prototype = {
	noTrace: function() {
		this.noLog = true;
		return this;
	}
	,chain: function(name) {
		var handle = common_ResultHandler.create(name);
		handle.parent = this;
		return handle;
	}
	,ok: function(func,inf) {
		this.okPInfos = inf;
		if(!Reflect.isFunction(func)) {
			throw new js__$Boot_HaxeError(new Exception(this.name + " handle .ok parameter is not function"));
		}
		this.func_ok = func;
		return this;
	}
	,err: function(func,inf) {
		this.errPInfos = inf;
		if(!Reflect.isFunction(func)) {
			throw new js__$Boot_HaxeError(new Exception(this.name + " handle .err parameter is not function"));
		}
		this.func_err = func;
		return this;
	}
	,'final': function(func) {
		if(!Reflect.isFunction(func)) {
			throw new js__$Boot_HaxeError(new Exception(this.name + " handle .final parameter is not function"));
		}
		this.func_final = func;
		return this;
	}
	,getCallerInfo: function(inf) {
		var msg = this.name;
		if(inf != null) {
			msg += " from [" + inf.className + "." + inf.methodName + ":" + inf.lineNumber + "]";
		}
		return msg;
	}
	,onOk: function(p1) {
		if(this.func_ok != null) {
			if(!this.noLog) {
				haxe_Log.trace("okEntrance : " + this.getCallerInfo(this.okPInfos),{ fileName : "ResultHandler.hx", lineNumber : 73, className : "common.ResultHandler", methodName : "onOk"});
			}
			try {
				this.func_ok(p1);
			} catch( e ) {
				if (e instanceof js__$Boot_HaxeError) e = e.val;
				var msg = "******** ResultHandler " + this.name + " raised error from onOk ";
				if(e != null) {
					msg += " " + Std.string(e) + Std.string(e.stack);
				}
				haxe_Log.trace(msg,{ fileName : "ResultHandler.hx", lineNumber : 81, className : "common.ResultHandler", methodName : "onOk"});
				haxe_Log.trace(e,{ fileName : "ResultHandler.hx", lineNumber : 82, className : "common.ResultHandler", methodName : "onOk"});
				this.onErr(e);
			}
		} else if(this.parent != null) {
			this.parent.onOk(p1);
		} else {
			var msg1 = "******** ResultHandler " + this.name + " has not handler";
			haxe_Log.trace(msg1,{ fileName : "ResultHandler.hx", lineNumber : 90, className : "common.ResultHandler", methodName : "onOk"});
			throw new js__$Boot_HaxeError(new Exception(msg1));
		}
	}
	,onErr: function(e) {
		if(this.func_err != null) {
			try {
				this.func_err(e);
			} catch( e1 ) {
				if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
				var msg = "******** ResultHandler " + this.name + " raised error from onErr ";
				if(e1 != null) {
					msg += " " + Std.string(e1) + Std.string(e1.stack);
				}
				haxe_Log.trace(msg,{ fileName : "ResultHandler.hx", lineNumber : 105, className : "common.ResultHandler", methodName : "onErr"});
				throw js__$Boot_HaxeError.wrap(e1);
			}
		} else {
			haxe_Log.trace("errEntrance : " + this.getCallerInfo(this.errPInfos != null ? this.errPInfos : this.okPInfos),{ fileName : "ResultHandler.hx", lineNumber : 109, className : "common.ResultHandler", methodName : "onErr"});
			if(this.parent != null) {
				this.parent.onErr(e);
			} else {
				var msg1 = "******** ResultHandler " + this.name + " has not error handler";
				haxe_Log.trace(msg1,{ fileName : "ResultHandler.hx", lineNumber : 114, className : "common.ResultHandler", methodName : "onErr"});
				throw new js__$Boot_HaxeError(new Exception(msg1));
			}
		}
	}
	,tryCall: function(name,func,inf) {
		haxe_Log.trace("tryCall : " + name,{ fileName : "ResultHandler.hx", lineNumber : 121, className : "common.ResultHandler", methodName : "tryCall", customParams : [inf]});
		try {
			func();
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			this.onErr(e);
		}
	}
	,__class__: common_ResultHandler
};
var common_URL = function(url) {
	this.url = url;
	var r = new EReg("^(?:(?![^:@]+:[^:@/]*@)([^:/?#.]+):)?(?://)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:/?#]*)(?::(\\d*))?)(((/(?:[^?#](?![^?#/]*\\.[^?#/.]+(?:[?#]|$)))*/?)?([^?#/]*))(?:\\?([^#]*))?(?:#(.*))?)","");
	r.match(url);
	var _g1 = 0;
	var _g = common_URL._parts.length;
	while(_g1 < _g) {
		var i = _g1++;
		this[common_URL._parts[i]] = r.matched(i);
	}
};
common_URL.__name__ = ["common","URL"];
common_URL.parse = function(url) {
	return new common_URL(url);
};
common_URL.prototype = {
	toString: function() {
		var s = "For Url -> " + this.url + "\n";
		var _g1 = 0;
		var _g = common_URL._parts.length;
		while(_g1 < _g) {
			var i = _g1++;
			s += common_URL._parts[i] + ": " + Std.string(Reflect.field(this,common_URL._parts[i])) + (i == common_URL._parts.length - 1 ? "" : "\n");
		}
		return s;
	}
	,__class__: common_URL
};
var csafe_CrossSafe = function() { };
csafe_CrossSafe.__name__ = ["csafe","CrossSafe"];
csafe_CrossSafe.install = function(forceMode) {
	if(forceMode == null) {
		forceMode = -1;
	}
	csafe_x509_X509Extension.install();
	if(!app_js_WebCryptoWrapper.isAvailable() || forceMode == csafe_CrossSafe.MODE_SOFT) {
		csafe_asn1_impl_AlgorithmID.cryptoSubtleImpl = new app_natv_RawCryptoAlgorithmImpl();
		csafe_CrossSafe.ACTIVATED_MODE = csafe_CrossSafe.MODE_SOFT;
	} else {
		csafe_asn1_impl_AlgorithmID.cryptoSubtleImpl = new app_js_WebCryptoAlgorithmImpl();
		csafe_CrossSafe.ACTIVATED_MODE = csafe_CrossSafe.MODE_WC;
	}
};
csafe_CrossSafe.getMode = function() {
	return csafe_CrossSafe.ACTIVATED_MODE;
};
var csafe_DefaultSignAndVerifier = function(pubKey,privKey,attrMap) {
	if(pubKey != null) {
		if(js_Boot.__instanceof(pubKey,csafe_x509_X509Certificate)) {
			this.cert = pubKey;
			this.pusavk = this.cert.getPublicKey().encode();
		} else if(js_Boot.__instanceof(pubKey,haxe_io_Bytes)) {
			this.pusavk = pubKey;
		} else {
			throw new js__$Boot_HaxeError(new Exception("Unknown pubKey object : " + Std.string(pubKey)));
		}
	}
	this.ppsavk = privKey;
	this.attrs = attrMap;
	if(privKey != null) {
		if(this.attrs == null) {
			this.attrs = new haxe_ds_StringMap();
		}
		var _this = this.attrs;
		if((__map_reserved["random"] != null ? _this.getReserved("random") : _this.h["random"]) == null) {
			var p8k = csafe_pkcs_pkcs8_PKCS8PrivateKey.struct.create(null,privKey);
			var randomNum = p8k.getRandomNum();
			var _this1 = this.attrs;
			if(__map_reserved["random"] != null) {
				_this1.setReserved("random",randomNum);
			} else {
				_this1.h["random"] = randomNum;
			}
		}
	}
};
csafe_DefaultSignAndVerifier.__name__ = ["csafe","DefaultSignAndVerifier"];
csafe_DefaultSignAndVerifier.__interfaces__ = [csafe_SignAndVerifier];
csafe_DefaultSignAndVerifier.prototype = {
	getCertificate: function() {
		return this.cert;
	}
	,getPublicKey: function() {
		if(this.cert != null) {
			return this.cert.getPublicKey();
		}
		return null;
	}
	,getAttribute: function(id) {
		if(csafe_asn1_ObjectID.id_randomNum.equals(id)) {
			id = "random";
		}
		if(this.attrs == null) {
			return null;
		}
		var attrID = js_Boot.__cast(id , String);
		var _this = this.attrs;
		if(__map_reserved[attrID] != null) {
			return _this.getReserved(attrID);
		} else {
			return _this.h[attrID];
		}
	}
	,sign: function(algo,data,rHandle) {
		csafe_asn1_impl_AlgorithmID.derive(algo).sign(this.ppsavk,data,rHandle);
	}
	,verify: function(algo,data,source,rHandle) {
		csafe_asn1_impl_AlgorithmID.derive(algo).verify(this.pusavk,data,source,rHandle);
	}
	,resolveAlgorithm: function(algo) {
		if(js_Boot.__instanceof(algo,csafe_asn1_impl_AlgorithmID)) {
			return js_Boot.__cast(algo , csafe_asn1_impl_AlgorithmID);
		} else {
			throw new js__$Boot_HaxeError(new Exception("SAVMech algo is not AlgorithmID"));
		}
	}
	,__class__: csafe_DefaultSignAndVerifier
};
var util_ArrayUtil = function() { };
util_ArrayUtil.__name__ = ["util","ArrayUtil"];
util_ArrayUtil.toBytes = function(array) {
	var rBytes = new haxe_io_Bytes(new ArrayBuffer(array.length));
	var _g1 = 0;
	var _g = array.length;
	while(_g1 < _g) {
		var i = _g1++;
		rBytes.b[i] = array[i] & 255;
	}
	return rBytes;
};
util_ArrayUtil.copyArray = function(src,srcPos,target,tgPos,length) {
	var _g1 = 0;
	var _g = length;
	while(_g1 < _g) {
		var i = _g1++;
		target[tgPos + i] = src[srcPos + i];
	}
};
util_ArrayUtil.copyBytes = function(src,srcPos,target,tgPos,length) {
	var _g1 = 0;
	var _g = length;
	while(_g1 < _g) {
		var i = _g1++;
		target.b[tgPos + i] = src.b[srcPos + i] & 255;
	}
};
util_ArrayUtil.copyBytesToArray = function(src,srcPos,target,tgPos,length) {
	var _g1 = 0;
	var _g = length;
	while(_g1 < _g) {
		var i = _g1++;
		target[tgPos + i] = src.b[srcPos + i];
	}
};
util_ArrayUtil.copyArrayToBytes = function(src,srcPos,target,tgPos,length) {
	var _g1 = 0;
	var _g = length;
	while(_g1 < _g) {
		var i = _g1++;
		target.b[tgPos + i] = src[srcPos + i] & 255;
	}
};
var csafe_asn1_ASN1Type = function(varKey,opts,tagNum) {
	this.cOpts = opts;
	this.tagNum = tagNum;
	this.isImplicit = csafe_asn1_ASN1Type.isInclude(opts,csafe_asn1_ASN1.IMPLICIT);
	this.isOptional = csafe_asn1_ASN1Type.isInclude(opts,csafe_asn1_ASN1.OPTIONAL);
	this.isConstructor = csafe_asn1_ASN1Type.isInclude(opts,csafe_asn1_ASN1.CONSTRUCTED);
	this.isMultiple = csafe_asn1_ASN1Type.isInclude(opts,csafe_asn1_ASN1.MULTIPLE);
	this.isContextSpecific = csafe_asn1_ASN1Type.isInclude(opts,csafe_asn1_ASN1.CONTEXT_SPECIFIC);
	this.isChoice = csafe_asn1_ASN1Type.isInclude(opts,csafe_asn1_ASN1.CHOICE);
	this.isANY = !this.isContextSpecific && !this.isConstructor && !this.isChoice && tagNum == csafe_asn1_ASN1.ANY;
	if(this.isContextSpecific) {
		this.tagName = "Context-Specific[" + tagNum + "]";
	} else if(this.isChoice) {
		this.tagName = "CHOICE";
		if(this.isImplicit) {
			throw new js__$Boot_HaxeError(new Exception("CHOICE 타입은 IMPLCIT일 수 없습니다(모순)."));
		}
	} else {
		if(tagNum == csafe_asn1_ASN1.ANY && this.isImplicit) {
			throw new js__$Boot_HaxeError(new Exception("ANY 타입은 IMPLCIT일 수 없습니다(모순)."));
		}
		this.tagName = csafe_asn1_ASN1.getTagName(tagNum);
	}
	if(this.isMultiple) {
		this.tagName += "OF";
	}
	this.varKey = varKey;
	this.parent = null;
	this.childs = [];
	this.isRootFamily = false;
	this.makeHeader();
};
csafe_asn1_ASN1Type.__name__ = ["csafe","asn1","ASN1Type"];
csafe_asn1_ASN1Type.isInclude = function(val,opts) {
	if((val & opts) == opts) {
		return true;
	}
	return false;
};
csafe_asn1_ASN1Type.prototype = {
	clone: function(newVarKey,creator,isRoot) {
		if(isRoot == null) {
			isRoot = false;
		}
		if(newVarKey == null) {
			newVarKey = this.varKey;
		}
		var rType = new csafe_asn1_ASN1Type(newVarKey,this.cOpts,this.tagNum);
		if(creator != null) {
			rType.alterCreator = creator;
		} else {
			rType.alterCreator = this.alterCreator;
		}
		var _g = 0;
		var _g1 = this.childs;
		while(_g < _g1.length) {
			var ch = _g1[_g];
			++_g;
			rType.addChild(ch.clone(ch.varKey,ch.alterCreator));
		}
		rType.isOptional = this.isOptional;
		rType.isRootFamily = this.isRootFamily;
		return rType;
	}
	,makeHeader: function() {
		var firstOctet = 0;
		if(this.isContextSpecific) {
			firstOctet |= 128;
		}
		if(!this.isContextSpecific && (this.isImplicit || this.isChoice || this.isANY)) {
			this.header = new haxe_io_Bytes(new ArrayBuffer(0));
		} else {
			if(this.isConstructor) {
				firstOctet |= 32;
			}
			if(this.tagNum >= 31) {
				throw new js__$Boot_HaxeError(new Exception("tagNum은 30 이상은 허용하지 않습니다."));
			}
			firstOctet |= this.tagNum;
			this.header = util_ArrayUtil.toBytes([firstOctet]);
		}
	}
	,addChild: function(childType) {
		if(this.isContextSpecific && this.childs.length > 0) {
			throw new js__$Boot_HaxeError(new Exception("Context-Specific 은 하나의 자식노드만 가질 수 있습니다"));
		}
		childType.parent = this;
		if(this.isContextSpecific) {
			if(this.isImplicit) {
				if(childType.isConstructor) {
					this.isConstructor = true;
				} else {
					this.isConstructor = false;
				}
			}
			this.makeHeader();
		}
		this.childs.push(childType);
	}
	,getMatchedType: function(target) {
		if(js_Boot.__instanceof(target,common_ByteChunk)) {
			var chunkByte = target;
			if(this.isANY) {
				return this;
			} else if(this.isChoice) {
				var position = chunkByte.position();
				var choiceableTypes = this.childs;
				var _g1 = 0;
				var _g = choiceableTypes.length;
				while(_g1 < _g) {
					var i = _g1++;
					var cType = choiceableTypes[i];
					if(cType.isChoice) {
						var findFromSubChoiceType = cType.getMatchedType(chunkByte);
						if(findFromSubChoiceType != null) {
							return cType;
						}
						continue;
					}
					var nextCHeader = cType.header;
					var isMatch = true;
					var _g3 = 0;
					var _g2 = nextCHeader.length;
					while(_g3 < _g2) {
						var j = _g3++;
						if(chunkByte.get() != nextCHeader.b[j]) {
							isMatch = false;
							chunkByte.position(position);
							break;
						}
					}
					if(isMatch) {
						return cType;
					}
				}
				return null;
			} else {
				var isMatch1 = true;
				var nextCHeader1 = this.header;
				var _g11 = 0;
				var _g4 = nextCHeader1.length;
				while(_g11 < _g4) {
					var j1 = _g11++;
					var cByte = chunkByte.get();
					if(cByte != nextCHeader1.b[j1]) {
						isMatch1 = false;
						break;
					}
				}
				if(isMatch1) {
					return this;
				}
				return null;
			}
		} else if(typeof(target) == "number" && ((target | 0) === target)) {
			var tagNum = target;
			var choiceableTypes1 = this.childs;
			var _g12 = 0;
			var _g5 = choiceableTypes1.length;
			while(_g12 < _g5) {
				var i1 = _g12++;
				var cType1 = choiceableTypes1[i1];
				if(cType1.isChoice) {
					var findFromCType = cType1.getMatchedType(tagNum);
					if(findFromCType != null) {
						return cType1;
					}
					continue;
				} else if(cType1.tagNum == tagNum) {
					return cType1;
				}
			}
			return null;
		} else if(js_Boot.__instanceof(target,csafe_asn1_ASN1Type)) {
			var ty = target;
			if(this.isANY) {
				return ty;
			} else if(this.isChoice) {
				var targetHeader = ty.header;
				var choiceableTypes2 = this.childs;
				var _g13 = 0;
				var _g6 = choiceableTypes2.length;
				while(_g13 < _g6) {
					var i2 = _g13++;
					var cType2 = choiceableTypes2[i2];
					if(cType2.isChoice) {
						var findFromSubChoiceType1 = cType2.getMatchedType(ty);
						if(findFromSubChoiceType1 != null) {
							return cType2;
						}
					} else {
						var nextCHeader2 = cType2.header;
						var _g31 = 0;
						var _g21 = targetHeader.length;
						while(_g31 < _g21) {
							var j2 = _g31++;
							if(targetHeader.b[j2] != nextCHeader2.b[j2]) {
								return null;
							}
						}
						return cType2;
					}
				}
				return null;
			} else {
				var targetHeader1 = ty.header;
				var thisHeader = this.header;
				var _g14 = 0;
				var _g7 = targetHeader1.length;
				while(_g14 < _g7) {
					var j3 = _g14++;
					if(targetHeader1.b[j3] != thisHeader.b[j3]) {
						return null;
					}
				}
				return this;
			}
		} else {
			throw new js__$Boot_HaxeError(new Exception("Unsupport operation parameter : " + Std.string(target)));
		}
	}
	,getSimpleInfo: function() {
		var sb_b = "";
		sb_b += Std.string(this.tagName);
		if(this.varKey != null) {
			sb_b += " ";
			sb_b += Std.string(Std.string(this.varKey));
		}
		if(this.alterCreator != null) {
			sb_b += " ";
			sb_b += Std.string(Std.string(Type.getClassName(this.alterCreator)));
		}
		sb_b += Std.string("[" + util_Hex.toString(this.header) + "]");
		if(this.isChoice) {
			sb_b += "[";
			var _g1 = 0;
			var _g = this.childs.length;
			while(_g1 < _g) {
				var i = _g1++;
				sb_b += Std.string(this.childs[i].getSimpleInfo());
				if(i + 1 < this.childs.length) {
					sb_b += ", ";
				}
			}
			sb_b += "]";
		}
		return sb_b;
	}
	,toTreeString: function(tabbed) {
		if(tabbed == null) {
			tabbed = 0;
		}
		var sb_b = "";
		var _g1 = 0;
		var _g = tabbed;
		while(_g1 < _g) {
			var i = _g1++;
			sb_b += "     ";
		}
		if(this.varKey != null) {
			sb_b += Std.string(Std.string(this.varKey));
			sb_b += " ";
		}
		sb_b += Std.string(this.tagName);
		sb_b += " [";
		sb_b += Std.string(util_Hex.toString(this.header));
		sb_b += "]";
		if(this.isOptional) {
			sb_b += " OPTIONAL";
		}
		var _g11 = 0;
		var _g2 = this.childs.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			sb_b += "\n";
			sb_b += Std.string(this.childs[i1].toTreeString(tabbed + 1));
		}
		return sb_b;
	}
	,create: function(implicit,dVar) {
		if(implicit == null) {
			implicit = false;
		}
		var byteChunk = null;
		if(dVar != null) {
			byteChunk = common_ByteChunk.resolve(dVar);
		}
		var created;
		if(this.alterCreator != null) {
			created = Type.createInstance(this.alterCreator,[]);
			created["asn1Type"] = this;
		} else if(this.isANY) {
			if(this.isImplicit) {
				throw new js__$Boot_HaxeError(new Exception("ANYType은 IMPLICIT 타입일 수 없음"));
			}
			created = new csafe_asn1_ASN1Any(this);
		} else if(this.isChoice) {
			if(this.isImplicit) {
				throw new js__$Boot_HaxeError(new Exception("Choice는 IMPLICIT 타입일 수 없음"));
			}
			created = new csafe_asn1_ASN1Choice(this);
		} else if(this.isContextSpecific) {
			created = new csafe_asn1_ASN1ConSpec(this);
		} else if(this.isConstructor) {
			if(this.isMultiple) {
				created = new csafe_asn1_ASN1Multiple(this);
			} else {
				created = new csafe_asn1_ASN1Constructed(this);
			}
		} else {
			created = new csafe_asn1_ASN1Primitive(this);
		}
		if(byteChunk != null) {
			created.decode(implicit,byteChunk);
		}
		return created;
	}
	,equalTag: function(target) {
		if(this.header.length != target.header.length) {
			return false;
		}
		return util_BytesUtil.equals(this.header,target.header);
	}
	,isUniversalTagNum: function(tag) {
		if(!this.isContextSpecific) {
			return this.tagNum == tag;
		}
		return false;
	}
	,__class__: csafe_asn1_ASN1Type
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) {
		Error.captureStackTrace(this,js__$Boot_HaxeError);
	}
};
js__$Boot_HaxeError.__name__ = ["js","_Boot","HaxeError"];
js__$Boot_HaxeError.wrap = function(val) {
	if((val instanceof Error)) {
		return val;
	} else {
		return new js__$Boot_HaxeError(val);
	}
};
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var csafe_asn1_ASN1 = function() { };
csafe_asn1_ASN1.__name__ = ["csafe","asn1","ASN1"];
csafe_asn1_ASN1.getTagName = function(tag) {
	if(csafe_asn1_ASN1.ANY == tag) {
		return "ANY";
	} else if(csafe_asn1_ASN1.BOOLEAN == tag) {
		return "BOOLEAN";
	} else if(csafe_asn1_ASN1.INTEGER == tag) {
		return "INTEGER";
	} else if(csafe_asn1_ASN1.BIT_STRING == tag) {
		return "BIT STRING";
	} else if(csafe_asn1_ASN1.OCTET_STRING == tag) {
		return "OCTET STRING";
	} else if(csafe_asn1_ASN1.NULL == tag) {
		return "NULL";
	} else if(csafe_asn1_ASN1.OBJECT_ID == tag) {
		return "OBJECT IDENTIFIER";
	} else if(csafe_asn1_ASN1.ENUMERATED == tag) {
		return "ENUMERATED";
	} else if(csafe_asn1_ASN1.UTF8String == tag) {
		return "UTF8String";
	} else if(csafe_asn1_ASN1.SEQUENCE == tag) {
		return "SEQUENCE";
	} else if(csafe_asn1_ASN1.SET == tag) {
		return "SET";
	} else if(csafe_asn1_ASN1.NumericString == tag) {
		return "NumericString";
	} else if(csafe_asn1_ASN1.PrintableString == tag) {
		return "PrintableString";
	} else if(csafe_asn1_ASN1.T61String == tag) {
		return "T61String";
	} else if(csafe_asn1_ASN1.IA5String == tag) {
		return "IA5String";
	} else if(csafe_asn1_ASN1.UTCTime == tag) {
		return "UTCTime";
	} else if(csafe_asn1_ASN1.GeneralizedTime == tag) {
		return "GeneralizedTime";
	} else if(csafe_asn1_ASN1.VisibleString == tag) {
		return "VisibleString";
	} else if(csafe_asn1_ASN1.GeneralString == tag) {
		return "GeneralString";
	} else if(csafe_asn1_ASN1.BMPString == tag) {
		return "BMPString";
	} else {
		return "UNKNOWN(" + tag + ")";
	}
};
csafe_asn1_ASN1.getSizeLength = function(size) {
	if(size < 128) {
		return 1;
	} else if(size <= 255) {
		return 2;
	} else if(size <= 65535) {
		return 3;
	} else if(size <= 16777215) {
		return 4;
	} else {
		return 5;
	}
};
csafe_asn1_ASN1.getSizeBytes = function(size) {
	if(size >= 0 && size <= 127) {
		return util_ArrayUtil.toBytes([size]);
	}
	var lenPartSize = 1;
	var lengthPart = [0];
	var _g = 0;
	while(_g < 4) {
		var i = _g++;
		var ii = 3 - i;
		var lenValue = size >>> ii * 8 & 255;
		if(lenValue != 0 || lenPartSize != 1) {
			++lenPartSize;
			lengthPart.push(lenValue);
		}
	}
	lengthPart[0] = 128 | lenPartSize - 1;
	return util_ArrayUtil.toBytes(lengthPart);
};
csafe_asn1_ASN1.getSize = function(byteChunk) {
	var length = byteChunk.get() & 255;
	if(length == 128) {
		return -1;
	} else if(length > 128) {
		var lengthSize = length & 127;
		if(lengthSize > 4) {
			throw new js__$Boot_HaxeError(new Exception("요구된 가변길이(" + lengthSize + ") 데이터가 너무 크거나 ASN1 데이터가 아닐 수 있습니다. "));
		}
		length = 0;
		while(--lengthSize >= 0) length = length << 8 | byteChunk.get() & 255;
		return length;
	} else {
		return length;
	}
};
csafe_asn1_ASN1.checkTypeAndSize = function(ty,byteChunk) {
	var startPosition = byteChunk.position();
	try {
		var typeChecked = true;
		if(ty.isANY || ty.isChoice) {
			var firstOctet = byteChunk.get() & 255;
			if((firstOctet & 31) == 31) {
				var nextOctet = 0;
				var _g = 0;
				while(_g < 4) {
					var i = _g++;
					nextOctet = byteChunk.get();
					if((nextOctet & 128) != 128) {
						break;
					}
					if(i >= 3) {
						throw new js__$Boot_HaxeError(new Exception("tagNum 이 너무 크거나 ASN1 형식이 아님 : " + ty.getSimpleInfo()));
					}
				}
			}
		} else if(ty.getMatchedType(byteChunk) == null) {
			typeChecked = false;
		}
		if(!typeChecked) {
			if(ty.isOptional) {
				byteChunk.position(startPosition);
				return 0;
			} else {
				throw new js__$Boot_HaxeError(new Exception("타입과 맞지 않음 : " + ty.getSimpleInfo()));
			}
		}
		return csafe_asn1_ASN1.getSize(byteChunk);
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		if( js_Boot.__instanceof(e,Exception) ) {
			if(ty.isOptional) {
				return 0;
			} else {
				throw new js__$Boot_HaxeError(new Exception("타입해석중 오류 : " + Std.string(e) + ", 데이터정보:" + Std.string(byteChunk) + ", 타입:" + ty.getSimpleInfo()));
			}
		} else throw(e);
	}
};
csafe_asn1_ASN1.decode = function(forceImplicit,dVar) {
	if(forceImplicit == null) {
		forceImplicit = false;
	}
	var byteChunk = common_ByteChunk.resolve(dVar);
	var tagNum = 0;
	var typ = null;
	if(!forceImplicit) {
		var firstOctet = byteChunk.get() & 255;
		var isConSpec = (firstOctet & 128) == 128;
		var isConstructed = (firstOctet & 32) == 32;
		if((firstOctet & 31) == 31) {
			var nextOctet = 0;
			var _g = 0;
			while(_g < 4) {
				var i = _g++;
				nextOctet = byteChunk.get();
				tagNum |= nextOctet & 127;
				if((nextOctet & 128) != 128) {
					break;
				}
				tagNum <<= 7;
				if(i >= 3) {
					throw new js__$Boot_HaxeError(new Exception("tagNum 이 너무 크거나 ASN1 형식이 아닐 수 있습니다."));
				}
			}
		} else {
			tagNum = firstOctet & 31;
		}
		var wrapOpts = forceImplicit ? csafe_asn1_ASN1.IMPLICIT : 0;
		if(isConSpec) {
			if(isConstructed) {
				typ = new csafe_asn1_ASN1Type(null,wrapOpts | csafe_asn1_ASN1.CONTEXT_SPECIFIC | csafe_asn1_ASN1.CONSTRUCTED | csafe_asn1_ASN1.IMPLICIT,tagNum);
			} else {
				typ = new csafe_asn1_ASN1Type(null,wrapOpts | csafe_asn1_ASN1.CONTEXT_SPECIFIC | csafe_asn1_ASN1.IMPLICIT,tagNum);
			}
		} else if(isConstructed) {
			typ = new csafe_asn1_ASN1Type(null,wrapOpts | csafe_asn1_ASN1.CONSTRUCTED,tagNum);
		} else {
			typ = new csafe_asn1_ASN1Type(null,wrapOpts,tagNum);
		}
	} else {
		typ = new csafe_asn1_ASN1Type(null,0,csafe_asn1_ASN1.OCTET_STRING);
	}
	var length = csafe_asn1_ASN1.getSize(byteChunk);
	var asn1Object = typ.create();
	if(length == -1) {
		asn1Object.isIndefiniteFlag = true;
	}
	asn1Object.decodeContent(length,byteChunk);
	return asn1Object;
};
csafe_asn1_ASN1.getSkippedHexString = function(data) {
	var hexed = util_Hex.toString(data);
	if(hexed.length > 20) {
		hexed = hexed.substring(0,8) + " ... " + hexed.substring(hexed.length - 8,hexed.length);
	}
	return hexed;
};
var csafe_asn1_ASN1Object = function(ty) {
	this.childs = [];
	this.writable = true;
	this.isIndefiniteFlag = false;
	this.asn1Type = ty;
	this.childs = [];
	if(this.asn1Type.childs.length > 0) {
		var _g1 = 0;
		var _g = this.asn1Type.childs.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.childs.push(this.asn1Type.childs[i].create());
		}
	}
};
csafe_asn1_ASN1Object.__name__ = ["csafe","asn1","ASN1Object"];
csafe_asn1_ASN1Object.prototype = {
	getType: function() {
		return this.asn1Type;
	}
	,createASN1: function() {
		if(this.asn1Type.childs.length > 0) {
			var _g1 = 0;
			var _g = this.asn1Type.childs.length;
			while(_g1 < _g) {
				var i = _g1++;
				this.childs[i] = this.asn1Type.childs[i].create();
			}
		}
	}
	,hasContent: function() {
		throw new js__$Boot_HaxeError(new Exception("Not support isAvailable of ASN1Object"));
	}
	,clone: function() {
		throw new js__$Boot_HaxeError(new Exception("Not support clone of ASN1Object"));
	}
	,getPrimitive: function(varKey) {
		return this.getASN1(varKey);
	}
	,getConstructed: function(varKey) {
		return this.getASN1(varKey);
	}
	,getAny: function(varKey) {
		return this.getASN1(varKey);
	}
	,getChoice: function(varKey) {
		return this.getASN1(varKey);
	}
	,getMultiple: function(varKey) {
		return this.getASN1(varKey);
	}
	,getConSpec: function(varKey) {
		return this.getASN1(varKey);
	}
	,getASN1: function(varKey) {
		throw new js__$Boot_HaxeError(new Exception("Not implemented getASN1 " + Std.string(js_Boot.getClass(this))));
	}
	,setASN1: function(varKey,setterData) {
		throw new js__$Boot_HaxeError(new Exception("Not implemented setASN1 " + Std.string(js_Boot.getClass(this))));
	}
	,isIndefinite: function() {
		return this.isIndefiniteFlag;
	}
	,encode: function(forceImplicit,out) {
		if(forceImplicit == null) {
			forceImplicit = false;
		}
		var isFirstOut = false;
		if(out == null) {
			isFirstOut = true;
			out = new haxe_io_BytesBuffer();
		}
		if(!this.writable || this.asn1Type.isOptional && !this.hasContent()) {
			return new haxe_io_Bytes(new ArrayBuffer(0));
		}
		if(!forceImplicit) {
			this.encodeHeader(out);
		}
		var contentBuffer = new haxe_io_BytesBuffer();
		this.encodeContent(contentBuffer);
		var contentBytes = contentBuffer.getBytes();
		if(contentBytes.length == 0) {
			if(this.asn1Type.isOptional && !this.asn1Type.equalTag(csafe_asn1_ASN1.TYPE_NULL)) {
				return new haxe_io_Bytes(new ArrayBuffer(0));
			}
		}
		var isImplicitConSpec = this.asn1Type.isImplicit && this.asn1Type.isContextSpecific;
		if(!isImplicitConSpec) {
			if(this.isIndefinite()) {
				var src = csafe_asn1_ASN1.INDEFINITE_START_FLAG;
				var b1 = out.b;
				var b2 = src.b;
				var _g1 = 0;
				var _g = src.length;
				while(_g1 < _g) {
					var i = _g1++;
					out.b.push(b2[i]);
				}
			} else {
				var src1 = csafe_asn1_ASN1.getSizeBytes(contentBytes.length);
				var b11 = out.b;
				var b21 = src1.b;
				var _g11 = 0;
				var _g2 = src1.length;
				while(_g11 < _g2) {
					var i1 = _g11++;
					out.b.push(b21[i1]);
				}
			}
		}
		var b12 = out.b;
		var b22 = contentBytes.b;
		var _g12 = 0;
		var _g3 = contentBytes.length;
		while(_g12 < _g3) {
			var i2 = _g12++;
			out.b.push(b22[i2]);
		}
		if(!isImplicitConSpec && this.isIndefinite()) {
			var src2 = csafe_asn1_ASN1.INDEFINITE_END_FLAG;
			var b13 = out.b;
			var b23 = src2.b;
			var _g13 = 0;
			var _g4 = src2.length;
			while(_g13 < _g4) {
				var i3 = _g13++;
				out.b.push(b23[i3]);
			}
		}
		if(isFirstOut) {
			return out.getBytes();
		}
		return null;
	}
	,encodeHeader: function(out) {
		if(!this.asn1Type.isImplicit) {
			var src = this.asn1Type.header;
			var b1 = out.b;
			var b2 = src.b;
			var _g1 = 0;
			var _g = src.length;
			while(_g1 < _g) {
				var i = _g1++;
				out.b.push(b2[i]);
			}
		}
	}
	,encodeContent: function(out) {
		throw new js__$Boot_HaxeError(new Exception("Not implemented getContentLength " + Std.string(js_Boot.getClass(this))));
	}
	,decode: function(forceImplicit,dVar) {
		if(forceImplicit == null) {
			forceImplicit = false;
		}
		var byteChunk = common_ByteChunk.resolve(dVar);
		var expectedPosition = -1;
		var contentSize = 0;
		if(forceImplicit) {
			contentSize = csafe_asn1_ASN1.getSize(byteChunk);
		} else {
			contentSize = csafe_asn1_ASN1.checkTypeAndSize(this.asn1Type,byteChunk);
		}
		if(contentSize == -1) {
			this.isIndefiniteFlag = true;
		} else if(contentSize == 0) {
			return;
		} else {
			expectedPosition = byteChunk.position() + contentSize;
		}
		this.decodeContent(contentSize,byteChunk);
		if(this.isIndefiniteFlag) {
			var flagBytes = [0,0];
			try {
				byteChunk.get(flagBytes);
				if(!(flagBytes[0] == 0 && flagBytes[1] == 0)) {
					byteChunk.position(byteChunk.position() - 2);
				}
			} catch( e ) {
				if (e instanceof js__$Boot_HaxeError) e = e.val;
				if( js_Boot.__instanceof(e,Exception) ) {
				} else throw(e);
			}
		} else if(byteChunk.position() != expectedPosition) {
			haxe_Log.trace(this.toTreeString(),{ fileName : "ASN1Object.hx", lineNumber : 184, className : "csafe.asn1.ASN1Object", methodName : "decode"});
			throw new js__$Boot_HaxeError(new Exception("처리된 데이터의 길이(" + byteChunk.position() + ")가 명시된 길이(" + contentSize + ")와 다름 : " + this.asn1Type.getSimpleInfo()));
		}
	}
	,decodeContent: function(contentSize,byteChunk) {
		throw new js__$Boot_HaxeError(new Exception("Not implemented decodeContent " + Std.string(js_Boot.getClass(this))));
	}
	,toTreeString: function(tabbed,sb) {
		if(tabbed == null) {
			tabbed = 0;
		}
		var isFirst = false;
		if(sb == null) {
			sb = new StringBuf();
			isFirst = true;
		}
		if(tabbed > 0) {
			var _g1 = 0;
			var _g = tabbed;
			while(_g1 < _g) {
				var i = _g1++;
				sb.b += "     ";
			}
		}
		++tabbed;
		var x = this.asn1Type.getSimpleInfo();
		sb.b += Std.string(x);
		if(this.asn1Type.isOptional) {
			sb.b += "(OPTIONAL)";
		}
		sb.b += " (";
		if(this.isIndefinite()) {
			sb.b += "Indefinite:";
		}
		try {
			var tempContentBuff = new haxe_io_BytesBuffer();
			this.encodeContent(tempContentBuff);
			sb.b += Std.string(tempContentBuff.b.length);
		} catch( e ) {
			sb.b += "?";
		}
		sb.b += ") ";
		if(this.asn1Type.isANY) {
			var implAny = this;
			if(implAny.anyData != null) {
				if(js_Boot.__instanceof(implAny.anyData,csafe_asn1_ASN1Raw)) {
					try {
						implAny.resolveAsAnony();
					} catch( e1 ) {
						if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
						if( js_Boot.__instanceof(e1,Exception) ) {
						} else throw(e1);
					}
				}
				sb.b += "\n";
				implAny.anyData.toTreeString(tabbed,sb);
			}
		} else if(this.asn1Type.isContextSpecific) {
			var implSpec = this;
			sb.b += "\n";
			if(implSpec.spec != null) {
				implSpec.spec.toTreeString(tabbed,sb);
			}
		} else if(this.asn1Type.isChoice) {
			var implChoice = this;
			sb.b += "\n";
			if(implChoice.choiced != null) {
				implChoice.choiced.toTreeString(tabbed,sb);
			}
		} else if(this.asn1Type.isMultiple) {
			var implMultiple = this;
			var _g11 = 0;
			var _g2 = implMultiple.multiple.length;
			while(_g11 < _g2) {
				var i1 = _g11++;
				sb.b += "\n";
				var childs = implMultiple.multiple[i1];
				var _g3 = 0;
				var _g21 = childs.length;
				while(_g3 < _g21) {
					var k = _g3++;
					childs[k].toTreeString(tabbed,sb);
				}
			}
		} else if(this.asn1Type.isConstructor) {
			var implConstructor = this;
			var _g12 = 0;
			var _g4 = implConstructor.childs.length;
			while(_g12 < _g4) {
				var i2 = _g12++;
				sb.b += "\n";
				implConstructor.childs[i2].toTreeString(tabbed,sb);
			}
		} else {
			var implPrim = this;
			sb.b += " : ";
			if(implPrim.byteChunk != null && implPrim.byteChunk.limit() <= 0) {
				sb.b += "(Zero Bytes)";
			} else {
				var tag = this.asn1Type.tagNum;
				try {
					if(csafe_asn1_ASN1.ANY == tag) {
						sb.b += "ASN1Any(ERROR)";
					} else if(csafe_asn1_ASN1.BOOLEAN == tag) {
						var x1 = implPrim.asBoolean();
						sb.b += Std.string(x1);
					} else if(csafe_asn1_ASN1.INTEGER == tag) {
						var x2 = implPrim.asBigInteger().toString();
						sb.b += Std.string(x2);
					} else if(csafe_asn1_ASN1.BIT_STRING == tag) {
						var x3 = csafe_asn1_ASN1.getSkippedHexString(implPrim.asByteArray());
						sb.b += Std.string(x3);
					} else if(csafe_asn1_ASN1.OCTET_STRING == tag) {
						var x4 = csafe_asn1_ASN1.getSkippedHexString(implPrim.asByteArray());
						sb.b += Std.string(x4);
					} else if(csafe_asn1_ASN1.NULL == tag) {
						sb.b += "(null)";
					} else if(csafe_asn1_ASN1.OBJECT_ID == tag) {
						var objID = implPrim.asObjectID();
						sb.b += Std.string(objID.oid + " " + objID.name);
					} else if(csafe_asn1_ASN1.ENUMERATED == tag) {
						var x5 = implPrim.asInteger();
						sb.b += Std.string(x5);
					} else if(csafe_asn1_ASN1.UTF8String == tag) {
						var x6 = implPrim.asString();
						sb.b += Std.string(x6);
					} else if(csafe_asn1_ASN1.SEQUENCE == tag) {
						sb.b += "SEQUENCE(ERROR)";
					} else if(csafe_asn1_ASN1.SET == tag) {
						sb.b += "SET(ERROR)";
					} else if(csafe_asn1_ASN1.NumericString == tag) {
						var x7 = implPrim.asString();
						sb.b += Std.string(x7);
					} else if(csafe_asn1_ASN1.PrintableString == tag) {
						var x8 = implPrim.asString();
						sb.b += Std.string(x8);
					} else if(csafe_asn1_ASN1.T61String == tag) {
						var x9 = implPrim.asString();
						sb.b += Std.string(x9);
					} else if(csafe_asn1_ASN1.IA5String == tag) {
						var x10 = implPrim.asString();
						sb.b += Std.string(x10);
					} else if(csafe_asn1_ASN1.UTCTime == tag) {
						var x11 = implPrim.asString();
						sb.b += Std.string(x11);
					} else if(csafe_asn1_ASN1.GeneralizedTime == tag) {
						var x12 = implPrim.asString();
						sb.b += Std.string(x12);
					} else if(csafe_asn1_ASN1.VisibleString == tag) {
						var x13 = implPrim.asString();
						sb.b += Std.string(x13);
					} else if(csafe_asn1_ASN1.GeneralString == tag) {
						var x14 = implPrim.asString();
						sb.b += Std.string(x14);
					} else if(csafe_asn1_ASN1.BMPString == tag) {
						var x15 = implPrim.asString();
						sb.b += Std.string(x15);
					} else {
						var x16 = "UNKNOWN(" + util_Hex.toString(implPrim.asByteArray()) + ")";
						sb.b += Std.string(x16);
					}
				} catch( e2 ) {
					if (e2 instanceof js__$Boot_HaxeError) e2 = e2.val;
					if( js_Boot.__instanceof(e2,Exception) ) {
						sb.b += Std.string(Std.string(e2));
					} else throw(e2);
				}
			}
		}
		if(isFirst) {
			return sb.b;
		}
		return null;
	}
	,__class__: csafe_asn1_ASN1Object
};
var csafe_asn1_ASN1Any = function(typ) {
	csafe_asn1_ASN1Object.call(this,typ);
	this.anyData = new csafe_asn1_ASN1Raw(new haxe_io_Bytes(new ArrayBuffer(0)));
};
csafe_asn1_ASN1Any.__name__ = ["csafe","asn1","ASN1Any"];
csafe_asn1_ASN1Any.__super__ = csafe_asn1_ASN1Object;
csafe_asn1_ASN1Any.prototype = $extend(csafe_asn1_ASN1Object.prototype,{
	clone: function() {
		var rObj = this.asn1Type.create();
		if(this.anyData != null) {
			rObj.anyData = this.anyData.clone();
		}
		return rObj;
	}
	,hasContent: function() {
		if(this.anyData == null) {
			return false;
		} else {
			return this.anyData.hasContent();
		}
	}
	,isIndefinite: function() {
		return this.anyData.isIndefinite();
	}
	,setNull: function() {
		this.anyData = csafe_asn1_ASN1.TYPE_NULL.create();
	}
	,resolveAsAnony: function() {
		if(js_Boot.__instanceof(this.anyData,csafe_asn1_ASN1Raw)) {
			var castRaw = this.anyData;
			castRaw.rawChunk.reset();
			this.anyData = csafe_asn1_ASN1.decode(null,castRaw.rawChunk);
		}
		return this.anyData;
	}
	,resolveAsKnownType: function(knownType) {
		if(this.anyData.asn1Type != knownType) {
			this.anyData = knownType.create(null,this.anyData.encode());
		}
		return this.anyData;
	}
	,getASN1: function(key) {
		return this.anyData.getASN1(key);
	}
	,setASN1: function(key,asn1) {
		if(this.asn1Type.varKey == key) {
			this.anyData = asn1;
			return true;
		}
		return false;
	}
	,encode: function(forceImplicit,outs) {
		return this.anyData.encode(forceImplicit,outs);
	}
	,decode: function(forceImplicit,dVar) {
		if(forceImplicit == null) {
			forceImplicit = false;
		}
		this.anyData = new csafe_asn1_ASN1Raw();
		this.anyData.decode(false,common_ByteChunk.resolve(dVar));
	}
	,__class__: csafe_asn1_ASN1Any
});
var csafe_asn1_ASN1Choice = function(typ) {
	csafe_asn1_ASN1Object.call(this,typ);
};
csafe_asn1_ASN1Choice.__name__ = ["csafe","asn1","ASN1Choice"];
csafe_asn1_ASN1Choice.__super__ = csafe_asn1_ASN1Object;
csafe_asn1_ASN1Choice.prototype = $extend(csafe_asn1_ASN1Object.prototype,{
	hasContent: function() {
		if(this.choiced == null) {
			return false;
		} else {
			return this.choiced.hasContent();
		}
	}
	,clone: function() {
		var rObj = this.asn1Type.create();
		if(this.choiced != null) {
			rObj.choiced = this.choiced.clone();
		}
		return rObj;
	}
	,isIndefinite: function() {
		if(this.choiced != null) {
			return this.choiced.isIndefinite();
		}
		return false;
	}
	,getChoiced: function() {
		return this.choiced;
	}
	,getASN1: function(varKey) {
		if(this.choiced != null) {
			return this.choiced.getASN1(varKey);
		}
		return null;
	}
	,setASN1: function(varKey,asn1) {
		if(varKey == this.asn1Type.varKey) {
			this.choiced = asn1;
			return true;
		} else {
			if(this.choiced != null) {
				return this.choiced.setASN1(varKey,asn1);
			}
			return false;
		}
	}
	,encode: function(forceImplicit,out) {
		if(forceImplicit == null) {
			forceImplicit = false;
		}
		return this.choiced.encode(forceImplicit,out);
	}
	,decode: function(forceImplicit,dVar) {
		if(forceImplicit == null) {
			forceImplicit = false;
		}
		var byteChunk = common_ByteChunk.resolve(dVar);
		var matchedType = this.asn1Type.getMatchedType(byteChunk);
		if(matchedType == null) {
			throw new js__$Boot_HaxeError(new Exception("데이터에 CHOICE 가능한 타입이 없음 : " + this.asn1Type.getSimpleInfo()));
		}
		this.choiced = matchedType.create(true,byteChunk);
	}
	,selectType: function(tagNum) {
		if(this.choiced != null && this.choiced.asn1Type.tagNum == tagNum) {
			return this.choiced;
		}
		var cType = this.asn1Type.getMatchedType(tagNum);
		if(cType != null) {
			this.choiced = cType.create();
			return this.choiced;
		}
		throw new js__$Boot_HaxeError(new Exception("Tag : " + csafe_asn1_ASN1.getTagName(tagNum) + " is not include in choiceable list"));
	}
	,__class__: csafe_asn1_ASN1Choice
});
var csafe_asn1_ASN1ConSpec = function(typ) {
	csafe_asn1_ASN1Object.call(this,typ);
	if(this.asn1Type.childs.length > 0) {
		this.spec = this.asn1Type.childs[0].create();
	}
};
csafe_asn1_ASN1ConSpec.__name__ = ["csafe","asn1","ASN1ConSpec"];
csafe_asn1_ASN1ConSpec.__super__ = csafe_asn1_ASN1Object;
csafe_asn1_ASN1ConSpec.prototype = $extend(csafe_asn1_ASN1Object.prototype,{
	hasContent: function() {
		if(this.spec == null) {
			return false;
		} else {
			return this.spec.hasContent();
		}
	}
	,clone: function() {
		var rObj = this.asn1Type.create();
		if(this.spec != null) {
			rObj.spec = this.spec.clone();
		}
		return rObj;
	}
	,isIndefinite: function() {
		if(this.isIndefiniteFlag && this.spec.isIndefinite()) {
			return true;
		}
		return false;
	}
	,getASN1: function(varKey) {
		if(this.asn1Type.childs[0].varKey == varKey) {
			return this.spec;
		} else {
			return this.spec.getASN1(varKey);
		}
	}
	,setASN1: function(varKey,asn1) {
		if(this.asn1Type.childs[0].varKey == varKey) {
			this.spec = asn1;
			return true;
		} else {
			return this.spec.setASN1(varKey,asn1);
		}
	}
	,encodeHeader: function(out) {
		var src = this.asn1Type.header;
		var b1 = out.b;
		var b2 = src.b;
		var _g1 = 0;
		var _g = src.length;
		while(_g1 < _g) {
			var i = _g1++;
			out.b.push(b2[i]);
		}
	}
	,encodeContent: function(out) {
		this.spec.encode(this.asn1Type.isImplicit,out);
	}
	,decodeContent: function(contentSize,byteChunk) {
		var childTypes = this.asn1Type.childs;
		if(childTypes.length == 1) {
			this.spec = childTypes[0].create();
			if(this.asn1Type.isImplicit) {
				this.spec.decodeContent(contentSize,byteChunk);
			} else {
				this.spec.decode(null,byteChunk);
			}
		} else if(childTypes.length == 0) {
			if(this.asn1Type.isConstructor) {
				this.spec = csafe_asn1_ASN1.TYPE_SEQUENCE.create();
			} else {
				this.spec = csafe_asn1_ASN1.TYPE_OCTET_STRING.create();
			}
			this.spec.decodeContent(contentSize,byteChunk);
		} else {
			throw new js__$Boot_HaxeError(new Exception("Context-Specific은 자식타입이 1개이상일 수 없음 : " + this.asn1Type.getSimpleInfo()));
		}
	}
	,__class__: csafe_asn1_ASN1ConSpec
});
var csafe_asn1_ASN1Constructed = function(typ) {
	csafe_asn1_ASN1Object.call(this,typ);
};
csafe_asn1_ASN1Constructed.__name__ = ["csafe","asn1","ASN1Constructed"];
csafe_asn1_ASN1Constructed.__super__ = csafe_asn1_ASN1Object;
csafe_asn1_ASN1Constructed.prototype = $extend(csafe_asn1_ASN1Object.prototype,{
	hasContent: function() {
		if(this.childs.length == 0) {
			return false;
		}
		var _g = 0;
		var _g1 = this.childs;
		while(_g < _g1.length) {
			var ch = _g1[_g];
			++_g;
			if(ch.hasContent()) {
				return true;
			}
		}
		return false;
	}
	,getChildNum: function() {
		return this.childs.length;
	}
	,getChildAsConstructor: function(index) {
		return this.childs[index];
	}
	,getChildAsMultiple: function(index) {
		return this.childs[index];
	}
	,getChildAsPrimitive: function(index) {
		return this.childs[index];
	}
	,addChild: function(data) {
		this.childs.push(data);
		return this;
	}
	,removeChild: function(index) {
		var newChild = [];
		var _g1 = 0;
		var _g = this.childs.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(i != index) {
				newChild.push(this.childs[i]);
			}
		}
		this.childs = newChild;
	}
	,setChild: function(index,data) {
		this.childs[index] = data;
	}
	,clone: function() {
		var rObj = this.asn1Type.create();
		var _g1 = 0;
		var _g = this.childs.length;
		while(_g1 < _g) {
			var i = _g1++;
			rObj.childs[i] = this.childs[i].clone();
		}
		return rObj;
	}
	,isIndefinite: function() {
		if(!this.isIndefiniteFlag) {
			var _g1 = 0;
			var _g = this.childs.length;
			while(_g1 < _g) {
				var i = _g1++;
				if(this.childs[i].isIndefinite()) {
					return true;
				}
			}
			return false;
		}
		return this.isIndefiniteFlag;
	}
	,getASN1: function(varKey) {
		var childTypes = this.asn1Type.childs;
		var _g1 = 0;
		var _g = childTypes.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(childTypes[i].varKey == varKey) {
				return this.childs[i];
			} else {
				var subQuery = this.childs[i].getASN1(varKey);
				if(subQuery != null) {
					return subQuery;
				}
			}
		}
		return null;
	}
	,setASN1: function(key,asn1) {
		var childTypes = this.asn1Type.childs;
		var _g1 = 0;
		var _g = childTypes.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(childTypes[i].varKey == key) {
				var targetChild = this.childs[i];
				if(js_Boot.__instanceof(targetChild,csafe_asn1_ASN1Any) || js_Boot.__instanceof(targetChild,csafe_asn1_ASN1Choice) || js_Boot.__instanceof(targetChild,csafe_asn1_ASN1ConSpec)) {
					if(!this.childs[i].setASN1(key,asn1)) {
						asn1.asn1Type = asn1.asn1Type.clone();
						asn1.asn1Type.isOptional = childTypes[i].isOptional;
						this.childs[i] = asn1;
					}
					return true;
				}
				asn1.asn1Type = asn1.asn1Type.clone();
				asn1.asn1Type.isOptional = childTypes[i].isOptional;
				this.childs[i] = asn1;
			} else if(this.childs[i].setASN1(key,asn1)) {
				return true;
			}
		}
		return false;
	}
	,encodeContent: function(outs) {
		var _g1 = 0;
		var _g = this.childs.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.childs[i].encode(false,outs);
		}
	}
	,decodeContent: function(contentSize,byteChunk) {
		var childTypes = this.asn1Type.childs;
		if(childTypes.length > 0) {
			var mandatoryTypeProceed = 0;
			var _g1 = 0;
			var _g = childTypes.length;
			while(_g1 < _g) {
				var i = _g1++;
				if(!childTypes[i].isOptional) {
					++mandatoryTypeProceed;
				}
			}
			var startCPos = byteChunk.position();
			var _g11 = 0;
			var _g2 = childTypes.length;
			while(_g11 < _g2) {
				var i1 = _g11++;
				if(mandatoryTypeProceed <= 0) {
					if(contentSize == -1) {
						var flagBytes = [0,0];
						try {
							byteChunk.get(flagBytes);
							if(flagBytes[0] == 0 && flagBytes[1] == 0) {
								var _g3 = i1;
								var _g21 = childTypes.length;
								while(_g3 < _g21) {
									var k = _g3++;
									this.childs[k] = childTypes[k].create();
								}
								break;
							} else {
								byteChunk.position(byteChunk.position() - 2);
							}
						} catch( e ) {
							if (e instanceof js__$Boot_HaxeError) e = e.val;
							if( js_Boot.__instanceof(e,Exception) ) {
							} else throw(e);
						}
					} else if(byteChunk.position() - startCPos >= contentSize) {
						var _g31 = i1;
						var _g22 = childTypes.length;
						while(_g31 < _g22) {
							var k1 = _g31++;
							this.childs[k1] = childTypes[k1].create();
						}
						break;
					}
				}
				var childType = childTypes[i1];
				this.childs[i1] = childType.create(null,byteChunk);
				if(!childType.isOptional) {
					--mandatoryTypeProceed;
				}
			}
		} else {
			var resolved = [];
			var startCPos1 = byteChunk.position();
			while(true) {
				resolved.push(csafe_asn1_ASN1.decode(null,byteChunk));
				if(contentSize == -1) {
					var flagBytes1 = [0,0];
					try {
						byteChunk.get(flagBytes1);
						if(flagBytes1[0] == 0 && flagBytes1[1] == 0) {
							break;
						} else {
							byteChunk.position(byteChunk.position() - 2);
						}
					} catch( e1 ) {
						if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
						if( js_Boot.__instanceof(e1,Exception) ) {
						} else throw(e1);
					}
				} else if(byteChunk.position() - startCPos1 >= contentSize) {
					break;
				}
			}
			this.childs = resolved;
		}
	}
	,__class__: csafe_asn1_ASN1Constructed
});
var csafe_asn1_ASN1Multiple = function(typ) {
	csafe_asn1_ASN1Object.call(this,typ);
	this.multiple = [];
};
csafe_asn1_ASN1Multiple.__name__ = ["csafe","asn1","ASN1Multiple"];
csafe_asn1_ASN1Multiple.__super__ = csafe_asn1_ASN1Object;
csafe_asn1_ASN1Multiple.prototype = $extend(csafe_asn1_ASN1Object.prototype,{
	hasContent: function() {
		if(this.multiple.length == 0) {
			return false;
		} else {
			var _g = 0;
			var _g1 = this.multiple;
			while(_g < _g1.length) {
				var cs = _g1[_g];
				++_g;
				if(cs[0].hasContent()) {
					return true;
				}
			}
		}
		return false;
	}
	,clone: function() {
		var rObj = this.asn1Type.create();
		var _g1 = 0;
		var _g = this.multiple.length;
		while(_g1 < _g) {
			var i = _g1++;
			rObj.multiple[i] = [];
			var _g3 = 0;
			var _g2 = this.multiple[i].length;
			while(_g3 < _g2) {
				var k = _g3++;
				rObj.multiple[i][k] = this.multiple[i][k].clone();
			}
		}
		return rObj;
	}
	,getASN1: function(varKey) {
		if(this.childs == null) {
			return null;
		}
		var childTypes = this.asn1Type.childs;
		var _g1 = 0;
		var _g = childTypes.length;
		while(_g1 < _g) {
			var i = _g1++;
			var typ = childTypes[i];
			if(typ.varKey == varKey) {
				return this.childs[i];
			} else {
				var subQuery = this.childs[i].getASN1(varKey);
				if(subQuery != null) {
					return subQuery;
				}
			}
		}
		return null;
	}
	,setASN1: function(varKey,asn1) {
		var childTypes = this.asn1Type.childs;
		var _g1 = 0;
		var _g = childTypes.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(childTypes[i].varKey == varKey) {
				if(!this.childs[i].setASN1(varKey,asn1)) {
					this.childs[i] = asn1;
				}
				return true;
			} else if(this.childs[i].setASN1(varKey,asn1)) {
				return true;
			}
		}
		return false;
	}
	,encodeContent: function(out) {
		var _g = 0;
		var _g1 = this.multiple;
		while(_g < _g1.length) {
			var childArray = _g1[_g];
			++_g;
			var _g2 = 0;
			while(_g2 < childArray.length) {
				var com = childArray[_g2];
				++_g2;
				com.encode(false,out);
			}
		}
	}
	,decodeContent: function(contentSize,byteChunk) {
		var childTypes = this.asn1Type.childs;
		var startPosition = byteChunk.position();
		while(true) {
			var arrayChilds = [];
			var _g1 = 0;
			var _g = childTypes.length;
			while(_g1 < _g) {
				var i = _g1++;
				arrayChilds[i] = childTypes[i].create(null,byteChunk);
			}
			this.addArray(arrayChilds);
			if(this.isIndefiniteFlag) {
				if(byteChunk.get() == 0 && byteChunk.get() == 0) {
					break;
				} else {
					byteChunk.position(byteChunk.position() - 2);
				}
			} else {
				var expectedSize = byteChunk.position() - startPosition;
				if(expectedSize == contentSize) {
					break;
				} else if(expectedSize > contentSize) {
					throw new js__$Boot_HaxeError(new Exception("처리된 데이터의 길이(" + (expectedSize - byteChunk.position()) + ")가 명시된 길이(" + contentSize + ")가 다름 : " + this.asn1Type.getSimpleInfo()));
				}
			}
		}
		if(this.multiple.length > 0) {
			this.childs = this.multiple[0];
		}
	}
	,getInstances: function() {
		var insts = [];
		if(this.multiple.length > 0) {
			var _g1 = 0;
			var _g = this.multiple.length;
			while(_g1 < _g) {
				var i = _g1++;
				insts.push(this.multiple[i][0]);
			}
		}
		return insts;
	}
	,getFirstElem: function(index) {
		return this.multiple[index][0];
	}
	,getArray: function(index) {
		return this.multiple[index];
	}
	,addArray: function(array) {
		this.multiple.push(array);
	}
	,set: function(muls) {
		this.multiple = muls;
	}
	,setDatas: function(data) {
		this.multiple = [];
		var _g = 0;
		while(_g < data.length) {
			var i = data[_g];
			++_g;
			this.addData(i);
		}
	}
	,addData: function(asn1) {
		this.addAndFocus();
		this.childs[0] = asn1;
		return asn1;
	}
	,get: function(index) {
		return this.childs[index];
	}
	,getMultipleSize: function() {
		return this.multiple.length;
	}
	,addAndFocus: function() {
		var childTypes = this.asn1Type.childs;
		var datas = [];
		var _g1 = 0;
		var _g = childTypes.length;
		while(_g1 < _g) {
			var i = _g1++;
			datas[i] = childTypes[i].create();
		}
		this.multiple.push(datas);
		this.childs = datas;
		return this.childs[0];
	}
	,removeAll: function() {
		this.multiple = [];
	}
	,remove: function(index) {
		this.multiple.splice(index,1);
	}
	,setFocus: function(index) {
		this.childs = this.multiple[index];
	}
	,__class__: csafe_asn1_ASN1Multiple
});
var csafe_asn1_ASN1Primitive = function(typ,dVar) {
	this.IS_NULLABLE = false;
	csafe_asn1_ASN1Object.call(this,typ);
	if(dVar != null) {
		this.byteChunk = common_ByteChunk.resolve(dVar);
	} else {
		this.byteChunk = new common_ByteChunk(0);
	}
};
csafe_asn1_ASN1Primitive.__name__ = ["csafe","asn1","ASN1Primitive"];
csafe_asn1_ASN1Primitive.createBoolean = function(flag) {
	var asn1 = new csafe_asn1_ASN1Primitive(csafe_asn1_ASN1.TYPE_BOOLEAN);
	asn1.setBoolean(flag);
	return asn1;
};
csafe_asn1_ASN1Primitive.createInteger = function(value,signBit) {
	if(signBit == null) {
		signBit = false;
	}
	var asn1 = new csafe_asn1_ASN1Primitive(csafe_asn1_ASN1.TYPE_INTEGER);
	asn1.setInteger(value,signBit);
	return asn1;
};
csafe_asn1_ASN1Primitive.createBitString = function(data) {
	var asn1 = new csafe_asn1_ASN1Primitive(csafe_asn1_ASN1.TYPE_BIT_STRING);
	asn1.setBitString(data);
	return asn1;
};
csafe_asn1_ASN1Primitive.createOctetString = function(data) {
	var asn1 = new csafe_asn1_ASN1Primitive(csafe_asn1_ASN1.TYPE_OCTET_STRING);
	asn1.setOctetString(data);
	return asn1;
};
csafe_asn1_ASN1Primitive.createNull = function() {
	var asn1 = new csafe_asn1_ASN1Primitive(csafe_asn1_ASN1.TYPE_NULL);
	asn1.setNull();
	return asn1;
};
csafe_asn1_ASN1Primitive.createObjectID = function(value) {
	var asn1 = new csafe_asn1_ASN1Primitive(csafe_asn1_ASN1.TYPE_OBJECT_ID);
	asn1.setObjectID(value);
	return asn1;
};
csafe_asn1_ASN1Primitive.createUTF8String = function(value) {
	var asn1 = new csafe_asn1_ASN1Primitive(csafe_asn1_ASN1.TYPE_UTF8String);
	asn1.setUTF8String(value);
	return asn1;
};
csafe_asn1_ASN1Primitive.createNumericString = function(value) {
	var asn1 = new csafe_asn1_ASN1Primitive(csafe_asn1_ASN1.TYPE_NumericString);
	asn1.setNumericString(value);
	return asn1;
};
csafe_asn1_ASN1Primitive.createPrintableString = function(value) {
	var asn1 = new csafe_asn1_ASN1Primitive(csafe_asn1_ASN1.TYPE_PrintableString);
	asn1.setPrintableString(value);
	return asn1;
};
csafe_asn1_ASN1Primitive.createT61String = function(value) {
	var asn1 = new csafe_asn1_ASN1Primitive(csafe_asn1_ASN1.TYPE_T61String);
	asn1.setT61String(value);
	return asn1;
};
csafe_asn1_ASN1Primitive.createIA5String = function(value) {
	var asn1 = new csafe_asn1_ASN1Primitive(csafe_asn1_ASN1.TYPE_IA5String);
	asn1.setIA5String(value);
	return asn1;
};
csafe_asn1_ASN1Primitive.createUTCTime = function(d) {
	var asn1 = new csafe_asn1_ASN1Primitive(csafe_asn1_ASN1.TYPE_UTCTime);
	asn1.setUTCTime(d);
	return asn1;
};
csafe_asn1_ASN1Primitive.createGeneralizedTime = function(d) {
	var asn1 = new csafe_asn1_ASN1Primitive(csafe_asn1_ASN1.TYPE_GeneralizedTime);
	asn1.setGeneralizedTime(d);
	return asn1;
};
csafe_asn1_ASN1Primitive.createVisibleString = function(value) {
	var asn1 = new csafe_asn1_ASN1Primitive(csafe_asn1_ASN1.TYPE_VisibleString);
	asn1.setVisibleString(value);
	return asn1;
};
csafe_asn1_ASN1Primitive.createGeneralString = function(value) {
	var asn1 = new csafe_asn1_ASN1Primitive(csafe_asn1_ASN1.TYPE_GeneralString);
	asn1.setGeneralString(value);
	return asn1;
};
csafe_asn1_ASN1Primitive.__super__ = csafe_asn1_ASN1Object;
csafe_asn1_ASN1Primitive.prototype = $extend(csafe_asn1_ASN1Object.prototype,{
	setNullable: function(flag) {
		this.IS_NULLABLE = flag;
	}
	,isNullable: function() {
		return this.IS_NULLABLE;
	}
	,hasContent: function() {
		if(this.byteChunk.limit() > 0 || this.isNullable()) {
			return true;
		}
		return false;
	}
	,clone: function() {
		var rObj = this.asn1Type.create();
		rObj.byteChunk = common_ByteChunk.resolve(util_BytesUtil.clone(this.byteChunk.array()));
		return rObj;
	}
	,getASN1: function(key) {
		if(this.asn1Type.varKey == key) {
			return this;
		}
		return null;
	}
	,setASN1: function(key,asn1) {
		return false;
	}
	,encodeContent: function(out) {
		this.byteChunk.writeTo(out);
	}
	,decodeContent: function(contentSize,byteChunk) {
		if(this.isIndefinite()) {
			var fBos = [];
			var lastOctet = -1;
			while(true) {
				var oct1 = byteChunk.get();
				fBos.push(oct1);
				if(oct1 == 0 && lastOctet == 0) {
					break;
				}
				lastOctet = byteChunk.get();
				var oct2 = lastOctet;
				fBos.push(oct2);
				if(oct1 == 0 && oct2 == 0) {
					break;
				}
			}
			this.byteChunk = common_ByteChunk.resolve(util_ArrayUtil.toBytes(fBos));
		} else {
			this.byteChunk = byteChunk.sliceAndSkip(contentSize);
		}
	}
	,asBoolean: function() {
		return this.byteChunk.get(0) != 0;
	}
	,asInteger: function() {
		this.byteChunk.reset();
		var dataSize = this.byteChunk.limit();
		var rInt = 0;
		var _g1 = 0;
		var _g = dataSize;
		while(_g1 < _g) {
			var i = _g1++;
			rInt |= this.byteChunk.get() << (dataSize - 1 - i) * 8;
		}
		return rInt;
	}
	,asBigInteger: function() {
		return csafe_math_BigInteger.ofBytes(this.byteChunk.array(),true);
	}
	,asBooleanArray: function() {
		var padLength = 0;
		this.byteChunk.reset();
		if(this.asn1Type.tagNum == csafe_asn1_ASN1.BIT_STRING) {
			padLength = this.byteChunk.get(0);
		}
		var boolsLen = this.byteChunk.remaining() * 8 - padLength;
		var bools = [];
		var _g1 = 0;
		var _g = boolsLen;
		while(_g1 < _g) {
			var i = _g1++;
			var byteData;
			if(this.asn1Type.tagNum == csafe_asn1_ASN1.BIT_STRING) {
				byteData = this.byteChunk.get((i / 8 | 0) + 1);
			} else {
				byteData = this.byteChunk.get(i / 8 | 0);
			}
			var mask = 128 >> i % 8;
			bools[i] = (mask & byteData) == mask;
		}
		return bools;
	}
	,asObjectID: function() {
		return csafe_asn1_ObjectID.resolve(this.byteChunk.array());
	}
	,asByteArray: function(signBit) {
		if(signBit == null) {
			signBit = false;
		}
		if(this.asn1Type.isUniversalTagNum(csafe_asn1_ASN1.BIT_STRING)) {
			return this.byteChunk.array(1);
		} else if(this.asn1Type.isUniversalTagNum(csafe_asn1_ASN1.INTEGER)) {
			var firstByte = this.byteChunk.get();
			this.byteChunk.reset();
			if(firstByte == 0) {
				return this.byteChunk.array(1);
			} else {
				return this.byteChunk.array();
			}
		}
		return this.byteChunk.array();
	}
	,asString: function() {
		var tagNum = this.asn1Type.tagNum;
		if(tagNum == csafe_asn1_ASN1.UTF8String) {
			this.byteChunk.reset();
			return this.byteChunk.getString("utf-8");
		} else if(tagNum == csafe_asn1_ASN1.BMPString) {
			var data = this.asByteArray();
			var length = data.length / 2 | 0;
			var cs = "";
			var _g1 = 0;
			var _g = length;
			while(_g1 < _g) {
				var i = _g1++;
				var code = data.b[2 * i] << 8 | data.b[2 * i + 1] & 255;
				cs += String.fromCharCode(code);
			}
			return cs;
		} else {
			this.byteChunk.reset();
			return this.byteChunk.getString();
		}
	}
	,asDate: function() {
		var tagNum = this.asn1Type.tagNum;
		if(tagNum == csafe_asn1_ASN1.UTCTime) {
			var parser = new EReg("(\\d{2})(\\d{2})(\\d{2})(\\d{2})(\\d{2})(\\d{2})Z","ig");
			parser.match(this.asString());
			var year = Std.parseInt(parser.matched(1));
			if(year >= 50) {
				year = 1900 + year;
			} else {
				year = 2000 + year;
			}
			var month = Std.parseInt(parser.matched(2)) - 1;
			var day = Std.parseInt(parser.matched(3));
			var hour = Std.parseInt(parser.matched(4));
			var minute = Std.parseInt(parser.matched(5));
			var second = Std.parseInt(parser.matched(6));
			var t = Date.UTC(year,month,day,hour,minute,second);
			return new Date(t);
		} else if(tagNum == csafe_asn1_ASN1.GeneralizedTime) {
			var parser1 = new EReg("(\\d{4})(\\d{2})(\\d{2})(\\d{2})(\\d{2})(\\d{2})Z","ig");
			parser1.match(this.asString());
			var year1 = Std.parseInt(parser1.matched(0));
			var month1 = Std.parseInt(parser1.matched(2)) - 1;
			var day1 = Std.parseInt(parser1.matched(3));
			var hour1 = Std.parseInt(parser1.matched(4));
			var minute1 = Std.parseInt(parser1.matched(5));
			var second1 = Std.parseInt(parser1.matched(6));
			var t1 = Date.UTC(year1,month1,day1,hour1,minute1,second1);
			return new Date(t1);
		} else {
			throw new js__$Boot_HaxeError(new Exception("Invalid date tagNum : " + tagNum));
		}
	}
	,setBoolean: function(flag) {
		this.byteChunk.arrangeSizeAndReset(false,1);
		this.byteChunk.put(flag ? -1 : 0);
	}
	,setInteger: function(value,signBit) {
		if(signBit == null) {
			signBit = false;
		}
		var bytes = null;
		if(typeof(value) == "number" && ((value | 0) === value)) {
			bytes = csafe_math_BigInteger.ofInt(value).toBytes();
		} else if(js_Boot.__instanceof(value,csafe_math_BigInteger)) {
			bytes = (js_Boot.__cast(value , csafe_math_BigInteger)).toBytes();
		} else if(js_Boot.__instanceof(value,haxe_io_Bytes)) {
			bytes = value;
		} else {
			throw new js__$Boot_HaxeError(new Exception("Invalid integer : " + Std.string(value)));
		}
		if(this.asn1Type.isUniversalTagNum(csafe_asn1_ASN1.BIT_STRING)) {
			this.setBitString(bytes);
		} else if(signBit && bytes.b[0] >= 128) {
			this.byteChunk.arrangeSizeAndReset(false,bytes.length + 1);
			this.byteChunk.put(0);
			this.byteChunk.put(bytes);
		} else {
			this.setOctetString(bytes);
		}
	}
	,setBoolBitString: function(bools) {
		var byteLength = bools.length;
		var padLength = 8 - byteLength % 8;
		var value = [];
		var _g1 = 0;
		var _g = byteLength;
		while(_g1 < _g) {
			var i = _g1++;
			value[i / 8 | 0] <<= 1;
			if(bools[i]) {
				value[i / 8 | 0]++;
			}
		}
		if(padLength > 0) {
			value[byteLength / 8 | 0] <<= padLength;
		}
		this.byteChunk.arrangeSizeAndReset(false,value.length + 1);
		this.byteChunk.put(padLength);
		this.byteChunk.put(value);
	}
	,setBitString: function(data) {
		if(typeof(data) == "string") {
			var str = data;
			var bitLength = str.length;
			var padLength = (8 - bitLength % 8) % 8;
			var valueLength = (bitLength + 7) / 8;
			var value = [];
			var _g1 = 0;
			var _g = bitLength;
			while(_g1 < _g) {
				var i = _g1++;
				value[i / 8 | 0] <<= 1;
				if(str.charAt(i) == "1") {
					value[i / 8 | 0]++;
				}
			}
			if(padLength > 0) {
				value[bitLength / bitLength | 0] <<= padLength;
			}
			this.byteChunk.arrangeSizeAndReset(false,value.length + 1);
			this.byteChunk.put(padLength);
			this.byteChunk.put(value);
		} else if((data instanceof Array) && data.__enum__ == null) {
			var value1 = data;
			this.byteChunk.arrangeSizeAndReset(false,value1.length + 1);
			this.byteChunk.put(0);
			this.byteChunk.put(value1);
		} else if(js_Boot.__instanceof(data,haxe_io_Bytes)) {
			var value2 = data;
			this.byteChunk.arrangeSizeAndReset(false,value2.length + 1);
			this.byteChunk.put(0);
			this.byteChunk.put(data);
		} else {
			throw new js__$Boot_HaxeError(new Exception("Invalid BIT_STRING data : " + Std.string(data)));
		}
	}
	,setOctetString: function(data) {
		this.byteChunk.arrangeSizeAndReset(false,data.length);
		this.byteChunk.put(data);
	}
	,setNull: function() {
		this.byteChunk.arrangeSizeAndReset(false,0);
	}
	,setObjectID: function(oid) {
		var data = oid.encoded;
		this.byteChunk.arrangeSizeAndReset(false,data.length);
		this.byteChunk.put(data);
	}
	,setString: function(value) {
		var tagNum = this.asn1Type.tagNum;
		if(tagNum == csafe_asn1_ASN1.UTF8String) {
			this.setUTF8String(value);
		} else if(tagNum == csafe_asn1_ASN1.BMPString) {
			this.setBMPString(value);
		} else {
			this.setISOString(tagNum,value);
		}
	}
	,setUTF8String: function(utf8str) {
		var data = haxe_io_Bytes.ofString(utf8str);
		this.byteChunk.arrangeSizeAndReset(false,data.length);
		this.byteChunk.put(data);
	}
	,setNumericString: function(str) {
		this.setISOString(csafe_asn1_ASN1.NumericString,str);
	}
	,setPrintableString: function(str) {
		this.setISOString(csafe_asn1_ASN1.PrintableString,str);
	}
	,setT61String: function(str) {
		this.setISOString(csafe_asn1_ASN1.T61String,str);
	}
	,setIA5String: function(str) {
		this.setISOString(csafe_asn1_ASN1.IA5String,str);
	}
	,setVisibleString: function(str) {
		this.setISOString(csafe_asn1_ASN1.VisibleString,str);
	}
	,setGeneralString: function(str) {
		this.setISOString(csafe_asn1_ASN1.GeneralString,str);
	}
	,setBMPString: function(str) {
		this.byteChunk.arrangeSizeAndReset(false,str.length * 2);
		var _g1 = 0;
		var _g = str.length;
		while(_g1 < _g) {
			var i = _g1++;
			var cs = Std.parseInt(str.charAt(i));
			this.byteChunk.put(cs >> 8 & 255);
			this.byteChunk.put(cs & 255);
		}
	}
	,setISOString: function(tagNum,str) {
		var arr = [];
		var _g1 = 0;
		var _g = str.length;
		while(_g1 < _g) {
			var i = _g1++;
			arr.push(HxOverrides.cca(str,i));
		}
		this.byteChunk.arrangeSizeAndReset(false,arr.length);
		this.byteChunk.put(arr);
	}
	,addTwoLenNum: function(out,val) {
		var strVal = val + "";
		if(strVal.length > 1) {
			var x = strVal.charAt(strVal.length - 2);
			out.b += Std.string(x);
			var x1 = strVal.charAt(strVal.length - 1);
			out.b += Std.string(x1);
		} else {
			out.b += "0";
			out.b += strVal == null ? "null" : "" + strVal;
		}
	}
	,setUTCTime: function(d) {
		var dateString = new StringBuf();
		var year = d.getFullYear();
		if(year < 2000) {
			year = 50 + (year - 1950);
		}
		this.addTwoLenNum(dateString,year);
		this.addTwoLenNum(dateString,d.getMonth() + 1);
		this.addTwoLenNum(dateString,d.getDate());
		this.addTwoLenNum(dateString,d.getHours());
		this.addTwoLenNum(dateString,d.getMinutes());
		this.addTwoLenNum(dateString,d.getSeconds());
		dateString.b += "Z";
		this.setISOString(csafe_asn1_ASN1.GeneralString,dateString.b);
	}
	,setGeneralizedTime: function(d) {
		var dateString = new StringBuf();
		dateString.b += Std.string(d.getFullYear());
		this.addTwoLenNum(dateString,d.getMonth() + 1);
		this.addTwoLenNum(dateString,d.getDate());
		this.addTwoLenNum(dateString,d.getHours());
		this.addTwoLenNum(dateString,d.getMinutes());
		this.addTwoLenNum(dateString,d.getSeconds());
		dateString.b += "Z";
		this.setISOString(csafe_asn1_ASN1.GeneralString,dateString.b);
	}
	,__class__: csafe_asn1_ASN1Primitive
});
var csafe_asn1_ASN1Raw = function(dVar) {
	csafe_asn1_ASN1Object.call(this,csafe_asn1_ASN1.TYPE_ANY);
	if(dVar != null) {
		this.rawChunk = common_ByteChunk.resolve(dVar);
	} else {
		this.rawChunk = new common_ByteChunk(0);
	}
};
csafe_asn1_ASN1Raw.__name__ = ["csafe","asn1","ASN1Raw"];
csafe_asn1_ASN1Raw.__super__ = csafe_asn1_ASN1Object;
csafe_asn1_ASN1Raw.prototype = $extend(csafe_asn1_ASN1Object.prototype,{
	hasContent: function() {
		if(this.rawChunk.limit() > 0) {
			return true;
		}
		return false;
	}
	,clone: function() {
		return new csafe_asn1_ASN1Raw(this.rawChunk.array());
	}
	,getASN1: function(varKey) {
		return null;
	}
	,setASN1: function(varKey,setterData) {
		return false;
	}
	,decode: function(forceImplicit,dVar) {
		if(forceImplicit == null) {
			forceImplicit = false;
		}
		var byteChunk = common_ByteChunk.resolve(dVar);
		var startPosition = byteChunk.position();
		this.skipByteChunk(forceImplicit,byteChunk);
		var asn1DataLength = byteChunk.position() - startPosition;
		byteChunk.position(startPosition);
		this.rawChunk = byteChunk.sliceAndSkip(asn1DataLength);
	}
	,skipByteChunk: function(isImplicit,byteChunk) {
		var isConstructed = true;
		if(!isImplicit) {
			var firstOctet = byteChunk.get() & 255;
			isConstructed = (firstOctet & 32) == 32;
			if((firstOctet & 31) == 31) {
				var nextOctet = 0;
				var _g = 0;
				while(_g < 4) {
					var i = _g++;
					nextOctet = byteChunk.get();
					if((nextOctet & 128) != 128) {
						break;
					}
					if(i >= 3) {
						throw new js__$Boot_HaxeError(new Exception("tagNum 이 너무 크거나 ASN1 형식이 아닐 수 있습니다."));
					}
				}
			}
		}
		var length = csafe_asn1_ASN1.getSize(byteChunk);
		if(length != -1) {
			byteChunk.skip(length);
		} else {
			var isImplicit1 = isImplicit;
			if(isConstructed) {
				var k = 0;
				while(true) {
					var i1 = 0;
					this.skipByteChunk(false,byteChunk);
					if(!(byteChunk.get() == 0 && byteChunk.get() == 0)) {
						break;
					}
				}
			} else {
				var oct1 = byteChunk.get();
				var oct2 = byteChunk.get();
				var switchFlag = false;
				while(!(oct1 == 0 && oct2 == 0)) {
					switchFlag = !switchFlag;
					if(switchFlag) {
						oct1 = byteChunk.get();
					} else {
						oct2 = byteChunk.get();
					}
				}
			}
		}
	}
	,encode: function(forceImplicit,out) {
		if(forceImplicit == null) {
			forceImplicit = false;
		}
		if(forceImplicit) {
			throw new js__$Boot_HaxeError(new Exception("ASN1AnyRaw not support implicit"));
		}
		if(out != null) {
			this.rawChunk.writeTo(out);
			return null;
		} else {
			return this.rawChunk.array();
		}
	}
	,toTreeString: function(tabbed,sb) {
		if(tabbed == null) {
			tabbed = 0;
		}
		var isFirst = false;
		if(sb == null) {
			sb = new StringBuf();
			isFirst = true;
		}
		if(tabbed > 0) {
			var _g1 = 0;
			var _g = tabbed;
			while(_g1 < _g) {
				var i = _g1++;
				sb.b += "     ";
			}
		}
		var x = this.rawChunk.array().toHex();
		sb.b += Std.string(x);
		if(isFirst) {
			return sb.b;
		}
		return null;
	}
	,__class__: csafe_asn1_ASN1Raw
});
var csafe_asn1_ASN1TypeBuilder = function() {
	this.key = { };
	this.contextCounting = -1;
};
csafe_asn1_ASN1TypeBuilder.__name__ = ["csafe","asn1","ASN1TypeBuilder"];
csafe_asn1_ASN1TypeBuilder.prototype = {
	build: function(creator) {
		if(creator != null) {
			this.asn1Type.alterCreator = creator;
		} else {
			var constructor;
			if(this.asn1Type.isANY) {
				constructor = csafe_asn1_ASN1Any;
				if(this.asn1Type.isImplicit) {
					throw new js__$Boot_HaxeError(new Exception("ANYType은 IMPLICIT 타입일 수 없음"));
				}
			} else if(this.asn1Type.isChoice) {
				if(this.asn1Type.isImplicit) {
					throw new js__$Boot_HaxeError(new Exception("Choice는 IMPLICIT 타입일 수 없음"));
				}
				constructor = csafe_asn1_ASN1Choice;
			} else if(this.asn1Type.isContextSpecific) {
				constructor = csafe_asn1_ASN1ConSpec;
			} else if(this.asn1Type.isConstructor) {
				if(this.asn1Type.isMultiple) {
					constructor = csafe_asn1_ASN1Multiple;
				} else {
					constructor = csafe_asn1_ASN1Constructed;
				}
			} else {
				constructor = csafe_asn1_ASN1Primitive;
			}
			this.asn1Type.alterCreator = constructor;
		}
		return this.asn1Type;
	}
	,nextContextNum: function() {
		var childTypes = this.focusedType.childs;
		var lastContextNum = 0;
		var _g1 = 0;
		var _g = childTypes.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(childTypes[i].isContextSpecific) {
				lastContextNum = childTypes[i].tagNum + 1;
			}
		}
		return lastContextNum;
	}
	,add: function(child) {
		if(this.asn1Type == null) {
			this.focusedType = this.asn1Type = child;
			this.asn1Type.isRootFamily = true;
			return;
		}
		this.focusedType.addChild(child);
		if(this.focusedType.isContextSpecific) {
			if(child.isRootFamily || !child.isConstructor && !child.isChoice) {
				this.CLOSE();
				return;
			}
		}
		if(child.isRootFamily) {
			return;
		}
		if(child.isConstructor || child.isChoice) {
			this.focusedType = child;
		}
	}
	,ContextSpecific: function(varNum,opt,specifiedTag) {
		var tagNum = this.nextContextNum();
		if(specifiedTag != null) {
			tagNum = specifiedTag;
		}
		this.add(new csafe_asn1_ASN1Type(varNum,csafe_asn1_ASN1.CONSTRUCTED | csafe_asn1_ASN1.CONTEXT_SPECIFIC | opt,tagNum));
		return this;
	}
	,SEQUENCE: function(varNum,opt) {
		this.add(new csafe_asn1_ASN1Type(varNum,csafe_asn1_ASN1.CONSTRUCTED | opt,csafe_asn1_ASN1.SEQUENCE));
		return this;
	}
	,SEQUENCEOF: function(varNum,opt) {
		this.add(new csafe_asn1_ASN1Type(varNum,csafe_asn1_ASN1.CONSTRUCTED | csafe_asn1_ASN1.MULTIPLE | opt,csafe_asn1_ASN1.SEQUENCE));
		return this;
	}
	,SET: function(varNum,opt) {
		this.add(new csafe_asn1_ASN1Type(varNum,csafe_asn1_ASN1.CONSTRUCTED | opt,csafe_asn1_ASN1.SET));
		return this;
	}
	,SETOF: function(varNum,opt) {
		this.add(new csafe_asn1_ASN1Type(varNum,csafe_asn1_ASN1.CONSTRUCTED | csafe_asn1_ASN1.MULTIPLE | opt,csafe_asn1_ASN1.SET));
		return this;
	}
	,CHOICE: function(varNum,opt) {
		this.add(new csafe_asn1_ASN1Type(varNum,csafe_asn1_ASN1.CHOICE | opt,0));
		return this;
	}
	,Import: function(varKey,subType,isOptional) {
		if(isOptional == null) {
			isOptional = false;
		}
		var newType = subType.clone(varKey);
		newType.varKey = varKey;
		newType.isOptional = isOptional;
		this.add(newType);
		return this;
	}
	,ANY: function(varNum,opt) {
		this.add(new csafe_asn1_ASN1Type(varNum,opt,csafe_asn1_ASN1.ANY));
		return this;
	}
	,BOOLEAN: function(varNum,opt) {
		this.add(new csafe_asn1_ASN1Type(varNum,opt,csafe_asn1_ASN1.BOOLEAN));
		return this;
	}
	,INTEGER: function(varNum,opt) {
		this.add(new csafe_asn1_ASN1Type(varNum,opt,csafe_asn1_ASN1.INTEGER));
		return this;
	}
	,BIT_STRING: function(varNum,opt) {
		this.add(new csafe_asn1_ASN1Type(varNum,opt,csafe_asn1_ASN1.BIT_STRING));
		return this;
	}
	,OCTET_STRING: function(varNum,opt) {
		this.add(new csafe_asn1_ASN1Type(varNum,opt,csafe_asn1_ASN1.OCTET_STRING));
		return this;
	}
	,ObjectIdentifier: function(varNum,opt) {
		this.add(new csafe_asn1_ASN1Type(varNum,opt,csafe_asn1_ASN1.OBJECT_ID));
		return this;
	}
	,ENUMERATED: function(varNum,opt) {
		this.add(new csafe_asn1_ASN1Type(varNum,opt,csafe_asn1_ASN1.ENUMERATED));
		return this;
	}
	,UTF8String: function(varNum,opt) {
		this.add(new csafe_asn1_ASN1Type(varNum,opt,csafe_asn1_ASN1.UTF8String));
		return this;
	}
	,NumericString: function(varNum,opt) {
		this.add(new csafe_asn1_ASN1Type(varNum,opt,csafe_asn1_ASN1.NumericString));
		return this;
	}
	,PrintableString: function(varNum,opt) {
		this.add(new csafe_asn1_ASN1Type(varNum,opt,csafe_asn1_ASN1.PrintableString));
		return this;
	}
	,T61String: function(varNum,opt) {
		this.add(new csafe_asn1_ASN1Type(varNum,opt,csafe_asn1_ASN1.T61String));
		return this;
	}
	,IA5String: function(varNum,opt) {
		this.add(new csafe_asn1_ASN1Type(varNum,opt,csafe_asn1_ASN1.IA5String));
		return this;
	}
	,UTCTime: function(varNum,opt) {
		this.add(new csafe_asn1_ASN1Type(varNum,opt,csafe_asn1_ASN1.UTCTime));
		return this;
	}
	,GeneralizedTime: function(varNum,opt) {
		this.add(new csafe_asn1_ASN1Type(varNum,opt,csafe_asn1_ASN1.GeneralizedTime));
		return this;
	}
	,VisibleString: function(varNum,opt) {
		this.add(new csafe_asn1_ASN1Type(varNum,opt,csafe_asn1_ASN1.VisibleString));
		return this;
	}
	,GeneralString: function(varNum,opt) {
		this.add(new csafe_asn1_ASN1Type(varNum,opt,csafe_asn1_ASN1.GeneralString));
		return this;
	}
	,UNIString: function(varNum,opt) {
		this.add(new csafe_asn1_ASN1Type(varNum,opt,csafe_asn1_ASN1.BMPString));
		return this;
	}
	,NULL: function(varNum,opt) {
		this.add(new csafe_asn1_ASN1Type(varNum,opt,csafe_asn1_ASN1.NULL));
		return this;
	}
	,CLOSE: function() {
		this.focusedType = this.focusedType.parent;
		if(this.focusedType != null && this.focusedType.isContextSpecific) {
			this.CLOSE();
		}
		return this;
	}
	,__class__: csafe_asn1_ASN1TypeBuilder
};
var haxe__$Int64__$_$_$Int64 = function(high,low) {
	this.high = high;
	this.low = low;
};
haxe__$Int64__$_$_$Int64.__name__ = ["haxe","_Int64","___Int64"];
haxe__$Int64__$_$_$Int64.prototype = {
	__class__: haxe__$Int64__$_$_$Int64
};
var haxe__$Int32_Int32_$Impl_$ = {};
haxe__$Int32_Int32_$Impl_$.__name__ = ["haxe","_Int32","Int32_Impl_"];
haxe__$Int32_Int32_$Impl_$.ucompare = function(a,b) {
	if(a < 0) {
		if(b < 0) {
			return ~b - ~a | 0;
		} else {
			return 1;
		}
	}
	if(b < 0) {
		return -1;
	} else {
		return a - b | 0;
	}
};
var csafe_asn1_ObjectID = function(oid,name,shortName) {
	if(shortName == null) {
		shortName = "";
	}
	if(name == null) {
		name = "";
	}
	this.oid = oid;
	this.name = name;
	this.shortName = shortName;
	var fbs = [];
	var tokener = oid.split(".");
	var first = Std.parseInt(tokener[0]) * 40;
	var second = tokener[1];
	var x = Std.parseInt(second) + first;
	var this1 = new haxe__$Int64__$_$_$Int64(x >> 31,x);
	csafe_asn1_ObjectID.writeField(fbs,this1);
	var _g1 = 2;
	var _g = tokener.length;
	while(_g1 < _g) {
		var i = _g1++;
		var x1 = Std.parseInt(tokener[i]);
		var this2 = new haxe__$Int64__$_$_$Int64(x1 >> 31,x1);
		csafe_asn1_ObjectID.writeField(fbs,this2);
	}
	this.encoded = util_ArrayUtil.toBytes(fbs);
};
csafe_asn1_ObjectID.__name__ = ["csafe","asn1","ObjectID"];
csafe_asn1_ObjectID.writeField = function(out,fieldValue) {
	var this1 = new haxe__$Int64__$_$_$Int64(0,127);
	var b = this1;
	var this2 = new haxe__$Int64__$_$_$Int64(fieldValue.high & b.high,fieldValue.low & b.low);
	var result = [this2];
	while(true) {
		var this3 = new haxe__$Int64__$_$_$Int64(0,128);
		var b1 = this3;
		var v = fieldValue.high - b1.high | 0;
		if(v != 0) {
			v = v;
		} else {
			v = haxe__$Int32_Int32_$Impl_$.ucompare(fieldValue.low,b1.low);
		}
		if(!((fieldValue.high < 0 ? b1.high < 0 ? v : -1 : b1.high >= 0 ? v : 1) >= 0)) {
			break;
		}
		var b2 = 7;
		b2 &= 63;
		if(b2 == 0) {
			var this4 = new haxe__$Int64__$_$_$Int64(fieldValue.high,fieldValue.low);
			fieldValue = this4;
		} else if(b2 < 32) {
			var this5 = new haxe__$Int64__$_$_$Int64(fieldValue.high >> b2,fieldValue.high << 32 - b2 | fieldValue.low >>> b2);
			fieldValue = this5;
		} else {
			var this6 = new haxe__$Int64__$_$_$Int64(fieldValue.high >> 31,fieldValue.high >> b2 - 32);
			fieldValue = this6;
		}
		var this7 = new haxe__$Int64__$_$_$Int64(0,127);
		var b3 = this7;
		var this8 = new haxe__$Int64__$_$_$Int64(fieldValue.high & b3.high,fieldValue.low & b3.low);
		var a = this8;
		var this9 = new haxe__$Int64__$_$_$Int64(0,128);
		var b4 = this9;
		var this10 = new haxe__$Int64__$_$_$Int64(a.high | b4.high,a.low | b4.low);
		result.unshift(this10);
	}
	var _g1 = 0;
	var _g = result.length;
	while(_g1 < _g) {
		var i = _g1++;
		var x = result[i];
		if(x.high != x.low >> 31) {
			throw new js__$Boot_HaxeError("Overflow");
		}
		out.push(x.low);
	}
};
csafe_asn1_ObjectID.writeBI = function(out,fieldValue) {
	var byteCount = (fieldValue.bitLength() + 6) / 7 | 0;
	if(byteCount == 0) {
		out.push(0);
	} else {
		var tmpValue = fieldValue;
		var tmp = new haxe_io_Bytes(new ArrayBuffer(byteCount));
		var i = byteCount;
		while(i >= 0) {
			--i;
			var v = tmpValue.toInt32() & 127 | 128;
			tmp.b[i] = v & 255;
			tmpValue = tmpValue.shr(7);
		}
		tmp.b[byteCount - 1] = tmp.b[byteCount - 1] & 127 & 255;
		var _g1 = 0;
		var _g = tmp.length;
		while(_g1 < _g) {
			var k = _g1++;
			out.push(tmp.b[k]);
		}
	}
};
csafe_asn1_ObjectID.resolve = function(oidBytes) {
	var length = oidBytes.length;
	var oid_b = "";
	var i1 = oidBytes.b[0] & 255;
	var j = i1 < 40 ? 0 : i1 < 80 ? 1 : 2;
	var k1 = i1 - j * 40;
	oid_b += Std.string(j + "." + k1);
	--length;
	var i2;
	var k2;
	var absolutePos = 0;
	while(length > 0) {
		oid_b += ".";
		k2 = 0;
		while(true) {
			++absolutePos;
			i2 = oidBytes.b[absolutePos];
			k2 = k2 << 7 | i2 & 127;
			if(!(--length > 0 && (i2 & 128) == 128)) {
				break;
			}
		}
		oid_b += k2 == null ? "null" : "" + k2;
	}
	var key = oid_b;
	var _this = csafe_asn1_ObjectID.table;
	var existOID = __map_reserved[key] != null ? _this.getReserved(key) : _this.h[key];
	if(existOID != null) {
		return existOID;
	}
	return new csafe_asn1_ObjectID(oid_b);
};
csafe_asn1_ObjectID.register = function(oid,name,shortName) {
	var roid = new csafe_asn1_ObjectID(oid,name,shortName);
	var _this = csafe_asn1_ObjectID.table;
	if(__map_reserved[oid] != null) {
		_this.setReserved(oid,roid);
	} else {
		_this.h[oid] = roid;
	}
	return roid;
};
csafe_asn1_ObjectID.prototype = {
	equals: function(oid) {
		var oidString;
		if(typeof(oid) == "string") {
			oidString = oid;
		} else if(js_Boot.__instanceof(oid,csafe_asn1_ObjectID)) {
			oidString = (js_Boot.__cast(oid , csafe_asn1_ObjectID)).oid;
		} else {
			throw new js__$Boot_HaxeError(new Exception("Invalid objectid : " + Std.string(oid)));
		}
		return this.oid == oidString;
	}
	,toString: function() {
		var rv = this.oid + " " + this.name;
		if(this.shortName != null && this.shortName != "") {
			rv += "(" + this.shortName + ")";
		}
		return rv;
	}
	,__class__: csafe_asn1_ObjectID
};
var csafe_asn1_impl_AVA = function(id,value) {
	csafe_asn1_ASN1Constructed.call(this,csafe_asn1_impl_AVA.struct);
	if(id != null) {
		this.getPrimitive("attributeType").setObjectID(id);
		if(value != null) {
			this.setAttributeValue(value);
		}
	}
};
csafe_asn1_impl_AVA.__name__ = ["csafe","asn1","impl","AVA"];
csafe_asn1_impl_AVA.__super__ = csafe_asn1_ASN1Constructed;
csafe_asn1_impl_AVA.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	getAttributeType: function() {
		return this.getPrimitive("attributeType").asObjectID();
	}
	,getValueAsString: function() {
		return (js_Boot.__cast(this.getAny("attributeValue").resolveAsAnony() , csafe_asn1_ASN1Primitive)).asString();
	}
	,setAttributeValue: function(value) {
		if(typeof(value) == "string") {
			var aStr = csafe_asn1_ASN1.TYPE_UTF8String.create();
			aStr.setUTF8String(value);
			this.getAny("attributeValue").anyData = aStr;
		} else if(js_Boot.__instanceof(value,csafe_asn1_ASN1Object)) {
			this.getAny("attributeValue").anyData = value;
		} else {
			throw new js__$Boot_HaxeError(new Exception("Invalid value : " + Std.string(value)));
		}
	}
	,toArray: function() {
		var attrType = this.getAttributeType();
		var name = attrType.shortName;
		if(name == null || "" == name) {
			name = attrType.oid;
		}
		var value;
		var data = this.getAny("attributeValue").resolveAsAnony();
		if(js_Boot.__instanceof(data,csafe_asn1_ASN1Primitive)) {
			value = (js_Boot.__cast(data , csafe_asn1_ASN1Primitive)).asString();
		} else {
			value = data.encode().toHex();
		}
		return [name,value];
	}
	,toString: function() {
		var arr = this.toArray();
		return arr[0] + "=" + arr[1];
	}
	,__class__: csafe_asn1_impl_AVA
});
var csafe_asn1_impl_AlgoImpl = function() {
};
csafe_asn1_impl_AlgoImpl.__name__ = ["csafe","asn1","impl","AlgoImpl"];
csafe_asn1_impl_AlgoImpl.prototype = {
	resolve: function(field) {
		return "Tried to resolve " + field;
	}
	,__class__: csafe_asn1_impl_AlgoImpl
};
var csafe_asn1_impl_AlgorithmID = function(oid,desc,impl) {
	csafe_asn1_ASN1Constructed.call(this,csafe_asn1_impl_AlgorithmID.struct);
	if(oid != null) {
		var objectID;
		if(desc != null) {
			objectID = csafe_asn1_ObjectID.register(oid,desc);
		} else {
			objectID = new csafe_asn1_ObjectID(oid);
		}
		this.setAlgorithm(objectID);
		if(impl != null) {
			var v = impl;
			var _this = csafe_asn1_impl_AlgorithmID.implHintMap;
			var value = v;
			if(__map_reserved[oid] != null) {
				_this.setReserved(oid,value);
			} else {
				_this.h[oid] = value;
			}
		}
		var _this1 = csafe_asn1_impl_AlgorithmID.idMap;
		if(__map_reserved[oid] != null) {
			_this1.setReserved(oid,this);
		} else {
			_this1.h[oid] = this;
		}
		if(desc != null) {
			var _this2 = csafe_asn1_impl_AlgorithmID.idMap;
			if(__map_reserved[desc] != null) {
				_this2.setReserved(desc,this);
			} else {
				_this2.h[desc] = this;
			}
		}
	}
};
csafe_asn1_impl_AlgorithmID.__name__ = ["csafe","asn1","impl","AlgorithmID"];
csafe_asn1_impl_AlgorithmID.derive = function(spec) {
	if(typeof(spec) == "string") {
		var key = js_Boot.__cast(spec , String);
		var _this = csafe_asn1_impl_AlgorithmID.idMap;
		if(__map_reserved[key] != null) {
			return _this.getReserved(key);
		} else {
			return _this.h[key];
		}
	} else if(js_Boot.__instanceof(spec,csafe_asn1_impl_AlgorithmID)) {
		return spec;
	} else {
		throw new js__$Boot_HaxeError(new Exception("Invalid algo derive info : " + Std.string(spec)));
	}
};
csafe_asn1_impl_AlgorithmID.getRandomValues = function(data) {
	csafe_asn1_impl_AlgorithmID.cryptoSubtleImpl.getRandomValues(data);
};
csafe_asn1_impl_AlgorithmID.__super__ = csafe_asn1_ASN1Constructed;
csafe_asn1_impl_AlgorithmID.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	setAlgorithm: function(algo) {
		if(js_Boot.__instanceof(algo,csafe_asn1_impl_AlgorithmID)) {
			this.getPrimitive("algorithm").setObjectID((js_Boot.__cast(algo , csafe_asn1_impl_AlgorithmID)).getAlgorithm());
		} else if(js_Boot.__instanceof(algo,csafe_asn1_ObjectID)) {
			this.getPrimitive("algorithm").setObjectID(algo);
		} else if(typeof(algo) == "string") {
			this.getPrimitive("algorithm").setObjectID(new csafe_asn1_ObjectID(algo));
		} else {
			throw new js__$Boot_HaxeError(new Exception("Invalid algorithm type : " + Std.string(algo)));
		}
		if(!this.getAny("parameter").hasContent()) {
			this.getAny("parameter").setNull();
		}
	}
	,getAlgorithm: function() {
		return this.getPrimitive("algorithm").asObjectID();
	}
	,getParameter: function() {
		return this.getAny("parameter");
	}
	,setParameter: function(parameters) {
		this.setASN1("parameter",parameters);
	}
	,equalsOID: function(algo) {
		if(js_Boot.__instanceof(algo,csafe_asn1_impl_AlgorithmID)) {
			return this.getAlgorithm().equals((js_Boot.__cast(algo , csafe_asn1_impl_AlgorithmID)).getAlgorithm());
		} else {
			return this.getAlgorithm().equals(algo);
		}
	}
	,getMech: function() {
		var this1 = csafe_asn1_impl_AlgorithmID.implHintMap;
		var key = this.getAlgorithm().oid;
		var _this = this1;
		if((__map_reserved[key] != null ? _this.getReserved(key) : _this.h[key]) == null) {
			return null;
		}
		var this2 = csafe_asn1_impl_AlgorithmID.implHintMap;
		var key1 = this.getAlgorithm().oid;
		var _this1 = this2;
		return (__map_reserved[key1] != null ? _this1.getReserved(key1) : _this1.h[key1]).procMech;
	}
	,getCipherName: function() {
		var this1 = csafe_asn1_impl_AlgorithmID.implHintMap;
		var key = this.getAlgorithm().oid;
		var _this = this1;
		if((__map_reserved[key] != null ? _this.getReserved(key) : _this.h[key]) == null) {
			return null;
		}
		var this2 = csafe_asn1_impl_AlgorithmID.implHintMap;
		var key1 = this.getAlgorithm().oid;
		var _this1 = this2;
		return (__map_reserved[key1] != null ? _this1.getReserved(key1) : _this1.h[key1]).cipherName;
	}
	,getSignName: function() {
		var this1 = csafe_asn1_impl_AlgorithmID.implHintMap;
		var key = this.getAlgorithm().oid;
		var _this = this1;
		if((__map_reserved[key] != null ? _this.getReserved(key) : _this.h[key]) == null) {
			return null;
		}
		var this2 = csafe_asn1_impl_AlgorithmID.implHintMap;
		var key1 = this.getAlgorithm().oid;
		var _this1 = this2;
		return (__map_reserved[key1] != null ? _this1.getReserved(key1) : _this1.h[key1]).signName;
	}
	,getDigestName: function() {
		var this1 = csafe_asn1_impl_AlgorithmID.implHintMap;
		var key = this.getAlgorithm().oid;
		var _this = this1;
		if((__map_reserved[key] != null ? _this.getReserved(key) : _this.h[key]) == null) {
			return null;
		}
		var this2 = csafe_asn1_impl_AlgorithmID.implHintMap;
		var key1 = this.getAlgorithm().oid;
		var _this1 = this2;
		return (__map_reserved[key1] != null ? _this1.getReserved(key1) : _this1.h[key1]).hashName;
	}
	,getIHash: function() {
		if(this.equalsOID(csafe_asn1_impl_AlgorithmID.sha1)) {
			return new csafe_crypto_hash_Sha1();
		} else if(this.equalsOID(csafe_asn1_impl_AlgorithmID.sha256)) {
			return new csafe_crypto_hash_Sha256();
		}
		throw new js__$Boot_HaxeError(new Exception("Invalid ihash oid : " + this.getAlgorithm().oid));
	}
	,encrypt: function(key,data,parameter,rHandle) {
		csafe_asn1_impl_AlgorithmID.cryptoSubtleImpl.encrypt(this,key,data,parameter,rHandle);
		return;
	}
	,decrypt: function(key,data,parameter,rHandle) {
		csafe_asn1_impl_AlgorithmID.cryptoSubtleImpl.decrypt(this,key,data,parameter,rHandle);
		return;
	}
	,sign: function(key,data,rHandle) {
		csafe_asn1_impl_AlgorithmID.cryptoSubtleImpl.sign(this,key,data,rHandle);
		return;
	}
	,verify: function(key,signature,data,rHandle) {
		csafe_asn1_impl_AlgorithmID.cryptoSubtleImpl.verify(this,key,signature,data,rHandle);
		return;
	}
	,digest: function(data,rHandle) {
		csafe_asn1_impl_AlgorithmID.cryptoSubtleImpl.digest(this,data,rHandle);
		return;
	}
	,generateKey: function(parameter,rHandle) {
		csafe_asn1_impl_AlgorithmID.cryptoSubtleImpl.generateKey(this,parameter,rHandle);
		return;
	}
	,deriveKey: function(baseKey,derivedKeyType,rHandle) {
		csafe_asn1_impl_AlgorithmID.cryptoSubtleImpl.deriveKey(this,baseKey,derivedKeyType,rHandle);
		return;
	}
	,deriveBits: function(baseKey,length,rHandle) {
		csafe_asn1_impl_AlgorithmID.cryptoSubtleImpl.deriveBits(this,baseKey,length,rHandle);
		return;
	}
	,importKey: function(keyData,rHandle) {
		csafe_asn1_impl_AlgorithmID.cryptoSubtleImpl.importKey(this,keyData,rHandle);
		return;
	}
	,exportKey: function(format,key,rHandle) {
		csafe_asn1_impl_AlgorithmID.cryptoSubtleImpl.exportKey(this,format,key,rHandle);
		return;
	}
	,wrapKey: function(key,wrappingKey,rHandle) {
		csafe_asn1_impl_AlgorithmID.cryptoSubtleImpl.wrapKey(this,key,wrappingKey,rHandle);
		return;
	}
	,unwrapKey: function(wrappedKey,unwrappingKey,rHandle) {
		csafe_asn1_impl_AlgorithmID.cryptoSubtleImpl.unwrapKey(this,wrappedKey,unwrappingKey,rHandle);
		return;
	}
	,__class__: csafe_asn1_impl_AlgorithmID
});
var csafe_asn1_impl_Attribute = function(id,value) {
	csafe_asn1_ASN1Constructed.call(this,csafe_asn1_impl_Attribute.struct);
	if(id != null) {
		this.getPrimitive("attributeType").setObjectID(id);
	}
	if(value != null) {
		this.getMultiple("attributes").addData(value);
	}
};
csafe_asn1_impl_Attribute.__name__ = ["csafe","asn1","impl","Attribute"];
csafe_asn1_impl_Attribute.__super__ = csafe_asn1_ASN1Constructed;
csafe_asn1_impl_Attribute.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	getAttributeType: function() {
		return this.getPrimitive("attributeType").asObjectID();
	}
	,getFirstValue: function() {
		return this.getMultiple("attributes").getFirstElem(0);
	}
	,getFirstValueAsType: function(typ) {
		return this.getFirstValue().resolveAsKnownType(typ);
	}
	,getValues: function() {
		return this.getMultiple("attributes");
	}
	,__class__: csafe_asn1_impl_Attribute
});
var csafe_asn1_impl_ChoiceOfTime = function() {
	csafe_asn1_ASN1Choice.call(this,csafe_asn1_impl_ChoiceOfTime.struct);
};
csafe_asn1_impl_ChoiceOfTime.__name__ = ["csafe","asn1","impl","ChoiceOfTime"];
csafe_asn1_impl_ChoiceOfTime.__super__ = csafe_asn1_ASN1Choice;
csafe_asn1_impl_ChoiceOfTime.prototype = $extend(csafe_asn1_ASN1Choice.prototype,{
	getDate: function() {
		return (js_Boot.__cast(this.choiced , csafe_asn1_ASN1Primitive)).asDate();
	}
	,setDate: function(date) {
		if(date == null) {
			date = new Date();
		}
		if(this.choiced == null) {
			this.selectType(csafe_asn1_ASN1.UTCTime);
		}
		(js_Boot.__cast(this.choiced , csafe_asn1_ASN1Primitive)).setUTCTime(date);
	}
	,__class__: csafe_asn1_impl_ChoiceOfTime
});
var csafe_asn1_impl_DisplayText = function() {
	csafe_asn1_ASN1Choice.call(this,csafe_asn1_impl_DisplayText.struct);
};
csafe_asn1_impl_DisplayText.__name__ = ["csafe","asn1","impl","DisplayText"];
csafe_asn1_impl_DisplayText.__super__ = csafe_asn1_ASN1Choice;
csafe_asn1_impl_DisplayText.prototype = $extend(csafe_asn1_ASN1Choice.prototype,{
	toString: function() {
		return (js_Boot.__cast(this.choiced , csafe_asn1_ASN1Primitive)).asString();
	}
	,__class__: csafe_asn1_impl_DisplayText
});
var csafe_asn1_impl_OtherName = function() {
	csafe_asn1_ASN1Constructed.call(this,csafe_asn1_impl_OtherName.struct);
};
csafe_asn1_impl_OtherName.__name__ = ["csafe","asn1","impl","OtherName"];
csafe_asn1_impl_OtherName.__super__ = csafe_asn1_ASN1Constructed;
csafe_asn1_impl_OtherName.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	getTypeID: function() {
		return this.getPrimitive("type_id").asObjectID();
	}
	,toString: function() {
		var sb_b = "";
		sb_b += "type-id : ";
		sb_b += Std.string(this.getTypeID().oid);
		sb_b += Std.string(this.getAny("value").toTreeString());
		return sb_b;
	}
	,__class__: csafe_asn1_impl_OtherName
});
var csafe_asn1_impl_RDN = function(arg0,arg1) {
	csafe_asn1_ASN1Multiple.call(this,csafe_asn1_impl_RDN.struct);
	this.addAVA(arg0,arg1);
};
csafe_asn1_impl_RDN.__name__ = ["csafe","asn1","impl","RDN"];
csafe_asn1_impl_RDN.__super__ = csafe_asn1_ASN1Multiple;
csafe_asn1_impl_RDN.prototype = $extend(csafe_asn1_ASN1Multiple.prototype,{
	addAVA: function(arg0,arg1) {
		if(arg0 != null) {
			if(js_Boot.__instanceof(arg0,csafe_asn1_ASN1Object)) {
				this.addData(arg0);
			} else if(js_Boot.__instanceof(arg0,csafe_asn1_ObjectID)) {
				if(arg1 != null) {
					this.addData(new csafe_asn1_impl_AVA(arg0,arg1));
				} else {
					throw new js__$Boot_HaxeError(new Exception("Invalid parameter. value is null"));
				}
			}
		}
	}
	,getAVA: function(oid) {
		if(oid != null) {
			var _g1 = 0;
			var _g = this.multiple.length;
			while(_g1 < _g) {
				var i = _g1++;
				var ava = this.getFirstElem(i);
				if(ava.getAttributeType().equals(oid)) {
					return ava;
				}
			}
			return null;
		} else {
			return this.multiple[0][0];
		}
	}
	,toArray: function() {
		var sb = [];
		if(this.multiple.length > 0) {
			var _g1 = 0;
			var _g = this.multiple.length;
			while(_g1 < _g) {
				var i = _g1++;
				sb.push((js_Boot.__cast(this.getFirstElem(i) , csafe_asn1_impl_AVA)).toArray());
			}
		}
		return sb;
	}
	,toString: function() {
		var sb = [];
		if(this.multiple.length > 0) {
			var _g1 = 0;
			var _g = this.multiple.length;
			while(_g1 < _g) {
				var i = _g1++;
				var ii = this.multiple.length - 1 - i;
				sb.push((js_Boot.__cast(this.getFirstElem(ii) , csafe_asn1_impl_AVA)).toString());
				sb.push(", ");
			}
			sb.pop();
		}
		return sb.join("");
	}
	,__class__: csafe_asn1_impl_RDN
});
var csafe_asn1_impl_Name = function() {
	csafe_asn1_ASN1Multiple.call(this,csafe_asn1_impl_Name.struct);
};
csafe_asn1_impl_Name.__name__ = ["csafe","asn1","impl","Name"];
csafe_asn1_impl_Name.__super__ = csafe_asn1_ASN1Multiple;
csafe_asn1_impl_Name.prototype = $extend(csafe_asn1_ASN1Multiple.prototype,{
	addRDN: function(arg0,arg1) {
		if(js_Boot.__instanceof(arg0,csafe_asn1_ObjectID) && arg1 != null) {
			this.addData(new csafe_asn1_impl_RDN(arg0,arg1));
		} else if(js_Boot.__instanceof(arg0,csafe_asn1_impl_RDN)) {
			this.addData(arg0);
		} else {
			throw new js__$Boot_HaxeError(new Exception("Invalid rdn arguments"));
		}
	}
	,getRDN: function(oid) {
		var rdns = this.getRDNs(oid);
		if(rdns != null && rdns.length > 0) {
			return rdns[0];
		}
		return null;
	}
	,getRDNs: function(oid) {
		var arr = [];
		var _g1 = 0;
		var _g = this.multiple.length;
		while(_g1 < _g) {
			var i = _g1++;
			var rdn = this.getFirstElem(i);
			var ava = rdn.getAVA(oid);
			if(ava != null) {
				arr.push(ava.getValueAsString());
			}
		}
		return arr;
	}
	,toArray: function() {
		var arr = [];
		var _g1 = 0;
		var _g = this.multiple.length;
		while(_g1 < _g) {
			var i = _g1++;
			var rdn = js_Boot.__cast(this.getFirstElem(i) , csafe_asn1_impl_RDN);
			var rndArr = rdn.toArray();
			var _g3 = 0;
			var _g2 = rndArr.length;
			while(_g3 < _g2) {
				var r = _g3++;
				arr.push(rndArr[r]);
			}
		}
		return arr;
	}
	,toString: function(reverse) {
		if(reverse == null) {
			reverse = true;
		}
		var sb = [];
		var _g1 = 0;
		var _g = this.multiple.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(reverse) {
				sb.push((js_Boot.__cast(this.getFirstElem(this.multiple.length - i - 1) , csafe_asn1_impl_RDN)).toString());
			} else {
				sb.push((js_Boot.__cast(this.getFirstElem(i) , csafe_asn1_impl_RDN)).toString());
			}
			sb.push(",");
		}
		sb.pop();
		return sb.join("");
	}
	,__class__: csafe_asn1_impl_Name
});
var csafe_asn1_impl_GeneralName = function() {
	csafe_asn1_ASN1Choice.call(this,csafe_asn1_impl_GeneralName.struct);
};
csafe_asn1_impl_GeneralName.__name__ = ["csafe","asn1","impl","GeneralName"];
csafe_asn1_impl_GeneralName.__super__ = csafe_asn1_ASN1Choice;
csafe_asn1_impl_GeneralName.prototype = $extend(csafe_asn1_ASN1Choice.prototype,{
	getName: function() {
		var rv = (js_Boot.__cast(this.choiced , csafe_asn1_ASN1ConSpec)).spec;
		if(js_Boot.__instanceof(rv,csafe_asn1_ASN1Primitive)) {
			return (js_Boot.__cast(rv , csafe_asn1_ASN1Primitive)).asString();
		} else {
			try {
				return Reflect.field(rv,"toString").apply(rv,[]);
			} catch( e ) {
				if (e instanceof js__$Boot_HaxeError) e = e.val;
				return "error : " + Std.string(e);
			}
		}
	}
	,toString: function() {
		var gnType = csafe_asn1_impl_GeneralName.names[this.choiced.asn1Type.tagNum];
		if(gnType == null) {
			gnType = "Unknown";
		}
		return gnType + " : " + this.getName();
	}
	,__class__: csafe_asn1_impl_GeneralName
});
var csafe_asn1_impl_GeneralNames = function() {
	csafe_asn1_ASN1Multiple.call(this,csafe_asn1_impl_GeneralNames.struct);
};
csafe_asn1_impl_GeneralNames.__name__ = ["csafe","asn1","impl","GeneralNames"];
csafe_asn1_impl_GeneralNames.__super__ = csafe_asn1_ASN1Multiple;
csafe_asn1_impl_GeneralNames.prototype = $extend(csafe_asn1_ASN1Multiple.prototype,{
	toString: function() {
		var sb = [];
		var _g1 = 0;
		var _g = this.multiple.length;
		while(_g1 < _g) {
			var i = _g1++;
			sb.push((js_Boot.__cast(this.multiple[i][0] , csafe_asn1_impl_GeneralName)).toString());
		}
		return sb.join("");
	}
	,__class__: csafe_asn1_impl_GeneralNames
});
var csafe_asn1_impl_DistributionPoint = function() {
	csafe_asn1_ASN1Multiple.call(this,csafe_asn1_impl_DistributionPoint.struct);
};
csafe_asn1_impl_DistributionPoint.__name__ = ["csafe","asn1","impl","DistributionPoint"];
csafe_asn1_impl_DistributionPoint.__super__ = csafe_asn1_ASN1Multiple;
csafe_asn1_impl_DistributionPoint.prototype = $extend(csafe_asn1_ASN1Multiple.prototype,{
	getDistributionPointName: function() {
		if(this.getASN1("distributionPoint").hasContent()) {
			var rv = (js_Boot.__cast(this.getChoice("distributionPoint").choiced , csafe_asn1_ASN1ConSpec)).spec;
			return Reflect.field(rv,"toString").apply(rv,[]);
		}
		return null;
	}
	,getCRLIssuer: function() {
		return this.getASN1("cRLIssuer");
	}
	,getReasons: function() {
		if(this.getASN1("reasons").hasContent()) {
			return this.getPrimitive("reasons").asBooleanArray();
		}
		return null;
	}
	,toString: function() {
		var fsb = [];
		fsb.push("배포지점 : " + this.getDistributionPointName() + "\n");
		var reasons = this.getReasons();
		if(reasons != null) {
			var _g1 = 0;
			var _g = reasons.length;
			while(_g1 < _g) {
				var i = _g1++;
				if(reasons[i]) {
					fsb.push(" ");
					fsb.push(csafe_asn1_impl_DistributionPoint.reasonStrings[i]);
				}
			}
			fsb.push("\n");
		}
		var gNames = this.getCRLIssuer();
		if(gNames != null) {
			fsb.push("CRL 발급자 : " + gNames.toString() + "\n");
		}
		return fsb.join("");
	}
	,__class__: csafe_asn1_impl_DistributionPoint
});
var csafe_asn1_impl_IssuerAndSerialNumber = function() {
	csafe_asn1_ASN1Constructed.call(this,csafe_asn1_impl_IssuerAndSerialNumber.struct);
};
csafe_asn1_impl_IssuerAndSerialNumber.__name__ = ["csafe","asn1","impl","IssuerAndSerialNumber"];
csafe_asn1_impl_IssuerAndSerialNumber.fromCertificate = function(cert) {
	var r = new csafe_asn1_impl_IssuerAndSerialNumber();
	r.set(cert);
	return r;
};
csafe_asn1_impl_IssuerAndSerialNumber.__super__ = csafe_asn1_ASN1Constructed;
csafe_asn1_impl_IssuerAndSerialNumber.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	set: function(cert) {
		this.setASN1("issuerDN",cert.getIssuerDN());
		this.getPrimitive("serialNumber").setInteger(cert.getSerialNumber());
	}
	,__class__: csafe_asn1_impl_IssuerAndSerialNumber
});
var csafe_asn1_impl_NoticeReference = function() {
	csafe_asn1_ASN1Constructed.call(this,csafe_asn1_impl_NoticeReference.struct);
};
csafe_asn1_impl_NoticeReference.__name__ = ["csafe","asn1","impl","NoticeReference"];
csafe_asn1_impl_NoticeReference.__super__ = csafe_asn1_ASN1Constructed;
csafe_asn1_impl_NoticeReference.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	getOrganization: function() {
		return this.getASN1("organization");
	}
	,getNoticeNumbers: function() {
		var numbers = this.getMultiple("noticeNumbers");
		var rInts = [];
		var _g1 = 0;
		var _g = numbers.multiple.length;
		while(_g1 < _g) {
			var i = _g1++;
			rInts.push((js_Boot.__cast(numbers.multiple[i][0] , csafe_asn1_ASN1Primitive)).asInteger());
		}
		return rInts;
	}
	,toString: function() {
		var fsb = [];
		fsb.push("기관명 : " + Std.string(this.getOrganization()) + "\n");
		var noticeNumbers = this.getNoticeNumbers();
		fsb.push("공지번호 [ ");
		var _g1 = 0;
		var _g = noticeNumbers.length;
		while(_g1 < _g) {
			var i = _g1++;
			fsb.push(noticeNumbers[i]);
			fsb.push(" ");
		}
		fsb.push("]");
		return fsb.join("");
	}
	,__class__: csafe_asn1_impl_NoticeReference
});
var csafe_asn1_impl_PolicyQualifierInfo = function() {
	csafe_asn1_ASN1Constructed.call(this,csafe_asn1_impl_PolicyQualifierInfo.struct);
};
csafe_asn1_impl_PolicyQualifierInfo.__name__ = ["csafe","asn1","impl","PolicyQualifierInfo"];
csafe_asn1_impl_PolicyQualifierInfo.__super__ = csafe_asn1_ASN1Constructed;
csafe_asn1_impl_PolicyQualifierInfo.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	getUserNotice: function() {
		return this.getAny("qualifier").resolveAsKnownType(csafe_asn1_impl_UserNotice.struct);
	}
	,getPolicyQualifierID: function() {
		return this.getPrimitive("policyQualifierId").asObjectID();
	}
	,getCPSuri: function() {
		return (js_Boot.__cast(this.getAny("qualifier").resolveAsKnownType(csafe_asn1_ASN1.TYPE_IA5String) , csafe_asn1_ASN1Primitive)).asString();
	}
	,toString: function() {
		var fsb = [];
		var policyQualifierId = this.getPolicyQualifierID();
		fsb.push("정책 한정 구분 : " + Std.string(policyQualifierId) + "\n");
		if(csafe_asn1_ObjectID.id_pkix_cps.equals(policyQualifierId)) {
			try {
				fsb.push("CPSURI : " + this.getCPSuri() + "\n");
			} catch( e ) {
				if (e instanceof js__$Boot_HaxeError) e = e.val;
				if( js_Boot.__instanceof(e,Exception) ) {
					fsb.push(Std.string(e));
				} else throw(e);
			}
		} else if(csafe_asn1_ObjectID.id_pkix_unotice.equals(policyQualifierId)) {
			try {
				var userNotice = this.getUserNotice();
				fsb.push(userNotice.toString());
			} catch( e1 ) {
				if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
				fsb.push(Std.string(e1));
			}
		} else {
			fsb.push("Unknown : " + Std.string($bind(policyQualifierId,policyQualifierId.toString)));
		}
		return fsb.join("");
	}
	,__class__: csafe_asn1_impl_PolicyQualifierInfo
});
var csafe_asn1_impl_PolicyInformation = function() {
	csafe_asn1_ASN1Constructed.call(this,csafe_asn1_impl_PolicyInformation.struct);
};
csafe_asn1_impl_PolicyInformation.__name__ = ["csafe","asn1","impl","PolicyInformation"];
csafe_asn1_impl_PolicyInformation.__super__ = csafe_asn1_ASN1Constructed;
csafe_asn1_impl_PolicyInformation.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	getPolicyIdentifier: function() {
		return this.getPrimitive("policyIdentifier").asObjectID();
	}
	,getPolicyQualifiers: function() {
		return this.getMultiple("policyQualifiers").getInstances();
	}
	,toString: function() {
		var sb = [];
		sb.push("정책 식별자: " + Std.string(this.getPolicyIdentifier()) + "\n");
		var policyQualifiers = this.getPolicyQualifiers();
		if(policyQualifiers != null) {
			var _g1 = 0;
			var _g = policyQualifiers.length;
			while(_g1 < _g) {
				var i = _g1++;
				sb.push("정책 한정자[" + i + "]: " + policyQualifiers[i].toString() + "\n");
			}
		}
		return sb.join("");
	}
	,__class__: csafe_asn1_impl_PolicyInformation
});
var csafe_asn1_impl_UserNotice = function() {
	csafe_asn1_ASN1Constructed.call(this,csafe_asn1_impl_UserNotice.struct);
};
csafe_asn1_impl_UserNotice.__name__ = ["csafe","asn1","impl","UserNotice"];
csafe_asn1_impl_UserNotice.__super__ = csafe_asn1_ASN1Constructed;
csafe_asn1_impl_UserNotice.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	getNoticeRef: function() {
		if(this.getASN1("noticeRef").hasContent()) {
			return this.getASN1("noticeRef");
		}
		return null;
	}
	,getExplicitText: function() {
		if(this.getASN1("explicitText").hasContent()) {
			return this.getASN1("explicitText");
		}
		return null;
	}
	,toString: function() {
		var fsb = [];
		if(this.getNoticeRef() != null) {
			fsb.push(Std.string(this.getNoticeRef()) + "\n");
		}
		if(this.getExplicitText() != null) {
			fsb.push("사용자알림 : " + Std.string(this.getExplicitText()));
		}
		return fsb.toString();
	}
	,__class__: csafe_asn1_impl_UserNotice
});
var csafe_asn1_impl_Validity = function() {
	csafe_asn1_ASN1Constructed.call(this,csafe_asn1_impl_Validity.struct);
};
csafe_asn1_impl_Validity.__name__ = ["csafe","asn1","impl","Validity"];
csafe_asn1_impl_Validity.__super__ = csafe_asn1_ASN1Constructed;
csafe_asn1_impl_Validity.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	__class__: csafe_asn1_impl_Validity
});
var csafe_asn1_kospec_VID = function() {
	csafe_asn1_ASN1Constructed.call(this,csafe_asn1_kospec_VID.struct);
};
csafe_asn1_kospec_VID.__name__ = ["csafe","asn1","kospec","VID"];
csafe_asn1_kospec_VID.__super__ = csafe_asn1_ASN1Constructed;
csafe_asn1_kospec_VID.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	internal: function(algId,idn,r) {
		this.setASN1("hashAlgorithm",algId);
		var vid = this.generateVID(algId,idn,r);
		this.getPrimitive("virtualID").setOctetString(vid);
	}
	,generateVID: function(algId,idn,r) {
		var hashContent = new csafe_asn1_kospec_HashContent(idn,r);
		var hash = algId.getIHash();
		var firstHash = hash.calculate(hashContent.encode());
		var secondHash = hash.calculate(firstHash);
		return secondHash;
	}
	,__class__: csafe_asn1_kospec_VID
});
var csafe_asn1_kospec_EncryptContent = function(vid,r) {
	csafe_asn1_ASN1Constructed.call(this,csafe_asn1_kospec_EncryptContent.struct);
	if(vid != null) {
		this.setASN1("vid",vid);
	}
	if(r != null) {
		this.getPrimitive("randomNum").setBitString(r);
	}
};
csafe_asn1_kospec_EncryptContent.__name__ = ["csafe","asn1","kospec","EncryptContent"];
csafe_asn1_kospec_EncryptContent.__super__ = csafe_asn1_ASN1Constructed;
csafe_asn1_kospec_EncryptContent.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	__class__: csafe_asn1_kospec_EncryptContent
});
var csafe_asn1_kospec_EncryptedVID = function() {
	csafe_asn1_ASN1Constructed.call(this,csafe_asn1_kospec_EncryptedVID.struct);
};
csafe_asn1_kospec_EncryptedVID.__name__ = ["csafe","asn1","kospec","EncryptedVID"];
csafe_asn1_kospec_EncryptedVID.__super__ = csafe_asn1_ASN1Constructed;
csafe_asn1_kospec_EncryptedVID.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	set: function(hashAlg,encAlg,isan,idn,r,pubKey,rHandle) {
		var _gthis = this;
		haxe_Log.trace("tryCall : " + "EncryptedVID.set",{ fileName : "ResultHandler.hx", lineNumber : 121, className : "common.ResultHandler", methodName : "tryCall", customParams : [{ fileName : "EncryptedVID.hx", lineNumber : 80, className : "csafe.asn1.kospec.EncryptedVID", methodName : "set"}]});
		try {
			_gthis.getPrimitive("version").setInteger(0);
			var vid = new csafe_asn1_kospec_VID();
			vid.internal(hashAlg,idn,r);
			_gthis.setASN1("vidHashAlg",hashAlg);
			_gthis.setASN1("vidEncAlg",encAlg);
			_gthis.setASN1("certID",isan);
			var encContent = new csafe_asn1_kospec_EncryptContent(vid,r);
			var x509PubKey = csafe_x509_X509PublicKeyInfo.struct.create(null,pubKey);
			var pubKeyBytes = x509PubKey.getPrimitive("publicKey").asByteArray();
			var cipher = csafe_crypto_cipher_asymm_rsa_RSA.ofASN1(csafe_asn1_ASN1.decode(null,pubKeyBytes));
			var encrypted = cipher.encrypt(encContent.encode());
			_gthis.getPrimitive("encryptedContent").setOctetString(encrypted);
			rHandle.onOk();
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			rHandle.onErr(e);
		}
	}
	,__class__: csafe_asn1_kospec_EncryptedVID
});
var csafe_asn1_kospec_HashContent = function(idn,r) {
	csafe_asn1_ASN1Constructed.call(this,csafe_asn1_kospec_HashContent.struct);
	if(idn != null || r != null) {
		this.set(idn,r);
	}
};
csafe_asn1_kospec_HashContent.__name__ = ["csafe","asn1","kospec","HashContent"];
csafe_asn1_kospec_HashContent.__super__ = csafe_asn1_ASN1Constructed;
csafe_asn1_kospec_HashContent.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	set: function(idn,r) {
		this.getPrimitive("idn").setString(idn);
		this.getPrimitive("randomNum").setBitString(r);
	}
	,__class__: csafe_asn1_kospec_HashContent
});
var csafe_cmp_CMPClient = function(context,transport) {
	this.context = context;
	this.transport = transport;
};
csafe_cmp_CMPClient.__name__ = ["csafe","cmp","CMPClient"];
csafe_cmp_CMPClient.prototype = {
	issueCertificate: function(rHandle) {
		var _gthis = this;
		if(this.context.get_newSvMech() == null) {
			rHandle.onErr("need_nsav");
			return;
		}
		haxe_Log.trace("tryCall : " + "CMPClient.issueCertificate",{ fileName : "ResultHandler.hx", lineNumber : 121, className : "common.ResultHandler", methodName : "tryCall", customParams : [{ fileName : "CMPClient.hx", lineNumber : 40, className : "csafe.cmp.CMPClient", methodName : "issueCertificate"}]});
		try {
			_gthis.context.generateGENM(false,null,rHandle.chain("CMPClient.generateGENM(false)").ok(function(genm) {
				_gthis.transport.doRequest(genm,rHandle.chain("CMPClient.issueCertificate.request").ok(function(transResp) {
					var asn1FreeTexts = transResp.getASN1("header").getMultiple("freeText").getInstances();
					var _g = 0;
					while(_g < asn1FreeTexts.length) {
						var asn1FT = asn1FreeTexts[_g];
						++_g;
						haxe_Log.trace("GeneralMessage Response FreeText : " + (js_Boot.__cast(asn1FT , csafe_asn1_ASN1Primitive)).asString(),{ fileName : "CMPClient.hx", lineNumber : 50, className : "csafe.cmp.CMPClient", methodName : "issueCertificate"});
					}
					var body = transResp.getASN1("body");
					var bodyConSpec = js_Boot.__cast(body.getChoiced() , csafe_asn1_ASN1ConSpec);
					var bodyTag = body.getChoiced().getType().tagNum;
					if(bodyTag == csafe_cmp_PKIBody.error) {
						var errorMsg = js_Boot.__cast(bodyConSpec.spec , csafe_cmp_ErrorMsgContent);
						var pkiStatus = js_Boot.__cast(errorMsg.getASN1("pkiStatusInfo") , csafe_cmp_PKIStatusInfo);
						var pkiStatusCode = pkiStatus.getPrimitive("status").asInteger();
						var error = null;
						if(pkiStatusCode != 0) {
							if(pkiStatusCode == 2) {
								error = { code : "wrong_cmp_refnum", message : errorMsg.toString("euc-kr")};
							} else {
								error = errorMsg.toString("euc-kr");
							}
						}
						if(error != null) {
							haxe_Log.trace(error,{ fileName : "CMPClient.hx", lineNumber : 73, className : "csafe.cmp.CMPClient", methodName : "issueCertificate"});
							rHandle.onErr(error);
							return;
						}
					} else if(bodyTag != csafe_cmp_PKIBody.genp) {
						var tmp = "Expected response not generalResponse : " + csafe_cmp_PKIBody.toString(bodyTag);
						rHandle.onErr(tmp);
						return;
					}
					var tmp1 = csafe_cmp_PKIBody.genp;
					var tmp2 = rHandle.chain("CMPClient.issueCertificate.consumeResponse").ok(function() {
						var respGenMsg = js_Boot.__cast(bodyConSpec.spec , csafe_cmp_GenMsgContent);
						var _g1 = 0;
						var _g11 = respGenMsg.getInstances();
						while(_g1 < _g11.length) {
							var iter = _g11[_g1];
							++_g1;
							var itv = iter;
							var itvType = itv.getPrimitive("type").asObjectID();
							if(csafe_cmp_GenMsgContent.CAProtEncCert.equals(itv.getPrimitive("type").asObjectID())) {
								_gthis.context.set_caSignCert(itv.getAny("value").resolveAsKnownType(csafe_x509_X509Certificate.struct));
								_gthis.context.get_caSignCert().toString();
							} else if(csafe_cmp_GenMsgContent.KCMPEncCert.equals(itvType)) {
								_gthis.context.set_caEncCert(itv.getAny("value").resolveAsKnownType(csafe_x509_X509Certificate.struct));
								_gthis.context.get_caEncCert().toString();
							}
						}
						_gthis.context.generateIR(_gthis.context,rHandle.chain("CMPClient.issueCertificate.genearteIR").ok(function(irMsg) {
							_gthis.transport.doRequest(irMsg,rHandle.chain("CMPClient.issueCertificate.sendIR").ok(function(ipMsg) {
								_gthis.context.set_recipNonce(ipMsg.getASN1("header").getPrimitive("senderNonce").asByteArray());
								_gthis.context.set_senderNonce(ipMsg.getASN1("header").getPrimitive("recipNonce").asByteArray());
								var body1 = (js_Boot.__cast(ipMsg.getChoice("body").getChoiced() , csafe_asn1_ASN1ConSpec)).spec;
								var certRep = body1.getMultiple("response").getFirstElem(0);
								var pkiStatus1 = js_Boot.__cast(certRep.getASN1("status") , csafe_cmp_PKIStatusInfo);
								var pkiStatusCode1 = pkiStatus1.getPrimitive("status").asInteger();
								var error1 = null;
								if(pkiStatusCode1 != 0) {
									if(pkiStatusCode1 == 2) {
										error1 = { code : "wrong_cmp_authcode", message : pkiStatus1.toString("euc-kr")};
									} else {
										error1 = pkiStatus1.toString("euc-kr");
									}
								}
								if(error1 != null) {
									haxe_Log.trace(error1,{ fileName : "CMPClient.hx", lineNumber : 118, className : "csafe.cmp.CMPClient", methodName : "issueCertificate"});
									rHandle.onErr(error1);
									return;
								}
								var certifiedKeyPair = certRep.getASN1("certifiedKeyPair");
								var certOrEncCert = certifiedKeyPair.getASN1("certOrEncCert");
								var finIssuedCertCry = certOrEncCert.getASN1("certificate");
								rHandle.onOk(finIssuedCertCry);
							},{ fileName : "CMPClient.hx", lineNumber : 100, className : "csafe.cmp.CMPClient", methodName : "issueCertificate"}));
						},{ fileName : "CMPClient.hx", lineNumber : 97, className : "csafe.cmp.CMPClient", methodName : "issueCertificate"}));
					},{ fileName : "CMPClient.hx", lineNumber : 82, className : "csafe.cmp.CMPClient", methodName : "issueCertificate"});
					_gthis.consumeResponse(tmp1,transResp,tmp2);
				},{ fileName : "CMPClient.hx", lineNumber : 45, className : "csafe.cmp.CMPClient", methodName : "issueCertificate"}));
			},{ fileName : "CMPClient.hx", lineNumber : 43, className : "csafe.cmp.CMPClient", methodName : "issueCertificate"}));
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			rHandle.onErr(e);
		}
	}
	,isError: function() {
	}
	,doConfirm: function(rHandle,isKup) {
		if(isKup == null) {
			isKup = false;
		}
		var _gthis = this;
		this.context.generateConf(isKup,null,rHandle.chain("CMPClient.doConfirm.genearteConf").ok(function(conf) {
			_gthis.transport.doRequest(conf,rHandle,true);
		},{ fileName : "CMPClient.hx", lineNumber : 144, className : "csafe.cmp.CMPClient", methodName : "doConfirm"}));
	}
	,updateCertificate: function(rHandle) {
		var _gthis = this;
		haxe_Log.trace("tryCall : " + "CMPClient.updateCertificate",{ fileName : "ResultHandler.hx", lineNumber : 121, className : "common.ResultHandler", methodName : "tryCall", customParams : [{ fileName : "CMPClient.hx", lineNumber : 151, className : "csafe.cmp.CMPClient", methodName : "updateCertificate"}]});
		try {
			_gthis.context.set_senderKID(haxe_io_Bytes.ofString(_gthis.context.get_oldSvMech().getCertificate().getSerialNumber().toString()));
			_gthis.context.generateGENM(true,null,rHandle.chain("CMPClient.updateCertificate.genGENM").ok(function(genm) {
				_gthis.transport.doRequest(genm,rHandle.chain("CMPClient.updateCertificate.sendGENM").ok(function(transResp) {
					var asn1FreeTexts = transResp.getASN1("header").getMultiple("freeText").getInstances();
					var _g = 0;
					while(_g < asn1FreeTexts.length) {
						var asn1FT = asn1FreeTexts[_g];
						++_g;
						haxe_Log.trace("GeneralMessage Response FreeText : " + (js_Boot.__cast(asn1FT , csafe_asn1_ASN1Primitive)).asString(),{ fileName : "CMPClient.hx", lineNumber : 161, className : "csafe.cmp.CMPClient", methodName : "updateCertificate"});
					}
					var body = transResp.getASN1("body");
					var bodyConSpec = js_Boot.__cast(body.getChoiced() , csafe_asn1_ASN1ConSpec);
					var bodyTag = body.getChoiced().getType().tagNum;
					if(bodyTag == csafe_cmp_PKIBody.error) {
						var errorMsg = js_Boot.__cast(bodyConSpec.spec , csafe_cmp_ErrorMsgContent);
						var pkiStatus = js_Boot.__cast(errorMsg.getASN1("pkiStatusInfo") , csafe_cmp_PKIStatusInfo);
						var pkiStatusCode = pkiStatus.getPrimitive("status").asInteger();
						var error = null;
						if(pkiStatusCode != 0) {
							error = errorMsg.toString("euc-kr");
						}
						if(error != null) {
							haxe_Log.trace(error,{ fileName : "CMPClient.hx", lineNumber : 180, className : "csafe.cmp.CMPClient", methodName : "updateCertificate"});
							rHandle.onErr(error);
							return;
						}
					} else if(bodyTag != csafe_cmp_PKIBody.genp) {
						var tmp = "Expected response not generalResponse : " + csafe_cmp_PKIBody.toString(bodyTag);
						rHandle.onErr(tmp);
						return;
					}
					var tmp1 = csafe_cmp_PKIBody.genp;
					var tmp2 = rHandle.chain("CMPClient.updateCertificate.consumeResponse").ok(function() {
						var respGenMsg = js_Boot.__cast(bodyConSpec.spec , csafe_cmp_GenMsgContent);
						var _g1 = 0;
						var _g11 = respGenMsg.getInstances();
						while(_g1 < _g11.length) {
							var iter = _g11[_g1];
							++_g1;
							var itv = iter;
							var itvType = itv.getPrimitive("type").asObjectID();
							if(csafe_cmp_GenMsgContent.CAProtEncCert.equals(itv.getPrimitive("type").asObjectID())) {
								_gthis.context.set_caSignCert(itv.getAny("value").resolveAsKnownType(csafe_x509_X509Certificate.struct));
								_gthis.context.get_caSignCert().toString();
							} else if(csafe_cmp_GenMsgContent.KCMPEncCert.equals(itvType)) {
								_gthis.context.set_caEncCert(itv.getAny("value").resolveAsKnownType(csafe_x509_X509Certificate.struct));
								_gthis.context.get_caEncCert().toString();
							}
						}
						_gthis.context.set_senderKID(_gthis.context.get_recipKID());
						_gthis.context.generateKUR(_gthis.context,rHandle.chain("CMPClient.updateCertificate.genKUR").ok(function(irMsg,generatedKeyPair,generatedPrivateRandom) {
							_gthis.transport.doRequest(irMsg,rHandle.chain("CMPClient.updateCertificate.sendKUR").ok(function(ipMsg) {
								_gthis.context.set_recipNonce(ipMsg.getASN1("header").getPrimitive("senderNonce").asByteArray());
								_gthis.context.set_senderNonce(ipMsg.getASN1("header").getPrimitive("recipNonce").asByteArray());
								var body1 = ipMsg.getChoice("body").getChoiced();
								var certRep = body1.getMultiple("response").getFirstElem(0);
								var certifiedKeyPair = certRep.getASN1("certifiedKeyPair");
								var certOrEncCert = certifiedKeyPair.getASN1("certOrEncCert");
								var finIssuedCertCry = certOrEncCert.getASN1("certificate");
								rHandle.onOk(finIssuedCertCry);
							},{ fileName : "CMPClient.hx", lineNumber : 209, className : "csafe.cmp.CMPClient", methodName : "updateCertificate"}));
						},{ fileName : "CMPClient.hx", lineNumber : 206, className : "csafe.cmp.CMPClient", methodName : "updateCertificate"}));
					},{ fileName : "CMPClient.hx", lineNumber : 189, className : "csafe.cmp.CMPClient", methodName : "updateCertificate"});
					_gthis.consumeResponse(tmp1,transResp,tmp2);
				},{ fileName : "CMPClient.hx", lineNumber : 156, className : "csafe.cmp.CMPClient", methodName : "updateCertificate"}));
			},{ fileName : "CMPClient.hx", lineNumber : 154, className : "csafe.cmp.CMPClient", methodName : "updateCertificate"}));
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			rHandle.onErr(e);
		}
	}
	,consumeResponse: function(expectedBody,message,rHandle) {
		var header = message.getASN1("header");
		var body = message.getASN1("body");
		var responseBodyTag = body.getChoiced().getType().tagNum;
		if(responseBodyTag != expectedBody) {
			rHandle.onErr("Expected body type is : " + csafe_cmp_PKIBody.toString(expectedBody) + ". But response body is " + csafe_cmp_PKIBody.toString(responseBodyTag));
			return;
		}
		var tmp = !util_BytesUtil.equals(this.context.get_senderNonce(),header.getPrimitive("recipNonce").asByteArray());
		rHandle.onOk();
	}
	,__class__: csafe_cmp_CMPClient
};
var csafe_cmp_CMPContext = function(org) {
	this.url = "tunneling";
	this.idn = "1234561234567";
	this.orgName = "yessign";
	this.set_orgName(org);
};
csafe_cmp_CMPContext.__name__ = ["csafe","cmp","CMPContext"];
csafe_cmp_CMPContext.prototype = {
	set_orgName: function(value) {
		return this.orgName = value;
	}
	,get_orgName: function() {
		return this.orgName;
	}
	,set_idn: function(value) {
		return this.idn = value;
	}
	,get_idn: function() {
		return this.idn;
	}
	,set_url: function(value) {
		return this.url = value;
	}
	,get_url: function() {
		return this.url;
	}
	,set_version: function(value) {
		return this.version = value;
	}
	,get_version: function() {
		return this.version;
	}
	,get_senderKID: function() {
		return this.senderKID;
	}
	,set_senderKID: function(value) {
		return this.senderKID = value;
	}
	,get_authCode: function() {
		return this.authCode;
	}
	,set_authCode: function(value) {
		return this.authCode = value;
	}
	,get_protectionAlgorithm: function() {
		return this.protectionAlgorithm;
	}
	,set_protectionAlgorithm: function(value) {
		return this.protectionAlgorithm = value;
	}
	,set_newSvMech: function(value) {
		return this.newSvMech = value;
	}
	,get_newSvMech: function() {
		return this.newSvMech;
	}
	,set_oldSvMech: function(value) {
		return this.oldSvMech = value;
	}
	,get_oldSvMech: function() {
		return this.oldSvMech;
	}
	,set_transactionID: function(value) {
		return this.transactionID = value;
	}
	,get_transactionID: function() {
		if(this.transactionID == null) {
			this.set_transactionID(new haxe_io_Bytes(new ArrayBuffer(16)));
			new csafe_math_prng_Random().nextBytes(this.transactionID,0,16);
		}
		return this.transactionID;
	}
	,set_senderNonce: function(value) {
		return this.senderNonce = value;
	}
	,get_senderNonce: function() {
		if(this.senderNonce == null) {
			this.set_senderNonce(new haxe_io_Bytes(new ArrayBuffer(16)));
			new csafe_math_prng_Random().nextBytes(this.senderNonce,0,16);
		}
		return this.senderNonce;
	}
	,set_recipNonce: function(value) {
		return this.recipNonce = value;
	}
	,get_recipNonce: function() {
		if(this.recipNonce == null) {
			this.set_recipNonce(new haxe_io_Bytes(new ArrayBuffer(16)));
			new csafe_math_prng_Random().nextBytes(this.get_senderNonce(),0,16);
		}
		return this.recipNonce;
	}
	,set_sender: function(value) {
		return this.sender = value;
	}
	,get_sender: function() {
		return this.sender;
	}
	,get_recipient: function() {
		return this.recipient;
	}
	,set_recipient: function(value) {
		return this.recipient = value;
	}
	,get_recipKID: function() {
		return this.recipKID;
	}
	,set_recipKID: function(value) {
		return this.recipKID = value;
	}
	,get_caEncCert: function() {
		return this.caEncCert;
	}
	,set_caEncCert: function(value) {
		return this.caEncCert = value;
	}
	,get_caSignCert: function() {
		return this.caSignCert;
	}
	,set_caSignCert: function(value) {
		return this.caSignCert = value;
	}
	,getProtectionData: function(msg) {
		msg.childs[2].writable = false;
		msg.childs[3].writable = false;
		var protectContent = msg.encode();
		msg.childs[2].writable = true;
		msg.childs[3].writable = true;
		return protectContent;
	}
	,doProtect: function(msg,rHandle) {
		var _gthis = this;
		haxe_Log.trace("tryCall : " + "CMPContext.doProtect",{ fileName : "ResultHandler.hx", lineNumber : 121, className : "common.ResultHandler", methodName : "tryCall", customParams : [{ fileName : "CMPContext.hx", lineNumber : 228, className : "csafe.cmp.CMPContext", methodName : "doProtect"}]});
		try {
			var protectionAlg = msg.getASN1("header").getASN1("protectionAlg");
			var aid = protectionAlg.getAlgorithm();
			var protectContent = _gthis.getProtectionData(msg);
			if(aid.equals("1.2.840.113533.7.66.13")) {
				var pbmParam = protectionAlg.getParameter().resolveAsAnony();
				var macAlgo = pbmParam.getASN1("mac");
				macAlgo.sign(_gthis.get_authCode(),msg.encode(),rHandle.chain("CMPContext.doProtect.sign1").ok(function(signed) {
					msg.getPrimitive("protection").setBitString(signed);
					rHandle.onOk(msg);
				},{ fileName : "CMPContext.hx", lineNumber : 239, className : "csafe.cmp.CMPContext", methodName : "doProtect"}));
			} else if(aid.equals("1.2.840.113533.7.66.30")) {
				rHandle.onErr("Can't support algo : " + Std.string(aid));
			} else {
				_gthis.get_oldSvMech().sign(protectionAlg,protectContent,rHandle.chain("CMPContext.doProtect.sign3").ok(function(signed1) {
					msg.getPrimitive("protection").setBitString(signed1);
					rHandle.onOk(msg);
				},{ fileName : "CMPContext.hx", lineNumber : 254, className : "csafe.cmp.CMPContext", methodName : "doProtect"}));
			}
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			rHandle.onErr(e);
		}
	}
	,verifyProtect: function(msg,rHandle) {
		var _gthis = this;
		haxe_Log.trace("tryCall : " + "CMPContext.verifyProtect",{ fileName : "ResultHandler.hx", lineNumber : 121, className : "common.ResultHandler", methodName : "tryCall", customParams : [{ fileName : "CMPContext.hx", lineNumber : 266, className : "csafe.cmp.CMPContext", methodName : "verifyProtect"}]});
		try {
			var header = msg.getASN1("header");
			var protectAlg = header.getASN1("protectionAlg");
			if(!protectAlg.hasContent()) {
				rHandle.onErr("Messsage is not protected.");
			} else {
				var protectPart = _gthis.getProtectionData(msg);
				if(protectAlg.equalsOID("1.2.840.113533.7.66.13")) {
					var pbmParam = protectAlg.getParameter().resolveAsKnownType(csafe_cmp_PBMParameter.struct);
					var macAlgo = pbmParam.getASN1("mac");
					if(macAlgo.equalsOID("1.3.14.3.2.10")) {
						macAlgo.sign(_gthis.get_authCode(),protectPart,rHandle.chain("CMPContext.verifyProtect.sign").ok(function(signed) {
							if(util_BytesUtil.equals(signed,msg.getPrimitive("protection").asByteArray())) {
								rHandle.onOk();
							} else {
								rHandle.onErr("Protection does not match");
							}
						},{ fileName : "CMPContext.hx", lineNumber : 282, className : "csafe.cmp.CMPContext", methodName : "verifyProtect"}));
					} else {
						var tmp = "Can't support macAlgo : " + Std.string(macAlgo.getAlgorithm());
						rHandle.onErr(tmp);
					}
				} else if(protectAlg.equalsOID("1.2.840.113533.7.66.30")) {
					rHandle.onErr("Can't support DHMac");
				} else {
					rHandle.onErr("Can't support publicKey verify");
				}
			}
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			rHandle.onErr(e);
		}
	}
	,generateGENM: function(isKup,context,rHandle) {
		var _gthis = this;
		haxe_Log.trace("tryCall : " + "CMPContext.generateGENM",{ fileName : "ResultHandler.hx", lineNumber : 121, className : "common.ResultHandler", methodName : "tryCall", customParams : [{ fileName : "CMPContext.hx", lineNumber : 308, className : "csafe.cmp.CMPContext", methodName : "generateGENM"}]});
		try {
			if(context == null) {
				context = _gthis;
			}
			if(_gthis.get_orgName() == "yessign" || _gthis.get_orgName() == "crosscert") {
				_gthis.set_version(csafe_cmp_CMPContext.CMP1999);
				if(!isKup) {
					var gm = new csafe_asn1_impl_GeneralName();
					(js_Boot.__cast(gm.selectType(1) , csafe_asn1_ASN1ConSpec)).spec = csafe_asn1_ASN1Primitive.createIA5String(" ");
					context.set_sender(gm);
					var rgm = new csafe_asn1_impl_GeneralName();
					rgm.selectType(4);
					context.set_recipient(rgm);
				} else {
					var gm1 = new csafe_asn1_impl_GeneralName();
					gm1.selectType(4);
					context.set_sender(gm1);
					var rgm1 = new csafe_asn1_impl_GeneralName();
					rgm1.selectType(4);
					context.set_recipient(rgm1);
				}
			} else {
				throw new js__$Boot_HaxeError(new Exception("Client can't support specific CMP : " + _gthis.get_orgName()));
			}
			var msg = new csafe_cmp_PKIMessage();
			var header = js_Boot.__cast(msg.getASN1("header") , csafe_cmp_PKIHeader);
			header.getPrimitive("version").setInteger(context.get_version());
			header.setASN1("sender",context.get_sender());
			header.setASN1("recipient",context.get_recipient());
			header.getPrimitive("senderKID").setOctetString(context.get_senderKID());
			header.getPrimitive("transactionID").setOctetString(context.get_transactionID());
			header.getPrimitive("senderNonce").setOctetString(context.get_senderNonce());
			var bodyConSpec = (js_Boot.__cast(msg.getASN1("body") , csafe_cmp_PKIBody)).selectType(csafe_cmp_PKIBody.genm);
			var genm = bodyConSpec.spec;
			if(isKup) {
				var clientSKI = context.get_oldSvMech().getCertificate().getResolvedExtension("2.5.29.14");
				context.set_recipKID(clientSKI.asByteArray());
				header.getPrimitive("messageTime").setGeneralizedTime(new Date());
				header.getPrimitive("recipKID").setOctetString(context.get_recipKID());
				msg.getMultiple("extraCerts").addData(_gthis.get_oldSvMech().getCertificate());
			}
			var protection = null;
			if(!isKup) {
				var mac = new csafe_cmp_PBMParameter();
				mac.setETRISpec();
				protection = new csafe_asn1_impl_AlgorithmID("1.2.840.113533.7.66.13");
				protection.setParameter(mac);
			} else {
				protection = csafe_asn1_impl_AlgorithmID.sha256WithRSAEncryption;
			}
			header.setASN1("protectionAlg",protection);
			_gthis.doProtect(msg,rHandle);
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			rHandle.onErr(e);
		}
	}
	,generateIR: function(context,rHandle) {
		var _gthis = this;
		haxe_Log.trace("tryCall : " + "CMPContext.generateIR",{ fileName : "ResultHandler.hx", lineNumber : 121, className : "common.ResultHandler", methodName : "tryCall", customParams : [{ fileName : "CMPContext.hx", lineNumber : 376, className : "csafe.cmp.CMPContext", methodName : "generateIR"}]});
		try {
			if(context == null) {
				context = _gthis;
			}
			if(_gthis.get_orgName() == "yessign" || _gthis.get_orgName() == "crosscert") {
				_gthis.set_version(csafe_cmp_CMPContext.CMP1999);
				var rgm = new csafe_asn1_impl_GeneralName();
				rgm.selectType(4);
				_gthis.set_sender(rgm);
				_gthis.set_recipient(rgm);
			} else {
				throw new js__$Boot_HaxeError(new Exception("Client can't support specific CMP : " + _gthis.get_orgName()));
			}
			context.set_senderNonce(null);
			context.set_transactionID(null);
			var msg = new csafe_cmp_PKIMessage();
			var header = js_Boot.__cast(msg.getASN1("header") , csafe_cmp_PKIHeader);
			header.getPrimitive("version").setInteger(context.get_version());
			var tmp = context.get_sender();
			header.setASN1("sender",tmp);
			var tmp1 = context.get_recipient();
			header.setASN1("recipient",tmp1);
			header.getPrimitive("senderKID").setOctetString(context.get_senderKID());
			var caSignSKI = context.get_caSignCert().getResolvedExtension("2.5.29.14");
			var tmp2 = caSignSKI.asByteArray();
			context.set_recipKID(tmp2);
			header.getPrimitive("recipKID").setOctetString(context.get_recipKID());
			header.getPrimitive("senderNonce").setOctetString(context.get_senderNonce());
			header.getPrimitive("transactionID").setOctetString(context.get_transactionID());
			header.getPrimitive("messageTime").setGeneralizedTime(new Date());
			var bodyConSpec = (js_Boot.__cast(msg.getASN1("body") , csafe_cmp_PKIBody)).selectType(csafe_cmp_PKIBody.ir);
			var ir = bodyConSpec.spec;
			var certReqMsg = ir.addAndFocus();
			var privateRandom = _gthis.get_newSvMech().getAttribute("random");
			var certRequest = certReqMsg.getASN1("certRequest");
			certRequest.getPrimitive("certReqId").setInteger(0);
			var x509PubKey = _gthis.get_newSvMech().getPublicKey();
			haxe_Log.trace(x509PubKey.toTreeString(),{ fileName : "CMPContext.hx", lineNumber : 445, className : "csafe.cmp.CMPContext", methodName : "generateIR"});
			var certTemplate = certReqMsg.getASN1("certTemplate");
			certTemplate.setASN1("subjectPublicKeyInfo",x509PubKey);
			var popo = certReqMsg.getASN1("popo");
			var popoSign = (js_Boot.__cast(popo.selectType(1) , csafe_asn1_ASN1ConSpec)).spec;
			var popoInput = popoSign.getASN1("poposkInput");
			popoInput.macAsAuthcode(context.get_authCode(),x509PubKey);
			popoSign.sign(csafe_asn1_impl_AlgorithmID.sha256WithRSAEncryption,_gthis.get_newSvMech(),rHandle.chain("CMPContext.generateIR.popoSign").ok(function() {
				var isan = csafe_asn1_impl_IssuerAndSerialNumber.fromCertificate(context.get_caEncCert());
				var evid = new csafe_asn1_kospec_EncryptedVID();
				certReqMsg.getMultiple("regInfo").addData(new csafe_asn1_impl_AVA(new csafe_asn1_ObjectID("1.2.410.200004.10.1.1.2"),evid));
				var tmp3 = csafe_asn1_impl_AlgorithmID.sha256;
				var tmp4 = csafe_asn1_impl_AlgorithmID.rsaEncryption;
				var tmp5 = context.get_idn();
				var tmp6 = context.get_caEncCert().getPublicKey().encode();
				var tmp7 = rHandle.chain("CMPContext.generateIR.evset").ok(function() {
					var mac = new csafe_cmp_PBMParameter();
					mac.setETRISpec();
					var protection = new csafe_asn1_impl_AlgorithmID("1.2.840.113533.7.66.13");
					protection.setParameter(mac);
					header.setASN1("protectionAlg",protection);
					_gthis.doProtect(msg,rHandle);
				},{ fileName : "CMPContext.hx", lineNumber : 460, className : "csafe.cmp.CMPContext", methodName : "generateIR"});
				evid.set(tmp3,tmp4,isan,tmp5,privateRandom,tmp6,tmp7);
			},{ fileName : "CMPContext.hx", lineNumber : 455, className : "csafe.cmp.CMPContext", methodName : "generateIR"}));
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			rHandle.onErr(e);
		}
	}
	,generateKUR: function(context,rHandle) {
		var _gthis = this;
		haxe_Log.trace("tryCall : " + "CMPContext.generateKUR",{ fileName : "ResultHandler.hx", lineNumber : 121, className : "common.ResultHandler", methodName : "tryCall", customParams : [{ fileName : "CMPContext.hx", lineNumber : 477, className : "csafe.cmp.CMPContext", methodName : "generateKUR"}]});
		try {
			if(context == null) {
				context = _gthis;
			}
			if(_gthis.get_orgName() == "yessign" || _gthis.get_orgName() == "crosscert") {
				_gthis.set_version(csafe_cmp_CMPContext.CMP1999);
				var rgm = new csafe_asn1_impl_GeneralName();
				rgm.selectType(4);
				_gthis.set_sender(rgm);
				_gthis.set_recipient(rgm);
			} else {
				throw new js__$Boot_HaxeError(new Exception("Client can't support specific CMP : " + _gthis.get_orgName()));
			}
			context.set_senderNonce(null);
			context.set_transactionID(null);
			var msg = new csafe_cmp_PKIMessage();
			var header = js_Boot.__cast(msg.getASN1("header") , csafe_cmp_PKIHeader);
			header.getPrimitive("version").setInteger(context.get_version());
			var tmp = context.get_sender();
			header.setASN1("sender",tmp);
			var tmp1 = context.get_recipient();
			header.setASN1("recipient",tmp1);
			header.getPrimitive("senderKID").setOctetString(context.get_senderKID());
			var caSignSKI = context.get_caSignCert().getResolvedExtension("2.5.29.14");
			var tmp2 = caSignSKI.asByteArray();
			context.set_recipKID(tmp2);
			header.getPrimitive("recipKID").setOctetString(context.get_recipKID());
			header.getPrimitive("senderNonce").setOctetString(context.get_senderNonce());
			header.getPrimitive("transactionID").setOctetString(context.get_transactionID());
			header.getPrimitive("messageTime").setGeneralizedTime(new Date());
			msg.getMultiple("extraCerts").addData(_gthis.get_oldSvMech().getCertificate());
			var bodyConSpec = (js_Boot.__cast(msg.getASN1("body") , csafe_cmp_PKIBody)).selectType(csafe_cmp_PKIBody.kur);
			var ir = bodyConSpec.spec;
			var certReqMsg = ir.addAndFocus();
			var privateRandom = _gthis.get_newSvMech().getAttribute("random");
			var certRequest = certReqMsg.getASN1("certRequest");
			certRequest.getPrimitive("certReqId").setInteger(0);
			var x509PubKey = _gthis.get_newSvMech().getPublicKey();
			var certTemplate = certReqMsg.getASN1("certTemplate");
			certTemplate.setASN1("subject",_gthis.get_oldSvMech().getCertificate().getSubjectDN());
			certTemplate.setASN1("subjectPublicKeyInfo",x509PubKey);
			certRequest.getMultiple("controls").addData(new csafe_asn1_impl_AVA(csafe_cmp_Controls.oldCertID,new csafe_cmp_crmf_CertID(_gthis.get_oldSvMech().getCertificate())));
			var popo = certReqMsg.getASN1("popo");
			var popoSign = (js_Boot.__cast(popo.selectType(1) , csafe_asn1_ASN1ConSpec)).spec;
			var popoInput = popoSign.getASN1("poposkInput");
			popoInput.macAsAuthcode(haxe_io_Bytes.ofString("dummy"),x509PubKey);
			popoSign.sign(csafe_asn1_impl_AlgorithmID.sha256WithRSAEncryption,_gthis.get_newSvMech(),rHandle.chain("CMPContext.generateKUR").ok(function() {
				var isan = csafe_asn1_impl_IssuerAndSerialNumber.fromCertificate(context.get_caEncCert());
				var evid = new csafe_asn1_kospec_EncryptedVID();
				certReqMsg.getMultiple("regInfo").addData(new csafe_asn1_impl_AVA(new csafe_asn1_ObjectID("1.2.410.200004.10.1.1.2"),evid));
				var tmp3 = csafe_asn1_impl_AlgorithmID.sha256;
				var tmp4 = csafe_asn1_impl_AlgorithmID.rsaEncryption;
				var tmp5 = context.get_idn();
				var tmp6 = context.get_caEncCert().getPublicKey().encode();
				var tmp7 = rHandle.chain("CMPContext.generateKUR.evset").ok(function() {
					header.setASN1("protectionAlg",csafe_asn1_impl_AlgorithmID.sha256WithRSAEncryption);
					_gthis.doProtect(msg,rHandle);
				},{ fileName : "CMPContext.hx", lineNumber : 541, className : "csafe.cmp.CMPContext", methodName : "generateKUR"});
				evid.set(tmp3,tmp4,isan,tmp5,privateRandom,tmp6,tmp7);
			},{ fileName : "CMPContext.hx", lineNumber : 536, className : "csafe.cmp.CMPContext", methodName : "generateKUR"}));
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			rHandle.onErr(e);
		}
	}
	,generateConf: function(isKup,context,rHandle) {
		var _gthis = this;
		haxe_Log.trace("tryCall : " + "CMPContext.generateConf",{ fileName : "ResultHandler.hx", lineNumber : 121, className : "common.ResultHandler", methodName : "tryCall", customParams : [{ fileName : "CMPContext.hx", lineNumber : 554, className : "csafe.cmp.CMPContext", methodName : "generateConf"}]});
		try {
			if(context == null) {
				context = _gthis;
			}
			if(_gthis.get_orgName() == "yessign" || _gthis.get_orgName() == "crosscert") {
				_gthis.set_version(csafe_cmp_CMPContext.CMP1999);
				var gm = new csafe_asn1_impl_GeneralName();
				(js_Boot.__cast(gm.selectType(1) , csafe_asn1_ASN1ConSpec)).spec = csafe_asn1_ASN1Primitive.createIA5String(" ");
				_gthis.set_sender(gm);
				var rgm = new csafe_asn1_impl_GeneralName();
				rgm.selectType(4);
				_gthis.set_recipient(rgm);
			} else {
				throw new js__$Boot_HaxeError(new Exception("Client can't support specific CMP : " + _gthis.get_orgName()));
			}
			var msg = new csafe_cmp_PKIMessage();
			var header = js_Boot.__cast(msg.getASN1("header") , csafe_cmp_PKIHeader);
			header.getPrimitive("version").setInteger(context.get_version());
			header.setASN1("sender",context.get_sender());
			header.setASN1("recipient",context.get_recipient());
			header.getPrimitive("senderKID").setOctetString(context.get_senderKID());
			header.getPrimitive("recipKID").setOctetString(context.get_recipKID());
			header.getPrimitive("transactionID").setOctetString(context.get_transactionID());
			header.getPrimitive("senderNonce").setOctetString(context.get_senderNonce());
			header.getPrimitive("recipNonce").setOctetString(context.get_recipNonce());
			(js_Boot.__cast(msg.getASN1("body") , csafe_cmp_PKIBody)).selectType(csafe_cmp_PKIBody.pkiconf);
			var protection = null;
			if(!isKup) {
				var mac = new csafe_cmp_PBMParameter();
				mac.setETRISpec();
				protection = new csafe_asn1_impl_AlgorithmID("1.2.840.113533.7.66.13");
				protection.setParameter(mac);
			} else {
				protection = csafe_asn1_impl_AlgorithmID.sha256WithRSAEncryption;
			}
			header.setASN1("protectionAlg",protection);
			_gthis.doProtect(msg,rHandle);
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			rHandle.onErr(e);
		}
	}
	,__class__: csafe_cmp_CMPContext
};
var csafe_cmp_Controls = function() {
	csafe_asn1_ASN1Multiple.call(this,csafe_cmp_Controls.struct);
};
csafe_cmp_Controls.__name__ = ["csafe","cmp","Controls"];
csafe_cmp_Controls.__super__ = csafe_asn1_ASN1Multiple;
csafe_cmp_Controls.prototype = $extend(csafe_asn1_ASN1Multiple.prototype,{
	__class__: csafe_cmp_Controls
});
var csafe_cmp_PKIFreeText = function() {
	csafe_asn1_ASN1Multiple.call(this,csafe_cmp_PKIFreeText.struct);
};
csafe_cmp_PKIFreeText.__name__ = ["csafe","cmp","PKIFreeText"];
csafe_cmp_PKIFreeText.__super__ = csafe_asn1_ASN1Multiple;
csafe_cmp_PKIFreeText.prototype = $extend(csafe_asn1_ASN1Multiple.prototype,{
	toString: function(encode) {
		var str_b = "";
		if(this.hasContent()) {
			var asn1FreeTexts = this.getInstances();
			var _g1 = 0;
			var _g = asn1FreeTexts.length;
			while(_g1 < _g) {
				var i = _g1++;
				str_b += Std.string("[" + i + "]");
				if(encode == "euc-kr") {
					str_b += Std.string(JSTextDecoder("euc-kr",{ "NONSTANDARD_allowLegacyEncoding" : true}).decode((js_Boot.__cast(asn1FreeTexts[i] , csafe_asn1_ASN1Primitive)).asByteArray().b));
				} else {
					str_b += Std.string((js_Boot.__cast(asn1FreeTexts[i] , csafe_asn1_ASN1Primitive)).asString());
				}
			}
		} else {
			str_b += "없음";
		}
		return str_b;
	}
	,__class__: csafe_cmp_PKIFreeText
});
var csafe_cmp_PKIStatusInfo = function() {
	csafe_asn1_ASN1Constructed.call(this,csafe_cmp_PKIStatusInfo.struct);
};
csafe_cmp_PKIStatusInfo.__name__ = ["csafe","cmp","PKIStatusInfo"];
csafe_cmp_PKIStatusInfo.__super__ = csafe_asn1_ASN1Constructed;
csafe_cmp_PKIStatusInfo.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	toString: function(encode) {
		var str_b = "";
		var status = this.getPrimitive("status").asInteger();
		str_b += "상태코드[";
		str_b += status == null ? "null" : "" + status;
		str_b += "]:";
		switch(status) {
		case 0:
			str_b += "accepted";
			break;
		case 1:
			str_b += "grantedWithMods";
			break;
		case 2:
			str_b += "rejection";
			break;
		case 3:
			str_b += "waiting";
			break;
		case 4:
			str_b += "revocationWarning";
			break;
		case 5:
			str_b += "revocationNotification";
			break;
		case 6:
			str_b += "keyUpdateWarning";
			break;
		default:
			str_b += "알수없음";
		}
		str_b += ", 상태메시지:";
		str_b += Std.string((js_Boot.__cast(this.getASN1("statusString") , csafe_cmp_PKIFreeText)).toString(encode));
		str_b += ", 실패정보:";
		if(this.getASN1("failInfo").hasContent()) {
			var failBits = this.getPrimitive("failInfo").asBooleanArray();
			var _g1 = 0;
			var _g = failBits.length;
			while(_g1 < _g) {
				var i = _g1++;
				if(failBits[i]) {
					str_b += Std.string("(" + i + ")");
					switch(i) {
					case 0:
						str_b += "badAlg";
						break;
					case 1:
						str_b += "badMessageCheck";
						break;
					case 2:
						str_b += "badRequest";
						break;
					case 3:
						str_b += "badTime";
						break;
					case 4:
						str_b += "badCertId";
						break;
					case 5:
						str_b += "badDataFormat";
						break;
					case 6:
						str_b += "wrongAuthority";
						break;
					case 7:
						str_b += "incorrectData";
						break;
					case 8:
						str_b += "missingTimeStamp";
						break;
					case 9:
						str_b += "badPOP";
						break;
					case 10:
						str_b += "certRevoked";
						break;
					case 11:
						str_b += "certConfirmed";
						break;
					case 12:
						str_b += "wrongIntegrity";
						break;
					case 13:
						str_b += "badRecipientNonce";
						break;
					case 14:
						str_b += "timeNotAvailable";
						break;
					case 15:
						str_b += "unacceptedPolicy";
						break;
					case 16:
						str_b += "unacceptedExtension";
						break;
					case 17:
						str_b += "addInfoNotAvailable";
						break;
					case 18:
						str_b += "badSenderNonce";
						break;
					case 19:
						str_b += "badCertTemplate";
						break;
					case 20:
						str_b += "signerNotTrusted";
						break;
					case 21:
						str_b += "transactionIdInUse";
						break;
					case 22:
						str_b += "unsupportedVersion";
						break;
					case 23:
						str_b += "notAuthorized";
						break;
					case 24:
						str_b += "systemUnavail";
						break;
					case 25:
						str_b += "systemFailure";
						break;
					case 26:
						str_b += "duplicateCertReq";
						break;
					default:
						str_b += Std.string("알수없는비트:" + i);
					}
					if(i + 1 < failBits.length) {
						str_b += ",";
					}
				}
			}
		} else {
			str_b += "없음";
		}
		return str_b;
	}
	,__class__: csafe_cmp_PKIStatusInfo
});
var csafe_cmp_ErrorMsgContent = function() {
	csafe_asn1_ASN1Constructed.call(this,csafe_cmp_ErrorMsgContent.struct);
};
csafe_cmp_ErrorMsgContent.__name__ = ["csafe","cmp","ErrorMsgContent"];
csafe_cmp_ErrorMsgContent.__super__ = csafe_asn1_ASN1Constructed;
csafe_cmp_ErrorMsgContent.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	toString: function(encode) {
		var str_b = "";
		str_b += "오류상태정보:";
		str_b += Std.string((js_Boot.__cast(this.getASN1("pkiStatusInfo") , csafe_cmp_PKIStatusInfo)).toString(encode));
		if(this.getASN1("errorCode").hasContent()) {
			str_b += "\n오류코드 : ";
			str_b += Std.string(this.getPrimitive("errorCode").asInteger());
		} else if(this.getASN1("errorDetails").hasContent()) {
			str_b += "\n오류상세 : ";
			str_b += Std.string((js_Boot.__cast(this.getASN1("errorDetails") , csafe_cmp_PKIFreeText)).toString(encode));
		}
		return str_b;
	}
	,__class__: csafe_cmp_ErrorMsgContent
});
var csafe_cmp_InfoTypeAndValue = function() {
	csafe_asn1_ASN1Constructed.call(this,csafe_cmp_InfoTypeAndValue.struct);
};
csafe_cmp_InfoTypeAndValue.__name__ = ["csafe","cmp","InfoTypeAndValue"];
csafe_cmp_InfoTypeAndValue.__super__ = csafe_asn1_ASN1Constructed;
csafe_cmp_InfoTypeAndValue.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	__class__: csafe_cmp_InfoTypeAndValue
});
var csafe_cmp_GenMsgContent = function() {
	csafe_asn1_ASN1Multiple.call(this,csafe_cmp_GenMsgContent.struct);
};
csafe_cmp_GenMsgContent.__name__ = ["csafe","cmp","GenMsgContent"];
csafe_cmp_GenMsgContent.__super__ = csafe_asn1_ASN1Multiple;
csafe_cmp_GenMsgContent.prototype = $extend(csafe_asn1_ASN1Multiple.prototype,{
	__class__: csafe_cmp_GenMsgContent
});
var csafe_cmp_PBMParameter = function() {
	csafe_asn1_ASN1Constructed.call(this,csafe_cmp_PBMParameter.struct);
	var randBytes = new haxe_io_Bytes(new ArrayBuffer(16));
};
csafe_cmp_PBMParameter.__name__ = ["csafe","cmp","PBMParameter"];
csafe_cmp_PBMParameter.__super__ = csafe_asn1_ASN1Constructed;
csafe_cmp_PBMParameter.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	setETRISpec: function() {
		this.getPrimitive("salt").setOctetString(haxe_io_Bytes.ofString("aaaaabbbbb"));
		this.getPrimitive("iteration").setInteger(2);
		(js_Boot.__cast(this.getASN1("owf") , csafe_asn1_impl_AlgorithmID)).setAlgorithm("1.3.14.3.2.26");
		(js_Boot.__cast(this.getASN1("mac") , csafe_asn1_impl_AlgorithmID)).setAlgorithm("1.3.14.3.2.10");
	}
	,__class__: csafe_cmp_PBMParameter
});
var csafe_x509_X509PublicKeyInfo = function() {
	csafe_asn1_ASN1Constructed.call(this,csafe_x509_X509PublicKeyInfo.struct);
};
csafe_x509_X509PublicKeyInfo.__name__ = ["csafe","x509","X509PublicKeyInfo"];
csafe_x509_X509PublicKeyInfo.__super__ = csafe_asn1_ASN1Constructed;
csafe_x509_X509PublicKeyInfo.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	getAlgorithm: function() {
		return this.getASN1("algorithm");
	}
	,setRawPublic: function(keyBytes) {
		this.getPrimitive("publicKey").setBitString(keyBytes);
	}
	,getRawPublic: function() {
		return this.getPrimitive("publicKey").asByteArray();
	}
	,__class__: csafe_x509_X509PublicKeyInfo
});
var csafe_x509_X509Extension = function() {
	csafe_asn1_ASN1Constructed.call(this,csafe_x509_X509Extension.struct);
};
csafe_x509_X509Extension.__name__ = ["csafe","x509","X509Extension"];
csafe_x509_X509Extension.install = function() {
	csafe_x509_X509Extension.extMap = new haxe_ds_StringMap();
	csafe_x509_X509Extension.register("1.3.6.1.5.5.7.1.1",csafe_x509_ext_AuthorityInformationAccess,"기관 정보 액세스");
	csafe_x509_X509Extension.register("2.5.29.35",csafe_x509_ext_AuthorityKeyIdentifier,"기관키 식별자");
	csafe_x509_X509Extension.register("2.5.29.19",csafe_x509_ext_BasicConstraints,"기본 제한");
	csafe_x509_X509Extension.register("2.5.29.32",csafe_x509_ext_CertificatePolicies,"정책 정보");
	csafe_x509_X509Extension.register("2.5.29.31",csafe_x509_ext_CRLDistributionPoints,"CRL 배포 지점");
	csafe_x509_X509Extension.register("2.5.29.18",csafe_x509_ext_IssuerAltName,"발급자 대체명");
	csafe_x509_X509Extension.register("2.5.29.15",csafe_x509_ext_KeyUsage,"키사용 용도");
	csafe_x509_X509Extension.register("2.5.29.17",csafe_x509_ext_SubjectAltName,"주체 대체 명");
	csafe_x509_X509Extension.register("2.5.29.14",csafe_x509_ext_SubjectKeyIdentifier,"주체키 식별자");
};
csafe_x509_X509Extension.register = function(o,i,d) {
	var value = { oid : o, impl : i, desc : d};
	var _this = csafe_x509_X509Extension.extMap;
	if(__map_reserved[o] != null) {
		_this.setReserved(o,value);
	} else {
		_this.h[o] = value;
	}
};
csafe_x509_X509Extension.getOIDByImpl = function(impl) {
	var key = csafe_x509_X509Extension.extMap.keys();
	while(key.hasNext()) {
		var key1 = key.next();
		var _this = csafe_x509_X509Extension.extMap;
		if((__map_reserved[key1] != null ? _this.getReserved(key1) : _this.h[key1]).impl == impl) {
			var _this1 = csafe_x509_X509Extension.extMap;
			return (__map_reserved[key1] != null ? _this1.getReserved(key1) : _this1.h[key1]).oid;
		}
	}
	return null;
};
csafe_x509_X509Extension.__super__ = csafe_asn1_ASN1Constructed;
csafe_x509_X509Extension.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	getOID: function() {
		return this.getPrimitive("extnID").asObjectID();
	}
	,getDesc: function() {
		var this1 = csafe_x509_X509Extension.extMap;
		var key = this.getOID().oid;
		var _this = this1;
		var meta = __map_reserved[key] != null ? _this.getReserved(key) : _this.h[key];
		var desc = null;
		if(meta != null) {
			desc = meta.desc;
		}
		return desc;
	}
	,resolve: function() {
		var oid = this.getOID().oid;
		var desc;
		var resolver;
		var _this = csafe_x509_X509Extension.extMap;
		var meta = __map_reserved[oid] != null ? _this.getReserved(oid) : _this.h[oid];
		var resolvedExt = null;
		if(meta != null) {
			resolvedExt = Type.createInstance(meta.impl,[]);
			resolvedExt.decode(null,this.getPrimitive("extnValue").asByteArray());
		}
		return resolvedExt;
	}
	,__class__: csafe_x509_X509Extension
});
var csafe_cmp_crmf_CertTemplate = function() {
	csafe_asn1_ASN1Constructed.call(this,csafe_cmp_crmf_CertTemplate.struct);
};
csafe_cmp_crmf_CertTemplate.__name__ = ["csafe","cmp","crmf","CertTemplate"];
csafe_cmp_crmf_CertTemplate.__super__ = csafe_asn1_ASN1Constructed;
csafe_cmp_crmf_CertTemplate.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	__class__: csafe_cmp_crmf_CertTemplate
});
var csafe_cmp_crmf_CertRequest = function() {
	csafe_asn1_ASN1Constructed.call(this,csafe_cmp_crmf_CertRequest.struct);
};
csafe_cmp_crmf_CertRequest.__name__ = ["csafe","cmp","crmf","CertRequest"];
csafe_cmp_crmf_CertRequest.__super__ = csafe_asn1_ASN1Constructed;
csafe_cmp_crmf_CertRequest.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	__class__: csafe_cmp_crmf_CertRequest
});
var csafe_cmp_crmf_PKMACValue = function() {
	csafe_asn1_ASN1Constructed.call(this,csafe_cmp_crmf_PKMACValue.struct);
};
csafe_cmp_crmf_PKMACValue.__name__ = ["csafe","cmp","crmf","PKMACValue"];
csafe_cmp_crmf_PKMACValue.__super__ = csafe_asn1_ASN1Constructed;
csafe_cmp_crmf_PKMACValue.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	sign: function(baseKey,data) {
		var algo = new csafe_asn1_impl_AlgorithmID("1.2.840.113533.7.66.13");
		this.setASN1("mAlg",algo);
		var pbmParam = new csafe_cmp_PBMParameter();
		algo.setParameter(pbmParam);
		var salt = new haxe_io_Bytes(new ArrayBuffer(16));
		new csafe_math_prng_Random().nextBytes(salt,0,16);
		pbmParam.getPrimitive("salt").setOctetString(salt);
		var iter = 1024;
		var owf = csafe_asn1_impl_AlgorithmID.sha1;
		var mac = csafe_asn1_impl_AlgorithmID.hmacSHA1;
		pbmParam.getPrimitive("iteration").setInteger(iter);
		pbmParam.setASN1("owf",owf);
		pbmParam.setASN1("mac",mac);
		var tmpKey = new haxe_io_Bytes(new ArrayBuffer(baseKey.length + salt.length));
		util_ArrayUtil.copyBytes(baseKey,0,tmpKey,0,baseKey.length);
		util_ArrayUtil.copyBytes(salt,0,tmpKey,baseKey.length,salt.length);
		var owfImpl = owf.getIHash();
		tmpKey = util_CryptUtil.repeatHash(owfImpl,tmpKey,iter);
		var realKey = new haxe_io_Bytes(new ArrayBuffer(owfImpl.getLengthBytes()));
		util_ArrayUtil.copyBytes(tmpKey,0,realKey,0,realKey.length);
		haxe_Log.trace("BaseKey : " + baseKey.toHex(),{ fileName : "PKMACValue.hx", lineNumber : 53, className : "csafe.cmp.crmf.PKMACValue", methodName : "sign", customParams : [Log.DDEBUG]});
		haxe_Log.trace("Salt : " + salt.toHex(),{ fileName : "PKMACValue.hx", lineNumber : 54, className : "csafe.cmp.crmf.PKMACValue", methodName : "sign", customParams : [Log.DDEBUG]});
		haxe_Log.trace("RealMacKEY : " + realKey.toHex(),{ fileName : "PKMACValue.hx", lineNumber : 55, className : "csafe.cmp.crmf.PKMACValue", methodName : "sign", customParams : [Log.DDEBUG]});
		var macData = new csafe_crypto_hash_HMAC(owfImpl).calculate(realKey,data);
		this.getPrimitive("value").setBitString(macData);
	}
	,__class__: csafe_cmp_crmf_PKMACValue
});
var csafe_cmp_crmf_POPOSigningKeyInput = function() {
	csafe_asn1_ASN1Constructed.call(this,csafe_cmp_crmf_POPOSigningKeyInput.struct);
};
csafe_cmp_crmf_POPOSigningKeyInput.__name__ = ["csafe","cmp","crmf","POPOSigningKeyInput"];
csafe_cmp_crmf_POPOSigningKeyInput.__super__ = csafe_asn1_ASN1Constructed;
csafe_cmp_crmf_POPOSigningKeyInput.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	macAsAuthcode: function(authCode,pubKey) {
		var pkMac = this.getChoice("authInfo").selectType(csafe_cmp_crmf_PKMACValue.struct.tagNum);
		pkMac.sign(authCode,pubKey.encode());
		this.setASN1("publicKey",pubKey);
	}
	,__class__: csafe_cmp_crmf_POPOSigningKeyInput
});
var csafe_cmp_crmf_POPOSigningKey = function() {
	csafe_asn1_ASN1Constructed.call(this,csafe_cmp_crmf_POPOSigningKey.struct);
};
csafe_cmp_crmf_POPOSigningKey.__name__ = ["csafe","cmp","crmf","POPOSigningKey"];
csafe_cmp_crmf_POPOSigningKey.__super__ = csafe_asn1_ASN1Constructed;
csafe_cmp_crmf_POPOSigningKey.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	sign: function(algo,sav,rHandle) {
		var _gthis = this;
		this.setASN1("algorithmIdentifier",algo);
		sav.sign(algo,this.getASN1("poposkInput").encode(),rHandle.chain("POPOSigningKey.sign").ok(function(signed) {
			_gthis.getPrimitive("signature").setBitString(signed);
			rHandle.onOk();
		},{ fileName : "POPOSigningKey.hx", lineNumber : 33, className : "csafe.cmp.crmf.POPOSigningKey", methodName : "sign"}));
	}
	,__class__: csafe_cmp_crmf_POPOSigningKey
});
var csafe_cmp_crmf_POPOPrivKey = function() {
	csafe_asn1_ASN1Choice.call(this,csafe_cmp_crmf_POPOPrivKey.struct);
};
csafe_cmp_crmf_POPOPrivKey.__name__ = ["csafe","cmp","crmf","POPOPrivKey"];
csafe_cmp_crmf_POPOPrivKey.__super__ = csafe_asn1_ASN1Choice;
csafe_cmp_crmf_POPOPrivKey.prototype = $extend(csafe_asn1_ASN1Choice.prototype,{
	__class__: csafe_cmp_crmf_POPOPrivKey
});
var csafe_cmp_crmf_ProofOfPossession = function() {
	csafe_asn1_ASN1Choice.call(this,csafe_cmp_crmf_ProofOfPossession.struct);
};
csafe_cmp_crmf_ProofOfPossession.__name__ = ["csafe","cmp","crmf","ProofOfPossession"];
csafe_cmp_crmf_ProofOfPossession.__super__ = csafe_asn1_ASN1Choice;
csafe_cmp_crmf_ProofOfPossession.prototype = $extend(csafe_asn1_ASN1Choice.prototype,{
	__class__: csafe_cmp_crmf_ProofOfPossession
});
var csafe_cmp_crmf_CertReqMessage = function() {
	csafe_asn1_ASN1Constructed.call(this,csafe_cmp_crmf_CertReqMessage.struct);
};
csafe_cmp_crmf_CertReqMessage.__name__ = ["csafe","cmp","crmf","CertReqMessage"];
csafe_cmp_crmf_CertReqMessage.__super__ = csafe_asn1_ASN1Constructed;
csafe_cmp_crmf_CertReqMessage.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	__class__: csafe_cmp_crmf_CertReqMessage
});
var csafe_cmp_crmf_CertReqMessages = function() {
	csafe_asn1_ASN1Multiple.call(this,csafe_cmp_crmf_CertReqMessages.struct);
};
csafe_cmp_crmf_CertReqMessages.__name__ = ["csafe","cmp","crmf","CertReqMessages"];
csafe_cmp_crmf_CertReqMessages.__super__ = csafe_asn1_ASN1Multiple;
csafe_cmp_crmf_CertReqMessages.prototype = $extend(csafe_asn1_ASN1Multiple.prototype,{
	__class__: csafe_cmp_crmf_CertReqMessages
});
var csafe_x509_X509Certificate = function(dVar) {
	this.rawChunk = null;
	csafe_asn1_ASN1Constructed.call(this,csafe_x509_X509Certificate.struct);
	if(dVar != null) {
		var certBytes;
		if(typeof(dVar) == "string") {
			var certStr = dVar;
			if(StringTools.startsWith(certStr,"-----BEGIN")) {
				certBytes = util_PEM.decode("CERTIFICATE",certStr);
			} else {
				certBytes = haxe_crypto_Base64.decode(certStr);
			}
		} else if(js_Boot.__instanceof(dVar,haxe_io_Bytes)) {
			certBytes = dVar;
		} else {
			throw new js__$Boot_HaxeError(new Exception("Invalid certificate data : " + Std.string(dVar)));
		}
		this.decode(null,certBytes);
	}
};
csafe_x509_X509Certificate.__name__ = ["csafe","x509","X509Certificate"];
csafe_x509_X509Certificate.__super__ = csafe_asn1_ASN1Constructed;
csafe_x509_X509Certificate.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	decode: function(forceImplicit,dVar) {
		if(forceImplicit == null) {
			forceImplicit = false;
		}
		var byteChunk = common_ByteChunk.resolve(dVar);
		var startPos = byteChunk.position();
		csafe_asn1_ASN1Constructed.prototype.decode.call(this,forceImplicit,byteChunk);
		var endPos = byteChunk.position();
		this.rawChunk = new haxe_io_Bytes(new ArrayBuffer(endPos - startPos));
		byteChunk.position(startPos);
		byteChunk.get(this.rawChunk);
	}
	,encode: function(forceImplicit,out) {
		if(forceImplicit == null) {
			forceImplicit = false;
		}
		var isFirstOut = false;
		if(out == null) {
			isFirstOut = true;
			out = new haxe_io_BytesBuffer();
		}
		var src = this.rawChunk;
		var len = this.rawChunk.length;
		if(len < 0 || len > src.length) {
			throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
		}
		var b1 = out.b;
		var b2 = src.b;
		var _g1 = 0;
		var _g = len;
		while(_g1 < _g) {
			var i = _g1++;
			out.b.push(b2[i]);
		}
		if(isFirstOut) {
			return out.getBytes();
		}
		return null;
	}
	,checkValidity: function(baseDate) {
		if(baseDate == null) {
			baseDate = new Date();
		}
		if(baseDate.getTime() > this.getNotBefore().getTime() && baseDate.getTime() < this.getNotAfter().getTime()) {
			return true;
		}
		return false;
	}
	,getPublicKey: function() {
		return this.getASN1("subjectPublicKeyInfo");
	}
	,getIssuerDN: function() {
		return this.getASN1("issuer");
	}
	,getKeyUsage: function() {
		return null;
	}
	,getNotAfter: function() {
		return (js_Boot.__cast(this.getASN1("validity").getChoice("notAfter").choiced , csafe_asn1_ASN1Primitive)).asDate();
	}
	,getNotBefore: function() {
		return (js_Boot.__cast(this.getASN1("validity").getChoice("notBefore").choiced , csafe_asn1_ASN1Primitive)).asDate();
	}
	,getSerialNumber: function() {
		return this.getPrimitive("serialNumber").asBigInteger();
	}
	,getSigAlg: function() {
		return this.getASN1("signatureAlgorithm");
	}
	,getSigAlgName: function() {
		return (js_Boot.__cast(this.getASN1("signatureAlgorithm") , csafe_asn1_impl_AlgorithmID)).getAlgorithm().name;
	}
	,getSigAlgOID: function() {
		return (js_Boot.__cast(this.getASN1("signatureAlgorithm") , csafe_asn1_impl_AlgorithmID)).getAlgorithm().oid;
	}
	,getSubjectDN: function() {
		return this.getASN1("subject");
	}
	,getVersion: function() {
		return this.getPrimitive("version").asInteger() + 1;
	}
	,getExtensions: function() {
		return this.getMultiple("extensions").getInstances();
	}
	,getResolvedExtension: function(oid) {
		var extensions = this.getExtensions();
		var oidString;
		if(typeof(oid) == "string") {
			oidString = oid;
		} else if(js_Boot.__instanceof(oid,csafe_asn1_ObjectID)) {
			oidString = (js_Boot.__cast(oid , csafe_asn1_ObjectID)).oid;
		} else {
			oidString = csafe_x509_X509Extension.getOIDByImpl(oid);
		}
		var _g = 0;
		while(_g < extensions.length) {
			var ext = extensions[_g];
			++_g;
			if(ext.getOID().equals(oidString)) {
				return ext.resolve();
			}
		}
		return null;
	}
	,getFingerprint: function() {
		return haxe_crypto_Sha1.make(this.encode()).toHex();
	}
	,toString: function() {
		var sb = [];
		sb.push("버전 : X.509 v" + this.getVersion() + "\n");
		sb.push("일련 번호 : " + this.getSerialNumber().toString() + "(0x" + this.getSerialNumber().toRadix(16) + ")\n");
		sb.push("서명 알고리즘 : " + this.getSigAlgName() + "\n");
		sb.push("발급자 : " + this.getIssuerDN().toString() + "\n");
		sb.push("유효 기간(시작) : " + Std.string(this.getNotBefore()) + "\n");
		sb.push("유효 기간(끝) : " + Std.string(this.getNotAfter()) + "\n");
		sb.push("주체 : " + Std.string(this.getSubjectDN()) + "\n");
		if(this.getASN1("issuerUniqueID").hasContent()) {
			sb.push("발급자 고유 아이디 : " + this.getPrimitive("issuerUniqueID").asByteArray().toHex() + "\n");
		}
		if(this.getASN1("subjectUniqueID").hasContent()) {
			sb.push("주체 고유 아이디 : " + this.getPrimitive("subjectUniqueID").asByteArray().toHex() + "\n");
		}
		var extensions = this.getExtensions();
		sb.push("확장 필드 개수 : " + extensions.length + "\n");
		var _g1 = 0;
		var _g = extensions.length;
		while(_g1 < _g) {
			var i = _g1++;
			var resolvedExtension = extensions[i].resolve();
			if(resolvedExtension != null) {
				sb.push("[" + extensions[i].getDesc() + "  " + extensions[i].getOID().oid + ")]\n");
				sb.push(Std.string(Reflect.field(resolvedExtension,"toString").apply(resolvedExtension,[])) + "\n");
			} else {
				sb.push("NOT_SUPPORT : " + Std.string(extensions[i].getOID()) + "\n");
			}
		}
		sb.push("\n");
		sb.push("지문 알고리즘 : sha-1");
		return sb.join("");
	}
	,__class__: csafe_x509_X509Certificate
});
var csafe_cmp_crmf_EncryptedValue = function() {
	csafe_asn1_ASN1Constructed.call(this,csafe_cmp_crmf_EncryptedValue.struct);
};
csafe_cmp_crmf_EncryptedValue.__name__ = ["csafe","cmp","crmf","EncryptedValue"];
csafe_cmp_crmf_EncryptedValue.__super__ = csafe_asn1_ASN1Constructed;
csafe_cmp_crmf_EncryptedValue.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	__class__: csafe_cmp_crmf_EncryptedValue
});
var csafe_cmp_crmf_CertOrEncCert = function() {
	csafe_asn1_ASN1Choice.call(this,csafe_cmp_crmf_CertOrEncCert.struct);
};
csafe_cmp_crmf_CertOrEncCert.__name__ = ["csafe","cmp","crmf","CertOrEncCert"];
csafe_cmp_crmf_CertOrEncCert.__super__ = csafe_asn1_ASN1Choice;
csafe_cmp_crmf_CertOrEncCert.prototype = $extend(csafe_asn1_ASN1Choice.prototype,{
	__class__: csafe_cmp_crmf_CertOrEncCert
});
var csafe_cmp_crmf_SinglePubInfo = function() {
	csafe_asn1_ASN1Constructed.call(this,csafe_cmp_crmf_SinglePubInfo.struct);
};
csafe_cmp_crmf_SinglePubInfo.__name__ = ["csafe","cmp","crmf","SinglePubInfo"];
csafe_cmp_crmf_SinglePubInfo.__super__ = csafe_asn1_ASN1Constructed;
csafe_cmp_crmf_SinglePubInfo.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	__class__: csafe_cmp_crmf_SinglePubInfo
});
var csafe_cmp_crmf_PKIPublicationInfo = function() {
	csafe_asn1_ASN1Constructed.call(this,csafe_cmp_crmf_PKIPublicationInfo.struct);
};
csafe_cmp_crmf_PKIPublicationInfo.__name__ = ["csafe","cmp","crmf","PKIPublicationInfo"];
csafe_cmp_crmf_PKIPublicationInfo.__super__ = csafe_asn1_ASN1Constructed;
csafe_cmp_crmf_PKIPublicationInfo.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	__class__: csafe_cmp_crmf_PKIPublicationInfo
});
var csafe_cmp_crmf_CertifiedKeyPair = function() {
	csafe_asn1_ASN1Constructed.call(this,csafe_cmp_crmf_CertifiedKeyPair.struct);
};
csafe_cmp_crmf_CertifiedKeyPair.__name__ = ["csafe","cmp","crmf","CertifiedKeyPair"];
csafe_cmp_crmf_CertifiedKeyPair.__super__ = csafe_asn1_ASN1Constructed;
csafe_cmp_crmf_CertifiedKeyPair.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	__class__: csafe_cmp_crmf_CertifiedKeyPair
});
var csafe_cmp_crmf_CertResponse = function() {
	csafe_asn1_ASN1Constructed.call(this,csafe_cmp_crmf_CertResponse.struct);
};
csafe_cmp_crmf_CertResponse.__name__ = ["csafe","cmp","crmf","CertResponse"];
csafe_cmp_crmf_CertResponse.__super__ = csafe_asn1_ASN1Constructed;
csafe_cmp_crmf_CertResponse.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	__class__: csafe_cmp_crmf_CertResponse
});
var csafe_cmp_crmf_CertRepMessage = function() {
	csafe_asn1_ASN1Constructed.call(this,csafe_cmp_crmf_CertRepMessage.struct);
};
csafe_cmp_crmf_CertRepMessage.__name__ = ["csafe","cmp","crmf","CertRepMessage"];
csafe_cmp_crmf_CertRepMessage.__super__ = csafe_asn1_ASN1Constructed;
csafe_cmp_crmf_CertRepMessage.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	__class__: csafe_cmp_crmf_CertRepMessage
});
var csafe_cmp_PKIBody = function() {
	csafe_asn1_ASN1Choice.call(this,csafe_cmp_PKIBody.struct);
};
csafe_cmp_PKIBody.__name__ = ["csafe","cmp","PKIBody"];
csafe_cmp_PKIBody.toString = function(tagNum) {
	switch(tagNum) {
	case 0:
		return "[0] CertReqMessages--Initialization Req";
	case 1:
		return "[1] CertRepMessage--Initialization Resp";
	case 2:
		return "[2] CertReqMessages--Certification Req";
	case 3:
		return "[3] CertRepMessage--Certification Resp";
	case 4:
		return "[4] CertificationRequest--PKCS #10 Cert.  Req.";
	case 5:
		return "[5] POPODecKeyChallContent--pop Challenge";
	case 6:
		return "[6] POPODecKeyRespContent--pop Response";
	case 7:
		return "[7] CertReqMessages--Key Update Request";
	case 8:
		return "[8] CertRepMessage--Key Update Response";
	case 9:
		return "[9] CertReqMessages--Key Recovery Req";
	case 10:
		return "[10] KeyRecRepContent--Key Recovery Resp";
	case 11:
		return "[11] RevReqContent--Revocation Request";
	case 12:
		return "[12] RevRepContent--Revocation Response";
	case 13:
		return "[13] CertReqMessages--Cross-Cert.  Request";
	case 14:
		return "[14] CertRepMessage--Cross-Cert.  Resp";
	case 15:
		return "[15] CAKeyUpdAnnContent--CA Key Update Ann.";
	case 16:
		return "[16] CertAnnContent--Certificate Ann.";
	case 17:
		return "[17] RevAnnContent--Revocation Ann.";
	case 18:
		return "[18] CRLAnnContent--CRL Announcement";
	case 19:
		return "[19] PKIConfirmContent--Confirmation";
	case 20:
		return "[20] NestedMessageContent--Nested Message";
	case 21:
		return "[21] GenMsgContent--General Message";
	case 22:
		return "[22] GenRepContent--General Response";
	case 23:
		return "[23] ErrorMsgContent--Error Message";
	case 24:
		return "[24] CertConfirmContent--Certificate confirm";
	case 25:
		return "[25] PollReqContent--Polling request";
	case 26:
		return "[26] PollRepContent--Polling response";
	default:
		return "[" + tagNum + "] Unknown";
	}
};
csafe_cmp_PKIBody.__super__ = csafe_asn1_ASN1Choice;
csafe_cmp_PKIBody.prototype = $extend(csafe_asn1_ASN1Choice.prototype,{
	__class__: csafe_cmp_PKIBody
});
var csafe_cmp_PKIHeader = function() {
	csafe_asn1_ASN1Constructed.call(this,csafe_cmp_PKIHeader.struct);
};
csafe_cmp_PKIHeader.__name__ = ["csafe","cmp","PKIHeader"];
csafe_cmp_PKIHeader.__super__ = csafe_asn1_ASN1Constructed;
csafe_cmp_PKIHeader.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	__class__: csafe_cmp_PKIHeader
});
var csafe_cmp_PKIMessage = function() {
	csafe_asn1_ASN1Constructed.call(this,csafe_cmp_PKIMessage.struct);
};
csafe_cmp_PKIMessage.__name__ = ["csafe","cmp","PKIMessage"];
csafe_cmp_PKIMessage.__super__ = csafe_asn1_ASN1Constructed;
csafe_cmp_PKIMessage.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	__class__: csafe_cmp_PKIMessage
});
var csafe_cmp_crmf_CertID = function(cert) {
	csafe_asn1_ASN1Constructed.call(this,csafe_cmp_crmf_CertID.struct);
	if(cert != null) {
		(js_Boot.__cast((js_Boot.__cast(this.getASN1("issuer") , csafe_asn1_impl_GeneralName)).selectType(4) , csafe_asn1_ASN1ConSpec)).spec = cert.getIssuerDN();
		this.getPrimitive("serialNumber").setInteger(cert.getSerialNumber());
	}
};
csafe_cmp_crmf_CertID.__name__ = ["csafe","cmp","crmf","CertID"];
csafe_cmp_crmf_CertID.__super__ = csafe_asn1_ASN1Constructed;
csafe_cmp_crmf_CertID.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	__class__: csafe_cmp_crmf_CertID
});
var csafe_cmp_transport_CMPMessage = function() {
	this.includeLength = true;
	this.type = 0;
	this.optionalBits = 0;
	this.version = csafe_cmp_transport_CMPMessage.V_RFC2510;
};
csafe_cmp_transport_CMPMessage.__name__ = ["csafe","cmp","transport","CMPMessage"];
csafe_cmp_transport_CMPMessage.resolve = function(decodeLength,data) {
	var cmpMsg = new csafe_cmp_transport_CMPMessage();
	cmpMsg.set_includeLength(decodeLength);
	cmpMsg.decode(data);
	return cmpMsg;
};
csafe_cmp_transport_CMPMessage.prototype = {
	set_version: function(value) {
		return this.version = value;
	}
	,get_version: function() {
		return this.version;
	}
	,set_optionalBits: function(value) {
		return this.optionalBits = value;
	}
	,get_optionalBits: function() {
		return this.optionalBits;
	}
	,get_type: function() {
		return this.type;
	}
	,set_type: function(value) {
		return this.type = value;
	}
	,get_contentMsg: function() {
		return this.contentMsg;
	}
	,set_contentMsg: function(msg) {
		return this.contentMsg = msg;
	}
	,get_includeLength: function() {
		return this.includeLength;
	}
	,set_includeLength: function(value) {
		return this.includeLength = value;
	}
	,encode: function() {
		var bb = new haxe_io_BytesBuffer();
		if(this.get_version() == csafe_cmp_transport_CMPMessage.V_RFC2510) {
			var bb1 = new haxe_io_BytesBuffer();
			var contentData = this.get_contentMsg().encode();
			if(this.get_includeLength()) {
				var src = util_ConvUtil.intToBytes(contentData.length + 1);
				var b1 = bb1.b;
				var b2 = src.b;
				var _g1 = 0;
				var _g = src.length;
				while(_g1 < _g) {
					var i = _g1++;
					bb1.b.push(b2[i]);
				}
			}
			var $byte = this.get_type();
			bb1.b.push($byte);
			var b11 = bb1.b;
			var b21 = contentData.b;
			var _g11 = 0;
			var _g2 = contentData.length;
			while(_g11 < _g2) {
				var i1 = _g11++;
				bb1.b.push(b21[i1]);
			}
			return bb1.getBytes();
		} else if(this.get_version() == csafe_cmp_transport_CMPMessage.V_PKIX_DRAFT) {
			var bb2 = new haxe_io_BytesBuffer();
			var contentData1 = this.get_contentMsg().encode();
			if(this.get_includeLength()) {
				var src1 = util_ConvUtil.intToBytes(contentData1.length + 3);
				var b12 = bb2.b;
				var b22 = src1.b;
				var _g12 = 0;
				var _g3 = src1.length;
				while(_g12 < _g3) {
					var i2 = _g12++;
					bb2.b.push(b22[i2]);
				}
			}
			var byte1 = this.get_version();
			bb2.b.push(byte1);
			var byte2 = this.get_optionalBits();
			bb2.b.push(byte2);
			var byte3 = this.get_type();
			bb2.b.push(byte3);
			var b13 = bb2.b;
			var b23 = contentData1.b;
			var _g13 = 0;
			var _g4 = contentData1.length;
			while(_g13 < _g4) {
				var i3 = _g13++;
				bb2.b.push(b23[i3]);
			}
			return bb2.getBytes();
		} else {
			throw new js__$Boot_HaxeError(new Exception("Invalid version : " + this.get_version()));
		}
	}
	,decode: function(data) {
		var bytes = null;
		if(js_Boot.__instanceof(data,haxe_io_Bytes)) {
			bytes = data;
		} else if(typeof(data) == "string") {
			bytes = haxe_crypto_Base64.decode(js_Boot.__cast(data , String));
		}
		var offset = 0;
		var pkiMessageLength = bytes.length;
		if(this.get_includeLength()) {
			pkiMessageLength = util_ConvUtil.bytesToInt(bytes,0);
			offset = 4;
		}
		this.set_version(bytes.b[offset]);
		++offset;
		if(this.get_version() == csafe_cmp_transport_CMPMessage.V_PKIX_DRAFT) {
			this.set_optionalBits(bytes.b[offset]);
			++offset;
			this.set_type(bytes.b[offset]);
			++offset;
			pkiMessageLength -= 3;
		} else {
			this.set_type(this.get_version());
			this.set_version(csafe_cmp_transport_CMPMessage.V_RFC2510);
			--pkiMessageLength;
		}
		if(this.get_type() != csafe_cmp_transport_CMPMessage.negPollRep) {
			if(pkiMessageLength > 0) {
				var contentData = bytes.sub(offset,pkiMessageLength);
				this.set_contentMsg(csafe_cmp_PKIMessage.struct.create(null,contentData));
			}
		}
		if(this.get_version() != csafe_cmp_transport_CMPMessage.V_RFC2510 && this.get_version() != csafe_cmp_transport_CMPMessage.V_PKIX_DRAFT) {
			throw new js__$Boot_HaxeError(new Exception("Unknown version : " + this.get_version()));
		}
	}
	,__class__: csafe_cmp_transport_CMPMessage
};
var csafe_crypto_cipher_CipherDirection = { __ename__ : true, __constructs__ : ["ENCRYPT","DECRYPT"] };
csafe_crypto_cipher_CipherDirection.ENCRYPT = ["ENCRYPT",0];
csafe_crypto_cipher_CipherDirection.ENCRYPT.toString = $estr;
csafe_crypto_cipher_CipherDirection.ENCRYPT.__enum__ = csafe_crypto_cipher_CipherDirection;
csafe_crypto_cipher_CipherDirection.DECRYPT = ["DECRYPT",1];
csafe_crypto_cipher_CipherDirection.DECRYPT.toString = $estr;
csafe_crypto_cipher_CipherDirection.DECRYPT.__enum__ = csafe_crypto_cipher_CipherDirection;
var csafe_crypto_Cipher = function(algo,mode,pad,initFunc) {
	if(pad == null) {
		pad = new csafe_crypto_padding_PadPkcs5();
	}
	this.algo = algo;
	this.mode = mode;
	this.pad = pad;
	mode.set_cipher(algo);
	mode.set_padding(pad);
	this.initialized = false;
	if(initFunc != null) {
		initFunc(this);
	}
};
csafe_crypto_Cipher.__name__ = ["csafe","crypto","Cipher"];
csafe_crypto_Cipher.prototype = {
	init: function(direction,params) {
		this.initialized = true;
		this.direction = direction;
		switch(direction[1]) {
		case 0:
			this.modeUpdate = ($_=this.mode,$bind($_,$_.updateEncrypt));
			this.modeFinal = ($_=this.mode,$bind($_,$_.finalEncrypt));
			break;
		case 1:
			this.modeUpdate = ($_=this.mode,$bind($_,$_.updateDecrypt));
			this.modeFinal = ($_=this.mode,$bind($_,$_.finalDecrypt));
			break;
		}
		if(params == null) {
			this.params = new csafe_crypto_cipher_CipherParams();
		} else {
			this.params = params.clone();
		}
		this.params.direction = direction;
		this.mode.set_cipher(this.algo);
		this.mode.set_padding(this.pad);
		this.mode.init(this.params);
		this.blockSize = this.mode.get_blockSize();
		this.bufsize = this.blockSize == 1 ? 1 : this.blockSize;
		this.buf = new haxe_io_Bytes(new ArrayBuffer(this.bufsize));
		this.ptr = 0;
	}
	,update: function(input,inputOffset,inputLen,out) {
		if(inputLen <= 0) {
			return 0;
		}
		var rv = inputLen;
		if(this.blockSize == 1) {
			var _g1 = 0;
			var _g = inputLen;
			while(_g1 < _g) {
				var i = _g1++;
				this.buf.b[0] = input.b[inputOffset + i] & 255;
				this.modeUpdate(this.buf,out);
			}
		} else {
			while(inputLen > 0) {
				if(this.ptr == this.blockSize) {
					var written = this.modeUpdate(this.buf,out);
					this.ptr = 0;
				}
				var num = Math.min(this.bufsize - this.ptr,inputLen) | 0;
				if(num <= 0) {
					break;
				}
				var _g11 = 0;
				var _g2 = num;
				while(_g11 < _g2) {
					var i1 = _g11++;
					this.buf.b[i1 + this.ptr] = input.b[i1 + inputOffset] & 255;
				}
				inputLen -= num;
				inputOffset += num;
				this.ptr += num;
			}
		}
		return rv;
	}
	,'final': function(input,inputOffset,inputLen,out) {
		var rv = 0;
		var read = 1;
		while(inputLen > 0 && read > 0) {
			read = this.update(input,inputOffset,inputLen,out);
			rv += read;
			inputOffset += read;
			inputLen -= read;
		}
		var rem = this.buf.sub(0,this.ptr);
		rv += this.modeFinal(rem,out);
		return rv;
	}
	,getIV: function() {
		return this.params.iv;
	}
	,getCurrentIV: function() {
		if(!js_Boot.__instanceof(this.mode,csafe_crypto_mode_IVBase)) {
			return this.params.iv;
		}
		var ivm = this.mode;
		return ivm.get_iv();
	}
	,__class__: csafe_crypto_Cipher
};
var csafe_crypto_cipher_CipherParams = function() {
	this.prng = new csafe_math_prng_Random();
};
csafe_crypto_cipher_CipherParams.__name__ = ["csafe","crypto","cipher","CipherParams"];
csafe_crypto_cipher_CipherParams.prototype = {
	clone: function() {
		var o = new csafe_crypto_cipher_CipherParams();
		if(this.iv != null) {
			o.iv = this.iv.sub(0,this.iv.length);
		}
		o.prng = this.prng;
		o.direction = this.direction;
		return o;
	}
	,__class__: csafe_crypto_cipher_CipherParams
};
var csafe_crypto_cipher_IBlockCipher = function() { };
csafe_crypto_cipher_IBlockCipher.__name__ = ["csafe","crypto","cipher","IBlockCipher"];
csafe_crypto_cipher_IBlockCipher.prototype = {
	__class__: csafe_crypto_cipher_IBlockCipher
};
var csafe_crypto_cipher_IMode = function() { };
csafe_crypto_cipher_IMode.__name__ = ["csafe","crypto","cipher","IMode"];
csafe_crypto_cipher_IMode.prototype = {
	__class__: csafe_crypto_cipher_IMode
};
var csafe_crypto_cipher_IPad = function() { };
csafe_crypto_cipher_IPad.__name__ = ["csafe","crypto","cipher","IPad"];
csafe_crypto_cipher_IPad.prototype = {
	__class__: csafe_crypto_cipher_IPad
};
var csafe_crypto_cipher_asymm_rsa_IBlockPad = function() { };
csafe_crypto_cipher_asymm_rsa_IBlockPad.__name__ = ["csafe","crypto","cipher","asymm","rsa","IBlockPad"];
csafe_crypto_cipher_asymm_rsa_IBlockPad.prototype = {
	__class__: csafe_crypto_cipher_asymm_rsa_IBlockPad
};
var csafe_crypto_padding_PadBase = function(blockSize) {
	if(blockSize != null) {
		this.set_blockSize(blockSize);
	}
};
csafe_crypto_padding_PadBase.__name__ = ["csafe","crypto","padding","PadBase"];
csafe_crypto_padding_PadBase.__interfaces__ = [csafe_crypto_cipher_IPad];
csafe_crypto_padding_PadBase.prototype = {
	pad: function(s) {
		throw new js__$Boot_HaxeError(new Exception("not implemented"));
	}
	,unpad: function(s) {
		throw new js__$Boot_HaxeError(new Exception("not implemented"));
	}
	,set_blockSize: function(len) {
		this.blockSize = len;
		return len;
	}
	,calcNumBlocks: function(len) {
		if(len == 0) {
			return 0;
		}
		var n = Math.ceil(len / this.blockSize);
		if(len % this.blockSize == 0) {
			++n;
		}
		return n;
	}
	,__class__: csafe_crypto_padding_PadBase
};
var csafe_crypto_cipher_asymm_rsa_PadBlockBase = function(blockSize) {
	csafe_crypto_padding_PadBase.call(this,blockSize);
};
csafe_crypto_cipher_asymm_rsa_PadBlockBase.__name__ = ["csafe","crypto","cipher","asymm","rsa","PadBlockBase"];
csafe_crypto_cipher_asymm_rsa_PadBlockBase.__interfaces__ = [csafe_crypto_cipher_asymm_rsa_IBlockPad];
csafe_crypto_cipher_asymm_rsa_PadBlockBase.__super__ = csafe_crypto_padding_PadBase;
csafe_crypto_cipher_asymm_rsa_PadBlockBase.prototype = $extend(csafe_crypto_padding_PadBase.prototype,{
	calcNumBlocks: function(len) {
		var ch = this.getBytesReadPerBlock();
		var n = Math.ceil(len / ch);
		return n;
	}
	,getBytesReadPerBlock: function() {
		return this.blockSize - this.blockOverhead();
	}
	,blockOverhead: function() {
		throw new js__$Boot_HaxeError(new Exception("not implemented"));
	}
	,__class__: csafe_crypto_cipher_asymm_rsa_PadBlockBase
});
var csafe_crypto_cipher_asymm_rsa_PadPkcs1Type1 = function(size) {
	csafe_crypto_cipher_asymm_rsa_PadBlockBase.call(this);
	this["blockSize"] = size;
	this.setPadCount(8);
	this.typeByte = 1;
	this.set_padByte(255);
};
csafe_crypto_cipher_asymm_rsa_PadPkcs1Type1.__name__ = ["csafe","crypto","cipher","asymm","rsa","PadPkcs1Type1"];
csafe_crypto_cipher_asymm_rsa_PadPkcs1Type1.__interfaces__ = [csafe_crypto_cipher_asymm_rsa_IBlockPad];
csafe_crypto_cipher_asymm_rsa_PadPkcs1Type1.__super__ = csafe_crypto_cipher_asymm_rsa_PadBlockBase;
csafe_crypto_cipher_asymm_rsa_PadPkcs1Type1.prototype = $extend(csafe_crypto_cipher_asymm_rsa_PadBlockBase.prototype,{
	getBytesReadPerBlock: function() {
		return this.textSize;
	}
	,pad: function(s) {
		if(s.length > this.textSize) {
			throw new js__$Boot_HaxeError(new Exception("Unable to pad block: provided buffer is " + s.length + " max is " + this.textSize));
		}
		var sb = new haxe_io_BytesBuffer();
		sb.b.push(0);
		sb.b.push(this.typeByte);
		var n = this.blockSize - s.length - 3;
		while(n-- > 0) {
			var $byte = this.get_padByte();
			sb.b.push($byte);
		}
		sb.b.push(0);
		var b1 = sb.b;
		var b2 = s.b;
		var _g1 = 0;
		var _g = s.length;
		while(_g1 < _g) {
			var i = _g1++;
			sb.b.push(b2[i]);
		}
		var rv = sb.getBytes();
		return rv;
	}
	,unpad: function(s) {
		var i = 0;
		var sb = new haxe_io_BytesBuffer();
		while(i < s.length) {
			while(i < s.length && s.b[i] == 0) ++i;
			if(s.length - i - 3 - this.padCount < 0) {
				throw new js__$Boot_HaxeError(new Exception("Unexpected short message"));
			}
			if(s.b[i] != this.typeByte) {
				throw new js__$Boot_HaxeError(new Exception("Expected marker " + this.typeByte + " at position " + i + " [" + util_BytesUtil.hexDump(s) + "]"));
			}
			if(++i >= s.length) {
				return sb.getBytes();
			}
			while(i < s.length && s.b[i] != 0) ++i;
			++i;
			var n = 0;
			while(i < s.length && n++ < this.textSize) sb.b.push(s.b[i++]);
		}
		return sb.getBytes();
	}
	,calcNumBlocks: function(len) {
		return Math.ceil(len / this.textSize);
	}
	,blockOverhead: function() {
		return 3 + this.padCount;
	}
	,setPadCount: function(x) {
		if(x + 3 >= this.blockSize) {
			throw new js__$Boot_HaxeError(new Exception("Internal padding size exceeds crypt block size"));
		}
		this.padCount = x;
		this.textSize = this.blockSize - 3 - this.padCount;
		return x;
	}
	,setBlockSize: function(x) {
		this.set_blockSize(x);
		this.textSize = x - 3 - this.padCount;
		if(this.textSize <= 0) {
			throw new js__$Boot_HaxeError(new Exception("Block size " + x + " to small for Pkcs1 with padCount " + this.padCount));
		}
		return x;
	}
	,set_padByte: function(x) {
		this._padByte = x & 255;
		return x;
	}
	,get_padByte: function() {
		return this._padByte;
	}
	,__class__: csafe_crypto_cipher_asymm_rsa_PadPkcs1Type1
});
var csafe_crypto_cipher_asymm_rsa_PadPkcs1Type2 = function(size) {
	csafe_crypto_cipher_asymm_rsa_PadPkcs1Type1.call(this,size);
	this.typeByte = 2;
	this.rng = new csafe_math_prng_Random();
};
csafe_crypto_cipher_asymm_rsa_PadPkcs1Type2.__name__ = ["csafe","crypto","cipher","asymm","rsa","PadPkcs1Type2"];
csafe_crypto_cipher_asymm_rsa_PadPkcs1Type2.__interfaces__ = [csafe_crypto_cipher_asymm_rsa_IBlockPad];
csafe_crypto_cipher_asymm_rsa_PadPkcs1Type2.__super__ = csafe_crypto_cipher_asymm_rsa_PadPkcs1Type1;
csafe_crypto_cipher_asymm_rsa_PadPkcs1Type2.prototype = $extend(csafe_crypto_cipher_asymm_rsa_PadPkcs1Type1.prototype,{
	get_padByte: function() {
		var x = 0;
		while(x == 0) x = this.rng.next();
		return x;
	}
	,__class__: csafe_crypto_cipher_asymm_rsa_PadPkcs1Type2
});
var csafe_crypto_cipher_asymm_rsa_RSAEncrypt = function(nHex,eHex) {
	this.init();
	if(nHex != null) {
		this.setPublic(nHex,eHex);
	}
};
csafe_crypto_cipher_asymm_rsa_RSAEncrypt.__name__ = ["csafe","crypto","cipher","asymm","rsa","RSAEncrypt"];
csafe_crypto_cipher_asymm_rsa_RSAEncrypt.__interfaces__ = [csafe_crypto_cipher_IBlockCipher];
csafe_crypto_cipher_asymm_rsa_RSAEncrypt.prototype = {
	init: function() {
		this.n = null;
		this.e = 0;
	}
	,decryptBlock: function(enc) {
		throw new js__$Boot_HaxeError(new Exception("Not a private key"));
	}
	,encrypt: function(buf) {
		return this.doBufferEncrypt(buf,$bind(this,this.doPublic),new csafe_crypto_cipher_asymm_rsa_PadPkcs1Type2(this.get_blockSize()));
	}
	,encryptBlock: function(block) {
		var bsize = this.get_blockSize();
		if(block.length != bsize) {
			throw new js__$Boot_HaxeError("bad block size");
		}
		var biv = csafe_math_BigInteger.ofBytes(block,true);
		var biRes = this.doPublic(biv).toBytesUnsigned();
		var l = biRes.length;
		var i = 0;
		while(l > bsize) {
			if(biRes.b[i] != 0) {
				throw new js__$Boot_HaxeError(new Exception("encoded length was " + biRes.length));
			}
			++i;
			--l;
		}
		if(i != 0) {
			biRes = biRes.sub(i,l);
		}
		if(biRes.length < bsize) {
			var bb = new haxe_io_BytesBuffer();
			l = bsize - biRes.length;
			var _g1 = 0;
			var _g = l;
			while(_g1 < _g) {
				var i1 = _g1++;
				bb.b.push(0);
			}
			var len = biRes.length;
			if(len < 0 || len > biRes.length) {
				throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
			}
			var b1 = bb.b;
			var b2 = biRes.b;
			var _g11 = 0;
			var _g2 = len;
			while(_g11 < _g2) {
				var i2 = _g11++;
				bb.b.push(b2[i2]);
			}
			biRes = bb.getBytes();
		}
		return biRes;
	}
	,encyptText: function(text,separator) {
		if(separator == null) {
			separator = ":";
		}
		return util_BytesUtil.toHex(this.encrypt(haxe_io_Bytes.ofString(text)),":");
	}
	,setPublic: function(nHex,eHex) {
		this.init();
		if(nHex == null) {
			throw new js__$Boot_HaxeError(new Exception("nHex not set: " + Std.string(nHex)));
		}
		if(eHex == null) {
			throw new js__$Boot_HaxeError(new Exception("eHex not set: " + Std.string(eHex)));
		}
		this.n = csafe_math_BigInteger.ofAuto(nHex);
		if(this.n == null) {
			throw new js__$Boot_HaxeError(new Exception("nHex not a valid big integer: " + Std.string(nHex)));
		}
		var ie = csafe_math_BigInteger.ofAuto(eHex).toInt32();
		if(ie == null || ie == 0) {
			throw new js__$Boot_HaxeError(new Exception("eHex not a vlaid big integer: " + Std.string(eHex)));
		}
		this.e = ie;
	}
	,verify: function(data) {
		return this.doBufferDecrypt(data,$bind(this,this.doPublic),new csafe_crypto_cipher_asymm_rsa_PadPkcs1Type1(this.get_blockSize()));
	}
	,doBufferEncrypt: function(src,f,pf) {
		var bs = this.get_blockSize();
		var ts = bs - 11;
		var idx = 0;
		var msg = new haxe_io_BytesBuffer();
		while(idx < src.length) {
			if(idx + ts > src.length) {
				ts = src.length - idx;
			}
			var m = csafe_math_BigInteger.ofBytes(pf.pad(src.sub(idx,ts)),true);
			var c = f(m);
			var h = c.toBytesUnsigned();
			if((h.length & 1) != 0) {
				msg.b.push(0);
			}
			var b1 = msg.b;
			var b2 = h.b;
			var _g1 = 0;
			var _g = h.length;
			while(_g1 < _g) {
				var i = _g1++;
				msg.b.push(b2[i]);
			}
			idx += ts;
		}
		return msg.getBytes();
	}
	,doBufferDecrypt: function(src,f,pf) {
		var bs = this.get_blockSize();
		var ts = bs - 11;
		var idx = 0;
		var msg = new haxe_io_BytesBuffer();
		while(idx < src.length) {
			if(idx + bs > src.length) {
				bs = src.length - idx;
			}
			var c = csafe_math_BigInteger.ofBytes(src.sub(idx,bs),true);
			var m = f(c);
			if(m == null) {
				return null;
			}
			var up = pf.unpad(m.toBytesUnsigned());
			if(up.length > ts) {
				throw new js__$Boot_HaxeError("block text length error");
			}
			var b1 = msg.b;
			var b2 = up.b;
			var _g1 = 0;
			var _g = up.length;
			while(_g1 < _g) {
				var i = _g1++;
				msg.b.push(b2[i]);
			}
			idx += bs;
		}
		return msg.getBytes();
	}
	,doPublic: function(x) {
		return x.modPowInt(this.e,this.n);
	}
	,get_blockSize: function() {
		if(this.n == null) {
			return 0;
		}
		return this.n.bitLength() + 7 >> 3;
	}
	,toString: function() {
		return "rsa";
	}
	,__class__: csafe_crypto_cipher_asymm_rsa_RSAEncrypt
};
var csafe_crypto_cipher_asymm_rsa_RSA = function(nHex,eHex,dHex) {
	this.version = 0;
	csafe_crypto_cipher_asymm_rsa_RSAEncrypt.call(this,null,null);
	this.init();
	if(nHex != null) {
		this.setPrivate(nHex,eHex,dHex);
	}
};
csafe_crypto_cipher_asymm_rsa_RSA.__name__ = ["csafe","crypto","cipher","asymm","rsa","RSA"];
csafe_crypto_cipher_asymm_rsa_RSA.__interfaces__ = [csafe_crypto_cipher_IBlockCipher];
csafe_crypto_cipher_asymm_rsa_RSA.generate = function(B,E) {
	if(E == null) {
		E = "0x010001";
	}
	var key = new csafe_crypto_cipher_asymm_rsa_RSA();
	var qs = B >> 1;
	if(typeof(E) == "string") {
		key.e = Std.parseInt(StringTools.startsWith(E,"0x") ? E : "0x" + Std.string(E));
	} else if(js_Boot.__instanceof(E,haxe_io_Bytes)) {
		key.e = csafe_math_BigInteger.ofAuto(E).toInt32();
	} else {
		throw new js__$Boot_HaxeError(new Exception("Invalid publicExponent : " + Std.string(E)));
	}
	var ee = csafe_math_BigInteger.ofInt(key.e);
	while(true) {
		key.p = csafe_math_BigInteger.randomPrime(B - qs,ee,10,true);
		key.q = csafe_math_BigInteger.randomPrime(qs,ee,10,true);
		if(key.p.compare(key.q) <= 0) {
			var t = key.p;
			key.p = key.q;
			key.q = t;
		}
		var p1 = key.p.sub(csafe_math_BigInteger.get_ONE());
		var q1 = key.q.sub(csafe_math_BigInteger.get_ONE());
		var phi = p1.mul(q1);
		if(phi.gcd(ee).compare(csafe_math_BigInteger.get_ONE()) == 0) {
			key.n = key.p.mul(key.q);
			key.d = ee.modInverse(phi);
			key.dmp1 = key.d.mod(p1);
			key.dmq1 = key.d.mod(q1);
			key.coeff = key.q.modInverse(key.p);
			break;
		}
	}
	return key;
};
csafe_crypto_cipher_asymm_rsa_RSA.bigRandom = function(bits) {
	if(bits < 2) {
		return csafe_math_BigInteger.nbv(1);
	}
	var bytesLen = bits >> 3;
	var x = new haxe_io_Bytes(new ArrayBuffer(bytesLen));
	csafe_asn1_impl_AlgorithmID.getRandomValues(x);
	var b = csafe_math_BigInteger.ofBytes(x,true,0);
	b.primify(bits,1);
	return b;
};
csafe_crypto_cipher_asymm_rsa_RSA.generateBC = function(strength,E) {
	if(E == null) {
		E = "0x010001";
	}
	var genKeyProcId = null;
	var key = new csafe_crypto_cipher_asymm_rsa_RSA();
	var qs = strength >> 1;
	if(typeof(E) == "string") {
		key.e = Std.parseInt(StringTools.startsWith(E,"0x") ? E : "0x" + Std.string(E));
	} else if(js_Boot.__instanceof(E,haxe_io_Bytes)) {
		key.e = csafe_math_BigInteger.ofAuto(E).toInt32();
	} else {
		throw new js__$Boot_HaxeError(new Exception("Invalid publicExponent : " + Std.string(E)));
	}
	var e = csafe_math_BigInteger.ofInt(key.e);
	var p = null;
	var q = null;
	var n = null;
	var d = null;
	var pSub1 = null;
	var qSub1 = null;
	var phi = null;
	var lcm = null;
	var dLowerBound = null;
	var pbitlength = (strength + 1) / 2 | 0;
	var qbitlength = strength - pbitlength;
	var mindiffbits = strength / 3 | 0;
	var minWeight = strength >> 2;
	var startTime = new Date().getTime();
	while(true) {
		p = csafe_crypto_cipher_asymm_rsa_RSA.chooseRandomPrime(pbitlength,e);
		while(true) {
			q = csafe_crypto_cipher_asymm_rsa_RSA.chooseRandomPrime(qbitlength,e);
			var diff = q.sub(p).abs();
			if(diff.bitLength() < mindiffbits) {
				continue;
			}
			n = p.mul(q);
			if(n.bitLength() != strength) {
				p = p.max(q);
				continue;
			}
			var tmp;
			if(n.sigNum() == 0) {
				tmp = 0;
			} else {
				var _3k = n.shl(1).add(n);
				var diff1 = _3k.xor(n);
				tmp = diff1.bitCount();
			}
			if(tmp < minWeight) {
				p = csafe_crypto_cipher_asymm_rsa_RSA.chooseRandomPrime(pbitlength,e);
				continue;
			}
			break;
		}
		if(p.compare(q) < 0) {
			phi = p;
			p = q;
			q = phi;
		}
		pSub1 = p.sub(csafe_math_BigInteger.get_ONE());
		qSub1 = q.sub(csafe_math_BigInteger.get_ONE());
		phi = pSub1.mul(qSub1);
		lcm = phi.div(pSub1.gcd(qSub1));
		d = e.modInverse(lcm);
		var dP;
		var dQ;
		var qInv;
		dP = d.remainder(pSub1);
		dQ = d.remainder(qSub1);
		qInv = q.modInverse(p);
		key.n = n;
		key.d = d;
		key.p = p;
		key.q = q;
		key.dmp1 = dP;
		key.dmq1 = dQ;
		key.coeff = qInv;
		return key;
	}
};
csafe_crypto_cipher_asymm_rsa_RSA.generateKt = function(strength,E) {
	if(E == null) {
		E = "0x010001";
	}
	var genKeyProcId = null;
	var key = new csafe_crypto_cipher_asymm_rsa_RSA();
	var qs = strength >> 1;
	if(typeof(E) == "string") {
		key.e = Std.parseInt(StringTools.startsWith(E,"0x") ? E : "0x" + Std.string(E));
	} else if(js_Boot.__instanceof(E,haxe_io_Bytes)) {
		key.e = csafe_math_BigInteger.ofAuto(E).toInt32();
	} else {
		throw new js__$Boot_HaxeError(new Exception("Invalid publicExponent : " + Std.string(E)));
	}
	var e = csafe_math_BigInteger.ofInt(key.e);
	var size1 = strength / 2 | 0;
	var size2 = size1;
	var offset1 = 5.0 * Math.random() + 5.0 | 0;
	var offset2 = -offset1;
	if(Math.random() < 0.5) {
		offset1 = -offset1;
		offset2 = -offset2;
	}
	size1 += offset1;
	size2 += offset2;
	var kp = csafe_crypto_cipher_asymm_rsa_RSA.bigRandom(size1);
	var kq = csafe_crypto_cipher_asymm_rsa_RSA.bigRandom(size2);
	while(true) {
		if(key.p == null) {
			var spR = csafe_crypto_cipher_asymm_rsa_RSA.nextStrongPrime(kp);
			kp = spR.val;
			if(!spR.isPrime) {
				continue;
			} else {
				key.p = spR.val;
			}
		}
		if(key.q == null) {
			var sqR = csafe_crypto_cipher_asymm_rsa_RSA.nextStrongPrime(kq);
			kq = sqR.val;
			if(!sqR.isPrime) {
				continue;
			} else {
				key.q = sqR.val;
			}
		}
		if(key.p.compare(key.q) <= 0) {
			var t = key.p;
			key.p = key.q;
			key.q = t;
		}
		var pM1 = key.p.sub(csafe_math_BigInteger.get_ONE());
		var qM1 = key.q.sub(csafe_math_BigInteger.get_ONE());
		key.n = key.p.mul(key.q);
		var phiN = pM1.mul(qM1);
		if(phiN.gcd(e).compare(csafe_math_BigInteger.get_ONE()) == 0) {
			key.d = e.modInverse(phiN);
			key.dmp1 = key.d.remainder(pM1);
			key.dmq1 = key.d.remainder(qM1);
			key.coeff = key.q.modInverse(key.p);
			return key;
		}
	}
};
csafe_crypto_cipher_asymm_rsa_RSA.nextStrongPrime = function(x) {
	if(x.remainder(csafe_math_BigInteger.get_TWO()).eq(csafe_math_BigInteger.get_ZERO())) {
		x = x.add(csafe_math_BigInteger.get_ONE());
	}
	if(x.isProbablePrime(csafe_crypto_cipher_asymm_rsa_RSA.generationCertainity)) {
		return { isPrime : true, val : x};
	} else {
		x = x.add(csafe_math_BigInteger.get_TWO());
		var xM1 = x.sub(csafe_math_BigInteger.get_ONE());
		if(!xM1.remainder(csafe_math_BigInteger.get_THREE()).eq(csafe_math_BigInteger.get_ZERO())) {
			if(x.isProbablePrime(csafe_crypto_cipher_asymm_rsa_RSA.generationCertainity)) {
				return { isPrime : true, val : x};
			}
		}
	}
	return { isPrime : false, val : x};
};
csafe_crypto_cipher_asymm_rsa_RSA.nextPrime = function(x) {
	if(x.remainder(csafe_math_BigInteger.get_TWO()).eq(csafe_math_BigInteger.get_ZERO())) {
		x = x.add(csafe_math_BigInteger.get_ONE());
	}
	var loop = 0;
	while(true) {
		++loop;
		var xM1 = x.sub(csafe_math_BigInteger.get_ONE());
		if(!xM1.remainder(csafe_math_BigInteger.get_THREE()).eq(csafe_math_BigInteger.get_ZERO())) {
			if(x.isProbablePrime(3)) {
				break;
			}
		}
		x = x.add(csafe_math_BigInteger.get_TWO());
	}
	return x;
};
csafe_crypto_cipher_asymm_rsa_RSA.getNafWeight = function(k) {
	if(k.sigNum() == 0) {
		return 0;
	}
	var _3k = k.shl(1).add(k);
	var diff = _3k.xor(k);
	return diff.bitCount();
};
csafe_crypto_cipher_asymm_rsa_RSA.chooseRandomPrime = function(bitLength,e) {
	return null;
};
csafe_crypto_cipher_asymm_rsa_RSA.ofASN1 = function(constructor,onlyPublicKey) {
	if(onlyPublicKey == null) {
		onlyPublicKey = false;
	}
	var rsa = new csafe_crypto_cipher_asymm_rsa_RSA();
	try {
		if(constructor.getChildNum() == 2) {
			rsa.setPublic(constructor.getChildAsPrimitive(0).asByteArray(),constructor.getChildAsPrimitive(1).asByteArray());
		} else if(constructor.getChildNum() == 9) {
			if(onlyPublicKey) {
				rsa.setPublic(constructor.getChildAsPrimitive(1).asByteArray(),constructor.getChildAsPrimitive(2).asByteArray());
			} else {
				var version = constructor.getChildAsPrimitive(0).asInteger();
				rsa.setPrivateEx(constructor.getChildAsPrimitive(1).asByteArray(),constructor.getChildAsPrimitive(2).asByteArray(),constructor.getChildAsPrimitive(3).asByteArray(),constructor.getChildAsPrimitive(4).asByteArray(),constructor.getChildAsPrimitive(5).asByteArray(),constructor.getChildAsPrimitive(6).asByteArray(),constructor.getChildAsPrimitive(7).asByteArray(),constructor.getChildAsPrimitive(8).asByteArray());
			}
		} else {
			throw new js__$Boot_HaxeError(new Exception("Invalid component length : " + constructor.getChildNum()));
		}
		return rsa;
	} catch( e ) {
		throw new js__$Boot_HaxeError(new Exception("RSA 비밀키가 아닙니다"));
	}
};
csafe_crypto_cipher_asymm_rsa_RSA.__super__ = csafe_crypto_cipher_asymm_rsa_RSAEncrypt;
csafe_crypto_cipher_asymm_rsa_RSA.prototype = $extend(csafe_crypto_cipher_asymm_rsa_RSAEncrypt.prototype,{
	init: function() {
		csafe_crypto_cipher_asymm_rsa_RSAEncrypt.prototype.init.call(this);
		this.d = null;
		this.p = null;
		this.q = null;
		this.dmp1 = null;
		this.dmq1 = null;
		this.coeff = null;
	}
	,decrypt: function(buf) {
		return this.doBufferDecrypt(buf,$bind(this,this.doPrivate),new csafe_crypto_cipher_asymm_rsa_PadPkcs1Type2(this.get_blockSize()));
	}
	,decryptBlock: function(enc) {
		var c = csafe_math_BigInteger.ofBytes(enc,true);
		var m = this.doPrivate(c);
		if(m == null) {
			throw new js__$Boot_HaxeError("doPrivate error");
		}
		var ba = m.toBytesUnsigned();
		if(ba.length < this.get_blockSize()) {
			var b2 = new haxe_io_Bytes(new ArrayBuffer(this.get_blockSize()));
			var _g1 = 0;
			var _g = this.get_blockSize() - ba.length + 1;
			while(_g1 < _g) {
				var i = _g1++;
				b2.b[i] = 0;
			}
			b2.blit(this.get_blockSize() - ba.length,ba,0,ba.length);
			ba = b2;
		} else {
			while(ba.length > this.get_blockSize()) {
				var cnt = ba.length - this.get_blockSize();
				var _g11 = 0;
				var _g2 = cnt;
				while(_g11 < _g2) {
					var i1 = _g11++;
					if(ba.b[i1] != 0) {
						throw new js__$Boot_HaxeError("decryptBlock length error");
					}
				}
				ba = ba.sub(cnt,this.get_blockSize());
			}
		}
		return ba;
	}
	,decryptText: function(hexString) {
		return this.decrypt(util_BytesUtil.ofHex(util_BytesUtil.cleanHexFormat(hexString)));
	}
	,sign: function(content) {
		return this.doBufferEncrypt(content,$bind(this,this.doPrivate),new csafe_crypto_cipher_asymm_rsa_PadPkcs1Type1(this.get_blockSize()));
	}
	,setPrivate: function(N,E,D) {
		this.init();
		csafe_crypto_cipher_asymm_rsa_RSAEncrypt.prototype.setPublic.call(this,N,E);
		if(D != null) {
			this.d = csafe_math_BigInteger.ofAuto(D);
		} else {
			throw new js__$Boot_HaxeError("Invalid RSA private key");
		}
	}
	,setPrivateEx: function(N,E,D,P,Q,DP,DQ,C) {
		this.init();
		this.setPrivate(N,E,D);
		if(P != null && Q != null) {
			this.p = csafe_math_BigInteger.ofAuto(P);
			this.q = csafe_math_BigInteger.ofAuto(Q);
			this.dmp1 = null;
			this.dmq1 = null;
			this.coeff = null;
			if(DP != null) {
				this.dmp1 = csafe_math_BigInteger.ofAuto(DP);
			}
			if(DQ != null) {
				this.dmq1 = csafe_math_BigInteger.ofAuto(DQ);
			}
			if(C != null) {
				this.coeff = csafe_math_BigInteger.ofAuto(C);
			}
			this.recalcCRT();
		} else {
			throw new js__$Boot_HaxeError("Invalid RSA private key ex");
		}
	}
	,recalcCRT: function() {
		if(this.p != null && this.q != null) {
			if(this.dmp1 == null) {
				this.dmp1 = this.d.mod(this.p.sub(csafe_math_BigInteger.get_ONE()));
			}
			if(this.dmq1 == null) {
				this.dmq1 = this.d.mod(this.q.sub(csafe_math_BigInteger.get_ONE()));
			}
			if(this.coeff == null) {
				this.coeff = this.q.modInverse(this.p);
			}
		}
	}
	,doPrivate: function(x) {
		if(this.p == null || this.q == null) {
			return x.modPow(this.d,this.n);
		}
		var xp = x.mod(this.p).modPow(this.dmp1,this.p);
		var xq = x.mod(this.q).modPow(this.dmq1,this.q);
		while(xp.compare(xq) < 0) xp = xp.add(this.p);
		var rb = xp.sub(xq).mul(this.coeff).mod(this.p).mul(this.q).add(xq);
		return rb;
	}
	,toASN1: function(onlyPublicKey) {
		if(onlyPublicKey == null) {
			onlyPublicKey = false;
		}
		var asn1 = csafe_asn1_ASN1.TYPE_SEQUENCE.create();
		if(onlyPublicKey || this.d == null) {
			asn1.addChild(csafe_asn1_ASN1Primitive.createInteger(this.n));
			asn1.addChild(csafe_asn1_ASN1Primitive.createInteger(this.e));
		} else {
			asn1.addChild(csafe_asn1_ASN1Primitive.createInteger(this.version));
			asn1.addChild(csafe_asn1_ASN1Primitive.createInteger(this.n));
			asn1.addChild(csafe_asn1_ASN1Primitive.createInteger(this.e));
			asn1.addChild(csafe_asn1_ASN1Primitive.createInteger(this.d));
			asn1.addChild(csafe_asn1_ASN1Primitive.createInteger(this.p));
			asn1.addChild(csafe_asn1_ASN1Primitive.createInteger(this.q));
			asn1.addChild(csafe_asn1_ASN1Primitive.createInteger(this.dmp1));
			asn1.addChild(csafe_asn1_ASN1Primitive.createInteger(this.dmq1));
			asn1.addChild(csafe_asn1_ASN1Primitive.createInteger(this.coeff));
		}
		return asn1;
	}
	,__class__: csafe_crypto_cipher_asymm_rsa_RSA
});
var csafe_crypto_cipher_asymm_rsa_RSAPSSSignature = function() { };
csafe_crypto_cipher_asymm_rsa_RSAPSSSignature.__name__ = ["csafe","crypto","cipher","asymm","rsa","RSAPSSSignature"];
csafe_crypto_cipher_asymm_rsa_RSAPSSSignature.encode = function(md,M,modBits,salt,sLen) {
	if(sLen == null) {
		sLen = -1;
	}
	var hLen = md.getLengthBytes();
	if(sLen == -1) {
		sLen = 20;
	}
	var i;
	var emBits = modBits - 1;
	var emLen = Math.ceil(emBits / 8);
	var mHash = md.calculate(M);
	if(emLen < hLen + sLen + 2) {
		throw new js__$Boot_HaxeError(new Exception("Message is too long to encrypt."));
	}
	if(salt == null) {
		salt = new haxe_io_Bytes(new ArrayBuffer(sLen));
		new csafe_math_prng_Random().nextBytes(salt,0,salt.length);
	}
	var MO_ = new haxe_io_BytesOutput();
	MO_.writeInt8(0);
	MO_.writeInt8(0);
	MO_.writeInt8(0);
	MO_.writeInt8(0);
	MO_.writeInt8(0);
	MO_.writeInt8(0);
	MO_.writeInt8(0);
	MO_.writeInt8(0);
	MO_.write(mHash);
	MO_.write(salt);
	var M_ = MO_.getBytes();
	var H = md.calculate(M_);
	var DB = new haxe_io_Bytes(new ArrayBuffer(emLen - sLen - hLen - 2 + 1 + sLen));
	DB.b[emLen - sLen - hLen - 2] = 1;
	util_ArrayUtil.copyBytes(salt,0,DB,emLen - sLen - hLen - 1,sLen);
	var maskLen = emLen - hLen - 1;
	var dbMask = csafe_crypto_cipher_asymm_rsa_RSAPSSSignature.mgf(H,maskLen,new csafe_crypto_hash_Sha256());
	var _g1 = 0;
	var _g = DB.length;
	while(_g1 < _g) {
		var i1 = _g1++;
		DB.b[i1] = (DB.b[i1] ^ dbMask.b[i1]) & 255;
	}
	var mask = 65280 >> 8 * emLen - emBits & 255;
	var maskedHead = DB.b[0] & ~mask;
	DB.b[0] = maskedHead & 255;
	var result = new haxe_io_Bytes(new ArrayBuffer(emLen));
	util_ArrayUtil.copyBytes(DB,0,result,0,emLen - hLen - 1);
	util_ArrayUtil.copyBytes(H,0,result,emLen - hLen - 1,hLen);
	result.b[emLen - 1] = 188;
	return result;
};
csafe_crypto_cipher_asymm_rsa_RSAPSSSignature.mgf = function(seed,maskLen,md) {
	var T = new haxe_io_BytesOutput();
	var len = Math.ceil(maskLen / md.getLengthBytes());
	var _g1 = 0;
	var _g = len;
	while(_g1 < _g) {
		var i = _g1++;
		var C = util_ConvUtil.intToBytes(i);
		var concat = new haxe_io_BytesOutput();
		concat.write(seed);
		concat.write(C);
		var hashed = md.calculate(concat.getBytes());
		T.write(hashed);
	}
	var TB = T.getBytes();
	return TB.sub(0,TB.length - (TB.length - maskLen));
};
csafe_crypto_cipher_asymm_rsa_RSAPSSSignature.sign = function(key,data,rHandle) {
	try {
		var p8k = csafe_pkcs_pkcs8_PKCS8PrivateKey.struct.create(null,js_Boot.__cast(key , haxe_io_Bytes));
		var privateKeyASN1 = csafe_asn1_ASN1.decode(null,p8k.getRawPrivate());
		var rsa = csafe_crypto_cipher_asymm_rsa_RSA.ofASN1(privateKeyASN1);
		var md = new csafe_crypto_hash_Sha256();
		var modBits = rsa.n.bitLength();
		var EM = csafe_crypto_cipher_asymm_rsa_RSAPSSSignature.encode(md,data,modBits);
		var C = csafe_math_BigInteger.ofBytes(EM,true);
		var result = rsa.doPrivate(C);
		var k = Math.ceil(modBits / 8);
		rHandle.onOk(csafe_crypto_cipher_asymm_rsa_RSAPSSSignature.I2OSP(result,k));
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		rHandle.onErr("Invalid PKCS8 PrivateKey : " + Std.string(e));
	}
};
csafe_crypto_cipher_asymm_rsa_RSAPSSSignature.verify = function(key,data,rHandle) {
	rHandle.onErr("rsa_pss_not_implemented");
};
csafe_crypto_cipher_asymm_rsa_RSAPSSSignature.I2OSP = function(s,k) {
	var result = s.toBytesUnsigned();
	if(result.length < k) {
		var newResult = new haxe_io_Bytes(new ArrayBuffer(k));
		util_ArrayUtil.copyBytes(result,0,newResult,k - result.length,result.length);
		result = newResult;
	} else if(result.length > k) {
		var limit = result.length - k;
		var _g1 = 0;
		var _g = limit;
		while(_g1 < _g) {
			var i = _g1++;
			if(result.b[i] != 0) {
				throw new js__$Boot_HaxeError(new Exception("integer too large"));
			}
		}
		var newResult1 = new haxe_io_Bytes(new ArrayBuffer(k));
		util_ArrayUtil.copyBytes(result,limit,newResult1,0,k);
		result = newResult1;
	}
	return result;
};
var csafe_crypto_cipher_asymm_rsa_RSASSASignature = function() { };
csafe_crypto_cipher_asymm_rsa_RSASSASignature.__name__ = ["csafe","crypto","cipher","asymm","rsa","RSASSASignature"];
csafe_crypto_cipher_asymm_rsa_RSASSASignature.sign = function(key,data,rHandle) {
	try {
		var p8k = csafe_pkcs_pkcs8_PKCS8PrivateKey.struct.create(null,js_Boot.__cast(key , haxe_io_Bytes));
		var privateKeyASN1 = csafe_asn1_ASN1.decode(null,p8k.getRawPrivate());
		var rsa = csafe_crypto_cipher_asymm_rsa_RSA.ofASN1(privateKeyASN1);
		var digest = new csafe_pkcs_pkcs7_DigestInfo();
		var tmp = csafe_asn1_impl_AlgorithmID.sha256;
		var tmp1 = rHandle.chain("RSASSASignature.sign").ok(function(digested) {
			var signed = digest.encode();
			var signed1 = rsa.sign(signed);
			rHandle.onOk(signed1);
		},{ fileName : "RSASSASignature.hx", lineNumber : 22, className : "csafe.crypto.cipher.asymm.rsa.RSASSASignature", methodName : "sign"});
		digest.digest(tmp,data,tmp1);
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		rHandle.onErr("Invalid PKCS8 PrivateKey : " + Std.string(e));
	}
};
csafe_crypto_cipher_asymm_rsa_RSASSASignature.verify = function(key,signature,data,rHandle) {
	try {
		var xKey = csafe_x509_X509PublicKeyInfo.struct.create(null,js_Boot.__cast(key , haxe_io_Bytes));
		var publicKeyASN1 = csafe_asn1_ASN1.decode(null,xKey.getRawPublic());
		var rsa = csafe_crypto_cipher_asymm_rsa_RSA.ofASN1(publicKeyASN1,true);
		var decryptedHash = rsa.verify(signature);
		csafe_asn1_impl_AlgorithmID.sha256.digest(data,rHandle.chain("RawCrypto.verify").ok(function(digested) {
			var isEquals = util_BytesUtil.equals(decryptedHash,digested);
			if(!isEquals && digested.length != decryptedHash.length) {
				var decryptedHashAsn1 = csafe_pkcs_pkcs7_DigestInfo.struct.create(null,decryptedHash);
				isEquals = util_BytesUtil.equals(decryptedHashAsn1.getDigested(),digested);
			}
			rHandle.onOk(isEquals);
		},{ fileName : "RSASSASignature.hx", lineNumber : 39, className : "csafe.crypto.cipher.asymm.rsa.RSASSASignature", methodName : "verify"}));
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		rHandle.onErr("Invalid X509PublicKey : " + Std.string(e));
	}
};
var csafe_crypto_cipher_pbe_BMPKey = function() { };
csafe_crypto_cipher_pbe_BMPKey.__name__ = ["csafe","crypto","cipher","pbe","BMPKey"];
csafe_crypto_cipher_pbe_BMPKey.encode = function(phrase) {
	var encoded = new haxe_io_Bytes(new ArrayBuffer((phrase.length + 1) * 2));
	var _g1 = 0;
	var _g = phrase.length;
	while(_g1 < _g) {
		var i = _g1++;
		encoded.b[i * 2] = 0;
		encoded.b[i * 2 + 1] = phrase.b[i] & 255;
	}
	LZZerorize.pus(encoded);
	return encoded;
};
csafe_crypto_cipher_pbe_BMPKey.encodeFromString = function(phrase) {
	var encoded = new haxe_io_Bytes(new ArrayBuffer((phrase.length + 1) * 2));
	var _g1 = 0;
	var _g = phrase.length;
	while(_g1 < _g) {
		var i = _g1++;
		encoded.b[i * 2] = 0;
		var v = HxOverrides.cca(phrase,i);
		encoded.b[i * 2 + 1] = v & 255;
	}
	return encoded;
};
csafe_crypto_cipher_pbe_BMPKey.decode = function(phrase) {
	var decoded = new haxe_io_Bytes(new ArrayBuffer((phrase.length / 2 | 0) - 1));
	var _g1 = 0;
	var _g = decoded.length;
	while(_g1 < _g) {
		var i = _g1++;
		decoded.b[i] = phrase.b[i * 2 + 1] & 255;
	}
	LZZerorize.pus(decoded);
	return decoded;
};
var csafe_crypto_cipher_pbe_PBEParameters = function(salt,count) {
	csafe_asn1_ASN1Constructed.call(this,csafe_crypto_cipher_pbe_PBEParameters.struct);
	if(salt != null) {
		this.setSalt(salt);
	}
	if(count != null) {
		this.setIterationCount(count);
	}
};
csafe_crypto_cipher_pbe_PBEParameters.__name__ = ["csafe","crypto","cipher","pbe","PBEParameters"];
csafe_crypto_cipher_pbe_PBEParameters.__super__ = csafe_asn1_ASN1Constructed;
csafe_crypto_cipher_pbe_PBEParameters.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	getSalt: function() {
		return this.getPrimitive("salt").asByteArray();
	}
	,setSalt: function(salt) {
		this.getPrimitive("salt").setOctetString(salt);
		return;
	}
	,getIterationCount: function() {
		return this.getPrimitive("iterationCount").asInteger();
	}
	,setIterationCount: function(iter) {
		this.getPrimitive("iterationCount").setInteger(iter);
		return;
	}
	,__class__: csafe_crypto_cipher_pbe_PBEParameters
});
var csafe_crypto_cipher_pbe_PBES2 = function() {
	csafe_asn1_ASN1Constructed.call(this,csafe_crypto_cipher_pbe_PBES2.struct);
};
csafe_crypto_cipher_pbe_PBES2.__name__ = ["csafe","crypto","cipher","pbe","PBES2"];
csafe_crypto_cipher_pbe_PBES2.__super__ = csafe_asn1_ASN1Constructed;
csafe_crypto_cipher_pbe_PBES2.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	getDerivationFunc: function() {
		return this.getASN1("derivationFunc");
	}
	,setDerivationFunc: function(derivationAlgo) {
		this.setASN1("derivationFunc",derivationAlgo);
	}
	,getEncryptionScheme: function() {
		return this.getASN1("encryptionScheme");
	}
	,setEncryptionScheme: function(encAlgo) {
		this.setASN1("encryptionScheme",encAlgo);
	}
	,encrypt: function(algorithm,key,data,rHandle,salt,iterationCount,keyLength) {
		var _gthis = this;
		haxe_Log.trace("tryCall : " + "PBES2.encrypt",{ fileName : "ResultHandler.hx", lineNumber : 121, className : "common.ResultHandler", methodName : "tryCall", customParams : [{ fileName : "PBES2.hx", lineNumber : 36, className : "csafe.crypto.cipher.pbe.PBES2", methodName : "encrypt"}]});
		try {
			var cipherIV = new haxe_io_Bytes(new ArrayBuffer(16));
			csafe_asn1_impl_AlgorithmID.getRandomValues(cipherIV);
			var encryptAlgoWrap = algorithm.clone();
			encryptAlgoWrap.setParameter(csafe_asn1_ASN1Primitive.createOctetString(cipherIV));
			_gthis.setEncryptionScheme(encryptAlgoWrap);
			var pbkdf2 = new csafe_crypto_cipher_pbe_PBKDF2();
			var derivedKey = pbkdf2.deriveKey(key,salt,iterationCount,keyLength);
			var derivationAlgo = csafe_asn1_impl_AlgorithmID.pbkdf2.clone();
			derivationAlgo.setParameter(pbkdf2);
			_gthis.setDerivationFunc(derivationAlgo);
			algorithm.encrypt(derivedKey,data,{ iv : cipherIV},rHandle);
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			rHandle.onErr(e);
		}
	}
	,decrypt: function(key,data,rHandle) {
		var _gthis = this;
		haxe_Log.trace("tryCall : " + "PBES2.decrypt",{ fileName : "ResultHandler.hx", lineNumber : 121, className : "common.ResultHandler", methodName : "tryCall", customParams : [{ fileName : "PBES2.hx", lineNumber : 60, className : "csafe.crypto.cipher.pbe.PBES2", methodName : "decrypt"}]});
		try {
			var algorithm = _gthis.getEncryptionScheme();
			var cipherIV = (js_Boot.__cast(algorithm.getParameter().resolveAsKnownType(csafe_asn1_ASN1.TYPE_OCTET_STRING) , csafe_asn1_ASN1Primitive)).asByteArray();
			var derivAlgo = _gthis.getDerivationFunc();
			var pbkdf2 = derivAlgo.getParameter().resolveAsKnownType(csafe_crypto_cipher_pbe_PBKDF2.struct);
			var derivedKey = pbkdf2.deriveKey(key);
			algorithm.decrypt(derivedKey,data,{ iv : cipherIV},rHandle);
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			rHandle.onErr(e);
		}
	}
	,__class__: csafe_crypto_cipher_pbe_PBES2
});
var csafe_crypto_cipher_pbe_PBEtriMac = function() { };
csafe_crypto_cipher_pbe_PBEtriMac.__name__ = ["csafe","crypto","cipher","pbe","PBEtriMac"];
csafe_crypto_cipher_pbe_PBEtriMac.mac = function(key,data) {
	var merged = new haxe_io_Bytes(new ArrayBuffer(key.length + csafe_crypto_cipher_pbe_PBEtriMac.salt.length));
	util_ArrayUtil.copyBytes(csafe_crypto_cipher_pbe_PBEtriMac.salt,0,merged,0,csafe_crypto_cipher_pbe_PBEtriMac.salt.length);
	util_ArrayUtil.copyBytes(key,0,merged,csafe_crypto_cipher_pbe_PBEtriMac.salt.length,key.length);
	var hm = util_CryptUtil.repeatHash(new csafe_crypto_hash_Sha1(),merged,csafe_crypto_cipher_pbe_PBEtriMac.iter);
	var bb = new haxe_io_BytesBuffer();
	var src = haxe_io_Bytes.ofString("1");
	var b1 = bb.b;
	var b2 = src.b;
	var _g1 = 0;
	var _g = src.length;
	while(_g1 < _g) {
		var i = _g1++;
		bb.b.push(b2[i]);
	}
	var b11 = bb.b;
	var b21 = hm.b;
	var _g11 = 0;
	var _g2 = hm.length;
	while(_g11 < _g2) {
		var i1 = _g11++;
		bb.b.push(b21[i1]);
	}
	var an2 = new csafe_crypto_hash_Sha1().calculate(bb.getBytes());
	var sKey = new haxe_io_Bytes(new ArrayBuffer(hm.length + an2.length));
	util_ArrayUtil.copyBytes(hm,0,sKey,0,hm.length);
	util_ArrayUtil.copyBytes(an2,0,sKey,hm.length,an2.length);
	var off = 0;
	var len = data.length;
	var inBuff = new haxe_io_Bytes(new ArrayBuffer(8));
	var outBuff = null;
	util_ArrayUtil.copyBytes(data,0,inBuff,0,8);
	off += 8;
	len -= 8;
	var trait = len % 8;
	while(len >= 0) {
		var cipher = new csafe_crypto_Cipher(new csafe_crypto_cipher_symm_Des(sKey),new csafe_crypto_mode_CBC(),new csafe_crypto_padding_PadPkcs5());
		var cipherParams = new csafe_crypto_cipher_CipherParams();
		cipherParams.iv = csafe_crypto_cipher_pbe_PBEtriMac.iv;
		cipher.init(csafe_crypto_Cipher.ENCRYPT,cipherParams);
		var outBuffer = new haxe_io_BytesOutput();
		cipher["final"](inBuff,0,inBuff.length,outBuffer);
		outBuff = outBuffer.getBytes();
		var ef = len > 8 ? 8 : len;
		if(ef == 0) {
			if(trait != 0) {
				break;
			}
			trait = 1;
		}
		var _g12 = 0;
		var _g3 = ef;
		while(_g12 < _g3) {
			var i2 = _g12++;
			outBuff.b[i2] = (outBuff.b[i2] ^ data.b[off++]) & 255;
		}
		util_ArrayUtil.copyBytes(outBuff,0,inBuff,0,8);
		len -= ef;
	}
	var ret = new haxe_io_Bytes(new ArrayBuffer(8));
	util_ArrayUtil.copyBytes(outBuff,0,ret,0,8);
	return ret;
};
var csafe_crypto_cipher_pbe_PBKDF2 = function() {
	csafe_asn1_ASN1Constructed.call(this,csafe_crypto_cipher_pbe_PBKDF2.struct);
};
csafe_crypto_cipher_pbe_PBKDF2.__name__ = ["csafe","crypto","cipher","pbe","PBKDF2"];
csafe_crypto_cipher_pbe_PBKDF2.__super__ = csafe_asn1_ASN1Constructed;
csafe_crypto_cipher_pbe_PBKDF2.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	deriveKey: function(pbeKey,mSalt,iterationCount,keyLength) {
		if(mSalt == null) {
			if(this.getASN1("salt").hasContent()) {
				mSalt = (js_Boot.__cast(this.getChoice("salt").choiced , csafe_asn1_ASN1Primitive)).asByteArray();
			} else {
				mSalt = new haxe_io_Bytes(new ArrayBuffer(16));
				csafe_asn1_impl_AlgorithmID.getRandomValues(mSalt);
				(js_Boot.__cast(this.getChoice("salt").selectType(csafe_asn1_ASN1.OCTET_STRING) , csafe_asn1_ASN1Primitive)).setOctetString(mSalt);
			}
		} else {
			(js_Boot.__cast(this.getChoice("salt").selectType(csafe_asn1_ASN1.OCTET_STRING) , csafe_asn1_ASN1Primitive)).setOctetString(mSalt);
		}
		if(iterationCount == null) {
			if(this.getASN1("iterationCount").hasContent()) {
				iterationCount = this.getPrimitive("iterationCount").asInteger();
			} else {
				iterationCount = 2048;
				this.getPrimitive("iterationCount").setInteger(iterationCount);
			}
		} else {
			this.getPrimitive("iterationCount").setInteger(iterationCount);
		}
		if(keyLength == null) {
			if(this.getASN1("keyLength").hasContent()) {
				keyLength = this.getPrimitive("keyLength").asInteger();
			} else {
				keyLength = 16;
				this.getPrimitive("keyLength").setInteger(keyLength);
			}
		} else {
			this.getPrimitive("keyLength").setInteger(keyLength);
		}
		var hashLength = 20;
		var bs = keyLength % hashLength | 0;
		if(bs == 0) {
			bs = keyLength / hashLength | 0;
		} else {
			bs = (keyLength - bs) / hashLength + 1 | 0;
		}
		var keyBlock = new haxe_io_Bytes(new ArrayBuffer(hashLength * bs));
		var _g1 = 1;
		var _g = bs + 1;
		while(_g1 < _g) {
			var k = _g1++;
			var s = new haxe_io_Bytes(new ArrayBuffer(mSalt.length + 4));
			var bi = new haxe_io_Bytes(new ArrayBuffer(4));
			bi.setInt32(0,k);
			util_BytesUtil.reverse(bi);
			util_ArrayUtil.copyBytes(mSalt,0,s,0,mSalt.length);
			util_ArrayUtil.copyBytes(bi,0,s,mSalt.length,4);
			var u = new csafe_crypto_hash_HMAC(new csafe_crypto_hash_Sha1()).calculate(pbeKey,s);
			var ux = new haxe_io_Bytes(new ArrayBuffer(hashLength));
			ux.blit(0,u,0,hashLength);
			var _g3 = 1;
			var _g2 = iterationCount;
			while(_g3 < _g2) {
				var i = _g3++;
				u = new csafe_crypto_hash_HMAC(new csafe_crypto_hash_Sha1()).calculate(pbeKey,u);
				var _g5 = 0;
				var _g4 = hashLength;
				while(_g5 < _g4) {
					var j = _g5++;
					ux.b[j] = (ux.b[j] ^ u.b[j]) & 255;
				}
			}
			util_ArrayUtil.copyBytes(ux,0,keyBlock,(k - 1) * hashLength,hashLength);
		}
		var derivedKey = new haxe_io_Bytes(new ArrayBuffer(keyLength));
		util_ArrayUtil.copyBytes(keyBlock,0,derivedKey,0,keyLength);
		return derivedKey;
	}
	,__class__: csafe_crypto_cipher_pbe_PBKDF2
});
var csafe_crypto_cipher_symm_Aes = function(keylen,phrase) {
	this.set_keylen(keylen);
	this.set_passphrase(phrase);
	this.blockSize = csafe_crypto_cipher_symm_Aes.AES_BLOCK_SIZE;
	this.initialized = true;
	this.initKeys();
};
csafe_crypto_cipher_symm_Aes.__name__ = ["csafe","crypto","cipher","symm","Aes"];
csafe_crypto_cipher_symm_Aes.__interfaces__ = [csafe_crypto_cipher_IBlockCipher];
csafe_crypto_cipher_symm_Aes.makeKey = function(encrypt,keylen,buf,context) {
	if(encrypt) {
		return csafe_crypto_cipher_symm_Aes.keyExpansionEnc(buf,keylen);
	}
	return csafe_crypto_cipher_symm_Aes.keyExpansionDec(buf,keylen,context);
};
csafe_crypto_cipher_symm_Aes.keyExpansionEnc = function(key,keylen) {
	var i;
	var j;
	var r;
	var t;
	var keybytes;
	var rounds;
	var kc;
	var keySched = [];
	var k = [];
	var tk = [];
	var rconpointer = 0;
	switch(keylen) {
	case 128:
		keybytes = 16;
		rounds = 10;
		kc = 4;
		break;
	case 192:
		keybytes = 24;
		rounds = 12;
		kc = 6;
		break;
	case 256:
		keybytes = 32;
		rounds = 14;
		kc = 8;
		break;
	default:
		throw new js__$Boot_HaxeError("Invalid keylen");
	}
	var _g1 = 0;
	var _g = csafe_crypto_cipher_symm_Aes.maxrk + 1;
	while(_g1 < _g) {
		var i1 = _g1++;
		keySched[i1] = [];
	}
	i = 0;
	var _g11 = 0;
	var _g2 = keybytes;
	while(_g11 < _g2) {
		var j1 = _g11++;
		k[j1] = key.b[i] | key.b[i + 1] << 8 | key.b[i + 2] << 16 | key.b[i + 3] << 24;
		i += 4;
	}
	j = kc - 1;
	while(j >= 0) {
		tk[j] = k[j];
		--j;
	}
	r = 0;
	t = 0;
	j = 0;
	while(j < kc && r < rounds + 1) {
		while(j < kc && t < 4) {
			keySched[r][t] = tk[j];
			++j;
			++t;
		}
		if(t == 4) {
			++r;
			t = 0;
		}
	}
	while(r < rounds + 1) {
		var temp = tk[kc - 1];
		tk[0] ^= csafe_crypto_cipher_symm_Aes.S[csafe_crypto_cipher_symm_Aes.B1(temp)] | csafe_crypto_cipher_symm_Aes.S[csafe_crypto_cipher_symm_Aes.B2(temp)] << 8 | csafe_crypto_cipher_symm_Aes.S[csafe_crypto_cipher_symm_Aes.B3(temp)] << 16 | csafe_crypto_cipher_symm_Aes.S[csafe_crypto_cipher_symm_Aes.B0(temp)] << 24;
		tk[0] ^= csafe_crypto_cipher_symm_Aes.Rcon[rconpointer++];
		if(kc != 8) {
			var _g12 = 1;
			var _g3 = kc;
			while(_g12 < _g3) {
				var j2 = _g12++;
				tk[j2] ^= tk[j2 - 1];
			}
		} else {
			var iKc2 = kc / 2 | 0;
			var _g13 = 1;
			var _g4 = iKc2;
			while(_g13 < _g4) {
				var j3 = _g13++;
				tk[j3] ^= tk[j3 - 1];
			}
			temp = tk[iKc2 - 1 | 0];
			tk[iKc2] ^= csafe_crypto_cipher_symm_Aes.S[csafe_crypto_cipher_symm_Aes.B0(temp)] | csafe_crypto_cipher_symm_Aes.S[csafe_crypto_cipher_symm_Aes.B1(temp)] << 8 | csafe_crypto_cipher_symm_Aes.S[csafe_crypto_cipher_symm_Aes.B2(temp)] << 16 | csafe_crypto_cipher_symm_Aes.S[csafe_crypto_cipher_symm_Aes.B3(temp)] << 24;
			var _g14 = iKc2 + 1;
			var _g5 = kc;
			while(_g14 < _g5) {
				var j4 = _g14++;
				tk[j4] ^= tk[j4 - 1];
			}
		}
		j = 0;
		while(j < kc && r < rounds + 1) {
			while(j < kc && t < 4) {
				keySched[r][t] = tk[j];
				++j;
				++t;
			}
			if(t == 4) {
				++r;
				t = 0;
			}
		}
	}
	return { rounds : rounds, rk : keySched};
};
csafe_crypto_cipher_symm_Aes.keyExpansionDec = function(key,keylen,context) {
	var w;
	var rk2 = [];
	var ctx;
	if(context == null) {
		ctx = csafe_crypto_cipher_symm_Aes.keyExpansionEnc(key,keylen);
	} else {
		ctx = context;
	}
	var rounds = ctx.rounds;
	var _g1 = 0;
	var _g = csafe_crypto_cipher_symm_Aes.maxrk + 1;
	while(_g1 < _g) {
		var r = _g1++;
		rk2[r] = [];
		rk2[r][0] = ctx.rk[r][0];
		rk2[r][1] = ctx.rk[r][1];
		rk2[r][2] = ctx.rk[r][2];
		rk2[r][3] = ctx.rk[r][3];
	}
	var _g11 = 1;
	var _g2 = rounds;
	while(_g11 < _g2) {
		var r1 = _g11++;
		w = rk2[r1][0];
		rk2[r1][0] = csafe_crypto_cipher_symm_Aes.U1[csafe_crypto_cipher_symm_Aes.B0(w)] ^ csafe_crypto_cipher_symm_Aes.U2[csafe_crypto_cipher_symm_Aes.B1(w)] ^ csafe_crypto_cipher_symm_Aes.U3[csafe_crypto_cipher_symm_Aes.B2(w)] ^ csafe_crypto_cipher_symm_Aes.U4[csafe_crypto_cipher_symm_Aes.B3(w)];
		w = rk2[r1][1];
		rk2[r1][1] = csafe_crypto_cipher_symm_Aes.U1[csafe_crypto_cipher_symm_Aes.B0(w)] ^ csafe_crypto_cipher_symm_Aes.U2[csafe_crypto_cipher_symm_Aes.B1(w)] ^ csafe_crypto_cipher_symm_Aes.U3[csafe_crypto_cipher_symm_Aes.B2(w)] ^ csafe_crypto_cipher_symm_Aes.U4[csafe_crypto_cipher_symm_Aes.B3(w)];
		w = rk2[r1][2];
		rk2[r1][2] = csafe_crypto_cipher_symm_Aes.U1[csafe_crypto_cipher_symm_Aes.B0(w)] ^ csafe_crypto_cipher_symm_Aes.U2[csafe_crypto_cipher_symm_Aes.B1(w)] ^ csafe_crypto_cipher_symm_Aes.U3[csafe_crypto_cipher_symm_Aes.B2(w)] ^ csafe_crypto_cipher_symm_Aes.U4[csafe_crypto_cipher_symm_Aes.B3(w)];
		w = rk2[r1][3];
		rk2[r1][3] = csafe_crypto_cipher_symm_Aes.U1[csafe_crypto_cipher_symm_Aes.B0(w)] ^ csafe_crypto_cipher_symm_Aes.U2[csafe_crypto_cipher_symm_Aes.B1(w)] ^ csafe_crypto_cipher_symm_Aes.U3[csafe_crypto_cipher_symm_Aes.B2(w)] ^ csafe_crypto_cipher_symm_Aes.U4[csafe_crypto_cipher_symm_Aes.B3(w)];
	}
	return { rounds : rounds, rk : rk2};
};
csafe_crypto_cipher_symm_Aes.B0 = function(x) {
	return x & 255;
};
csafe_crypto_cipher_symm_Aes.B1 = function(x) {
	return x >> 8 & 255;
};
csafe_crypto_cipher_symm_Aes.B2 = function(x) {
	return x >> 16 & 255;
};
csafe_crypto_cipher_symm_Aes.B3 = function(x) {
	return x >> 24 & 255;
};
csafe_crypto_cipher_symm_Aes.F1 = function(x0,x1,x2,x3) {
	return csafe_crypto_cipher_symm_Aes.B1(csafe_crypto_cipher_symm_Aes.T1[x0 & 255]) | csafe_crypto_cipher_symm_Aes.B1(csafe_crypto_cipher_symm_Aes.T1[x1 >> 8 & 255]) << 8 | csafe_crypto_cipher_symm_Aes.B1(csafe_crypto_cipher_symm_Aes.T1[x2 >> 16 & 255]) << 16 | csafe_crypto_cipher_symm_Aes.B1(csafe_crypto_cipher_symm_Aes.T1[x3 >>> 24]) << 24;
};
csafe_crypto_cipher_symm_Aes.prototype = {
	toString: function() {
		return "aes-" + this.keylen;
	}
	,get_blockSize: function() {
		return this.blockSize;
	}
	,initKeys: function() {
		this.encKey = csafe_crypto_cipher_symm_Aes.makeKey(true,this.keylen,this.passphrase);
		this.decKey = csafe_crypto_cipher_symm_Aes.makeKey(false,this.keylen,this.passphrase,this.encKey);
	}
	,encryptBlock: function(block) {
		if(block.length != this.get_blockSize()) {
			throw new js__$Boot_HaxeError("bad block size");
		}
		return this.AESencrypt(block,this.encKey);
	}
	,decryptBlock: function(block) {
		return this.AESdecrypt(block,this.decKey);
	}
	,set_keylen: function(len) {
		if(len != 128 && len != 192 && len != 256) {
			throw new js__$Boot_HaxeError("Invalid key length");
		}
		this.keylen = len;
		if(this.initialized) {
			this.initKeys();
		}
		return len;
	}
	,set_passphrase: function(buf) {
		this.passphrase = buf;
		if(this.initialized) {
			this.initKeys();
		}
		return buf;
	}
	,AESencrypt: function(block,ctx) {
		var r;
		var t0;
		var t1;
		var t2;
		var t3;
		var b = util_Int32Util.unpackLE(block);
		var rounds = ctx.rounds;
		var b0 = b[0];
		var b1 = b[1];
		var b2 = b[2];
		var b3 = b[3];
		var _g1 = 0;
		var _g = rounds - 1;
		while(_g1 < _g) {
			var r1 = _g1++;
			t0 = b0 ^ ctx.rk[r1][0];
			t1 = b1 ^ ctx.rk[r1][1];
			t2 = b2 ^ ctx.rk[r1][2];
			t3 = b3 ^ ctx.rk[r1][3];
			b0 = csafe_crypto_cipher_symm_Aes.T1[t0 & 255] ^ csafe_crypto_cipher_symm_Aes.T2[t1 >> 8 & 255] ^ csafe_crypto_cipher_symm_Aes.T3[t2 >> 16 & 255] ^ csafe_crypto_cipher_symm_Aes.T4[t3 >>> 24];
			b1 = csafe_crypto_cipher_symm_Aes.T1[t1 & 255] ^ csafe_crypto_cipher_symm_Aes.T2[t2 >> 8 & 255] ^ csafe_crypto_cipher_symm_Aes.T3[t3 >> 16 & 255] ^ csafe_crypto_cipher_symm_Aes.T4[t0 >>> 24];
			b2 = csafe_crypto_cipher_symm_Aes.T1[t2 & 255] ^ csafe_crypto_cipher_symm_Aes.T2[t3 >> 8 & 255] ^ csafe_crypto_cipher_symm_Aes.T3[t0 >> 16 & 255] ^ csafe_crypto_cipher_symm_Aes.T4[t1 >>> 24];
			b3 = csafe_crypto_cipher_symm_Aes.T1[t3 & 255] ^ csafe_crypto_cipher_symm_Aes.T2[t0 >> 8 & 255] ^ csafe_crypto_cipher_symm_Aes.T3[t1 >> 16 & 255] ^ csafe_crypto_cipher_symm_Aes.T4[t2 >>> 24];
		}
		r = rounds - 1;
		t0 = b0 ^ ctx.rk[r][0];
		t1 = b1 ^ ctx.rk[r][1];
		t2 = b2 ^ ctx.rk[r][2];
		t3 = b3 ^ ctx.rk[r][3];
		b[0] = csafe_crypto_cipher_symm_Aes.F1(t0,t1,t2,t3) ^ ctx.rk[rounds][0];
		b[1] = csafe_crypto_cipher_symm_Aes.F1(t1,t2,t3,t0) ^ ctx.rk[rounds][1];
		b[2] = csafe_crypto_cipher_symm_Aes.F1(t2,t3,t0,t1) ^ ctx.rk[rounds][2];
		b[3] = csafe_crypto_cipher_symm_Aes.F1(t3,t0,t1,t2) ^ ctx.rk[rounds][3];
		return util_Int32Util.packLE(b);
	}
	,AESdecrypt: function(block,ctx) {
		var t0;
		var t1;
		var t2;
		var t3;
		var b = util_Int32Util.unpackLE(block);
		var r = ctx.rounds;
		while(r > 1) {
			t0 = b[0] ^ ctx.rk[r][0];
			t1 = b[1] ^ ctx.rk[r][1];
			t2 = b[2] ^ ctx.rk[r][2];
			t3 = b[3] ^ ctx.rk[r][3];
			b[0] = csafe_crypto_cipher_symm_Aes.T5[csafe_crypto_cipher_symm_Aes.B0(t0)] ^ csafe_crypto_cipher_symm_Aes.T6[csafe_crypto_cipher_symm_Aes.B1(t3)] ^ csafe_crypto_cipher_symm_Aes.T7[csafe_crypto_cipher_symm_Aes.B2(t2)] ^ csafe_crypto_cipher_symm_Aes.T8[csafe_crypto_cipher_symm_Aes.B3(t1)];
			b[1] = csafe_crypto_cipher_symm_Aes.T5[csafe_crypto_cipher_symm_Aes.B0(t1)] ^ csafe_crypto_cipher_symm_Aes.T6[csafe_crypto_cipher_symm_Aes.B1(t0)] ^ csafe_crypto_cipher_symm_Aes.T7[csafe_crypto_cipher_symm_Aes.B2(t3)] ^ csafe_crypto_cipher_symm_Aes.T8[csafe_crypto_cipher_symm_Aes.B3(t2)];
			b[2] = csafe_crypto_cipher_symm_Aes.T5[csafe_crypto_cipher_symm_Aes.B0(t2)] ^ csafe_crypto_cipher_symm_Aes.T6[csafe_crypto_cipher_symm_Aes.B1(t1)] ^ csafe_crypto_cipher_symm_Aes.T7[csafe_crypto_cipher_symm_Aes.B2(t0)] ^ csafe_crypto_cipher_symm_Aes.T8[csafe_crypto_cipher_symm_Aes.B3(t3)];
			b[3] = csafe_crypto_cipher_symm_Aes.T5[csafe_crypto_cipher_symm_Aes.B0(t3)] ^ csafe_crypto_cipher_symm_Aes.T6[csafe_crypto_cipher_symm_Aes.B1(t2)] ^ csafe_crypto_cipher_symm_Aes.T7[csafe_crypto_cipher_symm_Aes.B2(t1)] ^ csafe_crypto_cipher_symm_Aes.T8[csafe_crypto_cipher_symm_Aes.B3(t0)];
			--r;
		}
		t0 = b[0] ^ ctx.rk[1][0];
		t1 = b[1] ^ ctx.rk[1][1];
		t2 = b[2] ^ ctx.rk[1][2];
		t3 = b[3] ^ ctx.rk[1][3];
		b[0] = csafe_crypto_cipher_symm_Aes.S5[csafe_crypto_cipher_symm_Aes.B0(t0)] | csafe_crypto_cipher_symm_Aes.S5[csafe_crypto_cipher_symm_Aes.B1(t3)] << 8 | csafe_crypto_cipher_symm_Aes.S5[csafe_crypto_cipher_symm_Aes.B2(t2)] << 16 | csafe_crypto_cipher_symm_Aes.S5[csafe_crypto_cipher_symm_Aes.B3(t1)] << 24;
		b[1] = csafe_crypto_cipher_symm_Aes.S5[csafe_crypto_cipher_symm_Aes.B0(t1)] | csafe_crypto_cipher_symm_Aes.S5[csafe_crypto_cipher_symm_Aes.B1(t0)] << 8 | csafe_crypto_cipher_symm_Aes.S5[csafe_crypto_cipher_symm_Aes.B2(t3)] << 16 | csafe_crypto_cipher_symm_Aes.S5[csafe_crypto_cipher_symm_Aes.B3(t2)] << 24;
		b[2] = csafe_crypto_cipher_symm_Aes.S5[csafe_crypto_cipher_symm_Aes.B0(t2)] | csafe_crypto_cipher_symm_Aes.S5[csafe_crypto_cipher_symm_Aes.B1(t1)] << 8 | csafe_crypto_cipher_symm_Aes.S5[csafe_crypto_cipher_symm_Aes.B2(t0)] << 16 | csafe_crypto_cipher_symm_Aes.S5[csafe_crypto_cipher_symm_Aes.B3(t3)] << 24;
		b[3] = csafe_crypto_cipher_symm_Aes.S5[csafe_crypto_cipher_symm_Aes.B0(t3)] | csafe_crypto_cipher_symm_Aes.S5[csafe_crypto_cipher_symm_Aes.B1(t2)] << 8 | csafe_crypto_cipher_symm_Aes.S5[csafe_crypto_cipher_symm_Aes.B2(t1)] << 16 | csafe_crypto_cipher_symm_Aes.S5[csafe_crypto_cipher_symm_Aes.B3(t0)] << 24;
		b[0] = b[0] ^ ctx.rk[0][0];
		b[1] = b[1] ^ ctx.rk[0][1];
		b[2] = b[2] ^ ctx.rk[0][2];
		b[3] = b[3] ^ ctx.rk[0][3];
		return util_Int32Util.packLE(b);
	}
	,__class__: csafe_crypto_cipher_symm_Aes
};
var csafe_crypto_cipher_symm_Des = function(key) {
	if(key.length < 8) {
		throw new js__$Boot_HaxeError(new Exception("Must be 8 bytes of key data"));
	}
	this.key = key;
	this.encKey = this.generateWorkingKey(true,key,0);
	this.decKey = this.generateWorkingKey(false,key,0);
};
csafe_crypto_cipher_symm_Des.__name__ = ["csafe","crypto","cipher","symm","Des"];
csafe_crypto_cipher_symm_Des.__interfaces__ = [csafe_crypto_cipher_IBlockCipher];
csafe_crypto_cipher_symm_Des.prototype = {
	get_blockSize: function() {
		return 8;
	}
	,decryptBlock: function(block) {
		var outBlock = new haxe_io_Bytes(new ArrayBuffer(block.length));
		this.desFunc(this.decKey,block,0,outBlock,0);
		return outBlock;
	}
	,dispose: function() {
		var _g1 = 0;
		var _g = this.encKey.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.encKey[i] = 0;
		}
		var _g11 = 0;
		var _g2 = this.decKey.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			this.decKey[i1] = 0;
		}
		this.encKey = null;
		this.decKey = null;
		var _g12 = 0;
		var _g3 = this.key.length;
		while(_g12 < _g3) {
			var i2 = _g12++;
			this.key.b[i2] = 0;
		}
		this.key = null;
	}
	,encryptBlock: function(block) {
		var outBlock = new haxe_io_Bytes(new ArrayBuffer(block.length));
		this.desFunc(this.encKey,block,0,outBlock,0);
		return outBlock;
	}
	,generateWorkingKey: function(encrypting,key,off) {
		var newKey = [];
		var pc1m = [];
		var pcr = [];
		var l;
		var _g = 0;
		while(_g < 56) {
			var j = _g++;
			l = csafe_crypto_cipher_symm_Des.pc1[j];
			pc1m[j] = (key.b[off + (l >>> 3)] & csafe_crypto_cipher_symm_Des.bytebit[l & 7]) != 0;
		}
		var _g1 = 0;
		while(_g1 < 16) {
			var i = _g1++;
			var m;
			var n;
			if(encrypting) {
				m = i << 1;
			} else {
				m = 15 - i << 1;
			}
			n = m + 1;
			newKey[m] = newKey[n] = 0;
			var _g11 = 0;
			while(_g11 < 28) {
				var j1 = _g11++;
				l = j1 + csafe_crypto_cipher_symm_Des.totrot[i] | 0;
				if(l < 28) {
					pcr[j1] = pc1m[l];
				} else {
					pcr[j1] = pc1m[l - 28];
				}
			}
			var _g12 = 28;
			while(_g12 < 56) {
				var j2 = _g12++;
				l = j2 + csafe_crypto_cipher_symm_Des.totrot[i] | 0;
				if(l < 56) {
					pcr[j2] = pc1m[l];
				} else {
					pcr[j2] = pc1m[l - 28];
				}
			}
			var _g13 = 0;
			while(_g13 < 24) {
				var j3 = _g13++;
				if(pcr[csafe_crypto_cipher_symm_Des.pc2[j3]]) {
					newKey[m] = newKey[m] | csafe_crypto_cipher_symm_Des.bigbyte[j3];
				}
				if(pcr[csafe_crypto_cipher_symm_Des.pc2[j3 + 24]]) {
					newKey[n] = newKey[n] | csafe_crypto_cipher_symm_Des.bigbyte[j3];
				}
			}
		}
		var i1 = 0;
		while(i1 < 32) {
			var i11;
			var i2;
			i11 = newKey[i1];
			i2 = newKey[i1 + 1];
			newKey[i1] = (i11 & 16515072) << 6 | (i11 & 4032) << 10 | (i2 & 16515072) >>> 10 | (i2 & 4032) >>> 6;
			newKey[i1 + 1] = (i11 & 258048) << 12 | (i11 & 63) << 16 | (i2 & 258048) >>> 4 | i2 & 63;
			i1 += 2;
		}
		return newKey;
	}
	,desFunc: function(wKey,inp,inOff,out,outOff) {
		var work = 0;
		var right = 0;
		var left = 0;
		left = (inp.b[inOff] & 255) << 24;
		left = left | (inp.b[inOff + 1] & 255) << 16;
		left = left | (inp.b[inOff + 2] & 255) << 8;
		left = left | inp.b[inOff + 3] & 255;
		right = (inp.b[inOff + 4] & 255) << 24;
		right = right | (inp.b[inOff + 5] & 255) << 16;
		right = right | (inp.b[inOff + 6] & 255) << 8;
		right = right | inp.b[inOff + 7] & 255;
		work = (left >>> 4 ^ right) & 252645135;
		right = right ^ work;
		left = left ^ work << 4;
		work = (left >>> 16 ^ right) & 65535;
		right = right ^ work;
		left = left ^ work << 16;
		work = (right >>> 2 ^ left) & 858993459;
		left = left ^ work;
		right = right ^ work << 2;
		work = (right >>> 8 ^ left) & 16711935;
		left = left ^ work;
		right = right ^ work << 8;
		right = (right << 1 | right >>> 31 & 1) & -1;
		work = (left ^ right) & -1431655766;
		left = left ^ work;
		right = right ^ work;
		left = (left << 1 | left >>> 31 & 1) & -1;
		var _g = 0;
		while(_g < 8) {
			var round = _g++;
			var fval = 0;
			work = right << 28 | right >>> 4;
			work = work ^ wKey[round * 4];
			fval = csafe_crypto_cipher_symm_Des.SP7[work & 63];
			fval = fval | csafe_crypto_cipher_symm_Des.SP5[work >>> 8 & 63];
			fval = fval | csafe_crypto_cipher_symm_Des.SP3[work >>> 16 & 63];
			fval = fval | csafe_crypto_cipher_symm_Des.SP1[work >>> 24 & 63];
			work = right ^ wKey[round * 4 + 1];
			fval = fval | csafe_crypto_cipher_symm_Des.SP8[work & 63];
			fval = fval | csafe_crypto_cipher_symm_Des.SP6[work >>> 8 & 63];
			fval = fval | csafe_crypto_cipher_symm_Des.SP4[work >>> 16 & 63];
			fval = fval | csafe_crypto_cipher_symm_Des.SP2[work >>> 24 & 63];
			left = left ^ fval;
			work = left << 28 | left >>> 4;
			work = work ^ wKey[round * 4 + 2];
			fval = csafe_crypto_cipher_symm_Des.SP7[work & 63];
			fval = fval | csafe_crypto_cipher_symm_Des.SP5[work >>> 8 & 63];
			fval = fval | csafe_crypto_cipher_symm_Des.SP3[work >>> 16 & 63];
			fval = fval | csafe_crypto_cipher_symm_Des.SP1[work >>> 24 & 63];
			work = left ^ wKey[round * 4 + 3];
			fval = fval | csafe_crypto_cipher_symm_Des.SP8[work & 63];
			fval = fval | csafe_crypto_cipher_symm_Des.SP6[work >>> 8 & 63];
			fval = fval | csafe_crypto_cipher_symm_Des.SP4[work >>> 16 & 63];
			fval = fval | csafe_crypto_cipher_symm_Des.SP2[work >>> 24 & 63];
			right = right ^ fval;
		}
		right = right << 31 | right >>> 1;
		work = (left ^ right) & -1431655766;
		left = left ^ work;
		right = right ^ work;
		left = left << 31 | left >>> 1;
		work = (left >>> 8 ^ right) & 16711935;
		right = right ^ work;
		left = left ^ work << 8;
		work = (left >>> 2 ^ right) & 858993459;
		right = right ^ work;
		left = left ^ work << 2;
		work = (right >>> 16 ^ left) & 65535;
		left = left ^ work;
		right = right ^ work << 16;
		work = (right >>> 4 ^ left) & 252645135;
		left = left ^ work;
		right = right ^ work << 4;
		out.b[outOff] = right >>> 24 & 255 & 255;
		out.b[outOff + 1] = right >>> 16 & 255 & 255;
		out.b[outOff + 2] = right >>> 8 & 255 & 255;
		out.b[outOff + 3] = right & 255 & 255;
		out.b[outOff + 4] = left >>> 24 & 255 & 255;
		out.b[outOff + 5] = left >>> 16 & 255 & 255;
		out.b[outOff + 6] = left >>> 8 & 255 & 255;
		out.b[outOff + 7] = left & 255 & 255;
	}
	,toString: function() {
		return "DES";
	}
	,__class__: csafe_crypto_cipher_symm_Des
};
var csafe_crypto_cipher_symm_RC2 = function(key) {
	this.sKey = [];
	this.S_BOX = [-39,120,-7,-60,25,-35,-75,-19,40,-23,-3,121,74,-96,-40,-99,-58,126,55,-125,43,118,83,-114,98,76,100,-120,68,-117,-5,-94,23,-102,89,-11,-121,-77,79,19,97,69,109,-115,9,-127,125,50,-67,-113,64,-21,-122,-73,123,11,-16,-107,33,34,92,107,78,-126,84,-42,101,-109,-50,96,-78,28,115,86,-64,20,-89,-116,-15,-36,18,117,-54,31,59,-66,-28,-47,66,61,-44,48,-93,60,-74,38,111,-65,14,-38,70,105,7,87,39,-14,29,-101,-68,-108,67,3,-8,17,-57,-10,-112,-17,62,-25,6,-61,-43,47,-56,102,30,-41,8,-24,-22,-34,-128,82,-18,-9,-124,-86,114,-84,53,77,106,42,-106,26,-46,113,90,21,73,116,75,-97,-48,94,4,24,-92,-20,-62,-32,65,110,15,81,-53,-52,36,-111,-81,80,-95,-12,112,57,-103,124,58,-123,35,-72,-76,122,-4,2,54,91,37,85,-105,49,45,93,-6,-104,-29,-118,-110,-82,5,-33,41,16,103,108,-70,-55,-45,0,-26,-49,-31,-98,-88,44,99,22,1,63,88,-30,-119,-87,13,56,52,27,-85,51,-1,-80,-69,72,12,95,-71,-79,-51,46,-59,-13,-37,71,-27,-91,-100,119,10,-90,32,104,-2,127,-63,-83];
	this.engineInit(key);
};
csafe_crypto_cipher_symm_RC2.__name__ = ["csafe","crypto","cipher","symm","RC2"];
csafe_crypto_cipher_symm_RC2.__interfaces__ = [csafe_crypto_cipher_IBlockCipher];
csafe_crypto_cipher_symm_RC2.prototype = {
	get_blockSize: function() {
		return 8;
	}
	,bytesToShortsLE: function(inBytes,inOff,outShorts,outOff,shortLen) {
		var _g1 = 0;
		var _g = shortLen;
		while(_g1 < _g) {
			var i = _g1++;
			var j = inOff + (i << 1) + 1;
			outShorts[outOff + i] = (inBytes.b[j--] & 255) << 8 | inBytes.b[j] & 255;
		}
	}
	,shortsToBytesLE: function(inShorts,inOff,outBytes,outOff,shortLen) {
		var _g1 = 0;
		var _g = shortLen;
		while(_g1 < _g) {
			var i = _g1++;
			outBytes.b[outOff + (i << 1) + 1] = 255 & inShorts[inOff + i] >>> 8 & 255;
			outBytes.b[outOff + (i << 1)] = 255 & inShorts[inOff + i] & 255;
		}
	}
	,arraycopy: function(source,sourceOffset,target,targetOffset,length) {
		var _g1 = 0;
		var _g = length;
		while(_g1 < _g) {
			var i = _g1++;
			target[targetOffset + i] = source[sourceOffset + i];
		}
	}
	,engineInit: function(key) {
		var keylen = key.length;
		var kl = keylen * 8;
		var sk = [];
		var _g1 = 0;
		var _g = keylen;
		while(_g1 < _g) {
			var i = _g1++;
			sk[i] = key.b[i];
		}
		var j = sk[keylen - 1];
		var l = 0;
		var k = keylen;
		while(k < 128) {
			j = this.S_BOX[sk[l] + j & 255];
			sk[k] = 255 & j;
			++l;
			++k;
		}
		l = kl + 7 >> 3;
		var m = 128 - l;
		var n = 255 >> (-kl & 7);
		j = this.S_BOX[sk[m] & n];
		sk[m] = 255 & j;
		while(m-- > 0) {
			var k2 = (sk[m + l] ^ j) & 255;
			j = this.S_BOX[k2] & 255;
			sk[m] = 255 & j;
		}
		this.bytesToShortsLE(util_BytesUtil.intArrayToBytes(sk),0,this.sKey,0,64);
	}
	,encryptBlock: function(input) {
		var ina = [];
		var output = new haxe_io_Bytes(new ArrayBuffer(input.length));
		this.bytesToShortsLE(input,0,ina,0,4);
		this.coreEncrypt(ina);
		this.shortsToBytesLE(ina,0,output,0,4);
		return output;
	}
	,decryptBlock: function(input) {
		var ina = [];
		var output = new haxe_io_Bytes(new ArrayBuffer(input.length));
		this.bytesToShortsLE(input,0,ina,0,4);
		this.coreDecrypt(ina);
		this.shortsToBytesLE(ina,0,output,0,4);
		return output;
	}
	,coreEncrypt: function(temp) {
		var w0 = temp[0];
		var w1 = temp[1];
		var w2 = temp[2];
		var w3 = temp[3];
		var i = 0;
		while(i < 64) {
			w0 = w0 + (w1 & ~w3) + (w2 & w3) + this.sKey[i] & 65535;
			w0 = w0 << 1 | w0 >> 15;
			w1 = w1 + (w2 & ~w0) + (w3 & w0) + this.sKey[i + 1] & 65535;
			w1 = w1 << 2 | w1 >> 14;
			w2 = w2 + (w3 & ~w1) + (w0 & w1) + this.sKey[i + 2] & 65535;
			w2 = w2 << 3 | w2 >> 13;
			w3 = w3 + (w0 & ~w2) + (w1 & w2) + this.sKey[i + 3] & 65535;
			w3 = w3 << 5 | w3 >> 11;
			if((i += 4) == 20 || i == 44) {
				w0 += this.sKey[w3 & 63];
				w1 += this.sKey[w0 & 63];
				w2 += this.sKey[w1 & 63];
				w3 += this.sKey[w2 & 63];
			}
		}
		temp[0] = w0;
		temp[1] = w1;
		temp[2] = w2;
		temp[3] = w3;
	}
	,coreDecrypt: function(temp) {
		var w0 = temp[0];
		var w1 = temp[1];
		var w2 = temp[2];
		var w3 = temp[3];
		var i = 63;
		while(i > 0) {
			w3 = (w3 << 11 | w3 >> 5) & 65535;
			w3 = w3 - (w0 & ~w2) - (w1 & w2) - this.sKey[i] & 65535;
			w2 = (w2 << 13 | w2 >> 3) & 65535;
			w2 = w2 - (w3 & ~w1) - (w0 & w1) - this.sKey[i - 1] & 65535;
			w1 = (w1 << 14 | w1 >> 2) & 65535;
			w1 = w1 - (w2 & ~w0) - (w3 & w0) - this.sKey[i - 2] & 65535;
			w0 = (w0 << 15 | w0 >> 1) & 65535;
			w0 = w0 - (w1 & ~w3) - (w2 & w3) - this.sKey[i - 3] & 65535;
			if((i -= 4) == 19 || i == 43) {
				w3 = w3 - this.sKey[w2 & 63] & 65535;
				w2 = w2 - this.sKey[w1 & 63] & 65535;
				w1 = w1 - this.sKey[w0 & 63] & 65535;
				w0 = w0 - this.sKey[w3 & 63] & 65535;
			}
		}
		temp[0] = w0;
		temp[1] = w1;
		temp[2] = w2;
		temp[3] = w3;
	}
	,__class__: csafe_crypto_cipher_symm_RC2
};
var csafe_crypto_cipher_symm_RC4 = function(key) {
	this.sBox = [];
	this.engineInit(key);
};
csafe_crypto_cipher_symm_RC4.__name__ = ["csafe","crypto","cipher","symm","RC4"];
csafe_crypto_cipher_symm_RC4.__interfaces__ = [csafe_crypto_cipher_IBlockCipher];
csafe_crypto_cipher_symm_RC4.prototype = {
	get_blockSize: function() {
		return 16;
	}
	,engineInit: function(key) {
		this.makeKey(key);
	}
	,makeKey: function(key) {
		this.x = this.y = 0;
		var klen = key.length;
		var _g = 0;
		while(_g < 256) {
			var i = _g++;
			this.sBox[i] = i;
		}
		var i1 = 0;
		var i2 = 0;
		var t;
		var _g1 = 0;
		while(_g1 < 256) {
			var j = _g1++;
			i2 = (key.b[i1] & 255) + this.sBox[j] + i2 & 255;
			t = this.sBox[j];
			this.sBox[j] = this.sBox[i2];
			this.sBox[i2] = t;
			i1 = (i1 + 1) % klen;
		}
	}
	,encryptBlock: function(input) {
		var t;
		var xorIndex;
		var output = new haxe_io_Bytes(new ArrayBuffer(input.length));
		var _g1 = 0;
		var _g = input.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.x = this.x + 1 & 255;
			this.y = this.sBox[this.x] + this.y & 255;
			t = this.sBox[this.x];
			this.sBox[this.x] = this.sBox[this.y];
			this.sBox[this.y] = t;
			xorIndex = this.sBox[this.x] + this.sBox[this.y] & 255;
			output.b[i] = 255 & (input.b[i] ^ this.sBox[xorIndex]) & 255;
		}
		return output;
	}
	,decryptBlock: function(input) {
		return this.encryptBlock(input);
	}
	,__class__: csafe_crypto_cipher_symm_RC4
};
var csafe_crypto_cipher_symm_SEED = function(key) {
	this.xor = [];
	this.sKey = [];
	this.engineInit(key);
};
csafe_crypto_cipher_symm_SEED.__name__ = ["csafe","crypto","cipher","symm","SEED"];
csafe_crypto_cipher_symm_SEED.__interfaces__ = [csafe_crypto_cipher_IBlockCipher];
csafe_crypto_cipher_symm_SEED.prototype = {
	get_blockSize: function() {
		return 16;
	}
	,encryptBlock: function(data) {
		this.modeEncrypt_ = true;
		var out = [];
		this.coreCrypt(util_BytesUtil.bytesToIntArray(data),0,out,0);
		return util_BytesUtil.intArrayToBytes(out);
	}
	,decryptBlock: function(data) {
		this.modeEncrypt_ = false;
		var out = [];
		this.coreCrypt(util_BytesUtil.bytesToIntArray(data),0,out,0);
		return util_BytesUtil.intArrayToBytes(out);
	}
	,coreCrypt: function(inBuff,inOffset,out,outOffset) {
		var lr = [(inBuff[inOffset] & 255) << 24 | (inBuff[inOffset + 1] & 255) << 16 | (inBuff[inOffset + 2] & 255) << 8 | inBuff[inOffset + 3] & 255,(inBuff[inOffset + 4] & 255) << 24 | (inBuff[inOffset + 5] & 255) << 16 | (inBuff[inOffset + 6] & 255) << 8 | inBuff[inOffset + 7] & 255,(inBuff[inOffset + 8] & 255) << 24 | (inBuff[inOffset + 9] & 255) << 16 | (inBuff[inOffset + 10] & 255) << 8 | inBuff[inOffset + 11] & 255,(inBuff[inOffset + 12] & 255) << 24 | (inBuff[inOffset + 13] & 255) << 16 | (inBuff[inOffset + 14] & 255) << 8 | inBuff[inOffset + 15] & 255];
		if(this.modeEncrypt_) {
			this.encryptBase(lr);
		} else {
			this.decryptBase(lr);
		}
		var R0_ = lr[0];
		var R1_ = lr[1];
		var L0_ = lr[2];
		var L1_ = lr[3];
		out[outOffset++] = L0_ >> 24 & 255;
		out[outOffset++] = L0_ >> 16 & 255;
		out[outOffset++] = L0_ >> 8 & 255;
		out[outOffset++] = L0_ & 255;
		out[outOffset++] = L1_ >> 24 & 255;
		out[outOffset++] = L1_ >> 16 & 255;
		out[outOffset++] = L1_ >> 8 & 255;
		out[outOffset++] = L1_ & 255;
		out[outOffset++] = R0_ >> 24 & 255;
		out[outOffset++] = R0_ >> 16 & 255;
		out[outOffset++] = R0_ >> 8 & 255;
		out[outOffset++] = R0_ & 255;
		out[outOffset++] = R1_ >> 24 & 255;
		out[outOffset++] = R1_ >> 16 & 255;
		out[outOffset++] = R1_ >> 8 & 255;
		out[outOffset++] = R1_ & 255;
	}
	,decrypt: function(input,inOffset,inLen,output,outOffset) {
		this.coreCrypt(input,inOffset,output,outOffset);
	}
	,decryptBase: function(io) {
		var L0_ = io[0];
		var L1_ = io[1];
		var R0_ = io[2];
		var R1_ = io[3];
		var u = 0;
		var t = 0;
		var temp0 = 0;
		var temp1 = 0;
		var i = csafe_crypto_cipher_symm_SEED.INTERNAL_KEY_LENGTH - 1;
		while(i > 0) {
			t = R1_ ^ this.sKey[i--];
			u = R0_ ^ this.sKey[i--];
			t ^= u;
			t = csafe_crypto_cipher_symm_SEED.SS0[t & 255] ^ csafe_crypto_cipher_symm_SEED.SS1[t >>> 8 & 255] ^ csafe_crypto_cipher_symm_SEED.SS2[t >>> 16 & 255] ^ csafe_crypto_cipher_symm_SEED.SS3[t >>> 24 & 255];
			u += t;
			u = csafe_crypto_cipher_symm_SEED.SS0[u & 255] ^ csafe_crypto_cipher_symm_SEED.SS1[u >>> 8 & 255] ^ csafe_crypto_cipher_symm_SEED.SS2[u >>> 16 & 255] ^ csafe_crypto_cipher_symm_SEED.SS3[u >>> 24 & 255];
			t += u;
			t = csafe_crypto_cipher_symm_SEED.SS0[t & 255] ^ csafe_crypto_cipher_symm_SEED.SS1[t >>> 8 & 255] ^ csafe_crypto_cipher_symm_SEED.SS2[t >>> 16 & 255] ^ csafe_crypto_cipher_symm_SEED.SS3[t >>> 24 & 255];
			u += t;
			L0_ ^= u;
			L1_ ^= t;
			if(i > 0) {
				temp0 = R0_;
				temp1 = R1_;
				R0_ = L0_;
				R1_ = L1_;
				L0_ = temp0;
				L1_ = temp1;
			}
		}
		io[0] = R0_;
		io[1] = R1_;
		io[2] = L0_;
		io[3] = L1_;
	}
	,encrypt: function(input,inOffset,inLen,output,outOffset) {
		this.coreCrypt(input,inOffset,output,outOffset);
	}
	,encryptBase: function(io) {
		var L0_ = io[0];
		var L1_ = io[1];
		var R0_ = io[2];
		var R1_ = io[3];
		var u = 0;
		var t = 0;
		var temp0 = 0;
		var temp1 = 0;
		var i = 0;
		while(i < csafe_crypto_cipher_symm_SEED.INTERNAL_KEY_LENGTH) {
			u = R0_ ^ this.sKey[i++];
			t = R1_ ^ this.sKey[i++];
			t ^= u;
			t = csafe_crypto_cipher_symm_SEED.SS0[t & 255] ^ csafe_crypto_cipher_symm_SEED.SS1[t >>> 8 & 255] ^ csafe_crypto_cipher_symm_SEED.SS2[t >>> 16 & 255] ^ csafe_crypto_cipher_symm_SEED.SS3[t >>> 24 & 255];
			u += t;
			u = csafe_crypto_cipher_symm_SEED.SS0[u & 255] ^ csafe_crypto_cipher_symm_SEED.SS1[u >>> 8 & 255] ^ csafe_crypto_cipher_symm_SEED.SS2[u >>> 16 & 255] ^ csafe_crypto_cipher_symm_SEED.SS3[u >>> 24 & 255];
			t += u;
			t = csafe_crypto_cipher_symm_SEED.SS0[t & 255] ^ csafe_crypto_cipher_symm_SEED.SS1[t >>> 8 & 255] ^ csafe_crypto_cipher_symm_SEED.SS2[t >>> 16 & 255] ^ csafe_crypto_cipher_symm_SEED.SS3[t >>> 24 & 255];
			u += t;
			L0_ ^= u;
			L1_ ^= t;
			if(i < 31) {
				temp0 = R0_;
				temp1 = R1_;
				R0_ = L0_;
				R1_ = L1_;
				L0_ = temp0;
				L1_ = temp1;
			}
		}
		io[0] = R0_;
		io[1] = R1_;
		io[2] = L0_;
		io[3] = L1_;
	}
	,engineInit: function(key) {
		if(key.length != csafe_crypto_cipher_symm_SEED.KEY_LENGTH) {
			throw new js__$Boot_HaxeError(new Exception("키의 길이가 적합하지 않습니다."));
		}
		var userkey = util_BytesUtil.bytesToIntArray(key);
		var _g1 = 0;
		var _g = csafe_crypto_cipher_symm_SEED.ROUNDS;
		while(_g1 < _g) {
			var j = _g1++;
			var a = (userkey[0] & 255) << 24 | (userkey[1] & 255) << 16 | (userkey[2] & 255) << 8 | userkey[3] & 255;
			var b = (userkey[4] & 255) << 24 | (userkey[5] & 255) << 16 | (userkey[6] & 255) << 8 | userkey[7] & 255;
			var c = (userkey[8] & 255) << 24 | (userkey[9] & 255) << 16 | (userkey[10] & 255) << 8 | userkey[11] & 255;
			var d = (userkey[12] & 255) << 24 | (userkey[13] & 255) << 16 | (userkey[14] & 255) << 8 | userkey[15] & 255;
			var g_input0_ = a + c - csafe_crypto_cipher_symm_SEED.KC[j];
			var g_input1_ = b - d + csafe_crypto_cipher_symm_SEED.KC[j];
			var K0_ = csafe_crypto_cipher_symm_SEED.SS0[g_input0_ & 255] ^ csafe_crypto_cipher_symm_SEED.SS1[g_input0_ >>> 8 & 255] ^ csafe_crypto_cipher_symm_SEED.SS2[g_input0_ >>> 16 & 255] ^ csafe_crypto_cipher_symm_SEED.SS3[g_input0_ >>> 24 & 255];
			var K1_ = csafe_crypto_cipher_symm_SEED.SS0[g_input1_ & 255] ^ csafe_crypto_cipher_symm_SEED.SS1[g_input1_ >>> 8 & 255] ^ csafe_crypto_cipher_symm_SEED.SS2[g_input1_ >>> 16 & 255] ^ csafe_crypto_cipher_symm_SEED.SS3[g_input1_ >>> 24 & 255];
			this.sKey[2 * j] = K0_;
			this.sKey[2 * j + 1] = K1_;
			if(j % 2 == 0) {
				var temp = userkey[7];
				userkey[7] = userkey[6];
				userkey[6] = userkey[5];
				userkey[5] = userkey[4];
				userkey[4] = userkey[3];
				userkey[3] = userkey[2];
				userkey[2] = userkey[1];
				userkey[1] = userkey[0];
				userkey[0] = temp;
			} else {
				var temp1 = userkey[8];
				userkey[8] = userkey[9];
				userkey[9] = userkey[10];
				userkey[10] = userkey[11];
				userkey[11] = userkey[12];
				userkey[12] = userkey[13];
				userkey[13] = userkey[14];
				userkey[14] = userkey[15];
				userkey[15] = temp1;
			}
		}
	}
	,toBEInts: function(b,bytesOffset,ints,intsOffset,length) {
		if(length == null) {
			length = 1;
		}
		if(intsOffset == null) {
			intsOffset = 0;
		}
		var bytes = util_BytesUtil.bytesToIntArray(b);
		var _g1 = 0;
		var _g = length;
		while(_g1 < _g) {
			var i = _g1++;
			var j = bytesOffset + (i << 2);
			ints[intsOffset + i] = ((bytes[j++] & 255) << 24 | (bytes[j++] & 255) << 16 | (bytes[j++] & 255) << 8 | bytes[j]) & 255;
		}
	}
	,__class__: csafe_crypto_cipher_symm_SEED
};
var csafe_crypto_cipher_symm_TripleDes = function(key) {
	if(key.length < 16) {
		throw new js__$Boot_HaxeError(new Exception("Must be at least 16 bytes of key data"));
	}
	csafe_crypto_cipher_symm_Des.call(this,key);
	this.encKey2 = this.generateWorkingKey(false,key,8);
	this.decKey2 = this.generateWorkingKey(true,key,8);
	if(key.length > 16) {
		this.encKey3 = this.generateWorkingKey(true,key,16);
		this.decKey3 = this.generateWorkingKey(false,key,16);
	} else {
		this.encKey3 = this.encKey;
		this.decKey3 = this.decKey;
	}
};
csafe_crypto_cipher_symm_TripleDes.__name__ = ["csafe","crypto","cipher","symm","TripleDes"];
csafe_crypto_cipher_symm_TripleDes.__super__ = csafe_crypto_cipher_symm_Des;
csafe_crypto_cipher_symm_TripleDes.prototype = $extend(csafe_crypto_cipher_symm_Des.prototype,{
	dispose: function() {
		csafe_crypto_cipher_symm_Des.prototype.dispose.call(this);
		var i = 0;
		if(this.encKey2 != null) {
			var _g1 = 0;
			var _g = this.encKey2.length;
			while(_g1 < _g) {
				var i1 = _g1++;
				this.encKey2[i1] = 0;
			}
			this.encKey2 = null;
		}
		if(this.encKey3 != null) {
			var _g11 = 0;
			var _g2 = this.encKey3.length;
			while(_g11 < _g2) {
				var i2 = _g11++;
				this.encKey3[i2] = 0;
			}
			this.encKey3 = null;
		}
		if(this.decKey2 != null) {
			var _g12 = 0;
			var _g3 = this.decKey2.length;
			while(_g12 < _g3) {
				var i3 = _g12++;
				this.decKey2[i3] = 0;
			}
			this.decKey2 = null;
		}
		if(this.decKey3 != null) {
			var _g13 = 0;
			var _g4 = this.decKey3.length;
			while(_g13 < _g4) {
				var i4 = _g13++;
				this.decKey3[i4] = 0;
			}
			this.decKey3 = null;
		}
	}
	,encryptBlock: function(block) {
		var outBlock = new haxe_io_Bytes(new ArrayBuffer(block.length));
		this.desFunc(this.encKey,block,0,outBlock,0);
		this.desFunc(this.encKey2,outBlock,0,outBlock,0);
		this.desFunc(this.encKey3,outBlock,0,outBlock,0);
		return outBlock;
	}
	,decryptBlock: function(block) {
		var outBlock = new haxe_io_Bytes(new ArrayBuffer(block.length));
		this.desFunc(this.decKey3,block,0,outBlock,0);
		this.desFunc(this.decKey2,outBlock,0,outBlock,0);
		this.desFunc(this.decKey,outBlock,0,outBlock,0);
		return outBlock;
	}
	,toString: function() {
		return "3des";
	}
	,__class__: csafe_crypto_cipher_symm_TripleDes
});
var csafe_crypto_hash_HMAC = function(hashMethod,bits) {
	if(bits == null) {
		bits = 0;
	}
	this.hash = hashMethod;
	var hb = hashMethod.getLengthBits();
	if(bits == 0) {
		bits = hb;
	} else if(bits > hb) {
		bits = hb;
	}
	if(bits <= 0) {
		throw new js__$Boot_HaxeError("Invalid HMAC length");
	} else if(bits % 8 != 0) {
		throw new js__$Boot_HaxeError("Bits must be a multiple of 8");
	}
	this.bits = bits;
};
csafe_crypto_hash_HMAC.__name__ = ["csafe","crypto","hash","HMAC"];
csafe_crypto_hash_HMAC.prototype = {
	toString: function() {
		return "hmac-" + (this.bits > 0 ? Std.string(this.bits) + "-" : "") + Std.string(this.hash);
	}
	,dispose: function() {
		this.bits = 0;
		this.hash.dispose();
	}
	,calculate: function(key,msg) {
		var B = this.hash.getBlockSizeBytes();
		var K = key;
		if(K.length > B) {
			K = this.hash.calculate(K);
		}
		K = util_BytesUtil.nullPad(K,B);
		var Ki = new haxe_io_BytesBuffer();
		var Ko = new haxe_io_BytesBuffer();
		var _g1 = 0;
		var _g = K.length;
		while(_g1 < _g) {
			var i = _g1++;
			Ki.b.push(K.b[i] ^ 54);
			Ko.b.push(K.b[i] ^ 92);
		}
		if(K != key) {
			util_BytesUtil.zerorize(K);
		}
		var b1 = Ki.b;
		var b2 = msg.b;
		var _g11 = 0;
		var _g2 = msg.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			Ki.b.push(b2[i1]);
		}
		var src = this.hash.calculate(Ki.getBytes());
		var b11 = Ko.b;
		var b21 = src.b;
		var _g12 = 0;
		var _g3 = src.length;
		while(_g12 < _g3) {
			var i2 = _g12++;
			Ko.b.push(b21[i2]);
		}
		return this.hash.calculate(Ko.getBytes());
	}
	,__class__: csafe_crypto_hash_HMAC
};
var csafe_crypto_hash_IHash = function() { };
csafe_crypto_hash_IHash.__name__ = ["csafe","crypto","hash","IHash"];
csafe_crypto_hash_IHash.prototype = {
	__class__: csafe_crypto_hash_IHash
};
var csafe_crypto_hash_Md5 = function() {
};
csafe_crypto_hash_Md5.__name__ = ["csafe","crypto","hash","Md5"];
csafe_crypto_hash_Md5.__interfaces__ = [csafe_crypto_hash_IHash];
csafe_crypto_hash_Md5.encode = function(msg) {
	return csafe_crypto_hash_Md5.inst.doEncode(msg);
};
csafe_crypto_hash_Md5.prototype = {
	toString: function() {
		return "md5";
	}
	,calculate: function(msg) {
		return csafe_crypto_hash_Md5.encode(msg);
	}
	,calcHex: function(msg) {
		return csafe_crypto_hash_Md5.encode(msg).toHex();
	}
	,getLengthBytes: function() {
		return 16;
	}
	,getLengthBits: function() {
		return 128;
	}
	,getBlockSizeBytes: function() {
		return 64;
	}
	,getBlockSizeBits: function() {
		return 512;
	}
	,dispose: function() {
	}
	,bitOR: function(a,b) {
		var lsb = a & 1 | b & 1;
		var msb31 = a >>> 1 | b >>> 1;
		return msb31 << 1 | lsb;
	}
	,bitXOR: function(a,b) {
		var lsb = a & 1 ^ b & 1;
		var msb31 = a >>> 1 ^ b >>> 1;
		return msb31 << 1 | lsb;
	}
	,bitAND: function(a,b) {
		var lsb = a & 1 & (b & 1);
		var msb31 = a >>> 1 & b >>> 1;
		return msb31 << 1 | lsb;
	}
	,str2blks: function(str) {
		var nblk = (str.length + 8 >> 6) + 1;
		var blks = [];
		var _g1 = 0;
		var _g = nblk * 16;
		while(_g1 < _g) {
			var i = _g1++;
			blks[i] = 0;
		}
		var i1 = 0;
		while(i1 < str.length) {
			blks[i1 >> 2] |= str.b[i1] << (str.length * 8 + i1) % 4 * 8;
			++i1;
		}
		blks[i1 >> 2] |= 128 << (str.length * 8 + i1) % 4 * 8;
		var l = str.length * 8;
		blks[nblk * 16 - 2] = l & 255;
		blks[nblk * 16 - 2] |= (l >>> 8 & 255) << 8;
		blks[nblk * 16 - 2] |= (l >>> 16 & 255) << 16;
		blks[nblk * 16 - 2] |= (l >>> 24 & 255) << 24;
		return blks;
	}
	,rol: function(num,cnt) {
		return num << cnt | num >>> 32 - cnt;
	}
	,cmn: function(q,a,b,x,s,t) {
		return csafe_crypto_hash_Util.safeAdd(this.rol(csafe_crypto_hash_Util.safeAdd(csafe_crypto_hash_Util.safeAdd(a,q),csafe_crypto_hash_Util.safeAdd(x,t)),s),b);
	}
	,ff: function(a,b,c,d,x,s,t) {
		return this.cmn(this.bitOR(this.bitAND(b,c),this.bitAND(~b,d)),a,b,x,s,t);
	}
	,gg: function(a,b,c,d,x,s,t) {
		return this.cmn(this.bitOR(this.bitAND(b,d),this.bitAND(c,~d)),a,b,x,s,t);
	}
	,hh: function(a,b,c,d,x,s,t) {
		return this.cmn(this.bitXOR(this.bitXOR(b,c),d),a,b,x,s,t);
	}
	,ii: function(a,b,c,d,x,s,t) {
		return this.cmn(this.bitXOR(c,this.bitOR(b,~d)),a,b,x,s,t);
	}
	,doEncode: function(str) {
		var x = this.str2blks(str);
		var a = 1732584193;
		var b = -271733879;
		var c = -1732584194;
		var d = 271733878;
		var step;
		var i = 0;
		while(i < x.length) {
			var olda = a;
			var oldb = b;
			var oldc = c;
			var oldd = d;
			step = 0;
			a = this.ff(a,b,c,d,x[i],7,-680876936);
			d = this.ff(d,a,b,c,x[i + 1],12,-389564586);
			c = this.ff(c,d,a,b,x[i + 2],17,606105819);
			b = this.ff(b,c,d,a,x[i + 3],22,-1044525330);
			a = this.ff(a,b,c,d,x[i + 4],7,-176418897);
			d = this.ff(d,a,b,c,x[i + 5],12,1200080426);
			c = this.ff(c,d,a,b,x[i + 6],17,-1473231341);
			b = this.ff(b,c,d,a,x[i + 7],22,-45705983);
			a = this.ff(a,b,c,d,x[i + 8],7,1770035416);
			d = this.ff(d,a,b,c,x[i + 9],12,-1958414417);
			c = this.ff(c,d,a,b,x[i + 10],17,-42063);
			b = this.ff(b,c,d,a,x[i + 11],22,-1990404162);
			a = this.ff(a,b,c,d,x[i + 12],7,1804603682);
			d = this.ff(d,a,b,c,x[i + 13],12,-40341101);
			c = this.ff(c,d,a,b,x[i + 14],17,-1502002290);
			b = this.ff(b,c,d,a,x[i + 15],22,1236535329);
			a = this.gg(a,b,c,d,x[i + 1],5,-165796510);
			d = this.gg(d,a,b,c,x[i + 6],9,-1069501632);
			c = this.gg(c,d,a,b,x[i + 11],14,643717713);
			b = this.gg(b,c,d,a,x[i],20,-373897302);
			a = this.gg(a,b,c,d,x[i + 5],5,-701558691);
			d = this.gg(d,a,b,c,x[i + 10],9,38016083);
			c = this.gg(c,d,a,b,x[i + 15],14,-660478335);
			b = this.gg(b,c,d,a,x[i + 4],20,-405537848);
			a = this.gg(a,b,c,d,x[i + 9],5,568446438);
			d = this.gg(d,a,b,c,x[i + 14],9,-1019803690);
			c = this.gg(c,d,a,b,x[i + 3],14,-187363961);
			b = this.gg(b,c,d,a,x[i + 8],20,1163531501);
			a = this.gg(a,b,c,d,x[i + 13],5,-1444681467);
			d = this.gg(d,a,b,c,x[i + 2],9,-51403784);
			c = this.gg(c,d,a,b,x[i + 7],14,1735328473);
			b = this.gg(b,c,d,a,x[i + 12],20,-1926607734);
			a = this.hh(a,b,c,d,x[i + 5],4,-378558);
			d = this.hh(d,a,b,c,x[i + 8],11,-2022574463);
			c = this.hh(c,d,a,b,x[i + 11],16,1839030562);
			b = this.hh(b,c,d,a,x[i + 14],23,-35309556);
			a = this.hh(a,b,c,d,x[i + 1],4,-1530992060);
			d = this.hh(d,a,b,c,x[i + 4],11,1272893353);
			c = this.hh(c,d,a,b,x[i + 7],16,-155497632);
			b = this.hh(b,c,d,a,x[i + 10],23,-1094730640);
			a = this.hh(a,b,c,d,x[i + 13],4,681279174);
			d = this.hh(d,a,b,c,x[i],11,-358537222);
			c = this.hh(c,d,a,b,x[i + 3],16,-722521979);
			b = this.hh(b,c,d,a,x[i + 6],23,76029189);
			a = this.hh(a,b,c,d,x[i + 9],4,-640364487);
			d = this.hh(d,a,b,c,x[i + 12],11,-421815835);
			c = this.hh(c,d,a,b,x[i + 15],16,530742520);
			b = this.hh(b,c,d,a,x[i + 2],23,-995338651);
			a = this.ii(a,b,c,d,x[i],6,-198630844);
			d = this.ii(d,a,b,c,x[i + 7],10,1126891415);
			c = this.ii(c,d,a,b,x[i + 14],15,-1416354905);
			b = this.ii(b,c,d,a,x[i + 5],21,-57434055);
			a = this.ii(a,b,c,d,x[i + 12],6,1700485571);
			d = this.ii(d,a,b,c,x[i + 3],10,-1894986606);
			c = this.ii(c,d,a,b,x[i + 10],15,-1051523);
			b = this.ii(b,c,d,a,x[i + 1],21,-2054922799);
			a = this.ii(a,b,c,d,x[i + 8],6,1873313359);
			d = this.ii(d,a,b,c,x[i + 15],10,-30611744);
			c = this.ii(c,d,a,b,x[i + 6],15,-1560198380);
			b = this.ii(b,c,d,a,x[i + 13],21,1309151649);
			a = this.ii(a,b,c,d,x[i + 4],6,-145523070);
			d = this.ii(d,a,b,c,x[i + 11],10,-1120210379);
			c = this.ii(c,d,a,b,x[i + 2],15,718787259);
			b = this.ii(b,c,d,a,x[i + 9],21,-343485551);
			a = csafe_crypto_hash_Util.safeAdd(a,olda);
			b = csafe_crypto_hash_Util.safeAdd(b,oldb);
			c = csafe_crypto_hash_Util.safeAdd(c,oldc);
			d = csafe_crypto_hash_Util.safeAdd(d,oldd);
			i += 16;
		}
		return util_Int32Util.packLE([a,b,c,d]);
	}
	,__class__: csafe_crypto_hash_Md5
};
var csafe_crypto_hash_Sha1 = function() {
};
csafe_crypto_hash_Sha1.__name__ = ["csafe","crypto","hash","Sha1"];
csafe_crypto_hash_Sha1.__interfaces__ = [csafe_crypto_hash_IHash];
csafe_crypto_hash_Sha1.encode = function(msg) {
	return haxe_crypto_Sha1.make(msg);
};
csafe_crypto_hash_Sha1.BE = function(val) {
	var bb = new haxe_io_BytesBuffer();
	bb.addInt32(val);
	var b = bb.getBytes();
	util_BytesUtil.reverse(b);
	return b;
};
csafe_crypto_hash_Sha1.prototype = {
	dispose: function() {
		var _g = 0;
		while(_g < 4) {
			var i = _g++;
			csafe_crypto_hash_Sha1.K[i] = 0;
		}
	}
	,toString: function() {
		return "sha1";
	}
	,calculate: function(msg) {
		return csafe_crypto_hash_Sha1.encode(msg);
	}
	,calcHex: function(msg) {
		return csafe_crypto_hash_Sha1.encode(msg).toHex();
	}
	,getLengthBytes: function() {
		return 20;
	}
	,getLengthBits: function() {
		return 160;
	}
	,getBlockSizeBytes: function() {
		return 64;
	}
	,getBlockSizeBits: function() {
		return 512;
	}
	,__class__: csafe_crypto_hash_Sha1
};
var csafe_crypto_hash_Sha256 = function() {
};
csafe_crypto_hash_Sha256.__name__ = ["csafe","crypto","hash","Sha256"];
csafe_crypto_hash_Sha256.__interfaces__ = [csafe_crypto_hash_IHash];
csafe_crypto_hash_Sha256.encode = function(s) {
	var tempPadded = util_BytesUtil.nullPad(s,4);
	var pb = util_Int32Util.unpackBE(tempPadded);
	util_BytesUtil.zerorize(tempPadded);
	var res = csafe_crypto_hash_Sha256.core_sha256(pb,s.length * csafe_crypto_hash_Sha256.charSize);
	return util_Int32Util.packBE(res);
};
csafe_crypto_hash_Sha256.S = function(X,n) {
	return X >>> n | X << 32 - n;
};
csafe_crypto_hash_Sha256.R = function(X,n) {
	return X >>> n;
};
csafe_crypto_hash_Sha256.Ch = function(x,y,z) {
	return x & y ^ ~x & z;
};
csafe_crypto_hash_Sha256.Maj = function(x,y,z) {
	return x & y ^ x & z ^ y & z;
};
csafe_crypto_hash_Sha256.Sigma0256 = function(x) {
	return (x >>> 2 | x << 30) ^ (x >>> 13 | x << 19) ^ (x >>> 22 | x << 10);
};
csafe_crypto_hash_Sha256.Sigma1256 = function(x) {
	return (x >>> 6 | x << 26) ^ (x >>> 11 | x << 21) ^ (x >>> 25 | x << 7);
};
csafe_crypto_hash_Sha256.Gamma0256 = function(x) {
	return (x >>> 7 | x << 25) ^ (x >>> 18 | x << 14) ^ x >>> 3;
};
csafe_crypto_hash_Sha256.Gamma1256 = function(x) {
	return (x >>> 17 | x << 15) ^ (x >>> 19 | x << 13) ^ x >>> 10;
};
csafe_crypto_hash_Sha256.core_sha256 = function(m,l) {
	var K = [1116352408,1899447441,-1245643825,-373957723,961987163,1508970993,-1841331548,-1424204075,-670586216,310598401,607225278,1426881987,1925078388,-2132889090,-1680079193,-1046744716,-459576895,-272742522,264347078,604807628,770255983,1249150122,1555081692,1996064986,-1740746414,-1473132947,-1341970488,-1084653625,-958395405,-710438585,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,-2117940946,-1838011259,-1564481375,-1474664885,-1035236496,-949202525,-778901479,-694614492,-200395387,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,-2067236844,-1933114872,-1866530822,-1538233109,-1090935817,-965641998];
	var HASH = [1779033703,-1150833019,1013904242,-1521486534,1359893119,-1694144372,528734635,1541459225];
	var W = [];
	W[64] = 0;
	var a;
	var b;
	var c;
	var d;
	var e;
	var f;
	var g;
	var h;
	var T1;
	var T2;
	m[l >> 5] |= 128 << 24 - l % 32;
	m[(l + 64 >> 9 << 4) + 15] = l;
	var i = 0;
	while(i < m.length) {
		a = HASH[0];
		b = HASH[1];
		c = HASH[2];
		d = HASH[3];
		e = HASH[4];
		f = HASH[5];
		g = HASH[6];
		h = HASH[7];
		var _g = 0;
		while(_g < 64) {
			var j = _g++;
			if(j < 16) {
				W[j] = m[j + i];
			} else {
				var x = W[j - 2];
				var tmp = csafe_crypto_hash_Util.safeAdd((x >>> 17 | x << 15) ^ (x >>> 19 | x << 13) ^ x >>> 10,W[j - 7]);
				var x1 = W[j - 15];
				W[j] = csafe_crypto_hash_Util.safeAdd(csafe_crypto_hash_Util.safeAdd(tmp,(x1 >>> 7 | x1 << 25) ^ (x1 >>> 18 | x1 << 14) ^ x1 >>> 3),W[j - 16]);
			}
			T1 = csafe_crypto_hash_Util.safeAdd(csafe_crypto_hash_Util.safeAdd(csafe_crypto_hash_Util.safeAdd(csafe_crypto_hash_Util.safeAdd(h,(e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^ (e >>> 25 | e << 7)),e & f ^ ~e & g),K[j]),W[j]);
			T2 = csafe_crypto_hash_Util.safeAdd((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^ (a >>> 22 | a << 10),a & b ^ a & c ^ b & c);
			h = g;
			g = f;
			f = e;
			e = csafe_crypto_hash_Util.safeAdd(d,T1);
			d = c;
			c = b;
			b = a;
			a = csafe_crypto_hash_Util.safeAdd(T1,T2);
		}
		HASH[0] = csafe_crypto_hash_Util.safeAdd(a,HASH[0]);
		HASH[1] = csafe_crypto_hash_Util.safeAdd(b,HASH[1]);
		HASH[2] = csafe_crypto_hash_Util.safeAdd(c,HASH[2]);
		HASH[3] = csafe_crypto_hash_Util.safeAdd(d,HASH[3]);
		HASH[4] = csafe_crypto_hash_Util.safeAdd(e,HASH[4]);
		HASH[5] = csafe_crypto_hash_Util.safeAdd(f,HASH[5]);
		HASH[6] = csafe_crypto_hash_Util.safeAdd(g,HASH[6]);
		HASH[7] = csafe_crypto_hash_Util.safeAdd(h,HASH[7]);
		i += 16;
	}
	return HASH;
};
csafe_crypto_hash_Sha256.prototype = {
	toString: function() {
		return "sha256";
	}
	,calculate: function(msg) {
		return csafe_crypto_hash_Sha256.encode(msg);
	}
	,calcHex: function(msg) {
		return csafe_crypto_hash_Sha256.encode(msg).toHex();
	}
	,getLengthBytes: function() {
		return 32;
	}
	,getLengthBits: function() {
		return 256;
	}
	,getBlockSizeBytes: function() {
		return 64;
	}
	,getBlockSizeBits: function() {
		return 512;
	}
	,dispose: function() {
	}
	,__class__: csafe_crypto_hash_Sha256
};
var csafe_crypto_hash_Util = function() { };
csafe_crypto_hash_Util.__name__ = ["csafe","crypto","hash","Util"];
csafe_crypto_hash_Util.safeAdd = function(x,y) {
	var lsw = (x & 65535) + (y & 65535);
	var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	return msw << 16 | lsw & 65535;
};
csafe_crypto_hash_Util.str2binb = function(str,charSize) {
	if(charSize == null) {
		charSize = 8;
	}
	if(charSize != 8 && charSize != 16) {
		throw new js__$Boot_HaxeError("Invalid character size");
	}
	var bin = [];
	var mask = (1 << charSize) - 1;
	var i = 0;
	var max = str.length * charSize;
	while(i < max) {
		bin[i >> 5] |= (HxOverrides.cca(str,i / charSize | 0) & mask) << 24 - i % 32;
		i += charSize;
	}
	return bin;
};
csafe_crypto_hash_Util.binb2hex = function(binarray) {
	var hex_tab = "0123456789abcdef";
	var sb_b = "";
	var _g1 = 0;
	var _g = binarray.length * 4;
	while(_g1 < _g) {
		var i = _g1++;
		sb_b += Std.string(hex_tab.charAt(binarray[i >> 2] >> (3 - i % 4) * 8 + 4 & 15));
		sb_b += Std.string(hex_tab.charAt(binarray[i >> 2] >> (3 - i % 4) * 8 & 15));
	}
	return sb_b;
};
var csafe_crypto_mode_ModeBase = function() {
	this.set_padding(new csafe_crypto_padding_PadPkcs5());
};
csafe_crypto_mode_ModeBase.__name__ = ["csafe","crypto","mode","ModeBase"];
csafe_crypto_mode_ModeBase.__interfaces__ = [csafe_crypto_cipher_IMode];
csafe_crypto_mode_ModeBase.prototype = {
	toString: function() {
		return "??";
	}
	,updateEncrypt: function(b,out) {
		throw new js__$Boot_HaxeError(new Exception("not implemented"));
	}
	,updateDecrypt: function(b,out) {
		throw new js__$Boot_HaxeError(new Exception("not implemented"));
	}
	,get_blockSize: function() {
		return this.cipher.get_blockSize();
	}
	,set_cipher: function(v) {
		this.cipher = v;
		if(this.padding != null) {
			this.padding.set_blockSize(this.cipher.get_blockSize());
		}
		return v;
	}
	,set_padding: function(v) {
		this.padding = v;
		if(this.cipher != null) {
			this.padding.set_blockSize(this.cipher.get_blockSize());
		}
		return v;
	}
	,init: function(params) {
		this.params = params;
	}
	,finalEncrypt: function(b,out) {
		var n = this.get_blockSize();
		var buf = this.padding.pad(b);
		var ptr = 0;
		var rv = 0;
		while(ptr < buf.length) {
			n = this.updateEncrypt(buf.sub(ptr,n),out);
			ptr += n;
			rv += n;
			if(n == 0) {
				throw new js__$Boot_HaxeError("error");
			}
		}
		return rv;
	}
	,finalDecrypt: function(b,out) {
		var n = this.get_blockSize();
		var bo = new haxe_io_BytesOutput();
		var ptr = 0;
		var rv = 0;
		while(ptr < b.length) {
			n = this.updateDecrypt(b.sub(ptr,n),bo);
			ptr += n;
			rv += n;
			if(n == 0) {
				throw new js__$Boot_HaxeError("error");
			}
		}
		var unPaded = this.padding.unpad(bo.getBytes());
		if(unPaded.length > 0) {
			out.writeBytes(unPaded,0,unPaded.length);
		}
		return rv;
	}
	,__class__: csafe_crypto_mode_ModeBase
};
var csafe_crypto_mode_IVBase = function() {
	csafe_crypto_mode_ModeBase.call(this);
};
csafe_crypto_mode_IVBase.__name__ = ["csafe","crypto","mode","IVBase"];
csafe_crypto_mode_IVBase.__super__ = csafe_crypto_mode_ModeBase;
csafe_crypto_mode_IVBase.prototype = $extend(csafe_crypto_mode_ModeBase.prototype,{
	init: function(params) {
		csafe_crypto_mode_ModeBase.prototype.init.call(this,params);
		if(params.prng == null) {
			params.prng = new csafe_math_prng_Random();
		}
		if(params.iv == null) {
			if(params.direction == csafe_crypto_cipher_CipherDirection.DECRYPT) {
				throw new js__$Boot_HaxeError("IV must be set before decryption");
			}
			var sb = new haxe_io_BytesBuffer();
			var _g1 = 0;
			var _g = this.cipher.get_blockSize();
			while(_g1 < _g) {
				var x = _g1++;
				var $byte = params.prng.next();
				sb.b.push($byte);
			}
			params.iv = sb.getBytes();
		}
		if(params.iv.length < this.cipher.get_blockSize()) {
			params.iv = util_BytesUtil.leftPad(params.iv,this.cipher.get_blockSize(),0);
		}
		this.currentIV = params.iv.sub(0,this.cipher.get_blockSize());
	}
	,get_iv: function() {
		return this.currentIV;
	}
	,set_cipher: function(v) {
		csafe_crypto_mode_ModeBase.prototype.set_cipher.call(this,v);
		if(v != null && this.currentIV != null && this.currentIV.length > v.get_blockSize()) {
			this.currentIV = this.currentIV.sub(0,v.get_blockSize());
		}
		return v;
	}
	,set_iv: function(s) {
		if(s.length == 0 || this.cipher != null && s.length != this.cipher.get_blockSize()) {
			throw new js__$Boot_HaxeError("crypt.iv: invalid length. Expected " + this.cipher.get_blockSize() + " bytes.");
		}
		var len = s.length;
		if(this.cipher != null && this.cipher.get_blockSize() < len) {
			len = this.cipher.get_blockSize();
		}
		this.currentIV = s.sub(0,len);
		return s;
	}
	,__class__: csafe_crypto_mode_IVBase
});
var csafe_crypto_mode_CBC = function() {
	csafe_crypto_mode_IVBase.call(this);
};
csafe_crypto_mode_CBC.__name__ = ["csafe","crypto","mode","CBC"];
csafe_crypto_mode_CBC.__interfaces__ = [csafe_crypto_cipher_IMode];
csafe_crypto_mode_CBC.__super__ = csafe_crypto_mode_IVBase;
csafe_crypto_mode_CBC.prototype = $extend(csafe_crypto_mode_IVBase.prototype,{
	toString: function() {
		return "cbc";
	}
	,updateEncrypt: function(b,out) {
		var n = this.cipher.get_blockSize();
		if(b.length != n) {
			return 0;
		}
		var _g1 = 0;
		var _g = n;
		while(_g1 < _g) {
			var i = _g1++;
			var v = b.b[i] ^ this.get_iv().b[i];
			b.b[i] = v & 255;
		}
		var crypted = this.cipher.encryptBlock(b);
		out.writeBytes(crypted,0,n);
		this.set_iv(crypted);
		return n;
	}
	,updateDecrypt: function(b,out) {
		var n = this.cipher.get_blockSize();
		if(b.length != n) {
			return 0;
		}
		var tmp = new haxe_io_Bytes(new ArrayBuffer(n));
		tmp.blit(0,b,0,n);
		var tb = this.cipher.decryptBlock(b);
		var _g1 = 0;
		var _g = this.cipher.get_blockSize();
		while(_g1 < _g) {
			var i = _g1++;
			var v = tb.b[i] ^ this.get_iv().b[i];
			tb.b[i] = v & 255;
		}
		out.writeBytes(tb,0,n);
		this.set_iv(tmp);
		return n;
	}
	,__class__: csafe_crypto_mode_CBC
});
var csafe_crypto_mode_ECB = function() {
	csafe_crypto_mode_ModeBase.call(this);
};
csafe_crypto_mode_ECB.__name__ = ["csafe","crypto","mode","ECB"];
csafe_crypto_mode_ECB.__interfaces__ = [csafe_crypto_cipher_IMode];
csafe_crypto_mode_ECB.__super__ = csafe_crypto_mode_ModeBase;
csafe_crypto_mode_ECB.prototype = $extend(csafe_crypto_mode_ModeBase.prototype,{
	toString: function() {
		return "ecb";
	}
	,updateEncrypt: function(b,out) {
		var n = this.get_blockSize();
		if(b.length != n) {
			return 0;
		}
		var enc = this.cipher.encryptBlock(b);
		out.writeBytes(enc,0,n);
		return n;
	}
	,updateDecrypt: function(b,out) {
		var n = this.get_blockSize();
		if(b.length != n) {
			return 0;
		}
		var dec = this.cipher.decryptBlock(b);
		out.writeBytes(dec,0,n);
		return n;
	}
	,__class__: csafe_crypto_mode_ECB
});
var csafe_crypto_padding_PadNull = function(blockSize) {
	if(blockSize != null) {
		this.set_blockSize(blockSize);
	}
};
csafe_crypto_padding_PadNull.__name__ = ["csafe","crypto","padding","PadNull"];
csafe_crypto_padding_PadNull.__interfaces__ = [csafe_crypto_cipher_IPad];
csafe_crypto_padding_PadNull.prototype = {
	pad: function(s) {
		var r = this.blockSize - s.length % this.blockSize;
		if(r == this.blockSize) {
			return s;
		}
		var sb = new haxe_io_BytesBuffer();
		var b1 = sb.b;
		var b2 = s.b;
		var _g1 = 0;
		var _g = s.length;
		while(_g1 < _g) {
			var i = _g1++;
			sb.b.push(b2[i]);
		}
		var _g11 = 0;
		var _g2 = r;
		while(_g11 < _g2) {
			var x = _g11++;
			sb.b.push(0);
		}
		return sb.getBytes();
	}
	,unpad: function(s) {
		return s;
	}
	,calcNumBlocks: function(len) {
		return Math.ceil(len / this.blockSize);
	}
	,set_blockSize: function(x) {
		this.blockSize = x;
		this.textSize = x;
		return x;
	}
	,__class__: csafe_crypto_padding_PadNull
};
var csafe_crypto_padding_PadPkcs5 = function(blockSize) {
	csafe_crypto_padding_PadBase.call(this,blockSize);
};
csafe_crypto_padding_PadPkcs5.__name__ = ["csafe","crypto","padding","PadPkcs5"];
csafe_crypto_padding_PadPkcs5.__interfaces__ = [csafe_crypto_cipher_IPad];
csafe_crypto_padding_PadPkcs5.__super__ = csafe_crypto_padding_PadBase;
csafe_crypto_padding_PadPkcs5.prototype = $extend(csafe_crypto_padding_PadBase.prototype,{
	calcNumBlocks: function(len) {
		var chr = this.blockSize - len % this.blockSize;
		return Math.floor((len + chr) / this.blockSize);
	}
	,pad: function(s) {
		var sb = new haxe_io_BytesBuffer();
		if(s.length > 0) {
			var b1 = sb.b;
			var b2 = s.b;
			var _g1 = 0;
			var _g = s.length;
			while(_g1 < _g) {
				var i = _g1++;
				sb.b.push(b2[i]);
			}
		}
		var chr = this.blockSize - s.length % this.blockSize;
		if(s.length == this.blockSize) {
			chr = this.blockSize;
		}
		var _g11 = 0;
		var _g2 = chr;
		while(_g11 < _g2) {
			var i1 = _g11++;
			sb.b.push(chr);
		}
		var rv = sb.getBytes();
		return rv;
	}
	,unpad: function(s) {
		if(s.length % this.blockSize != 0 || s.length < this.blockSize) {
			throw new js__$Boot_HaxeError("crypt.padpkcs5 unpad: buffer length " + s.length + " not multiple of block size " + this.blockSize);
		}
		var c = s.b[s.length - 1];
		var i = c;
		var pos = s.length - 1;
		while(i > 0) {
			var n = s.b[pos];
			if(c != n) {
				throw new js__$Boot_HaxeError("crypt.padpkcs5 unpad: invalid byte");
			}
			--pos;
			--i;
		}
		return s.sub(0,s.length - c);
	}
	,__class__: csafe_crypto_padding_PadPkcs5
});
var csafe_math_BigInteger = function() {
	if(csafe_math_BigInteger.BI_RC == null || csafe_math_BigInteger.BI_RC.length == 0) {
		csafe_math_BigInteger.initBiRc();
	}
	if(csafe_math_BigInteger.BI_RM.length == 0) {
		throw new js__$Boot_HaxeError("BI_RM not initialized");
	}
	this.chunks = [];
	var _g = csafe_math_BigInteger.defaultAm;
	switch(_g) {
	case 1:
		this.am = $bind(this,this.am1);
		break;
	case 2:
		this.am = $bind(this,this.am2);
		break;
	case 3:
		this.am = $bind(this,this.am3);
		break;
	default:
		throw new js__$Boot_HaxeError("am error");
	}
};
csafe_math_BigInteger.__name__ = ["csafe","math","BigInteger"];
csafe_math_BigInteger.jacobiSymbol = function(p,n) {
	if(p == 0) {
		return 0;
	}
	var j = 1;
	var u = n.chunks[n.chunks.length - 1];
	if(p < 0) {
		p = -p;
		var n8 = u & 7;
		if(n8 == 3 || n8 == 7) {
			j = -j;
		}
	}
	while((p & 3) == 0) p >>= 2;
	if((p & 1) == 0) {
		p >>= 1;
		if(((u ^ u >> 1) & 2) != 0) {
			j = -j;
		}
	}
	if(p == 1) {
		return j;
	}
	if((p & u & 2) != 0) {
		j = -j;
	}
	u = n.mod(csafe_math_BigInteger.ofInt(p)).toInt32();
	while(u != 0) {
		while((u & 3) == 0) u >>= 2;
		if((u & 1) == 0) {
			u >>= 1;
			if(((p ^ p >> 1) & 2) != 0) {
				j = -j;
			}
		}
		if(u == 1) {
			return j;
		}
		var t = u;
		u = p;
		p = t;
		if((u & p & 2) != 0) {
			j = -j;
		}
		u %= p;
	}
	return 0;
};
csafe_math_BigInteger.lucasLehmerSequence = function(z,k,n) {
	var d = csafe_math_BigInteger.ofInt(z);
	var u = csafe_math_BigInteger.get_ONE();
	var u2;
	var v = csafe_math_BigInteger.get_ONE();
	var v2;
	var i = k.bitLength() - 2;
	while(i >= 0) {
		--i;
		u2 = u.mul(v).mod(n);
		v2 = v.square().add(d.mul(u.square())).mod(n);
		if(v2.testBit(0)) {
			v2 = v2.sub(n);
		}
		v2 = v2.shr(1);
		u = u2;
		v = v2;
		if(k.testBit(i)) {
			u2 = u.add(v).mod(n);
			if(u2.testBit(0)) {
				u2 = u2.sub(n);
			}
			u2 = u2.shr(1);
			v2 = v.add(d.mul(u)).mod(n);
			if(v2.testBit(0)) {
				v2 = v2.sub(n);
			}
			v2 = v2.shr(1);
			u = u2;
			v = v2;
		}
	}
	return u;
};
csafe_math_BigInteger.initBiRc = function() {
	csafe_math_BigInteger.BI_RC = [];
	var rr = HxOverrides.cca("0",0);
	var _g = 0;
	while(_g < 10) {
		var vv = _g++;
		csafe_math_BigInteger.BI_RC[rr] = vv;
		++rr;
	}
	rr = HxOverrides.cca("a",0);
	var _g1 = 10;
	while(_g1 < 37) {
		var vv1 = _g1++;
		csafe_math_BigInteger.BI_RC[rr] = vv1;
		++rr;
	}
	rr = HxOverrides.cca("A",0);
	var _g2 = 10;
	while(_g2 < 37) {
		var vv2 = _g2++;
		csafe_math_BigInteger.BI_RC[rr] = vv2;
		++rr;
	}
};
csafe_math_BigInteger.get_ZERO = function() {
	return csafe_math_BigInteger.nbv(0);
};
csafe_math_BigInteger.get_ONE = function() {
	return csafe_math_BigInteger.nbv(1);
};
csafe_math_BigInteger.get_TWO = function() {
	return csafe_math_BigInteger.nbv(2);
};
csafe_math_BigInteger.get_THREE = function() {
	return csafe_math_BigInteger.nbv(3);
};
csafe_math_BigInteger.nbv = function(i) {
	var r = csafe_math_BigInteger.nbi();
	r.fromInt(i);
	return r;
};
csafe_math_BigInteger.nbi = function() {
	return new csafe_math_BigInteger();
};
csafe_math_BigInteger.ofString = function(s,base) {
	var me = csafe_math_BigInteger.nbi();
	var fromStringExt = function(s1,b) {
		me.fromInt(0);
		var cs = Math.floor(0.6931471805599453 * csafe_math_BigInteger.DB / Math.log(b));
		var d = Math.pow(b,cs) | 0;
		var mi = false;
		var j = 0;
		var w = 0;
		var _g1 = 0;
		var _g = s1.length;
		while(_g1 < _g) {
			var i = _g1++;
			var x = csafe_math_BigInteger.intAt(s1,i);
			if(x < 0) {
				if(s1.charAt(i) == "-" && me.sign == 0) {
					mi = true;
				}
				continue;
			}
			w = b * w + x;
			if(++j >= cs) {
				me.dMultiply(d);
				me.dAddOffset(w,0);
				j = 0;
				w = 0;
			}
		}
		if(j > 0) {
			me.dMultiply(Math.pow(b,j) | 0);
			me.dAddOffset(w,0);
		}
		if(mi) {
			csafe_math_BigInteger.get_ZERO().subTo(me,me);
		}
		return me;
	};
	var k;
	if(base == 16) {
		k = 4;
	} else if(base == 10) {
		return fromStringExt(s,base);
	} else if(base == 256) {
		k = 8;
	} else if(base == 8) {
		k = 3;
	} else if(base == 2) {
		k = 1;
	} else if(base == 32) {
		k = 5;
	} else if(base == 4) {
		k = 2;
	} else {
		return fromStringExt(s,base);
	}
	me.t = 0;
	me.sign = 0;
	var i1 = s.length;
	var mi1 = false;
	var sh = 0;
	while(--i1 >= 0) {
		var x1 = k == 8 ? HxOverrides.cca(s,i1) & 255 : csafe_math_BigInteger.intAt(s,i1);
		if(x1 < 0) {
			if(s.charAt(i1) == "-") {
				mi1 = true;
			}
			continue;
		}
		mi1 = false;
		if(sh == 0) {
			me.chunks[me.t] = x1;
			me.t++;
		} else if(sh + k > csafe_math_BigInteger.DB) {
			me.chunks[me.t - 1] |= (x1 & (1 << csafe_math_BigInteger.DB - sh) - 1) << sh;
			me.chunks[me.t] = x1 >> csafe_math_BigInteger.DB - sh;
			me.t++;
		} else {
			me.chunks[me.t - 1] |= x1 << sh;
		}
		sh += k;
		if(sh >= csafe_math_BigInteger.DB) {
			sh -= csafe_math_BigInteger.DB;
		}
	}
	if(k == 8 && (HxOverrides.cca(s,0) & 128) != 0) {
		me.sign = -1;
		if(sh > 0) {
			me.chunks[me.t - 1] |= (1 << csafe_math_BigInteger.DB - sh) - 1 << sh;
		}
	}
	me.clamp();
	if(mi1) {
		csafe_math_BigInteger.get_ZERO().subTo(me,me);
	}
	return me;
};
csafe_math_BigInteger.ofInt = function(x) {
	var i = csafe_math_BigInteger.nbi();
	i.fromInt(x);
	return i;
};
csafe_math_BigInteger.ofInt32 = function(x) {
	var i = csafe_math_BigInteger.nbi();
	i.fromInt32(x);
	return i;
};
csafe_math_BigInteger.ofAuto = function(val) {
	if(typeof(val) == "string") {
		return csafe_math_BigInteger.ofString(val,16);
	} else if(js_Boot.__instanceof(val,haxe_io_Bytes)) {
		return csafe_math_BigInteger.ofBytes(val,true);
	} else {
		throw new js__$Boot_HaxeError(new Exception("Invalid BigInteger creation parameter : " + Std.string(val)));
	}
};
csafe_math_BigInteger.ofBytes = function(r,unsigned,pos,len) {
	if(pos == null) {
		pos = 0;
	}
	if(len == null) {
		len = r.length - pos;
	}
	if(len == 0) {
		return csafe_math_BigInteger.get_ZERO();
	}
	var bi = csafe_math_BigInteger.nbi();
	bi.sign = 0;
	bi.t = 0;
	var i = pos + len;
	var sh = 0;
	while(--i >= pos) {
		var x = i < len ? r.b[i] & 255 : 0;
		if(sh == 0) {
			bi.chunks[bi.t] = x;
			bi.t++;
		} else if(sh + 8 > csafe_math_BigInteger.DB) {
			bi.chunks[bi.t - 1] |= (x & (1 << csafe_math_BigInteger.DB - sh) - 1) << sh;
			bi.chunks[bi.t] = x >> csafe_math_BigInteger.DB - sh;
			bi.t++;
		} else {
			bi.chunks[bi.t - 1] |= x << sh;
		}
		sh += 8;
		if(sh >= csafe_math_BigInteger.DB) {
			sh -= csafe_math_BigInteger.DB;
		}
	}
	if(!unsigned && (r.b[0] & 128) != 0) {
		bi.sign = -1;
		if(sh > 0) {
			bi.chunks[bi.t - 1] |= (1 << csafe_math_BigInteger.DB - sh) - 1 << sh;
		}
	}
	bi.clamp();
	return bi;
};
csafe_math_BigInteger.random = function(bits) {
	if(bits < 2) {
		return csafe_math_BigInteger.ofInt(1);
	}
	var len = (bits >> 3) + 1;
	var x = new haxe_io_Bytes(new ArrayBuffer(len));
	var t = bits & 7;
	csafe_asn1_impl_AlgorithmID.getRandomValues(x);
	if(t > 0) {
		var v = x.b[0];
		v &= (1 << t) - 1;
		x.b[0] = v & 255;
	} else {
		x.b[0] = 0;
	}
	return csafe_math_BigInteger.ofAuto(x);
};
csafe_math_BigInteger.randomPrime = function(bits,gcdExp,iterations,forceLength) {
	if(iterations < 1) {
		iterations = 1;
	}
	while(true) {
		var i = csafe_math_BigInteger.random(bits);
		if(forceLength) {
			if(!i.testBit(bits - 1)) {
				i.bitwiseTo(csafe_math_BigInteger.get_ONE().shl(bits - 1),csafe_math_BigInteger.op_or,i);
			}
		}
		if(i.isEven()) {
			i.dAddOffset(1,0);
		}
		if(i.passesMillerRabin(2)) {
			return i;
		}
	}
};
csafe_math_BigInteger.op_and = function(x,y) {
	return x & y;
};
csafe_math_BigInteger.op_or = function(x,y) {
	return x | y;
};
csafe_math_BigInteger.op_xor = function(x,y) {
	return x ^ y;
};
csafe_math_BigInteger.op_andnot = function(x,y) {
	return x & ~y;
};
csafe_math_BigInteger.nbits = function(x) {
	var r = 1;
	var t = x >>> 16;
	if(t != 0) {
		x = t;
		r += 16;
	}
	t = x >> 8;
	if(t != 0) {
		x = t;
		r += 8;
	}
	t = x >> 4;
	if(t != 0) {
		x = t;
		r += 4;
	}
	t = x >> 2;
	if(t != 0) {
		x = t;
		r += 2;
	}
	t = x >> 1;
	if(t != 0) {
		x = t;
		++r;
	}
	return r;
};
csafe_math_BigInteger.cbit = function(x) {
	var r = 0;
	while(x != 0) {
		x &= x - 1;
		++r;
	}
	return r;
};
csafe_math_BigInteger.intAt = function(s,i) {
	var c = csafe_math_BigInteger.BI_RC[HxOverrides.cca(s,i)];
	if(c == null) {
		return -1;
	}
	return c;
};
csafe_math_BigInteger.int2charCode = function(n) {
	return HxOverrides.cca(csafe_math_BigInteger.BI_RM,n);
};
csafe_math_BigInteger.lbit = function(x) {
	if(x == 0) {
		return -1;
	}
	var r = 0;
	if((x & 65535) == 0) {
		x >>= 16;
		r += 16;
	}
	if((x & 255) == 0) {
		x >>= 8;
		r += 8;
	}
	if((x & 15) == 0) {
		x >>= 4;
		r += 4;
	}
	if((x & 3) == 0) {
		x >>= 2;
		r += 2;
	}
	if((x & 1) == 0) {
		++r;
	}
	return r;
};
csafe_math_BigInteger.dumpBi = function(r) {
	var s = "sign: " + (r.sign == null ? "null" : "" + r.sign);
	s += " t: " + r.t;
	s += Std.string(r.chunks);
	return s;
};
csafe_math_BigInteger.prototype = {
	fromInt: function(x) {
		this.t = 1;
		this.chunks[0] = 0;
		this.sign = x < 0 ? -1 : 0;
		if(x > 0) {
			this.chunks[0] = x;
		} else if(x < -1) {
			this.chunks[0] = x + csafe_math_BigInteger.DV;
		} else {
			this.t = 0;
		}
	}
	,fromInt32: function(x) {
		this.fromInt(x);
	}
	,toInt: function() {
		if(this.sign < 0) {
			if(this.t == 1) {
				return this.chunks[0] - csafe_math_BigInteger.DV;
			} else if(this.t == 0) {
				return -1;
			}
		} else if(this.t == 1) {
			return this.chunks[0];
		} else if(this.t == 0) {
			return 0;
		}
		return (this.chunks[1] & (1 << 32 - csafe_math_BigInteger.DB) - 1) << csafe_math_BigInteger.DB | this.chunks[0];
	}
	,toInt32: function() {
		return this.toInt();
	}
	,toString: function() {
		return this.toRadix(10);
	}
	,toHex: function() {
		return this.toRadix(16);
	}
	,toBytes: function() {
		var i = this.t;
		var r = [];
		r[0] = this.sign;
		var p = csafe_math_BigInteger.DB - i * csafe_math_BigInteger.DB % 8;
		var d;
		var k = 0;
		if(i-- > 0) {
			var tmp;
			if(p < csafe_math_BigInteger.DB) {
				d = this.chunks[i] >> p;
				tmp = d != (this.sign & csafe_math_BigInteger.DM) >> p;
			} else {
				tmp = false;
			}
			if(tmp) {
				r[k] = d | this.sign << csafe_math_BigInteger.DB - p;
				++k;
			}
			while(i >= 0) {
				if(p < 8) {
					d = (this.chunks[i] & (1 << p) - 1) << 8 - p;
					--i;
					d |= this.chunks[i] >> (p += csafe_math_BigInteger.DB - 8);
				} else {
					d = this.chunks[i] >> (p -= 8) & 255;
					if(p <= 0) {
						p += csafe_math_BigInteger.DB;
						--i;
					}
				}
				if((d & 128) != 0) {
					d |= -256;
				}
				if(k == 0 && (this.sign & 128) != (d & 128)) {
					++k;
				}
				if(k > 0 || d != this.sign) {
					r[k] = d;
					++k;
				}
			}
		}
		var bb = new haxe_io_BytesBuffer();
		var _g1 = 0;
		var _g = r.length;
		while(_g1 < _g) {
			var i1 = _g1++;
			bb.b.push(r[i1]);
		}
		return bb.getBytes();
	}
	,toBytesUnsigned: function() {
		var bb = new haxe_io_BytesBuffer();
		var k = 8;
		var km = 255;
		var d = 0;
		var i = this.t;
		var p = csafe_math_BigInteger.DB - i * csafe_math_BigInteger.DB % k;
		var m = false;
		var c = 0;
		if(i-- > 0) {
			var tmp;
			if(p < csafe_math_BigInteger.DB) {
				d = this.chunks[i] >> p;
				tmp = d > 0;
			} else {
				tmp = false;
			}
			if(tmp) {
				m = true;
				bb.b.push(d);
				++c;
			}
			while(i >= 0) {
				if(p < k) {
					d = (this.chunks[i] & (1 << p) - 1) << k - p;
					d |= this.chunks[--i] >> (p += csafe_math_BigInteger.DB - k);
				} else {
					d = this.chunks[i] >> (p -= k) & km;
					if(p <= 0) {
						p += csafe_math_BigInteger.DB;
						--i;
					}
				}
				if(d > 0) {
					m = true;
				}
				if(m) {
					bb.b.push(d);
					++c;
				}
			}
		}
		return bb.getBytes();
	}
	,toRadix: function(b) {
		if(b == null) {
			b = 10;
		}
		if(b < 2 || b > 36) {
			throw new js__$Boot_HaxeError(new Exception("invalid base for conversion"));
		}
		if(this.sigNum() == 0) {
			return "0";
		}
		var cs = Math.floor(0.6931471805599453 * csafe_math_BigInteger.DB / Math.log(b));
		var a = Math.pow(b,cs) | 0;
		var d = csafe_math_BigInteger.nbv(a);
		var y = csafe_math_BigInteger.nbi();
		var z = csafe_math_BigInteger.nbi();
		var r = "";
		this.divRemTo(d,y,z);
		while(y.sigNum() > 0) {
			r = HxOverrides.substr(util_Int32Util.baseEncode(a + z.toInt32() | 0,b),1,null) + r;
			y.divRemTo(d,y,z);
		}
		return util_Int32Util.baseEncode(z.toInt32(),b) + r;
	}
	,abs: function() {
		if(this.sign < 0) {
			return this.neg();
		} else {
			return this;
		}
	}
	,add: function(a) {
		var r = csafe_math_BigInteger.nbi();
		this.addTo(a,r);
		return r;
	}
	,compare: function(a) {
		var r = this.sign - a.sign;
		if(r != 0) {
			return r;
		}
		var i = this.t;
		r = i - a.t;
		if(r != 0) {
			return r;
		}
		while(--i >= 0) {
			r = this.chunks[i] - a.chunks[i];
			if(r != 0) {
				return r;
			}
		}
		return 0;
	}
	,div: function(a) {
		var r = csafe_math_BigInteger.nbi();
		this.divRemTo(a,r,null);
		return r;
	}
	,divideAndRemainder: function(a) {
		var q = csafe_math_BigInteger.nbi();
		var r = csafe_math_BigInteger.nbi();
		this.divRemTo(a,q,r);
		return [q,r];
	}
	,eq: function(a) {
		return this.compare(a) == 0;
	}
	,isEven: function() {
		return (this.t > 0 ? this.chunks[0] & 1 : this.sign) == 0;
	}
	,max: function(a) {
		if(this.compare(a) > 0) {
			return this;
		} else {
			return a;
		}
	}
	,min: function(a) {
		if(this.compare(a) < 0) {
			return this;
		} else {
			return a;
		}
	}
	,mod: function(a) {
		var r = csafe_math_BigInteger.nbi();
		this.abs().divRemTo(a,null,r);
		if(this.sign < 0 && r.compare(csafe_math_BigInteger.get_ZERO()) > 0) {
			a.subTo(r,r);
		}
		return r;
	}
	,modInt: function(n) {
		if(n <= 0) {
			return 0;
		}
		var d = csafe_math_BigInteger.DV % n;
		var r = this.sign < 0 ? n - 1 : 0;
		if(this.t > 0) {
			if(d == 0) {
				r = this.chunks[0] % n;
			} else {
				var i = this.t - 1;
				while(i >= 0) {
					r = (d * r + this.chunks[i]) % n;
					--i;
				}
			}
		}
		return r;
	}
	,modInverse: function(m) {
		var ac = m.isEven();
		if(this.isEven() && ac || m.sigNum() == 0) {
			return csafe_math_BigInteger.get_ZERO();
		}
		var u = m.clone();
		var v = this.clone();
		var a = csafe_math_BigInteger.nbv(1);
		var b = csafe_math_BigInteger.nbv(0);
		var c = csafe_math_BigInteger.nbv(0);
		var d = csafe_math_BigInteger.nbv(1);
		while(u.sigNum() != 0) {
			while(u.isEven()) {
				u.rShiftTo(1,u);
				if(ac) {
					if(!a.isEven() || !b.isEven()) {
						a.addTo(this,a);
						b.subTo(m,b);
					}
					a.rShiftTo(1,a);
				} else if(!b.isEven()) {
					b.subTo(m,b);
				}
				b.rShiftTo(1,b);
			}
			while(v.isEven()) {
				v.rShiftTo(1,v);
				if(ac) {
					if(!c.isEven() || !d.isEven()) {
						c.addTo(this,c);
						d.subTo(m,d);
					}
					c.rShiftTo(1,c);
				} else if(!d.isEven()) {
					d.subTo(m,d);
				}
				d.rShiftTo(1,d);
			}
			if(u.compare(v) >= 0) {
				u.subTo(v,u);
				if(ac) {
					a.subTo(c,a);
				}
				b.subTo(d,b);
			} else {
				v.subTo(u,v);
				if(ac) {
					c.subTo(a,c);
				}
				d.subTo(b,d);
			}
		}
		if(v.compare(csafe_math_BigInteger.get_ONE()) != 0) {
			return csafe_math_BigInteger.get_ZERO();
		}
		if(d.compare(m) >= 0) {
			return d.sub(m);
		}
		if(d.sigNum() < 0) {
			d.addTo(m,d);
		} else {
			return d;
		}
		return d;
	}
	,modPow: function(e,m) {
		var i = e.bitLength();
		var k;
		var r = csafe_math_BigInteger.nbv(1);
		var z;
		if(i <= 0) {
			return r;
		} else if(i < 18) {
			k = 1;
		} else if(i < 48) {
			k = 3;
		} else if(i < 144) {
			k = 4;
		} else if(i < 768) {
			k = 5;
		} else {
			k = 6;
		}
		if(i < 8) {
			z = new csafe_math_reduction_Classic(m);
		} else if(m.isEven()) {
			z = new csafe_math_reduction_Barrett(m);
		} else {
			z = new csafe_math_reduction_Montgomery(m);
		}
		var g = [];
		var n = 3;
		var k1 = k - 1;
		var km = (1 << k) - 1;
		g[1] = z.convert(this);
		if(k > 1) {
			var g2 = csafe_math_BigInteger.nbi();
			z.sqrTo(g[1],g2);
			while(n <= km) {
				g[n] = csafe_math_BigInteger.nbi();
				z.mulTo(g2,g[n - 2],g[n]);
				n += 2;
			}
		}
		var j = e.t - 1;
		var w;
		var is1 = true;
		var r2 = csafe_math_BigInteger.nbi();
		var t;
		i = csafe_math_BigInteger.nbits(e.chunks[j]) - 1;
		while(j >= 0) {
			if(i >= k1) {
				w = e.chunks[j] >> i - k1 & km;
			} else {
				w = (e.chunks[j] & (1 << i + 1) - 1) << k1 - i;
				if(j > 0) {
					w |= e.chunks[j - 1] >> csafe_math_BigInteger.DB + i - k1;
				}
			}
			n = k;
			while((w & 1) == 0) {
				w >>= 1;
				--n;
			}
			if((i -= n) < 0) {
				i += csafe_math_BigInteger.DB;
				--j;
			}
			if(is1) {
				g[w].copyTo(r);
				is1 = false;
			} else {
				while(n > 1) {
					z.sqrTo(r,r2);
					z.sqrTo(r2,r);
					n -= 2;
				}
				if(n > 0) {
					z.sqrTo(r,r2);
				} else {
					t = r;
					r = r2;
					r2 = t;
				}
				if(g[w] == null) {
					haxe_Log.trace("Ooops" + w,{ fileName : "BigInteger.hx", lineNumber : 683, className : "csafe.math.BigInteger", methodName : "modPow"});
				}
				z.mulTo(r2,g[w],r);
			}
			var chnk = e.chunks[j];
			while(j >= 0 && (chnk & 1 << i) == 0) {
				z.sqrTo(r,r2);
				t = r;
				r = r2;
				r2 = t;
				if(--i < 0) {
					i = csafe_math_BigInteger.DB - 1;
					--j;
				}
				chnk = e.chunks[j];
			}
		}
		return z.revert(r);
	}
	,modPowInt: function(e,m) {
		if(m == null) {
			throw new js__$Boot_HaxeError("m is null");
		}
		var z;
		if(e < 256 || m.isEven()) {
			z = new csafe_math_reduction_Classic(m);
		} else {
			z = new csafe_math_reduction_Montgomery(m);
		}
		return this.exp(e,z);
	}
	,mul: function(a) {
		var r = csafe_math_BigInteger.nbi();
		this.multiplyTo(a,r);
		return r;
	}
	,neg: function() {
		var r = csafe_math_BigInteger.nbi();
		csafe_math_BigInteger.get_ZERO().subTo(this,r);
		return r;
	}
	,pow: function(e) {
		return this.exp(e,new csafe_math_reduction_Null());
	}
	,remainder: function(a) {
		var r = csafe_math_BigInteger.nbi();
		this.divRemTo(a,null,r);
		return r;
	}
	,sub: function(a) {
		var r = csafe_math_BigInteger.nbi();
		this.subTo(a,r);
		return r;
	}
	,and: function(a) {
		var r = csafe_math_BigInteger.nbi();
		this.bitwiseTo(a,csafe_math_BigInteger.op_and,r);
		return r;
	}
	,andNot: function(a) {
		var r = csafe_math_BigInteger.nbi();
		this.bitwiseTo(a,csafe_math_BigInteger.op_andnot,r);
		return r;
	}
	,bitCount: function() {
		var r = 0;
		var x = this.sign & csafe_math_BigInteger.DM;
		var _g1 = 0;
		var _g = this.t;
		while(_g1 < _g) {
			var i = _g1++;
			r += csafe_math_BigInteger.cbit(this.chunks[i] ^ x);
		}
		return r;
	}
	,bitLength: function() {
		if(this.t <= 0) {
			return 0;
		}
		return csafe_math_BigInteger.DB * (this.t - 1) + csafe_math_BigInteger.nbits(this.chunks[this.t - 1] ^ this.sign & csafe_math_BigInteger.DM);
	}
	,complement: function() {
		var r = csafe_math_BigInteger.nbi();
		var _g1 = 0;
		var _g = this.t;
		while(_g1 < _g) {
			var i = _g1++;
			r.chunks[i] = csafe_math_BigInteger.DM & ~this.chunks[i];
		}
		r.t = this.t;
		r.sign = ~this.sign;
		return r;
	}
	,clearBit: function(n) {
		return this.changeBit(n,csafe_math_BigInteger.op_andnot);
	}
	,flipBit: function(n) {
		return this.changeBit(n,csafe_math_BigInteger.op_xor);
	}
	,getLowestSetBit: function() {
		var _g1 = 0;
		var _g = this.t;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.chunks[i] != 0) {
				return i * csafe_math_BigInteger.DB + csafe_math_BigInteger.lbit(this.chunks[i]);
			}
		}
		if(this.sign < 0) {
			return this.t * csafe_math_BigInteger.DB;
		}
		return -1;
	}
	,not: function() {
		return this.complement();
	}
	,or: function(a) {
		var r = csafe_math_BigInteger.nbi();
		this.bitwiseTo(a,csafe_math_BigInteger.op_or,r);
		return r;
	}
	,setBit: function(n) {
		return this.changeBit(n,csafe_math_BigInteger.op_or);
	}
	,shl: function(n) {
		var r = csafe_math_BigInteger.nbi();
		if(n < 0) {
			this.rShiftTo(-n,r);
		} else {
			this.lShiftTo(n,r);
		}
		return r;
	}
	,shr: function(n) {
		var r = csafe_math_BigInteger.nbi();
		if(n < 0) {
			this.lShiftTo(-n,r);
		} else {
			this.rShiftTo(n,r);
		}
		return r;
	}
	,testBit: function(n) {
		var j = Math.floor(n / csafe_math_BigInteger.DB);
		if(j >= this.t) {
			return this.sign != 0;
		}
		return (this.chunks[j] & 1 << n % csafe_math_BigInteger.DB) != 0;
	}
	,xor: function(a) {
		var r = csafe_math_BigInteger.nbi();
		this.bitwiseTo(a,csafe_math_BigInteger.op_xor,r);
		return r;
	}
	,addTo: function(a,r) {
		var i = 0;
		var c = 0;
		var m = Math.min(a.t,this.t) | 0;
		while(i < m) {
			c += this.chunks[i] + a.chunks[i];
			r.chunks[i] = c & csafe_math_BigInteger.DM;
			++i;
			c >>= csafe_math_BigInteger.DB;
		}
		if(a.t < this.t) {
			c += a.sign;
			while(i < this.t) {
				c += this.chunks[i];
				r.chunks[i] = c & csafe_math_BigInteger.DM;
				++i;
				c >>= csafe_math_BigInteger.DB;
			}
			c += this.sign;
		} else {
			c += this.sign;
			while(i < a.t) {
				c += a.chunks[i];
				r.chunks[i] = c & csafe_math_BigInteger.DM;
				++i;
				c >>= csafe_math_BigInteger.DB;
			}
			c += a.sign;
		}
		r.sign = c < 0 ? -1 : 0;
		if(c > 0) {
			r.chunks[i] = c;
			++i;
		} else if(c < -1) {
			r.chunks[i] = csafe_math_BigInteger.DV + c;
			++i;
		}
		r.t = i;
		r.clamp();
	}
	,copyTo: function(r) {
		var _g1 = 0;
		var _g = this.chunks.length;
		while(_g1 < _g) {
			var i = _g1++;
			r.chunks[i] = this.chunks[i];
		}
		r.t = this.t;
		r.sign = this.sign;
	}
	,divRemTo: function(m,q,r) {
		var pm = m.abs();
		if(pm.t <= 0) {
			return;
		}
		var pt = this.abs();
		if(pt.t < pm.t) {
			if(q != null) {
				q.fromInt(0);
			}
			if(r != null) {
				this.copyTo(r);
			}
			return;
		}
		if(r == null) {
			r = csafe_math_BigInteger.nbi();
		}
		var y = csafe_math_BigInteger.nbi();
		var ts = this.sign;
		var ms = m.sign;
		var nsh = csafe_math_BigInteger.DB - csafe_math_BigInteger.nbits(pm.chunks[pm.t - 1]);
		if(nsh > 0) {
			pt.lShiftTo(nsh,r);
			pm.lShiftTo(nsh,y);
		} else {
			pt.copyTo(r);
			pm.copyTo(y);
		}
		var ys = y.t;
		var y0 = y.chunks[ys - 1];
		if(y0 == 0) {
			return;
		}
		var yt = y0 * 1.0 * ((1 << csafe_math_BigInteger.F1) * 1.0) + (ys > 1 ? (y.chunks[ys - 2] >> csafe_math_BigInteger.F2) * 1.0 : 0.0);
		var d1 = csafe_math_BigInteger.FV / yt;
		var d2 = (1 << csafe_math_BigInteger.F1) * 1.0 / yt;
		var e = (1 << csafe_math_BigInteger.F2) * 1.0;
		var i = r.t;
		var j = i - ys;
		var t = q == null ? csafe_math_BigInteger.nbi() : q;
		y.dlShiftTo(j,t);
		if(r.compare(t) >= 0) {
			r.chunks[r.t] = 1;
			r.t++;
			r.subTo(t,r);
		}
		csafe_math_BigInteger.get_ONE().dlShiftTo(ys,t);
		t.subTo(y,y);
		while(y.t < ys) {
			y.chunks[y.t] = 0;
			y.t++;
		}
		while(--j >= 0) {
			var qd;
			if(r.chunks[--i] == y0) {
				qd = csafe_math_BigInteger.DM;
			} else {
				qd = Math.floor(r.chunks[i] * 1.0 * d1 + (r.chunks[i - 1] * 1.0 + e) * d2);
			}
			r.chunks[i] += y.am(0,qd,r,j,0,ys);
			if(r.chunks[i] < qd) {
				y.dlShiftTo(j,t);
				r.subTo(t,r);
				while(r.chunks[i] < --qd) r.subTo(t,r);
			}
		}
		if(q != null) {
			r.drShiftTo(ys,q);
			if(ts != ms) {
				csafe_math_BigInteger.get_ZERO().subTo(q,q);
			}
		}
		r.t = ys;
		r.clamp();
		if(nsh > 0) {
			r.rShiftTo(nsh,r);
		}
		if(ts < 0) {
			csafe_math_BigInteger.get_ZERO().subTo(r,r);
		}
	}
	,multiplyLowerTo: function(a,n,r) {
		var i = Math.min(this.t + a.t,n) | 0;
		r.sign = 0;
		r.t = i;
		while(i > 0) {
			--i;
			r.chunks[i] = 0;
		}
		var j = r.t - this.t;
		while(i < j) {
			r.chunks[i + this.t] = this.am(0,a.chunks[i],r,i,0,this.t);
			++i;
		}
		j = Math.min(a.t,n) | 0;
		while(i < j) {
			this.am(0,a.chunks[i],r,i,0,n - i);
			++i;
		}
		r.clamp();
	}
	,multiplyTo: function(a,r) {
		var x = this.abs();
		var y = a.abs();
		var i = x.t;
		r.t = i + y.t;
		while(--i >= 0) r.chunks[i] = 0;
		var _g1 = 0;
		var _g = y.t;
		while(_g1 < _g) {
			var i1 = _g1++;
			r.chunks[i1 + x.t] = x.am(0,y.chunks[i1],r,i1,0,x.t);
		}
		r.sign = 0;
		r.clamp();
		if(this.sign != a.sign) {
			csafe_math_BigInteger.get_ZERO().subTo(r,r);
		}
	}
	,multiplyUpperTo: function(a,n,r) {
		--n;
		var i = r.t = this.t + a.t - n;
		r.sign = 0;
		while(--i >= 0) r.chunks[i] = 0;
		i = Math.max(n - this.t,0) | 0;
		var _g1 = i;
		var _g = a.t;
		while(_g1 < _g) {
			var x = _g1++;
			r.chunks[this.t + x - n] = this.am(n - x,a.chunks[x],r,0,0,this.t + x - n);
		}
		r.clamp();
		r.drShiftTo(1,r);
	}
	,square: function() {
		var n = csafe_math_BigInteger.nbi();
		this.squareTo(n);
		return n;
	}
	,squareTo: function(r) {
		if(r == this) {
			throw new js__$Boot_HaxeError("can not squareTo self");
		}
		var x = this.abs();
		var i = r.t = 2 * x.t;
		while(--i >= 0) r.chunks[i] = 0;
		i = 0;
		while(i < x.t - 1) {
			var c = x.am(i,x.chunks[i],r,2 * i,0,1);
			var r1 = r.chunks;
			var tmp = i + x.t;
			r1[tmp] += x.am(i + 1,2 * x.chunks[i],r,2 * i + 1,c,x.t - i - 1);
			if(r1[tmp] >= csafe_math_BigInteger.DV) {
				r.chunks[i + x.t] -= csafe_math_BigInteger.DV;
				r.chunks[i + x.t + 1] = 1;
			}
			++i;
		}
		if(r.t > 0) {
			var rv = x.am(i,x.chunks[i],r,2 * i,0,1);
			r.chunks[r.t - 1] += rv;
		}
		r.sign = 0;
		r.clamp();
	}
	,subTo: function(a,r) {
		var i = 0;
		var c = 0;
		var m = Math.min(a.t,this.t) | 0;
		while(i < m) {
			c += this.chunks[i] - a.chunks[i];
			r.chunks[i] = c & csafe_math_BigInteger.DM;
			++i;
			c >>= csafe_math_BigInteger.DB;
		}
		if(a.t < this.t) {
			c -= a.sign;
			while(i < this.t) {
				c += this.chunks[i];
				r.chunks[i] = c & csafe_math_BigInteger.DM;
				++i;
				c >>= csafe_math_BigInteger.DB;
			}
			c += this.sign;
		} else {
			c += this.sign;
			while(i < a.t) {
				c -= a.chunks[i];
				r.chunks[i] = c & csafe_math_BigInteger.DM;
				++i;
				c >>= csafe_math_BigInteger.DB;
			}
			c -= a.sign;
		}
		r.sign = c < 0 ? -1 : 0;
		if(c < -1) {
			r.chunks[i] = csafe_math_BigInteger.DV + c;
			++i;
		} else if(c > 0) {
			r.chunks[i] = c;
			++i;
		}
		r.t = i;
		r.clamp();
	}
	,clamp: function() {
		var c = this.sign & csafe_math_BigInteger.DM;
		while(this.t > 0 && this.chunks[this.t - 1] == c) --this.t;
	}
	,clone: function() {
		var r = csafe_math_BigInteger.nbi();
		this.copyTo(r);
		return r;
	}
	,gcd: function(a) {
		var x = this.sign < 0 ? this.neg() : this.clone();
		var y = a.sign < 0 ? a.neg() : a.clone();
		if(x.compare(y) < 0) {
			var t = x;
			x = y;
			y = t;
		}
		var i = x.getLowestSetBit();
		var g = y.getLowestSetBit();
		if(g < 0) {
			return x;
		}
		if(i < g) {
			g = i;
		}
		if(g > 0) {
			x.rShiftTo(g,x);
			y.rShiftTo(g,y);
		}
		while(x.sigNum() > 0) {
			i = x.getLowestSetBit();
			if(i > 0) {
				x.rShiftTo(i,x);
			}
			i = y.getLowestSetBit();
			if(i > 0) {
				y.rShiftTo(i,y);
			}
			if(x.compare(y) >= 0) {
				x.subTo(y,x);
				x.rShiftTo(1,x);
			} else {
				y.subTo(x,y);
				y.rShiftTo(1,y);
			}
		}
		if(g > 0) {
			y.lShiftTo(g,y);
		}
		return y;
	}
	,padTo: function(n) {
		while(this.t < n) {
			this.chunks[this.t] = 0;
			this.t++;
		}
	}
	,shortValue: function() {
		if(this.t == 0) {
			return this.sign;
		} else {
			return this.chunks[0] << 16 >> 16;
		}
	}
	,byteValue: function() {
		if(this.t == 0) {
			return this.sign;
		} else {
			return this.chunks[0] << 24 >> 24;
		}
	}
	,sigNum: function() {
		if(this.sign < 0) {
			return -1;
		} else if(this.t <= 0 || this.t == 1 && this.chunks[0] <= 0) {
			return 0;
		} else {
			return 1;
		}
	}
	,dAddOffset: function(n,w) {
		while(this.t <= w) {
			this.chunks[this.t] = 0;
			this.t++;
		}
		this.chunks[w] += n;
		while(this.chunks[w] >= csafe_math_BigInteger.DV) {
			this.chunks[w] -= csafe_math_BigInteger.DV;
			if(++w >= this.t) {
				this.chunks[this.t] = 0;
				this.t++;
			}
			++this.chunks[w];
		}
	}
	,dlShiftTo: function(n,r) {
		if(r == null) {
			return;
		}
		var i = this.t - 1;
		while(i >= 0) {
			r.chunks[i + n] = this.chunks[i];
			--i;
		}
		i = n - 1;
		while(i >= 0) {
			r.chunks[i] = 0;
			--i;
		}
		r.t = this.t + n;
		r.sign = this.sign;
	}
	,drShiftTo: function(n,r) {
		if(r == null) {
			return;
		}
		var i = n;
		while(i < this.t) {
			r.chunks[i - n] = this.chunks[i];
			++i;
		}
		r.t = Math.max(this.t - n,0) | 0;
		r.sign = this.sign;
	}
	,invDigit: function() {
		if(this.t < 1) {
			return 0;
		}
		var x = this.chunks[0];
		if((x & 1) == 0) {
			return 0;
		}
		var y = x & 3;
		y = y * (2 - (x & 15) * y) & 15;
		y = y * (2 - (x & 255) * y) & 255;
		y = y * (2 - ((x & 65535) * y & 65535)) & 65535;
		y = y * (2 - x * y % csafe_math_BigInteger.DV) % csafe_math_BigInteger.DV;
		if(y > 0) {
			return csafe_math_BigInteger.DV - y;
		} else {
			return -y;
		}
	}
	,isProbablePrime: function(v) {
		var i;
		var x = this.abs();
		return x.millerRabin(v);
	}
	,primify: function(bits,ta) {
		if(!this.testBit(bits - 1)) {
			this.bitwiseTo(csafe_math_BigInteger.get_ONE().shl(bits - 1),csafe_math_BigInteger.op_or,this);
		}
		if(this.isEven()) {
			this.dAddOffset(1,0);
		}
		while(this.bitLength() > bits) {
			haxe_Log.trace("ck1",{ fileName : "BigInteger.hx", lineNumber : 1399, className : "csafe.math.BigInteger", methodName : "primify"});
			this.subTo(csafe_math_BigInteger.get_ONE().shl(bits - 1),this);
		}
		while(!this.isProbablePrime(ta)) {
			this.dAddOffset(2,0);
			while(this.bitLength() > bits) {
				haxe_Log.trace("ck3",{ fileName : "BigInteger.hx", lineNumber : 1402, className : "csafe.math.BigInteger", methodName : "primify"});
				this.subTo(csafe_math_BigInteger.get_ONE().shl(bits - 1),this);
			}
		}
	}
	,bitwiseTo: function(a,op,r) {
		var f;
		var m = Math.min(a.t,this.t) | 0;
		var _g1 = 0;
		var _g = m;
		while(_g1 < _g) {
			var i = _g1++;
			r.chunks[i] = op(this.chunks[i],a.chunks[i]);
		}
		if(a.t < this.t) {
			f = a.sign & csafe_math_BigInteger.DM;
			var _g11 = m;
			var _g2 = this.t;
			while(_g11 < _g2) {
				var i1 = _g11++;
				r.chunks[i1] = op(this.chunks[i1],f);
			}
			r.t = this.t;
		} else {
			f = this.sign & csafe_math_BigInteger.DM;
			var _g12 = m;
			var _g3 = a.t;
			while(_g12 < _g3) {
				var i2 = _g12++;
				r.chunks[i2] = op(f,a.chunks[i2]);
			}
			r.t = a.t;
		}
		r.sign = op(this.sign,a.sign);
		r.clamp();
	}
	,changeBit: function(n,op) {
		var r = csafe_math_BigInteger.get_ONE().shl(n);
		this.bitwiseTo(r,op,r);
		return r;
	}
	,chunkSize: function(r) {
		return Math.floor(0.6931471805599453 * csafe_math_BigInteger.DB / Math.log(r));
	}
	,dMultiply: function(n) {
		this.chunks[this.t] = this.am(0,n - 1,this,0,0,this.t);
		this.t++;
		this.clamp();
	}
	,exp: function(e,z) {
		if(e > 2147483647 || e < 1) {
			return csafe_math_BigInteger.get_ONE();
		}
		var r = csafe_math_BigInteger.nbi();
		var r2 = csafe_math_BigInteger.nbi();
		var g = z.convert(this);
		var i = csafe_math_BigInteger.nbits(e) - 1;
		g.copyTo(r);
		while(--i >= 0) {
			z.sqrTo(r,r2);
			if((e & 1 << i) > 0) {
				z.mulTo(r2,g,r);
			} else {
				var t = r;
				r = r2;
				r2 = t;
			}
		}
		return z.revert(r);
	}
	,millerRabin: function(v) {
		var n1 = this.sub(csafe_math_BigInteger.get_ONE());
		var k = n1.getLowestSetBit();
		if(k <= 0) {
			return false;
		}
		var r = n1.shr(k);
		v = v + 1 >> 1;
		if(v > csafe_math_BigInteger.lowprimes.length) {
			v = csafe_math_BigInteger.lowprimes.length;
		}
		var a = csafe_math_BigInteger.nbi();
		var _g1 = 0;
		var _g = v;
		while(_g1 < _g) {
			var i = _g1++;
			a.fromInt(csafe_math_BigInteger.lowprimes[i]);
			var y = a.modPow(r,this);
			if(y.compare(csafe_math_BigInteger.get_ONE()) != 0 && y.compare(n1) != 0) {
				var j = 1;
				while(j++ < k && y.compare(n1) != 0) {
					y = y.modPowInt(2,this);
					if(y.compare(csafe_math_BigInteger.get_ONE()) == 0) {
						return false;
					}
				}
				if(y.compare(n1) != 0) {
					return false;
				}
			}
		}
		return true;
	}
	,isProbablePrime_JVer: function(certainty) {
		if(certainty <= 0) {
			haxe_Log.trace("Certainty zero",{ fileName : "BigInteger.hx", lineNumber : 1509, className : "csafe.math.BigInteger", methodName : "isProbablePrime_JVer"});
			return true;
		}
		var w = this.abs();
		if(w.eq(csafe_math_BigInteger.get_TWO())) {
			return true;
		}
		if(!w.testBit(0) || w.eq(csafe_math_BigInteger.get_ONE())) {
			return false;
		}
		return w.primeToCertainty(certainty);
	}
	,primeToCertainty: function(certainty) {
		var rounds = 0;
		var n = (Math.min(certainty,-2) + 1) / 2 | 0;
		var sizeInBits = this.bitLength();
		if(sizeInBits < 100) {
			rounds = 50;
			if(n < rounds) {
				rounds = n;
			} else {
				rounds = rounds;
			}
			return this.passesMillerRabin(rounds);
		}
		if(sizeInBits < 256) {
			rounds = 27;
		} else if(sizeInBits < 512) {
			rounds = 15;
		} else if(sizeInBits < 768) {
			rounds = 8;
		} else if(sizeInBits < 1024) {
			rounds = 4;
		} else {
			rounds = 2;
		}
		if(n < rounds) {
			rounds = n;
		} else {
			rounds = rounds;
		}
		return this.passesMillerRabin(rounds);
	}
	,passesMillerRabin: function(iterations) {
		var thisMinusOne = this.sub(csafe_math_BigInteger.get_ONE());
		var m = thisMinusOne;
		var a = m.getLowestSetBit();
		m = m.shr(a);
		var _g1 = 0;
		var _g = iterations;
		while(_g1 < _g) {
			var i = _g1++;
			var b;
			while(true) {
				b = csafe_math_BigInteger.random(this.bitLength());
				if(!(b.compare(csafe_math_BigInteger.get_ONE()) <= 0 || b.compare(this) >= 0)) {
					break;
				}
			}
			var j = 0;
			var z = b.modPow(m,this);
			while(!(j == 0 && z.eq(csafe_math_BigInteger.get_ONE()) || z.eq(thisMinusOne))) {
				if(j > 0 && z.eq(csafe_math_BigInteger.get_ONE()) || ++j == a) {
					return false;
				}
				z = z.modPow(csafe_math_BigInteger.get_TWO(),this);
			}
		}
		haxe_Log.trace("Passes...",{ fileName : "BigInteger.hx", lineNumber : 1584, className : "csafe.math.BigInteger", methodName : "passesMillerRabin"});
		return true;
	}
	,passesLucasLehmer: function() {
		var thisPlusOne = this.add(csafe_math_BigInteger.get_ONE());
		var d = 5;
		while(csafe_math_BigInteger.jacobiSymbol(d,this) != -1) if(d < 0) {
			d = (Math.abs(d) | 0) + 2;
		} else {
			d = -(d + 2);
		}
		var u = csafe_math_BigInteger.lucasLehmerSequence(d,thisPlusOne,this);
		return u.mod(this).eq(csafe_math_BigInteger.get_ZERO());
	}
	,lShiftTo: function(n,r) {
		var bs = n % csafe_math_BigInteger.DB;
		var cbs = csafe_math_BigInteger.DB - bs;
		var bm = (1 << cbs) - 1;
		var ds = Math.floor(n / csafe_math_BigInteger.DB);
		var c = this.sign << bs & csafe_math_BigInteger.DM;
		var i;
		var i1 = this.t - 1;
		while(i1 >= 0) {
			r.chunks[i1 + ds + 1] = this.chunks[i1] >> cbs | c;
			c = (this.chunks[i1] & bm) << bs;
			--i1;
		}
		i1 = ds - 1;
		while(i1 >= 0) {
			r.chunks[i1] = 0;
			--i1;
		}
		r.chunks[ds] = c;
		r.t = this.t + ds + 1;
		r.sign = this.sign;
		r.clamp();
	}
	,rShiftTo: function(n,r) {
		r.sign = this.sign;
		var ds = Math.floor(n / csafe_math_BigInteger.DB);
		if(ds >= this.t) {
			r.t = 0;
			return;
		}
		var bs = n % csafe_math_BigInteger.DB;
		var cbs = csafe_math_BigInteger.DB - bs;
		var bm = (1 << bs) - 1;
		r.chunks[0] = this.chunks[ds] >> bs;
		var _g1 = ds + 1;
		var _g = this.t;
		while(_g1 < _g) {
			var i = _g1++;
			r.chunks[i - ds - 1] |= (this.chunks[i] & bm) << cbs;
			r.chunks[i - ds] = this.chunks[i] >> bs;
		}
		if(bs > 0) {
			r.chunks[this.t - ds - 1] |= (this.sign & bm) << cbs;
		}
		r.t = this.t - ds;
		r.clamp();
	}
	,am1: function(i,x,w,j,c,n) {
		while(--n >= 0) {
			var v = x * this.chunks[i] + w.chunks[j] + c;
			++i;
			c = Math.floor(v / 67108864);
			w.chunks[j] = v & 67108863;
			++j;
		}
		return c;
	}
	,am2: function(i,x,w,j,c,n) {
		var xl = x & 32767;
		var xh = x >> 15;
		while(--n >= 0) {
			var l = this.chunks[i] & 32767;
			var h = this.chunks[i] >> 15;
			++i;
			var m = xh * l + h * xl;
			l = xl * l + ((m & 32767) << 15) + w.chunks[j] + (c & 1073741823);
			c = (l >>> 30) + (m >>> 15) + xh * h + (c >>> 30);
			w.chunks[j] = l & 1073741823;
			++j;
		}
		return c;
	}
	,am3: function(i,x,w,j,c,n) {
		var xl = x & 16383;
		var xh = x >> 14;
		while(--n >= 0) {
			var l = this.chunks[i] & 16383;
			var h = this.chunks[i] >> 14;
			++i;
			var m = xh * l + h * xl;
			l = xl * l + ((m & 16383) << 14) + w.chunks[j] + c;
			c = (l >> 28) + (m >> 14) + xh * h;
			w.chunks[j] = l & 268435455;
			++j;
		}
		return c;
	}
	,__class__: csafe_math_BigInteger
};
var csafe_math_prng_IPrng = function() { };
csafe_math_prng_IPrng.__name__ = ["csafe","math","prng","IPrng"];
csafe_math_prng_IPrng.prototype = {
	__class__: csafe_math_prng_IPrng
};
var csafe_math_prng_ArcFour = function() {
	this.i = 0;
	this.j = 0;
	this.S = [];
	this.setSize(256);
};
csafe_math_prng_ArcFour.__name__ = ["csafe","math","prng","ArcFour"];
csafe_math_prng_ArcFour.__interfaces__ = [csafe_math_prng_IPrng];
csafe_math_prng_ArcFour.prototype = {
	init: function(key) {
		var t;
		var _g = 0;
		while(_g < 256) {
			var x = _g++;
			this.S[x] = x;
		}
		this.j = 0;
		var _g1 = 0;
		while(_g1 < 256) {
			var i = _g1++;
			this.j = this.j + this.S[i] + key[i % key.length] & 255;
			t = this.S[i];
			this.S[i] = this.j;
			this.S[this.j] = t;
		}
		this.i = 0;
		this.j = 0;
	}
	,next: function() {
		if(this.S.length == 0) {
			throw new js__$Boot_HaxeError("not initialized");
		}
		var t;
		this.i = this.i + 1 & 255;
		this.j = this.j + this.S[this.i] & 255;
		t = this.S[this.i];
		this.S[this.i] = this.S[this.j];
		this.S[this.j] = t;
		return this.S[t + this.S[this.i] & 255];
	}
	,setSize: function(v) {
		if(v % 4 != 0 || v < 32) {
			throw new js__$Boot_HaxeError("invalid size");
		}
		this.size = v;
		return v;
	}
	,toString: function() {
		return "rc4";
	}
	,__class__: csafe_math_prng_ArcFour
};
var csafe_math_prng_Random = function(backend) {
	this.createState(backend);
	this.initialized = false;
};
csafe_math_prng_Random.__name__ = ["csafe","math","prng","Random"];
csafe_math_prng_Random.prototype = {
	next: function() {
		if(this.initialized == false) {
			this.createState();
			this.state.init(this.pool);
			var _g1 = 0;
			var _g = this.pool.length;
			while(_g1 < _g) {
				var i = _g1++;
				this.pool[i] = 0;
			}
			this.pptr = 0;
			this.pool = [];
			this.initialized = true;
		}
		return this.state.next();
	}
	,nextBytes: function(bytes,pos,len) {
		var _g1 = 0;
		var _g = len;
		while(_g1 < _g) {
			var i = _g1++;
			var v = this.next();
			bytes.b[pos + i] = v & 255;
		}
	}
	,nextBytesStream: function(out,count) {
		var _g1 = 0;
		var _g = count;
		while(_g1 < _g) {
			var i = _g1++;
			out.writeByte(this.next());
		}
	}
	,seedInt: function(x) {
		this.pool[this.pptr++] ^= x & 255;
		this.pool[this.pptr++] ^= x >> 8 & 255;
		this.pool[this.pptr++] ^= x >> 16 & 255;
		this.pool[this.pptr++] ^= x >> 24 & 255;
		if(this.pptr >= this.state.size) {
			this.pptr -= this.state.size;
		}
	}
	,seedTime: function() {
		var dt = new Date().getTime();
		var m = dt * 1000 | 0;
		this.seedInt(m);
	}
	,createState: function(backend) {
		if(backend == null) {
			this.state = new csafe_math_prng_ArcFour();
		} else {
			this.state = backend;
		}
		if(this.pool == null) {
			this.pool = [];
			this.pptr = 0;
			var t;
			while(this.pptr < this.state.size) {
				t = Math.floor(65536 * Math.random());
				this.pool[this.pptr++] = t >>> 8;
				this.pool[this.pptr++] = t & 255;
			}
			this.pptr = 0;
			this.seedTime();
		}
	}
	,__class__: csafe_math_prng_Random
};
var csafe_math_reduction_ModularReduction = function() { };
csafe_math_reduction_ModularReduction.__name__ = ["csafe","math","reduction","ModularReduction"];
csafe_math_reduction_ModularReduction.prototype = {
	__class__: csafe_math_reduction_ModularReduction
};
var csafe_math_reduction_Barrett = function(m) {
	this.r2 = csafe_math_BigInteger.nbi();
	this.q3 = csafe_math_BigInteger.nbi();
	csafe_math_BigInteger.get_ONE().dlShiftTo(2 * m.t,this.r2);
	this.mu = this.r2.div(m);
	this.m = m;
};
csafe_math_reduction_Barrett.__name__ = ["csafe","math","reduction","Barrett"];
csafe_math_reduction_Barrett.__interfaces__ = [csafe_math_reduction_ModularReduction];
csafe_math_reduction_Barrett.prototype = {
	convert: function(x) {
		if(x.sign < 0 || x.t > 2 * this.m.t) {
			return x.mod(this.m);
		} else if(x.compare(this.m) < 0) {
			return x;
		} else {
			var r = csafe_math_BigInteger.nbi();
			x.copyTo(r);
			this.reduce(r);
			return r;
		}
	}
	,revert: function(x) {
		return x;
	}
	,reduce: function(x) {
		x.drShiftTo(this.m.t - 1,this.r2);
		if(x.t > this.m.t + 1) {
			x.t = this.m.t + 1;
			x.clamp();
		}
		this.mu.multiplyUpperTo(this.r2,this.m.t + 1,this.q3);
		this.m.multiplyLowerTo(this.q3,this.m.t + 1,this.r2);
		while(x.compare(this.r2) < 0) x.dAddOffset(1,this.m.t + 1);
		x.subTo(this.r2,x);
		while(x.compare(this.m) >= 0) x.subTo(this.m,x);
	}
	,sqrTo: function(x,r) {
		x.squareTo(r);
		this.reduce(r);
	}
	,mulTo: function(x,y,r) {
		x.multiplyTo(y,r);
		this.reduce(r);
	}
	,__class__: csafe_math_reduction_Barrett
};
var csafe_math_reduction_Classic = function(m) {
	this.m = m;
};
csafe_math_reduction_Classic.__name__ = ["csafe","math","reduction","Classic"];
csafe_math_reduction_Classic.__interfaces__ = [csafe_math_reduction_ModularReduction];
csafe_math_reduction_Classic.prototype = {
	convert: function(x) {
		if(x.sign < 0 || x.compare(this.m) >= 0) {
			return x.mod(this.m);
		}
		return x;
	}
	,revert: function(x) {
		return x;
	}
	,reduce: function(x) {
		x.divRemTo(this.m,null,x);
	}
	,mulTo: function(x,y,r) {
		x.multiplyTo(y,r);
		this.reduce(r);
	}
	,sqrTo: function(x,r) {
		x.squareTo(r);
		this.reduce(r);
	}
	,__class__: csafe_math_reduction_Classic
};
var csafe_math_reduction_Montgomery = function(x) {
	this.m = x;
	this.mp = this.m.invDigit();
	this.mpl = this.mp & 32767;
	this.mph = this.mp >> 15;
	this.um = (1 << csafe_math_BigInteger.DB - 15) - 1;
	this.mt2 = 2 * this.m.t;
};
csafe_math_reduction_Montgomery.__name__ = ["csafe","math","reduction","Montgomery"];
csafe_math_reduction_Montgomery.__interfaces__ = [csafe_math_reduction_ModularReduction];
csafe_math_reduction_Montgomery.prototype = {
	convert: function(x) {
		var r = csafe_math_BigInteger.nbi();
		x.abs().dlShiftTo(this.m.t,r);
		r.divRemTo(this.m,null,r);
		if(x.sign < 0 && r.compare(csafe_math_BigInteger.get_ZERO()) > 0) {
			this.m.subTo(r,r);
		}
		return r;
	}
	,revert: function(x) {
		var r = csafe_math_BigInteger.nbi();
		x.copyTo(r);
		this.reduce(r);
		return r;
	}
	,reduce: function(x) {
		x.padTo(this.mt2);
		var i = 0;
		while(i < this.m.t) {
			var j = x.chunks[i] & 32767;
			var u0 = j * this.mpl + ((j * this.mph + (x.chunks[i] >> 15) * this.mpl & this.um) << 15) & csafe_math_BigInteger.DM;
			j = i + this.m.t;
			x.chunks[j] += this.m.am(0,u0,x,i,0,this.m.t);
			while(x.chunks[j] >= csafe_math_BigInteger.DV) {
				x.chunks[j] -= csafe_math_BigInteger.DV;
				if(x.chunks.length < j + 2) {
					x.chunks[j + 1] = 0;
				}
				x.chunks[++j]++;
			}
			++i;
		}
		x.clamp();
		x.drShiftTo(this.m.t,x);
		if(x.compare(this.m) >= 0) {
			x.subTo(this.m,x);
		}
	}
	,mulTo: function(x,y,r) {
		x.multiplyTo(y,r);
		this.reduce(r);
	}
	,sqrTo: function(x,r) {
		x.squareTo(r);
		this.reduce(r);
	}
	,__class__: csafe_math_reduction_Montgomery
};
var csafe_math_reduction_Null = function() {
};
csafe_math_reduction_Null.__name__ = ["csafe","math","reduction","Null"];
csafe_math_reduction_Null.__interfaces__ = [csafe_math_reduction_ModularReduction];
csafe_math_reduction_Null.prototype = {
	convert: function(x) {
		return x;
	}
	,revert: function(x) {
		return x;
	}
	,mulTo: function(x,y,r) {
		x.multiplyTo(y,r);
	}
	,sqrTo: function(x,r) {
		x.squareTo(r);
	}
	,reduce: function(x) {
	}
	,__class__: csafe_math_reduction_Null
};
var csafe_pkcs_ContentInfo = function() {
	csafe_asn1_ASN1Constructed.call(this,csafe_pkcs_ContentInfo.struct);
};
csafe_pkcs_ContentInfo.__name__ = ["csafe","pkcs","ContentInfo"];
csafe_pkcs_ContentInfo.__super__ = csafe_asn1_ASN1Constructed;
csafe_pkcs_ContentInfo.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	getContentType: function() {
		return this.getPrimitive("contentType").asObjectID();
	}
	,setContentType: function(type) {
		this.getPrimitive("contentType").setObjectID(type);
	}
	,getContentASN1: function() {
		return this.getAny("content");
	}
	,setContent: function(arg1,arg2) {
		if(arg2 == null) {
			this.getContentASN1().anyData = arg1;
		} else {
			this.setContentType(arg1);
			var dataASN1;
			if(typeof(arg2) == "string") {
				dataASN1 = csafe_asn1_ASN1.TYPE_OCTET_STRING.create();
				(js_Boot.__cast(dataASN1 , csafe_asn1_ASN1Primitive)).setOctetString(haxe_io_Bytes.ofString(arg2));
				(js_Boot.__cast(dataASN1 , csafe_asn1_ASN1Primitive)).setNullable(true);
			} else if(js_Boot.__instanceof(arg2,haxe_io_Bytes)) {
				dataASN1 = csafe_asn1_ASN1.TYPE_OCTET_STRING.create();
				(js_Boot.__cast(dataASN1 , csafe_asn1_ASN1Primitive)).setOctetString(arg2);
				(js_Boot.__cast(dataASN1 , csafe_asn1_ASN1Primitive)).setNullable(true);
			} else if(js_Boot.__instanceof(arg2,csafe_asn1_ASN1Object)) {
				dataASN1 = arg2;
			} else {
				haxe_Log.trace(Std.string(arg2),{ fileName : "ContentInfo.hx", lineNumber : 48, className : "csafe.pkcs.ContentInfo", methodName : "setContent"});
				var o = arg2;
				throw new js__$Boot_HaxeError(new Exception("Invalid data argument : " + Std.string(o == null ? null : js_Boot.getClass(o))));
			}
			this.getContentASN1().anyData = dataASN1;
		}
	}
	,__class__: csafe_pkcs_ContentInfo
});
var csafe_pkcs_EncryptedContentInfo = function() {
	csafe_asn1_ASN1Constructed.call(this,csafe_pkcs_EncryptedContentInfo.struct);
	this.getPrimitive("contentType").setObjectID(csafe_asn1_ObjectID.pkcs7_data);
};
csafe_pkcs_EncryptedContentInfo.__name__ = ["csafe","pkcs","EncryptedContentInfo"];
csafe_pkcs_EncryptedContentInfo.__super__ = csafe_asn1_ASN1Constructed;
csafe_pkcs_EncryptedContentInfo.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	encrypt: function(algorithm,key,iv,sourceData,rHandle) {
		var _gthis = this;
		var tmp = rHandle.chain("EncryptedContentInfo.encrypt").ok(function(encrypted) {
			_gthis.setASN1("contentEncryptionAlgorithm",algorithm);
			_gthis.getPrimitive("encryptedContent").setOctetString(encrypted);
			rHandle.onOk();
		},{ fileName : "EncryptedContentInfo.hx", lineNumber : 23, className : "csafe.pkcs.EncryptedContentInfo", methodName : "encrypt"});
		algorithm.encrypt(key,sourceData,{ iv : iv},tmp);
	}
	,decrypt: function(key,iv,rHandle) {
		(js_Boot.__cast(this.getASN1("contentEncryptionAlgorithm") , csafe_asn1_impl_AlgorithmID)).decrypt(key,this.getPrimitive("encryptedContent").asByteArray(),{ iv : iv},rHandle);
	}
	,__class__: csafe_pkcs_EncryptedContentInfo
});
var csafe_pkcs_EncryptedData = function() {
	csafe_asn1_ASN1Constructed.call(this,csafe_pkcs_EncryptedData.struct);
	this.getPrimitive("version").setInteger(0);
};
csafe_pkcs_EncryptedData.__name__ = ["csafe","pkcs","EncryptedData"];
csafe_pkcs_EncryptedData.__super__ = csafe_asn1_ASN1Constructed;
csafe_pkcs_EncryptedData.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	derivate: function(encryptionAlgorithm,encodedPassPhrase) {
		haxe_Log.trace("EncryptedData deriv alg : " + encryptionAlgorithm.getAlgorithm().toString(),{ fileName : "EncryptedData.hx", lineNumber : 22, className : "csafe.pkcs.EncryptedData", methodName : "derivate"});
		var params = encryptionAlgorithm.getParameter().resolveAsKnownType(csafe_crypto_cipher_pbe_PBEParameters.struct);
		var salt = params.getSalt();
		var iter = params.getIterationCount();
		var derivedKey;
		var derivedIV;
		if(encryptionAlgorithm.equalsOID(csafe_asn1_impl_AlgorithmID.pbeWithSHAAnd128BitRC4)) {
			derivedKey = csafe_pkcs_KeyMaterialGenerator.generate("SHA-1","key",encodedPassPhrase,salt,iter,16);
			derivedIV = csafe_pkcs_KeyMaterialGenerator.generate("SHA-1","iv",encodedPassPhrase,salt,iter,8);
		} else if(encryptionAlgorithm.equalsOID(csafe_asn1_impl_AlgorithmID.pbeWithSHAAnd40BitRC4)) {
			derivedKey = csafe_pkcs_KeyMaterialGenerator.generate("SHA-1","key",encodedPassPhrase,salt,iter,5);
			derivedIV = csafe_pkcs_KeyMaterialGenerator.generate("SHA-1","iv",encodedPassPhrase,salt,iter,8);
		} else if(encryptionAlgorithm.equalsOID(csafe_asn1_impl_AlgorithmID.pbeWithSHAAnd3_KeyTripleDES_CBC)) {
			derivedKey = csafe_pkcs_KeyMaterialGenerator.generate("SHA-1","key",encodedPassPhrase,salt,iter,24);
			derivedIV = csafe_pkcs_KeyMaterialGenerator.generate("SHA-1","iv",encodedPassPhrase,salt,iter,8);
		} else if(encryptionAlgorithm.equalsOID(csafe_asn1_impl_AlgorithmID.pbeWithSHAAnd2_KeyTripleDES_CBC)) {
			derivedKey = csafe_pkcs_KeyMaterialGenerator.generate("SHA-1","key",encodedPassPhrase,salt,iter,16);
			derivedIV = csafe_pkcs_KeyMaterialGenerator.generate("SHA-1","iv",encodedPassPhrase,salt,iter,8);
		} else if(encryptionAlgorithm.equalsOID(csafe_asn1_impl_AlgorithmID.pbeWithSHAAnd128BitRC2_CBC)) {
			derivedKey = csafe_pkcs_KeyMaterialGenerator.generate("SHA-1","key",encodedPassPhrase,salt,iter,16);
			derivedIV = csafe_pkcs_KeyMaterialGenerator.generate("SHA-1","iv",encodedPassPhrase,salt,iter,8);
		} else if(encryptionAlgorithm.equalsOID(csafe_asn1_impl_AlgorithmID.pbeWithSHAAnd40BitRC2_CBC)) {
			derivedKey = csafe_pkcs_KeyMaterialGenerator.generate("SHA-1","key",encodedPassPhrase,salt,iter,5);
			derivedIV = csafe_pkcs_KeyMaterialGenerator.generate("SHA-1","iv",encodedPassPhrase,salt,iter,8);
		} else {
			throw new js__$Boot_HaxeError(new Exception("Can't support PKCS12#PBE Algo : " + encryptionAlgorithm.getAlgorithm().oid));
		}
		return { key : derivedKey, iv : derivedIV};
	}
	,encrypt: function(algorithm,encodedPassPhrase,sourceData,rHandle) {
		if(algorithm == null) {
			algorithm = csafe_asn1_impl_AlgorithmID.pbeWithSHAAnd3_KeyTripleDES_CBC.clone();
			var param = new csafe_crypto_cipher_pbe_PBEParameters();
			var salt = new haxe_io_Bytes(new ArrayBuffer(8));
			csafe_asn1_impl_AlgorithmID.getRandomValues(salt);
			param.setSalt(salt);
			param.setIterationCount(2048);
			algorithm.setParameter(param);
		}
		var derived = this.derivate(algorithm,encodedPassPhrase);
		(js_Boot.__cast(this.getASN1("encryptedContentInfo") , csafe_pkcs_EncryptedContentInfo)).encrypt(algorithm,derived.key,derived.iv,sourceData,rHandle);
	}
	,decrypt: function(encodedPassPhrase,rHandle) {
		var encryptedContentInfo = this.getASN1("encryptedContentInfo");
		var encryptionAlgorithm = encryptedContentInfo.getASN1("contentEncryptionAlgorithm");
		var derived = this.derivate(encryptionAlgorithm,encodedPassPhrase);
		encryptedContentInfo.decrypt(derived.key,derived.iv,rHandle);
	}
	,__class__: csafe_pkcs_EncryptedData
});
var csafe_pkcs_KeyMaterialGenerator = function() { };
csafe_pkcs_KeyMaterialGenerator.__name__ = ["csafe","pkcs","KeyMaterialGenerator"];
csafe_pkcs_KeyMaterialGenerator.divCeil = function(i,j) {
	var a = i / j | 0;
	if(i % j != 0) {
		++a;
	}
	return a;
};
csafe_pkcs_KeyMaterialGenerator.genI = function(source,tgt,offset,splen) {
	var j = 0;
	var _g1 = offset;
	var _g = splen + offset;
	while(_g1 < _g) {
		var i = _g1++;
		tgt.b[i] = source.b[j++] & 255;
		if(j >= source.length) {
			j = 0;
		}
	}
};
csafe_pkcs_KeyMaterialGenerator.generate = function(hash_algorithm,purposeStr,passPhrase,salt,iteration,dkLen) {
	var purpose = -1;
	if(purposeStr == "key") {
		purpose = 1;
	} else if(purposeStr == "iv") {
		purpose = 2;
	} else if(purposeStr == "mac") {
		purpose = 3;
	}
	if(purpose < 1 || purpose > 3) {
		throw new js__$Boot_HaxeError(new Exception("Invalid purpose(key, iv, mac) : " + purpose));
	}
	var u;
	var v;
	var s = salt.length;
	var p = passPhrase.length;
	var hashMech = null;
	if(hash_algorithm == "SHA-1") {
		u = 20;
		v = 64;
		hashMech = new csafe_crypto_hash_Sha1();
	} else {
		throw new js__$Boot_HaxeError(new Exception("Unsupport algorithm : " + hash_algorithm));
	}
	var slen = v * csafe_pkcs_KeyMaterialGenerator.divCeil(s,v);
	var plen = v * csafe_pkcs_KeyMaterialGenerator.divCeil(p,v);
	var DI = new haxe_io_Bytes(new ArrayBuffer(v + slen + plen));
	var _g1 = 0;
	var _g = v;
	while(_g1 < _g) {
		var i = _g1++;
		DI.b[i] = purpose & 255;
	}
	csafe_pkcs_KeyMaterialGenerator.genI(salt,DI,v,slen);
	csafe_pkcs_KeyMaterialGenerator.genI(passPhrase,DI,slen + v,plen);
	var c = csafe_pkcs_KeyMaterialGenerator.divCeil(dkLen,u);
	var k = csafe_pkcs_KeyMaterialGenerator.divCeil(s,v) + csafe_pkcs_KeyMaterialGenerator.divCeil(p,v);
	var mk = new haxe_io_Bytes(new ArrayBuffer(v));
	var B = new haxe_io_Bytes(new ArrayBuffer(v));
	var keymaterial = new haxe_io_Bytes(new ArrayBuffer(dkLen));
	var m = 0;
	var _g11 = 0;
	var _g2 = c;
	while(_g11 < _g2) {
		var i1 = _g11++;
		var digested = hashMech.calculate(DI);
		var _g3 = 1;
		var _g21 = iteration;
		while(_g3 < _g21) {
			var j = _g3++;
			digested = new csafe_crypto_hash_Sha1().calculate(digested);
		}
		if(digested.length > dkLen - m) {
			util_ArrayUtil.copyBytes(digested,0,keymaterial,m,dkLen - m);
			m += dkLen - m;
		} else {
			util_ArrayUtil.copyBytes(digested,0,keymaterial,m,digested.length);
			m += digested.length;
		}
		if(dkLen - m == 0) {
			break;
		}
		csafe_pkcs_KeyMaterialGenerator.genI(digested,B,0,v);
		var caromB = csafe_math_BigInteger.ofBytes(B,true);
		caromB = caromB.add(csafe_math_BigInteger.get_ONE());
		var _g31 = 0;
		var _g22 = k;
		while(_g31 < _g22) {
			var j1 = _g31++;
			util_ArrayUtil.copyBytes(DI,v + j1 * v,mk,0,v);
			var lane = csafe_math_BigInteger.ofBytes(mk,true);
			lane = lane.add(caromB);
			var itemp = lane.toBytes();
			if(itemp.length > v) {
				util_ArrayUtil.copyBytes(itemp,1,DI,v + j1 * v,v);
			} else if(itemp.length < v) {
				util_ArrayUtil.copyBytes(itemp,0,DI,v + j1 * v + v - itemp.length,itemp.length);
				var _g5 = 0;
				var _g4 = v - itemp.length;
				while(_g5 < _g4) {
					var l = _g5++;
					DI.b[v + j1 * v + l] = 0;
				}
			} else {
				util_ArrayUtil.copyBytes(itemp,0,DI,v + j1 * v,v);
			}
		}
	}
	return keymaterial;
};
var csafe_pkcs_pkcs7_DigestInfo = function() {
	csafe_asn1_ASN1Constructed.call(this,csafe_pkcs_pkcs7_DigestInfo.struct);
};
csafe_pkcs_pkcs7_DigestInfo.__name__ = ["csafe","pkcs","pkcs7","DigestInfo"];
csafe_pkcs_pkcs7_DigestInfo.__super__ = csafe_asn1_ASN1Constructed;
csafe_pkcs_pkcs7_DigestInfo.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	setAlgorithm: function(algo) {
		this.setASN1("digestAlgorithm",algo);
	}
	,getAlgorithm: function() {
		return this.getASN1("digestAlgorithm");
	}
	,getDigested: function() {
		return this.getPrimitive("digest").asByteArray();
	}
	,setDigested: function(data) {
		this.getPrimitive("digest").setOctetString(data);
	}
	,digest: function(algorithm,data,rHandle) {
		var _gthis = this;
		haxe_Log.trace("tryCall : " + "DigestInfo.digest0",{ fileName : "ResultHandler.hx", lineNumber : 121, className : "common.ResultHandler", methodName : "tryCall", customParams : [{ fileName : "DigestInfo.hx", lineNumber : 36, className : "csafe.pkcs.pkcs7.DigestInfo", methodName : "digest"}]});
		try {
			_gthis.setAlgorithm(algorithm);
			algorithm.digest(data,rHandle.chain("DigestInfo.digest").ok(function(digested) {
				_gthis.setDigested(digested);
				rHandle.onOk(digested);
			},{ fileName : "DigestInfo.hx", lineNumber : 40, className : "csafe.pkcs.pkcs7.DigestInfo", methodName : "digest"}));
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			rHandle.onErr(e);
		}
	}
	,__class__: csafe_pkcs_pkcs7_DigestInfo
});
var csafe_pkcs_MacData = function() {
	csafe_asn1_ASN1Constructed.call(this,csafe_pkcs_MacData.struct);
};
csafe_pkcs_MacData.__name__ = ["csafe","pkcs","MacData"];
csafe_pkcs_MacData.__super__ = csafe_asn1_ASN1Constructed;
csafe_pkcs_MacData.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	sign: function(pbeKey,sourceData,rHandle,hash,salt,iteration) {
		if(hash == null) {
			hash = "SHA-1";
		}
		var _gthis = this;
		haxe_Log.trace("tryCall : " + "MacData.sign",{ fileName : "ResultHandler.hx", lineNumber : 121, className : "common.ResultHandler", methodName : "tryCall", customParams : [{ fileName : "MacData.hx", lineNumber : 23, className : "csafe.pkcs.MacData", methodName : "sign"}]});
		try {
			if(hash != "SHA-1") {
				throw new js__$Boot_HaxeError(new Exception(hash + " not support"));
			}
			(js_Boot.__cast(_gthis.getASN1("mac") , csafe_pkcs_pkcs7_DigestInfo)).setAlgorithm(csafe_asn1_impl_AlgorithmID.sha1);
			if(salt == null) {
				salt = new haxe_io_Bytes(new ArrayBuffer(8));
				csafe_asn1_impl_AlgorithmID.getRandomValues(salt);
			}
			_gthis.getPrimitive("macSalt").setOctetString(salt);
			if(iteration == null) {
				iteration = 1;
			} else {
				_gthis.getPrimitive("iterations").setInteger(iteration);
			}
			var derived = csafe_pkcs_KeyMaterialGenerator.generate("SHA-1","mac",pbeKey,salt,iteration,20);
			csafe_asn1_impl_AlgorithmID.hmacSHA1.sign(derived,sourceData,rHandle.chain("").ok(function(signed) {
				(js_Boot.__cast(_gthis.getASN1("mac") , csafe_pkcs_pkcs7_DigestInfo)).setDigested(signed);
				rHandle.onOk();
			},{ fileName : "MacData.hx", lineNumber : 44, className : "csafe.pkcs.MacData", methodName : "sign"}));
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			rHandle.onErr(e);
		}
	}
	,verify: function(pbeKey,sourceData,rHandle,hash) {
		if(hash == null) {
			hash = "SHA-1";
		}
		var _gthis = this;
		haxe_Log.trace("tryCall : " + "MacData.verify",{ fileName : "ResultHandler.hx", lineNumber : 121, className : "common.ResultHandler", methodName : "tryCall", customParams : [{ fileName : "MacData.hx", lineNumber : 55, className : "csafe.pkcs.MacData", methodName : "verify"}]});
		try {
			if(hash != "SHA-1") {
				rHandle.onErr(hash + " not support");
			} else {
				var hashed = (js_Boot.__cast(_gthis.getASN1("mac") , csafe_pkcs_pkcs7_DigestInfo)).getDigested();
				var iteration;
				if(_gthis.getPrimitive("iterations").hasContent()) {
					iteration = _gthis.getPrimitive("iterations").asInteger();
				} else {
					iteration = 1;
				}
				var derived = csafe_pkcs_KeyMaterialGenerator.generate("SHA-1","mac",pbeKey,_gthis.getPrimitive("macSalt").asByteArray(),iteration,20);
				csafe_asn1_impl_AlgorithmID.hmacSHA1.verify(derived,hashed,sourceData,rHandle);
			}
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			rHandle.onErr(e);
		}
	}
	,__class__: csafe_pkcs_MacData
});
var csafe_pkcs_RecipientInfo = function() {
	csafe_asn1_ASN1Constructed.call(this,csafe_pkcs_RecipientInfo.struct);
	this.getPrimitive("version").setInteger(0);
};
csafe_pkcs_RecipientInfo.__name__ = ["csafe","pkcs","RecipientInfo"];
csafe_pkcs_RecipientInfo.createAndEncrypt = function(algId,recipCert,rawKey,rHandle) {
	var recip = new csafe_pkcs_RecipientInfo();
	(js_Boot.__cast(recip.getASN1("issuerAndSerialNumber") , csafe_asn1_impl_IssuerAndSerialNumber)).set(recipCert);
	recip.setASN1("keyEncryptionAlgorithm",algId);
	algId.encrypt(recipCert.getPublicKey().encode(),rawKey,null,rHandle.chain("RecipientInfo.createAndEncrypt").ok(function(encryptedKey) {
		recip.getPrimitive("encryptedKey").setOctetString(encryptedKey);
		rHandle.onOk(recip);
	},{ fileName : "RecipientInfo.hx", lineNumber : 29, className : "csafe.pkcs.RecipientInfo", methodName : "createAndEncrypt"}));
};
csafe_pkcs_RecipientInfo.__super__ = csafe_asn1_ASN1Constructed;
csafe_pkcs_RecipientInfo.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	getContentType: function() {
		return this.getPrimitive("contentType").asObjectID();
	}
	,setContentType: function(type) {
		this.getPrimitive("contentType").setObjectID(type);
	}
	,getContentASN1: function() {
		return this.getAny("content");
	}
	,setContent: function(arg1,arg2) {
		if(arg2 == null) {
			this.getContentASN1().anyData = arg1;
		} else {
			this.setContentType(arg1);
			var dataASN1;
			if(typeof(arg2) == "string") {
				dataASN1 = csafe_asn1_ASN1.TYPE_OCTET_STRING.create();
				(js_Boot.__cast(dataASN1 , csafe_asn1_ASN1Primitive)).setOctetString(haxe_io_Bytes.ofString(arg2));
			} else if(js_Boot.__instanceof(arg2,haxe_io_Bytes)) {
				dataASN1 = csafe_asn1_ASN1.TYPE_OCTET_STRING.create();
				(js_Boot.__cast(dataASN1 , csafe_asn1_ASN1Primitive)).setOctetString(arg2);
			} else if(js_Boot.__instanceof(arg2,csafe_asn1_ASN1Object)) {
				dataASN1 = arg2;
			} else {
				haxe_Log.trace(Std.string(arg2),{ fileName : "RecipientInfo.hx", lineNumber : 64, className : "csafe.pkcs.RecipientInfo", methodName : "setContent"});
				var o = arg2;
				throw new js__$Boot_HaxeError(new Exception("Invalid data argument : " + Std.string(o == null ? null : js_Boot.getClass(o))));
			}
			this.getContentASN1().anyData = dataASN1;
		}
	}
	,__class__: csafe_pkcs_RecipientInfo
});
var csafe_pkcs_pkcs12_AuthenticatedSafe = function() {
	csafe_asn1_ASN1Multiple.call(this,csafe_pkcs_pkcs12_AuthenticatedSafe.struct);
};
csafe_pkcs_pkcs12_AuthenticatedSafe.__name__ = ["csafe","pkcs","pkcs12","AuthenticatedSafe"];
csafe_pkcs_pkcs12_AuthenticatedSafe.__super__ = csafe_asn1_ASN1Multiple;
csafe_pkcs_pkcs12_AuthenticatedSafe.prototype = $extend(csafe_asn1_ASN1Multiple.prototype,{
	extract: function() {
		var KID;
		var certB64 = null;
		var p8B64 = null;
		var error = null;
		var _g = 0;
		var _g1 = this.multiple;
		while(_g < _g1.length) {
			var nextContentM = _g1[_g];
			++_g;
			var contentInfo = nextContentM[0];
			var contentType = contentInfo.getContentType();
			if(!csafe_asn1_ObjectID.pkcs7_encryptedData.equals(contentType)) {
				if(!csafe_asn1_ObjectID.pkcs7_envelopedData.equals(contentType)) {
					if(csafe_asn1_ObjectID.pkcs7_data.equals(contentType)) {
						var safeContentsBytes = (js_Boot.__cast(contentInfo.getContentASN1().resolveAsKnownType(csafe_asn1_ASN1.TYPE_OCTET_STRING) , csafe_asn1_ASN1Primitive)).asByteArray();
						var safeContents = csafe_pkcs_pkcs12_SafeContents.struct.create(null,safeContentsBytes);
						var _g2 = 0;
						var _g3 = safeContents.multiple;
						while(_g2 < _g3.length) {
							var nextSafeBagM = _g3[_g2];
							++_g2;
							var safeBag = nextSafeBagM[0];
							var safeBagId = safeBag.getPrimitive("bagId").asObjectID().oid;
							if(csafe_asn1_ObjectID.pkcs12_certBag.equals(safeBagId)) {
								var certBag = safeBag.getAny("bagValue").resolveAsKnownType(csafe_pkcs_pkcs12_CertBag.struct);
								var certId = certBag.getPrimitive("certId").asObjectID();
								if(csafe_asn1_ObjectID.x509Certificate.equals(certId)) {
									var certDer = (js_Boot.__cast(certBag.getAny("certValue").resolveAsKnownType(csafe_asn1_ASN1.TYPE_OCTET_STRING) , csafe_asn1_ASN1Primitive)).asByteArray();
									KID = safeBag.getId();
									certB64 = haxe_crypto_Base64.encode(certDer);
								} else if(csafe_asn1_ObjectID.sdsiCertificate.equals(certId)) {
									error = "Can't support sdsiCertificate";
									break;
								} else {
									error = "Invalid SafeBag.certId : " + certId.oid;
									break;
								}
							} else if(csafe_asn1_ObjectID.pkcs12_pkcs8ShroudedKeyBag.equals(safeBagId)) {
								var pkcs8enc = safeBag.getASN1("bagValue").encode();
								p8B64 = haxe_crypto_Base64.encode(pkcs8enc);
							} else if(csafe_asn1_ObjectID.pkcs12_keyBag.equals(safeBagId)) {
								error = "critical_raw_private";
								break;
							} else {
								error = "Can't resolve in safeBag : " + safeBagId;
								break;
							}
						}
					} else {
						error = "Unknown authenticatedSafe : " + contentType.oid;
						break;
					}
				}
			}
		}
		if(error != null) {
			return { error : error};
		} else if(certB64 != null && p8B64 != null) {
			return { cer : certB64, priv : p8B64};
		} else {
			return { error : "not_found"};
		}
	}
	,decrypt: function(encodedPassPhrase,rHandle) {
		var orgPhrase = csafe_crypto_cipher_pbe_BMPKey.decode(encodedPassPhrase);
		var resolvedSafeBags = new haxe_ds_StringMap();
		var thisP12 = this;
		var stack = [];
		var _g = 0;
		var _g1 = thisP12.multiple;
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			stack.push(i[0]);
		}
		var addResolvedSafeBag = function(bagId,name,resolvedContent) {
			var bags = __map_reserved[bagId] != null ? resolvedSafeBags.getReserved(bagId) : resolvedSafeBags.h[bagId];
			if(bags == null) {
				bags = new haxe_ds_StringMap();
				var v = bags;
				if(__map_reserved[bagId] != null) {
					resolvedSafeBags.setReserved(bagId,v);
				} else {
					resolvedSafeBags.h[bagId] = v;
				}
			}
			var v1 = resolvedContent;
			if(__map_reserved[name] != null) {
				bags.setReserved(name,v1);
			} else {
				bags.h[name] = v1;
			}
		};
		var resolveSafeContents = function(safeContents,sc_rHandle) {
			var safeBagStack = [];
			var _g2 = 0;
			var _g11 = safeContents.multiple;
			while(_g2 < _g11.length) {
				var i1 = _g11[_g2];
				++_g2;
				safeBagStack.push(i1[0]);
			}
			var safeBagCommitter = null;
			safeBagCommitter = function() {
				var nextStack = safeBagStack.shift();
				if(nextStack == null) {
					sc_rHandle.onOk();
					return;
				}
				var safeBag = nextStack;
				var safeBagId = safeBag.getPrimitive("bagId").asObjectID().oid;
				if(csafe_asn1_ObjectID.pkcs12_certBag.equals(safeBagId)) {
					haxe_Log.trace("Resolved certBag",{ fileName : "AuthenticatedSafe.hx", lineNumber : 145, className : "csafe.pkcs.pkcs12.AuthenticatedSafe", methodName : "decrypt"});
					var certBag = safeBag.getAny("bagValue").resolveAsKnownType(csafe_pkcs_pkcs12_CertBag.struct);
					var certId = certBag.getPrimitive("certId").asObjectID();
					if(csafe_asn1_ObjectID.x509Certificate.equals(certId)) {
						var certDer = (js_Boot.__cast(certBag.getAny("certValue").resolveAsKnownType(csafe_asn1_ASN1.TYPE_OCTET_STRING) , csafe_asn1_ASN1Primitive)).asByteArray();
						var safeBagCommitter1 = safeBag.getId();
						addResolvedSafeBag(safeBagCommitter1,"cert",certDer);
						safeBagCommitter();
					} else if(csafe_asn1_ObjectID.sdsiCertificate.equals(certId)) {
						sc_rHandle.onErr("Can't support sdsiCertificate");
						return;
					} else {
						sc_rHandle.onErr("Invalid SafeBag.certId : " + certId.oid);
						return;
					}
				} else if(csafe_asn1_ObjectID.pkcs12_pkcs8ShroudedKeyBag.equals(safeBagId)) {
					haxe_Log.trace("Resolved pkcs8Enc",{ fileName : "AuthenticatedSafe.hx", lineNumber : 160, className : "csafe.pkcs.pkcs12.AuthenticatedSafe", methodName : "decrypt"});
					var pkcs8enc = safeBag.getASN1("bagValue").encode();
					var safeBagCommitter2 = safeBag.getId();
					addResolvedSafeBag(safeBagCommitter2,"encPriv",pkcs8enc);
					var pkcs8EncPriv = csafe_pkcs_pkcs8_PKCS8EncryptedPrivateKey.struct.create(null,pkcs8enc);
					var safeBagCommitter3 = sc_rHandle.chain("AuthSafe.decrypt.pkcs8").ok(function(decryptedSet) {
						var safeBagCommitter4 = safeBag.getId();
						var safeBagCommitter5 = decryptedSet.encode();
						addResolvedSafeBag(safeBagCommitter4,"priv",safeBagCommitter5);
						var safeBagCommitter6 = safeBag.getId();
						var safeBagCommitter7 = decryptedSet.getRandomNum();
						addResolvedSafeBag(safeBagCommitter6,"rand",safeBagCommitter7);
						safeBagCommitter();
					},{ fileName : "AuthenticatedSafe.hx", lineNumber : 164, className : "csafe.pkcs.pkcs12.AuthenticatedSafe", methodName : "decrypt"});
					pkcs8EncPriv.decrypt(orgPhrase,safeBagCommitter3);
				} else if(csafe_asn1_ObjectID.pkcs12_keyBag.equals(safeBagId)) {
					haxe_Log.trace("Resolved raw privateKey",{ fileName : "AuthenticatedSafe.hx", lineNumber : 171, className : "csafe.pkcs.pkcs12.AuthenticatedSafe", methodName : "decrypt"});
					var pkcs8Raw = safeBag.getASN1("bagValue").encode();
					var safeBagCommitter8 = safeBag.getId();
					addResolvedSafeBag(safeBagCommitter8,"priv",pkcs8Raw);
					var safeBagCommitter9 = new csafe_pkcs_pkcs8_PKCS8EncryptedPrivateKey();
					var safeBagCommitter10 = csafe_asn1_impl_AlgorithmID.seed_CBC;
					var safeBagCommitter11 = sc_rHandle.chain("AuthSafe.decrypt.pkcs8").ok(function(encryptedPriv) {
						var safeBagCommitter12 = safeBag.getId();
						addResolvedSafeBag(safeBagCommitter12,"encPriv",encryptedPriv);
						safeBagCommitter();
					},{ fileName : "AuthenticatedSafe.hx", lineNumber : 181, className : "csafe.pkcs.pkcs12.AuthenticatedSafe", methodName : "decrypt"});
					safeBagCommitter9.encrypt(safeBagCommitter10,orgPhrase,pkcs8Raw,safeBagCommitter11);
				} else {
					sc_rHandle.onErr("Can't resolve in safeBag : " + safeBagId);
					return;
				}
			};
			safeBagCommitter();
		};
		var contentCommitter = null;
		contentCommitter = function() {
			var nextStack1 = stack.shift();
			if(nextStack1 == null) {
				rHandle.onOk(resolvedSafeBags);
				return;
			}
			var contentInfo = nextStack1;
			var contentType = contentInfo.getContentType();
			if(csafe_asn1_ObjectID.pkcs7_encryptedData.equals(contentType)) {
				haxe_Log.trace("Commited pkcs7encryptedData data",{ fileName : "AuthenticatedSafe.hx", lineNumber : 206, className : "csafe.pkcs.pkcs12.AuthenticatedSafe", methodName : "decrypt"});
				var encData = contentInfo.getContentASN1().resolveAsKnownType(csafe_pkcs_EncryptedData.struct);
				var contentCommitter1 = rHandle.chain("AuthSafe.decrypt.p7enc").ok(function(decrypted) {
					var safeContents1 = csafe_pkcs_pkcs12_SafeContents.struct.create(null,decrypted);
					var contentCommitter2 = rHandle.chain("AuthSafe.decrypt.p7enc2").ok(contentCommitter,{ fileName : "AuthenticatedSafe.hx", lineNumber : 212, className : "csafe.pkcs.pkcs12.AuthenticatedSafe", methodName : "decrypt"});
					resolveSafeContents(safeContents1,contentCommitter2);
				},{ fileName : "AuthenticatedSafe.hx", lineNumber : 209, className : "csafe.pkcs.pkcs12.AuthenticatedSafe", methodName : "decrypt"});
				encData.decrypt(encodedPassPhrase,contentCommitter1);
			} else if(!csafe_asn1_ObjectID.pkcs7_envelopedData.equals(contentType)) {
				if(csafe_asn1_ObjectID.pkcs7_data.equals(contentType)) {
					haxe_Log.trace("Commited pkcs7 data",{ fileName : "AuthenticatedSafe.hx", lineNumber : 218, className : "csafe.pkcs.pkcs12.AuthenticatedSafe", methodName : "decrypt"});
					var safeContentsBytes = (js_Boot.__cast(contentInfo.getContentASN1().resolveAsKnownType(csafe_asn1_ASN1.TYPE_OCTET_STRING) , csafe_asn1_ASN1Primitive)).asByteArray();
					var safeContents2 = csafe_pkcs_pkcs12_SafeContents.struct.create(null,safeContentsBytes);
					var contentCommitter3 = rHandle.chain("AuthSafe.decrypt.p7").ok(contentCommitter,{ fileName : "AuthenticatedSafe.hx", lineNumber : 222, className : "csafe.pkcs.pkcs12.AuthenticatedSafe", methodName : "decrypt"});
					resolveSafeContents(safeContents2,contentCommitter3);
				} else {
					rHandle.onErr("Unknown authenticatedSafe : " + contentType.oid);
					return;
				}
			}
		};
		contentCommitter();
	}
	,__class__: csafe_pkcs_pkcs12_AuthenticatedSafe
});
var csafe_pkcs_pkcs12_CertBag = function() {
	csafe_asn1_ASN1Constructed.call(this,csafe_pkcs_pkcs12_CertBag.struct);
};
csafe_pkcs_pkcs12_CertBag.__name__ = ["csafe","pkcs","pkcs12","CertBag"];
csafe_pkcs_pkcs12_CertBag.__super__ = csafe_asn1_ASN1Constructed;
csafe_pkcs_pkcs12_CertBag.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	__class__: csafe_pkcs_pkcs12_CertBag
});
var csafe_pkcs_pkcs12_PFX = function() {
	csafe_asn1_ASN1Constructed.call(this,csafe_pkcs_pkcs12_PFX.struct);
	this.getPrimitive("version").setInteger(3);
};
csafe_pkcs_pkcs12_PFX.__name__ = ["csafe","pkcs","pkcs12","PFX"];
csafe_pkcs_pkcs12_PFX.__super__ = csafe_asn1_ASN1Constructed;
csafe_pkcs_pkcs12_PFX.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	sign: function(passPhrase,rHandle) {
		var _gthis = this;
		haxe_Log.trace("tryCall : " + "PFX.sign",{ fileName : "ResultHandler.hx", lineNumber : 121, className : "common.ResultHandler", methodName : "tryCall", customParams : [{ fileName : "PFX.hx", lineNumber : 32, className : "csafe.pkcs.pkcs12.PFX", methodName : "sign"}]});
		try {
			var encodedPassPhrase = csafe_crypto_cipher_pbe_BMPKey.encode(passPhrase);
			if(_gthis.authSafe == null) {
				rHandle.onErr("설정된 SafeContents가 없습니다");
			} else {
				var signSource = _gthis.authSafe.encode();
				(js_Boot.__cast(_gthis.getASN1("macData") , csafe_pkcs_MacData)).sign(encodedPassPhrase,signSource,rHandle,null,null,2048);
			}
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			rHandle.onErr(e);
		}
	}
	,verify: function(passPhrase,rHandle) {
		var _gthis = this;
		haxe_Log.trace("tryCall : " + "PFX.verify",{ fileName : "ResultHandler.hx", lineNumber : 121, className : "common.ResultHandler", methodName : "tryCall", customParams : [{ fileName : "PFX.hx", lineNumber : 56, className : "csafe.pkcs.pkcs12.PFX", methodName : "verify"}]});
		try {
			var encodedPassPhrase = csafe_crypto_cipher_pbe_BMPKey.encode(passPhrase);
			var cInfo = _gthis.getASN1("authSafe");
			var buffer = new haxe_io_BytesBuffer();
			cInfo.getContentASN1().resolveAsAnony().encodeContent(buffer);
			var source = buffer.getBytes();
			(js_Boot.__cast(_gthis.getASN1("macData") , csafe_pkcs_MacData)).verify(encodedPassPhrase,source,rHandle);
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			rHandle.onErr(e);
		}
	}
	,extract: function() {
		var contentInfo = this.getASN1("authSafe");
		var contentType = contentInfo.getContentType();
		var content = contentInfo.getContentASN1();
		var resolvedContent;
		if(csafe_asn1_ObjectID.pkcs7_data.equals(contentType)) {
			var contentBytes = (js_Boot.__cast(content.resolveAsKnownType(csafe_asn1_ASN1.TYPE_OCTET_STRING) , csafe_asn1_ASN1Primitive)).asByteArray();
			var authSafe = csafe_pkcs_pkcs12_AuthenticatedSafe.struct.create(null,contentBytes);
			return authSafe.extract();
		} else if(csafe_asn1_ObjectID.pkcs7_signedData.equals(contentType)) {
			return { error : "Public Key Integrity not support"};
		} else {
			return { error : "Public Key Integrity not support"};
		}
	}
	,verifyAndDecrypt: function(passPhrase,rHandle) {
		var _gthis = this;
		var decChain = rHandle.chain("decrypt");
		var tmp = decChain.ok(function() {
			_gthis.decrypt(passPhrase,rHandle);
		},{ fileName : "PFX.hx", lineNumber : 101, className : "csafe.pkcs.pkcs12.PFX", methodName : "verifyAndDecrypt"});
		this.verify(passPhrase,tmp);
	}
	,decrypt: function(passPhrase,rHandle) {
		var encodedPassPhrase = csafe_crypto_cipher_pbe_BMPKey.encode(passPhrase);
		var contentInfo = this.getASN1("authSafe");
		var contentType = contentInfo.getContentType();
		var content = contentInfo.getContentASN1();
		var resolvedContent;
		if(csafe_asn1_ObjectID.pkcs7_data.equals(contentType)) {
			var contentBytes = (js_Boot.__cast(content.resolveAsKnownType(csafe_asn1_ASN1.TYPE_OCTET_STRING) , csafe_asn1_ASN1Primitive)).asByteArray();
			var authSafe = csafe_pkcs_pkcs12_AuthenticatedSafe.struct.create(null,contentBytes);
			authSafe.decrypt(encodedPassPhrase,rHandle);
			return;
		} else if(csafe_asn1_ObjectID.pkcs7_signedData.equals(contentType)) {
			rHandle.onErr("PFX.decrypt : Public Key Integrity not support");
		} else {
			rHandle.onErr("PFX.decrypt : Unknown compoent : " + contentType.oid);
		}
	}
	,addCertAndEncryptedPrivateKey: function(cert,encryptedPriv,passPhrase,rHandle) {
		var _gthis = this;
		haxe_Log.trace("tryCall : " + "PFX.addCertAndEncryptedPrivateKey",{ fileName : "ResultHandler.hx", lineNumber : 121, className : "common.ResultHandler", methodName : "tryCall", customParams : [{ fileName : "PFX.hx", lineNumber : 130, className : "csafe.pkcs.pkcs12.PFX", methodName : "addCertAndEncryptedPrivateKey"}]});
		try {
			var keyID = new haxe_io_Bytes(new ArrayBuffer(8));
			csafe_asn1_impl_AlgorithmID.getRandomValues(keyID);
			var tmp = rHandle.chain("PFX.addCertAndEncryptedPrivateKey.addCert").ok(function() {
				_gthis.addEncryptedPrivateKey(encryptedPriv,keyID,passPhrase,rHandle);
			},{ fileName : "PFX.hx", lineNumber : 135, className : "csafe.pkcs.pkcs12.PFX", methodName : "addCertAndEncryptedPrivateKey"});
			_gthis.addCert(cert,keyID,passPhrase,tmp);
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			rHandle.onErr(e);
		}
	}
	,addAsOCPForm: function(cert,priv,passPhrase,rHandle) {
		var _gthis = this;
		haxe_Log.trace("tryCall : " + "PFX.addAsOCPFormat",{ fileName : "ResultHandler.hx", lineNumber : 121, className : "common.ResultHandler", methodName : "tryCall", customParams : [{ fileName : "PFX.hx", lineNumber : 149, className : "csafe.pkcs.pkcs12.PFX", methodName : "addAsOCPForm"}]});
		try {
			var keyID = new haxe_io_Bytes(new ArrayBuffer(20));
			csafe_asn1_impl_AlgorithmID.getRandomValues(keyID);
			var tmp = rHandle.chain("PFX.addCertAndPrivateKey.addCert").ok(function() {
				var encPriv = new csafe_pkcs_pkcs8_PKCS8EncryptedPrivateKey();
				var tmp1 = csafe_asn1_impl_AlgorithmID.pbeWithSHAAnd3_KeyTripleDES_CBC;
				var tmp2 = rHandle.chain("PFX.addCertAndPrivateKey.encrypt").ok(function(encryptedPriv) {
					_gthis.addEncryptedPrivateKey(encryptedPriv,keyID,null,rHandle);
				},{ fileName : "PFX.hx", lineNumber : 158, className : "csafe.pkcs.pkcs12.PFX", methodName : "addAsOCPForm"});
				encPriv.encrypt(tmp1,passPhrase,priv,tmp2);
			},{ fileName : "PFX.hx", lineNumber : 155, className : "csafe.pkcs.pkcs12.PFX", methodName : "addAsOCPForm"});
			_gthis.addCert(cert,keyID,passPhrase,tmp);
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			rHandle.onErr(e);
		}
	}
	,addCertAndPrivateKey: function(cert,priv,passPhrase,rHandle) {
		var _gthis = this;
		haxe_Log.trace("tryCall : " + "PFX.addCertAndPrivateKey",{ fileName : "ResultHandler.hx", lineNumber : 121, className : "common.ResultHandler", methodName : "tryCall", customParams : [{ fileName : "PFX.hx", lineNumber : 172, className : "csafe.pkcs.pkcs12.PFX", methodName : "addCertAndPrivateKey"}]});
		try {
			(function() {
				var keyID = new haxe_io_Bytes(new ArrayBuffer(8));
				csafe_asn1_impl_AlgorithmID.getRandomValues(keyID);
				var pkcs8PrivRaw = null;
				if(js_Boot.__instanceof(priv,csafe_pkcs_pkcs8_PKCS8PrivateKey)) {
					pkcs8PrivRaw = (js_Boot.__cast(priv , csafe_pkcs_pkcs8_PKCS8PrivateKey)).encode();
				} else if(js_Boot.__instanceof(priv,haxe_io_Bytes)) {
					pkcs8PrivRaw = priv;
				} else {
					rHandle.onErr("Invalid priv parameter : " + Std.string(priv));
					return;
				}
				var tmp = rHandle.chain("PFX.addCertAndPrivateKey.addCert").ok(function() {
					var encPriv = new csafe_pkcs_pkcs8_PKCS8EncryptedPrivateKey();
					var tmp1 = csafe_asn1_impl_AlgorithmID.pbeWithSHAAnd3_KeyTripleDES_CBC;
					var tmp2 = rHandle.chain("PFX.addCertAndPrivateKey.encrypt").ok(function(encryptedPriv) {
						_gthis.addEncryptedPrivateKey(encryptedPriv,keyID,passPhrase,rHandle);
					},{ fileName : "PFX.hx", lineNumber : 192, className : "csafe.pkcs.pkcs12.PFX", methodName : "addCertAndPrivateKey"});
					encPriv.encrypt(tmp1,passPhrase,pkcs8PrivRaw,tmp2);
				},{ fileName : "PFX.hx", lineNumber : 189, className : "csafe.pkcs.pkcs12.PFX", methodName : "addCertAndPrivateKey"});
				_gthis.addCert(cert,keyID,null,tmp);
			})();
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			rHandle.onErr(e);
		}
	}
	,addCert: function(cert,keyID,passPhrase,rHandle) {
		var _gthis = this;
		haxe_Log.trace("tryCall : " + "PFX.addCert",{ fileName : "ResultHandler.hx", lineNumber : 121, className : "common.ResultHandler", methodName : "tryCall", customParams : [{ fileName : "PFX.hx", lineNumber : 203, className : "csafe.pkcs.pkcs12.PFX", methodName : "addCert"}]});
		try {
			(function() {
				var certASN1 = null;
				if(js_Boot.__instanceof(cert,haxe_io_Bytes)) {
					certASN1 = csafe_asn1_ASN1Primitive.createOctetString(cert);
				} else if(typeof(cert) == "string") {
					certASN1 = csafe_asn1_ASN1Primitive.createOctetString(haxe_crypto_Base64.decode(cert));
				} else if(js_Boot.__instanceof(cert,csafe_x509_X509Certificate)) {
					certASN1 = csafe_asn1_ASN1Primitive.createOctetString((js_Boot.__cast(cert , csafe_x509_X509Certificate)).encode());
				} else {
					rHandle.onErr("Invalid cert parameter : " + Std.string(cert));
					return;
				}
				var certBagSet = new csafe_pkcs_pkcs12_CertBag();
				certBagSet.getPrimitive("certId").setObjectID(csafe_asn1_ObjectID.x509Certificate);
				certBagSet.setASN1("certValue",certASN1);
				var safeBag = new csafe_pkcs_pkcs12_SafeBag(csafe_asn1_ObjectID.pkcs12_certBag,certBagSet,keyID);
				_gthis.addSafeContents([safeBag],passPhrase,rHandle);
			})();
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			rHandle.onErr(e);
		}
	}
	,addEncryptedPrivateKey: function(encryptedPriv,keyID,passPhrase,rHandle) {
		var _gthis = this;
		haxe_Log.trace("tryCall : " + "PFX.addEncryptedPrivateKey",{ fileName : "ResultHandler.hx", lineNumber : 121, className : "common.ResultHandler", methodName : "tryCall", customParams : [{ fileName : "PFX.hx", lineNumber : 228, className : "csafe.pkcs.pkcs12.PFX", methodName : "addEncryptedPrivateKey"}]});
		try {
			(function() {
				var encPriv = null;
				if(typeof(encryptedPriv) == "string") {
					encPriv = new csafe_asn1_ASN1Raw(haxe_crypto_Base64.decode(encryptedPriv));
				} else if(js_Boot.__instanceof(encryptedPriv,haxe_io_Bytes)) {
					encPriv = new csafe_asn1_ASN1Raw(encryptedPriv);
				} else {
					rHandle.onErr("Invalid encryptedPriv parameter : " + Std.string(encryptedPriv));
					return;
				}
				var safeBag = new csafe_pkcs_pkcs12_SafeBag(csafe_asn1_ObjectID.pkcs12_pkcs8ShroudedKeyBag,encPriv,keyID);
				_gthis.addSafeContents([safeBag],passPhrase,rHandle);
			})();
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			rHandle.onErr(e);
		}
	}
	,addPrivateKey: function(priv,keyID,passPhrase,rHandle) {
		var _gthis = this;
		haxe_Log.trace("tryCall : " + "PFX.addPrivateKey",{ fileName : "ResultHandler.hx", lineNumber : 121, className : "common.ResultHandler", methodName : "tryCall", customParams : [{ fileName : "PFX.hx", lineNumber : 248, className : "csafe.pkcs.pkcs12.PFX", methodName : "addPrivateKey"}]});
		try {
			(function() {
				var privRaw = null;
				if(typeof(priv) == "string") {
					privRaw = new csafe_asn1_ASN1Raw(haxe_crypto_Base64.decode(priv));
				} else if(js_Boot.__instanceof(priv,haxe_io_Bytes)) {
					privRaw = new csafe_asn1_ASN1Raw(priv);
				} else {
					rHandle.onErr("Invalid priv parameter : " + Std.string(priv));
					return;
				}
				var safeBag = new csafe_pkcs_pkcs12_SafeBag(csafe_asn1_ObjectID.pkcs12_keyBag,privRaw,keyID);
				_gthis.addSafeContents([safeBag],passPhrase,rHandle);
			})();
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			rHandle.onErr(e);
		}
	}
	,addSafeContents: function(safeBags,passPhrase,rHandle) {
		var _gthis = this;
		haxe_Log.trace("tryCall : " + "PFX.addSafeContents",{ fileName : "ResultHandler.hx", lineNumber : 121, className : "common.ResultHandler", methodName : "tryCall", customParams : [{ fileName : "PFX.hx", lineNumber : 268, className : "csafe.pkcs.pkcs12.PFX", methodName : "addSafeContents"}]});
		try {
			if(_gthis.authSafe == null) {
				_gthis.authSafe = new csafe_pkcs_pkcs12_AuthenticatedSafe();
			}
			var safeContents = new csafe_pkcs_pkcs12_SafeContents();
			var _g = 0;
			while(_g < safeBags.length) {
				var i = safeBags[_g];
				++_g;
				safeContents.addData(i);
			}
			if(passPhrase != null) {
				var encodedPassPhrase = csafe_crypto_cipher_pbe_BMPKey.encode(passPhrase);
				var encryptedData = new csafe_pkcs_EncryptedData();
				var tmp = safeContents.encode();
				var tmp1 = rHandle.chain("PFX.addSafeContents.encrypt").ok(function() {
					(js_Boot.__cast(_gthis.authSafe.addAndFocus() , csafe_pkcs_ContentInfo)).setContent(csafe_asn1_ObjectID.pkcs7_encryptedData,encryptedData);
					rHandle.onOk();
				},{ fileName : "PFX.hx", lineNumber : 282, className : "csafe.pkcs.pkcs12.PFX", methodName : "addSafeContents"});
				encryptedData.encrypt(null,encodedPassPhrase,tmp,tmp1);
			} else {
				(js_Boot.__cast(_gthis.authSafe.addAndFocus() , csafe_pkcs_ContentInfo)).setContent(csafe_asn1_ObjectID.pkcs7_data,safeContents.encode());
				rHandle.onOk();
			}
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			rHandle.onErr(e);
		}
	}
	,encode: function(forceImplicit,out) {
		if(this.authSafe != null) {
			(js_Boot.__cast(this.getASN1("authSafe") , csafe_pkcs_ContentInfo)).setContent(csafe_asn1_ObjectID.pkcs7_data,this.authSafe.encode());
		}
		return csafe_asn1_ASN1Constructed.prototype.encode.call(this,forceImplicit,out);
	}
	,__class__: csafe_pkcs_pkcs12_PFX
});
var csafe_pkcs_pkcs12_SafeBag = function(bagId,value,keyID) {
	csafe_asn1_ASN1Constructed.call(this,csafe_pkcs_pkcs12_SafeBag.struct);
	if(bagId != null) {
		this.getPrimitive("bagId").setObjectID(bagId);
	}
	if(value != null) {
		this.setASN1("bagValue",value);
	}
	if(keyID != null) {
		var attr = this.getMultiple("bagAttributes").addAndFocus();
		attr.getPrimitive("attributeType").setObjectID(csafe_asn1_ObjectID.localKeyID);
		var any = attr.getMultiple("attributes").addAndFocus();
		any.anyData = csafe_asn1_ASN1Primitive.createOctetString(keyID);
	}
};
csafe_pkcs_pkcs12_SafeBag.__name__ = ["csafe","pkcs","pkcs12","SafeBag"];
csafe_pkcs_pkcs12_SafeBag.__super__ = csafe_asn1_ASN1Constructed;
csafe_pkcs_pkcs12_SafeBag.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	getId: function() {
		var attr = this.getMultiple("bagAttributes").getFirstElem(0);
		var bb = new haxe_io_BytesBuffer();
		attr.getFirstValue().resolveAsAnony().encodeContent(bb);
		return bb.getBytes().toHex();
	}
	,__class__: csafe_pkcs_pkcs12_SafeBag
});
var csafe_pkcs_pkcs12_SafeContents = function() {
	csafe_asn1_ASN1Multiple.call(this,csafe_pkcs_pkcs12_SafeContents.struct);
};
csafe_pkcs_pkcs12_SafeContents.__name__ = ["csafe","pkcs","pkcs12","SafeContents"];
csafe_pkcs_pkcs12_SafeContents.__super__ = csafe_asn1_ASN1Multiple;
csafe_pkcs_pkcs12_SafeContents.prototype = $extend(csafe_asn1_ASN1Multiple.prototype,{
	__class__: csafe_pkcs_pkcs12_SafeContents
});
var csafe_pkcs_pkcs7_EnvelopedData = function() {
	csafe_asn1_ASN1Constructed.call(this,csafe_pkcs_pkcs7_EnvelopedData.struct);
	this.getPrimitive("version").setInteger(0);
};
csafe_pkcs_pkcs7_EnvelopedData.__name__ = ["csafe","pkcs","pkcs7","EnvelopedData"];
csafe_pkcs_pkcs7_EnvelopedData.__super__ = csafe_asn1_ASN1Constructed;
csafe_pkcs_pkcs7_EnvelopedData.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	setEnvelopKey: function(envKey,iv) {
		this.envKey = envKey;
		this.envIv = iv;
	}
	,addRecipient: function(algId,recipCert,rHandle) {
		var _gthis = this;
		if(this.envKey == null) {
			rHandle.onErr("enveloped_data_no_envkey");
			return;
		}
		csafe_pkcs_RecipientInfo.createAndEncrypt(algId,recipCert,this.envKey,rHandle.chain("EnvelopedData.addRecipient").ok(function(recip) {
			_gthis.getMultiple("recipientInfos").addData(recip);
			rHandle.onOk();
		},{ fileName : "EnvelopedData.hx", lineNumber : 44, className : "csafe.pkcs.pkcs7.EnvelopedData", methodName : "addRecipient"}));
	}
	,encrypt: function(algId,dataType,data,rHandle) {
		var enc = js_Boot.__cast(this.getASN1("encryptedContentInfo") , csafe_pkcs_EncryptedContentInfo);
		if(dataType != null) {
			enc.getPrimitive("contentType").setObjectID(dataType);
		}
		var iv = this.envIv;
		var algParam = algId.getParameter().resolveAsAnony();
		var algParamType = algParam.getType();
		if(algParamType.tagNum == csafe_asn1_ASN1.NULL) {
			if(iv == null) {
				iv = new haxe_io_Bytes(new ArrayBuffer(this.envKey.length));
				csafe_asn1_impl_AlgorithmID.getRandomValues(iv);
			}
			algId.setParameter(csafe_asn1_ASN1Primitive.createOctetString(iv));
		} else if(algParamType.tagNum == csafe_asn1_ASN1.OCTET_STRING) {
			iv = (js_Boot.__cast(algParam , csafe_asn1_ASN1Primitive)).asByteArray();
		} else {
			rHandle.onErr("enveloped_data_invalid_symm_algParam");
			return;
		}
		enc.encrypt(algId,this.envKey,iv,data,rHandle.chain("EnvelopedData.encrypt").ok(function() {
			rHandle.onOk();
		},{ fileName : "EnvelopedData.hx", lineNumber : 75, className : "csafe.pkcs.pkcs7.EnvelopedData", methodName : "encrypt"}));
	}
	,__class__: csafe_pkcs_pkcs7_EnvelopedData
});
var csafe_pkcs_pkcs7_SignerInfo = function() {
	csafe_asn1_ASN1Constructed.call(this,csafe_pkcs_pkcs7_SignerInfo.struct);
	this.getPrimitive("version").setInteger(1);
};
csafe_pkcs_pkcs7_SignerInfo.__name__ = ["csafe","pkcs","pkcs7","SignerInfo"];
csafe_pkcs_pkcs7_SignerInfo.__super__ = csafe_asn1_ASN1Constructed;
csafe_pkcs_pkcs7_SignerInfo.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	setIssuerAndSerialNumber: function(issuerAndSerialNumber) {
		this.setASN1("issuerAndSerialNumber",issuerAndSerialNumber);
	}
	,fromCertificate: function(cert) {
		(js_Boot.__cast(this.getASN1("issuerAndSerialNumber") , csafe_asn1_impl_IssuerAndSerialNumber)).set(cert);
	}
	,getDigestAlgorithm: function() {
		return this.getASN1("digestAlgorithm");
	}
	,setDigestAlgorithm: function(algo) {
		this.setASN1("digestAlgorithm",algo);
	}
	,addAuthenticatedAttribute: function(arg1,arg2) {
		if(arg1 == null) {
			this.getMultiple("authenticatedAttributes").addData(arg2);
		} else {
			var attr = new csafe_asn1_impl_Attribute(arg1,arg2);
			this.getMultiple("authenticatedAttributes").addData(attr);
		}
	}
	,setDigestEncryptionAlgorithm: function(algo) {
		this.setASN1("digestEncryptionAlgorithm",algo);
	}
	,addUnauthenticatedAttribute: function(arg1,arg2) {
		if(arg1 == null) {
			this.getMultiple("unauthenticatedAttributes").addData(arg2);
		} else {
			var attr = new csafe_asn1_impl_Attribute(arg1,arg2);
			this.getMultiple("unauthenticatedAttributes").addData(attr);
		}
	}
	,getAuthenticateAttributesBytes: function() {
		return this.getASN1("authenticatedAttributes").encode();
	}
	,sign: function(algo,sav,rHandle) {
		var _gthis = this;
		haxe_Log.trace("tryCall : " + "SignerInfo.sign",{ fileName : "ResultHandler.hx", lineNumber : 121, className : "common.ResultHandler", methodName : "tryCall", customParams : [{ fileName : "SignerInfo.hx", lineNumber : 75, className : "csafe.pkcs.pkcs7.SignerInfo", methodName : "sign"}]});
		try {
			if(sav.getCertificate() != null) {
				_gthis.fromCertificate(sav.getCertificate());
			}
			var thisSigner = _gthis;
			var authedAttrBytes = thisSigner.getAuthenticateAttributesBytes();
			if(algo == null) {
				if(sav.getCertificate() == null) {
					throw new js__$Boot_HaxeError(new Exception("Can't find algorithm or no certificate argument"));
				}
				algo = sav.getCertificate().getSigAlg();
			}
			sav.sign(algo,authedAttrBytes,rHandle.chain("SignerInfo.sign").ok(function(signed) {
				thisSigner.getPrimitive("encryptedDigest").setOctetString(signed);
				rHandle.onOk();
			},{ fileName : "SignerInfo.hx", lineNumber : 89, className : "csafe.pkcs.pkcs7.SignerInfo", methodName : "sign"}));
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			rHandle.onErr(e);
		}
	}
	,__class__: csafe_pkcs_pkcs7_SignerInfo
});
var csafe_pkcs_pkcs7_SignedData = function() {
	csafe_asn1_ASN1Constructed.call(this,csafe_pkcs_pkcs7_SignedData.struct);
	this.getPrimitive("version").setInteger(1);
};
csafe_pkcs_pkcs7_SignedData.__name__ = ["csafe","pkcs","pkcs7","SignedData"];
csafe_pkcs_pkcs7_SignedData.__super__ = csafe_asn1_ASN1Constructed;
csafe_pkcs_pkcs7_SignedData.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	addSign: function(signAlgo,privAndCert,attrs,rHandle) {
		var _gthis = this;
		haxe_Log.trace("tryCall : " + "SignedData.addSign",{ fileName : "ResultHandler.hx", lineNumber : 121, className : "common.ResultHandler", methodName : "tryCall", customParams : [{ fileName : "SignedData.hx", lineNumber : 50, className : "csafe.pkcs.pkcs7.SignedData", methodName : "addSign"}]});
		try {
			var sav = null;
			if(js_Boot.__instanceof(privAndCert,csafe_SignAndVerifier)) {
				sav = privAndCert;
			} else {
				sav = new csafe_DefaultSignAndVerifier(privAndCert.cert,privAndCert.priv);
			}
			if(sav.getCertificate() != null) {
				_gthis.addCertificate(sav.getCertificate());
			}
			var signerInfo = _gthis.getMultiple("signerInfos").addAndFocus();
			if(_gthis.getHashAlgorithm().hasContent()) {
				var tmp = _gthis.getHashAlgorithm();
				signerInfo.setDigestAlgorithm(tmp);
			} else {
				throw new js__$Boot_HaxeError(new Exception("hashAlgo is not set"));
			}
			var contentInfo = _gthis.getASN1("contentInfo");
			if(!contentInfo.hasContent()) {
				throw new js__$Boot_HaxeError(new Exception("has no contentInfo"));
			}
			var thisSigned = _gthis;
			_gthis.getHashAlgorithm().digest((js_Boot.__cast(contentInfo.getContentASN1().anyData , csafe_asn1_ASN1Primitive)).asByteArray(),rHandle.chain("SignedData.addSign.digest").ok(function(digested) {
				var typeDef = csafe_asn1_ASN1.TYPE_OBJECT_ID.create();
				typeDef.setObjectID(contentInfo.getContentType());
				signerInfo.addAuthenticatedAttribute(csafe_asn1_ObjectID.contentType,typeDef);
				var hasSigningTime = false;
				if(attrs != null) {
					var _g = 0;
					while(_g < attrs.length) {
						var attr = attrs[_g];
						++_g;
						if(csafe_asn1_ObjectID.signingTime.equals(attr.getAttributeType())) {
							hasSigningTime = true;
						}
						signerInfo.addAuthenticatedAttribute(null,attr);
					}
				}
				if(!hasSigningTime) {
					var signTime = new csafe_asn1_impl_ChoiceOfTime();
					signTime.setDate();
					signerInfo.addAuthenticatedAttribute(csafe_asn1_ObjectID.signingTime,signTime);
				}
				var digestData = csafe_asn1_ASN1.TYPE_OCTET_STRING.create();
				digestData.setOctetString(digested);
				signerInfo.addAuthenticatedAttribute(csafe_asn1_ObjectID.messageDigest,digestData);
				if(signAlgo.equalsOID(csafe_asn1_impl_AlgorithmID.rsaEncryption)) {
					signerInfo.setDigestEncryptionAlgorithm(csafe_asn1_impl_AlgorithmID.rsaEncryption);
					signerInfo.sign(csafe_asn1_impl_AlgorithmID.sha256WithRSAEncryption,sav,rHandle);
				} else if(signAlgo.equalsOID(csafe_asn1_impl_AlgorithmID.rsaPSS)) {
					signerInfo.setDigestEncryptionAlgorithm(csafe_asn1_impl_AlgorithmID.rsaPSS);
					signerInfo.sign(csafe_asn1_impl_AlgorithmID.rsaPSS,sav,rHandle);
				} else {
					rHandle.onErr("invalid_sign_algo");
				}
			},{ fileName : "SignedData.hx", lineNumber : 76, className : "csafe.pkcs.pkcs7.SignedData", methodName : "addSign"}));
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			rHandle.onErr(e);
		}
	}
	,addSignHashed: function(digested,signAlgo,privAndCert,attrs,rHandle) {
		var _gthis = this;
		haxe_Log.trace("tryCall : " + "SignedData.addHashedSign",{ fileName : "ResultHandler.hx", lineNumber : 121, className : "common.ResultHandler", methodName : "tryCall", customParams : [{ fileName : "SignedData.hx", lineNumber : 134, className : "csafe.pkcs.pkcs7.SignedData", methodName : "addSignHashed"}]});
		try {
			var sav = null;
			if(js_Boot.__instanceof(privAndCert,csafe_SignAndVerifier)) {
				sav = privAndCert;
			} else {
				sav = new csafe_DefaultSignAndVerifier(privAndCert.cert,privAndCert.priv);
			}
			if(sav.getCertificate() != null) {
				_gthis.addCertificate(sav.getCertificate());
			}
			_gthis.setContentInfo(csafe_asn1_ObjectID.pkcs7_data);
			var signerInfo = _gthis.getMultiple("signerInfos").addAndFocus();
			if(_gthis.getHashAlgorithm().hasContent()) {
				signerInfo.setDigestAlgorithm(_gthis.getHashAlgorithm());
			} else {
				throw new js__$Boot_HaxeError(new Exception("hashAlgo is not set"));
			}
			var contentInfo = _gthis.getASN1("contentInfo");
			var typeDef = csafe_asn1_ASN1.TYPE_OBJECT_ID.create();
			typeDef.setObjectID(contentInfo.getContentType());
			signerInfo.addAuthenticatedAttribute(csafe_asn1_ObjectID.contentType,typeDef);
			var hasSigningTime = false;
			if(attrs != null) {
				var _g = 0;
				while(_g < attrs.length) {
					var attr = attrs[_g];
					++_g;
					if(csafe_asn1_ObjectID.signingTime.equals(attr.getAttributeType())) {
						hasSigningTime = true;
					}
					signerInfo.addAuthenticatedAttribute(null,attr);
				}
			}
			if(!hasSigningTime) {
				var signTime = new csafe_asn1_impl_ChoiceOfTime();
				signTime.setDate();
				signerInfo.addAuthenticatedAttribute(csafe_asn1_ObjectID.signingTime,signTime);
			}
			var digestData = csafe_asn1_ASN1.TYPE_OCTET_STRING.create();
			digestData.setOctetString(digested);
			signerInfo.addAuthenticatedAttribute(csafe_asn1_ObjectID.messageDigest,digestData);
			if(signAlgo.equalsOID(csafe_asn1_impl_AlgorithmID.rsaEncryption)) {
				signerInfo.setDigestEncryptionAlgorithm(csafe_asn1_impl_AlgorithmID.rsaEncryption);
				signerInfo.sign(csafe_asn1_impl_AlgorithmID.sha256WithRSAEncryption,sav,rHandle);
			} else if(signAlgo.equalsOID(csafe_asn1_impl_AlgorithmID.rsaPSS)) {
				signerInfo.setDigestEncryptionAlgorithm(csafe_asn1_impl_AlgorithmID.rsaPSS);
				signerInfo.sign(csafe_asn1_impl_AlgorithmID.rsaPSS,sav,rHandle);
			} else {
				rHandle.onErr("invalid_sign_algo");
			}
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			rHandle.onErr(e);
		}
	}
	,getHashAlgorithm: function() {
		return this.getMultiple("digestAlgorithms").getFirstElem(0);
	}
	,addHashAlgorithm: function(hashAlgo) {
		this.getMultiple("digestAlgorithms").addData(hashAlgo);
	}
	,setContentInfo: function(arg1,arg2) {
		if(arg2 == null) {
			if(js_Boot.__instanceof(arg1,csafe_pkcs_ContentInfo)) {
				this.setASN1("contentInfo",arg1);
			} else {
				(js_Boot.__cast(this.getASN1("contentInfo") , csafe_pkcs_ContentInfo)).setContentType(arg1);
			}
		} else {
			(js_Boot.__cast(this.getASN1("contentInfo") , csafe_pkcs_ContentInfo)).setContent(arg1,arg2);
		}
	}
	,addCertificate: function(cert) {
		this.getMultiple("certificates").addData(cert);
	}
	,__class__: csafe_pkcs_pkcs7_SignedData
});
var csafe_pkcs_pkcs8_PKCS8EncryptedPrivateKey = function() {
	csafe_asn1_ASN1Constructed.call(this,csafe_pkcs_pkcs8_PKCS8EncryptedPrivateKey.struct);
};
csafe_pkcs_pkcs8_PKCS8EncryptedPrivateKey.__name__ = ["csafe","pkcs","pkcs8","PKCS8EncryptedPrivateKey"];
csafe_pkcs_pkcs8_PKCS8EncryptedPrivateKey.__super__ = csafe_asn1_ASN1Constructed;
csafe_pkcs_pkcs8_PKCS8EncryptedPrivateKey.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	encrypt: function(algorithm,passPhrase,privateKey,rHandle,salt,iteration,keyLength) {
		var _gthis = this;
		var thisPKCS8 = this;
		var encodedPassPhrase = passPhrase;
		var encryptFunc = function(pkcs8PrivateKeyEncoded) {
			algorithm = algorithm.clone();
			if(algorithm.getAlgorithm().oid.indexOf(csafe_asn1_impl_AlgorithmID.pkcs12PbeIds.getAlgorithm().oid) == 0) {
				encodedPassPhrase = csafe_crypto_cipher_pbe_BMPKey.encode(passPhrase);
				if(algorithm.getParameter().anyData == null || algorithm.getParameter().anyData.getType().isUniversalTagNum(csafe_asn1_ASN1.NULL)) {
					if(salt == null) {
						salt = new haxe_io_Bytes(new ArrayBuffer(8));
						csafe_asn1_impl_AlgorithmID.getRandomValues(salt);
					}
					if(iteration == null) {
						iteration = 1024;
					}
					var params = new csafe_crypto_cipher_pbe_PBEParameters();
					params.setSalt(salt);
					params.setIterationCount(iteration);
					algorithm.setParameter(params);
				} else if(js_Boot.__instanceof(algorithm.getParameter().anyData,csafe_crypto_cipher_pbe_PBEParameters)) {
					var params1 = algorithm.getParameter().resolveAsKnownType(csafe_crypto_cipher_pbe_PBEParameters.struct);
					if(salt == null) {
						salt = params1.getSalt();
					} else {
						params1.setSalt(salt);
					}
					if(iteration == null) {
						iteration = params1.getIterationCount();
					} else {
						params1.setIterationCount(iteration);
					}
				} else {
					var encryptFunc1 = "Invalid Algorithm parameter(not PBEParameter) : " + Std.string(algorithm.getParameter().anyData);
					rHandle.onErr(encryptFunc1);
					return;
				}
				var derivedKey;
				var derivedIV;
				if(algorithm.equalsOID(csafe_asn1_impl_AlgorithmID.pbeWithSHAAnd128BitRC4)) {
					derivedKey = csafe_pkcs_KeyMaterialGenerator.generate("SHA-1","key",encodedPassPhrase,salt,iteration,16);
					derivedIV = csafe_pkcs_KeyMaterialGenerator.generate("SHA-1","iv",encodedPassPhrase,salt,iteration,8);
				} else if(algorithm.equalsOID(csafe_asn1_impl_AlgorithmID.pbeWithSHAAnd40BitRC4)) {
					derivedKey = csafe_pkcs_KeyMaterialGenerator.generate("SHA-1","key",encodedPassPhrase,salt,iteration,5);
					derivedIV = csafe_pkcs_KeyMaterialGenerator.generate("SHA-1","iv",encodedPassPhrase,salt,iteration,8);
				} else if(algorithm.equalsOID(csafe_asn1_impl_AlgorithmID.pbeWithSHAAnd3_KeyTripleDES_CBC)) {
					derivedKey = csafe_pkcs_KeyMaterialGenerator.generate("SHA-1","key",encodedPassPhrase,salt,iteration,24);
					derivedIV = csafe_pkcs_KeyMaterialGenerator.generate("SHA-1","iv",encodedPassPhrase,salt,iteration,8);
				} else if(algorithm.equalsOID(csafe_asn1_impl_AlgorithmID.pbeWithSHAAnd2_KeyTripleDES_CBC)) {
					derivedKey = csafe_pkcs_KeyMaterialGenerator.generate("SHA-1","key",encodedPassPhrase,salt,iteration,16);
					derivedIV = csafe_pkcs_KeyMaterialGenerator.generate("SHA-1","iv",encodedPassPhrase,salt,iteration,8);
				} else if(algorithm.equalsOID(csafe_asn1_impl_AlgorithmID.pbeWithSHAAnd128BitRC2_CBC)) {
					derivedKey = csafe_pkcs_KeyMaterialGenerator.generate("SHA-1","key",encodedPassPhrase,salt,iteration,16);
					derivedIV = csafe_pkcs_KeyMaterialGenerator.generate("SHA-1","iv",encodedPassPhrase,salt,iteration,8);
				} else if(algorithm.equalsOID(csafe_asn1_impl_AlgorithmID.pbeWithSHAAnd40BitRC2_CBC)) {
					derivedKey = csafe_pkcs_KeyMaterialGenerator.generate("SHA-1","key",encodedPassPhrase,salt,iteration,5);
					derivedIV = csafe_pkcs_KeyMaterialGenerator.generate("SHA-1","iv",encodedPassPhrase,salt,iteration,8);
				} else {
					var encryptFunc2 = "Can't support PKCS12#PBE Algo : " + algorithm.getAlgorithm().oid;
					rHandle.onErr(encryptFunc2);
					return;
				}
				var encryptFunc3 = rHandle.chain("PKCS8.encrypt").ok(function(encrypted) {
					_gthis.setASN1("encryptionAlgorithm",algorithm);
					thisPKCS8.getPrimitive("encryptedData").setOctetString(encrypted);
					var encryptFunc4 = thisPKCS8.encode();
					rHandle.onOk(encryptFunc4);
				},{ fileName : "PKCS8EncryptedPrivateKey.hx", lineNumber : 95, className : "csafe.pkcs.pkcs8.PKCS8EncryptedPrivateKey", methodName : "encrypt"});
				algorithm.encrypt(derivedKey,pkcs8PrivateKeyEncoded,{ iv : derivedIV},encryptFunc3);
			} else {
				var cipherIV = new haxe_io_Bytes(new ArrayBuffer(16));
				csafe_asn1_impl_AlgorithmID.getRandomValues(cipherIV);
				var pbes2 = new csafe_crypto_cipher_pbe_PBES2();
				var encryptFunc5 = rHandle.chain("PKCS8.encrypt.pbes2").ok(function(encrypted1) {
					var encAlgo = _gthis.getASN1("encryptionAlgorithm");
					encAlgo.getPrimitive("algorithm").setObjectID(csafe_asn1_impl_AlgorithmID.pbes2.getAlgorithm());
					encAlgo.setParameter(pbes2);
					thisPKCS8.getPrimitive("encryptedData").setOctetString(encrypted1);
					var encryptFunc6 = thisPKCS8.encode();
					rHandle.onOk(encryptFunc6);
				},{ fileName : "PKCS8EncryptedPrivateKey.hx", lineNumber : 115, className : "csafe.pkcs.pkcs8.PKCS8EncryptedPrivateKey", methodName : "encrypt"});
				pbes2.encrypt(algorithm,encodedPassPhrase,pkcs8PrivateKeyEncoded,encryptFunc5,salt,iteration,keyLength);
				return;
			}
		};
		if(js_Boot.__instanceof(privateKey,haxe_io_Bytes)) {
			encryptFunc(privateKey);
		} else if(js_Boot.__instanceof(privateKey,csafe_pkcs_pkcs8_PKCS8PrivateKey)) {
			var tmp = (js_Boot.__cast(privateKey , csafe_pkcs_pkcs8_PKCS8PrivateKey)).encode();
			encryptFunc(tmp);
		} else {
			csafe_asn1_impl_AlgorithmID.rsa.exportKey("pkcs8",privateKey,rHandle.chain("PKCS8.encrypt.export").ok(function(exportedPrivKey) {
				encryptFunc(exportedPrivKey);
			},{ fileName : "PKCS8EncryptedPrivateKey.hx", lineNumber : 133, className : "csafe.pkcs.pkcs8.PKCS8EncryptedPrivateKey", methodName : "encrypt"}));
		}
	}
	,decrypt: function(passPhrase,rHandle) {
		var resolvePKCS8 = function(decryptedPrivKeyBytes) {
			var pkcs8Priv = csafe_pkcs_pkcs8_PKCS8PrivateKey.struct.create(null,decryptedPrivKeyBytes);
			rHandle.onOk(pkcs8Priv);
		};
		var encodedPassPhrase = passPhrase;
		var thisPKCS8 = this;
		var encryptionAlgorithm = this.getASN1("encryptionAlgorithm");
		var encryptedPrivKeyBytes = this.getPrimitive("encryptedData").asByteArray();
		haxe_Log.trace("PKCS8 Dec alg : " + encryptionAlgorithm.getAlgorithm().toString(),{ fileName : "PKCS8EncryptedPrivateKey.hx", lineNumber : 150, className : "csafe.pkcs.pkcs8.PKCS8EncryptedPrivateKey", methodName : "decrypt"});
		if(encryptionAlgorithm.equalsOID(csafe_asn1_impl_AlgorithmID.pbes2)) {
			var pbes2 = encryptionAlgorithm.getParameter().resolveAsKnownType(csafe_crypto_cipher_pbe_PBES2.struct);
			pbes2.decrypt(encodedPassPhrase,encryptedPrivKeyBytes,rHandle.chain("PKCS8.decrypt").ok(resolvePKCS8,{ fileName : "PKCS8EncryptedPrivateKey.hx", lineNumber : 153, className : "csafe.pkcs.pkcs8.PKCS8EncryptedPrivateKey", methodName : "decrypt"}));
		} else if(encryptionAlgorithm.equalsOID(csafe_asn1_impl_AlgorithmID.seed_CBC)) {
			var params = encryptionAlgorithm.getParameter().resolveAsKnownType(csafe_crypto_cipher_pbe_PBEParameters.struct);
			var salt = params.getSalt();
			var iter = params.getIterationCount();
			var pbeKey = new haxe_io_Bytes(new ArrayBuffer(encodedPassPhrase.length + salt.length));
			pbeKey.blit(0,encodedPassPhrase,0,encodedPassPhrase.length);
			pbeKey.blit(encodedPassPhrase.length,salt,0,salt.length);
			LZZerorize.pus(pbeKey);
			var hashMech = new csafe_crypto_hash_Sha1();
			pbeKey = util_CryptUtil.repeatHash(hashMech,pbeKey,iter);
			var ivGenParam = pbeKey.sub(16,4);
			var iv = hashMech.calculate(ivGenParam);
			var secretKey = pbeKey.sub(0,16);
			iv = haxe_io_Bytes.ofString("0123456789012345");
			var tmp = rHandle.chain("").ok(resolvePKCS8,{ fileName : "PKCS8EncryptedPrivateKey.hx", lineNumber : 173, className : "csafe.pkcs.pkcs8.PKCS8EncryptedPrivateKey", methodName : "decrypt"});
			encryptionAlgorithm.decrypt(secretKey,encryptedPrivKeyBytes,{ iv : iv},tmp);
		} else if(encryptionAlgorithm.equalsOID(csafe_asn1_impl_AlgorithmID.pbeWithSHA1AndSEED_CBC)) {
			var params1 = encryptionAlgorithm.getParameter().resolveAsKnownType(csafe_crypto_cipher_pbe_PBEParameters.struct);
			var salt1 = params1.getSalt();
			var iter1 = params1.getIterationCount();
			var pbeKey1 = new haxe_io_Bytes(new ArrayBuffer(encodedPassPhrase.length + salt1.length));
			pbeKey1.blit(0,encodedPassPhrase,0,encodedPassPhrase.length);
			pbeKey1.blit(encodedPassPhrase.length,salt1,0,salt1.length);
			LZZerorize.pus(pbeKey1);
			var hashMech1 = new csafe_crypto_hash_Sha1();
			pbeKey1 = util_CryptUtil.repeatHash(hashMech1,pbeKey1,iter1);
			var ivGenParam1 = pbeKey1.sub(16,4);
			var iv1 = hashMech1.calculate(ivGenParam1);
			var secretKey1 = pbeKey1.sub(0,16);
			var tmp1 = rHandle.chain("").ok(resolvePKCS8,{ fileName : "PKCS8EncryptedPrivateKey.hx", lineNumber : 191, className : "csafe.pkcs.pkcs8.PKCS8EncryptedPrivateKey", methodName : "decrypt"});
			encryptionAlgorithm.decrypt(secretKey1,encryptedPrivKeyBytes,{ iv : iv1},tmp1);
		} else if(encryptionAlgorithm.getAlgorithm().oid.indexOf(csafe_asn1_impl_AlgorithmID.pkcs12PbeIds.getAlgorithm().oid) == 0) {
			encodedPassPhrase = csafe_crypto_cipher_pbe_BMPKey.encode(passPhrase);
			var params2 = encryptionAlgorithm.getParameter().resolveAsKnownType(csafe_crypto_cipher_pbe_PBEParameters.struct);
			var salt2 = params2.getSalt();
			var iter2 = params2.getIterationCount();
			var derivedKey;
			var derivedIV;
			if(encryptionAlgorithm.equalsOID(csafe_asn1_impl_AlgorithmID.pbeWithSHAAnd128BitRC4)) {
				derivedKey = csafe_pkcs_KeyMaterialGenerator.generate("SHA-1","key",encodedPassPhrase,salt2,iter2,16);
				derivedIV = csafe_pkcs_KeyMaterialGenerator.generate("SHA-1","iv",encodedPassPhrase,salt2,iter2,8);
			} else if(encryptionAlgorithm.equalsOID(csafe_asn1_impl_AlgorithmID.pbeWithSHAAnd40BitRC4)) {
				derivedKey = csafe_pkcs_KeyMaterialGenerator.generate("SHA-1","key",encodedPassPhrase,salt2,iter2,5);
				derivedIV = csafe_pkcs_KeyMaterialGenerator.generate("SHA-1","iv",encodedPassPhrase,salt2,iter2,8);
			} else if(encryptionAlgorithm.equalsOID(csafe_asn1_impl_AlgorithmID.pbeWithSHAAnd3_KeyTripleDES_CBC)) {
				derivedKey = csafe_pkcs_KeyMaterialGenerator.generate("SHA-1","key",encodedPassPhrase,salt2,iter2,24);
				derivedIV = csafe_pkcs_KeyMaterialGenerator.generate("SHA-1","iv",encodedPassPhrase,salt2,iter2,8);
			} else if(encryptionAlgorithm.equalsOID(csafe_asn1_impl_AlgorithmID.pbeWithSHAAnd2_KeyTripleDES_CBC)) {
				derivedKey = csafe_pkcs_KeyMaterialGenerator.generate("SHA-1","key",encodedPassPhrase,salt2,iter2,16);
				derivedIV = csafe_pkcs_KeyMaterialGenerator.generate("SHA-1","iv",encodedPassPhrase,salt2,iter2,8);
			} else if(encryptionAlgorithm.equalsOID(csafe_asn1_impl_AlgorithmID.pbeWithSHAAnd128BitRC2_CBC)) {
				derivedKey = csafe_pkcs_KeyMaterialGenerator.generate("SHA-1","key",encodedPassPhrase,salt2,iter2,16);
				derivedIV = csafe_pkcs_KeyMaterialGenerator.generate("SHA-1","iv",encodedPassPhrase,salt2,iter2,8);
			} else if(encryptionAlgorithm.equalsOID(csafe_asn1_impl_AlgorithmID.pbeWithSHAAnd40BitRC2_CBC)) {
				derivedKey = csafe_pkcs_KeyMaterialGenerator.generate("SHA-1","key",encodedPassPhrase,salt2,iter2,5);
				derivedIV = csafe_pkcs_KeyMaterialGenerator.generate("SHA-1","iv",encodedPassPhrase,salt2,iter2,8);
			} else {
				var tmp2 = "Can't support PKCS12#PBE Algo : " + encryptionAlgorithm.getAlgorithm().oid;
				rHandle.onErr(tmp2);
				return;
			}
			var tmp3 = rHandle.chain("PKCS8.decrypt2").ok(resolvePKCS8,{ fileName : "PKCS8EncryptedPrivateKey.hx", lineNumber : 224, className : "csafe.pkcs.pkcs8.PKCS8EncryptedPrivateKey", methodName : "decrypt"});
			encryptionAlgorithm.decrypt(derivedKey,encryptedPrivKeyBytes,{ iv : derivedIV},tmp3);
		} else {
			var tmp4 = "Can't support pbeAlgo : " + encryptionAlgorithm.getAlgorithm().oid;
			rHandle.onErr(tmp4);
			return;
		}
	}
	,__class__: csafe_pkcs_pkcs8_PKCS8EncryptedPrivateKey
});
var csafe_pkcs_pkcs8_PKCS8PrivateKey = function() {
	csafe_asn1_ASN1Constructed.call(this,csafe_pkcs_pkcs8_PKCS8PrivateKey.struct);
	this.getPrimitive("version").setInteger(0);
};
csafe_pkcs_pkcs8_PKCS8PrivateKey.__name__ = ["csafe","pkcs","pkcs8","PKCS8PrivateKey"];
csafe_pkcs_pkcs8_PKCS8PrivateKey.__super__ = csafe_asn1_ASN1Constructed;
csafe_pkcs_pkcs8_PKCS8PrivateKey.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	addAttribute: function(arg0,arg1) {
		if(js_Boot.__instanceof(arg0,csafe_asn1_impl_Attribute)) {
			this.getMultiple("attributes").addData(arg0);
		} else {
			this.getMultiple("attributes").addData(new csafe_asn1_impl_Attribute(arg0,arg1));
		}
	}
	,getAttribute: function(oid) {
		var attrs = this.getMultiple("attributes").getInstances();
		var _g = 0;
		while(_g < attrs.length) {
			var attr = attrs[_g];
			++_g;
			var attrV = attr;
			if(attrV.getAttributeType().equals(oid)) {
				return attrV;
			}
		}
		return null;
	}
	,getRandomNum: function() {
		var attr = this.getAttribute(csafe_asn1_ObjectID.id_randomNum);
		if(attr != null) {
			return (js_Boot.__cast(attr.getFirstValue().resolveAsKnownType(csafe_asn1_ASN1.TYPE_BIT_STRING) , csafe_asn1_ASN1Primitive)).asByteArray();
		}
		return null;
	}
	,getRawPrivate: function() {
		return this.getPrimitive("privateKey").asByteArray();
	}
	,setRawPrivate: function(key) {
		this.getPrimitive("privateKey").setOctetString(key);
	}
	,__class__: csafe_pkcs_pkcs8_PKCS8PrivateKey
});
var csafe_x509_ext_AccessDescription = function() {
	csafe_asn1_ASN1Constructed.call(this,csafe_x509_ext_AccessDescription.struct);
};
csafe_x509_ext_AccessDescription.__name__ = ["csafe","x509","ext","AccessDescription"];
csafe_x509_ext_AccessDescription.__super__ = csafe_asn1_ASN1Constructed;
csafe_x509_ext_AccessDescription.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	getMethod: function() {
		return this.getPrimitive("accessMethod").asObjectID();
	}
	,getLocation: function() {
		return this.getASN1("accessLocation");
	}
	,__class__: csafe_x509_ext_AccessDescription
});
var csafe_x509_ext_AuthorityInformationAccess = function() {
	csafe_asn1_ASN1Multiple.call(this,csafe_x509_ext_AuthorityInformationAccess.struct);
};
csafe_x509_ext_AuthorityInformationAccess.__name__ = ["csafe","x509","ext","AuthorityInformationAccess"];
csafe_x509_ext_AuthorityInformationAccess.__super__ = csafe_asn1_ASN1Multiple;
csafe_x509_ext_AuthorityInformationAccess.prototype = $extend(csafe_asn1_ASN1Multiple.prototype,{
	getDescriptions: function() {
		return this.getInstances();
	}
	,toString: function() {
		var insts = this.getDescriptions();
		var sb = [];
		var _g1 = 0;
		var _g = insts.length;
		while(_g1 < _g) {
			var i = _g1++;
			sb.push("접근방법 : " + Std.string(insts[i].getMethod()) + "\n");
			sb.push("접근위치 : " + insts[i].getLocation().toString() + "\n");
		}
		return sb.join("");
	}
	,__class__: csafe_x509_ext_AuthorityInformationAccess
});
var csafe_x509_ext_AuthorityKeyIdentifier = function() {
	csafe_asn1_ASN1Constructed.call(this,csafe_x509_ext_AuthorityKeyIdentifier.struct);
};
csafe_x509_ext_AuthorityKeyIdentifier.__name__ = ["csafe","x509","ext","AuthorityKeyIdentifier"];
csafe_x509_ext_AuthorityKeyIdentifier.__super__ = csafe_asn1_ASN1Constructed;
csafe_x509_ext_AuthorityKeyIdentifier.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	getIssuer: function() {
		return this.getASN1("authorityCertIssuer");
	}
	,getKeyID: function() {
		return this.getPrimitive("keyIdentifier").asByteArray();
	}
	,getSerialNumber: function() {
		return this.getPrimitive("authorityCertSerialNumber").asBigInteger();
	}
	,toString: function() {
		var sb = [];
		if(this.getASN1("keyIdentifier").hasContent()) {
			sb.push("키 식별자 : " + this.getKeyID().toHex() + "\n");
		}
		if(this.getASN1("authorityCertIssuer").hasContent()) {
			try {
				var gns = this.getIssuer();
				sb.push("발급자명 : " + gns.toString() + "\n");
			} catch( e ) {
				if (e instanceof js__$Boot_HaxeError) e = e.val;
				if( js_Boot.__instanceof(e,Exception) ) {
					sb.push("발급자명 : ");
					sb.push("Error");
					sb.push("\n");
				} else throw(e);
			}
		}
		if(this.getASN1("authorityCertSerialNumber").hasContent()) {
			sb.push("발급자 인증서 일련번호 : " + this.getSerialNumber().toString() + "(0x" + this.getSerialNumber().toRadix(16) + ")" + "\n");
		}
		return sb.join("");
	}
	,__class__: csafe_x509_ext_AuthorityKeyIdentifier
});
var csafe_x509_ext_BasicConstraints = function() {
	csafe_asn1_ASN1Constructed.call(this,csafe_x509_ext_BasicConstraints.struct);
};
csafe_x509_ext_BasicConstraints.__name__ = ["csafe","x509","ext","BasicConstraints"];
csafe_x509_ext_BasicConstraints.__super__ = csafe_asn1_ASN1Constructed;
csafe_x509_ext_BasicConstraints.prototype = $extend(csafe_asn1_ASN1Constructed.prototype,{
	isCA: function() {
		if(!this.getASN1("cA").hasContent()) {
			return false;
		}
		return this.getPrimitive("cA").asBoolean();
	}
	,getPLC: function() {
		if(!this.getASN1("pathLengthConstraints").hasContent()) {
			return -1;
		} else {
			return this.getPrimitive("pathLengthConstraints").asInteger();
		}
	}
	,toString: function() {
		var sb = [];
		sb.push("구분 : ");
		if(this.isCA()) {
			sb.push("CA\n");
		} else {
			sb.push("End Entity\n");
		}
		var plc = this.getPLC();
		if(plc != -1) {
			sb.push("경로 길이 : " + plc);
		}
		return sb.join("");
	}
	,__class__: csafe_x509_ext_BasicConstraints
});
var csafe_x509_ext_CRLDistributionPoints = function() {
	csafe_asn1_ASN1Multiple.call(this,csafe_x509_ext_CRLDistributionPoints.struct);
};
csafe_x509_ext_CRLDistributionPoints.__name__ = ["csafe","x509","ext","CRLDistributionPoints"];
csafe_x509_ext_CRLDistributionPoints.__super__ = csafe_asn1_ASN1Multiple;
csafe_x509_ext_CRLDistributionPoints.prototype = $extend(csafe_asn1_ASN1Multiple.prototype,{
	getDistributionPoints: function() {
		return this.getInstances();
	}
	,toString: function() {
		var sb = [];
		var dps = this.getDistributionPoints();
		var _g1 = 0;
		var _g = dps.length;
		while(_g1 < _g) {
			var i = _g1++;
			sb.push(dps[i]);
		}
		return sb.join("");
	}
	,__class__: csafe_x509_ext_CRLDistributionPoints
});
var csafe_x509_ext_CertificatePolicies = function() {
	csafe_asn1_ASN1Multiple.call(this,csafe_x509_ext_CertificatePolicies.struct);
};
csafe_x509_ext_CertificatePolicies.__name__ = ["csafe","x509","ext","CertificatePolicies"];
csafe_x509_ext_CertificatePolicies.__super__ = csafe_asn1_ASN1Multiple;
csafe_x509_ext_CertificatePolicies.prototype = $extend(csafe_asn1_ASN1Multiple.prototype,{
	getPolicyInformations: function() {
		return this.getInstances();
	}
	,toString: function() {
		var sb = [];
		var policyInfos = this.getPolicyInformations();
		var _g1 = 0;
		var _g = policyInfos.length;
		while(_g1 < _g) {
			var i = _g1++;
			sb.push("정책정보 [" + i + "]: " + Std.string(policyInfos[i]) + "\n");
		}
		return sb.join("");
	}
	,__class__: csafe_x509_ext_CertificatePolicies
});
var csafe_x509_ext_IssuerAltName = function() {
	csafe_asn1_impl_GeneralNames.call(this);
};
csafe_x509_ext_IssuerAltName.__name__ = ["csafe","x509","ext","IssuerAltName"];
csafe_x509_ext_IssuerAltName.__super__ = csafe_asn1_impl_GeneralNames;
csafe_x509_ext_IssuerAltName.prototype = $extend(csafe_asn1_impl_GeneralNames.prototype,{
	__class__: csafe_x509_ext_IssuerAltName
});
var csafe_x509_ext_KeyUsage = function() {
	csafe_asn1_ASN1Primitive.call(this,csafe_x509_ext_KeyUsage.struct);
};
csafe_x509_ext_KeyUsage.__name__ = ["csafe","x509","ext","KeyUsage"];
csafe_x509_ext_KeyUsage.__super__ = csafe_asn1_ASN1Primitive;
csafe_x509_ext_KeyUsage.prototype = $extend(csafe_asn1_ASN1Primitive.prototype,{
	toString: function() {
		var sb = [];
		var usages = this.asBooleanArray();
		var _g1 = 0;
		var _g = usages.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(usages[i]) {
				if(i == csafe_x509_ext_KeyUsage.DigitalSignature) {
					sb.push("전자서명(Digital Signature)  ");
				} else if(i == csafe_x509_ext_KeyUsage.NonRepudation) {
					sb.push("부인봉쇄(Non-Repudiation)  ");
				} else if(i == csafe_x509_ext_KeyUsage.KeyEncipherment) {
					sb.push("키 암호화(Key-Encipherment)  ");
				} else if(i == csafe_x509_ext_KeyUsage.DataEncipherment) {
					sb.push("데이터 암호화(Data-Encipherment)  ");
				} else if(i == csafe_x509_ext_KeyUsage.KeyAgreement) {
					sb.push("키 교환(Key-Agreement)  ");
				} else if(i == csafe_x509_ext_KeyUsage.KeyCertificateSign) {
					sb.push("키 인증서 서명(Key-CertificateSign)  ");
				} else if(i == csafe_x509_ext_KeyUsage.CRLsign) {
					sb.push("폐지 목록 서명(CRL-Sign)  ");
				} else if(i == csafe_x509_ext_KeyUsage.EnCipherOnly) {
					sb.push("암호화전용(enCipher-Only)  ");
				} else if(i == csafe_x509_ext_KeyUsage.DeCipherOnly) {
					sb.push("복호화전용(deCipher-Only)  ");
				}
			}
		}
		return sb.join("");
	}
	,__class__: csafe_x509_ext_KeyUsage
});
var csafe_x509_ext_SubjectAltName = function() {
	csafe_asn1_impl_GeneralNames.call(this);
};
csafe_x509_ext_SubjectAltName.__name__ = ["csafe","x509","ext","SubjectAltName"];
csafe_x509_ext_SubjectAltName.__super__ = csafe_asn1_impl_GeneralNames;
csafe_x509_ext_SubjectAltName.prototype = $extend(csafe_asn1_impl_GeneralNames.prototype,{
	__class__: csafe_x509_ext_SubjectAltName
});
var csafe_x509_ext_SubjectKeyIdentifier = function() {
	csafe_asn1_ASN1Primitive.call(this,csafe_x509_ext_SubjectKeyIdentifier.struct);
};
csafe_x509_ext_SubjectKeyIdentifier.__name__ = ["csafe","x509","ext","SubjectKeyIdentifier"];
csafe_x509_ext_SubjectKeyIdentifier.__super__ = csafe_asn1_ASN1Primitive;
csafe_x509_ext_SubjectKeyIdentifier.prototype = $extend(csafe_asn1_ASN1Primitive.prototype,{
	toString: function() {
		return this.asByteArray().toHex();
	}
	,__class__: csafe_x509_ext_SubjectKeyIdentifier
});
var haxe_Log = function() { };
haxe_Log.__name__ = ["haxe","Log"];
haxe_Log.trace = function(v,infos) {
	js_Boot.__trace(v,infos);
};
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe_Timer.__name__ = ["haxe","Timer"];
haxe_Timer.delay = function(f,time_ms) {
	var t = new haxe_Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe_Timer.prototype = {
	stop: function() {
		if(this.id == null) {
			return;
		}
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe_Timer
};
var haxe_crypto_Base64 = function() { };
haxe_crypto_Base64.__name__ = ["haxe","crypto","Base64"];
haxe_crypto_Base64.encode = function(bytes,complement) {
	if(complement == null) {
		complement = true;
	}
	var str = new haxe_crypto_BaseCode(haxe_crypto_Base64.BYTES).encodeBytes(bytes).toString();
	if(complement) {
		var _g = bytes.length % 3;
		switch(_g) {
		case 1:
			str += "==";
			break;
		case 2:
			str += "=";
			break;
		default:
		}
	}
	return str;
};
haxe_crypto_Base64.decode = function(str,complement) {
	if(complement == null) {
		complement = true;
	}
	if(complement) {
		while(HxOverrides.cca(str,str.length - 1) == 61) str = HxOverrides.substr(str,0,-1);
	}
	return new haxe_crypto_BaseCode(haxe_crypto_Base64.BYTES).decodeBytes(haxe_io_Bytes.ofString(str));
};
var haxe_crypto_BaseCode = function(base) {
	var len = base.length;
	var nbits = 1;
	while(len > 1 << nbits) ++nbits;
	if(nbits > 8 || len != 1 << nbits) {
		throw new js__$Boot_HaxeError("BaseCode : base length must be a power of two.");
	}
	this.base = base;
	this.nbits = nbits;
};
haxe_crypto_BaseCode.__name__ = ["haxe","crypto","BaseCode"];
haxe_crypto_BaseCode.prototype = {
	encodeBytes: function(b) {
		var nbits = this.nbits;
		var base = this.base;
		var size = b.length * 8 / nbits | 0;
		var out = new haxe_io_Bytes(new ArrayBuffer(size + (b.length * 8 % nbits == 0 ? 0 : 1)));
		var buf = 0;
		var curbits = 0;
		var mask = (1 << nbits) - 1;
		var pin = 0;
		var pout = 0;
		while(pout < size) {
			while(curbits < nbits) {
				curbits += 8;
				buf <<= 8;
				buf |= b.b[pin++];
			}
			curbits -= nbits;
			out.b[pout++] = base.b[buf >> curbits & mask] & 255;
		}
		if(curbits > 0) {
			out.b[pout++] = base.b[buf << nbits - curbits & mask] & 255;
		}
		return out;
	}
	,initTable: function() {
		var tbl = [];
		var _g = 0;
		while(_g < 256) {
			var i = _g++;
			tbl[i] = -1;
		}
		var _g1 = 0;
		var _g2 = this.base.length;
		while(_g1 < _g2) {
			var i1 = _g1++;
			tbl[this.base.b[i1]] = i1;
		}
		this.tbl = tbl;
	}
	,decodeBytes: function(b) {
		var nbits = this.nbits;
		var base = this.base;
		if(this.tbl == null) {
			this.initTable();
		}
		var tbl = this.tbl;
		var size = b.length * nbits >> 3;
		var out = new haxe_io_Bytes(new ArrayBuffer(size));
		var buf = 0;
		var curbits = 0;
		var pin = 0;
		var pout = 0;
		while(pout < size) {
			while(curbits < 8) {
				curbits += nbits;
				buf <<= nbits;
				var i = tbl[b.b[pin++]];
				if(i == -1) {
					throw new js__$Boot_HaxeError("BaseCode : invalid encoded char");
				}
				buf |= i;
			}
			curbits -= 8;
			out.b[pout++] = buf >> curbits & 255 & 255;
		}
		return out;
	}
	,__class__: haxe_crypto_BaseCode
};
var haxe_crypto_Sha1 = function() {
};
haxe_crypto_Sha1.__name__ = ["haxe","crypto","Sha1"];
haxe_crypto_Sha1.make = function(b) {
	var h = new haxe_crypto_Sha1().doEncode(haxe_crypto_Sha1.bytes2blks(b));
	var out = new haxe_io_Bytes(new ArrayBuffer(20));
	var p = 0;
	var _g = 0;
	while(_g < 5) {
		var i = _g++;
		out.b[p++] = h[i] >>> 24 & 255;
		out.b[p++] = h[i] >> 16 & 255 & 255;
		out.b[p++] = h[i] >> 8 & 255 & 255;
		out.b[p++] = h[i] & 255 & 255;
	}
	return out;
};
haxe_crypto_Sha1.bytes2blks = function(b) {
	var nblk = (b.length + 8 >> 6) + 1;
	var blks = [];
	var _g1 = 0;
	var _g = nblk * 16;
	while(_g1 < _g) {
		var i = _g1++;
		blks[i] = 0;
	}
	var _g11 = 0;
	var _g2 = b.length;
	while(_g11 < _g2) {
		var i1 = _g11++;
		var p = i1 >> 2;
		blks[p] |= b.b[i1] << 24 - ((i1 & 3) << 3);
	}
	var i2 = b.length;
	var p1 = i2 >> 2;
	blks[p1] |= 128 << 24 - ((i2 & 3) << 3);
	blks[nblk * 16 - 1] = b.length * 8;
	return blks;
};
haxe_crypto_Sha1.prototype = {
	doEncode: function(x) {
		var w = [];
		var a = 1732584193;
		var b = -271733879;
		var c = -1732584194;
		var d = 271733878;
		var e = -1009589776;
		var i = 0;
		while(i < x.length) {
			var olda = a;
			var oldb = b;
			var oldc = c;
			var oldd = d;
			var olde = e;
			var j = 0;
			while(j < 80) {
				if(j < 16) {
					w[j] = x[i + j];
				} else {
					var num = w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16];
					w[j] = num << 1 | num >>> 31;
				}
				var t = (a << 5 | a >>> 27) + this.ft(j,b,c,d) + e + w[j] + this.kt(j);
				e = d;
				d = c;
				c = b << 30 | b >>> 2;
				b = a;
				a = t;
				++j;
			}
			a += olda;
			b += oldb;
			c += oldc;
			d += oldd;
			e += olde;
			i += 16;
		}
		return [a,b,c,d,e];
	}
	,ft: function(t,b,c,d) {
		if(t < 20) {
			return b & c | ~b & d;
		}
		if(t < 40) {
			return b ^ c ^ d;
		}
		if(t < 60) {
			return b & c | b & d | c & d;
		}
		return b ^ c ^ d;
	}
	,kt: function(t) {
		if(t < 20) {
			return 1518500249;
		}
		if(t < 40) {
			return 1859775393;
		}
		if(t < 60) {
			return -1894007588;
		}
		return -899497514;
	}
	,__class__: haxe_crypto_Sha1
};
var haxe_crypto_Sha256 = function() {
};
haxe_crypto_Sha256.__name__ = ["haxe","crypto","Sha256"];
haxe_crypto_Sha256.make = function(b) {
	var h = new haxe_crypto_Sha256().doEncode(haxe_crypto_Sha256.bytes2blks(b),b.length * 8);
	var out = new haxe_io_Bytes(new ArrayBuffer(32));
	var p = 0;
	var _g = 0;
	while(_g < 8) {
		var i = _g++;
		out.b[p++] = h[i] >>> 24 & 255;
		out.b[p++] = h[i] >> 16 & 255 & 255;
		out.b[p++] = h[i] >> 8 & 255 & 255;
		out.b[p++] = h[i] & 255 & 255;
	}
	return out;
};
haxe_crypto_Sha256.bytes2blks = function(b) {
	var nblk = (b.length + 8 >> 6) + 1;
	var blks = [];
	var _g1 = 0;
	var _g = nblk * 16;
	while(_g1 < _g) {
		var i = _g1++;
		blks[i] = 0;
	}
	var _g11 = 0;
	var _g2 = b.length;
	while(_g11 < _g2) {
		var i1 = _g11++;
		var p = i1 >> 2;
		blks[p] |= b.b[i1] << 24 - ((i1 & 3) << 3);
	}
	var i2 = b.length;
	var p1 = i2 >> 2;
	blks[p1] |= 128 << 24 - ((i2 & 3) << 3);
	blks[nblk * 16 - 1] = b.length * 8;
	return blks;
};
haxe_crypto_Sha256.prototype = {
	doEncode: function(m,l) {
		var K = [1116352408,1899447441,-1245643825,-373957723,961987163,1508970993,-1841331548,-1424204075,-670586216,310598401,607225278,1426881987,1925078388,-2132889090,-1680079193,-1046744716,-459576895,-272742522,264347078,604807628,770255983,1249150122,1555081692,1996064986,-1740746414,-1473132947,-1341970488,-1084653625,-958395405,-710438585,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,-2117940946,-1838011259,-1564481375,-1474664885,-1035236496,-949202525,-778901479,-694614492,-200395387,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,-2067236844,-1933114872,-1866530822,-1538233109,-1090935817,-965641998];
		var HASH = [1779033703,-1150833019,1013904242,-1521486534,1359893119,-1694144372,528734635,1541459225];
		var W = [];
		W[64] = 0;
		var a;
		var b;
		var c;
		var d;
		var e;
		var f;
		var g;
		var h;
		var T1;
		var T2;
		m[l >> 5] |= 128 << 24 - l % 32;
		m[(l + 64 >> 9 << 4) + 15] = l;
		var i = 0;
		while(i < m.length) {
			a = HASH[0];
			b = HASH[1];
			c = HASH[2];
			d = HASH[3];
			e = HASH[4];
			f = HASH[5];
			g = HASH[6];
			h = HASH[7];
			var _g = 0;
			while(_g < 64) {
				var j = _g++;
				if(j < 16) {
					W[j] = m[j + i];
				} else {
					W[j] = this.safeAdd(this.safeAdd(this.safeAdd(this.Gamma1256(W[j - 2]),W[j - 7]),this.Gamma0256(W[j - 15])),W[j - 16]);
				}
				T1 = this.safeAdd(this.safeAdd(this.safeAdd(this.safeAdd(h,this.Sigma1256(e)),this.Ch(e,f,g)),K[j]),W[j]);
				T2 = this.safeAdd(this.Sigma0256(a),this.Maj(a,b,c));
				h = g;
				g = f;
				f = e;
				e = this.safeAdd(d,T1);
				d = c;
				c = b;
				b = a;
				a = this.safeAdd(T1,T2);
			}
			HASH[0] = this.safeAdd(a,HASH[0]);
			HASH[1] = this.safeAdd(b,HASH[1]);
			HASH[2] = this.safeAdd(c,HASH[2]);
			HASH[3] = this.safeAdd(d,HASH[3]);
			HASH[4] = this.safeAdd(e,HASH[4]);
			HASH[5] = this.safeAdd(f,HASH[5]);
			HASH[6] = this.safeAdd(g,HASH[6]);
			HASH[7] = this.safeAdd(h,HASH[7]);
			i += 16;
		}
		return HASH;
	}
	,S: function(X,n) {
		return X >>> n | X << 32 - n;
	}
	,R: function(X,n) {
		return X >>> n;
	}
	,Ch: function(x,y,z) {
		return x & y ^ ~x & z;
	}
	,Maj: function(x,y,z) {
		return x & y ^ x & z ^ y & z;
	}
	,Sigma0256: function(x) {
		return this.S(x,2) ^ this.S(x,13) ^ this.S(x,22);
	}
	,Sigma1256: function(x) {
		return this.S(x,6) ^ this.S(x,11) ^ this.S(x,25);
	}
	,Gamma0256: function(x) {
		return this.S(x,7) ^ this.S(x,18) ^ this.R(x,3);
	}
	,Gamma1256: function(x) {
		return this.S(x,17) ^ this.S(x,19) ^ this.R(x,10);
	}
	,safeAdd: function(x,y) {
		var lsw = (x & 65535) + (y & 65535);
		var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
		return msw << 16 | lsw & 65535;
	}
	,__class__: haxe_crypto_Sha256
};
var haxe_io_BytesBuffer = function() {
	this.b = [];
};
haxe_io_BytesBuffer.__name__ = ["haxe","io","BytesBuffer"];
haxe_io_BytesBuffer.prototype = {
	addInt32: function(v) {
		this.b.push(v & 255);
		this.b.push(v >> 8 & 255);
		this.b.push(v >> 16 & 255);
		this.b.push(v >>> 24);
	}
	,getBytes: function() {
		var bytes = new haxe_io_Bytes(new Uint8Array(this.b).buffer);
		this.b = null;
		return bytes;
	}
	,__class__: haxe_io_BytesBuffer
};
var haxe_io_Output = function() { };
haxe_io_Output.__name__ = ["haxe","io","Output"];
haxe_io_Output.prototype = {
	writeByte: function(c) {
		throw new js__$Boot_HaxeError("Not implemented");
	}
	,writeBytes: function(s,pos,len) {
		if(pos < 0 || len < 0 || pos + len > s.length) {
			throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
		}
		var b = s.b;
		var k = len;
		while(k > 0) {
			this.writeByte(b[pos]);
			++pos;
			--k;
		}
		return len;
	}
	,write: function(s) {
		var l = s.length;
		var p = 0;
		while(l > 0) {
			var k = this.writeBytes(s,p,l);
			if(k == 0) {
				throw new js__$Boot_HaxeError(haxe_io_Error.Blocked);
			}
			p += k;
			l -= k;
		}
	}
	,writeInt8: function(x) {
		if(x < -128 || x >= 128) {
			throw new js__$Boot_HaxeError(haxe_io_Error.Overflow);
		}
		this.writeByte(x & 255);
	}
	,__class__: haxe_io_Output
};
var haxe_io_BytesOutput = function() {
	this.b = new haxe_io_BytesBuffer();
};
haxe_io_BytesOutput.__name__ = ["haxe","io","BytesOutput"];
haxe_io_BytesOutput.__super__ = haxe_io_Output;
haxe_io_BytesOutput.prototype = $extend(haxe_io_Output.prototype,{
	writeByte: function(c) {
		this.b.b.push(c);
	}
	,writeBytes: function(buf,pos,len) {
		var _this = this.b;
		if(pos < 0 || len < 0 || pos + len > buf.length) {
			throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
		}
		var b1 = _this.b;
		var b2 = buf.b;
		var _g1 = pos;
		var _g = pos + len;
		while(_g1 < _g) {
			var i = _g1++;
			_this.b.push(b2[i]);
		}
		return len;
	}
	,getBytes: function() {
		return this.b.getBytes();
	}
	,__class__: haxe_io_BytesOutput
});
var haxe_io_Eof = function() {
};
haxe_io_Eof.__name__ = ["haxe","io","Eof"];
haxe_io_Eof.prototype = {
	toString: function() {
		return "Eof";
	}
	,__class__: haxe_io_Eof
};
var haxe_io_Error = { __ename__ : true, __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] };
haxe_io_Error.Blocked = ["Blocked",0];
haxe_io_Error.Blocked.toString = $estr;
haxe_io_Error.Blocked.__enum__ = haxe_io_Error;
haxe_io_Error.Overflow = ["Overflow",1];
haxe_io_Error.Overflow.toString = $estr;
haxe_io_Error.Overflow.__enum__ = haxe_io_Error;
haxe_io_Error.OutsideBounds = ["OutsideBounds",2];
haxe_io_Error.OutsideBounds.toString = $estr;
haxe_io_Error.OutsideBounds.__enum__ = haxe_io_Error;
haxe_io_Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe_io_Error; $x.toString = $estr; return $x; };
var haxe_io_FPHelper = function() { };
haxe_io_FPHelper.__name__ = ["haxe","io","FPHelper"];
haxe_io_FPHelper.i32ToFloat = function(i) {
	var sign = 1 - (i >>> 31 << 1);
	var exp = i >>> 23 & 255;
	var sig = i & 8388607;
	if(sig == 0 && exp == 0) {
		return 0.0;
	}
	return sign * (1 + Math.pow(2,-23) * sig) * Math.pow(2,exp - 127);
};
haxe_io_FPHelper.floatToI32 = function(f) {
	if(f == 0) {
		return 0;
	}
	var af = f < 0 ? -f : f;
	var exp = Math.floor(Math.log(af) / 0.6931471805599453);
	if(exp < -127) {
		exp = -127;
	} else if(exp > 128) {
		exp = 128;
	}
	var sig = Math.round((af / Math.pow(2,exp) - 1) * 8388608);
	if(sig == 8388608 && exp < 128) {
		sig = 0;
		++exp;
	}
	return (f < 0 ? -2147483648 : 0) | exp + 127 << 23 | sig;
};
haxe_io_FPHelper.i64ToDouble = function(low,high) {
	var sign = 1 - (high >>> 31 << 1);
	var exp = (high >> 20 & 2047) - 1023;
	var sig = (high & 1048575) * 4294967296. + (low >>> 31) * 2147483648. + (low & 2147483647);
	if(sig == 0 && exp == -1023) {
		return 0.0;
	}
	return sign * (1.0 + Math.pow(2,-52) * sig) * Math.pow(2,exp);
};
haxe_io_FPHelper.doubleToI64 = function(v) {
	var i64 = haxe_io_FPHelper.i64tmp;
	if(v == 0) {
		i64.low = 0;
		i64.high = 0;
	} else if(!isFinite(v)) {
		if(v > 0) {
			i64.low = 0;
			i64.high = 2146435072;
		} else {
			i64.low = 0;
			i64.high = -1048576;
		}
	} else {
		var av = v < 0 ? -v : v;
		var exp = Math.floor(Math.log(av) / 0.6931471805599453);
		var sig = Math.round((av / Math.pow(2,exp) - 1) * 4503599627370496.);
		var sig_l = sig | 0;
		var sig_h = sig / 4294967296.0 | 0;
		i64.low = sig_l;
		i64.high = (v < 0 ? -2147483648 : 0) | exp + 1023 << 20 | sig_h;
	}
	return i64;
};
var js_Boot = function() { };
js_Boot.__name__ = ["js","Boot"];
js_Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
js_Boot.__trace = function(v,i) {
	var msg = i != null ? i.fileName + ":" + i.lineNumber + ": " : "";
	msg += js_Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0;
		var _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js_Boot.__string_rec(v1,"");
		}
	}
	var d;
	var tmp;
	if(typeof(document) != "undefined") {
		d = document.getElementById("haxe:trace");
		tmp = d != null;
	} else {
		tmp = false;
	}
	if(tmp) {
		d.innerHTML += js_Boot.__unhtml(msg) + "<br/>";
	} else if(typeof console != "undefined" && console.log != null) {
		console.log(msg);
	}
};
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) {
		return Array;
	} else {
		var cl = o.__class__;
		if(cl != null) {
			return cl;
		}
		var name = js_Boot.__nativeClassName(o);
		if(name != null) {
			return js_Boot.__resolveNativeClass(name);
		}
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) {
					return o[0];
				}
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) {
						str += "," + js_Boot.__string_rec(o[i],s);
					} else {
						str += js_Boot.__string_rec(o[i],s);
					}
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g11 = 0;
			var _g2 = l;
			while(_g11 < _g2) {
				var i2 = _g11++;
				str1 += (i2 > 0 ? "," : "") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) {
			str2 += ", \n";
		}
		str2 += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) {
		return false;
	}
	if(cc == cl) {
		return true;
	}
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) {
				return true;
			}
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) {
		return false;
	}
	switch(cl) {
	case Array:
		if((o instanceof Array)) {
			return o.__enum__ == null;
		} else {
			return false;
		}
		break;
	case Bool:
		return typeof(o) == "boolean";
	case Dynamic:
		return true;
	case Float:
		return typeof(o) == "number";
	case Int:
		if(typeof(o) == "number") {
			return (o|0) === o;
		} else {
			return false;
		}
		break;
	case String:
		return typeof(o) == "string";
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) {
					return true;
				}
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) {
					return true;
				}
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) {
					return true;
				}
			}
		} else {
			return false;
		}
		if(cl == Class ? o.__name__ != null : false) {
			return true;
		}
		if(cl == Enum ? o.__ename__ != null : false) {
			return true;
		}
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) {
		return o;
	} else {
		throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
	}
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") {
		return null;
	}
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var js_Browser = function() { };
js_Browser.__name__ = ["js","Browser"];
js_Browser.getLocalStorage = function() {
	try {
		var s = window.localStorage;
		s.getItem("");
		return s;
	} catch( e ) {
		return null;
	}
};
js_Browser.getSessionStorage = function() {
	try {
		var s = window.sessionStorage;
		s.getItem("");
		return s;
	} catch( e ) {
		return null;
	}
};
js_Browser.alert = function(v) {
	window.alert(js_Boot.__string_rec(v,""));
};
var js_html_compat_ArrayBuffer = function(a) {
	if((a instanceof Array) && a.__enum__ == null) {
		this.a = a;
		this.byteLength = a.length;
	} else {
		var len = a;
		this.a = [];
		var _g1 = 0;
		var _g = len;
		while(_g1 < _g) {
			var i = _g1++;
			this.a[i] = 0;
		}
		this.byteLength = len;
	}
};
js_html_compat_ArrayBuffer.__name__ = ["js","html","compat","ArrayBuffer"];
js_html_compat_ArrayBuffer.sliceImpl = function(begin,end) {
	var u = new Uint8Array(this,begin,end == null ? null : end - begin);
	var result = new ArrayBuffer(u.byteLength);
	var resultArray = new Uint8Array(result);
	resultArray.set(u);
	return result;
};
js_html_compat_ArrayBuffer.prototype = {
	slice: function(begin,end) {
		return new js_html_compat_ArrayBuffer(this.a.slice(begin,end));
	}
	,__class__: js_html_compat_ArrayBuffer
};
var js_html_compat_DataView = function(buffer,byteOffset,byteLength) {
	this.buf = buffer;
	this.offset = byteOffset == null ? 0 : byteOffset;
	this.length = byteLength == null ? buffer.byteLength - this.offset : byteLength;
	if(this.offset < 0 || this.length < 0 || this.offset + this.length > buffer.byteLength) {
		throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
	}
	this.byteLength = this.length;
	this.byteOffset = this.offset;
	this.buffer = this.buf;
};
js_html_compat_DataView.__name__ = ["js","html","compat","DataView"];
js_html_compat_DataView.prototype = {
	getInt8: function(byteOffset) {
		var v = this.buf.a[this.offset + byteOffset];
		if(v >= 128) {
			return v - 256;
		} else {
			return v;
		}
	}
	,getUint8: function(byteOffset) {
		return this.buf.a[this.offset + byteOffset];
	}
	,getInt16: function(byteOffset,littleEndian) {
		var v = this.getUint16(byteOffset,littleEndian);
		if(v >= 32768) {
			return v - 65536;
		} else {
			return v;
		}
	}
	,getUint16: function(byteOffset,littleEndian) {
		if(littleEndian) {
			return this.buf.a[this.offset + byteOffset] | this.buf.a[this.offset + byteOffset + 1] << 8;
		} else {
			return this.buf.a[this.offset + byteOffset] << 8 | this.buf.a[this.offset + byteOffset + 1];
		}
	}
	,getInt32: function(byteOffset,littleEndian) {
		var p = this.offset + byteOffset;
		var a = this.buf.a[p++];
		var b = this.buf.a[p++];
		var c = this.buf.a[p++];
		var d = this.buf.a[p++];
		if(littleEndian) {
			return a | b << 8 | c << 16 | d << 24;
		} else {
			return d | c << 8 | b << 16 | a << 24;
		}
	}
	,getUint32: function(byteOffset,littleEndian) {
		var v = this.getInt32(byteOffset,littleEndian);
		if(v < 0) {
			return v + 4294967296.;
		} else {
			return v;
		}
	}
	,getFloat32: function(byteOffset,littleEndian) {
		return haxe_io_FPHelper.i32ToFloat(this.getInt32(byteOffset,littleEndian));
	}
	,getFloat64: function(byteOffset,littleEndian) {
		var a = this.getInt32(byteOffset,littleEndian);
		var b = this.getInt32(byteOffset + 4,littleEndian);
		return haxe_io_FPHelper.i64ToDouble(littleEndian ? a : b,littleEndian ? b : a);
	}
	,setInt8: function(byteOffset,value) {
		this.buf.a[byteOffset + this.offset] = value < 0 ? value + 128 & 255 : value & 255;
	}
	,setUint8: function(byteOffset,value) {
		this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setInt16: function(byteOffset,value,littleEndian) {
		this.setUint16(byteOffset,value < 0 ? value + 65536 : value,littleEndian);
	}
	,setUint16: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
		} else {
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p] = value & 255;
		}
	}
	,setInt32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,value,littleEndian);
	}
	,setUint32: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p++] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >>> 24;
		} else {
			this.buf.a[p++] = value >>> 24;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value & 255;
		}
	}
	,setFloat32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,haxe_io_FPHelper.floatToI32(value),littleEndian);
	}
	,setFloat64: function(byteOffset,value,littleEndian) {
		var i64 = haxe_io_FPHelper.doubleToI64(value);
		if(littleEndian) {
			this.setUint32(byteOffset,i64.low);
			this.setUint32(byteOffset,i64.high);
		} else {
			this.setUint32(byteOffset,i64.high);
			this.setUint32(byteOffset,i64.low);
		}
	}
	,__class__: js_html_compat_DataView
};
var js_html_compat_Uint8Array = function() { };
js_html_compat_Uint8Array.__name__ = ["js","html","compat","Uint8Array"];
js_html_compat_Uint8Array._new = function(arg1,offset,length) {
	var arr;
	if(typeof(arg1) == "number") {
		arr = [];
		var _g1 = 0;
		var _g = arg1;
		while(_g1 < _g) {
			var i = _g1++;
			arr[i] = 0;
		}
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else if(js_Boot.__instanceof(arg1,js_html_compat_ArrayBuffer)) {
		var buffer = arg1;
		if(offset == null) {
			offset = 0;
		}
		if(length == null) {
			length = buffer.byteLength - offset;
		}
		if(offset == 0) {
			arr = buffer.a;
		} else {
			arr = buffer.a.slice(offset,offset + length);
		}
		arr.byteLength = arr.length;
		arr.byteOffset = offset;
		arr.buffer = buffer;
	} else if((arg1 instanceof Array) && arg1.__enum__ == null) {
		arr = arg1.slice();
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else {
		throw new js__$Boot_HaxeError("TODO " + Std.string(arg1));
	}
	arr.subarray = js_html_compat_Uint8Array._subarray;
	arr.set = js_html_compat_Uint8Array._set;
	return arr;
};
js_html_compat_Uint8Array._set = function(arg,offset) {
	if(js_Boot.__instanceof(arg.buffer,js_html_compat_ArrayBuffer)) {
		var a = arg;
		if(arg.byteLength + offset > this.byteLength) {
			throw new js__$Boot_HaxeError("set() outside of range");
		}
		var _g1 = 0;
		var _g = arg.byteLength;
		while(_g1 < _g) {
			var i = _g1++;
			this[i + offset] = a[i];
		}
	} else if((arg instanceof Array) && arg.__enum__ == null) {
		var a1 = arg;
		if(a1.length + offset > this.byteLength) {
			throw new js__$Boot_HaxeError("set() outside of range");
		}
		var _g11 = 0;
		var _g2 = a1.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			this[i1 + offset] = a1[i1];
		}
	} else {
		throw new js__$Boot_HaxeError("TODO");
	}
};
js_html_compat_Uint8Array._subarray = function(start,end) {
	var a = js_html_compat_Uint8Array._new(this.slice(start,end));
	a.byteOffset = start;
	return a;
};
var util_BytesUtil = function() { };
util_BytesUtil.__name__ = ["util","BytesUtil"];
util_BytesUtil.concat = function(bytesArr) {
	var bb = new haxe_io_BytesBuffer();
	var _g = 0;
	while(_g < bytesArr.length) {
		var b = bytesArr[_g];
		++_g;
		var b1 = bb.b;
		var b2 = b.b;
		var _g1 = 0;
		var _g2 = b.length;
		while(_g1 < _g2) {
			var i = _g1++;
			bb.b.push(b2[i]);
		}
	}
	return bb.getBytes();
};
util_BytesUtil.zerorize = function(b) {
	var _g1 = 0;
	var _g = b.length;
	while(_g1 < _g) {
		var i = _g1++;
		b.b[i] = 0;
	}
};
util_BytesUtil.bytesToIntArray = function(b) {
	var a = [];
	var _g1 = 0;
	var _g = b.length;
	while(_g1 < _g) {
		var i = _g1++;
		a[i] = b.b[i];
	}
	return a;
};
util_BytesUtil.reverse = function(b) {
	var _g1 = 0;
	var _g = b.length / 2 | 0;
	while(_g1 < _g) {
		var i = _g1++;
		var rPos = b.length - 1 - i;
		var temp = b.b[i];
		b.b[i] = b.b[rPos] & 255;
		b.b[rPos] = temp & 255;
	}
};
util_BytesUtil.equals = function(a,b) {
	if(a.length != b.length) {
		return false;
	}
	var _g1 = 0;
	var _g = a.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(a.b[i] != b.b[i]) {
			return false;
		}
	}
	return true;
};
util_BytesUtil.clone = function(a) {
	var b = new haxe_io_Bytes(new ArrayBuffer(a.length));
	var _g1 = 0;
	var _g = a.length;
	while(_g1 < _g) {
		var i = _g1++;
		b.b[i] = a.b[i] & 255;
	}
	return b;
};
util_BytesUtil.byteArrayToBytes = function(a,padToBytes) {
	var sb = new haxe_io_BytesBuffer();
	var _g = 0;
	while(_g < a.length) {
		var i = a[_g];
		++_g;
		if(i > 255 || i < 0) {
			throw new js__$Boot_HaxeError("Value out of range");
		}
		sb.b.push(i);
	}
	if(padToBytes != null && padToBytes > 0) {
		return util_BytesUtil.nullPad(sb.getBytes(),padToBytes);
	}
	return sb.getBytes();
};
util_BytesUtil.byteToHex = function(b) {
	b &= 255;
	return StringTools.hex(b,2).toLowerCase();
};
util_BytesUtil.byte32ToHex = function(b) {
	return StringTools.hex(b,2).toLowerCase();
};
util_BytesUtil.bytesToInt32LE = function(s) {
	return [(s.b[3] & 255) << 24,(s.b[2] & 255) << 16,(s.b[1] & 255) << 8,s.b[0] & 255];
};
util_BytesUtil.cleanHexFormat = function(hex) {
	var e = StringTools.replace(hex,":","");
	e = e.split("|").join("");
	var ereg_r = new RegExp("([\\s]*)","g".split("u").join(""));
	e = e.replace(ereg_r,"");
	if(StringTools.startsWith(e,"0x")) {
		e = HxOverrides.substr(e,2,null);
	}
	if((e.length & 1) == 1) {
		e = "0" + e;
	}
	return e.toLowerCase();
};
util_BytesUtil.encodeToBase = function(buf,base) {
	var bc = new haxe_crypto_BaseCode(haxe_io_Bytes.ofString(base));
	return bc.encodeBytes(buf);
};
util_BytesUtil.eq = function(a,b) {
	if(a.length != b.length) {
		return false;
	}
	var l = a.length;
	var _g1 = 0;
	var _g = l;
	while(_g1 < _g) {
		var i = _g1++;
		if(a.b[i] != b.b[i]) {
			return false;
		}
	}
	return true;
};
util_BytesUtil.hexDump = function(b,separator) {
	return util_BytesUtil.toHex(b,separator);
};
util_BytesUtil.int32ToBytesLE = function(l) {
	var sb = new haxe_io_BytesBuffer();
	var _g1 = 0;
	var _g = l.length;
	while(_g1 < _g) {
		var i = _g1++;
		sb.b.push(l[i] & 255);
		sb.b.push(l[i] >> 8 & 255);
		sb.b.push(l[i] >> 16 & 255);
		sb.b.push(l[i] >> 24 & 255);
	}
	return sb.getBytes();
};
util_BytesUtil.int32ArrayToBytes = function(a,padToBytes) {
	var sb = new haxe_io_BytesBuffer();
	var _g = 0;
	while(_g < a.length) {
		var v = a[_g];
		++_g;
		var i = v;
		if(i > 255 || i < 0) {
			throw new js__$Boot_HaxeError("Value out of range");
		}
		sb.b.push(i);
	}
	if(padToBytes != null && padToBytes > 0) {
		return util_BytesUtil.nullPad(sb.getBytes(),padToBytes);
	}
	return sb.getBytes();
};
util_BytesUtil.intArrayToBytes = function(a,padToBytes) {
	var sb = new haxe_io_BytesBuffer();
	var _g = 0;
	while(_g < a.length) {
		var i = a[_g];
		++_g;
		if(i > 255 || i < 0) {
			throw new js__$Boot_HaxeError("Value out of range");
		}
		sb.b.push(i);
	}
	if(padToBytes != null && padToBytes > 0) {
		return util_BytesUtil.nullPad(sb.getBytes(),padToBytes);
	}
	return sb.getBytes();
};
util_BytesUtil.nullBytes = function(len) {
	var sb = new haxe_io_Bytes(new ArrayBuffer(len));
	var _g1 = 0;
	var _g = len;
	while(_g1 < _g) {
		var i = _g1++;
		sb.b[i] = 0;
	}
	return sb;
};
util_BytesUtil.nullPad = function(s,chunkLen) {
	var r = chunkLen - s.length % chunkLen;
	if(r == chunkLen) {
		return s;
	}
	var sb = new haxe_io_BytesBuffer();
	var b1 = sb.b;
	var b2 = s.b;
	var _g1 = 0;
	var _g = s.length;
	while(_g1 < _g) {
		var i = _g1++;
		sb.b.push(b2[i]);
	}
	var _g11 = 0;
	var _g2 = r;
	while(_g11 < _g2) {
		var x = _g11++;
		sb.b.push(0);
	}
	return sb.getBytes();
};
util_BytesUtil.leftPad = function(s,chunkLen,b) {
	var r = chunkLen - s.length % chunkLen;
	if(s.length != 0 && r == chunkLen) {
		return s;
	}
	var sb = new haxe_io_BytesBuffer();
	var _g1 = 0;
	var _g = r;
	while(_g1 < _g) {
		var x = _g1++;
		sb.b.push(b);
	}
	var b1 = sb.b;
	var b2 = s.b;
	var _g11 = 0;
	var _g2 = s.length;
	while(_g11 < _g2) {
		var i = _g11++;
		sb.b.push(b2[i]);
	}
	return sb.getBytes();
};
util_BytesUtil.ofIntArray = function(a) {
	var b = new haxe_io_BytesBuffer();
	var _g1 = 0;
	var _g = a.length;
	while(_g1 < _g) {
		var i = _g1++;
		var $byte = util_BytesUtil.cleanValue(a[i]);
		b.b.push($byte);
	}
	return b.getBytes();
};
util_BytesUtil.ofHex = function(hs) {
	var s = util_BytesUtil.cleanHexFormat(hs);
	var b = new haxe_io_BytesBuffer();
	var l = s.length / 2 | 0;
	var _g1 = 0;
	var _g = l;
	while(_g1 < _g) {
		var x = _g1++;
		var ch = HxOverrides.substr(s,x * 2,2);
		var v = Std.parseInt("0x" + ch);
		if(v > 255) {
			throw new js__$Boot_HaxeError("error");
		}
		b.b.push(v);
	}
	return b.getBytes();
};
util_BytesUtil.toHex = function(b,separator) {
	if(separator == null) {
		separator = " ";
	}
	var sb_b = "";
	var l = b.length;
	var first = true;
	var _g1 = 0;
	var _g = l;
	while(_g1 < _g) {
		var i = _g1++;
		if(first) {
			first = false;
		} else {
			sb_b += Std.string(separator);
		}
		sb_b += Std.string(StringTools.hex(b.b[i],2).toLowerCase());
	}
	return StringTools.rtrim(sb_b);
};
util_BytesUtil.unNullPad = function(s) {
	var p = s.length - 1;
	while(p-- > 0) if(s.b[p] != 0) {
		break;
	}
	if(p == 0 && s.b[0] == 0) {
		var bb = new haxe_io_BytesBuffer();
		return bb.getBytes();
	}
	++p;
	var b = new haxe_io_Bytes(new ArrayBuffer(p));
	b.blit(0,s,0,p);
	return b;
};
util_BytesUtil.cleanValue = function(v) {
	var neg = false;
	if(v < 0) {
		if(v < -128) {
			throw new js__$Boot_HaxeError("not a byte");
		}
		neg = true;
		v = v & 255 | 128;
	}
	if(v > 255) {
		throw new js__$Boot_HaxeError("not a byte");
	}
	return v;
};
var util_Constants = function() { };
util_Constants.__name__ = ["util","Constants"];
var util_ConvUtil = function() { };
util_ConvUtil.__name__ = ["util","ConvUtil"];
util_ConvUtil.intToBytes = function(i,data,offset) {
	if(offset == null) {
		offset = 0;
	}
	if(data == null) {
		data = new haxe_io_Bytes(new ArrayBuffer(4));
		offset = 0;
	}
	data.b[offset] = i >>> 24 & 255;
	data.b[offset + 1] = i >>> 16 & 255 & 255;
	data.b[offset + 2] = i >>> 8 & 255 & 255;
	data.b[offset + 3] = i & 255 & 255;
	return data;
};
util_ConvUtil.bytesToInt = function(data,offset) {
	if(offset == null) {
		offset = 0;
	}
	var rInt = 0;
	rInt = data.b[offset] << 24 & -16777216;
	rInt |= data.b[offset + 1] << 16 & 16711680;
	rInt |= data.b[offset + 2] << 8 & 65280;
	rInt |= data.b[offset + 3] & 255;
	return rInt;
};
util_ConvUtil.intToTBytes = function(i,data,offset) {
	if(offset == null) {
		offset = 0;
	}
	if(data == null) {
		data = new haxe_io_Bytes(new ArrayBuffer(2));
		offset = 0;
	}
	data.b[offset] = i >>> 8 & 255 & 255;
	data.b[offset + 1] = i & 255 & 255;
	return data;
};
util_ConvUtil.tbytesToInt = function(data,offset) {
	if(offset == null) {
		offset = 0;
	}
	var rInt = 0;
	rInt |= data.b[offset] << 8 & 65280;
	rInt |= data.b[offset + 1] & 255;
	return rInt;
};
var util_CryptUtil = function() { };
util_CryptUtil.__name__ = ["util","CryptUtil"];
util_CryptUtil.encodeBase64Url = function(s) {
	var b64 = haxe_crypto_Base64.encode(s);
	b64 = b64.split("=")[0];
	b64 = StringTools.replace(b64,"+","-");
	b64 = StringTools.replace(b64,"/","_");
	return b64;
};
util_CryptUtil.decodeBase64Url = function(b64) {
	b64 = StringTools.replace(b64,"-","+");
	b64 = StringTools.replace(b64,"_","/");
	var _g = b64.length % 4;
	switch(_g) {
	case 0:
		break;
	case 2:
		b64 += "==";
		break;
	case 3:
		b64 += "=";
		break;
	default:
		throw new js__$Boot_HaxeError(new Exception("invalid b64"));
	}
	return haxe_crypto_Base64.decode(b64);
};
util_CryptUtil.repeatHash = function(hashMech,data,iterCount) {
	var hashed = data;
	var _g1 = 0;
	var _g = iterCount;
	while(_g1 < _g) {
		var i = _g1++;
		hashed = hashMech.calculate(hashed);
	}
	return hashed;
};
util_CryptUtil.repeatHashAsync = function(alg,data,iterCount,resolved,rejected) {
	var iterHandle = common_ResultHandler.create("CryptUtil.repeatHashAsync").noTrace().ok(function(digested) {
		if(iterCount == 1) {
			resolved(digested);
			return;
		}
		iterCount -= 1;
		alg.digest(digested,iterHandle);
	},{ fileName : "CryptUtil.hx", lineNumber : 44, className : "util.CryptUtil", methodName : "repeatHashAsync"}).err(rejected,{ fileName : "CryptUtil.hx", lineNumber : 44, className : "util.CryptUtil", methodName : "repeatHashAsync"});
	alg.digest(data,iterHandle);
};
util_CryptUtil.parseDNS = function(dns) {
	var ava = [];
	var lastNameIdx = dns.indexOf("=");
	if(lastNameIdx == -1) {
		return ava;
	}
	var lastName = StringTools.trim(dns.substring(0,lastNameIdx));
	var idx = dns.indexOf(",");
	if(idx == -1) {
		ava.push([lastName,StringTools.trim(dns.substring(lastNameIdx + 1))]);
		return ava;
	}
	while(idx < dns.length) {
		if(dns.charAt(idx) == " " || dns.charAt(idx) == ",") {
			++idx;
			continue;
		}
		var fieldIdx = dns.indexOf("=",idx);
		if(fieldIdx == -1) {
			var val = dns.substring(lastNameIdx + 1,dns.length);
			ava.push([lastName,StringTools.trim(val)]);
			break;
		}
		var name = StringTools.trim(dns.substring(idx,fieldIdx));
		var lname = name.toLowerCase();
		if(lname == "cn" || lname == "c" || lname == "l" || lname == "st" || lname == "street" || lname == "o" || lname == "ou" || lname == "t" || lname == "sn" || lname == "dc" || lname == "uid") {
			var val1 = dns.substring(lastNameIdx + 1,dns.lastIndexOf(",",fieldIdx));
			ava.push([lastName,StringTools.trim(val1)]);
			lastName = name;
			lastNameIdx = fieldIdx;
		}
		++idx;
	}
	return ava;
};
util_CryptUtil.parseDNSAsMap = function(dns,forceLowerCase) {
	if(forceLowerCase == null) {
		forceLowerCase = false;
	}
	var ava = { };
	var lastNameIdx = dns.indexOf("=");
	if(lastNameIdx == -1) {
		return ava;
	}
	var lastName = StringTools.trim(dns.substring(0,lastNameIdx));
	var idx = dns.indexOf(",");
	if(idx == -1) {
		if(forceLowerCase) {
			lastName = lastName.toLowerCase();
		}
		ava[lastName] = StringTools.trim(dns.substring(lastNameIdx + 1));
		return ava;
	}
	while(idx < dns.length) {
		if(dns.charAt(idx) == " " || dns.charAt(idx) == ",") {
			++idx;
			continue;
		}
		var fieldIdx = dns.indexOf("=",idx);
		if(fieldIdx == -1) {
			var val = dns.substring(lastNameIdx + 1,dns.length);
			if(forceLowerCase) {
				lastName = lastName.toLowerCase();
			}
			ava[lastName] = StringTools.trim(val);
			break;
		}
		var name = StringTools.trim(dns.substring(idx,fieldIdx));
		var lname = name.toLowerCase();
		if(lname == "cn" || lname == "c" || lname == "l" || lname == "st" || lname == "street" || lname == "o" || lname == "ou" || lname == "t" || lname == "sn" || lname == "dc" || lname == "uid") {
			var val1 = dns.substring(lastNameIdx + 1,dns.lastIndexOf(",",fieldIdx));
			if(forceLowerCase) {
				lastName = lastName.toLowerCase();
			}
			ava[lastName] = StringTools.trim(val1);
			lastName = name;
			lastNameIdx = fieldIdx;
		}
		++idx;
	}
	return ava;
};
util_CryptUtil.equalsDN = function(dn1,dn2) {
	var objToArr = function(dn) {
		if(typeof(dn) == "string") {
			return util_CryptUtil.parseDNS(dn);
		} else if(js_Boot.__instanceof(dn,csafe_asn1_impl_Name)) {
			return (js_Boot.__cast(dn , csafe_asn1_impl_Name)).toArray();
		} else {
			throw new js__$Boot_HaxeError(new Exception("invalid dn object : " + Std.string(dn)));
		}
	};
	var dns1arr = objToArr(dn1);
	var dns2arr = objToArr(dn2);
	haxe_Log.trace("Check DNs1 : " + Std.string(dns1arr),{ fileName : "CryptUtil.hx", lineNumber : 162, className : "util.CryptUtil", methodName : "equalsDN", customParams : [Log.DDEBUG]});
	haxe_Log.trace("Check DNs2 : " + Std.string(dns2arr),{ fileName : "CryptUtil.hx", lineNumber : 163, className : "util.CryptUtil", methodName : "equalsDN", customParams : [Log.DDEBUG]});
	if(dns1arr.length != dns2arr.length) {
		return false;
	}
	var _g1 = 0;
	var _g = dns1arr.length;
	while(_g1 < _g) {
		var i = _g1++;
		var isFinded = false;
		var name = dns1arr[i][0];
		var value = dns1arr[i][1];
		var _g3 = 0;
		var _g2 = dns2arr.length;
		while(_g3 < _g2) {
			var k = _g3++;
			if(name.toLowerCase() == "c") {
				if(name.toLowerCase() == dns2arr[k][0].toLowerCase() && value.toLowerCase() == dns2arr[k][1].toLowerCase()) {
					isFinded = true;
					break;
				}
			} else if(name.toLowerCase() == dns2arr[k][0].toLowerCase() && value == dns2arr[k][1]) {
				isFinded = true;
				break;
			}
		}
		if(!isFinded) {
			return false;
		}
	}
	return true;
};
var util_Int32Util = function() { };
util_Int32Util.__name__ = ["util","Int32Util"];
util_Int32Util.B4 = function(v) {
	return v >>> 24 & -1;
};
util_Int32Util.B3 = function(v) {
	return v >>> 16 & 255 & -1;
};
util_Int32Util.B2 = function(v) {
	return v >>> 8 & 255 & -1;
};
util_Int32Util.B1 = function(v) {
	return v & 255 & -1;
};
util_Int32Util.and = function(a,b) {
	return a & b;
};
util_Int32Util.ushr = function(v,bits) {
	return v >>> bits;
};
util_Int32Util.ofInt = function(v) {
	return v;
};
util_Int32Util.compare = function(a,b) {
	return a - b | 0;
};
util_Int32Util.abs = function(v) {
	return Math.abs(v) | 0;
};
util_Int32Util.mod = function(a,b) {
	return a % b;
};
util_Int32Util.toInt = function(v) {
	return v & -1;
};
util_Int32Util.div = function(a,b) {
	return a / b | 0;
};
util_Int32Util.sub = function(a,b) {
	return a - b | 0;
};
util_Int32Util.eq = function(a,b) {
	return a == b;
};
util_Int32Util.lt = function(a,b) {
	return a < b;
};
util_Int32Util.gt = function(a,b) {
	return a > b;
};
util_Int32Util.baseEncode = function(v,radix) {
	if(radix < 2 || radix > 36) {
		throw new js__$Boot_HaxeError("radix out of range");
	}
	var sb = "";
	var av = Math.abs(v) | 0;
	var radix32 = radix;
	while(true) {
		var r32 = av % radix32;
		sb = "0123456789abcdefghijklmnopqrstuvwxyz".charAt(r32 & -1) + sb;
		av = (av - r32 | 0) / radix32 | 0;
		if(av == 0) {
			break;
		}
	}
	if(v < 0) {
		return "-" + sb;
	}
	return sb;
};
util_Int32Util.packBE = function(l) {
	var sb = new haxe_io_BytesBuffer();
	var _g1 = 0;
	var _g = l.length;
	while(_g1 < _g) {
		var i = _g1++;
		sb.b.push(l[i] >>> 24 & -1);
		sb.b.push(l[i] >>> 16 & 255 & -1);
		sb.b.push(l[i] >>> 8 & 255 & -1);
		sb.b.push(l[i] & 255 & -1);
	}
	return sb.getBytes();
};
util_Int32Util.unpackLE = function(s) {
	if(s == null || s.length == 0) {
		return [];
	}
	if(s.length % 4 != 0) {
		throw new js__$Boot_HaxeError("Buffer not multiple of 4 bytes");
	}
	var a = [];
	var pos = 0;
	var i = 0;
	var len = s.length;
	while(pos < len) {
		a[i] = util_Int32Util.decodeLE(s,pos);
		pos += 4;
		++i;
	}
	return a;
};
util_Int32Util.unpackBE = function(s) {
	if(s == null || s.length == 0) {
		return [];
	}
	if(s.length % 4 != 0) {
		throw new js__$Boot_HaxeError("Buffer not multiple of 4 bytes");
	}
	var a = [];
	var pos = 0;
	var i = 0;
	while(pos < s.length) {
		a[i] = util_Int32Util.decodeBE(s,pos);
		pos += 4;
		++i;
	}
	return a;
};
util_Int32Util.packLE = function(l) {
	var sb = new haxe_io_BytesBuffer();
	var _g1 = 0;
	var _g = l.length;
	while(_g1 < _g) {
		var i = _g1++;
		sb.b.push(l[i] & 255 & -1);
		sb.b.push(l[i] >>> 8 & 255 & -1);
		sb.b.push(l[i] >>> 16 & 255 & -1);
		sb.b.push(l[i] >>> 24 & -1);
	}
	return sb.getBytes();
};
util_Int32Util.add = function(a,b) {
	return a + b | 0;
};
util_Int32Util.shl = function(v,bits) {
	return v << bits;
};
util_Int32Util.decodeBE = function(s,pos) {
	if(pos == null) {
		pos = 0;
	}
	var b0 = s.b[pos + 3];
	var b1 = s.b[pos + 2];
	var b2 = s.b[pos + 1];
	var b3 = s.b[pos];
	b1 = b1 << 8;
	b2 = b2 << 16;
	b3 = b3 << 24;
	var a = b0 + b1 | 0;
	a = a + b2 | 0;
	a = a + b3 | 0;
	return a;
};
util_Int32Util.decodeLE = function(s,pos) {
	if(pos == null) {
		pos = 0;
	}
	var b0 = s.b[pos];
	var b1 = s.b[pos + 1];
	var b2 = s.b[pos + 2];
	var b3 = s.b[pos + 3];
	b1 = b1 << 8;
	b2 = b2 << 16;
	b3 = b3 << 24;
	var a = b0 + b1 | 0;
	a = a + b2 | 0;
	a = a + b3 | 0;
	return a;
};
var util_ObjectUtil = function() { };
util_ObjectUtil.__name__ = ["util","ObjectUtil"];
util_ObjectUtil.shallowCopy = function(org,isInclude) {
	var rv = { };
	var _g = 0;
	var _g1 = Reflect.fields(org);
	while(_g < _g1.length) {
		var k = _g1[_g];
		++_g;
		if(isInclude != null && isInclude(k,Reflect.field(org,k),org) || isInclude == null) {
			rv[k] = Reflect.field(org,k);
		}
	}
	return rv;
};
util_ObjectUtil.shallowCopyInclude = function(org,includeKeys) {
	return util_ObjectUtil.shallowCopy(org,function(k) {
		if(includeKeys.indexOf(k) != -1) {
			return true;
		}
		return false;
	});
};
util_ObjectUtil.shallowCopyExclude = function(org,excludeKeys) {
	return util_ObjectUtil.shallowCopy(org,function(k) {
		if(excludeKeys.indexOf(k) == -1) {
			return true;
		}
		return false;
	});
};
util_ObjectUtil.cloneAsJson = function(v) {
	return JSON.parse(JSON.stringify(v));
};
util_ObjectUtil.deepCopy = function(v) {
	if(!Reflect.isObject(v)) {
		return v;
	} else if(typeof(v) == "string") {
		return v;
	} else if((v instanceof Array) && v.__enum__ == null) {
		var result = Type.createInstance(v == null ? null : js_Boot.getClass(v),[]);
		var _g1 = 0;
		var _g = v.length;
		while(_g1 < _g) {
			var ii = _g1++;
			result.push(util_ObjectUtil.deepCopy(v[ii]));
		}
		return result;
	} else if(js_Boot.__instanceof(v,List)) {
		var result1 = Type.createInstance(v == null ? null : js_Boot.getClass(v),[]);
		var iter = $iterator(v)();
		var ii1 = iter;
		while(ii1.hasNext()) {
			var ii2 = ii1.next();
			result1.add(ii2);
		}
		return result1;
	} else if((v == null ? null : js_Boot.getClass(v)) == null) {
		var obj = { };
		var _g2 = 0;
		var _g11 = Reflect.fields(v);
		while(_g2 < _g11.length) {
			var ff = _g11[_g2];
			++_g2;
			obj[ff] = util_ObjectUtil.deepCopy(Reflect.field(v,ff));
		}
		return obj;
	} else {
		var obj1 = Type.createEmptyInstance(v == null ? null : js_Boot.getClass(v));
		var _g3 = 0;
		var _g12 = Reflect.fields(v);
		while(_g3 < _g12.length) {
			var ff1 = _g12[_g3];
			++_g3;
			obj1[ff1] = util_ObjectUtil.deepCopy(Reflect.field(v,ff1));
		}
		return obj1;
	}
};
var util_PEM = function() { };
util_PEM.__name__ = ["util","PEM"];
util_PEM.encode = function(label,data) {
	var base64;
	if(typeof(data) == "string") {
		base64 = data;
	} else if(js_Boot.__instanceof(data,haxe_io_Bytes)) {
		base64 = haxe_crypto_Base64.encode(data);
	} else {
		throw new js__$Boot_HaxeError(new Exception("Invalid base64 fo pem"));
	}
	var pemCert = "-----BEGIN " + label + "-----\r\n";
	var nextIndex = 0;
	var lineLength;
	while(nextIndex < base64.length) {
		if(nextIndex + 64 <= base64.length) {
			pemCert += HxOverrides.substr(base64,nextIndex,64) + "\r\n";
		} else {
			pemCert += HxOverrides.substr(base64,nextIndex,null) + "\r\n";
		}
		nextIndex += 64;
	}
	pemCert += "-----END " + label + "-----\r\n";
	return pemCert;
};
util_PEM.decode = function(label,pemData) {
	var replacer_r = new RegExp("\r|\n|-----BEGIN " + label + "-----|-----END " + label + "-----","g".split("u").join(""));
	var base64 = pemData.replace(replacer_r,"");
	return haxe_crypto_Base64.decode(base64);
};
var util_RejectWrapper = function() { };
util_RejectWrapper.__name__ = ["util","RejectWrapper"];
util_RejectWrapper.prototype = {
	wrap: function(reject) {
		if(reject == null) {
			reject = util_RejectWrapper.systemReject;
		}
		return reject;
	}
	,__class__: util_RejectWrapper
};
var util_StringUtil = function() { };
util_StringUtil.__name__ = ["util","StringUtil"];
util_StringUtil.octal = function(n,digits) {
	var s = "";
	var octChars = "01234567";
	while(true) {
		s = octChars.charAt(n & 7) + s;
		n >>>= 3;
		if(!(n > 0)) {
			break;
		}
	}
	if(digits != null) {
		while(s.length < digits) s = "0" + s;
	}
	return s;
};
util_StringUtil.isExist = function(arrStr,target,ignoreCase) {
	if(ignoreCase == null) {
		ignoreCase = false;
	}
	var _g1 = 0;
	var _g = arrStr.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(!ignoreCase && arrStr[i] == target) {
			return true;
		} else if(ignoreCase && arrStr[i].toUpperCase() == target.toUpperCase()) {
			return true;
		}
	}
	return false;
};
util_StringUtil.isNull = function(val) {
	if(val == null || StringTools.trim(val) == "") {
		return true;
	}
	return false;
};
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
String.prototype.__class__ = String;
String.__name__ = ["String"];
Array.__name__ = ["Array"];
Date.prototype.__class__ = Date;
Date.__name__ = ["Date"];
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
var __map_reserved = {};
var dbits;
var j_lm;
var canary = 0xdeadbeefcafe;
j_lm = (canary & 16777215) == 15715070;
var browser = window.navigator.appName;
if(j_lm && browser == "Microsoft Internet Explorer") {
	dbits = 30;
} else if(j_lm && browser != "Netscape") {
	dbits = 26;
} else {
	dbits = 28;
}
switch(dbits) {
case 26:
	csafe_math_BigInteger.defaultAm = 1;
	break;
case 28:
	csafe_math_BigInteger.defaultAm = 3;
	break;
case 30:
	csafe_math_BigInteger.defaultAm = 2;
	break;
default:
	throw new js__$Boot_HaxeError("bad dbits value");
}
csafe_math_BigInteger.DB = dbits;
csafe_math_BigInteger.DM = (1 << csafe_math_BigInteger.DB) - 1;
csafe_math_BigInteger.DV = 1 << csafe_math_BigInteger.DB;
csafe_math_BigInteger.BI_FP = 52;
csafe_math_BigInteger.FV = Math.pow(2,csafe_math_BigInteger.BI_FP);
csafe_math_BigInteger.F1 = csafe_math_BigInteger.BI_FP - csafe_math_BigInteger.DB;
csafe_math_BigInteger.F2 = 2 * csafe_math_BigInteger.DB - csafe_math_BigInteger.BI_FP;
csafe_math_BigInteger.initBiRc();
csafe_math_BigInteger.BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
csafe_math_BigInteger.lowprimes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509];
csafe_math_BigInteger.lplim = 67108864 / csafe_math_BigInteger.lowprimes[csafe_math_BigInteger.lowprimes.length - 1] | 0;
var ArrayBuffer = $global.ArrayBuffer || js_html_compat_ArrayBuffer;
if(ArrayBuffer.prototype.slice == null) {
	ArrayBuffer.prototype.slice = js_html_compat_ArrayBuffer.sliceImpl;
}
var DataView = $global.DataView || js_html_compat_DataView;
var Uint8Array = $global.Uint8Array || js_html_compat_Uint8Array._new;
var bb = new haxe_io_BytesBuffer();
util_BytesUtil.EMPTY = bb.getBytes();
DateTools.DAY_SHORT_NAMES = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
DateTools.DAY_NAMES = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
DateTools.MONTH_SHORT_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
DateTools.MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
LZZerorize.list = [];
Log.DDEBUG = 0;
Log.DEBUG = 1;
Log.WARN = 2;
Log.INFO = 3;
Log.ERROR = 4;
Log.NONE = 5;
Log._TAGS = ["DDEBUG","DEBUG","WARN","INFO","ERROR"];
Log.DEFAULT_LEVEL = Log.DDEBUG;
Log.FILTER_LEVEL = Log.NONE;
Log.HBUF = [];
app_CertOID.TYPE_PERSONAL = 1;
app_CertOID.TYPE_COPOR = 2;
app_CertOID.TYPE_GOVER = 3;
app_CertOID.TYPE_SPECIAL = 4;
app_CertOID.oidMap = new haxe_ds_StringMap();
app_CertOID.inited = app_CertOID.init();
app_ErrorCodes.codeMap = JSON.parse("{\r\n        \"cert_not_exist\" : \"0016\",\r\n        \"incorrect_crdt\" : \"0017\",\r\n        \"cid_already_exist\" : \"5053\",\r\n        \"not_support_cert\" : \"5054\",\r\n        \"wrong_cmp_refnum\" : \"005E\",\r\n        \"wrong_cmp_authcode\" : \"005F\",\r\n        \"not_yessign\" : \"0061\",\r\n        \"cloud_password_exceed\" : \"0062\",\r\n        \"check_api_key\" : \"5055\",\r\n        \"not_yessignOpenCertInfo_apikey\" : \"5056\",\r\n        \"cloud_expire_cert\" : \"0064\"\r\n    }");
app_JsonFFI.extCallbackIdxCount = 0;
app_JsonFFI.extCallbackMap = new haxe_ds_IntMap();
app_JsonFFI.expireTimeout = 18000000;
app_JsonFFI.BUFFER_NUM = 5000;
app_KeySharpMain.STATUS_IDLE = 0;
app_KeySharpMain.STATUS_INITIALIZING = 1;
app_KeySharpMain.STATUS_OK = 2;
app_KeySharpMain.STATUS_ERROR = -1;
app_KeySharpMain.STATUS = app_KeySharpMain.STATUS_IDLE;
app_YessignCMPTransport.HERR_MAP = (function($this) {
	var $r;
	var _g = new haxe_ds_StringMap();
	if(__map_reserved["ERR_510"] != null) {
		_g.setReserved("ERR_510","Base64 Error");
	} else {
		_g.h["ERR_510"] = "Base64 Error";
	}
	if(__map_reserved["ERR_511"] != null) {
		_g.setReserved("ERR_511","Base64 Decode Failed");
	} else {
		_g.h["ERR_511"] = "Base64 Decode Failed";
	}
	if(__map_reserved["ERR_512"] != null) {
		_g.setReserved("ERR_512","Base64 Encode Failed");
	} else {
		_g.h["ERR_512"] = "Base64 Encode Failed";
	}
	if(__map_reserved["ERR_520"] != null) {
		_g.setReserved("ERR_520","TCP Message Error");
	} else {
		_g.h["ERR_520"] = "TCP Message Error";
	}
	if(__map_reserved["ERR_521"] != null) {
		_g.setReserved("ERR_521","TCP Message Length Error");
	} else {
		_g.h["ERR_521"] = "TCP Message Length Error";
	}
	if(__map_reserved["ERR_522"] != null) {
		_g.setReserved("ERR_522","Unsupported TCP Message Version");
	} else {
		_g.h["ERR_522"] = "Unsupported TCP Message Version";
	}
	if(__map_reserved["ERR_523"] != null) {
		_g.setReserved("ERR_523","Unsupported TCP Message Flags");
	} else {
		_g.h["ERR_523"] = "Unsupported TCP Message Flags";
	}
	if(__map_reserved["ERR_524"] != null) {
		_g.setReserved("ERR_524","Unsupported TCP Message Type");
	} else {
		_g.h["ERR_524"] = "Unsupported TCP Message Type";
	}
	if(__map_reserved["ERR_525"] != null) {
		_g.setReserved("ERR_525","Wrong TCP Message Type");
	} else {
		_g.h["ERR_525"] = "Wrong TCP Message Type";
	}
	if(__map_reserved["ERR_540"] != null) {
		_g.setReserved("ERR_540","CMP Error");
	} else {
		_g.h["ERR_540"] = "CMP Error";
	}
	if(__map_reserved["ERR_541"] != null) {
		_g.setReserved("ERR_541","CMP Connection Error");
	} else {
		_g.h["ERR_541"] = "CMP Connection Error";
	}
	if(__map_reserved["ERR_542"] != null) {
		_g.setReserved("ERR_542","CMP Disconnected");
	} else {
		_g.h["ERR_542"] = "CMP Disconnected";
	}
	if(__map_reserved["ERR_543"] != null) {
		_g.setReserved("ERR_543","Invalid CMP Header");
	} else {
		_g.h["ERR_543"] = "Invalid CMP Header";
	}
	if(__map_reserved["ERR_544"] != null) {
		_g.setReserved("ERR_544","Invalid Socket");
	} else {
		_g.h["ERR_544"] = "Invalid Socket";
	}
	if(__map_reserved["ERR_545"] != null) {
		_g.setReserved("ERR_545","CMP Read Error");
	} else {
		_g.h["ERR_545"] = "CMP Read Error";
	}
	if(__map_reserved["ERR_546"] != null) {
		_g.setReserved("ERR_546","CMP Write Error");
	} else {
		_g.h["ERR_546"] = "CMP Write Error";
	}
	if(__map_reserved["ERR_547"] != null) {
		_g.setReserved("ERR_547","CMP Transmit Error");
	} else {
		_g.h["ERR_547"] = "CMP Transmit Error";
	}
	if(__map_reserved["ERR_548"] != null) {
		_g.setReserved("ERR_548","CMP Socket Error");
	} else {
		_g.h["ERR_548"] = "CMP Socket Error";
	}
	if(__map_reserved["ERR_570"] != null) {
		_g.setReserved("ERR_570","HTTP Request Error");
	} else {
		_g.h["ERR_570"] = "HTTP Request Error";
	}
	if(__map_reserved["ERR_571"] != null) {
		_g.setReserved("ERR_571","Invalid HTTP Request");
	} else {
		_g.h["ERR_571"] = "Invalid HTTP Request";
	}
	if(__map_reserved["ERR_572"] != null) {
		_g.setReserved("ERR_572","Unsupported HTTP Media Type");
	} else {
		_g.h["ERR_572"] = "Unsupported HTTP Media Type";
	}
	if(__map_reserved["ERR_573"] != null) {
		_g.setReserved("ERR_573","Too Short Request Message");
	} else {
		_g.h["ERR_573"] = "Too Short Request Message";
	}
	if(__map_reserved["ERR_574"] != null) {
		_g.setReserved("ERR_574","HTTP Read Error");
	} else {
		_g.h["ERR_574"] = "HTTP Read Error";
	}
	if(__map_reserved["ERR_575"] != null) {
		_g.setReserved("ERR_575","Request Session Error");
	} else {
		_g.h["ERR_575"] = "Request Session Error";
	}
	$r = _g;
	return $r;
}(this));
util_Hex._st_digit = HxOverrides.cca("0",0);
util_Hex._en_digit = HxOverrides.cca("9",0);
util_Hex._st_hex = HxOverrides.cca("a",0);
util_Hex._en_hex = HxOverrides.cca("f",0);
util_Hex._stu_hex = HxOverrides.cca("A",0);
util_Hex._enu_hex = HxOverrides.cca("F",0);
app_certstorage_Browser1.DMK = util_Hex.toBytes("c56a22668ec0d26f9702084b7092d2f3c5cdadc1bb6d133211edba21cb920da9e9d50d19cf0f245601f6620bd4ea0f93898dc2dd54f09d492e723dfdb7920b0530a57f068ab527f67e9f6ca39ac9a2163c3eefa9c3193c13b94c37b3977a8293f3e5d5cf70a433a183e222a9604e0682d000c0a79c862ef612fab3790dfdeb28f4a33d7d213692cdd31eb5b9b6b1338a49db74a57c9b45bea226af447b1f46dc078001910a1bb569c5ccc3ee8b104b1e6fa0b556b83e96c414a5d919e2f014d2a8131207fe760f205887de28b262b71c5f9c2c1e1a1cec0230df91b428629ac7f8dd7012c00a3fa06d0ee7b47ed6daddaca7cf3cb3f20080a8fcaafdb9b7de2dbe950ed036d973c334a9e15730fd4c02e35097cb543d32de8de8b3d0e8efcaab7d627f3f915718f59daf65615ea044eb6bac3fafb7f818d5307972dc599e50091afa7967c3b8575064ba349c2431ddab48a6f5b019919286d2870ef4bb54a6c6690eabbb33b36c553ed228e68afa4f300e2f186a540ba4beb4c83d792ca2575262e3f143c13112b6e8e2bdb634112ee720e21ed29a4b13b36e3d3a421d7a9cbfa34d020ace005e6d37fb2443337af18994c0623e447f2e4712fc4b205485dacad90afe7f57bfc4c68e86183c0b5154aa459a92fdd58e7ba6b9ad361bc8574d2e300f21c4fcce876dbad388b548e4bbbe5cff8d299b8c83068af39a026d904947");
app_certstorage_Browser1_$1.VERSION = "2";
app_certstorage_Browser1_$1.DMK = util_Hex.toBytes("3f927b5f4805606f0d118575aa57d9a6cc473b19970375fa578e3b82d5dab91990fabe2aa2b45d04189e8080cce80edc73cbd5932cbf0034aed55e5aeb59ceea");
app_certstorage_Browser2.lastListCInfos = { };
app_certstorage_Browser2.migrated = false;
app_certstorage_Browser2.cloud = false;
app_certstorage_Browser2.SYNCINFO = [];
app_certstorage_Browser2_$1.lastListCInfos = { };
app_certstorage_Browser2_$1.migrated = false;
app_certstorage_Browser2_$1.FO_MODE = false;
app_certstorage_Browser2_$1.SYNCINFO = [];
app_certstorage_Browser2_$1.DEFAULT_CLOUD_OPTIONS = { "issueCert" : { saveCloudOption : { mode : "window"}}, "importCertFromData" : { saveCloudOption : { mode : "window"}}, "sign" : { listCloudOption : { mode : "tray"}, loadSyncCloudOption : { mode : "tray"}}, "exportCert" : { listCloudOption : { mode : "tray"}, loadSyncCloudOption : { mode : "tray"}}, "updateCert" : { listCloudOption : { mode : "tray"}, disableImportSync : true, disableExportSync : true, saveCloudOption : { mode : "window"}}, "copyBrowserCert" : { listCloudOption : { mode : "tray"}, loadSyncCloudOption : { mode : "window"}}, "removeCert" : { listCloudOption : { mode : "tray"}}, "loadCertList" : { listCloudOption : { mode : "tray"}}, "updateCertCredential" : { listCloudOption : { mode : "tray"}, disableImportSync : true, disableExportSync : true, saveCloudOption : { mode : "window"}}, "DEFAULT" : { listCloudOption : { mode : "tray"}, loadSyncCloudOption : { mode : "window"}, saveCloudOption : { mode : "window"}}};
app_certstorage_CertResolver.BROWSER = "browser";
app_certstorage_CertResolver.DISK = "disk";
app_certstorage_CertResolver.HSM = "hsm";
app_certstorage_CertResolver.SPHONE = "sphone";
app_certstorage_CertResolver.CLOUD = "cloud";
app_certstorage_CertResolver.TYPE_PKCS8 = "pkcs8";
app_certstorage_CertResolver.TYPE_PFX = "pkcs12";
app_certstorage_CertResolver.TYPE_SPECIFIC = "specific";
app_certstorage_CertResolver.storageSpec = { "none" : { type : "pkcs8", accessPubCert : true, serializable : false, cloneable : false, implClass : app_certstorage_TempStore}, "browser" : { type : "pkcs8", accessPubCert : true, serializable : true, cloneable : true, implClass : app_certstorage_Browser1_$1}, "browser2" : { type : "pkcs8", accessPubCert : true, serializable : false, cloneable : true, implClass : app_certstorage_Browser2_$1}, "disk" : { type : "pkcs8", accessPubCert : true, serializable : true, cloneable : true, implClass : app_certstorage_ExternalDisk}, "hsm" : { type : "hsm", accessPubCert : false, serializable : false, cloneable : true, implClass : app_certstorage_Hsm}, "sphone" : { type : "pkcs8", accessPubCert : true, serializable : true, cloneable : true, implClass : app_certstorage_External}, "cloud" : { type : "pkcs12", accessPubCert : false, serializable : false, cloneable : true, implClass : app_certstorage_Cloud}};
app_certstorage_FO_$KFTCOpenCert.MAX_TIMEOUT = 8000;
app_certstorage_FO_$KFTCOpenCert.FO_MODE = false;
app_certstorage_KFTCBrowser.LOCALKEY = "KFTC_CC_DATA";
app_certstorage_KFTCBrowser.EncLKEY = "2SrbCIB-Ooem4_jYHztF3zvBltBEH62l3bT24Nyy7mg";
app_js_WebCryptoAlgorithmImpl.RSA_SSA_MODE = 0;
app_js_WebCryptoAlgorithmImpl.RSA_PSS_MODE = 0;
app_js_WebCryptoAlgorithmImpl.MAX_RANDOM_LEN = 2000;
app_js_WebCryptoWrapper.window = window;
common_URL._parts = ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];
csafe_CrossSafe.MODE_UNKNOWN = -1;
csafe_CrossSafe.MODE_WC = 1;
csafe_CrossSafe.MODE_SOFT = 2;
csafe_CrossSafe.ACTIVATED_MODE = csafe_CrossSafe.MODE_UNKNOWN;
csafe_asn1_ASN1.INDEFINITE_START_FLAG = util_ArrayUtil.toBytes([128]);
csafe_asn1_ASN1.INDEFINITE_END_FLAG = util_ArrayUtil.toBytes([0,0]);
csafe_asn1_ASN1.IMPLICIT = 256;
csafe_asn1_ASN1.OPTIONAL = 512;
csafe_asn1_ASN1.CONSTRUCTED = 1024;
csafe_asn1_ASN1.MULTIPLE = 2048;
csafe_asn1_ASN1.CHOICE = 4096;
csafe_asn1_ASN1.CONTEXT_SPECIFIC = 8192;
csafe_asn1_ASN1.CLASS_UNIVERSAL = 0;
csafe_asn1_ASN1.CLASS_APPLICATION = 64;
csafe_asn1_ASN1.CLASS_CONTEXT_SPECIFIC = 128;
csafe_asn1_ASN1.CLASS_PRIVATE = 192;
csafe_asn1_ASN1.ANY = 0;
csafe_asn1_ASN1.BOOLEAN = 1;
csafe_asn1_ASN1.INTEGER = 2;
csafe_asn1_ASN1.BIT_STRING = 3;
csafe_asn1_ASN1.OCTET_STRING = 4;
csafe_asn1_ASN1.NULL = 5;
csafe_asn1_ASN1.OBJECT_ID = 6;
csafe_asn1_ASN1.ENUMERATED = 10;
csafe_asn1_ASN1.UTF8String = 12;
csafe_asn1_ASN1.SEQUENCE = 16;
csafe_asn1_ASN1.SET = 17;
csafe_asn1_ASN1.NumericString = 18;
csafe_asn1_ASN1.PrintableString = 19;
csafe_asn1_ASN1.T61String = 20;
csafe_asn1_ASN1.IA5String = 22;
csafe_asn1_ASN1.UTCTime = 23;
csafe_asn1_ASN1.GeneralizedTime = 24;
csafe_asn1_ASN1.VisibleString = 26;
csafe_asn1_ASN1.GeneralString = 27;
csafe_asn1_ASN1.BMPString = 30;
csafe_asn1_ASN1.Constructed = 32;
csafe_asn1_ASN1.TYPE_ANY = new csafe_asn1_ASN1Type(null,0,csafe_asn1_ASN1.ANY);
csafe_asn1_ASN1.TYPE_BOOLEAN = new csafe_asn1_ASN1Type(null,0,csafe_asn1_ASN1.BOOLEAN);
csafe_asn1_ASN1.TYPE_INTEGER = new csafe_asn1_ASN1Type(null,0,csafe_asn1_ASN1.INTEGER);
csafe_asn1_ASN1.TYPE_BIT_STRING = new csafe_asn1_ASN1Type(null,0,csafe_asn1_ASN1.BIT_STRING);
csafe_asn1_ASN1.TYPE_OCTET_STRING = new csafe_asn1_ASN1Type(null,0,csafe_asn1_ASN1.OCTET_STRING);
csafe_asn1_ASN1.TYPE_NULL = new csafe_asn1_ASN1Type(null,0,csafe_asn1_ASN1.NULL);
csafe_asn1_ASN1.TYPE_OBJECT_ID = new csafe_asn1_ASN1Type(null,0,csafe_asn1_ASN1.OBJECT_ID);
csafe_asn1_ASN1.TYPE_ENUMERATED = new csafe_asn1_ASN1Type(null,0,csafe_asn1_ASN1.ENUMERATED);
csafe_asn1_ASN1.TYPE_UTF8String = new csafe_asn1_ASN1Type(null,0,csafe_asn1_ASN1.UTF8String);
csafe_asn1_ASN1.TYPE_NumericString = new csafe_asn1_ASN1Type(null,0,csafe_asn1_ASN1.NumericString);
csafe_asn1_ASN1.TYPE_PrintableString = new csafe_asn1_ASN1Type(null,0,csafe_asn1_ASN1.PrintableString);
csafe_asn1_ASN1.TYPE_T61String = new csafe_asn1_ASN1Type(null,0,csafe_asn1_ASN1.T61String);
csafe_asn1_ASN1.TYPE_IA5String = new csafe_asn1_ASN1Type(null,0,csafe_asn1_ASN1.IA5String);
csafe_asn1_ASN1.TYPE_UTCTime = new csafe_asn1_ASN1Type(null,0,csafe_asn1_ASN1.UTCTime);
csafe_asn1_ASN1.TYPE_GeneralizedTime = new csafe_asn1_ASN1Type(null,0,csafe_asn1_ASN1.GeneralizedTime);
csafe_asn1_ASN1.TYPE_VisibleString = new csafe_asn1_ASN1Type(null,0,csafe_asn1_ASN1.VisibleString);
csafe_asn1_ASN1.TYPE_GeneralString = new csafe_asn1_ASN1Type(null,0,csafe_asn1_ASN1.GeneralString);
csafe_asn1_ASN1.TYPE_SEQUENCE = new csafe_asn1_ASN1Type(null,csafe_asn1_ASN1.CONSTRUCTED,csafe_asn1_ASN1.SEQUENCE);
csafe_asn1_ASN1.TYPE_SET = new csafe_asn1_ASN1Type(null,csafe_asn1_ASN1.CONSTRUCTED,csafe_asn1_ASN1.SET);
csafe_asn1_ObjectID.table = new haxe_ds_StringMap();
csafe_asn1_ObjectID.commonName = csafe_asn1_ObjectID.register("2.5.4.3","일반명","cn");
csafe_asn1_ObjectID.country = csafe_asn1_ObjectID.register("2.5.4.6","국가명","c");
csafe_asn1_ObjectID.locality = csafe_asn1_ObjectID.register("2.5.4.7","지역명","l");
csafe_asn1_ObjectID.stateOrProvince = csafe_asn1_ObjectID.register("2.5.4.8","시도명","st");
csafe_asn1_ObjectID.streetAddress = csafe_asn1_ObjectID.register("2.5.4.9","세부주소","street");
csafe_asn1_ObjectID.organization = csafe_asn1_ObjectID.register("2.5.4.10","기관명","o");
csafe_asn1_ObjectID.organizationalUnit = csafe_asn1_ObjectID.register("2.5.4.11","부서명","ou");
csafe_asn1_ObjectID.title = csafe_asn1_ObjectID.register("2.5.4.12","직위","t");
csafe_asn1_ObjectID.surName = csafe_asn1_ObjectID.register("2.5.4.4","성","sn");
csafe_asn1_ObjectID.givenName = csafe_asn1_ObjectID.register("2.5.4.42","이름");
csafe_asn1_ObjectID.initials = csafe_asn1_ObjectID.register("2.5.4.43","이니셜");
csafe_asn1_ObjectID.generationQualifier = csafe_asn1_ObjectID.register("2.5.4.44","세대 한정자");
csafe_asn1_ObjectID.uniqueIdentifier = csafe_asn1_ObjectID.register("2.5.4.45","유일 식별자","uid");
csafe_asn1_ObjectID.dnQualifier = csafe_asn1_ObjectID.register("2.5.4.46","DN 한정자");
csafe_asn1_ObjectID.domainComponent = csafe_asn1_ObjectID.register("0.9.2342.19200300.100.1.25","도메인 구성요소","dc");
csafe_asn1_ObjectID.pkcs7 = csafe_asn1_ObjectID.register("1.2.840.113549.1.7","PKCS#7");
csafe_asn1_ObjectID.pkcs7_data = csafe_asn1_ObjectID.register("1.2.840.113549.1.7.1","PKCS#7 data");
csafe_asn1_ObjectID.pkcs7_signedData = csafe_asn1_ObjectID.register("1.2.840.113549.1.7.2","PKCS#7 signedData");
csafe_asn1_ObjectID.pkcs7_envelopedData = csafe_asn1_ObjectID.register("1.2.840.113549.1.7.3","PKCS#7 envelopedData");
csafe_asn1_ObjectID.pkcs7_signedAndEnvelopedData = csafe_asn1_ObjectID.register("1.2.840.113549.1.7.4","PKCS#7 signedAndEnvelopedData");
csafe_asn1_ObjectID.pkcs7_digestedData = csafe_asn1_ObjectID.register("1.2.840.113549.1.7.5","PKCS#7 digestedData");
csafe_asn1_ObjectID.pkcs7_encryptedData = csafe_asn1_ObjectID.register("1.2.840.113549.1.7.6","PKCS#7 encryptedData");
csafe_asn1_ObjectID.pkcs7_ctl = csafe_asn1_ObjectID.register("1.3.6.1.4.1.311.10.1","인증서 신뢰 목록");
csafe_asn1_ObjectID.pkcs9 = csafe_asn1_ObjectID.register("1.2.840.113549.1.9","PKCS#9");
csafe_asn1_ObjectID.emailAddress = csafe_asn1_ObjectID.register("1.2.840.113549.1.9.1","전자우편 주소","EMAIL");
csafe_asn1_ObjectID.unstructuredName = csafe_asn1_ObjectID.register("1.2.840.113549.1.9.2","비정형 명칭");
csafe_asn1_ObjectID.contentType = csafe_asn1_ObjectID.register("1.2.840.113549.1.9.3","내용 타입");
csafe_asn1_ObjectID.messageDigest = csafe_asn1_ObjectID.register("1.2.840.113549.1.9.4","메시지 다이제스트");
csafe_asn1_ObjectID.signingTime = csafe_asn1_ObjectID.register("1.2.840.113549.1.9.5","서명 일자");
csafe_asn1_ObjectID.countersignature = csafe_asn1_ObjectID.register("1.2.840.113549.1.9.6","상대 서명");
csafe_asn1_ObjectID.challengePassword = csafe_asn1_ObjectID.register("1.2.840.113549.1.9.7","챌린지 패스워드");
csafe_asn1_ObjectID.unstructuredAddress = csafe_asn1_ObjectID.register("1.2.840.113549.1.9.8","비정형 주소");
csafe_asn1_ObjectID.extendedCertificateAttributes = csafe_asn1_ObjectID.register("1.2.840.113549.1.9.9","확장형 인증서 속성");
csafe_asn1_ObjectID.signingDescription = csafe_asn1_ObjectID.register("1.2.840.113549.1.9.13","서명 해설");
csafe_asn1_ObjectID.symmetricCapabilities = csafe_asn1_ObjectID.register("1.2.840.113549.1.9.15","대칭 능력");
csafe_asn1_ObjectID.friendlyName = csafe_asn1_ObjectID.register("1.2.840.113549.1.9.20","명칭");
csafe_asn1_ObjectID.localKeyID = csafe_asn1_ObjectID.register("1.2.840.113549.1.9.21","로컬 키 식별자");
csafe_asn1_ObjectID.certTypes = csafe_asn1_ObjectID.register("1.2.840.113549.1.9.22","인증 타입");
csafe_asn1_ObjectID.x509Certificate = csafe_asn1_ObjectID.register("1.2.840.113549.1.9.22.1","X.509 인증서");
csafe_asn1_ObjectID.sdsiCertificate = csafe_asn1_ObjectID.register("1.2.840.113549.1.9.22.2","SDSI 인증서");
csafe_asn1_ObjectID.crlTypes = csafe_asn1_ObjectID.register("1.2.840.113549.1.9.23","CRL 타입");
csafe_asn1_ObjectID.x509Crl = csafe_asn1_ObjectID.register("1.2.840.113549.1.9.23.1","X.509 CRL");
csafe_asn1_ObjectID.pkcs12_safeContentsBag = csafe_asn1_ObjectID.register("1.2.840.113549.1.12.10.1.6","PKCS#12 SafeContentsBag");
csafe_asn1_ObjectID.id_pkix_cps = csafe_asn1_ObjectID.register("1.3.6.1.5.5.7.2.1","id-pkix-cps");
csafe_asn1_ObjectID.id_pkix_unotice = csafe_asn1_ObjectID.register("1.3.6.1.5.5.7.2.2","id-pkix-unotice");
csafe_asn1_ObjectID.id_kisa_identifyData = csafe_asn1_ObjectID.register("1.2.410.200004.10.1.1","id-kisa-identifyData");
csafe_asn1_ObjectID.id_VID = csafe_asn1_ObjectID.register("1.2.410.200004.10.1.1.1","id-VID");
csafe_asn1_ObjectID.id_ocsp = csafe_asn1_ObjectID.register("1.3.6.1.5.5.7.48.1","온라인 인증서 상태 프로토콜","OCSP");
csafe_asn1_ObjectID.id_randomNum = csafe_asn1_ObjectID.register("1.2.410.200004.10.1.1.3","id-randomNum");
csafe_asn1_ObjectID.pkcs12_safeContentBag = csafe_asn1_ObjectID.register("1.2.840.113549.1.12.10.1.6","PKCS#12 SafeContentBag");
csafe_asn1_ObjectID.pkcs12_CertBagIds = csafe_asn1_ObjectID.register("1.2.840.113549.1.12.4","PKCS#12 CertBagIds");
csafe_asn1_ObjectID.pkcs12_x509CertCRLBagId = csafe_asn1_ObjectID.register("1.2.840.113549.1.12.4.1","PKCS#12 X.509 CertCRLBagId");
csafe_asn1_ObjectID.pkcs12_SDSICertBagId = csafe_asn1_ObjectID.register("1.2.840.113549.1.12.4.2","PKCS#12 SDSI CertBagId");
csafe_asn1_ObjectID.pkcs12_Version1 = csafe_asn1_ObjectID.register("1.2.840.113549.1.12.10","PKCS#12 Version1");
csafe_asn1_ObjectID.pkcs12_Version1_BagIds = csafe_asn1_ObjectID.register("1.2.840.113549.1.12.10.1","PKCS#12 Version1 BagIds");
csafe_asn1_ObjectID.pkcs12_keyBag = csafe_asn1_ObjectID.register("1.2.840.113549.1.12.10.1.1","PKCS#12 KeyBag");
csafe_asn1_ObjectID.pkcs12_pkcs8ShroudedKeyBag = csafe_asn1_ObjectID.register("1.2.840.113549.1.12.10.1.2","PKCS#12 PKCS8ShroudedKeyBag");
csafe_asn1_ObjectID.pkcs12_certBag = csafe_asn1_ObjectID.register("1.2.840.113549.1.12.10.1.3","PKCS#12 CertBag");
csafe_asn1_ObjectID.pkcs12_crlBag = csafe_asn1_ObjectID.register("1.2.840.113549.1.12.10.1.4","PKCS#12 CRLBag");
csafe_asn1_ObjectID.pkcs12_secretBag = csafe_asn1_ObjectID.register("1.2.840.113549.1.12.10.1.5","PKCS#12 SecretBag");
csafe_asn1_ObjectID.iniLINE_signRandom = csafe_asn1_ObjectID.register("1.3.6.1.4.1.470225.3.1","SignRandom");
csafe_asn1_impl_AVA.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().ObjectIdentifier("attributeType").ANY("attributeValue").build(csafe_asn1_impl_AVA);
csafe_asn1_impl_AlgorithmID.idMap = new haxe_ds_StringMap();
csafe_asn1_impl_AlgorithmID.implHintMap = new haxe_ds_StringMap();
csafe_asn1_impl_AlgorithmID.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().ObjectIdentifier("algorithm").ANY("parameter",csafe_asn1_ASN1.OPTIONAL).build(csafe_asn1_impl_AlgorithmID);
csafe_asn1_impl_AlgorithmID.dhKeyAgreement = new csafe_asn1_impl_AlgorithmID("1.2.840.113549.1.3.1","DH KeyAgreement","DH");
csafe_asn1_impl_AlgorithmID.dsa = new csafe_asn1_impl_AlgorithmID("1.3.14.3.2.12","DSA","DSA");
csafe_asn1_impl_AlgorithmID.dsaWithSHA = new csafe_asn1_impl_AlgorithmID("1.3.14.3.2.13","DSAwithSHA","DSA");
csafe_asn1_impl_AlgorithmID.dsaWithSHA1 = new csafe_asn1_impl_AlgorithmID("1.3.14.3.2.27","DSAwithSHA1","DSA");
csafe_asn1_impl_AlgorithmID.kcdsa = new csafe_asn1_impl_AlgorithmID("1.2.410.200004.1.1","KCDSA","KCDSA");
csafe_asn1_impl_AlgorithmID.kcdsaWithHAS160 = new csafe_asn1_impl_AlgorithmID("1.2.410.200004.1.8","KCDSAwithHAS160","KCDSAwithHAS160");
csafe_asn1_impl_AlgorithmID.kcdsaWithSHA1 = new csafe_asn1_impl_AlgorithmID("1.2.410.200004.1.9","KCDSAwithSHA1","KCDSAwithSHA1");
csafe_asn1_impl_AlgorithmID.rsa = new csafe_asn1_impl_AlgorithmID("2.5.8.1.1","RSA",{ id : "RSA", procMech : "crypt", cipherMech : "asymm", cipherName : "RSA"});
csafe_asn1_impl_AlgorithmID.rsaEncryption = new csafe_asn1_impl_AlgorithmID("1.2.840.113549.1.1.1","RSA Encryption",{ id : "RSA", procMech : "crypt", cipherMech : "asymm", cipherName : "RSA"});
csafe_asn1_impl_AlgorithmID.rsaOAEPEncryptionSET = new csafe_asn1_impl_AlgorithmID("1.2.840.113549.1.1.6","RSA OAEP Encryption",{ id : "RSA", procMech : "crypt", cipherMech : "asymm", cipherName : "RSA"});
csafe_asn1_impl_AlgorithmID.RSAESOAEP = new csafe_asn1_impl_AlgorithmID("1.2.840.113549.1.1.7","RSA OAEP Encryption",{ id : "RSA", procMech : "crypt", cipherMech : "asymm", cipherName : "RSA"});
csafe_asn1_impl_AlgorithmID.seed_CBC = new csafe_asn1_impl_AlgorithmID("1.2.410.200004.1.4","SEED-CBC",{ id : "SEED", procMech : "crypt", cipherMech : "symm", cipherName : "SEED-CBC"});
csafe_asn1_impl_AlgorithmID.des_ede3_CBC = new csafe_asn1_impl_AlgorithmID("1.2.840.113549.3.7","DES-EDE3-CBC",{ id : "3DES", procMech : "crypt", cipherMech : "symm", cipherName : "3DES-CBC", length : 128});
csafe_asn1_impl_AlgorithmID.aes128_CBC = new csafe_asn1_impl_AlgorithmID("2.16.840.1.101.3.4.1.2","AES128-CBC",{ id : "AES128", procMech : "crypt", cipherMech : "symm", cipherName : "AES-CBC", length : 128});
csafe_asn1_impl_AlgorithmID.aes256_CBC = new csafe_asn1_impl_AlgorithmID("2.16.840.1.101.3.4.1.42","AES256-CBC",{ id : "AES256", procMech : "crypt", cipherMech : "symm", cipherName : "AES-CBC", length : 256});
csafe_asn1_impl_AlgorithmID.rc2_CBC = new csafe_asn1_impl_AlgorithmID("1.2.840.113549.3.2","RC2",{ id : "RC2", procMech : "crypt", cipherMech : "symm", cipherName : "RC2-CBC", length : 128});
csafe_asn1_impl_AlgorithmID.rc4 = new csafe_asn1_impl_AlgorithmID("1.2.840.113549.3.4","RC4",{ id : "RC4", procMech : "crypt", cipherMech : "symm", cipherName : "RC4-CBC", length : 128});
csafe_asn1_impl_AlgorithmID.has160 = new csafe_asn1_impl_AlgorithmID("1.2.410.200004.1.2","HAS160",{ id : "HAS160", procMech : "hash", hashName : "HAS160"});
csafe_asn1_impl_AlgorithmID.md5 = new csafe_asn1_impl_AlgorithmID("1.2.840.113549.2.5","MD5",{ id : "MD5", procMech : "hash", hashName : "MD5"});
csafe_asn1_impl_AlgorithmID.sha1 = new csafe_asn1_impl_AlgorithmID("1.3.14.3.2.26","SHA",{ id : "SHA1", procMech : "hash", hashName : "SHA-1"});
csafe_asn1_impl_AlgorithmID.sha256 = new csafe_asn1_impl_AlgorithmID("2.16.840.1.101.3.4.2.1","SHA256",{ id : "SHA256", procMech : "hash", hashName : "SHA-256"});
csafe_asn1_impl_AlgorithmID.sha384 = new csafe_asn1_impl_AlgorithmID("2.16.840.1.101.3.4.2.2","SHA384",{ id : "SHA384", procMech : "hash", hashName : "SHA-384"});
csafe_asn1_impl_AlgorithmID.sha512 = new csafe_asn1_impl_AlgorithmID("2.16.840.1.101.3.4.2.3","SHA512",{ id : "SHA512", procMech : "hash", hashName : "SHA-512"});
csafe_asn1_impl_AlgorithmID.md5WithRSAEncryption = new csafe_asn1_impl_AlgorithmID("1.2.840.113549.1.1.4","MD5WithRSA Encryption",{ id : "MD5withRSA", procMech : "sign", cipherMech : "asymm", cipherName : "RSA", hashName : "MD5"});
csafe_asn1_impl_AlgorithmID.sha1WithRSAEncryption = new csafe_asn1_impl_AlgorithmID("1.2.840.113549.1.1.5","SHA1withRSA Encryption",{ id : "SHA1withRSA", procMech : "sign", cipherMech : "asymm", signName : "RSASSA-PKCS1-v1_5", cipherName : "RSA", hashName : "SHA-1"});
csafe_asn1_impl_AlgorithmID.shaWithRSAEncryption = new csafe_asn1_impl_AlgorithmID("1.3.14.3.2.29","SHA1withRSA Encryption",{ id : "SHA1withRSA", procMech : "sign", cipherMech : "asymm", signName : "RSASSA-PKCS1-v1_5", cipherName : "RSA", hashName : "SHA-1"});
csafe_asn1_impl_AlgorithmID.rsaPSS = new csafe_asn1_impl_AlgorithmID("1.2.840.113549.1.1.10","RSA-PSS",{ id : "RSA-PSS", procMech : "sign", cipherMech : "asymm", signName : "RSA-PSS", cipherName : "RSA", hashName : "SHA-256"});
csafe_asn1_impl_AlgorithmID.sha256WithRSAEncryption = new csafe_asn1_impl_AlgorithmID("1.2.840.113549.1.1.11","SHA256withRSAEncryption",{ id : "SHA256withRSA", procMech : "sign", cipherMech : "asymm", signName : "RSASSA-PKCS1-v1_5", cipherName : "RSA", hashName : "SHA-256"});
csafe_asn1_impl_AlgorithmID.sha384WithRSAEncryption = new csafe_asn1_impl_AlgorithmID("1.2.840.113549.1.1.12","SHA384withRSAEncryption",{ id : "SHA384withRSA", procMech : "sign", cipherMech : "asymm", signName : "RSASSA-PKCS1-v1_5", cipherName : "RSA", hashName : "SHA-384"});
csafe_asn1_impl_AlgorithmID.sha512WithRSAEncryption = new csafe_asn1_impl_AlgorithmID("1.2.840.113549.1.1.13","SHA512withRSAEncryption",{ id : "SHA512withRSA", procMech : "sign", cipherMech : "asymm", signName : "RSASSA-PKCS1-v1_5", cipherName : "RSA", hashName : "SHA-512"});
csafe_asn1_impl_AlgorithmID.pbes2 = new csafe_asn1_impl_AlgorithmID("1.2.840.113549.1.5.13","PBES2","PBES2");
csafe_asn1_impl_AlgorithmID.pbkdf2 = new csafe_asn1_impl_AlgorithmID("1.2.840.113549.1.5.12","PBKDF2","PBKDF2");
csafe_asn1_impl_AlgorithmID.pbeWithMD2AndDES_CBC = new csafe_asn1_impl_AlgorithmID("1.2.840.113549.1.5.1","PBEwithMD2andDES-CBC",{ id : "PBEwithMD2andDES-CBC", procMech : "crypt", cipherMech : "symm", cipherName : "PBEwithMD2andDES-CBC"});
csafe_asn1_impl_AlgorithmID.pbeWithMD5AndDES_CBC = new csafe_asn1_impl_AlgorithmID("1.2.840.113549.1.5.3","PBEwithMD5andDES-CBC",{ id : "PBEWithMD5AndDES", procMech : "crypt", cipherMech : "symm", cipherName : "PBEWithMD5AndDES"});
csafe_asn1_impl_AlgorithmID.pbeWithHAS160AndSEED_CBC = new csafe_asn1_impl_AlgorithmID("1.2.410.200004.13.1.5","PBEwithHAS160andSEED-CBC",{ id : "PBEWithHAS160AndSEED", procMech : "crypt", cipherMech : "symm", cipherName : "SEED-CBC"});
csafe_asn1_impl_AlgorithmID.pbeWithSHA1AndSEED_CBC = new csafe_asn1_impl_AlgorithmID("1.2.410.200004.1.15","PBEwithSHA1andSEED-CBC",{ id : "PBEwithSHA1andSEED-CBC", procMech : "crypt", cipherMech : "symm", cipherName : "SEED-CBC", length : 128});
csafe_asn1_impl_AlgorithmID.pbeWithSHA1AndSEED_CBC_SG = new csafe_asn1_impl_AlgorithmID("1.2.410.200004.1.15.1","PBEwithSHA1andSEED-CBC-SG",{ id : "PBEwithSHA1andSEED-CBC", procMech : "crypt", cipherMech : "symm", cipherName : "SEED-CBC"});
csafe_asn1_impl_AlgorithmID.pkcs12PbeIds = new csafe_asn1_impl_AlgorithmID("1.2.840.113549.1.12.1","pkcs12PbeIds","pkcs12PbeIds");
csafe_asn1_impl_AlgorithmID.pbeWithSHAAnd128BitRC4 = new csafe_asn1_impl_AlgorithmID("1.2.840.113549.1.12.1.1","pbeWithSHAAnd128BitRC4",{ id : "PBEwithSHA1andRC4-128-CBC", procMech : "crypt", cipherMech : "symm", cipherName : "RC4-CBC", length : 128});
csafe_asn1_impl_AlgorithmID.pbeWithSHAAnd40BitRC4 = new csafe_asn1_impl_AlgorithmID("1.2.840.113549.1.12.1.2","pbeWithSHAAnd40BitRC4",{ id : "PBEwithSHA1andRC4-40-CBC", procMech : "crypt", cipherMech : "symm", cipherName : "RC4-CBC", length : 40});
csafe_asn1_impl_AlgorithmID.pbeWithSHAAnd3_KeyTripleDES_CBC = new csafe_asn1_impl_AlgorithmID("1.2.840.113549.1.12.1.3","PBEwithSHAand3_KeyTripleDES-CBC",{ id : "PBEwithSHAand3_KeyTripleDES-CBC", procMech : "crypt", cipherMech : "symm", cipherName : "3DES-CBC", length : 192});
csafe_asn1_impl_AlgorithmID.pbeWithSHAAnd2_KeyTripleDES_CBC = new csafe_asn1_impl_AlgorithmID("1.2.840.113549.1.12.1.4","pbeWithSHAAnd2_KeyTripleDES_CBC",{ id : "PBEwithSHAand2_KeyTripleDES-CBC", procMech : "crypt", cipherMech : "symm", cipherName : "3DES-CBC", length : 128});
csafe_asn1_impl_AlgorithmID.pbeWithSHAAnd128BitRC2_CBC = new csafe_asn1_impl_AlgorithmID("1.2.840.113549.1.12.1.5",null,{ id : "PBEwithSHA1andRC2-128-CBC", procMech : "crypt", cipherMech : "symm", cipherName : "RC2-CBC", length : 128});
csafe_asn1_impl_AlgorithmID.pbeWithSHAAnd40BitRC2_CBC = new csafe_asn1_impl_AlgorithmID("1.2.840.113549.1.12.1.6",null,{ id : "PBEwithSHA1andRC2-40-CBC", procMech : "crypt", cipherMech : "symm", cipherName : "RC2-CBC", length : 40});
csafe_asn1_impl_AlgorithmID.hmacSHA1 = new csafe_asn1_impl_AlgorithmID("1.3.6.1.5.5.8.1.2",null,{ id : "HmacSHA1", procMech : "hmac", hashName : "SHA-1"});
csafe_asn1_impl_AlgorithmID.hmacSHA256 = new csafe_asn1_impl_AlgorithmID("1.2.840.113549.2.9",null,{ id : "HmacSHA256", procMech : "hmac", hashName : "SHA-256"});
csafe_asn1_impl_AlgorithmID.PBEtricMAC = new csafe_asn1_impl_AlgorithmID("1.3.14.3.2.10",null,{ id : "PBEtriMAC", procMech : "pbmac", hashName : "SHA-1"});
csafe_asn1_impl_Attribute.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().ObjectIdentifier("attributeType").SETOF("attributes").ANY("attributeValue").build(csafe_asn1_impl_Attribute);
csafe_asn1_impl_ChoiceOfTime.struct = new csafe_asn1_ASN1TypeBuilder().CHOICE().UTCTime().GeneralizedTime().CLOSE().build(csafe_asn1_impl_ChoiceOfTime);
csafe_asn1_impl_DisplayText.struct = new csafe_asn1_ASN1TypeBuilder().CHOICE().IA5String().VisibleString().UNIString().UTF8String().build(csafe_asn1_impl_DisplayText);
csafe_asn1_impl_OtherName.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().ObjectIdentifier("type_id").ContextSpecific().ANY("value").build(csafe_asn1_impl_OtherName);
csafe_asn1_impl_RDN.struct = new csafe_asn1_ASN1TypeBuilder().SETOF("rdn").Import(null,csafe_asn1_impl_AVA.struct).build(csafe_asn1_impl_RDN);
csafe_asn1_impl_Name.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCEOF().Import(null,csafe_asn1_impl_RDN.struct).build(csafe_asn1_impl_Name);
csafe_asn1_impl_GeneralName.struct = new csafe_asn1_ASN1TypeBuilder().CHOICE().ContextSpecific(null,csafe_asn1_ASN1.IMPLICIT).Import(null,csafe_asn1_impl_OtherName.struct).ContextSpecific(null,csafe_asn1_ASN1.IMPLICIT).IA5String().ContextSpecific(null,csafe_asn1_ASN1.IMPLICIT).IA5String().ContextSpecific().ANY().ContextSpecific().Import(null,csafe_asn1_impl_Name.struct).ContextSpecific().ANY().ContextSpecific(null,csafe_asn1_ASN1.IMPLICIT).IA5String().ContextSpecific(null,csafe_asn1_ASN1.IMPLICIT).OCTET_STRING().ContextSpecific(null,csafe_asn1_ASN1.IMPLICIT).ObjectIdentifier().build(csafe_asn1_impl_GeneralName);
csafe_asn1_impl_GeneralName.names = ["OtherName","RFC822 Name","DNS Name","X.400 Address","Directory Name","EDI Party Name","URI","IP Address","Registered ID"];
csafe_asn1_impl_GeneralNames.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCEOF().Import(null,csafe_asn1_impl_GeneralName.struct).build(csafe_asn1_impl_GeneralNames);
csafe_asn1_impl_DistributionPoint.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCEOF().ContextSpecific(null,csafe_asn1_ASN1.OPTIONAL).CHOICE("distributionPoint").ContextSpecific(null,csafe_asn1_ASN1.IMPLICIT).Import("fullName",csafe_asn1_impl_GeneralNames.struct).ContextSpecific().Import("nameRelativeToCRLIssuer",csafe_asn1_impl_RDN.struct).CLOSE().ContextSpecific(null,csafe_asn1_ASN1.OPTIONAL).BIT_STRING("reasons").ContextSpecific(null,csafe_asn1_ASN1.OPTIONAL).Import("cRLIssuer",csafe_asn1_impl_GeneralNames.struct).build(csafe_asn1_impl_DistributionPoint);
csafe_asn1_impl_DistributionPoint.reasonStrings = ["unused","keyCompromise","cACompromise","affiliationChanged","superseded","cessationOfOperation","certificateHold","privilegeWithdrawn","aACompromise"];
csafe_asn1_impl_IssuerAndSerialNumber.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().Import("issuerDN",csafe_asn1_impl_Name.struct).INTEGER("serialNumber").build(csafe_asn1_impl_IssuerAndSerialNumber);
csafe_asn1_impl_NoticeReference.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().Import("organization",csafe_asn1_impl_DisplayText.struct).SEQUENCEOF("noticeNumbers").INTEGER("noticeNumber").build(csafe_asn1_impl_NoticeReference);
csafe_asn1_impl_PolicyQualifierInfo.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().ObjectIdentifier("policyQualifierId").ANY("qualifier").build(csafe_asn1_impl_PolicyQualifierInfo);
csafe_asn1_impl_PolicyInformation.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().ObjectIdentifier("policyIdentifier").SEQUENCEOF("policyQualifiers",csafe_asn1_ASN1.OPTIONAL).Import(null,csafe_asn1_impl_PolicyQualifierInfo.struct).CLOSE().build(csafe_asn1_impl_PolicyInformation);
csafe_asn1_impl_UserNotice.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().Import("noticeRef",csafe_asn1_impl_NoticeReference.struct,true).Import("explicitText",csafe_asn1_impl_DisplayText.struct,true).build(csafe_asn1_impl_UserNotice);
csafe_asn1_impl_Validity.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().CHOICE("notBefore").UTCTime().GeneralizedTime().CLOSE().CHOICE("notAfter").UTCTime().GeneralizedTime().CLOSE().build(csafe_asn1_impl_Validity);
csafe_asn1_kospec_VID.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().Import("hashAlgorithm",csafe_asn1_impl_AlgorithmID.struct).ContextSpecific().OCTET_STRING("virtualID").build(csafe_asn1_kospec_VID);
csafe_asn1_kospec_EncryptContent.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().Import("vid",csafe_asn1_kospec_VID.struct).BIT_STRING("randomNum").build(csafe_asn1_kospec_EncryptContent);
csafe_asn1_kospec_EncryptedVID.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().ContextSpecific().INTEGER("version").ContextSpecific(null,csafe_asn1_ASN1.OPTIONAL).Import("vidHashAlg",csafe_asn1_impl_AlgorithmID.struct).ContextSpecific(null,csafe_asn1_ASN1.OPTIONAL).Import("vidEncAlg",csafe_asn1_impl_AlgorithmID.struct).ContextSpecific().Import("certID",csafe_asn1_impl_IssuerAndSerialNumber.struct).ContextSpecific().OCTET_STRING("encryptedContent").build(csafe_asn1_kospec_EncryptedVID);
csafe_asn1_kospec_HashContent.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().PrintableString("idn").BIT_STRING("randomNum").build(csafe_asn1_kospec_HashContent);
csafe_cmp_CMPContext.CMP1999 = 1;
csafe_cmp_CMPContext.CMP2000 = 2;
csafe_cmp_Controls.regToken = new csafe_asn1_ObjectID("1.3.6.1.5.5.7.5.1.1");
csafe_cmp_Controls.authenticator = new csafe_asn1_ObjectID("1.3.6.1.5.5.7.5.1.2");
csafe_cmp_Controls.pkiPublicationInfo = new csafe_asn1_ObjectID("1.3.6.1.5.5.7.5.1.3");
csafe_cmp_Controls.pkiArchiveOptions = new csafe_asn1_ObjectID("1.3.6.1.5.5.7.5.1.4");
csafe_cmp_Controls.oldCertID = new csafe_asn1_ObjectID("1.3.6.1.5.5.7.5.1.5");
csafe_cmp_Controls.protocolEncrKey = new csafe_asn1_ObjectID("1.3.6.1.5.5.7.5.1.6");
csafe_cmp_Controls.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCEOF().Import(null,csafe_asn1_impl_AVA.struct).build(csafe_cmp_Controls);
csafe_cmp_PKIFreeText.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCEOF().UTF8String().build(csafe_cmp_PKIFreeText);
csafe_cmp_PKIStatusInfo.status_accepted = 0;
csafe_cmp_PKIStatusInfo.status_grantedWithMods = 1;
csafe_cmp_PKIStatusInfo.status_rejection = 2;
csafe_cmp_PKIStatusInfo.status_waiting = 3;
csafe_cmp_PKIStatusInfo.status_revocationWarning = 4;
csafe_cmp_PKIStatusInfo.status_revocationNotification = 5;
csafe_cmp_PKIStatusInfo.status_keyUpdateWarning = 6;
csafe_cmp_PKIStatusInfo.badAlg = 0;
csafe_cmp_PKIStatusInfo.badMessageCheck = 1;
csafe_cmp_PKIStatusInfo.badRequest = 2;
csafe_cmp_PKIStatusInfo.badTime = 3;
csafe_cmp_PKIStatusInfo.badCertId = 4;
csafe_cmp_PKIStatusInfo.badDataFormat = 5;
csafe_cmp_PKIStatusInfo.wrongAuthority = 6;
csafe_cmp_PKIStatusInfo.incorrectData = 7;
csafe_cmp_PKIStatusInfo.missingTimeStamp = 8;
csafe_cmp_PKIStatusInfo.badPOP = 9;
csafe_cmp_PKIStatusInfo.certRevoked = 10;
csafe_cmp_PKIStatusInfo.certConfirmed = 11;
csafe_cmp_PKIStatusInfo.wrongIntegrity = 12;
csafe_cmp_PKIStatusInfo.badRecipientNonce = 13;
csafe_cmp_PKIStatusInfo.timeNotAvailable = 14;
csafe_cmp_PKIStatusInfo.unacceptedPolicy = 15;
csafe_cmp_PKIStatusInfo.unacceptedExtension = 16;
csafe_cmp_PKIStatusInfo.addInfoNotAvailable = 17;
csafe_cmp_PKIStatusInfo.badSenderNonce = 18;
csafe_cmp_PKIStatusInfo.badCertTemplate = 19;
csafe_cmp_PKIStatusInfo.signerNotTrusted = 20;
csafe_cmp_PKIStatusInfo.transactionIdInUse = 21;
csafe_cmp_PKIStatusInfo.unsupportedVersion = 22;
csafe_cmp_PKIStatusInfo.notAuthorized = 23;
csafe_cmp_PKIStatusInfo.systemUnavail = 24;
csafe_cmp_PKIStatusInfo.systemFailure = 25;
csafe_cmp_PKIStatusInfo.duplicateCertReq = 26;
csafe_cmp_PKIStatusInfo.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().INTEGER("status").Import("statusString",csafe_cmp_PKIFreeText.struct,true).BIT_STRING("failInfo",csafe_asn1_ASN1.OPTIONAL).build(csafe_cmp_PKIStatusInfo);
csafe_cmp_ErrorMsgContent.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().Import("pkiStatusInfo",csafe_cmp_PKIStatusInfo.struct).INTEGER("errorCode",csafe_asn1_ASN1.OPTIONAL).Import("errorDetails",csafe_cmp_PKIFreeText.struct,true).build(csafe_cmp_ErrorMsgContent);
csafe_cmp_InfoTypeAndValue.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().ObjectIdentifier("type").ANY("value",csafe_asn1_ASN1.OPTIONAL).build(csafe_cmp_InfoTypeAndValue);
csafe_cmp_GenMsgContent.CAProtEncCert = new csafe_asn1_ObjectID("1.3.6.1.5.5.7.4.1","CAProtEncCert");
csafe_cmp_GenMsgContent.SignKeyPairTypes = new csafe_asn1_ObjectID("1.3.6.1.5.5.7.4.2","SignKeyPairTypes");
csafe_cmp_GenMsgContent.EncKeyPairTypes = new csafe_asn1_ObjectID("1.3.6.1.5.5.7.4.3","EncKeyPairTypes");
csafe_cmp_GenMsgContent.PreferredSymmAlg = new csafe_asn1_ObjectID("1.3.6.1.5.5.7.4.4","PreferredSymmAlg");
csafe_cmp_GenMsgContent.CAKeyUpdateInfo = new csafe_asn1_ObjectID("1.3.6.1.5.5.7.4.5","CAKeyUpdateInfo");
csafe_cmp_GenMsgContent.CurrentCRL = new csafe_asn1_ObjectID("1.3.6.1.5.5.7.4.6","CurrentCRL");
csafe_cmp_GenMsgContent.UnsupportedObjectIdentifier = new csafe_asn1_ObjectID("1.3.6.1.5.5.7.4.7","UnsupportedObjectIdentifier");
csafe_cmp_GenMsgContent.KeyPairParametersRequest = new csafe_asn1_ObjectID("1.3.6.1.5.5.7.4.10","KeyPairParametersRequest");
csafe_cmp_GenMsgContent.KeyPairParametersResponse = new csafe_asn1_ObjectID("1.3.6.1.5.5.7.4.11","KeyPairParametersResponse");
csafe_cmp_GenMsgContent.RevocationPassphrase = new csafe_asn1_ObjectID("1.3.6.1.5.5.7.4.12","RevocationPassphrase");
csafe_cmp_GenMsgContent.ImplicitConfirm = new csafe_asn1_ObjectID("1.3.6.1.5.5.7.4.13","ImplicitConfirm");
csafe_cmp_GenMsgContent.ConfirmWaitTime = new csafe_asn1_ObjectID("1.3.6.1.5.5.7.4.14","ConfirmWaitTime");
csafe_cmp_GenMsgContent.OriginalPKIMessage = new csafe_asn1_ObjectID("1.3.6.1.5.5.7.4.15","OriginalPKIMessage");
csafe_cmp_GenMsgContent.SupportedLanguageTags = new csafe_asn1_ObjectID("1.3.6.1.5.5.7.4.16","SupportedLanguageTags");
csafe_cmp_GenMsgContent.KCMPEncCert = new csafe_asn1_ObjectID("1.2.410.200005.1.10.1","KCMPEncCert");
csafe_cmp_GenMsgContent.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCEOF().Import(null,csafe_cmp_InfoTypeAndValue.struct,true).build(csafe_cmp_GenMsgContent);
csafe_cmp_PBMParameter.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().OCTET_STRING("salt").Import("owf",csafe_asn1_impl_AlgorithmID.struct).INTEGER("iteration").Import("mac",csafe_asn1_impl_AlgorithmID.struct).build(csafe_cmp_PBMParameter);
csafe_x509_X509PublicKeyInfo.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().Import("algorithm",csafe_asn1_impl_AlgorithmID.struct).BIT_STRING("publicKey").build(csafe_x509_X509PublicKeyInfo);
csafe_x509_X509Extension.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().ObjectIdentifier("extnID").BOOLEAN("critical",csafe_asn1_ASN1.OPTIONAL).OCTET_STRING("extnValue").build(csafe_x509_X509Extension);
csafe_x509_X509Extension.extMap = new haxe_ds_StringMap();
csafe_cmp_crmf_CertTemplate.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().ContextSpecific(null,csafe_asn1_ASN1.OPTIONAL).INTEGER("version").ContextSpecific(null,csafe_asn1_ASN1.OPTIONAL).INTEGER("serialNumber").ContextSpecific(null,csafe_asn1_ASN1.OPTIONAL).Import("signature",csafe_asn1_impl_AlgorithmID.struct).ContextSpecific(null,csafe_asn1_ASN1.OPTIONAL).Import("issuer",csafe_asn1_impl_Name.struct).ContextSpecific(null,csafe_asn1_ASN1.OPTIONAL).Import("validity",csafe_asn1_impl_Validity.struct).ContextSpecific(null,csafe_asn1_ASN1.OPTIONAL).Import("subject",csafe_asn1_impl_Name.struct).ContextSpecific(null,csafe_asn1_ASN1.OPTIONAL | csafe_asn1_ASN1.IMPLICIT).Import("subjectPublicKeyInfo",csafe_x509_X509PublicKeyInfo.struct).ContextSpecific(null,csafe_asn1_ASN1.OPTIONAL).BIT_STRING("issuerUniqueID").ContextSpecific(null,csafe_asn1_ASN1.OPTIONAL).BIT_STRING("subjectUniqueID").ContextSpecific(null,csafe_asn1_ASN1.OPTIONAL).SEQUENCEOF("extensions").Import(null,csafe_x509_X509Extension.struct).CLOSE().build(csafe_cmp_crmf_CertTemplate);
csafe_cmp_crmf_CertRequest.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().INTEGER("certReqId").Import("certTemplate",csafe_cmp_crmf_CertTemplate.struct).Import("controls",csafe_cmp_Controls.struct,true).build(csafe_cmp_crmf_CertRequest);
csafe_cmp_crmf_PKMACValue.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().Import("mAlg",csafe_asn1_impl_AlgorithmID.struct).BIT_STRING("value").build(csafe_cmp_crmf_PKMACValue);
csafe_cmp_crmf_POPOSigningKeyInput.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().CHOICE("authInfo").ContextSpecific().Import(null,csafe_asn1_impl_GeneralName.struct).Import(null,csafe_cmp_crmf_PKMACValue.struct).CLOSE().Import("publicKey",csafe_x509_X509PublicKeyInfo.struct).build(csafe_cmp_crmf_POPOSigningKeyInput);
csafe_cmp_crmf_POPOSigningKey.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().ContextSpecific(null,csafe_asn1_ASN1.OPTIONAL | csafe_asn1_ASN1.IMPLICIT).Import("poposkInput",csafe_cmp_crmf_POPOSigningKeyInput.struct).Import("algorithmIdentifier",csafe_asn1_impl_AlgorithmID.struct).BIT_STRING("signature").build(csafe_cmp_crmf_POPOSigningKey);
csafe_cmp_crmf_POPOPrivKey.struct = new csafe_asn1_ASN1TypeBuilder().CHOICE().ContextSpecific("thisMessage").BIT_STRING().ContextSpecific("subsequentMessage").ANY().ContextSpecific("dhMAC").BIT_STRING().ContextSpecific("agreeMAC").Import(null,csafe_cmp_crmf_PKMACValue.struct).ContextSpecific("encryptedKey").ANY().build(csafe_cmp_crmf_POPOPrivKey);
csafe_cmp_crmf_ProofOfPossession.struct = new csafe_asn1_ASN1TypeBuilder().CHOICE().ContextSpecific().NULL().ContextSpecific(null,csafe_asn1_ASN1.IMPLICIT).Import("popoSign",csafe_cmp_crmf_POPOSigningKey.struct).ContextSpecific(null,csafe_asn1_ASN1.IMPLICIT).Import("popoPriv",csafe_cmp_crmf_POPOPrivKey.struct).build(csafe_cmp_crmf_ProofOfPossession);
csafe_cmp_crmf_CertReqMessage.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().Import("certRequest",csafe_cmp_crmf_CertRequest.struct).Import("popo",csafe_cmp_crmf_ProofOfPossession.struct).SEQUENCEOF("regInfo",csafe_asn1_ASN1.OPTIONAL).Import(null,csafe_asn1_impl_AVA.struct).build(csafe_cmp_crmf_CertReqMessage);
csafe_cmp_crmf_CertReqMessages.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCEOF().Import(null,csafe_cmp_crmf_CertReqMessage.struct).build(csafe_cmp_crmf_CertReqMessages);
csafe_x509_X509Certificate.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().SEQUENCE("tbsCertificate").ContextSpecific(null,csafe_asn1_ASN1.OPTIONAL).INTEGER("version").INTEGER("serialNumber").Import("signature",csafe_asn1_impl_AlgorithmID.struct).Import("issuer",csafe_asn1_impl_Name.struct).Import("validity",csafe_asn1_impl_Validity.struct).Import("subject",csafe_asn1_impl_Name.struct).Import("subjectPublicKeyInfo",csafe_x509_X509PublicKeyInfo.struct).ContextSpecific(null,csafe_asn1_ASN1.OPTIONAL | csafe_asn1_ASN1.IMPLICIT).BIT_STRING("issuerUniqueID").ContextSpecific(null,csafe_asn1_ASN1.OPTIONAL | csafe_asn1_ASN1.IMPLICIT).BIT_STRING("subjectUniqueID").ContextSpecific(null,csafe_asn1_ASN1.OPTIONAL).SEQUENCEOF("extensions").Import(null,csafe_x509_X509Extension.struct).CLOSE().CLOSE().Import("signatureAlgorithm",csafe_asn1_impl_AlgorithmID.struct).BIT_STRING("signatureValue").build(csafe_x509_X509Certificate);
csafe_cmp_crmf_EncryptedValue.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().ContextSpecific(null,csafe_asn1_ASN1.OPTIONAL).Import("intendedAlg",csafe_asn1_impl_AlgorithmID.struct).ContextSpecific(null,csafe_asn1_ASN1.OPTIONAL).Import("symmAlg",csafe_asn1_impl_AlgorithmID.struct).ContextSpecific(null,csafe_asn1_ASN1.OPTIONAL).BIT_STRING("encSymmKey").ContextSpecific(null,csafe_asn1_ASN1.OPTIONAL).Import("keyAlg",csafe_asn1_impl_AlgorithmID.struct).ContextSpecific(null,csafe_asn1_ASN1.OPTIONAL).OCTET_STRING("valueHint").BIT_STRING().build(csafe_cmp_crmf_EncryptedValue);
csafe_cmp_crmf_CertOrEncCert.struct = new csafe_asn1_ASN1TypeBuilder().CHOICE().ContextSpecific().Import("certificate",csafe_x509_X509Certificate.struct).ContextSpecific().Import("encryptedCert",csafe_cmp_crmf_EncryptedValue.struct).build(csafe_cmp_crmf_CertOrEncCert);
csafe_cmp_crmf_SinglePubInfo.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().INTEGER("pubMethod").Import("pubLocation",csafe_asn1_impl_GeneralName.struct).build(csafe_cmp_crmf_SinglePubInfo);
csafe_cmp_crmf_PKIPublicationInfo.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().INTEGER("action").SEQUENCEOF("pubInfos",csafe_asn1_ASN1.OPTIONAL).Import(null,csafe_cmp_crmf_SinglePubInfo.struct).build(csafe_cmp_crmf_PKIPublicationInfo);
csafe_cmp_crmf_CertifiedKeyPair.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().Import("certOrEncCert",csafe_cmp_crmf_CertOrEncCert.struct).ContextSpecific("privateKey",csafe_asn1_ASN1.OPTIONAL).Import("privateKey",csafe_cmp_crmf_EncryptedValue.struct).ContextSpecific("publicationInfo",csafe_asn1_ASN1.OPTIONAL).Import(null,csafe_cmp_crmf_PKIPublicationInfo.struct).build(csafe_cmp_crmf_CertifiedKeyPair);
csafe_cmp_crmf_CertResponse.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().INTEGER("certReqId").Import("status",csafe_cmp_PKIStatusInfo.struct).Import("certifiedKeyPair",csafe_cmp_crmf_CertifiedKeyPair.struct,true).OCTET_STRING("rspInfo",csafe_asn1_ASN1.OPTIONAL).build(csafe_cmp_crmf_CertResponse);
csafe_cmp_crmf_CertRepMessage.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().ContextSpecific(null,csafe_asn1_ASN1.OPTIONAL,1).SEQUENCEOF("caPubs",csafe_asn1_ASN1.OPTIONAL).Import(null,csafe_x509_X509Certificate.struct).CLOSE().SEQUENCEOF("response").Import(null,csafe_cmp_crmf_CertResponse.struct).CLOSE().build(csafe_cmp_crmf_CertRepMessage);
csafe_cmp_PKIBody.ir = 0;
csafe_cmp_PKIBody.ip = 1;
csafe_cmp_PKIBody.cr = 2;
csafe_cmp_PKIBody.cp = 3;
csafe_cmp_PKIBody.p10cr = 4;
csafe_cmp_PKIBody.popdecc = 5;
csafe_cmp_PKIBody.popdecr = 6;
csafe_cmp_PKIBody.kur = 7;
csafe_cmp_PKIBody.kup = 8;
csafe_cmp_PKIBody.krr = 9;
csafe_cmp_PKIBody.krp = 10;
csafe_cmp_PKIBody.rr = 11;
csafe_cmp_PKIBody.rp = 12;
csafe_cmp_PKIBody.ccr = 13;
csafe_cmp_PKIBody.ccp = 14;
csafe_cmp_PKIBody.ckuann = 15;
csafe_cmp_PKIBody.cann = 16;
csafe_cmp_PKIBody.rann = 17;
csafe_cmp_PKIBody.crlann = 18;
csafe_cmp_PKIBody.pkiconf = 19;
csafe_cmp_PKIBody.nested = 20;
csafe_cmp_PKIBody.genm = 21;
csafe_cmp_PKIBody.genp = 22;
csafe_cmp_PKIBody.error = 23;
csafe_cmp_PKIBody.certConf = 24;
csafe_cmp_PKIBody.pollReq = 25;
csafe_cmp_PKIBody.pollRep = 26;
csafe_cmp_PKIBody.struct = new csafe_asn1_ASN1TypeBuilder().CHOICE().ContextSpecific().Import(null,csafe_cmp_crmf_CertReqMessages.struct).ContextSpecific().Import(null,csafe_cmp_crmf_CertRepMessage.struct).ContextSpecific().ANY().ContextSpecific().ANY().ContextSpecific().ANY().ContextSpecific().ANY().ContextSpecific().ANY().ContextSpecific().Import(null,csafe_cmp_crmf_CertReqMessages.struct).ContextSpecific().Import(null,csafe_cmp_crmf_CertRepMessage.struct).ContextSpecific().ANY().ContextSpecific().ANY().ContextSpecific().ANY().ContextSpecific().ANY().ContextSpecific().ANY().ContextSpecific().ANY().ContextSpecific().ANY().ContextSpecific().ANY().ContextSpecific().ANY().ContextSpecific().ANY().ContextSpecific().NULL().ContextSpecific().ANY().ContextSpecific().Import(null,csafe_cmp_GenMsgContent.struct).ContextSpecific().Import(null,csafe_cmp_GenMsgContent.struct).ContextSpecific().Import(null,csafe_cmp_ErrorMsgContent.struct).ContextSpecific().ANY().ContextSpecific().ANY().ContextSpecific().ANY().build(csafe_cmp_PKIBody);
csafe_cmp_PKIHeader.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().INTEGER("version").Import("sender",csafe_asn1_impl_GeneralName.struct).Import("recipient",csafe_asn1_impl_GeneralName.struct).ContextSpecific(null,csafe_asn1_ASN1.OPTIONAL).GeneralizedTime("messageTime").ContextSpecific(null,csafe_asn1_ASN1.OPTIONAL).Import("protectionAlg",csafe_asn1_impl_AlgorithmID.struct).ContextSpecific(null,csafe_asn1_ASN1.OPTIONAL).OCTET_STRING("senderKID").ContextSpecific(null,csafe_asn1_ASN1.OPTIONAL).OCTET_STRING("recipKID").ContextSpecific(null,csafe_asn1_ASN1.OPTIONAL).OCTET_STRING("transactionID").ContextSpecific(null,csafe_asn1_ASN1.OPTIONAL).OCTET_STRING("senderNonce").ContextSpecific(null,csafe_asn1_ASN1.OPTIONAL).OCTET_STRING("recipNonce").ContextSpecific(null,csafe_asn1_ASN1.OPTIONAL).Import("freeText",csafe_cmp_PKIFreeText.struct).ContextSpecific(null,csafe_asn1_ASN1.OPTIONAL).SEQUENCEOF("generalInfo").Import(null,csafe_cmp_InfoTypeAndValue.struct).CLOSE().build(csafe_cmp_PKIHeader);
csafe_cmp_PKIMessage.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().Import("header",csafe_cmp_PKIHeader.struct).Import("body",csafe_cmp_PKIBody.struct).ContextSpecific(null,csafe_asn1_ASN1.OPTIONAL).BIT_STRING("protection").ContextSpecific(null,csafe_asn1_ASN1.OPTIONAL).SEQUENCEOF("extraCerts").Import(null,csafe_x509_X509Certificate.struct).build(csafe_cmp_PKIMessage);
csafe_cmp_crmf_CertID.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().Import("issuer",csafe_asn1_impl_GeneralName.struct).INTEGER("serialNumber").build(csafe_cmp_crmf_CertID);
csafe_cmp_transport_CMPMessage.V_RFC2510 = 0;
csafe_cmp_transport_CMPMessage.V_PKIX_DRAFT = 16;
csafe_cmp_transport_CMPMessage.OPT_CLOSE_CONN = 1;
csafe_cmp_transport_CMPMessage.pkiMsg = 0;
csafe_cmp_transport_CMPMessage.pkiReq = 0;
csafe_cmp_transport_CMPMessage.pollRep = 1;
csafe_cmp_transport_CMPMessage.pollReq = 2;
csafe_cmp_transport_CMPMessage.negPollRep = 3;
csafe_cmp_transport_CMPMessage.finalRep = 3;
csafe_cmp_transport_CMPMessage.partRep = 4;
csafe_cmp_transport_CMPMessage.pkiRep = 5;
csafe_cmp_transport_CMPMessage.finalPkiRep = 5;
csafe_cmp_transport_CMPMessage.errorRep = 6;
csafe_crypto_Cipher.ENCRYPT = csafe_crypto_cipher_CipherDirection.ENCRYPT;
csafe_crypto_Cipher.DECRYPT = csafe_crypto_cipher_CipherDirection.DECRYPT;
csafe_crypto_cipher_asymm_rsa_RSA.generationCertainity = 1;
csafe_crypto_cipher_pbe_PBEParameters.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().OCTET_STRING("salt").INTEGER("iterationCount").build(csafe_crypto_cipher_pbe_PBEParameters);
csafe_crypto_cipher_pbe_PBES2.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().Import("derivationFunc",csafe_asn1_impl_AlgorithmID.struct).Import("encryptionScheme",csafe_asn1_impl_AlgorithmID.struct).build(csafe_crypto_cipher_pbe_PBES2);
csafe_crypto_cipher_pbe_PBEtriMac.iter = 2;
csafe_crypto_cipher_pbe_PBEtriMac.owf = csafe_asn1_impl_AlgorithmID.sha1;
csafe_crypto_cipher_pbe_PBEtriMac.salt = haxe_io_Bytes.ofString("aaaaabbbbb");
csafe_crypto_cipher_pbe_PBEtriMac.iv = new haxe_io_Bytes(new ArrayBuffer(8));
csafe_crypto_cipher_pbe_PBKDF2.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().CHOICE("salt").OCTET_STRING().Import(null,csafe_asn1_impl_AlgorithmID.struct).CLOSE().INTEGER("iterationCount").INTEGER("keyLength",csafe_asn1_ASN1.OPTIONAL).Import("prf",csafe_asn1_impl_AlgorithmID.struct,true).build(csafe_crypto_cipher_pbe_PBKDF2);
csafe_crypto_cipher_symm_Aes.AES_BLOCK_SIZE = 16;
csafe_crypto_cipher_symm_Aes.maxkc = 8;
csafe_crypto_cipher_symm_Aes.maxrk = 14;
csafe_crypto_cipher_symm_Aes.Rcon = [1,2,4,8,16,32,64,128,27,54,108,216,171,77,154,47,94,188,99,198,151,53,106,212,179,125,250,239,197,145];
csafe_crypto_cipher_symm_Aes.S = [99,124,119,123,242,107,111,197,48,1,103,43,254,215,171,118,202,130,201,125,250,89,71,240,173,212,162,175,156,164,114,192,183,253,147,38,54,63,247,204,52,165,229,241,113,216,49,21,4,199,35,195,24,150,5,154,7,18,128,226,235,39,178,117,9,131,44,26,27,110,90,160,82,59,214,179,41,227,47,132,83,209,0,237,32,252,177,91,106,203,190,57,74,76,88,207,208,239,170,251,67,77,51,133,69,249,2,127,80,60,159,168,81,163,64,143,146,157,56,245,188,182,218,33,16,255,243,210,205,12,19,236,95,151,68,23,196,167,126,61,100,93,25,115,96,129,79,220,34,42,144,136,70,238,184,20,222,94,11,219,224,50,58,10,73,6,36,92,194,211,172,98,145,149,228,121,231,200,55,109,141,213,78,169,108,86,244,234,101,122,174,8,186,120,37,46,28,166,180,198,232,221,116,31,75,189,139,138,112,62,181,102,72,3,246,14,97,53,87,185,134,193,29,158,225,248,152,17,105,217,142,148,155,30,135,233,206,85,40,223,140,161,137,13,191,230,66,104,65,153,45,15,176,84,187,22];
csafe_crypto_cipher_symm_Aes.S5 = [82,9,106,213,48,54,165,56,191,64,163,158,129,243,215,251,124,227,57,130,155,47,255,135,52,142,67,68,196,222,233,203,84,123,148,50,166,194,35,61,238,76,149,11,66,250,195,78,8,46,161,102,40,217,36,178,118,91,162,73,109,139,209,37,114,248,246,100,134,104,152,22,212,164,92,204,93,101,182,146,108,112,72,80,253,237,185,218,94,21,70,87,167,141,157,132,144,216,171,0,140,188,211,10,247,228,88,5,184,179,69,6,208,44,30,143,202,63,15,2,193,175,189,3,1,19,138,107,58,145,17,65,79,103,220,234,151,242,207,206,240,180,230,115,150,172,116,34,231,173,53,133,226,249,55,232,28,117,223,110,71,241,26,113,29,41,197,137,111,183,98,14,170,24,190,27,252,86,62,75,198,210,121,32,154,219,192,254,120,205,90,244,31,221,168,51,136,7,199,49,177,18,16,89,39,128,236,95,96,81,127,169,25,181,74,13,45,229,122,159,147,201,156,239,160,224,59,77,174,42,245,176,200,235,187,60,131,83,153,97,23,43,4,126,186,119,214,38,225,105,20,99,85,33,12,125];
csafe_crypto_cipher_symm_Aes.T1 = [-1520213050,-2072216328,-1720223762,-1921287178,234025727,-1117033514,-1318096930,1422247313,1345335392,50397442,-1452841010,2099981142,436141799,1658312629,-424957107,-1703512340,1170918031,-1652391393,1086966153,-2021818886,368769775,-346465870,-918075506,200339707,-324162239,1742001331,-39673249,-357585083,-1080255453,-140204973,-1770884380,1539358875,-1028147339,486407649,-1366060227,1780885068,1513502316,1094664062,49805301,1338821763,1546925160,-190470831,887481809,150073849,-1821281822,1943591083,1395732834,1058346282,201589768,1388824469,1696801606,1589887901,672667696,-1583966665,251987210,-1248159185,151455502,907153956,-1686077413,1038279391,652995533,1764173646,-843926913,-1619692054,453576978,-1635548387,1949051992,773462580,756751158,-1301385508,-296068428,-73359269,-162377052,1295727478,1641469623,-827083907,2066295122,1055122397,1898917726,-1752923117,-179088474,1758581177,0,753790401,1612718144,536673507,-927878791,-312779850,-1100322092,1187761037,-641810841,1262041458,-565556588,-733197160,-396863312,1255133061,1808847035,720367557,-441800113,385612781,-985447546,-682799718,1429418854,-1803188975,-817543798,284817897,100794884,-2122350594,-263171936,1144798328,-1163944155,-475486133,-212774494,-22830243,-1069531008,-1970303227,-1382903233,-1130521311,1211644016,83228145,-541279133,-1044990345,1977277103,1663115586,806359072,452984805,250868733,1842533055,1288555905,336333848,890442534,804056259,-513843266,-1567123659,-867941240,957814574,1472513171,-223893675,-2105639172,1195195770,-1402706744,-413311558,723065138,-1787595802,-1604296512,-1736343271,-783331426,2145180835,1713513028,2116692564,-1416589253,-2088204277,-901364084,703524551,-742868885,1007948840,2044649127,-497131844,487262998,1994120109,1004593371,1446130276,1312438900,503974420,-615954030,168166924,1814307912,-463709000,1573044895,1859376061,-273896381,-1503501628,-1466855111,-1533700815,937747667,-1954973198,854058965,1137232011,1496790894,-1217565222,-1936880383,1691735473,-766620004,-525751991,-1267962664,-95005012,133494003,636152527,-1352309302,-1904575756,-374428089,403179536,-709182865,-2005370640,1864705354,1915629148,605822008,-240736681,-944458637,1371981463,602466507,2094914977,-1670089496,555687742,-582268010,-591544991,-2037675251,-2054518257,-1871679264,1111375484,-994724495,-1436129588,-666351472,84083462,32962295,302911004,-1553899070,1597322602,-111716434,-793134743,-1853454825,1489093017,656219450,-1180787161,954327513,335083755,-1281845205,856756514,-1150719534,1893325225,-1987146233,-1483434957,-1231316179,572399164,-1836611819,552200649,1238290055,-11184726,2015897680,2061492133,-1886614525,-123625127,-2138470135,386731290,-624967835,837215959,-968736124,-1201116976,-1019133566,-1332111063,1999449434,286199582,-877612933,-61582168,-692339859,974525996];
csafe_crypto_cipher_symm_Aes.T2 = [1667483301,2088564868,2004348569,2071721613,-218956019,1802229437,1869602481,-976907948,808476752,16843267,1734856361,724260477,-16849127,-673729182,-1414836762,1987505306,-892694715,-2105401443,-909539008,2105408135,-84218091,1499050731,1195871945,-252642549,-1381154324,-724257945,-1566416899,-1347467798,-1667488833,-1532734473,1920132246,-1061119141,-1212713534,-33693412,-1819066962,640044138,909536346,1061125697,-134744830,-859012273,875849820,-1515892236,-437923532,-235800312,1903288979,-656888973,825320019,353708607,67373068,-943221422,589514341,-1010590370,404238376,-1768540255,84216335,-1701171275,117902857,303178806,-2139087973,-488448195,-336868058,656887401,-1296924723,1970662047,151589403,-2088559202,741103732,437924910,454768173,1852759218,1515893998,-1600103429,1381147894,993752653,-690571423,-1280082482,690573947,-471605954,791633521,-2071719017,1397991157,-774784664,0,-303185620,538984544,-50535649,-1313769016,1532737261,1785386174,-875852474,-1094817831,960066123,1246401758,1280088276,1482207464,-808483510,-791626901,-269499094,-1431679003,-67375850,1128498885,1296931543,859006549,-2054876780,1162185423,-101062384,33686534,2139094657,1347461360,1010595908,-1616960070,-1465365533,1364304627,-1549574658,1077969088,-1886452342,-1835909203,-1650646596,943222856,-168431356,-1128504353,-1229555775,-623202443,555827811,269492272,-6886,-202113778,-757940371,-842170036,202119188,320022069,-320027857,1600110305,-1751698014,1145342156,387395129,-993750185,-1482205710,2122251394,1027439175,1684326572,1566423783,421081643,1936975509,1616953504,-2122245736,1330618065,-589520001,572671078,707417214,-1869595733,-2004350077,1179028682,-286341335,-1195873325,336865340,-555833479,1583267042,185275933,-606360202,-522134725,842163286,976909390,168432670,1229558491,101059594,606357612,1549580516,-1027432611,-741098130,-1397996561,1650640038,-1852753496,-1785384540,-454765769,2038035083,-404237006,-926381245,926379609,1835915959,-1920138868,-707415708,1313774802,-1448523296,1819072692,1448520954,-185273593,-353710299,1701169839,2054878350,-1364310039,134746136,-1162186795,2021191816,623200879,774790258,471611428,-1499047951,-1263242297,-960063663,-387396829,-572677764,1953818780,522141217,1263245021,-1111662116,-1953821306,-1970663547,1886445712,1044282434,-1246400060,1718013098,1212715224,50529797,-151587071,235805714,1633796771,892693087,1465364217,-1179031088,-2038032495,-1044276904,488454695,-1633802311,-505292488,-117904621,-1734857805,286335539,1768542907,-640046736,-1903294583,-1802226777,-1684329034,505297954,-2021190254,-370554592,-825325751,1431677695,673730680,-538991238,-1936981105,-1583261192,-1987507840,218962455,-1077975590,-421079247,1111655622,1751699640,1094812355,-1718015568,757946999,252648977,-1330611253,1414834428,-1145344554,370551866];
csafe_crypto_cipher_symm_Aes.T3 = [1673962851,2096661628,2012125559,2079755643,-218165774,1809235307,1876865391,-980331323,811618352,16909057,1741597031,727088427,-18408962,-675978537,-1420958037,1995217526,-896580150,-2111857278,-913751863,2113570685,-84994566,1504897881,1200539975,-251982864,-1388188499,-726439980,-1570767454,-1354372433,-1675378788,-1538000988,1927583346,-1063560256,-1217019209,-35578627,-1824674157,642542118,913070646,1065238847,-134937865,-863809588,879254580,-1521355611,-439274267,-235337487,1910674289,-659852328,828527409,355090197,67636228,-946515257,591815971,-1013096765,405809176,-1774739050,84545285,-1708149350,118360327,304363026,-2145674368,-488686110,-338876693,659450151,-1300247118,1978310517,152181513,-2095210877,743994412,439627290,456535323,1859957358,1521806938,-1604584544,1386542674,997608763,-692624938,-1283600717,693271337,-472039709,794718511,-2079090812,1403450707,-776378159,0,-306107155,541089824,-52224004,-1317418831,1538714971,1792327274,-879933749,-1100490306,963791673,1251270218,1285084236,1487988824,-813348145,-793023536,-272291089,-1437604438,-68348165,1132905795,1301993293,862344499,-2062445435,1166724933,-102166279,33818114,2147385727,1352724560,1014514748,-1624917345,-1471421528,1369633617,-1554121053,1082179648,-1895462257,-1841320558,-1658733411,946882616,-168753931,-1134305348,-1233665610,-626035238,557998881,270544912,-1762561,-201519373,-759206446,-847164211,202904588,321271059,-322752532,1606345055,-1758092649,1149815876,388905239,-996976700,-1487539545,2130477694,1031423805,1690872932,1572530013,422718233,1944491379,1623236704,-2129028991,1335808335,-593264676,574907938,710180394,-1875137648,-2012511352,1183631942,-288937490,-1200893000,338181140,-559449634,1589437022,185998603,-609388837,-522503200,845436466,980700730,169090570,1234361161,101452294,608726052,1555620956,-1029743166,-742560045,-1404833876,1657054818,-1858492271,-1791908715,-455919644,2045938553,-405458201,-930397240,929978679,1843050349,-1929278323,-709794603,1318900302,-1454776151,1826141292,1454176854,-185399308,-355523094,1707781989,2062847610,-1371018834,135272456,-1167075910,2029029496,625635109,777810478,473441308,-1504185946,-1267480652,-963161658,-389340184,-576619299,1961401460,524165407,1268178251,-1117659971,-1962047861,-1978694262,1893765232,1048330814,-1250835275,1724688998,1217452104,50726147,-151584266,236720654,1640145761,896163637,1471084887,-1184247623,-2045275770,-1046914879,490350365,-1641563746,-505857823,-118811656,-1741966440,287453969,1775418217,-643206951,-1912108658,-1808554092,-1691502949,507257374,-2028629369,-372694807,-829994546,1437269845,676362280,-542803233,-1945923700,-1587939167,-1995865975,219813645,-1083843905,-422104602,1115997762,1758509160,1099088705,-1725321063,760903469,253628687,-1334064208,1420360788,-1150429509,371997206];
csafe_crypto_cipher_symm_Aes.T4 = [-962239645,-125535108,-291932297,-158499973,-15863054,-692229269,-558796945,-1856715323,1615867952,33751297,-827758745,1451043627,-417726722,-1251813417,1306962859,-325421450,-1891251510,530416258,-1992242743,-91783811,-283772166,-1293199015,-1899411641,-83103504,1106029997,-1285040940,1610457762,1173008303,599760028,1408738468,-459902350,-1688485696,1975695287,-518193667,1034851219,1282024998,1817851446,2118205247,-184354825,-2091922228,1750873140,1374987685,-785062427,-116854287,-493653647,-1418471208,1649619249,708777237,135005188,-1789737017,1181033251,-1654733885,807933976,933336726,168756485,800430746,235472647,607523346,463175808,-549592350,-853087253,1315514151,2144187058,-358648459,303761673,496927619,1484008492,875436570,908925723,-592286098,-1259447718,1543217312,-1527360942,1984772923,-1218324778,2110698419,1383803177,-583080989,1584475951,328696964,-1493871789,-1184312879,0,-1054020115,1080041504,-484442884,2043195825,-1225958565,-725718422,-1924740149,1742323390,1917532473,-1797371318,-1730917300,-1326950312,-2058694705,-1150562096,-987041809,1340451498,-317260805,-2033892541,-1697166003,1716859699,294946181,-1966127803,-384763399,67502594,-25067649,-1594863536,2017737788,632987551,1273211048,-1561112239,1576969123,-2134884288,92966799,1068339858,566009245,1883781176,-251333131,1675607228,2009183926,-1351230758,1113792801,540020752,-451215361,-49351693,-1083321646,-2125673011,403966988,641012499,-1020269332,-1092526241,899848087,-1999879100,775493399,-1822964540,1441965991,-58556802,2051489085,-928226204,-1159242403,841685273,-426413197,-1063231392,429425025,-1630449841,-1551901476,1147544098,1417554474,1001099408,193169544,-1932900794,-953553170,1809037496,675025940,-1485185314,-1126015394,371002123,-1384719397,-616832800,1683370546,1951283770,337512970,-1831122615,201983494,1215046692,-1192993700,-1621245246,-1116810285,1139780780,-995728798,967348625,832869781,-751311644,-225740423,-718084121,-1958491960,1851340599,-625513107,25988493,-1318791723,-1663938994,1239460265,-659264404,-1392880042,-217582348,-819598614,-894474907,-191989126,1206496942,270010376,1876277946,-259491720,1248797989,1550986798,941890588,1475454630,1942467764,-1756248378,-886839064,-1585652259,-392399756,1042358047,-1763882165,1641856445,226921355,260409994,-527404944,2084716094,1908716981,-861247898,-1864873912,100991747,-150866186,470945294,-1029480095,1784624437,-1359390889,1775286713,395413126,-1722236479,975641885,666476190,-650583583,-351012616,733190296,573772049,-759469719,-1452221991,126455438,866620564,766942107,1008868894,361924487,-920589847,-2025206066,-1426107051,1350051880,-1518673953,59739276,1509466529,159418761,437718285,1708834751,-684595482,-2067381694,-793221016,-2101132991,699439513,1517759789,504434447,2076946608,-1459858348,1842789307,742004246];
csafe_crypto_cipher_symm_Aes.T5 = [1353184337,1399144830,-1012656358,-1772214470,-882136261,-247096033,-1420232020,-1828461749,1442459680,-160598355,-1854485368,625738485,-52959921,-674551099,-2143013594,-1885117771,1230680542,1729870373,-1743852987,-507445667,41234371,317738113,-1550367091,-956705941,-413167869,-1784901099,-344298049,-631680363,763608788,-752782248,694804553,1154009486,1787413109,2021232372,1799248025,-579749593,-1236278850,397248752,1722556617,-1271214467,407560035,-2110711067,1613975959,1165972322,-529046351,-2068943941,480281086,-1809118983,1483229296,436028815,-2022908268,-1208452270,601060267,-503166094,1468997603,715871590,120122290,63092015,-1703164538,-1526188077,-226023376,-1297760477,-1167457534,1552029421,723308426,-1833666137,-252573709,-1578997426,-839591323,-708967162,526529745,-1963022652,-1655493068,-1604979806,853641733,1978398372,971801355,-1427152832,111112542,1360031421,-108388034,1023860118,-1375387939,1186850381,-1249028975,90031217,1876166148,-15380384,620468249,-1746289194,-868007799,2006899047,-1119688528,-2004121337,945494503,-605108103,1191869601,-384875908,-920746760,0,-2088337399,1223502642,-1401941730,1316117100,-67170563,1446544655,517320253,658058550,1691946762,564550760,-783000677,976107044,-1318647284,266819475,-761860428,-1634624741,1338359936,-1574904735,1766553434,370807324,179999714,-450191168,1138762300,488053522,185403662,-1379431438,-1180125651,-928440812,-2061897385,1275557295,-1143105042,-44007517,-1624899081,-1124765092,-985962940,880737115,1982415755,-590994485,1761406390,1676797112,-891538985,277177154,1076008723,538035844,2099530373,-130171950,288553390,1839278535,1261411869,-214912292,-330136051,-790380169,1813426987,-1715900247,-95906799,577038663,-997393240,440397984,-668172970,-275762398,-951170681,-1043253031,-22885748,906744984,-813566554,685669029,646887386,-1530942145,-459458004,227702864,-1681105046,1648787028,-1038905866,-390539120,1593260334,-173030526,-1098883681,2090061929,-1456614033,-1290656305,999926984,-1484974064,1852021992,2075868123,158869197,-199730834,28809964,-1466282109,1701746150,2129067946,147831841,-420997649,-644094022,-835293366,-737566742,-696471511,-1347247055,824393514,815048134,-1067015627,935087732,-1496677636,-1328508704,366520115,1251476721,-136647615,240176511,804688151,-1915335306,1303441219,1414376140,-553347356,-474623586,461924940,-1205916479,2136040774,82468509,1563790337,1937016826,776014843,1511876531,1389550482,861278441,323475053,-1939744870,2047648055,-1911228327,-1992551445,-299390514,902390199,-303751967,1018251130,1507840668,1064563285,2043548696,-1086863501,-355600557,1537932639,342834655,-2032450440,-2114736182,1053059257,741614648,1598071746,1925389590,203809468,-1958134744,1100287487,1895934009,-558691320,-1662733096,-1866377628,1636092795,1890988757,1952214088,1113045200];
csafe_crypto_cipher_symm_Aes.T6 = [-1477160624,1698790995,-1541989693,1579629206,1806384075,1167925233,1492823211,65227667,-97509291,1836494326,1993115793,1275262245,-672837636,-886389289,1144333952,-1553812081,1521606217,465184103,250234264,-1057071647,1966064386,-263421678,-1756983901,-103584826,1603208167,-1668147819,2054012907,1498584538,-2084645843,561273043,1776306473,-926314940,-1983744662,2039411832,1045993835,1907959773,1340194486,-1383534569,-1407137434,986611124,1256153880,823846274,860985184,2136171077,2003087840,-1368671356,-1602093540,722008468,1749577816,-45773031,1826526343,-126135625,-747394269,38499042,-1893735593,-1420466646,686535175,-1028313341,2076542618,137876389,-2027409166,-1514200142,1778582202,-2112426660,483363371,-1267095662,-234359824,-496415071,-187013683,-1106966827,1647628575,-22625142,1395537053,1442030240,-511048398,-336157579,-326956231,-278904662,-1619960314,275692881,-1977532679,115185213,88006062,-1108980410,-1923837515,1573155077,-737803153,357589247,-73918172,-373434729,1128303052,-1629919369,1122545853,-1953953912,1528424248,-288851493,175939911,256015593,512030921,0,-2038429309,-315936184,1880170156,1918528590,-15794693,948244310,-710001378,959264295,-653325724,-1503893471,1415289809,775300154,1728711857,-413691121,-1762741038,-1852105826,-977239985,551313826,1266113129,437394454,-1164713462,715178213,-534627261,387650077,218697227,-947129683,-1464455751,-1457646392,435246981,125153100,-577114437,1618977789,637663135,-177054532,996558021,2130402100,692292470,-970732580,-51530136,-236668829,-600713270,-2057092592,580326208,298222624,608863613,1035719416,855223825,-1591097491,798891339,817028339,1384517100,-473860144,380840812,-1183798887,1217663482,1693009698,-1929598780,1072734234,746411736,-1875696913,1313441735,-784803391,-1563783938,198481974,-2114607409,-562387672,-1900553690,-1079165020,-1657131804,-1837608947,-866162021,1182684258,328070850,-1193766680,-147247522,-1346141451,-2141347906,-1815058052,768962473,304467891,-1716729797,2098729127,1671227502,-1153705093,2015808777,408514292,-1214583807,-1706064984,1855317605,-419452290,-809754360,-401215514,-1679312167,913263310,161475284,2091919830,-1297862225,591342129,-1801075152,1721906624,-1135709129,-897385306,-795811664,-660131051,-1744506550,-622050825,1355644686,-158263505,-699566451,-1326496947,1303039060,76997855,-1244553501,-2006299621,523026872,1365591679,-362898172,898367837,1955068531,1091304238,493335386,-757362094,1443948851,1205234963,1641519756,211892090,351820174,1007938441,665439982,-916342987,-451091987,-1320715716,-539845543,1945261375,-837543815,935818175,-839429142,-1426235557,1866325780,-616269690,-206583167,-999769794,874788908,1084473951,-1021503886,635616268,1228679307,-1794244799,27801969,-1291056930,-457910116,-1051302768,-2067039391,-1238182544,1550600308,1471729730];
csafe_crypto_cipher_symm_Aes.T7 = [-195997529,1098797925,387629988,658151006,-1422144661,-1658851003,-89347240,-481586429,807425530,1991112301,-863465098,49620300,-447742761,717608907,891715652,1656065955,-1310832294,-1171953893,-364537842,-27401792,801309301,1283527408,1183687575,-747911431,-1895569569,-1844079204,1841294202,1385552473,-1093390973,1951978273,-532076183,-913423160,-1032492407,-1896580999,1486449470,-1188569743,-507595185,-1997531219,550069932,-830622662,-547153846,451248689,1368875059,1398949247,1689378935,1807451310,-2114052960,150574123,1215322216,1167006205,-560691348,2069018616,1940595667,1265820162,534992783,1432758955,-340654296,-1255210046,-981034373,936617224,674296455,-1088179547,50510442,384654466,-813028580,2041025204,133427442,1766760930,-630862348,84334014,886120290,-1497068802,775200083,-207445931,-1979370783,-156994069,-2096416276,1614850799,1901987487,1857900816,557775242,-577356538,1054715397,-431143235,1418835341,-999226019,100954068,1348534037,-1743182597,-1110009879,1082772547,-647530594,-391070398,-1995994997,434583643,-931537938,2090944266,1115482383,-2064070370,0,-2146860154,724715757,287222896,1517047410,251526143,-2062592456,-1371726123,758523705,252339417,1550328230,1536938324,908343854,168604007,1469255655,-290139498,-1692688751,-1065332795,-597581280,2002413899,303830554,-1813902662,-1597971158,574374880,454171927,151915277,-1947030073,-1238517336,504678569,-245922535,1974422535,-1712407587,2141453664,33005350,1918680309,1715782971,-77908866,1133213225,600562886,-306812676,-457677839,836225756,1665273989,-1760346078,-964419567,1250262308,-1143801795,-106032846,700935585,-1642247377,-1294142672,-2045907886,-1049112349,-1288999914,1890163129,-1810761144,-381214108,-56048500,-257942977,2102843436,857927568,1233635150,953795025,-896729438,-728222197,-173617279,2057644254,-1210440050,-1388337985,976020637,2018512274,1600822220,2119459398,-1913208301,-661591880,959340279,-1014827601,1570750080,-798393197,-714102483,634368786,-1396163687,403744637,-1662488989,1004239803,650971512,1500443672,-1695809097,1334028442,-1780062866,-5603610,-1138685745,368043752,-407184997,1867173430,-1612000247,-1339435396,-1540247630,1059729699,-1513738092,-1573535642,1316239292,-2097371446,-1864322864,-1489824296,82922136,-331221030,-847311280,-1860751370,1299615190,-280801872,-1429449651,-1763385596,-778116171,1783372680,750893087,1699118929,1587348714,-1946067659,-2013629580,201010753,1739807261,-611167534,283718486,-697494713,-677737375,-1590199796,-128348652,334203196,-1446056409,1639396809,484568549,1199193265,-761505313,-229294221,337148366,-948715721,-145495347,-44082262,1038029935,1148749531,-1345682957,1756970692,607661108,-1547542720,488010435,-490992603,1009290057,234832277,-1472630527,201907891,-1260872476,1449431233,-881106556,852848822,1816687708,-1194311081];
csafe_crypto_cipher_symm_Aes.T8 = [1364240372,2119394625,449029143,982933031,1003187115,535905693,-1398056710,1267925987,542505520,-1376359050,-2003732788,-182105086,1341970405,-975713494,645940277,-1248877726,-565617999,627514298,1167593194,1575076094,-1023249105,-2129465268,-1918658746,1808202195,65494927,362126482,-1075086739,-1780852398,-735214658,1490231668,1227450848,-1908094775,1969916354,-193431154,-1721024936,668823993,-1095348255,-266883704,-916018144,2108963534,1662536415,-444452582,-1755303087,1648721747,-1310689436,-1148932501,-31678335,-107730168,1884842056,-1894122171,-1803064098,1387788411,-1423715469,1927414347,-480800993,1714072405,-1308153621,788775605,-2036696123,-744159177,821200680,598910399,45771267,-312704490,-1976886065,-1483557767,-202313209,1319232105,1707996378,114671109,-786472396,-997523802,882725678,-1566550541,87220618,-1535775754,188345475,1084944224,1577492337,-1118760850,1056541217,-1774385443,-575797954,1296481766,-1850372780,1896177092,74437638,1627329872,421854104,-694687299,-1983102144,1735892697,-1329773848,126389129,-415737063,2044456648,-1589179780,2095648578,-121037180,0,159614592,843640107,514617361,1817080410,-33816818,257308805,1025430958,908540205,174381327,1747035740,-1680780197,607792694,212952842,-1827674281,-1261267218,463376795,-2142255680,1638015196,1516850039,471210514,-502613357,-1058723168,1011081250,303896347,235605257,-223492213,767142070,348694814,1468340721,-1353971851,-289677927,-1543675777,-140564991,1555887474,1153776486,1530167035,-1955190461,-874723805,-1234633491,-1201409564,-674571215,1108378979,322970263,-2078273082,-2055396278,-755483205,-1374604551,-949116631,491466654,-588042062,233591430,2010178497,728503987,-1449543312,301615252,1193436393,-1463513860,-1608892432,1457007741,586125363,-2016981431,-641609416,-1929469238,-1741288492,-1496350219,-1524048262,-635007305,1067761581,753179962,1343066744,1788595295,1415726718,-155053171,-1863796520,777975609,-2097827901,-1614905251,1769771984,1873358293,-810347995,-935618132,279411992,-395418724,-612648133,-855017434,1861490777,-335431782,-2086102449,-429560171,-1434523905,554225596,-270079979,-1160143897,1255028335,-355202657,701922480,833598116,707863359,-969894747,901801634,1949809742,-56178046,-525283184,857069735,-246769660,1106762476,2131644621,389019281,1989006925,1129165039,-866890326,-455146346,-1629243951,1276872810,-1044898004,1182749029,-1660622242,22885772,-93096825,-80854773,-1285939865,-1840065829,-382511600,1829980118,-1702075945,930745505,1502483704,-343327725,-823253079,-1221211807,-504503012,2050797895,-1671831598,1430221810,410635796,1941911495,1407897079,1599843069,-552308931,2022103876,-897453137,-1187068824,942421028,-1033944925,376619805,-1140054558,680216892,-12479219,963707304,148812556,-660806476,1687208278,2069988555,-714033614,1215585388,-800958536];
csafe_crypto_cipher_symm_Aes.U1 = [0,185403662,370807324,488053522,741614648,658058550,976107044,824393514,1483229296,1399144830,1316117100,1165972322,1952214088,2136040774,1648787028,1766553434,-1328508704,-1143105042,-1496677636,-1379431438,-1662733096,-1746289194,-1963022652,-2114736182,-390539120,-474623586,-22885748,-173030526,-997393240,-813566554,-761860428,-644094022,2075868123,1890988757,1839278535,1722556617,1468997603,1552029421,1100287487,1251476721,601060267,685669029,902390199,1053059257,266819475,82468509,436028815,317738113,-882136261,-1067015627,-579749593,-696471511,-413167869,-330136051,-247096033,-95906799,-1828461749,-1743852987,-2061897385,-1911228327,-1086863501,-1271214467,-1456614033,-1574904735,-160598355,-44007517,-529046351,-344298049,-631680363,-783000677,-868007799,-951170681,-1375387939,-1526188077,-1205916479,-1290656305,-2110711067,-1992551445,-1809118983,-1624899081,1186850381,1303441219,1353184337,1537932639,1787413109,1636092795,2090061929,2006899047,517320253,366520115,147831841,63092015,853641733,971801355,620468249,804688151,-1915335306,-2032450440,-1681105046,-1866377628,-1578997426,-1427152832,-1208452270,-1124765092,-708967162,-558691320,-1012656358,-928440812,-108388034,-226023376,-275762398,-459458004,1023860118,906744984,723308426,538035844,288553390,440397984,120122290,203809468,1701746150,1852021992,1937016826,2021232372,1230680542,1113045200,1598071746,1414376140,-136647615,-52959921,-507445667,-355600557,-605108103,-790380169,-839591323,-956705941,-1347247055,-1530942145,-1180125651,-1297760477,-2088337399,-2004121337,-1784901099,-1634624741,1191869601,1275557295,1360031421,1511876531,1799248025,1613975959,2099530373,1982415755,526529745,342834655,158869197,41234371,861278441,945494503,625738485,776014843,-1939744870,-2022908268,-1703164538,-1854485368,-1604979806,-1420232020,-1236278850,-1119688528,-737566742,-553347356,-1038905866,-920746760,-130171950,-214912292,-299390514,-450191168,1018251130,935087732,715871590,564550760,277177154,461924940,111112542,227702864,1691946762,1876166148,1925389590,2043548696,1223502642,1138762300,1593260334,1442459680,28809964,179999714,397248752,480281086,763608788,646887386,999926984,815048134,1507840668,1389550482,1338359936,1154009486,1978398372,2129067946,1676797112,1761406390,-1318647284,-1167457534,-1484974064,-1401941730,-1655493068,-1772214470,-1958134744,-2143013594,-384875908,-503166094,-15380384,-199730834,-985962940,-835293366,-752782248,-668172970,2047648055,1895934009,1813426987,1729870373,1446544655,1563790337,1076008723,1261411869,577038663,694804553,880737115,1064563285,240176511,90031217,407560035,323475053,-891538985,-1043253031,-590994485,-674551099,-420997649,-303751967,-252573709,-67170563,-1833666137,-1715900247,-2068943941,-1885117771,-1098883681,-1249028975,-1466282109,-1550367091];
csafe_crypto_cipher_symm_Aes.U2 = [0,218697227,437394454,387650077,874788908,959264295,775300154,591342129,1749577816,1698790995,1918528590,2136171077,1550600308,1365591679,1182684258,1266113129,-795811664,-577114437,-897385306,-947129683,-457910116,-373434729,-22625142,-206583167,-1193766680,-1244553501,-1563783938,-1346141451,-1929598780,-2114607409,-1762741038,-1679312167,-1153705093,-1238182544,-1591097491,-1407137434,-1893735593,-2112426660,-1794244799,-1744506550,-747394269,-562387672,-916342987,-999769794,-413691121,-362898172,-45773031,-263421678,1806384075,1721906624,1907959773,2091919830,1603208167,1384517100,1167925233,1217663482,65227667,250234264,435246981,351820174,935818175,986611124,768962473,551313826,1836494326,1618977789,2003087840,2054012907,1498584538,1415289809,1128303052,1313441735,88006062,137876389,523026872,304467891,823846274,1007938441,722008468,637663135,-1108980410,-1326496947,-1477160624,-1426235557,-1983744662,-2067039391,-1815058052,-1629919369,-710001378,-660131051,-809754360,-1028313341,-511048398,-326956231,-73918172,-158263505,-699566451,-616269690,-866162021,-1051302768,-496415071,-278904662,-126135625,-177054532,-1106966827,-1291056930,-1541989693,-1457646392,-1977532679,-2027409166,-1875696913,-1657131804,115185213,198481974,483363371,298222624,855223825,1072734234,686535175,635616268,1855317605,1671227502,1955068531,2039411832,1521606217,1471729730,1084473951,1303039060,-622050825,-672837636,-1057071647,-839429142,-288851493,-473860144,-187013683,-103584826,-1297862225,-1079165020,-1464455751,-1514200142,-2038429309,-1953953912,-1668147819,-1852105826,175939911,125153100,275692881,493335386,1045993835,860985184,608863613,692292470,1647628575,1866325780,2015808777,1966064386,1443948851,1528424248,1275262245,1091304238,1641519756,1826526343,2076542618,1993115793,1442030240,1492823211,1340194486,1122545853,161475284,76997855,328070850,512030921,1035719416,817028339,665439982,715178213,-1320715716,-1135709129,-1420466646,-1503893471,-2057092592,-2006299621,-1619960314,-1837608947,-653325724,-737803153,-1021503886,-837543815,-315936184,-534627261,-147247522,-97509291,-1214583807,-1164713462,-1383534569,-1602093540,-2084645843,-1900553690,-1716729797,-1801075152,-539845543,-757362094,-977239985,-926314940,-336157579,-419452290,-236668829,-51530136,1728711857,1778582202,2098729127,1880170156,1395537053,1579629206,1228679307,1144333952,256015593,38499042,357589247,408514292,996558021,913263310,561273043,746411736,211892090,27801969,380840812,465184103,948244310,898367837,580326208,798891339,1693009698,1776306473,2130402100,1945261375,1355644686,1573155077,1256153880,1205234963,-600713270,-784803391,-970732580,-886389289,-401215514,-451091987,-234359824,-15794693,-1267095662,-1183798887,-1368671356,-1553812081,-2141347906,-1923837515,-1706064984,-1756983901];
csafe_crypto_cipher_symm_Aes.U3 = [0,151915277,303830554,454171927,607661108,758523705,908343854,1059729699,1215322216,1098797925,1517047410,1398949247,1816687708,1699118929,2119459398,2002413899,-1864322864,-1712407587,-2097371446,-1947030073,-1260872476,-1110009879,-1497068802,-1345682957,-661591880,-778116171,-896729438,-1014827601,-56048500,-173617279,-290139498,-407184997,1004239803,852848822,700935585,550069932,534992783,384654466,234832277,82922136,1940595667,2057644254,1639396809,1756970692,1469255655,1587348714,1167006205,1283527408,-1422144661,-1573535642,-1188569743,-1339435396,-1895569569,-2045907886,-1658851003,-1810761144,-481586429,-364537842,-245922535,-128348652,-948715721,-830622662,-714102483,-597581280,1991112301,2141453664,1689378935,1841294202,1385552473,1536938324,1082772547,1233635150,1054715397,936617224,750893087,634368786,451248689,334203196,150574123,33005350,-431143235,-280801872,-195997529,-44082262,-1032492407,-881106556,-798393197,-647530594,-1371726123,-1489824296,-1138685745,-1255210046,-1979370783,-2096416276,-1743182597,-1860751370,1299615190,1148749531,1600822220,1449431233,1766760930,1614850799,2069018616,1918680309,84334014,201907891,387629988,504678569,557775242,674296455,857927568,976020637,-577356538,-728222197,-813028580,-964419567,-106032846,-257942977,-340654296,-490992603,-1780062866,-1662488989,-2013629580,-1896580999,-1310832294,-1194311081,-1547542720,-1429449651,-331221030,-447742761,-27401792,-145495347,-931537938,-1049112349,-630862348,-747911431,-1540247630,-1388337985,-1238517336,-1088179547,-2146860154,-1995994997,-1844079204,-1692688751,2090944266,1974422535,1857900816,1739807261,1486449470,1368875059,1250262308,1133213225,886120290,1038029935,650971512,801309301,283718486,434583643,49620300,201010753,-677737375,-560691348,-981034373,-863465098,-207445931,-89347240,-507595185,-391070398,-1612000247,-1763385596,-1913208301,-2064070370,-1143801795,-1294142672,-1446056409,-1597971158,1199193265,1316239292,1432758955,1550328230,1665273989,1783372680,1901987487,2018512274,252339417,100954068,488010435,337148366,724715757,574374880,959340279,807425530,-1695809097,-1813902662,-1997531219,-2114052960,-1093390973,-1210440050,-1396163687,-1513738092,-761505313,-611167534,-1065332795,-913423160,-156994069,-5603610,-457677839,-306812676,168604007,50510442,403744637,287222896,775200083,658151006,1009290057,891715652,1115482383,1265820162,1348534037,1500443672,1715782971,1867173430,1951978273,2102843436,-1590199796,-1472630527,-1288999914,-1171953893,-2062592456,-1946067659,-1760346078,-1642247377,-381214108,-532076183,-77908866,-229294221,-847311280,-999226019,-547153846,-697494713,836225756,953795025,600562886,717608907,368043752,484568549,133427442,251526143,2041025204,1890163129,1807451310,1656065955,1570750080,1418835341,1334028442,1183687575];
csafe_crypto_cipher_symm_Aes.U4 = [0,235605257,471210514,303896347,942421028,908540205,607792694,707863359,1884842056,2119394625,1817080410,1648721747,1215585388,1182749029,1415726718,1516850039,-525283184,-289677927,-56178046,-223492213,-660806476,-694687299,-997523802,-897453137,-1863796520,-1629243951,-1929469238,-2097827901,-1463513860,-1496350219,-1261267218,-1160143897,-612648133,-714033614,-949116631,-916018144,-480800993,-312704490,-12479219,-246769660,-1423715469,-1524048262,-1221211807,-1187068824,-1827674281,-1660622242,-1894122171,-2129465268,1003187115,901801634,668823993,701922480,65494927,233591430,535905693,301615252,1267925987,1167593194,1468340721,1502483704,1941911495,2108963534,1873358293,1638015196,-1376359050,-1543675777,-1310689436,-1075086739,-1780852398,-1680780197,-1983102144,-2016981431,-575797954,-744159177,-1044898004,-810347995,-444452582,-343327725,-107730168,-140564991,1296481766,1129165039,1364240372,1599843069,1969916354,2069988555,1769771984,1735892697,1025430958,857069735,554225596,788775605,87220618,188345475,421854104,389019281,1989006925,2022103876,1788595295,1687208278,1319232105,1084944224,1387788411,1555887474,114671109,148812556,449029143,348694814,1056541217,821200680,586125363,753179962,-1774385443,-1741288492,-1976886065,-2078273082,-1374604551,-1608892432,-1308153621,-1140054558,-429560171,-395418724,-93096825,-193431154,-565617999,-800958536,-1033944925,-866890326,1106762476,1341970405,1575076094,1407897079,2044456648,2010178497,1707996378,1808202195,833598116,1067761581,767142070,598910399,159614592,126389129,362126482,463376795,-1589179780,-1353971851,-1118760850,-1285939865,-1721024936,-1755303087,-2055396278,-1955190461,-786472396,-552308931,-855017434,-1023249105,-382511600,-415737063,-182105086,-80854773,-1702075945,-1803064098,-2036696123,-2003732788,-1566550541,-1398056710,-1095348255,-1329773848,-355202657,-455146346,-155053171,-121037180,-755483205,-588042062,-823253079,-1058723168,2050797895,1949809742,1714072405,1747035740,1108378979,1276872810,1577492337,1343066744,174381327,74437638,376619805,410635796,843640107,1011081250,777975609,542505520,-335431782,-502613357,-266883704,-31678335,-735214658,-635007305,-935618132,-969894747,-1671831598,-1840065829,-2142255680,-1908094775,-1535775754,-1434523905,-1201409564,-1234633491,212952842,45771267,279411992,514617361,882725678,982933031,680216892,645940277,2095648578,1927414347,1627329872,1861490777,1153776486,1255028335,1490231668,1457007741,930745505,963707304,728503987,627514298,257308805,22885772,322970263,491466654,1193436393,1227450848,1530167035,1430221810,2131644621,1896177092,1662536415,1829980118,-674571215,-641609416,-874723805,-975713494,-270079979,-504503012,-202313209,-33816818,-1483557767,-1449543312,-1148932501,-1248877726,-1614905251,-1850372780,-2086102449,-1918658746];
csafe_crypto_cipher_symm_Des.Df_Key = [1,35,69,103,137,171,205,239,254,220,186,152,118,84,50,16,137,171,205,239,1,35,69,103];
csafe_crypto_cipher_symm_Des.bytebit = [128,64,32,16,8,4,2,1];
csafe_crypto_cipher_symm_Des.bigbyte = [8388608,4194304,2097152,1048576,524288,262144,131072,65536,32768,16384,8192,4096,2048,1024,512,256,128,64,32,16,8,4,2,1];
csafe_crypto_cipher_symm_Des.pc1 = [56,48,40,32,24,16,8,0,57,49,41,33,25,17,9,1,58,50,42,34,26,18,10,2,59,51,43,35,62,54,46,38,30,22,14,6,61,53,45,37,29,21,13,5,60,52,44,36,28,20,12,4,27,19,11,3];
csafe_crypto_cipher_symm_Des.totrot = [1,2,4,6,8,10,12,14,15,17,19,21,23,25,27,28];
csafe_crypto_cipher_symm_Des.pc2 = [13,16,10,23,0,4,2,27,14,5,20,9,22,18,11,3,25,7,15,6,26,19,12,1,40,51,30,36,46,54,29,39,50,44,32,47,43,48,38,55,33,52,45,41,49,35,28,31];
csafe_crypto_cipher_symm_Des.SP1 = [16843776,0,65536,16843780,16842756,66564,4,65536,1024,16843776,16843780,1024,16778244,16842756,16777216,4,1028,16778240,16778240,66560,66560,16842752,16842752,16778244,65540,16777220,16777220,65540,0,1028,66564,16777216,65536,16843780,4,16842752,16843776,16777216,16777216,1024,16842756,65536,66560,16777220,1024,4,16778244,66564,16843780,65540,16842752,16778244,16777220,1028,66564,16843776,1028,16778240,16778240,0,65540,66560,0,16842756];
csafe_crypto_cipher_symm_Des.SP2 = [-2146402272,-2147450880,32768,1081376,1048576,32,-2146435040,-2147450848,-2147483616,-2146402272,-2146402304,-2147483648,-2147450880,1048576,32,-2146435040,1081344,1048608,-2147450848,0,-2147483648,32768,1081376,-2146435072,1048608,-2147483616,0,1081344,32800,-2146402304,-2146435072,32800,0,1081376,-2146435040,1048576,-2147450848,-2146435072,-2146402304,32768,-2146435072,-2147450880,32,-2146402272,1081376,32,32768,-2147483648,32800,-2146402304,1048576,-2147483616,1048608,-2147450848,-2147483616,1048608,1081344,0,-2147450880,32800,-2147483648,-2146435040,-2146402272,1081344];
csafe_crypto_cipher_symm_Des.SP3 = [520,134349312,0,134348808,134218240,0,131592,134218240,131080,134217736,134217736,131072,134349320,131080,134348800,520,134217728,8,134349312,512,131584,134348800,134348808,131592,134218248,131584,131072,134218248,8,134349320,512,134217728,134349312,134217728,131080,520,131072,134349312,134218240,0,512,131080,134349320,134218240,134217736,512,0,134348808,134218248,131072,134217728,134349320,8,131592,131584,134217736,134348800,134218248,520,134348800,131592,8,134348808,131584];
csafe_crypto_cipher_symm_Des.SP4 = [8396801,8321,8321,128,8396928,8388737,8388609,8193,0,8396800,8396800,8396929,129,0,8388736,8388609,1,8192,8388608,8396801,128,8388608,8193,8320,8388737,1,8320,8388736,8192,8396928,8396929,129,8388736,8388609,8396800,8396929,129,0,0,8396800,8320,8388736,8388737,1,8396801,8321,8321,128,8396929,129,1,8192,8388609,8193,8396928,8388737,8193,8320,8388608,8396801,128,8388608,8192,8396928];
csafe_crypto_cipher_symm_Des.SP5 = [256,34078976,34078720,1107296512,524288,256,1073741824,34078720,1074266368,524288,33554688,1074266368,1107296512,1107820544,524544,1073741824,33554432,1074266112,1074266112,0,1073742080,1107820800,1107820800,33554688,1107820544,1073742080,0,1107296256,34078976,33554432,1107296256,524544,524288,1107296512,256,33554432,1073741824,34078720,1107296512,1074266368,33554688,1073741824,1107820544,34078976,1074266368,256,33554432,1107820544,1107820800,524544,1107296256,1107820800,34078720,0,1074266112,1107296256,524544,33554688,1073742080,524288,0,1074266112,34078976,1073742080];
csafe_crypto_cipher_symm_Des.SP6 = [536870928,541065216,16384,541081616,541065216,16,541081616,4194304,536887296,4210704,4194304,536870928,4194320,536887296,536870912,16400,0,4194320,536887312,16384,4210688,536887312,16,541065232,541065232,0,4210704,541081600,16400,4210688,541081600,536870912,536887296,16,541065232,4210688,541081616,4194304,16400,536870928,4194304,536887296,536870912,16400,536870928,541081616,4210688,541065216,4210704,541081600,0,541065232,16,16384,541065216,4210704,16384,4194320,536887312,0,541081600,536870912,4194320,536887312];
csafe_crypto_cipher_symm_Des.SP7 = [2097152,69206018,67110914,0,2048,67110914,2099202,69208064,69208066,2097152,0,67108866,2,67108864,69206018,2050,67110912,2099202,2097154,67110912,67108866,69206016,69208064,2097154,69206016,2048,2050,69208066,2099200,2,67108864,2099200,67108864,2099200,2097152,67110914,67110914,69206018,69206018,2,2097154,67108864,67110912,2097152,69208064,2050,2099202,69208064,2050,67108866,69208066,69206016,2099200,0,2,69208066,0,2099202,69206016,2048,67108866,67110912,2048,2097154];
csafe_crypto_cipher_symm_Des.SP8 = [268439616,4096,262144,268701760,268435456,268439616,64,268435456,262208,268697600,268701760,266240,268701696,266304,4096,64,268697600,268435520,268439552,4160,266240,262208,268697664,268701696,4160,0,0,268697664,268435520,268439552,266304,262144,266304,262144,268701696,4096,64,268697664,4096,266304,268439552,64,268435520,268697600,268697664,268435456,262144,268439616,0,268701760,262208,268435520,268697600,268439552,268439616,0,268701760,266240,266240,4160,4160,262208,268435456,268701696];
csafe_crypto_cipher_symm_RC2.ROUNDS = 16;
csafe_crypto_cipher_symm_RC2.KEY_LENGTH = 8;
csafe_crypto_cipher_symm_RC2.INTERNAL_KEY_LENGTH = csafe_crypto_cipher_symm_RC2.ROUNDS * 2;
csafe_crypto_cipher_symm_SEED.ROUNDS = 16;
csafe_crypto_cipher_symm_SEED.KEY_LENGTH = 16;
csafe_crypto_cipher_symm_SEED.INTERNAL_KEY_LENGTH = csafe_crypto_cipher_symm_SEED.ROUNDS * 2;
csafe_crypto_cipher_symm_SEED.SS0 = [696885672,92635524,382128852,331600848,340021332,487395612,747413676,621093156,491606364,54739776,403181592,504238620,289493328,1020063996,181060296,591618912,671621160,71581764,536879136,495817116,549511392,583197408,147374280,386339604,629514660,261063564,50529024,994800504,999011256,318968592,314757840,785310444,809529456,210534540,1057960764,680042664,839004720,500027868,919007988,876900468,751624428,361075092,185271048,390550356,474763356,457921368,1032696252,16843008,604250148,470552604,860058480,411603096,268439568,214745292,851636976,432656856,738992172,667411428,843215472,58950528,462132120,297914832,109478532,164217288,541089888,272650320,595829664,734782440,218956044,914797236,512660124,256852812,931640244,441078360,113689284,944271480,646357668,302125584,797942700,365285844,557932896,63161280,881111220,21053760,306336336,1028485500,227377548,134742024,521081628,428446104,0,420024600,67371012,323179344,935850996,566354400,1036907004,910586484,789521196,654779172,813740208,193692552,235799052,730571688,578986656,776888940,327390096,223166796,692674920,1011642492,151585032,168428040,1066382268,802153452,868479984,96846276,126321540,335810580,1053750012,608460900,516870876,772678188,189481800,436867608,101057028,553722144,726360936,642146916,33686016,902164980,310547088,176849544,202113036,864269232,1045328508,281071824,977957496,122110788,377918100,633725412,637936164,8421504,764256684,533713884,562143648,805318704,923218740,781099692,906375732,352653588,570565152,940060728,885321972,663200676,88424772,206323788,25264512,701096424,75792516,394761108,889532724,197903304,248431308,1007431740,826372464,285282576,130532292,160006536,893743476,1003222008,449499864,952692984,344232084,424235352,42107520,80003268,1070593020,155795784,956903736,658989924,12632256,265274316,398971860,948482232,252642060,244220556,37896768,587408160,293704080,743202924,466342872,612671652,872689716,834793968,138952776,46318272,793731948,1024274748,755835180,4210752,1049539260,1041117756,1015853244,29475264,713728680,982168248,240009804,356864340,990589752,483184860,675831912,1062171516,478974108,415813848,172638792,373707348,927429492,545300640,768467436,105267780,897954228,722150184,625303908,986379000,600040416,965325240,830583216,529503132,508449372,969535992,650568420,847426224,822161712,717939432,760045932,525292380,616882404,817950960,231588300,143163528,369496596,973746744,407392344,348442836,574775904,688464168,117900036,855847728,684253416,453710616,84214020,961114488,276861072,709517928,705307176,445289112];
csafe_crypto_cipher_symm_SEED.SS1 = [943196208,-399980320,741149985,-1540979038,-871379005,-601960750,-1338801229,-1204254544,-1406169181,1612726368,1410680145,-1006123069,1141130304,1815039843,1747667811,1478183763,-1073495101,1612857954,808649523,-1271560783,673777953,-1608482656,-534592798,-1540913245,-804011053,-1877900911,269549841,67503618,471600144,-1136882512,875955762,1208699715,-332410909,-2012706688,1814842464,-1473738592,337053459,-1006320448,336987666,-197868304,-1073560894,1141196097,-534658591,-736704814,1010765619,1010634033,-1945203070,-1743222640,673712160,1276005954,-197736718,1010699826,-1541044831,-130430479,202181889,-601894957,-669464368,673909539,1680229986,2017086066,606537507,741281571,-265174543,1882342002,1073889858,-736836400,1073824065,-1073692480,1882407795,1680295779,-1406366560,-2012509309,-197670925,-1406300767,-2147450752,471797523,-938816830,741084192,-1473607006,875824176,-804076846,134941443,-332476702,-399914527,1545424209,-1810594672,404228112,-130496272,1410811731,-1406234974,134744064,-1006254655,269681427,-871510591,-2079947134,-1204188751,-62926861,2084392305,-1073626687,808517937,-197802511,-2012575102,1747602018,-1338932815,-804142639,538968096,-736639021,131586,539099682,67372032,1747470432,1882276209,67569411,-669266989,-1675784815,-1743156847,1612792161,-1136750926,-467220766,1478052177,-602026543,1343308113,-1877966704,-602092336,-1743091054,-1608285277,-1473541213,-804208432,-2147384959,202313475,1141327683,404359698,-534527005,-332608288,-1945268863,-1136685133,-1810463086,2017151859,1545358416,-1608351070,-1608416863,1612923747,539165475,1275940161,-938948416,-1675719022,-1675850608,943327794,202116096,741215778,-1204122958,1814974050,-1675653229,1478117970,-265108750,-1877835118,-265042957,1208568129,2016954480,-871576384,336921873,-130298893,1882210416,1949648241,2084523891,875889969,269484048,197379,1680098400,1814908257,-1006188862,1949582448,-736770607,-1271626576,-399848734,134809857,1949714034,404293905,-62992654,1073758272,269615634,-534724384,-1136816719,67437825,-130364686,65793,-265240336,673843746,1545490002,-1473672799,1410745938,1073955651,-2080012927,336856080,-2012640895,-1743025261,-1338998608,-467286559,1208502336,2017020273,-1810397293,-63124240,471731730,-2147319166,539033889,-1945334656,404425491,1545555795,1949779827,1410614352,-1338867022,471665937,606405921,1276071747,0,1141261890,-332542495,1477986384,1343373906,-399782941,2084458098,-669332782,-938882623,-63058447,808452144,-1810528879,1680164193,1010568240,-1271494990,-467352352,-1204057165,2084326512,202247682,1343242320,943262001,606471714,808583730,-2080078720,1747536225,-1877769325,876021555,-467154973,606340128,-1541110624,-938751037,1343439699,134875650,-2079881341,-669398575,1275874368,-2147253373,-1945137277,-871444798,943393587,1208633922,-1271429197];
csafe_crypto_cipher_symm_SEED.SS2 = [-1582814839,-2122054267,-757852474,-741338173,1347687492,287055117,-1599329140,556016901,1364991309,1128268611,270014472,303832590,1364201793,-251904820,-1027077430,1667244867,539502600,1078199364,538976256,-1852039795,-522182464,-488627518,-1060632376,320083719,-1583078011,-2087972977,50332419,1937259339,-1279771765,319820547,-758115646,-487838002,1886400576,-2138305396,859586319,-1599592312,842019330,-774103603,-218876218,1886663748,-521392948,-1852566139,50858763,1398019911,1348213836,1398283083,-1313063539,16777473,539239428,270277644,1936732995,-1869080440,269488128,-1060369204,-219139390,-774366775,539765772,-471586873,1919955522,-2088762493,-1818748021,-774893119,-2105276794,-1043854903,1616912448,1347424320,-1549786237,-471323701,17566989,-1296812410,-1835262322,1129058127,-1280034937,1381505610,-1027340602,1886926920,-1566300538,303043074,-1548996721,-774629947,1633689921,-1010826301,-1330367356,1094713665,1380979266,1903967565,-2121527923,526344,320610063,-1852302967,0,286791945,263172,1397756739,-202098745,-505404991,-235127347,1920218694,590098191,589571847,-1330630528,-2088236149,34344462,-1549259893,-1566563710,1651256910,-1819274365,1095503181,1634216265,1887190092,17303817,34081290,-1279508593,-471060529,-202361917,-1044118075,-2088499321,269751300,-218349874,1617175620,-757326130,573320718,1128794955,303569418,33818118,555753729,1667771211,1650730566,33554946,-235653691,-1836051838,-2105013622,789516,-1280298109,1920745038,-791670592,1920481866,1128531783,-1835788666,-505141819,572794374,-2139094912,-1582551667,-740548657,-1583341183,808464384,859059975,-1565774194,842282502,286528773,572531202,808990728,-252431164,-1549523065,1094976837,1078725708,-2122317439,-504878647,-2138831740,-1819011193,825505029,-1010299957,-1026814258,809253900,1903178049,286265601,-1010563129,-2121791095,1903441221,-201835573,-757589302,-252167992,-1869343612,1364728137,-2105539966,-1060895548,-201572401,1095240009,825768201,1667508039,-1061158720,-1010036785,-741075001,-1330104184,51121935,-2104750450,1111491138,589308675,-1852829311,1617701964,-740811829,-1599855484,808727556,-235916863,1078462536,-1027603774,1668034383,826031373,556543245,1077936192,-1296286066,842808846,-1329841012,-1044381247,-1566037366,-1296549238,1112280654,1364464965,859323147,-790881076,1617438792,1937522511,-1868817268,-791144248,1112017482,1381242438,1936996167,-1600118656,-504615475,1111754310,-1313589883,589835019,1633953093,-218613046,-471850045,-1313326711,-1313853055,-1818484849,1381768782,-235390519,-488364346,-1297075582,825241857,-488101174,1634479437,1398546255,-521919292,-252694336,-1043591731,-2138568568,303306246,842545674,1347950664,-791407420,1650467394,556280073,50595591,858796803,-521656120,320346891,17040645,1903704393,-1869606784,1650993738,573057546,-1835525494];
csafe_crypto_cipher_symm_SEED.SS3 = [137377848,-924784600,220277805,-2036161498,-809251825,-825041890,-2085375949,-2001684424,-1885098961,1080057888,1162957845,-943471609,1145062404,1331915823,1264805931,1263753243,-1010581501,1113743394,53686323,-2051951563,153167913,-2136956896,-1025318878,-2019318745,-1009528813,-2121166831,17895441,100795398,202382364,-1934574532,103953462,1262700555,-807146449,-2004842488,1281387564,-2002737112,118690839,-993999868,101848086,-990841804,-1027424254,1161905157,-1042161631,-959261674,255015999,221330493,-1904047090,-2003789800,136325160,1312967694,-957156298,238173246,-2053004251,-906889159,218172429,-808199137,-925837288,186853419,1180853286,1249015866,119743527,253963311,-1041108943,1114796082,1111638018,-992947180,1094795265,-1061109760,1131638835,1197696039,-1935627220,-1954314229,-940313545,-1918784467,-2139062272,252910623,-893204470,203435052,-1969051606,70267956,-1026371566,184748043,-823989202,-907941847,1297177629,-2070899692,135272472,-923731912,1196643351,-1901941714,134219784,-977157115,51580947,-842937331,-2038266874,-1984841671,-806093761,1299283005,-1044267007,20000817,-973999051,-1971156982,1247963178,-2119061455,-1043214319,2105376,-942418921,33685506,35790882,67109892,1214277672,1097953329,117638151,-875309029,-1919837155,-1986947047,1096900641,-1900889026,-958208986,1230067737,-841884643,1095847953,-2138009584,-858727396,-1970104294,-2086428637,-1952208853,-1060057072,-2122219519,251857935,1195590663,168957978,-1008476125,-857674708,-1920889843,-1884046273,-2037214186,1265858619,1280334876,-2103271390,-2120114143,1130586147,52633635,1296124941,-926889976,-1902994402,-1936679908,171063354,201329676,237120558,-1967998918,1315073070,-1886151649,1246910490,-1024266190,-2104324078,-1007423437,1229015049,1215330360,-859780084,85005333,-873203653,1081110576,1165063221,1332968511,87110709,1052688,50528259,1147167780,1298230317,-960314362,1148220468,-976104427,-2068794316,-891099094,151062537,1181905974,152115225,-822936514,1077952512,34738194,-1059004384,-1917731779,83952645,-890046406,16842753,-1057951696,170010666,1314020382,-1985894359,1179800598,1128480771,-2055109627,68162580,-1987999735,-1953261541,-2135904208,-975051739,1212172296,1232173113,-2020371433,-856622020,236067870,-2105376766,18948129,-1937732596,185800731,1330863135,1198748727,1146115092,-2102218702,219225117,86058021,1329810447,0,1178747910,-840831955,1213224984,1112690706,-874256341,1316125758,-892151782,-910047223,-839779267,3158064,-2054056939,1164010533,204487740,-2035108810,-991894492,-1951156165,1282440252,235015182,1079005200,154220601,102900774,36843570,-2071952380,1231120425,-2087481325,120796215,-941366233,69215268,-2069847004,-876361717,1129533459,167905290,-2021424121,-908994535,1279282188,-2088534013,-1887204337,-826094578,187906107,1245857802,-2018266057];
csafe_crypto_cipher_symm_SEED.KC = [-1640531527,1013904243,2027808486,-239350324,-478700647,-957401293,-1914802585,465362127,930724254,1861448508,-572070280,-1144140559,2006686179,-281594938,-563189875,-1126379749];
csafe_crypto_hash_Md5.BYTES = 16;
csafe_crypto_hash_Md5.inst = new csafe_crypto_hash_Md5();
csafe_crypto_hash_Sha1.BYTES = 20;
csafe_crypto_hash_Sha1.K = [1518500249,1859775393,-1894007588,-899497514];
csafe_crypto_hash_Sha256.BYTES = 32;
csafe_crypto_hash_Sha256.charSize = 8;
csafe_math_BigInteger.MAX_RADIX = 36;
csafe_math_BigInteger.MIN_RADIX = 2;
csafe_pkcs_ContentInfo.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().ObjectIdentifier("contentType").ContextSpecific(null,csafe_asn1_ASN1.OPTIONAL).ANY("content").build(csafe_pkcs_ContentInfo);
csafe_pkcs_EncryptedContentInfo.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().ObjectIdentifier("contentType").Import("contentEncryptionAlgorithm",csafe_asn1_impl_AlgorithmID.struct).ContextSpecific(null,csafe_asn1_ASN1.OPTIONAL | csafe_asn1_ASN1.IMPLICIT).OCTET_STRING("encryptedContent").build(csafe_pkcs_EncryptedContentInfo);
csafe_pkcs_EncryptedData.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().INTEGER("version").Import("encryptedContentInfo",csafe_pkcs_EncryptedContentInfo.struct).build(csafe_pkcs_EncryptedData);
csafe_pkcs_pkcs7_DigestInfo.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().Import("digestAlgorithm",csafe_asn1_impl_AlgorithmID.struct).OCTET_STRING("digest").build(csafe_pkcs_pkcs7_DigestInfo);
csafe_pkcs_MacData.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().Import("mac",csafe_pkcs_pkcs7_DigestInfo.struct).OCTET_STRING("macSalt").INTEGER("iterations",csafe_asn1_ASN1.OPTIONAL).build(csafe_pkcs_MacData);
csafe_pkcs_RecipientInfo.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().INTEGER("version").Import("issuerAndSerialNumber",csafe_asn1_impl_IssuerAndSerialNumber.struct).Import("keyEncryptionAlgorithm",csafe_asn1_impl_AlgorithmID.struct).OCTET_STRING("encryptedKey").build(csafe_pkcs_RecipientInfo);
csafe_pkcs_pkcs12_AuthenticatedSafe.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCEOF().Import(null,csafe_pkcs_ContentInfo.struct).build(csafe_pkcs_pkcs12_AuthenticatedSafe);
csafe_pkcs_pkcs12_CertBag.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().ObjectIdentifier("certId").ContextSpecific().ANY("certValue").build(csafe_pkcs_pkcs12_CertBag);
csafe_pkcs_pkcs12_PFX.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().INTEGER("version").Import("authSafe",csafe_pkcs_ContentInfo.struct).Import("macData",csafe_pkcs_MacData.struct,true).build(csafe_pkcs_pkcs12_PFX);
csafe_pkcs_pkcs12_SafeBag.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().ObjectIdentifier("bagId").ContextSpecific().ANY("bagValue").SETOF("bagAttributes").Import(null,csafe_asn1_impl_Attribute.struct).build(csafe_pkcs_pkcs12_SafeBag);
csafe_pkcs_pkcs12_SafeContents.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCEOF().Import(null,csafe_pkcs_pkcs12_SafeBag.struct).build(csafe_pkcs_pkcs12_SafeContents);
csafe_pkcs_pkcs7_EnvelopedData.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().INTEGER("version").SETOF("recipientInfos").Import(null,csafe_pkcs_RecipientInfo.struct).CLOSE().Import("encryptedContentInfo",csafe_pkcs_EncryptedContentInfo.struct).build(csafe_pkcs_pkcs7_EnvelopedData);
csafe_pkcs_pkcs7_SignerInfo.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().INTEGER("version").Import("issuerAndSerialNumber",csafe_asn1_impl_IssuerAndSerialNumber.struct).Import("digestAlgorithm",csafe_asn1_impl_AlgorithmID.struct).ContextSpecific(null,csafe_asn1_ASN1.OPTIONAL | csafe_asn1_ASN1.IMPLICIT).SETOF("authenticatedAttributes").Import(null,csafe_asn1_impl_Attribute.struct).CLOSE().Import("digestEncryptionAlgorithm",csafe_asn1_impl_AlgorithmID.struct).OCTET_STRING("encryptedDigest").ContextSpecific(null,csafe_asn1_ASN1.OPTIONAL | csafe_asn1_ASN1.IMPLICIT).SETOF("unauthenticatedAttributes").Import(null,csafe_asn1_impl_Attribute.struct).CLOSE().build(csafe_pkcs_pkcs7_SignerInfo);
csafe_pkcs_pkcs7_SignedData.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().INTEGER("version").SETOF("digestAlgorithms").Import(null,csafe_asn1_impl_AlgorithmID.struct).CLOSE().Import("contentInfo",csafe_pkcs_ContentInfo.struct).ContextSpecific(null,csafe_asn1_ASN1.OPTIONAL | csafe_asn1_ASN1.IMPLICIT).SETOF("certificates").Import(null,csafe_x509_X509Certificate.struct).CLOSE().ContextSpecific(null,csafe_asn1_ASN1.OPTIONAL | csafe_asn1_ASN1.IMPLICIT).SETOF("crls").ANY().CLOSE().SETOF("signerInfos").Import(null,csafe_pkcs_pkcs7_SignerInfo.struct).CLOSE().build(csafe_pkcs_pkcs7_SignedData);
csafe_pkcs_pkcs8_PKCS8EncryptedPrivateKey.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().Import("encryptionAlgorithm",csafe_asn1_impl_AlgorithmID.struct).OCTET_STRING("encryptedData").build(csafe_pkcs_pkcs8_PKCS8EncryptedPrivateKey);
csafe_pkcs_pkcs8_PKCS8PrivateKey.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().INTEGER("version").Import("privateKeyAlgorithm",csafe_asn1_impl_AlgorithmID.struct).OCTET_STRING("privateKey").ContextSpecific(null,csafe_asn1_ASN1.OPTIONAL | csafe_asn1_ASN1.IMPLICIT).SETOF("attributes").Import(null,csafe_asn1_impl_Attribute.struct).build(csafe_pkcs_pkcs8_PKCS8PrivateKey);
csafe_x509_ext_AccessDescription.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().ObjectIdentifier("accessMethod").Import("accessLocation",csafe_asn1_impl_GeneralName.struct).build(csafe_x509_ext_AccessDescription);
csafe_x509_ext_AuthorityInformationAccess.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCEOF().Import("accessDescriptions",csafe_x509_ext_AccessDescription.struct).build(csafe_x509_ext_AuthorityInformationAccess);
csafe_x509_ext_AuthorityKeyIdentifier.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().ContextSpecific(null,csafe_asn1_ASN1.OPTIONAL | csafe_asn1_ASN1.IMPLICIT).OCTET_STRING("keyIdentifier").ContextSpecific(null,csafe_asn1_ASN1.OPTIONAL | csafe_asn1_ASN1.IMPLICIT).Import("authorityCertIssuer",csafe_asn1_impl_GeneralNames.struct).ContextSpecific(null,csafe_asn1_ASN1.OPTIONAL | csafe_asn1_ASN1.IMPLICIT).INTEGER("authorityCertSerialNumber").build(csafe_x509_ext_AuthorityKeyIdentifier);
csafe_x509_ext_BasicConstraints.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCE().BOOLEAN("cA",csafe_asn1_ASN1.OPTIONAL).INTEGER("pathLengthConstraints",csafe_asn1_ASN1.OPTIONAL).build(csafe_x509_ext_BasicConstraints);
csafe_x509_ext_CRLDistributionPoints.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCEOF().Import("cRLDistributionPoints",csafe_asn1_impl_DistributionPoint.struct).build(csafe_x509_ext_CRLDistributionPoints);
csafe_x509_ext_CertificatePolicies.struct = new csafe_asn1_ASN1TypeBuilder().SEQUENCEOF().Import("certificatePolicies",csafe_asn1_impl_PolicyInformation.struct).build(csafe_x509_ext_CertificatePolicies);
csafe_x509_ext_KeyUsage.DigitalSignature = 0;
csafe_x509_ext_KeyUsage.NonRepudation = 1;
csafe_x509_ext_KeyUsage.KeyEncipherment = 2;
csafe_x509_ext_KeyUsage.DataEncipherment = 3;
csafe_x509_ext_KeyUsage.KeyAgreement = 4;
csafe_x509_ext_KeyUsage.KeyCertificateSign = 5;
csafe_x509_ext_KeyUsage.CRLsign = 6;
csafe_x509_ext_KeyUsage.EnCipherOnly = 7;
csafe_x509_ext_KeyUsage.DeCipherOnly = 8;
csafe_x509_ext_KeyUsage.struct = new csafe_asn1_ASN1TypeBuilder().BIT_STRING().build(csafe_x509_ext_KeyUsage);
csafe_x509_ext_SubjectKeyIdentifier.struct = new csafe_asn1_ASN1TypeBuilder().OCTET_STRING().build(csafe_x509_ext_SubjectKeyIdentifier);
haxe_crypto_Base64.CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
haxe_crypto_Base64.BYTES = haxe_io_Bytes.ofString(haxe_crypto_Base64.CHARS);
haxe_io_FPHelper.i64tmp = (function($this) {
	var $r;
	var this1 = new haxe__$Int64__$_$_$Int64(0,0);
	$r = this1;
	return $r;
}(this));
js_Boot.__toStr = ({ }).toString;
js_html_compat_Uint8Array.BYTES_PER_ELEMENT = 1;
util_Constants.DIGITS_BASE10 = "0123456789";
util_Constants.DIGITS_HEXU = "0123456789ABCDEF";
util_Constants.DIGITS_HEXL = "0123456789abcdef";
util_Constants.DIGITS_OCTAL = "01234567";
util_Constants.DIGITS_BN = "0123456789abcdefghijklmnopqrstuvwxyz";
util_Constants.DIGITS_BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
util_Constants.PROTO_HTTP = "http://";
util_Constants.PROTO_HTTPS = "http://";
util_Constants.PROTO_FILE = "file://";
util_Constants.PROTO_FTP = "ftp://";
util_Constants.PROTO_RTMP = "rtmp://";
util_Int32Util.ZERO = 0;
util_Int32Util.ONE = 1;
util_Int32Util.BYTE_MASK = 255;
util_RejectWrapper.systemReject = function(err) {
	haxe_Log.trace("[RejectWrap] : " + err,{ fileName : "RejectWrapper.hx", lineNumber : 6, className : "util.RejectWrapper", methodName : "systemReject"});
};
app_KeySharpMain.main();
})(typeof exports != "undefined" ? exports : typeof window != "undefined" ? window : typeof self != "undefined" ? self : this, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);



/** Mozilla MDN Polyfill */
function defineProperties(obj, properties) {
  function convertToDescriptor(desc) {
    function hasProperty(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    }

    function isCallable(v) {
      // NB: modify as necessary if other values than functions are callable.
      return typeof v === "function";
    }

    if (typeof desc !== "object" || desc === null)
      throw new TypeError("bad desc");

    var d = {};

    if (hasProperty(desc, "enumerable"))
      d.enumerable = !!obj.enumerable;
    if (hasProperty(desc, "configurable"))
      d.configurable = !!obj.configurable;
    if (hasProperty(desc, "value"))
      d.value = obj.value;
    if (hasProperty(desc, "writable"))
      d.writable = !!desc.writable;
    if (hasProperty(desc, "get")) {
      var g = desc.get;

      if (!isCallable(g) && typeof g !== "undefined")
        throw new TypeError("bad get");
      d.get = g;
    }
    if (hasProperty(desc, "set")) {
      var s = desc.set;
      if (!isCallable(s) && typeof s !== "undefined")
        throw new TypeError("bad set");
      d.set = s;
    }

    if (("get" in d || "set" in d) && ("value" in d || "writable" in d))
      throw new TypeError("identity-confused descriptor");

    return d;
  }

  if (typeof obj !== "object" || obj === null)
    throw new TypeError("bad obj");

  properties = Object(properties);

  var keys = Object.keys(properties);
  var descs = [];

  for (var i = 0; i < keys.length; i++)
    descs.push([keys[i], convertToDescriptor(properties[keys[i]])]);

  for (var i = 0; i < descs.length; i++)
    Object.defineProperty(obj, descs[i][0], descs[i][1]);

  return obj;
}




(function() {
  try {
    var a = new Uint8Array(1);
    return; //no need
  } catch(e) { }

  function subarray(start, end) {
    return this.slice(start, end);
  }

  function set_(array, offset) {
    if (arguments.length < 2) offset = 0;
    for (var i = 0, n = array.length; i < n; ++i, ++offset)
      this[offset] = array[i] & 0xFF;
  }

  // we need typed arrays
  function TypedArray(arg1) {
    var result;
    if (typeof arg1 === "number") {
       result = new Array(arg1);
       for (var i = 0; i < arg1; ++i)
         result[i] = 0;
    } else
       result = arg1.slice(0);
    result.subarray = subarray;
    result.buffer = result;
    result.byteLength = result.length;
    result.set = set_;
    if (typeof arg1 === "object" && arg1.buffer)
      result.buffer = arg1.buffer;

    return result;
  }

  window.Uint8Array = TypedArray;
  window.Uint32Array = TypedArray;
  window.Int32Array = TypedArray;
})();




(function() {
  if ("btoa" in window)
    return;

  var digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

  window.btoa = function(chars) {
    var buffer = "";
    var i, n;
    for (i = 0, n = chars.length; i < n; i += 3) {
      var b1 = chars.charCodeAt(i) & 0xFF;
      var b2 = chars.charCodeAt(i + 1) & 0xFF;
      var b3 = chars.charCodeAt(i + 2) & 0xFF;
      var d1 = b1 >> 2, d2 = ((b1 & 3) << 4) | (b2 >> 4);
      var d3 = i + 1 < n ? ((b2 & 0xF) << 2) | (b3 >> 6) : 64;
      var d4 = i + 2 < n ? (b3 & 0x3F) : 64;
      buffer += digits.charAt(d1) + digits.charAt(d2) + digits.charAt(d3) + digits.charAt(d4);
    }
    return buffer;
  }; 
})();


// Production steps of ECMA-262, Edition 5, 15.4.4.14
// Reference: http://es5.github.io/#x15.4.4.14
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(searchElement, fromIndex) {

    var k;

    // 1. Let O be the result of calling ToObject passing
    //    the this value as the argument.
    if (this == null) {
      throw new TypeError('"this" is null or not defined');
    }

    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get
    //    internal method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If len is 0, return -1.
    if (len === 0) {
      return -1;
    }

    // 5. If argument fromIndex was passed let n be
    //    ToInteger(fromIndex); else let n be 0.
    var n = +fromIndex || 0;

    if (Math.abs(n) === Infinity) {
      n = 0;
    }

    // 6. If n >= len, return -1.
    if (n >= len) {
      return -1;
    }

    // 7. If n >= 0, then Let k be n.
    // 8. Else, n<0, Let k be len - abs(n).
    //    If k is less than 0, then let k be 0.
    k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

    // 9. Repeat, while k < len
    while (k < len) {
      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the
      //    HasProperty internal method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      //    i.  Let elementK be the result of calling the Get
      //        internal method of O with the argument ToString(k).
      //   ii.  Let same be the result of applying the
      //        Strict Equality Comparison Algorithm to
      //        searchElement and elementK.
      //  iii.  If same is true, return k.
      if (k in O && O[k] === searchElement) {
        return k;
      }
      k++;
    }
    return -1;
  };
}

if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}

if (typeof Array.prototype.forEach != 'function') {
    Array.prototype.forEach = function(callback){
      for (var i = 0; i < this.length; i++){
        callback.apply(this, [this[i], i, this]);
      }
    };
}

if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.toString().replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
}



// Copyright 2014 Joshua Bell. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Indexes from: http://encoding.spec.whatwg.org/indexes.json
(function(global) {
  'use strict';
  global["encoding-indexes"] = {
  "euc-kr":[,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,12288,12289,12290,183,8229,8230,168,12291,173,8213,8741,65340,8764,8216,8217,8220,8221,12308,12309,12296,12297,12298,12299,12300,12301,12302,12303,12304,12305,177,215,247,8800,8804,8805,8734,8756,176,8242,8243,8451,8491,65504,65505,65509,9794,9792,8736,8869,8978,8706,8711,8801,8786,167,8251,9734,9733,9675,9679,9678,9671,9670,9633,9632,9651,9650,9661,9660,8594,8592,8593,8595,8596,12307,8810,8811,8730,8765,8733,8757,8747,8748,8712,8715,8838,8839,8834,8835,8746,8745,8743,8744,65506,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,8658,8660,8704,8707,180,65374,711,728,733,730,729,184,731,161,191,720,8750,8721,8719,164,8457,8240,9665,9664,9655,9654,9828,9824,9825,9829,9831,9827,8857,9672,9635,9680,9681,9618,9636,9637,9640,9639,9638,9641,9832,9743,9742,9756,9758,182,8224,8225,8597,8599,8601,8598,8600,9837,9833,9834,9836,12927,12828,8470,13255,8482,13250,13272,8481,8364,174,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,65281,65282,65283,65284,65285,65286,65287,65288,65289,65290,65291,65292,65293,65294,65295,65296,65297,65298,65299,65300,65301,65302,65303,65304,65305,65306,65307,65308,65309,65310,65311,65312,65313,65314,65315,65316,65317,65318,65319,65320,65321,65322,65323,65324,65325,65326,65327,65328,65329,65330,65331,65332,65333,65334,65335,65336,65337,65338,65339,65510,65341,65342,65343,65344,65345,65346,65347,65348,65349,65350,65351,65352,65353,65354,65355,65356,65357,65358,65359,65360,65361,65362,65363,65364,65365,65366,65367,65368,65369,65370,65371,65372,65373,65507,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,12593,12594,12595,12596,12597,12598,12599,12600,12601,12602,12603,12604,12605,12606,12607,12608,12609,12610,12611,12612,12613,12614,12615,12616,12617,12618,12619,12620,12621,12622,12623,12624,12625,12626,12627,12628,12629,12630,12631,12632,12633,12634,12635,12636,12637,12638,12639,12640,12641,12642,12643,12644,12645,12646,12647,12648,12649,12650,12651,12652,12653,12654,12655,12656,12657,12658,12659,12660,12661,12662,12663,12664,12665,12666,12667,12668,12669,12670,12671,12672,12673,12674,12675,12676,12677,12678,12679,12680,12681,12682,12683,12684,12685,12686,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,8560,8561,8562,8563,8564,8565,8566,8567,8568,8569,,,,,,8544,8545,8546,8547,8548,8549,8550,8551,8552,8553,,,,,,,,913,914,915,916,917,918,919,920,921,922,923,924,925,926,927,928,929,931,932,933,934,935,936,937,,,,,,,,,945,946,947,948,949,950,951,952,953,954,955,956,957,958,959,960,961,963,964,965,966,967,968,969,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,9472,9474,9484,9488,9496,9492,9500,9516,9508,9524,9532,9473,9475,9487,9491,9499,9495,9507,9523,9515,9531,9547,9504,9519,9512,9527,9535,9501,9520,9509,9528,9538,9490,9489,9498,9497,9494,9493,9486,9485,9502,9503,9505,9506,9510,9511,9513,9514,9517,9518,9521,9522,9525,9526,9529,9530,9533,9534,9536,9537,9539,9540,9541,9542,9543,9544,9545,9546,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,13205,13206,13207,8467,13208,13252,13219,13220,13221,13222,13209,13210,13211,13212,13213,13214,13215,13216,13217,13218,13258,13197,13198,13199,13263,13192,13193,13256,13223,13224,13232,13233,13234,13235,13236,13237,13238,13239,13240,13241,13184,13185,13186,13187,13188,13242,13243,13244,13245,13246,13247,13200,13201,13202,13203,13204,8486,13248,13249,13194,13195,13196,13270,13253,13229,13230,13231,13275,13225,13226,13227,13228,13277,13264,13267,13251,13257,13276,13254,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,198,208,170,294,,306,,319,321,216,338,186,222,358,330,,12896,12897,12898,12899,12900,12901,12902,12903,12904,12905,12906,12907,12908,12909,12910,12911,12912,12913,12914,12915,12916,12917,12918,12919,12920,12921,12922,12923,9424,9425,9426,9427,9428,9429,9430,9431,9432,9433,9434,9435,9436,9437,9438,9439,9440,9441,9442,9443,9444,9445,9446,9447,9448,9449,9312,9313,9314,9315,9316,9317,9318,9319,9320,9321,9322,9323,9324,9325,9326,189,8531,8532,188,190,8539,8540,8541,8542,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,230,273,240,295,305,307,312,320,322,248,339,223,254,359,331,329,12800,12801,12802,12803,12804,12805,12806,12807,12808,12809,12810,12811,12812,12813,12814,12815,12816,12817,12818,12819,12820,12821,12822,12823,12824,12825,12826,12827,9372,9373,9374,9375,9376,9377,9378,9379,9380,9381,9382,9383,9384,9385,9386,9387,9388,9389,9390,9391,9392,9393,9394,9395,9396,9397,9332,9333,9334,9335,9336,9337,9338,9339,9340,9341,9342,9343,9344,9345,9346,185,178,179,8308,8319,8321,8322,8323,8324,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,12353,12354,12355,12356,12357,12358,12359,12360,12361,12362,12363,12364,12365,12366,12367,12368,12369,12370,12371,12372,12373,12374,12375,12376,12377,12378,12379,12380,12381,12382,12383,12384,12385,12386,12387,12388,12389,12390,12391,12392,12393,12394,12395,12396,12397,12398,12399,12400,12401,12402,12403,12404,12405,12406,12407,12408,12409,12410,12411,12412,12413,12414,12415,12416,12417,12418,12419,12420,12421,12422,12423,12424,12425,12426,12427,12428,12429,12430,12431,12432,12433,12434,12435,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,12449,12450,12451,12452,12453,12454,12455,12456,12457,12458,12459,12460,12461,12462,12463,12464,12465,12466,12467,12468,12469,12470,12471,12472,12473,12474,12475,12476,12477,12478,12479,12480,12481,12482,12483,12484,12485,12486,12487,12488,12489,12490,12491,12492,12493,12494,12495,12496,12497,12498,12499,12500,12501,12502,12503,12504,12505,12506,12507,12508,12509,12510,12511,12512,12513,12514,12515,12516,12517,12518,12519,12520,12521,12522,12523,12524,12525,12526,12527,12528,12529,12530,12531,12532,12533,12534,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,1040,1041,1042,1043,1044,1045,1025,1046,1047,1048,1049,1050,1051,1052,1053,1054,1055,1056,1057,1058,1059,1060,1061,1062,1063,1064,1065,1066,1067,1068,1069,1070,1071,,,,,,,,,,,,,,,,1072,1073,1074,1075,1076,1077,1105,1078,1079,1080,1081,1082,1083,1084,1085,1086,1087,1088,1089,1090,1091,1092,1093,1094,1095,1096,1097,1098,1099,1100,1101,1102,1103,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,44032,44033,44036,44039,44040,44041,44042,44048,44049,44050,44051,44052,44053,44054,44055,44057,44058,44059,44060,44061,44064,44068,44076,44077,44079,44080,44081,44088,44089,44092,44096,44107,44109,44116,44120,44124,44144,44145,44148,44151,44152,44154,44160,44161,44163,44164,44165,44166,44169,44170,44171,44172,44176,44180,44188,44189,44191,44192,44193,44200,44201,44202,44204,44207,44208,44216,44217,44219,44220,44221,44225,44228,44232,44236,44245,44247,44256,44257,44260,44263,44264,44266,44268,44271,44272,44273,44275,44277,44278,44284,44285,44288,44292,44294,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,44300,44301,44303,44305,44312,44316,44320,44329,44332,44333,44340,44341,44344,44348,44356,44357,44359,44361,44368,44372,44376,44385,44387,44396,44397,44400,44403,44404,44405,44406,44411,44412,44413,44415,44417,44418,44424,44425,44428,44432,44444,44445,44452,44471,44480,44481,44484,44488,44496,44497,44499,44508,44512,44516,44536,44537,44540,44543,44544,44545,44552,44553,44555,44557,44564,44592,44593,44596,44599,44600,44602,44608,44609,44611,44613,44614,44618,44620,44621,44622,44624,44628,44630,44636,44637,44639,44640,44641,44645,44648,44649,44652,44656,44664,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,44665,44667,44668,44669,44676,44677,44684,44732,44733,44734,44736,44740,44748,44749,44751,44752,44753,44760,44761,44764,44776,44779,44781,44788,44792,44796,44807,44808,44813,44816,44844,44845,44848,44850,44852,44860,44861,44863,44865,44866,44867,44872,44873,44880,44892,44893,44900,44901,44921,44928,44932,44936,44944,44945,44949,44956,44984,44985,44988,44992,44999,45000,45001,45003,45005,45006,45012,45020,45032,45033,45040,45041,45044,45048,45056,45057,45060,45068,45072,45076,45084,45085,45096,45124,45125,45128,45130,45132,45134,45139,45140,45141,45143,45145,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,45149,45180,45181,45184,45188,45196,45197,45199,45201,45208,45209,45210,45212,45215,45216,45217,45218,45224,45225,45227,45228,45229,45230,45231,45233,45235,45236,45237,45240,45244,45252,45253,45255,45256,45257,45264,45265,45268,45272,45280,45285,45320,45321,45323,45324,45328,45330,45331,45336,45337,45339,45340,45341,45347,45348,45349,45352,45356,45364,45365,45367,45368,45369,45376,45377,45380,45384,45392,45393,45396,45397,45400,45404,45408,45432,45433,45436,45440,45442,45448,45449,45451,45453,45458,45459,45460,45464,45468,45480,45516,45520,45524,45532,45533,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,45535,45544,45545,45548,45552,45561,45563,45565,45572,45573,45576,45579,45580,45588,45589,45591,45593,45600,45620,45628,45656,45660,45664,45672,45673,45684,45685,45692,45700,45701,45705,45712,45713,45716,45720,45721,45722,45728,45729,45731,45733,45734,45738,45740,45744,45748,45768,45769,45772,45776,45778,45784,45785,45787,45789,45794,45796,45797,45798,45800,45803,45804,45805,45806,45807,45811,45812,45813,45815,45816,45817,45818,45819,45823,45824,45825,45828,45832,45840,45841,45843,45844,45845,45852,45908,45909,45910,45912,45915,45916,45918,45919,45924,45925,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,45927,45929,45931,45934,45936,45937,45940,45944,45952,45953,45955,45956,45957,45964,45968,45972,45984,45985,45992,45996,46020,46021,46024,46027,46028,46030,46032,46036,46037,46039,46041,46043,46045,46048,46052,46056,46076,46096,46104,46108,46112,46120,46121,46123,46132,46160,46161,46164,46168,46176,46177,46179,46181,46188,46208,46216,46237,46244,46248,46252,46261,46263,46265,46272,46276,46280,46288,46293,46300,46301,46304,46307,46308,46310,46316,46317,46319,46321,46328,46356,46357,46360,46363,46364,46372,46373,46375,46376,46377,46378,46384,46385,46388,46392,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,46400,46401,46403,46404,46405,46411,46412,46413,46416,46420,46428,46429,46431,46432,46433,46496,46497,46500,46504,46506,46507,46512,46513,46515,46516,46517,46523,46524,46525,46528,46532,46540,46541,46543,46544,46545,46552,46572,46608,46609,46612,46616,46629,46636,46644,46664,46692,46696,46748,46749,46752,46756,46763,46764,46769,46804,46832,46836,46840,46848,46849,46853,46888,46889,46892,46895,46896,46904,46905,46907,46916,46920,46924,46932,46933,46944,46948,46952,46960,46961,46963,46965,46972,46973,46976,46980,46988,46989,46991,46992,46993,46994,46998,46999,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,47000,47001,47004,47008,47016,47017,47019,47020,47021,47028,47029,47032,47047,47049,47084,47085,47088,47092,47100,47101,47103,47104,47105,47111,47112,47113,47116,47120,47128,47129,47131,47133,47140,47141,47144,47148,47156,47157,47159,47160,47161,47168,47172,47185,47187,47196,47197,47200,47204,47212,47213,47215,47217,47224,47228,47245,47272,47280,47284,47288,47296,47297,47299,47301,47308,47312,47316,47325,47327,47329,47336,47337,47340,47344,47352,47353,47355,47357,47364,47384,47392,47420,47421,47424,47428,47436,47439,47441,47448,47449,47452,47456,47464,47465,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,47467,47469,47476,47477,47480,47484,47492,47493,47495,47497,47498,47501,47502,47532,47533,47536,47540,47548,47549,47551,47553,47560,47561,47564,47566,47567,47568,47569,47570,47576,47577,47579,47581,47582,47585,47587,47588,47589,47592,47596,47604,47605,47607,47608,47609,47610,47616,47617,47624,47637,47672,47673,47676,47680,47682,47688,47689,47691,47693,47694,47699,47700,47701,47704,47708,47716,47717,47719,47720,47721,47728,47729,47732,47736,47747,47748,47749,47751,47756,47784,47785,47787,47788,47792,47794,47800,47801,47803,47805,47812,47816,47832,47833,47868,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,47872,47876,47885,47887,47889,47896,47900,47904,47913,47915,47924,47925,47926,47928,47931,47932,47933,47934,47940,47941,47943,47945,47949,47951,47952,47956,47960,47969,47971,47980,48008,48012,48016,48036,48040,48044,48052,48055,48064,48068,48072,48080,48083,48120,48121,48124,48127,48128,48130,48136,48137,48139,48140,48141,48143,48145,48148,48149,48150,48151,48152,48155,48156,48157,48158,48159,48164,48165,48167,48169,48173,48176,48177,48180,48184,48192,48193,48195,48196,48197,48201,48204,48205,48208,48221,48260,48261,48264,48267,48268,48270,48276,48277,48279,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,48281,48282,48288,48289,48292,48295,48296,48304,48305,48307,48308,48309,48316,48317,48320,48324,48333,48335,48336,48337,48341,48344,48348,48372,48373,48374,48376,48380,48388,48389,48391,48393,48400,48404,48420,48428,48448,48456,48457,48460,48464,48472,48473,48484,48488,48512,48513,48516,48519,48520,48521,48522,48528,48529,48531,48533,48537,48538,48540,48548,48560,48568,48596,48597,48600,48604,48617,48624,48628,48632,48640,48643,48645,48652,48653,48656,48660,48668,48669,48671,48708,48709,48712,48716,48718,48724,48725,48727,48729,48730,48731,48736,48737,48740,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,48744,48746,48752,48753,48755,48756,48757,48763,48764,48765,48768,48772,48780,48781,48783,48784,48785,48792,48793,48808,48848,48849,48852,48855,48856,48864,48867,48868,48869,48876,48897,48904,48905,48920,48921,48923,48924,48925,48960,48961,48964,48968,48976,48977,48981,49044,49072,49093,49100,49101,49104,49108,49116,49119,49121,49212,49233,49240,49244,49248,49256,49257,49296,49297,49300,49304,49312,49313,49315,49317,49324,49325,49327,49328,49331,49332,49333,49334,49340,49341,49343,49344,49345,49349,49352,49353,49356,49360,49368,49369,49371,49372,49373,49380,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,49381,49384,49388,49396,49397,49399,49401,49408,49412,49416,49424,49429,49436,49437,49438,49439,49440,49443,49444,49446,49447,49452,49453,49455,49456,49457,49462,49464,49465,49468,49472,49480,49481,49483,49484,49485,49492,49493,49496,49500,49508,49509,49511,49512,49513,49520,49524,49528,49541,49548,49549,49550,49552,49556,49558,49564,49565,49567,49569,49573,49576,49577,49580,49584,49597,49604,49608,49612,49620,49623,49624,49632,49636,49640,49648,49649,49651,49660,49661,49664,49668,49676,49677,49679,49681,49688,49689,49692,49695,49696,49704,49705,49707,49709,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,49711,49713,49714,49716,49736,49744,49745,49748,49752,49760,49765,49772,49773,49776,49780,49788,49789,49791,49793,49800,49801,49808,49816,49819,49821,49828,49829,49832,49836,49837,49844,49845,49847,49849,49884,49885,49888,49891,49892,49899,49900,49901,49903,49905,49910,49912,49913,49915,49916,49920,49928,49929,49932,49933,49939,49940,49941,49944,49948,49956,49957,49960,49961,49989,50024,50025,50028,50032,50034,50040,50041,50044,50045,50052,50056,50060,50112,50136,50137,50140,50143,50144,50146,50152,50153,50157,50164,50165,50168,50184,50192,50212,50220,50224,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,50228,50236,50237,50248,50276,50277,50280,50284,50292,50293,50297,50304,50324,50332,50360,50364,50409,50416,50417,50420,50424,50426,50431,50432,50433,50444,50448,50452,50460,50472,50473,50476,50480,50488,50489,50491,50493,50500,50501,50504,50505,50506,50508,50509,50510,50515,50516,50517,50519,50520,50521,50525,50526,50528,50529,50532,50536,50544,50545,50547,50548,50549,50556,50557,50560,50564,50567,50572,50573,50575,50577,50581,50583,50584,50588,50592,50601,50612,50613,50616,50617,50619,50620,50621,50622,50628,50629,50630,50631,50632,50633,50634,50636,50638,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,50640,50641,50644,50648,50656,50657,50659,50661,50668,50669,50670,50672,50676,50678,50679,50684,50685,50686,50687,50688,50689,50693,50694,50695,50696,50700,50704,50712,50713,50715,50716,50724,50725,50728,50732,50733,50734,50736,50739,50740,50741,50743,50745,50747,50752,50753,50756,50760,50768,50769,50771,50772,50773,50780,50781,50784,50796,50799,50801,50808,50809,50812,50816,50824,50825,50827,50829,50836,50837,50840,50844,50852,50853,50855,50857,50864,50865,50868,50872,50873,50874,50880,50881,50883,50885,50892,50893,50896,50900,50908,50909,50912,50913,50920,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,50921,50924,50928,50936,50937,50941,50948,50949,50952,50956,50964,50965,50967,50969,50976,50977,50980,50984,50992,50993,50995,50997,50999,51004,51005,51008,51012,51018,51020,51021,51023,51025,51026,51027,51028,51029,51030,51031,51032,51036,51040,51048,51051,51060,51061,51064,51068,51069,51070,51075,51076,51077,51079,51080,51081,51082,51086,51088,51089,51092,51094,51095,51096,51098,51104,51105,51107,51108,51109,51110,51116,51117,51120,51124,51132,51133,51135,51136,51137,51144,51145,51148,51150,51152,51160,51165,51172,51176,51180,51200,51201,51204,51208,51210,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,51216,51217,51219,51221,51222,51228,51229,51232,51236,51244,51245,51247,51249,51256,51260,51264,51272,51273,51276,51277,51284,51312,51313,51316,51320,51322,51328,51329,51331,51333,51334,51335,51339,51340,51341,51348,51357,51359,51361,51368,51388,51389,51396,51400,51404,51412,51413,51415,51417,51424,51425,51428,51445,51452,51453,51456,51460,51461,51462,51468,51469,51471,51473,51480,51500,51508,51536,51537,51540,51544,51552,51553,51555,51564,51568,51572,51580,51592,51593,51596,51600,51608,51609,51611,51613,51648,51649,51652,51655,51656,51658,51664,51665,51667,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,51669,51670,51673,51674,51676,51677,51680,51682,51684,51687,51692,51693,51695,51696,51697,51704,51705,51708,51712,51720,51721,51723,51724,51725,51732,51736,51753,51788,51789,51792,51796,51804,51805,51807,51808,51809,51816,51837,51844,51864,51900,51901,51904,51908,51916,51917,51919,51921,51923,51928,51929,51936,51948,51956,51976,51984,51988,51992,52000,52001,52033,52040,52041,52044,52048,52056,52057,52061,52068,52088,52089,52124,52152,52180,52196,52199,52201,52236,52237,52240,52244,52252,52253,52257,52258,52263,52264,52265,52268,52270,52272,52280,52281,52283,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,52284,52285,52286,52292,52293,52296,52300,52308,52309,52311,52312,52313,52320,52324,52326,52328,52336,52341,52376,52377,52380,52384,52392,52393,52395,52396,52397,52404,52405,52408,52412,52420,52421,52423,52425,52432,52436,52452,52460,52464,52481,52488,52489,52492,52496,52504,52505,52507,52509,52516,52520,52524,52537,52572,52576,52580,52588,52589,52591,52593,52600,52616,52628,52629,52632,52636,52644,52645,52647,52649,52656,52676,52684,52688,52712,52716,52720,52728,52729,52731,52733,52740,52744,52748,52756,52761,52768,52769,52772,52776,52784,52785,52787,52789,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,52824,52825,52828,52831,52832,52833,52840,52841,52843,52845,52852,52853,52856,52860,52868,52869,52871,52873,52880,52881,52884,52888,52896,52897,52899,52900,52901,52908,52909,52929,52964,52965,52968,52971,52972,52980,52981,52983,52984,52985,52992,52993,52996,53000,53008,53009,53011,53013,53020,53024,53028,53036,53037,53039,53040,53041,53048,53076,53077,53080,53084,53092,53093,53095,53097,53104,53105,53108,53112,53120,53125,53132,53153,53160,53168,53188,53216,53217,53220,53224,53232,53233,53235,53237,53244,53248,53252,53265,53272,53293,53300,53301,53304,53308,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,53316,53317,53319,53321,53328,53332,53336,53344,53356,53357,53360,53364,53372,53373,53377,53412,53413,53416,53420,53428,53429,53431,53433,53440,53441,53444,53448,53449,53456,53457,53459,53460,53461,53468,53469,53472,53476,53484,53485,53487,53488,53489,53496,53517,53552,53553,53556,53560,53562,53568,53569,53571,53572,53573,53580,53581,53584,53588,53596,53597,53599,53601,53608,53612,53628,53636,53640,53664,53665,53668,53672,53680,53681,53683,53685,53690,53692,53696,53720,53748,53752,53767,53769,53776,53804,53805,53808,53812,53820,53821,53823,53825,53832,53852,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,53860,53888,53889,53892,53896,53904,53905,53909,53916,53920,53924,53932,53937,53944,53945,53948,53951,53952,53954,53960,53961,53963,53972,53976,53980,53988,53989,54000,54001,54004,54008,54016,54017,54019,54021,54028,54029,54030,54032,54036,54038,54044,54045,54047,54048,54049,54053,54056,54057,54060,54064,54072,54073,54075,54076,54077,54084,54085,54140,54141,54144,54148,54156,54157,54159,54160,54161,54168,54169,54172,54176,54184,54185,54187,54189,54196,54200,54204,54212,54213,54216,54217,54224,54232,54241,54243,54252,54253,54256,54260,54268,54269,54271,54273,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,54280,54301,54336,54340,54364,54368,54372,54381,54383,54392,54393,54396,54399,54400,54402,54408,54409,54411,54413,54420,54441,54476,54480,54484,54492,54495,54504,54508,54512,54520,54523,54525,54532,54536,54540,54548,54549,54551,54588,54589,54592,54596,54604,54605,54607,54609,54616,54617,54620,54624,54629,54632,54633,54635,54637,54644,54645,54648,54652,54660,54661,54663,54664,54665,54672,54693,54728,54729,54732,54736,54738,54744,54745,54747,54749,54756,54757,54760,54764,54772,54773,54775,54777,54784,54785,54788,54792,54800,54801,54803,54804,54805,54812,54816,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,54820,54829,54840,54841,54844,54848,54853,54856,54857,54859,54861,54865,54868,54869,54872,54876,54887,54889,54896,54897,54900,54915,54917,54924,54925,54928,54932,54941,54943,54945,54952,54956,54960,54969,54971,54980,54981,54984,54988,54993,54996,54999,55001,55008,55012,55016,55024,55029,55036,55037,55040,55044,55057,55064,55065,55068,55072,55080,55081,55083,55085,55092,55093,55096,55100,55108,55111,55113,55120,55121,55124,55126,55127,55128,55129,55136,55137,55139,55141,55145,55148,55152,55156,55164,55165,55169,55176,55177,55180,55184,55192,55193,55195,55197,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,20285,20339,20551,20729,21152,21487,21621,21733,22025,23233,23478,26247,26550,26551,26607,27468,29634,30146,31292,33499,33540,34903,34952,35382,36040,36303,36603,36838,39381,21051,21364,21508,24682,24932,27580,29647,33050,35258,35282,38307,20355,21002,22718,22904,23014,24178,24185,25031,25536,26438,26604,26751,28567,30286,30475,30965,31240,31487,31777,32925,33390,33393,35563,38291,20075,21917,26359,28212,30883,31469,33883,35088,34638,38824,21208,22350,22570,23884,24863,25022,25121,25954,26577,27204,28187,29976,30131,30435,30640,32058,37039,37969,37970,40853,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,21283,23724,30002,32987,37440,38296,21083,22536,23004,23713,23831,24247,24378,24394,24951,27743,30074,30086,31968,32115,32177,32652,33108,33313,34193,35137,35611,37628,38477,40007,20171,20215,20491,20977,22607,24887,24894,24936,25913,27114,28433,30117,30342,30422,31623,33445,33995,63744,37799,38283,21888,23458,22353,63745,31923,32697,37301,20520,21435,23621,24040,25298,25454,25818,25831,28192,28844,31067,36317,36382,63746,36989,37445,37624,20094,20214,20581,24062,24314,24838,26967,33137,34388,36423,37749,39467,20062,20625,26480,26688,20745,21133,21138,27298,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,30652,37392,40660,21163,24623,36850,20552,25001,25581,25802,26684,27268,28608,33160,35233,38548,22533,29309,29356,29956,32121,32365,32937,35211,35700,36963,40273,25225,27770,28500,32080,32570,35363,20860,24906,31645,35609,37463,37772,20140,20435,20510,20670,20742,21185,21197,21375,22384,22659,24218,24465,24950,25004,25806,25964,26223,26299,26356,26775,28039,28805,28913,29855,29861,29898,30169,30828,30956,31455,31478,32069,32147,32789,32831,33051,33686,35686,36629,36885,37857,38915,38968,39514,39912,20418,21843,22586,22865,23395,23622,24760,25106,26690,26800,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,26856,28330,30028,30328,30926,31293,31995,32363,32380,35336,35489,35903,38542,40388,21476,21481,21578,21617,22266,22993,23396,23611,24235,25335,25911,25925,25970,26272,26543,27073,27837,30204,30352,30590,31295,32660,32771,32929,33167,33510,33533,33776,34241,34865,34996,35493,63747,36764,37678,38599,39015,39640,40723,21741,26011,26354,26767,31296,35895,40288,22256,22372,23825,26118,26801,26829,28414,29736,34974,39908,27752,63748,39592,20379,20844,20849,21151,23380,24037,24656,24685,25329,25511,25915,29657,31354,34467,36002,38799,20018,23521,25096,26524,29916,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,31185,33747,35463,35506,36328,36942,37707,38982,24275,27112,34303,37101,63749,20896,23448,23532,24931,26874,27454,28748,29743,29912,31649,32592,33733,35264,36011,38364,39208,21038,24669,25324,36866,20362,20809,21281,22745,24291,26336,27960,28826,29378,29654,31568,33009,37979,21350,25499,32619,20054,20608,22602,22750,24618,24871,25296,27088,39745,23439,32024,32945,36703,20132,20689,21676,21932,23308,23968,24039,25898,25934,26657,27211,29409,30350,30703,32094,32761,33184,34126,34527,36611,36686,37066,39171,39509,39851,19992,20037,20061,20167,20465,20855,21246,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,21312,21475,21477,21646,22036,22389,22434,23495,23943,24272,25084,25304,25937,26552,26601,27083,27472,27590,27628,27714,28317,28792,29399,29590,29699,30655,30697,31350,32127,32777,33276,33285,33290,33503,34914,35635,36092,36544,36881,37041,37476,37558,39378,39493,40169,40407,40860,22283,23616,33738,38816,38827,40628,21531,31384,32676,35033,36557,37089,22528,23624,25496,31391,23470,24339,31353,31406,33422,36524,20518,21048,21240,21367,22280,25331,25458,27402,28099,30519,21413,29527,34152,36470,38357,26426,27331,28528,35437,36556,39243,63750,26231,27512,36020,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,39740,63751,21483,22317,22862,25542,27131,29674,30789,31418,31429,31998,33909,35215,36211,36917,38312,21243,22343,30023,31584,33740,37406,63752,27224,20811,21067,21127,25119,26840,26997,38553,20677,21156,21220,25027,26020,26681,27135,29822,31563,33465,33771,35250,35641,36817,39241,63753,20170,22935,25810,26129,27278,29748,31105,31165,33449,34942,34943,35167,63754,37670,20235,21450,24613,25201,27762,32026,32102,20120,20834,30684,32943,20225,20238,20854,20864,21980,22120,22331,22522,22524,22804,22855,22931,23492,23696,23822,24049,24190,24524,25216,26071,26083,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,26398,26399,26462,26827,26820,27231,27450,27683,27773,27778,28103,29592,29734,29738,29826,29859,30072,30079,30849,30959,31041,31047,31048,31098,31637,32000,32186,32648,32774,32813,32908,35352,35663,35912,36215,37665,37668,39138,39249,39438,39439,39525,40594,32202,20342,21513,25326,26708,37329,21931,20794,63755,63756,23068,25062,63757,25295,25343,63758,63759,63760,63761,63762,63763,37027,63764,63765,63766,63767,63768,35582,63769,63770,63771,63772,26262,63773,29014,63774,63775,38627,63776,25423,25466,21335,63777,26511,26976,28275,63778,30007,63779,63780,63781,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,32013,63782,63783,34930,22218,23064,63784,63785,63786,63787,63788,20035,63789,20839,22856,26608,32784,63790,22899,24180,25754,31178,24565,24684,25288,25467,23527,23511,21162,63791,22900,24361,24594,63792,63793,63794,29785,63795,63796,63797,63798,63799,63800,39377,63801,63802,63803,63804,63805,63806,63807,63808,63809,63810,63811,28611,63812,63813,33215,36786,24817,63814,63815,33126,63816,63817,23615,63818,63819,63820,63821,63822,63823,63824,63825,23273,35365,26491,32016,63826,63827,63828,63829,63830,63831,33021,63832,63833,23612,27877,21311,28346,22810,33590,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,20025,20150,20294,21934,22296,22727,24406,26039,26086,27264,27573,28237,30701,31471,31774,32222,34507,34962,37170,37723,25787,28606,29562,30136,36948,21846,22349,25018,25812,26311,28129,28251,28525,28601,30192,32835,33213,34113,35203,35527,35674,37663,27795,30035,31572,36367,36957,21776,22530,22616,24162,25095,25758,26848,30070,31958,34739,40680,20195,22408,22382,22823,23565,23729,24118,24453,25140,25825,29619,33274,34955,36024,38538,40667,23429,24503,24755,20498,20992,21040,22294,22581,22615,23566,23648,23798,23947,24230,24466,24764,25361,25481,25623,26691,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,26873,27330,28120,28193,28372,28644,29182,30428,30585,31153,31291,33796,35241,36077,36339,36424,36867,36884,36947,37117,37709,38518,38876,27602,28678,29272,29346,29544,30563,31167,31716,32411,35712,22697,24775,25958,26109,26302,27788,28958,29129,35930,38931,20077,31361,20189,20908,20941,21205,21516,24999,26481,26704,26847,27934,28540,30140,30643,31461,33012,33891,37509,20828,26007,26460,26515,30168,31431,33651,63834,35910,36887,38957,23663,33216,33434,36929,36975,37389,24471,23965,27225,29128,30331,31561,34276,35588,37159,39472,21895,25078,63835,30313,32645,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,34367,34746,35064,37007,63836,27931,28889,29662,32097,33853,63837,37226,39409,63838,20098,21365,27396,27410,28734,29211,34349,40478,21068,36771,23888,25829,25900,27414,28651,31811,32412,34253,35172,35261,25289,33240,34847,24266,26391,28010,29436,29701,29807,34690,37086,20358,23821,24480,33802,20919,25504,30053,20142,20486,20841,20937,26753,27153,31918,31921,31975,33391,35538,36635,37327,20406,20791,21237,21570,24300,24942,25150,26053,27354,28670,31018,34268,34851,38317,39522,39530,40599,40654,21147,26310,27511,28701,31019,36706,38722,24976,25088,25891,28451,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,29001,29833,32244,32879,34030,36646,36899,37706,20925,21015,21155,27916,28872,35010,24265,25986,27566,28610,31806,29557,20196,20278,22265,63839,23738,23994,24604,29618,31533,32666,32718,32838,36894,37428,38646,38728,38936,40801,20363,28583,31150,37300,38583,21214,63840,25736,25796,27347,28510,28696,29200,30439,32769,34310,34396,36335,36613,38706,39791,40442,40565,30860,31103,32160,33737,37636,40575,40595,35542,22751,24324,26407,28711,29903,31840,32894,20769,28712,29282,30922,36034,36058,36084,38647,20102,20698,23534,24278,26009,29134,30274,30637,32842,34044,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,36988,39719,40845,22744,23105,23650,27155,28122,28431,30267,32047,32311,34078,35128,37860,38475,21129,26066,26611,27060,27969,28316,28687,29705,29792,30041,30244,30827,35628,39006,20845,25134,38520,20374,20523,23833,28138,32184,36650,24459,24900,26647,63841,38534,21202,32907,20956,20940,26974,31260,32190,33777,38517,20442,21033,21400,21519,21774,23653,24743,26446,26792,28012,29313,29432,29702,29827,63842,30178,31852,32633,32696,33673,35023,35041,37324,37328,38626,39881,21533,28542,29136,29848,34298,36522,38563,40023,40607,26519,28107,29747,33256,38678,30764,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,31435,31520,31890,25705,29802,30194,30908,30952,39340,39764,40635,23518,24149,28448,33180,33707,37000,19975,21325,23081,24018,24398,24930,25405,26217,26364,28415,28459,28771,30622,33836,34067,34875,36627,39237,39995,21788,25273,26411,27819,33545,35178,38778,20129,22916,24536,24537,26395,32178,32596,33426,33579,33725,36638,37017,22475,22969,23186,23504,26151,26522,26757,27599,29028,32629,36023,36067,36993,39749,33032,35978,38476,39488,40613,23391,27667,29467,30450,30431,33804,20906,35219,20813,20885,21193,26825,27796,30468,30496,32191,32236,38754,40629,28357,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,34065,20901,21517,21629,26126,26269,26919,28319,30399,30609,33559,33986,34719,37225,37528,40180,34946,20398,20882,21215,22982,24125,24917,25720,25721,26286,26576,27169,27597,27611,29279,29281,29761,30520,30683,32791,33468,33541,35584,35624,35980,26408,27792,29287,30446,30566,31302,40361,27519,27794,22818,26406,33945,21359,22675,22937,24287,25551,26164,26483,28218,29483,31447,33495,37672,21209,24043,25006,25035,25098,25287,25771,26080,26969,27494,27595,28961,29687,30045,32326,33310,33538,34154,35491,36031,38695,40289,22696,40664,20497,21006,21563,21839,25991,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,27766,32010,32011,32862,34442,38272,38639,21247,27797,29289,21619,23194,23614,23883,24396,24494,26410,26806,26979,28220,28228,30473,31859,32654,34183,35598,36855,38753,40692,23735,24758,24845,25003,25935,26107,26108,27665,27887,29599,29641,32225,38292,23494,34588,35600,21085,21338,25293,25615,25778,26420,27192,27850,29632,29854,31636,31893,32283,33162,33334,34180,36843,38649,39361,20276,21322,21453,21467,25292,25644,25856,26001,27075,27886,28504,29677,30036,30242,30436,30460,30928,30971,31020,32070,33324,34784,36820,38930,39151,21187,25300,25765,28196,28497,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,30332,36299,37297,37474,39662,39747,20515,20621,22346,22952,23592,24135,24439,25151,25918,26041,26049,26121,26507,27036,28354,30917,32033,32938,33152,33323,33459,33953,34444,35370,35607,37030,38450,40848,20493,20467,63843,22521,24472,25308,25490,26479,28227,28953,30403,32972,32986,35060,35061,35097,36064,36649,37197,38506,20271,20336,24091,26575,26658,30333,30334,39748,24161,27146,29033,29140,30058,63844,32321,34115,34281,39132,20240,31567,32624,38309,20961,24070,26805,27710,27726,27867,29359,31684,33539,27861,29754,20731,21128,22721,25816,27287,29863,30294,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,30887,34327,38370,38713,63845,21342,24321,35722,36776,36783,37002,21029,30629,40009,40712,19993,20482,20853,23643,24183,26142,26170,26564,26821,28851,29953,30149,31177,31453,36647,39200,39432,20445,22561,22577,23542,26222,27493,27921,28282,28541,29668,29995,33769,35036,35091,35676,36628,20239,20693,21264,21340,23443,24489,26381,31119,33145,33583,34068,35079,35206,36665,36667,39333,39954,26412,20086,20472,22857,23553,23791,23792,25447,26834,28925,29090,29739,32299,34028,34562,36898,37586,40179,19981,20184,20463,20613,21078,21103,21542,21648,22496,22827,23142,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,23386,23413,23500,24220,63846,25206,25975,26023,28014,28325,29238,31526,31807,32566,33104,33105,33178,33344,33433,33705,35331,36000,36070,36091,36212,36282,37096,37340,38428,38468,39385,40167,21271,20998,21545,22132,22707,22868,22894,24575,24996,25198,26128,27774,28954,30406,31881,31966,32027,33452,36033,38640,63847,20315,24343,24447,25282,23849,26379,26842,30844,32323,40300,19989,20633,21269,21290,21329,22915,23138,24199,24754,24970,25161,25209,26000,26503,27047,27604,27606,27607,27608,27832,63848,29749,30202,30738,30865,31189,31192,31875,32203,32737,32933,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,33086,33218,33778,34586,35048,35513,35692,36027,37145,38750,39131,40763,22188,23338,24428,25996,27315,27567,27996,28657,28693,29277,29613,36007,36051,38971,24977,27703,32856,39425,20045,20107,20123,20181,20282,20284,20351,20447,20735,21490,21496,21766,21987,22235,22763,22882,23057,23531,23546,23556,24051,24107,24473,24605,25448,26012,26031,26614,26619,26797,27515,27801,27863,28195,28681,29509,30722,31038,31040,31072,31169,31721,32023,32114,32902,33293,33678,34001,34503,35039,35408,35422,35613,36060,36198,36781,37034,39164,39391,40605,21066,63849,26388,63850,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,20632,21034,23665,25955,27733,29642,29987,30109,31639,33948,37240,38704,20087,25746,27578,29022,34217,19977,63851,26441,26862,28183,33439,34072,34923,25591,28545,37394,39087,19978,20663,20687,20767,21830,21930,22039,23360,23577,23776,24120,24202,24224,24258,24819,26705,27233,28248,29245,29248,29376,30456,31077,31665,32724,35059,35316,35443,35937,36062,38684,22622,29885,36093,21959,63852,31329,32034,33394,29298,29983,29989,63853,31513,22661,22779,23996,24207,24246,24464,24661,25234,25471,25933,26257,26329,26360,26646,26866,29312,29790,31598,32110,32214,32626,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,32997,33298,34223,35199,35475,36893,37604,40653,40736,22805,22893,24109,24796,26132,26227,26512,27728,28101,28511,30707,30889,33990,37323,37675,20185,20682,20808,21892,23307,23459,25159,25982,26059,28210,29053,29697,29764,29831,29887,30316,31146,32218,32341,32680,33146,33203,33337,34330,34796,35445,36323,36984,37521,37925,39245,39854,21352,23633,26964,27844,27945,28203,33292,34203,35131,35373,35498,38634,40807,21089,26297,27570,32406,34814,36109,38275,38493,25885,28041,29166,63854,22478,22995,23468,24615,24826,25104,26143,26207,29481,29689,30427,30465,31596,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,32854,32882,33125,35488,37266,19990,21218,27506,27927,31237,31545,32048,63855,36016,21484,22063,22609,23477,23567,23569,24034,25152,25475,25620,26157,26803,27836,28040,28335,28703,28836,29138,29990,30095,30094,30233,31505,31712,31787,32032,32057,34092,34157,34311,35380,36877,36961,37045,37559,38902,39479,20439,23660,26463,28049,31903,32396,35606,36118,36895,23403,24061,25613,33984,36956,39137,29575,23435,24730,26494,28126,35359,35494,36865,38924,21047,63856,28753,30862,37782,34928,37335,20462,21463,22013,22234,22402,22781,23234,23432,23723,23744,24101,24833,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,25101,25163,25480,25628,25910,25976,27193,27530,27700,27929,28465,29159,29417,29560,29703,29874,30246,30561,31168,31319,31466,31929,32143,32172,32353,32670,33065,33585,33936,34010,34282,34966,35504,35728,36664,36930,36995,37228,37526,37561,38539,38567,38568,38614,38656,38920,39318,39635,39706,21460,22654,22809,23408,23487,28113,28506,29087,29729,29881,32901,33789,24033,24455,24490,24642,26092,26642,26991,27219,27529,27957,28147,29667,30462,30636,31565,32020,33059,33308,33600,34036,34147,35426,35524,37255,37662,38918,39348,25100,34899,36848,37477,23815,23847,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,23913,29791,33181,34664,28629,25342,32722,35126,35186,19998,20056,20711,21213,21319,25215,26119,32361,34821,38494,20365,21273,22070,22987,23204,23608,23630,23629,24066,24337,24643,26045,26159,26178,26558,26612,29468,30690,31034,32709,33940,33997,35222,35430,35433,35553,35925,35962,22516,23508,24335,24687,25325,26893,27542,28252,29060,31698,34645,35672,36606,39135,39166,20280,20353,20449,21627,23072,23480,24892,26032,26216,29180,30003,31070,32051,33102,33251,33688,34218,34254,34563,35338,36523,36763,63857,36805,22833,23460,23526,24713,23529,23563,24515,27777,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,63858,28145,28683,29978,33455,35574,20160,21313,63859,38617,27663,20126,20420,20818,21854,23077,23784,25105,29273,33469,33706,34558,34905,35357,38463,38597,39187,40201,40285,22538,23731,23997,24132,24801,24853,25569,27138,28197,37122,37716,38990,39952,40823,23433,23736,25353,26191,26696,30524,38593,38797,38996,39839,26017,35585,36555,38332,21813,23721,24022,24245,26263,30284,33780,38343,22739,25276,29390,40232,20208,22830,24591,26171,27523,31207,40230,21395,21696,22467,23830,24859,26326,28079,30861,33406,38552,38724,21380,25212,25494,28082,32266,33099,38989,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,27387,32588,40367,40474,20063,20539,20918,22812,24825,25590,26928,29242,32822,63860,37326,24369,63861,63862,32004,33509,33903,33979,34277,36493,63863,20335,63864,63865,22756,23363,24665,25562,25880,25965,26264,63866,26954,27171,27915,28673,29036,30162,30221,31155,31344,63867,32650,63868,35140,63869,35731,37312,38525,63870,39178,22276,24481,26044,28417,30208,31142,35486,39341,39770,40812,20740,25014,25233,27277,33222,20547,22576,24422,28937,35328,35578,23420,34326,20474,20796,22196,22852,25513,28153,23978,26989,20870,20104,20313,63871,63872,63873,22914,63874,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,63875,27487,27741,63876,29877,30998,63877,33287,33349,33593,36671,36701,63878,39192,63879,63880,63881,20134,63882,22495,24441,26131,63883,63884,30123,32377,35695,63885,36870,39515,22181,22567,23032,23071,23476,63886,24310,63887,63888,25424,25403,63889,26941,27783,27839,28046,28051,28149,28436,63890,28895,28982,29017,63891,29123,29141,63892,30799,30831,63893,31605,32227,63894,32303,63895,34893,36575,63896,63897,63898,37467,63899,40182,63900,63901,63902,24709,28037,63903,29105,63904,63905,38321,21421,63906,63907,63908,26579,63909,28814,28976,29744,33398,33490,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,63910,38331,39653,40573,26308,63911,29121,33865,63912,63913,22603,63914,63915,23992,24433,63916,26144,26254,27001,27054,27704,27891,28214,28481,28634,28699,28719,29008,29151,29552,63917,29787,63918,29908,30408,31310,32403,63919,63920,33521,35424,36814,63921,37704,63922,38681,63923,63924,20034,20522,63925,21000,21473,26355,27757,28618,29450,30591,31330,33454,34269,34306,63926,35028,35427,35709,35947,63927,37555,63928,38675,38928,20116,20237,20425,20658,21320,21566,21555,21978,22626,22714,22887,23067,23524,24735,63929,25034,25942,26111,26212,26791,27738,28595,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,28879,29100,29522,31613,34568,35492,39986,40711,23627,27779,29508,29577,37434,28331,29797,30239,31337,32277,34314,20800,22725,25793,29934,29973,30320,32705,37013,38605,39252,28198,29926,31401,31402,33253,34521,34680,35355,23113,23436,23451,26785,26880,28003,29609,29715,29740,30871,32233,32747,33048,33109,33694,35916,38446,38929,26352,24448,26106,26505,27754,29579,20525,23043,27498,30702,22806,23916,24013,29477,30031,63930,63931,20709,20985,22575,22829,22934,23002,23525,63932,63933,23970,25303,25622,25747,25854,63934,26332,63935,27208,63936,29183,29796,63937,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,31368,31407,32327,32350,32768,33136,63938,34799,35201,35616,36953,63939,36992,39250,24958,27442,28020,32287,35109,36785,20433,20653,20887,21191,22471,22665,23481,24248,24898,27029,28044,28263,28342,29076,29794,29992,29996,32883,33592,33993,36362,37780,37854,63940,20110,20305,20598,20778,21448,21451,21491,23431,23507,23588,24858,24962,26100,29275,29591,29760,30402,31056,31121,31161,32006,32701,33419,34261,34398,36802,36935,37109,37354,38533,38632,38633,21206,24423,26093,26161,26671,29020,31286,37057,38922,20113,63941,27218,27550,28560,29065,32792,33464,34131,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,36939,38549,38642,38907,34074,39729,20112,29066,38596,20803,21407,21729,22291,22290,22435,23195,23236,23491,24616,24895,25588,27781,27961,28274,28304,29232,29503,29783,33489,34945,36677,36960,63942,38498,39000,40219,26376,36234,37470,20301,20553,20702,21361,22285,22996,23041,23561,24944,26256,28205,29234,29771,32239,32963,33806,33894,34111,34655,34907,35096,35586,36949,38859,39759,20083,20369,20754,20842,63943,21807,21929,23418,23461,24188,24189,24254,24736,24799,24840,24841,25540,25912,26377,63944,26580,26586,63945,26977,26978,27833,27943,63946,28216,63947,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,28641,29494,29495,63948,29788,30001,63949,30290,63950,63951,32173,33278,33848,35029,35480,35547,35565,36400,36418,36938,36926,36986,37193,37321,37742,63952,63953,22537,63954,27603,32905,32946,63955,63956,20801,22891,23609,63957,63958,28516,29607,32996,36103,63959,37399,38287,63960,63961,63962,63963,32895,25102,28700,32104,34701,63964,22432,24681,24903,27575,35518,37504,38577,20057,21535,28139,34093,38512,38899,39150,25558,27875,37009,20957,25033,33210,40441,20381,20506,20736,23452,24847,25087,25836,26885,27589,30097,30691,32681,33380,34191,34811,34915,35516,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,35696,37291,20108,20197,20234,63965,63966,22839,23016,63967,24050,24347,24411,24609,63968,63969,63970,63971,29246,29669,63972,30064,30157,63973,31227,63974,32780,32819,32900,33505,33617,63975,63976,36029,36019,36999,63977,63978,39156,39180,63979,63980,28727,30410,32714,32716,32764,35610,20154,20161,20995,21360,63981,21693,22240,23035,23493,24341,24525,28270,63982,63983,32106,33589,63984,34451,35469,63985,38765,38775,63986,63987,19968,20314,20350,22777,26085,28322,36920,37808,39353,20219,22764,22922,23001,24641,63988,63989,31252,63990,33615,36035,20837,21316,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,63991,63992,63993,20173,21097,23381,33471,20180,21050,21672,22985,23039,23376,23383,23388,24675,24904,28363,28825,29038,29574,29943,30133,30913,32043,32773,33258,33576,34071,34249,35566,36039,38604,20316,21242,22204,26027,26152,28796,28856,29237,32189,33421,37196,38592,40306,23409,26855,27544,28538,30430,23697,26283,28507,31668,31786,34870,38620,19976,20183,21280,22580,22715,22767,22892,23559,24115,24196,24373,25484,26290,26454,27167,27299,27404,28479,29254,63994,29520,29835,31456,31911,33144,33247,33255,33674,33900,34083,34196,34255,35037,36115,37292,38263,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,38556,20877,21705,22312,23472,25165,26448,26685,26771,28221,28371,28797,32289,35009,36001,36617,40779,40782,29229,31631,35533,37658,20295,20302,20786,21632,22992,24213,25269,26485,26990,27159,27822,28186,29401,29482,30141,31672,32053,33511,33785,33879,34295,35419,36015,36487,36889,37048,38606,40799,21219,21514,23265,23490,25688,25973,28404,29380,63995,30340,31309,31515,31821,32318,32735,33659,35627,36042,36196,36321,36447,36842,36857,36969,37841,20291,20346,20659,20840,20856,21069,21098,22625,22652,22880,23560,23637,24283,24731,25136,26643,27583,27656,28593,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,29006,29728,30000,30008,30033,30322,31564,31627,31661,31686,32399,35438,36670,36681,37439,37523,37666,37931,38651,39002,39019,39198,20999,25130,25240,27993,30308,31434,31680,32118,21344,23742,24215,28472,28857,31896,38673,39822,40670,25509,25722,34678,19969,20117,20141,20572,20597,21576,22979,23450,24128,24237,24311,24449,24773,25402,25919,25972,26060,26230,26232,26622,26984,27273,27491,27712,28096,28136,28191,28254,28702,28833,29582,29693,30010,30555,30855,31118,31243,31357,31934,32142,33351,35330,35562,35998,37165,37194,37336,37478,37580,37664,38662,38742,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,38748,38914,40718,21046,21137,21884,22564,24093,24351,24716,25552,26799,28639,31085,31532,33229,34234,35069,35576,36420,37261,38500,38555,38717,38988,40778,20430,20806,20939,21161,22066,24340,24427,25514,25805,26089,26177,26362,26361,26397,26781,26839,27133,28437,28526,29031,29157,29226,29866,30522,31062,31066,31199,31264,31381,31895,31967,32068,32368,32903,34299,34468,35412,35519,36249,36481,36896,36973,37347,38459,38613,40165,26063,31751,36275,37827,23384,23562,21330,25305,29469,20519,23447,24478,24752,24939,26837,28121,29742,31278,32066,32156,32305,33131,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,36394,36405,37758,37912,20304,22352,24038,24231,25387,32618,20027,20303,20367,20570,23005,32964,21610,21608,22014,22863,23449,24030,24282,26205,26417,26609,26666,27880,27954,28234,28557,28855,29664,30087,31820,32002,32044,32162,33311,34523,35387,35461,36208,36490,36659,36913,37198,37202,37956,39376,31481,31909,20426,20737,20934,22472,23535,23803,26201,27197,27994,28310,28652,28940,30063,31459,34850,36897,36981,38603,39423,33537,20013,20210,34886,37325,21373,27355,26987,27713,33914,22686,24974,26366,25327,28893,29969,30151,32338,33976,35657,36104,20043,21482,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,21675,22320,22336,24535,25345,25351,25711,25903,26088,26234,26525,26547,27490,27744,27802,28460,30693,30757,31049,31063,32025,32930,33026,33267,33437,33463,34584,35468,63996,36100,36286,36978,30452,31257,31287,32340,32887,21767,21972,22645,25391,25634,26185,26187,26733,27035,27524,27941,28337,29645,29800,29857,30043,30137,30433,30494,30603,31206,32265,32285,33275,34095,34967,35386,36049,36587,36784,36914,37805,38499,38515,38663,20356,21489,23018,23241,24089,26702,29894,30142,31209,31378,33187,34541,36074,36300,36845,26015,26389,63997,22519,28503,32221,36655,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,37878,38598,24501,25074,28548,19988,20376,20511,21449,21983,23919,24046,27425,27492,30923,31642,63998,36425,36554,36974,25417,25662,30528,31364,37679,38015,40810,25776,28591,29158,29864,29914,31428,31762,32386,31922,32408,35738,36106,38013,39184,39244,21049,23519,25830,26413,32046,20717,21443,22649,24920,24921,25082,26028,31449,35730,35734,20489,20513,21109,21809,23100,24288,24432,24884,25950,26124,26166,26274,27085,28356,28466,29462,30241,31379,33081,33369,33750,33980,20661,22512,23488,23528,24425,25505,30758,32181,33756,34081,37319,37365,20874,26613,31574,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,36012,20932,22971,24765,34389,20508,63999,21076,23610,24957,25114,25299,25842,26021,28364,30240,33034,36448,38495,38587,20191,21315,21912,22825,24029,25797,27849,28154,29588,31359,33307,34214,36068,36368,36983,37351,38369,38433,38854,20984,21746,21894,24505,25764,28552,32180,36639,36685,37941,20681,23574,27838,28155,29979,30651,31805,31844,35449,35522,22558,22974,24086,25463,29266,30090,30571,35548,36028,36626,24307,26228,28152,32893,33729,35531,38737,39894,64000,21059,26367,28053,28399,32224,35558,36910,36958,39636,21021,21119,21736,24980,25220,25307,26786,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,26898,26970,27189,28818,28966,30813,30977,30990,31186,31245,32918,33400,33493,33609,34121,35970,36229,37218,37259,37294,20419,22225,29165,30679,34560,35320,23544,24534,26449,37032,21474,22618,23541,24740,24961,25696,32317,32880,34085,37507,25774,20652,23828,26368,22684,25277,25512,26894,27000,27166,28267,30394,31179,33467,33833,35535,36264,36861,37138,37195,37276,37648,37656,37786,38619,39478,39949,19985,30044,31069,31482,31569,31689,32302,33988,36441,36468,36600,36880,26149,26943,29763,20986,26414,40668,20805,24544,27798,34802,34909,34935,24756,33205,33795,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,36101,21462,21561,22068,23094,23601,28810,32736,32858,33030,33261,36259,37257,39519,40434,20596,20164,21408,24827,28204,23652,20360,20516,21988,23769,24159,24677,26772,27835,28100,29118,30164,30196,30305,31258,31305,32199,32251,32622,33268,34473,36636,38601,39347,40786,21063,21189,39149,35242,19971,26578,28422,20405,23522,26517,27784,28024,29723,30759,37341,37756,34756,31204,31281,24555,20182,21668,21822,22702,22949,24816,25171,25302,26422,26965,33333,38464,39345,39389,20524,21331,21828,22396,64001,25176,64002,25826,26219,26589,28609,28655,29730,29752,35351,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,37944,21585,22022,22374,24392,24986,27470,28760,28845,32187,35477,22890,33067,25506,30472,32829,36010,22612,25645,27067,23445,24081,28271,64003,34153,20812,21488,22826,24608,24907,27526,27760,27888,31518,32974,33492,36294,37040,39089,64004,25799,28580,25745,25860,20814,21520,22303,35342,24927,26742,64005,30171,31570,32113,36890,22534,27084,33151,35114,36864,38969,20600,22871,22956,25237,36879,39722,24925,29305,38358,22369,23110,24052,25226,25773,25850,26487,27874,27966,29228,29750,30772,32631,33453,36315,38935,21028,22338,26495,29256,29923,36009,36774,37393,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,38442,20843,21485,25420,20329,21764,24726,25943,27803,28031,29260,29437,31255,35207,35997,24429,28558,28921,33192,24846,20415,20559,25153,29255,31687,32232,32745,36941,38829,39449,36022,22378,24179,26544,33805,35413,21536,23318,24163,24290,24330,25987,32954,34109,38281,38491,20296,21253,21261,21263,21638,21754,22275,24067,24598,25243,25265,25429,64006,27873,28006,30129,30770,32990,33071,33502,33889,33970,34957,35090,36875,37610,39165,39825,24133,26292,26333,28689,29190,64007,20469,21117,24426,24915,26451,27161,28418,29922,31080,34920,35961,39111,39108,39491,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,21697,31263,26963,35575,35914,39080,39342,24444,25259,30130,30382,34987,36991,38466,21305,24380,24517,27852,29644,30050,30091,31558,33534,39325,20047,36924,19979,20309,21414,22799,24264,26160,27827,29781,33655,34662,36032,36944,38686,39957,22737,23416,34384,35604,40372,23506,24680,24717,26097,27735,28450,28579,28698,32597,32752,38289,38290,38480,38867,21106,36676,20989,21547,21688,21859,21898,27323,28085,32216,33382,37532,38519,40569,21512,21704,30418,34532,38308,38356,38492,20130,20233,23022,23270,24055,24658,25239,26477,26689,27782,28207,32568,32923,33322,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,64008,64009,38917,20133,20565,21683,22419,22874,23401,23475,25032,26999,28023,28707,34809,35299,35442,35559,36994,39405,39608,21182,26680,20502,24184,26447,33607,34892,20139,21521,22190,29670,37141,38911,39177,39255,39321,22099,22687,34395,35377,25010,27382,29563,36562,27463,38570,39511,22869,29184,36203,38761,20436,23796,24358,25080,26203,27883,28843,29572,29625,29694,30505,30541,32067,32098,32291,33335,34898,64010,36066,37449,39023,23377,31348,34880,38913,23244,20448,21332,22846,23805,25406,28025,29433,33029,33031,33698,37583,38960,20136,20804,21009,22411,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,24418,27842,28366,28677,28752,28847,29074,29673,29801,33610,34722,34913,36872,37026,37795,39336,20846,24407,24800,24935,26291,34137,36426,37295,38795,20046,20114,21628,22741,22778,22909,23733,24359,25142,25160,26122,26215,27627,28009,28111,28246,28408,28564,28640,28649,28765,29392,29733,29786,29920,30355,31068,31946,32286,32993,33446,33899,33983,34382,34399,34676,35703,35946,37804,38912,39013,24785,25110,37239,23130,26127,28151,28222,29759,39746,24573,24794,31503,21700,24344,27742,27859,27946,28888,32005,34425,35340,40251,21270,21644,23301,27194,28779,30069,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,31117,31166,33457,33775,35441,35649,36008,38772,64011,25844,25899,30906,30907,31339,20024,21914,22864,23462,24187,24739,25563,27489,26213,26707,28185,29029,29872,32008,36996,39529,39973,27963,28369,29502,35905,38346,20976,24140,24488,24653,24822,24880,24908,26179,26180,27045,27841,28255,28361,28514,29004,29852,30343,31681,31783,33618,34647,36945,38541,40643,21295,22238,24315,24458,24674,24724,25079,26214,26371,27292,28142,28590,28784,29546,32362,33214,33588,34516,35496,36036,21123,29554,23446,27243,37892,21742,22150,23389,25928,25989,26313,26783,28045,28102,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,29243,32948,37237,39501,20399,20505,21402,21518,21564,21897,21957,24127,24460,26429,29030,29661,36869,21211,21235,22628,22734,28932,29071,29179,34224,35347,26248,34216,21927,26244,29002,33841,21321,21913,27585,24409,24509,25582,26249,28999,35569,36637,40638,20241,25658,28875,30054,34407,24676,35662,40440,20807,20982,21256,27958,33016,40657,26133,27427,28824,30165,21507,23673,32007,35350,27424,27453,27462,21560,24688,27965,32725,33288,20694,20958,21916,22123,22221,23020,23305,24076,24985,24984,25137,26206,26342,29081,29113,29114,29351,31143,31232,32690,35440,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,]
};
}(this));


// Copyright 2014 Joshua Bell. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// If we're in node require encoding-indexes and attach it to the global.
/**
 * @fileoverview Global |this| required for resolving indexes in node.
 * @suppress {globalThis}
 */
if (typeof module !== "undefined" && module.exports) {
  this["encoding-indexes"] =
    require("./encoding-indexes.js")["encoding-indexes"];
}

(function(global) {
  'use strict';

  //
  // Utilities
  //

  /**
   * @param {number} a The number to test.
   * @param {number} min The minimum value in the range, inclusive.
   * @param {number} max The maximum value in the range, inclusive.
   * @return {boolean} True if a >= min and a <= max.
   */
  function inRange(a, min, max) {
    return min <= a && a <= max;
  }

  /**
   * @param {number} n The numerator.
   * @param {number} d The denominator.
   * @return {number} The result of the integer division of n by d.
   */
  function div(n, d) {
    return Math.floor(n / d);
  }

  /**
   * @param {*} o
   * @return {Object}
   */
  function ToDictionary(o) {
    if (o === undefined) return {};
    if (o === Object(o)) return o;
    throw TypeError('Could not convert argument to dictionary');
  }

  /**
   * @param {string} string Input string of UTF-16 code units.
   * @return {!Array.<number>} Code points.
   */
  function stringToCodePoints(string) {
    // http://heycam.github.io/webidl/#dfn-obtain-unicode

    // 1. Let S be the DOMString value.
    var s = String(string);

    // 2. Let n be the length of S.
    var n = s.length;

    // 3. Initialize i to 0.
    var i = 0;

    // 4. Initialize U to be an empty sequence of Unicode characters.
    var u = [];

    // 5. While i < n:
    while (i < n) {

      // 1. Let c be the code unit in S at index i.
      var c = s.charCodeAt(i);

      // 2. Depending on the value of c:

      // c < 0xD800 or c > 0xDFFF
      if (c < 0xD800 || c > 0xDFFF) {
        // Append to U the Unicode character with code point c.
        u.push(c);
      }

      // 0xDC00 â‰¤ c â‰¤ 0xDFFF
      else if (0xDC00 <= c && c <= 0xDFFF) {
        // Append to U a U+FFFD REPLACEMENT CHARACTER.
        u.push(0xFFFD);
      }

      // 0xD800 â‰¤ c â‰¤ 0xDBFF
      else if (0xD800 <= c && c <= 0xDBFF) {
        // 1. If i = nâˆ’1, then append to U a U+FFFD REPLACEMENT
        // CHARACTER.
        if (i === n - 1) {
          u.push(0xFFFD);
        }
        // 2. Otherwise, i < nâˆ’1:
        else {
          // 1. Let d be the code unit in S at index i+1.
          var d = string.charCodeAt(i + 1);

          // 2. If 0xDC00 â‰¤ d â‰¤ 0xDFFF, then:
          if (0xDC00 <= d && d <= 0xDFFF) {
            // 1. Let a be c & 0x3FF.
            var a = c & 0x3FF;

            // 2. Let b be d & 0x3FF.
            var b = d & 0x3FF;

            // 3. Append to U the Unicode character with code point
            // 2^16+2^10*a+b.
            u.push(0x10000 + (a << 10) + b);

            // 4. Set i to i+1.
            i += 1;
          }

          // 3. Otherwise, d < 0xDC00 or d > 0xDFFF. Append to U a
          // U+FFFD REPLACEMENT CHARACTER.
          else  {
            u.push(0xFFFD);
          }
        }
      }

      // 3. Set i to i+1.
      i += 1;
    }

    // 6. Return U.
    return u;
  }

  /**
   * @param {!Array.<number>} code_points Array of code points.
   * @return {string} string String of UTF-16 code units.
   */
  function codePointsToString(code_points) {
    var s = '';
    for (var i = 0; i < code_points.length; ++i) {
      var cp = code_points[i];
      if (cp <= 0xFFFF) {
        s += String.fromCharCode(cp);
      } else {
        cp -= 0x10000;
        s += String.fromCharCode((cp >> 10) + 0xD800,
                                 (cp & 0x3FF) + 0xDC00);
      }
    }
    return s;
  }


  //
  // Implementation of Encoding specification
  // http://dvcs.w3.org/hg/encoding/raw-file/tip/Overview.html
  //

  //
  // 3. Terminology
  //

  /**
   * End-of-stream is a special token that signifies no more tokens
   * are in the stream.
   * @const
   */ var end_of_stream = -1;

  /**
   * A stream represents an ordered sequence of tokens.
   *
   * @constructor
   * @param {!(Array.<number>|Uint8Array)} tokens Array of tokens that provide the
   * stream.
   */
  function Stream(tokens) {
    /** @type {!Array.<number>} */
    this.tokens = [].slice.call(tokens);
  }

  Stream.prototype = {
    /**
     * @return {boolean} True if end-of-stream has been hit.
     */
    endOfStream: function() {
      return !this.tokens.length;
    },

    /**
     * When a token is read from a stream, the first token in the
     * stream must be returned and subsequently removed, and
     * end-of-stream must be returned otherwise.
     *
     * @return {number} Get the next token from the stream, or
     * end_of_stream.
     */
     read: function() {
      if (!this.tokens.length)
        return end_of_stream;
       return this.tokens.shift();
     },

    /**
     * When one or more tokens are prepended to a stream, those tokens
     * must be inserted, in given order, before the first token in the
     * stream.
     *
     * @param {(number|!Array.<number>)} token The token(s) to prepend to the stream.
     */
    prepend: function(token) {
      if (Array.isArray(token)) {
        var tokens = /**@type {!Array.<number>}*/(token);
        while (tokens.length)
          this.tokens.unshift(tokens.pop());
      } else {
        this.tokens.unshift(token);
      }
    },

    /**
     * When one or more tokens are pushed to a stream, those tokens
     * must be inserted, in given order, after the last token in the
     * stream.
     *
     * @param {(number|!Array.<number>)} token The tokens(s) to prepend to the stream.
     */
    push: function(token) {
      if (Array.isArray(token)) {
        var tokens = /**@type {!Array.<number>}*/(token);
        while (tokens.length)
          this.tokens.push(tokens.shift());
      } else {
        this.tokens.push(token);
      }
    }
  };

  //
  // 4. Encodings
  //

  // 4.1 Encoders and decoders

  /** @const */
  var finished = -1;

  /**
   * @param {boolean} fatal If true, decoding errors raise an exception.
   * @param {number=} opt_code_point Override the standard fallback code point.
   * @return {number} The code point to insert on a decoding error.
   */
  function decoderError(fatal, opt_code_point) {
    if (fatal)
      throw TypeError('Decoder error');
    return opt_code_point || 0xFFFD;
  }

  /**
   * @param {number} code_point The code point that could not be encoded.
   * @return {number} Always throws, no value is actually returned.
   */
  function encoderError(code_point) {
    throw TypeError('The code point ' + code_point + ' could not be encoded.');
  }

  /** @interface */
  function Decoder() {}
  Decoder.prototype = {
    /**
     * @param {Stream} stream The stream of bytes being decoded.
     * @param {number} bite The next byte read from the stream.
     * @return {?(number|!Array.<number>)} The next code point(s)
     *     decoded, or null if not enough data exists in the input
     *     stream to decode a complete code point, or |finished|.
     */
    handler: function(stream, bite) {}
  };

  /** @interface */
  function Encoder() {}
  Encoder.prototype = {
    /**
     * @param {Stream} stream The stream of code points being encoded.
     * @param {number} code_point Next code point read from the stream.
     * @return {(number|!Array.<number>)} Byte(s) to emit, or |finished|.
     */
    handler: function(stream, code_point) {}
  };

  // 4.2 Names and labels

  // TODO: Define @typedef for Encoding: {name:string,labels:Array.<string>}
  // https://github.com/google/closure-compiler/issues/247

  /**
   * @param {string} label The encoding label.
   * @return {?{name:string,labels:Array.<string>}}
   */
  function getEncoding(label) {
    // 1. Remove any leading and trailing ASCII whitespace from label.
    label = String(label).trim().toLowerCase();

    // 2. If label is an ASCII case-insensitive match for any of the
    // labels listed in the table below, return the corresponding
    // encoding, and failure otherwise.
    if (Object.prototype.hasOwnProperty.call(label_to_encoding, label)) {
      return label_to_encoding[label];
    }
    return null;
  }

  /**
   * Encodings table: http://encoding.spec.whatwg.org/encodings.json
   * @const
   * @type {!Array.<{
   *          heading: string,
   *          encodings: Array.<{name:string,labels:Array.<string>}>
   *        }>}
   */
  var encodings = [
    {
      "encodings": [
        {
          "labels": [
            "unicode-1-1-utf-8",
            "utf-8",
            "utf8"
          ],
          "name": "utf-8"
        }
      ],
      "heading": "The Encoding"
    },
    {
      "encodings": [
        {
          "labels": [
            "866",
            "cp866",
            "csibm866",
            "ibm866"
          ],
          "name": "ibm866"
        },
        {
          "labels": [
            "csisolatin2",
            "iso-8859-2",
            "iso-ir-101",
            "iso8859-2",
            "iso88592",
            "iso_8859-2",
            "iso_8859-2:1987",
            "l2",
            "latin2"
          ],
          "name": "iso-8859-2"
        },
        {
          "labels": [
            "csisolatin3",
            "iso-8859-3",
            "iso-ir-109",
            "iso8859-3",
            "iso88593",
            "iso_8859-3",
            "iso_8859-3:1988",
            "l3",
            "latin3"
          ],
          "name": "iso-8859-3"
        },
        {
          "labels": [
            "csisolatin4",
            "iso-8859-4",
            "iso-ir-110",
            "iso8859-4",
            "iso88594",
            "iso_8859-4",
            "iso_8859-4:1988",
            "l4",
            "latin4"
          ],
          "name": "iso-8859-4"
        },
        {
          "labels": [
            "csisolatincyrillic",
            "cyrillic",
            "iso-8859-5",
            "iso-ir-144",
            "iso8859-5",
            "iso88595",
            "iso_8859-5",
            "iso_8859-5:1988"
          ],
          "name": "iso-8859-5"
        },
        {
          "labels": [
            "arabic",
            "asmo-708",
            "csiso88596e",
            "csiso88596i",
            "csisolatinarabic",
            "ecma-114",
            "iso-8859-6",
            "iso-8859-6-e",
            "iso-8859-6-i",
            "iso-ir-127",
            "iso8859-6",
            "iso88596",
            "iso_8859-6",
            "iso_8859-6:1987"
          ],
          "name": "iso-8859-6"
        },
        {
          "labels": [
            "csisolatingreek",
            "ecma-118",
            "elot_928",
            "greek",
            "greek8",
            "iso-8859-7",
            "iso-ir-126",
            "iso8859-7",
            "iso88597",
            "iso_8859-7",
            "iso_8859-7:1987",
            "sun_eu_greek"
          ],
          "name": "iso-8859-7"
        },
        {
          "labels": [
            "csiso88598e",
            "csisolatinhebrew",
            "hebrew",
            "iso-8859-8",
            "iso-8859-8-e",
            "iso-ir-138",
            "iso8859-8",
            "iso88598",
            "iso_8859-8",
            "iso_8859-8:1988",
            "visual"
          ],
          "name": "iso-8859-8"
        },
        {
          "labels": [
            "csiso88598i",
            "iso-8859-8-i",
            "logical"
          ],
          "name": "iso-8859-8-i"
        },
        {
          "labels": [
            "csisolatin6",
            "iso-8859-10",
            "iso-ir-157",
            "iso8859-10",
            "iso885910",
            "l6",
            "latin6"
          ],
          "name": "iso-8859-10"
        },
        {
          "labels": [
            "iso-8859-13",
            "iso8859-13",
            "iso885913"
          ],
          "name": "iso-8859-13"
        },
        {
          "labels": [
            "iso-8859-14",
            "iso8859-14",
            "iso885914"
          ],
          "name": "iso-8859-14"
        },
        {
          "labels": [
            "csisolatin9",
            "iso-8859-15",
            "iso8859-15",
            "iso885915",
            "iso_8859-15",
            "l9"
          ],
          "name": "iso-8859-15"
        },
        {
          "labels": [
            "iso-8859-16"
          ],
          "name": "iso-8859-16"
        },
        {
          "labels": [
            "cskoi8r",
            "koi",
            "koi8",
            "koi8-r",
            "koi8_r"
          ],
          "name": "koi8-r"
        },
        {
          "labels": [
            "koi8-u"
          ],
          "name": "koi8-u"
        },
        {
          "labels": [
            "csmacintosh",
            "mac",
            "macintosh",
            "x-mac-roman"
          ],
          "name": "macintosh"
        },
        {
          "labels": [
            "dos-874",
            "iso-8859-11",
            "iso8859-11",
            "iso885911",
            "tis-620",
            "windows-874"
          ],
          "name": "windows-874"
        },
        {
          "labels": [
            "cp1250",
            "windows-1250",
            "x-cp1250"
          ],
          "name": "windows-1250"
        },
        {
          "labels": [
            "cp1251",
            "windows-1251",
            "x-cp1251"
          ],
          "name": "windows-1251"
        },
        {
          "labels": [
            "ansi_x3.4-1968",
            "ascii",
            "cp1252",
            "cp819",
            "csisolatin1",
            "ibm819",
            "iso-8859-1",
            "iso-ir-100",
            "iso8859-1",
            "iso88591",
            "iso_8859-1",
            "iso_8859-1:1987",
            "l1",
            "latin1",
            "us-ascii",
            "windows-1252",
            "x-cp1252"
          ],
          "name": "windows-1252"
        },
        {
          "labels": [
            "cp1253",
            "windows-1253",
            "x-cp1253"
          ],
          "name": "windows-1253"
        },
        {
          "labels": [
            "cp1254",
            "csisolatin5",
            "iso-8859-9",
            "iso-ir-148",
            "iso8859-9",
            "iso88599",
            "iso_8859-9",
            "iso_8859-9:1989",
            "l5",
            "latin5",
            "windows-1254",
            "x-cp1254"
          ],
          "name": "windows-1254"
        },
        {
          "labels": [
            "cp1255",
            "windows-1255",
            "x-cp1255"
          ],
          "name": "windows-1255"
        },
        {
          "labels": [
            "cp1256",
            "windows-1256",
            "x-cp1256"
          ],
          "name": "windows-1256"
        },
        {
          "labels": [
            "cp1257",
            "windows-1257",
            "x-cp1257"
          ],
          "name": "windows-1257"
        },
        {
          "labels": [
            "cp1258",
            "windows-1258",
            "x-cp1258"
          ],
          "name": "windows-1258"
        },
        {
          "labels": [
            "x-mac-cyrillic",
            "x-mac-ukrainian"
          ],
          "name": "x-mac-cyrillic"
        }
      ],
      "heading": "Legacy single-byte encodings"
    },
    {
      "encodings": [
        {
          "labels": [
            "chinese",
            "csgb2312",
            "csiso58gb231280",
            "gb2312",
            "gb_2312",
            "gb_2312-80",
            "gbk",
            "iso-ir-58",
            "x-gbk"
          ],
          "name": "gbk"
        },
        {
          "labels": [
            "gb18030"
          ],
          "name": "gb18030"
        }
      ],
      "heading": "Legacy multi-byte Chinese (simplified) encodings"
    },
    {
      "encodings": [
        {
          "labels": [
            "big5",
            "big5-hkscs",
            "cn-big5",
            "csbig5",
            "x-x-big5"
          ],
          "name": "big5"
        }
      ],
      "heading": "Legacy multi-byte Chinese (traditional) encodings"
    },
    {
      "encodings": [
        {
          "labels": [
            "cseucpkdfmtjapanese",
            "euc-jp",
            "x-euc-jp"
          ],
          "name": "euc-jp"
        },
        {
          "labels": [
            "csiso2022jp",
            "iso-2022-jp"
          ],
          "name": "iso-2022-jp"
        },
        {
          "labels": [
            "csshiftjis",
            "ms_kanji",
            "shift-jis",
            "shift_jis",
            "sjis",
            "windows-31j",
            "x-sjis"
          ],
          "name": "shift_jis"
        }
      ],
      "heading": "Legacy multi-byte Japanese encodings"
    },
    {
      "encodings": [
        {
          "labels": [
            "cseuckr",
            "csksc56011987",
            "euc-kr",
            "iso-ir-149",
            "korean",
            "ks_c_5601-1987",
            "ks_c_5601-1989",
            "ksc5601",
            "ksc_5601",
            "windows-949"
          ],
          "name": "euc-kr"
        }
      ],
      "heading": "Legacy multi-byte Korean encodings"
    },
    {
      "encodings": [
        {
          "labels": [
            "csiso2022kr",
            "hz-gb-2312",
            "iso-2022-cn",
            "iso-2022-cn-ext",
            "iso-2022-kr"
          ],
          "name": "replacement"
        },
        {
          "labels": [
            "utf-16be"
          ],
          "name": "utf-16be"
        },
        {
          "labels": [
            "utf-16",
            "utf-16le"
          ],
          "name": "utf-16le"
        },
        {
          "labels": [
            "x-user-defined"
          ],
          "name": "x-user-defined"
        }
      ],
      "heading": "Legacy miscellaneous encodings"
    }
  ];

  // Label to encoding registry.
  /** @type {Object.<string,{name:string,labels:Array.<string>}>} */
  var label_to_encoding = {};
  encodings.forEach(function(category) {
    category.encodings.forEach(function(encoding) {
      encoding.labels.forEach(function(label) {
        label_to_encoding[label] = encoding;
      });
    });
  });

  // Registry of of encoder/decoder factories, by encoding name.
  /** @type {Object.<string, function({fatal:boolean}): Encoder>} */
  var encoders = {};
  /** @type {Object.<string, function({fatal:boolean}): Decoder>} */
  var decoders = {};

  //
  // 5. Indexes
  //

  /**
   * @param {number} pointer The |pointer| to search for.
   * @param {(!Array.<?number>|undefined)} index The |index| to search within.
   * @return {?number} The code point corresponding to |pointer| in |index|,
   *     or null if |code point| is not in |index|.
   */
  function indexCodePointFor(pointer, index) {
    if (!index) return null;
    return index[pointer] || null;
  }

  /**
   * @param {number} code_point The |code point| to search for.
   * @param {!Array.<?number>} index The |index| to search within.
   * @return {?number} The first pointer corresponding to |code point| in
   *     |index|, or null if |code point| is not in |index|.
   */
  function indexPointerFor(code_point, index) {
    var pointer = index.indexOf(code_point);
    return pointer === -1 ? null : pointer;
  }

  /**
   * @param {string} name Name of the index.
   * @return {(!Array.<number>|!Array.<Array.<number>>)}
   *  */
  function index(name) {
    if (!('encoding-indexes' in global)) {
      throw Error("Indexes missing." +
                  " Did you forget to include encoding-indexes.js?");
    }
    return global['encoding-indexes'][name];
  }

  /**
   * @param {number} pointer The |pointer| to search for in the gb18030 index.
   * @return {?number} The code point corresponding to |pointer| in |index|,
   *     or null if |code point| is not in the gb18030 index.
   */
  function indexGB18030RangesCodePointFor(pointer) {
    // 1. If pointer is greater than 39419 and less than 189000, or
    // pointer is greater than 1237575, return null.
    if ((pointer > 39419 && pointer < 189000) || (pointer > 1237575))
      return null;

    // 2. Let offset be the last pointer in index gb18030 ranges that
    // is equal to or less than pointer and let code point offset be
    // its corresponding code point.
    var offset = 0;
    var code_point_offset = 0;
    var idx = index('gb18030');
    var i;
    for (i = 0; i < idx.length; ++i) {
      /** @type {!Array.<number>} */
      var entry = idx[i];
      if (entry[0] <= pointer) {
        offset = entry[0];
        code_point_offset = entry[1];
      } else {
        break;
      }
    }

    // 3. Return a code point whose value is code point offset +
    // pointer âˆ’ offset.
    return code_point_offset + pointer - offset;
  }

  /**
   * @param {number} code_point The |code point| to locate in the gb18030 index.
   * @return {number} The first pointer corresponding to |code point| in the
   *     gb18030 index.
   */
  function indexGB18030RangesPointerFor(code_point) {
    // 1. Let offset be the last code point in index gb18030 ranges
    // that is equal to or less than code point and let pointer offset
    // be its corresponding pointer.
    var offset = 0;
    var pointer_offset = 0;
    var idx = index('gb18030');
    var i;
    for (i = 0; i < idx.length; ++i) {
      /** @type {!Array.<number>} */
      var entry = idx[i];
      if (entry[1] <= code_point) {
        offset = entry[1];
        pointer_offset = entry[0];
      } else {
        break;
      }
    }

    // 2. Return a pointer whose value is pointer offset + code point
    // âˆ’ offset.
    return pointer_offset + code_point - offset;
  }

  /**
   * @param {number} code_point The |code_point| to search for in the shift_jis index.
   * @return {?number} The code point corresponding to |pointer| in |index|,
   *     or null if |code point| is not in the shift_jis index.
   */
  function indexShiftJISPointerFor(code_point) {
    // 1. Let index be index jis0208 excluding all pointers in the
    // range 8272 to 8835.
    var pointer = indexPointerFor(code_point, index('jis0208'));
    if (pointer === null || inRange(pointer, 8272, 8835))
      return null;

    // 2. Return the index pointer for code point in index.
    return pointer;
  }

  //
  // 7. API
  //

  /** @const */ var DEFAULT_ENCODING = 'utf-8';

  // 7.1 Interface TextDecoder

  /**
   * @constructor
   * @param {string=} encoding The label of the encoding;
   *     defaults to 'utf-8'.
   * @param {Object=} options
   */
  function TextDecoder(encoding, options) {
    if (!(this instanceof TextDecoder)) {
      return new TextDecoder(encoding, options);
    }
    encoding = encoding !== undefined ? String(encoding) : DEFAULT_ENCODING;
    options = ToDictionary(options);
    /** @private */
    this._encoding = getEncoding(encoding);
    if (this._encoding === null || this._encoding.name === 'replacement')
      throw RangeError('Unknown encoding: ' + encoding);

    if (!decoders[this._encoding.name]) {
      throw Error('Decoder not present.' +
                  ' Did you forget to include encoding-indexes.js?');
    }

    /** @private @type {boolean} */
    this._streaming = false;
    /** @private @type {boolean} */
    this._BOMseen = false;
    /** @private @type {?Decoder} */
    this._decoder = null;
    /** @private @type {boolean} */
    this._fatal = Boolean(options['fatal']);
    /** @private @type {boolean} */
    this._ignoreBOM = Boolean(options['ignoreBOM']);

    if (Object.defineProperty) {
      Object.defineProperty(this, 'encoding', {value: this._encoding.name});
      Object.defineProperty(this, 'fatal', {value: this._fatal});
      Object.defineProperty(this, 'ignoreBOM', {value: this._ignoreBOM});
    } else {
      this.encoding = this._encoding.name;
      this.fatal = this._fatal;
      this.ignoreBOM = this._ignoreBOM;
    }

    return this;
  }

  TextDecoder.prototype = {
    /**
     * @param {ArrayBufferView=} input The buffer of bytes to decode.
     * @param {Object=} options
     * @return {string} The decoded string.
     */
    decode: function decode(input, options) {
      var bytes;
      if (typeof input === 'object' && input instanceof ArrayBuffer) {
        bytes = new Uint8Array(input);
      } else if (typeof input === 'object' && 'buffer' in input &&
                 input.buffer instanceof ArrayBuffer) {
        bytes = new Uint8Array(input.buffer,
                               input.byteOffset,
                               input.byteLength);
      } else {
        bytes = new Uint8Array(0);
      }

      options = ToDictionary(options);

      if (!this._streaming) {
        this._decoder = decoders[this._encoding.name]({fatal: this._fatal});
        this._BOMseen = false;
      }
      this._streaming = Boolean(options['stream']);

      var input_stream = new Stream(bytes);

      var code_points = [];

      /** @type {?(number|!Array.<number>)} */
      var result;

      while (!input_stream.endOfStream()) {
        result = this._decoder.handler(input_stream, input_stream.read());
        if (result === finished)
          break;
        if (result === null)
          continue;
        if (Array.isArray(result))
          code_points.push.apply(code_points, /**@type {!Array.<number>}*/(result));
        else
          code_points.push(result);
      }
      if (!this._streaming) {
        do {
          result = this._decoder.handler(input_stream, input_stream.read());
          if (result === finished)
            break;
          if (result === null)
            continue;
          if (Array.isArray(result))
            code_points.push.apply(code_points, /**@type {!Array.<number>}*/(result));
          else
            code_points.push(result);
        } while (!input_stream.endOfStream());
        this._decoder = null;
      }

      if (code_points.length) {
        // If encoding is one of utf-8, utf-16be, and utf-16le, and
        // ignore BOM flag and BOM seen flag are unset, run these
        // subsubsteps:
        if (['utf-8', 'utf-16le', 'utf-16be'].indexOf(this.encoding) !== -1 &&
            !this._ignoreBOM && !this._BOMseen) {
          // If token is U+FEFF, set BOM seen flag.
          if (code_points[0] === 0xFEFF) {
            this._BOMseen = true;
            code_points.shift();
          } else {
            // Otherwise, if token is not end-of-stream, set BOM seen
            // flag and append token to output.
            this._BOMseen = true;
          }
        }
      }

      return codePointsToString(code_points);
    }
  };

  // 7.2 Interface TextEncoder

  /**
   * @constructor
   * @param {string=} encoding The label of the encoding;
   *     defaults to 'utf-8'.
   * @param {Object=} options
   */
  function TextEncoder(encoding, options) {
    if (!(this instanceof TextEncoder))
      return new TextEncoder(encoding, options);
    encoding = encoding !== undefined ? String(encoding) : DEFAULT_ENCODING;
    options = ToDictionary(options);
    /** @private */
    this._encoding = getEncoding(encoding);
    if (this._encoding === null || this._encoding.name === 'replacement')
      throw RangeError('Unknown encoding: ' + encoding);

    var allowLegacyEncoding =
          Boolean(options['NONSTANDARD_allowLegacyEncoding']);
    var isLegacyEncoding = (this._encoding.name !== 'utf-8' &&
                            this._encoding.name !== 'utf-16le' &&
                            this._encoding.name !== 'utf-16be');
    if (this._encoding === null || (isLegacyEncoding && !allowLegacyEncoding))
      throw RangeError('Unknown encoding: ' + encoding);

    if (!encoders[this._encoding.name]) {
      throw Error('Encoder not present.' +
                  ' Did you forget to include encoding-indexes.js?');
    }

    /** @private @type {boolean} */
    this._streaming = false;
    /** @private @type {?Encoder} */
    this._encoder = null;
    /** @private @type {{fatal: boolean}} */
    this._options = {fatal: Boolean(options['fatal'])};

    try{
        if (Object.defineProperty)
            Object.defineProperty(this, 'encoding', {value: this._encoding.name});
          else
            this.encoding = this._encoding.name;
    } catch (e){
    	this.encoding = this._encoding.name;
    }

    return this;
  }

  TextEncoder.prototype = {
    /**
     * @param {string=} opt_string The string to encode.
     * @param {Object=} options
     * @return {Uint8Array} Encoded bytes, as a Uint8Array.
     */
    encode: function encode(opt_string, options) {
      opt_string = opt_string ? String(opt_string) : '';
      options = ToDictionary(options);

      // NOTE: This option is nonstandard. None of the encodings
      // permitted for encoding (i.e. UTF-8, UTF-16) are stateful,
      // so streaming is not necessary.
      if (!this._streaming)
        this._encoder = encoders[this._encoding.name](this._options);
      this._streaming = Boolean(options['stream']);

      var bytes = [];
      var input_stream = new Stream(stringToCodePoints(opt_string));
      /** @type {?(number|!Array.<number>)} */
      var result;
      while (!input_stream.endOfStream()) {
        result = this._encoder.handler(input_stream, input_stream.read());
        if (result === finished)
          break;
        if (Array.isArray(result))
          bytes.push.apply(bytes, /**@type {!Array.<number>}*/(result));
        else
          bytes.push(result);
      }
      if (!this._streaming) {
        while (true) {
          result = this._encoder.handler(input_stream, input_stream.read());
          if (result === finished)
            break;
          if (Array.isArray(result))
            bytes.push.apply(bytes, /**@type {!Array.<number>}*/(result));
          else
            bytes.push(result);
        }
        this._encoder = null;
      }
      return new Uint8Array(bytes);
    }
  };


  //
  // 8. The encoding
  //

  // 8.1 utf-8

  /**
   * @constructor
   * @implements {Decoder}
   * @param {{fatal: boolean}} options
   */
  function UTF8Decoder(options) {
    var fatal = options.fatal;

    // utf-8's decoder's has an associated utf-8 code point, utf-8
    // bytes seen, and utf-8 bytes needed (all initially 0), a utf-8
    // lower boundary (initially 0x80), and a utf-8 upper boundary
    // (initially 0xBF).
    var /** @type {number} */ utf8_code_point = 0,
        /** @type {number} */ utf8_bytes_seen = 0,
        /** @type {number} */ utf8_bytes_needed = 0,
        /** @type {number} */ utf8_lower_boundary = 0x80,
        /** @type {number} */ utf8_upper_boundary = 0xBF;

    /**
     * @param {Stream} stream The stream of bytes being decoded.
     * @param {number} bite The next byte read from the stream.
     * @return {?(number|!Array.<number>)} The next code point(s)
     *     decoded, or null if not enough data exists in the input
     *     stream to decode a complete code point.
     */
    this.handler = function(stream, bite) {
      // 1. If byte is end-of-stream and utf-8 bytes needed is not 0,
      // set utf-8 bytes needed to 0 and return error.
      if (bite === end_of_stream && utf8_bytes_needed !== 0) {
        utf8_bytes_needed = 0;
        return decoderError(fatal);
      }

      // 2. If byte is end-of-stream, return finished.
      if (bite === end_of_stream)
        return finished;

      // 3. If utf-8 bytes needed is 0, based on byte:
      if (utf8_bytes_needed === 0) {

        // 0x00 to 0x7F
        if (inRange(bite, 0x00, 0x7F)) {
          // Return a code point whose value is byte.
          return bite;
        }

        // 0xC2 to 0xDF
        if (inRange(bite, 0xC2, 0xDF)) {
          // Set utf-8 bytes needed to 1 and utf-8 code point to byte
          // âˆ’ 0xC0.
          utf8_bytes_needed = 1;
          utf8_code_point = bite - 0xC0;
        }

        // 0xE0 to 0xEF
        else if (inRange(bite, 0xE0, 0xEF)) {
          // 1. If byte is 0xE0, set utf-8 lower boundary to 0xA0.
          if (bite === 0xE0)
            utf8_lower_boundary = 0xA0;
          // 2. If byte is 0xED, set utf-8 upper boundary to 0x9F.
          if (bite === 0xED)
            utf8_upper_boundary = 0x9F;
          // 3. Set utf-8 bytes needed to 2 and utf-8 code point to
          // byte âˆ’ 0xE0.
          utf8_bytes_needed = 2;
          utf8_code_point = bite - 0xE0;
        }

        // 0xF0 to 0xF4
        else if (inRange(bite, 0xF0, 0xF4)) {
          // 1. If byte is 0xF0, set utf-8 lower boundary to 0x90.
          if (bite === 0xF0)
            utf8_lower_boundary = 0x90;
          // 2. If byte is 0xF4, set utf-8 upper boundary to 0x8F.
          if (bite === 0xF4)
            utf8_upper_boundary = 0x8F;
          // 3. Set utf-8 bytes needed to 3 and utf-8 code point to
          // byte âˆ’ 0xF0.
          utf8_bytes_needed = 3;
          utf8_code_point = bite - 0xF0;
        }

        // Otherwise
        else {
          // Return error.
          return decoderError(fatal);
        }

        // Then (byte is in the range 0xC2 to 0xF4) set utf-8 code
        // point to utf-8 code point << (6 Ã— utf-8 bytes needed) and
        // return continue.
        utf8_code_point = utf8_code_point << (6 * utf8_bytes_needed);
        return null;
      }

      // 4. If byte is not in the range utf-8 lower boundary to utf-8
      // upper boundary, run these substeps:
      if (!inRange(bite, utf8_lower_boundary, utf8_upper_boundary)) {

        // 1. Set utf-8 code point, utf-8 bytes needed, and utf-8
        // bytes seen to 0, set utf-8 lower boundary to 0x80, and set
        // utf-8 upper boundary to 0xBF.
        utf8_code_point = utf8_bytes_needed = utf8_bytes_seen = 0;
        utf8_lower_boundary = 0x80;
        utf8_upper_boundary = 0xBF;

        // 2. Prepend byte to stream.
        stream.prepend(bite);

        // 3. Return error.
        return decoderError(fatal);
      }

      // 5. Set utf-8 lower boundary to 0x80 and utf-8 upper boundary
      // to 0xBF.
      utf8_lower_boundary = 0x80;
      utf8_upper_boundary = 0xBF;

      // 6. Increase utf-8 bytes seen by one and set utf-8 code point
      // to utf-8 code point + (byte âˆ’ 0x80) << (6 Ã— (utf-8 bytes
      // needed âˆ’ utf-8 bytes seen)).
      utf8_bytes_seen += 1;
      utf8_code_point += (bite - 0x80) << (6 * (utf8_bytes_needed - utf8_bytes_seen));

      // 7. If utf-8 bytes seen is not equal to utf-8 bytes needed,
      // continue.
      if (utf8_bytes_seen !== utf8_bytes_needed)
        return null;

      // 8. Let code point be utf-8 code point.
      var code_point = utf8_code_point;

      // 9. Set utf-8 code point, utf-8 bytes needed, and utf-8 bytes
      // seen to 0.
      utf8_code_point = utf8_bytes_needed = utf8_bytes_seen = 0;

      // 10. Return a code point whose value is code point.
      return code_point;
    };
  }

  /**
   * @constructor
   * @implements {Encoder}
   * @param {{fatal: boolean}} options
   */
  function UTF8Encoder(options) {
    var fatal = options.fatal;
    /**
     * @param {Stream} stream Input stream.
     * @param {number} code_point Next code point read from the stream.
     * @return {(number|!Array.<number>)} Byte(s) to emit.
     */
    this.handler = function(stream, code_point) {
      // 1. If code point is end-of-stream, return finished.
      if (code_point === end_of_stream)
        return finished;

      // 2. If code point is in the range U+0000 to U+007F, return a
      // byte whose value is code point.
      if (inRange(code_point, 0x0000, 0x007f))
        return code_point;

      // 3. Set count and offset based on the range code point is in:
      var count, offset;
      // U+0080 to U+07FF:    1 and 0xC0
      if (inRange(code_point, 0x0080, 0x07FF)) {
        count = 1;
        offset = 0xC0;
      }
      // U+0800 to U+FFFF:    2 and 0xE0
      else if (inRange(code_point, 0x0800, 0xFFFF)) {
        count = 2;
        offset = 0xE0;
      }
      // U+10000 to U+10FFFF: 3 and 0xF0
      else if (inRange(code_point, 0x10000, 0x10FFFF)) {
        count = 3;
        offset = 0xF0;
      }

      // 4.Let bytes be a byte sequence whose first byte is (code
      // point >> (6 Ã— count)) + offset.
      var bytes = [(code_point >> (6 * count)) + offset];

      // 5. Run these substeps while count is greater than 0:
      while (count > 0) {

        // 1. Set temp to code point >> (6 Ã— (count âˆ’ 1)).
        var temp = code_point >> (6 * (count - 1));

        // 2. Append to bytes 0x80 | (temp & 0x3F).
        bytes.push(0x80 | (temp & 0x3F));

        // 3. Decrease count by one.
        count -= 1;
      }

      // 6. Return bytes bytes, in order.
      return bytes;
    };
  }

  /** @param {{fatal: boolean}} options */
  encoders['utf-8'] = function(options) {
    return new UTF8Encoder(options);
  };
  /** @param {{fatal: boolean}} options */
  decoders['utf-8'] = function(options) {
    return new UTF8Decoder(options);
  };

  //
  // 9. Legacy single-byte encodings
  //

  // 9.1 single-byte decoder
  /**
   * @constructor
   * @implements {Decoder}
   * @param {!Array.<number>} index The encoding index.
   * @param {{fatal: boolean}} options
   */
  function SingleByteDecoder(index, options) {
    var fatal = options.fatal;
    /**
     * @param {Stream} stream The stream of bytes being decoded.
     * @param {number} bite The next byte read from the stream.
     * @return {?(number|!Array.<number>)} The next code point(s)
     *     decoded, or null if not enough data exists in the input
     *     stream to decode a complete code point.
     */
    this.handler = function(stream, bite) {
      // 1. If byte is end-of-stream, return finished.
      if (bite === end_of_stream)
        return finished;

      // 2. If byte is in the range 0x00 to 0x7F, return a code point
      // whose value is byte.
      if (inRange(bite, 0x00, 0x7F))
        return bite;

      // 3. Let code point be the index code point for byte âˆ’ 0x80 in
      // index single-byte.
      var code_point = index[bite - 0x80];

      // 4. If code point is null, return error.
      if (code_point === null)
        return decoderError(fatal);

      // 5. Return a code point whose value is code point.
      return code_point;
    };
  }

  // 9.2 single-byte encoder
  /**
   * @constructor
   * @implements {Encoder}
   * @param {!Array.<?number>} index The encoding index.
   * @param {{fatal: boolean}} options
   */
  function SingleByteEncoder(index, options) {
    var fatal = options.fatal;
    /**
     * @param {Stream} stream Input stream.
     * @param {number} code_point Next code point read from the stream.
     * @return {(number|!Array.<number>)} Byte(s) to emit.
     */
    this.handler = function(stream, code_point) {
      // 1. If code point is end-of-stream, return finished.
      if (code_point === end_of_stream)
        return finished;

      // 2. If code point is in the range U+0000 to U+007F, return a
      // byte whose value is code point.
      if (inRange(code_point, 0x0000, 0x007F))
        return code_point;

      // 3. Let pointer be the index pointer for code point in index
      // single-byte.
      var pointer = indexPointerFor(code_point, index);

      // 4. If pointer is null, return error with code point.
      if (pointer === null)
        encoderError(code_point);

      // 5. Return a byte whose value is pointer + 0x80.
      return pointer + 0x80;
    };
  }

  (function() {
    if (!('encoding-indexes' in global))
      return;
    encodings.forEach(function(category) {
      if (category.heading !== 'Legacy single-byte encodings')
        return;
      category.encodings.forEach(function(encoding) {
        var name = encoding.name;
        var idx = index(name);
        /** @param {{fatal: boolean}} options */
        decoders[name] = function(options) {
          return new SingleByteDecoder(idx, options);
        };
        /** @param {{fatal: boolean}} options */
        encoders[name] = function(options) {
          return new SingleByteEncoder(idx, options);
        };
      });
    });
  }());

  //
  // 10. Legacy multi-byte Chinese (simplified) encodings
  //

  // 10.1 gbk

  // 10.1.1 gbk decoder
  // gbk's decoder is gb18030's decoder.
  /** @param {{fatal: boolean}} options */
  decoders['gbk'] = function(options) {
    return new GB18030Decoder(options);
  };

  // 10.1.2 gbk encoder
  // gbk's encoder is gb18030's encoder with its gbk flag set.
  /** @param {{fatal: boolean}} options */
  encoders['gbk'] = function(options) {
    return new GB18030Encoder(options, true);
  };

  // 10.2 gb18030

  // 10.2.1 gb18030 decoder
  /**
   * @constructor
   * @implements {Decoder}
   * @param {{fatal: boolean}} options
   */
  function GB18030Decoder(options) {
    var fatal = options.fatal;
    // gb18030's decoder has an associated gb18030 first, gb18030
    // second, and gb18030 third (all initially 0x00).
    var /** @type {number} */ gb18030_first = 0x00,
        /** @type {number} */ gb18030_second = 0x00,
        /** @type {number} */ gb18030_third = 0x00;
    /**
     * @param {Stream} stream The stream of bytes being decoded.
     * @param {number} bite The next byte read from the stream.
     * @return {?(number|!Array.<number>)} The next code point(s)
     *     decoded, or null if not enough data exists in the input
     *     stream to decode a complete code point.
     */
    this.handler = function(stream, bite) {
      // 1. If byte is end-of-stream and gb18030 first, gb18030
      // second, and gb18030 third are 0x00, return finished.
      if (bite === end_of_stream && gb18030_first === 0x00 &&
          gb18030_second === 0x00 && gb18030_third === 0x00) {
        return finished;
      }
      // 2. If byte is end-of-stream, and gb18030 first, gb18030
      // second, or gb18030 third is not 0x00, set gb18030 first,
      // gb18030 second, and gb18030 third to 0x00, and return error.
      if (bite === end_of_stream &&
          (gb18030_first !== 0x00 || gb18030_second !== 0x00 || gb18030_third !== 0x00)) {
        gb18030_first = 0x00;
        gb18030_second = 0x00;
        gb18030_third = 0x00;
        decoderError(fatal);
      }
      var code_point;
      // 3. If gb18030 third is not 0x00, run these substeps:
      if (gb18030_third !== 0x00) {
        // 1. Let code point be null.
        code_point = null;
        // 2. If byte is in the range 0x30 to 0x39, set code point to
        // the index gb18030 ranges code point for (((gb18030 first âˆ’
        // 0x81) Ã— 10 + gb18030 second âˆ’ 0x30) Ã— 126 + gb18030 third âˆ’
        // 0x81) Ã— 10 + byte âˆ’ 0x30.
        if (inRange(bite, 0x30, 0x39)) {
          code_point = indexGB18030RangesCodePointFor(
              (((gb18030_first - 0x81) * 10 + (gb18030_second - 0x30)) * 126 +
               (gb18030_third - 0x81)) * 10 + bite - 0x30);
        }

        // 3. Let buffer be a byte sequence consisting of gb18030
        // second, gb18030 third, and byte, in order.
        var buffer = [gb18030_second, gb18030_third, bite];

        // 4. Set gb18030 first, gb18030 second, and gb18030 third to
        // 0x00.
        gb18030_first = 0x00;
        gb18030_second = 0x00;
        gb18030_third = 0x00;

        // 5. If code point is null, prepend buffer to stream and
        // return error.
        if (code_point === null) {
          stream.prepend(buffer);
          return decoderError(fatal);
        }

        // 6. Return a code point whose value is code point.
        return code_point;
      }

      // 4. If gb18030 second is not 0x00, run these substeps:
      if (gb18030_second !== 0x00) {

        // 1. If byte is in the range 0x81 to 0xFE, set gb18030 third
        // to byte and return continue.
        if (inRange(bite, 0x81, 0xFE)) {
          gb18030_third = bite;
          return null;
        }

        // 2. Prepend gb18030 second followed by byte to stream, set
        // gb18030 first and gb18030 second to 0x00, and return error.
        stream.prepend([gb18030_second, bite]);
        gb18030_first = 0x00;
        gb18030_second = 0x00;
        return decoderError(fatal);
      }

      // 5. If gb18030 first is not 0x00, run these substeps:
      if (gb18030_first !== 0x00) {

        // 1. If byte is in the range 0x30 to 0x39, set gb18030 second
        // to byte and return continue.
        if (inRange(bite, 0x30, 0x39)) {
          gb18030_second = bite;
          return null;
        }

        // 2. Let lead be gb18030 first, let pointer be null, and set
        // gb18030 first to 0x00.
        var lead = gb18030_first;
        var pointer = null;
        gb18030_first = 0x00;

        // 3. Let offset be 0x40 if byte is less than 0x7F and 0x41
        // otherwise.
        var offset = bite < 0x7F ? 0x40 : 0x41;

        // 4. If byte is in the range 0x40 to 0x7E or 0x80 to 0xFE,
        // set pointer to (lead âˆ’ 0x81) Ã— 190 + (byte âˆ’ offset).
        if (inRange(bite, 0x40, 0x7E) || inRange(bite, 0x80, 0xFE))
          pointer = (lead - 0x81) * 190 + (bite - offset);

        // 5. Let code point be null if pointer is null and the index
        // code point for pointer in index gb18030 otherwise.
        code_point = pointer === null ? null :
            indexCodePointFor(pointer, index('gb18030'));

        // 6. If pointer is null, prepend byte to stream.
        if (pointer === null)
          stream.prepend(bite);

        // 7. If code point is null, return error.
        if (code_point === null)
          return decoderError(fatal);

        // 8. Return a code point whose value is code point.
        return code_point;
      }

      // 6. If byte is in the range 0x00 to 0x7F, return a code point
      // whose value is byte.
      if (inRange(bite, 0x00, 0x7F))
        return bite;

      // 7. If byte is 0x80, return code point U+20AC.
      if (bite === 0x80)
        return 0x20AC;

      // 8. If byte is in the range 0x81 to 0xFE, set gb18030 first to
      // byte and return continue.
      if (inRange(bite, 0x81, 0xFE)) {
        gb18030_first = bite;
        return null;
      }

      // 9. Return error.
      return decoderError(fatal);
    };
  }

  // 10.2.2 gb18030 encoder
  /**
   * @constructor
   * @implements {Encoder}
   * @param {{fatal: boolean}} options
   * @param {boolean=} gbk_flag
   */
  function GB18030Encoder(options, gbk_flag) {
    var fatal = options.fatal;
    // gb18030's decoder has an associated gbk flag (initially unset).
    /**
     * @param {Stream} stream Input stream.
     * @param {number} code_point Next code point read from the stream.
     * @return {(number|!Array.<number>)} Byte(s) to emit.
     */
    this.handler = function(stream, code_point) {
      // 1. If code point is end-of-stream, return finished.
      if (code_point === end_of_stream)
        return finished;

      // 2. If code point is in the range U+0000 to U+007F, return a
      // byte whose value is code point.
      if (inRange(code_point, 0x0000, 0x007F)) {
        return code_point;
      }

      // 3. If the gbk flag is set and code point is U+20AC, return
      // byte 0x80.
      if (gbk_flag && code_point === 0x20AC)
        return 0x80;

      // 4. Let pointer be the index pointer for code point in index
      // gb18030.
      var pointer = indexPointerFor(code_point, index('gb18030'));

      // 5. If pointer is not null, run these substeps:
      if (pointer !== null) {

        // 1. Let lead be pointer / 190 + 0x81.
        var lead = div(pointer, 190) + 0x81;

        // 2. Let trail be pointer % 190.
        var trail = pointer % 190;

        // 3. Let offset be 0x40 if trail is less than 0x3F and 0x41 otherwise.
        var offset = trail < 0x3F ? 0x40 : 0x41;

        // 4. Return two bytes whose values are lead and trail + offset.
        return [lead, trail + offset];
      }

      // 6. If gbk flag is set, return error with code point.
      if (gbk_flag)
        return encoderError(code_point);

      // 7. Set pointer to the index gb18030 ranges pointer for code
      // point.
      pointer = indexGB18030RangesPointerFor(code_point);

      // 8. Let byte1 be pointer / 10 / 126 / 10.
      var byte1 = div(div(div(pointer, 10), 126), 10);

      // 9. Set pointer to pointer âˆ’ byte1 Ã— 10 Ã— 126 Ã— 10.
      pointer = pointer - byte1 * 10 * 126 * 10;

      // 10. Let byte2 be pointer / 10 / 126.
      var byte2 = div(div(pointer, 10), 126);

      // 11. Set pointer to pointer âˆ’ byte2 Ã— 10 Ã— 126.
      pointer = pointer - byte2 * 10 * 126;

      // 12. Let byte3 be pointer / 10.
      var byte3 = div(pointer, 10);

      // 13. Let byte4 be pointer âˆ’ byte3 Ã— 10.
      var byte4 = pointer - byte3 * 10;

      // 14. Return four bytes whose values are byte1 + 0x81, byte2 +
      // 0x30, byte3 + 0x81, byte4 + 0x30.
      return [byte1 + 0x81,
              byte2 + 0x30,
              byte3 + 0x81,
              byte4 + 0x30];
    };
  }

  /** @param {{fatal: boolean}} options */
  encoders['gb18030'] = function(options) {
    return new GB18030Encoder(options);
  };
  /** @param {{fatal: boolean}} options */
  decoders['gb18030'] = function(options) {
    return new GB18030Decoder(options);
  };


  //
  // 11. Legacy multi-byte Chinese (traditional) encodings
  //

  // 11.1 big5

  /**
   * @constructor
   * @implements {Decoder}
   * @param {{fatal: boolean}} options
   */
  function Big5Decoder(options) {
    var fatal = options.fatal;
    // big5's decoder has an associated big5 lead (initially 0x00).
    var /** @type {number} */ big5_lead = 0x00;

    /**
     * @param {Stream} stream The stream of bytes being decoded.
     * @param {number} bite The next byte read from the stream.
     * @return {?(number|!Array.<number>)} The next code point(s)
     *     decoded, or null if not enough data exists in the input
     *     stream to decode a complete code point.
     */
    this.handler = function(stream, bite) {
      // 1. If byte is end-of-stream and big5 lead is not 0x00, set
      // big5 lead to 0x00 and return error.
      if (bite === end_of_stream && big5_lead !== 0x00) {
        big5_lead = 0x00;
        return decoderError(fatal);
      }

      // 2. If byte is end-of-stream and big5 lead is 0x00, return
      // finished.
      if (bite === end_of_stream && big5_lead === 0x00)
        return finished;

      // 3. If big5 lead is not 0x00, let lead be big5 lead, let
      // pointer be null, set big5 lead to 0x00, and then run these
      // substeps:
      if (big5_lead !== 0x00) {
        var lead = big5_lead;
        var pointer = null;
        big5_lead = 0x00;

        // 1. Let offset be 0x40 if byte is less than 0x7F and 0x62
        // otherwise.
        var offset = bite < 0x7F ? 0x40 : 0x62;

        // 2. If byte is in the range 0x40 to 0x7E or 0xA1 to 0xFE,
        // set pointer to (lead âˆ’ 0x81) Ã— 157 + (byte âˆ’ offset).
        if (inRange(bite, 0x40, 0x7E) || inRange(bite, 0xA1, 0xFE))
          pointer = (lead - 0x81) * 157 + (bite - offset);

        // 3. If there is a row in the table below whose first column
        // is pointer, return the two code points listed in its second
        // column
        // Pointer | Code points
        // --------+--------------
        // 1133    | U+00CA U+0304
        // 1135    | U+00CA U+030C
        // 1164    | U+00EA U+0304
        // 1166    | U+00EA U+030C
        switch (pointer) {
          case 1133: return [0x00CA, 0x0304];
          case 1135: return [0x00CA, 0x030C];
          case 1164: return [0x00EA, 0x0304];
          case 1166: return [0x00EA, 0x030C];
        }

        // 4. Let code point be null if pointer is null and the index
        // code point for pointer in index big5 otherwise.
        var code_point = (pointer === null) ? null :
            indexCodePointFor(pointer, index('big5'));

        // 5. If code point is null and byte is in the range 0x00 to
        // 0x7F, prepend byte to stream.
        if (code_point === null && inRange(bite, 0x00, 0x7F))
          stream.prepend(bite);

        // 6. If code point is null, return error.
        if (code_point === null)
          return decoderError(fatal);

        // 7. Return a code point whose value is code point.
        return code_point;
      }

      // 4. If byte is in the range 0x00 to 0x7F, return a code point
      // whose value is byte.
      if (inRange(bite, 0x00, 0x7F))
        return bite;

      // 5. If byte is in the range 0x81 to 0xFE, set big5 lead to
      // byte and return continue.
      if (inRange(bite, 0x81, 0xFE)) {
        big5_lead = bite;
        return null;
      }

      // 6. Return error.
      return decoderError(fatal);
    };
  }

  /**
   * @constructor
   * @implements {Encoder}
   * @param {{fatal: boolean}} options
   */
  function Big5Encoder(options) {
    var fatal = options.fatal;
    /**
     * @param {Stream} stream Input stream.
     * @param {number} code_point Next code point read from the stream.
     * @return {(number|!Array.<number>)} Byte(s) to emit.
     */
    this.handler = function(stream, code_point) {
      // 1. If code point is end-of-stream, return finished.
      if (code_point === end_of_stream)
        return finished;

      // 2. If code point is in the range U+0000 to U+007F, return a
      // byte whose value is code point.
      if (inRange(code_point, 0x0000, 0x007F))
        return code_point;

      // 3. Let pointer be the index pointer for code point in index
      // big5.
      var pointer = indexPointerFor(code_point, index('big5'));

      // 4. If pointer is null, return error with code point.
      if (pointer === null)
        return encoderError(code_point);

      // 5. Let lead be pointer / 157 + 0x81.
      var lead = div(pointer, 157) + 0x81;

      // 6. If lead is less than 0xA1, return error with code point.
      if (lead < 0xA1)
        return encoderError(code_point);

      // 7. Let trail be pointer % 157.
      var trail = pointer % 157;

      // 8. Let offset be 0x40 if trail is less than 0x3F and 0x62
      // otherwise.
      var offset = trail < 0x3F ? 0x40 : 0x62;

      // Return two bytes whose values are lead and trail + offset.
      return [lead, trail + offset];
    };
  }

  /** @param {{fatal: boolean}} options */
  encoders['big5'] = function(options) {
    return new Big5Encoder(options);
  };
  /** @param {{fatal: boolean}} options */
  decoders['big5'] = function(options) {
    return new Big5Decoder(options);
  };


  //
  // 12. Legacy multi-byte Japanese encodings
  //

  // 12.1 euc-jp

  /**
   * @constructor
   * @implements {Decoder}
   * @param {{fatal: boolean}} options
   */
  function EUCJPDecoder(options) {
    var fatal = options.fatal;

    // euc-jp's decoder has an associated euc-jp jis0212 flag
    // (initially unset) and euc-jp lead (initially 0x00).
    var /** @type {boolean} */ eucjp_jis0212_flag = false,
        /** @type {number} */ eucjp_lead = 0x00;

    /**
     * @param {Stream} stream The stream of bytes being decoded.
     * @param {number} bite The next byte read from the stream.
     * @return {?(number|!Array.<number>)} The next code point(s)
     *     decoded, or null if not enough data exists in the input
     *     stream to decode a complete code point.
     */
    this.handler = function(stream, bite) {
      // 1. If byte is end-of-stream and euc-jp lead is not 0x00, set
      // euc-jp lead to 0x00, and return error.
      if (bite === end_of_stream && eucjp_lead !== 0x00) {
        eucjp_lead = 0x00;
        return decoderError(fatal);
      }

      // 2. If byte is end-of-stream and euc-jp lead is 0x00, return
      // finished.
      if (bite === end_of_stream && eucjp_lead === 0x00)
        return finished;

      // 3. If euc-jp lead is 0x8E and byte is in the range 0xA1 to
      // 0xDF, set euc-jp lead to 0x00 and return a code point whose
      // value is 0xFF61 + byte âˆ’ 0xA1.
      if (eucjp_lead === 0x8E && inRange(bite, 0xA1, 0xDF)) {
        eucjp_lead = 0x00;
        return 0xFF61 + bite - 0xA1;
      }

      // 4. If euc-jp lead is 0x8F and byte is in the range 0xA1 to
      // 0xFE, set the euc-jp jis0212 flag, set euc-jp lead to byte,
      // and return continue.
      if (eucjp_lead === 0x8F && inRange(bite, 0xA1, 0xFE)) {
        eucjp_jis0212_flag = true;
        eucjp_lead = bite;
        return null;
      }

      // 5. If euc-jp lead is not 0x00, let lead be euc-jp lead, set
      // euc-jp lead to 0x00, and run these substeps:
      if (eucjp_lead !== 0x00) {
        var lead = eucjp_lead;
        eucjp_lead = 0x00;

        // 1. Let code point be null.
        var code_point = null;

        // 2. If lead and byte are both in the range 0xA1 to 0xFE, set
        // code point to the index code point for (lead âˆ’ 0xA1) Ã— 94 +
        // byte âˆ’ 0xA1 in index jis0208 if the euc-jp jis0212 flag is
        // unset and in index jis0212 otherwise.
        if (inRange(lead, 0xA1, 0xFE) && inRange(bite, 0xA1, 0xFE)) {
          code_point = indexCodePointFor(
            (lead - 0xA1) * 94 + (bite - 0xA1),
            index(!eucjp_jis0212_flag ? 'jis0208' : 'jis0212'));
        }

        // 3. Unset the euc-jp jis0212 flag.
        eucjp_jis0212_flag = false;

        // 4. If byte is not in the range 0xA1 to 0xFE, prepend byte
        // to stream.
        if (!inRange(bite, 0xA1, 0xFE))
          stream.prepend(bite);

        // 5. If code point is null, return error.
        if (code_point === null)
          return decoderError(fatal);

        // 6. Return a code point whose value is code point.
        return code_point;
      }

      // 6. If byte is in the range 0x00 to 0x7F, return a code point
      // whose value is byte.
      if (inRange(bite, 0x00, 0x7F))
        return bite;

      // 7. If byte is 0x8E, 0x8F, or in the range 0xA1 to 0xFE, set
      // euc-jp lead to byte and return continue.
      if (bite === 0x8E || bite === 0x8F || inRange(bite, 0xA1, 0xFE)) {
        eucjp_lead = bite;
        return null;
      }

      // 8. Return error.
      return decoderError(fatal);
    };
  }

  /**
   * @constructor
   * @implements {Encoder}
   * @param {{fatal: boolean}} options
   */
  function EUCJPEncoder(options) {
    var fatal = options.fatal;
    /**
     * @param {Stream} stream Input stream.
     * @param {number} code_point Next code point read from the stream.
     * @return {(number|!Array.<number>)} Byte(s) to emit.
     */
    this.handler = function(stream, code_point) {
      // 1. If code point is end-of-stream, return finished.
      if (code_point === end_of_stream)
        return finished;

      // 2. If code point is in the range U+0000 to U+007F, return a
      // byte whose value is code point.
      if (inRange(code_point, 0x0000, 0x007F))
        return code_point;

      // 3. If code point is U+00A5, return byte 0x5C.
      if (code_point === 0x00A5)
        return 0x5C;

      // 4. If code point is U+203E, return byte 0x7E.
      if (code_point === 0x203E)
        return 0x7E;

      // 5. If code point is in the range U+FF61 to U+FF9F, return two
      // bytes whose values are 0x8E and code point âˆ’ 0xFF61 + 0xA1.
      if (inRange(code_point, 0xFF61, 0xFF9F))
        return [0x8E, code_point - 0xFF61 + 0xA1];

      // 6. Let pointer be the index pointer for code point in index
      // jis0208.
      var pointer = indexPointerFor(code_point, index('jis0208'));

      // 7. If pointer is null, return error with code point.
      if (pointer === null)
        return encoderError(code_point);

      // 8. Let lead be pointer / 94 + 0xA1.
      var lead = div(pointer, 94) + 0xA1;

      // 9. Let trail be pointer % 94 + 0xA1.
      var trail = pointer % 94 + 0xA1;

      // 10. Return two bytes whose values are lead and trail.
      return [lead, trail];
    };
  }

  /** @param {{fatal: boolean}} options */
  encoders['euc-jp'] = function(options) {
    return new EUCJPEncoder(options);
  };
  /** @param {{fatal: boolean}} options */
  decoders['euc-jp'] = function(options) {
    return new EUCJPDecoder(options);
  };

  // 12.2 iso-2022-jp

  /**
   * @constructor
   * @implements {Decoder}
   * @param {{fatal: boolean}} options
   */
  function ISO2022JPDecoder(options) {
    var fatal = options.fatal;
    /** @enum */
    var states = {
      ASCII: 0,
      Roman: 1,
      Katakana: 2,
      LeadByte: 3,
      TrailByte: 4,
      EscapeStart: 5,
      Escape: 6
    };
    // iso-2022-jp's decoder has an associated iso-2022-jp decoder
    // state (initially ASCII), iso-2022-jp decoder output state
    // (initially ASCII), iso-2022-jp lead (initially 0x00), and
    // iso-2022-jp output flag (initially unset).
    var /** @type {number} */ iso2022jp_decoder_state = states.ASCII,
        /** @type {number} */ iso2022jp_decoder_output_state = states.ASCII,
        /** @type {number} */ iso2022jp_lead = 0x00,
        /** @type {boolean} */ iso2022jp_output_flag = false;
    /**
     * @param {Stream} stream The stream of bytes being decoded.
     * @param {number} bite The next byte read from the stream.
     * @return {?(number|!Array.<number>)} The next code point(s)
     *     decoded, or null if not enough data exists in the input
     *     stream to decode a complete code point.
     */
    this.handler = function(stream, bite) {
      // switching on iso-2022-jp decoder state:
      switch (iso2022jp_decoder_state) {
      default:
      case states.ASCII:
        // ASCII
        // Based on byte:

        // 0x1B
        if (bite === 0x1B) {
          // Set iso-2022-jp decoder state to escape start and return
          // continue.
          iso2022jp_decoder_state = states.EscapeStart;
          return null;
        }

        // 0x00 to 0x7F, excluding 0x0E, 0x0F, and 0x1B
        if (inRange(bite, 0x00, 0x7F) && bite !== 0x0E
            && bite !== 0x0F && bite !== 0x1B) {
          // Unset the iso-2022-jp output flag and return a code point
          // whose value is byte.
          iso2022jp_output_flag = false;
          return bite;
        }

        // end-of-stream
        if (bite === end_of_stream) {
          // Return finished.
          return finished;
        }

        // Otherwise
        // Unset the iso-2022-jp output flag and return error.
        iso2022jp_output_flag = false;
        return decoderError(fatal);

      case states.Roman:
        // Roman
        // Based on byte:

        // 0x1B
        if (bite === 0x1B) {
          // Set iso-2022-jp decoder state to escape start and return
          // continue.
          iso2022jp_decoder_state = states.EscapeStart;
          return null;
        }

        // 0x5C
        if (bite === 0x5C) {
          // Unset the iso-2022-jp output flag and return code point
          // U+00A5.
          iso2022jp_output_flag = false;
          return 0x00A5;
        }

        // 0x7E
        if (bite === 0x7E) {
          // Unset the iso-2022-jp output flag and return code point
          // U+203E.
          iso2022jp_output_flag = false;
          return 0x203E;
        }

        // 0x00 to 0x7F, excluding 0x0E, 0x0F, 0x1B, 0x5C, and 0x7E
        if (inRange(bite, 0x00, 0x7F) && bite !== 0x0E && bite !== 0x0F
            && bite !== 0x1B && bite !== 0x5C && bite !== 0x7E) {
          // Unset the iso-2022-jp output flag and return a code point
          // whose value is byte.
          iso2022jp_output_flag = false;
          return bite;
        }

        // end-of-stream
        if (bite === end_of_stream) {
          // Return finished.
          return finished;
        }

        // Otherwise
        // Unset the iso-2022-jp output flag and return error.
        iso2022jp_output_flag = false;
        return decoderError(fatal);

      case states.Katakana:
        // Katakana
        // Based on byte:

        // 0x1B
        if (bite === 0x1B) {
          // Set iso-2022-jp decoder state to escape start and return
          // continue.
          iso2022jp_decoder_state = states.EscapeStart;
          return null;
        }

        // 0x21 to 0x5F
        if (inRange(bite, 0x21, 0x5F)) {
          // Unset the iso-2022-jp output flag and return a code point
          // whose value is 0xFF61 + byte âˆ’ 0x21.
          iso2022jp_output_flag = false;
          return 0xFF61 + bite - 0x21;
        }

        // end-of-stream
        if (bite === end_of_stream) {
          // Return finished.
          return finished;
        }

        // Otherwise
        // Unset the iso-2022-jp output flag and return error.
        iso2022jp_output_flag = false;
        return decoderError(fatal);

      case states.LeadByte:
        // Lead byte
        // Based on byte:

        // 0x1B
        if (bite === 0x1B) {
          // Set iso-2022-jp decoder state to escape start and return
          // continue.
          iso2022jp_decoder_state = states.EscapeStart;
          return null;
        }

        // 0x21 to 0x7E
        if (inRange(bite, 0x21, 0x7E)) {
          // Unset the iso-2022-jp output flag, set iso-2022-jp lead
          // to byte, iso-2022-jp decoder state to trail byte, and
          // return continue.
          iso2022jp_output_flag = false;
          iso2022jp_lead = bite;
          iso2022jp_decoder_state = states.TrailByte;
          return null;
        }

        // end-of-stream
        if (bite === end_of_stream) {
          // Return finished.
          return finished;
        }

        // Otherwise
        // Unset the iso-2022-jp output flag and return error.
        iso2022jp_output_flag = false;
        return decoderError(fatal);

      case states.TrailByte:
        // Trail byte
        // Based on byte:

        // 0x1B
        if (bite === 0x1B) {
          // Set iso-2022-jp decoder state to escape start and return
          // continue.
          iso2022jp_decoder_state = states.EscapeStart;
          return decoderError(fatal);
        }

        // 0x21 to 0x7E
        if (inRange(bite, 0x21, 0x7E)) {
          // 1. Set the iso-2022-jp decoder state to lead byte.
          iso2022jp_decoder_state = states.LeadByte;

          // 2. Let pointer be (iso-2022-jp lead âˆ’ 0x21) Ã— 94 + byte âˆ’ 0x21.
          var pointer = (iso2022jp_lead - 0x21) * 94 + bite - 0x21;

          // 3. Let code point be the index code point for pointer in index jis0208.
          var code_point = indexCodePointFor(pointer, index('jis0208'));

          // 4. If code point is null, return error.
          if (code_point === null)
            return decoderError(fatal);

          // 5. Return a code point whose value is code point.
          return code_point;
        }

        // end-of-stream
        if (bite === end_of_stream) {
          // Set the iso-2022-jp decoder state to lead byte, prepend
          // byte to stream, and return error.
          iso2022jp_decoder_state = states.LeadByte;
          stream.prepend(bite);
          return decoderError(fatal);
        }

        // Otherwise
        // Set iso-2022-jp decoder state to lead byte and return
        // error.
        iso2022jp_decoder_state = states.LeadByte;
        return decoderError(fatal);

      case states.EscapeStart:
        // Escape start

        // 1. If byte is either 0x24 or 0x28, set iso-2022-jp lead to
        // byte, iso-2022-jp decoder state to escape, and return
        // continue.
        if (bite === 0x24 || bite === 0x28) {
          iso2022jp_lead = bite;
          iso2022jp_decoder_state = states.Escape;
          return null;
        }

        // 2. Prepend byte to stream.
        stream.prepend(bite);

        // 3. Unset the iso-2022-jp output flag, set iso-2022-jp
        // decoder state to iso-2022-jp decoder output state, and
        // return error.
        iso2022jp_output_flag = false;
        iso2022jp_decoder_state = iso2022jp_decoder_output_state;
        return decoderError(fatal);

      case states.Escape:
        // Escape

        // 1. Let lead be iso-2022-jp lead and set iso-2022-jp lead to
        // 0x00.
        var lead = iso2022jp_lead;
        iso2022jp_lead = 0x00;

        // 2. Let state be null.
        var state = null;

        // 3. If lead is 0x28 and byte is 0x42, set state to ASCII.
        if (lead === 0x28 && bite === 0x42)
          state = states.ASCII;

        // 4. If lead is 0x28 and byte is 0x4A, set state to Roman.
        if (lead === 0x28 && bite === 0x4A)
          state = states.Roman;

        // 5. If lead is 0x28 and byte is 0x49, set state to Katakana.
        if (lead === 0x28 && bite === 0x49)
          state = states.Katakana;

        // 6. If lead is 0x24 and byte is either 0x40 or 0x42, set
        // state to lead byte.
        if (lead === 0x24 && (bite === 0x40 || bite === 0x42))
          state = states.LeadByte;

        // 7. If state is non-null, run these substeps:
        if (state !== null) {
          // 1. Set iso-2022-jp decoder state and iso-2022-jp decoder
          // output state to states.
          iso2022jp_decoder_state = iso2022jp_decoder_state = state;

          // 2. Let output flag be the iso-2022-jp output flag.
          var output_flag = iso2022jp_output_flag;

          // 3. Set the iso-2022-jp output flag.
          iso2022jp_output_flag = true;

          // 4. Return continue, if output flag is unset, and error
          // otherwise.
          return !output_flag ? null : decoderError(fatal);
        }

        // 8. Prepend lead and byte to stream.
        stream.prepend([lead, bite]);

        // 9. Unset the iso-2022-jp output flag, set iso-2022-jp
        // decoder state to iso-2022-jp decoder output state and
        // return error.
        iso2022jp_output_flag = false;
        iso2022jp_decoder_state = iso2022jp_decoder_output_state;
        return decoderError(fatal);
      }
    };
  }

  /**
   * @constructor
   * @implements {Encoder}
   * @param {{fatal: boolean}} options
   */
  function ISO2022JPEncoder(options) {
    var fatal = options.fatal;
    // iso-2022-jp's encoder has an associated iso-2022-jp encoder
    // state which is one of ASCII, Roman, and jis0208 (initially
    // ASCII).
    /** @enum */
    var states = {
      ASCII: 0,
      Roman: 1,
      jis0208: 2
    };
    var /** @type {number} */ iso2022jp_state = states.ASCII;
    /**
     * @param {Stream} stream Input stream.
     * @param {number} code_point Next code point read from the stream.
     * @return {(number|!Array.<number>)} Byte(s) to emit.
     */
    this.handler = function(stream, code_point) {
      // 1. If code point is end-of-stream and iso-2022-jp encoder
      // state is not ASCII, prepend code point to stream, set
      // iso-2022-jp encoder state to ASCII, and return three bytes
      // 0x1B 0x28 0x42.
      if (code_point === end_of_stream &&
          iso2022jp_state !== states.ASCII) {
        stream.prepend(code_point);
        return [0x1B, 0x28, 0x42];
      }

      // 2. If code point is end-of-stream and iso-2022-jp encoder
      // state is ASCII, return finished.
      if (code_point === end_of_stream && iso2022jp_state === states.ASCII)
        return finished;

      // 3. If iso-2022-jp encoder state is ASCII and code point is in
      // the range U+0000 to U+007F, return a byte whose value is code
      // point.
      if (iso2022jp_state === states.ASCII &&
          inRange(code_point, 0x0000, 0x007F))
        return code_point;

      // 4. If iso-2022-jp encoder state is Roman and code point is in
      // the range U+0000 to U+007F, excluding U+005C and U+007E, or
      // is U+00A5 or U+203E, run these substeps:
      if (iso2022jp_state === states.Roman &&
          inRange(code_point, 0x0000, 0x007F) &&
          code_point !== 0x005C && code_point !== 0x007E) {

        // 1. If code point is in the range U+0000 to U+007F, return a
        // byte whose value is code point.
        if (inRange(code_point, 0x0000, 0x007F))
          return code_point;

        // 2. If code point is U+00A5, return byte 0x5C.
        if (code_point === 0x00A5)
          return 0x5C;

        // 3. If code point is U+203E, return byte 0x7E.
        if (code_point === 0x203E)
          return 0x7E;
      }

      // 5. If code point is in the range U+0000 to U+007F, and
      // iso-2022-jp encoder state is not ASCII, prepend code point to
      // stream, set iso-2022-jp encoder state to ASCII, and return
      // three bytes 0x1B 0x28 0x42.
      if (inRange(code_point, 0x0000, 0x007F) &&
          iso2022jp_state !== states.ASCII) {
        stream.prepend(code_point);
        iso2022jp_state = states.ASCII;
        return [0x1B, 0x28, 0x42];
      }

      // 6. If code point is either U+00A5 or U+203E, and iso-2022-jp
      // encoder state is not Roman, prepend code point to stream, set
      // iso-2022-jp encoder state to Roman, and return three bytes
      // 0x1B 0x28 0x4A.
      if ((code_point === 0x00A5 || code_point === 0x203E) &&
          iso2022jp_state !== states.Roman) {
        stream.prepend(code_point);
        iso2022jp_state = states.Roman;
        return [0x1B, 0x28, 0x4A];
      }

      // 7. Let pointer be the index pointer for code point in index
      // jis0208.
      var pointer = indexPointerFor(code_point, index('jis0208'));

      // 8. If pointer is null, return error with code point.
      if (pointer === null)
        return encoderError(code_point);

      // 9. If iso-2022-jp encoder state is not jis0208, prepend code
      // point to stream, set iso-2022-jp encoder state to jis0208,
      // and return three bytes 0x1B 0x24 0x42.
      if (iso2022jp_state !== states.jis0208) {
        stream.prepend(code_point);
        iso2022jp_state = states.jis0208;
        return [0x1B, 0x24, 0x42];
      }

      // 10. Let lead be pointer / 94 + 0x21.
      var lead = div(pointer, 94) + 0x21;

      // 11. Let trail be pointer % 94 + 0x21.
      var trail = pointer % 94 + 0x21;

      // 12. Return two bytes whose values are lead and trail.
      return [lead, trail];
    };
  }

  /** @param {{fatal: boolean}} options */
  encoders['iso-2022-jp'] = function(options) {
    return new ISO2022JPEncoder(options);
  };
  /** @param {{fatal: boolean}} options */
  decoders['iso-2022-jp'] = function(options) {
    return new ISO2022JPDecoder(options);
  };

  // 12.3 shift_jis

  /**
   * @constructor
   * @implements {Decoder}
   * @param {{fatal: boolean}} options
   */
  function ShiftJISDecoder(options) {
    var fatal = options.fatal;
    // shift_jis's decoder has an associated shift_jis lead (initially
    // 0x00).
    var /** @type {number} */ shiftjis_lead = 0x00;
    /**
     * @param {Stream} stream The stream of bytes being decoded.
     * @param {number} bite The next byte read from the stream.
     * @return {?(number|!Array.<number>)} The next code point(s)
     *     decoded, or null if not enough data exists in the input
     *     stream to decode a complete code point.
     */
    this.handler = function(stream, bite) {
      // 1. If byte is end-of-stream and shift_jis lead is not 0x00,
      // set shift_jis lead to 0x00 and return error.
      if (bite === end_of_stream && shiftjis_lead !== 0x00) {
        shiftjis_lead = 0x00;
        return decoderError(fatal);
      }

      // 2. If byte is end-of-stream and shift_jis lead is 0x00,
      // return finished.
      if (bite === end_of_stream && shiftjis_lead === 0x00)
        return finished;

      // 3. If shift_jis lead is not 0x00, let lead be shift_jis lead,
      // let pointer be null, set shift_jis lead to 0x00, and then run
      // these substeps:
      if (shiftjis_lead !== 0x00) {
        var lead = shiftjis_lead;
        var pointer = null;
        shiftjis_lead = 0x00;

        // 1. Let offset be 0x40, if byte is less than 0x7F, and 0x41
        // otherwise.
        var offset = (bite < 0x7F) ? 0x40 : 0x41;

        // 2. Let lead offset be 0x81, if lead is less than 0xA0, and
        // 0xC1 otherwise.
        var lead_offset = (lead < 0xA0) ? 0x81 : 0xC1;

        // 3. If byte is in the range 0x40 to 0x7E or 0x80 to 0xFC,
        // set pointer to (lead âˆ’ lead offset) Ã— 188 + byte âˆ’ offset.
        if (inRange(bite, 0x40, 0x7E) || inRange(bite, 0x80, 0xFC))
          pointer = (lead - lead_offset) * 188 + bite - offset;

        // 4. Let code point be null, if pointer is null, and the
        // index code point for pointer in index jis0208 otherwise.
        var code_point = (pointer === null) ? null :
              indexCodePointFor(pointer, index('jis0208'));

        // 5. If code point is null and pointer is in the range 8836
        // to 10528, return a code point whose value is 0xE000 +
        // pointer âˆ’ 8836.
        if (code_point === null && pointer !== null &&
            inRange(pointer, 8836, 10528))
          return 0xE000 + pointer - 8836;

        // 6. If pointer is null, prepend byte to stream.
        if (pointer === null)
          stream.prepend(bite);

        // 7. If code point is null, return error.
        if (code_point === null)
          return decoderError(fatal);

        // 8. Return a code point whose value is code point.
        return code_point;
      }

      // 4. If byte is in the range 0x00 to 0x80, return a code point
      // whose value is byte.
      if (inRange(bite, 0x00, 0x80))
        return bite;

      // 5. If byte is in the range 0xA1 to 0xDF, return a code point
      // whose value is 0xFF61 + byte âˆ’ 0xA1.
      if (inRange(bite, 0xA1, 0xDF))
        return 0xFF61 + bite - 0xA1;

      // 6. If byte is in the range 0x81 to 0x9F or 0xE0 to 0xFC, set
      // shift_jis lead to byte and return continue.
      if (inRange(bite, 0x81, 0x9F) || inRange(bite, 0xE0, 0xFC)) {
        shiftjis_lead = bite;
        return null;
      }

      // 7. Return error.
      return decoderError(fatal);
    };
  }

  /**
   * @constructor
   * @implements {Encoder}
   * @param {{fatal: boolean}} options
   */
  function ShiftJISEncoder(options) {
    var fatal = options.fatal;
    /**
     * @param {Stream} stream Input stream.
     * @param {number} code_point Next code point read from the stream.
     * @return {(number|!Array.<number>)} Byte(s) to emit.
     */
    this.handler = function(stream, code_point) {
      // 1. If code point is end-of-stream, return finished.
      if (code_point === end_of_stream)
        return finished;

      // 2. If code point is in the range U+0000 to U+0080, return a
      // byte whose value is code point.
      if (inRange(code_point, 0x0000, 0x0080))
        return code_point;

      // 3. If code point is U+00A5, return byte 0x5C.
      if (code_point === 0x00A5)
        return 0x5C;

      // 4. If code point is U+203E, return byte 0x7E.
      if (code_point === 0x203E)
        return 0x7E;

      // 5. If code point is in the range U+FF61 to U+FF9F, return a
      // byte whose value is code point âˆ’ 0xFF61 + 0xA1.
      if (inRange(code_point, 0xFF61, 0xFF9F))
        return code_point - 0xFF61 + 0xA1;

      // 6. Let pointer be the index shift_jis pointer for code point.
      var pointer = indexShiftJISPointerFor(code_point);

      // 7. If pointer is null, return error with code point.
      if (pointer === null)
        return encoderError(code_point);

      // 8. Let lead be pointer / 188.
      var lead = div(pointer, 188);

      // 9. Let lead offset be 0x81, if lead is less than 0x1F, and
      // 0xC1 otherwise.
      var lead_offset = (lead < 0x1F) ? 0x81 : 0xC1;

      // 10. Let trail be pointer % 188.
      var trail = pointer % 188;

      // 11. Let offset be 0x40, if trail is less than 0x3F, and 0x41
      // otherwise.
      var offset = (trail < 0x3F) ? 0x40 : 0x41;

      // 12. Return two bytes whose values are lead + lead offset and
      // trail + offset.
      return [lead + lead_offset, trail + offset];
    };
  }

  /** @param {{fatal: boolean}} options */
  encoders['shift_jis'] = function(options) {
    return new ShiftJISEncoder(options);
  };
  /** @param {{fatal: boolean}} options */
  decoders['shift_jis'] = function(options) {
    return new ShiftJISDecoder(options);
  };

  //
  // 13. Legacy multi-byte Korean encodings
  //

  // 13.1 euc-kr

  /**
   * @constructor
   * @implements {Decoder}
   * @param {{fatal: boolean}} options
   */
  function EUCKRDecoder(options) {
    var fatal = options.fatal;

    // euc-kr's decoder has an associated euc-kr lead (initially 0x00).
    var /** @type {number} */ euckr_lead = 0x00;
    /**
     * @param {Stream} stream The stream of bytes being decoded.
     * @param {number} bite The next byte read from the stream.
     * @return {?(number|!Array.<number>)} The next code point(s)
     *     decoded, or null if not enough data exists in the input
     *     stream to decode a complete code point.
     */
    this.handler = function(stream, bite) {
      // 1. If byte is end-of-stream and euc-kr lead is not 0x00, set
      // euc-kr lead to 0x00 and return error.
      if (bite === end_of_stream && euckr_lead !== 0) {
        euckr_lead = 0x00;
        return decoderError(fatal);
      }

      // 2. If byte is end-of-stream and euc-kr lead is 0x00, return
      // finished.
      if (bite === end_of_stream && euckr_lead === 0)
        return finished;

      // 3. If euc-kr lead is not 0x00, let lead be euc-kr lead, let
      // pointer be null, set euc-kr lead to 0x00, and then run these
      // substeps:
      if (euckr_lead !== 0x00) {
        var lead = euckr_lead;
        var pointer = null;
        euckr_lead = 0x00;

        // 1. If byte is in the range 0x41 to 0xFE, set pointer to
        // (lead âˆ’ 0x81) Ã— 190 + (byte âˆ’ 0x41).
        if (inRange(bite, 0x41, 0xFE))
          pointer = (lead - 0x81) * 190 + (bite - 0x41);

        // 2. Let code point be null, if pointer is null, and the
        // index code point for pointer in index euc-kr otherwise.
        var code_point = (pointer === null) ? null : indexCodePointFor(pointer, index('euc-kr'));

        // 3. If pointer is null and byte is in the range 0x00 to
        // 0x7F, prepend byte to stream.
        if (pointer === null && inRange(bite, 0x00, 0x7F))
          stream.prepend(bite);

        // 4. If code point is null, return error.
        if (code_point === null)
          return decoderError(fatal);

        // 5. Return a code point whose value is code point.
        return code_point;
      }

      // 4. If byte is in the range 0x00 to 0x7F, return a code point
      // whose value is byte.
      if (inRange(bite, 0x00, 0x7F))
        return bite;

      // 5. If byte is in the range 0x81 to 0xFE, set euc-kr lead to
      // byte and return continue.
      if (inRange(bite, 0x81, 0xFE)) {
        euckr_lead = bite;
        return null;
      }

      // 6. Return error.
      return decoderError(fatal);
    };
  }

  /**
   * @constructor
   * @implements {Encoder}
   * @param {{fatal: boolean}} options
   */
  function EUCKREncoder(options) {
    var fatal = options.fatal;
    /**
     * @param {Stream} stream Input stream.
     * @param {number} code_point Next code point read from the stream.
     * @return {(number|!Array.<number>)} Byte(s) to emit.
     */
    this.handler = function(stream, code_point) {
      // 1. If code point is end-of-stream, return finished.
      if (code_point === end_of_stream)
        return finished;

      // 2. If code point is in the range U+0000 to U+007F, return a
      // byte whose value is code point.
      if (inRange(code_point, 0x0000, 0x007F))
        return code_point;

      // 3. Let pointer be the index pointer for code point in index
      // euc-kr.
      var pointer = indexPointerFor(code_point, index('euc-kr'));
      
      if(pointer == null) {
    	  return [0xFF];
      }

      // 4. If pointer is null, return error with code point.
      if (pointer === null)
        return encoderError(code_point);

      // 5. Let lead be pointer / 190 + 0x81.
      var lead = div(pointer, 190) + 0x81;

      // 6. Let trail be pointer % 190 + 0x41.
      var trail = (pointer % 190) + 0x41;

      // 7. Return two bytes whose values are lead and trail.
      return [lead, trail];
    };
  }

  /** @param {{fatal: boolean}} options */
  encoders['euc-kr'] = function(options) {
    return new EUCKREncoder(options);
  };
  /** @param {{fatal: boolean}} options */
  decoders['euc-kr'] = function(options) {
    return new EUCKRDecoder(options);
  };


  //
  // 14. Legacy miscellaneous encodings
  //

  // 14.1 replacement

  // Not needed - API throws RangeError

  // 14.2 utf-16

  /**
   * @param {number} code_unit
   * @param {boolean} utf16be
   * @return {!Array.<number>} bytes
   */
  function convertCodeUnitToBytes(code_unit, utf16be) {
    // 1. Let byte1 be code unit >> 8.
    var byte1 = code_unit >> 8;

    // 2. Let byte2 be code unit & 0x00FF.
    var byte2 = code_unit & 0x00FF;

    // 3. Then return the bytes in order:
        // utf-16be flag is set: byte1, then byte2.
    if (utf16be)
      return [byte1, byte2];
    // utf-16be flag is unset: byte2, then byte1.
    return [byte2, byte1];
  }

  /**
   * @constructor
   * @implements {Decoder}
   * @param {boolean} utf16_be True if big-endian, false if little-endian.
   * @param {{fatal: boolean}} options
   */
  function UTF16Decoder(utf16_be, options) {
    var fatal = options.fatal;
    var /** @type {?number} */ utf16_lead_byte = null,
        /** @type {?number} */ utf16_lead_surrogate = null;
    /**
     * @param {Stream} stream The stream of bytes being decoded.
     * @param {number} bite The next byte read from the stream.
     * @return {?(number|!Array.<number>)} The next code point(s)
     *     decoded, or null if not enough data exists in the input
     *     stream to decode a complete code point.
     */
    this.handler = function(stream, bite) {
      // 1. If byte is end-of-stream and either utf-16 lead byte or
      // utf-16 lead surrogate is not null, set utf-16 lead byte and
      // utf-16 lead surrogate to null, and return error.
      if (bite === end_of_stream && (utf16_lead_byte !== null ||
                                utf16_lead_surrogate !== null)) {
        return decoderError(fatal);
      }

      // 2. If byte is end-of-stream and utf-16 lead byte and utf-16
      // lead surrogate are null, return finished.
      if (bite === end_of_stream && utf16_lead_byte === null &&
          utf16_lead_surrogate === null) {
        return finished;
      }

      // 3. If utf-16 lead byte is null, set utf-16 lead byte to byte
      // and return continue.
      if (utf16_lead_byte === null) {
        utf16_lead_byte = bite;
        return null;
      }

      // 4. Let code unit be the result of:
      var code_unit;
      if (utf16_be) {
        // utf-16be decoder flag is set
        //   (utf-16 lead byte << 8) + byte.
        code_unit = (utf16_lead_byte << 8) + bite;
      } else {
        // utf-16be decoder flag is unset
        //   (byte << 8) + utf-16 lead byte.
        code_unit = (bite << 8) + utf16_lead_byte;
      }
      // Then set utf-16 lead byte to null.
      utf16_lead_byte = null;

      // 5. If utf-16 lead surrogate is not null, let lead surrogate
      // be utf-16 lead surrogate, set utf-16 lead surrogate to null,
      // and then run these substeps:
      if (utf16_lead_surrogate !== null) {
        var lead_surrogate = utf16_lead_surrogate;
        utf16_lead_surrogate = null;

        // 1. If code unit is in the range U+DC00 to U+DFFF, return a
        // code point whose value is 0x10000 + ((lead surrogate âˆ’
        // 0xD800) << 10) + (code unit âˆ’ 0xDC00).
        if (inRange(code_unit, 0xDC00, 0xDFFF)) {
          return 0x10000 + (lead_surrogate - 0xD800) * 0x400 +
              (code_unit - 0xDC00);
        }

        // 2. Prepend the sequence resulting of converting code unit
        // to bytes using utf-16be decoder flag to stream and return
        // error.
        stream.prepend(convertCodeUnitToBytes(code_unit, utf16_be));
        return decoderError(fatal);
      }

      // 6. If code unit is in the range U+D800 to U+DBFF, set utf-16
      // lead surrogate to code unit and return continue.
      if (inRange(code_unit, 0xD800, 0xDBFF)) {
        utf16_lead_surrogate = code_unit;
        return null;
      }

      // 7. If code unit is in the range U+DC00 to U+DFFF, return
      // error.
      if (inRange(code_unit, 0xDC00, 0xDFFF))
        return decoderError(fatal);

      // 8. Return code point code unit.
      return code_unit;
    };
  }

  /**
   * @constructor
   * @implements {Encoder}
   * @param {boolean} utf16_be True if big-endian, false if little-endian.
   * @param {{fatal: boolean}} options
   */
  function UTF16Encoder(utf16_be, options) {
    var fatal = options.fatal;
    /**
     * @param {Stream} stream Input stream.
     * @param {number} code_point Next code point read from the stream.
     * @return {(number|!Array.<number>)} Byte(s) to emit.
     */
    this.handler = function(stream, code_point) {
      // 1. If code point is end-of-stream, return finished.
      if (code_point === end_of_stream)
        return finished;

      // 2. If code point is in the range U+0000 to U+FFFF, return the
      // sequence resulting of converting code point to bytes using
      // utf-16be encoder flag.
      if (inRange(code_point, 0x0000, 0xFFFF))
        return convertCodeUnitToBytes(code_point, utf16_be);

      // 3. Let lead be ((code point âˆ’ 0x10000) >> 10) + 0xD800,
      // converted to bytes using utf-16be encoder flag.
      var lead = convertCodeUnitToBytes(
        ((code_point - 0x10000) >> 10) + 0xD800, utf16_be);

      // 4. Let trail be ((code point âˆ’ 0x10000) & 0x3FF) + 0xDC00,
      // converted to bytes using utf-16be encoder flag.
      var trail = convertCodeUnitToBytes(
        ((code_point - 0x10000) & 0x3FF) + 0xDC00, utf16_be);

      // 5. Return a byte sequence of lead followed by trail.
      return lead.concat(trail);
    };
  }

  // 14.3 utf-16be
  /** @param {{fatal: boolean}} options */
  encoders['utf-16be'] = function(options) {
    return new UTF16Encoder(true, options);
  };
  /** @param {{fatal: boolean}} options */
  decoders['utf-16be'] = function(options) {
    return new UTF16Decoder(true, options);
  };

  // 14.4 utf-16le
  /** @param {{fatal: boolean}} options */
  encoders['utf-16le'] = function(options) {
    return new UTF16Encoder(false, options);
  };
  /** @param {{fatal: boolean}} options */
  decoders['utf-16le'] = function(options) {
    return new UTF16Decoder(false, options);
  };

  // 14.5 x-user-defined

  /**
   * @constructor
   * @implements {Decoder}
   * @param {{fatal: boolean}} options
   */
  function XUserDefinedDecoder(options) {
    var fatal = options.fatal;
    /**
     * @param {Stream} stream The stream of bytes being decoded.
     * @param {number} bite The next byte read from the stream.
     * @return {?(number|!Array.<number>)} The next code point(s)
     *     decoded, or null if not enough data exists in the input
     *     stream to decode a complete code point.
     */
    this.handler = function(stream, bite) {
      // 1. If byte is end-of-stream, return finished.
      if (bite === end_of_stream)
        return finished;

      // 2. If byte is in the range 0x00 to 0x7F, return a code point
      // whose value is byte.
      if (inRange(bite, 0x00, 0x7F))
        return bite;

      // 3. Return a code point whose value is 0xF780 + byte âˆ’ 0x80.
      return 0xF780 + bite - 0x80;
    };
  }

  /**
   * @constructor
   * @implements {Encoder}
   * @param {{fatal: boolean}} options
   */
  function XUserDefinedEncoder(options) {
    var fatal = options.fatal;
    /**
     * @param {Stream} stream Input stream.
     * @param {number} code_point Next code point read from the stream.
     * @return {(number|!Array.<number>)} Byte(s) to emit.
     */
    this.handler = function(stream, code_point) {
      // 1.If code point is end-of-stream, return finished.
      if (code_point === end_of_stream)
        return finished;

      // 2. If code point is in the range U+0000 to U+007F, return a
      // byte whose value is code point.
      if (inRange(code_point, 0x0000, 0x007F))
        return code_point;

      // 3. If code point is in the range U+F780 to U+F7FF, return a
      // byte whose value is code point âˆ’ 0xF780 + 0x80.
      if (inRange(code_point, 0xF780, 0xF7FF))
        return code_point - 0xF780 + 0x80;

      // 4. Return error with code point.
      return encoderError(code_point);
    };
  }

  /** @param {{fatal: boolean}} options */
  encoders['x-user-defined'] = function(options) {
    return new XUserDefinedEncoder(options);
  };
  /** @param {{fatal: boolean}} options */
  decoders['x-user-defined'] = function(options) {
    return new XUserDefinedDecoder(options);
  };

  if (!('JSTextEncoder' in global))
    global['JSTextEncoder'] = TextEncoder;
  if (!('JSTextDecoder' in global))
    global['JSTextDecoder'] = TextDecoder;
}(this));

function str2asc2(strstr) {
	return ("0"+strstr.charCodeAt(0).toString(16)).slice(-2);
}

function str2asc(str) {
	var ua = JSTextEncoder("euc-kr", {'NONSTANDARD_allowLegacyEncoding' : true}).encode( str );
	var h = '';
    for (var i = 0; i < ua.length; i++) {
    	if( ua[i] > 15 ) {
    		h += ua[i].toString(16);
    	} else {
    		h += '0'+ua[i].toString(16);
    	}
    }
    return h;
}

function asc2str(ascasc){ 
	return String.fromCharCode(ascasc);
} 

function iniURLEncode(str) {
	var ret="";
	var strSpecial="!\"#$%&'()*+,/:;<=>?[]^`{|}~%";
	var tt= "";
	
	for(var i=0;i<str.length;i++) {
		var chr = str.charAt(i);
		var c = str2asc(chr);
		tt += chr+":"+c+"n";
		if(parseInt("0x"+c) > 0x7f) {
			ret+="%"+c.slice(0,2)+"%"+c.slice(-2);
		} else {
			if(chr==" ") { 
				ret += "+";
			} else if(strSpecial.indexOf(chr)!=-1) {
				ret += "%"+c.toString(16);
			} else {
				ret += chr;
			}
		}
	}
	ret = ret.replace(/\t/gi, "%09");
	ret = ret.replace(/\n/gi, "%0a");
	ret = ret.replace(/\\/gi, "%5c");
	return ret;
}

function iniURLDecode(str) {
	var ret = "";
	for(var i=0;i<str.length;i++) {
		var chr = str.charAt(i);
		if(chr == "+") {
			ret += " ";      
	    } else if(chr=="%") {
	    	var asc = str.substring(i+1,i+3);
	    	if(parseInt("0x"+asc)>0x7f) {
	    		ret += asc2str(parseInt("0x"+asc+str.substring(i+4,i+6)));
	    		i += 5;
	    	} else {
	    		ret += asc2str(parseInt("0x"+asc));
	    		i += 2;
	    	}
	    } else {
	    	ret += chr;      
	    }
	}
	return ret;
}

