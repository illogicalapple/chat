var ably = new Ably.Realtime("p7omrg.j5cIZw:PQIh52fSUKb_sRfyiBGXGhNzg-JQE0Fjp2PYMrx56EY");
var channel = ably.channels.get("general");
channel.subscribe("stuf", function(message) {
	alert(message.data);
});
