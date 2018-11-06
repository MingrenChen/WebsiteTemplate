document.addEventListener("touchstart", function(){}, true);
let urls="";

class Post_type{
    constructor(type_num){
        switch (type_num){
            case 1:
                this.ptype = "offering"
                this.id_ = "offering"
                break
            case 2:
                this.ptype = "wanted"
                this.id_ = "wanted"
                break
            case 3:
                this.ptype = "finding roommate"
                this.id_ = "roommate"
                break
        }
    }
}

// let tops = [{title: 'Tour guide finder', desc: 'An "Uber-like" app for travelers to find tour guides.', requirements: ['HTML', 'CSS', 'JavaScript'], banner: "https://images.britcdn.com/wp-content/uploads/2016/11/GettyImages-508482158-645x363.jpg?w=1000&auto=format"},
// {title: 'Modeling kite flying', desc: 'Flying kites is an excellent way to learn about aerodynamic forces. In this science fair project, you will build and test a variety of kite designs to see which flies best in low wind speeds.', requirements: ['Python'], banner: "https://www.surfertoday.com/images/stories/kiteforces2.jpg"},
// {title: 'Event staffing website', desc: 'A website that will bring event staffing to the 21st century.', requirements: ['HTML', 'CSS', 'JavaScript'], banner: "https://www.staffedbysummit.com/images/event-staff.png"}]

let new_post = [{type_:new Post_type(1), location:'Bloor & Yonge',desc:"one bedroom and shared bathroom with a college student",requirements: ['Male', 'No party at night'], banner: "https://images.britcdn.com/wp-content/uploads/2016/11/GettyImages-508482158-645x363.jpg?w=1000&auto=format"},
    {type_:new Post_type(2), location:'N/A', desc:"finding one bedroom in Toronto",requirements: ['roommate only female', 'No pet'], banner:"https://www.surfertoday.com/images/stories/kiteforces2.jpg"},
    {type_:new Post_type(3), location:'N/A', desc:"finding UofT student to rent a condo together",requirements: ['Male', 'UofT student'],banner:"https://www.staffedbysummit.com/images/event-staff.png"},
];

let recommends=[{title: 'Hard Drive Benchmarker', desc: 'A software that benchmarks hard drives', requirements: ['C', 'Java'], banner: "https://pendriveapps.com/wp-content/uploads/HDBench-Free-Benchmark.png"},
    {title: 'Fluid simulator game', desc: 'A video game that uses a fluid simulation engine.', requirements: ['Java'], banner: "https://static.gamespot.com/uploads/original/1535/15350374/2364907-9949972083-oe-ca.jpg"},
    {title: 'Navigation Bot', desc: 'A navigator AI bot that finds the fastest route to a designated location.', requirements: ['C', 'Python', 'Java'], banner: "https://www.robotshop.com/letsmakerobots/files/userpics/u21937/WP_20140116_010_1_.jpg"}]


function display_tops(new_post){
    $(document).ready(function(){
        $("#new_post").empty();
        if(new_post!=null){
            new_post.forEach(function(t){
                console.log(t);
                being_append="<div class='card card__one'>"
                being_append+="<figure class='card__img'>"
                being_append+="<img src=" + t.banner + ">"+"</figure>"
                being_append+="<div class='card__desc'>"
                being_append+="<h4 id=" + t.type_.id_ + ">"+t.type_.ptype+"</h4>"
                being_append+="<h4>"+t.desc+"</h4>"
                being_append+="<h5>requirements:</h5>"
                being_append+="<ul class='list-group list-group-flush'>"
                t.requirements.forEach(function(r){
                    being_append+="<li class='list-group-item'>"+r+"</li>"
                });
                being_append+="</ul><button type='button' class='btn btn-default'>Add to wishlist</button></div></div>"
                $(being_append).appendTo($("#new_post"));
            });
        }
    });
}

function display_recommends(recommends){
    $(document).ready(function(){
        $("#recommends").empty();
        if(recommends!=null){
            recommends.forEach(function(c){
                being_append="<div class='card card__one'>"
                being_append+="<figure class='card__img'>"
                being_append+="<img src=" + c.banner + ">"+"</figure>"
                being_append+="<div class='card__desc'>"
                being_append+="<h4>"+c.title+"</h4>"
                being_append+="<h4>"+c.desc+"</h4>"
                being_append+="<h5>requirements:</h5>"
                being_append+="<ul class='list-group list-group-flush'>"
                c.requirements.forEach(function(r){
                    being_append+="<li class='list-group-item'>"+r+"</li>"
                });
                being_append+="</ul><button type='button' class='btn btn-default'>Add to wishlist</button></div></div>"
                $(being_append).appendTo($("#recommends"));
            });
        }
    });
}

function sendToPage(){
    console.log("ok");
    if(2!=1){
        window.location.href="search.html";
        window.event.returnValue=false;
    }
}



display_tops(new_post);
display_recommends(recommends);