
d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json")
.then(fetchedData => {
    let data = [];

    fetchedData.data.map(x => {
        data.push({dates: x[0],gdp: x[1]});
    });
    
    const maxGDP = Math.max(...data.map(x => x.gdp));
    
    const height = 500;
    const width = 1200;
    
    const yScale = d3.scaleLinear()
    .domain([0, maxGDP])
    .range([0, height]);

    const xScale = d3.scaleLinear()
    .domain([0, data.length])
    .range([0, width]);

    d3.select('body')
        .append('svg')
            .attr('width', width)
            .attr('height', height)
            .style('background', '#f4f4f4')
        .selectAll('rect')
        .data(data)
        .enter().append('rect')
            .attr('width', d => 1)
            .attr('height', d => yScale(d.gdp))
            .attr('x', (d, i) => xScale(i))
            .attr('y', d => height - yScale(d.gdp))

});