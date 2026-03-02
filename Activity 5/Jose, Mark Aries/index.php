<?php

function generateReceipt($items) {
    echo "Output:\n\n";
    echo "QTY  DESC       AMT     Total\n";
    echo "-----------------------------\n";
    
    $overallTotal = 0;
    
    foreach ($items as $item) {
        $qty = $item['qty'];
        $desc = $item['desc'];
        $amt = $item['amt'];
        
        $total = $qty * $amt;
        
        $overallTotal += $total;
        
        $qtyDesc = "($qty)$desc";
        
        printf("%-16s%-9s%s\n", $qtyDesc, $amt, $total);
    }
    
    echo "-----------------------------\n";
    echo "Overall Total        Php " . $overallTotal . "\n";
}

$groceryList = [
    ["qty" => 2, "desc" => "ITEM 1", "amt" => 100],
    ["qty" => 7, "desc" => "ITEM 2", "amt" => 35],
    ["qty" => 1, "desc" => "ITEM 3", "amt" => 350],
    ["qty" => 2, "desc" => "ITEM 4", "amt" => 20]
];

generateReceipt($groceryList);

?>
