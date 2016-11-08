$(document).ready(function(){
    $(".button-collapse").sideNav();
    var streamers = ['goldglove', 'proteqtv', 'c9sneaky', 'freaken_rican', 'lagmarine10', 'calebhart42', 'unlckyme', 'eyes1015', 'delordione', 'freecodecamp', 'food'];
    var apiURL = "https://api.twitch.tv/kraken/streams?client_id=j6rg8fuur9h606pyrsy9t75rzh1tyqp&channel=" + streamers.join(',');   
    var user = '';
    console.log(apiURL);

    $.getJSON(apiURL, function(streamData){       
        var online =[];
        var offline = [];

        for(var i=0; i<streamData._total; i++){
            var streamerName = streamData.streams[i].channel.display_name.toLowerCase();
            online.push(streamerName);}
        for(var j=0; j<streamers.length;j++)
            if(online.indexOf(streamers[j]) === -1) offline.push(streamers[j]);

        var onlineStatus = [];
        for (var a=0; a<streamData._total; a++){
        onlineStatus.push(streamData.streams[a].channel.status);
        }

        getStreamer(streamers, online, onlineStatus);

        $('.all').on('click', function(){ getStreamer(streamers, online, onlineStatus); });
        $('.online').on('click', function(){ getStreamer(online, online, onlineStatus); });
        $('.offline').on('click', function(){ getStreamer(offline, online, onlineStatus); });
    });
});

function getStreamer(streamType, onlineData, status){
    var html = '';
    console.log(status);
    for(var q=0; q<streamType.length; q++){
        html += "<a class= 'collection-item' href='http://www.twitch.tv/" + streamType[q] +"' target='_blank'><span class='title'>" + streamType[q].toUpperCase() + "</span>";

        for(var r=0; r<onlineData.length;r++){
            if(onlineData.includes(streamType[q])){
                if(onlineData[r] === streamType[q]){
                    html += "<span class='secondary-content'>" + status[r] + "<span class='onlineIndicator'>&#9679;</span></span></a>";
                }
            }
            else {
            html += "</a>";
            }
        }
    }
    $('.collection').html(html);
}