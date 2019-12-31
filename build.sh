webpack --env production

rm ./docs/*

# Copies all image assets
for file in $(find ./dist/ -regextype posix-extended -regex '.*\.(gif|png|jpg)'); do
  cp $file ./docs
done

cp ./dist/index.html ./docs 
cp ./dist/main.bundle.js ./docs 
cp ./dist/main.css ./docs 
cp ./dist/render.css ./docs 

