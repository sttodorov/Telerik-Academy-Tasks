$(document).ready(function() {
    $('#add-initiative').on('click', function() {
        var form = $('#form-register');

        var count = form.children('select').length;

        var selectInitiatievs = $('<select></select>');
        selectInitiatievs.attr('name', 'initiative_' + count/2);
        selectInitiatievs.attr('class', 'form-control');

        var kidsAcademyOption = $('<option>Kids Academy</option>');
        kidsAcademyOption.attr('value','Kids Academy');

        var algoAcademyOption = $('<option>Algo Academy</option>');
        algoAcademyOption.attr('value','Algo Academy');

        var schoolAcademyOption = $('<option>School Academy</option>');
        schoolAcademyOption.attr('value','School Academy');

        var softwareAcademyOption = $('<option>Software Academy</option>');
        softwareAcademyOption.attr('value','Software Academy');

        selectInitiatievs.append(softwareAcademyOption);
        selectInitiatievs.append(kidsAcademyOption);
        selectInitiatievs.append(algoAcademyOption);
        selectInitiatievs.append(schoolAcademyOption);

        var selectYear= $('<select></select>');
        selectYear.attr('name', 'initiativeYear_' + count/2);
        selectYear.attr('class', 'form-control');

        var start2010 = $('<option>Start 2010</option>');
        start2010.attr('value','2010');
        var start2011 = $('<option>Start 2011</option>');
        start2011.attr('value','2011');
        var start2012 = $('<option>Start 2012</option>');
        start2012.attr('value','2012');
        var start2013 = $('<option>Start 2013</option>');
        start2013.attr('value','2013');

        selectYear.append(start2010);
        selectYear.append(start2011);
        selectYear.append(start2012);
        selectYear.append(start2013);


        form.append($('<br />'))
            .append(selectInitiatievs)
            .append($('<br />'))
            .append(selectYear);
    });
    $('#add-link').on('click', function() {
        var form = $('#form-register');
        var count = form.children('input[placeholder="Social Link"]').length;

        var inputSocialLink = $('<input />');
        inputSocialLink.attr('type', 'text');
        inputSocialLink.attr('name', 'socialLink_'+ count);
        inputSocialLink.attr('placeholder', 'Social Link');
        inputSocialLink.attr('class', 'form-control');

        form.append($('<br />')).append(inputSocialLink).append($('<br />'));
    });
});