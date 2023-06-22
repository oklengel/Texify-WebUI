#/bin/bash

mkdir pdf
cd pdf
case "$1" in
  "-clean")
    #latexmk -c
    rm *.dvi
    rm *.aux
    rm *.fls
    rm *.fdb_latexmk
    ;;
 
  *)
    latexmk ../src/main.tex -pdf
    exit 1
    ;;
esac