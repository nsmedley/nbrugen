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
            $('.match__generator--squad').html("1st XV");
            $('.match__generator--divison').html("ADM Championship");
            jsonUrl = '../json/1teams.json';
        } else if($(this).val() == '2'){
            $('.match__generator--squad').html("2nd XV");
            $('.match__generator--divison').html("NOWIRUL Division 4 West");
            jsonUrl = 'json/2teams.json';
        } else if($(this).val() == 'colts'){
            $('.match__generator--squad').html("Colts");
            jsonUrl = 'json/colts.json';
        }
    });

    //Home or Away Selector
    $('#homeOrAway').change(function(){
        if($(this).val() == 'Home'){
            $('.match__generator--nbcrest').removeClass('away').addClass('home');
            $('.match__generator--nb').removeClass('away').addClass('home');
            $('.match__generator--oppcrest').removeClass('home').addClass('away');
            $('.match__generator--opponent').removeClass('home').addClass('away');
            $('.match__generator--ground').html('Hartsfield');
        } else {
            $('.match__generator--nbcrest').removeClass('home').addClass('away');
            $('.match__generator--nb').removeClass('home').addClass('away');
            $('.match__generator--oppcrest').removeClass('away').addClass('home');
            $('.match__generator--opponent').removeClass('away').addClass('home');
            $('.match__generator--ground').html(oppGround);
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
                dropdown.append($('<option></option>').attr('value', entry.teamName).text(entry.teamName).attr('data-ground', entry.teamGround).attr('data-logo', entry.teamLogo));
            })
        });
    });

    //Set league if changed
    $('input.league').on('input',function(){
        $('.match__generator--divison').html($(this).val());

        html2canvas($(".match__generator")[0]).then((canvas) => {
            $(".match__preview canvas").remove();
            $(".match__preview").append(canvas);
        });
    });

    //Opponent select
    $('#oppositionteams').change(function(){
        opp = $(this).val();
        oppLogo = $(this).find(':selected').data('logo');
        oppGround = $(this).find(':selected').data('ground');

        $('.match__generator--opponent').html(opp);
        $('.match__generator--oppcrest img').attr("src", oppLogo);
        if($('#homeOrAway').val() == 'Away'){
            $('.match__generator--ground').html(oppGround);
        }

        setTimeout(function() { 
            html2canvas($(".match__generator")[0]).then((canvas) => {
                $(".match__preview canvas").remove();
                $(".match__preview").append(canvas);
            });
        }, 800);
    });

    //Set Date
    $("#datepicker").datepicker({
        dateFormat: 'D d M yy',
        firstDay: 1,
        onSelect: function(dateText) {
            date = $("#datepicker").val() + " - " + $("#timepicker").val()
            $(".match__generator--date").html(date);

            html2canvas($(".match__generator")[0]).then((canvas) => {
                $(".match__preview canvas").remove();
                $(".match__preview").append(canvas);
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
            $(".match__generator--kickoff").html($("#timepicker").val() + " KO");
            date = $("#datepicker").val() + " - " + $("#timepicker").val()
            $(".match__generator--date").html(date);

            html2canvas($(".match__generator")[0]).then((canvas) => {
                $(".match__preview canvas").remove();
                $(".match__preview").append(canvas);
            });
        }
    });

    //Set Date and time together
    $('#datepicker, #timepicker').change(function(){
        date = $("#datepicker").val() + " - " + $("#timepicker").val()
        $(".match__generator--date").html(date);
    });

    //Select player picture
    $('#playerPicture').change(function(){
        imgSrc = $(this).find(':selected').data('src');
        $('.match__generator--picture').attr("src", imgSrc);


        html2canvas($(".match__generator")[0]).then((canvas) => {
            $(".match__preview canvas").remove();
            $(".match__preview").append(canvas);
        });
    });

    //Generate image and download
    $(".match__options__input--download").on( "click", function() {
        html2canvas(document.querySelector(".match__generator")).then(canvas => {
            canvas.toBlob(function(blob) {
                window.saveAs(blob, 'my_image.jpg');
            });
        });
    });

    //Update preview image
    $('select').on('change', function (e) {
        html2canvas($(".match__generator")[0]).then((canvas) => {
            $(".match__preview canvas").remove();
            $(".match__preview").append(canvas);
        });
    });

    //Sort
    $.fn.extend({
        sortSelect() {
            let options = this.find("option"),
                arr = options.map(function(_, o) { return { t: $(o).text(), v: o.value }; }).get();
    
            arr.sort((o1, o2) => { // sort select
                let t1 = o1.t.toLowerCase(), 
                    t2 = o2.t.toLowerCase();
                return t1 > t2 ? 1 : t1 < t2 ? -1 : 0;
            });
    
            options.each((i, o) => {
                o.value = arr[i].v;
                $(o).text(arr[i].t);
            });
        }
    });
});