#!/bin/bash
# GGA TV Prezentatsiyasini to'liq ekranda ishga tushirish skripti

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
INDEX_FILE="$DIR/index.html"

# Google Chrome orqali to'liq ekranda ochish (agar Chrome mavjud bo'lsa)
if [ -d "/Applications/Google Chrome.app" ]; then
    open -a "/Applications/Google Chrome.app" --args --start-fullscreen "$INDEX_FILE"
else
    # Default brauzerda ochish
    open "$INDEX_FILE"
fi
