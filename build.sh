find * |  grep -v \\.svn | grep -v build.sh | zip -u@9 jsoptions.xpi
zip -u9 jsoptions.xpi chrome/jsoptions.jar
