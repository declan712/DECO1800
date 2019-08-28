jQuery.expr[':'].contains = function(a, i, m) {
	return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
};
function getYear(year) {
	if(year) {
		return year.match(/[\d]{4}/);
	}
}
function iterateResults(data,imageData) {

	console.log(data);

	var recordTemplate = $(".record-template");

	$.each(data.result.records, function(recordID, recordValue) {

        var imageURL="images/placeholder.jpg";
        console.log("what gets sent through: "+imageData);
        if (imageData!=undefined) {
            imageURL = imageData;
        }

		var recordName = recordValue["Name"];
		var recordYear = getYear(recordValue["Date"]);
		var recordBranch = recordValue["Branch"];
		var recordPosition = recordValue["Position"];
		var recordPay = recordValue["Remuneration"];
        var recordRemarks = recordValue["Remarks"];

		if(recordName && recordBranch && recordPosition && recordPay && recordRemarks && recordYear) {
			var clonedRecordTemplate = recordTemplate.clone();
			clonedRecordTemplate.attr("id", "record-" + recordID).removeClass("record-template");
			clonedRecordTemplate.appendTo("#records");

			$("#record-" + recordID + " h2").html(recordName);
            $("#record-" + recordID + " .year").html(recordYear);
            $("#record-" + recordID + " .branch").html(recordBranch);
            $("#record-" + recordID + " .position").html(recordPosition);
            $("#record-" + recordID + " .pay").html(recordPay);
            $("#record-" + recordID + " .remarks").html(recordRemarks);
			$("#record-" + recordID + " img").attr("src", imageURL);

		}

    });
	setTimeout(function() {
		$("#loading").addClass("loaded");
	}, 500); // 0.5 second delay

}

$(document).ready(function() {
    showProfessions();

    $("#search-button").click(function(event) {
        event.preventDefault();
        // alert(document.forms["search"]["searchbar"].value);
        // searchData(document.forms["search"]["searchbar"].value);
        queryData(document.forms["search"]["searchbar"].value);
    });

    $("#filter").keypress(function(e) {
        if (e.which == 13) {
            event.preventDefault();
        }
    })
    $("#searchbar").keypress(function(e) {
        if (e.which == 13) {
            event.preventDefault();
            queryData(document.forms["search"]["searchbar"].value);
        }
    })

});

function searchData(query) {   
    $("#records").html("");
    $("#loading").removeClass("loaded");
    var data = {
        resource_id: 'cdafbbbf-c9ca-46a1-9f18-ecd9e8943040', // the resource id
        limit: 100, // get 5 results
        q: query // query for 'X'
      };
      $.ajax({
        url: 'https://data.qld.gov.au/api/3/action/datastore_search',
        data: data,
        //dataType: 'jsonp',
        cache: true,
        success: function(data) {
        //   alert('Total results found: ' + data.result.total)
        //   jsonAsString = JSON.stringify(data, null, 2);
        //   $("#results").html(jsonAsString);
            iterateResults(data);
        }
      });
};

function queryData(query) {
    $("#records").html("");
    $("#loading").removeClass("loaded");
    
    var resource_id = 'cdafbbbf-c9ca-46a1-9f18-ecd9e8943040'
    var data = {
        resource_id: 'cdafbbbf-c9ca-46a1-9f18-ecd9e8943040', // the resource id
        limit: 100, // get 5 results
        q: query // query for 'X'
      };
      $.ajax({
        url: 'https://data.qld.gov.au/api/3/action/datastore_search_sql?sql=SELECT * FROM \"'+resource_id+'\" WHERE \"Position\" LIKE \'%'+query+'%\' LIMIT 1',
        // data: data,
        //dataType: 'jsonp',
        cache: true,
        success: function(data) {
            imageQuery(query,data);
            //iterateResults(data,imageData);
        }
      });
};

function imageQuery(query,data) {
    $.ajax({
        url: "https://pixabay.com/api/?key=7227013-50ebabaacc01b845a5e54e34b&q="+query+"&image_type=photo&safesearch=true",
        dataType: "jsonp",
        cache: true,
        success: function(results) {
            if(results.hits[0] != undefined) {
                var imageData = results.hits[0].largeImageURL;
            }
            //do a thing here
            iterateResults(data,imageData);
        }
    });
};

function showProfessions() {
    var resource_id = 'cdafbbbf-c9ca-46a1-9f18-ecd9e8943040'
    var data = {
        resource_id: 'cdafbbbf-c9ca-46a1-9f18-ecd9e8943040', // the resource id
        limit: 100, // get 5 results
      };
      $.ajax({
        url: 'https://data.qld.gov.au/api/3/action/datastore_search_sql?sql=SELECT DISTINCT \"Position\" FROM \"'+resource_id+'\" ',
        data: data,
        //dataType: 'jsonp',
        cache: true,
        success: function(data) {
            iterateJobs(data);
        }
      });
};

function iterateJobs(data) {

	console.log(data);

	var recordTemplate = $(".listItem-temp");

	$.each(data.result.records, function(recordID, recordValue) {

		var recordPosition = recordValue["Position"];

		if(recordPosition) {
			var clonedRecordTemplate = recordTemplate.clone();
			clonedRecordTemplate.attr("id", "listitem-" + recordID).removeClass("listItem-temp");
			clonedRecordTemplate.appendTo("#joblist");

            $("#listitem-" + recordID + " .position").html(recordPosition);
		}
    });
}