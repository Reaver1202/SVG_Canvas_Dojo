
// Hello Dojo! --> http://dojotoolkit.org/documentation/tutorials/1.9/hello_dojo/
require(["dojo/dom", "dojo/fx", "dojo/domReady!"], function(dom, fx){
    // The piece we had before...
    var greeting = dom.byId("greeting");
    greeting.innerHTML += " from Dojo!";
 
    // ...but now, with an animation!
    fx.slideTo({
        top: 150,
        left: 200,
        node: greeting
    }).play();
});


// Using dojo/query --> http://dojotoolkit.org/documentation/tutorials/1.9/using_query/

// require the query and domReady modules
require(["dojo/query", "dojo/domReady!"], function(query) {
	
    // retrieve an array of nodes with the ID "list"
    	// fetches one node by ID that is not more powerful than using "dom.byId""
	    // #list --> # tells query to look for node with that ID
	    // --> convention from familiar CSS
    var list = query("#list")[0];

    
    // retrieve an array of nodes with the class name "odd"
    	// . tells query to look for nodes with that identifier in their className property
    	// --> like CSS
	var odds = query(".odd");
	
	// #################
		// is query executed without second parameter it will search throgh the whole DOM
		// --> use a second p. to restrict the query to that node and it´s children
	
	// retrieve an array of nodes with the class name "odd"
	// from the first list using a selector
	var odds1 = query("#list .odd");
	 
	// retrieve an array of nodes with the class name "odd"
	// from the first list using a DOM node
	var odds2 = query(".odd", document.getElementById("list"));
	
		// combine a tag name with a class name
		// only <a>´s with the className odd
	var oddA = query("a.odd");

});



// Wait for the DOM to be ready before working with it
			require(["dojo/query", "dojo/dom-class", "dojo/on", "dojo/NodeList-dom", "dojo/domReady!"], function(query, domClass, on) {
				
				function oddForEach(){
					query(".odd").forEach(function(node){
						// For each ndoe with a class of "odd",
						// remove the class "blue" and add the class "red"
						domClass.remove(node, "blue");
						domClass.add(node, "red");
					});
				}

				function oddAddBlue(){
					// For each node wiht a class of "odd",
					// remove the class "red" and add the class "blue"
					query(".odd").removeClass("red").addClass("blue");
				}

				function evenAddBlue(){
					// For each node with a class of "even",
					// add the class "blue"
					query(".even").addClass("blue");//style("background-color","blue");//
					
				}

				function evenStyle(){
					// For each node with a class of "even",
					// Set its color CSS style to "white" and add a class of "italic"
					query(".even").style("color", "white").addClass("italic");
				}
				
				// Connect the buttons
				on(document.getElementById("oddForEach"), "click", oddForEach);
				on(document.getElementById("evenAddBlue"), "click", evenAddBlue);
				on(document.getElementById("oddAddBlue"), "click", oddAddBlue);
				on(document.getElementById("evenStyle"), "click", evenStyle);
			
			});
			
// Using Introduction into AMD Modules --> http://dojotoolkit.org/documentation/tutorials/1.9/modules/

	require([
        "TutApps/2.1counter"
    ], function(counter){
        log(counter.getValue());
        counter.increment();
        log(counter.getValue());
        counter.decrement();
        log(counter.getValue());
        // Define the "log" function to display console-like messages directly on the page                
		function log(msg){
			document.getElementById("divAMDModules").innerHTML += "<div>" + msg + "</div>";
			
		}
    });
    /*
	require([
	    "TutApps/2.2DateManager"
	], function(DateManager){
	    var dm = new DateManager();
	    dm.showDate('divDateManager', new Date());
	});
	*/
	
	
	
	


