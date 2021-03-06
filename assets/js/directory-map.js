
  mapboxgl.accessToken = mapbox_access_token;
  var start = [-117.7037413,33.7129067];
  var map = new mapboxgl.Map({
    container: 'map',
    style: mapbox_style,
    center: start,
    pitch: 45,
    zoom: 8
  });

  map.on('load', function() {
    var canvas = map.getCanvasContainer();

    map.addSource('counties', {
      "type": "vector",
      "url": "mapbox://mapbox.82pkq93d"
    });

    map.addLayer({
      "id": "counties",
      "type": "fill",
      "source": "counties",
      "source-layer": "original",
      "paint": {
        "fill-outline-color": "#00FBD5",
        "fill-color": "transparent"
      }
    }, 'place-city-sm'); // Place polygon under these labels.
  });

  map.on('load', function () {
    map.addSource("points", {
      type: "geojson",
      data: {
        "type": "FeatureCollection",
        "features": shopsGeoJSONParsed,
      },
      cluster: true,
      clusterMaxZoom: 30, // Max zoom to cluster points on
      clusterRadius: 14
    });


    var layers = [
      [150, '#00FBD5'],
      [20, '#00FBD5'],
      [0, '#00FBD5']
    ];

    map.addLayer({
      "id": "points",
      "type": "symbol",
      "source": "points",
      "layout": {
        "icon-image": "{icon}-15"
      }
    });

    // console.log(map);

    layers.forEach(function (layer, i) {
      map.addLayer({
        "id": "cluster-" + i,
        "type": "circle",
        "source": "points",
        "paint": {
          "circle-color": layer[1],
          "circle-radius": 15
        },
        "filter": i === 0 ?
          [">=", "point_count", layer[0]] :
          ["all",
            [">=", "point_count", layer[0]],
            ["<", "point_count", layers[i - 1][0]]]
      });
    });

    map.addLayer({
      "id": "cluster-count",
      "type": "symbol",
      "source": "points",
      "layout": {
        "text-field": "{point_count}",
        "text-font": [
          "DIN Offc Pro Medium",
          "Arial Unicode MS Bold"
        ],
        "text-size": 12,
      }
    });

    // Create a popup, but don't add it to the map yet.
    var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    map.on('mousemove', function(e) {
      var features = map.queryRenderedFeatures(e.point, { layers: ['points'] });

      // Change the cursor style as a UI indicator.
      map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

      if (!features.length) {
        popup.remove();
        return;
      }

      var feature = features[0];

      // Populate the popup and set its coordinates
      // based on the feature found.
      popup.setLngLat(feature.geometry.coordinates)
           .setHTML(feature.properties.description)
           .addTo(map);
    });

    map.scrollZoom.disable();
    map.addControl(new mapboxgl.Navigation());
    showMapboxPopupOnHover(popup, '.directory-list .mix')
  });

  var isAtStart = true;

  document.getElementById('all').addEventListener('click', function() {

    isAtStart = !isAtStart;

    map.flyTo({
      center: start,
      zoom: 8,
      bearing: 0,
      pitch: 45,
      speed: 1, // make the flying slow
      curve: 1, // change the speed at which it zooms out

      easing: function (t) {
        return t;
      }
    });
  });






// To keep our code clean and modular, all custom functionality will be contained inside a single object literal called "buttonFilter".

var buttonFilter = {

  // Declare any variables we will need as properties of the object

  $filters: null,
  $reset: null,
  groups: [],
  outputArray: [],
  outputString: '',

  // The "init" method will run on document ready and cache any jQuery objects we will need.

  init: function(){
    var self = this; // As a best practice, in each method we will asign "this" to the variable "self" so that it remains scope-agnostic. We will use it to refer to the parent "buttonFilter" object so that we can share methods and properties between all parts of the object.

    self.$filters = $('#Filters');
    self.$reset = $('#Reset');
    self.$container = $('#Container');

    self.$filters.find('fieldset').each(function(){
      self.groups.push({
        $buttons: $(this).find('.filter'),
        active: ''
      });
    });

    self.bindHandlers();
  },

  // The "bindHandlers" method will listen for whenever a button is clicked.

  bindHandlers: function(){
    var self = this;

    // Handle filter clicks

    self.$filters.on('click', '.filter', function(e){
      e.preventDefault();

      var $button = $(this);

      // If the button is active, remove the active class, else make active and deactivate others.

      $button.hasClass('active') ?
        $button.removeClass('active') :
        $button.addClass('active').siblings('.filter').removeClass('active');

      self.parseFilters();
    });

    // Handle reset click

    self.$reset.on('click', function(e){
      e.preventDefault();

      self.$filters.find('.filter').removeClass('active');

      self.parseFilters();
    });
  },

  // The parseFilters method checks which filters are active in each group:

  parseFilters: function(){
    var self = this;

    // loop through each filter group and grap the active filter from each one.

    for(var i = 0, group; group = self.groups[i]; i++){
      group.active = group.$buttons.filter('.active').attr('data-filter') || '';
    }

    self.concatenate();
  },

  // The "concatenate" method will crawl through each group, concatenating filters as desired:

  concatenate: function(){
    var self = this;

    self.outputString = ''; // Reset output string

    for(var i = 0, group; group = self.groups[i]; i++){
      self.outputString += group.active;
    }

    // If the output string is empty, show all rather than none:

    !self.outputString.length && (self.outputString = 'all');

    console.log(self.outputString);

    // ^ we can check the console here to take a look at the filter string that is produced

    // Send the output string to MixItUp via the 'filter' method:

	  if(self.$container.mixItUp('isLoaded')){
    	self.$container.mixItUp('filter', self.outputString);
	  }
  }
};

var dropdownFilter = {

  // Declare any variables we will need as properties of the object

  $filters: null,
  $reset: null,
  groups: [],
  outputArray: [],
  outputString: '',

  // The "init" method will run on document ready and cache any jQuery objects we will need.

  init: function(){
    var self = this; // As a best practice, in each method we will asign "this" to the variable "self" so that it remains scope-agnostic. We will use it to refer to the parent "dropdownFilter" object so that we can share methods and properties between all parts of the object.

    self.$filters = $('#DropdownFilters');
    self.$reset = $('#Reset');
    self.$container = $('#Container');

    self.$filters.find('fieldset').each(function(){
      self.groups.push({
        $dropdown: $(this).find('select'),
        active: ''
      });
    });

    self.bindHandlers();
  },

  // The "bindHandlers" method will listen for whenever a select is changed.

  bindHandlers: function(){
    var self = this;

    // Handle select change

    self.$filters.on('change', 'select', function(e){
      e.preventDefault();

      self.parseFilters();
    });

    // Handle reset click

    self.$reset.on('click', function(e){
      e.preventDefault();

      self.$filters.find('select').val('');

      self.parseFilters();
    });
  },

  // The parseFilters method pulls the value of each active select option

  parseFilters: function(){
    var self = this;

    // loop through each filter group and grap the value from each one.

    for(var i = 0, group; group = self.groups[i]; i++){
      group.active = group.$dropdown.val();
    }

    self.concatenate();
  },

  // The "concatenate" method will crawl through each group, concatenating filters as desired:

  concatenate: function(){
    var self = this;

    self.outputString = ''; // Reset output string

    for(var i = 0, group; group = self.groups[i]; i++){
      self.outputString += group.active;
    }

    // If the output string is empty, show all rather than none:

    !self.outputString.length && (self.outputString = 'all');

    //console.log(self.outputString);

    // ^ we can check the console here to take a look at the filter string that is produced

    // Send the output string to MixItUp via the 'filter' method:

	  if(self.$container.mixItUp('isLoaded')){
    	self.$container.mixItUp('filter', self.outputString);
	  }
  }
};

// On document ready, initialise our code.

$(function(){

  // Initialize buttonFilter code

  buttonFilter.init();
  dropdownFilter.init();

  // Instantiate MixItUp

  $('#Container').mixItUp({
    controls: {
      enable: false // we won't be needing these
    },
    load: {
      filter: 'all',
      // filter: window.location.hash ? '.'+(window.location.hash).replace('#','') : 'all',
    },
    animation: {
      enable: false,
  		effects: 'fade'
    }
  });
});
