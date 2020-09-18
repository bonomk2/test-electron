//polyfill getAllKeys for ie 
var globalVar="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope?self:"undefined"!=typeof global?global:Function("return this;")();!function(e){"use strict";var t,o,n,i,r;if(n=e.IDBObjectStore||e.webkitIDBObjectStore||e.mozIDBObjectStore||e.msIDBObjectStore,o=e.IDBIndex||e.webkitIDBIndex||e.mozIDBIndex||e.msIDBIndex,void 0!==n&&void 0!==o){var l=!1;"undefined"!=typeof WorkerGlobalScope&&(navigator.userAgent.indexOf("Safari/602")>=0||navigator.userAgent.indexOf("Safari/603")>=0)&&(l=!0),(l||void 0===n.prototype.getAll||void 0===o.prototype.getAll||void 0===n.prototype.getAllKeys||void 0===o.prototype.getAllKeys)&&(i=function(){this.result=null,this.error=null,this.source=null,this.transaction=null,this.readyState="pending",this.onsuccess=null,this.onerror=null,this.toString=function(){return"[object IDBRequest]"}},t=function(e){this.type=e,this.target=null,this.currentTarget=null,this.NONE=0,this.CAPTURING_PHASE=1,this.AT_TARGET=2,this.BUBBLING_PHASE=3,this.eventPhase=this.NONE,this.stopPropagation=function(){console.log("stopPropagation not implemented in IndexedDB-getAll-shim")},this.stopImmediatePropagation=function(){console.log("stopImmediatePropagation not implemented in IndexedDB-getAll-shim")},this.bubbles=!1,this.cancelable=!1,this.preventDefault=function(){console.log("preventDefault not implemented in IndexedDB-getAll-shim")},this.defaultPrevented=!1,this.isTrusted=!1,this.timestamp=Date.now()},r=function(e,o){return function(n,r){var l,s,u;return n=void 0!==n?n:null,s=new i,u=[],(l=this.openCursor(n)).onsuccess=function(n){var i,l,a;(i=n.target.result)&&(a="value"===o?i.value:"index"===e?i.primaryKey:i.key,u.push(a),void 0===r||u.length<r)?i.continue():"function"==typeof s.onsuccess&&((l=new t("success")).target={readyState:"done",result:u},s.result=u,s.onsuccess(l))},l.onerror=function(e){console.log("IndexedDB-getAll-shim error when getting data:",e.target.error),"function"==typeof s.onerror&&s.onerror(e)},s}},(l||void 0===n.prototype.getAll)&&(n.prototype.getAll=r("objectStore","value")),(l||void 0===o.prototype.getAll)&&(o.prototype.getAll=r("index","value")),(l||void 0===n.prototype.getAllKeys)&&(n.prototype.getAllKeys=r("objectStore","key")),(l||void 0===o.prototype.getAllKeys)&&(o.prototype.getAllKeys=r("index","key")))}}(globalVar);

/** 
 * crosswrapper case1 : Safari. Safari can't sharing iframe cross-origin. isolated storage
 * crosswrapper case2 : iOS & Android Custom webApp
 */
(function() {
	var xwcStorageOptions = {
		PKI_SBASE : "XWC_NPKI",
		crossPopDomain : location.origin,
		crossPopPath : location.pathname.substring(0, location.pathname.lastIndexOf("/"))+"/wstorage_sf.html",
		target : "idb"
	};
	
	if (!window.indexedDB && xwcStorageOptions.target == "idb") {
		xwcStorageOptions.target = "local";
	}
		
	//-----polyfill list
	if (!String.prototype.startsWith) {
		String.prototype.startsWith = function(search, pos) {
			return this.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
		};
	}
		
	function storageImpl( options ) {
		var st_prefix = options.PKI_SBASE+"_";
		
		function _asyns_toArray(data) {
			return typeof(data) === "string" ? [data] : data;
		}
		
		function _asyns_toMap(key, value) {
			var map = {};
			if( typeof(key) === "string" ) {
				map[key] = value;
			} else map = key;
			return map;
		}
		
		//-----local localStorage
		var localDirectStorage = {
			keys : function( resolved, rejected ) {
				var keys = [];
				for(var key in localStorage) if( key.startsWith(st_prefix) ) keys.push(key.substr( st_prefix.length ));
				resolved( keys );
			},
			getData : function(keyA, resolved, rejected) {
				keys = _asyns_toArray(keyA);
				var rMap = {};
				for(var i=0;i<keys.length;i++) {
					var rk = st_prefix+keys[i];
					rMap[ keys[i] ] = localStorage.getItem( rk );
				}
				if( typeof(keyA) === "string" ) {
					if( rMap[keyA] ) {
						resolved( rMap[keyA] );
					} else {
						rejected( "cert_not_exist" );
					}
				} else {
					resolved( rMap );
				}
			},
			setData : function(keyOrMap, value, resolved, rejected) {
				var map = _asyns_toMap(keyOrMap, value);
				if( typeof( value ) === "function" ) {
					rejected = resolved;
					resolved = value;
				}
				for(key in map) {
					var rk = st_prefix+key;
					localStorage.removeItem( rk );
					localStorage.setItem( rk, map[key] );
					if( !localStorage.getItem( rk ) ||  String(localStorage.getItem( rk )).length != String( map[key] ).length ) {
						rejected( "storage is full" );
						return;
					}
				}
				if( map["lastModified"] ) {
					resolved( true );
				} else {
					this.setData( "lastModified", Date.now(), resolved, rejected);
				}
			},
			getLength : function(key, resolved, rejected) {
				var data = localStorage.getItem( st_prefix+key );
				data ? resolved( data.length ) : rejected( "no data" );
			},
			remove : function(keys, resolved, rejected) {
				keys = _asyns_toArray(keys);
				for(var i=0;i<keys.length;i++) {
					var k = st_prefix+keys[i];
					localStorage.removeItem( k );
				}
				this.setData("lastModified", Date.now(), resolved, rejected);
			},
		};
		
		//-----local indexedDBStorage
		var openIDB = function( resolved, rejected ) {
			var request = window.indexedDB.open( options.PKI_SBASE, 1 );
			request.onupgradeneeded = function(e) {
				var thisDB = e.target.result;
				if(!thisDB.objectStoreNames.contains("store")) {
					thisDB.createObjectStore("store");
				}
				console.log("xwc indexedDB upgrade...");
			};
			request.onsuccess = function(e) {
				resolved(e.target.result);
			};
			request.onerror = function(e) {
				rejected(e);
			};
		};

		var getStore = function(resolved, rejected) {
			openIDB( function(db) {
				resolved( db.transaction(['store'], 'readwrite').objectStore('store') );
			}, rejected );
		}
		var localIDBStorage = {
			keys : function( resolved, rejected ) {
				getStore( function( store ) {
					var request = store.getAllKeys();
					request.onsuccess = function(e) { resolved( e.target.result ); }
					request.onerror = rejected;
				}, rejected );
			},
			getData : function(keyA, resolved, rejected) {
				var keys = _asyns_toArray(keyA);
				var rMap = {};
				getStore( function recurr( store ) {
					if( keys.length <= 0 ) {
						if( typeof(keyA) === "string" ) {
							if( rMap[keyA] ) {
								resolved( rMap[keyA] );
							} else {
								rejected( "cert_not_exist" );
							}
						} else {
							resolved( rMap );
						}
						return;
					}
					var key = keys.shift();
					var request = store.get( key );
					request.onsuccess = function(e) {
						rMap[ key ] = e.target.result;
						recurr(store);
					}
					request.onerror = function() {rejected("cert_not_exist");};
				}, rejected );
			},
			setData : function(keyOrMap, value, resolved, rejected) {
				var map = _asyns_toMap(keyOrMap, value);
				if( typeof( value ) === "function" ) {
					rejected = resolved;
					resolved = value;
				}
				var keys = [];
				for(k in map) keys.push(k);
				var thisStore = this;
				getStore( function recurr( store ) {
					if( keys.length <= 0 ) {
						if( map["lastModified"] ) {
							resolved();
						} else thisStore.setData("lastModified", Date.now(), resolved, rejected);
						return;
					}
					var key = keys.shift();
					var request = store.put( map[key], key );
					request.onsuccess = function(e) { recurr(store); }
					request.onerror = rejected;
				}, rejected );
			},
			getLength : function(key, resolved, rejected) {
				getData( [key], function(data) {
					data[key] ? resolved(data[key].length) : rejected("no data");
				}, rejected);
			},
			remove : function(keys, resolved, rejected) {
				keys = _asyns_toArray(keys);
				var thisStore = this;
				getStore( function recurr(store) {
					if( keys.length <= 0 ) {
						thisStore.setData("lastModified", Date.now(), resolved, rejected);
						return;
					}
					var request = store.delete(keys.shift());
					request.onsuccess = function(e) { recurr(store); };
					request.onerror = function(e) { recurr(store); };
				}, rejected);
			},
		};
		
		localDirectStorage.reset = localIDBStorage.reset = function(resolved, rejected) {
			var thisStore = this;
			thisStore.keys(function (keys) {
				thisStore.remove(keys, resolved, rejected);
			}, rejected);
		}
		
		function importStorage( fromStorage, resolved, rejected ) {
			var thisStore = this;
			thisStore.getMap( function(thisMap) {
				fromStorage.getMap( function(fromMap) {
					//console.log(thisMap["lastModified"], fromMap["lastModified"]);
					var thisLast = (thisMap["lastModified"] || 0);
					var fromLast = (fromMap["lastModified"] || 0);
					if( thisLast < fromLast ) {
						//remove
						console.log("asyncStorage import start");
						thisStore.reset( function() {
							thisStore.setData( fromMap, resolved, rejected );
						}, rejected);
					} else {
						resolved(false);
					}
				}, rejected);
			}, rejected);
		}
		localDirectStorage.importStorage = importStorage.bind(localDirectStorage, localIDBStorage);
		localIDBStorage.importStorage = importStorage.bind(localIDBStorage, localDirectStorage);
		localDirectStorage.getMap = localIDBStorage.getMap = function(resolved, rejected) {
			var rMap = {};
			var thisStore = this;
			thisStore.keys( function(keys) {
				thisStore.getData(keys, resolved, rejected);
			}, rejected);
		}
		
		var rv = {
			local : localDirectStorage,
			idb : localIDBStorage,
		};
		rv.target = rv[ options.target ];
		
		return rv;
	}
	
	
	var IS_CORSS_INSTALLED = false;
    var IS_CORSS_ENV = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
						navigator.userAgent && navigator.userAgent.indexOf('CriOS') == -1 && navigator.userAgent.indexOf('FxiOS') == -1;
	if( (IS_CORSS_ENV && window.KSBizConfig && window.KSBizConfig['yessignOpenCertUse']) )//금결원 공동저장소 사용시 사용안함
	{
		IS_CORSS_ENV = false;
	}
	
	//AsyncStorage : keys, getData, setData, getLength, remove
	//example : keys(), getData($key or [$key1, $key2,...] ), setData($key, $value or {$key1:$value, $key2:$value,...} ),  getLength($key), remove($key or [$key1, $key2,...])
	
	//-----Start crossInvokeStorage
	function createCrossInvokeFunc(funcName, reducer) {
		return function() {
			var args = Array.prototype.slice.call(arguments);
			var rejected = args.pop();
			var resolved = args.pop();
			var cInvoke = function() {				
				window.ksbiz_asyncStorage_callback = function(result) {
					if( result.error ) {
						rejected( result.error );
					} else {
						resolved.apply( null, result.data );
					}
				};
				doResponse({ ////reuse of wpki.html
					XWCMessage : true
					,method : funcName
					,args : args
				});
			}
			if( IS_CORSS_INSTALLED ) {
				cInvoke();
			} else {
				window.ksbiz_asyncStorage_callback = function(result) {
					if( result.error ) {
						rejected( result.error );
					} else {
						IS_CORSS_INSTALLED = true;
						cInvoke();
					}
				};
				doResponse({ ////wpki.html
					XWCMessage : true
					,method : "lstorage_install"
					,args : [ xwcStorageOptions, storageImpl.toString() ]
				});
			}
		};
	}
	var remoteInvokerStorage = {
		keys : createCrossInvokeFunc("lstorage_keys"),
		getData : createCrossInvokeFunc("lstorage_getData"),
		getMap : createCrossInvokeFunc("lstorage_getMap"),
		setData : createCrossInvokeFunc("lstorage_setData"),
		getLength : createCrossInvokeFunc("lstorage_getLength"),
		remove : createCrossInvokeFunc("lstorage_remove"),
	};
	
	//from core
	window.getAsyncXWCStorage = function( options ) {
		//TODO : mix options xwcStorageOptions
		if( !options ) options = xwcStorageOptions;
		var sImpl = storageImpl( options );
		//console.log("Check RemoteCrossStorage available : "+(window._lastXWC_CM_Origin != location.origin)+" ("+window._lastXWC_CM_Origin+" == "+location.origin+")");
		//WARN : CrossMessage 가능한 상태이므로 여기서 체크해야 함. 
		if( IS_CORSS_ENV && window._lastXWC_CM_Origin != location.origin ) {
			//alert("1");
			return remoteInvokerStorage;
		} else {
			//alert("2 : "+IS_CORSS_ENV+", "+window._lastXWC_CM_Origin+", "+location.origin);
			return sImpl [ options.target ];
		}
	}
	
	window.getAsyncXWCStorageImpl = function(options) {
		return  storageImpl( options || xwcStorageOptions );
	}
}) ();