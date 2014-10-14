$(document).ready(function() {
    $('#createEventForm input').on('change', function() {
        var selectedType = $('input[name="eventType"]:checked', '#createEventForm').val();
        if( selectedType == 0)
        {
            $('#initiativeEvent').addClass('hidden');
            $('#seasonEvent').addClass('hidden');

        }else if( selectedType == 1)
        {
            $('#seasonEvent').addClass('hidden');
            $('#initiativeEvent').removeClass('hidden');
        }
        else
        {
            $('#initiativeEvent').addClass('hidden');
            $('#seasonEvent').removeClass('hidden');
        }
    });
});