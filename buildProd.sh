targetDir=/opt/node-apps/HaenenHome/Taken

service taken stop

npm run build
cp ./server.js $targetDir/server.js
cp ./prod_dist/index.html $targetDir/dist/index.html
cp ./prod_dist/main.js $targetDir/dist/main.js
cp ./prod_dist/style.css $targetDir/dist/style.css

service taken restart