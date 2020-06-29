$(document).ready(function () {
    let tablesContainer = $('#tables');
    let tablesForMat = $('#tablesForMat');
    let result = $('.totalContainer');
    let prods = false;
    let mats = false;
    //create prod list
    $('.listToCreate').change(function () {
        let prodPrice = $(".listToCreate option:selected").data('price');
        let prodName = $(".listToCreate option:selected").val();
        tablesContainer.prepend(calcProdTables(prodName, prodPrice));
        $(this).parents('.calc-container').find('.totalContainer').removeClass('totalContainer')
        prods = !prods;
        Check();
    });

    // create material list
    $('.matListToCreate').change(function () {
        let prodPrice = $(".matListToCreate option:selected").data('price');
        let prodName = $(".matListToCreate option:selected").val();
        tablesForMat.prepend(calcMatTables(prodName, prodPrice));
        $(this).parents('#calculator').find('.totalContainer').removeClass('totalContainer')
        mats = !mats;
        Check();
    });

    //check if both containers are ready
    function Check() {
        if (prods > 0 && mats > 0) {
            $('#totalResultBtn').css('display', 'block')
        }
    }
    //create final results table
    $('#totalResultBtn').click(function () {
        $('.FinalResults').prepend(createFinalResultsTable())
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

    function createFinalResultsTable(){
        return `
            <div class="finalResults">
        <div class="flex final-row">
            <div class="first fRow">Name</div>
            <div class="second fRow">Ilość</div>
            <div class="third fRow">Koszt</div>
        </div>
        <div class="flex final-row">
            <div class="first">KOSZTY STAŁE</div>
            <div class="second"><input type="text" disabled></div>
            <div class="third"><input class="staticCost" type="text" value="10"></div>
        </div>
        <div class="flex final-row">
            <div class="first">KOSZT PRODUKTÓW</div>
            <div class="second"><input type="text" disabled></div>
            <div class="third"><input type="text" class="prodFinalSum" value="" disabled></div>
        </div>
        <div class="flex final-row">
            <div class="first">KOSZT MATERIAŁÓW</div>
            <div class="second"><input type="text" disabled></div>
            <div class="third"><input type="text" class="matFinalSum" value="" disabled></div>
        </div>
        <div class="flex final-row">
            <div class="first">ILOŚĆ GODZIN PRACY</div>
            <div class="second"><input class="setHours" value="" data-hour="10" type="text"></div>
            <div class="third"><input class="getHours" type="text" value="" disabled></div>
        </div>
        <div class="flex final-row">
            <div class="first">ŻYWE KWIATY</div>
            <div class="second"><input type="text" disabled></div>
            <div class="third"><input type="text" value="0" class="flowers"></div>
        </div>
        <div class="flex final-row">
            <div class="first">TOPPER</div>
            <div class="second"><input type="text" disabled></div>
            <div class="third"><input type="text" value="0" class="topper"></div>
        </div>
        <div class="flex final-row">
            <div class="first">Extra</div>
            <div class="second"><input type="text" disabled></div>
            <div class="third"><input type="text" value="0" class="extra"></div>
        </div>
        <div class="flex final-row">
            <div class="first">Koszt tortu: ($)</div>
            <div class="second"><input type="text" value="" disabled></div>
            <div class="third"><input class="cakeCostElem" type="text" value="" disabled></div>
        </div>
        <div class="flex final-row">
            <div class="first">MARŻA (%)</div>
            <div class="second"><input type="text" class="inputMar" onblur="marga()" value=""></div>
            <div class="third"><input type="text" value="" class="costWithMar" disabled></div>
        </div>
        <div class="flex final-row final-row-last">
            <div class="first">DOSTAWA ($)</div>
            <div class="second"><input type="text" disabled></div>
            <div class="third"><input type="text" class="delivery" value="90"></div>
        </div>
        <div class="flex between">
            <button class="addLastTable btn-padds" onclick="calc()">Total summ</button>
            <p>Total: <span class="showTotal"></span></p>
        </div>
    </div>
        `
    }
});