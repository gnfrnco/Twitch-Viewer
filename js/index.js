$(document).ready(function(){
    $(".button-collapse").sideNav();
    var streamers = ['goldglove', 'proteqtv', 'c9sneaky', 'freaken_rican', 'lagmarine10', 'calebhart42', 'unlckyme', 'eyes1015', 'delordione', 'freecodecamp', 'food'];
    var apiURL = "https://api.twitch.tv/kraken/streams?client_id=j6rg8fuur9h606pyrsy9t75rzh1tyqp&channel=" + streamers.join(',');   

    console.log(apiURL);

    $.getJSON(apiURL, function(data){       
        var online =[];
        var offline = [];

        for(var i=0; i<data._total; i++){
            var streamerName = data.streams[i].channel.display_name.toLowerCase();
            online.push(streamerName);}
        for(var j=0; j<streamers.length;j++)
            if(online.indexOf(streamers[j]) === -1) offline.push(streamers[j]);
        
        $('.all').on('click', function(){ getStreamer(streamers, data); });
        $('.online').on('click', function(){ getStreamer(online, data); });
        $('.offline').on('click', function(){ getStreamer(offline, data); });
    });

});

function getStreamer(streamType, data){
    var html = '';
    for(var q=0; q<streamType.length; q++){
        html += "<a class= 'collection-item avatar'><img src='https://static-cdn.jtvnw.net/jtv_user_pictures/freaken_rican-profile_image-2de8e465b814688a-300x300.jpeg' class='circle'>" + streamType[q] + "<span class='title'>Climbing to diamond</span><br><p>hello</p></a>";
        //html += "<p><div class='chip'>" + streamType[q] + "</div></p>";

        //https://api.twitch.tv/kraken/users/a93_?client_id=j6rg8fuur9h606pyrsy9t75rzh1tyqp <--- to get the user avatar
    }
    $('.collection').html(html);
}