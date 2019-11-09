(function() {
	    function scrollHorizontally(e) {
	        e = window.event || e;
	        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
	        document.getElementById('grid-H').scrollLeft -= (delta*100); // Multiplied by 40
	        e.preventDefault();
	    }
	    if (document.getElementById('grid-H').addEventListener) {
	        // IE9, Chrome, Safari, Opera
	        document.getElementById('grid-H').addEventListener("mousewheel", scrollHorizontally, false);
	        // Firefox
	        document.getElementById('grid-H').addEventListener("DOMMouseScroll", scrollHorizontally, false);
	    } else {
	        // IE 6/7/8
	        document.getElementById('grid-H').attachEvent("onmousewheel", scrollHorizontally);
	    }
	})();