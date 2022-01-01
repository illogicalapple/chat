var ably = new Ably.Realtime("p7omrg.j5cIZw:PQIh52fSUKb_sRfyiBGXGhNzg-JQE0Fjp2PYMrx56EY");
var channel = ably.channels.get("general");
var name = "Person";
function escape(stuf) {
	return String(stuf).split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;").split("").join(":");
}
channel.subscribe("stuf", function(message) {
	console.log(message);
	let thing = document.createElement("div");
	let user = document.createElement("strong");
	let content = document.createElement("span");
	user.innerText = "@" + escape(message.data.split(":")[0]) + ": ";
	content.innerText = escape(message.data.split(":")[1]);
	thing.appendChild(user);
	thing.appendChild(content);
	document.querySelector("div.messages").appendChild(thing);
});
addEventListener("load", function() {
	function enter(event) {
		if(event.key == "Enter" && document.querySelector("input").value !== "") {
			channel.publish("stuf", escape(name).replace(":", "") + ":" + escape(document.querySelector("input").value).replace(":", ""));
			document.querySelector("input").value = "";
		}
	}
	document.querySelector("main input").addEventListener("keydown", enter);
});
