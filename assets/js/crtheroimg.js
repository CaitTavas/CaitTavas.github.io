// reference variables 
// color
const main_text_color = 'lightcoral'
const main_background_color = 'white'


const header = d3.select('body').append('header')
                .attr('class','heroheader');

const navigation = header.append('nav');

// hero image elements
const hero_image = header.append('div')
        .attr('class', 'hero-image');

const hero_text = hero_image.append('div')
        .attr('class', 'hero-text');

const image_path = 'assets/img/Headshot.png'
const hero_image_file = hero_text.append('img')
        .attr('src', image_path)
        .attr('height', 350);

hero_text.append('h1').text('Caitlin Tavas');
hero_text.append('p').text('Data Scientist interested in Healthcare and Natural Language Processing');
// hero_text.append('button').text('Learn More =>');


// navigation elemeents

// const button = navigation.append('button');
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