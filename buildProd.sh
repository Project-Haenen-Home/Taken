targetDir=/opt/node-apps/HaenenHome/Taken

service taken stop

npm run build
cp ./server.js $targetDir/server.js
cp ./prod_dist/* $targetDir/dist/

service taken restart