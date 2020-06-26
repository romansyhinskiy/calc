$(document).ready(function () {
    let tablesContainer = $('#tables');
    let tablesForMat = $('#tablesForMat');
    let result = $('.totalContainer');

    //create prod list
    $('.listToCreate').change(function () {
        let prodPrice = $(".listToCreate option:selected").data('price');
        let prodName = $(".listToCreate option:selected").val();
        tablesContainer.prepend(calcProdTables(prodName, prodPrice));
        $(this).parents('.calc-container').find('.totalContainer').removeClass('totalContainer')
    });
    // create material list
    $('.matListToCreate').change(function () {
        let prodPrice = $(".matListToCreate option:selected").data('price');
        let prodName = $(".matListToCreate option:selected").val();
        tablesForMat.prepend(calcMatTables(prodName, prodPrice));
        $(this).parents('#calculator').find('.totalContainer').removeClass('totalContainer')

    });
    // calc product sum
    $(document).on('keyup', '.prodWeight', function() {
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
        })
        totalResultText.text(prodSum)
        let allMatSum = $('.matSum').each(function () {
            matSum += Number($(this).val());
        })
        totalMatResultText.text(matSum)
        setFinalSum(prodSum, matSum)
    });

    function setFinalSum(prodSum, matSum) {
        let prodFinalSum = $('.prodFinalSum');
        let matFinalSum = $('.matFinalSum');

        prodFinalSum.val(prodSum);
        matFinalSum.val(matSum)
    }

    //set hours rate and calculate total cost
    $(document).on('keyup', '.setHours', function () {
        let cakePrice = $('.cakeCostElem');
        let setHours = $('.setHours');
        let getHours = $('.getHours');
        let setHoursNum = setHours.val();
        let hourState = setHours.data('hour');
        let setHoursVal = setHoursNum * hourState;
        let staticCost = $('.staticCost').val()
        getHours.val(setHoursVal);

        let prodFinalSum = $('.prodFinalSum').val();
        let matFinalSum = $('.matFinalSum').val();
        let cakeCostElem = +matFinalSum+ +prodFinalSum +setHoursVal + +staticCost;
        cakePrice.val(cakeCostElem)
    });

    // //create total cost
    function calcProdTables(prodName, prodPrice) {
        return `
           <div class="table-margin">
            <div class="flex">
                <div class="table-title prod-size"><p>products</p></div>
                <div class="table-title price-size"><p>price</p></div>
                <div class="table-title weight-size"><p>weight</p></div>
                <div class="table-title weight-size"><p>total</p></div>
            </div>
            <div class="flex box">
                <div class="table-style prod-size"><p>${prodName}</p></div>
                <div class="table-style price-size"><input type="text" id="" name="" value="${prodPrice + '$'}" data-pr="${prodPrice}" disabled></div>
                <div class="table-style weight-size"><input type="text" id="" name="" class="prodWeight" value="" placeholder="type price"></div>
                <div class="table-style weight-size"><input type="text" id="" name="" class="prodWeight prodTotal prodSum" value="" placeholder="sum" disabled></div>
            </div>
           </div> 
        `
    }
    function calcMatTables(prodName, prodPrice) {
        return `
           <div class="">
            <div class="flex">
                <div class="table-title prod-size"><p>products</p></div>
                <div class="table-title price-size"><p>price</p></div>
                <div class="table-title weight-size"><p>weight</p></div>
                <div class="table-title weight-size"><p>total</p></div>

            </div>
            <div class="flex box">
                <div class="table-style prod-size"><p>${prodName}</p></div>
                <div class="table-style price-size"><input type="text" id="" name="" value="${prodPrice + '$'}" data-pr="${prodPrice}" disabled></div>
                <div class="table-style weight-size"><input type="text" id="" name="" class="prodWeight" value="" placeholder="type price"></div>
                <div class="table-style weight-size"><input type="text" id="" name="" class="prodWeight prodTotal matSum" value="" placeholder="sum" disabled></div>
            </div>
           </div> 
         
        `
    }
});