apex.message.confirm("çHéñämíËèàóùÇçsÇ¢Ç‹Ç∑Ç©ÅH", function( okPressed ) {
    apex.jQuery("#t_Alert_Notification").remove();
    if( okPressed ) {
       
               //var id = apex.item("P4_BYH_ODRNO").getValue();
//var   strUrl='http://129.150.177.100/SB_PO_PurchaseOrder/PurchaseOrderRS?id=' + id;
//alert(strUrl);
//apex.item("P28_URL").setValue(strUrl);
//window.open().location.href=strUrl.close();
       
        var id = apex.item("P4_BYH_ODRNO").getValue();
        //alert(id);

        //var strUrl='http://129.150.177.100/SB_PO_PurchaseOrder/PurchaseOrderRS?id=' + id;
        var strUrl='http://localhost:7101/SB_PO_PurchaseOrder/PurchaseOrderRS?id=XB3648284850'
        var outMsg = '';
        fetch(strUrl,{ 
				method: 'GET',
				mode: 'cors',
				headers: new Headers({'Accept': 'application/xml'}) 
		})
		.then(function(response) {
		    return response.text()
		}).then(function(xmlData) {
            let parser = new DOMParser();
            let xmlDoc = parser.parseFromString(xmlData, "text/xml");
            let status = xmlDoc.querySelector("Success").textContent;
            let msg = xmlDoc.querySelector("Message").textContent;

            if(status==='true'){
                outMsg += msg + "\n" ;
				var odrNumber = '';
				var els = xmlDoc.querySelectorAll('OrderNumber');
				for (var i=0, l=els.length; i<l; i++) {
                   var el = els[i].textContent;
                   odrNumber += el + "\n" ;
                   //console.log(odrNumber);
                };
                outMsg += odrNumber;
			    //console.log(outMsg);
                apex.message.alert(outMsg);
			}else{
			    let errCode = xmlDoc.querySelector("errorCode").textContent;
				outMsg += ":" + errCode;
				//console.log(outMsg);
                apex.message.alert(outMsg);
			};
           
        }).catch(function(e) {
	        //console.log("PurchaseOrderRS Is Error");
		    apex.message.alert("PurchaseOrderRS Is Error");
        });








    } else{

    }
});

