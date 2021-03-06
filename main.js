(function() {
  var geocoder;
  var map;
  var layerl0;
  var marker;


  function initialize() {

    geocoder = new google.maps.Geocoder();

    map = new google.maps.Map(document.getElementById('map-canvas'), {
      center: new google.maps.LatLng(37.808441719910775, -122.20826827734379),
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    layerl0 = new google.maps.FusionTablesLayer({
      query: {
        select: "col3",
        from: "14ZHXZcZ3Fy4Qk0k3_cNV16N_Xl-n5GHy2kd8XEM"
      },
      styles: [{
        where: "'Type' IN ('Early Head Start')",
        markerOptions: {
          iconName: 'purple_blank'
        }
      }, {
        where: "'Type' IN ('Head Start')",
        markerOptions: {
          iconName: 'blu_blank'
        }
      }, {
        where: "'Type' IN ('Head Start Family Child Care')",
        markerOptions: {
          iconName: 'grn_blank'
        }
      }, {
        where: "'Type' IN ('OUSD')",
        markerOptions: {
          iconName: 'ylw_blank'
        }
      }],
      map: map,
      styleId: 2,
      templateId: 2
    });

    var button = document.getElementById('search_button');
    button.onclick = function() {
      var search = document.getElementById('search_input').value;
      codeAddress(search);
      return false;
    };

    $('#toggles').find('input[type="checkbox"]').on('change', function(e) {
      changeQuery();
    });

    $('#search_input').keypress(function (e) {
      if (e.which == 13) {
        $('#search_button').click();
      }
    });
        
  }

  function changeQuery() {
    var str = "'Ages Served' IN (";
    var queries = [];
    var toggles = $('#toggles').find('input[type="checkbox"]').each(function(el) {
      if ($(this).prop('checked')) {
        queries.push("'" + $(this).data('query') + "'");
      }
    });
    str += queries.join(',') + ')';
    layerl0.setOptions({
      query: {
        select: "col3",
        from: "14ZHXZcZ3Fy4Qk0k3_cNV16N_Xl-n5GHy2kd8XEM",
        where: str
      }
    });
  }

  function codeAddress(address) {
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        map.setZoom(15);
        if (!marker) {
          marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
          });
        } else {
          marker.setPosition(results[0].geometry.location);
        }
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }
  google.maps.event.addDomListener(window, 'load', initialize);
})();
