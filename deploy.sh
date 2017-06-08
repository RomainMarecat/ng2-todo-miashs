#!/bin/bash
ng build -aot -prod --base-href "https://romainmarecat.github.io/ng2-todo-miashs/"
cp dist/index.html dist/404.html
cp src/sitemap.xml dist/sitemap.xml
cp src/robots.txt dist/robots.txt
ngh
exit 0
