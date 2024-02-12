const header = d3.select('body').append('header')
                .attr('class','mainheader');

header.append('h1').text('Caitlin Tavas');

const navigation = header.append('nav');

navigations = [
    'Home', 
    'Projects',
    'Experience', 
    'Skills'
]

navigations_link = [
    'index.html', 
    'proj.html',
    'exp.html',  
    'skills.html'
]

for (let i = 0; i < navigations.length; i++){
    navigation.append('a')
            .attr('href', navigations_link[i])
            .style('width', `${100/navigations.length}%`)
            .text(navigations[i]);

}