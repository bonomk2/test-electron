/*

로딩시작시: loadingAnim.start();

로딩끝날시: loadingAnim.end();

 */
var loadingAnim = {

	seqCount: 0,
	seqTotal: 8,
	loadingInterval: null,

	start: function(){
		
		$(".modal_bg").show();
		$(".loading").show();

		var movX = $(".loading").width();

		loadingAnim.loadingInterval = setInterval( function(){

			loadingAnim.seqCount++;
			if( loadingAnim.seqCount >= loadingAnim.seqTotal ) loadingAnim.seqCount = 0;
			
			$(".loading").css('background-position-x', -movX * loadingAnim.seqCount);

		}, 100);
	},

	end: function(){

		clearInterval(loadingAnim.loadingInterval);
		$(".modal_bg").hide();
		$(".loading").hide();
	}
}
