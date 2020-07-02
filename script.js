$(document).ready(function () {
    let tablesContainer = $('#tables');
    let tablesForMat = $('#tablesForMat');
    let result = $('.totalContainer');
    let prods = null;
    let mats = null;

    //create prod list
    $('.listToCreate').change(function () {
        let prodPrice = $(".listToCreate option:selected").data('price');
        let prodName = $(".listToCreate option:selected").val();
        tablesContainer.append(calcProdTables(prodName, prodPrice));
        $(this).parents('.calc-container').find('.totalContainer').removeClass('totalContainer');
        prods += 1;
        Check();
    });

    // create material list
    $('.matListToCreate').change(function () {
        let prodPrice = $(".matListToCreate option:selected").data('price');
        let prodName = $(".matListToCreate option:selected").val();
        tablesForMat.append(calcMatTables(prodName, prodPrice));
        $(this).parents('#calculator').find('.totalContainer').removeClass('totalContainer');
        mats += 1;
        Check();
    });

    //check if both containers are ready
    function Check() {
        if (prods > 0 && mats > 0 ) {
            $('#totalResultBtn').css('display', 'block')
        }
    }
    //create final results table
    $('#totalResultBtn').click(function () {
        $('.FinalResults').css('display', 'block')
    });

    // calc product sum
    $(document).on('keyup', '.prodWeight', function () {
        let prodPrice = $(this).parents('.box').find('.price-size input').data('pr');
        let prodWeigth = $(this).val();
        let total = prodPrice * prodWeigth;
        let prodTotalText = $(this).parents('.box').find('.prodTotal').val(total);
        let totalResultText = $('.totalResultText');
        let totalMatResultText = $('.totalMatResultText');
        let prodSum = 0;
        let matSum = 0;
        let allProdSum = $('.prodSum').each(function () {
            prodSum += Number($(this).val());
        });
        totalResultText.text(prodSum);
        let allMatSum = $('.matSum').each(function () {
            matSum += Number($(this).val());
        });
        totalMatResultText.text(matSum);
        setFinalSum(prodSum, matSum)
    });

    function setFinalSum(prodSum, matSum) {
        let prodFinalSum = $('.prodFinalSum');
        let matFinalSum = $('.matFinalSum');

        prodFinalSum.val(prodSum);
        matFinalSum.val(matSum)
    }

    $(document).on('keyup', '.setHours', function () {
        let setHours = $('.setHours');

        let hourState = setHours.data('hour');
        let getHours = $('.getHours');
        let setHoursNum = setHours.val();
        let setHoursVal = setHoursNum * hourState;
        getHours.val(setHoursVal);
    });

    function calcProdTables(prodName, prodPrice) {
        return `
           <div class="">
            <div class="flex box">
                <div class="table-style prod-size"><p>${prodName}</p></div>
                <div class="table-style price-size"><input type="text" id="" name="" value="${prodPrice + '$'}" data-pr="${prodPrice}" disabled></div>
                <div class="table-style weight-size"><input type="text" id="" name="" class="prodWeight" value="" placeholder="type weight"></div>
                <div class="table-style weight-size"><input type="text" id="" name="" class="prodWeight prodTotal prodSum" value="" placeholder="sum" disabled></div>
            </div>
           </div> 
        `
    }

    function calcMatTables(prodName, prodPrice) {
        return `
           <div class="">
            <div class="flex box">
                <div class="table-style prod-size"><p>${prodName}</p></div>
                <div class="table-style price-size"><input type="text" id="" name="" value="${prodPrice + '$'}" data-pr="${prodPrice}" disabled></div>
                <div class="table-style weight-size"><input type="text" id="" name="" class="prodWeight" value="" placeholder="type weight"></div>
                <div class="table-style weight-size"><input type="text" id="" name="" class="prodWeight prodTotal matSum" value="" placeholder="sum" disabled></div>
            </div>
           </div> 
         
        `
    }

});