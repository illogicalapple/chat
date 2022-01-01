var ably = new Ably.Realtime("p7omrg.j5cIZw:PQIh52fSUKb_sRfyiBGXGhNzg-JQE0Fjp2PYMrx56EY");
var channel = ably.channels.get("general");
function escape(stuf) {
	return String(stuf).split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;")
}
channel.subscribe("stuf", function(message) {
	alert(message);
	let thing = document.createElement("div");
	let user = document.createElement("strong");
	let content = document.createElement("span");
	user.innerText = "@" + escape(message.split(":")[0]) + ":&nbsp;";
	content.innerText = escape(message.split(":")[1]);
	thing.appendChild(user);
	thing.appendChild(content);
	document.querySelector("div.messages").appendChild(thing);
});
