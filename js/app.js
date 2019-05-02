//  When document is loaded run JS Code.
$(document).ready(function () {

    //Get all captions in an array
    const captionsArr = [];
    $('.image-container').each(function () {
        captionsArr.push($(this).find('a').attr('data-title'));
    });

    // Edit lightbox
    lightbox.option({
        maxWidth: 1000,
        showImageNumberLabel: false,
        fitImagesInViewport: true,
        alwaysShowNavOnTouchDevices: true,
        positionFromTop: 100,
    });


    // Listen to click on parent container
    $('body').on('click', '.image-container', function () {
        // Find anchor tag and get its href value
        let val = $(this).find('a').attr('href');
        //Select anchor with href value and trigger
        $('a[href="' + val + '"]').trigger('click');
    });

    $(".search-box").keyup(function (event) {
        let searchBoxVal = ($('.search-box').val());
        const imgIndexArr = {
            hidden: [],
            visible: []
        }
        //Sort out elements in array that include searchBoxVal
        for (let i = 0; i < captionsArr.length; i++) {
            if ((captionsArr[i].toLowerCase()).indexOf(searchBoxVal.toLowerCase()) === -1) {
                imgIndexArr.hidden.push(i);
            } else {
                imgIndexArr.visible.push(i);
            }
        }
        //Make all images in hidden array invisible
        for (let i = 0; i < imgIndexArr.hidden.length; i++) {
            $('.image-container').eq(imgIndexArr.hidden[i]).hide();
            //Remove "images"from data-lightbox attribute from anchor tag
            $('.image-container').eq(imgIndexArr.hidden[i]).find('a').attr('data-lightbox', "hidden");
        }
        //Display all images in visible array 
        for (let i = 0; i < imgIndexArr.visible.length; i++) {
            $('.image-container').eq(imgIndexArr.visible[i]).show();
            //Add 'images" to data-lightbox to visible images 
            $('.image-container').eq(imgIndexArr.visible[i]).find('a').attr('data-lightbox', "images");
        }
    });
});