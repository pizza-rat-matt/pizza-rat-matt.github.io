const data = {
    "name": "Elevate others and myself to experience life",
    "impact" : 2, "urgency" : 1,
    "children": [
      {
        "name": "Quality explainer", "impact": 0.8,
      },
      {
        "name": "DoD",
        "impact" : 0.9, "urgency" : 1,
        "children": [
          {
            "name": "Essential meds",
            "impact" : 0.8, "urgency" : 1,
            "children": [
                {
                  "name": "Read Praew's email",
                  "impact" : 0.6, "urgency" : 1,
                },
            ],
          },
          {
            "name": "Mike's request",
            "impact" : 0.7, "urgency" : 1,
          }
        ]
      },
      {
        "name": "Downstream data",
        "impact" : 1, "urgency" : 1,
      },
      {
        "name": "NY Times",
        "impact" : 1, "urgency" : 1,
      },
      {
        "name": "Exercise",
        "impact" : 1, "urgency" : 1,
      },

      {
        "name": "TODO App",
        "impact" : 1, "urgency" : 1,
        "children": [
          {
            "name": "Wrap text to prevent hanging chads",
            "impact" : 0.1, "urgency" : 1,
          },
          {
            "name": "Beautiful UX",
            "impact" : 0.9, "urgency" : 1,     "children": [
                {
                  "name": "Format the code through linting",
                  "impact" : 0.9, "urgency" : 1, 
                },
                {
                    "name": "Learn about D3 ball bouncing",
                    "impact" : 0.9, "urgency" : 1, 
                  },
                  {
                    "name": "Color balls based on urgency",
                    "impact" : 0.9, "urgency" : 1, 
                  },
            ]
          },
          {
            "name": "Favicon",
            "impact" : 0.2, "urgency" : 1,
          },
          {
            "name": "Crops at bottom",
            "impact" : 1, "urgency" : 1,
          },
          {
            "name": "Extends at top",
            "impact" : 1, "urgency" : 1,
          },
        ]
      },
    ]
  };

  const svg = d3.select("svg");
  const width = +svg.attr("width");
  const height = +svg.attr("height");

  const root = d3.hierarchy(data);
  const links = root.links();
  const nodes = root.descendants();
  
  const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-500))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .on("tick", ticked);
  
  const drag = d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  
  const link = svg.append("g")
      .selectAll("line")
      .data(links)
      .enter().append("line")
      .attr("stroke", "#aaa");
  
  const node = svg.append("g")
      .selectAll("circle")
      .data(nodes)
      .enter().append("circle")
      .attr("r", d => d.data.impact*40)
      .attr("fill", "steelblue")
      .on("mouseover", function () {
        d3.select(this).attr("fill", "orange");
        })
      .call(drag);
      
// label.call(wrap, 80); // You can adjust '80' for desired wrapping width
const labelGroups = svg.append("g")
    .selectAll(".labelGroup")
    .data(nodes)
    .enter().append("g")
    .call(drag);

// Inside these groups, append rectangles for background
const labelBackground = labelGroups.append("rect")
    .attr("fill", "white")  // White background
    .attr("opacity", 0.7)   // Adjust opacity as needed
    .attr("rx", 5)          // Rounded corners
    .attr("ry", 5);

// Inside these groups, also append texts for labels
const labelText = labelGroups.append("text")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .attr("opacity", d => d.data.impact)
    .text(d => d.data.name)
    .call(wrap, 150)
    .each(function(d) {
        const bbox = this.getBBox();
        d.bbox = bbox;
        d3.select(this.previousSibling)  // selects the rectangle (it's before the text in the DOM)
            .attr("x", bbox.x - 2)
            .attr("y", bbox.y - 2)
            .attr("width", bbox.width + 4)
            .attr("height", bbox.height + 4);
    });
  function ticked() {
      link
          .attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y);
  
      node
          .attr("cx", d => d.x)
          .attr("cy", d => d.y);

        labelGroups
        .attr("transform", d => `translate(${d.x}, ${d.y})`);
  }
  
  function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
  }
  
  function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
  }
  
  function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
  }

  function wrap(text, width) {
    text.each(function() {
        const text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            lineHeight = 1.1,
            y = text.attr("y")
            dy = parseFloat(text.attr("dy"));

        let word,
            line = [],
            lineNumber = 0,
            tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", `${dy}em`);

        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", `${++lineNumber * lineHeight + dy}em`).text(word);
                lineNumber -= 1;
            }
        }
    });
}
