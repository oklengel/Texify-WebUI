@echo off

mkdir pdf
cd pdf

IF "%1" == "-clean" (
  rem latexmk -c
  del *.dvi
  del *.aux
  del *.fls
  del *.fdb_latexmk
) ELSE (
  latexmk ../src/main.tex -pdf
  exit /b 1
)
