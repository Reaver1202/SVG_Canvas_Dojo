define([
    "dojo/dom",
    "app/dateFormatter"
], function(dom, dateFormatter){
    return declare(null, {
        showDate: function(id, date){
            dom.byId(id).innerHTML = dateFormatter.format(date);
        }
    });
});