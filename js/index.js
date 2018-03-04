//Toltip footer y manejo del navbar con scroll

$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

$(window).scroll(function () {
    var scroll = $(window).scrollTop();

    if (scroll >= 100) {
        $(".top-nav").addClass("light-header");
    } else {
        $(".top-nav").removeClass("light-header");
    }
});


//Dialog

$(function () {
    $("#dialog").dialog({
        autoOpen: false,
        resizable: false,
        height: "auto",
        show: {
            effect: "fold",
            duration: 1000
        },
        buttons: {
            "Aceptar": function () {
                $("#dialog").dialog({
                    hide: {
                        effect: "clip",
                        duration: 2000
                    }
                });
                $(this).dialog("close");
            },
            Cancelar: function () {
                $("#dialog").dialog({
                    hide: {
                        effect: "explode",
                        duration: 2000
                    }
                });
                $(this).dialog("close");

            }
        }
    });

    $("#dialog-limpiar").dialog({
        autoOpen: false,
        resizable: false,
        height: "auto",
        show: {
            effect: "scale",
            duration: 1000
        },

        hide: {
            effect: "slide",
            duration: 1000
        },
        buttons: {
            "Aceptar": function () {
                $(this).dialog("close");
            }
        }


    });

    $("#opener-limpiar").on("click", function () {
        $("#dialog-limpiar").dialog("open");
    });


    $("#opener").on("click", function () {
        $("#dialog").dialog("open");
    });

});

//Cambiar theme

$("#light").click(function () {
    if ($('#estilos').attr("href") != 'themes/light/jquery-ui.css') {
        $('#estilos').attr("href", "themes/light/jquery-ui.css");
        $('#info').text('Tema actual: Light')
    }
});

$("#dark").click(function () {
    if ($('#estilos').attr("href") != 'themes/darkness/jquery-ui.css') {
        $('#estilos').attr("href", "themes/darkness/jquery-ui.css");
        $('#info').text('Tema actual: Dark')
    }
});

$("#flick").click(function () {
    if ($('#estilos').attr("href") != 'themes/flick/jquery-ui.css') {
        $('#estilos').attr("href", "themes/flick/jquery-ui.css");
        $('#info').text('Tema actual: Flick')
    }
});

$("#custom").click(function () {
    if ($('#estilos').attr("href") != 'themes/custom/jquery-ui.css') {
        $('#estilos').attr("href", "themes/custom/jquery-ui.css");
        $('#info').text('Tema actual: Custom')
    }
});

//Cambiar el idioma de datepicker

(function (factory) {
    if (typeof define === "function" && define.amd) {

        // AMD. Register as an anonymous module.
        define(["../widgets/datepicker"], factory);
    } else {

        // Browser globals
        factory(jQuery.datepicker);
    }
}(function (datepicker) {

    $.datepicker.regional['es'] = {
        closeText: 'Cerrar',
        prevText: '< Ant',
        nextText: 'Sig >',
        currentText: 'Hoy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
        dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
        weekHeader: 'Sm',
        dateFormat: 'dd/mm/yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };
    datepicker.setDefaults(datepicker.regional.es);

    return datepicker.regional.es;

}));

$(function () {

    //Controlgroup iniciado

    $(".widget").controlgroup();

    //-------------------

    $.datepicker.setDefaults($.datepicker.regional["es"]);
    var dateFormat = "dd/mm/yy",
        from = $("#fecha2example,#fechaexample")
            .datepicker({
                defaultDate: "+1w",
                showButtonPanel: true,
                numberOfMonths: 2,
                dateFormat: dateFormat
            })
            .on("change", function () {
                to.datepicker("option", "minDate", getDate(this));
            }),
        to = $("#calfin").datepicker({
            defaultDate: "+1w",
            changeMonth: true,
            numberOfMonths: 2,
            dateFormat: dateFormat
        })
            .on("change", function () {
                from.datepicker("option", "maxDate", getDate(this));
            });

    function getDate(element) {
        var date;
        try {
            date = $.datepicker.parseDate(dateFormat, element.value);
        } catch (error) {
            date = null;
        }

        return date;
    }

    $("#fecha2example").datepicker();
    $("#fechaexample").datepicker();


    //Peticiones ajax

    $(function () {
        $("#heroeexample").autocomplete({
            source: function (request, response) {
                $.ajax({
                    url: 'https://gateway.marvel.com/v1/public/characters?nameStartsWith=' + $('#heroeexample').val() + '&apikey=c16ce023e325ddf234fedcfa8c240ab8&ts=9&hash=544c93cc95c797fa8b665a6aa5a8a5e5',
                    dataType: "json",
                    type: 'get',
                    success: function (data) {
                        let array = [];
                        for (var x = 0; x < data.data.results.length; x++) {
                            array.push(data.data.results[x].name);
                        }
                        console.log(array);
                        response(array);

                    }
                });
            },
            minLength: 1
        });
    });

    let arrayMakes = [];
    let arraymodels = [];

    $.ajax({
        url: 'https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getMakes&sold_in_us=1',
        dataType: "jsonp",
        type: 'get',
        crossDomain: true,
        success: function (data) {
            var resultados = data.Makes.map(function (x) {
                arrayMakes.unshift(x.make_id);
            });

        }
    });

    $("#marcaexample").autocomplete({
        source: arrayMakes,
        minLength: 1
    });

    function ObtenerModelos() {
        $.ajax({
            url: 'https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getModels&make=' + $("#marcaexample").val() + '&sold_in_us=1',
            dataType: "json",
            type: 'get',
            success: function (data) {
                console.log(data.Models);

                var resultados = data.Models.map(function (x) {
                    arraymodels.unshift(x.model_name);
                });
                console.log(arraymodels);
            }
        });
    }

    $("#modexample").autocomplete({
        source: arraymodels,
        minLength: 1
    });


    $("#marcaexample").change(function () {
        ObtenerModelos();
    });


});
