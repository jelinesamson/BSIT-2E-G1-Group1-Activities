<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <?php
            $items = array(
                    array(
                        "item" => "ITEM 1",
                        "qty" => 2,
                        "amount" => 100,
                    ),
                    array(
                        "item" => "ITEM 2",
                        "qty" => 7,
                        "amount" => 35,  
                    ),
                    array(
                        "item" => "ITEM 3",
                        "qty" => 1,
                        "amount" => 350,     
                    ),
                    array(
                        "item" => "ITEM 4",
                        "qty" => 2,
                        "amount" => 20,     
                    )
                );
                    $overallTotal = 0;

                    echo"\tQ\tT\tY\t|\tD\tE\tS\tC\t|\tA\tM\tT\t|\tT\to\tt\ta\tl\t";
                    echo"<br>------------------------------------------";

                    for ($i = 0; $i < count($items); $i++){
                        $qty = $items[$i]["qty"];
                        $item = $items[$i]["item"];
                        $amt = $items[$i]["amount"];
                        $total = $qty * $amt;
                        $overallTotal += $total;
                       
                        echo"<br>";
                        echo "($qty)\t$item\t$amt\t$total\n";
                    }
                    echo"<br>";
                    echo "------------------------------------------";
                    echo"<br>";
                    echo "Overall Total: Php $overallTotal";
        ?>
    </body>
</html>