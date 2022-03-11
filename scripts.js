
$(function() {

    //Generate Button
    $("#generate").click(function() {
        $(".squad").html($("#squad").val());
        $(".TeamName").html($("#TeamName").val());
        $(".details--League").html($("#league").val());
        $(".details--Date").html($("#date").val());
        $(".details--Ground").html($("#ground").val());
        $(".kickOff").html($("#kickOff").val());


        //Home or Away picker
        if ($('input[name=homeaway]:checked').val() == "home") {
            $('.NBTeam').removeClass("TeamName--away").addClass("TeamName--home");
            $('.TeamName').addClass("TeamName--away");
            $('.NBTeam').css('display', 'flex');

            $('.NBTeamLogo').removeClass("TeamLogoContainer--away").removeClass("TeamLogoContainer--home").addClass("TeamLogoContainer--home");
            $('.OtherTeamLogo').removeClass("TeamLogoContainer--home").removeClass("TeamLogoContainer--away").addClass("TeamLogoContainer--away");
            $('.NBTeamLogo').css('display', 'flex');
        } else if ($('input[name=homeaway]:checked').val() == "away") {
            $('.NBTeam').removeClass("TeamName--home").addClass("TeamName--away");
            $('.TeamName').removeClass("TeamName--away").addClass("TeamName--home");
            $('.NBTeam').css('display', 'flex');

            $('.NBTeamLogo').removeClass("TeamLogoContainer--away").removeClass("TeamLogoContainer--home").addClass("TeamLogoContainer--away");
            $('.OtherTeamLogo').removeClass("TeamLogoContainer--away").removeClass("TeamLogoContainer--home").addClass("TeamLogoContainer--home");
            $('.NBTeamLogo').css('display', 'flex');
        }

    });


    //Datepicker
    $("#date").datepicker({
        dateFormat: "D d M yy",
    });

    //Download Button
    $("#download").click(function() {
        html2canvas(document.querySelector(".liveview")).then(canvas => {
            canvas.toBlob(function(blob) {
                window.saveAs(blob, 'match.jpg');
            });
        });
    });

});