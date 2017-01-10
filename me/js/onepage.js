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
		ul.appendChild(li);
	}

	return ul;
};

OnePage.links = ["../", "#about", "#apps", "#lab", "../resume/latest.pdf"];
OnePage.themes = [0, "colorscheme-1", "colorscheme-2", "colorscheme-3", "colorscheme-4"];
OnePage.content = [0, new DisplaySet([{
	title: "Greetings!",
	about: ["I'm Steph, an application developer currently working as the Lead Front-End Engineer on a quiz engine at Stevens! I also write patents, create app graphics, make games, and am a current student at Stevens Institute of Technology in Hoboken, NJ."]
			},{
	title: "My Experience",
	about: ["I've been an independent developer for six years and a college student for two of those years. I'm also currently a TA for CS 115, a class on Python at Stevens Institute of Technology. This past summer, I led a team of graduate students to build a quiz engine in HTML5. My current side projects are C++ iOS/Andriod apps, one with three of my collegues, and one independent. My first language (six years past) was Objective C, then I moved into Java, HTML5, C++, and Python. Of those languages, I like working in HTML5, C++, or Python the most. If you want a more in depth look into my recent job history, check out my resume or <a href=\"https://www.linkedin.com/in/stephoro\">LinkedIn</a>. If you want to see what I've done, check out <a href=\"#lab\">The Lab</a> for some cool stuff, or check out <a href=\"#apps\">my apps</a> to see what I've currently got on the market."]
			}, {
	title: "Contact",
	about: ["Email: <a href=\"mailto:stephenjoro@gmail.com\">stephenjoro@gmail.com</a>", "I'm on <a href=\"https://www.linkedin.com/in/stephoro\">LinkedIn</a> as well."]
		}]), new DisplaySet([{
	title: "My Apps",
	about: ["I develop apps, but also am working on products that run on all major platforms Windows, Mac, Linux, iOS, and Andriod using the C++ SDL2 Libraries. ", "My current team project – for the moment titled \"Project Cupcake\" – is an idle clicker type game of the same genre as Tiny Tower or Cookie Clicker. Although it's a work in progress, it makes use of my binary script object notation (BSON), which is an easy to write and parse representation of objects.", "My current independent project – Operator 12 – is a game that honors <a href=\"http://biomediaproject.com/bmp/files/LEGO/gms/online/Spybotics/TheNightfallIncident/\">The Nightfall Incident</a>, which is a classic that’s never had the sequel it deserves. I’ve seen a few people put forth worthy attempts to reproduce the game’s play, but there’s been no high-quality, well-made games in the same play style and I intend to fix that. My own creation is 90% complete, and is awaiting music composition and level design."]
}, {
	link: "https://appsto.re/us/QaTI9.i",
	title: "iPeters",
	about: ["The app that I made and maintain for St. Peter's Preparatory School, NJ. It features dynamic HTML5 content to provide access to the common tools needed by students and teachers alike."]
}, {
	link: "https://appsto.re/us/vPCS8.i",
	title: "Lizard Up",
	about: ["My latest game, Lizard Up. It's a fun and addicting little game where you play as a lizard trying to climb higher and collect shiny coins."]
}]), new DisplaySet([{
	title: "The Lab",
	about: ["Here are some of the cool little projects I've built ranked vaguely based on the coolness factor of each project. Essentially a curated view of my projects:"]
},{
	link: "https://stephoro.github.io/DrawingBook/",
	title: "Drawing Book",
	about: ["A fully functional web app for drawing and note taking, I use it to detail app ideas, or code concepts, as it contains infinite pages of infinite size. It saves using my binary script object notation (BSON) format."]
},{
	link: "http://thatfishgame.altervista.org/nmssky/",
	title: "Auto-Animated Scene",
	about: ["I made a javascript renderer that parses and displays the .sif animated file format! It's pretty cool in my opinion :) This is the no man sky's Atlas animated as a looping display. It changes colors cyclically over a very long period of time, but it should be aparent after five minutes. More examples of this engine appear later."]
},{
	link: "https://stephoro.github.io/LizardUp/",
	title: "Lizard Up",
	about: ["Not the app, but a web version of this lizard jumping game. Also add free with love <3"]
},{
	link: "http://thatfishgame.altervista.org/",
	title: "That Fish Game",
	about: ["A silly little game I threw together to showcase my sif animation engine. Catch ten fish and build a fish gun."]
},{
	link: "http://thatfishgame.altervista.org/lmaotank/",
	title: "The LMAO Tank",
	about: ["It's the sif engine again, but this time with an animated lmaotank - animated text!"]
}]),0];

window.onload = OnePage.load;