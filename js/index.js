$(document).ready(function(){
    var streamers = ['goldglove', 'a93_', 'c9sneaky', 'lol_peanut', 'kdjg', 'calebhart42', 'unlckyme', 'eyes1015', 'delordione'];
    var apiURL = "https://api.twitch.tv/kraken/streams?client_id=j6rg8fuur9h606pyrsy9t75rzh1tyqp&channel=" + streamers.join(',');   

    console.log(apiURL);

    $.getJSON(apiURL, function(data){
        showStreamers(online);
        var online =[];
        var offline = [];
        for(var i=0; i< data._total; i++){
            var streamerName = data.streams[i].channel.display_name.toLowerCase();
            online.push(streamerName);
        }
        for(var x=0; x<streamers.length;x++){
            if(online.indexOf(streamers[x]) === -1) offline.push(streamers[x]);
        }

        $('.all').on('click',function(){
          showStreamers(streamers, data, "all");
        });
        $('.online').on('click',function(){
          showStreamers(online, data, "online");
        });
        $('.offline').on('click',function(){
          showStreamers(offline, data, "offline");
        });

    });
});

function showStreamers(streamType, data, streamStatus){
    var html='';

    console.log(streamType);
    for (var p=0;p<streamType.length; p++){
        html += "<div class='item'> " + streamType[p] + "</div>";

          if(streamStatus==="online"){
             $('.item').addClass("onlineItem");
             $('#rightPane > div').css('background-color','red');
             console.log(data.streams[p].preview.large);
          }

     }
    $('#rightPane').html(html);

}