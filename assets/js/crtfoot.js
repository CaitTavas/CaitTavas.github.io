const footer = d3.select('body').append('footer')
                                .attr('class', 'mainfooter')
                                .style('background-color', 'lightcoral');

footer.append('h1').text('Contact Information');

footer.append('a').attr('class', 'fa fa-linkedin')
        .attr('href', 'https://www.linkedin.com/in/caitlin-tavas')
        .attr('target', '_blank')
        .style('color', 'white')
        .style('background', "#007bb5");

footer.append('a').attr('class', 'fa fa-github')
        .attr('href', 'https://github.com/CaitTavas')
        .attr('target', '_blank')
        .style('color', 'white')
        .style('background', "#333");

footer.append('a').attr('class', 'fa fa-envelope')
        .attr('href', 'mailto:caitlintavas@gmail.com')
        .style('color', 'white')
        .style('background', "#ed4c3c");
