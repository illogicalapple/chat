var ably = new Ably.Realtime("p7omrg.j5cIZw:PQIh52fSUKb_sRfyiBGXGhNzg-JQE0Fjp2PYMrx56EY");
var channel = ably.channels.get("general");
var name = "Person";
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
});
addEventListener("load", function() {
	function enter(event) {
		if(event.key == "Enter" && document.querySelector("input.chat").value !== "") {
			channel.publish("stuf", name.replace(":", "") + ":" + document.querySelector("input.chat").value.replace(":", ""));
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
