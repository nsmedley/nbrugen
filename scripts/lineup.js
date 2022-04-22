var Players = [
    "Richie Annetts",
    "Lewis Armstrong",
    "Stephen Ashcroft",
    "Wez Ashton",
    "James Betts",
    "Tom Brie",
    "Jordan Burghall",
    "Joe Cardus",
    "Jack Charlesworth",
    "Phil Coggins",
    "Ben Comer",
    "Matthew Cook",
    "Kyle Cowin",
    "Alex Cran",
    "Jake Crawford",
    "Micheal Cropper",
    "Josh Dalton",
    "Vinny Dutton",
    "Sean Ellis",
    "Liam Ennis",
    "Craig Fowler",
    "Mike Gazzola",
    "Phil Gazzola",
    "Sam Gelling",
    "Barry Goodwin",
    "Conan Grehan",
    "Simon Harris",
    "Aaron Henshaw",
    "Alan Hesketh",
    "Daryl Holbrook",
    "Neil Hollingworth",
    "Matty Holmes-Ievers",
    "Aaron Jones",
    "Colin Jones",
    "Dan Kayll",
    "Ryan Kearney",
    "Craig Kelly",
    "Peter Lally",
];
var jsonUrl;
var opp;
var oppLogo;
var oppGround;
var date;
var imgSrc;

$(()=>{

    //Squad Selector
    $('#squadselect').change(function(){
        if($(this).val() == '1'){
            $('.lineup__generator--nb').html("New Brighton 1st XV");
            jsonUrl = 'json/1teams.json';
        } else if($(this).val() == '2'){
            $('.lineup__generator--squad').html("New Brighton 2nd XV");
            jsonUrl = 'json/2teams.json';
        } else if($(this).val() == 'colts'){
            $('.lineup__generator--squad').html("New Brighton Colts");
            jsonUrl = 'json/colts.json';
        }
    });

    //Home or Away Selector
    $('#homeOrAway').change(function(){
        if($(this).val() == 'Home'){
            $('.lineup__generator--nbcrest').removeClass('away').addClass('home');
            $('.lineup__generator--nb').removeClass('away').addClass('home');
            $('.lineup__generator--oppcrest').removeClass('home').addClass('away');
            $('.lineup__generator--opponent').removeClass('home').addClass('away');
            $('.lineup__generator--ground').html('Hartsfield');
        } else {
            $('.lineup__generator--nbcrest').removeClass('home').addClass('away');
            $('.lineup__generator--nb').removeClass('home').addClass('away');
            $('.lineup__generator--oppcrest').removeClass('away').addClass('home');
            $('.lineup__generator--opponent').removeClass('away').addClass('home');
            $('.lineup__generator--ground').html(oppGround);
        }
    });

    //Populate opponent teams
    $('#squadselect').change(function(){
        var dropdown = $('#oppositionteams');
        dropdown.empty();
        dropdown.append('<option selected="true" disabled>Choose opponent</option>');
        dropdown.prop('selectedIndex', 0);
        // Populate dropdown with list of teams
        $.getJSON(jsonUrl, function (data) {
            $.each(data, function (key, entry) {
                dropdown.append($('<option></option>').attr('value', entry.teamName).text(entry.teamName).attr('data-ground', entry.teamGround).attr('data-logo', entry.teamLogo).attr('data-squad', entry.teamSquad));
            })
        });
    });

    //Opponent select
    $('#oppositionteams').change(function(){
        opp = $(this).val();
        oppLogo = $(this).find(':selected').data('logo');
        oppGround = $(this).find(':selected').data('ground');
        oppSquad = $(this).find(':selected').data('squad');

        $('.lineup__generator--opponent').html(opp + " " + oppSquad);
        $('.lineup__generator--oppcrest img').attr("src", oppLogo);
        if($('#homeOrAway').val() == 'Away'){
            $('.lineup__generator--ground').html(oppGround);
        }

        setTimeout(function() { 
            html2canvas($(".lineup__generator")[0]).then((canvas) => {
                $(".lineup__preview canvas").remove();
                $(".lineup__preview").append(canvas);
            });
        }, 800);
    });

    //Set Date
    $("#datepicker").datepicker({
        dateFormat: 'D ds M',
        firstDay: 1,
        onSelect: function(dateText, inst) {
            var arrOrd = new Array('0','st','nd','rd','th','th','th','th','th','th','th','th','th','th','th','th','th','th','th','th','th','st','nd','rd','th','th','th','th','th','th','th','st');
            var day = Number(inst.selectedDay);
            var suffix = arrOrd[day];       
            $(this).val($(this).val().replace(inst.selectedDay+"s",inst.selectedDay+suffix));

            date = $("#datepicker").val() + " - " + $("#timepicker").val()

            $(".lineup__generator--date").html(date);

            html2canvas($(".lineup__generator")[0]).then((canvas) => {
                $(".lineup__preview canvas").remove();
                $(".lineup__preview").append(canvas);
            });
        }
    });

    //Set Time
    $('#timepicker').timepicker({
        timeFormat: 'H:mm',
        interval: 15,
        minTime: '10',
        maxTime: '8:00pm',
        startTime: '20:15',
        dynamic: false,
        dropdown: true,
        scrollbar: true,

        change: function(time) {
            var timepicker = $(this).timepicker();
            date = $("#datepicker").val() + " - " + $("#timepicker").val()
            $(".lineup__generator--date").html(date);

            html2canvas($(".lineup__generator")[0]).then((canvas) => {
                $(".lineup__preview canvas").remove();
                $(".lineup__preview").append(canvas);
            });
        }
    });

    //Set Date and time together
    $('#datepicker, #timepicker').change(function(){
        date = $("#datepicker").val() + " - " + $("#timepicker").val()
        $(".lineup__generator--date").html(date);
    });
    
    //Autocomplete function for players
    $("#playerName").autocomplete({
        source: Players
    });

    //Add Player function
    $(".addPlayer").click(function() { 
        var player = $(".playingPos").val() + ". " + $(".playerName").val();
        
        //Add players to session storage
        //Check if youth player
        if ($('#youthPlayer').is(':checked')) {
            sessionStorage.setItem($(".playingPos").val(), $(".playingPos").val() + ". " + $(".playerName").val() + "<span class='youthPlayer'></span>");
        } else {
            sessionStorage.setItem($(".playingPos").val(), $(".playingPos").val() + ". " + $(".playerName").val());
        }

        //Add players to image from sessionstorage
            //remove exsisting entries
            $(".lineup__generator__player ").remove();
            //loop through session and add players
            for (const [key, value] of Object.entries(sessionStorage)) {
                $('.lineup__generator').prepend('<div class="lineup__generator__player lineup__generator__player--' + key + '">' + value + '</div>' );
            }

            html2canvas($(".lineup__generator")[0]).then((canvas) => {
                $(".lineup__preview canvas").remove();
                $(".lineup__preview").append(canvas);
            });
    });

    //Generate image and download
    $(".lineup__options__input--download").on( "click", function() {
        html2canvas(document.querySelector(".lineup__generator")).then(canvas => {
            canvas.toBlob(function(blob) {
                window.saveAs(blob, 'matchLineup.jpg');
            });
        });
    });

});