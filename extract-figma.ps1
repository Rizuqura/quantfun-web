$json = Get-Content "C:\Users\HYPE AMD\Desktop\quantfun-web\figma-raw.json" -Raw -Encoding utf8 | ConvertFrom-Json
$hf = $json.document.children[0].children[0]

function Show-Node($node, $indent) {
    $info = "$indent$($node.name) [$($node.type)]"
    if ($node.absoluteBoundingBox) {
        $info += " ($($node.absoluteBoundingBox.x), $($node.absoluteBoundingBox.y)) [$($node.absoluteBoundingBox.width)x$($node.absoluteBoundingBox.height)]"
    }
    if ($node.type -eq "TEXT" -and $node.characters) {
        $info += " `"$($node.characters)`""
    }
    if ($node.fills -and $node.fills.Count -gt 0 -and $node.fills[0].color) {
        $c = $node.fills[0].color
        $info += " rgb($([math]::Round($c.r*255)),$([math]::Round($c.g*255)),$([math]::Round($c.b*255)))"
    }
    if ($node.opacity) { $info += " opacity=$($node.opacity)" }
    if ($node.style) {
        $s = $node.style
        if ($s.fontFamily) { $info += " font=$($s.fontFamily)" }
        if ($s.fontSize) { $info += " size=$($s.fontSize)" }
        if ($s.fontWeight) { $info += " weight=$($s.fontWeight)" }
        if ($s.lineHeightPx) { $info += " lineH=$($s.lineHeightPx)" }
        if ($s.letterSpacing) { $info += " letterSp=$($s.letterSpacing)" }
        if ($s.textAlignHorizontal) { $info += " align=$($s.textAlignHorizontal)" }
    }
    Write-Output $info
    if ($node.children) {
        foreach ($child in $node.children) {
            Show-Node $child "$indent  "
        }
    }
}

foreach ($c in $hf.children) {
    Write-Output "===== $($c.name) ====="
    Show-Node $c ""
    Write-Output ""
}
