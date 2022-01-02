var ably = new Ably.Realtime("p7omrg.j5cIZw:PQIh52fSUKb_sRfyiBGXGhNzg-JQE0Fjp2PYMrx56EY");
var channel = ably.channels.get("general");
var name = "Person";
var notifs = Notification.permission == "granted";
function escape(stuf) {
	return String(stuf).split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
channel.subscribe("stuf", function(message) {
	console.log(message);
	let thing = document.createElement("div");
	let user = document.createElement("strong");
	let content = document.createElement("span");
	user.innerText = "@" + message.data.split(":")[0].replace("", ":") + ": ";
	content.innerText = message.data.split(":")[1].replace("", ":");
	thing.appendChild(user);
	thing.appendChild(content);
	document.querySelector("div.messages").appendChild(thing);
	document.querySelector("main").scroll({
		top: document.querySelector("main").scrollHeight,
		behavior: "smooth"
	});
	if(notifs && document.visibilityState !== "visible") {
		let notification = new Notification("New message", {
			body: user.innerText + content.innerText,
			icon: "/apple.png"
		});
	}
});
addEventListener("load", function() {
	if(!notifs) {
		Notification.requestPermission().then(function(result) {
			notifs = result == "granted";
			if(notifs) {
				let notification = new Notification("Hi there!", {
					body: "This is a notification.",
					icon: "/apple.png"
				});
			}
		});
	}
	function enter(event) {
		if(event.key == "Enter" && document.querySelector("input.chat").value !== "") {
			channel.publish("stuf", name.replaceAll(":", "") + ":" + document.querySelector("input.chat").value.replaceAll(":", ""));
			document.querySelector("input.chat").value = "";
		}
	}
	function changeName(event) {
		if(document.querySelector("input.name").value !== "") {
			name = event.target.value;
		}
	}
	document.querySelector("main input.chat").addEventListener("keydown", enter);
	document.querySelector("main input.name").addEventListener("change", changeName);
});
