var OnePage = {
  linkMenu: function (i, element) {
    if (i < OnePage.links.length) {
      $(element).click(OnePage.go.bind({
        caller: element,
        page: OnePage.links[i],
        theme: OnePage.themes[i],
        content: OnePage.content[i]
      }));
    }
  },
  links: [],
  load: function () {
    OnePage.contentDiv = $("#main-content");
    $("#link-list").children().each(OnePage.linkMenu);
    document.body.onhashchange = OnePage.hrefMutation;
    OnePage.hrefMutation();
  },
  hrefMutation: function () {
    var address = window.location.href.split("#");
    var loaded = false;
    if (address.length == 2) {
      address = "#" + address[1];
      address = OnePage.links.indexOf(address);
      if (address >= 0) {
        loaded = true;
        OnePage.follow = false;
        $("#link-list").children()[address].click();
        OnePage.follow = true;
      }
    }

    if (!loaded) {
      $("#link-list").children()[1].click();
    }
  },
  go: function () {
    $(".selected").removeClass("selected").addClass("selectable");
    $(this.caller).removeClass("selectable").addClass("selected");
    if (OnePage.follow)
      window.location.href = this.page;
    if (this.page.charAt(0) == "#") {
      $(document.body).removeClass().addClass(this.theme);
      OnePage.contentDiv.html("");
      if (this.content)
        OnePage.contentDiv.html(this.content.getContent());
    }
  },
  themes: [],
  follow: true,
  contentDiv: null
};


function DirectFill(content) {
  this.content = content;
}

DirectFill.prototype.getContent = function () {
  var div = document.createElement("div");
  div.innerHTML = this.content;
  return div;
};


function DisplaySet(content) {
  this.content = content;
}

DisplaySet.prototype.getContent = function () {
  var ul = document.createElement("ul");
  ul.className = "display-set";
  for (var i = 0; i < this.content.length; i++) {
    var obj = this.content[i];
    var li = document.createElement("li");
    if (obj.container) {
      li.appendChild(obj.container);
    } else {
      if (obj.title || obj.link) {
        var h1 = document.createElement("h1");
        if (obj.link) {
          var link = document.createElement("a");
          link.href = obj.link;
          h1.appendChild(link);
          if (obj.title) {
            link.innerHTML = obj.title;
          } else {
            link.textContent = obj.link;
          }
        } else {
          h1.innerHTML = obj.title;
        }
        li.appendChild(h1);
      }
      if (obj.about) {
        var about = obj.about;
        for (var j = 0; j < about.length; j++) {
          if (j != 0) {
            li.appendChild(document.createElement("br"));
          }
          var p = document.createElement("p");
          p.innerHTML = about[j];
          li.appendChild(p);
        }

      }
    }
    ul.appendChild(li);
  }

  return ul;
};

function LinkSet(content) {
  this.container = document.createElement("div");
  this.container.className = "link-buttons";
  this.content = content;
  this.getContent();

}

LinkSet.prototype.getContent = function () {
  this.container.innerHTML = null;
  for (var i = 0; i < this.content.length; i++) {
    var obj = this.content[i];
    var a = document.createElement("a");
    a.href = obj.href;
    a.className = "link-button";
    a.innerHTML = obj.title;
    this.container.appendChild(a);
  }
  return this.container;
};

OnePage.links = ["../", "#about", "#apps", "#lab", "../resume/StephOro.pdf"];
OnePage.themes = [0, "colorscheme-1", "colorscheme-2", "colorscheme-3", "colorscheme-4"];
OnePage.content = [0, new DisplaySet([

{
  title: "Greetings!",
  about: ["I'm Steph, an application developer currently working as a classroom assistant at Stevens Institute of Technology. I also write patents, create app graphics, make games, and am a current student at Stevens Institute of Technology in Hoboken, NJ. Pursuing a B.S. degree. I'm currently 2/3 (I'm graduating in three years instead of the normal four)."]
			},

{
  title: "My Experience",
  about: ["I've been an independent developer for six years and a college student for two of those years. I'm also currently a TA for CS 115, a class on Python at Stevens Institute of Technology. Most recently, I just led a team to win one of five categories at the DuckHacks hackaton (see <a href=\"#lab\">The Lab</a> for details). This past summer, I led a team of graduate students to build a quiz engine in HTML5. My current side projects are C++ iOS/Andriod apps, one with three of my collegues, and one independent. My first language (six years past) was Objective C, then I moved into Java, HTML5, C++, and Python. Of those languages, I like working in HTML5, C++, or Python the most. If you want a more in depth look into my recent job history, check out my resume or <a href=\"https://www.linkedin.com/in/stephoro\">LinkedIn</a>. If you want to see what I've done, check out <a href=\"#lab\">The Lab</a> for some cool stuff, or check out <a href=\"#apps\">my apps</a> to see what I've currently got on the market."]
			}, 

{
  title: "Contact",
          about: ["Email: <a href=\"mailto:stephenjoro@gmail.com\">stephenjoro@gmail.com</a>", "I'm on <a href=\"https://www.linkedin.com/in/stephoro\">LinkedIn</a> as well."]
		}

]), new DisplaySet([

{
  title: "My Apps",
  about: ["I develop apps, but also am working on products that run on all major platforms Windows, Mac, Linux, iOS, and Andriod using the C++ SDL2 Libraries. ", "My current team project – for the moment titled \"Project Cupcake\" – is an idle clicker type game of the same genre as Tiny Tower or Cookie Clicker. Although it's a work in progress, it makes use of my circular script object notation (CSON) - which will be getting circular support shortly - which is an easy to write and parse representation of objects.", "My current independent project – Operator 12 – is a game that honors <a href=\"http://biomediaproject.com/bmp/files/LEGO/gms/online/Spybotics/TheNightfallIncident/\">The Nightfall Incident</a>, which is a classic that’s never had the sequel it deserves. I’ve seen a few people put forth worthy attempts to reproduce the game’s play, but there’s been no high-quality, well-made games in the same play style and I intend to fix that. My own creation is 90% complete, and is awaiting music composition and level design."]
}, 

{
  link: "https://appsto.re/us/QaTI9.i",
  title: "iPeters",
  about: ["The app that I made and maintain for St. Peter's Preparatory School, NJ. It features dynamic HTML5 content to provide access to the common tools needed by students and teachers alike."]
}, 

{
  link: "https://appsto.re/us/vPCS8.i",
  title: "Lizard Up",
  about: ["My latest game, Lizard Up. It's a fun and addicting little game where you play as a lizard trying to climb higher and collect shiny coins."]
}

]), new DisplaySet([

{
  title: "The Lab",
  about: ["Here are some of the cool little projects I've built ranked vaguely based on the coolness factor of each project. Essentially a curated view of my projects:"]
}, 

{
  link: "https://github.com/stephoro/sniffle-interpreter",
  title: "Sniffle Interpreter",
  about: ["My very own interpreted language :) (interpreted via a C++ engine I wrote for it). I created the current build as an excercise in 'Can I build a cross-platform scripting language?' I really wanted to have my own language for general purpose scripting in cross platform SDL2 based applications, and this was my inital solution. I intend to take a good look into the CPython interpreter, and eventually make this just as fast and useable as Python (albeit with less modules) and move the interpreter fully into C instead of C++. It is currently slower than most modern scripting languages and is a real pain to use in practice, but I intend to fix pain points. Feature set listed in project readme. Documentation in header files."]
}, 
    
{
  link: "https://github.com/stephoro/perspective-game-mango/",
  title: "Perspective Game Mango",
  about: ["This project is an initial MVP build of a point and click iOS game engine. It features my LISP-like interpreted language - Sniffle and runs games through this scripting language. More details in project readme."]
}, 
    
{
  link: "https://github.com/stephoro/c-server-guacamole",
  title: "C Server Guacamole",
  about: ["A curses based tcp chat client & server built from scratch in C. It doesn't even use the standard string library - it has it's own. Also has its own linked list. Eventually, I intend to build more interesting features like basic encryption and file sharing."]
}, 
    
{
  link: "https://github.com/stephoro/image-mangler",
  title: "Image Mangler",
  about: ["A sample steganography project I built. Complete with demo if you download it."]
}, 

{
  link: "https://github.com/stephoro/DuckHacks2017/",
  title: "DuckHacks 2017 Category Winning Project (Thrive)",
  about: ["For this project, I acted as an agile coach and programmer working with a team consisting of two freshmen computer science majors, and two sophmore engineers. We made a useful product that tracks browsing activity and helps individuals become more cognizant of their browsing habits."]
}, 

{
  link: "https://stephoro.github.io/DrawingBook/",
  title: "Drawing Book",
  about: ["A fully functional web app for drawing and note taking, I use it to detail app ideas, or code concepts, as it contains infinite pages of infinite size. It saves using my circular script object notation (CSON) binary format."]
}, 

{
  link: "http://bluecode.altervista.org/space/",
  title: "A Space Game",
  about: ["A simple space game that has little point, but looks cool and is somewhat optimized behind the scenes. Later versions exist with paralax, which if I can find the source of those versions will be moved to github."]
}, 

{
  link: "https://stephoro.github.io/ListInput/",
  title: "List Input",
  about: ["A usefule multi-item text input that submits an Array in JSON format on form submission. I built this according to requirements I was given, and added a few features of my own design as this was allowed by the requirements. Very simple to use, and well <a href='https://stephoro.github.io/ListInput/documentation'>documented</a>."]
}, 

{
  link: "http://thatfishgame.altervista.org/nmssky/",
  title: "Auto-Animated Scene",
  about: ["I made a javascript renderer that parses and displays the .sif animated file format! It's pretty cool in my opinion :) This is the no man sky's Atlas animated as a looping display. It changes colors cyclically over a very long period of time, but it should be aparent after five minutes. More examples of this engine appear later."]
}, 

{
  link: "https://stephoro.github.io/QuestApp/",
  title: "Quest App",
  about: ["A little dungeon exploring 8-bit app in HTML5 that is complete, but more features should be added to make it fun. Uses A* pathing if you click/tap away from your character!"]
}, 

{
  link: "http://bluecode.altervista.org/JsQuest/regex.html",
  title: "Regex Functional Replacement",
  about: ["I use this every once and a while, it's a tool I made that allows regular patterns to be replaced with the output of a javascript function. Very useful to me."]
}, 

{
  link: "https://stephoro.github.io/LizardUp/",
  title: "Lizard Up",
  about: ["Not the app, but a web version of this lizard jumping game. Also add free with love <3"]
}, 

{
  link: "http://thatfishgame.altervista.org/",
  title: "That Fish Game",
  about: ["A silly little game I threw together to showcase my sif animation engine. Catch ten fish and build a fish gun."]
}, 

{
  link: "http://thatfishgame.altervista.org/lmaotank/",
  title: "The LMAO Tank",
  about: ["It's the sif engine again, but this time with an animated lmaotank - animated text!"]
}, 

{
  link: "https://github.com/hydrodog/LiquiZ2",
  title: "LiquiZ2 (Quiz Engine) [source]",
  about: ["I led a team of graduate students under Dr. Kruger at Stevens to build this engine. You could run it if you install Tomcat on your computer. I'm looking into simplifying this engine into pure HTML5 with Node.js, but Dr. Kruger favors Java, so that's why you need tomcat, and I don't have a nice link."]
}, 

{
  link: "https://github.com/stephoro/ProjectCupcake",
  title: "Project Cupcake [source]",
  about: ["One of my current projects, built by my three collegues and I. It uses a custom event system, and will use a grid-like layout and a custom animation format. It also uses CSON. See <a href=\"#apps\">my apps</a> for a better description."]
}, 

{
  link: "https://github.com/stephoro/CSON",
  title: "The CSON Format [source]",
  about: ["It's like JSON but binary and easy to use. Eventually, I'll likely add the ability to encode cyclical (true graph) object structures (it's not that hard actually), which would give CSON a leg up on JSON and BSON. Also, with JSON you need a context-free parser, where the structure of CSON can be tweaked to be regular if desired. (Use null termination to make it regular)."]
}, 

{
  link: "https://github.com/stephoro",
  title: "And More! (Including Source Code)",
  about: ["My Github page. You can find the source for the Drawing Book and Lizard Up (and sifs) there as well as a few other things that didn't make it here."]
}

]), 0];

window.onload = OnePage.load;
