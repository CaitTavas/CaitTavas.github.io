// reference variables 
// color
const main_text_color = 'lightcoral'
const main_background_color = 'white'

const header = d3.select('body').append('header')
                .attr('class','mainheader');

// top text 
// header.append('h1').text('Caitlin Tavas');

// navigation elemeents
const navigation = header.append('nav');

// const button = navigation.append('button');
navigations = [
    'Home', 
    'Projects',
    'Experience', 
    'Visualizations'
]

navigations_link = [
    'index.html', 
    'proj.html',
    'exp.html',  
    'visual.html'
]

for (let i = 0; i < navigations.length; i++){
    navigation.append('a')
            .attr('href', navigations_link[i])
            .style('width', `${70/navigations.length}%`)
            .text(navigations[i]);

}


// interaction
var navigation_items = d3.select('nav').selectAll('a');
console.log('test')
navigation_items.on('mouseover', function(){
    console.log('mouseover');

    d3.select(this).style('background-color', main_text_color)
                    .style('color', main_background_color);
});

navigation_items.on('mouseout', function(){
    console.log('mouseout');

    d3.select(this).style('background-color', main_background_color)
                    .style('color', main_text_color);
});