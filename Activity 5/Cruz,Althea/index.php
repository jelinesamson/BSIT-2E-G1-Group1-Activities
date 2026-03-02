<?php
function makeReceipt($qty, $item, $amount) {
    $total = $qty * $amount;

    echo str_pad($qty . " pcs", 12);
    echo str_pad($item, 12);
    echo str_pad($amount, 12);
    echo str_pad($total, 12);
    echo "\n";

    return $total;
}

echo "<pre>";
echo "GROCERY RECEIPT\n";
echo "------------------------------------------------\n";
echo str_pad("QUANTITY", 12);
echo str_pad("DESC", 12);
echo str_pad("AMOUNT", 12);
echo str_pad("TOTAL", 12);
echo "\n";
echo "------------------------------------------------\n";

$grandTotal = 0;
$grandTotal += makeReceipt(2, "ITEM 1", 100);
$grandTotal += makeReceipt(7, "ITEM 2", 35);
$grandTotal += makeReceipt(1, "ITEM 3", 350);
$grandTotal += makeReceipt(2, "ITEM 4", 20);

echo "------------------------------------------------\n";
echo str_pad("OVERALL TOTAL:", 36);
echo str_pad($grandTotal, 12);
echo "\n";
echo "------------------------------------------------\n";
echo "</pre>";
?>
