(function(global, oDOC, handler){
	loki ={
		resorceLocation:{
			production:{
				jquery:"jquery-1.4.4.min",
				underscore:"underscore-min",
				lokiAjax:"lokiAjax"
			},
			live:{
				jquery:"http://code.jquery.com/jquery-1.4.4.min",
				underscore:"http://documentcloud.github.com/underscore/underscore-min",
				lokiAjax:"lokiAjax"
			}
		},
		data :{},
		srcs :{},
		loader : function(data){
			this.data = data;
			if(data.status == 'live'){
				this.srcs.jquery = this.resorceLocation.live.jquery+'.js';
				this.srcs.underscore = this.resorceLocation.live.underscore+'.js';
				this.srcs.lokiAjax = this.resorceLocation.live.lokiAjax+'.js';
			}else{
				this.srcs.jquery = this.resorceLocation.production.jquery+'.js?cache='+Math.random();
				this.srcs.underscore = this.resorceLocation.production.underscore+'.js?cache='+Math.random();
				this.srcs.lokiAjax = this.resorceLocation.live.lokiAjax+'.js?cache='+Math.random();
			}
			
			loadLABjs();
		}
	}
	
	function LABjsLoaded() {
        // do cool stuff with $LAB here
		console.log(loki.resorceLocation);
		console.log(loki.data);
		console.log(loki.srcs);

		$LAB
			.script(loki.srcs.jquery)
			.script(loki.srcs.underscore)
			.wait()
			.script(loki.srcs.lokiAjax)
			.wait(function(){
				$.loki.init(loki.data);
			});
    }
	
	//borrowed from https://gist.github.com/603980
	var head = oDOC.head || oDOC.getElementsByTagName("head");
	
	
	function loadLABjs() {
        if ("item" in head) { // check if ref is still a live node list
            if (!head[0]) { // append_to node not yet ready
                setTimeout(arguments.callee, 25);
                return;
            }
            head = head[0]; // reassign from live node list ref to pure node ref -- avoids nasty IE bug where changes to DOM invalidate live node lists
        }
        var scriptElem = oDOC.createElement("script"),
            scriptdone = false;
        scriptElem.onload = scriptElem.onreadystatechange = function () {
            if ((scriptElem.readyState && scriptElem.readyState !== "complete" && scriptElem.readyState !== "loaded") || scriptdone) {
                return false;
            }
            scriptElem.onload = scriptElem.onreadystatechange = null;
            scriptdone = true;
            LABjsLoaded();
        };
        scriptElem.src = "LAB.min.js";
        head.insertBefore(scriptElem, head.firstChild);
    };

    // required: shim for FF <= 3.5 not having document.readyState
    if (oDOC.readyState == null && oDOC.addEventListener) {
        oDOC.readyState = "loading";
        oDOC.addEventListener("DOMContentLoaded", handler = function () {
            oDOC.removeEventListener("DOMContentLoaded", handler, false);
            oDOC.readyState = "complete";
        }, false);
    }
	
})(window,document);
