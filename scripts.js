
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

        //Update preview image
        html2canvas($("#hiddenPreview")[0]).then((canvas) => {
            $("#previewImage").append(canvas);
        });
    });


    //Datepicker
    $("#date").datepicker({
        dateFormat: "D d M yy",
    });

    //Update Logo
    $(':input[type=file]').change( function(event) {
        var tmppath = URL.createObjectURL(event.target.files[0]);
        //get parent using closest and then find img element
        $(".logo").attr('src',tmppath);
    });

    //Download Button
    $("#download").click(function() {
        html2canvas(document.querySelector(".hiddenPreview")).then(canvas => {
            canvas.toBlob(function(blob) {
                window.saveAs(blob, 'match.jpg');
            });
        });
    });

});