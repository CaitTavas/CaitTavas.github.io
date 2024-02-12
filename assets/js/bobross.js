 // establishing variables
 const svg = d3.select("#bobMap");
 const width = svg.attr("width");
 const height = svg.attr("height");
 const margin = { top: 20, right: 20, bottom: 20, left: 100 };
 const mapWidth = width - margin.left - margin.right;
 const mapHeight = height - margin.top - margin.bottom;
 const chartArea = svg.append("g")
 .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

 const requestData = async function () {
     const bobRoss = await d3.csv("bob-ross.csv");
     const split_season = 5; // how to split range of seasons
     const n = 10; // how many visualizations to show on y axis 
     bobRoss.forEach( (d) => {
         // grabs the season value is from
         d['season'] = parseFloat(d['EPISODE'].slice(1, 3));
         // out of 31 seasons, assign it to a 5 range season
         d['season_range'] = parseInt(d['season'] / split_season)
         
     });
     console.log(bobRoss);
     
     // getting sums for each column
     var colSums = {};
     bobRoss.forEach(function(row) {
         for (var key in row) {
             if (!isNaN(parseFloat(row[key]))) {
                 colSums[key] = (colSums[key] || 0) + parseFloat(row[key]);
             }
         }
     });
     console.log(colSums);
     
     // attempting to just plot the top n common to avoid clutter 
     const sort_arr = [];
     for (var p in colSums){
         if ((p !== "season") && (p !== "season_range")){
             sort_arr.push({key: p, value: colSums[p]});
         }
     }
     sort_arr.sort((a,b) => {return b.value-a.value});
     const top_values = sort_arr.slice(0, n);
     console.log(top_values);
     const top_map = top_values.map(({key})=>key);
     // or maybe allow the user to show how many?
     // processing data and grouping by season 
     var groupedData = bobRoss.reduce(function (result, current) {
         var season = current.season;
         if (!result[season]) {
             result[season] = { season: season};
             top_map.forEach(d => result[season][d] = 0);
         }
         top_map.forEach(d => {
             result[season][d] += parseInt(current[d])
         })
         return result;
     }, {});
     var groupSeasonDF = Object.values(groupedData);

     console.log(groupSeasonDF);
     // first col should be season
     // top row should be those attributes wanted and then sums per season
     // stack the data
     var stackedData = d3.stack()
         .keys(top_map)
         (groupSeasonDF);
     
     console.log('stack', stackedData);
     
     // create a color chart based top_values 
     const colorScale = d3.scaleOrdinal()
         .domain(top_map)
         .range(d3.schemeCategory10);
     
     // xScale
     const xScale = d3.scaleLinear()
         .domain(d3.extent(groupSeasonDF, d => d.season))
         .range([0, mapWidth]);
     
     chartArea.append('g')
         .attr('class', 'x-axis')
         .attr('transform', `translate(0, ${mapHeight})`)
         .call(d3.axisBottom(xScale));
     // create y axis for chart  
     //const max_y = top_values[0].value
     const max_y = d3.max(stackedData[stackedData.length - 1], d => d[1]) // get last 
     const yScale = d3.scaleLinear()
         .domain([0, max_y+max_y*0.1]) // give some value padding
         .range([mapHeight, 0]);

     // make area
     var area = d3.area()
         .x(d => xScale(d.data.season))
         .y0( d=> yScale(d[0]))
         .y1( d=> yScale(d[1]))
         .curve(d3.curveMonotoneX);
     
     chartArea.append('g')
         .attr('class', 'y-axis')
         .call(d3.axisLeft(yScale));
     chartArea.selectAll('path.area')
         .data(stackedData)
         .enter()
         .append('path')
         .attr('id', d=>`${d.key}`)
         .attr('class', d =>`area`)
         .attr('d', area)
         .attr('fill', d=> colorScale(d.key))
         .append('title')
         .text(d=>d.key);
     
     // adding legend 
     // add color at the top -> can click to add interactiveability 
     const legend = svg
         .selectAll(".legend")
         .data(top_map)
         .enter()
         .append("g")
         .attr("class", "legend")
         .attr("transform", (d, i) => "translate("+ (mapWidth - 25) +"," + (i * 20 + 10)+ ")")
         .on('mouseover', mOPointer)
         .on('mouseout', mOutPointer)
         .on('click', toggleLegend);

     const colorLegend = legend
         .append("rect")
         .attr("width", 18)
         .attr("height", 18)
         .style("fill", (d, i) => d3.schemeCategory10[i]);

     const textLegend = legend
         .append("text")
         .attr("x", 24)
         .attr("y", 9)
         .attr("dy", ".35em")
         .style("text-anchor", "start")
         .text(d => d.charAt(0).toUpperCase()+d.slice(1).toLowerCase());
     
     // reset button
     const resetButton = chartArea.append('text')
         .attr('class', 'reset-button')
         .attr("transform", "translate(10, 20)")
         .style('border', '3px solid')
         .text('Reset');
     
     // interactions
     // adding filtering
     
     function mOPointer(d){
         d3.select(this).style('cursor', 'pointer');
         d3.select(this).style('border-style', 'bold');
     }
     function mOutPointer(){
         d3.select(this).style('cursor', 'default');
     }

     function toggleLegend(d) {
         svg.selectAll("path.area").style('opacity', 0);
         const selectedOne = svg.select(`path.area#${d.target.textContent.toUpperCase()}`);
         selectedOne.style('opacity', 1);

         const visibleData = stackedData.filter(stack =>{
             const key = stack.key;
             console.log(key);
             const isVisible = svg.select(`.area#${key}`).style("opacity") === "1";
             return isVisible;
         });
         console.log(visibleData);
         // min values
         const min_values = visibleData.flatMap(stack => stack.map(d => d[0]))
         // max values
         const max_values = visibleData.flatMap(stack => stack.map(d => d[1]))
         const minY = d3.min(min_values);
         const maxY = d3.max(max_values);
         const differences = [];

         for (let i = 0; i < min_values.length; i++){
             differences.push(max_values[i] - min_values[i])
         }

         yScale.domain([0, d3.max(differences)]);
         
         // Update the y-axis
         svg.select(".y-axis").transition().duration(500).call(d3.axisLeft(yScale));

         // Redraw the visible areas with the updated yScale
         var area = d3.area()
             .x(d => xScale(d.data.season))
             .y0(mapHeight)
             .y1( d=> yScale(d[1]- d[0]))
             .curve(d3.curveMonotoneX);
         chartArea.selectAll('path.area')
             .attr('d', area);
     }

     resetButton.on('click', function () {
         svg.selectAll("path.area").style('opacity', 1);
         yScale.domain([0, max_y+max_y*0.1]);

         svg.select(".y-axis").transition().duration(500).call(d3.axisLeft(yScale));

         var area = d3.area()
             .x(d => xScale(d.data.season))
             .y0( d=> yScale(d[0]))
             .y1( d=> yScale(d[1]))
             .curve(d3.curveMonotoneX);

         
         chartArea.selectAll('path.area')
             .attr('d', area)

     });

     

 }
 requestData();