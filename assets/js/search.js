
  // builds lunr
  var index = lunr(function () {
    this.field('title', {boost: 10})
    this.field('tags')
    this.field('city')
    this.field('type')
    this.field('coffee')
    this.field('county')
    this.ref('id')
  });
  {% assign count = 0 %}{% assign places = site.collections %}{% for place in places %}{% assign shops = place.docs %}{% for shop in shops %}{% if shop.title == place.title %}{% else %}
  index.add({
    id: {{count}},
    title: {{shop.shop_name | jsonify}},
    type: {{shop.type | jsonify}},
    county: {{place.title | jsonify}},
    city: {{shop.city | jsonify}},
    tags: {{shop.tags | strip_html | strip_newlines | jsonify}}
  });{% assign count = count | plus: 1 %}{% endif %}{% endfor %}{% endfor %}
  console.log( jQuery.type(index) );
  // builds reference data
  var store = [{% assign places = site.collections %}{% for place in places %}{% assign shops = place.docs %}{% for shop in shops %}{% if shop.title == place.title %}{% else %}{
    "title": "{{ shop.shop_name | xml_escape }}",
    "type": "{{ shop.type | xml_escape }}",
    "city": "{{ shop.city | xml_escape }}",
    "county": "{{ place.title | xml_escape }}",
    "coffee": {{ shop.coffee | strip_html | strip_newlines | jsonify }},
    "content": {{ shop.tags | strip_html | strip_newlines | jsonify }},
    "url": "{{ shop.url | xml_escape }}"
  },{% endif %}{% endfor %}{% endfor %}]
  // builds search
  $(document).ready(function() {
    $('input#search').on('keyup', function () {
      var resultdiv = $('#results');
      // Get query
      var query = $(this).val();
      // Search for it
      var result = index.search(query);
      // Show results
      resultdiv.empty();
      // Add status
      resultdiv.prepend('<p class="">Found '+result.length+' result(s)</p>');
      // Loop through, match, and add results
      for (var item in result) {
        var ref = result[item].ref;
        var searchitem = '<div class="result"><div class="result-body"><a href="'+store[ref].url+'" class="">'+store[ref].title+'</a><div class="">'+store[ref].city+'</div><div class="">'+store[ref].county+'</div></div>';
        resultdiv.append(searchitem);
      }
    });
  });
