cd chrome
find * | grep -v \\.svn | zip -u@0 cookieui.jar
cd ..
find * | grep -v "^chrome/" | grep -v \\.svn | grep -v build.sh | zip -u@9 cookieui.xpi
zip -u9 cookieui.xpi chrome/cookieui.jar
