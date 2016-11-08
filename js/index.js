$(document).ready(function(){
    $(".button-collapse").sideNav();
    var streamers = ['freecodecamp', 'esl_sc2', 'comster404', 'ogamingsc2', 'cretetion', 'storbeck', 'habathcx', 'robotcaleb', 'noobs2ninjas', 'loltyler1', 'freaken_rican', 'brunofin'];
    var apiURL = "https://api.twitch.tv/kraken/streams?client_id=j6rg8fuur9h606pyrsy9t75rzh1tyqp&channel=" + streamers.join(',');   
    var user = '';
    console.log(apiURL);

    $.getJSON(apiURL, function(streamData){       
        var online =[];
        var offline = [];
        var deleted = [];

        for(var i=0; i<streamData._total; i++){
            var streamerName = streamData.streams[i].channel.display_name.toLowerCase();
            online.push(streamerName);}
        for(var j=0; j<streamers.length;j++){
            
            if(online.indexOf(streamers[j]) === -1) {offline.push(streamers[j])};
            var apiURL2 = 'https://api.twitch.tv/kraken/channels/' + streamers[j] + '?client_id=j6rg8fuur9h606pyrsy9t75rzh1tyqp';
            // Used .ajax call because .getJSON does not have an error field to filter 404s, aka invalid users            
            $.ajax({
                url: apiURL2,
                error: function(){
                    deleted.push(streamers[j]);
                },
                async: false

            });

        }
        var onlineStatus = [];
        for (var a=0; a<streamData._total; a++){
        onlineStatus.push(streamData.streams[a].channel.status);
        }

        getStreamer(streamers, online, onlineStatus, deleted);
        $('.all').on('click', function(){ getStreamer(streamers, online, onlineStatus, deleted); });
        $('.online').on('click', function(){ getStreamer(online, online, onlineStatus, deleted); });
        $('.offline').on('click', function(){ getStreamer(offline, online, onlineStatus, deleted); });
    });
});

function getStreamer(streamType, onlineData, status, deleted){
    var html = '';

    for(var q=0; q<streamType.length; q++){
        html += "<a class= 'collection-item' href='http://www.twitch.tv/" + streamType[q] +"' target='_blank'><span class='title'>" + streamType[q].toUpperCase() + "</span>";

        for(var a=0; a<onlineData.length; a++){
            if(streamType[q] === onlineData[a]){
                 html += "<span class='secondary-content'>" + status[a] + "<span class='onlineIndicator'>&#9679;</span></span></a>";
            }

        }
        for(var d=0;d<deleted.length; d++){
            if(streamType[q] === deleted[d]){
                html += "<span class='secondary-content'>" + "INVALID " + "<span class='errorIndicator'>&#9679;</span></span></a>";
                $(this).css("border", "5px solid red");
            }     
        }
    }


    $('.collection').html(html);
}