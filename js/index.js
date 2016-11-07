$(document).ready(function(){
    var streamers = ['goldglove', 'a93_', 'c9sneaky', 'lol_peanut', 'kdjg', 'calebhart42', 'unlckyme', 'eyes1015', 'delordione'];
    var html="";
    var apiURL = "https://api.twitch.tv/kraken/streams?client_id=j6rg8fuur9h606pyrsy9t75rzh1tyqp&channel=" + streamers.join(',');   

    console.log(apiURL);

    $.getJSON(apiURL, function(data){
        var online =[];
        var offline = [];
        for(var i=0; i< data._total; i++){
        var streamerName = data.streams[i].channel.display_name.toLowerCase();
            if(streamerName !== undefined){
                if(streamers.includes(streamerName)){
                    online.push(streamerName);
                }
            }
        }
        for(var x=0; x<streamers.length;x++){
            if(online.indexOf(streamers[x]) === -1) {
                offline.push(streamers[x]);
            }
            html += "<div class='item'> " + streamers[x] + "</div>";
            $('#rightPane').html(html);

        }

        console.log("ONLINE: " + online);
        console.log("OFFLINE: "+ offline);
    });
});