var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };

function escapeHtml(string) {
  return String(string).replace(/[&<>"'\/]/g, function (s) {
    return entityMap[s];
  });
}

var basemap = new L.TileLayer(baseUrl, {maxZoom: 21, attribution: baseAttribution, subdomains: subdomains, opacity: opacity});

var center = new L.LatLng(0, 0);

var map = new L.Map('map', {center: center, zoom: 2, maxZoom: maxZoom, layers: [basemap]});

var popupOpts = {
    autoPanPadding: new L.Point(5, 50),
    autoPan: true
};
var testFlag = false;
var points = L.geoCsv (null, {
    firstLineTitles: true,
    fieldSeparator: fieldSeparator,
    onEachFeature: function (feature, layer) {
        var popup = '<div class="popup-content"><table class="table table-striped table-bordered table-condensed">';
        for (var clave in feature.properties) {
        	var index = points._propertiesNames.indexOf(clave);
       		var checkbox = $('#prop-'+index+'-visible');
            if (!checkbox.length || checkbox.is(':checked')) {
                var title = points.getPropertyTitle(clave).strip();
                var attr = feature.properties[clave];
                if (title == labelColumn) {
                    layer.bindLabel(feature.properties[clave], {className: 'map-label'});
                }
                if (attr.indexOf('http') === 0) {
                    attr = '<a target="_blank" href="' + attr + '">'+ attr + '</a>';
                }
                if (attr) {
                    popup += '<tr><th>'+title+'</th><td>'+ attr +'</td></tr>';
                }
            }
        }
        popup += "</table></popup-content>";
        layer.bindPopup(popup, popupOpts);
    },
    filter: function(feature, layer) {
        total += 1;
        var hit = true;
        $.each(feature.properties, function(k, v) {
            if(points._propertiesNames){
                var index = points._propertiesNames.indexOf(k);
                var input = $('#prop-'+index+'-filter');
                if(input.length){
                    var filterString = input.val().toLowerCase().strip();
                    if(!filterString){
                        return true;
                    }
                    
                    var value = v.toLowerCase();
                    
                	var filters = filterString.split('||');
                	var found = false;
                	for (var index in filters){
                		filters[index] = filters[index].strip();
                		if (value.indexOf(filters[index]) !== -1) {
                			found = true;
                			break;
	                    }
                	}	
                	if(!found){
	                	hit = false;
	                    return false;
                	}
                }
            }
        });

        if(hit){
            hits += 1;
        }
        return hit;
    }
});

var hits = 0;
var total = 0;
var filterString;
var markers = new L.MarkerClusterGroup();
var dataCsv;
var settings;

var addCsvMarkers = function() {
    hits = 0;
    total = 0;

    map.removeLayer(markers);
    points.clearLayers();
	markers = new L.MarkerClusterGroup(clusterOptions);
    points.addData(dataCsv);
    markers.addLayer(points);

    map.addLayer(markers);
    try {
        var bounds = markers.getBounds();
        if (bounds) {
            map.fitBounds(bounds);
        }
    } catch(err) {
        // pass
    }
    if (total > 0) {
        $('#search-results').html("Showing " + hits + " of " + total);
    }

	prepareEditing();
	
    return false;
};

var typeAheadSource = {};

function ArrayToSet(a) {
    var temp = {};
    for (var i = 0; i < a.length; i++)
        temp[a[i]] = true;
    var r = [];
    for (var k in temp)
        r.push(k);
    return r;
}

function populateTypeAhead(csv, delimiter) {
    var lines = csv.split("\n");
    for (var i = lines.length - 1; i >= 1; i--) {
        var items = lines[i].split(delimiter);
        for (var j = items.length - 1; j >= 0; j--) {
            if(!typeAheadSource[j]){
                typeAheadSource[j] = [];
            }
            var item = items[j].strip();
            item = item.replace(/"/g,'');
            if (item.indexOf("http") !== 0 && isNaN(parseFloat(item))) {
                typeAheadSource[j].push(item);
                var words = item.split(/\W+/);
                for (var k = words.length - 1; k >= 0; k--) {
                    typeAheadSource[j].push(words[k]);
                }
            }
        }
    }
}


var familyPropertyIndex = -1;
var languagePropertyIndex = -1;

function addSettings() {
    for(var propertyIndex in points._propertiesNames){
        var property = points._propertiesNames[propertyIndex];
        if (property != 'lat' && property != 'lng'){
            var tr = $('<tr></tr>');
            tr.append('<td>'+property+'</td>');
            var filterInput = $('<input id="prop-'+propertyIndex+'-filter" type="text" autocomplete="off"/>');
            filterInput.typeahead({source: ArrayToSet(typeAheadSource[propertyIndex])});
            tr.append($('<td></td>').append(filterInput));
            tr.append('<td><input checked id="prop-'+propertyIndex+'-visible" type="checkbox"/></td>');

            $('#settings tbody').append(tr);
        }
		if (property == 'family'){
			familyPropertyIndex = propertyIndex;
		}
		if (property == 'language'){
			languagePropertyIndex = propertyIndex;
		}
    }
}

var selectedNodes = {};
function applyTreeFilters(){
	var languageString = '';
	var familyString = '';
	for(var index in selectedNodes){
		var data = selectedNodes[index];
		if(data.parentId!=undefined){
			if(languageString.length!=0){
				languageString+=" || "+data.text;
			}
			else{
				languageString = data.text;
			}
		}
		else{
			if(familyString.length!=0){
				familyString+=" || "+data.text;
			}
			else{
				familyString = data.text;
			}
		}
	}
	$('#prop-'+languagePropertyIndex+'-filter').val(languageString);
	$('#prop-'+familyPropertyIndex+'-filter').val(familyString);
	$('.bb').trigger('click');
}
function prepareTree() {
	var treeUnpreparedData = {}
	var treeData = [];
    for(var itemIndex in points._layers){
		var familyName = points._layers[itemIndex].feature.properties.family;
		var languageName = points._layers[itemIndex].feature.properties.language;	
		if (!treeUnpreparedData[familyName]){
			treeUnpreparedData[familyName] = [];
			
		}
		if($.inArray(languageName, treeUnpreparedData[familyName])==-1){
			treeUnpreparedData[familyName].push(languageName);
		}
    }
	for(var familyName in treeUnpreparedData){
		var family = {
			text: familyName,
			nodes: [],
		}
		for(languageIndex in treeUnpreparedData[familyName]){
			family.nodes.push({
				text: treeUnpreparedData[familyName][languageIndex]
			});
		}
		treeData.push(family);
	}	
	$('#tree').treeview({
		data: treeData,
		multiSelect: true,
		onNodeSelected: function(event, data) {
			selectedNodes[data.nodeId]=data;
			console.log(selectedNodes);
			if(data.parentId!=undefined){
				$('#prop-'+languagePropertyIndex+'-filter').val(data.text);
				$('#prop-'+familyPropertyIndex+'-filter').val("");
			}
			else{
				$('#prop-'+familyPropertyIndex+'-filter').val(data.text);
				$('#prop-'+languagePropertyIndex+'-filter').val("");
			}
			applyTreeFilters();		
		},
		onNodeUnselected: function(event, data) {
			delete selectedNodes[data.nodeId];
			applyTreeFilters();		
		}
	});
}

function createEditingPopup(layer) {
	var feature = layer.feature;
	var popup = '<div class="popup-content"><table class="table table-striped table-bordered table-condensed">';
	for (var clave in feature.properties) {
        var index = points._propertiesNames.indexOf(clave);
        var checkbox = $('#prop-'+index+'-visible');
	    if (!checkbox.length || checkbox.is(':checked')) {
	    	var title = points.getPropertyTitle(clave).strip();
	        var attr = feature.properties[clave];
	        if (title == labelColumn) {
	        	layer.bindLabel(feature.properties[clave], {className: 'map-label'});
	        }
	        if (attr.indexOf('http') === 0) {
	        	attr = '<a target="_blank" href="' + attr + '">'+ attr + '</a>';
	        }
	        if (attr!=undefined) {
	            popup += '<tr><th>'+title+'</th><td><textarea style="width:150px" class="editable-feature" onkeyup="editMemory(this); return true;" data-clave="'+clave+'" data-id="'+layer._leaflet_id+'" type="text">'+ attr +'</textarea></td></tr>';
	        }
		}
	}
	popup += "</table></popup-content>";
	layer.bindPopup(popup, popupOpts);
		
}

function editMemory(input){
	input = $(input);
	var id = input.attr('data-id');
	var clave = input.attr('data-clave');
	var value = input.val();
	points._layers[id].feature.properties[clave]=value;
	createEditingPopup(points._layers[id]);
}

function prepareEditing(){
	points.eachLayer(createEditingPopup);
}


function exportCSV() {
	
	var csvContent = "data:text/csv;charset=utf-8,";
	var i=0;
    for(var propertyIndex in points._propertiesNames){
		i++;
        var property = points._propertiesNames[propertyIndex];
	    var title = encodeURIComponent(points.getPropertyTitle(property).strip());
		csvContent += i < points._propertiesNames.length ? title+ ";" : title;
	}
	csvContent+="\r\n";
	
    for(var itemIndex in points._layers){
		i=0;
	    for(var propertyIndex in points._propertiesNames){
			i++;
        	var property = points._propertiesNames[propertyIndex];
			var title = points.getPropertyTitle(property);
			var feature;
			var latlng = points._layers[itemIndex].getLatLng();
			if(title == 'lat') {
				feature = latlng.lat;
			}
			else if(title == 'lng') {
				feature = latlng.lng;
			}
			else {
		        feature = points._layers[itemIndex].feature.properties[points._propertiesNames[propertyIndex]];
			}
			csvContent += i < points._propertiesNames.length ? feature+ ";" : feature;
		}
		csvContent+="\r\n";
    }
	
	var encodedUri = encodeURI(csvContent);
	window.open(encodedUri);
}

if(typeof(String.prototype.strip) === "undefined") {
    String.prototype.strip = function() {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
}

map.addLayer(markers);

$(document).ready( function() {
    $.ajax ({
        type:'GET',
        dataType:'text',
        url: dataUrl,
        contentType: "text/csv; charset=utf-8",
        error: function() {
            alert('Error retrieving csv ');
        },
        success: function(csv) {
            dataCsv = csv;
            populateTypeAhead(csv, fieldSeparator);
            addCsvMarkers();
            addSettings();
			prepareTree();
        }
    });

    $("#clear").click(function(evt){
        evt.preventDefault();
        $("#filter-string").val("").focus();
        addCsvMarkers();
    });

});
