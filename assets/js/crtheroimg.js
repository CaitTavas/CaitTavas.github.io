const header = d3.select('body').append('header')
                .attr('class','heroheader');

const navigation = header.append('nav');

// hero image elements
const hero_image = header.append('div')
        .attr('class', 'hero-image');

const hero_text = hero_image.append('div')
        .attr('class', 'hero-text');

hero_text.append('h1').text('Caitlin Tavas');
hero_text.append('button').text('Learn More =>');


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