
// http://blog.thomsonreuters.com/index.php/mobile-patent-suits-graphic-of-the-day/

var links = [

  {source: "pandas", target: "Python", type: "libraries_python"},
  {source: "NumPy", target: "Python", type: "libraries_python"},
  {source: "Flask", target: "Python", type: "libraries_python"},
  {source: "nltk", target: "Python", type: "libraries_python"},
  {source: "SQLAlchemy", target: "Python", type: "libraries_python"},
  {source: "Plotly", target: "Python", type: "libraries_python"},
  {source: "Django", target: "Python", type: "libraries_python"},
  {source: "SciPy", target: "Python", type: "libraries_python"},
  {source: "matplotlib", target: "Python", type: "libraries_python"},
  {source: "requests", target: "Python", type: "libraries_python"},
  {source: "scikit-learn", target: "Python", type: "libraries_python"},
  {source: "leaflet", target: "Python", type: "libraries_python"},
  {source: "Plotly", target: "Javascript", type: "common_libs"},
  {source: "Javascript", target: "Plotly", type: "common_libs"},
  {source: "arcgis.js", target: "Javascript", type: "libraries_javascript"},
  {source: "D3.js", target: "Javascript", type: "libraries_javascript"},
  {source: "node.js", target: "Javascript", type: "libraries_javascript"},
  {source: "Google.js(plotting)", target: "Javascript", type: "libraries_javascript"},
  {source: "Swing", target: "Java", type: "libraries_java"},
  {source: "Util", target: "Java", type: "libraries_java"},
  {source: "awt", target: "Java", type: "libraries_java"},
  {source: "JFrame", target: "Java", type: "libraries_java"},
  {source: "JButton", target: "Java", type: "libraries_java"},
  {source: "math.h", target: "C/C++", type: "c_libraries"},
  {source: "limits.h", target: "C/C++", type: "c_libraries"},
  {source: "string.h", target: "C/C++", type: "c_libraries"},
  {source: "stack", target: "C/C++", type: "c_libraries"},
  {source: "deque", target: "C/C++", type: "c_libraries"},
  {source: "list", target: "C/C++", type: "c_libraries"},
  {source: "vector", target: "C/C++", type: "c_libraries"},
  {source: "Plotly", target: "R", type: "common_libs"},
  {source: "R", target: "Plotly", type: "common_libs"},
  {source: "R", target: "leaflet", type: "common_libs"},
  {source: "leaflet", target: "R", type: "common_libs"},
  {source: "data.frame", target: "R", type: "R_libraries"}

];






var nodes = {};

// Compute the distinct nodes from the links.
links.forEach(function(link) {
  link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
  link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
});

var width = 960,
    height = 500;

var force = d3.layout.force()
    .nodes(d3.values(nodes))
    .links(links)
    .size([width, height])
    .linkDistance(60)
    .charge(-300)
    .on("tick", tick)
    .start();

var svg = d3.select(".black").append("svg")
    .attr("width", width)
    .attr("height", height);

// Per-type markers, as they don't inherit styles.
svg.append("defs").selectAll("marker")
    .data(["libraries_python","libraries_javascript","common_libs","libraries_java","c_libraries","R_libraries"])
  .enter().append("marker")
    .attr("id", function(d) { return d; })
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 15)
    .attr("refY", -1.5)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("orient", "auto")
  .append("path")
    .attr("d", "M0,-5L10,0L0,5");

var path = svg.append("g").selectAll("path")
    .data(force.links())
  .enter().append("path")
    .attr("class", function(d) { return "link " + d.type; })
    .attr("marker-end", function(d) { return "url(#" + d.type + ")"; });

var circle = svg.append("g").selectAll("circle")
    .data(force.nodes())
  .enter().append("circle")
    .attr("r", 9)
    .call(force.drag);

var text = svg.append("g").selectAll("text")
    .data(force.nodes())
  .enter().append("text")
    .attr("x", 8)
    .attr("y", ".31em")
    .text(function(d) { return d.name; });

// Use elliptical arc path segments to doubly-encode directionality.
function tick() {
  path.attr("d", linkArc);
  circle.attr("transform", transform);
  text.attr("transform", transform);
}

function linkArc(d) {
  var dx = d.target.x - d.source.x,
      dy = d.target.y - d.source.y,
      dr = Math.sqrt(dx * dx + dy * dy);
  return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
}

function transform(d) {
  return "translate(" + d.x + "," + d.y + ")";
}