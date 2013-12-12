function configBNG (subscriber, amountMSAN, settingMSANs, amountBNG, settingBNGs, LSR){
	var subscriber;
	var amountMSAN;
	var settingMSANs;
	var amountBNG;
	var settingBNGs;
	var LSR;
	this.subscriber = subscriber;
	this.amountMSAN = amountMSAN;
	this.settingMSANs = settingMSANs.slice();
	this.amountBNG = amountBNG;
	this.settingBNGs = settingBNGs.slice();
	this.LSR = LSR;
}

function createBNGDiagram (){
	require(["dojo/dom","dojo/domReady!"], function(dom){
		var canvasObj = dom.byId("canvasBNG");
		var canvasContext = canvasObj.getContext("2d");
		
		canvasObj.width =  window.innerWidth -200 ; 
		canvasObj.height = canvasObj.width * 4/3;
		
		var cardLayers = [0,3,3];

		createSlotCardPort(canvasContext,1,50,50,1,cardLayers);
		
		
	});		
}

function createTestObj(){
	
}


function createSlotCardPort(canvasContext,layer,cx_slot, cy_slot, elType, cardLayers){
	canCtx1 = canvasContext;
	canvasContext.strokeRect(cx_slot,cy_slot,80,20);
	canvasContext = canCtx1;
	
}


require(["dojo/dom","dojo/on",'dojo/_base/json',"dojo/domReady!"], function(dom,on){
	var configCableRun = new Object();
	var butSubmit = dom.byId("butSubmit");
	on(butSubmit,"click",function(evt){
		configCableRun.subscriber=dom.byId("inputSubscriber").value;
		configCableRun.amountMSAN = dom.byId("inputAmountMSAN").value;
		
		var i = 1;
		configCableRun.settingMSAN = new Array();
			while (dom.byId("cardMSAN"+i)!= null){
				configCableRun.settingMSAN[i-1]=dom.byId("cardMSAN"+i).value;
				i++;
			}
		configCableRun.amountBNg = dom.byId("inputAmountBNG").value;
		
		i = 1;
		configCableRun.settingBNG = new Array();
			while (dom.byId("cardBNG"+i)!= null){
				configCableRun.settingBNG[i-1]=dom.byId("cardBNG"+i).value;
				i++;
			}
		configCableRun.LSR = dom.byId("inputLSR").value;
		
		var data = dojo.toJson(configCableRun);
		dom.byId("divTests").innerHTML += "<br> "+data;
	});
	
});


	// DOM Manipulations
require(["dojo/dom","dojo/on","dojo/dom-construct","dojo/query","dojo/domReady!"], function(dom,on, domConstruct){
	var amountMSAN = 0;
	var amountBNG = 0;
	var extTable = {
		insertTR: function(evt){
				// this is not the parent node "formBNGInput"
				// this is a selected element with class "extendTable"				
			var amount = this.value;		// entered value
			var currentElement = this.id;	// the id of the inputfield
			
				// depending of the inputfield for MSAN or BNG different configurationes are set
			if (currentElement.indexOf("MSAN") >=0){				
				var	preElement = dom.byId("trMSAN");
				var cardType = "MSAN";
					// deletion of <tr><td> construct if previously created
				if (amountMSAN > 0){
					deleteTR(cardType, amountMSAN);
				}
				amountMSAN = this.value;
			}else if (currentElement.indexOf("BNG") >=0){				
				var	preElement = dom.byId("trBNG");
				var cardType = "BNG";
					// deletion of <tr><td> construct if previously created
				if (amountBNG > 0){
					deleteTR(cardType,  amountBNG);
				}
				amountBNG = this.value;
			}
			
				// insertion of new <tr><td> constructs into DOM
			createTR(cardType, preElement, amount);			
		}
		
	};
	function createTR(cardType, preElement, amount){
		for (var i=amount; i >= 1; i--){
			
				// create(element, {properties}, parent Element, target position)
			tr = domConstruct.create("tr",{id: "tr"+cardType+""+i,class: "TestInputSubEl"},preElement,"after");
				// create (element, {properties}, parent Element)
			domConstruct.create(
				"td",
				{id: "td1"+cardType+""+i, class: "TISE_name",innerHTML: "&nbsp;&nbsp;&nbsp;Card layer of "+cardType+" "+i},
				tr);
			domConstruct.create(
				"td",
				{id: "td2"+cardType+""+i, class: "TISE_input",innerHTML: "<input type='text' id='card"+cardType+""+i+"' value='0'>"},
				tr);
		}
	}
	function deleteTR(cardType, amount){
		for (var i=amount; i >=1; i--){
				// destroy("someID")
				// id = trMSAN1 | trBNG2 usw.
			domConstruct.destroy("tr"+cardType+""+i);
			domConstruct.destroy("td1"+cardType+""+i);
			domConstruct.destroy("td2"+cardType+""+i);
		}
	}
	/* Event Delegation
	 * using the dojo/on module, using the syntax on(parent element, "selector:event name", handler).
	 * dojo/query is required for selection
	 * takes a DOM Element at higher level --> formBNGInput
	 * via selector .extendTable the classes named "extendTable" under formBNGInput are selected
	 * for these on the change event something should happen
	 * the function extendTable.onChange should be executed
	 */

	// connect buttons
		
		// --> Event Delegation:
		// on(parent element, "selector:event name", handler)
		// 
	on(dom.byId("formBNGInput"),".extendTable:change", extTable.insertTR);
		// generally:
		// on(element, "event name", handler)
});	

// save object to JSON string
require(["dojo/dom",'dojo/_base/json',"dojo/domReady!"], function(dom,json){
	// require on dojo/_base/json will return the actual object of dojo
	
	// a simple object
	var settingsMSANs= [3,1];
	var settingsBNGs= [1,1];
	var obj = new configBNG(1,2,settingsMSANs,2,settingsBNGs,1);
	
	// convert it to a string:
	var data = dojo.toJson(obj);
	dom.byId("divTests").innerHTML += "<br> "+data;
});